import { useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from './ui/drawer';
import {
  ChevronLeft,
  Users,
  Building2,
  Star,
  Award,
  Globe,
  Info,
  Lock,
  AlertCircle,
  Send,
  Truck,
  Check,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
export interface GroupPilotCar {
  id: string;
  name: string;
  company: string;
  type: string;
  rating: number;
  experience: string;
}

export interface PilotCarGroup {
  id: string;
  name: string;
  pilotCars: GroupPilotCar[];
}

export type AllocationMode = 'open' | 'group';

export interface AllocationResult {
  mode: AllocationMode;
  groupId?: string;
  groupName?: string;
  pilotCars?: GroupPilotCar[];
}

interface PilotCarAllocationProps {
  onBack: () => void;
  onConfirm: (allocation: AllocationResult) => void;
  jobTitle?: string;
  stateCount?: number;
  /** Groups created by the logged-in user (company-specific). */
  groups?: PilotCarGroup[];
  /** Role-based access — user must be able to create & post jobs. Defaults to true. */
  canPostJobs?: boolean;
}

// ──────────────────────────────────────────────
// Mock data — pilot car groups created by the logged-in user.
// Business rule: groups are company-specific and contain only
// active & qualified pilot cars.
// ──────────────────────────────────────────────
const DEFAULT_GROUPS: PilotCarGroup[] = [
  {
    id: 'grp-1',
    name: 'My Trusted Escorts',
    pilotCars: [
      { id: 'pc-1', name: 'John Anderson', company: 'SafeRoute Escorts', type: 'Lead / Chase', rating: 4.9, experience: '8 years' },
      { id: 'pc-2', name: 'Mike Rodriguez', company: 'Premier Escort LLC', type: 'Lead / Pole', rating: 5.0, experience: '15 years' },
      { id: 'pc-3', name: 'David Martinez', company: 'Pacific Pilot Pros', type: 'High-Pole', rating: 4.9, experience: '9 years' },
    ],
  },
  {
    id: 'grp-2',
    name: 'West Coast Partners',
    pilotCars: [
      { id: 'pc-4', name: 'Sarah Mitchell', company: 'Convoy Pro Services', type: 'Pole / High-Pole', rating: 4.8, experience: '12 years' },
      { id: 'pc-5', name: 'Lisa Chen', company: 'Highway Guardians', type: 'Chase', rating: 4.7, experience: '6 years' },
    ],
  },
  {
    id: 'grp-3',
    name: 'Heavy Haul Specialists',
    pilotCars: [
      { id: 'pc-6', name: 'Robert Taylor', company: 'Elite Pilot Solutions', type: 'Pole / High-Pole', rating: 4.8, experience: '11 years' },
      { id: 'pc-7', name: 'Jennifer Wilson', company: 'TransGuide Services', type: 'Lead', rating: 4.6, experience: '7 years' },
    ],
  },
];

// Stable avatar tints for pilot car initials.
const AVATAR_TINTS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// ──────────────────────────────────────────────
// Selectable posting-method tile
// ──────────────────────────────────────────────
interface MethodTileProps {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function MethodTile({ selected, onSelect, icon, title, description }: MethodTileProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative w-full text-left rounded-[10px] p-3.5 border transition-all duration-200 cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823]/50 ${
        selected
          ? 'border-[#F89823] bg-gradient-to-br from-[#FFF9F0] to-white shadow-[0px_4px_12px_0px_rgba(248,152,35,0.12)]'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon tile */}
        <div
          className={`w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 transition-colors duration-200 ${
            selected ? 'bg-[#F89823] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
            {/* Radio indicator */}
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                selected ? 'bg-[#F89823]' : 'border-2 border-gray-300 bg-white'
              }`}
            >
              {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </span>
          </div>
          <p className="text-[12px] text-[#4a5565] leading-relaxed mt-0.5">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default function PilotCarAllocation({
  onBack,
  onConfirm,
  jobTitle,
  stateCount,
  groups = DEFAULT_GROUPS,
  canPostJobs = true,
}: PilotCarAllocationProps) {
  const [mode, setMode] = useState<AllocationMode>('open');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const completedRef = useRef(false);

  const selectedGroup = useMemo(
    () => groups.find((g) => g.id === selectedGroupId),
    [groups, selectedGroupId]
  );

  const hasGroups = groups.length > 0;

  // Confirm & Post Job stays disabled until a group is chosen in group mode.
  const canConfirm =
    canPostJobs && (mode === 'open' || (mode === 'group' && !!selectedGroup));

  const recipientCount = mode === 'group' ? selectedGroup?.pilotCars.length ?? 0 : undefined;

  const handleCancel = () => {
    // Discard unsaved changes and close the screen.
    setMode('open');
    setSelectedGroupId('');
    onBack();
  };

  // Post the job → open the success bottom sheet.
  const handleConfirm = () => {
    if (!canConfirm) return;
    setShowSuccess(true);
  };

  // Finalize once, when the user dismisses the success sheet.
  const completePost = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (mode === 'group' && selectedGroup) {
      onConfirm({
        mode: 'group',
        groupId: selectedGroup.id,
        groupName: selectedGroup.name,
        pilotCars: selectedGroup.pilotCars,
      });
    } else {
      onConfirm({ mode: 'open' });
    }
  };

  // ──────────────────────────────────────────────
  // Accessibility gate — only users with job-posting
  // permission can allocate pilot cars.
  // ──────────────────────────────────────────────
  if (!canPostJobs) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f8f8fa] flex flex-col">
        <div className="flex-none bg-white border-b border-gray-200">
          <div className="flex items-center h-14 px-4">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-[16px] font-semibold text-[#101828]">Pilot Car Allocation</h1>
            </div>
            <div className="w-9" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-gray-400" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#101828]">Access Restricted</h2>
          <p className="text-[13px] text-[#4a5565] mt-2 leading-relaxed">
            You don&apos;t have permission to post jobs. Pilot Car Group allocation is available
            only to users with job-posting access.
          </p>
          <Button
            onClick={onBack}
            variant="outline"
            className="h-11 mt-6 px-6 border-gray-300"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f8fa] flex flex-col">
      {/* Header */}
      <div className="flex-none bg-white border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-[16px] font-semibold text-[#101828]">Pilot Car Allocation</h1>
            <p className="text-[11px] text-[#4a5565] mt-0.5">Final step — choose who receives this job</p>
          </div>
          <div className="w-9" />
        </div>
        <div className="h-[3px] bg-gray-100">
          <div className="h-full bg-[#F89823]" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-32 space-y-5">

          {/* ── Job summary ────────────────── */}
          {(jobTitle || stateCount) && (
            <div className="flex items-center gap-3 px-3.5 py-3 bg-gradient-to-br from-[#FFFBF5] to-white border border-[#F89823]/20 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.06)]">
              <div className="w-9 h-9 rounded-[8px] bg-[#FFF3E0] flex items-center justify-center shrink-0">
                <Truck className="w-4.5 h-4.5 text-[#E67E00]" />
              </div>
              <div className="min-w-0">
                {jobTitle && (
                  <p className="text-[13px] font-semibold text-[#101828] truncate">{jobTitle}</p>
                )}
                {!!stateCount && (
                  <p className="text-[11px] text-[#4a5565] mt-0.5 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                    {stateCount} state job{stateCount > 1 ? 's' : ''} configured
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Section: Posting Method ────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 px-0.5">
              <h3 className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">Posting Method</h3>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="space-y-2.5">
              <MethodTile
                selected={mode === 'open'}
                onSelect={() => setMode('open')}
                icon={<Globe className="w-5 h-5" />}
                title="Open Posting"
                description="Send to every qualified pilot car on the network."
              />
              <MethodTile
                selected={mode === 'group'}
                onSelect={() => setMode('group')}
                icon={<Users className="w-5 h-5" />}
                title="Select Pilot Car Group"
                description="Limit the posting to a trusted group you've created."
              />
            </div>
          </div>


          {/* ── Group selection ────────────────── */}
          {mode === 'group' && (
            <div className="bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-purple-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#101828]">Pilot Car Group</h3>
              </div>

              <div className="p-4 space-y-4">
                {!hasGroups ? (
                  /* Empty state — no groups created by the user */
                  <div className="rounded-[10px] border border-dashed border-gray-300 bg-gray-50/70 py-8 px-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      No Pilot Car Groups Available
                    </p>
                    <p className="text-[12px] text-[#4a5565] mt-1.5 leading-relaxed max-w-[260px] mx-auto">
                      You haven&apos;t created any pilot car groups yet. Create a group to restrict
                      this job to a trusted set of pilot cars.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Select Group <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                        <SelectTrigger className="h-12 rounded-[8px]">
                          <SelectValue placeholder="Choose a pilot car group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map((g) => (
                            <SelectItem key={g.id} value={g.id}>
                              {g.name} · {g.pilotCars.length} car{g.pilotCars.length !== 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!selectedGroup && (
                        <p className="text-[11px] text-[#4a5565] flex items-start gap-1.5 pt-1">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" />
                          Only pilot cars in the selected group will receive this job posting.
                        </p>
                      )}
                    </div>

                    {/* Pilot cars in the selected group */}
                    {selectedGroup && (
                      <div className="space-y-2.5">
                    

                        <div className="flex items-center justify-between pt-0.5">
                          <p className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                            Group Members
                          </p>
                        </div>

                        {selectedGroup.pilotCars.map((pc, idx) => (
                          <div
                            key={pc.id}
                            className="bg-white rounded-[8px] border border-gray-200 p-3 transition-colors hover:border-gray-300"
                          >
                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold ${AVATAR_TINTS[idx % AVATAR_TINTS.length]}`}
                              >
                                {getInitials(pc.name)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-[13px] font-semibold text-[#101828] truncate">
                                      {pc.name}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                                      <p className="text-[11.5px] text-[#4a5565] truncate">{pc.company}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    <span className="text-[12px] font-semibold text-[#101828] tabular-nums">
                                      {pc.rating.toFixed(1)}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10.5px] font-semibold px-2 py-0.5 rounded-md">
                                    <Truck className="w-3 h-3" />
                                    {pc.type}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#4a5565]">
                                    <Award className="w-3 h-3 text-gray-400" />
                                    {pc.experience}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky Bottom CTA ────────────────── */}
      <div className="flex-none bg-white border-t border-gray-200 px-4 pt-3 pb-3 safe-area-bottom shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.04)]">
        <div className="space-y-2.5">
          {/* Summary */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#f9fafb] border border-[#cfcdcd]/60 rounded-[8px]">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                mode === 'open' ? 'bg-blue-100' : 'bg-purple-100'
              }`}
            >
              {mode === 'open' ? (
                <Globe className="w-3.5 h-3.5 text-blue-600" />
              ) : (
                <Users className="w-3.5 h-3.5 text-purple-600" />
              )}
            </div>
            <span className="text-[12px] text-[#4a5565] leading-snug">
              {mode === 'open' ? (
                <>Posting to <span className="font-semibold text-[#101828]">all qualified pilot cars</span></>
              ) : selectedGroup ? (
                <>
                  Posting to <span className="font-semibold text-[#101828]">{selectedGroup.name}</span>
                  {' '}· {selectedGroup.pilotCars.length} pilot car
                  {selectedGroup.pilotCars.length !== 1 ? 's' : ''}
                </>
              ) : (
                <>Select a pilot car group to continue</>
              )}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_1.6fr] gap-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="h-12 rounded-[8px] border-gray-300 text-[15px] font-semibold text-[#4a5565] active:scale-[0.98] transition-transform"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={`h-12 rounded-[8px] font-semibold text-[15px] transition-all active:scale-[0.98] ${
                canConfirm
                  ? 'bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] shadow-[0px_4px_12px_0px_rgba(248,152,35,0.28)]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canConfirm ? (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  Confirm &amp; Post
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 mr-1.5" />
                  Select a Group
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Success Bottom Sheet ────────────────── */}
      <Drawer
        open={showSuccess}
        onOpenChange={(open) => {
          if (!open) completePost();
        }}
      >
        <DrawerContent className="max-h-[85vh]">
          <DrawerTitle className="sr-only">Job Posted Successfully</DrawerTitle>
          <DrawerDescription className="sr-only">
            Your pilot car job has been posted.
          </DrawerDescription>

          <div className="px-5 pt-3 pb-6 flex flex-col items-center text-center">
            {/* Success badge */}
            <div className="relative mb-4 mt-1">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0px_8px_24px_0px_rgba(16,185,129,0.35)]">
                <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.2} />
              </div>
            </div>

            <h2 className="text-[19px] font-bold text-[#101828]">Job Posted!</h2>
            <p className="text-[13px] text-[#4a5565] mt-1.5 leading-relaxed max-w-[300px]">
              {mode === 'group' && selectedGroup ? (
                <>
                  Your job has been sent to the{' '}
                  <span className="font-semibold text-[#101828]">{selectedGroup.name}</span> group.
                </>
              ) : (
                <>Your job has been posted to all qualified pilot cars.</>
              )}
            </p>

            {/* Recipient summary chip */}
            <div className="mt-4 w-full rounded-[10px] border border-gray-100 bg-[#f9fafb] px-4 py-3 flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  mode === 'group' ? 'bg-purple-100' : 'bg-blue-100'
                }`}
              >
                {mode === 'group' ? (
                  <Users className="w-4.5 h-4.5 text-purple-600" />
                ) : (
                  <Globe className="w-4.5 h-4.5 text-blue-600" />
                )}
              </div>
              <div className="min-w-0 text-left flex-1">
                <p className="text-[12px] text-[#4a5565]">Notified</p>
                <p className="text-[13px] font-semibold text-[#101828] truncate">
                  {mode === 'group'
                    ? `${recipientCount} pilot car${recipientCount !== 1 ? 's' : ''} in ${selectedGroup?.name ?? 'group'}`
                    : 'All qualified pilot cars'}
                </p>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>


            {/* Done */}
            <Button
              onClick={completePost}
              className="mt-5 w-full h-12 rounded-[8px] bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold text-[15px] shadow-[0px_4px_12px_0px_rgba(248,152,35,0.28)] active:scale-[0.98] transition-all"
            >
              Done
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
