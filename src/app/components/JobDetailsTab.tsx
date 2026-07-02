import { useState } from 'react';
import { formatDate } from '../utils/dateFormat';
import { 
  MapPin, 
  Calendar, 
  Truck, 
  FileText, 
  Box,
  Map as MapIcon,
  Flag,
  Receipt,
  Briefcase,
  Shield,
  CheckCircle2,
  ChevronDown,
  Clock,
  User,
  Phone,
  Route,
} from 'lucide-react';
import { Badge } from './ui/badge';

interface JobDetailsTabProps {
  job: any;
}

/* ── Collapsible Section ─────────────────────────────── */
function Section({
  icon: Icon,
  title,
  defaultOpen = false,
  children,
  count,
}: {
  icon: any;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  count?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-2.5 px-4 py-3 active:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-gray-500" />
        </div>
        <span className="flex-1 text-left text-sm text-gray-900">{title}</span>
        {count !== undefined && (
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full tabular-nums">{count}</span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Compact two-column row ──────────────────────────── */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 shrink-0">{label}</span>
      <span className="text-sm text-gray-900 text-right">{value}</span>
    </div>
  );
}

/* ── Two-column grid cell ────────────────────────────── */
function GridCell({ label, value, highlight = false }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`text-sm tabular-nums ${highlight ? 'text-gray-900' : 'text-gray-700'}`}>{value}</p>
    </div>
  );
}

