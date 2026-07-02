import { useState, useRef, useEffect, useCallback } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ChevronDown, Search, Calendar, Clock, Truck, Minus, Plus, X, MapPin } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { DatePicker, TimePicker } from "../ui/date-time-picker";
import { RadioCard } from "../ui/radio-card";
import { CountInput } from "../ui/count-input";
import type { PilotCarJobInfo, LoadInfo } from "../CreateTripPage";
import svgPaths from "../../imports/svg-5l7i6t91d9";

interface PilotCarJobTabProps {
  data: PilotCarJobInfo;
  onChange: (data: PilotCarJobInfo) => void;
  errors: Record<string, string>;
  tripId?: string;
  loadInfo?: LoadInfo;
  routeOrigin?: string;
  routeDestination?: string;
  routeStartDate?: string;
  routeStates?: string[];
  tripPermits?: Array<{ id: string; name: string; state: string }>;
}

// US States list
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Mock state permits data
const MOCK_STATE_PERMITS = [
  {
    id: 'ca-1',
    state: 'California',
    stateCode: 'CA',
    permitNumber: 'CA-2024-08000',
    jurisdiction: 'California Dept. of Transportation',
    validFrom: '2024-12-10',
    validTo: '2025-01-10',
    status: 'Approved'
  },
  {
    id: 'or-1',
    state: 'Oregon',
    stateCode: 'OR',
    permitNumber: 'OR-2024-12500',
    jurisdiction: 'Oregon Department of Transportation',
    validFrom: '2024-12-15',
    validTo: '2025-01-15',
    status: 'Approved'
  },
  {
    id: 'nv-1',
    state: 'Nevada',
    stateCode: 'NV',
    permitNumber: 'NV-2024-05020',
    jurisdiction: 'Nevada Department of Motor Vehicles',
    validFrom: '2024-12-12',
    validTo: '2025-01-12',
    status: 'Approved'
  },
  {
    id: 'az-1',
    state: 'Arizona',
    stateCode: 'AZ',
    permitNumber: 'AZ-2024-09876',
    jurisdiction: 'Arizona Department of Transportation',
    validFrom: '2024-12-18',
    validTo: '2025-01-18',
    status: 'Pending'
  }
];

