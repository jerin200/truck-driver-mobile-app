import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronUp,
  Bell,
  Truck,
  Gauge,
  Camera,
  ShieldCheck,
  Receipt,
  Hash,
  CalendarDays,
  Check,
  XCircle,
  FileText,
  Upload,
  X,
  Download,
  Sparkles,
  RefreshCcw,
  Timer,
  Info,
} from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/* ────────────────────────────────────────────────────────────
 * Convoy Job Flow — embedded in the Live Tracking screen.
 *
 * Renders on top of LiveMapDriving:
 *   (idle, live map visible) → Pilot Car Ready notification →
 *   Job Confirmation → Payment Authorization Hold → (idle, back to
 *   live map) → Invoice Ready notification → Invoice Review (24h
 *   window) → Approve | Dispute → Dispute Submitted → (idle) →
 *   Revised Invoice Ready notification → Revised Invoice Review
 *   (24h window) → Approve → Payment Captured
 *
 * While `step === 'idle'` this component paints nothing but the
 * occasional notification banner, so the live map underneath stays
 * visible and interactive. Any other step takes over the full
 * viewport (absolute, within the map's own relative container).
 * ──────────────────────────────────────────────────────────── */

const ORANGE = '#F89823';
const DAY_MS = 24 * 60 * 60 * 1000;

type Step =
  | 'idle'
  | 'invoiceReview'
  | 'raiseDispute'
  | 'disputeSubmitted'
  | 'revisedInvoiceReview'
  | 'invoiceApproved'
  | 'paymentCaptured'
  | 'jobDeclined';

type NotificationKind = 'pilotCarReady' | 'invoiceReady' | 'revisedInvoiceReady' | null;

export interface ConvoyJobFlowProps {
  /** Called when the driver taps "Back to Trips" after payment is captured, or dismisses a decline ack. */
  onExitToTrip?: () => void;
  /** Review window for invoice decisions. Defaults to a real 24 hours. */
  reviewWindowMs?: number;
}

// ── Mock data ──
const JOB = {
  number: 'CJ-10254',
  pilotCompany: 'ABC Pilot Services',
  pilotDriverName: 'Marcus Bennett',
  pricingType: 'Per Mile',
  ratePerMile: 6.5,
  jobAmount: 2500.0,
  bufferPercent: 8,
  currency: 'CAD',
  odometerReading: '48,213 mi',
  totalMiles: 342,
};

const bufferAmount = Math.round(JOB.jobAmount * (JOB.bufferPercent / 100) * 100) / 100;
const holdAmount = Math.round((JOB.jobAmount + bufferAmount) * 100) / 100;

const INVOICE = {
  number: 'INV-2026-5502',
  mileage: `${JOB.totalMiles} mi`,
  standbyHours: '1.2 hrs',
  jobFee: 500.0,
  cardProcessingRate: 0.029,
  cardProcessingFixed: 0.3,
  platformFeeRate: 0.08,
};
const round2 = (n: number) => Math.round(n * 100) / 100;
const cardProcessingFee = round2(INVOICE.jobFee * INVOICE.cardProcessingRate + INVOICE.cardProcessingFixed);
const platformFee = round2(INVOICE.jobFee * INVOICE.platformFeeRate);
const invoiceTotal = round2(INVOICE.jobFee + cardProcessingFee + platformFee);

// Revised invoice after a successful dispute — pilot company reduces the job fee.
const REVISED_JOB_FEE = 450.0;
const revisedCardProcessingFee = round2(REVISED_JOB_FEE * INVOICE.cardProcessingRate + INVOICE.cardProcessingFixed);
const revisedPlatformFee = round2(REVISED_JOB_FEE * INVOICE.platformFeeRate);
const revisedTotal = round2(REVISED_JOB_FEE + revisedCardProcessingFee + revisedPlatformFee);
const REVISED_CHARGES = [
  { label: 'Job Fee', sub: undefined as string | undefined, amount: REVISED_JOB_FEE, previousAmount: INVOICE.jobFee as number | undefined },
  { label: 'Card Processing Fee', sub: undefined as string | undefined, amount: revisedCardProcessingFee, previousAmount: cardProcessingFee as number | undefined },
  { label: 'Overwize Platform Fee (8%)', sub: undefined as string | undefined, amount: revisedPlatformFee, previousAmount: platformFee as number | undefined },
];

