import { useState, useMemo, useEffect } from 'react';
import Header from './Header';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useIsMobile } from './ui/use-mobile';
import { 
  Truck, 
  User, 
  Box, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Upload, 
  AlertCircle,
  FileText,
  Scale,
  Save,
  Send,
  AlertTriangle,
  Info,
  Map as MapIcon,
  Maximize2,
  X,
  Navigation,
  ChevronDown
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { AddressAutocomplete } from './AddressAutocomplete';
import { InlineUnitSelector } from './InlineUnitSelector';

interface NewPermitApplicationProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  initialMode?: 'new' | 'revision' | 'autofill'; 
  initialData?: any; // For autofill source data
  sourcePermitId?: string; // ID of the template permit
}

// Mock Data
const MOCK_TRUCKS = [
  { 
    id: 'trk-1', 
    unit: 'TRK-2025', 
    plate: 'DEF-5678', 
    make: 'Kenworth', 
    year: '2022',
    vin: '1M123456789ABC',
    axleConfig: '3 Axle',
    grossWeight: '80,000 lbs',
    unladenWeight: '18,000 lbs',
    status: 'active'
  },
  { 
    id: 'trk-2', 
    unit: 'TRK-2024', 
    plate: 'ABC-1234', 
    make: 'Peterbilt', 
    year: '2021',
    vin: '2P987654321ZYX',
    axleConfig: '4 Axle',
    grossWeight: '85,000 lbs',
    unladenWeight: '19,500 lbs',
    status: 'active'
  },
  // Inactive truck for demo
  { 
    id: 'trk-old', 
    unit: 'TRK-OLD', 
    plate: 'OLD-000', 
    make: 'Mack', 
    year: '2010',
    vin: 'OLDVIN123',
    axleConfig: '2 Axle',
    grossWeight: '60,000 lbs',
    unladenWeight: '15,000 lbs',
    status: 'inactive' 
  }
];

const MOCK_TRAILERS = [
  { 
    id: 'trl-1', 
    unit: 'TRL-5001', 
    plate: 'TLR-9988', 
    type: 'Flatbed',
    length: '53 ft',
    axles: '2',
    axleSpacing: '10 ft',
    width: '102 in',
    weight: '12,000 lbs'
  },
  { 
    id: 'trl-2', 
    unit: 'TRL-5002', 
    plate: 'TLR-7766', 
    type: 'Lowboy',
    length: '48 ft',
    axles: '3',
    axleSpacing: '12 ft',
    width: '102 in',
    weight: '15,000 lbs'
  }
];

const MOCK_DRIVERS = [
  { id: 'drv-1', name: 'John Doe', license: 'D12345678', state: 'NY', phone: '(555) 123-4567' },
  { id: 'drv-2', name: 'Sarah Smith', license: 'S87654321', state: 'CA', phone: '(555) 987-6543' }
];

const MOCK_LOCATIONS = [
  { id: 'loc-1', name: 'Distribution Center A', address: '123 Warehouse Rd, New York, NY 10001' },
  { id: 'loc-2', name: 'West Coast Hub', address: '456 Logistics Blvd, Los Angeles, CA 90001' },
  { id: 'loc-3', name: 'Midwest Facility', address: '789 Industry Dr, Chicago, IL 60601' },
  { id: 'loc-4', name: 'Southern Depot', address: '321 Commerce Way, Atlanta, GA 30301' },
  { id: 'loc-5', name: 'Texas Terminal', address: '555 Oil Road, Houston, TX 77001' }
];

const TAB_ORDER = ['general', 'vehicle', 'load', 'route'];

const COMMODITY_CLASSES = [
  'Class I', 'Class II', 'Class III', 'Class IV', 'Group A/B/C Plastics', 'High Hazard', 'Extra High Hazard', 'Other'
];

const COMMODITY_TYPES = [
  'Food & Beverage', 'Electronics', 'Agricultural Products', 'Other'
];

// Mock Revision Data
const REVISION_DETAILS = {
  reason: 'Weight Limit Exceeded',
  comments: 'The declared load weight exceeds the GVW for the selected truck configuration. Please adjust the declared weight and upload the correct drawing.'
};

const CURRENT_USER = {
  name: 'Admin User',
  company: 'Logistics Co.',
  email: 'admin@logisticsco.com',
  phone: '(555) 000-0000',
  dot: '1234567'
};

