import { useState } from 'react';
import { CheckCircle2, ArrowRight, Clock, Truck, Users, FileText, Navigation, ChevronLeft, Star, Package, Timer, Receipt, ChevronRight, AlertTriangle } from 'lucide-react';
import { RatingPromptCard } from './RatingPromptCard';
import { PilotCarRatingDrawer } from './PilotCarRatingDrawer';
import type { SubmittedRating } from './PilotCarRatingDrawer';
import InvoicePaymentFlow, { InvoiceModel, InvoiceOutcome } from './InvoicePaymentFlow';

// ---- Shared types (mirrored from ManageTrips) ----

interface PermitState {
  code: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
}

interface Permit {
  id: string;
  requestId: string;
  permitNumber?: string;
  createdDate: string;
  effectiveDate: string;
  expiryDate: string;
  driver: string;
  states: PermitState[];
  origin: string;
  destination: string;
  status: string;
  routeDetails?: { miles: string };
  truck?: { unit: string; make: string; year: string; plate: string };
  trailer?: { type: string; length: string };
  driverDetails?: { name: string; license: string; state: string; phone: string };
  load?: { type: string; description: string; width: string; height: string; length: string; weight: string };
  tracking?: { currentLocation: string; progress: number };
}

interface Bid {
  id: string;
  companyName: string;
  driverName?: string;
  contactPerson?: string;
  amount: number;
  rating: number;
  vehicleType: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  jobStatus?: 'Not Started' | 'In Progress' | 'Completed';
  startTime?: string;
  endTime?: string;
}

interface PilotJob {
  id: string;
  tripId: string;
  jobTitle?: string;
  title?: string;
  origin: string;
  destination: string;
  vehicleType: string;
  numberOfVehicles: number;
  status: string;
  startDate?: string;
  endDate?: string;
  bids: Bid[];
  dims?: { height: string; width: string; length: string; weight: string };
  freightDesc?: string;
  statesProvinces?: string[];
}

export interface TripSummaryScreenProps {
  trip: Permit;
  jobs: PilotJob[];
  startedAt: Date;
  endedAt: Date;
  onBack: () => void;
  /** When provided, rating prompt is hidden (trip was already rated before entering this screen) */
  alreadyRated?: boolean;
  /** Called when the user submits a rating from this screen */
  onRatingSubmitted?: (rating: SubmittedRating) => void;
}

// ---- Utilities ----

