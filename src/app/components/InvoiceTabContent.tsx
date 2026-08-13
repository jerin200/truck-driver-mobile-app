import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  ArrowRightLeft,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Globe,
  Hash,
  History,
  Image as ImageIcon,
  Lock,
  Paperclip,
  Receipt,
  Timer,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import RaiseDisputeSheet, { DisputeData } from "./RaiseDisputeSheet";
import { useSnackbar } from "../contexts/SnackbarContext";
import { formatDateTimeBullet } from "../utils/dateFormat";
import {
  downloadEvidence,
  EvidenceItem,
  extensionOf,
  fromFiles,
} from "../utils/evidenceFiles";

/* ============================================================
 * Truck Driver · Review Pilot Car Invoices (Trip Details → Invoice tab)
 *
 * AC1  Entry points: push notification + Invoice tab
 * AC2  One card per submitted invoice
 * AC3  Invoice Details (read-only information + summary)
 * AC4  Status on card and details screen
 * AC5  Individual driver: Approve Invoice / Raise Dispute
 * AC6  Company driver: read-only + admin message
 * AC7  Invoices appear without manual refresh; notification deep-links
 * AC8  Remaining review period before auto approval
 * AC9  Auto approval on expiry → Payment Completed
 * AC10 Raise Dispute workflow
 * AC11 Same lifecycle for Flat Rate / Per Mile / Per Hour
 * AC12 Amounts shown in the payer's default currency
 *
 * Revised invoice (view after resubmission)
 * R-AC1 A resubmitted invoice replaces the disputed one at Pending Review
 * R-AC2 Updated Charges · Platform Fee · Invoice Total · Net Payable ·
 *       Supporting Evidence · Invoice Status are all shown
 * R-AC3 Read-only — no further dispute and no payment from the mobile app
 * ============================================================ */

const ORANGE = "#F89823";
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Backend-configurable fee schedule (mocked here). */
const PROCESSING_RATE = 0.029;
const PROCESSING_FIXED = 0.3;
const PLATFORM_RATE = 0.08;

/** Stands in for the backend Currency Exchange Rate API (AC12). */
const EXCHANGE_RATES: Record<string, number> = {
  "CAD>USD": 0.705667,
  "USD>CAD": 1.4171,
};

/**
 * How long the pilot car party takes to resubmit after a dispute. Mocked here
 * so the revised invoice can be seen end to end; in production it arrives from
 * the invoice service (and its push notification) whenever they resubmit.
 */
const REVISION_DELAY_MS = 6000;

/**
 * Share of the original job fee that was billed as standby time — the line the
 * pilot car party withdraws when it resubmits.
 */
const STANDBY_SHARE = 0.125;

export type InvoiceStatus =
  | "Pending Review"
  | "Payment Completed"
  | "Payment Disputed";

export interface PilotInvoice {
  invoiceNumber: string;
  jobNumber: string;
  jobKind: "Escort Job" | "Route Survey";
  pilotDriver: string;
  pilotCompany?: string;
  pricingType: "Flat Rate" | "Per Mile" | "Per Hour";
  /** Currency the pilot car party invoiced in. */
  currency: string;
  jobFee: number;
  processingFee: number;
  platformFee: number;
  total: number;
  submittedAt: number;
}

/** One line of the resubmitted invoice, carrying what it used to be. */
export interface RevisedCharge {
  label: string;
  sub?: string;
  amount: number;
  /** Amount on the disputed invoice, when this line changed. */
  previousAmount?: number;
}

/**
 * Invoice resubmitted by the Pilot Car Driver or Pilot Car Company
 * Administrator after the truck driver disputed the original one. Read-only on
 * mobile — payment is completed through the web portal.
 */
export interface RevisedInvoice {
  invoiceNumber: string;
  /** Invoice number this revision replaces. */
  revisionOf: string;
  revisionNumber: number;
  submittedAt: number;
  revisedBy: string;
  revisedByRole: "Pilot Car Driver" | "Pilot Car Company Administrator";
  charges: RevisedCharge[];
  chargesTotal: number;
  processingFee: number;
  platformFee: number;
  /** Payable by the truck driver. */
  total: number;
  /** Total on the disputed invoice, for the before/after comparison. */
  previousTotal: number;
  /** Owed to the pilot car party once Overwize fees are settled. */
  netPayable: number;
}

interface InvoiceTabContentProps {
  relatedJobs: any[];
  /** Individual drivers can act; company drivers are read-only (AC5 / AC6). */
  userRole?: "individual" | "company";
  /** Payer's configured default payment currency (AC12). */
  payerCurrency?: string;
  /** Backend-configurable review period before auto approval (AC8 / AC9). */
  reviewWindowMs?: number;
  /**
   * Job number to open straight into Invoice Details — set when the driver
   * arrives from the Home invoice notification widget (AC1 / AC7).
   */
  focusInvoiceJobNumber?: string;
}

/* ── helpers ─────────────────────────────────────────────── */

const round2 = (n: number) => Math.round(n * 100) / 100;

const money = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function rateFor(from: string, to: string): number | null {
  if (from === to) return null;
  return EXCHANGE_RATES[`${from}>${to}`] ?? null;
}

/** "18 hours" / "45 minutes" — phrasing for the auto-approval reminder. */
function formatReviewRemaining(ms: number): string {
  if (ms <= 0) return "0 minutes";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours >= 1) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}

