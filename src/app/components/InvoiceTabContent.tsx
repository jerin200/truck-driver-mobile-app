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
  Hash,
  Lock,
  Receipt,
  Timer,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import RaiseDisputeSheet, { DisputeData } from "./RaiseDisputeSheet";
import { useSnackbar } from "../contexts/SnackbarContext";
import { formatDateTimeBullet } from "../utils/dateFormat";

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
  displayCurrency,
  onViewDetails,
}: {
  invoice: PilotInvoice;
  status: InvoiceStatus;
  displayCurrency: string;
  onViewDetails: () => void;
}) {
  const rate = rateFor(invoice.currency, displayCurrency);
  const total = rate ? round2(invoice.total * rate) : invoice.total;

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
          <StatusChip status={status} size="sm" />
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
            <p className="text-[11px] text-[#6b7280]">Total Amount Payable</p>
            <p className="text-[20px] font-bold text-[#101828] tabular-nums leading-tight">
              ${money(total)}
              <span className="text-[12px] font-medium text-[#9ca3af] ml-1">
                {displayCurrency}
              </span>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-center gap-1.5 border-t border-gray-100 bg-[#FAFAFA] text-[14px] font-semibold text-[#101828] cursor-pointer transition-colors duration-200 hover:bg-[#F3F4F6] active:bg-[#ECECEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823] focus-visible:ring-offset-1"
        aria-label={`View details for invoice on job ${invoice.jobNumber}`}
      >
        View Details
        <ChevronRight className="w-4 h-4" aria-hidden />
      </button>
    </div>
  );
}

/* ── Invoice details screen (AC3) ────────────────────────── */

function InvoiceDetails({
  invoice,
  status,
  remainingMs,
  reviewWindowMs,
  userRole,
  displayCurrency,
  dispute,
  onBack,
  onApprove,
  onDispute,
}: {
  invoice: PilotInvoice;
  status: InvoiceStatus;
  remainingMs: number;
  reviewWindowMs: number;
  userRole: "individual" | "company";
  displayCurrency: string;
  dispute?: DisputeData | null;
  onBack: () => void;
  onApprove: () => void;
  onDispute: () => void;
}) {
  const rate = rateFor(invoice.currency, displayCurrency);
  const convert = (n: number) => (rate ? round2(n * rate) : n);

  const canAct = userRole === "individual" && status === "Pending Review";

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
              Invoice Details
            </h1>
            <p className="text-[11px] text-[#6b7280] mt-0.5">
              {invoice.invoiceNumber}
            </p>
          </div>
          <div className="w-11" />
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4 py-4 space-y-4">
          {/* AC8 — remaining review period */}
          {status === "Pending Review" && (
            <CountdownCard
              remainingMs={remainingMs}
              windowMs={reviewWindowMs}
            />
          )}

          {/* AC3 — Invoice Information (read-only) */}
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
              <InfoRow label="Invoice Status">
                <StatusChip status={status} size="sm" />
              </InfoRow>
              <InfoRow
                label="Submitted"
                value={formatDateTimeBullet(new Date(invoice.submittedAt))}
              />
            </div>
          </div>

          {/* AC3 — Invoice Summary */}
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

          {/* AC12 — currency conversion note */}
          {rate && (
            <Notice tone="info" icon={ArrowRightLeft} title="Currency Converted">
              The invoice amount shown in {displayCurrency} is converted from{" "}
              {invoice.currency} using an exchange rate of 1 {invoice.currency} ={" "}
              {rate.toFixed(6)} {displayCurrency}.
              <span className="block mt-1.5 text-[#1E40AF]/70">
                Original invoice total: ${money(invoice.total)}{" "}
                {invoice.currency}
              </span>
            </Notice>
          )}

          {/* Dispute record */}
          {status === "Payment Disputed" && dispute && (
            <div className={CARD}>
              <CardHeading
                icon={AlertTriangle}
                title="Dispute Details"
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
                {dispute.evidence.length > 0 && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                      Evidence
                    </p>
                    <p className="text-[13px] text-[#4a5565] mt-0.5">
                      {dispute.evidence.length} file
                      {dispute.evidence.length === 1 ? "" : "s"} attached
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AC6 — company truck driver read-only message */}
          {userRole === "company" && status === "Pending Review" && (
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

  const [statuses, setStatuses] = useState<Record<string, InvoiceStatus>>({});
  const [disputes, setDisputes] = useState<Record<string, DisputeData | null>>(
    {},
  );
  const [openInvoice, setOpenInvoice] = useState<string | null>(null);
  const [disputeSheetFor, setDisputeSheetFor] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const statusOf = (jobNumber: string): InvoiceStatus =>
    statuses[jobNumber] ?? "Pending Review";

  const deadlineOf = (invoice: PilotInvoice) =>
    invoice.submittedAt + reviewWindowMs;

  const pendingCount = invoices.filter(
    (i) => statusOf(i.jobNumber) === "Pending Review",
  ).length;

  /* AC9 — tick while anything is pending, auto approve on expiry. */
  useEffect(() => {
    if (pendingCount === 0) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [pendingCount]);

  useEffect(() => {
    const expired = invoices.filter(
      (i) => statusOf(i.jobNumber) === "Pending Review" && deadlineOf(i) <= now,
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
          remainingMs={Math.max(0, deadlineOf(active) - now)}
          reviewWindowMs={reviewWindowMs}
          userRole={role}
          displayCurrency={payerCurrency}
          dispute={disputes[active.jobNumber]}
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
            setStatuses((prev) => ({
              ...prev,
              [jobNumber]: "Payment Disputed",
            }));
          }}
        />
      )}
    </div>
  );
}