function fmt24(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${mm}/${dd}/${yyyy} ${hh}:${min}`;
}

function duration(start: Date, end: Date): string {
  const diff = Math.floor((end.getTime() - start.getTime()) / 60000);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function getJobStatusColor(status: string): { bg: string; text: string; border: string } {
  switch (status) {
    case 'Completed': return { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0' };
    case 'In Progress': return { bg: '#FFF8F0', text: '#D97706', border: '#FED7AA' };
    case 'Assigned': return { bg: '#EFF6FF', text: '#2563EB', border: '#DBEAFE' };
    default: return { bg: '#F9FAFB', text: '#6B7280', border: '#E5E7EB' };
  }
}

// ---- Component ----

export default function TripSummaryScreen({
  trip,
  jobs,
  startedAt,
  endedAt,
  onBack,
  alreadyRated = false,
  onRatingSubmitted,
}: TripSummaryScreenProps) {
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingDismissed, setRatingDismissed] = useState(false);
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState(false);
  const [invoiceFlowOpen, setInvoiceFlowOpen] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<'pending' | InvoiceOutcome>('pending');

  const tripJobs = jobs.filter(j => j.tripId === trip.requestId);

  // Collect unique pilot cars from accepted bids
  const pilotCars: {
    company: string;
    driver: string;
    vehicle: string;
    startTime?: string;
    endTime?: string;
    rating: number;
    jobId: string;
    bidId: string;
  }[] = [];

  tripJobs.forEach(job => {
    job.bids
      .filter(b => b.status === 'Accepted')
      .forEach(bid => {
        pilotCars.push({
          company: bid.companyName,
          driver: bid.driverName || bid.contactPerson || 'Unknown',
          vehicle: bid.vehicleType,
          startTime: bid.startTime,
          endTime: bid.endTime,
          rating: bid.rating,
          jobId: job.id,
          bidId: bid.id,
        });
      });
  });

  // Primary pilot car for the rating (first accepted bid)
  const primaryPilotCar = pilotCars[0];

  const showRatingPrompt =
    !alreadyRated &&
    !ratingSubmitted &&
    !ratingDismissed &&
    !!primaryPilotCar;

  const tripDuration = duration(startedAt, endedAt);
  const totalMiles = trip.routeDetails?.miles ?? '—';
  const stateCount = trip.states.length;

  const handleRatingSubmitSuccess = (rating: SubmittedRating) => {
    setRatingSubmitted(true);
    onRatingSubmitted?.(rating);
  };

  // Invoice submitted by the escorting pilot company for this completed trip.
  const invoice: InvoiceModel = {
    pilotCompany: primaryPilotCar?.company ?? 'ABC Pilot Services',
    invoiceNumber: `INV-${trip.requestId.replace(/[^0-9]/g, '') || '2026'}-04812`,
    tripId: trip.requestId,
    submittedDate: fmt24(endedAt).split(' ')[0],
    currency: 'CAD',
    charges: { baseEscort: 4500, standby: 35, layover: 400, routeChange: 150 },
    platformFeeRate: 0.145,
    taxRate: 0.05,
    paymentMethod: { brand: 'Visa', last4: '4242', expiry: '08/28' },
  };
  const invoiceTotal = 6076.58;

  // The invoice review → payment flow lives inside the end-of-trip experience.
  if (invoiceFlowOpen) {
    return (
      <InvoicePaymentFlow
        invoice={invoice}
        initialScreen={
          invoiceStatus === 'paid'
            ? 'success'
            : invoiceStatus === 'disputed'
            ? 'disputeSubmitted'
            : 'review'
        }
        onClose={(outcome) => {
          if (outcome) setInvoiceStatus(outcome);
          setInvoiceFlowOpen(false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f6f6f6] w-full overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-white border-b border-[#e6e3df] sticky top-0 z-20 safe-area-inset-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors -ml-1"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-semibold text-[#0a0a0a] leading-tight">Trip Summary</h1>
            <p className="text-xs text-gray-500 mt-0.5">{trip.requestId}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto pb-8">

        {/* ── Rating Prompt — AT TOP, non-blocking ── */}
        {showRatingPrompt && (
          <RatingPromptCard
            tripId={trip.requestId}
            pilotCarName={primaryPilotCar.company}
            onRateNow={() => setRatingDrawerOpen(true)}
            onDismiss={() => setRatingDismissed(true)}
          />
        )}

        {/* ── Rating submitted confirmation ── */}
        {ratingSubmitted && (
          <div className="mx-4 mt-4 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0] px-4 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#BBF7D0]">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#15803D]">Rating Submitted</p>
              <p className="text-xs text-[#16A34A] mt-0.5">Thank you — your feedback helps improve future assignments.</p>
            </div>
          </div>
        )}

        {/* ── Invoice — status-aware ── */}
        <div className="mx-4 mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-[#0a0a0a]">Invoice</span>
           
          </div>

          <button
            onClick={() => setInvoiceFlowOpen(true)}
            className="w-full text-left bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(22,163,74,0.10)] overflow-hidden active:scale-[0.99] transition-transform"
          >
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    invoiceStatus === 'paid'
                      ? 'bg-[#F0FDF4]'
                      : invoiceStatus === 'disputed'
                      ? 'bg-[#FFF1F2]'
                      : 'bg-[#FFF3E0]'
                  }`}
                >
                  {invoiceStatus === 'paid' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  ) : invoiceStatus === 'disputed' ? (
                    <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
                  ) : (
                    <Receipt className="w-5 h-5 text-[#D97706]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0a0a0a] truncate">
                    {invoiceStatus === 'paid'
                      ? 'Invoice paid'
                      : invoiceStatus === 'disputed'
                      ? 'Dispute submitted'
                      : 'Invoice received'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {invoice.pilotCompany} · {invoice.invoiceNumber}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    {invoiceStatus === 'paid' ? 'Amount Paid' : 'Total Payable'}
                  </p>
                  <p
                    className={`text-[20px] font-bold tabular-nums leading-tight ${
                      invoiceStatus === 'paid' ? 'text-[#16A34A]' : 'text-[#0a0a0a]'
                    }`}
                  >
                    ${invoiceTotal.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="text-[12px] font-medium text-gray-400 ml-1">{invoice.currency}</span>
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-sm text-[13px] font-semibold ${
                    invoiceStatus === 'pending'
                      ? 'bg-[#F89823] text-[#1a1a1a] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.25)]'
                      : 'bg-gray-100 text-[#374151]'
                  }`}
                >
                  {invoiceStatus === 'paid'
                    ? 'View Receipt'
                    : invoiceStatus === 'disputed'
                    ? 'View Dispute'
                    : 'Generate Invoice'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </button>

          <p className="text-[11px] text-gray-400 leading-relaxed mt-2 px-1">
            {invoiceStatus === 'paid'
              ? 'Payment complete. Funds are released to the pilot company once the transaction settles.'
              : invoiceStatus === 'disputed'
              ? 'Dispute submitted. The invoice is on hold while Super Admin reviews it.'
              : "Review the pilot company's charges, then pay or raise a dispute. Platform fees and taxes are shown before payment."}
          </p>
        </div>

        {/* ── Hero completion card ── */}
        <div className="mx-4 mt-4 bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(22,163,74,0.10)] overflow-hidden">
          <div />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#15803D]">Trip Completed</p>
                <p className="text-xs text-gray-500">GPS tracking stopped for all parties</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Origin</p>
                <p className="text-sm font-semibold text-[#0a0a0a] truncate">{trip.origin}</p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-0.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                <div className="w-px h-5 bg-gray-200" />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="w-px h-5 bg-gray-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F89823]" />
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Destination</p>
                <p className="text-sm font-semibold text-[#0a0a0a] truncate">{trip.destination}</p>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-[18px] font-bold text-[#0a0a0a] tabular-nums">{totalMiles}</p>
                <p className="text-[11px] text-gray-500">Miles</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-[18px] font-bold text-[#0a0a0a]">{stateCount}</p>
                <p className="text-[11px] text-gray-500">States</p>
              </div>
              <div className="text-center">
                <p className="text-[18px] font-bold text-[#0a0a0a]">{tripDuration}</p>
                <p className="text-[11px] text-gray-500">Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mx-4 mt-3 bg-white rounded-xl border border-[#e6e3df] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <Timer className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-[#0a0a0a]">Trip Timeline</span>
          </div>
          <div className="px-4 py-4">
            {/* Start */}
            <div className="flex gap-3.5">
              <div className="flex flex-col items-center pt-0.5">
                <div className="w-3 h-3 rounded-full bg-[#16A34A] border-2 border-white shadow-[0_0_0_2px_#BBF7D0] shrink-0" />
                <div className="w-px flex-1 bg-gray-200 my-1.5 min-h-[32px]" />
              </div>
              <div className="pb-4 flex-1">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Trip Started</p>
                <p className="text-sm font-semibold text-[#0a0a0a] tabular-nums mt-0.5">{fmt24(startedAt)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{trip.origin}</p>
              </div>
            </div>
            {/* End */}
            <div className="flex gap-3.5">
              <div className="flex flex-col items-center pt-0.5">
                <div className="w-3 h-3 rounded-full bg-[#F89823] border-2 border-white shadow-[0_0_0_2px_#FED7AA] shrink-0" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Trip Ended</p>
                <p className="text-sm font-semibold text-[#0a0a0a] tabular-nums mt-0.5">{fmt24(endedAt)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{trip.destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Load Details ── */}
        {trip.load && (
          <div className="mx-4 mt-3 bg-white rounded-xl border border-[#e6e3df] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-[#0a0a0a]">Load</span>
            </div>
            <div className="px-4 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Type</p>
                <p className="text-sm font-medium text-[#0a0a0a] mt-0.5">{trip.load.type}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Weight</p>
                <p className="text-sm font-medium text-[#0a0a0a] mt-0.5 tabular-nums">{trip.load.weight}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Width × Height</p>
                <p className="text-sm font-medium text-[#0a0a0a] mt-0.5 tabular-nums">{trip.load.width} × {trip.load.height}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Length</p>
                <p className="text-sm font-medium text-[#0a0a0a] mt-0.5 tabular-nums">{trip.load.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Jobs Executed ── */}
        <div className="mx-4 mt-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-[#0a0a0a]">Jobs Executed</span>
            <span className="text-xs text-gray-500 tabular-nums">{tripJobs.length} job{tripJobs.length !== 1 ? 's' : ''}</span>
          </div>

          {tripJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#e6e3df] px-4 py-6 text-center">
              <p className="text-sm text-gray-500">No pilot car jobs recorded for this trip.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tripJobs.map(job => {
                const acceptedBid = job.bids.find(b => b.status === 'Accepted');
                const normStatus = (() => {
                  if (job.status === 'Completed') return 'Completed';
                  if (job.status === 'Assigned' || job.status === 'In Progress') return 'In Progress';
                  if (job.status === 'Open' || job.status === 'Open for Bidding') return 'Open';
                  return 'Completed';
                })();
                const statusColor = getJobStatusColor(normStatus);
                return (
                  <div key={job.id} className="bg-white rounded-xl border border-[#e6e3df] overflow-hidden shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)]">
                    <div className="px-4 pt-3.5 pb-2.5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-[11px] text-gray-400 tabular-nums font-mono">{job.id}</p>
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border shrink-0"
                          style={{ background: statusColor.bg, color: statusColor.text, borderColor: statusColor.border }}
                        >
                          {normStatus}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#0a0a0a] leading-snug mb-1">
                        {job.jobTitle || job.title || `${job.origin} → ${job.destination}`}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          {job.vehicleType}
                          {job.numberOfVehicles > 1 && ` ×${job.numberOfVehicles}`}
                        </span>
                        {job.statesProvinces && job.statesProvinces.length > 0 && (
                          <>
                            <span className="text-gray-300">·</span>
                            <span>{job.statesProvinces.slice(0, 3).join(', ')}{job.statesProvinces.length > 3 ? ` +${job.statesProvinces.length - 3}` : ''}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {acceptedBid && (
                      <div className="border-t border-gray-100 px-4 py-2.5 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <Users className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#0a0a0a] truncate">{acceptedBid.companyName}</p>
                          {acceptedBid.driverName && (
                            <p className="text-[11px] text-gray-500 truncate">{acceptedBid.driverName}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="w-3 h-3 text-[#F89823] fill-[#F89823]" />
                          <span className="text-xs font-medium text-gray-700 tabular-nums">{acceptedBid.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Pilot Cars Involved ── */}
        {pilotCars.length > 0 && (
          <div className="mx-4 mt-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-semibold text-[#0a0a0a]">Pilot Cars Involved</span>
              <span className="text-xs text-gray-500 tabular-nums">{pilotCars.length}</span>
            </div>
            <div className="bg-white rounded-xl border border-[#e6e3df] overflow-hidden shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] divide-y divide-gray-100">
              {pilotCars.map((pc, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FFF8F0] flex items-center justify-center shrink-0 border border-[#FED7AA]">
                    <Navigation className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0a0a0a] truncate">{pc.company}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-gray-500">{pc.driver}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[11px] text-gray-500">{pc.vehicle}</span>
                    </div>
                    {pc.startTime && pc.endTime && (
                      <p className="text-[11px] text-gray-400 tabular-nums mt-0.5">
                        {new Date(pc.startTime).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        {' — '}
                        {new Date(pc.endTime).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-[#F89823] fill-[#F89823]" />
                    <span className="text-sm font-semibold text-gray-700 tabular-nums">{pc.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Incidents ── */}
        <div className="mx-4 mt-3">
          <div className="mb-2.5">
            <span className="text-sm font-semibold text-[#0a0a0a]">Reported Incidents</span>
          </div>
          <div className="bg-white rounded-xl border border-[#e6e3df] shadow-[0px_1px_3px_0px_rgba(95,95,95,0.06)] px-4 py-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0a0a0a]">No incidents reported</p>
              <p className="text-xs text-gray-500 mt-0.5">This trip completed without any recorded incidents.</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Rating Drawer ── */}
      {primaryPilotCar && (
        <PilotCarRatingDrawer
          open={ratingDrawerOpen}
          onOpenChange={setRatingDrawerOpen}
          tripId={trip.requestId}
          pilotCarId={primaryPilotCar.bidId}
          pilotCarName={primaryPilotCar.company}
          onSubmitSuccess={handleRatingSubmitSuccess}
        />
      )}
    </div>
  );
}
