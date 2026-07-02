import { useState, useMemo } from 'react';
import { formatDate } from '../utils/dateFormat';
import Header from './Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose, SheetDescription } from './ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose, DrawerDescription } from './ui/drawer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  FileText, 
  MapPin, 
  Calendar, 
  User, 
  Map,
  Flag,
  ChevronRight,
  ChevronUp,
  Eye,
  ChevronDown,
  ArrowUpDown,
  FileInput,
  Copy,
  ArrowRight,
  AlertCircle,
  Check,
  X,
  Truck,
  Timer
} from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import svgPaths from '../imports/svg-wog97i87cz';

// Types
interface PermitState {
  code: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired';
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
  downloadUrl?: string;
}

interface TruckDetails {
  unit: string;
  plate: string;
  make: string;
  year: string;
  vin: string;
  axleConfig: string;
  grossWeight: string;
  unladenWeight: string;
}

interface TrailerDetails {
  unit: string;
  plate: string;
  type: string;
  length: string;
  axles: string;
  width: string;
}

interface DriverDetails {
  name: string;
  license: string;
  state: string;
  phone: string;
}

interface LoadDetails {
  type: string;
  description: string;
  width: string;
  height: string;
  length: string;
  weight: string;
}

interface RouteDetails {
  miles: string;
}

interface TrackingDetails {
  status: 'In Transit' | 'Stopped' | 'Delivered';
  currentLocation: string;
  nextStop: string;
  eta: string;
  speed: string;
  distanceRemaining: string;
  progress: number;
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
  status: 'Approved' | 'Draft' | 'Expired' | 'Requires Revision' | 'Submitted' | 'Rejected' | 'In Transit';
  
  // New detailed fields
  truck?: TruckDetails;
  trailer?: TrailerDetails;
  driverDetails?: DriverDetails;
  load?: LoadDetails;
  routeDetails?: RouteDetails;
  tracking?: TrackingDetails;
}

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
};

