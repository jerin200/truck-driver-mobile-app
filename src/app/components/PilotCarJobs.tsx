import { useState, useMemo } from 'react';
import Header from './Header';
import { Search, Calendar, Truck, ArrowRight, Filter, FileText, Box, Map, Info, CheckCircle2, XCircle, AlertCircle, MapPin, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from './ui/drawer';
import { getStateCodes } from './us-states';

// User Role Types
type UserRole = 'pilot_car_operator' | 'pilot_car_company' | 'truck_driver';

interface PilotCarProfile {
  id: string;
  name: string;
  vehicleTypes: string[];
  jurisdictions: string[];
  certifications: string[];
  rating: number;
}

interface User {
  id: string;
  role: UserRole;
  name: string;
  pilotCars?: PilotCarProfile[]; // For companies, array of pilot cars; For operators, single element array
}

interface PilotJob {
  id: string;
  tripId: string;
  jobType: 'Route Survey' | 'Convoy';
  origin: string;
  destination: string;
  tripStartDate: string;
  tripEndDate: string;
  estimatedDistance?: string;
  requestedVehicleTypes: string[];
  numberOfVehicles: number;
  status: 'Open for Bidding' | 'In Progress' | 'Completed' | 'Cancelled';
  jurisdictions: string[];
  quoteRequestedTo: string[]; // Array of pilot car or company IDs
  eligibilityCriteria: {
    vehicleTypes: string[];
    jurisdictions: string[];
    certifications?: string[];
  };
  loadSummary: string;
  priceRange?: {
    min: number;
    max: number;
    type: 'Per Mile' | 'Flat Rate';
  };
  myBidStatus?: 'Not Bid' | 'Bid Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  postedDate: string;
  // Extended Details
  freightDesc: string;
  dims: {
    height: string;
    width: string;
    length: string;
    weight: string;
  };
  notes: string;
  complianceRequired?: string[];
  requestedPilotCars?: {
    id: string;
    company: string;
    driver: string;
    type: string;
    experience: number;
    rating: number;
    jurisdictions: string[];
    certifications: string[];
    totalTrips: number;
    requestedDate: string;
    quoteStatus: 'pending' | 'submitted';
    quoteAmount: number | null;
    quoteSubmittedDate: string | null;
    notes?: string;
  }[];
}

// Mock current user - Single Pilot Car Operator
const MOCK_CURRENT_USER: User = {
  id: 'PC-001',
  role: 'pilot_car_operator',
  name: 'John Smith',
  pilotCars: [
    {
      id: 'PC-001',
      name: 'John Smith Pilot Services',
      vehicleTypes: ['High Pole', 'Lead', 'Chase'],
      jurisdictions: ['NY', 'FL', 'GA', 'SC', 'NC', 'VA', 'TX'],
      certifications: ['DOT Certified', 'Oversize Load Certified'],
      rating: 4.8
    }
  ]
};

// Mock current user - Pilot Car Company (commented out for demo)
// const MOCK_CURRENT_USER: User = {
//   id: 'COMPANY-001',
//   role: 'pilot_car_company',
//   name: 'Elite Escort Services',
//   pilotCars: [
//     {
//       id: 'PC-101',
//       name: 'Driver 1 - High Pole Unit',
//       vehicleTypes: ['High Pole', 'Lead'],
//       jurisdictions: ['CA', 'NV', 'AZ', 'OR'],
//       certifications: ['DOT Certified', 'Oversize Load Certified'],
//       rating: 4.9
//     },
//     {
//       id: 'PC-102',
//       name: 'Driver 2 - Chase Unit',
//       vehicleTypes: ['Chase', 'Lead'],
//       jurisdictions: ['CA', 'NV', 'AZ'],
//       certifications: ['DOT Certified'],
//       rating: 4.7
//     }
//   ]
// };

const MOCK_JOBS: PilotJob[] = [
  {
    id: 'JOB-101',
    tripId: 'REQ-1001',
    jobType: 'Convoy',
    origin: 'New York, NY',
    destination: 'Miami, FL',
    tripStartDate: '2024-12-05',
    tripEndDate: '2024-12-08',
    estimatedDistance: '1,280 mi',
    requestedVehicleTypes: ['High Pole', 'Lead'],
    numberOfVehicles: 2,
    status: 'Open for Bidding',
    jurisdictions: ['NY', 'NJ', 'DE', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL'],
    quoteRequestedTo: ['PC-001', 'COMPANY-002', 'PC-005'], // This job was requested from our user
    eligibilityCriteria: {
      vehicleTypes: ['High Pole', 'Lead'],
      jurisdictions: ['NY', 'FL', 'GA', 'SC', 'NC', 'VA'],
      certifications: ['DOT Certified', 'Oversize Load Certified']
    },
    loadSummary: 'Industrial HVAC Unit - 14\'6" height, 45,000 lbs',
    priceRange: {
      min: 1800,
      max: 2500,
      type: 'Per Mile'
    },
    myBidStatus: 'Not Bid',
    postedDate: '2024-12-01',
    freightDesc: 'Industrial HVAC Unit - Oversized height requiring high pole clearance verification',
    dims: { height: '14\' 6"', width: '10\' 0"', length: '45\' 0"', weight: '45,000 lbs' },
    notes: 'Driver requires high pole for bridge clearance verification along I-95 corridor. Must maintain constant communication.',
    complianceRequired: ['DOT Certified', 'Oversize Load Certified']
  },
  {
    id: 'JOB-102',
    tripId: 'REQ-1002',
    jobType: 'Route Survey',
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    tripStartDate: '2024-12-10',
    tripEndDate: '2024-12-10',
    estimatedDistance: '382 mi',
    requestedVehicleTypes: ['Lead'],
    numberOfVehicles: 1,
    status: 'Open for Bidding',
    jurisdictions: ['CA'],
    quoteRequestedTo: ['COMPANY-001', 'PC-003'], // NOT requested from our user
    eligibilityCriteria: {
      vehicleTypes: ['Lead'],
      jurisdictions: ['CA'],
      certifications: ['DOT Certified']
    },
    loadSummary: 'Construction Machinery - 12\'0" height, 65,000 lbs',
    priceRange: {
      min: 800,
      max: 1200,
      type: 'Flat Rate'
    },
    myBidStatus: 'Not Bid',
    postedDate: '2024-12-03',
    freightDesc: 'Route survey for upcoming excavator transport through mountain passes',
    dims: { height: '12\' 0"', width: '12\' 6"', length: '30\' 0"', weight: '65,000 lbs' },
    notes: 'Pre-trip route survey required. Must document any potential clearance issues.',
    complianceRequired: ['DOT Certified']
  },
  {
    id: 'JOB-103',
    tripId: 'REQ-1003',
    jobType: 'Convoy',
    origin: 'Houston, TX',
    destination: 'Dallas, TX',
    tripStartDate: '2024-12-15',
    tripEndDate: '2024-12-15',
    estimatedDistance: '240 mi',
    requestedVehicleTypes: ['Chase'],
    numberOfVehicles: 1,
    status: 'Open for Bidding',
    jurisdictions: ['TX'],
    quoteRequestedTo: ['PC-001', 'PC-004', 'COMPANY-003'], // This job was requested from our user
    eligibilityCriteria: {
      vehicleTypes: ['Chase'],
      jurisdictions: ['TX'],
      certifications: []
    },
    loadSummary: 'Wind Turbine Blade - 120\'0" length, 35,000 lbs',
    priceRange: {
      min: 600,
      max: 900,
      type: 'Per Mile'
    },
    myBidStatus: 'Bid Submitted',
    postedDate: '2024-12-04',
    freightDesc: 'Wind Turbine Blade Section - Extra long load requiring chase vehicle',
    dims: { height: '13\' 6"', width: '8\' 6"', length: '120\' 0"', weight: '35,000 lbs' },
    notes: 'Long load, chase car must have extended radio range. Stay at least 300ft behind.',
    complianceRequired: []
  },
  {
    id: 'JOB-104',
    tripId: 'REQ-1004',
    jobType: 'Convoy',
    origin: 'Atlanta, GA',
    destination: 'Charlotte, NC',
    tripStartDate: '2024-12-20',
    tripEndDate: '2024-12-21',
    estimatedDistance: '245 mi',
    requestedVehicleTypes: ['Lead', 'Chase'],
    numberOfVehicles: 2,
    status: 'Open for Bidding',
    jurisdictions: ['GA', 'SC', 'NC'],
    quoteRequestedTo: ['PC-001', 'COMPANY-002'], // This job was requested from our user
    eligibilityCriteria: {
      vehicleTypes: ['Lead', 'Chase'],
      jurisdictions: ['GA', 'NC'],
      certifications: ['DOT Certified']
    },
    loadSummary: 'Modular Home Section - 16\'0" width, 52,000 lbs',
    priceRange: {
      min: 1200,
      max: 1800,
      type: 'Flat Rate'
    },
    myBidStatus: 'Not Bid',
    postedDate: '2024-12-06',
    freightDesc: 'Modular home section - Overwidth requiring lead and chase',
    dims: { height: '13\' 0"', width: '16\' 0"', length: '60\' 0"', weight: '52,000 lbs' },
    notes: 'Two pilot cars required - one lead and one chase. Must coordinate with state patrol.',
    complianceRequired: ['DOT Certified']
  },
  {
    id: 'JOB-105',
    tripId: 'REQ-1005',
    jobType: 'Route Survey',
    origin: 'Phoenix, AZ',
    destination: 'Las Vegas, NV',
    tripStartDate: '2024-12-12',
    tripEndDate: '2024-12-12',
    requestedVehicleTypes: ['High Pole'],
    numberOfVehicles: 1,
    status: 'In Progress', // Not "Open for Bidding" - should NOT appear
    jurisdictions: ['AZ', 'NV'],
    quoteRequestedTo: ['PC-001'],
    eligibilityCriteria: {
      vehicleTypes: ['High Pole'],
      jurisdictions: ['AZ', 'NV'],
      certifications: []
    },
    loadSummary: 'Pre-trip survey for upcoming transport',
    priceRange: {
      min: 500,
      max: 700,
      type: 'Flat Rate'
    },
    myBidStatus: 'Accepted',
    postedDate: '2024-11-28',
    freightDesc: 'Route survey for high-clearance load',
    dims: { height: '15\' 0"', width: '10\' 0"', length: '40\' 0"', weight: '38,000 lbs' },
    notes: 'Document all overhead clearances below 16 feet.',
    complianceRequired: [],
    requestedPilotCars: [
      {
        id: "PC-001",
        company: "Elite Escorts LLC",
        driver: "John Martinez",
        type: "Lead",
        experience: 15,
        rating: 5.0,
        jurisdictions: ["CA", "NV", "AZ", "OR"],
        certifications: ["DOT", "P/EVO"],
        totalTrips: 450,
        requestedDate: "2024-11-28",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
      {
        id: "PC-007",
        company: "Quick Response Pilots",
        driver: "Carlos Mendez",
        type: "Chase",
        experience: 9,
        rating: 4.7,
        jurisdictions: ["AZ", "NV", "UT"],
        certifications: ["DOT", "P/EVO"],
        totalTrips: 275,
        requestedDate: "2024-11-28",
        quoteStatus: "submitted",
        quoteAmount: 1250,
        quoteSubmittedDate: "2024-12-02",
        notes:
          "Available immediately. Can provide both lead and chase services if needed.",
      },
      {
        id: "PC-015",
        company: "Desert Escorts",
        driver: "Amanda Foster",
        type: "High Pole",
        experience: 7,
        rating: 4.8,
        jurisdictions: ["AZ", "NV", "CA"],
        certifications: ["DOT"],
        totalTrips: 180,
        requestedDate: "2024-11-29",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ]
  }
];

interface PilotCarJobsProps {
  onToggleSidebar?: () => void;
  onNavigate?: (screen: string) => void;
  currentUser?: User; // Allow passing user for testing
}

export default function PilotCarJobs({ onToggleSidebar, onNavigate, currentUser = MOCK_CURRENT_USER }: PilotCarJobsProps) {
  const [jobSearch, setJobSearch] = useState('');
  const [activeJob, setActiveJob] = useState<PilotJob | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  // Filters
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [bidStatusFilter, setBidStatusFilter] = useState('all');

  // Check if user is authorized (pilot car operator or company only)
  const isAuthorized = currentUser.role === 'pilot_car_operator' || currentUser.role === 'pilot_car_company';

  // Helper function to check if job is eligible for any of the user's pilot cars
  const isJobEligible = (job: PilotJob): boolean => {
    if (!currentUser.pilotCars) return false;

    return currentUser.pilotCars.some(pilotCar => {
      // Check if quote was requested for this pilot car (operator) or company
      const quoteRequested = job.quoteRequestedTo.includes(pilotCar.id) || 
                             job.quoteRequestedTo.includes(currentUser.id);
      
      if (!quoteRequested) return false;

      // Check vehicle type match
      const hasMatchingVehicle = job.eligibilityCriteria.vehicleTypes.some(reqType =>
        pilotCar.vehicleTypes.includes(reqType)
      );

      // Check jurisdiction coverage
      const hasJurisdictionCoverage = job.eligibilityCriteria.jurisdictions.some(reqJurisdiction =>
        pilotCar.jurisdictions.includes(reqJurisdiction)
      );

      // Check certifications (if required)
      const meetsCertifications = !job.eligibilityCriteria.certifications ||
        job.eligibilityCriteria.certifications.length === 0 ||
        job.eligibilityCriteria.certifications.every(reqCert =>
          pilotCar.certifications.includes(reqCert)
        );

      return hasMatchingVehicle && hasJurisdictionCoverage && meetsCertifications;
    });
  };

  // Get match details for display
  const getMatchDetails = (job: PilotJob) => {
    if (!currentUser.pilotCars) return { matched: [], missing: [] };

    const allVehicleTypes = new Set<string>();
    const allJurisdictions = new Set<string>();
    
    currentUser.pilotCars.forEach(pc => {
      pc.vehicleTypes.forEach(vt => allVehicleTypes.add(vt));
      pc.jurisdictions.forEach(j => allJurisdictions.add(j));
    });

    const matchedVehicles = job.requestedVehicleTypes.filter(vt => allVehicleTypes.has(vt));
    const matchedJurisdictions = job.jurisdictions.filter(j => allJurisdictions.has(j));

    return {
      matchedVehicles,
      matchedJurisdictions,
      hasMatch: matchedVehicles.length > 0 && matchedJurisdictions.length > 0
    };
  };

  // Filter jobs based on eligibility and status
  const eligibleJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      // Only show "Open for Bidding" jobs
      if (job.status !== 'Open for Bidding') return false;

      // Check eligibility
      return isJobEligible(job);
    });
  }, [currentUser]);

  // Apply search and filters
  const filteredJobs = eligibleJobs.filter(job => {
    const matchesSearch = 
      job.id.toLowerCase().includes(jobSearch.toLowerCase()) || 
      job.origin.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.destination.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.jobType.toLowerCase().includes(jobSearch.toLowerCase());
    
    const matchesJobType = jobTypeFilter === 'all' || job.jobType === jobTypeFilter;
    const matchesVehicle = vehicleFilter === 'all' || 
      job.requestedVehicleTypes.some(vt => vt.toLowerCase().replace(' ', '-') === vehicleFilter);
    const matchesBidStatus = bidStatusFilter === 'all' || 
      (job.myBidStatus || 'Not Bid').toLowerCase().replace(' ', '-') === bidStatusFilter;

    return matchesSearch && matchesJobType && matchesVehicle && matchesBidStatus;
  });

  const activeFiltersCount = 
    (jobTypeFilter !== 'all' ? 1 : 0) + 
    (vehicleFilter !== 'all' ? 1 : 0) +
    (bidStatusFilter !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setJobTypeFilter('all');
    setVehicleFilter('all');
    setBidStatusFilter('all');
  };

  const handleOpenJob = (job: PilotJob) => {
    setActiveJob(job);
    setActiveTab('details');
  };

  const handlePlaceBid = (job: PilotJob) => {
    // TODO: Navigate to bid placement screen or open bid modal
    console.log('Place bid for job:', job.id);
  };

  // Show unauthorized message if user is not pilot car operator/company
  if (!isAuthorized) {
    return (
      <div className="flex flex-col h-full bg-[#f6f6f6] w-full">
        <Header title="My Job Board" showMenuButton={true} onMenuClick={onToggleSidebar} />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">
              This page is only accessible to Pilot Car Operators and Pilot Car Companies.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f6f6f6] w-full">
       <Header title="My Job Board" showMenuButton={true} onMenuClick={onToggleSidebar} />

       <div className="flex-1 overflow-y-auto relative z-20 -mt-[20px] rounded-t-[20px] bg-[#f6f6f6] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-6 px-4 pb-24">
         
         <div className="max-w-3xl mx-auto space-y-4">
           
           {/* User Info Banner */}
           <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3">
             <div className="flex items-start gap-3">
               <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                 <Truck className="w-5 h-5" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold text-gray-900 text-sm">{currentUser.name}</h3>
                 <p className="text-xs text-gray-600">
                   {currentUser.role === 'pilot_car_company' 
                     ? `Company with ${currentUser.pilotCars?.length || 0} pilot cars`
                     : 'Pilot Car Operator'}
                 </p>
                 {currentUser.pilotCars && currentUser.pilotCars[0] && (
                   <div className="flex flex-wrap gap-1.5 mt-2">
                     {currentUser.pilotCars[0].vehicleTypes.map(vt => (
                       <Badge key={vt} variant="secondary" className="bg-white text-blue-700 text-xs px-2 py-0.5">
                         {vt}
                       </Badge>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           </div>

           {/* Actions */}
           <div className="flex gap-3">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <Input 
                   placeholder="Search job ID, route, type..." 
                   className="pl-9 bg-white border-gray-200 h-10 shadow-sm"
                   value={jobSearch}
                   onChange={(e) => setJobSearch(e.target.value)}
                 />
              </div>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline"
                    className={`bg-white border-gray-200 h-10 px-3 shadow-sm relative ${activeFiltersCount > 0 ? 'text-[#0066cc] border-blue-200 bg-blue-50' : ''}`}
                  >
                     <Filter className="h-4 w-4 text-gray-500 mr-2" />
                     Filter
                     {activeFiltersCount > 0 && (
                       <span className="ml-2 bg-[#0066cc] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                         {activeFiltersCount}
                       </span>
                     )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="max-w-3xl mx-auto w-full">
                    <DrawerHeader>
                      <DrawerTitle>Filter Jobs</DrawerTitle>
                      <DrawerDescription>
                        Narrow down available jobs based on your preferences.
                      </DrawerDescription>
                    </DrawerHeader>
                    
                    <div className="p-4 space-y-6">
                      {/* Job Type Filter */}
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-900">Job Type</Label>
                        <RadioGroup value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="jobtype-all" />
                            <Label htmlFor="jobtype-all" className="font-normal">All Types</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Convoy" id="jobtype-convoy" />
                            <Label htmlFor="jobtype-convoy" className="font-normal">Convoy</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Route Survey" id="jobtype-survey" />
                            <Label htmlFor="jobtype-survey" className="font-normal">Route Survey</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="h-px bg-gray-100" />

                      {/* Vehicle Type Filter */}
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

                      <div className="h-px bg-gray-100" />

                      {/* Bid Status Filter */}
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-900">My Bid Status</Label>
                        <RadioGroup value={bidStatusFilter} onValueChange={setBidStatusFilter}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="bid-all" />
                            <Label htmlFor="bid-all" className="font-normal">All Jobs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-bid" id="bid-notbid" />
                            <Label htmlFor="bid-notbid" className="font-normal">Not Yet Bid</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bid-submitted" id="bid-submitted" />
                            <Label htmlFor="bid-submitted" className="font-normal">Bid Submitted</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <DrawerFooter className="flex-col sm:flex-col gap-2">
                      <DrawerClose asChild>
                        <Button className="w-full bg-[#0066cc] hover:bg-blue-700">Show {filteredJobs.length} Jobs</Button>
                      </DrawerClose>
                      <Button variant="ghost" onClick={resetFilters} className="w-full">
                        Reset Filters
                      </Button>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
           </div>

           {/* Job Stats */}
           <div className="grid grid-cols-3 gap-3">
             <div className="bg-white rounded-lg border border-gray-200 p-2.5 text-center">
               <div className="text-xl font-bold text-[#0066cc]">{eligibleJobs.length}</div>
               <div className="text-xs text-gray-500">Available</div>
             </div>
             <div className="bg-white rounded-lg border border-gray-200 p-2.5 text-center">
               <div className="text-xl font-bold text-green-600">
                 {eligibleJobs.filter(j => j.myBidStatus === 'Not Bid').length}
               </div>
               <div className="text-xs text-gray-500">Not Bid</div>
             </div>
             <div className="bg-white rounded-lg border border-gray-200 p-2.5 text-center">
               <div className="text-xl font-bold text-amber-600">
                 {eligibleJobs.filter(j => j.myBidStatus === 'Bid Submitted' || j.myBidStatus === 'Under Review').length}
               </div>
               <div className="text-xs text-gray-500">Pending</div>
             </div>
           </div>

           {/* Job List */}
           <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                 <div className="text-center py-10 bg-white rounded-xl border border-gray-200 shadow-sm">
                    {eligibleJobs.length === 0 ? (
                      <>
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium mb-1">No Available Jobs</p>
                        <p className="text-sm text-gray-500">
                          No jobs match your qualifications or have been requested for you.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500">No jobs found matching your filters.</p>
                        <Button variant="link" onClick={resetFilters} className="text-[#0066cc]">
                          Clear all filters
                        </Button>
                      </>
                    )}
                 </div>
              ) : (
                 filteredJobs.map(job => {
                    const matchDetails = getMatchDetails(job);
                    
                    return (
                      <div 
                        key={job.id} 
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => handleOpenJob(job)}
                      >
                         <div className="p-5">
                            {/* Top Row: Job ID, Type & Bid Status */}
                            <div className="flex justify-between items-start mb-3">
                               <div className="flex items-center gap-2 text-xs">
                                  <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{job.id}</span>
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    {job.jobType}
                                  </Badge>
                               </div>
                               <Badge 
                                 variant="secondary" 
                                 className={`${
                                   job.myBidStatus === 'Not Bid' ? 'bg-green-100 text-green-700' : 
                                   job.myBidStatus === 'Bid Submitted' ? 'bg-amber-100 text-amber-700' :
                                   job.myBidStatus === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                                   job.myBidStatus === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                                   'bg-gray-100 text-gray-700'
                                 } border-0 px-3 py-1 text-xs`}
                               >
                                  {job.myBidStatus === 'Not Bid' ? '✓ Available' : job.myBidStatus}
                               </Badge>
                            </div>

                            {/* Route */}
                            <h3 className="font-bold text-gray-900 flex items-center flex-wrap gap-2 mb-3 group-hover:text-[#0066cc] transition-colors">
                               {job.origin} 
                               <ArrowRight className="h-4 w-4 text-gray-400" /> 
                               {job.destination}
                            </h3>

                            {/* Load Summary */}
                            <p className="text-sm text-gray-600 mb-4">{job.loadSummary}</p>

                            {/* Key Details Grid - 2 columns instead of 3, removed Distance */}
                            <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-gray-100 mb-4">
                               <div className="space-y-1">
                                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Trip Dates</span>
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                     <Calendar className="h-3.5 w-3.5 text-[#0066cc] flex-shrink-0" />
                                     <span className="truncate">
                                       {job.tripStartDate === job.tripEndDate 
                                         ? job.tripStartDate 
                                         : `${job.tripStartDate} - ${job.tripEndDate}`}
                                     </span>
                                  </div>
                               </div>
                               <div className="space-y-1">
                                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Required</span>
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                     <Truck className="h-3.5 w-3.5 text-[#0066cc] flex-shrink-0" />
                                     <span className="truncate">
                                       {job.numberOfVehicles}x {job.requestedVehicleTypes[0]}{job.requestedVehicleTypes.length > 1 ? ` +${job.requestedVehicleTypes.length - 1}` : ''}
                                     </span>
                                  </div>
                               </div>
                            </div>

                            {/* Match Indicators & Price */}
                            <div className="space-y-3">
                              {/* Eligibility Badges */}
                              <div className="flex flex-wrap gap-2">
                                {matchDetails.hasMatch && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Qualified
                                  </Badge>
                                )}
                                {job.complianceRequired && job.complianceRequired.length > 0 && (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {job.complianceRequired.length} cert{job.complianceRequired.length > 1 ? 's' : ''} required
                                  </Badge>
                                )}
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {getStateCodes(job.jurisdictions).join(', ')}
                                </Badge>
                              </div>

                              {/* Price & Action */}
                              <div className="flex items-center justify-between">
                                 {job.priceRange ? (
                                   <div className="text-sm">
                                     <span className="text-gray-500">Est. </span>
                                     <span className="font-bold text-green-700">
                                       ${job.priceRange.min.toLocaleString()} - ${job.priceRange.max.toLocaleString()}
                                     </span>
                                     <span className="text-xs text-gray-500 ml-1">({job.priceRange.type})</span>
                                   </div>
                                 ) : (
                                   <span className="text-sm text-gray-500">Price TBD</span>
                                 )}
                                 
                                 <Button 
                                    variant={job.myBidStatus === 'Not Bid' ? 'default' : 'outline'}
                                    size="sm" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePlaceBid(job);
                                    }}
                                    className={job.myBidStatus === 'Not Bid' 
                                      ? 'bg-[#0066cc] text-white hover:bg-blue-700'
                                      : 'border-[#0066cc] text-[#0066cc] hover:bg-blue-50'}
                                    disabled={job.myBidStatus === 'Bid Submitted' || job.myBidStatus === 'Under Review'}
                                 >
                                    {job.myBidStatus === 'Not Bid' ? 'Place Bid' :
                                     job.myBidStatus === 'Bid Submitted' ? 'Bid Pending' :
                                     job.myBidStatus === 'Under Review' ? 'Under Review' :
                                     'View Bid'}
                                 </Button>
                              </div>
                            </div>
                         </div>
                      </div>
                    );
                 })
              )}
           </div>
         </div>
       </div>

       {/* Job Details Drawer */}
       <Drawer open={!!activeJob} onOpenChange={(open) => !open && setActiveJob(null)}>
          <DrawerContent>
             <div className="max-w-3xl mx-auto w-full max-h-[85vh] flex flex-col">
               <DrawerHeader className="text-left flex-none">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                       <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          {activeJob?.id}
                       </Badge>
                       <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                         {activeJob?.jobType}
                       </Badge>
                     </div>
                     <Badge 
                       variant="secondary" 
                       className={`${
                         activeJob?.myBidStatus === 'Not Bid' ? 'bg-green-100 text-green-700' : 
                         activeJob?.myBidStatus === 'Bid Submitted' ? 'bg-amber-100 text-amber-700' :
                         'bg-blue-100 text-blue-700'
                       }`}
                     >
                        {activeJob?.myBidStatus === 'Not Bid' ? 'Available' : activeJob?.myBidStatus}
                     </Badge>
                  </div>
                  <DrawerTitle className="text-xl">
                     {activeJob?.origin} to {activeJob?.destination}
                  </DrawerTitle>
                  <DrawerDescription>
                     {activeJob?.numberOfVehicles}x {activeJob?.requestedVehicleTypes.join(', ')} • {activeJob?.tripStartDate}
                     {activeJob?.tripEndDate && activeJob.tripEndDate !== activeJob.tripStartDate && ` - ${activeJob.tripEndDate}`}
                  </DrawerDescription>
               </DrawerHeader>

               <div className="flex-1 overflow-y-auto px-4 pb-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                     <TabsList className="w-full grid grid-cols-2 mb-6">
                        <TabsTrigger value="details">Job Details</TabsTrigger>
                        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                     </TabsList>

                     <TabsContent value="details" className="space-y-6 animate-in slide-in-from-left-2 duration-300">
                        
                        {/* Load Summary */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <h4 className="text-sm font-bold text-blue-900 mb-2">Load Summary</h4>
                          <p className="text-blue-800">{activeJob?.loadSummary}</p>
                        </div>

                        {/* Route Info */}
                        <div className="space-y-3">
                           <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Map className="w-4 h-4 text-[#0066cc]" /> Route Information
                           </h4>
                           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                              <div className="flex gap-3">
                                 <div className="flex flex-col items-center gap-1 mt-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <div className="w-0.5 h-8 bg-gray-200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                 </div>
                                 <div className="flex-1 space-y-4">
                                    <div>
                                       <p className="text-xs text-gray-500 font-medium">ORIGIN</p>
                                       <p className="font-medium text-gray-900">{activeJob?.origin}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-gray-500 font-medium">DESTINATION</p>
                                       <p className="font-medium text-gray-900">{activeJob?.destination}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500 font-medium mb-2">JURISDICTIONS</p>
                                <div className="flex flex-wrap gap-1">
                                  {activeJob?.jurisdictions.map(j => (
                                    <Badge key={j} variant="secondary" className="bg-white text-gray-700 text-xs">
                                      {j}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                           </div>
                        </div>

                        {/* Freight Info */}
                        <div className="space-y-3">
                           <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Box className="w-4 h-4 text-[#0066cc]" /> Freight & Dimensions
                           </h4>
                           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                              <div className="mb-4">
                                 <p className="text-xs text-gray-500 font-medium uppercase mb-1">Description</p>
                                 <p className="text-gray-900">{activeJob?.freightDesc}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Height</p>
                                    <p className="font-medium">{activeJob?.dims.height}</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Width</p>
                                    <p className="font-medium">{activeJob?.dims.width}</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Length</p>
                                    <p className="font-medium">{activeJob?.dims.length}</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Weight</p>
                                    <p className="font-medium">{activeJob?.dims.weight}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                 Estimated Pricing
                              </h4>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                 {activeJob?.priceRange ? (
                                   <div>
                                     <div className="flex justify-between items-center mb-1">
                                       <span className="text-sm text-green-700">Range</span>
                                       <span className="font-bold text-green-800">
                                         ${activeJob.priceRange.min.toLocaleString()} - ${activeJob.priceRange.max.toLocaleString()}
                                       </span>
                                     </div>
                                     <p className="text-xs text-green-600">{activeJob.priceRange.type}</p>
                                   </div>
                                 ) : (
                                   <p className="text-sm text-green-700">Price to be determined</p>
                                 )}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                 <Info className="w-4 h-4 text-[#0066cc]" /> Special Notes
                              </h4>
                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-900">
                                 {activeJob?.notes}
                              </div>
                           </div>
                        </div>

                     </TabsContent>

                     <TabsContent value="eligibility" className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                        
                        {/* Eligibility Overview */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-green-900 mb-1">You're Qualified!</h4>
                              <p className="text-sm text-green-700">
                                You meet the requirements for this job based on your registered pilot car profile.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Required Vehicle Types */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#0066cc]" /> Required Vehicle Types
                          </h4>
                          <div className="bg-white p-4 rounded-xl border border-gray-200">
                            <div className="space-y-2">
                              {activeJob?.eligibilityCriteria.vehicleTypes.map(vt => {
                                const hasType = currentUser.pilotCars?.some(pc => pc.vehicleTypes.includes(vt));
                                return (
                                  <div key={vt} className="flex items-center justify-between">
                                    <span className="text-gray-900">{vt}</span>
                                    {hasType ? (
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> You have this
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                        <XCircle className="w-3 h-3 mr-1" /> Not available
                                      </Badge>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Jurisdiction Coverage */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#0066cc]" /> Jurisdiction Coverage
                          </h4>
                          <div className="bg-white p-4 rounded-xl border border-gray-200">
                            <div className="flex flex-wrap gap-2">
                              {activeJob?.eligibilityCriteria.jurisdictions.map(j => {
                                const hasJurisdiction = currentUser.pilotCars?.some(pc => pc.jurisdictions.includes(j));
                                return (
                                  <Badge 
                                    key={j} 
                                    variant="outline" 
                                    className={hasJurisdiction 
                                      ? 'bg-green-50 text-green-700 border-green-200' 
                                      : 'bg-gray-50 text-gray-500 border-gray-200'}
                                  >
                                    {j} {hasJurisdiction ? '✓' : ''}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Compliance Requirements */}
                        {activeJob?.complianceRequired && activeJob.complianceRequired.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#0066cc]" /> Compliance & Certifications
                            </h4>
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                              <div className="space-y-2">
                                {activeJob.complianceRequired.map(cert => {
                                  const hasCert = currentUser.pilotCars?.some(pc => pc.certifications.includes(cert));
                                  return (
                                    <div key={cert} className="flex items-center justify-between">
                                      <span className="text-gray-900 text-sm">{cert}</span>
                                      {hasCert ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                          <CheckCircle2 className="w-3 h-3 mr-1" /> Certified
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                          <AlertCircle className="w-3 h-3 mr-1" /> Required
                                        </Badge>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Trip Timeline */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#0066cc]" /> Trip Timeline
                          </h4>
                          <div className="bg-white p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Start Date</span>
                              <span className="font-medium text-gray-900">{activeJob?.tripStartDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">End Date</span>
                              <span className="font-medium text-gray-900">{activeJob?.tripEndDate}</span>
                            </div>
                          </div>
                        </div>

                     </TabsContent>
                  </Tabs>
               </div>
               
               <DrawerFooter className="flex-none pt-2 border-t border-gray-200">
                  <Button 
                    className="w-full bg-[#0066cc] hover:bg-blue-700 h-12"
                    disabled={activeJob?.myBidStatus === 'Bid Submitted' || activeJob?.myBidStatus === 'Under Review'}
                    onClick={() => activeJob && handlePlaceBid(activeJob)}
                  >
                    {activeJob?.myBidStatus === 'Not Bid' ? 'Place Bid for This Job' :
                     activeJob?.myBidStatus === 'Bid Submitted' ? 'Bid Already Submitted' :
                     activeJob?.myBidStatus === 'Under Review' ? 'Bid Under Review' :
                     'View Your Bid'}
                  </Button>
                  <DrawerClose asChild>
                     <Button variant="ghost" className="w-full">Close</Button>
                  </DrawerClose>
               </DrawerFooter>
             </div>
          </DrawerContent>
       </Drawer>
    </div>
  );
}