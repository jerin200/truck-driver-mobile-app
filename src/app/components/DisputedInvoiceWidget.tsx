import { ChevronRight } from "lucide-react";

/**
 * Compact Home widget for invoices the driver has disputed. Covers both halves
 * of the lifecycle: waiting on the pilot car party, and the revised invoice
 * they sent back. Tapping a row opens it on the trip's Invoice tab.
 */

export type DisputeStage = "awaiting-revision" | "revised";

export interface DisputedInvoiceSummary {
  tripId: string;
  jobNumber: string;
  invoiceNumber: string;
  pilotDriver: string;
  pilotCompany?: string;
  currency: string;
  /** Amount on the invoice that was disputed. */
  originalAmount: number;
  /** Amount on the resubmitted invoice — set once `stage` is "revised". */
  revisedAmount?: number;
  reason: string;
  /** Epoch ms the dispute was raised. */
  disputedAt: number;
  /** Attachments across the dispute and its revision. */
  evidenceCount: number;
  stage: DisputeStage;
}

interface DisputedInvoiceWidgetProps {
  invoices: DisputedInvoiceSummary[];
  onOpen: (invoice: DisputedInvoiceSummary) => void;
}

const money = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const STAGE_CHIP: Record<DisputeStage, { chip: string; label: string }> = {
  "awaiting-revision": {
    chip: "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
    label: "Disputed",
  },
  revised: {
    chip: "bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]",
    label: "Revised",
  },
};

/** "3d ago" / "6h ago" — how long the dispute has been open. */
function sinceLabel(disputedAt: number): string {
  const hours = Math.floor(Math.max(0, Date.now() - disputedAt) / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function DisputeRow({
  invoice,
  onOpen,
}: {
  invoice: DisputedInvoiceSummary;
  onOpen: () => void;
}) {
  const stage = STAGE_CHIP[invoice.stage];
  const revised = invoice.stage === "revised" && invoice.revisedAmount != null;
  const amount = revised ? invoice.revisedAmount! : invoice.originalAmount;

  return (
    <button
      onClick={onOpen}
      aria-label={`Open ${
        revised ? "revised invoice" : "dispute"
      } for job ${invoice.jobNumber}`}
      className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F89823]"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-[#101828] truncate">
            {invoice.jobNumber}
          </span>
          <span className="text-[11px] text-[#9ca3af] shrink-0">
            {invoice.tripId}
          </span>
          <span
            className={`shrink-0 rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide ${stage.chip}`}
          >
            {stage.label}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[17px] font-bold text-[#101828] tabular-nums leading-tight">
            ${money(amount)}
          </span>
          {revised && (
            <span className="text-[11px] text-[#9ca3af] line-through tabular-nums">
              ${money(invoice.originalAmount)}
            </span>
          )}
        </div>

        <p className="text-[11px] text-[#9ca3af] truncate mt-0.5">
          {invoice.reason} · {sinceLabel(invoice.disputedAt)}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-[#c9ccd1] shrink-0" aria-hidden />
    </button>
  );
}

export default function DisputedInvoiceWidget({
  invoices,
  onOpen,
}: DisputedInvoiceWidgetProps) {
  if (invoices.length === 0) return null;

  const revisedCount = invoices.filter((i) => i.stage === "revised").length;

  return (
    <section
      className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
      aria-label="Disputed invoices"
    >
      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
        <h3 className="text-[13px] font-semibold text-gray-900 flex-1">
          Disputed Invoices
        </h3>
        <span className="text-[11px] text-gray-500">
          {revisedCount > 0 ? `${revisedCount} revised` : "Awaiting revision"}
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {invoices.map((invoice) => (
          <DisputeRow
            key={invoice.jobNumber}
            invoice={invoice}
            onOpen={() => onOpen(invoice)}
          />
        ))}
      </div>
    </section>
  );
}