const MOCK_PERMITS: Permit[] = [
  {
    id: '1',
    requestId: 'REQ-1001',
    permitNumber: 'PER-2024-88A',
    createdDate: '2024-12-01',
    effectiveDate: '2024-12-05',
    expiryDate: '2024-12-15',
    driver: 'John Doe',
    states: [
      { code: 'NY', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'NY-8829' },
      { code: 'NJ', status: 'Pending' },
      { code: 'PA', status: 'Rejected' },
      { code: 'CT', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'CT-2291' },
      { code: 'MA', status: 'Pending' },
      { code: 'MD', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'MD-5591' },
      { code: 'VA', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'VA-1022' },
      { code: 'NC', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'NC-4822' },
      { code: 'SC', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'SC-9912' },
      { code: 'GA', status: 'Approved', effectiveDate: '2024-12-05', expiryDate: '2024-12-10', permitNumber: 'GA-2281' },
      { code: 'FL', status: 'Pending' }
    ],
    origin: 'New York, NY',
    destination: 'Miami, FL',
    status: 'In Transit',
    truck: { unit: 'TRK-2025', plate: 'DEF-5678', make: 'Kenworth', year: '2022', vin: '1M123456789ABC', axleConfig: '3 Axle', grossWeight: '80,000 lbs', unladenWeight: '18,000 lbs' },
    trailer: { unit: 'TRL-5001', plate: 'TLR-9988', type: 'Flatbed', length: '53 ft', axles: '2', width: '102 in' },
    driverDetails: { name: 'John Doe', license: 'D12345678', state: 'NY', phone: '(555) 123-4567' },
    load: { type: 'Excavator', description: 'Heavy machinery transport', width: '8.5 ft', height: '10 ft', length: '20 ft', weight: '45,000 lbs' },
    routeDetails: { miles: '1280' },
    tracking: {
       status: 'In Transit',
       currentLocation: 'Richmond, VA (I-95 South)',
       nextStop: 'Florence, SC',
       eta: '5h 30m',
       speed: '62 mph',
       distanceRemaining: '450 miles',
       progress: 35
    }
  },
  {
    id: '2',
    requestId: 'REQ-1002',
    permitNumber: 'PER-2024-92B',
    createdDate: '2024-12-03',
    effectiveDate: '2024-12-10',
    expiryDate: '2024-12-20',
    driver: 'Sarah Smith',
    states: [
      { code: 'CA', status: 'Approved', effectiveDate: '2024-12-10', expiryDate: '2024-12-15' }
    ],
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    status: 'Approved',
    truck: { unit: 'TRK-2024', plate: 'ABC-1234', make: 'Peterbilt', year: '2021', vin: '2P987654321ZYX', axleConfig: '4 Axle', grossWeight: '85,000 lbs', unladenWeight: '19,500 lbs' },
    trailer: { unit: 'TRL-5002', plate: 'TLR-7766', type: 'Lowboy', length: '48 ft', axles: '3', width: '102 in' },
    driverDetails: { name: 'Sarah Smith', license: 'S87654321', state: 'CA', phone: '(555) 987-6543' },
    load: { type: 'Bulldozer', description: 'Construction Equipment', width: '9 ft', height: '11 ft', length: '22 ft', weight: '45,000 lbs' },
    routeDetails: { miles: '382' }
  },
  {
    id: '3',
    requestId: 'REQ-1003',
    createdDate: '2024-12-06',
    effectiveDate: '2024-12-12',
    expiryDate: '2024-12-22',
    driver: 'Mike Johnson',
    states: [
      { code: 'TX', status: 'Pending' },
      { code: 'OK', status: 'Pending' },
      { code: 'NM', status: 'Pending' },
      { code: 'AZ', status: 'Pending' }
    ],
    origin: 'Dallas, TX',
    destination: 'Phoenix, AZ',
    status: 'Draft'
  },
  {
    id: '4',
    requestId: 'REQ-1004',
    createdDate: '2024-12-07',
    effectiveDate: '2024-12-14',
    expiryDate: '2024-12-24',
    driver: 'Emily Davis',
    states: [
      { code: 'FL', status: 'Pending' },
      { code: 'GA', status: 'Pending' }
    ],
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    status: 'Draft'
  },
  {
    id: '5',
    requestId: 'PRM-2024-003',
    createdDate: '2024-12-08',
    effectiveDate: '2024-12-16',
    expiryDate: '2024-12-26',
    driver: 'Robert Brown',
    states: [
      { code: 'TX', status: 'Rejected' },
      { code: 'NM', status: 'Pending' }
    ],
    origin: 'Houston, TX',
    destination: 'Santa Fe, NM',
    status: 'Requires Revision'
  },
  {
    id: '6',
    requestId: 'REQ-1005',
    createdDate: '2024-11-20',
    effectiveDate: '2024-11-25',
    expiryDate: '2024-12-05',
    driver: 'John Doe',
    states: [
      { code: 'NY', status: 'Pending' },
      { code: 'PA', status: 'Pending' }
    ],
    origin: 'Buffalo, NY',
    destination: 'Pittsburgh, PA',
    status: 'Submitted'
  },
  {
    id: '7',
    requestId: 'REQ-1006',
    createdDate: '2024-10-15',
    effectiveDate: '2024-10-20',
    expiryDate: '2024-10-30',
    driver: 'Sarah Smith',
    states: [
      { code: 'CA', status: 'Rejected' },
      { code: 'NV', status: 'Rejected' }
    ],
    origin: 'Sacramento, CA',
    destination: 'Reno, NV',
    status: 'Rejected'
  },
  {
    id: '8',
    requestId: 'REQ-1007',
    createdDate: '2024-09-01',
    effectiveDate: '2024-09-05',
    expiryDate: '2024-09-15',
    driver: 'Mike Johnson',
    states: [
      { code: 'TX', status: 'Expired', effectiveDate: '2024-09-05', expiryDate: '2024-09-10' }
    ],
    origin: 'Austin, TX',
    destination: 'Houston, TX',
    status: 'Expired'
  }
];

interface ManagePermitsProps {
  onToggleSidebar?: () => void;
  onNavigate?: (screen: string, params?: any) => void;
}