const DISPUTE_REASONS = [
  'Standby hours overstated',
  'Incorrect mileage calculation',
  'Unapproved additional charges',
  'Route change was not approved',
  'Other',
];

// ── helpers ──
const money = (n: number) =>
  n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0s';
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`;
  return `${s}s`;
}

/** Runs a live countdown from `startAt + windowMs`; fires onExpire once if not resolved first. */
function useExpiringCountdown(
  startAt: number | null,
  windowMs: number,
  resolved: boolean,
  onExpire: () => void,
) {
  const [remaining, setRemaining] = useState(windowMs);
  const firedRef = useRef(false);

  useEffect(() => {
    if (startAt == null || resolved) return;
    firedRef.current = false;
    const deadline = startAt + windowMs;
    const tick = () => {
      const rem = Math.max(0, deadline - Date.now());
      setRemaining(rem);
      if (rem <= 0 && !firedRef.current) {
        firedRef.current = true;
        onExpire();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAt, resolved, windowMs]);

  return remaining;
}

// ============================================================
// Small shared primitives (mirrors InvoicePaymentFlow styling)
// ============================================================

type ChipTone = 'hold' | 'review' | 'disputed' | 'approved' | 'paid';

function StatusChip({ tone, label }: { tone: ChipTone; label: string }) {
  const map: Record<ChipTone, string> = {
    hold: 'bg-[#FFF3E0] text-[#B45309] border-[#FCE3C4]',
    review: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    disputed: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]',
    approved: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    paid: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${map[tone]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

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
          <div className="min-w-9 flex items-center justify-end">{right}</div>
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
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: tint }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <h3 className="text-[14px] font-semibold text-[#101828] flex-1">{title}</h3>
      {right}
    </div>
  );
}

const CARD = 'bg-white rounded-2xl border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden';

function InfoRow({ label, value, mono, strong }: { label: string; value: string; mono?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 gap-3">
      <span className="text-[13px] text-[#6b7280] shrink-0">{label}</span>
      <span className={`text-[13px] text-right ${strong ? 'font-bold text-[#101828] text-[15px]' : 'font-semibold text-[#101828]'} ${mono ? 'tabular-nums' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function MoneyRow({
  label,
  sub,
  amount,
  strong,
  showPlus,
  infoIcon,
}: {
  label: string;
  sub?: string;
  amount: number;
  strong?: boolean;
  showPlus?: boolean;
  infoIcon?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className={`flex items-center gap-1 text-[13px] ${strong ? 'font-semibold text-[#101828]' : 'text-[#4a5565]'}`}>
          {label}
          {infoIcon && <Info className="w-3 h-3 text-gray-300 shrink-0" />}
        </p>
        {sub && <p className="text-[11px] text-[#9ca3af] mt-0.5">{sub}</p>}
      </div>
      <p className={`shrink-0 tabular-nums ${strong ? 'text-[15px] font-bold text-[#101828]' : 'text-[13px] font-semibold text-[#101828]'}`}>
        {showPlus ? '+' : ''}${money(amount)}
      </p>
    </div>
  );
}

function ChargeDiffRow({ label, sub, amount, previousAmount }: { label: string; sub?: string; amount: number; previousAmount?: number }) {
  const changed = previousAmount !== undefined && previousAmount !== amount;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className="text-[13px] text-[#4a5565]">{label}</p>
        {sub && <p className="text-[11px] text-[#9ca3af] mt-0.5">{sub}</p>}
      </div>
      <div className="text-right shrink-0">
        {changed && <p className="text-[11px] text-[#9ca3af] line-through tabular-nums">${money(previousAmount as number)}</p>}
        <p className={`text-[13px] font-semibold tabular-nums ${changed ? 'text-[#16A34A]' : 'text-[#101828]'}`}>${money(amount)}</p>
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  size = 'default',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'default' | 'sm';
}) {
  const sizeCls = size === 'sm' ? 'h-9 text-[13px]' : 'h-12 text-[15px]';
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${sizeCls} rounded-[6px] font-semibold transition-all active:scale-[0.98] ${
        disabled
          ? 'bg-gray-200 text-gray-400'
          : 'bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] shadow-[0px_4px_14px_0px_rgba(248,152,35,0.30)]'
      }`}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({
  children,
  onClick,
  tone = 'neutral',
  disabled,
  size = 'default',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: 'neutral' | 'danger';
  disabled?: boolean;
  size?: 'default' | 'sm';
}) {
  const cls =
    tone === 'danger'
      ? 'border-[#FECDD3] text-[#E11D48] hover:bg-[#FFF1F2]'
      : 'border-[#e2e2e2] text-[#374151] hover:bg-gray-50';
  const sizeCls = size === 'sm' ? 'h-9 text-[13px]' : 'h-12 text-[15px]';
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      className={`w-full ${sizeCls} rounded-[6px] font-semibold bg-white transition-all active:scale-[0.98] disabled:opacity-40 ${cls}`}
    >
      {children}
    </Button>
  );
}

function SuccessBurst({ tone = 'green' }: { tone?: 'green' | 'orange' }) {
  const ring = tone === 'green' ? '#BBF7D0' : '#FED7AA';
  const ring2 = tone === 'green' ? '#DCFCE7' : '#FFEDD5';
  const core = tone === 'green' ? '#16A34A' : ORANGE;
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: ring2 }} />
      <span className="absolute inset-2 rounded-full" style={{ backgroundColor: ring2 }} />
      <span className="absolute inset-5 rounded-full" style={{ backgroundColor: ring }} />
      <span className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: core }}>
        <Check className="w-9 h-9 text-white" strokeWidth={3} />
      </span>
      <Sparkles className="absolute -top-1 right-3 w-4 h-4 text-[#F89823]" />
      <Sparkles className="absolute bottom-2 -left-1 w-3 h-3 text-[#F89823] opacity-70" />
    </div>
  );
}

function CountdownCard({ remainingMs }: { remainingMs: number }) {
  const urgent = remainingMs <= 60 * 60 * 1000;
  return (
    <div
      className={`rounded-[6px] bg-white border border-gray-100 border-l-4 px-4 py-3.5 flex items-center gap-3 shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] ${
        urgent ? 'border-l-[#E11D48]' : 'border-l-[#F89823]'
      }`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${urgent ? 'bg-[#FFF1F2]' : 'bg-[#FFF3E0]'}`}>
        <Timer className={`w-4 h-4 ${urgent ? 'text-[#E11D48]' : 'text-[#D97706]'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-[#6b7280] leading-tight">Automatically approves in</p>
        <p className={`text-[19px] font-bold tabular-nums leading-tight mt-0.5 ${urgent ? 'text-[#E11D48]' : 'text-[#101828]'}`}>
          {formatCountdown(remainingMs)}
        </p>
      </div>
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
    <label className="flex flex-col items-center justify-center gap-1.5 h-24 rounded-[6px] border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#F89823] hover:bg-[#FFFBF5] cursor-pointer transition-all active:scale-[0.98]">
      <Icon className="w-5 h-5 text-[#9ca3af]" />
      <span className="text-[12px] font-semibold text-[#4a5565]">{label}</span>
      <input type="file" accept={accept} multiple onChange={onChange} className="hidden" />
    </label>
  );
}

function FilePill({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
      {file.type.startsWith('image/') ? (
        <Camera className="w-4 h-4 text-[#2563EB] shrink-0" />
      ) : (
        <FileText className="w-4 h-4 text-[#E11D48] shrink-0" />
      )}
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

// ============================================================
// Main flow
// ============================================================

export default function ConvoyJobFlow({ onExitToTrip = () => {}, reviewWindowMs = DAY_MS }: ConvoyJobFlowProps) {
  const [step, setStep] = useState<Step>('idle');

  const [notification, setNotification] = useState<NotificationKind>(null);
  const [notifCollapsed, setNotifCollapsed] = useState(false);
  const [declinedOnce, setDeclinedOnce] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 8000);
  };
  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const [convoyConfirmedAt, setConvoyConfirmedAt] = useState<number | null>(null);
  const [invoiceReadyAt, setInvoiceReadyAt] = useState<number | null>(null);
  const [invoiceOutcome, setInvoiceOutcome] = useState<'pending' | 'approved' | 'disputed'>('pending');
  const [approvedAuto, setApprovedAuto] = useState(false);
  const [approvalSource, setApprovalSource] = useState<'original' | 'revised'>('original');

  const [disputeSubmittedAt, setDisputeSubmittedAt] = useState<number | null>(null);
  const [revisedInvoiceReadyAt, setRevisedInvoiceReadyAt] = useState<number | null>(null);
  const [revisedOutcome, setRevisedOutcome] = useState<'pending' | 'approved'>('pending');

  const [capturedAt, setCapturedAt] = useState<Date | null>(null);

  // Dispute form
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeComments, setDisputeComments] = useState('');
  const [disputeEvidence, setDisputeEvidence] = useState<File[]>([]);

  // ── Pilot car starts the job shortly after the driver opens Live Tracking ──
  useEffect(() => {
    const t = setTimeout(() => setNotification('pilotCarReady'), 4000);
    return () => clearTimeout(t);
  }, []);

  // ── Background notification scheduling — independent of which screen is mounted ──
  useEffect(() => {
    if (convoyConfirmedAt == null) return;
    const t = setTimeout(() => {
      setInvoiceReadyAt(Date.now());
      setNotification('invoiceReady');
    }, 9000);
    return () => clearTimeout(t);
  }, [convoyConfirmedAt]);

  useEffect(() => {
    if (disputeSubmittedAt == null) return;
    const t = setTimeout(() => {
      setRevisedInvoiceReadyAt(Date.now());
      setNotification('revisedInvoiceReady');
    }, 6000);
    return () => clearTimeout(t);
  }, [disputeSubmittedAt]);

  useEffect(() => {
    if (step === 'paymentCaptured' && !capturedAt) setCapturedAt(new Date());
  }, [step, capturedAt]);

  // ── Review-window countdowns — run regardless of navigation, auto-approve on expiry ──
  const invoiceCountdown = useExpiringCountdown(invoiceReadyAt, reviewWindowMs, invoiceOutcome !== 'pending', () => {
    setApprovedAuto(true);
    setApprovalSource('original');
    setInvoiceOutcome('approved');
    setStep('invoiceApproved');
  });

  const revisedCountdown = useExpiringCountdown(revisedInvoiceReadyAt, reviewWindowMs, revisedOutcome !== 'pending', () => {
    setApprovedAuto(true);
    setApprovalSource('revised');
    setRevisedOutcome('approved');
    setStep('invoiceApproved');
  });

  const capturedAmount = approvalSource === 'revised' ? revisedTotal : invoiceTotal;
  const txnRef = useMemo(() => 'OVW-PMT-' + Math.random().toString(16).slice(2, 10).toUpperCase(), []);

  const openNotification = (kind: NotificationKind) => {
    setNotification(kind);
    setNotifCollapsed(false);
  };

  const addEvidence = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setDisputeEvidence((prev) => [...prev, ...Array.from(e.target.files!)]);
    e.target.value = '';
  };

  const canSubmitDispute = !!disputeReason && disputeComments.trim().length >= 10;

  // ==========================================================
  // Notification overlay (renders on top of the live map when idle)
  // ==========================================================
  const notificationOverlay = notification && (
    <>
      {!notifCollapsed && (
        <>
          <div
            className="absolute inset-0 bg-black/40 z-40 animate-in fade-in duration-200"
            onClick={() => setNotifCollapsed(true)}
          />
          <div className="absolute inset-x-3 top-3 z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* <div className="flex items-center gap-2 px-4 pt-3">
                <div className="w-5 h-5 rounded-md bg-[#F89823] flex items-center justify-center shrink-0">
                  <Truck className="w-3 h-3 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide flex-1">
                  Overwize Connect · now
                </span>
                <button
                  onClick={() => setNotifCollapsed(true)}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100"
                  aria-label="Minimize"
                >
                  <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div> */}

              <div className="px-4 pt-4 pb-4">
                {notification === 'pilotCarReady' && (
                  <>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Bell className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#101828] leading-tight">Pilot Car Ready to Start</p>
                        <p className="text-[13px] text-[#4a5565] mt-1 leading-relaxed">
                          The Pilot Car Driver has started the job. Please confirm to begin the convoy.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[6px] border border-gray-200 bg-gray-50 px-3.5 py-3 mb-3 space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-[#6b7280]">Job Number</span>
                        <span className="text-[13px] font-semibold text-[#101828]">#{JOB.number}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-[#6b7280]">Pilot Car Driver</span>
                        <span className="text-[13px] font-semibold text-[#101828]">{JOB.pilotDriverName}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-[#6b7280]">Pilot Company</span>
                        <span className="text-[13px] font-semibold text-[#101828]">{JOB.pilotCompany}</span>
                      </div>
                    </div>

                    {JOB.pricingType === 'Per Mile' && (
                      <div className="flex items-center gap-2.5 rounded-[6px] border border-gray-200 bg-gray-50 px-3.5 py-3 mb-3">
                        <Gauge className="w-4 h-4 text-[#6b7280] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-[#374151] uppercase tracking-wide">
                            Odometer Reading Submitted
                          </p>
                          <p className="text-[14px] font-bold text-[#101828] tabular-nums">{JOB.odometerReading}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 bg-[#FFFBF5] border border-[#FCE3C4] rounded-xl px-3.5 py-2.5 mb-4">
                      <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#B45309] leading-relaxed">
                        ${money(holdAmount)} {JOB.currency} will be temporarily held on your card to secure
                        payment. You'll only be charged after the job is completed.
                      </p>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="flex-1">
                        <SecondaryButton
                          tone="danger"
                          size="sm"
                          onClick={() => {
                            setNotification(null);
                            setStep('jobDeclined');
                          }}
                        >
                          Decline
                        </SecondaryButton>
                      </div>
                      <div className="flex-1">
                        <PrimaryButton
                          size="sm"
                          onClick={() => {
                            setNotification(null);
                            setConvoyConfirmedAt(Date.now());
                            showToast(
                              `Payment Authorization Hold Placed — $${money(holdAmount)} ${JOB.currency} held on your card.`,
                            );
                          }}
                        >
                          Confirm Job
                        </PrimaryButton>
                      </div>
                    </div>
                  </>
                )}

                {notification === 'invoiceReady' && (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center shrink-0">
                        <Receipt className="w-5 h-5 text-[#D97706]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#101828] leading-tight">Invoice Ready for Review</p>
                        <p className="text-[13px] text-[#4a5565] mt-1 leading-relaxed">
                          Invoice for Pilot/Escort Job #{JOB.number} is ready. Review it within 24 hours, or it
                          will be automatically approved and payment processed.
                        </p>
                      </div>
                    </div>
                    <PrimaryButton
                      size="sm"
                      onClick={() => {
                        setNotification(null);
                        setStep('invoiceReview');
                      }}
                    >
                      Review Invoice
                    </PrimaryButton>
                  </>
                )}

                {notification === 'revisedInvoiceReady' && (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
                        <RefreshCcw className="w-5 h-5 text-[#7c3aed]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#101828] leading-tight">
                          Revised Invoice Ready for Review
                        </p>
                        <p className="text-[13px] text-[#4a5565] mt-1 leading-relaxed">
                          A revised invoice has been submitted for Convoy Job #{JOB.number}. Please review the
                          revised invoice within 24 hours. If no action is taken before the review window
                          expires, the revised invoice will be automatically approved and payment will be
                          processed.
                        </p>
                      </div>
                    </div>
                    <PrimaryButton
                      onClick={() => {
                        setNotification(null);
                        setStep('revisedInvoiceReview');
                      }}
                    >
                      Review Revised Invoice
                    </PrimaryButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {notifCollapsed && (
        <button
          onClick={() => setNotifCollapsed(false)}
          className="absolute top-3 right-3 z-50 flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full bg-[#1a1a1a] text-white shadow-lg animate-in fade-in"
        >
          <Bell className="w-3.5 h-3.5 text-[#F89823]" />
          <span className="text-[11px] font-semibold">1 New</span>
        </button>
      )}
    </>
  );

  // ==========================================================
  // Idle — nothing but the notification banner / a "review again" reminder
  // ==========================================================
  if (step === 'idle') {
    return (
      <>
        {notificationOverlay}
        {declinedOnce && !notification && (
          <div className="absolute top-3 left-3 right-3 z-40 animate-in fade-in">
            <button
              onClick={() => openNotification('pilotCarReady')}
              className="w-full flex items-center gap-2.5 bg-[#1a1a1a]/90 backdrop-blur-sm text-white rounded-[6px] px-3.5 py-2.5 shadow-lg active:scale-[0.98] transition-transform"
            >
              <Bell className="w-4 h-4 text-[#F89823] shrink-0" />
              <span className="text-[12px] font-medium flex-1 text-left">
                Pilot car job start declined — tap to reconsider
              </span>
            </button>
          </div>
        )}
        {toast && (
          <div className="absolute top-3 inset-x-3 z-[60] flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="max-w-full flex items-start gap-1.5 bg-[#1a1a1a]/95 text-white text-[11px] font-medium pl-2.5 pr-3 py-2 rounded-[6px] shadow-lg">
              <Check className="w-3 h-3 text-[#4ADE80] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="leading-relaxed">{toast}</span>
            </div>
          </div>
        )}
      </>
    );
  }

  // Every other step takes over the full Live Tracking viewport.
  return <div className="absolute inset-0 z-[70] bg-[#f6f6f6]">{renderScreen()}</div>;

  function renderScreen() {
    // ==========================================================
    // SCREEN · Job Declined
    // ==========================================================
    if (step === 'jobDeclined') {
      return (
        <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-10 pb-4 flex flex-col items-center text-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <span className="absolute inset-2 rounded-full bg-gray-100" />
                <span className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gray-300">
                  <XCircle className="w-9 h-9 text-white" strokeWidth={2} />
                </span>
              </div>
              <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Job Start Declined</h1>
              <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[300px]">
                You've declined the pilot car job start for Convoy Job #{JOB.number}. The Pilot Car Driver and
                dispatch have been notified.
              </p>
            </div>
          </div>
          <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
            <PrimaryButton
              onClick={() => {
                setDeclinedOnce(true);
                setStep('idle');
              }}
            >
              Back to Live Tracking
            </PrimaryButton>
          </div>
        </div>
      );
    }

    // ==========================================================
    // SCREEN · Invoice Review
    // ==========================================================
    if (step === 'invoiceReview') {
      return (
        <Scaffold
          title="Invoice Review"
          subtitle={INVOICE.number}
          footer={
            <div className="flex gap-3">
              <div className="flex-1">
                <SecondaryButton tone="danger" onClick={() => setStep('raiseDispute')}>
                  Raise Dispute
                </SecondaryButton>
              </div>
              <div className="flex-1">
                <PrimaryButton
                  onClick={() => {
                    setApprovalSource('original');
                    setInvoiceOutcome('approved');
                    setStep('invoiceApproved');
                  }}
                >
                  Approve Invoice
                </PrimaryButton>
              </div>
            </div>
          }
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <CountdownCard remainingMs={invoiceCountdown} />

            <div className={CARD}>
              <CardHeader icon={Truck} title="Job Details" tint="#EFF6FF" />
              <div className="px-4 py-1">
                <InfoRow label="Job Number" value={JOB.number} mono />
                <InfoRow label="Pilot Company" value={JOB.pilotCompany} />
                <InfoRow label="Mileage" value={INVOICE.mileage} mono />
                <InfoRow label="Standby Hours" value={INVOICE.standbyHours} />
              </div>
            </div>

            <div className={CARD}>
              <CardHeader icon={Receipt} title="Invoice Summary" tint="#FFF3E0" color="#D97706" />
              <div className="px-4 py-1">
                <MoneyRow label="Job Fee" amount={INVOICE.jobFee} />
                <div className="border-t border-gray-100" />
                <MoneyRow label="Card Processing Fee" amount={cardProcessingFee} showPlus infoIcon />
                <div className="border-t border-gray-100" />
                <MoneyRow
                  label={`Overwize Platform Fee (${(INVOICE.platformFeeRate * 100).toFixed(0)}%)`}
                  amount={platformFee}
                  showPlus
                  infoIcon
                />
                <div className="border-t border-gray-100" />
                <MoneyRow label="Total Payable" amount={invoiceTotal} strong />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#111827] px-4 py-4 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">Total Payable</span>
              <span className="text-[24px] font-bold text-white tabular-nums">
                ${money(invoiceTotal)} <span className="text-[12px] text-white/50">{JOB.currency}</span>
              </span>
            </div>
          </div>
        </Scaffold>
      );
    }

    // ==========================================================
    // SCREEN · Raise Dispute
    // ==========================================================
    if (step === 'raiseDispute') {
      return (
        <Scaffold
          title="Raise Dispute"
          subtitle={INVOICE.number}
          onBack={() => setStep('invoiceReview')}
          footer={
            <div className="flex gap-3">
              <div className="flex-1">
                <SecondaryButton onClick={() => setStep('invoiceReview')}>Cancel</SecondaryButton>
              </div>
              <div className="flex-1">
                <PrimaryButton
                  disabled={!canSubmitDispute}
                  onClick={() => {
                    setInvoiceOutcome('disputed');
                    setDisputeSubmittedAt(Date.now());
                    setStep('disputeSubmitted');
                  }}
                >
                  Submit Dispute
                </PrimaryButton>
              </div>
            </div>
          }
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className={CARD}>
              <CardHeader icon={FileText} title="Dispute Reason" tint="#FFF1F2" color="#E11D48" right={<span className="text-[11px] font-semibold text-[#E11D48]">Required</span>} />
              <div className="p-4">
                <Select value={disputeReason} onValueChange={setDisputeReason}>
                  <SelectTrigger className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPUTE_REASONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={CARD}>
              <CardHeader icon={FileText} title="Comments" tint="#FFF1F2" color="#E11D48" right={<span className="text-[11px] font-semibold text-[#E11D48]">Required</span>} />
              <div className="p-4 space-y-2">
                <Label htmlFor="dispute-comments" className="sr-only">
                  Comments
                </Label>
                <Textarea
                  id="dispute-comments"
                  value={disputeComments}
                  onChange={(e) => setDisputeComments(e.target.value)}
                  placeholder="Describe why you disagree with this invoice…"
                  maxLength={600}
                  className="min-h-[120px] resize-none bg-white border-gray-200"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#9ca3af]">Minimum 10 characters</p>
                  <p className="text-[11px] text-[#9ca3af] tabular-nums">{disputeComments.length}/600</p>
                </div>
              </div>
            </div>

            <div className={CARD}>
              <CardHeader icon={Upload} title="Supporting Evidence" tint="#EFF6FF" right={<span className="text-[11px] font-medium text-[#9ca3af]">Optional</span>} />
              <div className="p-4 space-y-3">
                <UploadTile icon={Camera} label="Add Evidence" onChange={addEvidence} accept="image/*,application/pdf" />
                {disputeEvidence.length > 0 && (
                  <div className="space-y-2">
                    {disputeEvidence.map((f, i) => (
                      <FilePill key={i} file={f} onRemove={() => setDisputeEvidence((p) => p.filter((_, x) => x !== i))} />
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
    // SCREEN · Dispute Submitted
    // ==========================================================
    if (step === 'disputeSubmitted') {
      return (
        <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-10 pb-4 flex flex-col items-center text-center">
              <SuccessBurst tone="orange" />
              <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Dispute Submitted</h1>
              <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[300px]">
                Your dispute has been submitted. The Pilot Car Driver has 24 hours to review and submit a
                revised invoice. If no revised invoice is submitted within the review window, the dispute will
                be automatically closed, the original invoice will remain unchanged, and payment will proceed
                based on the original invoice.
              </p>
            </div>
          </div>
          <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
            <PrimaryButton onClick={() => setStep('idle')}>Back to Live Tracking</PrimaryButton>
          </div>
        </div>
      );
    }

    // ==========================================================
    // SCREEN · Revised Invoice Review
    // ==========================================================
    if (step === 'revisedInvoiceReview') {
      const savings = invoiceTotal - revisedTotal;
      return (
        <Scaffold
          title="Revised Invoice Review"
          subtitle={INVOICE.number}
          footer={
            <div className="flex gap-3">
              <div className="flex-1">
                <SecondaryButton tone="danger" disabled>
                  Raise Dispute
                </SecondaryButton>
              </div>
              <div className="flex-1">
                <PrimaryButton
                  onClick={() => {
                    setApprovalSource('revised');
                    setRevisedOutcome('approved');
                    setStep('invoiceApproved');
                  }}
                >
                  Approve Invoice
                </PrimaryButton>
              </div>
            </div>
          }
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <CountdownCard remainingMs={revisedCountdown} />

            <div className="rounded-2xl overflow-hidden bg-white border border-[#ececec] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)]">
              <div className="h-1.5 bg-gradient-to-r from-[#F89823] to-[#F5761F]" />
              <div className="px-4 pb-4 pt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-3.5 py-3">
                  <p className="text-[11px] text-[#9ca3af]">Original Amount</p>
                  <p className="text-[16px] font-semibold text-[#9ca3af] line-through tabular-nums mt-0.5">
                    ${money(invoiceTotal)}
                  </p>
                </div>
                <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-3">
                  <p className="text-[11px] text-[#15803D]">Revised Amount</p>
                  <p className="text-[16px] font-bold text-[#16A34A] tabular-nums mt-0.5">${money(revisedTotal)}</p>
                </div>
              </div>
              <div className="mx-4 mb-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-2 text-center">
                <span className="text-[12px] font-semibold text-[#15803D]">
                  You save ${money(savings)} {JOB.currency}
                </span>
              </div>
            </div>

            <div className={CARD}>
              <CardHeader icon={Receipt} title="Updated Invoice Summary" tint="#FFF3E0" color="#D97706" />
              <div className="px-4 py-1">
                {REVISED_CHARGES.map((c, i) => (
                  <div key={c.label}>
                    {i > 0 && <div className="border-t border-gray-100" />}
                    <ChargeDiffRow label={c.label} sub={c.sub} amount={c.amount} previousAmount={c.previousAmount} />
                  </div>
                ))}
              </div>
              <div className="bg-[#111827] px-4 py-4 flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">Revised Total</span>
                <span className="text-[24px] font-bold text-white tabular-nums">
                  ${money(revisedTotal)} <span className="text-[12px] text-white/50">{JOB.currency}</span>
                </span>
              </div>
            </div>

            <div className={CARD}>
              <CardHeader icon={FileText} title="Pilot Car Notes" tint="#F5F3FF" color="#7c3aed" />
              <div className="p-4">
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-3.5 py-3">
                  <p className="text-[13px] text-[#374151] leading-relaxed">
                    "Job fee adjusted per your dispute — reduced from ${money(INVOICE.jobFee)} to $
                    {money(REVISED_JOB_FEE)} after reviewing the standby time recorded. Processing and platform
                    fees recalculated accordingly."
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-2.5">— {JOB.pilotDriverName}, {JOB.pilotCompany}</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed px-1">
              Disputes are limited to one round per invoice, so raising a further dispute isn't available for
              this revised invoice.
            </p>
          </div>
        </Scaffold>
      );
    }

    // ==========================================================
    // SCREEN · Invoice Approved
    // ==========================================================
    if (step === 'invoiceApproved') {
      const revised = approvalSource === 'revised';
      return (
        <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-10 pb-4 flex flex-col items-center text-center">
              <SuccessBurst tone="green" />
              <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Invoice Approved</h1>
              <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[300px]">
                {approvedAuto
                  ? `Thank you. The ${revised ? 'revised ' : ''}invoice was automatically approved because the review window expired. The authorized payment will now be captured.`
                  : `Thank you. The ${revised ? 'revised ' : ''}invoice has been approved. The authorized payment will now be captured.`}
              </p>
            </div>
          </div>
          <div className="flex-none bg-white border-t border-[#e6e3df] px-4 py-3 safe-area-inset-bottom">
            <PrimaryButton onClick={() => setStep('paymentCaptured')}>Continue</PrimaryButton>
          </div>
        </div>
      );
    }

    // ==========================================================
    // SCREEN · Payment Captured
    // ==========================================================
    if (step === 'paymentCaptured') {
      const paymentDate = (capturedAt ?? new Date()).toLocaleString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return (
        <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center">
              <SuccessBurst tone="green" />
              <h1 className="mt-5 text-[22px] font-bold text-[#101828]">Payment Successful</h1>
              <p className="mt-1.5 text-[13px] text-[#6b7280] leading-relaxed max-w-[280px]">
                Your payment has been successfully processed. A receipt has been sent to your registered email
                address.
              </p>
            </div>

            <div className="px-4 pb-6">
              <div className={CARD}>
                <div className="px-4 py-1 divide-y divide-gray-100">
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-[13px] text-[#4a5565]">
                      <Hash className="w-4 h-4 text-[#9ca3af]" />
                      Invoice Number
                    </span>
                    <span className="text-[13px] font-semibold text-[#101828] tabular-nums">{INVOICE.number}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[13px] text-[#4a5565]">Amount Captured</span>
                    <span className="text-[15px] font-bold text-[#16A34A] tabular-nums">
                      ${money(capturedAmount)} <span className="text-[11px] font-medium text-[#9ca3af]">{JOB.currency}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-[13px] text-[#4a5565]">
                      <CalendarDays className="w-4 h-4 text-[#9ca3af]" />
                      Payment Date
                    </span>
                    <span className="text-[13px] font-semibold text-[#101828]">{paymentDate}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-[13px] text-[#4a5565]">
                      <ShieldCheck className="w-4 h-4 text-[#9ca3af]" />
                      Transaction Ref
                    </span>
                    <span className="text-[13px] font-semibold text-[#101828] tabular-nums">{txnRef}</span>
                  </div>
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
            <PrimaryButton onClick={onExitToTrip}>Back to Trips</PrimaryButton>
          </div>
        </div>
      );
    }

    return null;
  }
}