/** "17h 42m" / "42m 09s" — the precise ticking value. */
function formatCountdown(ms: number): string {
  if (ms <= 0) return "0m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

const PRICING_LABEL: Record<string, PilotInvoice["pricingType"]> = {
  flat: "Flat Rate",
  mileage: "Per Mile",
  hourly: "Per Hour",
};

/**
 * Currency each pilot car party invoiced in. Real invoices carry their own;
 * this keeps one job on a foreign currency so conversion (AC12) is visible.
 */
const INVOICE_CURRENCY: Record<string, string> = {
  "JOB-102": "CAD",
};
const DEFAULT_INVOICE_CURRENCY = "USD";

/**
 * Invoices already disputed and resubmitted before the driver opened the app.
 * Keeps the Home "Disputed Invoices" widget and this tab telling one story; in
 * production the dispute and its revision both come from the invoice service.
 */
const SEEDED_DISPUTES: Record<
  string,
  { dispute: DisputeData; evidence: EvidenceItem[] }
> = {
  "JOB-103": {
    dispute: {
      reason: "Extra charges",
      description:
        "Standby time was billed for the overnight layover in Florence, SC, " +
        "but the escort was released for the night at 19:40. Please remove " +
        "the standby line and reissue the invoice.",
      evidence: [],
      submittedOn: new Date(Date.now() - 26 * HOUR_MS).toISOString(),
    },
    evidence: [
      {
        id: "JOB-103-dispute-release",
        name: "escort-release-confirmation.pdf",
        kind: "document",
        size: "184 KB",
      },
      {
        id: "JOB-103-dispute-photo",
        name: "layover-parking-19-42.jpg",
        kind: "photo",
        size: "2.1 MB",
      },
    ],
  },
};

/**
 * Builds the submitted-invoice list for the trip. Only jobs whose pilot car
 * party has submitted an invoice are included (AC2) — here, jobs with an
 * accepted bid. In production this comes from the invoice service.
 */
function buildInvoices(relatedJobs: any[], now: number): PilotInvoice[] {
  return relatedJobs
    .map((job) => ({
      job,
      bid: job.bids?.find((b: any) => b.status === "Accepted"),
    }))
    .filter(({ bid }) => !!bid)
    .map(({ job, bid }, index): PilotInvoice => {
      const jobFee = round2(Number(bid.amount) || 0);
      const processingFee = round2(jobFee * PROCESSING_RATE + PROCESSING_FIXED);
      const platformFee = round2(jobFee * PLATFORM_RATE);

      return {
        invoiceNumber: `INV-${String(job.id).replace(/\D/g, "") || index}`,
        jobNumber: job.id,
        jobKind:
          job.jobType === "route-survey" ||
          /survey/i.test(job.vehicleType ?? "")
            ? "Route Survey"
            : "Escort Job",
        pilotDriver: bid.contactPerson || "Pilot Car Driver",
        pilotCompany: bid.companyName || undefined,
        pricingType: PRICING_LABEL[job.pricingType] ?? "Flat Rate",
        currency: INVOICE_CURRENCY[job.id] ?? DEFAULT_INVOICE_CURRENCY,
        jobFee,
        processingFee,
        platformFee,
        total: round2(jobFee + processingFee + platformFee),
        // Staggered submission times give each invoice a distinct review window.
        submittedAt: now - (6 + index * 3) * HOUR_MS,
      };
    });
}

/**
 * Builds the invoice the pilot car party resubmits after a dispute. The
 * disputed standby line is withdrawn, the escort service fee stands, and every
 * fee is recalculated off the reduced charges. In production this whole object
 * comes from the invoice service.
 */
function buildRevisedInvoice(
  invoice: PilotInvoice,
  submittedAt: number,
): RevisedInvoice {
  const standby = round2(invoice.jobFee * STANDBY_SHARE);
  const serviceFee = round2(invoice.jobFee - standby);

  const charges: RevisedCharge[] = [
    {
      label: "Escort Service Fee",
      sub: invoice.pricingType,
      amount: serviceFee,
      previousAmount: serviceFee,
    },
    {
      label: "Standby / Waiting Charges",
      sub: "Withdrawn after dispute review",
      amount: 0,
      previousAmount: standby,
    },
  ];

  const chargesTotal = round2(charges.reduce((sum, c) => sum + c.amount, 0));
  const processingFee = round2(
    chargesTotal * PROCESSING_RATE + PROCESSING_FIXED,
  );
  const platformFee = round2(chargesTotal * PLATFORM_RATE);
  const total = round2(chargesTotal + processingFee + platformFee);

  return {
    invoiceNumber: `${invoice.invoiceNumber}-R1`,
    revisionOf: invoice.invoiceNumber,
    revisionNumber: 1,
    submittedAt,
    revisedBy: invoice.pilotCompany ?? invoice.pilotDriver,
    revisedByRole: invoice.pilotCompany
      ? "Pilot Car Company Administrator"
      : "Pilot Car Driver",
    charges,
    chargesTotal,
    processingFee,
    platformFee,
    total,
    previousTotal: invoice.total,
    // Overwize collects its fees out of the payment, so the pilot car party is
    // owed the charges they billed.
    netPayable: round2(total - platformFee - processingFee),
  };
}

/* ── presentational primitives ───────────────────────────── */

const CARD =
  "bg-white rounded-2xl border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden";

const STATUS_STYLE: Record<
  InvoiceStatus,
  { chip: string; dot: string; icon: typeof Timer }
> = {
  "Pending Review": {
    chip: "bg-[#FFF3E0] text-[#B45309] border-[#FCE3C4]",
    dot: "bg-[#D97706]",
    icon: Timer,
  },
  "Payment Completed": {
    chip: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    dot: "bg-[#16A34A]",
    icon: CheckCircle2,
  },
  "Payment Disputed": {
    chip: "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
    dot: "bg-[#E11D48]",
    icon: AlertTriangle,
  },
};

function StatusChip({
  status,
  size = "default",
}: {
  status: InvoiceStatus;
  size?: "default" | "sm";
}) {
  const style = STATUS_STYLE[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold whitespace-nowrap ${
        size === "sm"
          ? "px-2 py-0.5 text-[11px]"
          : "px-2.5 py-1 text-[12px]"
      } ${style.chip}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden />
      {status}
    </span>
  );
}

/** Marks an invoice that has been resubmitted, alongside its status chip. */
function RevisedChip({ size = "default" }: { size?: "default" | "sm" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] font-semibold text-[#6D28D9] whitespace-nowrap ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      }`}
    >
      <History
        className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"}
        aria-hidden
      />
      Revised
    </span>
  );
}

function CardHeading({
  icon: Icon,
  title,
  tint = "#EFF6FF",
  color = "#2563EB",
  right,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tint?: string;
  color?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: tint }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <h3 className="text-[14px] font-semibold text-[#101828] flex-1">
        {title}
      </h3>
      {right}
    </div>
  );
}

function InfoRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-[13px] text-[#6b7280] shrink-0">{label}</span>
      {children ?? (
        <span className="text-[13px] font-semibold text-[#101828] text-right">
          {value}
        </span>
      )}
    </div>
  );
}

function MoneyRow({
  label,
  sub,
  amount,
  currency,
  strong,
}: {
  label: string;
  sub?: string;
  amount: number;
  currency: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p
          className={`text-[13px] ${
            strong ? "font-semibold text-[#101828]" : "text-[#4a5565]"
          }`}
        >
          {label}
        </p>
        {sub && <p className="text-[11px] text-[#9ca3af] mt-0.5">{sub}</p>}
      </div>
      <p
        className={`shrink-0 tabular-nums ${
          strong
            ? "text-[16px] font-bold text-[#101828]"
            : "text-[13px] font-semibold text-[#101828]"
        }`}
      >
        ${money(amount)}
        <span className="text-[11px] font-medium text-[#9ca3af] ml-1">
          {currency}
        </span>
      </p>
    </div>
  );
}

/** Money row that shows what a line used to be when the revision changed it. */
function ChargeDiffRow({
  label,
  sub,
  amount,
  previousAmount,
  currency,
}: {
  label: string;
  sub?: string;
  amount: number;
  previousAmount?: number;
  currency: string;
}) {
  const changed =
    previousAmount !== undefined && round2(previousAmount) !== round2(amount);
  const withdrawn = changed && amount === 0;

  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p
          className={`text-[13px] ${
            withdrawn ? "text-[#9ca3af] line-through" : "text-[#4a5565]"
          }`}
        >
          {label}
        </p>
        {sub && <p className="text-[11px] text-[#9ca3af] mt-0.5">{sub}</p>}
      </div>
      <div className="shrink-0 text-right">
        {changed && (
          <p className="text-[11px] text-[#9ca3af] line-through tabular-nums leading-none">
            ${money(previousAmount!)}
          </p>
        )}
        <p
          className={`text-[13px] font-semibold tabular-nums ${
            changed ? "text-[#15803D] mt-1" : "text-[#101828]"
          }`}
        >
          ${money(amount)}
          <span className="text-[11px] font-medium text-[#9ca3af] ml-1">
            {currency}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Photos and documents are tinted apart so the file type reads at a glance. */
const EVIDENCE_KIND_STYLE = {
  photo: { tint: "#EFF6FF", color: "#2563EB", border: "#DBEAFE" },
  document: { tint: "#FFF1F2", color: "#E11D48", border: "#FFE4E6" },
} as const;

/**
 * Attachment row. Read-only in the sense that nothing can be changed, but the
 * file itself can be saved to the device.
 */
function EvidenceRow({
  item,
  onDownload,
  busy,
}: {
  item: EvidenceItem;
  onDownload: () => void;
  busy: boolean;
}) {
  const isPhoto = item.kind === "photo";
  const Icon = isPhoto ? ImageIcon : FileText;
  const style = EVIDENCE_KIND_STYLE[isPhoto ? "photo" : "document"];

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
        style={{ backgroundColor: style.tint, borderColor: style.border }}
      >
        <Icon className="w-4 h-4" style={{ color: style.color }} aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-[#101828] truncate">
          {item.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: style.tint, color: style.color }}
          >
            {extensionOf(item.name)}
          </span>
          <span className="text-[11px] text-[#9ca3af] truncate">
            {item.size}
          </span>
        </div>
      </div>

      <button
        onClick={onDownload}
        disabled={busy}
        aria-label={`Download ${item.name}`}
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[#4a5565] cursor-pointer transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823]"
      >
        {busy ? (
          <span
            className="w-4 h-4 border-2 border-[#9ca3af] border-t-transparent rounded-full animate-spin"
            aria-hidden
          />
        ) : (
          <Download className="w-4 h-4" aria-hidden />
        )}
      </button>
    </div>
  );
}

/**
 * The driver's own attachments for a dispute, as one downloadable list.
 * Rendered inside the dispute card rather than as a card of its own.
 */
function EvidenceList({ attachments }: { attachments: EvidenceItem[] }) {
  const { showSnackbar } = useSnackbar();
  const [busyId, setBusyId] = useState<string | null>(null);

  if (attachments.length === 0) return null;

  const handleDownload = async (item: EvidenceItem) => {
    setBusyId(item.id);
    try {
      await downloadEvidence(item);
      showSnackbar(`Downloading ${item.name}`, "success", 3000);
    } catch {
      showSnackbar(`Could not download ${item.name}`, "error", 4000);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="pt-3 border-t border-gray-100">
      <div className="flex items-center gap-1.5">
        <Paperclip className="w-3.5 h-3.5 text-[#9ca3af]" aria-hidden />
        <p className="text-[11px] uppercase tracking-wide text-[#9ca3af] flex-1">
          Supporting Evidence
        </p>
        <span className="text-[11px] text-[#9ca3af]">
          {attachments.length} file{attachments.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="divide-y divide-gray-100 mt-1">
        {attachments.map((item) => (
          <EvidenceRow
            key={item.id}
            item={item}
            busy={busyId === item.id}
            onDownload={() => handleDownload(item)}
          />
        ))}
      </div>
    </div>
  );
}

function Notice({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: "info" | "warning" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  title?: string;
  children: React.ReactNode;
}) {
  const map = {
    info: "bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]",
    warning: "bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]",
    neutral: "bg-[#F9FAFB] border-[#e9e9e9] text-[#4a5565]",
  } as const;
  const iconColor = {
    info: "text-[#2563EB]",
    warning: "text-[#E11D48]",
    neutral: "text-[#6b7280]",
  } as const;

  return (
    <div className={`rounded-2xl border px-4 py-3.5 flex gap-3 ${map[tone]}`}>
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor[tone]}`} />
      <div className="min-w-0">
        {title && (
          <p className="text-[13px] font-semibold leading-tight mb-1">
            {title}
          </p>
        )}
        <div className="text-[12px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── Auto-approval countdown (AC8) ───────────────────────── */

/** Remaining review time as a value/unit pair for the ring centre. */
function remainingParts(ms: number): { value: string; unit: string } {
  if (ms <= 0) return { value: "0", unit: "min" };
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  if (hours >= 1) return { value: String(hours), unit: hours === 1 ? "hr" : "hrs" };
  return { value: String(totalMinutes), unit: "min" };
}

function CountdownCard({
  remainingMs,
  windowMs,
}: {
  remainingMs: number;
  windowMs: number;
}) {
  const urgent = remainingMs <= HOUR_MS;
  const accent = urgent ? "#E11D48" : ORANGE;

  const size = 52;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.max(0, Math.min(1, remainingMs / windowMs));
  const { value, unit } = remainingParts(remainingMs);

  return (
    <div
      className="rounded-2xl border px-4 py-3.5 flex items-center gap-3.5"
      style={{
        background: urgent
          ? "linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 68%)"
          : "linear-gradient(135deg, #FFF3E4 0%, #FFFFFF 68%)",
        borderColor: urgent ? "#FECDD3" : "#FBE0C0",
      }}
      role="status"
    >
      {/* Round progress — remaining share of the review window */}
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={urgent ? "#FBD5DA" : "#F6E2C8"}
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
            className="transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span
            className="text-[15px] font-bold tabular-nums"
            style={{ color: urgent ? "#E11D48" : "#101828" }}
          >
            {value}
          </span>
          <span className="text-[8px] font-semibold uppercase tracking-wide text-[#9ca3af] mt-0.5">
            {unit}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#101828] leading-snug">
          {formatReviewRemaining(remainingMs)} left to auto approve the invoice
        </p>
        <p
          className="text-[11px] mt-1 tabular-nums"
          style={{ color: urgent ? "#BE123C" : "#B45309" }}
        >
          {formatCountdown(remainingMs)} of a{" "}
          {Math.round(windowMs / HOUR_MS)}-hour review window
        </p>
      </div>
    </div>
  );
}

/* ── Invoice card (AC2) ──────────────────────────────────── */

function InvoiceCard({
  invoice,
  status,
  revision,
  displayCurrency,
  onViewDetails,
}: {
  invoice: PilotInvoice;
  status: InvoiceStatus;
  /** Present once the pilot car party has resubmitted (R-AC1). */
  revision?: RevisedInvoice | null;
  displayCurrency: string;
  onViewDetails: () => void;
}) {
  const rate = rateFor(invoice.currency, displayCurrency);
  const convert = (n: number) => (rate ? round2(n * rate) : n);
  const total = convert(revision ? revision.total : invoice.total);

  return (
    <div className={CARD}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[17px] font-bold text-[#101828] leading-tight mt-1 truncate">
              {invoice.jobNumber}
            </p>
            <p className="text-[11px] text-[#9ca3af] mt-0.5">
              {invoice.jobKind} · {invoice.pricingType}
            </p>
          </div>
          <div className="shrink-0">
            {revision ? (
              <RevisedChip size="sm" />
            ) : (
              <StatusChip status={status} size="sm" />
            )}
          </div>
        </div>

        <div className="mt-3.5 pt-3.5 border-t border-gray-100 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#9ca3af] leading-none">
                Pilot Car Driver
              </p>
              <p className="text-[13px] font-semibold text-[#101828] truncate mt-0.5">
                {invoice.pilotDriver}
              </p>
            </div>
          </div>

          {invoice.pilotCompany && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                <Building2 className="w-3.5 h-3.5 text-[#6b7280]" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-[#9ca3af] leading-none">
                  Pilot Car Company
                </p>
                <p className="text-[13px] font-semibold text-[#101828] truncate mt-0.5">
                  {invoice.pilotCompany}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3.5 pt-3.5 border-t border-gray-100 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-[#6b7280]">
              {revision ? "Revised Amount Payable" : "Total Amount Payable"}
            </p>
            <p className="text-[20px] font-bold text-[#101828] tabular-nums leading-tight">
              ${money(total)}
              <span className="text-[12px] font-medium text-[#9ca3af] ml-1">
                {displayCurrency}
              </span>
            </p>
            {revision && (
              <p className="text-[11px] text-[#9ca3af] tabular-nums mt-0.5">
                Was{" "}
                <span className="line-through">
                  ${money(convert(revision.previousTotal))}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-center gap-1.5 border-t border-gray-100 bg-[#FAFAFA] text-[14px] font-semibold text-[#101828] cursor-pointer transition-colors duration-200 hover:bg-[#F3F4F6] active:bg-[#ECECEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823] focus-visible:ring-offset-1"
        aria-label={`View ${
          revision ? "revised invoice" : "details for invoice"
        } on job ${invoice.jobNumber}`}
      >
        {revision ? "View Revised Invoice" : "View Details"}
        <ChevronRight className="w-4 h-4" aria-hidden />
      </button>
    </div>
  );
}

/* ── Invoice details screen (AC3) ────────────────────────── */

function InvoiceDetails({
  invoice,
  status,
  revision,
  remainingMs,
  reviewWindowMs,
  userRole,
  displayCurrency,
  dispute,
  disputeEvidence,
  onBack,
  onApprove,
  onDispute,
}: {
  invoice: PilotInvoice;
  status: InvoiceStatus;
  revision?: RevisedInvoice | null;
  remainingMs: number;
  reviewWindowMs: number;
  userRole: "individual" | "company";
  displayCurrency: string;
  dispute?: DisputeData | null;
  /** The driver's own attachments, normalised for listing and download. */
  disputeEvidence: EvidenceItem[];
  onBack: () => void;
  onApprove: () => void;
  onDispute: () => void;
}) {
  const rate = rateFor(invoice.currency, displayCurrency);
  const convert = (n: number) => (rate ? round2(n * rate) : n);

  /**
   * R-AC3 — a resubmitted invoice is read-only: no second dispute, and payment
   * is completed through the web portal rather than here.
   */
  const canAct =
    userRole === "individual" && status === "Pending Review" && !revision;

  // Portalled to <body> so it covers the Trip Details screen's own fixed
  // bottom bars, while a later-mounted dispute Sheet still layers above it.
  return createPortal(
    <div className="fixed inset-0 z-50 max-w-[450px] mx-auto flex flex-col bg-[#f6f6f6]">
      {/* Header */}
      <div className="flex-none bg-white border-b border-[#e6e3df]">
        <div className="flex items-center h-14 px-2">
          <button
            onClick={onBack}
            aria-label="Back to invoices"
            className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823]"
          >
            <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div className="flex-1 text-center px-1">
            <h1 className="text-[16px] font-semibold text-[#101828] leading-tight">
              {revision ? "Revised Invoice" : "Invoice Details"}
            </h1>
            <p className="text-[11px] text-[#6b7280] mt-0.5">
              {revision ? revision.invoiceNumber : invoice.invoiceNumber}
            </p>
          </div>
          <div className="w-11" />
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4 py-4 space-y-4">
          {/* AC8 — remaining review period. A revised invoice has no mobile
              auto-approval: it is settled from the web portal (R-AC3). */}
          {status === "Pending Review" && !revision && (
            <CountdownCard
              remainingMs={remainingMs}
              windowMs={reviewWindowMs}
            />
          )}

          {/* AC3 / R-AC2 — Invoice Information (read-only) */}
          <div className={CARD}>
            <CardHeading icon={Receipt} title="Invoice Information" />
            <div className="px-4 py-1 divide-y divide-gray-100">
              <InfoRow label="Job Number" value={invoice.jobNumber} />
              <InfoRow label="Job Type" value={invoice.jobKind} />
              <InfoRow label="Pilot Car Driver" value={invoice.pilotDriver} />
              <InfoRow
                label="Pilot Car Company"
                value={invoice.pilotCompany ?? "—"}
              />
              <InfoRow label="Pricing Type" value={invoice.pricingType} />
              {/* R-AC2 — Invoice Status */}
              <InfoRow label="Invoice Status">
                {revision ? (
                  <RevisedChip size="sm" />
                ) : (
                  <StatusChip status={status} size="sm" />
                )}
              </InfoRow>
              {revision ? (
                <>
                  <InfoRow
                    label="Revision"
                    value={`R${revision.revisionNumber} · replaces ${revision.revisionOf}`}
                  />
                  <InfoRow label="Resubmitted By" value={revision.revisedBy} />
                  <InfoRow label="Role" value={revision.revisedByRole} />
                  <InfoRow
                    label="Resubmitted"
                    value={formatDateTimeBullet(new Date(revision.submittedAt))}
                  />
                </>
              ) : (
                <InfoRow
                  label="Submitted"
                  value={formatDateTimeBullet(new Date(invoice.submittedAt))}
                />
              )}
            </div>
          </div>

          {/* R-AC2 — Updated Charges · Platform Fee · Invoice Total ·
              Net Payable */}
          {revision ? (
            <div className={CARD}>
              <CardHeading
                icon={Receipt}
                title="Updated Charges"
                tint="#FFF3E0"
                color="#D97706"
              />
              <div className="px-4 py-1">
                <div className="divide-y divide-gray-100">
                  {revision.charges.map((charge) => (
                    <ChargeDiffRow
                      key={charge.label}
                      label={charge.label}
                      sub={charge.sub}
                      amount={convert(charge.amount)}
                      previousAmount={
                        charge.previousAmount === undefined
                          ? undefined
                          : convert(charge.previousAmount)
                      }
                      currency={displayCurrency}
                    />
                  ))}
                </div>
                <div className="border-t border-gray-200">
                  <MoneyRow
                    label="Updated Charges Subtotal"
                    amount={convert(revision.chargesTotal)}
                    currency={displayCurrency}
                  />
                </div>
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  <MoneyRow
                    label="Transaction Processing Fee"
                    sub={`${(PROCESSING_RATE * 100).toFixed(1)}% + $${PROCESSING_FIXED.toFixed(2)}`}
                    amount={convert(revision.processingFee)}
                    currency={displayCurrency}
                  />
                  <MoneyRow
                    label="Platform Fee"
                    sub={`Overwize ${(PLATFORM_RATE * 100).toFixed(0)}%`}
                    amount={convert(revision.platformFee)}
                    currency={displayCurrency}
                  />
                </div>
                <div className="border-t-2 border-gray-100">
                  <MoneyRow
                    label="Invoice Total"
                    sub="Payable by you"
                    amount={convert(revision.total)}
                    currency={displayCurrency}
                    strong
                  />
                </div>
                <div className="border-t border-gray-100">
                  <MoneyRow
                    label="Net Payable"
                    amount={convert(revision.netPayable)}
                    currency={displayCurrency}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* AC3 — Invoice Summary */
            <div className={CARD}>
              <CardHeading
                icon={Receipt}
                title="Invoice Summary"
                tint="#FFF3E0"
                color="#D97706"
              />
              <div className="px-4 py-1">
                <div className="divide-y divide-gray-100">
                  <MoneyRow
                    label="Total Job Fee"
                    amount={convert(invoice.jobFee)}
                    currency={displayCurrency}
                  />
                  <MoneyRow
                    label="Transaction Processing Fee"
                    sub={`${(PROCESSING_RATE * 100).toFixed(1)}% + $${PROCESSING_FIXED.toFixed(2)}`}
                    amount={convert(invoice.processingFee)}
                    currency={displayCurrency}
                  />
                  <MoneyRow
                    label="Platform Fee"
                    sub={`Overwize ${(PLATFORM_RATE * 100).toFixed(0)}%`}
                    amount={convert(invoice.platformFee)}
                    currency={displayCurrency}
                  />
                </div>
                <div className="border-t-2 border-gray-100">
                  <MoneyRow
                    label="Total Amount Payable"
                    amount={convert(invoice.total)}
                    currency={displayCurrency}
                    strong
                  />
                </div>
              </div>
            </div>
          )}

          {/* AC12 — currency conversion note */}
          {rate && (
            <Notice tone="info" icon={ArrowRightLeft} title="Currency Converted">
              The invoice amount shown in {displayCurrency} is converted from{" "}
              {invoice.currency} using an exchange rate of 1 {invoice.currency} ={" "}
              {rate.toFixed(6)} {displayCurrency}.
              <span className="block mt-1.5 text-[#1E40AF]/70">
                {revision ? "Revised" : "Original"} invoice total: $
                {money(revision ? revision.total : invoice.total)}{" "}
                {invoice.currency}
              </span>
            </Notice>
          )}

          {/* Dispute record — kept alongside the revision it produced */}
          {dispute && (status === "Payment Disputed" || revision) && (
            <div className={CARD}>
              <CardHeading
                icon={AlertTriangle}
                title={revision ? "Your Dispute" : "Dispute Details"}
                tint="#FFF1F2"
                color="#E11D48"
              />
              <div className="px-4 py-3 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                    Reason
                  </p>
                  <p className="text-[13px] font-semibold text-[#101828] mt-0.5">
                    {dispute.reason}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                    Description
                  </p>
                  <p className="text-[13px] text-[#4a5565] mt-0.5 leading-relaxed">
                    {dispute.description}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                    Submitted On
                  </p>
                  <p className="text-[13px] text-[#4a5565] mt-0.5">
                    {formatDateTimeBullet(dispute.submittedOn)}
                  </p>
                </div>
                {/* R-AC2 — supporting evidence, downloadable */}
                <EvidenceList attachments={disputeEvidence} />
              </div>
            </div>
          )}

          {/* R-AC3 — payment happens outside the mobile app */}
          {revision && (
            <Notice tone="info" icon={Globe} title="Complete payment on the web">
              Review the updated details here, then sign in to the Overwize web
              portal to complete payment for {revision.invoiceNumber}.
            </Notice>
          )}

          {/* AC6 — company truck driver read-only message */}
          {userRole === "company" && status === "Pending Review" && !revision && (
            <Notice tone="neutral" icon={Lock} title="Read-only access">
              This invoice must be reviewed and approved by your Truck Company
              Administrator.
            </Notice>
          )}

          {/* Resolved-state messaging */}
          {status === "Payment Completed" && (
            <Notice tone="info" icon={CheckCircle2} title="Payment Completed">
              This invoice was approved and the payment has been processed
              successfully.
            </Notice>
          )}
          {status === "Payment Disputed" && (
            <Notice tone="warning" icon={AlertTriangle} title="Under Dispute">
              Payment is on hold while the dispute is reviewed. The pilot car
              party has been notified.
            </Notice>
          )}

          <div className="h-2" />
        </div>
      </div>

      {/* AC5 — sticky actions for individual truck drivers */}
      {canAct && (
        <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
          <div className="flex gap-2.5">
            <Button
              onClick={onDispute}
              variant="outline"
              className="flex-1 h-12 rounded-[8px] text-[15px] font-semibold bg-white border-[#FECDD3] text-[#E11D48] cursor-pointer transition-colors duration-200 hover:bg-[#FFF1F2] hover:text-[#BE123C] focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            >
              <AlertTriangle className="w-4 h-4 mr-1.5" aria-hidden />
              Raise Dispute
            </Button>
            <Button
              onClick={onApprove}
              className="flex-1 h-12 rounded-[8px] text-[15px] font-semibold text-[#1a1a1a] cursor-pointer transition-colors duration-200 shadow-[0px_4px_14px_0px_rgba(248,152,35,0.30)] focus-visible:ring-2 focus-visible:ring-[#B45309]"
              style={{ backgroundColor: ORANGE }}
            >
              <Check className="w-4 h-4 mr-1.5" aria-hidden />
              Approve Invoice
            </Button>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

/* ── Main tab ────────────────────────────────────────────── */

export default function InvoiceTabContent({
  relatedJobs,
  userRole: userRoleProp,
  payerCurrency = "USD",
  reviewWindowMs = DAY_MS,
  focusInvoiceJobNumber,
}: InvoiceTabContentProps) {
  const { showSnackbar } = useSnackbar();

  // Comes from the auth context in production (AC5 / AC6).
  const role = userRoleProp ?? "individual";

  // Freeze "now" at mount so submission timestamps stay stable across renders.
  const mountedAtRef = useRef(Date.now());
  const invoices = useMemo(
    () => buildInvoices(relatedJobs, mountedAtRef.current),
    [relatedJobs],
  );

  /**
   * Disputes already resolved with a resubmitted invoice when the tab opens.
   * Only jobs that actually have an invoice here are seeded.
   */
  const seeded = useMemo(() => {
    const statuses: Record<string, InvoiceStatus> = {};
    const disputes: Record<string, DisputeData | null> = {};
    const evidence: Record<string, EvidenceItem[]> = {};
    const revisions: Record<string, RevisedInvoice> = {};

    invoices.forEach((invoice) => {
      const seed = SEEDED_DISPUTES[invoice.jobNumber];
      if (!seed) return;
      const disputedAt = new Date(seed.dispute.submittedOn).getTime();
      disputes[invoice.jobNumber] = seed.dispute;
      evidence[invoice.jobNumber] = seed.evidence;
      revisions[invoice.jobNumber] = buildRevisedInvoice(
        invoice,
        disputedAt + 4 * HOUR_MS,
      );
      // The revision re-enters review (R-AC1).
      statuses[invoice.jobNumber] = "Pending Review";
    });

    return { statuses, disputes, evidence, revisions };
  }, [invoices]);

  const [statuses, setStatuses] = useState<Record<string, InvoiceStatus>>(
    () => seeded.statuses,
  );
  const [disputes, setDisputes] = useState<Record<string, DisputeData | null>>(
    () => seeded.disputes,
  );
  /** Driver-side attachments per job, normalised for listing and download. */
  const [disputeEvidence, setDisputeEvidence] = useState<
    Record<string, EvidenceItem[]>
  >(() => seeded.evidence);
  /** Resubmitted invoices, keyed by job number (R-AC1). */
  const [revisions, setRevisions] = useState<Record<string, RevisedInvoice>>(
    () => seeded.revisions,
  );
  const [openInvoice, setOpenInvoice] = useState<string | null>(null);
  const [disputeSheetFor, setDisputeSheetFor] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const statusOf = (jobNumber: string): InvoiceStatus =>
    statuses[jobNumber] ?? "Pending Review";

  const deadlineOf = (invoice: PilotInvoice) =>
    invoice.submittedAt + reviewWindowMs;

  /* A revised invoice is settled from the web portal, so it takes no part in
     the mobile review window or its auto approval (R-AC3). */
  const pendingCount = invoices.filter(
    (i) => statusOf(i.jobNumber) === "Pending Review" && !revisions[i.jobNumber],
  ).length;

  /* AC9 — tick while anything is pending, auto approve on expiry. */
  useEffect(() => {
    if (pendingCount === 0) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [pendingCount]);

  useEffect(() => {
    const expired = invoices.filter(
      (i) =>
        statusOf(i.jobNumber) === "Pending Review" &&
        !revisions[i.jobNumber] &&
        deadlineOf(i) <= now,
    );
    if (expired.length === 0) return;

    setStatuses((prev) => {
      const next = { ...prev };
      expired.forEach((i) => {
        next[i.jobNumber] = "Payment Completed";
      });
      return next;
    });
    showSnackbar(
      expired.length === 1
        ? `Invoice for job ${expired[0].jobNumber} was automatically approved and paid.`
        : `${expired.length} invoices were automatically approved and paid.`,
      "info",
      5000,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, invoices]);

  /* AC1 / AC7 — arriving from the Home invoice notification widget opens the
     corresponding Invoice Details screen directly. */
  const deepLinkedRef = useRef(false);
  useEffect(() => {
    if (deepLinkedRef.current || !focusInvoiceJobNumber) return;
    if (!invoices.some((i) => i.jobNumber === focusInvoiceJobNumber)) return;
    deepLinkedRef.current = true;
    setOpenInvoice(focusInvoiceJobNumber);
  }, [focusInvoiceJobNumber, invoices]);

  /* R-AC1 — the pilot car party resubmits after a dispute. Timers are tracked
     per job so a second dispute never double-schedules, and so nothing fires
     after the tab unmounts. */
  const revisionTimersRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  useEffect(
    () => () => {
      Object.values(revisionTimersRef.current).forEach(clearTimeout);
      revisionTimersRef.current = {};
    },
    [],
  );

  const scheduleRevision = (jobNumber: string) => {
    const invoice = invoices.find((i) => i.jobNumber === jobNumber);
    if (!invoice || revisionTimersRef.current[jobNumber]) return;

    revisionTimersRef.current[jobNumber] = setTimeout(() => {
      delete revisionTimersRef.current[jobNumber];
      setRevisions((prev) => ({
        ...prev,
        [jobNumber]: buildRevisedInvoice(invoice, Date.now()),
      }));
      // The revised invoice re-enters review (R-AC1).
      setStatuses((prev) => ({ ...prev, [jobNumber]: "Pending Review" }));
      showSnackbar(
        `A revised invoice for job ${jobNumber} is ready to review.`,
        "info",
        5000,
      );
    }, REVISION_DELAY_MS);
  };

  const active = invoices.find((i) => i.jobNumber === openInvoice) ?? null;

  const handleApprove = (jobNumber: string) => {
    setStatuses((prev) => ({ ...prev, [jobNumber]: "Payment Completed" }));
    setOpenInvoice(null);
    showSnackbar(
      `Invoice approved. Payment for job ${jobNumber} is being processed.`,
      "success",
      4000,
    );
  };

  /* ── Empty state ── */
  if (invoices.length === 0) {
    return (
      <div className="px-4 py-14">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#ececec] flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)]">
            <Receipt className="w-7 h-7 text-[#c9ccd1]" aria-hidden />
          </div>
          <p className="text-[15px] font-semibold text-[#101828] mt-4">
            No invoices submitted yet
          </p>
          <p className="text-[13px] text-[#6b7280] mt-1.5 max-w-[280px] leading-relaxed">
            Invoices appear here automatically as soon as a pilot car driver or
            company submits one for this trip.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="px-4 pt-4 pb-1">
        <h2 className="text-[17px] font-bold text-[#101828] leading-tight">
          Invoices
        </h2>
      </div>

      {/* AC6 — company drivers cannot act on any invoice */}
      {role === "company" && pendingCount > 0 && (
        <div className="px-4 pt-3">
          <Notice tone="neutral" icon={Lock}>
            This invoice must be reviewed and approved by your Truck Company
            Administrator.
          </Notice>
        </div>
      )}

      {/* AC2 — one card per submitted invoice */}
      <div className="px-4 py-4 space-y-3">
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.jobNumber}
            invoice={invoice}
            status={statusOf(invoice.jobNumber)}
            revision={revisions[invoice.jobNumber]}
            displayCurrency={payerCurrency}
            onViewDetails={() => setOpenInvoice(invoice.jobNumber)}
          />
        ))}
      </div>

      {/* AC3 — details screen */}
      {active && (
        <InvoiceDetails
          invoice={active}
          status={statusOf(active.jobNumber)}
          revision={revisions[active.jobNumber]}
          remainingMs={Math.max(0, deadlineOf(active) - now)}
          reviewWindowMs={reviewWindowMs}
          userRole={role}
          displayCurrency={payerCurrency}
          dispute={disputes[active.jobNumber]}
          disputeEvidence={disputeEvidence[active.jobNumber] ?? []}
          onBack={() => setOpenInvoice(null)}
          onApprove={() => handleApprove(active.jobNumber)}
          onDispute={() => setDisputeSheetFor(active.jobNumber)}
        />
      )}

      {/* AC10 — dispute workflow */}
      {disputeSheetFor !== null && (
        <RaiseDisputeSheet
          open
          onOpenChange={(open) => {
            if (!open) setDisputeSheetFor(null);
          }}
          jobId={disputeSheetFor}
          onDisputeSubmitted={(data) => {
            const jobNumber = disputeSheetFor;
            setDisputes((prev) => ({ ...prev, [jobNumber]: data }));
            setDisputeEvidence((prev) => ({
              ...prev,
              [jobNumber]: fromFiles(data.evidence, `${jobNumber}-dispute`),
            }));
            setStatuses((prev) => ({
              ...prev,
              [jobNumber]: "Payment Disputed",
            }));
            // The pilot car party reworks the invoice and resubmits (R-AC1).
            scheduleRevision(jobNumber);
          }}
        />
      )}
    </div>
  );
}
