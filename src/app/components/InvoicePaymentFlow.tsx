import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Receipt,
  Hash,
  CalendarDays,
  ShieldCheck,
  Percent,
  Landmark,
  CreditCard,
  CheckCircle2,
  Check,
  AlertTriangle,
  Camera,
  FileText,
  Upload,
  X,
  Download,
  Info,
  Sparkles,
  Plus,
} from 'lucide-react';
import { Button } from './ui/button';

/* ────────────────────────────────────────────────────────────
 * Invoice Review & Payment Flow
 * A self-contained, mobile-first flow covering every screen of the
 * post-escort invoice → payment lifecycle for the Truck Driver.
 *
 *   received → review → confirm → success
 *                  └──→ dispute → disputeSubmitted
 *   decision (async) → confirm → success
 * ──────────────────────────────────────────────────────────── */

// ── Brand tokens (mirrors the rest of the app) ──
const ORANGE = '#F89823';
const ORANGE_HOVER = '#e8880d';

type Screen =
  | 'review'
  | 'confirm'
  | 'success'
  | 'dispute'
  | 'disputeSubmitted'
  | 'decision';

export interface InvoiceModel {
  pilotCompany: string;
  invoiceNumber: string;
  tripId: string;
  submittedDate: string;
  currency: string;
  charges: {
    baseEscort: number;
    standby: number;
    layover: number;
    routeChange: number;
  };
  platformFeeRate: number; // e.g. 0.145
  taxRate: number; // e.g. 0.05
  paymentMethod: { brand: string; last4: string; expiry: string };
}

/** Outcome reported back to the caller when the flow is dismissed. */
export type InvoiceOutcome = 'paid' | 'disputed';

export interface InvoicePaymentFlowProps {
  /**
   * Return to the Trips list. Receives the resolved outcome when the user
   * leaves after paying or submitting a dispute; called with no argument when
   * the flow is simply cancelled.
   */
  onClose?: (outcome?: InvoiceOutcome) => void;
  /** Which screen to open on. Handy for previewing individual states. */
  initialScreen?: Screen;
  invoice?: InvoiceModel;
}

const DEFAULT_INVOICE: InvoiceModel = {
  pilotCompany: 'ABC Pilot Services',
  invoiceNumber: 'INV-2026-04812',
  tripId: 'TRP-2026-010',
  submittedDate: 'Jul 3, 2026',
  currency: 'CAD',
  charges: {
    baseEscort: 4500,
    standby: 35,
    layover: 400,
    routeChange: 150,
  },
  platformFeeRate: 0.145,
  taxRate: 0.05,
  paymentMethod: { brand: 'Visa', last4: '4242', expiry: '08/28' },
};

// ── helpers ──
const money = (n: number) =>
  n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** A driver-added line item. `value` is raw input text, parsed to a number for math. */
type CustomCharge = { id: string; label: string; value: string };

let idSeq = 0;
const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `cc-${Date.now()}-${idSeq++}`;

// ============================================================
// Small shared primitives
// ============================================================

type ChipTone = 'pending' | 'review' | 'disputed' | 'resolved' | 'paid';