export default function PilotCarJobTab({
  data,
  onChange,
  errors,
  loadInfo,
}: PilotCarJobTabProps) {
  const [openSections, setOpenSections] = useState({
    jobInfo: true,
    loadDetails: true,
    routeInfo: true,
    additionalInfo: true,
    pilotCar: true,
    schedule: true,
    pickup: true,
    pricing: true
  });
  const [expandedPermits, setExpandedPermits] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPermits, setSelectedPermits] = useState<string[]>([]);
  const [permitSelection, setPermitSelection] = useState('existing');

  // Pilot car positions state
  const [leadCount, setLeadCount] = useState('1');
  const [rearCount, setRearCount] = useState('1');
  const [highPoleCount, setHighPoleCount] = useState('1');
  const [chaseCount, setChaseCount] = useState('1');
  const [leadChecked, setLeadChecked] = useState(false);
  const [rearChecked, setRearChecked] = useState(false);
  const [highPoleChecked, setHighPoleChecked] = useState(false);
  const [chaseChecked, setChaseChecked] = useState(false);

  // Sync pilot car selections to data.pilotCarTypes
  useEffect(() => {
    const pilotCarTypes = {
      lead: { selected: leadChecked, count: parseInt(leadCount) || 0 },
      rear: { selected: rearChecked, count: parseInt(rearCount) || 0 },
      highPole: { selected: highPoleChecked, count: parseInt(highPoleCount) || 0 },
      chase: { selected: chaseChecked, count: parseInt(chaseCount) || 0 },
    };
    
    // Only update if the value has actually changed to prevent unnecessary re-renders
    const currentPilotCarTypes = data.pilotCarTypes || {};
    if (JSON.stringify(currentPilotCarTypes) !== JSON.stringify(pilotCarTypes)) {
      onChange({ ...data, pilotCarTypes });
    }
  }, [leadChecked, leadCount, rearChecked, rearCount, highPoleChecked, highPoleCount, chaseChecked, chaseCount, data, onChange]);

  // Manual state selection
  const [manualStates, setManualStates] = useState<Array<{
    id: string;
    state: string;
    positions: {
      lead: boolean;
      rear: boolean;
      highPole: boolean;
      steer: boolean;
    };
  }>>([]);
  const [expandedManualStates, setExpandedManualStates] = useState<string[]>([]);
  const [showStateModal, setShowStateModal] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [selectedStatesInModal, setSelectedStatesInModal] = useState<string[]>([]);
  const stateModalRef = useRef<HTMLDivElement>(null);

  // Close modal and reset when closing
  const closeStateModal = () => {
    setShowStateModal(false);
    setStateSearchQuery('');
    setSelectedStatesInModal([]);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showStateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showStateModal]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = useCallback((field: string, value: any) => {
    onChange({ ...data, [field]: value });
  }, [data, onChange]);

  const togglePermitExpand = (permitId: string) => {
    setExpandedPermits(prev =>
      prev.includes(permitId)
        ? prev.filter(id => id !== permitId)
        : [...prev, permitId]
    );
  };

  const handlePermitToggle = (permitId: string) => {
    setSelectedPermits(prev =>
      prev.includes(permitId)
        ? prev.filter(id => id !== permitId)
        : [...prev, permitId]
    );
  };

  const filteredPermits = MOCK_STATE_PERMITS.filter(permit =>
    permit.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPermitsCount = selectedPermits.length;
  const totalPositions = (leadChecked ? parseInt(leadCount) : 0) + (rearChecked ? parseInt(rearCount) : 0);

  // Get read-only values from loadInfo
  const commodityType = loadInfo?.commodityType || 'Standard';
  const grossVehicleWeight = loadInfo?.grossVehicleWeight || '80000';

  // Filter available states (exclude already added states)
  const availableStates = US_STATES.filter(
    state => !manualStates.some(ms => ms.state === state)
  );

  const filteredStates = availableStates.filter(state =>
    state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  const handleToggleStateInModal = (stateName: string) => {
    setSelectedStatesInModal(prev =>
      prev.includes(stateName)
        ? prev.filter(s => s !== stateName)
        : [...prev, stateName]
    );
  };

  const handleAddSelectedStates = () => {
    const newStates = selectedStatesInModal.map(stateName => ({
      id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      state: stateName,
      positions: { lead: false, rear: false, highPole: false, steer: false }
    }));
    setManualStates(prev => [...prev, ...newStates]);
    closeStateModal();
  };

  return (
    <div className="space-y-3 pb-6 bg-[#f6f6f6]">
      {/* Trip Info Header */}
      <div className="mx-4 mt-4">
        <div className="bg-gradient-to-r from-[#eff6ff] to-[#eef2ff] border border-[#bedbff] rounded-xl p-4">
          <div>
            <p className="text-[11px] font-medium text-[#155dfc] uppercase tracking-wide mb-0.5">
              Trip #TRP-2024-010
            </p>
            <h2 className="text-[15px] font-semibold text-[#000d26] leading-tight">
              Pilot Car Job – Sacramento, CA to Phoenix, AZ
            </h2>
          </div>
        </div>
      </div>

      {/* Job Information Section */}
      <Collapsible open={openSections.jobInfo} onOpenChange={() => toggleSection("jobInfo")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.jobInfo ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Job Information</h3>
                <p className="text-xs text-gray-500 mt-0.5">Basic job details</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.jobInfo ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
              <div className="space-y-2.5 pt-4">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={data.jobTitle || ''}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="Pilot Car Job – Sacramento, CA to Phoenix, AZ"
                  className={`h-12 bg-white border-[#e5e7eb] text-[14px] rounded-lg ${errors.jobTitle ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-600 mt-1.5 font-medium flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors.jobTitle}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <Label className="text-[14px] text-[#1a1a1a] font-medium mb-2">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  <RadioCard
                    value="convoy"
                    selectedValue={data.jobType || ''}
                    onChange={(value) => updateField("jobType", value)}
                    title="Convoy"
                    variant="blue"
                  />
                  <RadioCard
                    value="route-survey"
                    selectedValue={data.jobType || ''}
                    onChange={(value) => updateField("jobType", value)}
                    title="Route Survey"
                    variant="blue"
                  />
                </div>
                {errors.jobType && (
                  <p className="text-sm text-red-600 mt-1.5 font-medium flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors.jobType}
                  </p>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Load Details Section */}
      <Collapsible open={openSections.loadDetails} onOpenChange={() => toggleSection("loadDetails")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.loadDetails ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Load Details</h3>
                <p className="text-xs text-gray-500 mt-0.5">From trip load info</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.loadDetails ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="pt-4 divide-y divide-gray-200">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[14px] text-gray-600">Commodity Type</span>
                  <span className="text-[14px] text-[#1a1a1a] font-medium text-right">
                    {commodityType}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 pt-3">
                  <span className="text-[14px] text-gray-600">Gross Vehicle Weight</span>
                  <span className="text-[14px] text-[#1a1a1a] font-medium text-right">
                    {grossVehicleWeight} lbs
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 pt-3">
                  <span className="text-[14px] text-gray-600">Dimensions (L x W x H)</span>
                  <span className="text-[14px] text-[#1a1a1a] font-medium text-right">
                    {loadInfo?.length || '-'} x {loadInfo?.width || '-'} x {loadInfo?.height || '-'}
                  </span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Route Information Section */}
      <Collapsible open={openSections.routeInfo} onOpenChange={() => toggleSection("routeInfo")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.routeInfo ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Route Information</h3>
                <p className="text-xs text-gray-500 mt-0.5">Origin and destination</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.routeInfo ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
              <div className="space-y-2.5 pt-4">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Origin <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                  <Input
                    value={data.origin || ''}
                    onChange={(e) => updateField("origin", e.target.value)}
                    placeholder="Enter origin city, state"
                    className="h-12 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Destination <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                  <Input
                    value={data.destination || ''}
                    onChange={(e) => updateField("destination", e.target.value)}
                    placeholder="Enter destination city, state"
                    className="h-12 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Requested Route {permitSelection === 'manual' ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-xs font-normal">(Optional)</span>}
                </Label>
                <Textarea
                  value={data.requestedRoute || ''}
                  onChange={(e) => updateField("requestedRoute", e.target.value)}
                  placeholder="Enter requested route details..."
                  className="min-h-[100px] bg-white border-[#e5e7eb] text-[14px] rounded-lg resize-none"
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Additional Information Section */}
      <Collapsible open={openSections.additionalInfo} onOpenChange={() => toggleSection("additionalInfo")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.additionalInfo ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Additional Information</h3>
                <p className="text-xs text-gray-500 mt-0.5">Optional details</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.additionalInfo ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
              <div className="space-y-2.5 pt-4">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Special Instructions <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </Label>
                <Textarea
                  value={data.specialInstructions || ''}
                  onChange={(e) => updateField("specialInstructions", e.target.value)}
                  placeholder="Any special instructions or requirements for this job..."
                  className="min-h-[100px] bg-white border-[#e5e7eb] text-[14px] rounded-lg resize-none"
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Pilot Car Requirement Section */}
      <Collapsible open={openSections.pilotCar} onOpenChange={() => toggleSection("pilotCar")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.pilotCar ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Pilot Car Requirement</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedPermitsCount} permits, {totalPositions} positions</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.pilotCar ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
              <div className="pt-4">
                <div className="space-y-3">
                  <RadioCard
                    value="existing"
                    selectedValue={permitSelection}
                    onChange={(value) => setPermitSelection(value)}
                    title="Choose from Existing Permit"
                    description="4 permits available"
                    variant="blue"
                  />
                  <RadioCard
                    value="manual"
                    selectedValue={permitSelection}
                    onChange={(value) => setPermitSelection(value)}
                    title="Select Manually"
                    description="Configure positions yourself"
                    variant="blue"
                  />
                </div>
              </div>

              {/* Existing Permit Selection */}
              {permitSelection === 'existing' && (
                <>
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search states or permit numbers..."
                      className="h-12 bg-white border-[#e5e7eb] text-[14px] pl-10 rounded-lg"
                    />
                  </div>

                  {/* Permits List */}
                  <div className="space-y-3">
                    {filteredPermits.map((permit) => {
                  const isExpanded = expandedPermits.includes(permit.id);
                  const isSelected = selectedPermits.includes(permit.id);

                  return (
                    <div key={permit.id} className={`border-2 rounded-xl overflow-hidden transition-all ${
                      isSelected ? 'border-[#F89823] bg-orange-50' : 'border-gray-200 bg-white'
                    }`}>
                      {/* Permit Header */}
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handlePermitToggle(permit.id)}
                            className="mt-1 size-5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-[15px] font-semibold text-[#1a1a1a]">
                                  {permit.state}
                                </h4>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${
                                  permit.status === 'Approved' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {permit.status}
                                </span>
                              </div>
                              <button
                                onClick={() => togglePermitExpand(permit.id)}
                                className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                              >
                                <ChevronDown className={`size-4.5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                            <p className="text-[12px] text-gray-600 font-medium">
                              {permit.permitNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Permit Details - Expanded */}
                      {isExpanded && (
                        <div className="border-t-2 border-gray-200">
                          {/* Permit Information */}
                          <div className="p-4 bg-gray-50">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="size-4">
                                <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                                  <path d={svgPaths.pd1f0180} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                  <path d={svgPaths.p1c197ec0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                  <path d={svgPaths.p2f209b00} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </svg>
                              </div>
                              <p className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider">
                                Permit Information
                              </p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase mb-1 font-medium">Jurisdiction</p>
                                <p className="text-[12px] font-medium text-gray-900">{permit.jurisdiction}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase mb-1 font-medium">Valid Period</p>
                                <p className="text-[12px] font-medium text-gray-900">
                                  {permit.validFrom} to {permit.validTo}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Pilot Car Positions */}
                          {isSelected && (
                            <div className="border-t-2 border-gray-200 p-4 bg-white">
                              <p className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
                                Pilot Car Positions Needed
                              </p>
                              <div className="space-y-3">
                                {/* Lead */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={leadChecked}
                                    onCheckedChange={(checked) => setLeadChecked(checked as boolean)}
                                    className="size-5"
                                    id={`lead-${permit.id}`}
                                  />
                                  <Label htmlFor={`lead-${permit.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Lead
                                  </Label>
                                  <CountInput
                                    value={leadCount}
                                    onChange={setLeadCount}
                                    disabled={!leadChecked}
                                    label="Count:"
                                  />
                                </div>

                                {/* Rear */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={rearChecked}
                                    onCheckedChange={(checked) => setRearChecked(checked as boolean)}
                                    className="size-5"
                                    id={`rear-${permit.id}`}
                                  />
                                  <Label htmlFor={`rear-${permit.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Rear
                                  </Label>
                                  <CountInput
                                    value={rearCount}
                                    onChange={setRearCount}
                                    disabled={!rearChecked}
                                    label="Count:"
                                  />
                                </div>

                                {/* High Pole */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={highPoleChecked}
                                    onCheckedChange={(checked) => setHighPoleChecked(checked as boolean)}
                                    className="size-5"
                                    id={`high-pole-${permit.id}`}
                                  />
                                  <Label htmlFor={`high-pole-${permit.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    High Pole
                                  </Label>
                                  <CountInput
                                    value={highPoleCount}
                                    onChange={setHighPoleCount}
                                    disabled={!highPoleChecked}
                                    label="Count:"
                                  />
                                </div>

                                {/* Chase */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={chaseChecked}
                                    onCheckedChange={(checked) => setChaseChecked(checked as boolean)}
                                    className="size-5"
                                    id={`chase-${permit.id}`}
                                  />
                                  <Label htmlFor={`chase-${permit.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Chase
                                  </Label>
                                  <CountInput
                                    value={chaseCount}
                                    onChange={setChaseCount}
                                    disabled={!chaseChecked}
                                    label="Count:"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
                </>
              )}

              {/* Manual State Selection */}
              {permitSelection === 'manual' && (
                <div className="space-y-3">
                  {/* Add State Button */}
                  <button
                    type="button"
                    onClick={() => setShowStateModal(true)}
                    className="w-full h-12 flex items-center justify-center gap-2 bg-white border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors font-medium text-[14px]"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add State</span>
                  </button>

                  {/* State Cards */}
                  {manualStates.map((state) => {
                    const isExpanded = expandedManualStates.includes(state.id);

                    return (
                      <div key={state.id} className="border-2 rounded-xl overflow-hidden transition-all border-gray-200 bg-white">
                        {/* State Header */}
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[15px] font-semibold text-[#1a1a1a]">
                              {state.state}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setManualStates(prev => prev.filter(s => s.id !== state.id));
                                }}
                                className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                              >
                                <X className="size-4.5 text-red-600" />
                              </button>
                              <button
                                onClick={() => setExpandedManualStates(prev =>
                                  prev.includes(state.id)
                                    ? prev.filter(id => id !== state.id)
                                    : [...prev, state.id]
                                )}
                                className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                              >
                                <ChevronDown className={`size-4.5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* State Details - Expanded */}
                        {isExpanded && (
                          <div className="border-t-2 border-gray-200">
                            {/* Pilot Car Positions */}
                            <div className="border-t-2 border-gray-200 p-4 bg-white">
                              <p className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
                                Pilot Car Positions Needed
                              </p>
                              <div className="space-y-3">
                                {/* Lead */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={state.positions.lead}
                                    onCheckedChange={(checked) => {
                                      setManualStates(prev => prev.map(s => s.id === state.id ? {
                                        ...s,
                                        positions: {
                                          ...s.positions,
                                          lead: checked as boolean
                                        }
                                      } : s));
                                    }}
                                    className="size-5"
                                    id={`lead-${state.id}`}
                                  />
                                  <Label htmlFor={`lead-${state.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Lead
                                  </Label>
                                  <CountInput
                                    value={leadCount}
                                    onChange={setLeadCount}
                                    disabled={!state.positions.lead}
                                    label="Count:"
                                  />
                                </div>

                                {/* Rear */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={state.positions.rear}
                                    onCheckedChange={(checked) => {
                                      setManualStates(prev => prev.map(s => s.id === state.id ? {
                                        ...s,
                                        positions: {
                                          ...s.positions,
                                          rear: checked as boolean
                                        }
                                      } : s));
                                    }}
                                    className="size-5"
                                    id={`rear-${state.id}`}
                                  />
                                  <Label htmlFor={`rear-${state.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Rear
                                  </Label>
                                  <CountInput
                                    value={leadCount}
                                    onChange={setLeadCount}
                                    disabled={!state.positions.rear}
                                    label="Count:"
                                  />
                                </div>

                                {/* High Pole */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={state.positions.highPole}
                                    onCheckedChange={(checked) => {
                                      setManualStates(prev => prev.map(s => s.id === state.id ? {
                                        ...s,
                                        positions: {
                                          ...s.positions,
                                          highPole: checked as boolean
                                        }
                                      } : s));
                                    }}
                                    className="size-5"
                                    id={`high-pole-${state.id}`}
                                  />
                                  <Label htmlFor={`high-pole-${state.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    High Pole
                                  </Label>
                                  <CountInput
                                    value={leadCount}
                                    onChange={setLeadCount}
                                    disabled={!state.positions.highPole}
                                    label="Count:"
                                  />
                                </div>

                                {/* Chase */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Checkbox
                                    checked={state.positions.steer}
                                    onCheckedChange={(checked) => {
                                      setManualStates(prev => prev.map(s => s.id === state.id ? {
                                        ...s,
                                        positions: {
                                          ...s.positions,
                                          steer: checked as boolean
                                        }
                                      } : s));
                                    }}
                                    className="size-5"
                                    id={`steer-${state.id}`}
                                  />
                                  <Label htmlFor={`steer-${state.id}`} className="text-[13px] font-medium text-gray-900 flex-1">
                                    Steer
                                  </Label>
                                  <CountInput
                                    value={leadCount}
                                    onChange={setLeadCount}
                                    disabled={!state.positions.steer}
                                    label="Count:"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              {errors.pilotCarTypes && (
                <div className="px-4 pb-2">
                  <p className="text-sm text-red-600 font-medium flex items-center gap-1 bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                    <span className="text-red-500 text-lg">⚠</span> {errors.pilotCarTypes}
                  </p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Schedule & Timing Section */}
      <Collapsible open={openSections.schedule} onOpenChange={() => toggleSection("schedule")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.schedule ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Schedule & Timing</h3>
                <p className="text-xs text-gray-500 mt-0.5">Job schedule details</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.schedule ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2" data-field="startDate">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                    <Input
                      type="date"
                      value={data.startDate || ''}
                      onChange={(e) => updateField("startDate", e.target.value)}
                      className={`h-12 bg-white text-[14px] rounded-lg pl-10 ${errors.startDate ? 'border-2 border-red-500 focus-visible:ring-red-500' : 'border-[#e5e7eb]'}`}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-sm text-red-600 mt-1.5 font-medium flex items-center gap-1">
                      <span className="text-red-500">⚠</span> {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                    <Input
                      type="time"
                      value={data.startTime || ''}
                      onChange={(e) => updateField("startTime", e.target.value)}
                      className={`h-12 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-10 ${errors.startTime ? 'border-2 border-red-500 focus-visible:ring-red-500' : 'border-[#e5e7eb]'}`}
                    />
                  </div>
                  {errors.startTime && (
                    <p className="text-sm text-red-600 mt-1.5 font-medium flex items-center gap-1">
                      <span className="text-red-500">⚠</span> {errors.startTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Time Zone <span className="text-red-500">*</span>
                  </Label>
                  <Select value={data.timeZone || 'PST'} onValueChange={(value) => updateField("timeZone", value)}>
                    <SelectTrigger className="h-12 bg-white border-[#e5e7eb] rounded-lg">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST">PST (Pacific)</SelectItem>
                      <SelectItem value="MST">MST (Mountain)</SelectItem>
                      <SelectItem value="CST">CST (Central)</SelectItem>
                      <SelectItem value="EST">EST (Eastern)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Estimated Duration <span className="text-red-500">*</span>
                  </Label>
                  <Select value={data.estimatedDuration || ''} onValueChange={(value) => updateField("estimatedDuration", value)}>
                    <SelectTrigger className="h-12 bg-white border-[#e5e7eb] rounded-lg">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-day">1 Day</SelectItem>
                      <SelectItem value="2-days">2 Days</SelectItem>
                      <SelectItem value="3-days">3 Days</SelectItem>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 border border-gray-200 py-2">
                <Checkbox 
                  id="multi-day-toggle"
                  checked={data.multiDayJob || false}
                  onCheckedChange={(checked) => updateField("multiDayJob", checked)}
                  className="size-5"
                />
                <Label htmlFor="multi-day-toggle" className="text-[14px] font-medium text-gray-900 cursor-pointer flex-1">
                  Multi-Day Job
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Meet at Job Start <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                    <Input
                      type="time"
                      value={data.meetAtJobStart || ''}
                      onChange={(e) => updateField("meetAtJobStart", e.target.value)}
                      className="h-12 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-10"
                    />
                  </div>
                </div>

                {data.multiDayJob && (
                  <div className="space-y-2" data-field="endDate">
                    <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                      Est. Completion Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-400 pointer-events-none z-10" />
                      <Input
                        type="date"
                        value={data.endDate || data.estCompletionDate || ''}
                        onChange={(e) => {
                          updateField("estCompletionDate", e.target.value);
                          updateField("endDate", e.target.value);
                        }}
                        className={`h-12 bg-white text-[14px] rounded-lg pl-10 ${errors.endDate ? 'border-2 border-red-500 focus-visible:ring-red-500' : 'border-[#e5e7eb]'}`}
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-sm text-red-600 mt-1.5 font-medium flex items-center gap-1">
                        <span className="text-red-500">⚠</span> {errors.endDate}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Pickup & Meeting Details Section */}
      <Collapsible open={openSections.pickup} onOpenChange={() => toggleSection("pickup")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.pickup ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Pickup & Meeting Details</h3>
                <p className="text-xs text-gray-500 mt-0.5">Meeting location & contact</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.pickup ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
              <div className="space-y-2">
                <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                  Meeting Location
                </Label>
                <Input
                  value={data.meetingLocation || ''}
                  onChange={(e) => updateField("meetingLocation", e.target.value)}
                  placeholder="Enter meeting location address"
                  className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                  Meeting Instructions
                </Label>
                <Textarea
                  value={data.meetingInstructions || ''}
                  onChange={(e) => updateField("meetingInstructions", e.target.value)}
                  placeholder="Provide specific instructions for the meeting..."
                  className="min-h-[90px] bg-white border-[#e5e7eb] text-[14px] rounded-lg resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Contact Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={data.contactName || ''}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    placeholder="Enter name"
                    className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] text-[#6b7280] font-medium uppercase tracking-wide">
                    Contact Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    value={data.contactPhone || ''}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Pricing Model Section */}
      <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection("pricing")}>
        <div className="mx-4 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <CollapsibleTrigger className="w-full">
            <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${openSections.pricing ? 'bg-gray-50' : ''}`}>
              <div className="text-left">
                <h3 className="font-semibold text-[15px] text-[#202224]">Pricing Model</h3>
                <p className="text-xs text-gray-500 mt-0.5">Job pricing details</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.pricing ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-6 max-w-3xl mx-auto">
              <div className="space-y-2">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Pricing Type
                </Label>
                <Select value={data.pricingType || ''} onValueChange={(value) => updateField("pricingType", value)}>
                  <SelectTrigger className="h-11 bg-white border-[#e5e7eb] rounded-lg">
                    <SelectValue placeholder="Select pricing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Rate</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="mileage">Per Mile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Base Rate <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={data.baseRate || ''}
                    onChange={(e) => updateField("baseRate", e.target.value)}
                    placeholder="0.00"
                    className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Cost per Mile
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={data.costPerMile || ''}
                      onChange={(e) => updateField("costPerMile", e.target.value)}
                      placeholder="0.00"
                      className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Cost per Hour
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={data.costPerHour || ''}
                      onChange={(e) => updateField("costPerHour", e.target.value)}
                      placeholder="0.00"
                      className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[14px] text-[#1a1a1a] font-medium">
                  Minimum Daily Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    type="number"
                    value={data.minimumDailyRate || ''}
                    onChange={(e) => updateField("minimumDailyRate", e.target.value)}
                    placeholder="0.00"
                    className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Waiting Rate <span className="text-gray-400 text-xs font-normal">($/hr)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={data.waitingRate || ''}
                      onChange={(e) => updateField("waitingRate", e.target.value)}
                      placeholder="0.00"
                      className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Grace Period <span className="text-gray-400 text-xs font-normal">(min)</span>
                  </Label>
                  <Input
                    type="number"
                    value={data.gracePeriod || ''}
                    onChange={(e) => updateField("gracePeriod", e.target.value)}
                    placeholder="15"
                    className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Overtime Rate <span className="text-gray-400 text-xs font-normal">($/hr)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={data.overtimeRate || ''}
                      onChange={(e) => updateField("overtimeRate", e.target.value)}
                      placeholder="0.00"
                      className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[14px] text-[#1a1a1a] font-medium">
                    Layover Cost <span className="text-gray-400 text-xs font-normal">($/day)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      value={data.layoverCost || ''}
                      onChange={(e) => updateField("layoverCost", e.target.value)}
                      placeholder="0.00"
                      className="h-11 bg-white border-[#e5e7eb] text-[14px] rounded-lg pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Native Mobile Bottom Sheet Modal */}
      {showStateModal && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
            onClick={closeStateModal}
          />

          {/* Bottom Sheet */}
          <div
            ref={stateModalRef}
            className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-[24px] shadow-2xl animate-in slide-in-from-bottom duration-300"
            style={{ maxHeight: '85vh' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-4 pb-3 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[18px] font-semibold text-gray-900">
                  Select States
                </h3>
                <button
                  type="button"
                  onClick={closeStateModal}
                  className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400" />
                <Input
                  value={stateSearchQuery}
                  onChange={(e) => setStateSearchQuery(e.target.value)}
                  placeholder="Search states..."
                  className="h-11 bg-gray-50 border-gray-200 text-[15px] pl-11 rounded-xl"
                  autoFocus
                />
              </div>

              {/* Selection Counter */}
              {selectedStatesInModal.length > 0 && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="size-2 rounded-full bg-blue-600" />
                  <span className="text-[13px] font-medium text-blue-900">
                    {selectedStatesInModal.length} state{selectedStatesInModal.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
              )}
            </div>

            {/* States List */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 240px)' }}>
              {filteredStates.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredStates.map((state) => {
                    const isSelected = selectedStatesInModal.includes(state);
                    return (
                      <button
                        key={state}
                        type="button"
                        onClick={() => handleToggleStateInModal(state)}
                        className={`w-full px-4 py-4 flex items-center gap-3 text-left active:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-blue-50' : 'bg-white'
                        }`}
                      >
                        <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[15px] font-medium ${
                          isSelected ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {state}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <div className="size-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="size-7 text-gray-400" />
                  </div>
                  <p className="text-[15px] font-medium text-gray-900 mb-1">No states found</p>
                  <p className="text-[13px] text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Fixed Bottom Action Button */}
            <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
              <button
                type="button"
                onClick={handleAddSelectedStates}
                disabled={selectedStatesInModal.length === 0}
                className={`w-full h-12 rounded-xl font-semibold text-[15px] transition-all ${
                  selectedStatesInModal.length > 0
                    ? 'bg-[#F89823] text-white hover:bg-[#e88a1f] active:scale-[0.98]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedStatesInModal.length > 0
                  ? `Add ${selectedStatesInModal.length} State${selectedStatesInModal.length !== 1 ? 's' : ''}`
                  : 'Select States'
                }
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}