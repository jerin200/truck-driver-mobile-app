import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioCard } from './ui/radio-card';
import { CountInput } from './ui/count-input';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronRight, 
  Info, 
  Truck, 
  Package, 
  MapPin,
  Clock,
  DollarSign,
  Check,
  AlertCircle,
  Route,
  Car
} from 'lucide-react';
import { useSnackbar } from '../contexts/SnackbarContext';
import RouteMapSelector from './RouteMapSelector';

interface AddJobProps {
  onClose: () => void;
  onSave?: (data: any) => void;
  tripData?: {
    id: string;
    origin: string;
    destination: string;
    states: string[];
    distance?: string;
    load?: {
      commodityType: string;
      weight: string;
      height: string;
      width: string;
      length: string;
      grossVehicleWeight?: string;
    };
  };
}

interface StateConfig {
  code: string;
  name: string;
  entryTime: string;
  exitTime: string;
  meetingLocation: string;
  contactName: string;
  contactPhone: string;
  bidExpiryOption: 'automatic' | 'custom';
  bidExpiryDate: string;
  bidExpiryTime: string;
  specialInstructions: string;
  routeOption: 'default' | 'modify';
  routeNotes: string;
  pricingType: string;
  baseRate: string;
  waitingRate: string;
  overtimeRate: string;
  layoverAmount: string;
}

// Available states - matching screenshot
const AVAILABLE_STATES = [
  { code: 'CA', name: 'California' },
  { code: 'OR', name: 'Oregon' },
  { code: 'NV', name: 'Nevada' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'UT', name: 'Utah' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'TX', name: 'Texas' },
];

