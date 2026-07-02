import { useState, useMemo } from 'react';
import { formatDateTime, formatDate } from '../utils/dateFormat';
import Header from './Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose, SheetDescription } from './ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose, DrawerDescription } from './ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { OutlineButton } from './ui/outline-button';
import RouteIconContainer from '../imports/RouteIconContainer';
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
  Timer,
  Users,
  Box,
  Ruler,
  Info,
  Briefcase,
  Navigation,
  Shield,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Package,
  Star,
  AlertTriangle,
  MapPinned,
  Award,
  Zap,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import svgPaths from '../imports/svg-wog97i87cz';
import { BidsTabContent } from './BidsTabContent';
import AvailablePilotCarsModal from './AvailablePilotCarsModal';
import jobCardSvgPaths from '../imports/svg-biv2flftkh';
import svgPathsCard from '../imports/svg-1dakj0og4t';
import { TimeTrackingSection } from './TimeTrackingSection';
import StateJobsList from './StateJobsList';
import { RouteSurveyInfo } from './RouteSurveyMapDrawer';
import JobDrawerFooter from './JobDrawerFooter';
import { useSnackbar } from '../contexts/SnackbarContext';
import DriverRatingDisplay from './DriverRatingDisplay';
import { RatingTabContent } from './RatingTabContent';
import TripSummaryScreen from './TripSummaryScreen';
import { PilotCarRatingDrawer } from './PilotCarRatingDrawer';
import type { SubmittedRating } from './PilotCarRatingDrawer';

// Permits/Trips Types
interface PermitState {
  code: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
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
  status: 'Open' | 'In Transit' | 'Action Required' | 'Completed';
  
  // New detailed fields
  truck?: TruckDetails;
  trailer?: TrailerDetails;
  driverDetails?: DriverDetails;
  load?: LoadDetails;
  routeDetails?: RouteDetails;
  tracking?: TrackingDetails;
  driverRating?: {
    overallRating: number;
    submittedAt: string;
    submittedBy: string;
    pilotCarCompany: string;
  };
}

// Jobs Types
interface Bid {
  id: string;
  companyName: string;
  amount: number;
  rating: number;
  vehicleType: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  // Enhanced fields for better UX
  driverName?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  companyEmail?: string;
  jobStatus?: 'Not Started' | 'In Progress' | 'Completed';
  startTime?: string;
  endTime?: string;
  invoiceApproved?: boolean;
  // New fields for decision-making
  bidType?: 'requested' | 'marketplace';
  distanceMiles?: number;
  availableNow?: boolean;
  compliant?: boolean;
  capabilities?: string[]; // e.g., ['Lead', 'Chase', 'High Pole']
  permits?: string[]; // e.g., ['NY', 'NJ', 'PA']
  submittedAt?: string;
  responseTime?: string; // e.g., "3h" or "45m"
  yearsExperience?: number;
  totalTrips?: number;
}

interface PilotJob {
  id: string;
  tripId: string;
  origin: string;
  destination: string;
  pickupDate: string;
  vehicleType: string;
  numberOfVehicles: number;
  status: 'Open' | 'Requested' | 'Assigned' | 'Completed';
  bids: Bid[];
  postedDate: string;
  requestedPilotCarIds?: string[];
  jobSource?: 'OPEN' | 'REQUESTED';
  // Extended Details
  freightDesc: string;
  dims: {
    height: string;
    width: string;
    length: string;
    weight: string;
  };
  notes: string;
  price: {
    type: 'Per Mile' | 'Flat Rate';
    value: string;
  };
  // Rating data
  rating?: {
    overallRating: number;
    submittedAt: string;
    ratingDismissed?: boolean;
  };
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
      { code: 'WA', status: 'Not Applied' },
      { code: 'OR', status: 'Not Applied' },
      { code: 'CA', status: 'Not Applied' }
    ],
    origin: 'Seattle, WA',
    destination: 'Los Angeles, CA',
    status: 'Open',
    truck: { unit: 'TRK-2026', plate: 'WXY-9999', make: 'Freightliner', year: '2023', vin: '3F456789012DEF', axleConfig: '3 Axle', grossWeight: '78,000 lbs', unladenWeight: '17,500 lbs' },
    trailer: { unit: 'TRL-5003', plate: 'TLR-5544', type: 'Step Deck', length: '48 ft', axles: '2', width: '102 in' },
    driverDetails: { name: 'Sarah Smith', license: 'S87654321', state: 'WA', phone: '(555) 987-6543' },
    load: { type: 'Wind Turbine Blade', description: 'Renewable Energy Equipment', width: '12 ft', height: '14 ft', length: '120 ft', weight: '38,000 lbs' },
    routeDetails: { miles: '1135' }
  },
  {
    id: '2b',
    requestId: 'REQ-1002B',
    permitNumber: 'PER-2024-92C',
    createdDate: '2024-12-04',
    effectiveDate: '2024-12-11',
    expiryDate: '2024-12-21',
    driver: 'Tom Wilson',
    states: [
      { code: 'CA', status: 'Approved', effectiveDate: '2024-12-11', expiryDate: '2024-12-16' }
    ],
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    status: 'Open',
    truck: { unit: 'TRK-2027', plate: 'ABC-5678', make: 'Peterbilt', year: '2021', vin: '2P987654321ABC', axleConfig: '4 Axle', grossWeight: '85,000 lbs', unladenWeight: '19,500 lbs' },
    trailer: { unit: 'TRL-5004', plate: 'TLR-8899', type: 'Lowboy', length: '48 ft', axles: '3', width: '102 in' },
    driverDetails: { name: 'Tom Wilson', license: 'T12345678', state: 'CA', phone: '(555) 111-2222' },
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
    status: 'Open'
  },
  {
    id: '4',
    requestId: 'REQ-1004',
    permitNumber: 'PER-2024-94D',
    createdDate: '2024-12-07',
    effectiveDate: '2024-12-14',
    expiryDate: '2024-12-24',
    driver: 'Emily Davis',
    states: [
      { code: 'FL', status: 'Approved', permitNumber: 'FL-2024-78901', effectiveDate: '2024-12-14', expiryDate: '2025-03-14' },
      { code: 'GA', status: 'Approved', permitNumber: 'GA-2024-78902', effectiveDate: '2024-12-14', expiryDate: '2025-03-14' }
    ],
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    status: 'Open',
    truck: { unit: 'TRK-2028', plate: 'FLO-4321', make: 'Volvo', year: '2022', vin: '4V789012345GHI', axleConfig: '3 Axle', grossWeight: '82,000 lbs', unladenWeight: '18,500 lbs' },
    trailer: { unit: 'TRL-5005', plate: 'TLR-3322', type: 'Flatbed', length: '53 ft', axles: '2', width: '102 in' },
    driverDetails: { name: 'Emily Davis', license: 'E55667788', state: 'FL', phone: '(555) 789-0123' },
    load: { type: 'Construction Crane', description: 'Heavy construction equipment', width: '10 ft', height: '13 ft', length: '35 ft', weight: '52,000 lbs' },
    routeDetails: { miles: '662' }
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
    status: 'Action Required'
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
    status: 'Open'
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
    status: 'Completed',
    driverRating: {
      overallRating: 4.2,
      submittedAt: new Date('2024-10-30T14:30:00').toISOString(),
      submittedBy: 'Rick Thompson',
      pilotCarCompany: 'Sierra Nevada Escorts'
    }
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
    status: 'Completed',
    driverRating: {
      overallRating: 4.6,
      submittedAt: new Date('2024-09-15T16:00:00').toISOString(),
      submittedBy: 'Linda Martinez',
      pilotCarCompany: 'Texas Pilot Services'
    }
  },
  {
    id: '9',
    requestId: 'REQ-1008',
    permitNumber: 'OR-2024-00456',
    createdDate: '2024-12-07',
    effectiveDate: '2024-12-19',
    expiryDate: '2024-12-29',
    driver: 'Sarah Williams',
    states: [
      { code: 'OR', status: 'Approved', permitNumber: 'OR-2024-00456', effectiveDate: '2024-12-19', expiryDate: '2024-12-29' }
    ],
    origin: 'California-Oregon Border',
    destination: 'Oregon-Nevada Border',
    status: 'Open'
  },
  {
    id: '10',
    requestId: 'REQ-1009',
    createdDate: '2025-01-05',
    effectiveDate: '2025-01-12',
    expiryDate: '2025-01-22',
    driver: 'Michael Anderson',
    states: [
      { code: 'WA', status: 'Not Applied' },
      { code: 'OR', status: 'Not Applied' },
      { code: 'CA', status: 'Not Applied' },
      { code: 'NV', status: 'Not Applied' },
      { code: 'AZ', status: 'Not Applied' },
      { code: 'UT', status: 'Not Applied' },
      { code: 'CO', status: 'Not Applied' },
      { code: 'NM', status: 'Not Applied' }
    ],
    origin: 'Seattle, WA',
    destination: 'Albuquerque, NM',
    status: 'Open',
    truck: { unit: 'TRK-3045', plate: 'XYZ-7890', make: 'Freightliner', year: '2023', vin: '3F567890123DEF', axleConfig: '4 Axle', grossWeight: '88,000 lbs', unladenWeight: '20,000 lbs' },
    trailer: { unit: 'TRL-6010', plate: 'TLR-5544', type: 'Step Deck', length: '53 ft', axles: '3', width: '102 in' },
    driverDetails: { name: 'Michael Anderson', license: 'M98765432', state: 'WA', phone: '(555) 234-5678' },
    load: { type: 'Wind Turbine Blade', description: 'Renewable energy equipment', width: '13 ft', height: '14 ft', length: '150 ft', weight: '72,000 lbs' },
    routeDetails: { miles: '1650' }
  }
];

// State-Level Jobs Interface
interface StateJob {
  id: string;
  tripId: string;
  pilotJobId?: string;
  state: string;
  stateCode: string;
  entryLocation: string;
  entryDate: string;
  entryTime: string;
  positions: string;
  status: 'Open for Bidding' | 'Bid Received' | 'Bidding Closed' | 'Assigned' | 'In Progress' | 'Completed' | 'Expired';
  bidCount: number;
  bidExpiryDate: string;
  bidExpiryTime: string;
  assignedTo?: string;
  origin: string;
  destination: string;
  jobSource?: 'OPEN' | 'REQUESTED';
  allPermitsApproved?: boolean;
  routeSurvey?: RouteSurveyInfo;
}