export default function ManagePermits({ onToggleSidebar, onNavigate }: ManagePermitsProps) {
  const [activeTab, setActiveTab] = useState<'Approved' | 'Draft' | 'Action'>('Approved');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});

  // Filter & Sort States
  const [sortBy, setSortBy] = useState('created_desc');
  const [filterStates, setFilterStates] = useState<string[]>([]);
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [tempFilterStates, setTempFilterStates] = useState<string[]>([]); // For the sheet before applying
  const [tempDateStart, setTempDateStart] = useState('');
  const [tempDateEnd, setTempDateEnd] = useState('');
  
  // UI States
  const [fabOpen, setFabOpen] = useState(false);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  const [activeActionPermit, setActiveActionPermit] = useState<Permit | null>(null);
  const [downloadingPermit, setDownloadingPermit] = useState<Permit | null>(null);
  const [activeStatePermit, setActiveStatePermit] = useState<{permitId: string, state: PermitState} | null>(null);
  
  // Autofill Modal States
  const [autofillTab, setAutofillTab] = useState('Approved');
  const [autofillSearch, setAutofillSearch] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filterDriver, setFilterDriver] = useState('all');

  // Filter permits based on tab and search query for MAIN LIST
  const filteredPermits = useMemo(() => {
    let result = MOCK_PERMITS.filter(permit => {
      let matchesTab = false;
      
      if (activeTab === 'Approved') {
        matchesTab = permit.status === 'Approved' || permit.status === 'Expired' || permit.status === 'In Transit';
      } else if (activeTab === 'Draft') {
        matchesTab = permit.status === 'Draft';
      } else if (activeTab === 'Action') {
        matchesTab = permit.status === 'Requires Revision';
      }
      
      const matchesSearch = 
        permit.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permit.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permit.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permit.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (permit.permitNumber && permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesState = filterStates.length === 0 || permit.states.some(s => filterStates.includes(s.code));

      let matchesDate = true;
      if (filterDateStart) {
        matchesDate = matchesDate && new Date(permit.createdDate) >= new Date(filterDateStart);
      }
      if (filterDateEnd) {
        matchesDate = matchesDate && new Date(permit.createdDate) <= new Date(filterDateEnd);
      }

      return matchesTab && matchesSearch && matchesState && matchesDate;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case 'created_asc':
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case 'state':
          return (a.states[0]?.code || '').localeCompare(b.states[0]?.code || '');
        case 'driver':
          return a.driver.localeCompare(b.driver);
        case 'created_desc':
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });
  }, [activeTab, searchQuery, filterStates, filterDateStart, filterDateEnd, sortBy]);

  // Filter for AUTOFILL LIST
  const filteredAutofillPermits = useMemo(() => {
    return MOCK_PERMITS.filter(permit => {
      // Filter by Tab
      let matchesTab = false;
      if (autofillTab === 'Approved') matchesTab = permit.status === 'Approved';
      else if (autofillTab === 'Submitted') matchesTab = permit.status === 'Submitted';
      else if (autofillTab === 'Rejected') matchesTab = permit.status === 'Rejected';
      else if (autofillTab === 'Expired') matchesTab = permit.status === 'Expired';
      else matchesTab = false;

      // Filter by Search
      const matchesSearch = 
        permit.requestId.toLowerCase().includes(autofillSearch.toLowerCase()) ||
        permit.driver.toLowerCase().includes(autofillSearch.toLowerCase()) ||
        (permit.permitNumber && permit.permitNumber.toLowerCase().includes(autofillSearch.toLowerCase())) ||
        permit.origin.toLowerCase().includes(autofillSearch.toLowerCase());

      // Filter by Driver
      const matchesDriver = filterDriver === 'all' || permit.driver === filterDriver;

      return matchesTab && matchesSearch && matchesDriver;
    });
  }, [autofillTab, autofillSearch, filterDriver]);

  const toggleTempState = (state: string) => {
    setTempFilterStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleApplyFilters = () => {
    setFilterStates(tempFilterStates);
    setFilterDateStart(tempDateStart);
    setFilterDateEnd(tempDateEnd);
  };

  const clearFilters = () => {
    setTempFilterStates([]);
    setTempDateStart('');
    setTempDateEnd('');
    setFilterStates([]);
    setFilterDateStart('');
    setFilterDateEnd('');
  };

  const toggleStateExpansion = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateNew = () => {
    setFabOpen(false);
    if (onNavigate) {
      onNavigate('new-permit-application');
    }
  };

  const handleOpenAutofill = () => {
    setFabOpen(false);
    setShowAutofillModal(true);
  };
  
  const handleUseTemplate = () => {
    if (!selectedTemplateId) return;
    
    // Find the template to pass data or ID
    const template = MOCK_PERMITS.find(p => p.id === selectedTemplateId);
    
    setShowAutofillModal(false);
    if (onNavigate) {
      onNavigate('new-permit-application', { 
        mode: 'autofill', 
        sourcePermitId: selectedTemplateId,
        sourceData: template 
      });
    }
  };

  const handlePermitClick = (permit: Permit) => {
    if (permit.status === 'Requires Revision' && onNavigate) {
       onNavigate('new-permit-application', { mode: 'revision' }); 
    } else if (onNavigate) {
       onNavigate('view-permit-request', permit);
    }
  };

  const PermitItem = ({ permit }: { permit: Permit }) => {
    const isExpanded = expandedStates[permit.id] || false;
    const showStatesCount = 5;
    const remainingStates = permit.states.length - showStatesCount;

    // Helper for state badge styles
    const getStateBadgeStyle = (status: string) => {
      switch (status) {
        case 'Approved': return { bg: '#ecfdf3', text: '#067647', border: '#abefc6' };
        case 'Pending': return { bg: '#eff8ff', text: '#2563eb', border: '#bfdbfe' };
        case 'Rejected': return { bg: '#fef3f2', text: '#b42318', border: '#fecdca' };
        case 'Expired': return { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' };
        default: return { bg: '#f9fafb', text: '#374151', border: '#e5e7eb' };
      }
    };

    return (
      <div className="bg-white rounded-lg border border-[#e6e3df] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.2)] mb-4 overflow-hidden relative">
        {/* Live Tracking Header - Only for In Transit or specific permits */}
        {permit.tracking && (
          <div className="bg-[#0b1215] text-white px-4 py-2 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">Live Tracking</span>
             </div>
             <div className="text-xs text-gray-300 tabular-nums">
                ETA: {permit.tracking.eta}
             </div>
          </div>
        )}

        {/* Top Section - Light Blue (Modified for Tracking) */}
        <div className={`${permit.tracking ? 'bg-white' : 'bg-[#f6faff]'} p-4 flex flex-col gap-3`}>
           {/* Tracking Progress Bar */}
           {permit.tracking && (
             <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                   <span>{permit.origin.split(',')[0]}</span>
                   <span className="text-blue-600 font-semibold">{permit.tracking.currentLocation}</span>
                   <span>{permit.destination.split(',')[0]}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                     style={{ width: `${permit.tracking.progress}%` }}
                   />
                </div>
                <div className="flex justify-between items-center mt-1">
                   <span className="text-[10px] text-gray-400">{permit.tracking.speed}</span>
                   <span className="text-[10px] text-gray-400">{permit.tracking.distanceRemaining} remaining</span>
                </div>
             </div>
           )}

           {/* Route Container */}
           <div className="flex justify-between items-center w-full">
              {/* Origin */}
              <div className="flex items-center gap-2 flex-1">
                 <div className="w-[14px] h-[14px]">
                   <svg viewBox="0 0 14 14" fill="none">
                      <path d={svgPaths.pc36070a2} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.165" />
                      <path d={svgPaths.p87a9ccb2} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.165" />
                   </svg>
                 </div>
                 <span className="text-[#101828] text-[15px] font-semibold leading-[24px] truncate">{permit.origin.split(',')[0]}</span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center px-2">
                 <div className="w-[14px] h-[14px]">
                    <svg viewBox="0 0 14 14" fill="none">
                       <path d={svgPaths.p3a817b11} stroke="#2383F8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.165" />
                    </svg>
                 </div>
              </div>

              {/* Destination */}
              <div className="flex items-center gap-2 flex-1 justify-end">
                 <div className="w-[14px] h-[14px]">
                    <svg viewBox="0 0 14 14" fill="none">
                       <path d={svgPaths.p69d0d970} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.165" />
                       <path d={svgPaths.p48b6c4b9} stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.165" />
                    </svg>
                 </div>
                 <span className="text-[#101828] text-[15px] font-semibold leading-[24px] truncate text-right">{permit.destination.split(',')[0]}</span>
              </div>
           </div>

           {/* Trip ID & Permit Number */}
           <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e0effe]/60">
              <div className="flex items-center">
                 <span className="text-[#6a7282] text-[13px] leading-[24px] mr-1">Trip ID:</span>
                 <span className="text-[#101828] text-[13px] font-medium leading-[24px]">{permit.requestId}</span>
              </div>
              
              {permit.permitNumber && (permit.status === 'Approved' || permit.status === 'Expired' || permit.status === 'In Transit') && (
                 <div className="flex items-center">
                     <span className="text-[#175cd3] bg-[#eff8ff] border border-[#b2ddff] px-2 py-0.5 rounded-md text-[12px] font-semibold">
                        #{permit.permitNumber}
                     </span>
                 </div>
              )}
           </div>
        </div>

        {/* Action Bar - Dark Blue (or White/Gray depending on status) */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#e6e3df]">
           <div>
              {permit.status === 'Requires Revision' ? (
                 <Badge className="bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] hover:bg-[#FEF3F2]">Action Required</Badge>
              ) : permit.status === 'Approved' ? (
                 <Badge className="bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6] hover:bg-[#ECFDF3]">Approved</Badge>
              ) : permit.status === 'In Transit' ? (
                 <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50">
                   <Truck className="w-3 h-3 mr-1" />
                   In Transit
                 </Badge>
              ) : (
                 <Badge variant="outline">{permit.status}</Badge>
              )}
           </div>

           <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-[#344054] border-[#D0D5DD] hover:bg-gray-50"
                onClick={() => handlePermitClick(permit)}
              >
                {permit.status === 'Requires Revision' ? 'Fix Issues' : 'Details'}
              </Button>
              
              {/* Only show 'Download' for Approved/Expired permits */}
              {(permit.status === 'Approved' || permit.status === 'Expired' || permit.status === 'In Transit') && (
                 <Button 
                   size="sm" 
                   className="h-8 bg-[#2383f8] hover:bg-blue-600 text-white gap-2"
                   onClick={() => setDownloadingPermit(permit)}
                 >
                   <Download className="w-3.5 h-3.5" />
                   Download
                 </Button>
              )}

              {/* Show different action for draft */}
              {permit.status === 'Draft' && (
                 <Button size="sm" className="h-8 bg-[#2383f8] hover:bg-blue-600 text-white">
                    Continue
                 </Button>
              )}
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f6f6f6] w-full">
      <Header showMenuButton={true} onMenuClick={onToggleSidebar} title="Manage Trips" />
      
      {/* Search & Sort */}
      <div className="px-4 py-3 bg-white border-b border-[#e6e3df]">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
             <Input 
               placeholder="Search by ID, driver, or location" 
               className="pl-9 bg-white border-[#D0D5DD] rounded-lg h-10 text-[14px]"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
          <Sheet>
             <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-[#D0D5DD]">
                   <Filter className="w-4 h-4 text-[#344054]" />
                </Button>
             </SheetTrigger>
             <SheetContent side="bottom" className="rounded-t-xl h-[80vh]">
                <SheetHeader className="text-left mb-4">
                   <SheetTitle>Filter Trips</SheetTitle>
                   <SheetDescription>
                      Narrow down the trip list by applying filters.
                   </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 overflow-y-auto pb-20">
                   {/* State Filter */}
                   <div className="space-y-3">
                      <Label className="text-base">States</Label>
                      <div className="grid grid-cols-4 gap-2">
                         {['NY', 'NJ', 'PA', 'CT', 'MA', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL', 'CA', 'TX'].map(state => (
                            <div 
                               key={state}
                               onClick={() => toggleTempState(state)}
                               className={`
                                  flex items-center justify-center h-10 rounded-lg border cursor-pointer text-sm font-medium transition-colors
                                  ${tempFilterStates.includes(state) 
                                     ? 'bg-blue-50 border-blue-600 text-blue-700' 
                                     : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}
                               `}
                            >
                               {state}
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* Date Range */}
                   <div className="space-y-3">
                      <Label className="text-base">Date Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <Label className="text-xs text-gray-500">From</Label>
                            <Input type="date" value={tempDateStart} onChange={(e) => setTempDateStart(e.target.value)} />
                         </div>
                         <div className="space-y-1.5">
                            <Label className="text-xs text-gray-500">To</Label>
                            <Input type="date" value={tempDateEnd} onChange={(e) => setTempDateEnd(e.target.value)} />
                         </div>
                      </div>
                   </div>

                   {/* Sort By */}
                   <div className="space-y-3">
                      <Label className="text-base">Sort By</Label>
                      <RadioGroup value={sortBy} onValueChange={setSortBy}>
                         <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-lg">
                            <RadioGroupItem value="created_desc" id="r1" />
                            <Label htmlFor="r1" className="flex-1 cursor-pointer">Newest First</Label>
                         </div>
                         <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-lg">
                            <RadioGroupItem value="created_asc" id="r2" />
                            <Label htmlFor="r2" className="flex-1 cursor-pointer">Oldest First</Label>
                         </div>
                         <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-lg">
                            <RadioGroupItem value="state" id="r3" />
                            <Label htmlFor="r3" className="flex-1 cursor-pointer">State (A-Z)</Label>
                         </div>
                      </RadioGroup>
                   </div>
                </div>

                <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex flex-row gap-3 sm:justify-between">
                   <Button variant="outline" className="flex-1" onClick={clearFilters}>Reset</Button>
                   <SheetClose asChild>
                      <Button className="flex-1 bg-[#0066cc]" onClick={handleApplyFilters}>Apply Filters</Button>
                   </SheetClose>
                </SheetFooter>
             </SheetContent>
          </Sheet>
        </div>

        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="bg-transparent p-0 gap-2 justify-start w-full">
              <TabsTrigger value="Approved" className="rounded-full border border-gray-200 bg-white data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-gray-900 px-4">
                Active & Approved
              </TabsTrigger>
              <TabsTrigger value="Action" className="rounded-full border border-gray-200 bg-white data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-gray-900 px-4">
                Action Required
              </TabsTrigger>
              <TabsTrigger value="Draft" className="rounded-full border border-gray-200 bg-white data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-gray-900 px-4">
                Drafts
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </Tabs>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {filteredPermits.length > 0 ? (
          filteredPermits.map(permit => (
            <PermitItem key={permit.id} permit={permit} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <FileInput className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No trips found</h3>
            <p className="text-sm text-gray-500 max-w-[200px] mb-6">
              There are no {activeTab === 'Action' ? 'action required' : activeTab.toLowerCase()} trips matching your criteria.
            </p>
            <Button onClick={() => setFabOpen(true)} variant="outline" className="border-dashed border-gray-300 text-gray-600">
              <Plus className="mr-2 h-4 w-4" />
              Create New Trip
            </Button>
          </div>
        )}
      </div>
      
      {/* Floating Action Button */}
      {!fabOpen && (
        <Button 
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-[#0066cc] shadow-lg hover:bg-blue-700 z-50 flex items-center justify-center"
          onClick={() => setFabOpen(true)}
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* FAB Menu Overlay */}
      {fabOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setFabOpen(false)}>
          <div className="absolute bottom-24 right-4 flex flex-col gap-3 items-end">
            <div className="flex items-center gap-3">
              <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">Autofill from Previous</span>
              <Button 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                onClick={(e) => { e.stopPropagation(); handleOpenAutofill(); }}
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">New Trip Application</span>
              <Button 
                size="icon" 
                className="h-14 w-14 rounded-full bg-[#0066cc] text-white hover:bg-blue-700 shadow-lg"
                onClick={(e) => { e.stopPropagation(); handleCreateNew(); }}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Download Drawer */}
      <Drawer open={!!downloadingPermit} onOpenChange={(open) => !open && setDownloadingPermit(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Download Permits</DrawerTitle>
            <DrawerDescription>
              Select the state permits you wish to download for Trip {downloadingPermit?.requestId}.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
             {downloadingPermit?.states
               .filter(s => s.status === 'Approved' && s.permitNumber)
               .map(state => (
                 <div key={state.code} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                       <div className="bg-blue-50 p-2 rounded text-blue-600 font-bold w-10 text-center">
                          {state.code}
                       </div>
                       <div>
                          <p className="text-sm font-medium text-gray-900">{STATE_NAMES[state.code] || state.code} Permit #{state.permitNumber}</p>
                          <p className="text-xs text-gray-500">Expires: {state.expiryDate ? formatDate(state.expiryDate) : 'N/A'}</p>
                       </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                       <Download className="w-4 h-4" />
                    </Button>
                 </div>
               ))
             }
             {downloadingPermit?.states.filter(s => s.status === 'Approved').length === 0 && (
                <p className="text-center text-gray-500 py-4">No approved permits available for download yet.</p>
             )}
          </div>
          <DrawerFooter>
             <Button className="w-full bg-[#0066cc]">Download All Available</Button>
             <DrawerClose asChild>
                <Button variant="outline">Close</Button>
             </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Autofill Modal */}
      <Drawer open={showAutofillModal} onOpenChange={setShowAutofillModal}>
         <DrawerContent className="h-[90vh]">
            <DrawerHeader className="text-left border-b pb-4">
               <DrawerTitle>Select Trip Template</DrawerTitle>
               <DrawerDescription>
                  Choose a previous trip to copy details from.
               </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 space-y-4">
               {/* Filters */}
               <div className="flex gap-2">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                     <Input 
                        placeholder="Search..." 
                        className="pl-9"
                        value={autofillSearch}
                        onChange={(e) => setAutofillSearch(e.target.value)}
                     />
                  </div>
               </div>

               <Tabs value={autofillTab} onValueChange={setAutofillTab}>
                  <TabsList className="grid w-full grid-cols-4">
                     <TabsTrigger value="Approved">Approved</TabsTrigger>
                     <TabsTrigger value="Submitted">Pending</TabsTrigger>
                     <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                     <TabsTrigger value="Expired">Expired</TabsTrigger>
                  </TabsList>
               </Tabs>

               {/* List */}
               <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {filteredAutofillPermits.map(permit => (
                     <div 
                        key={permit.id}
                        onClick={() => setSelectedTemplateId(permit.id)}
                        className={`
                           p-3 rounded-lg border cursor-pointer transition-all
                           ${selectedTemplateId === permit.id 
                              ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                              : 'border-gray-200 bg-white hover:border-blue-300'}
                        `}
                     >
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-bold text-gray-900">{permit.requestId}</span>
                           <span className="text-xs text-gray-500">{formatDate(permit.createdDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                           <MapPin className="h-3.5 w-3.5 text-gray-400" />
                           <span className="truncate max-w-[200px]">{permit.origin}</span>
                           <ArrowRight className="h-3 w-3" />
                           <span className="truncate max-w-[200px]">{permit.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                           <Truck className="h-3.5 w-3.5 text-gray-400" />
                           <span>{permit.truck?.unit || 'N/A'}</span>
                        </div>
                     </div>
                  ))}
                  
                  {filteredAutofillPermits.length === 0 && (
                     <div className="text-center py-8 text-gray-500">
                        No trips found matching criteria.
                     </div>
                  )}
               </div>
            </div>

            <DrawerFooter className="border-t pt-4">
               <Button 
                  className="w-full bg-[#0066cc]" 
                  disabled={!selectedTemplateId}
                  onClick={handleUseTemplate}
               >
                  Use Selected Template
               </Button>
               <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
    </div>
  );
}