/* ── Status badge helper ─────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Open': 'bg-blue-50 text-blue-700 border-blue-200',
    'Open for Bidding': 'bg-blue-50 text-blue-700 border-blue-200',
    'Bid Received': 'bg-amber-50 text-amber-700 border-amber-200',
    'Bidding Closed': 'bg-orange-50 text-orange-700 border-orange-200',
    'Assigned': 'bg-purple-50 text-purple-700 border-purple-200',
    'In Transit': 'bg-orange-50 text-[#C2410C] border-orange-200',
    'Bid Submitted': 'bg-orange-50 text-[#C2410C] border-orange-200',
    'Action Required': 'bg-red-50 text-red-700 border-red-200',
    'Completed': 'bg-green-50 text-green-700 border-green-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return (
    <Badge
      variant="secondary"
      className={`text-[10px] border px-2 py-0.5 ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}
    >
      {status}
    </Badge>
  );
}

/* ── Main Component ──────────────────────────────────── */
export default function JobDetailsTab({ job }: JobDetailsTabProps) {
  const title = job.jobTitle || job.title || `${job.origin} to ${job.destination}`;
  const startDate = job.startDate || job.pickupDate;

  // Count how many load detail fields exist
  const loadFieldCount = [
    job.commodityType, job.grossVehicleWeight, job.loadWeight,
    job.overHeight, job.overWidth, job.overLength,
    job.trailerLength, job.loadLength, job.specialHandling,
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">

      {/* ═══════════════════════════════════════════════════
          SUMMARY HERO CARD — key info at a glance
          ═══════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Route Banner */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-sm truncate">{job.origin}</span>
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-sm truncate">{job.destination}</span>
          </div>
          {job.distance && (
            <p className="text-xs text-gray-400 mt-1">{job.distance}</p>
          )}
        </div>

        {/* Key Metrics */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{title}</p>
              {job.jobType && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {job.jobType === 'convoy' ? 'Convoy' : job.jobType === 'route-survey' ? 'Route Survey' : job.jobType === 'survey' ? 'Survey' : job.jobType.split(',').map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
                </p>
              )}
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Stat pills row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg px-2.5 py-2 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Start</p>
              <p className="text-xs text-gray-900 mt-0.5 tabular-nums">
                {startDate ? formatDate(startDate) : 'TBD'}
              </p>
            </div>
            {job.endDate ? (
              <div className="bg-gray-50 rounded-lg px-2.5 py-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">End</p>
                <p className="text-xs text-gray-900 mt-0.5 tabular-nums">{formatDate(job.endDate)}</p>
              </div>
            ) : job.estimatedDuration ? (
              <div className="bg-gray-50 rounded-lg px-2.5 py-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Duration</p>
                <p className="text-xs text-gray-900 mt-0.5">{job.estimatedDuration}</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg px-2.5 py-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Duration</p>
                <p className="text-xs text-gray-400 mt-0.5">—</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg px-2.5 py-2 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Bids</p>
              <p className="text-xs text-gray-900 mt-0.5 tabular-nums">{job.bids?.length || 0}</p>
            </div>
          </div>

          {/* Contact quick-access row */}
          {(job.contactName || job.contactPhone) && (
            <div className="mt-3 flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-xs text-blue-800 flex-1 truncate">
                {job.contactName}{job.contactPhone ? ` • ${job.contactPhone}` : ''}
              </span>
              {job.contactPhone && (
                <a
                  href={`tel:${job.contactPhone}`}
                  className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 active:scale-95"
                  aria-label="Call contact"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ROUTE & SCHEDULE  (expanded by default)
          ═══════════════════════════════════════════════════ */}
      <Section icon={MapPin} title="Route & Schedule" defaultOpen={true}>
        <div className="space-y-0">
          <Row label="Origin" value={job.origin} />
          <Row label="Destination" value={job.destination} />
          {job.distance && <Row label="Distance" value={job.distance} />}
          {job.statesProvinces && job.statesProvinces.length > 0 && (
            <Row label="States / Provinces" value={job.statesProvinces.join(', ')} />
          )}
          {startDate && <Row label="Start Date" value={formatDate(startDate)} />}
          {job.startTime && <Row label="Start Time" value={job.startTime} />}
          {job.endDate && <Row label="Est. Completion" value={formatDate(job.endDate)} />}
          {job.estimatedDuration && <Row label="Duration" value={job.estimatedDuration} />}
          {job.meetAtJobStart && <Row label="Meet at Start" value={job.meetAtJobStart} />}
          {job.requestedRoute && (
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Requested Route</p>
              <p className="text-sm text-gray-700 leading-relaxed">{job.requestedRoute}</p>
            </div>
          )}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          LOAD DETAILS  (expanded by default if fields exist)
          ═══════════════════════════════════════════════════ */}
      {loadFieldCount > 0 && (
        <Section icon={Box} title="Load Details" defaultOpen={true} count={loadFieldCount}>
          {/* Dimensions in a compact grid */}
          {(job.overHeight || job.overWidth || job.overLength) && (
            <div className="mb-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Oversized Dimensions</p>
              <div className="grid grid-cols-3 gap-2">
                <GridCell label="Height" value={job.overHeight} highlight />
                <GridCell label="Width" value={job.overWidth} highlight />
                <GridCell label="Length" value={job.overLength} highlight />
              </div>
            </div>
          )}
          <div className="space-y-0">
            {job.commodityType && <Row label="Commodity" value={job.commodityType} />}
            {job.grossVehicleWeight && <Row label="GVW" value={job.grossVehicleWeight} />}
            {job.loadWeight && <Row label="Load Weight" value={job.loadWeight} />}
            {job.trailerLength && <Row label="Trailer Length" value={job.trailerLength} />}
            {job.loadLength && <Row label="Load Length" value={job.loadLength} />}
          </div>
          {job.specialHandling && (
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Special Handling</p>
              <p className="text-sm text-gray-700 leading-relaxed">{job.specialHandling}</p>
            </div>
          )}
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════
          VEHICLE REQUIREMENTS  (collapsed by default)
          ═══════════════════════════════════════════════════ */}
      {job.requestedPilotCars && job.requestedPilotCars.length > 0 && (
        <Section icon={Truck} title="Vehicle Requirements" count={job.requestedPilotCars.length}>
          <div className="space-y-2">
            {job.requestedPilotCars.map((pc: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <Truck className="w-3 h-3 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-800">{pc.position || pc.type}</span>
                </div>
                <span className="text-sm text-gray-900 tabular-nums">{pc.count || 1}x</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════
          MEETING & CONTACT  (collapsed by default)
          ═══════════════════════════════════════════════════ */}
      {(job.meetingLocation || job.meetingInstructions || job.contactName || job.contactPhone) && (
        <Section icon={MapIcon} title="Meeting & Contact">
          <div className="space-y-0">
            {job.meetingLocation && <Row label="Location" value={job.meetingLocation} />}
            {job.contactName && <Row label="Contact" value={job.contactName} />}
            {job.contactPhone && (
              <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 shrink-0">Phone</span>
                <a href={`tel:${job.contactPhone}`} className="text-sm text-blue-600">
                  {job.contactPhone}
                </a>
              </div>
            )}
          </div>
          {job.meetingInstructions && (
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Instructions</p>
              <p className="text-sm text-gray-700 leading-relaxed">{job.meetingInstructions}</p>
            </div>
          )}
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════
          PRICING  (collapsed by default)
          ═══════════════════════════════════════════════════ */}
      {(job.pricingType || job.baseRate || job.costPerMile || job.costPerHour || job.minimumDailyRate) && (
        <Section icon={Receipt} title="Pricing">
          {job.pricingType && (
            <div className="mb-2">
              <Badge variant="secondary" className="text-[10px] bg-gray-100 text-gray-600 border-gray-200 px-2 py-0.5">
                {job.pricingType === 'fixed' ? 'Fixed Rate' : 
                 job.pricingType === 'hourly' ? 'Hourly' : 
                 job.pricingType === 'mileage' ? 'Per Mile' : 
                 job.pricingType === 'combination' ? 'Combination' : job.pricingType}
              </Badge>
            </div>
          )}
          {/* Rate grid */}
          <div className="grid grid-cols-2 gap-2">
            {job.baseRate && (
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Base Rate</p>
                <p className="text-sm text-gray-900 mt-0.5 tabular-nums">${job.baseRate}</p>
              </div>
            )}
            {job.costPerMile && (
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Per Mile</p>
                <p className="text-sm text-gray-900 mt-0.5 tabular-nums">${job.costPerMile}</p>
              </div>
            )}
            {job.costPerHour && (
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Per Hour</p>
                <p className="text-sm text-gray-900 mt-0.5 tabular-nums">${job.costPerHour}</p>
              </div>
            )}
            {job.minimumDailyRate && (
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Min Daily</p>
                <p className="text-sm text-gray-900 mt-0.5 tabular-nums">${job.minimumDailyRate}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════
          JOB INFO  (collapsed — secondary metadata)
          ═══════════════════════════════════════════════════ */}
      <Section icon={Briefcase} title="Job Info">
        <div className="space-y-0">
          <Row label="Job ID" value={job.id} />
          <Row label="Status" value={<StatusBadge status={job.status} />} />
          <Row
            label="Type"
            value={
              job.jobType
                ? job.jobType === 'convoy' ? 'Convoy' : job.jobType === 'route-survey' ? 'Route Survey' : job.jobType === 'survey' ? 'Survey' : job.jobType
                : undefined
            }
          />
        </div>
        {job.description && (
          <div className="pt-2 mt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
          </div>
        )}
      </Section>

      {/* ═══════════════════════════════════════════════════
          NOTES  (collapsed — only if content exists)
          ═══════════════════════════════════════════════════ */}
      {job.specialInstructions && (
        <Section icon={FileText} title="Special Instructions">
          <p className="text-sm text-gray-700 leading-relaxed">{job.specialInstructions}</p>
        </Section>
      )}
    </div>
  );
}