// Mock State-Level Jobs Data
const MOCK_STATE_JOBS: StateJob[] = [
  {
    id: 'JOB-CA-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-101',
    state: 'California',
    stateCode: 'CA',
    entryLocation: 'Sacramento Truck Stop, I-5',
    entryDate: '02/15/2026',
    entryTime: '08:00',
    positions: '2x Front, 1x Rear',
    status: 'Open for Bidding',
    bidCount: 0,
    bidExpiryDate: '2026-02-15',
    bidExpiryTime: '10:00',
    origin: 'Sacramento, CA',
    destination: 'CA/OR Border',
    jobSource: 'OPEN'
  },
  {
    id: 'JOB-OR-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-102',
    state: 'Oregon',
    stateCode: 'OR',
    entryLocation: 'Oregon Welcome Center, I-5',
    entryDate: '02/15/2026',
    entryTime: '14:00',
    positions: '1x Front',
    status: 'Bid Received',
    bidCount: 3,
    bidExpiryDate: '2026-02-14',
    bidExpiryTime: '17:00',
    origin: 'OR/CA Border',
    destination: 'Portland, OR',
    jobSource: 'OPEN'
  },
  {
    id: 'JOB-NV-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-101',
    state: 'Nevada',
    stateCode: 'NV',
    entryLocation: 'Reno Truck Plaza, US-95',
    entryDate: '02/16/2026',
    entryTime: '06:00',
    positions: '1x Front',
    status: 'Assigned',
    bidCount: 2,
    bidExpiryDate: '2026-02-10',
    bidExpiryTime: '23:59',
    assignedTo: 'Desert Pilot Services',
    origin: 'Reno, NV',
    destination: 'Las Vegas, NV',
    jobSource: 'REQUESTED',
    allPermitsApproved: true,
    routeSurvey: {
      status: 'Completed',
      completedAt: '2026-02-11T08:15:00',
      surveyorName: 'Desert Pilot Services',
      observations: 7,
      distanceMiles: 448,
    },
  },
  {
    id: 'JOB-AZ-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-102',
    state: 'Arizona',
    stateCode: 'AZ',
    entryLocation: 'Kingman Rest Area, I-40',
    entryDate: '02/17/2026',
    entryTime: '10:00',
    positions: '1x Front, 1x Rear',
    status: 'Bidding Closed',
    bidCount: 5,
    bidExpiryDate: '2026-02-12',
    bidExpiryTime: '18:00',
    origin: 'Kingman, AZ',
    destination: 'Phoenix, AZ',
    jobSource: 'OPEN'
  },
  {
    id: 'JOB-UT-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-101',
    state: 'Utah',
    stateCode: 'UT',
    entryLocation: 'St. George Welcome Center, I-15',
    entryDate: '02/14/2026',
    entryTime: '07:30',
    positions: '1x Front, 1x Rear',
    status: 'In Progress',
    bidCount: 4,
    bidExpiryDate: '2026-02-08',
    bidExpiryTime: '12:00',
    assignedTo: 'Mountain West Escorts',
    origin: 'St. George, UT',
    destination: 'Salt Lake City, UT',
    jobSource: 'REQUESTED'
  },
  {
    id: 'JOB-CO-001',
    tripId: 'REQ-1001',
    pilotJobId: 'JOB-102',
    state: 'Colorado',
    stateCode: 'CO',
    entryLocation: 'Grand Junction Rest Area, I-70',
    entryDate: '02/12/2026',
    entryTime: '09:00',
    positions: '2x Front',
    status: 'Completed',
    bidCount: 3,
    bidExpiryDate: '2026-02-06',
    bidExpiryTime: '18:00',
    assignedTo: 'Rocky Mountain Pilot Cars',
    origin: 'Grand Junction, CO',
    destination: 'Denver, CO',
    jobSource: 'REQUESTED',
    allPermitsApproved: true,
    routeSurvey: {
      status: 'Completed',
      completedAt: '2026-02-08T14:30:00',
      surveyorName: 'Rocky Mountain Pilot Cars',
      observations: 12,
      distanceMiles: 247,
    },
  },
  // REQ-1004 — Miami, FL → Atlanta, GA (both permits Approved)
  {
    id: 'JOB-FL-001',
    tripId: 'REQ-1004',
    pilotJobId: 'JOB-FL-001',
    state: 'Florida',
    stateCode: 'FL',
    entryLocation: 'Miami Port Freight Terminal, I-95 N',
    entryDate: '12/14/2024',
    entryTime: '06:30',
    positions: '1x Front, 1x Rear',
    status: 'Assigned',
    bidCount: 3,
    bidExpiryDate: '2024-12-10',
    bidExpiryTime: '17:00',
    assignedTo: 'Sunshine State Escorts',
    origin: 'Miami, FL',
    destination: 'FL/GA Border',
    jobSource: 'OPEN',
    allPermitsApproved: true,
    routeSurvey: {
      status: 'Completed',
      completedAt: '2024-12-12T10:00:00',
      surveyorName: 'Sunshine State Escorts',
      observations: 6,
      distanceMiles: 375,
      observationsList: [
        {
          id: 'OBS-FL-1',
          type: 'load-clearance',
          title: "Low overpass clearance 14' 2\"",
          latitude: 25.984,
          longitude: -80.307,
          description: "Load height 15' 0\" exceeds posted clearance at the Okeechobee Rd overpass. Exit at MM 86 and rejoin via SR-91 frontage as marked on surveyed route.",
          attachments: [
            { id: 'ATT-FL-1a', name: 'IMG_2041.jpg', source: 'camera' },
            { id: 'ATT-FL-1b', name: 'IMG_2042.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-12T06:42:00',
        },
        {
          id: 'OBS-FL-2',
          type: 'safety-hazard',
          title: 'No breakdown shoulder for oversize loads',
          latitude: 27.5253,
          longitude: -80.8106,
          description: 'Narrow shoulder through Fort Drum segment (MM 184–192). No usable breakdown shoulder for oversize loads; plan no-stop transit through this segment.',
          attachments: [
            { id: 'ATT-FL-2a', name: 'IMG_2057.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-12T07:10:00',
        },
        {
          id: 'OBS-FL-3',
          type: 'safety-hazard',
          title: 'Lane closure — resurfacing work',
          latitude: 29.1872,
          longitude: -82.1401,
          description: 'Right lane closed 06:00–18:00 near Ocala (MM 285). Single-lane escort spacing required for approx. 4 miles.',
          attachments: [
            { id: 'ATT-FL-3a', name: 'IMG_2065.jpg', source: 'camera' },
            { id: 'ATT-FL-3b', name: 'roadwork_notice.jpg', source: 'gallery' },
          ],
          recordedAt: '2024-12-12T07:55:00',
        },
        {
          id: 'OBS-FL-4',
          type: 'load-clearance',
          title: 'Overhead utility lines at exit ramp',
          latitude: 29.228,
          longitude: -82.112,
          description: "Lines measured at 15' 9\" over the Exit 358 ramp apex. Adequate but verify with high pole before ramp use.",
          attachments: [
            { id: 'ATT-FL-4a', name: 'IMG_2071.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-12T08:35:00',
        },
        {
          id: 'OBS-FL-5',
          type: 'custom',
          title: 'Tight ramp curve at Turnpike/I-75 merge',
          latitude: 28.8656,
          longitude: -82.0387,
          description: '25 mph advisory curve at the Wildwood interchange; trailer off-tracking observed — use full ramp width.',
          attachments: [
            { id: 'ATT-FL-5a', name: 'ramp_curve.jpg', source: 'gallery' },
          ],
          recordedAt: '2024-12-12T08:50:00',
        },
        {
          id: 'OBS-FL-6',
          type: 'custom',
          title: 'Suitable staging area before state line',
          latitude: 30.3305,
          longitude: -82.759,
          description: 'Rest area at I-75 N White Springs (MM 413) has long pull-through parking available for GA escort handoff staging.',
          attachments: [
            { id: 'ATT-FL-6a', name: 'IMG_2089.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-12T09:40:00',
        },
      ],
    },
  },
  {
    id: 'JOB-GA-001',
    tripId: 'REQ-1004',
    pilotJobId: 'JOB-GA-001',
    state: 'Georgia',
    stateCode: 'GA',
    entryLocation: 'Valdosta Welcome Center, I-75 N',
    entryDate: '12/15/2024',
    entryTime: '07:00',
    positions: '1x Front',
    status: 'Open for Bidding',
    bidCount: 2,
    bidExpiryDate: '2024-12-12',
    bidExpiryTime: '18:00',
    origin: 'FL/GA Border',
    destination: 'Atlanta, GA',
    jobSource: 'OPEN',
    allPermitsApproved: true,
    routeSurvey: {
      status: 'Completed',
      completedAt: '2024-12-13T09:45:00',
      surveyorName: 'Peach State Pilot Services',
      observations: 5,
      distanceMiles: 220,
      observationsList: [
        {
          id: 'OBS-GA-1',
          type: 'load-clearance',
          title: "Sign bridge clearance 15' 8\"",
          latitude: 31.4505,
          longitude: -83.5085,
          description: "Clearance adequate for 15' 0\" load at I-75 N MM 62 approaching Tifton, but requires centered lane position under structure.",
          attachments: [
            { id: 'ATT-GA-1a', name: 'IMG_3102.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-13T06:30:00',
        },
        {
          id: 'OBS-GA-2',
          type: 'safety-hazard',
          title: 'Rough railroad crossing on detour route',
          latitude: 32.472,
          longitude: -83.732,
          description: 'Significant grade change at the GA-401 frontage road crossing in Perry; cross at under 5 mph to protect low trailer clearance.',
          attachments: [
            { id: 'ATT-GA-2a', name: 'IMG_3118.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-13T08:05:00',
        },
        {
          id: 'OBS-GA-3',
          type: 'safety-hazard',
          title: 'Shifted lanes with concrete barriers',
          latitude: 32.8065,
          longitude: -83.6974,
          description: "Resurfacing project on I-475 W Macon bypass (MM 5–9); 11' travel lane width — chase car must hold traffic at barrier taper.",
          attachments: [
            { id: 'ATT-GA-3a', name: 'IMG_3124.jpg', source: 'camera' },
            { id: 'ATT-GA-3b', name: 'barrier_taper.jpg', source: 'gallery' },
          ],
          recordedAt: '2024-12-13T07:40:00',
        },
        {
          id: 'OBS-GA-4',
          type: 'safety-hazard',
          title: 'Heavy congestion at I-285 interchange',
          latitude: 33.9203,
          longitude: -84.3502,
          description: 'Metro transit window restricted to 09:00–15:00 per GA DOT at the I-75 N / I-285 interchange (Exit 238). Both escorts required through interchange.',
          attachments: [
            { id: 'ATT-GA-4a', name: 'IMG_3140.jpg', source: 'camera' },
          ],
          recordedAt: '2024-12-13T09:10:00',
        },
        {
          id: 'OBS-GA-5',
          type: 'custom',
          title: 'Final approach staging point',
          latitude: 34.029,
          longitude: -84.388,
          description: 'Industrial park entrance in north Atlanta has a wide, signal-controlled turn; site contact required 30 min before arrival.',
          attachments: [
            { id: 'ATT-GA-5a', name: 'staging_area.jpg', source: 'gallery' },
          ],
          recordedAt: '2024-12-13T09:35:00',
        },
      ],
    },
  },
];

const MOCK_JOBS: PilotJob[] = [
  {
    id: 'JOB-101',
    tripId: 'REQ-1001',
    jobTitle: 'High Pole Escort - NY to Miami',
    title: 'High Pole Escort - NY to Miami',
    description: 'Industrial HVAC Unit requiring height clearance verification',
    jobType: 'high-pole',
    origin: 'New York, NY',
    destination: 'Miami, FL',
    route: '1,280 mi',
    distance: '1,280 mi',
    pickupDate: '2024-12-05',
    startDate: '2024-12-05',
    startTime: '07:00',
    endDate: '2024-12-08',
    estimatedDuration: '3-4 days',
    estimatedDistance: '1,280 mi',
    meetAtJobStart: 'Industrial Complex - Queens, NY',
    vehicleType: 'High Pole',
    numberOfVehicles: 1,
    status: 'Open for Bidding',
    postedDate: '2024-12-01',
    freightDesc: 'Industrial HVAC Unit - Oversized height',
    commodityType: 'HVAC Equipment',
    grossVehicleWeight: '89,000 lbs',
    loadWeight: '45,000 lbs',
    overHeight: '14\' 6"',
    overWidth: '10\' 0"',
    overLength: '45\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '45\' 0"',
    specialHandling: 'Critical height verification required at all bridges and overpasses',
    statesProvinces: ['NY', 'NJ', 'PA', 'DE', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL'],
    requestedRoute: 'I-95 corridor. Measure all bridge clearances. Pre-planned route to avoid known low clearances.',
    meetingLocation: 'Industrial Complex - 45-15 Northern Blvd, Queens, NY',
    meetingInstructions: 'Meet at loading dock. Calibrated high pole required. Pre-trip measurement briefing mandatory.',
    contactName: 'Richard Davis',
    contactPhone: '(212) 555-0123',
    pricingType: 'mileage',
    baseRate: '800',
    costPerMile: '1.85',
    costPerHour: '90',
    minimumDailyRate: '750',
    specialInstructions: 'Driver requires high pole for bridge clearance verification along I-95 corridor. Document all clearances under 15 feet.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'ny-3', state: 'New York', stateCode: 'NY', permitNumber: 'NY-2024-78901', jurisdiction: 'New York State DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' },
      { id: 'nj-3', state: 'New Jersey', stateCode: 'NJ', permitNumber: 'NJ-2024-56789', jurisdiction: 'New Jersey DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' },
      { id: 'fl-3', state: 'Florida', stateCode: 'FL', permitNumber: 'FL-2024-34567', jurisdiction: 'Florida DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'High Pole', type: 'High Pole', count: 1 }
    ],
    dims: { height: '14\' 6"', width: '10\' 0"', length: '45\' 0"', weight: '45,000 lbs' },
    notes: 'Driver requires high pole for bridge clearance verification along I-95 corridor.',
    price: { type: 'Per Mile', value: '1.85' },
    jobSource: 'OPEN',
    bids: [
      { 
        id: 'BID-1', 
        companyName: 'SafePilot Escorts', 
        driverName: 'James Mitchell',
        amount: 1200, 
        rating: 4.8, 
        vehicleType: 'Ford F-150', 
        status: 'Pending',
        bidType: 'marketplace',
        distanceMiles: 25,
        availableNow: true,
        compliant: true,
        capabilities: ['High Pole', 'Lead'],
        permits: ['NY', 'NJ', 'FL'],
        submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        responseTime: '3h',
        yearsExperience: 12,
        totalTrips: 380
      },
      { 
        id: 'BID-2', 
        companyName: 'Elite Escort Services', 
        driverName: 'Sarah Thompson',
        amount: 1450, 
        rating: 5.0, 
        vehicleType: 'Chevy Silverado', 
        status: 'Pending',
        bidType: 'marketplace',
        distanceMiles: 45,
        availableNow: false,
        compliant: true,
        capabilities: ['High Pole', 'Lead', 'Chase'],
        permits: ['NY', 'NJ', 'PA', 'FL'],
        submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        responseTime: '5h',
        yearsExperience: 15,
        totalTrips: 520
      },
      { 
        id: 'BID-3', 
        companyName: 'QuickResponse Pilots', 
        driverName: 'Michael Rodriguez',
        amount: 1580, 
        rating: 4.9, 
        vehicleType: 'Ram 2500', 
        status: 'Pending',
        bidType: 'marketplace',
        distanceMiles: 18,
        availableNow: true,
        compliant: true,
        capabilities: ['High Pole', 'Lead'],
        permits: ['NY', 'NJ', 'PA', 'MD', 'VA', 'FL'],
        submittedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        responseTime: '45m',
        yearsExperience: 8,
        totalTrips: 210
      },
    ]
  },
  {
    id: 'JOB-102',
    tripId: 'REQ-1001',
    title: 'Multi-State Heavy Machinery Transport',
    description: 'Excavator transport requiring dual lead escort vehicles',
    jobTitle: 'Multi-State Heavy Machinery Transport',
    jobType: 'convoy',
    origin: 'New York, NY',
    destination: 'Miami, FL',
    route: '1850 km',
    distance: '1850 km',
    pickupDate: '2024-12-05',
    startDate: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    startTime: '06:00',
    endDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    estimatedDuration: '3 days',
    estimatedDistance: '1850 km',
    meetAtJobStart: 'Equipment Yard - Newark, NJ',
    vehicleType: 'Lead',
    numberOfVehicles: 2,
    status: 'Completed',
    postedDate: '2024-12-01',
    freightDesc: 'Heavy machinery transport - Excavator',
    commodityType: 'Heavy Machinery',
    grossVehicleWeight: '92,000 lbs',
    loadWeight: '45,000 lbs',
    overHeight: '10\' 0"',
    overWidth: '8\' 6"',
    overLength: '20\' 0"',
    trailerLength: '30\' 0"',
    loadLength: '20\' 0"',
    specialHandling: 'Dual lead escort configuration for multi-state heavy equipment transport',
    statesProvinces: ['NY', 'NJ', 'PA', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL'],
    requestedRoute: 'I-95 South full corridor. Coordinate both lead vehicles for city approaches and toll plazas.',
    meetingLocation: 'Equipment Yard - 200 Wilson Ave, Newark, NJ',
    meetingInstructions: 'Both lead escorts report to yard office. Pre-trip coordination meeting required. Stagger positions 1000ft apart.',
    contactName: 'Frank Miller',
    contactPhone: '(973) 555-0456',
    pricingType: 'flat',
    baseRate: '2850',
    costPerMile: '1.54',
    costPerHour: '110',
    minimumDailyRate: '1200',
    specialInstructions: 'Two lead cars required for multi-state route. Maintain coordinated communication between both escorts.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'ny-4', state: 'New York', stateCode: 'NY', permitNumber: 'NY-2024-11111', jurisdiction: 'New York State DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' },
      { id: 'nj-4', state: 'New Jersey', stateCode: 'NJ', permitNumber: 'NJ-2024-22222', jurisdiction: 'New Jersey DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' },
      { id: 'pa-3', state: 'Pennsylvania', stateCode: 'PA', permitNumber: 'PA-2024-33333', jurisdiction: 'Pennsylvania DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' },
      { id: 'fl-4', state: 'Florida', stateCode: 'FL', permitNumber: 'FL-2024-44444', jurisdiction: 'Florida DOT', validFrom: '2024-12-01', validTo: '2025-03-01', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 2 }
    ],
    dims: { height: '10\' 0"', width: '8\' 6"', length: '20\' 0"', weight: '45,000 lbs' },
    notes: 'Two lead cars required for multi-state route.',
    price: { type: 'Flat Rate', value: '2850' },
    jurisdictions: ['NY', 'NJ', 'PA', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL'],
    jobSource: 'OPEN',
    driverRating: {
      overallRating: 4.9,
      submittedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      submittedBy: 'Mike Johnson',
      pilotCarCompany: 'East Coast Escorts'
    },
    rating: {
      overallRating: 4.7,
      submittedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    bids: [
      { 
        id: 'BID-3', 
        companyName: 'East Coast Escorts', 
        companyEmail: 'billing@eastcoastescorts.com',
        amount: 2850, 
        rating: 4.8, 
        vehicleType: 'Ram 1500', 
        status: 'Accepted',
        jobStatus: 'Completed',
        startTime: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        contactPerson: 'Mike Johnson',
        contactPhone: '(555) 234-5678',
        invoiceApproved: false,
        bidType: 'marketplace'
      }
    ]
  },
  {
    id: 'JOB-104',
    tripId: 'REQ-1002',
    title: 'CA Coastal Wide Load Transport',
    description: 'Steel beams transport requiring chase car escort',
    jobTitle: 'CA Coastal Wide Load Transport',
    jobType: 'convoy',
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    route: '615 km',
    distance: '615 km',
    pickupDate: '2024-12-12',
    startDate: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    startTime: '05:00',
    endDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    estimatedDuration: '2 days',
    estimatedDistance: '615 km',
    meetAtJobStart: 'Steel Fabrication - Long Beach, CA',
    vehicleType: 'Chase',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2024-12-05',
    freightDesc: 'Steel Beams - Wide Load',
    commodityType: 'Steel Beams',
    grossVehicleWeight: '95,000 lbs',
    loadWeight: '58,000 lbs',
    overHeight: '11\' 0"',
    overWidth: '14\' 6"',
    overLength: '52\' 0"',
    trailerLength: '60\' 0"',
    loadLength: '52\' 0"',
    specialHandling: 'Wide load requiring chase escort through California coastal route',
    statesProvinces: ['CA'],
    requestedRoute: 'US-101 North through California coast. Avoid peak traffic hours in LA and SF metro areas.',
    meetingLocation: 'Steel Fabrication Yard - 2500 E Anaheim St, Long Beach, CA',
    meetingInstructions: 'Check in at security gate. Meet driver and lead escort for route briefing. CB channel 19.',
    contactName: 'Daniel Kim',
    contactPhone: '(562) 555-0234',
    pricingType: 'mileage',
    baseRate: '750',
    costPerMile: '1.95',
    costPerHour: '85',
    minimumDailyRate: '700',
    specialInstructions: 'Chase car needed for wide load escort. Must have CB radio and emergency lights. Maintain 500ft rear position.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'ca-2', state: 'California', stateCode: 'CA', permitNumber: 'CA-2024-99999', jurisdiction: 'California Department of Transportation', validFrom: '2024-12-10', validTo: '2025-03-10', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '11\' 0"', width: '14\' 6"', length: '52\' 0"', weight: '58,000 lbs' },
    notes: 'Chase car needed for wide load escort. Must have CB radio and emergency lights.',
    price: { type: 'Per Mile', value: '1.95' },
    jobSource: 'REQUESTED',
    driverRating: {
      overallRating: 4.6,
      professionalism: 5,
      communication: 4,
      timeliness: 5,
      comment: 'Very reliable driver. Good communication throughout the coastal route.',
      submittedAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
      submittedBy: 'Sarah Williams',
      pilotCarCompany: 'Coastal Pilot Services'
    },
    rating: {
      overallRating: 4.9,
      professionalism: 5,
      communication: 5,
      timeliness: 5,
      comment: 'Perfect escort service! Very attentive and maintained proper positioning throughout.',
      submittedAt: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString()
    },
    bids: [
      { 
        id: 'BID-6', 
        companyName: 'Coastal Pilot Services', 
        companyEmail: 'invoicing@coastalpilot.com',
        amount: 950, 
        rating: 4.6, 
        vehicleType: 'Chevy Silverado', 
        status: 'Accepted',
        jobStatus: 'Completed',
        startTime: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        contactPerson: 'Sarah Williams',
        contactPhone: '(555) 876-5432',
        invoiceApproved: true,
        bidType: 'requested'
      }
    ]
  },
  {
    id: 'JOB-103',
    tripId: 'REQ-1003',
    jobTitle: 'Texas Wind Turbine Blade Transport',
    title: 'Texas Wind Turbine Blade Transport',
    description: 'Extra-long wind turbine blade section requiring chase escort',
    jobType: 'convoy',
    origin: 'Houston, TX',
    destination: 'Dallas, TX',
    route: '240 mi',
    distance: '240 mi',
    pickupDate: '2024-12-15',
    startDate: '2024-12-15',
    startTime: '06:00',
    endDate: '2024-12-15',
    estimatedDuration: '8-10 hours',
    estimatedDistance: '240 mi',
    meetAtJobStart: 'Port of Houston - Turning Basin',
    vehicleType: 'Chase',
    numberOfVehicles: 1,
    status: 'Open',
    postedDate: '2024-12-04',
    freightDesc: 'Wind Turbine Blade Section',
    commodityType: 'Wind Turbine Components',
    grossVehicleWeight: '68,000 lbs',
    loadWeight: '35,000 lbs',
    overHeight: '13\' 6"',
    overWidth: '8\' 6"',
    overLength: '120\' 0"',
    trailerLength: '130\' 0"',
    loadLength: '120\' 0"',
    specialHandling: 'Extra-long load requiring extended radio communication and wide turning radius planning',
    statesProvinces: ['TX'],
    requestedRoute: 'I-45 North from Houston to Dallas. Pre-planned route for wide turns. Avoid tight intersections.',
    meetingLocation: 'Port of Houston - 111 E Loop N, Houston, TX',
    meetingInstructions: 'Meet at Port Gate 8. Extended radio range equipment required. Review turning plan before departure.',
    contactName: 'Robert Taylor',
    contactPhone: '(713) 555-0678',
    pricingType: 'mileage',
    baseRate: '600',
    costPerMile: '2.00',
    costPerHour: '90',
    minimumDailyRate: '550',
    specialInstructions: 'Long load, chase car must have extended radio range. Stay at least 300ft behind. Monitor for rear swing on turns.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'tx-2', state: 'Texas', stateCode: 'TX', permitNumber: 'TX-2024-88888', jurisdiction: 'Texas Department of Transportation', validFrom: '2024-12-12', validTo: '2025-03-12', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '13\' 6"', width: '8\' 6"', length: '120\' 0"', weight: '35,000 lbs' },
    notes: 'Long load, chase car must have extended radio range.',
    price: { type: 'Per Mile', value: '2.00' },
    jobSource: 'REQUESTED',
    bids: []
  },
  {
    id: 'JOB-2024-202',
    tripId: 'REQ-1008',
    jobTitle: 'Oregon Border to Border Oversize Escort',
    title: 'Oregon Border to Border Oversize Escort',
    description: 'Multi-position escort convoy through Oregon',
    jobType: 'convoy',
    origin: 'California-Oregon Border',
    destination: 'Oregon-Nevada Border',
    route: '280 mi',
    distance: '280 mi',
    pickupDate: '2024-12-19',
    startDate: '2024-12-19',
    startTime: '06:30',
    endDate: '2024-12-19',
    estimatedDuration: '7-9 hours',
    estimatedDistance: '280 mi',
    meetAtJobStart: 'Rest Area - I-5 CA/OR Border',
    vehicleType: 'Front, Rear',
    numberOfVehicles: 3,
    status: 'Assigned',
    postedDate: '2024-12-10',
    freightDesc: 'Multi-position escort through Oregon',
    commodityType: 'Heavy Machinery',
    grossVehicleWeight: '95,000 lbs',
    loadWeight: '48,000 lbs',
    overHeight: '13\' 6"',
    overWidth: '12\' 0"',
    overLength: '55\' 0"',
    trailerLength: '60\' 0"',
    loadLength: '55\' 0"',
    specialHandling: 'Multi-vehicle convoy escort requiring precise coordination between all positions',
    statesProvinces: ['OR'],
    requestedRoute: 'I-5 North to Medford, then US-97 East through mountains to Nevada border. Convoy formation required.',
    meetingLocation: 'Rest Area - I-5 Northbound, CA/OR Border',
    meetingInstructions: 'All three escorts meet for convoy briefing. Lead establishes communication protocol. Maintain formation throughout trip.',
    contactName: 'Jennifer Walsh',
    contactPhone: '(541) 555-0234',
    pricingType: 'flat',
    baseRate: '2200',
    costPerMile: '7.86',
    costPerHour: '130',
    minimumDailyRate: '1800',
    specialInstructions: 'Requires 2 front pilot cars and 1 rear pilot car. Oregon permit OR-2024-00456 covers full route. Mountain route requires convoy coordination.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'or-2', state: 'Oregon', stateCode: 'OR', permitNumber: 'OR-2024-00456', jurisdiction: 'Oregon Department of Transportation', validFrom: '2024-12-15', validTo: '2025-03-15', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 2 },
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '13\' 6"', width: '12\' 0"', length: '55\' 0"', weight: '48,000 lbs' },
    notes: 'Requires 2 front pilot cars and 1 rear pilot car. Oregon permit OR-2024-00456 covers full route.',
    price: { type: 'Flat Rate', value: '2200' },
    jobSource: 'REQUESTED',
    bids: [
      { id: 'BID-202-1', companyName: 'Alice Johnson Pilot Services', amount: 2200, rating: 4.9, vehicleType: 'Multi-position', status: 'Accepted', bidType: 'requested' }
    ]
  },
  {
    id: 'JOB-2024-301',
    tripId: 'REQ-1015',
    jobTitle: 'Denver to Salt Lake City Oversize Load',
    title: 'Denver to Salt Lake City Oversize Load',
    description: 'Single pilot car escort for oversize machinery',
    jobType: 'lead',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    route: '525 mi',
    distance: '525 mi',
    pickupDate: '2026-02-18',
    startDate: '2026-02-18',
    startTime: '06:00',
    endDate: '2026-02-19',
    estimatedDuration: '2 days',
    estimatedDistance: '525 mi',
    meetAtJobStart: 'Denver Distribution Center',
    vehicleType: 'Lead',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2026-02-10',
    freightDesc: 'Heavy construction equipment',
    commodityType: 'Construction Equipment',
    grossVehicleWeight: '92,000 lbs',
    loadWeight: '42,000 lbs',
    overHeight: '13\' 0"',
    overWidth: '11\' 0"',
    overLength: '48\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '48\' 0"',
    specialHandling: 'Standard oversize escort, I-70 mountain route',
    statesProvinces: ['CO', 'UT'],
    requestedRoute: 'I-70 West through mountains to I-15 North into Salt Lake City',
    meetingLocation: 'Denver Distribution Center - 5500 E 56th Ave, Commerce City, CO',
    meetingInstructions: 'Meet at main gate, check in with security. Pre-trip briefing at 05:30.',
    contactName: 'Tom Richardson',
    contactPhone: '(303) 555-0789',
    pricingType: 'mileage',
    baseRate: '1200',
    costPerMile: '2.25',
    costPerHour: '85',
    minimumDailyRate: '650',
    specialInstructions: 'Mountain route requires experienced pilot car. Weather conditions may affect travel time.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'co-5', state: 'Colorado', stateCode: 'CO', permitNumber: 'CO-2026-12345', jurisdiction: 'Colorado DOT', validFrom: '2026-02-15', validTo: '2026-05-15', status: 'Approved' },
      { id: 'ut-5', state: 'Utah', stateCode: 'UT', permitNumber: 'UT-2026-67890', jurisdiction: 'Utah DOT', validFrom: '2026-02-15', validTo: '2026-05-15', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 1 }
    ],
    dims: { height: '13\' 0"', width: '11\' 0"', length: '48\' 0"', weight: '42,000 lbs' },
    notes: 'Standard oversize escort through mountain route.',
    price: { type: 'Per Mile', value: '2.25' },
    jobSource: 'OPEN',
    rating: {
      overallRating: 4.7,
      professionalism: 5,
      communication: 4,
      timeliness: 5,
      comment: 'Solid escort through challenging mountain terrain. Very knowledgeable.',
      submittedAt: new Date('2026-02-19T17:00:00').toISOString()
    },
    driverRating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: 'Professional driver, handled the mountain route well.',
      submittedAt: new Date('2026-02-19T18:00:00').toISOString(),
      submittedBy: 'Sarah Martinez',
      pilotCarCompany: 'Rocky Mountain Escorts'
    },
    bids: [
      { 
        id: 'BID-301-1', 
        companyName: 'Rocky Mountain Escorts', 
        driverName: 'Sarah Martinez',
        amount: 1180, 
        rating: 4.7, 
        vehicleType: 'Ford F-250', 
        status: 'Accepted',
        bidType: 'marketplace',
        jobStatus: 'Completed',
        startTime: new Date('2026-02-18T06:00:00').toISOString(),
        endTime: new Date('2026-02-19T16:30:00').toISOString(),
        contactPerson: 'Sarah Martinez',
        contactPhone: '(970) 555-0123',
        contactEmail: 'sarah@rockymountainescorts.com',
        company: 'Rocky Mountain Escorts',
        companyEmail: 'billing@rockymountainescorts.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-2024-302',
    tripId: 'REQ-1016',
    jobTitle: 'Phoenix to Las Vegas Wide Load Escort',
    title: 'Phoenix to Las Vegas Wide Load Escort',
    description: 'Chase car escort for wide industrial equipment',
    jobType: 'chase',
    origin: 'Phoenix, AZ',
    destination: 'Las Vegas, NV',
    route: '295 mi',
    distance: '295 mi',
    pickupDate: '2026-02-20',
    startDate: '2026-02-20',
    startTime: '07:00',
    endDate: '2026-02-20',
    estimatedDuration: '1 day',
    estimatedDistance: '295 mi',
    meetAtJobStart: 'Phoenix Industrial Park',
    vehicleType: 'Chase',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2026-02-12',
    freightDesc: 'Wide industrial equipment',
    commodityType: 'Industrial Equipment',
    grossVehicleWeight: '85,000 lbs',
    loadWeight: '38,000 lbs',
    overHeight: '12\' 0"',
    overWidth: '13\' 6"',
    overLength: '42\' 0"',
    trailerLength: '48\' 0"',
    loadLength: '42\' 0"',
    specialHandling: 'Wide load requires chase car with signage and warning lights',
    statesProvinces: ['AZ', 'NV'],
    requestedRoute: 'US-93 North to Las Vegas',
    meetingLocation: 'Phoenix Industrial Park - 3200 W Buckeye Rd, Phoenix, AZ',
    meetingInstructions: 'Meet at warehouse loading dock. Safety briefing at 06:30.',
    contactName: 'Mike Johnson',
    contactPhone: '(602) 555-0456',
    pricingType: 'flat',
    baseRate: '850',
    costPerMile: '2.88',
    costPerHour: '75',
    minimumDailyRate: '600',
    specialInstructions: 'Desert route, ensure vehicle is equipped with emergency supplies.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'az-3', state: 'Arizona', stateCode: 'AZ', permitNumber: 'AZ-2026-23456', jurisdiction: 'Arizona DOT', validFrom: '2026-02-18', validTo: '2026-05-18', status: 'Approved' },
      { id: 'nv-3', state: 'Nevada', stateCode: 'NV', permitNumber: 'NV-2026-34567', jurisdiction: 'Nevada DOT', validFrom: '2026-02-18', validTo: '2026-05-18', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '12\' 0"', width: '13\' 6"', length: '42\' 0"', weight: '38,000 lbs' },
    notes: 'Wide load escort through desert route.',
    price: { type: 'Flat Rate', value: '850' },
    jobSource: 'OPEN',
    rating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: 'Excellent service! Very responsive and professional.',
      submittedAt: new Date('2026-02-21T10:30:00').toISOString()
    },
    driverRating: {
      overallRating: 4.9,
      professionalism: 5,
      communication: 5,
      timeliness: 5,
      comment: 'Outstanding driver! Very careful and kept me informed at all times.',
      submittedAt: new Date('2026-02-20T15:30:00').toISOString(),
      submittedBy: 'Carlos Rivera',
      pilotCarCompany: 'Desert Pilot Services'
    },
    bids: [
      { 
        id: 'BID-302-1', 
        companyName: 'Desert Pilot Services', 
        driverName: 'Carlos Rivera',
        amount: 850, 
        rating: 4.8, 
        vehicleType: 'Dodge Ram 2500', 
        status: 'Accepted',
        bidType: 'marketplace',
        jobStatus: 'Completed',
        startTime: new Date('2026-02-20T07:00:00').toISOString(),
        endTime: new Date('2026-02-20T14:15:00').toISOString(),
        contactPerson: 'Carlos Rivera',
        contactPhone: '(480) 555-0987',
        contactEmail: 'carlos@desertpilot.com',
        company: 'Desert Pilot Services',
        companyEmail: 'billing@desertpilot.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-105',
    tripId: 'REQ-1001',
    jobTitle: 'Wisconsin to Illinois Wide Load Escort',
    title: 'Wisconsin to Illinois Wide Load Escort',
    description: 'Single pilot car escort for oversized manufacturing equipment',
    jobType: 'lead',
    origin: 'Milwaukee, WI',
    destination: 'Chicago, IL',
    route: '92 mi',
    distance: '92 mi',
    pickupDate: '2026-02-16',
    startDate: '2026-02-16',
    startTime: '09:00',
    endDate: '2026-02-16',
    estimatedDuration: '1 day',
    estimatedDistance: '92 mi',
    meetAtJobStart: 'Milwaukee Industrial Park',
    vehicleType: 'Lead',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2026-02-08',
    freightDesc: 'Industrial manufacturing equipment',
    commodityType: 'Manufacturing Equipment',
    grossVehicleWeight: '85,000 lbs',
    loadWeight: '38,000 lbs',
    overHeight: '12\' 6"',
    overWidth: '12\' 0"',
    overLength: '45\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '45\' 0"',
    specialHandling: 'Standard wide load escort, I-94 corridor',
    statesProvinces: ['WI', 'IL'],
    requestedRoute: 'I-94 East into Chicago metro area',
    meetingLocation: 'Milwaukee Industrial Park - 6000 W State St, Milwaukee, WI',
    meetingInstructions: 'Meet at loading dock #3. Pre-trip briefing at 08:30.',
    contactName: 'Mike Patterson',
    contactPhone: '(414) 555-0234',
    pricingType: 'flat',
    baseRate: '680',
    costPerMile: '1.95',
    costPerHour: '70',
    minimumDailyRate: '550',
    specialInstructions: 'Short interstate run. Return to Milwaukee after delivery.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'wi-1', state: 'Wisconsin', stateCode: 'WI', permitNumber: 'WI-2026-11111', jurisdiction: 'Wisconsin DOT', validFrom: '2026-02-10', validTo: '2026-05-10', status: 'Approved' },
      { id: 'il-1', state: 'Illinois', stateCode: 'IL', permitNumber: 'IL-2026-22222', jurisdiction: 'Illinois DOT', validFrom: '2026-02-10', validTo: '2026-05-10', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 1 }
    ],
    dims: { height: '12\' 6"', width: '12\' 0"', length: '45\' 0"', weight: '38,000 lbs' },
    notes: 'Quick turnaround escort for manufacturing equipment.',
    price: { type: 'Flat Rate', value: '680' },
    jobSource: 'OPEN',
    driverRating: {
      overallRating: 4.5,
      professionalism: 5,
      communication: 4,
      timeliness: 4,
      comment: 'Good driver, very professional. Could improve on communication during the trip.',
      submittedAt: new Date('2026-02-16T16:00:00').toISOString(),
      submittedBy: 'Jennifer Walsh',
      pilotCarCompany: 'Great Lakes Pilot Services'
    },
    rating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: 'Great escort service! Very professional and helpful throughout the trip.',
      submittedAt: new Date('2026-02-16T15:00:00').toISOString()
    },
    bids: [
      { 
        id: 'BID-105-1', 
        companyName: 'Great Lakes Pilot Services', 
        driverName: 'Jennifer Walsh',
        amount: 680, 
        rating: 4.6, 
        vehicleType: 'Chevrolet Silverado 2500', 
        status: 'Accepted',
        bidType: 'marketplace',
        jobStatus: 'Completed',
        startTime: new Date('2026-02-16T09:00:00').toISOString(),
        endTime: new Date('2026-02-16T14:30:00').toISOString(),
        contactPerson: 'Jennifer Walsh',
        contactPhone: '(262) 555-0456',
        contactEmail: 'jwalsh@greatlakespilot.com',
        company: 'Great Lakes Pilot Services',
        companyEmail: 'billing@greatlakespilot.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-106',
    tripId: 'REQ-1001',
    jobTitle: 'Michigan to Ohio Heavy Equipment Transport',
    title: 'Michigan to Ohio Heavy Equipment Transport',
    description: 'Dual pilot car escort for crane transport',
    jobType: 'lead',
    origin: 'Detroit, MI',
    destination: 'Cleveland, OH',
    route: '170 mi',
    distance: '170 mi',
    pickupDate: '2026-02-14',
    startDate: '2026-02-14',
    startTime: '07:00',
    endDate: '2026-02-14',
    estimatedDuration: '1 day',
    estimatedDistance: '170 mi',
    meetAtJobStart: 'Detroit Equipment Yard',
    vehicleType: 'Lead',
    numberOfVehicles: 2,
    status: 'Completed',
    postedDate: '2026-02-05',
    freightDesc: 'Mobile crane - oversize transport',
    commodityType: 'Construction Equipment',
    grossVehicleWeight: '98,000 lbs',
    loadWeight: '48,000 lbs',
    overHeight: '14\' 0"',
    overWidth: '13\' 0"',
    overLength: '52\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '52\' 0"',
    specialHandling: 'Dual escort required, crane boom secured',
    statesProvinces: ['MI', 'OH'],
    requestedRoute: 'I-75 South to I-80 East into Cleveland',
    meetingLocation: 'Detroit Equipment Yard - 12500 E Eight Mile Rd, Detroit, MI',
    meetingInstructions: 'Meet at security gate. Check in required. Pre-trip briefing at 06:30.',
    contactName: 'Robert Chen',
    contactPhone: '(313) 555-0789',
    pricingType: 'mileage',
    baseRate: '950',
    costPerMile: '2.15',
    costPerHour: '80',
    minimumDailyRate: '700',
    specialInstructions: 'Heavy crane transport. Dual escort vehicles required front and rear.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'mi-1', state: 'Michigan', stateCode: 'MI', permitNumber: 'MI-2026-33333', jurisdiction: 'Michigan DOT', validFrom: '2026-02-05', validTo: '2026-05-05', status: 'Approved' },
      { id: 'oh-1', state: 'Ohio', stateCode: 'OH', permitNumber: 'OH-2026-44444', jurisdiction: 'Ohio DOT', validFrom: '2026-02-05', validTo: '2026-05-05', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 2 }
    ],
    dims: { height: '14\' 0"', width: '13\' 0"', length: '52\' 0"', weight: '48,000 lbs' },
    notes: 'Crane transport requiring dual escort vehicles.',
    price: { type: 'Per Mile', value: '2.15' },
    jobSource: 'REQUESTED',
    driverRating: {
      overallRating: 4.7,
      professionalism: 5,
      communication: 4,
      timeliness: 5,
      comment: 'Excellent driver with great attention to detail. Very professional throughout the heavy haul escort.',
      submittedAt: new Date('2026-02-14T15:00:00').toISOString(),
      submittedBy: 'Thomas Bradley',
      pilotCarCompany: 'Midwest Heavy Haul Escorts'
    },
    rating: {
      overallRating: 5.0,
      categories: [
        { id: 'safety', label: 'Safety', value: 5 },
        { id: 'driving', label: 'Driving & Compliance', value: 5 },
        { id: 'communication', label: 'Communication', value: 5 },
        { id: 'professionalism', label: 'Professionalism', value: 5 },
        { id: 'vehicle', label: 'Vehicle & Equipment', value: 5 },
        { id: 'assetHealth', label: 'Asset Health', value: 5 }
      ],
      comment: 'Outstanding pilot car service! Thomas was extremely professional and handled the dual escort perfectly. Equipment was in excellent condition.',
      submittedAt: new Date('2026-02-14T14:00:00').toISOString()
    },
    bids: [
      { 
        id: 'BID-106-1', 
        companyName: 'Midwest Heavy Haul Escorts', 
        driverName: 'Thomas Bradley',
        amount: 950, 
        rating: 4.9, 
        vehicleType: 'Ford F-350', 
        status: 'Accepted',
        bidType: 'direct_request',
        jobStatus: 'Completed',
        startTime: new Date('2026-02-14T07:00:00').toISOString(),
        endTime: new Date('2026-02-14T13:45:00').toISOString(),
        contactPerson: 'Thomas Bradley',
        contactPhone: '(734) 555-0321',
        contactEmail: 'tbradley@midwestheavyhaul.com',
        company: 'Midwest Heavy Haul Escorts',
        companyEmail: 'billing@midwestheavyhaul.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-1006',
    tripId: 'REQ-1006',
    jobTitle: 'Sacramento to Reno Mountain Pass Escort',
    title: 'Sacramento to Reno Mountain Pass Escort',
    description: 'Wide load escort through Sierra Nevada mountain passes',
    jobType: 'lead',
    origin: 'Sacramento, CA',
    destination: 'Reno, NV',
    route: '133 mi',
    distance: '133 mi',
    pickupDate: '2024-10-20',
    startDate: '2024-10-20',
    startTime: '06:00',
    endDate: '2024-10-20',
    estimatedDuration: '1 day',
    estimatedDistance: '133 mi',
    meetAtJobStart: 'Sacramento Distribution Center',
    vehicleType: 'Lead',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2024-10-12',
    freightDesc: 'Wide construction equipment',
    commodityType: 'Construction Equipment',
    grossVehicleWeight: '88,000 lbs',
    loadWeight: '41,000 lbs',
    overHeight: '12\' 3"',
    overWidth: '13\' 6"',
    overLength: '48\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '48\' 0"',
    specialHandling: 'Mountain pass escort requiring experienced winter driver',
    statesProvinces: ['CA', 'NV'],
    requestedRoute: 'I-80 East through Donner Pass. Weather-dependent route timing. Chain restrictions possible.',
    meetingLocation: 'Sacramento Distribution Center - 4567 Industrial Blvd, Sacramento, CA',
    meetingInstructions: 'Meet at loading dock B. Weather briefing at 05:45. CB channel 19 required.',
    contactName: 'Sarah Smith',
    contactPhone: '(916) 555-0234',
    pricingType: 'flat',
    baseRate: '875',
    costPerMile: '6.58',
    costPerHour: '85',
    minimumDailyRate: '800',
    specialInstructions: 'Mountain pass escort. Monitor weather conditions. Chains may be required.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'ca-5', state: 'California', stateCode: 'CA', permitNumber: 'CA-2024-55555', jurisdiction: 'California DOT', validFrom: '2024-10-15', validTo: '2025-01-15', status: 'Approved' },
      { id: 'nv-5', state: 'Nevada', stateCode: 'NV', permitNumber: 'NV-2024-66666', jurisdiction: 'Nevada DOT', validFrom: '2024-10-15', validTo: '2025-01-15', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Lead', type: 'Lead', count: 1 }
    ],
    dims: { height: '12\' 3"', width: '13\' 6"', length: '48\' 0"', weight: '41,000 lbs' },
    notes: 'Mountain pass route requiring experienced driver with winter conditions expertise.',
    price: { type: 'Flat Rate', value: '875' },
    jobSource: 'OPEN',
    driverRating: {
      overallRating: 4.2,
      professionalism: 4,
      communication: 4,
      timeliness: 5,
      comment: 'Solid performance through challenging mountain conditions. Professional and prepared.',
      submittedAt: new Date('2024-10-30T14:30:00').toISOString(),
      submittedBy: 'Rick Thompson',
      pilotCarCompany: 'Sierra Nevada Escorts'
    },
    rating: {
      overallRating: 4.5,
      professionalism: 5,
      communication: 4,
      timeliness: 4,
      comment: 'Good communication throughout the trip. Customer was well-prepared and easy to work with.',
      submittedAt: new Date('2024-10-30T15:00:00').toISOString()
    },
    bids: [
      { 
        id: 'BID-1006-1', 
        companyName: 'Sierra Nevada Escorts', 
        driverName: 'Rick Thompson',
        amount: 875, 
        rating: 4.7, 
        vehicleType: 'Chevy Silverado 2500', 
        status: 'Accepted',
        bidType: 'marketplace',
        jobStatus: 'Completed',
        startTime: new Date('2024-10-20T06:00:00').toISOString(),
        endTime: new Date('2024-10-20T12:45:00').toISOString(),
        contactPerson: 'Rick Thompson',
        contactPhone: '(530) 555-0987',
        contactEmail: 'rick@sierranevadaescorts.com',
        company: 'Sierra Nevada Escorts',
        companyEmail: 'billing@sierranevadaescorts.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-1007',
    tripId: 'REQ-1007',
    jobTitle: 'Austin to Houston Energy Equipment Transport',
    title: 'Austin to Houston Energy Equipment Transport',
    description: 'Chase car escort for oversized energy equipment',
    jobType: 'chase',
    origin: 'Austin, TX',
    destination: 'Houston, TX',
    route: '162 mi',
    distance: '162 mi',
    pickupDate: '2024-09-05',
    startDate: '2024-09-05',
    startTime: '07:00',
    endDate: '2024-09-05',
    estimatedDuration: '1 day',
    estimatedDistance: '162 mi',
    meetAtJobStart: 'Austin Energy Park',
    vehicleType: 'Chase',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2024-08-28',
    freightDesc: 'Oversized energy transformer',
    commodityType: 'Energy Equipment',
    grossVehicleWeight: '92,000 lbs',
    loadWeight: '45,000 lbs',
    overHeight: '13\' 0"',
    overWidth: '14\' 0"',
    overLength: '42\' 0"',
    trailerLength: '48\' 0"',
    loadLength: '42\' 0"',
    specialHandling: 'Heavy transformer requiring rear chase escort with emergency lights',
    statesProvinces: ['TX'],
    requestedRoute: 'I-290 to US-290 to I-10 East. Avoid peak traffic hours. Wide load restrictions apply.',
    meetingLocation: 'Austin Energy Park - 7200 Distribution Dr, Austin, TX',
    meetingInstructions: 'Report to security gate. Safety briefing at 06:45. Emergency lights and CB required.',
    contactName: 'Mike Johnson',
    contactPhone: '(512) 555-0456',
    pricingType: 'mileage',
    baseRate: '650',
    costPerMile: '4.01',
    costPerHour: '75',
    minimumDailyRate: '650',
    specialInstructions: 'Chase car escort for wide transformer. Must maintain 500ft rear distance. Emergency lights required.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'tx-5', state: 'Texas', stateCode: 'TX', permitNumber: 'TX-2024-77777', jurisdiction: 'Texas DOT', validFrom: '2024-09-01', validTo: '2024-11-30', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '13\' 0"', width: '14\' 0"', length: '42\' 0"', weight: '45,000 lbs' },
    notes: 'Wide transformer transport requiring chase car with proper lighting.',
    price: { type: 'Per Mile', value: '4.01' },
    jobSource: 'REQUESTED',
    driverRating: {
      overallRating: 4.6,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: 'Excellent pilot car service. Very professional and maintained perfect positioning throughout the route.',
      submittedAt: new Date('2024-09-15T16:00:00').toISOString(),
      submittedBy: 'Linda Martinez',
      pilotCarCompany: 'Texas Pilot Services'
    },
    rating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 5,
      comment: 'Outstanding customer! Clear instructions, professional coordination, and smooth operations.',
      submittedAt: new Date('2024-09-15T16:30:00').toISOString()
    },
    bids: [
      { 
        id: 'BID-1007-1', 
        companyName: 'Texas Pilot Services', 
        driverName: 'Linda Martinez',
        amount: 650, 
        rating: 4.9, 
        vehicleType: 'Ford F-250', 
        status: 'Accepted',
        bidType: 'requested',
        jobStatus: 'Completed',
        startTime: new Date('2024-09-05T07:00:00').toISOString(),
        endTime: new Date('2024-09-05T11:30:00').toISOString(),
        contactPerson: 'Linda Martinez',
        contactPhone: '(713) 555-0654',
        contactEmail: 'linda@texaspilotservices.com',
        company: 'Texas Pilot Services',
        companyEmail: 'billing@texaspilotservices.com',
        invoiceApproved: true
      }
    ]
  },
  {
    id: 'JOB-1001-NEW',
    tripId: 'REQ-1001',
    jobTitle: 'Pennsylvania to Maryland Interstate Escort',
    title: 'Pennsylvania to Maryland Interstate Escort',
    description: 'Chase car escort for wide industrial equipment through PA/MD corridor',
    jobType: 'chase',
    origin: 'Pittsburgh, PA',
    destination: 'Baltimore, MD',
    route: '248 mi',
    distance: '248 mi',
    pickupDate: '2026-02-10',
    startDate: '2026-02-10',
    startTime: '06:30',
    endDate: '2026-02-10',
    estimatedDuration: '1 day',
    estimatedDistance: '248 mi',
    meetAtJobStart: 'Pittsburgh Industrial Park',
    vehicleType: 'Chase',
    numberOfVehicles: 1,
    status: 'Completed',
    postedDate: '2026-02-02',
    freightDesc: 'Wide industrial machinery',
    commodityType: 'Industrial Equipment',
    grossVehicleWeight: '86,000 lbs',
    loadWeight: '39,000 lbs',
    overHeight: '12\' 6"',
    overWidth: '13\' 0"',
    overLength: '46\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '46\' 0"',
    specialHandling: 'Chase car required for wide load through Pennsylvania Turnpike and I-70 corridor',
    statesProvinces: ['PA', 'MD'],
    requestedRoute: 'I-76 Pennsylvania Turnpike to I-70 East. Maintain rear position 500ft. Monitor for swing on curves.',
    meetingLocation: 'Pittsburgh Industrial Park - 3400 Penn Ave, Pittsburgh, PA',
    meetingInstructions: 'Report to Gate 3. Safety briefing at 06:15. Emergency lights and CB channel 19 required.',
    contactName: 'David Patterson',
    contactPhone: '(412) 555-0789',
    pricingType: 'mileage',
    baseRate: '750',
    costPerMile: '3.02',
    costPerHour: '80',
    minimumDailyRate: '700',
    specialInstructions: 'Chase car escort through PA/MD corridor. Emergency lights required. Maintain safe rear distance.',
    permitSelection: 'existing',
    selectedPermits: [
      { id: 'pa-10', state: 'Pennsylvania', stateCode: 'PA', permitNumber: 'PA-2026-99999', jurisdiction: 'Pennsylvania DOT', validFrom: '2026-02-08', validTo: '2026-05-08', status: 'Approved' },
      { id: 'md-10', state: 'Maryland', stateCode: 'MD', permitNumber: 'MD-2026-88888', jurisdiction: 'Maryland DOT', validFrom: '2026-02-08', validTo: '2026-05-08', status: 'Approved' }
    ],
    requestedPilotCars: [
      { position: 'Chase', type: 'Chase', count: 1 }
    ],
    dims: { height: '12\' 6"', width: '13\' 0"', length: '46\' 0"', weight: '39,000 lbs' },
    notes: 'Chase car escort for wide machinery through PA/MD interstate corridor.',
    price: { type: 'Per Mile', value: '3.02' },
    jobSource: 'REQUESTED',
    driverRating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: 'Excellent customer! Very organized, clear communication, and professional throughout. Made my job easy.',
      submittedAt: new Date('2026-02-10T15:30:00').toISOString(),
      submittedBy: 'Angela Roberts',
      pilotCarCompany: 'Keystone Pilot Services'
    },
    bids: [
      { 
        id: 'BID-1001-NEW-1', 
        companyName: 'Keystone Pilot Services', 
        driverName: 'Angela Roberts',
        amount: 750, 
        rating: 4.9, 
        vehicleType: 'Ford F-350', 
        status: 'Accepted',
        bidType: 'requested',
        jobStatus: 'Completed',
        startTime: new Date('2026-02-10T06:30:00').toISOString(),
        endTime: new Date('2026-02-10T12:15:00').toISOString(),
        contactPerson: 'Angela Roberts',
        contactPhone: '(717) 555-0432',
        contactEmail: 'angela@keystonepilot.com',
        company: 'Keystone Pilot Services',
        companyEmail: 'billing@keystonepilot.com',
        invoiceApproved: true
      }
    ]
  }
];

// Unrated completed trip — used to demo the "Rate Trip" flow
// (no driverRating means the truck driver hasn't rated the pilot car yet)
const UNRATED_COMPLETED_PERMIT: Permit = {
  id: '11',
  requestId: 'REQ-1010',
  permitNumber: 'PER-2026-51A',
  createdDate: '2026-06-10',
  effectiveDate: '2026-06-15',
  expiryDate: '2026-06-25',
  driver: 'John Doe',
  states: [
    { code: 'MN', status: 'Approved', permitNumber: 'MN-2026-11111', effectiveDate: '2026-06-15', expiryDate: '2026-06-25' },
    { code: 'WI', status: 'Approved', permitNumber: 'WI-2026-22222', effectiveDate: '2026-06-15', expiryDate: '2026-06-25' },
  ],
  origin: 'Minneapolis, MN',
  destination: 'Milwaukee, WI',
  status: 'Completed',
  truck: { unit: 'TRK-4001', plate: 'MN-7890', make: 'Kenworth', year: '2023' },
  trailer: { unit: 'TRL-7001', plate: 'TLR-1234', type: 'Flatbed', length: '53 ft' },
  driverDetails: { name: 'John Doe', license: 'D12345678', state: 'MN', phone: '(612) 555-0123' },
  load: { type: 'Modular Bridge Section', description: 'Pre-cast concrete bridge panel', width: '14 ft', height: '11 ft', length: '60 ft', weight: '68,000 lbs' },
  routeDetails: { miles: '337' },
};

const UNRATED_COMPLETED_JOB: PilotJob = {
  id: 'JOB-1010',
  tripId: 'REQ-1010',
  jobTitle: 'Minneapolis to Milwaukee Wide Load Escort',
  title: 'Minneapolis to Milwaukee Wide Load Escort',
  origin: 'Minneapolis, MN',
  destination: 'Milwaukee, WI',
  vehicleType: 'Lead',
  numberOfVehicles: 1,
  status: 'Completed',
  startDate: '2026-06-15',
  endDate: '2026-06-16',
  freightDesc: 'Modular bridge section — pre-cast concrete',
  statesProvinces: ['MN', 'WI'],
  dims: { height: '11\' 0"', width: '14\' 0"', length: '60\' 0"', weight: '68,000 lbs' },
  notes: 'Wide load requiring lead escort through I-94 corridor.',
  price: { type: 'Flat Rate', value: '1100' },
  jobSource: 'OPEN',
  bids: [
    {
      id: 'BID-1010-1',
      companyName: 'Great Plains Pilot Services',
      driverName: 'Kevin Hartmann',
      amount: 1100,
      rating: 4.7,
      vehicleType: 'Ford F-350',
      status: 'Accepted',
      jobStatus: 'Completed',
      startTime: new Date('2026-06-15T07:00:00').toISOString(),
      endTime: new Date('2026-06-16T09:30:00').toISOString(),
      contactPerson: 'Kevin Hartmann',
      contactPhone: '(612) 555-0456',
      invoiceApproved: false,
    }
  ],
};

// Merge the unrated completed trip into the mock data arrays
const ALL_MOCK_PERMITS = [...MOCK_PERMITS, UNRATED_COMPLETED_PERMIT];
const ALL_MOCK_JOBS = [...MOCK_JOBS, UNRATED_COMPLETED_JOB];

// Mock Pilot Car data for "Request Specific Pilot Cars" flow
const MOCK_AVAILABLE_PILOT_CARS = [
  { id: 'PC-001', company: 'SafePilot Escorts', driver: 'James Mitchell', type: 'High Pole', experience: 12, rating: 4.8, jurisdictions: ['NY', 'NJ', 'PA', 'FL'], availability: true, certifications: ['OSHA 10', 'Hazmat'], totalTrips: 380 },
  { id: 'PC-002', company: 'Elite Escort Services', driver: 'Sarah Thompson', type: 'Lead', experience: 15, rating: 5.0, jurisdictions: ['NY', 'NJ', 'PA', 'MD', 'VA', 'FL'], availability: true, certifications: ['OSHA 30', 'First Aid'], totalTrips: 520 },
  { id: 'PC-003', company: 'QuickResponse Pilots', driver: 'Michael Rodriguez', type: 'Chase', experience: 8, rating: 4.9, jurisdictions: ['NY', 'NJ', 'PA', 'DE', 'MD', 'VA', 'FL'], availability: true, certifications: ['Wide Load Cert'], totalTrips: 210 },
  { id: 'PC-004', company: 'Lone Star Escorts', driver: 'Bobby Turner', type: 'Chase', experience: 10, rating: 4.7, jurisdictions: ['TX', 'OK', 'NM', 'AR', 'LA'], availability: true, certifications: ['OSHA 10', 'Flagging Cert'], totalTrips: 290 },
  { id: 'PC-005', company: 'Prairie Wind Pilots', driver: 'Karen Davis', type: 'Lead', experience: 6, rating: 4.5, jurisdictions: ['TX', 'OK', 'KS', 'CO'], availability: false, certifications: ['Wide Load Cert'], totalTrips: 145 },
  { id: 'PC-006', company: 'West Coast Escorts', driver: 'David Chen', type: 'High Pole', experience: 14, rating: 4.9, jurisdictions: ['CA', 'OR', 'WA', 'NV', 'AZ'], availability: true, certifications: ['OSHA 30', 'Hazmat', 'First Aid'], totalTrips: 430 },
  { id: 'PC-007', company: 'Mountain West Escorts', driver: 'Lisa Monroe', type: 'Lead', experience: 9, rating: 4.6, jurisdictions: ['UT', 'CO', 'NV', 'AZ', 'NM'], availability: true, certifications: ['Flagging Cert'], totalTrips: 195 },
];

interface ManageTripsProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export default function ManageTrips({ onNavigate }: ManageTripsProps) {
  const { showSnackbar } = useSnackbar();
  // Top-level tab state
  const [mainView, setMainView] = useState<'trips' | 'jobs'>('trips');
  
  // Trips states
  const [activeTab, setActiveTab] = useState<'Open' | 'In Transit' | 'Action Required' | 'Completed'>('In Transit');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const [expandedStateBadges, setExpandedStateBadges] = useState<Record<string, boolean>>({});

  // Filter & Sort States
  const [sortBy, setSortBy] = useState('created_desc');
  const [filterStates, setFilterStates] = useState<string[]>([]);
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [tempFilterStates, setTempFilterStates] = useState<string[]>([]);
  const [tempDateStart, setTempDateStart] = useState('');
  const [tempDateEnd, setTempDateEnd] = useState('');
  
  // UI States
  const [fabOpen, setFabOpen] = useState(false);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  const [activeActionPermit, setActiveActionPermit] = useState<Permit | null>(null);
  const [downloadingPermit, setDownloadingPermit] = useState<Permit | null>(null);
  const [applyingPermit, setApplyingPermit] = useState<Permit | null>(null);
  const [activeStatePermit, setActiveStatePermit] = useState<{permitId: string, state: PermitState} | null>(null);
  
  // Autofill Modal States
  const [autofillTab, setAutofillTab] = useState('Approved');
  const [autofillSearch, setAutofillSearch] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filterDriver, setFilterDriver] = useState('all');

  // Jobs states
  const [jobSearch, setJobSearch] = useState('');
  const [activeJob, setActiveJob] = useState<PilotJob | null>(null);
  const [activeJobTab, setActiveJobTab] = useState('details');
  const [endBiddingDialogOpen, setEndBiddingDialogOpen] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [bidsFilterTab, setBidsFilterTab] = useState<'all' | 'requested' | 'marketplace'>('all');
  const [confirmAssignmentOpen, setConfirmAssignmentOpen] = useState(false);
  // Request Specific Pilot Cars flow states
  const [selectPilotCarsOpen, setSelectPilotCarsOpen] = useState(false);
  const [confirmRequestOpen, setConfirmRequestOpen] = useState(false);
  const [pendingRequestPCs, setPendingRequestPCs] = useState<typeof MOCK_AVAILABLE_PILOT_CARS>([]);
  const [jobDetailsSections, setJobDetailsSections] = useState<Record<string, boolean>>({
    overview: true,
    requirements: true,
    schedule: true,
    location: false,
    pricing: false,
    extras: false,
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [jobTabFilter, setJobTabFilter] = useState<'all' | 'assigned' | 'open' | 'completed'>('all');

  // Helper function to toggle collapsible sections in job details
  const toggleJobDetailsSection = (section: string) => {
    setJobDetailsSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Rate Trip flow states
  // Pre-seed with trip IDs that already have a driverRating in mock data
  const [ratedTripIds, setRatedTripIds] = useState<Set<string>>(
    new Set(ALL_MOCK_PERMITS.filter(p => p.driverRating).map(p => p.id))
  );
  const [rateTripTarget, setRateTripTarget] = useState<{
    permit: Permit;
    pilotCarId: string;
    pilotCarName: string;
  } | null>(null);

  const handleRateTripSuccess = (rating: SubmittedRating) => {
    if (rateTripTarget) {
      setRatedTripIds(prev => new Set([...prev, rateTripTarget.permit.id]));
      setRateTripTarget(null);
      showSnackbar(`Rating submitted for ${rateTripTarget.pilotCarName}`, 'success', 4000);
    }
  };

  const openRateTrip = (permit: Permit) => {
    const tripJobs = ALL_MOCK_JOBS.filter(j => j.tripId === permit.requestId);
    const acceptedBid = tripJobs.flatMap(j => j.bids).find(b => b.status === 'Accepted');
    if (acceptedBid) {
      setRateTripTarget({
        permit,
        pilotCarId: acceptedBid.id,
        pilotCarName: acceptedBid.companyName,
      });
    }
  };

  // End Trip flow states
  const [endTripConfirmPermit, setEndTripConfirmPermit] = useState<Permit | null>(null);
  const [tripSummaryData, setTripSummaryData] = useState<{ trip: Permit; startedAt: Date; endedAt: Date } | null>(null);

  const handleEndTripConfirm = (permit: Permit) => {
    const endedAt = new Date();
    const startedAt = new Date(permit.effectiveDate);
    setEndTripConfirmPermit(null);
    setTripSummaryData({ trip: { ...permit, status: 'Completed' }, startedAt, endedAt });
    showSnackbar(`Trip ${permit.requestId} marked as Completed. GPS tracking stopped.`, 'success', 5000);
  };

  // Time tracking states for active jobs
  const [breakTimeActive, setBreakTimeActive] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [waitingTimeActive, setWaitingTimeActive] = useState(false);
  const [waitingStartTime, setWaitingStartTime] = useState<Date | null>(null);
  const [totalWaitingTime, setTotalWaitingTime] = useState(0);

  // Filter permits based on tab and search query for MAIN LIST
  const filteredPermits = useMemo(() => {
    let result = ALL_MOCK_PERMITS.filter(permit => {
      let matchesTab = false;
      
      if (activeTab === 'Open') {
        matchesTab = permit.status === 'Open';
      } else if (activeTab === 'In Transit') {
        matchesTab = permit.status === 'In Transit';
      } else if (activeTab === 'Action Required') {
        matchesTab = permit.status === 'Action Required';
      } else if (activeTab === 'Completed') {
        matchesTab = permit.status === 'Completed';
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

  // Tab counts for the status filter tabs
  const tabCounts = useMemo(() => ({
    Open: ALL_MOCK_PERMITS.filter(p => p.status === 'Open').length,
    'In Transit': ALL_MOCK_PERMITS.filter(p => p.status === 'In Transit').length,
    'Action Required': ALL_MOCK_PERMITS.filter(p => p.status === 'Action Required').length,
    Completed: ALL_MOCK_PERMITS.filter(p => p.status === 'Completed').length,
  }), []);

  // Filter for AUTOFILL LIST
  const filteredAutofillPermits = useMemo(() => {
    return ALL_MOCK_PERMITS.filter(permit => {
      let matchesTab = false;
      if (autofillTab === 'Open') matchesTab = permit.status === 'Open';
      else if (autofillTab === 'In Transit') matchesTab = permit.status === 'In Transit';
      else if (autofillTab === 'Action Required') matchesTab = permit.status === 'Action Required';
      else if (autofillTab === 'Completed') matchesTab = permit.status === 'Completed';
      else matchesTab = false;

      const matchesSearch = 
        permit.requestId.toLowerCase().includes(autofillSearch.toLowerCase()) ||
        permit.driver.toLowerCase().includes(autofillSearch.toLowerCase()) ||
        (permit.permitNumber && permit.permitNumber.toLowerCase().includes(autofillSearch.toLowerCase())) ||
        permit.origin.toLowerCase().includes(autofillSearch.toLowerCase());

      const matchesDriver = filterDriver === 'all' || permit.driver === filterDriver;

      return matchesTab && matchesSearch && matchesDriver;
    });
  }, [autofillTab, autofillSearch, filterDriver]);

  // Filter jobs (old format - keeping for backward compatibility)
  const filteredJobs = ALL_MOCK_JOBS.filter(job => {
     const matchesSearch = 
        job.id.toLowerCase().includes(jobSearch.toLowerCase()) || 
        job.origin.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.destination.toLowerCase().includes(jobSearch.toLowerCase());
     
     const matchesTabFilter = jobTabFilter === 'all' || job.status.toLowerCase() === jobTabFilter;
     const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter;
     const matchesVehicle = vehicleFilter === 'all' || job.vehicleType.toLowerCase().replace(' ', '-') === vehicleFilter;

     return matchesSearch && matchesTabFilter && matchesStatus && matchesVehicle;
  });

  // Filter state-level jobs
  const filteredStateJobs = MOCK_STATE_JOBS.filter(job => {
    const matchesSearch = 
      job.id.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.state.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.entryLocation.toLowerCase().includes(jobSearch.toLowerCase());
    
    // Map new statuses to tab filters
    let matchesTabFilter = false;
    if (jobTabFilter === 'all') {
      matchesTabFilter = true;
    } else if (jobTabFilter === 'open') {
      matchesTabFilter = job.status === 'Open for Bidding';
    } else if (jobTabFilter === 'bidding') {
      matchesTabFilter = job.status === 'Bid Received' || job.status === 'Bidding Closed';
    } else if (jobTabFilter === 'assigned') {
      matchesTabFilter = job.status === 'Assigned' || job.status === 'In Progress';
    } else if (jobTabFilter === 'completed') {
      matchesTabFilter = job.status === 'Completed' || job.status === 'Expired';
    }

    return matchesSearch && matchesTabFilter;
  });

  const activeFiltersCount = (statusFilter !== 'all' ? 1 : 0) + (vehicleFilter !== 'all' ? 1 : 0);

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

  const resetJobFilters = () => {
    setStatusFilter('all');
    setVehicleFilter('all');
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
    
    const template = ALL_MOCK_PERMITS.find(p => p.id === selectedTemplateId);
    
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
    if (permit.status === 'Action Required' && onNavigate) {
       onNavigate('new-permit-application', { mode: 'revision' }); 
    } else if (onNavigate) {
       onNavigate('view-permit-request', permit);
    }
  };

  const handleOpenJob = (job: PilotJob, tab: 'details' | 'bids' = 'details') => {
    setActiveJob(job);
    setActiveJobTab(tab);
    setSelectedBidId(null); // Reset selection when opening a new job
  };

  const handleEndBiddingConfirm = () => {
    if (activeJob) {
      // Update the job status to reflect bidding is closed
      console.log('End bidding confirmed for job:', activeJob.id);
      setEndBiddingDialogOpen(false);
    }
  };

  const handleAssignFromDrawer = () => {
    if (activeJob) {
      // Switch to bids tab so the user can review and assign
      setActiveJobTab('bids');
    }
  };

  // Handle "Request Specific Pilot Cars" flow
  const handleOpenSelectPilotCars = () => {
    setSelectPilotCarsOpen(true);
  };

  const handleQuoteRequested = (_jobStatus: string, requestedPilotCars: typeof MOCK_AVAILABLE_PILOT_CARS) => {
    // Store the requested PCs for confirmation dialog
    setPendingRequestPCs(requestedPilotCars);
  };

  const handleConfirmSendRequest = () => {
    if (activeJob && pendingRequestPCs.length > 0) {
      const requestedIds = pendingRequestPCs.map(pc => pc.id);
      // Generate "requested" bids with Pending status from the requested pilot cars
      const requestedBids: Bid[] = pendingRequestPCs.map((pc, idx) => ({
        id: `BID-REQ-${activeJob.id}-${idx + 1}`,
        companyName: pc.company,
        driverName: pc.driver,
        amount: 0, // No bid amount yet — waiting for response
        rating: pc.rating,
        vehicleType: pc.type,
        status: 'Pending' as const,
        bidType: 'requested' as const,
        yearsExperience: pc.experience,
        totalTrips: pc.totalTrips,
        submittedAt: new Date().toISOString(),
      }));
      const updatedJob = {
        ...activeJob,
        status: 'Requested' as const,
        requestedPilotCarIds: [...(activeJob.requestedPilotCarIds || []), ...requestedIds],
        bids: [...activeJob.bids, ...requestedBids],
      };
      setActiveJob(updatedJob);
      setConfirmRequestOpen(false);
      setSelectPilotCarsOpen(false);
      setPendingRequestPCs([]);
      showSnackbar(`Quote request sent to ${pendingRequestPCs.length} pilot car${pendingRequestPCs.length !== 1 ? 's' : ''} successfully`, 'success', 4000);
    }
  };

  // Handle "Post to All" broadcast flow
  const handlePostToAll = () => {
    if (activeJob) {
      const updatedJob = { ...activeJob, status: 'Open' as const };
      setActiveJob(updatedJob);
      showSnackbar(`Job ${activeJob.id} posted to marketplace — open for bidding`, 'success', 4000);
    }
  };

  const PermitItem = ({ permit }: { permit: Permit }) => {
    const isStateBadgesExpanded = expandedStateBadges[permit.id] || false;
    const showStatesCount = 5;

    // Permit summary counts
    const approvedCount = permit.states.filter(s => s.status === 'Approved').length;
    const pendingCount = permit.states.filter(s => s.status === 'Pending' || s.status === 'Not Applied').length;
    const rejectedCount = permit.states.filter(s => s.status === 'Rejected').length;

    const getStateBadgeStyle = (status: string) => {
      switch (status) {
        case 'Approved': return { bg: '#ecfdf3', text: '#067647', border: '#abefc6' };
        case 'Pending': return { bg: '#eff8ff', text: '#2563eb', border: '#bfdbfe' };
        case 'Rejected': return { bg: '#fef3f2', text: '#b42318', border: '#fecdca' };
        case 'Expired': return { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' };
        case 'Not Applied': return { bg: '#fef9f5', text: '#92400e', border: '#fde68a' };
        default: return { bg: '#f9fafb', text: '#374151', border: '#e5e7eb' };
      }
    };

    // Status config: icon, colors, label
    const statusConfig = (() => {
      switch (permit.status) {
        case 'In Transit':
          return {
            icon: <Truck className="w-3 h-3" />,
            bg: 'bg-[#FFF8F0]', text: 'text-[#D97706]', border: 'border-[#FED7AA]',
            label: 'In Transit',
          };
        case 'Open':
          return {
            icon: <FileText className="w-3 h-3" />,
            bg: 'bg-[#EFF6FF]', text: 'text-[#3B82F6]', border: 'border-[#DBEAFE]',
            label: 'Open',
          };
        case 'Action Required':
          return {
            icon: <AlertTriangle className="w-3 h-3" />,
            bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', border: 'border-[#FECACA]',
            label: 'Action Required',
          };
        case 'Completed':
          return {
            icon: <CheckCircle className="w-3 h-3" />,
            bg: 'bg-[#F0FDF4]', text: 'text-[#16A34A]', border: 'border-[#BBF7D0]',
            label: 'Completed',
          };
        default:
          return {
            icon: null,
            bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200',
            label: permit.status,
          };
      }
    })();

    // Primary CTA config
    const primaryCta = (() => {
      if (permit.status === 'Open') {
        const permitsApplied = permit.states.some(s => s.status !== 'Not Applied');
        if (permitsApplied) {
          return {
            label: 'Download Permits',
            icon: <Download className="w-4 h-4" />,
            style: 'bg-[#F89823] hover:bg-[#e8880d] text-[#1a1a1a]',
            onClick: (e: React.MouseEvent) => { e.stopPropagation(); setDownloadingPermit(permit); },
          };
        }
        return {
          label: 'Apply Permits',
          icon: <Check className="w-4 h-4" />,
          style: 'bg-[#F89823] hover:bg-[#e8880d] text-[#1a1a1a]',
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            setApplyingPermit(permit);
          },
        };
      }
      if (permit.status === 'In Transit') {
        return {
          label: 'Download Permits',
          icon: <Download className="w-4 h-4" />,
          style: 'bg-[#F89823] hover:bg-[#e8880d] text-[#1a1a1a]',
          onClick: (e: React.MouseEvent) => { e.stopPropagation(); setDownloadingPermit(permit); },
        };
      }

      if (permit.status === 'Action Required') {
        return {
          label: 'Fix Issue',
          icon: <AlertTriangle className="w-4 h-4" />,
          style: 'bg-[#dc2626] hover:bg-red-700 text-white',
          onClick: (e: React.MouseEvent) => { e.stopPropagation(); handlePermitClick(permit); },
        };
      }
      if (permit.status === 'Completed') {
        const needsRating = !ratedTripIds.has(permit.id) && !permit.driverRating;
        if (needsRating) {
          return {
            label: 'Rate Trip',
            icon: <Star className="w-4 h-4" />,
            style: 'bg-[#F89823] hover:bg-[#e8880d] text-[#1a1a1a]',
            onClick: (e: React.MouseEvent) => { e.stopPropagation(); openRateTrip(permit); },
          };
        }
        return {
          label: 'View Details',
          icon: <Eye className="w-4 h-4" />,
          style: 'bg-gray-800 hover:bg-gray-900 text-white',
          onClick: (e: React.MouseEvent) => { e.stopPropagation(); handlePermitClick(permit); },
        };
      }
      return null;
    })();

    return (
      <div
        className={`bg-white rounded-xl border shadow-[0px_1px_3px_0px_rgba(95,95,95,0.08)] mb-2.5 overflow-hidden active:scale-[0.99] transition-transform ${
          permit.status === 'In Transit' 
            ? 'border-[#FFE0B2] bg-gradient-to-r from-white to-[#FFF9F0]' 
            : 'border-[#e6e3df]'
        }`}
        onClick={() => handlePermitClick(permit)}
        role="button"
        tabIndex={0}
      >
        {/* Row 1: Trip ID + Status Badge */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs text-[#9a9faa] tracking-wide tabular-nums">{permit.requestId}</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>

        {/* Row 2: Route — large & bold */}
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base text-[#0a0a0a] truncate">{permit.origin}</span>
            <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold text-base text-[#0a0a0a] truncate">{permit.destination}</span>
          </div>
        </div>

        {/* Row 3: Dates + Miles */}
        <div className="px-4 pb-3.5 flex items-center gap-3 text-sm text-[#6b7280]">
          <span className="tabular-nums">{formatDate(permit.effectiveDate)} — {formatDate(permit.expiryDate)}</span>
          {permit.routeDetails?.miles && (
            <>
              <span className="text-gray-300">•</span>
              <span className="tabular-nums">{permit.routeDetails.miles} mi</span>
            </>
          )}
        </div>

        {/* Driver Rating - Show for completed trips */}
        {permit.status === 'Completed' && permit.driverRating?.overallRating && (
          <div className="px-4 pb-3">
            <DriverRatingDisplay 
              rating={permit.driverRating.overallRating}
              source="Pilot Car"
              variant="card"
            />
          </div>
        )}

        {/* Row 4: Permit summary bar */}
        <div className="px-4 pb-2.5">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#9a9faa] uppercase tracking-wider text-[11px] font-medium">Permits</span>
            {approvedCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[#067647]">
                <CheckCircle className="w-3.5 h-3.5" />
                {approvedCount}
              </span>
            )}
            {pendingCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[#2563eb]">
                <Clock className="w-3.5 h-3.5" />
                {pendingCount}
              </span>
            )}
            {rejectedCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[#b42318]">
                <AlertCircle className="w-3.5 h-3.5" />
                {rejectedCount}
              </span>
            )}
          </div>
        </div>

        {/* Row 5: State chips (compact, expandable) */}
        <div className="px-4 pb-4">
          <div className={`flex gap-1.5 ${isStateBadgesExpanded ? 'flex-wrap' : 'overflow-x-auto'}`} style={{ scrollbarWidth: 'none' }}>
            {(isStateBadgesExpanded ? permit.states : permit.states.slice(0, showStatesCount)).map((state, idx) => {
              const style = getStateBadgeStyle(state.status);
              return (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-2 rounded text-[11px] font-medium shrink-0 border"
                  style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}
                >
                  {state.code}
                </span>
              );
            })}
            {permit.states.length > showStatesCount && !isStateBadgesExpanded && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedStateBadges({ ...expandedStateBadges, [permit.id]: true }); }}
                className="inline-flex items-center px-2 py-1 rounded text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200 shrink-0"
              >
                +{permit.states.length - showStatesCount}
              </button>
            )}
            {isStateBadgesExpanded && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedStateBadges({ ...expandedStateBadges, [permit.id]: false }); }}
                className="inline-flex items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200 shrink-0"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                Less
              </button>
            )}
          </div>
        </div>

        {/* Row 6: Actions */}
        <div className="border-t border-gray-100 pt-3 pb-4 px-4 space-y-2">
          <div className="flex items-center gap-2">
            {primaryCta && (
              <Button
                className={`flex-1 h-10 rounded-lg gap-1.5 text-sm font-medium ${primaryCta.style}`}
                onClick={primaryCta.onClick}
              >
                {primaryCta.icon}
                {primaryCta.label}
              </Button>
            )}
            <button
              className="h-10 px-3 rounded-lg shrink-0 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handlePermitClick(permit);
              }}
            >
              <span className="text-sm font-medium">Details</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          {permit.status === 'In Transit' && (
            <button
              className="w-full h-10 rounded-lg border border-[#DC2626] text-[#DC2626] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#FEF2F2] active:bg-[#FEE2E2] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setEndTripConfirmPermit(permit);
              }}
            >
              <Flag className="w-4 h-4" />
              End Trip
            </button>
          )}
        </div>
      </div>
    );
  };

  // If a trip was just ended, show the summary screen
  if (tripSummaryData) {
    return (
      <TripSummaryScreen
        trip={tripSummaryData.trip}
        jobs={ALL_MOCK_JOBS}
        startedAt={tripSummaryData.startedAt}
        endedAt={tripSummaryData.endedAt}
        onBack={() => setTripSummaryData(null)}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-[#f6f6f6] w-full overflow-hidden">

      {/* Top-level Tabs */}
      <div className="bg-white border-b border-[#e6e3df]">
        <div className="flex">
          {(['trips', 'jobs'] as const).map((tab) => {
            const isActive = mainView === tab;
            return (
              <button
                key={tab}
                onClick={() => setMainView(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors relative ${
                  isActive ? 'text-[#0066cc]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'trips' ? <FileText className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                {tab === 'trips' ? 'Trips' : 'Jobs'}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066cc] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trips View */}
      {mainView === 'trips' && (
        <>
          <div className="flex-1 overflow-y-auto">
            <Header 
              title="Manage Trips" 
              onNotificationClick={() => onNavigate && onNavigate('notifications')}
              onProfileClick={() => onNavigate && onNavigate('overview')}
              notificationCount={2}
            />
          <div className="px-4 pt-4 bg-white border-b border-[#e6e3df] sticky top-0 z-10">
            <div className="mb-2.5">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   type="text"
                   placeholder="Search ID, Driver, Origin and desti..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-9 h-10 bg-white border-gray-200 text-sm"
                 />
                 {searchQuery && (
                   <button
                     onClick={() => setSearchQuery('')}
                     className="absolute right-3 top-1/2 -translate-y-1/2"
                   >
                     <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                   </button>
                 )}
              </div>
            </div>

            {/* Tab Bar with Counts */}
            <div className="bg-white border-b border-gray-200">
              <div className="overflow-x-auto overflow-y-hidden px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
                <div className="flex gap-5 items-center relative min-w-max">
                  {(['Open', 'In Transit', 'Action Required', 'Completed'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    const count = tabCounts[tab];
                    const isActionRequired = tab === 'Action Required';
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center justify-center gap-1 py-2.5 shrink-0 transition-all relative ${
                          isActive
                            ? 'text-blue-600'
                            : isActionRequired
                            ? 'text-gray-700 hover:text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {isActionRequired && count > 0 && (
                          null
                        )}
                        <span className={`text-sm font-medium whitespace-nowrap`}>
                          {tab}
                        </span>
                        <span className={`text-xs tabular-nums ${
                          isActive
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}>
                          ({count})
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 pb-24">
            {filteredPermits.length > 0 ? (
              <>
                {filteredPermits.map(permit => (
                  <PermitItem key={permit.id} permit={permit} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                  <FileInput className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No trips available</h3>
                <p className="text-sm text-gray-500 max-w-[240px] mb-6">
                  {activeTab === 'Open' && 'Create or assign a trip to get started.'}
                  {activeTab === 'In Transit' && 'No active trips at the moment.'}
                  {activeTab === 'Action Required' && 'All caught up! No pending actions.'}
                  {activeTab === 'Completed' && 'No completed trips to display.'}
                </p>
                <Button onClick={() => setFabOpen(true)} variant="outline" className="border-dashed border-gray-300 text-gray-600 h-9">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Trip
                </Button>
              </div>
            )}
          </div>
          </div>


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
                 <Button className="w-full bg-[#F89823] hover:bg-[#e08820] text-[#1A1A1A]">Download All Available</Button>
                 <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                 </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Apply Permits Drawer */}
          <Drawer open={!!applyingPermit} onOpenChange={(open) => !open && setApplyingPermit(null)}>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Apply for Permits</DrawerTitle>
                <DrawerDescription>
                  This will submit permit applications for all required states in this trip.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-180px)]">
                {/* Trip Details Summary */}
                {applyingPermit && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Trip ID</p>
                      <p className="font-semibold text-gray-900">{applyingPermit.requestId}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Origin</p>
                        <p className="text-sm font-medium text-gray-900">{applyingPermit.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Destination</p>
                        <p className="text-sm font-medium text-gray-900">{applyingPermit.destination}</p>
                      </div>
                    </div>
                    
                  </div>
                )}

                {/* States to Apply */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">States Requiring Permits</p>
                  <div className="space-y-2 max-h-[20vh] overflow-y-auto">
                    {applyingPermit?.states
                      .filter(s => s.status === 'Not Applied')
                      .map(state => (
                        <div key={state.code} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded text-blue-600 font-bold w-10 text-center">
                              {state.code}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{STATE_NAMES[state.code] || state.code}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-gray-50">
                            Ready to Apply
                          </Badge>
                        </div>
                      ))}
                  </div>
                  {applyingPermit && applyingPermit.states.filter(s => s.status === 'Not Applied').length === 0 && (
                    <p className="text-center text-gray-500 py-4 text-sm">All permits have already been applied for.</p>
                  )}
                </div>

                {/* Info Banner */}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">What happens next?</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Once you confirm, permit applications will be submitted to the respective state authorities. 
                      You'll be able to track their status and make payments when requested.
                    </p>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button 
                  className="w-full bg-[#F89823] hover:bg-[#e08820] text-[#1A1A1A]"
                  onClick={() => {
                    if (applyingPermit) {
                      const updatedPermit = MOCK_PERMITS.find(p => p.id === applyingPermit.id);
                      if (updatedPermit) {
                        updatedPermit.states = updatedPermit.states.map(state => ({
                          ...state,
                          status: 'Pending' as const,
                        }));
                        setExpandedStates({ ...expandedStates });
                      }
                      setApplyingPermit(null);
                    }
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Apply Permits
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Rate Trip Drawer */}
          {rateTripTarget && (
            <PilotCarRatingDrawer
              open={!!rateTripTarget}
              onOpenChange={(open) => { if (!open) setRateTripTarget(null); }}
              tripId={rateTripTarget.permit.requestId}
              pilotCarId={rateTripTarget.pilotCarId}
              pilotCarName={rateTripTarget.pilotCarName}
              onSubmitSuccess={handleRateTripSuccess}
            />
          )}

          {/* End Trip Confirmation Dialog */}
          <Dialog open={!!endTripConfirmPermit} onOpenChange={(open) => !open && setEndTripConfirmPermit(null)}>
            <DialogContent className="max-w-[340px] rounded-2xl p-0 overflow-hidden gap-0">
              {/* Red accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#DC2626] to-[#EF4444]" />
              <DialogHeader className="px-5 pt-5 pb-0 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
                    <Flag className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <DialogTitle className="text-[17px] font-semibold text-[#0a0a0a] leading-snug">End Trip?</DialogTitle>
                </div>
                <DialogDescription className="text-sm text-gray-600 leading-relaxed pt-1">
                  Trip <span className="font-semibold text-[#0a0a0a]">{endTripConfirmPermit?.requestId}</span> will be marked as <span className="font-semibold text-[#DC2626]">Completed</span>. The following will happen immediately:
                </DialogDescription>
              </DialogHeader>

              <div className="px-5 py-4 space-y-2.5">
                {[
                  'All associated pilot car jobs will be closed',
                  'GPS tracking stops for you and all active pilot cars',
                  'Pilot car companies become eligible to generate invoices',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-snug">{item}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">This action cannot be undone.</p>
              </div>

              <DialogFooter className="px-5 pb-5 flex-col gap-2.5 sm:flex-col">
                <Button
                  className="w-full h-11 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-xl"
                  onClick={() => endTripConfirmPermit && handleEndTripConfirm(endTripConfirmPermit)}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Yes, End Trip
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl border-gray-200 text-gray-700 font-medium"
                  onClick={() => setEndTripConfirmPermit(null)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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

                   <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                      {filteredAutofillPermits.map(permit => (
                         <div 
                            key={permit.id}
                            onClick={() => setSelectedTemplateId(permit.id)}
                            className={`
                               p-3 rounded-lg border cursor-pointer transition-all
                               ${selectedTemplateId === permit.id 
                                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                                  : 'border-gray-200 bg-white hover:border-blue-300'}`}
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
        </>
      )}

      {/* Jobs View */}
      {mainView === 'jobs' && (
        <>
          <div className="flex-1 overflow-y-auto relative z-20 bg-[#f6f6f6] pt-6 px-4 pb-24">
            <div className="max-w-3xl mx-auto space-y-5">
              
              {/* Search and Filter - Figma Design */}
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#83838D]" />
                  <Input 
                    placeholder="Search ID, Driver, Origin and desti..." 
                    className="pl-10 bg-white border-[#e5e7eb] h-[45px] rounded-lg text-sm"
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>
                
                <Drawer>
                  <DrawerTrigger asChild>
                    <OutlineButton className="w-[45px] h-[45px] p-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path d={jobCardSvgPaths.p3cd66b80} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                      </svg>
                    </OutlineButton>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="max-w-3xl mx-auto w-full">
                      <DrawerHeader>
                        <DrawerTitle>Filter Jobs</DrawerTitle>
                        <DrawerDescription>
                          Narrow down the list of pilot car jobs.
                        </DrawerDescription>
                      </DrawerHeader>
                      
                      <div className="p-4 space-y-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-bold text-gray-900">Job Status</Label>
                          <RadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="status-all" />
                              <Label htmlFor="status-all" className="font-normal">All Statuses</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="open" id="status-open" />
                              <Label htmlFor="status-open" className="font-normal">Open</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="assigned" id="status-assigned" />
                              <Label htmlFor="status-assigned" className="font-normal">Assigned</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="completed" id="status-completed" />
                              <Label htmlFor="status-completed" className="font-normal">Completed</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="h-px bg-gray-100" />

                        <div className="space-y-3">
                          <Label className="text-sm font-bold text-gray-900">Vehicle Type</Label>
                          <RadioGroup value={vehicleFilter} onValueChange={setVehicleFilter}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="vehicle-all" />
                              <Label htmlFor="vehicle-all" className="font-normal">All Vehicles</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="high-pole" id="vehicle-hp" />
                              <Label htmlFor="vehicle-hp" className="font-normal">High Pole</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lead" id="vehicle-lead" />
                              <Label htmlFor="vehicle-lead" className="font-normal">Lead</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="chase" id="vehicle-chase" />
                              <Label htmlFor="vehicle-chase" className="font-normal">Chase</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <DrawerFooter className="flex-col sm:flex-col gap-2">
                        <DrawerClose asChild>
                          <Button className="w-full bg-[#0066cc] hover:bg-blue-700">Show {filteredStateJobs.length} Jobs</Button>
                        </DrawerClose>
                        <Button variant="ghost" onClick={resetJobFilters} className="w-full">
                          Reset Filters
                        </Button>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>

              {/* Tab Bar - Exact Figma Design */}
              <div className="bg-white p-[5px] rounded-[8px] relative">
                <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex gap-[8px] items-center relative">
                  <button
                    onClick={() => setJobTabFilter('all')}
                    className={`flex items-center justify-center h-[38.997px] shrink-0 flex-1 transition-all ${
                      jobTabFilter === 'all'
                        ? 'rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] px-[16px] py-[7px]'
                        : 'rounded-[8px] px-[13.108px] py-[7.108px] relative'
                    }`}
                    style={jobTabFilter === 'all' ? {
                      backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)"
                    } : undefined}
                  >
                    {jobTabFilter !== 'all' && (
                      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <p className={`font-medium leading-[16px] text-[14px] text-center whitespace-nowrap ${
                      jobTabFilter === 'all' ? 'text-white' : 'text-[#0a0a0a]'
                    }`}>
                      All
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setJobTabFilter('assigned')}
                    className={`flex items-center justify-center h-[38.997px] shrink-0 flex-1 transition-all ${
                      jobTabFilter === 'assigned'
                        ? 'rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] px-[16px] py-[7px]'
                        : 'rounded-[8px] px-[13.108px] py-[7.108px] relative'
                    }`}
                    style={jobTabFilter === 'assigned' ? {
                      backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)"
                    } : undefined}
                  >
                    {jobTabFilter !== 'assigned' && (
                      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <p className={`font-medium leading-[16px] text-[14px] text-center whitespace-nowrap ${
                      jobTabFilter === 'assigned' ? 'text-white' : 'text-[#0a0a0a]'
                    }`}>
                      Assigned
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setJobTabFilter('bidding')}
                    className={`flex items-center justify-center h-[38.997px] shrink-0 flex-1 transition-all ${
                      jobTabFilter === 'bidding'
                        ? 'rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] px-[16px] py-[7px]'
                        : 'rounded-[8px] px-[13.108px] py-[7.108px] relative'
                    }`}
                    style={jobTabFilter === 'bidding' ? {
                      backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)"
                    } : undefined}
                  >
                    {jobTabFilter !== 'bidding' && (
                      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <p className={`font-medium leading-[16px] text-[14px] text-center whitespace-nowrap ${
                      jobTabFilter === 'bidding' ? 'text-white' : 'text-[#0a0a0a]'
                    }`}>
                      Bidding
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setJobTabFilter('open')}
                    className={`flex items-center justify-center h-[38.997px] shrink-0 flex-1 transition-all ${
                      jobTabFilter === 'open'
                        ? 'rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] px-[16px] py-[7px]'
                        : 'rounded-[8px] px-[13.108px] py-[7.108px] relative'
                    }`}
                    style={jobTabFilter === 'open' ? {
                      backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)"
                    } : undefined}
                  >
                    {jobTabFilter !== 'open' && (
                      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <p className={`font-medium leading-[16px] text-[14px] text-center whitespace-nowrap ${
                      jobTabFilter === 'open' ? 'text-white' : 'text-[#0a0a0a]'
                    }`}>
                      Open
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setJobTabFilter('completed')}
                    className={`flex items-center justify-center h-[38.997px] shrink-0 flex-1 transition-all ${
                      jobTabFilter === 'completed'
                        ? 'rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] px-[16px] py-[7px]'
                        : 'rounded-[8px] px-[13.108px] py-[7.108px] relative'
                    }`}
                    style={jobTabFilter === 'completed' ? {
                      backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)"
                    } : undefined}
                  >
                    {jobTabFilter !== 'completed' && (
                      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <p className={`font-medium leading-[16px] text-[14px] text-center whitespace-nowrap ${
                      jobTabFilter === 'completed' ? 'text-white' : 'text-[#0a0a0a]'
                    }`}>
                      Completed
                    </p>
                  </button>
                </div>
              </div>

              {/* Job List - New State-Level Jobs */}
              {filteredStateJobs.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-gray-500">No jobs found matching your filters.</p>
                  <Button variant="link" onClick={resetJobFilters} className="text-[#0066cc]">
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <StateJobsList
                  jobs={filteredStateJobs}
                  onJobClick={(job) => {
                    // Find corresponding pilot job using pilotJobId
                    const oldFormatJob = MOCK_JOBS.find(j => j.id === job.pilotJobId);
                    if (oldFormatJob) {
                      handleOpenJob(oldFormatJob, 'details');
                    }
                  }}
                  onAssign={(job) => {
                    // Handle assignment logic
                    console.log('Assign job:', job);
                  }}
                  onEndBidding={(job) => {
                    // Handle end bidding logic
                    console.log('End bidding:', job);
                  }}
                />
              )}

              {/* Old Job List - Hidden but kept for reference */}
              <div className="hidden">
              <div className="space-y-4">
                 {filteredJobs.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-gray-200 shadow-sm">
                       <p className="text-gray-500">No jobs found matching your filters.</p>
                       <Button variant="link" onClick={resetJobFilters} className="text-[#0066cc]">
                         Clear all filters
                       </Button>
                    </div>
                 ) : (
                    filteredJobs.map(job => (
                       <div 
                         key={job.id} 
                         className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                         onClick={() => handleOpenJob(job, 'details')}
                       >
                          <div className="p-5">
                             <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                   <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{job.id}</span>
                                      <span>•</span>
                                      <span>Posted {job.postedDate}</span>
                                   </div>
                                   <h3 className="text-lg font-bold text-gray-900 flex items-center flex-wrap gap-2 group-hover:text-[#0066cc] transition-colors">
                                      {job.origin} 
                                      <ArrowRight className="h-4 w-4 text-gray-400" /> 
                                      {job.destination}
                                   </h3>
                                </div>
                                <Badge variant="secondary" className={`${
                                   job.status === 'Open' ? 'bg-[#E3F2FD] text-[#1E88E5] border-[#BBDEFB]' : 
                                   job.status === 'In Transit' ? 'bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]' : 
                                   job.status === 'Action Required' ? 'bg-[#FDECEA] text-[#C62828] border-[#EF9A9A]' :
                                   job.status === 'Completed' ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]' :
                                   job.status === 'Assigned' ? 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]' : 
                                   'bg-gray-100 text-gray-700'
                                } border px-3 py-1`}>
                                   {job.status}
                                </Badge>
                             </div>

                             <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 mb-4">
                                <div className="space-y-1">
                                   <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Pickup Date</span>
                                   <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                      <Calendar className="h-4 w-4 text-[#0066cc]" />
                                      {formatDate(job.pickupDate)}
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Required Vehicle</span>
                                   <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                      <Truck className="h-4 w-4 text-[#0066cc]" />
                                      {job.numberOfVehicles}x {job.vehicleType}
                                   </div>
                                </div>
                             </div>

                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                   <div className="bg-blue-50 p-1.5 rounded-full">
                                      <Users className="h-4 w-4 text-[#0066cc]" />
                                   </div>
                                   <span className="text-sm font-medium text-gray-700">
                                      {job.bids.length} {job.bids.length === 1 ? 'Bid' : 'Bids'} Received
                                   </span>
                                </div>
                                <Button 
                                   variant="outline" 
                                   size="sm" 
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     handleOpenJob(job, 'bids');
                                   }}
                                   className="border-[#0066cc] text-[#0066cc] hover:bg-blue-50"
                                >
                                   View Bids
                                </Button>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>
              </div>
            </div>
          </div>

          {/* Job FAB */}
          <Button 
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-[#0066cc] shadow-lg hover:bg-blue-700 z-50 flex items-center justify-center"
            onClick={() => onNavigate?.('add-job')}
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>

          {/* Job Details Drawer */}
          <Drawer open={!!activeJob} onOpenChange={(open) => {
            if (!open) {
              setActiveJob(null);
              setSelectedBidId(null);
            }
          }}>
             <DrawerContent>
                <div className="max-w-3xl mx-auto w-full max-h-[85vh] flex flex-col">
                  <DrawerHeader className="text-left flex-none">
                     <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                           {activeJob?.id}
                        </Badge>
                        <Badge variant="secondary" className={`${
                           activeJob?.status === 'Open' ? 'bg-[#E3F2FD] text-[#1E88E5] border-[#BBDEFB]' : 
                           activeJob?.status === 'Requested' ? 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]' :
                           activeJob?.status === 'In Transit' ? 'bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]' : 
                           activeJob?.status === 'Action Required' ? 'bg-[#FDECEA] text-[#C62828] border-[#EF9A9A]' :
                           activeJob?.status === 'Completed' ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]' :
                           activeJob?.status === 'Assigned' ? 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]' : 
                           'bg-gray-100'
                        } border`}>
                           {activeJob?.status}
                        </Badge>
                     </div>
                     <DrawerTitle className="text-xl">
                        {activeJob?.origin} to {activeJob?.destination}
                     </DrawerTitle>
                     <DrawerDescription>
                        {activeJob?.numberOfVehicles}x {activeJob?.vehicleType} required for {activeJob?.pickupDate ? formatDate(activeJob.pickupDate) : ''}
                     </DrawerDescription>
                  </DrawerHeader>

                  <div className="flex-1 overflow-y-auto px-4 pb-4">
                     <Tabs value={activeJobTab} onValueChange={setActiveJobTab} className="w-full">
                        <TabsList className={`w-full grid ${activeJob?.status === 'Completed' || activeJob?.bids?.find((b: any) => b.status === 'Accepted' && b.jobStatus === 'Completed') ? 'grid-cols-3' : 'grid-cols-2'} mb-6`}>
                           <TabsTrigger value="details">Job Details</TabsTrigger>
                           <TabsTrigger value="bids">
                              {activeJob?.jobSource === 'REQUESTED' ? 'Quotes' : 'Bids'} ({activeJob?.bids.length})
                           </TabsTrigger>
                           {(activeJob?.status === 'Completed' || activeJob?.bids?.find((b: any) => b.status === 'Accepted' && b.jobStatus === 'Completed')) && (
                              <TabsTrigger value="rating">Rating</TabsTrigger>
                           )}
                        </TabsList>

                        <TabsContent value="details" className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                           
                           {/* Route Information Banner */}
                           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-3">
                                 <MapPin className="w-5 h-5 text-blue-600" />
                                 <h3 className="font-semibold text-blue-900">Route Information</h3>
                              </div>
                              <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-2 flex-1">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0" />
                                    <div className="min-w-0">
                                       <p className="text-xs text-blue-700">From</p>
                                       <p className="font-semibold text-sm text-blue-900 truncate">
                                          {activeJob?.origin || "N/A"}
                                       </p>
                                    </div>
                                 </div>
                                 <Navigation className="w-4 h-4 text-blue-600 rotate-90 flex-shrink-0" />
                                 <div className="flex items-center gap-2 flex-1">
                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0" />
                                    <div className="min-w-0">
                                       <p className="text-xs text-blue-700">To</p>
                                       <p className="font-semibold text-sm text-blue-900 truncate">
                                          {activeJob?.destination || "N/A"}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Job Overview */}
                           <Collapsible open={jobDetailsSections.overview} onOpenChange={() => toggleJobDetailsSection("overview")}>
                              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                 <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                       <div className="flex items-center gap-3">
                                          <div className="p-2 rounded-lg bg-blue-100">
                                             <FileText className="w-5 h-5 text-blue-600" />
                                          </div>
                                          <div className="text-left">
                                             <h3 className="font-semibold text-gray-900">Job Overview</h3>
                                             <p className="text-xs text-gray-500">Basic job information</p>
                                          </div>
                                       </div>
                                       {jobDetailsSections.overview ? (
                                          <ChevronUp className="w-5 h-5 text-gray-400" />
                                       ) : (
                                          <ChevronDown className="w-5 h-5 text-gray-400" />
                                       )}
                                    </div>
                                 </CollapsibleTrigger>
                                 
                                 <CollapsibleContent>
                                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                                       <div className="grid grid-cols-2 gap-3 pt-4">
                                          <div>
                                             <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
                                             <p className="font-medium text-sm text-gray-900">
                                                {activeJob?.vehicleType || "N/A"}
                                             </p>
                                          </div>
                                          <div>
                                             <p className="text-xs text-gray-500 mb-1">Number Required</p>
                                             <div className="flex items-center gap-1.5">
                                                <Truck className="w-4 h-4 text-gray-400" />
                                                <p className="font-medium text-sm text-gray-900">
                                                   {activeJob?.numberOfVehicles || "N/A"}
                                                </p>
                                             </div>
                                          </div>
                                       </div>

                                       <div className="grid grid-cols-2 gap-3">
                                          <div>
                                             <p className="text-xs text-gray-500 mb-1">Pickup Date</p>
                                             <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <p className="font-medium text-sm text-gray-900">
                                                   {activeJob?.pickupDate ? formatDate(activeJob.pickupDate) : "N/A"}
                                                </p>
                                             </div>
                                          </div>
                                          {activeJob?.deliveryDate && (
                                             <div>
                                                <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
                                                <div className="flex items-center gap-1.5">
                                                   <Calendar className="w-4 h-4 text-gray-400" />
                                                   <p className="font-medium text-sm text-gray-900">
                                                      {formatDate(activeJob.deliveryDate)}
                                                   </p>
                                                </div>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </CollapsibleContent>
                              </div>
                           </Collapsible>

                           {/* Load Information */}
                           {(activeJob?.freightDesc || activeJob?.dims) && (
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
                                 <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-gray-600" />
                                    Load Information
                                 </h3>
                                 {activeJob?.freightDesc && (
                                    <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                                       <p className="text-xs text-gray-500 mb-1">Description</p>
                                       <p className="text-sm">{activeJob.freightDesc}</p>
                                    </div>
                                 )}
                                 {activeJob?.dims && (
                                    <div className="grid grid-cols-2 gap-3">
                                       {activeJob.dims.height && (
                                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                                             <p className="text-xs text-gray-500 mb-1">Height</p>
                                             <p className="font-medium text-sm">{activeJob.dims.height}</p>
                                          </div>
                                       )}
                                       {activeJob.dims.width && (
                                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                                             <p className="text-xs text-gray-500 mb-1">Width</p>
                                             <p className="font-medium text-sm">{activeJob.dims.width}</p>
                                          </div>
                                       )}
                                       {activeJob.dims.length && (
                                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                                             <p className="text-xs text-gray-500 mb-1">Length</p>
                                             <p className="font-medium text-sm">{activeJob.dims.length}</p>
                                          </div>
                                       )}
                                       {activeJob.dims.weight && (
                                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                                             <p className="text-xs text-gray-500 mb-1">Weight</p>
                                             <p className="font-medium text-sm">{activeJob.dims.weight}</p>
                                          </div>
                                       )}
                                    </div>
                                 )}
                              </div>
                           )}

                           {/* Break and Waiting Time Tracking (for In Transit jobs) */}
                           {activeJob?.status === 'In Transit' && (() => {
                              const acceptedBid = activeJob.bids.find((bid: any) => bid.status === 'Accepted');
                              const isJobActive = acceptedBid?.jobStatus === 'In Progress';
                              
                              if (!isJobActive) return null;
                              
                              return (
                                 <TimeTrackingSection
                                    breakTimeActive={breakTimeActive}
                                    setBreakTimeActive={setBreakTimeActive}
                                    breakStartTime={breakStartTime}
                                    setBreakStartTime={setBreakStartTime}
                                    totalBreakTime={totalBreakTime}
                                    setTotalBreakTime={setTotalBreakTime}
                                    waitingTimeActive={waitingTimeActive}
                                    setWaitingTimeActive={setWaitingTimeActive}
                                    waitingStartTime={waitingStartTime}
                                    setWaitingStartTime={setWaitingStartTime}
                                    totalWaitingTime={totalWaitingTime}
                                    setTotalWaitingTime={setTotalWaitingTime}
                                 />
                              );
                           })()}

                           {/* Time Tracking for accepted jobs */}
                           {(() => {
                              const acceptedBid = activeJob?.bids.find((bid: any) => bid.status === 'Accepted');
                              if (!acceptedBid || !acceptedBid.jobStatus) return null;
                              
                              const calculateElapsedTime = () => {
                                 if (!acceptedBid.startTime) return null;
                                 const start = new Date(acceptedBid.startTime);
                                 const end = acceptedBid.endTime ? new Date(acceptedBid.endTime) : new Date();
                                 const diffMs = end.getTime() - start.getTime();
                                 const hours = Math.floor(diffMs / (1000 * 60 * 60));
                                 const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                                 return { hours, minutes };
                              };

                              const elapsed = calculateElapsedTime();
                              
                              const getStatusColor = (status: string) => {
                                 switch(status) {
                                    case 'Not Started': return 'bg-gray-100 text-gray-700 border-gray-200';
                                    case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
                                    case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
                                    default: return 'bg-gray-100 text-gray-700 border-gray-200';
                                 }
                              };

                              return (
                                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                                       <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                             <div className="p-1.5 rounded-lg bg-indigo-600">
                                                <Clock className="w-4 h-4 text-white" />
                                             </div>
                                             <h3 className="font-semibold text-gray-900">Time Tracking</h3>
                                          </div>
                                          <Badge variant="outline" className={`${getStatusColor(acceptedBid.jobStatus)} text-xs font-semibold`}>
                                             {acceptedBid.jobStatus}
                                          </Badge>
                                       </div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                       <div className="grid grid-cols-2 gap-4">
                                          {acceptedBid.startTime && (
                                             <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                                                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Start Time</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                   {formatDateTime(acceptedBid.startTime)}
                                                </p>
                                             </div>
                                          )}
                                          
                                          {acceptedBid.endTime && (
                                             <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                                                <p className="text-xs text-gray-500 font-medium uppercase mb-1">End Time</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                   {formatDateTime(acceptedBid.endTime)}
                                                </p>
                                             </div>
                                          )}
                                          
                                          {acceptedBid.jobStatus === 'In Progress' && !acceptedBid.endTime && (
                                             <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                                                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Status</p>
                                                <div className="flex items-center gap-2">
                                                   <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                                   <p className="text-sm font-bold text-blue-700">Active Now</p>
                                                </div>
                                             </div>
                                          )}
                                       </div>

                                       {elapsed && (
                                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                             <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 font-medium">
                                                   {acceptedBid.jobStatus === 'Completed' ? 'Total Duration' : 'Elapsed Time'}
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                   {elapsed.hours}h {elapsed.minutes}m
                                                </span>
                                             </div>
                                          </div>
                                       )}

                                       {acceptedBid.jobStatus === 'Not Started' && (
                                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                                             <p className="text-sm text-gray-600">Job has not started yet</p>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              );
                           })()}

                           {/* Pricing */}
                           {activeJob?.price && (
                              <Collapsible open={jobDetailsSections.pricing} onOpenChange={() => toggleJobDetailsSection("pricing")}>
                                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <CollapsibleTrigger className="w-full">
                                       <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                          <div className="flex items-center gap-3">
                                             <div className="p-2 rounded-lg bg-emerald-100">
                                                <span className="text-lg font-semibold text-emerald-600">$</span>
                                             </div>
                                             <div className="text-left">
                                                <h3 className="font-semibold text-gray-900">Pricing</h3>
                                                <p className="text-xs text-gray-500">Rate and payment info</p>
                                             </div>
                                          </div>
                                          {jobDetailsSections.pricing ? (
                                             <ChevronUp className="w-5 h-5 text-gray-400" />
                                          ) : (
                                             <ChevronDown className="w-5 h-5 text-gray-400" />
                                          )}
                                       </div>
                                    </CollapsibleTrigger>
                                    
                                    <CollapsibleContent>
                                       <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
                                          <div>
                                             <p className="text-xs text-gray-500 mb-2">Pricing Type</p>
                                             <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                                <p className="font-semibold text-sm text-emerald-900">
                                                   {activeJob.price.type || "N/A"}
                                                </p>
                                             </div>
                                          </div>
                                          <div>
                                             <p className="text-xs text-gray-500 mb-1">Amount</p>
                                             <div className="flex items-center gap-2">
                                                <p className="font-semibold text-base text-gray-900">
                                                   ${activeJob.price.value}
                                                </p>
                                             </div>
                                          </div>
                                       </div>
                                    </CollapsibleContent>
                                 </div>
                              </Collapsible>
                           )}

                           {/* Notes */}
                           {activeJob?.notes && (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                 <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-5 h-5 text-amber-600" />
                                    <h3 className="font-semibold text-amber-900">Notes</h3>
                                 </div>
                                 <p className="text-sm text-amber-900">{activeJob.notes}</p>
                              </div>
                           )}

                        </TabsContent>

                        <TabsContent value="bids" className="space-y-3 animate-in slide-in-from-right-2 duration-300">
                           <BidsTabContent 
                             bids={activeJob?.bids || []}
                             selectedBidId={selectedBidId}
                             onSelectBid={(bidId) => setSelectedBidId(bidId)}
                             onAssignPilot={() => {
                               // Handle assignment logic
                               if (selectedBidId && activeJob) {
                                 const selectedBid = activeJob.bids.find(b => b.id === selectedBidId);
                                 if (selectedBid) {
                                   // Snapshot previous state for undo
                                   const prevJob = { ...activeJob };

                                   // Create new objects to trigger React re-renders properly
                                    const updatedBids = activeJob.bids.map(b =>
                                      b.id === selectedBidId
                                        ? { ...b, status: 'Accepted' as const }
                                        : b
                                    );
                                    const updatedJob = { ...activeJob, status: 'Assigned' as const, bids: updatedBids };
                                    setActiveJob(updatedJob);
                                   setSelectedBidId(null);
                                   showSnackbar(
                                     `Pilot car assigned successfully — ${selectedBid.companyName}`,
                                     'success',
                                     6000,
                                     'Undo',
                                     () => { setActiveJob(prevJob); },
                                   );
                                 }
                               }
                             }}
                             jobStatus={activeJob?.status || 'Open'}
                             biddingModel={activeJob?.jobSource === 'REQUESTED' ? 'INVITED_ONLY' : 'OPEN_MARKET'}
                             onRequestPilotCars={handleOpenSelectPilotCars}
                             onPostToAll={handlePostToAll}
                           />
                        </TabsContent>

                        <TabsContent value="rating" className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                           <RatingTabContent
                              jobRating={activeJob?.rating}
                              driverRating={activeJob?.driverRating}
                              acceptedBid={activeJob?.bids?.find((b: any) => b.status === 'Accepted')}
                              isCompleted={activeJob?.status === 'Completed' || activeJob?.bids?.find((b: any) => b.status === 'Accepted' && b.jobStatus === 'Completed')}
                           />
                        </TabsContent>
                     </Tabs>
                  </div>
                  
                  <DrawerFooter className="flex-none pt-2 border-t border-gray-100">
                      {/* Sticky Bottom Action Bar for Bids Tab */}
                      {activeJobTab === 'bids' && activeJob?.bids && activeJob.bids.some(b => b.status === 'Pending' && b.amount > 0) ? (
                        <div className="w-full bg-white border-t border-gray-200 shadow-lg">
                          {selectedBidId ? (
                            <>
                              {/* Selected State */}
                              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">Selected:</span>
                                  <span className="font-semibold text-gray-900">
                                    {activeJob.bids.find(b => b.id === selectedBidId)?.companyName} • ${activeJob.bids.find(b => b.id === selectedBidId)?.amount.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <Button 
                                  onClick={() => setConfirmAssignmentOpen(true)}
                                  className="w-full bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold"
                                >
                                  Accept Bid
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Default State */}
                              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                <p className="text-sm text-gray-500 text-center">
                                  Select a pilot car to continue
                                </p>
                              </div>
                              <div className="p-4">
                                <Button 
                                  disabled
                                  className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                                >
                                  Assign Pilot Car
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <JobDrawerFooter activeJob={activeJob} onAssign={handleAssignFromDrawer} onEndBidding={handleEndBiddingConfirm} onRequestPilotCars={handleOpenSelectPilotCars} onPostToAll={handlePostToAll} />
                      )}
                     <DrawerClose asChild>
                        <span className="hidden">placeholder</span>
                      </DrawerClose>
                      {activeJob?.status === 'Open' && (
                        <div className="flex items-center gap-2 w-full mt-0 hidden" ><DrawerClose><span className="hidden">_</span></DrawerClose></div>)}<DrawerClose className="hidden"><span className="hidden">__</span>{false && (<span>
                          {activeJob.bids.length > 0 && (
                            <Button onClick={handleAssignFromDrawer} className="flex-1 bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold">Review & Assign</Button>
                          )}
                          <Button variant="outline" onClick={() => setEndBiddingDialogOpen(true)} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">End Bidding</Button></span>)}</DrawerClose><DrawerClose className="hidden">{false && (<div>
                        </div>
                      )}
                     </DrawerClose>
                  </DrawerFooter>
                </div>
             </DrawerContent>
          </Drawer>

          {/* Bid Acceptance Confirmation Dialog */}
          <Dialog open={confirmAssignmentOpen} onOpenChange={setConfirmAssignmentOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Assignment</DialogTitle>
                <DialogDescription>
                  You are about to assign this job to the selected pilot car.
                </DialogDescription>
              </DialogHeader>
              
              {selectedBidId && activeJob && (() => {
                const selectedBid = activeJob.bids.find(b => b.id === selectedBidId);
                if (!selectedBid) return null;
                
                return (
                  <div className="space-y-4 py-4">
                    {/* Pilot Car Details */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-base text-gray-900 mb-2">{selectedBid.companyName}</h4>
                      {selectedBid.driverName && (
                        <p className="text-sm text-gray-600 mb-2">Driver: {selectedBid.driverName}</p>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                        <span className="text-sm text-gray-600">Total Amount</span>
                        <span className="font-bold text-xl text-blue-600">${selectedBid.amount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Job ID</span>
                          <span className="font-medium text-gray-900">{activeJob.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Route</span>
                          <span className="font-medium text-gray-900">{activeJob.origin} → {activeJob.destination}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Date</span>
                          <span className="font-medium text-gray-900">{formatDate(activeJob.pickupDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmAssignmentOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold"
                  onClick={() => {
                    if (activeJob && selectedBidId) {
                      const selectedBid = activeJob.bids.find(b => b.id === selectedBidId);
                      if (selectedBid) {
                        // Snapshot previous state for undo
                        const prevJob = { ...activeJob };

                        // Create new objects to trigger React re-renders properly
                        const updatedBids = activeJob.bids.map(b => 
                          b.id === selectedBidId 
                            ? { ...b, status: 'Accepted' as const }
                            : b
                        );
                        const updatedJob = { ...activeJob, status: 'Assigned' as const, bids: updatedBids };
                        setActiveJob(updatedJob);
                        setSelectedBidId(null);
                        setConfirmAssignmentOpen(false);
                        showSnackbar(
                          `Pilot car assigned successfully — ${selectedBid.companyName}`,
                          'success',
                          6000,
                          'Undo',
                          () => { setActiveJob(prevJob); },
                        );
                      }
                    }
                  }}
                >
                  Confirm & Assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Select Pilot Cars Modal (Request Specific Pilot Cars flow) */}
          <AvailablePilotCarsModal
            isOpen={selectPilotCarsOpen}
            onClose={() => {
              setSelectPilotCarsOpen(false);
              // If pilot cars were requested via the modal, show confirmation
              if (pendingRequestPCs.length > 0) {
                setConfirmRequestOpen(true);
              }
            }}
            pilotCars={MOCK_AVAILABLE_PILOT_CARS}
            jobId={activeJob?.id}
            allocationMode="all"
            onQuoteRequested={handleQuoteRequested}
          />

          {/* Quote Request Confirmation Dialog */}
          <Dialog open={confirmRequestOpen} onOpenChange={setConfirmRequestOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Quote Request?</DialogTitle>
                <DialogDescription>
                  You are requesting quotes from {pendingRequestPCs.length} selected pilot car{pendingRequestPCs.length !== 1 ? 's' : ''}.
                </DialogDescription>
              </DialogHeader>
              
              {pendingRequestPCs.length > 0 && (
                <div className="space-y-3 py-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Selected Pilot Cars</p>
                    <div className="space-y-2">
                      {pendingRequestPCs.map(pc => (
                        <div key={pc.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{pc.driver}</span>
                            <span className="text-gray-500 ml-1">— {pc.company}</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            {pc.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {activeJob && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="space-y-1.5 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Job</span>
                          <span className="font-medium text-gray-900">{activeJob.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Route</span>
                          <span className="font-medium text-gray-900">{activeJob.origin} → {activeJob.destination}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmRequestOpen(false);
                    setPendingRequestPCs([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold"
                  onClick={handleConfirmSendRequest}
                >
                  Send Request ({pendingRequestPCs.length})
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