export default function NewPermitApplication({ 
  onNavigate, 
  onBack, 
  initialMode = 'new', 
  initialData,
  sourcePermitId
}: NewPermitApplicationProps) {
  
  const { showSnackbar } = useSnackbar();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('general');
  const [isRevisionMode, setIsRevisionMode] = useState(initialMode === 'revision');
  const [isAutofillMode, setIsAutofillMode] = useState(initialMode === 'autofill');
  const [showInactiveWarning, setShowInactiveWarning] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  // -- Form State --

  // General
  const [permitType, setPermitType] = useState('oversize');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('1');
  const [reference, setReference] = useState('');

  // Vehicle
  const [selectedTruckId, setSelectedTruckId] = useState<string>('');
  const [selectedTrailerId, setSelectedTrailerId] = useState<string>('');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  // Load Info
  const [lengthUnit, setLengthUnit] = useState<'ft' | 'm'>('ft');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [loadType, setLoadType] = useState('');
  const [loadDescription, setLoadDescription] = useState('');
  const [isDivisible, setIsDivisible] = useState('');
  const [isSelfPropelled, setIsSelfPropelled] = useState('');
  const [commodityClass, setCommodityClass] = useState('');
  const [commodityClassOther, setCommodityClassOther] = useState('');
  const [commodityType, setCommodityType] = useState('');
  const [commodityTypeOther, setCommodityTypeOther] = useState('');
  
  // Dimensions
  const [loadHeight, setLoadHeight] = useState<string>('');
  const [loadWidth, setLoadWidth] = useState<string>('');
  const [loadLength, setLoadLength] = useState<string>('');
  const [frontOverhang, setFrontOverhang] = useState<string>('');
  const [rearOverhang, setRearOverhang] = useState<string>('');
  const [gvw, setGvw] = useState<string>('');
  const [loadWeight, setLoadWeight] = useState<string>('');
  
  // Route
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [miles, setMiles] = useState('');
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // -- Initialization Logic --
  useEffect(() => {
    if (initialMode === 'revision') {
      // Initialize with revision mock data (simulating fetching existing permit)
      setPermitType('oversize');
      setStartDate('2024-12-16');
      setDuration('10');
      setReference('REF-9988');
      
      setSelectedTruckId('trk-1');
      setSelectedTrailerId('trl-1');
      setSelectedDriverId('drv-1');
      
      setLoadType('Excavator');
      setLoadDescription('Heavy machinery transport');
      setIsDivisible('no');
      setIsSelfPropelled('yes');
      setCommodityClass('Class I');
      setCommodityType('Other');
      setCommodityTypeOther('Construction');
      
      setLoadHeight('10');
      setLoadWidth('8.5');
      setLoadLength('20');
      setFrontOverhang('0');
      setRearOverhang('2');
      setGvw('80000');
      setLoadWeight('85000'); // Error state for revision

      setSelectedOrigin('123 Warehouse Rd, New York, NY 10001');
      setSelectedDestination('456 Logistics Blvd, Los Angeles, CA 90001');
      setMiles('450');

    } else if (initialMode === 'autofill') {
      // Simulate autofilling from sourceData or sourcePermitId
      setPermitType('oversize');
      setStartDate('');
      setReference(''); 
      setDuration('1');

      setSelectedTruckId('trk-1');
      setSelectedTrailerId('trl-1');
      setSelectedDriverId('drv-1');
      
      setLoadType('Bulldozer');
      setLoadDescription('Construction Equipment');
      setIsDivisible('no');
      setIsSelfPropelled('yes');
      setCommodityClass('Class II');
      setCommodityType('Other');
      setCommodityTypeOther('Heavy Eq');
      
      setLoadHeight('11');
      setLoadWidth('9');
      setLoadLength('22');
      setFrontOverhang('0');
      setRearOverhang('1');
      setGvw('82000');
      setLoadWeight('45000');

      setSelectedOrigin('789 Industry Dr, Chicago, IL 60601');
      setSelectedDestination('321 Commerce Way, Atlanta, GA 30301');
    }
  }, [initialMode, initialData]);

  const selectedTruck = MOCK_TRUCKS.find(t => t.id === selectedTruckId);
  const selectedTrailer = MOCK_TRAILERS.find(t => t.id === selectedTrailerId);
  const selectedDriver = MOCK_DRIVERS.find(d => d.id === selectedDriverId);

  const currentStepIndex = TAB_ORDER.indexOf(activeTab);
  const isLastStep = currentStepIndex === TAB_ORDER.length - 1;

  // Validation
  const isLoadWeightInvalid = useMemo(() => {
    if (!gvw || !loadWeight) return false;
    return Number(loadWeight) > Number(gvw);
  }, [gvw, loadWeight]);

  const isLoadFormValid = useMemo(() => {
    if (!loadType) return false;
    if (!isDivisible) return false;
    if (!commodityClass) return false;
    if (commodityClass === 'Other' && !commodityClassOther) return false;
    if (!commodityType) return false;
    if (commodityType === 'Other' && !commodityTypeOther) return false;
    
    if (!loadHeight) return false;
    if (!loadWidth) return false;
    if (!loadLength) return false;
    if (!gvw) return false;
    if (!loadWeight) return false;
    
    if (isLoadWeightInvalid) return false;

    return true;
  }, [
    loadType, isDivisible, commodityClass, commodityClassOther, 
    commodityType, commodityTypeOther, loadHeight, loadWidth, 
    loadLength, gvw, loadWeight, isLoadWeightInvalid
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Handle step validation and progression
  const handleNext = () => {
    if (activeTab === 'load' && !isLoadFormValid) {
      alert("Please correct the load information errors.");
      return;
    }
    if (isLastStep) {
      if (isRevisionMode) {
        // Handle revision submit
      } else {
        // Handle new submit
        handleSubmitApplication();
      }
    } else {
      setActiveTab(TAB_ORDER[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex === 0) {
      onBack();
    } else {
      setActiveTab(TAB_ORDER[currentStepIndex - 1]);
    }
  };

  const handleSubmitApplication = () => {
     if (activeTab === 'load' && !isLoadFormValid) {
       setActiveTab('load');
       return;
     }
     
     // Validate all required fields
     if (!startDate || !selectedTruckId || !selectedDriverId || !selectedOrigin || !selectedDestination) {
       showSnackbar("Please complete all required fields", "error");
       return;
     }

     console.log("Submitting application... generating new ID");
     showSnackbar("Permit application submitted successfully!", "success");
     setTimeout(() => onNavigate('permits'), 500);
  };

  const handleResubmit = () => {
    if (isLoadWeightInvalid) {
      setActiveTab('load');
      showSnackbar("Please fix the Load Weight exceeding GVW", "error");
      return;
    }
    showSnackbar("Permit resubmitted successfully!", "success");
    setTimeout(() => onNavigate('permits'), 500);
  };

  const handleSaveDraft = () => {
    console.log("Saved as draft");
    showSnackbar("Draft saved successfully", "success");
    setTimeout(() => onNavigate('permits'), 500);
  };

  const progressPercentage = useMemo(() => {
    return ((currentStepIndex + 1) / TAB_ORDER.length) * 100;
  }, [currentStepIndex]);

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <Header 
        title={isRevisionMode ? "Revise Permit Request" : "New Permit Request"} 
        showBackButton={true} 
        onBack={onBack} 
      />
      
      {/* Progress Bar (Visible for New and Autofill) */}
      {!isRevisionMode && (
        <div className="h-1 w-full bg-gray-200">
          <div 
            className="h-full bg-[#0066cc] transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <div className="flex-1 -mt-[20px] relative z-20 rounded-t-[20px] bg-[#f6f6f6] flex flex-col overflow-hidden">
        
        {/* Revision Banner */}
        {isRevisionMode && (
          <div className="px-4 pt-4 pb-0 z-40 sticky top-0 bg-[#f6f6f6]">
            <Alert className="bg-amber-50 border-amber-200 shadow-sm mb-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800 font-semibold mb-1">
                This permit requires revisions.
              </AlertTitle>
              <AlertDescription className="text-amber-700 text-xs space-y-1">
                <div className="font-medium">Reason: <span className="font-normal">{REVISION_DETAILS.reason}</span></div>
                {REVISION_DETAILS.comments && (
                  <div>Comments: <span className="font-normal italic">"{REVISION_DETAILS.comments}"</span></div>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Autofill Warning Banner */}
        {isAutofillMode && showInactiveWarning && (
           <div className="px-4 pt-4 pb-0 z-40 sticky top-0 bg-[#f6f6f6]">
            <Alert className="bg-red-50 border-red-200 shadow-sm mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 font-semibold mb-1">
                Details Updated
              </AlertTitle>
              <AlertDescription className="text-red-700 text-xs">
                Some saved details are no longer available. Please reselect vehicle or driver.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Tab Navigation */}
        <div className={`bg-[#f6f6f6] sticky top-0 z-30 pt-4 pb-2 px-4 ${isRevisionMode || (isAutofillMode && showInactiveWarning) ? 'top-0' : ''}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-white shadow-sm">
              <TabsList className="w-full justify-start h-12 bg-transparent p-1 gap-2">
                {TAB_ORDER.map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab} 
                    className="data-[state=active]:bg-[#0066cc]/10 data-[state=active]:text-[#0066cc] rounded-md px-3 py-1.5 text-xs font-medium transition-all"
                  >
                    {tab === 'general' && '1. General'}
                    {tab === 'vehicle' && '2. Vehicle'}
                    {tab === 'load' && '3. Load'}
                    {tab === 'route' && '4. Route'}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-32">
          <Tabs value={activeTab} className="w-full h-full">
            
            {/* General Tab */}
            <TabsContent value="general" className="mt-0 space-y-4">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-900">General Information</h2>
                <p className="text-sm text-gray-500">Basic details about the permit request.</p>
              </div>
              
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  {/* User Info Readonly Section */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-3">
                     <div className="flex items-center gap-2 mb-2">
                       <Info className="h-4 w-4 text-[#0066cc]" />
                       <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Requester Details</span>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                       <div>
                         <Label className="text-[10px] text-gray-500 uppercase">Requested By</Label>
                         <div className="text-sm font-medium">{CURRENT_USER.name}</div>
                       </div>
                       <div>
                         <Label className="text-[10px] text-gray-500 uppercase">Company</Label>
                         <div className="text-sm font-medium">{CURRENT_USER.company}</div>
                       </div>
                       <div>
                         <Label className="text-[10px] text-gray-500 uppercase">MC / DOT</Label>
                         <div className="text-sm font-medium">{CURRENT_USER.dot}</div>
                       </div>
                       <div>
                         <Label className="text-[10px] text-gray-500 uppercase">Contact</Label>
                         <div className="text-sm font-medium">{CURRENT_USER.phone}</div>
                       </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="permit-type" className="text-gray-700">Permit Type</Label>
                    <Select value={permitType} onValueChange={setPermitType}>
                      <SelectTrigger id="permit-type" className="h-12 bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oversize">Oversize Load</SelectItem>
                        <SelectItem value="overweight">Overweight Load</SelectItem>
                        <SelectItem value="trip">Trip Permit</SelectItem>
                        <SelectItem value="fuel">Fuel Permit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="start-date" className="text-gray-700">Start Date <span className="text-red-500">*</span></Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        className="h-12 bg-gray-50 border-gray-200" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="duration" className="text-gray-700">Duration (Days)</Label>
                      <Input 
                        id="duration" 
                        type="number" 
                        placeholder="1" 
                        className="h-12 bg-gray-50 border-gray-200" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="reference" className="text-gray-700">Reference Number</Label>
                    <Input 
                      id="reference" 
                      placeholder="Optional" 
                      className="h-12 bg-gray-50 border-gray-200" 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vehicle Tab */}
            <TabsContent value="vehicle" className="mt-0 space-y-4">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-900">Vehicle & Driver</h2>
                <p className="text-sm text-gray-500">Select the equipment and operator.</p>
              </div>

              {/* Truck Card */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center gap-2">
                  <div className="bg-blue-100 p-1.5 rounded-md text-[#0066cc]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-900">Truck Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="truck-select">Select Truck</Label>
                    <Select value={selectedTruckId} onValueChange={setSelectedTruckId}>
                      <SelectTrigger id="truck-select" className="h-12 bg-white border-gray-200">
                        <SelectValue placeholder="Select a truck" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_TRUCKS.length === 0 ? (
                          <div className="p-2 text-sm text-gray-500 text-center">No vehicles available.</div>
                        ) : (
                          MOCK_TRUCKS.map(truck => (
                            <SelectItem key={truck.id} value={truck.id} disabled={truck.status === 'inactive'}>
                              <span className={truck.status === 'inactive' ? 'text-gray-400 line-through' : 'font-medium'}>
                                {truck.unit}
                              </span>
                              <span className="text-gray-400 mx-1">-</span> {truck.plate}
                              {truck.status === 'inactive' && <span className="ml-2 text-xs text-red-400">(Inactive)</span>}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTruck && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3 border border-gray-100">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Make / Year</p>
                          <p className="text-sm font-medium">{selectedTruck.make} {selectedTruck.year}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">VIN</p>
                          <p className="text-sm font-medium truncate">{selectedTruck.vin}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Axle Config</p>
                          <p className="text-sm font-medium">{selectedTruck.axleConfig}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">GVW</p>
                          <p className="text-sm font-medium">{selectedTruck.grossWeight}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Unladen Weight</p>
                          <p className="text-sm font-medium">{selectedTruck.unladenWeight}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Trailer Card */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center gap-2">
                  <div className="bg-orange-100 p-1.5 rounded-md text-orange-600">
                    <Truck className="w-4 h-4 transform scale-x-[-1]" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-900">Trailer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <Select value={selectedTrailerId} onValueChange={setSelectedTrailerId}>
                    <SelectTrigger className="h-12 bg-white border-gray-200">
                      <SelectValue placeholder="Select a trailer" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TRAILERS.map(trailer => (
                        <SelectItem key={trailer.id} value={trailer.id}>{trailer.unit} - {trailer.plate}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedTrailer && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3 border border-gray-100">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Type</p>
                          <p className="text-sm font-medium">{selectedTrailer.type}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Length</p>
                          <p className="text-sm font-medium">{selectedTrailer.length}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Axles</p>
                          <p className="text-sm font-medium">{selectedTrailer.axles}</p>
                        </div>
                         <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Axle Spacing</p>
                          <p className="text-sm font-medium">{selectedTrailer.axleSpacing}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Width</p>
                          <p className="text-sm font-medium">{selectedTrailer.width}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-500 font-semibold">Weight</p>
                          <p className="text-sm font-medium">{selectedTrailer.weight}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

               {/* Driver Card */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-md text-green-600">
                    <User className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-900">Driver Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
                    <SelectTrigger className="h-12 bg-white border-gray-200">
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_DRIVERS.map(driver => (
                        <SelectItem key={driver.id} value={driver.id}>{driver.name} - {driver.license}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Load Info Tab */}
            <TabsContent value="load" className="mt-0 space-y-4">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-900">Load Information</h2>
                <p className="text-sm text-gray-500">Details, dimensions, and weight.</p>
              </div>

              {/* Unit System Selector */}
              <InlineUnitSelector
                lengthUnit={lengthUnit}
                weightUnit={weightUnit}
                onLengthUnitChange={setLengthUnit}
                onWeightUnitChange={setWeightUnit}
              />
              
              {/* Section 1: Load Details */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center gap-2">
                   <div className="bg-purple-100 p-1.5 rounded-md text-purple-600">
                    <Box className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-900">Load Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="load-type">Load Type <span className="text-red-500">*</span></Label>
                    <Input 
                      id="load-type" 
                      value={loadType} 
                      onChange={(e) => setLoadType(e.target.value)} 
                      placeholder="e.g. Excavator" 
                      className="h-12 bg-white border-gray-200" 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="load-desc">Load Description</Label>
                    <Textarea 
                      id="load-desc" 
                      value={loadDescription}
                      onChange={(e) => setLoadDescription(e.target.value)}
                      placeholder="Enter details..." 
                      className="bg-white border-gray-200 min-h-[80px]" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Is Load Divisible? <span className="text-red-500">*</span></Label>
                      <Select value={isDivisible} onValueChange={setIsDivisible}>
                        <SelectTrigger className="h-12 bg-white border-gray-200">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label>Self-Propelled?</Label>
                      <Select value={isSelfPropelled} onValueChange={setIsSelfPropelled}>
                        <SelectTrigger className="h-12 bg-white border-gray-200">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Commodity Class <span className="text-red-500">*</span></Label>
                    <Select value={commodityClass} onValueChange={setCommodityClass}>
                      <SelectTrigger className="h-12 bg-white border-gray-200">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMODITY_CLASSES.map(cls => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {commodityClass === 'Other' && (
                    <div className="space-y-3 animate-in fade-in zoom-in-95">
                      <Label>Specify Commodity Class <span className="text-red-500">*</span></Label>
                      <Input 
                        value={commodityClassOther} 
                        onChange={(e) => setCommodityClassOther(e.target.value)} 
                        className="h-12 bg-white border-gray-200" 
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label>Commodity Type <span className="text-red-500">*</span></Label>
                    <Select value={commodityType} onValueChange={setCommodityType}>
                      <SelectTrigger className="h-12 bg-white border-gray-200">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMODITY_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {commodityType === 'Other' && (
                    <div className="space-y-3 animate-in fade-in zoom-in-95">
                      <Label>Specify Commodity Type <span className="text-red-500">*</span></Label>
                      <Input 
                        value={commodityTypeOther} 
                        onChange={(e) => setCommodityTypeOther(e.target.value)} 
                        className="h-12 bg-white border-gray-200" 
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Section 2: Dimensions & Weight */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-1.5 rounded-md text-blue-600">
                      <Scale className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-sm font-medium text-gray-900">Dimensions & Weight</CardTitle>
                  </div>
                  
                  {/* Unit Toggle - Only show on desktop/web */}
                  {!isMobile && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{lengthUnit} / {weightUnit}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Length <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={loadLength} 
                          onChange={(e) => setLoadLength(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {lengthUnit}
                        </span>
                      </div>
                    </div>
                     <div className="space-y-3">
                      <Label>Width <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={loadWidth} 
                          onChange={(e) => setLoadWidth(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {lengthUnit}
                        </span>
                      </div>
                    </div>
                     <div className="space-y-3">
                      <Label>Height <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={loadHeight} 
                          onChange={(e) => setLoadHeight(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {lengthUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Front Overhang</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={frontOverhang} 
                          onChange={(e) => setFrontOverhang(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {lengthUnit}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Rear Overhang</Label>
                      <div className="relative">
                         <Input 
                          type="number" 
                          value={rearOverhang} 
                          onChange={(e) => setRearOverhang(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {lengthUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                   <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-3">
                      <Label>Gross Vehicle Weight (GVW) <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={gvw} 
                          onChange={(e) => setGvw(e.target.value)}
                          className="h-12 bg-white border-gray-200 pr-10" 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {weightUnit}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Load Weight <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={loadWeight} 
                          onChange={(e) => setLoadWeight(e.target.value)}
                          className={`h-12 bg-white border-gray-200 pr-10 ${isLoadWeightInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                          {weightUnit}
                        </span>
                      </div>
                      {isLoadWeightInvalid && (
                         <div className="flex items-center gap-2 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>Load Weight cannot exceed GVW</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Load Diagram (Optional) */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-100 flex flex-row items-center gap-2">
                   <div className="bg-gray-200 p-1.5 rounded-md text-gray-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-900">Load Diagram (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                    <Input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept=".pdf,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                    />
                    <div className="bg-blue-50 p-3 rounded-full mb-3">
                      <Upload className="w-6 h-6 text-[#0066cc]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {uploadedFile ? uploadedFile.name : 'Tap to upload load diagram'}
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PNG, JPG (Max 10 MB)
                    </p>
                  </div>
                </CardContent>
              </Card>

            </TabsContent>

            {/* Route Tab */}
            <TabsContent value="route" className="mt-0 space-y-4">
               <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-900">Route & Travel</h2>
                <p className="text-sm text-gray-500">Origin, destination, and path.</p>
              </div>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Origin Address</Label>
                      <AddressAutocomplete 
                        value={selectedOrigin} 
                        onChange={setSelectedOrigin}
                        placeholder="e.g. 123 Main St, City, State Zip"
                        iconColor="text-green-600"
                      />
                    </div>
                    
                    <div className="flex justify-center -my-2 relative z-10">
                      <div className="bg-gray-100 p-1 rounded-full text-gray-400">
                        <ChevronRight className="w-4 h-4 transform rotate-90" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Destination Address</Label>
                      <AddressAutocomplete 
                        value={selectedDestination} 
                        onChange={setSelectedDestination}
                        placeholder="e.g. 456 Logistics Blvd, City, State Zip"
                        iconColor="text-red-600"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>States Traveled</Label>
                    <div className="flex flex-wrap gap-2">
                      {['NY', 'NJ', 'PA', 'OH', 'IN', 'IL'].map(state => (
                        <Badge key={state} variant="secondary" className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer border border-gray-200">
                          {state}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="px-3 py-1.5 text-xs border-dashed border-gray-400 text-gray-500 cursor-pointer hover:bg-gray-50">
                        + Add State
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Total Estimated Miles</Label>
                    <Input placeholder="0" type="number" className="h-12 bg-gray-50 border-gray-200" value={miles} onChange={e => setMiles(e.target.value)} />
                  </div>
                  
                  {/* Hidden Map View Trigger */}
                  <Collapsible open={showMap} onOpenChange={setShowMap} className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                       <CollapsibleTrigger asChild>
                         <Button variant="outline" className="w-full border-blue-200 text-[#0066cc] bg-blue-50/50 hover:bg-blue-50">
                           {showMap ? (
                             <>
                               <X className="h-4 w-4 mr-2" />
                               Hide Route Map
                             </>
                           ) : (
                             <>
                               <MapIcon className="h-4 w-4 mr-2" />
                               View Route Map
                             </>
                           )}
                         </Button>
                       </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 animate-in slide-in-from-top-2">
                       <div className="rounded-lg border border-gray-200 overflow-hidden h-64 bg-slate-100 relative group">
                          {/* Placeholder Map Visuals */}
                          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-center bg-cover" />
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-4 relative">
                                  <div className="flex flex-col items-center">
                                     <MapPin className="h-6 w-6 text-green-600 drop-shadow-md mb-1" />
                                     <span className="text-xs font-bold bg-white/80 px-1 rounded">NY</span>
                                  </div>
                                  <div className="w-24 h-0.5 bg-blue-500 border-t-2 border-dashed border-blue-500 relative">
                                     <Navigation className="h-4 w-4 text-blue-600 absolute -top-2 left-1/2 -translate-x-1/2 transform rotate-90" />
                                  </div>
                                  <div className="flex flex-col items-center">
                                     <MapPin className="h-6 w-6 text-red-600 drop-shadow-md mb-1" />
                                     <span className="text-xs font-bold bg-white/80 px-1 rounded">PA</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 font-medium mt-4 bg-white/80 px-2 py-1 rounded-full shadow-sm">
                                  Map Preview Mode
                                </p>
                             </div>
                          </div>
                          
                          <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 shadow-sm">
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                       </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

        {/* Floating Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] max-w-[450px] mx-auto">
          {isRevisionMode ? (
            <div className="flex gap-3">
               <Button 
                variant="outline" 
                className="flex-1 h-12 text-gray-600 border-gray-300 shadow-sm"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                className="flex-[2] h-12 bg-[#0066cc] hover:bg-blue-700 shadow-md transition-all active:scale-[0.98] text-white"
                onClick={handleResubmit}
              >
                <span className="flex items-center gap-2">Resubmit Application <Send className="w-4 h-4 ml-0.5" /></span>
              </Button>
            </div>
          ) : isAutofillMode ? (
            <div className="flex gap-3">
               <Button 
                variant="outline" 
                className="flex-1 h-12 text-gray-600 border-gray-300 shadow-sm"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button 
                className="flex-[2] h-12 bg-[#0066cc] hover:bg-blue-700 shadow-md transition-all active:scale-[0.98] text-white"
                onClick={handleSubmitApplication}
              >
                <span className="flex items-center gap-2">Submit Application <Send className="w-4 h-4 ml-0.5" /></span>
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12 text-gray-600 border-gray-300"
                onClick={handleBack}
              >
                {currentStepIndex === 0 ? 'Cancel' : 'Back'}
              </Button>
              <Button 
                className={`flex-[2] h-12 shadow-md transition-all active:scale-[0.98] ${
                  activeTab === 'load' && !isLoadFormValid 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300' 
                    : 'bg-[#0066cc] hover:bg-blue-700 text-white'
                }`}
                onClick={handleNext}
                disabled={activeTab === 'load' && !isLoadFormValid}
              >
                {isLastStep ? (
                  <span className="flex items-center gap-2">Submit Application <CheckCircle2 className="w-4 h-4" /></span>
                ) : (
                  <span className="flex items-center gap-2">Next Step <ChevronRight className="w-4 h-4" /></span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}