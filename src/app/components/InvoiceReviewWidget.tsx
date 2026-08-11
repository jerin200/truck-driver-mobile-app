import { useEffect, useState } from "react";
import { ArrowRight, Building2, Receipt, User } from "lucide-react";

/**
 * Home widget for pilot car invoices awaiting the Truck Driver's review
 * (AC1 / AC7). Presented as a stack of swipeable receipt tickets on a dark
 * action panel; selecting one opens its Invoice Details screen directly.
 */

const ORANGE = "#F89823";
const HOUR_MS = 60 * 60 * 1000;
/** Card surface behind the tickets — the punched notches are filled with it. */
const PANEL = "#ffffff";

export interface PendingInvoiceSummary {
  tripId: string;
  jobNumber: string;
  pilotDriver: string;
  pilotCompany?: string;
  amount: number;
  currency: string;
  /** Epoch ms when the review window closes and auto approval kicks in. */
  autoApproveAt: number;
}

interface InvoiceReviewWidgetProps {
  invoices: PendingInvoiceSummary[];
  onReview: (invoice: PendingInvoiceSummary) => void;
  /** Full review window, used to draw the countdown ring. */
  reviewWindowMs?: number;
}

const money = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function remainingLabel(ms: number): { value: string; unit: string } {
  if (ms <= 0) return { value: "0", unit: "left" };
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  if (hours >= 1) return { value: String(hours), unit: hours === 1 ? "hr" : "hrs" };
  return { value: String(totalMinutes), unit: "min" };
}

/** Circular progress ring showing how much of the review window remains. */
function CountdownRing({
  remainingMs,
  windowMs,
  urgent,
}: {
  remainingMs: number;
  windowMs: number;
  urgent: boolean;
}) {
  const size = 52;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.max(0, Math.min(1, remainingMs / windowMs));
  const { value, unit } = remainingLabel(remainingMs);
  const color = urgent ? "#E11D48" : ORANGE;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value} ${unit} left before automatic approval`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
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
  );
}

/** Receipt-style ticket for a single invoice, with punched side notches. */
function InvoiceTicket({
  invoice,
  now,
  windowMs,
  onReview,
}: {
  invoice: PendingInvoiceSummary;
  now: number;
  windowMs: number;
  onReview: () => void;
}) {
  const remaining = Math.max(0, invoice.autoApproveAt - now);
  const urgent = remaining <= HOUR_MS;

  return (
    <div className="relative shrink-0 w-[268px] snap-start rounded-2xl bg-[#F9FAFB] border border-gray-200 overflow-hidden">
      {/* Top: amount + countdown */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#101828] truncate">
                {invoice.jobNumber}
              </span>
              <span className="shrink-0 rounded-md bg-[#F3F4F6] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#6b7280]">
                {invoice.tripId}
              </span>
            </div>
            <p className="text-[26px] font-bold text-[#101828] tabular-nums leading-tight mt-1.5">
              ${money(invoice.amount)}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af] mt-0.5">
              {invoice.currency} · Total Payable
            </p>
          </div>

          <CountdownRing
            remainingMs={remaining}
            windowMs={windowMs}
            urgent={urgent}
          />
        </div>
      </div>

      {/* Perforation with punched notches */}
      <div className="relative h-0">
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: PANEL }}
          aria-hidden
        />
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: PANEL }}
          aria-hidden
        />
        <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-gray-300" />
      </div>

      {/* Bottom: pilot car party */}
      <div className="px-4 pt-4 pb-3 space-y-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <User className="w-3 h-3 text-[#9ca3af] shrink-0" aria-hidden />
          <span className="text-[12px] font-semibold text-[#101828] truncate">
            {invoice.pilotDriver}
          </span>
        </div>
        {invoice.pilotCompany && (
          <div className="flex items-center gap-1.5 min-w-0">
            <Building2 className="w-3 h-3 text-[#9ca3af] shrink-0" aria-hidden />
            <span className="text-[12px] text-[#6b7280] truncate">
              {invoice.pilotCompany}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={onReview}
        aria-label={`Review invoice for job ${invoice.jobNumber}`}
        className="w-full min-h-[44px] px-4 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#1a1a1a] cursor-pointer transition-[filter] duration-200 hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B45309]"
        style={{ backgroundColor: ORANGE }}
      >
        Review Invoice
        <ArrowRight className="w-3.5 h-3.5" aria-hidden />
      </button>
    </div>
  );
}

export default function InvoiceReviewWidget({
  invoices,
  onReview,
  reviewWindowMs = 24 * HOUR_MS,
}: InvoiceReviewWidgetProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (invoices.length === 0) return;
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, [invoices.length]);

  if (invoices.length === 0) return null;

  const urgentCount = invoices.filter(
    (i) => i.autoApproveAt - now <= HOUR_MS,
  ).length;

  return (
    <section
      className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
      aria-label="Invoices awaiting review"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#FFF3E0] flex items-center justify-center shrink-0">
          <Receipt className="w-4 h-4 text-[#D97706]" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 leading-tight">
            Invoices Awaiting Review
          </h3>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {urgentCount > 0
              ? `${urgentCount} closing within the hour`
              : "Approves automatically when the window closes"}
          </p>
        </div>
        <span
          className="shrink-0 min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center text-xs font-bold text-[#1a1a1a]"
          style={{ backgroundColor: ORANGE }}
        >
          {invoices.length}
        </span>
      </div>

      {/* Swipeable tickets */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {invoices.map((invoice) => (
          <InvoiceTicket
            key={invoice.jobNumber}
            invoice={invoice}
            now={now}
            windowMs={reviewWindowMs}
            onReview={() => onReview(invoice)}
          />
        ))}
      </div>
    </section>
  );
}