function StatusChip({ tone, label }: { tone: ChipTone; label: string }) {
  const map: Record<ChipTone, string> = {
    pending: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]',
    review: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    disputed: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]',
    resolved: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    paid: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${map[tone]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

/** Reusable full-screen scaffold: fixed header · scroll body · sticky footer. */
function Scaffold({
  title,
  subtitle,
  onBack,
  right,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
      <div className="flex-none bg-white border-b border-[#e6e3df]">
        <div className="flex items-center h-14 px-3">
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="Back"
              className="w-9 h-9 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <div className="flex-1 text-center px-1">
            <h1 className="text-[16px] font-semibold text-[#101828] leading-tight">{title}</h1>
            {subtitle && <p className="text-[11px] text-[#6b7280] mt-0.5">{subtitle}</p>}
          </div>
          <div className="w-9 flex items-center justify-end">{right}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">{children}</div>

      {footer && (
        <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
          {footer}
        </div>
      )}
    </div>
  );
}

/** A single money row: label (+ optional sub) on the left, amount right. */
function Row({
  label,
  sub,
  amount,
  currency,
  strong,
  muted,
}: {
  label: string;
  sub?: string;
  amount: number;
  currency?: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="min-w-0">
        <p
          className={`text-[13px] ${
            strong ? 'font-semibold text-[#101828]' : muted ? 'text-[#6b7280]' : 'text-[#4a5565]'
          }`}
        >
          {label}
        </p>
        {sub && <p className="text-[11px] text-[#9ca3af] mt-0.5">{sub}</p>}
      </div>
      <p
        className={`shrink-0 tabular-nums ${
          strong ? 'text-[15px] font-bold text-[#101828]' : 'text-[13px] font-semibold text-[#101828]'
        }`}
      >
        ${money(amount)}
        {currency ? <span className="text-[11px] font-medium text-[#9ca3af] ml-1">{currency}</span> : null}
      </p>
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  tint = '#EFF6FF',
  color = '#2563EB',
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
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="text-[14px] font-semibold text-[#101828] flex-1">{title}</h3>
      {right}
    </div>
  );
}

const CARD = 'bg-white rounded-2xl border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden';

// ── Primary / secondary sticky buttons ──
function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-12 rounded-xl font-semibold text-[15px] transition-all active:scale-[0.98] ${
        disabled
          ? 'bg-gray-200 text-gray-400'
          : 'bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] shadow-[0px_4px_14px_0px_rgba(248,152,35,0.30)]'
      }`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-[#1a1a1a]/70 border-t-transparent rounded-full animate-spin mr-2" />
          Processing…
        </>
      ) : (
        children
      )}
    </Button>
  );
}

function SecondaryButton({
  children,
  onClick,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: 'neutral' | 'danger';
}) {
  const cls =
    tone === 'danger'
      ? 'border-[#FECDD3] text-[#E11D48] hover:bg-[#FFF1F2]'
      : 'border-[#e2e2e2] text-[#374151] hover:bg-gray-50';
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`w-full h-12 rounded-xl font-semibold text-[15px] bg-white transition-all active:scale-[0.98] ${cls}`}
    >
      {children}
    </Button>
  );
}

// ── Success illustration (pure CSS/SVG, no assets) ──
function SuccessBurst({ tone = 'green' }: { tone?: 'green' | 'orange' }) {
  const ring = tone === 'green' ? '#BBF7D0' : '#FED7AA';
  const ring2 = tone === 'green' ? '#DCFCE7' : '#FFEDD5';
  const core = tone === 'green' ? '#16A34A' : ORANGE;
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: ring2 }} />
      <span className="absolute inset-2 rounded-full" style={{ backgroundColor: ring2 }} />
      <span className="absolute inset-5 rounded-full" style={{ backgroundColor: ring }} />
      <span
        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: core }}
      >
        <Check className="w-9 h-9 text-white" strokeWidth={3} />
      </span>
      <Sparkles className="absolute -top-1 right-3 w-4 h-4 text-[#F89823]" />
      <Sparkles className="absolute bottom-2 -left-1 w-3 h-3 text-[#F89823] opacity-70" />
    </div>
  );
}

// ── Timeline ──
type TLState = 'done' | 'current' | 'todo';
function Timeline({ steps }: { steps: { label: string; state: TLState; note?: string }[] }) {
  return (
    <div className="px-1">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const dot =
          s.state === 'done'
            ? 'bg-[#16A34A] border-[#16A34A]'
            : s.state === 'current'
            ? 'bg-white border-[#F89823] ring-4 ring-[#FFF3E0]'
            : 'bg-white border-gray-300';
        return (
          <div key={s.label} className="flex gap-3">
            <div className="flex flex-col items-center pt-0.5">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${dot}`}
              >
                {s.state === 'done' && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </span>
              {!last && (
                <span
                  className={`w-px flex-1 my-1 min-h-[26px] ${
                    s.state === 'done' ? 'bg-[#BBF7D0]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <div className={`${last ? '' : 'pb-4'} flex-1`}>
              <p
                className={`text-[13px] leading-tight ${
                  s.state === 'todo' ? 'text-[#9ca3af] font-medium' : 'text-[#101828] font-semibold'
                }`}
              >
                {s.label}
              </p>
              {s.note && <p className="text-[11px] text-[#6b7280] mt-0.5">{s.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Main flow
// ============================================================

export default function InvoicePaymentFlow({
  onClose = () => {},
  initialScreen = 'review',
  invoice = DEFAULT_INVOICE,
}: InvoicePaymentFlowProps) {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [paying, setPaying] = useState(false);

  // Dispute form
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  // Decision preview toggle + payable amount carried into confirm/success
  const [decision, setDecision] = useState<'approved' | 'updated'>('updated');

  // Custom charges the driver can add to the invoice on the Review screen.
  // `value` is kept as raw text so the input stays controllable; parsed for math.
  const [customCharges, setCustomCharges] = useState<CustomCharge[]>([]);

  const addCustomCharge = () =>
    setCustomCharges((c) => [...c, { id: newId(), label: '', value: '' }]);
  const updateCustomCharge = (id: string, patch: Partial<Omit<CustomCharge, 'id'>>) =>
    setCustomCharges((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const removeCustomCharge = (id: string) =>
    setCustomCharges((c) => c.filter((x) => x.id !== id));

  // ── Money math ──
  const m = useMemo(() => {
    const { baseEscort, standby, layover, routeChange } = invoice.charges;
    const customTotal = customCharges.reduce((s, x) => s + (parseFloat(x.value) || 0), 0);
    const pilotTotal = baseEscort + standby + layover + routeChange + customTotal;
    const round2 = (n: number) => Math.round(n * 100) / 100;
    const platformFee = round2(pilotTotal * invoice.platformFeeRate);
    const tax = round2(pilotTotal * invoice.taxRate);
    const overwize = round2(platformFee + tax);
    const total = round2(pilotTotal + overwize);
    return { pilotTotal, customTotal, platformFee, tax, overwize, total };
  }, [invoice, customCharges]);

  // Updated-decision figures (Super Admin reduced pilot standby/route charges).
  const updatedTotal = 5826.58;

  const [amountDue, setAmountDue] = useState(m.total);
  const paymentDate = 'Jul 3, 2026 · 2:14 PM';
  const txnRef = 'OVW-PMT-9F3A21C7';

  const c = invoice.currency;

  // ── helpers to move between screens ──
  const goConfirm = (amount: number) => {
    setAmountDue(amount);
    setScreen('confirm');
  };

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setScreen('success');
    }, 1600);
  };

  const addFiles = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    if (e.target.files) setter((prev) => [...prev, ...Array.from(e.target.files!)]);
    e.target.value = '';
  };

  // ==========================================================
  // SCREEN 1 · Review Invoice
  // ==========================================================
  if (screen === 'review') {
    return (
      <Scaffold
        title="Review Invoice"
        subtitle={`${invoice.invoiceNumber} · ${invoice.pilotCompany}`}
        onBack={onClose}
        footer={
          <div className="flex gap-3">
            <div className="flex-1">
              <SecondaryButton tone="danger" onClick={() => setScreen('dispute')}>
                Dispute
              </SecondaryButton>
            </div>
            <div className="flex-1">
              <PrimaryButton onClick={() => goConfirm(m.total)}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {/* Breakdown */}
          <div className={CARD}>
            <CardHeader
              icon={(p) => <Receipt {...p} className="w-4 h-4 text-[#2563EB]" />}
              title="Invoice Breakdown"
              tint="#EFF6FF"
            />
            <div className="px-4 py-1">
              <Row label="Base Escort Amount" sub="Flat rate" amount={invoice.charges.baseEscort} />
              <div className="border-t border-gray-100" />
              <Row label="Standby Charges" amount={invoice.charges.standby} />
              <div className="border-t border-gray-100" />
              <Row label="Layover Charges" amount={invoice.charges.layover} />
              <div className="border-t border-gray-100" />
              <Row label="Route Change Charges" amount={invoice.charges.routeChange} />

              {customCharges.map((cc) => (
                <div key={cc.id}>
                  <div className="border-t border-gray-100" />
                  <CustomChargeRow
                    charge={cc}
                    currency={c}
                    onChange={(patch) => updateCustomCharge(cc.id, patch)}
                    onRemove={() => removeCustomCharge(cc.id)}
                  />
                </div>
              ))}

              <div className="border-t border-gray-100" />
              <button
                onClick={addCustomCharge}
                className="flex items-center gap-1.5 py-2.5 text-[13px] font-semibold text-[#F89823] hover:text-[#e8880d] active:scale-[0.98] transition-all"
              >
                <span className="w-5 h-5 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5" />
                </span>
                Add custom charge
              </button>
            </div>
            <div className="mx-4 my-1 border-t-2 border-dashed border-gray-200" />
            <div className="px-4 pb-3 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#101828]">Pilot Company Invoice Total</p>
                <p className="text-[16px] font-bold text-[#101828] tabular-nums">
                  ${money(m.pilotTotal)}
                  <span className="text-[11px] font-medium text-[#9ca3af] ml-1">{c}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Overwize charges — visually differentiated (orange) */}
          <div className="bg-[#FFFBF5] rounded-2xl border border-[#FCE3C4] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#FCE3C4] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FFF3E0] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-[#101828]">Overwize Charges</h3>
                <p className="text-[11px] text-[#B45309]">Payable in addition to the pilot invoice</p>
              </div>
            </div>
            <div className="px-4 py-1">
              <Row
                label="Platform Fee"
                sub={`${(invoice.platformFeeRate * 100).toFixed(1)}% of pilot invoice`}
                amount={m.platformFee}
              />
              <div className="border-t border-[#FCE3C4]" />
              <Row
                label="Taxes"
                sub={`${(invoice.taxRate * 100).toFixed(0)}%`}
                amount={m.tax}
              />
            </div>
          </div>

          {/* Highlight summary */}
          <div className="rounded-2xl overflow-hidden bg-white border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)]">
            <div className="px-4 pt-4 pb-3 space-y-0.5">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-[#4a5565]">Pilot Company Invoice</span>
                <span className="text-[13px] font-semibold text-[#101828] tabular-nums">${money(m.pilotTotal)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-[#4a5565]">Overwize Charges</span>
                <span className="text-[13px] font-semibold text-[#101828] tabular-nums">${money(m.overwize)}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/60 uppercase tracking-wider">Total Amount Payable</p>
                <p className="text-[10px] text-white/40 mt-0.5">Incl. platform fee &amp; taxes</p>
              </div>
              <p className="text-[26px] font-bold text-white tabular-nums">
                ${money(m.total)}
                <span className="text-[12px] font-medium text-white/50 ml-1">{c}</span>
              </p>
            </div>
          </div>
        </div>
      </Scaffold>
    );
  }

  // ==========================================================
  // SCREEN 3 · Confirm Payment
  // ==========================================================
  if (screen === 'confirm') {
    return (
      <Scaffold
        title="Confirm Payment"
        onBack={() => setScreen(amountDue === updatedTotal ? 'decision' : 'review')}
        footer={
          <PrimaryButton onClick={pay} loading={paying}>
            Pay ${money(amountDue)} {c}
          </PrimaryButton>
        }
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {/* Payment summary */}
          <div className={CARD}>
            <CardHeader
              icon={(p) => <Receipt {...p} className="w-4 h-4 text-[#2563EB]" />}
              title="Payment Summary"
              tint="#EFF6FF"
            />
            <div className="px-4 py-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-[13px] text-[#4a5565]">Pilot Company</span>
                <span className="text-[13px] font-semibold text-[#101828]">{invoice.pilotCompany}</span>
              </div>
              <div className="border-t border-gray-100" />
              <Row label="Pilot Invoice" amount={m.pilotTotal} />
              <div className="border-t border-gray-100" />
              <Row label="Platform Fee" sub={`${(invoice.platformFeeRate * 100).toFixed(1)}%`} amount={m.platformFee} />
              <div className="border-t border-gray-100" />
              <Row label="Taxes" sub={`${(invoice.taxRate * 100).toFixed(0)}%`} amount={m.tax} />
            </div>
            <div className="bg-[#FFF8F0] border-t border-[#FCE3C4] px-4 py-3.5 flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#101828]">Total Payment</span>
              <span className="text-[20px] font-bold text-[#101828] tabular-nums">
                ${money(amountDue)}
                <span className="text-[12px] font-medium text-[#9ca3af] ml-1">{c}</span>
              </span>
            </div>
          </div>

          {/* Payment method */}
          <div className={CARD}>
            <CardHeader
              icon={(p) => <CreditCard {...p} className="w-4 h-4 text-[#7c3aed]" />}
              title="Payment Method"
              tint="#F5F3FF"
            />
            <div className="p-4">
              <div className="flex items-center gap-3 rounded-xl border-2 border-[#F89823] bg-[#FFFBF5] px-3.5 py-3">
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#1a1f71] to-[#2b3a8f] flex items-center justify-center shrink-0">
                  <span className="text-white text-[11px] font-bold italic tracking-tight">VISA</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#101828]">
                    {invoice.paymentMethod.brand} •••• {invoice.paymentMethod.last4}
                  </p>
                  <p className="text-[11px] text-[#6b7280]">Expires {invoice.paymentMethod.expiry}</p>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#F89823] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              </div>
              <button className="mt-3 w-full h-10 rounded-xl border border-dashed border-gray-300 text-[13px] font-semibold text-[#4a5565] hover:bg-gray-50 active:scale-[0.99] transition-all">
                Change Payment Method
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 px-1">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#6b7280] leading-relaxed">
              Payments are encrypted and processed securely. Funds are released to{' '}
              {invoice.pilotCompany} once the transaction settles.
            </p>
          </div>
        </div>
      </Scaffold>
    );
  }

  // ==========================================================
  // SCREEN 4 · Payment Successful
  // ==========================================================
  if (screen === 'success') {
    return (
      <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center">
            <SuccessBurst tone="green" />
            <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Payment Successful</h1>
            <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[280px]">
              Your payment to {invoice.pilotCompany} has been processed. A receipt has been sent to
              your email.
            </p>
          </div>

          <div className="px-4 pb-6">
            <div className={CARD}>
              <div className="px-4 py-1 divide-y divide-gray-100">
                <DetailRow icon={Hash} label="Invoice Number" value={invoice.invoiceNumber} mono />
                <div className="flex items-center justify-between py-3">
                  <span className="text-[13px] text-[#4a5565]">Amount Paid</span>
                  <span className="text-[15px] font-bold text-[#16A34A] tabular-nums">
                    ${money(amountDue)} <span className="text-[11px] font-medium text-[#9ca3af]">{c}</span>
                  </span>
                </div>
                <DetailRow icon={CalendarDays} label="Payment Date" value={paymentDate} />
                <DetailRow icon={ShieldCheck} label="Transaction Ref" value={txnRef} mono />
              </div>
              <div className="bg-[#F0FDF4] border-t border-[#BBF7D0] px-4 py-2.5 flex items-center gap-2">
                <StatusChip tone="paid" label="Paid" />
                <span className="text-[11px] text-[#15803D]">Settlement in progress · 1–2 business days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom space-y-2.5">
          <SecondaryButton onClick={() => {}}>
            <Download className="w-4 h-4 mr-1.5" />
            View Receipt
          </SecondaryButton>
          <PrimaryButton onClick={() => onClose('paid')}>Back to Trips</PrimaryButton>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SCREEN 3A · Raise Invoice Dispute
  // ==========================================================
  if (screen === 'dispute') {
    const canSubmit = reason.trim().length >= 10;
    return (
      <Scaffold
        title="Raise Invoice Dispute"
        subtitle={invoice.invoiceNumber}
        onBack={() => setScreen('review')}
        footer={
          <div className="flex gap-3">
            <div className="flex-1">
              <SecondaryButton onClick={() => setScreen('review')}>Cancel</SecondaryButton>
            </div>
            <div className="flex-1">
              <PrimaryButton disabled={!canSubmit} onClick={() => setScreen('disputeSubmitted')}>
                Submit Dispute
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <div className="flex items-start gap-2.5 bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#9F1239] leading-relaxed">
              Raising a dispute places this invoice on hold. Super Admin will review your reasons and
              may adjust the invoice before payment.
            </p>
          </div>

          {/* Reason */}
          <div className={CARD}>
            <CardHeader
              icon={(p) => <FileText {...p} className="w-4 h-4 text-[#E11D48]" />}
              title="Reason for Dispute"
              tint="#FFF1F2"
              right={<span className="text-[11px] font-semibold text-[#E11D48]">Required</span>}
            />
            <div className="p-4 space-y-3">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe why you disagree with this invoice…"
                maxLength={600}
                className="w-full min-h-[128px] resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[14px] text-[#101828] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#F89823]/40 focus:border-[#F89823]"
              />
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#9ca3af]">Minimum 10 characters</p>
                <p className="text-[11px] text-[#9ca3af] tabular-nums">{reason.length}/600</p>
              </div>

              {/* Example prompts */}
              <div>
                <p className="text-[11px] font-semibold text-[#6b7280] mb-2">Common reasons — tap to use</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Waiting charges are incorrect.',
                    'Route change was not approved.',
                    'Layover duration is inaccurate.',
                    'Incorrect invoice amount.',
                  ].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setReason((r) => (r ? r + ' ' + ex : ex))}
                      className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[12px] text-[#4a5565] hover:border-[#F89823] hover:text-[#101828] active:scale-95 transition-all"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className={CARD}>
            <CardHeader
              icon={(p) => <Upload {...p} className="w-4 h-4 text-[#2563EB]" />}
              title="Supporting Evidence"
              tint="#EFF6FF"
              right={<span className="text-[11px] font-medium text-[#9ca3af]">Optional</span>}
            />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <UploadTile icon={Camera} label="Upload Photos" onChange={(e) => addFiles(e, setPhotos)} accept="image/*" />
                <UploadTile icon={FileText} label="Upload Documents" onChange={(e) => addFiles(e, setDocuments)} accept="application/pdf" />
              </div>

              {[...photos, ...documents].length > 0 && (
                <div className="space-y-2">
                  {photos.map((f, i) => (
                    <FilePill key={'p' + i} file={f} icon={Camera} onRemove={() => setPhotos((p) => p.filter((_, x) => x !== i))} />
                  ))}
                  {documents.map((f, i) => (
                    <FilePill key={'d' + i} file={f} icon={FileText} onRemove={() => setDocuments((p) => p.filter((_, x) => x !== i))} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Scaffold>
    );
  }

  // ==========================================================
  // SCREEN 4A · Dispute Submitted
  // ==========================================================
  if (screen === 'disputeSubmitted') {
    return (
      <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-4 flex flex-col items-center text-center">
            <SuccessBurst tone="orange" />
            <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Invoice Dispute Submitted</h1>
            <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[300px]">
              Your dispute has been submitted successfully. The invoice has been placed on hold while
              Super Admin reviews it.
            </p>
          </div>

          <div className="px-4 pb-6 space-y-4">
            <div className="flex items-center gap-2 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl px-4 py-3">
              <StatusChip tone="disputed" label="On Hold" />
              <span className="text-[12px] text-[#B45309]">Payment paused pending decision</span>
            </div>

            <div className={CARD}>
              <CardHeader
                icon={(p) => <Info {...p} className="w-4 h-4 text-[#2563EB]" />}
                title="Dispute Progress"
                tint="#EFF6FF"
              />
              <div className="px-4 py-4">
                <Timeline
                  steps={[
                    { label: 'Invoice Submitted', state: 'done', note: invoice.submittedDate },
                    { label: 'Invoice Reviewed', state: 'done', note: 'By you' },
                    { label: 'Dispute Submitted', state: 'done', note: 'Just now' },
                    { label: 'Super Admin Review', state: 'current', note: 'In progress' },
                    { label: 'Decision Pending', state: 'todo' },
                    { label: 'Payment', state: 'todo' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
          <PrimaryButton onClick={() => onClose('disputed')}>Back to Trip</PrimaryButton>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SCREEN 5 · Invoice Decision Available
  // ==========================================================
  if (screen === 'decision') {
    const approved = decision === 'approved';
    return (
      <Scaffold
        title="Invoice Decision"
        onBack={onClose}
        right={<StatusChip tone="resolved" label="Resolved" />}
        footer={
          <PrimaryButton onClick={() => goConfirm(approved ? m.total : updatedTotal)}>
            Review &amp; Pay
            <ChevronRight className="w-4 h-4 ml-1" />
          </PrimaryButton>
        }
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {/* Preview toggle (demo only — real app receives one outcome) */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
            {(['updated', 'approved'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setDecision(k)}
                className={`flex-1 h-8 rounded-lg text-[12px] font-semibold transition-all ${
                  decision === k ? 'bg-white text-[#101828] shadow-sm' : 'text-[#6b7280]'
                }`}
              >
                {k === 'updated' ? 'Invoice Updated' : 'Invoice Approved'}
              </button>
            ))}
          </div>

          {approved ? (
            <>
              <div className="rounded-2xl overflow-hidden bg-white border border-[#BBF7D0] shadow-[0px_1px_3px_0px_rgba(22,163,74,0.10)]">
                <div className="h-1.5 bg-gradient-to-r from-[#16A34A] to-[#4ADE80]" />
                <div className="p-5 flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#15803D]">Invoice Approved</p>
                    <p className="text-[12px] text-[#6b7280] mt-0.5">
                      Super Admin reviewed your dispute. No changes were made to the invoice.
                    </p>
                  </div>
                </div>
                <div className="bg-[#111827] px-4 py-4 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">Amount Payable</span>
                  <span className="text-[24px] font-bold text-white tabular-nums">
                    ${money(m.total)} <span className="text-[12px] text-white/50">{c}</span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-2xl overflow-hidden bg-white border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)]">
                <div className="h-1.5 bg-gradient-to-r from-[#F89823] to-[#F5761F]" />
                <div className="p-5 flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#101828]">Invoice Updated</p>
                    <p className="text-[12px] text-[#6b7280] mt-0.5">
                      Super Admin adjusted the invoice after reviewing your dispute.
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 border border-gray-100 px-3.5 py-3">
                    <p className="text-[11px] text-[#9ca3af]">Previous Total</p>
                    <p className="text-[16px] font-semibold text-[#9ca3af] line-through tabular-nums mt-0.5">
                      ${money(m.total)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-3">
                    <p className="text-[11px] text-[#15803D]">Updated Total</p>
                    <p className="text-[16px] font-bold text-[#16A34A] tabular-nums mt-0.5">
                      ${money(updatedTotal)}
                    </p>
                  </div>
                </div>
                <div className="mx-4 mb-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-2 text-center">
                  <span className="text-[12px] font-semibold text-[#15803D]">
                    You save ${money(m.total - updatedTotal)} {c}
                  </span>
                </div>
              </div>

              {/* Decision notes */}
              <div className={CARD}>
                <CardHeader
                  icon={(p) => <FileText {...p} className="w-4 h-4 text-[#7c3aed]" />}
                  title="Decision Notes"
                  tint="#F5F3FF"
                />
                <div className="p-4">
                  <div className="rounded-xl bg-gray-50 border border-gray-100 px-3.5 py-3">
                    <p className="text-[13px] text-[#374151] leading-relaxed">
                      “Route change charge of $150.00 was removed as no approval was on file. Standby
                      reduced by $100.00 to reflect the documented wait time. All other charges
                      verified as accurate.”
                    </p>
                    <p className="text-[11px] text-[#9ca3af] mt-2.5">— Overwize Super Admin · {invoice.submittedDate}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Scaffold>
    );
  }

  return null;
}

// ============================================================
// Leaf components
// ============================================================

function DetailRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="flex items-center gap-2 text-[13px] text-[#4a5565]">
        {Icon && <Icon className="w-4 h-4 text-[#9ca3af]" />}
        {label}
      </span>
      <span className={`text-[13px] font-semibold text-[#101828] ${mono ? 'tabular-nums' : ''}`}>{value}</span>
    </div>
  );
}

function CustomChargeRow({
  charge,
  currency,
  onChange,
  onRemove,
}: {
  charge: CustomCharge;
  currency?: string;
  onChange: (patch: Partial<Omit<CustomCharge, 'id'>>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 py-2">
      <input
        value={charge.label}
        onChange={(e) => onChange({ label: e.target.value })}
        placeholder="Charge description"
        maxLength={40}
        className="flex-1 min-w-0 bg-transparent text-[13px] text-[#101828] placeholder:text-[#9ca3af] focus:outline-none"
      />
      <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 shrink-0 focus-within:border-[#F89823] focus-within:ring-2 focus-within:ring-[#F89823]/30 transition-all">
        <span className="text-[13px] text-[#9ca3af]">$</span>
        <input
          inputMode="decimal"
          value={charge.value}
          onChange={(e) => onChange({ value: e.target.value.replace(/[^0-9.]/g, '') })}
          placeholder="0.00"
          className="w-16 bg-transparent text-right text-[13px] font-semibold text-[#101828] tabular-nums placeholder:text-[#9ca3af] focus:outline-none"
        />
        {currency ? <span className="text-[10px] font-medium text-[#9ca3af]">{currency}</span> : null}
      </div>
      <button
        onClick={onRemove}
        aria-label="Remove charge"
        className="w-7 h-7 rounded-full flex items-center justify-center text-[#9ca3af] hover:bg-[#FFF1F2] hover:text-[#E11D48] active:scale-95 transition-all shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function UploadTile({
  icon: Icon,
  label,
  onChange,
  accept,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}) {
  return (
    <label className="flex flex-col items-center justify-center gap-1.5 h-24 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#F89823] hover:bg-[#FFFBF5] cursor-pointer transition-all active:scale-[0.98]">
      <Icon className="w-5 h-5 text-[#9ca3af]" />
      <span className="text-[12px] font-semibold text-[#4a5565]">{label}</span>
      <input type="file" accept={accept} multiple onChange={onChange} className="hidden" />
    </label>
  );
}

function FilePill({
  file,
  icon: Icon,
  onRemove,
}: {
  file: File;
  icon: React.ComponentType<{ className?: string }>;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
      <Icon className="w-4 h-4 text-[#2563EB] shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#101828] truncate">{file.name}</p>
        <p className="text-[11px] text-[#9ca3af]">{(file.size / 1024).toFixed(0)} KB</p>
      </div>
      <button onClick={onRemove} className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
        <X className="w-4 h-4 text-[#9ca3af]" />
      </button>
    </div>
  );
}