export default function AddJob({ onClose, onSave, tripData }: AddJobProps) {
  const { showSnackbar } = useSnackbar();
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1 State
  const [jobTitle, setJobTitle] = useState('Pilot Car Job – Sacramento, CA to Phoenix, AZ');
  const [jobType, setJobType] = useState('');
  const [tripInfoOpen, setTripInfoOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  
  // Pilot Car Requirements
  const [pilotCarType, setPilotCarType] = useState('');
  const [frontCarCount, setFrontCarCount] = useState('1');
  const [rearCarCount, setRearCarCount] = useState('1');
  
  // Step 2 State
  const [activeTab, setActiveTab] = useState<string>('');
  const [stateConfigs, setStateConfigs] = useState<Record<string, StateConfig>>({});

  // Ref for horizontal scroll of state tabs
  const tabScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into center view
  useEffect(() => {
    if (step === 2 && activeTab && tabScrollRef.current) {
      const container = tabScrollRef.current;
      const activeButton = container.querySelector(`[data-state-tab="${activeTab}"]`) as HTMLElement;
      if (activeButton) {
        const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeTab, step]);

  // Toggle state selection
  const toggleState = (code: string) => {
    if (selectedStates.includes(code)) {
      setSelectedStates(selectedStates.filter(s => s !== code));
      // Remove config if exists
      const newConfigs = { ...stateConfigs };
      delete newConfigs[code];
      setStateConfigs(newConfigs);
    } else {
      setSelectedStates([...selectedStates, code]);
      // Initialize config
      const stateName = AVAILABLE_STATES.find(s => s.code === code)?.name || code;
      setStateConfigs({
        ...stateConfigs,
        [code]: {
          code,
          name: stateName,
          entryTime: '',
          exitTime: '',
          meetingLocation: '',
          contactName: '',
          contactPhone: '',
          bidExpiryOption: 'automatic',
          bidExpiryDate: '',
          bidExpiryTime: '',
          specialInstructions: '',
          routeOption: 'default',
          routeNotes: '',
          pricingType: '',
          baseRate: '',
          waitingRate: '',
          overtimeRate: '',
          layoverAmount: '',
        },
      });
    }
  };

  const handleNext = () => {
    if (selectedStates.length > 0) {
      setActiveTab(selectedStates[0]);
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const updateStateConfig = (code: string, updates: Partial<StateConfig>) => {
    setStateConfigs({
      ...stateConfigs,
      [code]: {
        ...stateConfigs[code],
        ...updates,
      },
    });
  };

  const handleSubmit = () => {
    const data = {
      jobTitle,
      jobType,
      selectedStates,
      stateConfigs,
    };
    onSave?.(data);
    onClose();
    showSnackbar('Job posted successfully!', 'success');
  };

  // Check if a single state has its required fields filled
  const isStateConfigured = (stateCode: string): boolean => {
    const config = stateConfigs[stateCode];
    if (!config) return false;
    const hasRequired =
      config.entryTime &&
      config.exitTime &&
      config.meetingLocation &&
      config.contactName &&
      config.contactPhone &&
      config.pricingType &&
      config.baseRate;
    if (config.bidExpiryOption === 'custom') {
      return !!(hasRequired && config.bidExpiryDate && config.bidExpiryTime);
    }
    return !!hasRequired;
  };

  // Validate if all required fields are filled for all states
  const isAllStatesConfigured = () => {
    return selectedStates.every((stateCode) => isStateConfigured(stateCode));
  };

  const configuredCount = useMemo(
    () => selectedStates.filter(s => isStateConfigured(s)).length,
    [selectedStates, stateConfigs]
  );

  const isStep1Valid = jobTitle && jobType && selectedStates.length > 0;

  // ──────────────────────────────────────────────
  // Step 1: Job Info & State Selection
  // ──────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="flex flex-col h-full bg-[#f8f8fa]">
      {/* Header */}
      <div className="flex-none bg-white border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={onClose}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-[16px] font-semibold text-[#101828]">
              Post Pilot Car Job
            </h1>
            <p className="text-[11px] text-[#4a5565] mt-0.5">Step 1 of 2 — Select States</p>
          </div>
          {/* Spacer to balance the back button */}
          <div className="w-9" />
        </div>
        {/* Progress bar */}
        <div className="h-[3px] bg-gray-100">
          <div className="h-full bg-[#F89823] transition-all duration-300" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-28 space-y-5">

          {/* ── Section: Job Details ────────────────── */}
          <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#FFF3E0] flex items-center justify-center">
                <Truck className="w-4 h-4 text-[#E67E00]" />
              </div>
              <h3 className="text-[14px] font-semibold text-[#101828]">Job Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Pilot Car Job – Sacramento to Phoenix"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <RadioCard
                    value="convoy"
                    selectedValue={jobType}
                    onChange={setJobType}
                    title="Convoy"
                    description="Multi-vehicle escort operation"
                    variant="orange"
                  />
                  <RadioCard
                    value="route-survey"
                    selectedValue={jobType}
                    onChange={setJobType}
                    title="Route Survey"
                    description="Pre-trip route assessment"
                    variant="orange"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Pilot Car Requirements ────────────── */}
          <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-orange-50 flex items-center justify-center">
                <Car className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-[14px] font-semibold text-[#101828]">Pilot Car Requirements</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                  Car Type <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <RadioCard
                    value="front"
                    selectedValue={pilotCarType}
                    onChange={setPilotCarType}
                    title="Front Car Only"
                    description="Lead vehicle ahead of load"
                    variant="orange"
                  />
                  <RadioCard
                    value="rear"
                    selectedValue={pilotCarType}
                    onChange={setPilotCarType}
                    title="Rear Car Only"
                    description="Follow vehicle behind load"
                    variant="orange"
                  />
                  <RadioCard
                    value="both"
                    selectedValue={pilotCarType}
                    onChange={setPilotCarType}
                    title="Both Front & Rear"
                    description="Complete front and rear escort"
                    variant="orange"
                  />
                </div>
              </div>

              {/* Show count selectors based on selection */}
              {pilotCarType && (
                <div className="pt-2 space-y-3">
                  {(pilotCarType === 'front' || pilotCarType === 'both') && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-[6px]">
                      <div>
                        <p className="text-[13px] font-semibold text-[#101828]">Front Cars</p>
                        <p className="text-[11px] text-[#4a5565]">Lead vehicles needed</p>
                      </div>
                      <CountInput
                        value={frontCarCount}
                        onChange={setFrontCarCount}
                        min={1}
                        max={5}
                        label=""
                      />
                    </div>
                  )}
                  
                  {(pilotCarType === 'rear' || pilotCarType === 'both') && (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-[6px]">
                      <div>
                        <p className="text-[13px] font-semibold text-[#101828]">Rear Cars</p>
                        <p className="text-[11px] text-[#4a5565]">Follow vehicles needed</p>
                      </div>
                      <CountInput
                        value={rearCarCount}
                        onChange={setRearCarCount}
                        min={1}
                        max={5}
                        label=""
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Section: Trip & Load Info (Collapsible) ── */}
          <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
            <button
              onClick={() => setTripInfoOpen(!tripInfoOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-blue-50 flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-[14px] font-semibold text-[#101828]">
                  Trip & Load Information
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-[#4a5565] text-[10px] rounded font-semibold uppercase tracking-wider">
                  Read Only
                </span>
                <div className={`transition-transform duration-200 ${tripInfoOpen ? 'rotate-0' : '-rotate-90'}`}>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </button>

            {tripInfoOpen && (
              <div className="border-t border-gray-100">
                {/* Trip Info */}
                <div className="px-4 py-4 bg-[#f9fafb]">
                  <div className="flex items-center gap-2 mb-3">
                    <Route className="w-3.5 h-3.5 text-blue-600" />
                    <h4 className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider">
                      Trip Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div>
                      <p className="text-[11px] text-[#4a5565] mb-0.5">Trip ID</p>
                      <p className="text-[14px] font-semibold text-[#101828]">{tripData?.id || 'TRP-2024-010'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#4a5565] mb-0.5">Origin</p>
                      <p className="text-[14px] font-semibold text-[#101828]">{tripData?.origin || 'Sacramento, CA'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#4a5565] mb-0.5">Destination</p>
                      <p className="text-[14px] font-semibold text-[#101828]">{tripData?.destination || 'Phoenix, AZ'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#4a5565] mb-0.5">Distance</p>
                      <p className="text-[14px] font-semibold text-[#101828]">{tripData?.distance || '~1846'} mi</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[11px] text-[#4a5565] mb-0.5">Route States</p>
                      <p className="text-[13px] font-medium text-[#101828]">
                        {(tripData?.states || AVAILABLE_STATES.map(s => s.name)).join(' → ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Load Info */}
                <div className="px-4 py-4 bg-white border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-3.5 h-3.5 text-green-600" />
                    <h4 className="text-[11px] font-semibold text-green-800 uppercase tracking-wider">
                      Load Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Commodity', value: tripData?.load?.commodityType || 'Standard' },
                      { label: 'Weight', value: `${tripData?.load?.weight || '80000'} lbs` },
                      { label: 'Height', value: tripData?.load?.height || "13'6\"" },
                      { label: 'Width', value: tripData?.load?.width || "8'6\"" },
                      { label: 'Length', value: tripData?.load?.length || "53'" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-[11px] text-[#4a5565] mb-0.5">{item.label}</p>
                        <p className="text-[14px] font-semibold text-[#101828]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 border border-blue-100 rounded-[6px]">
                    <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      Trip & load data is managed in Trip Creation and cannot be edited here.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Section: Select States ────────────────── */}
          <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-green-50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#101828]">Select States</h3>
              </div>
              {selectedStates.length > 0 && (
                <span className="px-2.5 py-1 bg-[#FFF3E0] text-[#E67E00] text-[12px] rounded-full font-semibold tabular-nums">
                  {selectedStates.length} selected
                </span>
              )}
            </div>

            <div className="p-4 space-y-3">
              {/* Info banner */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-[6px] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-blue-800 leading-relaxed">
                  Each selected state creates an independent job for bidding. Bids and awards are managed separately per state.
                </p>
              </div>

              <p className="text-[13px] text-[#4a5565] leading-relaxed">
                Select only the states for which you want to create a pilot car job now.
              </p>

              {/* State Selection Chips */}
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_STATES.map((state) => {
                  const isSelected = selectedStates.includes(state.code);
                  return (
                    <button
                      key={state.code}
                      onClick={() => toggleState(state.code)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#F89823] text-[#1a1a1a] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.3)]'
                          : 'bg-white text-[#717182] border border-[#cfcdcd]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {state.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom CTA ────────────────── */}
      <div className="flex-none bg-white border-t border-[#cfcdcd] px-4 py-3 safe-area-bottom">
        <Button
          onClick={handleNext}
          disabled={!isStep1Valid}
          className={`w-full h-12 rounded-[6px] font-semibold text-[15px] transition-all active:scale-[0.98] ${
            isStep1Valid
              ? 'bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.25)]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isStep1Valid ? (
            <>
              Next: Configure {selectedStates.length} State{selectedStates.length > 1 ? 's' : ''}
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 mr-1.5" />
              {!jobTitle ? 'Enter a job title' : !jobType ? 'Select a job type' : 'Select at least 1 state'}
            </>
          )}
        </Button>
      </div>
    </div>
  );

  // ──────────────────────────────────────────────
  // Step 2: Configure State Details
  // ──────────────────────────────────────────────
  const renderStep2 = () => {
    const currentConfig = stateConfigs[activeTab];

    return (
      <div className="flex flex-col h-full bg-[#f8f8fa]">
        {/* Header */}
        <div className="flex-none bg-white border-b border-gray-200">
          <div className="flex items-center h-14 px-4">
            <button
              onClick={handleBack}
              className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-[16px] font-semibold text-[#101828]">
                Configure States
              </h1>
              <p className="text-[11px] text-[#4a5565] mt-0.5">
                Step 2 of 2 — {configuredCount}/{selectedStates.length} configured
              </p>
            </div>
            <div className="w-9" />
          </div>
          {/* Progress bar */}
          <div className="h-[3px] bg-gray-100">
            <div
              className="h-full bg-[#F89823] transition-all duration-300"
              style={{ width: selectedStates.length > 0 ? `${50 + (configuredCount / selectedStates.length) * 50}%` : '50%' }}
            />
          </div>
        </div>

        {/* State Tabs — Horizontal Scroll */}
        <div className="flex-none bg-white border-b border-gray-100 px-3 py-2.5">
          <div ref={tabScrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide">
            {selectedStates.map((code) => {
              const isActive = activeTab === code;
              const isDone = isStateConfigured(code);
              const stateName = AVAILABLE_STATES.find(s => s.code === code)?.name || code;
              return (
                <button
                  key={code}
                  data-state-tab={code}
                  onClick={() => setActiveTab(code)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#F89823] text-[#1a1a1a] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.3)]'
                      : isDone
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-[#4a5565]'
                  }`}
                >
                  {isDone && !isActive && <Check className="w-3.5 h-3.5 text-green-600" />}
                  {stateName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          {currentConfig && (
            <div className="px-4 pt-4 pb-36 space-y-4">

              {/* ── Card: Schedule ────────────────── */}
              <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-blue-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#101828]">Schedule</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Entry Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        value={currentConfig.entryTime}
                        onChange={(e) => updateStateConfig(activeTab, { entryTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Exit Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        value={currentConfig.exitTime}
                        onChange={(e) => updateStateConfig(activeTab, { exitTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Card: Meeting Details ────────────── */}
              <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-purple-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#101828]">Meeting Details</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                      Meeting Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={currentConfig.meetingLocation}
                      onChange={(e) => updateStateConfig(activeTab, { meetingLocation: e.target.value })}
                      placeholder="e.g. Rest area on I-5, Mile Marker 42"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Contact Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={currentConfig.contactName}
                        onChange={(e) => updateStateConfig(activeTab, { contactName: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        value={currentConfig.contactPhone}
                        onChange={(e) => updateStateConfig(activeTab, { contactPhone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Card: Bid Expiry ────────────────── */}
              <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-amber-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#101828]">Bid Expiry</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <RadioCard
                      value="automatic"
                      selectedValue={currentConfig.bidExpiryOption}
                      onChange={(value) => updateStateConfig(activeTab, { bidExpiryOption: value as 'automatic' | 'custom' })}
                      title="Automatic (24 hours)"
                      description="System expires bids after 24 hrs"
                      variant="orange"
                    />
                    <div>
                      <RadioCard
                        value="custom"
                        selectedValue={currentConfig.bidExpiryOption}
                        onChange={(value) => updateStateConfig(activeTab, { bidExpiryOption: value as 'automatic' | 'custom' })}
                        title="Set Custom Expiry"
                        description="Define a custom expiry time"
                        variant="orange"
                      />
                      {currentConfig.bidExpiryOption === 'custom' && (
                        <div className="grid grid-cols-2 gap-3 mt-3 ml-9">
                          <div className="space-y-1.5">
                            <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                              Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="date"
                              value={currentConfig.bidExpiryDate}
                              onChange={(e) => updateStateConfig(activeTab, { bidExpiryDate: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                              Time <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="time"
                              value={currentConfig.bidExpiryTime}
                              onChange={(e) => updateStateConfig(activeTab, { bidExpiryTime: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                      Special Instructions
                    </Label>
                    <Textarea
                      value={currentConfig.specialInstructions}
                      onChange={(e) => updateStateConfig(activeTab, { specialInstructions: e.target.value })}
                      placeholder="Any special instructions for this state..."
                      className="min-h-[72px]"
                    />
                  </div>
                </div>
              </div>

              {/* ── Card: Route Option ────────────────── */}
              <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-teal-50 flex items-center justify-center">
                    <Route className="w-4 h-4 text-teal-600" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#101828]">Route for {currentConfig.code}</h3>
                </div>
                <div className="p-4 space-y-2">
                  <RadioCard
                    value="default"
                    selectedValue={currentConfig.routeOption}
                    onChange={(value) => updateStateConfig(activeTab, { routeOption: value as 'default' | 'modify' })}
                    title="Use Trip Route (Default)"
                    description="Use the overall trip route"
                    variant="orange"
                  />
                  <div>
                    <RadioCard
                      value="modify"
                      selectedValue={currentConfig.routeOption}
                      onChange={(value) => updateStateConfig(activeTab, { routeOption: value as 'default' | 'modify' })}
                      title="Modify Route"
                      description={`Custom route for ${currentConfig.name}`}
                      variant="orange"
                    />
                    {currentConfig.routeOption === 'modify' && (
                      <div className="mt-3 ml-9 space-y-2">
                        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-[6px]">
                          <p className="text-[11px] text-amber-800">
                            Route override applies only to {currentConfig.name} ({currentConfig.code}).
                          </p>
                        </div>
                        <RouteMapSelector
                          onRouteChange={(waypoints) => {
                            updateStateConfig(activeTab, { 
                              routeNotes: `Custom route with ${waypoints.length} waypoints` 
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Card: Pricing ────────────────── */}
              <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.08)] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-[#FFFBF5] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-[#FFF3E0] flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-[#E67E00]" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#101828]">Pricing</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                      Pricing Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={currentConfig.pricingType}
                      onValueChange={(value) => updateStateConfig(activeTab, { pricingType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pricing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Rate</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="per-mile">Per Mile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Base Rate ($) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        value={currentConfig.baseRate}
                        onChange={(e) => updateStateConfig(activeTab, { baseRate: e.target.value })}
                        placeholder="2000"
                        className="tabular-nums"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Waiting ($/hr)
                      </Label>
                      <Input
                        type="number"
                        value={currentConfig.waitingRate}
                        onChange={(e) => updateStateConfig(activeTab, { waitingRate: e.target.value })}
                        placeholder="100"
                        className="tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Overtime ($/hr)
                      </Label>
                      <Input
                        type="number"
                        value={currentConfig.overtimeRate}
                        onChange={(e) => updateStateConfig(activeTab, { overtimeRate: e.target.value })}
                        placeholder="150"
                        className="tabular-nums"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-semibold text-[#4a5565] uppercase tracking-wider">
                        Layover ($)
                      </Label>
                      <Input
                        type="number"
                        value={currentConfig.layoverAmount}
                        onChange={(e) => updateStateConfig(activeTab, { layoverAmount: e.target.value })}
                        placeholder="0"
                        className="tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ── Sticky Bottom CTA ────────────────── */}
        <div className="flex-none bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
          <div className="space-y-2.5">
            {/* Summary Info */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-[#f9fafb] border border-[#cfcdcd]/60 rounded-[6px]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                  <Truck className="w-3 h-3 text-[#E67E00]" />
                </div>
                <span className="text-[13px] font-semibold text-[#101828]">
                  {selectedStates.length} job{selectedStates.length > 1 ? 's' : ''} will be posted
                </span>
              </div>
              <span className="text-[12px] text-[#4a5565] font-medium tabular-nums">
                {configuredCount}/{selectedStates.length} ready
              </span>
            </div>

            {/* Post Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isAllStatesConfigured()}
              className={`w-full h-12 rounded-[6px] font-semibold text-[15px] transition-all active:scale-[0.98] ${
                isAllStatesConfigured()
                  ? 'bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.25)]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isAllStatesConfigured() ? (
                <>
                  Post {selectedStates.length} Pilot Car Job{selectedStates.length > 1 ? 's' : ''}
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 mr-1.5" />
                  Complete all states to post
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f8fa]">
      {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
}