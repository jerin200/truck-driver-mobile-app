import { useState } from "react";
import { formatDate, formatDateTime, formatTime24h } from '../utils/dateFormat';
import {
  X,
  MapPin,
  Calendar,
  Truck,
  Package,
  Navigation,
  User,
  Clock,
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Phone,
  AlertCircle,
  Mail,
  Star,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface JobDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
}

type JobTab = "details" | "bids";

const MOCK_BIDS = [
  {
    id: 1,
    pcCompany: "Elite Pilot Cars LLC",
    driverName: "John Martinez",
    rating: 4.8,
    totalTrips: 156,
    bidAmount: "$2,300",
    estimatedTime: "13.5 hrs",
    status: "Pending",
    submittedDate: "2024-12-14",
    certifications: ["Front PC", "Rear PC", "Oversize Load"],
    experience: "8 years",
  },
  {
    id: 2,
    pcCompany: "SafeRoute Pilot Cars",
    driverName: "Sarah Johnson",
    rating: 4.9,
    totalTrips: 203,
    bidAmount: "$2,450",
    estimatedTime: "14 hrs",
    status: "Accepted",
    submittedDate: "2024-12-13",
    certifications: ["Front PC", "Rear PC", "Wide Load"],
    experience: "10 years",
    jobStatus: "In Progress",
    startTime: "2024-12-15T09:30:00",
    contactPerson: "Sarah Johnson",
    contactPhone: "(555) 987-6543",
    contactEmail: "sarah@saferoute.com",
  },
  {
    id: 3,
    pcCompany: "Highway Guardians",
    driverName: "Mike Thompson",
    rating: 4.7,
    totalTrips: 98,
    bidAmount: "$2,100",
    estimatedTime: "14.5 hrs",
    status: "Rejected",
    submittedDate: "2024-12-12",
    certifications: ["Front PC", "Oversize Load"],
    experience: "5 years",
  },
  {
    id: 4,
    pcCompany: "Premier Escorts Inc",
    driverName: "Tom Anderson",
    rating: 4.9,
    totalTrips: 178,
    bidAmount: "$2,250",
    estimatedTime: "13 hrs",
    status: "Accepted",
    submittedDate: "2024-12-11",
    certifications: ["Front PC", "Rear PC", "Wide Load", "Height Pole"],
    experience: "12 years",
    jobStatus: "Completed",
    startTime: "2024-12-14T07:00:00",
    endTime: "2024-12-14T16:30:00",
    contactPerson: "Tom Anderson",
    contactPhone: "(555) 123-4567",
    contactEmail: "tom@premierescorts.com",
    completionDetails: {
      breaks: [
        {
          reason: "Fuel Break",
          startTime: "2024-12-14T10:00:00",
          endTime: "2024-12-14T10:20:00",
          duration: 20,
          notes: "Fuel stop at TA Travel Center"
        },
        {
          reason: "Lunch Break",
          startTime: "2024-12-14T13:00:00",
          endTime: "2024-12-14T13:45:00",
          duration: 45,
          notes: "Rest area - required DOT break"
        }
      ],
      layovers: [],
      incidents: [],
      waitingPeriods: [
        {
          reason: "Customer Delay",
          startTime: "2024-12-14T07:00:00",
          endTime: "2024-12-14T07:45:00",
          duration: 45
        }
      ],
      totalDrivingTime: 480,
      totalBreakTime: 65,
      totalLayoverTime: 0,
      totalWaitingTime: 45,
      fuelStops: 1,
      notes: "Excellent trip. Customer was very satisfied. All route clearances checked and documented. No issues encountered."
    }
  },
];

export default function JobDetailsDrawer({
  isOpen,
  onClose,
  job,
}: JobDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<JobTab>("details");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    requirements: true,
    schedule: true,
    location: false,
    pricing: false,
    extras: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!isOpen || !job) return null;

  const pilotCarInfo = job.pilotCarJobInfo || {};
  const loadInfo = job.loadInfo || {};
  
  // Use job bids if available, otherwise fall back to mock data for backward compatibility
  const bids = job.bids || MOCK_BIDS;

  // Helper to format job type display
  const formatJobType = (jobType: string) => {
    if (!jobType) return "N/A";
    const types = jobType.split(',').map(t => t.trim());
    return types.map(t => t === 'survey' ? 'Survey' : t === 'convoy' ? 'Convoy' : t).join(', ');
  };

  // Helper to get pilot car types
  const getSelectedPilotCarTypes = () => {
    if (!pilotCarInfo.pilotCarTypes) return [];
    return Object.entries(pilotCarInfo.pilotCarTypes)
      .filter(([key, value]: [string, any]) => value.selected)
      .map(([key, value]: [string, any]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        count: value.count || 1
      }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[700px] bg-gray-50 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${\n          isOpen ? "translate-x-0" : "translate-x-full"\n        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                  aria-label="Close drawer"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {job.title || "Job Details"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {job.jobNumber || `Posted ${formatDate(job.createdDate || job.postedDate)}`}
                  </p>
                </div>
              </div>
              <div className="bg-green-100 px-3 py-1.5 rounded-lg">
                <p className="font-medium text-sm text-green-700">
                  {job.status}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-5">
              <div className="flex gap-1 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                    activeTab === "details"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("bids")}
                  className={`px-4 py-3 font-medium text-sm border-b-2 transition-all relative ${
                    activeTab === "bids"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Bids
                  <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    {bids.length}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ height: 'calc(100vh - 240px)' }}>
            {activeTab === "details" && (
              <div className="p-5 space-y-4 pb-32">{/* Increased bottom padding */}
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
                          {job.origin || pilotCarInfo.meetingLocation || "N/A"}
                        </p>
                      </div>
                    </div>
                    <Navigation className="w-4 h-4 text-blue-600 rotate-90 flex-shrink-0" />
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-blue-700">To</p>
                        <p className="font-semibold text-sm text-blue-900 truncate">
                          {job.destination || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {pilotCarInfo.jurisdiction && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-blue-700 mb-1">Jurisdiction</p>
                      <p className="font-medium text-sm text-blue-900">{pilotCarInfo.jurisdiction}</p>
                    </div>
                  )}
                </div>

                {/* Job Overview */}
                <Collapsible open={openSections.overview} onOpenChange={() => toggleSection("overview")}>
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
                        {openSections.overview ? (
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
                            <p className="text-xs text-gray-500 mb-1">Job Type</p>
                            <p className="font-medium text-sm text-gray-900">
                              {formatJobType(pilotCarInfo.jobType || job.jobType || "N/A")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Posted Date</p>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <p className="font-medium text-sm text-gray-900">
                                {formatDate(job.createdDate || job.postedDate)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2">Load Dimensions</p>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-600" />
                            <p className="font-medium text-sm text-gray-900">
                              {loadInfo.length || '-'} x {loadInfo.width || '-'} x {loadInfo.height || '-'}
                            </p>
                          </div>
                        </div>

                        {(pilotCarInfo.startDistance || pilotCarInfo.endDistance) && (
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Distance Range</p>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.startDistance || "0"} - {pilotCarInfo.endDistance || "N/A"} {pilotCarInfo.distanceUnit || "km"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Pilot Car Requirements */}
                <Collapsible open={openSections.requirements} onOpenChange={() => toggleSection("requirements")}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">Requirements</h3>
                            <p className="text-xs text-gray-500">Certifications & vehicle specs</p>
                          </div>
                        </div>
                        {openSections.requirements ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
                        {pilotCarInfo.escortPositions && pilotCarInfo.escortPositions.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Escort Positions & Counts</p>
                            <div className="space-y-2">
                              {pilotCarInfo.frontPilotCars && parseInt(pilotCarInfo.frontPilotCars) > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <span className="text-sm font-medium text-blue-900">Front Pilot Cars</span>
                                  <span className="text-base font-semibold text-blue-700">{pilotCarInfo.frontPilotCars}</span>
                                </div>
                              )}
                              {pilotCarInfo.rearPilotCars && parseInt(pilotCarInfo.rearPilotCars) > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <span className="text-sm font-medium text-blue-900">Rear Pilot Cars</span>
                                  <span className="text-base font-semibold text-blue-700">{pilotCarInfo.rearPilotCars}</span>
                                </div>
                              )}
                              {pilotCarInfo.highPoleCars && parseInt(pilotCarInfo.highPoleCars) > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <span className="text-sm font-medium text-blue-900">High Pole Cars</span>
                                  <span className="text-base font-semibold text-blue-700">{pilotCarInfo.highPoleCars}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Total Pilot Cars</p>
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <p className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.numberOfPilotCars || job.pcRequired || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Minimum Certification</p>
                            <p className="font-medium text-sm text-gray-900 capitalize">
                              {pilotCarInfo.minimumCertification || "N/A"}
                            </p>
                          </div>
                        </div>

                        {(pilotCarInfo.certifiedRequired || pilotCarInfo.flaggingTrained || pilotCarInfo.heightPoleCertified) && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Additional Certifications</p>
                            <div className="space-y-2">
                              {pilotCarInfo.certifiedRequired && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>Certified Pilot Car Required</span>
                                </div>
                              )}
                              {pilotCarInfo.flaggingTrained && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>Flagging Trained</span>
                                </div>
                              )}
                              {pilotCarInfo.heightPoleCertified && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>Height Pole Certified</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {pilotCarInfo.experienceRequirements && pilotCarInfo.experienceRequirements.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Experience Requirements</p>
                            <div className="flex flex-wrap gap-2">
                              {pilotCarInfo.experienceRequirements.map((exp: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-purple-50 border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium"
                                >
                                  {exp === "1-year" && "1+ Year"}
                                  {exp === "3-years" && "3+ Years"}
                                  {exp === "5-years" && "5+ Years"}
                                  {exp === "oversize-loads" && "Oversize Load Exp."}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {pilotCarInfo.vehicleRequirements && pilotCarInfo.vehicleRequirements.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Vehicle Requirements</p>
                            <div className="flex flex-wrap gap-2">
                              {pilotCarInfo.vehicleRequirements.map((req: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-full text-xs font-medium"
                                >
                                  {req === "highPoleCapable" && "High Pole"}
                                  {req === "4x4Capable" && "4x4"}
                                  {req === "signageEquipped" && "Signage"}
                                  {req === "lightsEquipped" && "Emergency Lights"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {pilotCarInfo.highPoleHeight && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-700 mb-1">High Pole Height Requirement</p>
                            <p className="font-semibold text-base text-blue-900">
                              {pilotCarInfo.highPoleHeight} feet
                            </p>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Schedule & Timing */}
                <Collapsible open={openSections.schedule} onOpenChange={() => toggleSection("schedule")}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">Schedule & Timing</h3>
                            <p className="text-xs text-gray-500">Start date and duration</p>
                          </div>
                        </div>
                        {openSections.schedule ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Start Date</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <p className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.plannedStartDate
                                  ? formatDate(pilotCarInfo.plannedStartDate)
                                  : formatDate(job.startDate)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Start Time</p>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <p className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.plannedStartTime || pilotCarInfo.startTime || "N/A"} {pilotCarInfo.timeZone ? `(${pilotCarInfo.timeZone})` : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Estimated Duration</p>
                            <p className="font-medium text-sm text-gray-900">
                              {pilotCarInfo.estimatedDuration || "N/A"} {pilotCarInfo.durationUnit || "hours"}
                            </p>
                          </div>
                          {pilotCarInfo.multiDayEscort && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">End Date</p>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <p className="font-medium text-sm text-gray-900">
                                  {pilotCarInfo.expectedEndDate
                                    ? formatDate(pilotCarInfo.expectedEndDate)
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {pilotCarInfo.multiDayEscort && (
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">Multi-day escort job</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Meeting & Contact Details */}
                <Collapsible open={openSections.location} onOpenChange={() => toggleSection("location")}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-100">
                            <MapPin className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">Meeting Details</h3>
                            <p className="text-xs text-gray-500">Location & contact info</p>
                          </div>
                        </div>
                        {openSections.location ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Meeting Location</p>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="font-medium text-sm text-gray-900">
                              {pilotCarInfo.meetingLocation || "N/A"}
                            </p>
                          </div>
                        </div>

                        {pilotCarInfo.meetingInstructions && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Meeting Instructions</p>
                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">
                              {pilotCarInfo.meetingInstructions}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Contact Name</p>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <p className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.contactName || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Contact Phone</p>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-600" />
                              <p className="font-medium text-sm text-gray-900">
                                {pilotCarInfo.contactPhone || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Time Tracking (for accepted jobs with assigned pilot car) */}
                {(() => {
                  const acceptedBid = bids.find((bid: any) => bid.status === 'Accepted');
                  if (!acceptedBid || !acceptedBid.jobStatus) return null;
                  
                  // Calculate elapsed time
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

                {/* Completion Details - Only shown for completed accepted bids */}
                {(() => {
                  const acceptedBid = bids.find((b: any) => b.status === 'Accepted');
                  if (!acceptedBid || acceptedBid.jobStatus !== 'Completed' || !acceptedBid.completionDetails) {
                    return null;
                  }
                  
                  return (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-green-100 px-4 py-3 border-b border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-700" />
                            <h3 className="font-semibold text-green-900">Job Completion Details</h3>
                          </div>
                          <Badge variant="outline" className="text-xs font-semibold bg-green-200 text-green-800 border-green-300">
                            Completed
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Time Breakdown Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-gray-800 mb-3">Time Breakdown Summary</p>
                          <div className="grid grid-cols-2 gap-3">
                            {acceptedBid.completionDetails.totalDrivingTime !== undefined && (
                              <div className="bg-white rounded-lg p-3 border border-blue-200">
                                <p className="text-xs text-gray-600 mb-1">Driving Time</p>
                                <p className="text-lg font-bold text-gray-900">
                                  {Math.floor(acceptedBid.completionDetails.totalDrivingTime / 60)}h {acceptedBid.completionDetails.totalDrivingTime % 60}m
                                </p>
                              </div>
                            )}
                            {acceptedBid.completionDetails.totalBreakTime !== undefined && acceptedBid.completionDetails.totalBreakTime > 0 && (
                              <div className="bg-white rounded-lg p-3 border border-blue-200">
                                <p className="text-xs text-gray-600 mb-1">Break Time</p>
                                <p className="text-lg font-bold text-gray-900">
                                  {Math.floor(acceptedBid.completionDetails.totalBreakTime / 60)}h {acceptedBid.completionDetails.totalBreakTime % 60}m
                                </p>
                              </div>
                            )}
                            {acceptedBid.completionDetails.totalWaitingTime !== undefined && acceptedBid.completionDetails.totalWaitingTime > 0 && (
                              <div className="bg-white rounded-lg p-3 border border-blue-200">
                                <p className="text-xs text-gray-600 mb-1">Waiting Time</p>
                                <p className="text-lg font-bold text-gray-900">
                                  {Math.floor(acceptedBid.completionDetails.totalWaitingTime / 60)}h {acceptedBid.completionDetails.totalWaitingTime % 60}m
                                </p>
                              </div>
                            )}
                            {acceptedBid.completionDetails.totalLayoverTime !== undefined && acceptedBid.completionDetails.totalLayoverTime > 0 && (
                              <div className="bg-white rounded-lg p-3 border border-amber-200">
                                <p className="text-xs text-gray-600 mb-1">Layover Time</p>
                                <p className="text-lg font-bold text-gray-900">
                                  {acceptedBid.completionDetails.totalLayoverTime}h
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Breaks Details */}
                        {acceptedBid.completionDetails.breaks && acceptedBid.completionDetails.breaks.length > 0 && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-800 mb-3">Breaks ({acceptedBid.completionDetails.breaks.length})</p>
                            <div className="space-y-2">
                              {acceptedBid.completionDetails.breaks.map((breakItem: any, index: number) => (
                                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-semibold text-gray-900">{breakItem.reason}</p>
                                    <span className="text-sm font-bold text-blue-600">{breakItem.duration}m</span>
                                  </div>
                                  <p className="text-xs text-gray-600">
                                    {formatTime24h(breakItem.startTime)} - 
                                    {formatTime24h(breakItem.endTime)}
                                  </p>
                                  {breakItem.notes && (
                                    <p className="text-xs text-gray-700 mt-2 italic bg-gray-50 p-2 rounded">{breakItem.notes}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Waiting Periods Details */}
                        {acceptedBid.completionDetails.waitingPeriods && acceptedBid.completionDetails.waitingPeriods.length > 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-800 mb-3">Waiting Periods ({acceptedBid.completionDetails.waitingPeriods.length})</p>
                            <div className="space-y-2">
                              {acceptedBid.completionDetails.waitingPeriods.map((wait: any, index: number) => (
                                <div key={index} className="bg-white rounded-lg p-3 border border-yellow-200">
                                  <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-semibold text-gray-900">{wait.reason}</p>
                                    <span className="text-sm font-bold text-yellow-700">{wait.duration}m</span>
                                  </div>
                                  <p className="text-xs text-gray-600">
                                    {formatTime24h(wait.startTime)} - 
                                    {formatTime24h(wait.endTime)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Layovers Details */}
                        {acceptedBid.completionDetails.layovers && acceptedBid.completionDetails.layovers.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-800 mb-3">Layovers ({acceptedBid.completionDetails.layovers.length})</p>
                            <div className="space-y-2">
                              {acceptedBid.completionDetails.layovers.map((layover: any, index: number) => (
                                <div key={index} className="bg-white rounded-lg p-3 border border-amber-200">
                                  <div className="flex justify-between items-start mb-1">
                                    <div className="flex-1">
                                      <p className="text-sm font-semibold text-gray-900">{layover.location}</p>
                                      <p className="text-xs text-gray-700 mt-1">{layover.reason}</p>
                                    </div>
                                    <span className="text-sm font-bold text-amber-700 ml-2">{layover.duration}h</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-2">
                                    {formatDateTime(layover.startTime)} - 
                                    {formatDateTime(layover.endTime)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Incidents */}
                        {acceptedBid.completionDetails.incidents && acceptedBid.completionDetails.incidents.length > 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-800 mb-3">Incidents ({acceptedBid.completionDetails.incidents.length})</p>
                            <div className="space-y-2">
                              {acceptedBid.completionDetails.incidents.map((incident: any, index: number) => (
                                <div key={index} className="bg-white rounded-lg p-3 border border-orange-200">
                                  <div className="flex items-start justify-between mb-1">
                                    <p className="text-sm font-semibold text-gray-900">{incident.type}</p>
                                    <Badge variant="outline" className={`text-xs ${incident.resolved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                      {incident.resolved ? 'Resolved' : 'Unresolved'}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1">{incident.description}</p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {formatDateTime(incident.time)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          {acceptedBid.completionDetails.fuelStops !== undefined && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Fuel Stops</p>
                              <p className="text-xl font-bold text-gray-900">{acceptedBid.completionDetails.fuelStops}</p>
                            </div>
                          )}
                        </div>

                        {/* Completion Notes */}
                        {acceptedBid.completionDetails.notes && (
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-800 mb-2">Completion Notes</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{acceptedBid.completionDetails.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Pricing Model */}
                <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection("pricing")}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-100">
                            <span className="text-lg font-semibold text-emerald-600">$</span>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">Pricing Model</h3>
                            <p className="text-xs text-gray-500">Rates and payment terms</p>
                          </div>
                        </div>
                        {openSections.pricing ? (
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
                              {pilotCarInfo.pricingType === "flat-rate" && "Flat Rate"}
                              {pilotCarInfo.pricingType === "hourly" && "Hourly Rate"}
                              {pilotCarInfo.pricingType === "daily" && "Daily Rate"}
                              {pilotCarInfo.pricingType === "mileage" && "Per Mile/Kilometer"}
                              {!pilotCarInfo.pricingType && (job.pricing || "N/A")}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Base Rate</p>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-base text-gray-900">
                                {pilotCarInfo.baseRate ? `$${pilotCarInfo.baseRate}` : (job.pricing || "N/A")}
                              </p>
                            </div>
                          </div>
                          {(pilotCarInfo.hourlyWaitingRate || pilotCarInfo.waitingRate) && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Waiting Rate</p>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <p className="font-medium text-sm text-gray-900">
                                  ${pilotCarInfo.hourlyWaitingRate || pilotCarInfo.waitingRate}/hr
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {(pilotCarInfo.gracePeriod || pilotCarInfo.overtimeRate || pilotCarInfo.layoverCost) && (
                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                            {pilotCarInfo.gracePeriod && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Grace Period</p>
                                <p className="font-medium text-sm text-gray-900">
                                  {pilotCarInfo.gracePeriod} minutes
                                </p>
                              </div>
                            )}
                            {pilotCarInfo.overtimeRate && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Overtime Rate</p>
                                <p className="font-medium text-sm text-gray-900">
                                  ${pilotCarInfo.overtimeRate}/hr
                                </p>
                              </div>
                            )}
                            {pilotCarInfo.layoverCost && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Layover Cost</p>
                                <p className="font-medium text-sm text-gray-900">
                                  ${pilotCarInfo.layoverCost}/day
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Layover & Extras */}
                {pilotCarInfo.layoverAllowed && (
                  <Collapsible open={openSections.extras} onOpenChange={() => toggleSection("extras")}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-100">
                              <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900">Layover & Extras</h3>
                              <p className="text-xs text-gray-500">Additional charges</p>
                            </div>
                          </div>
                          {openSections.extras ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
                          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-medium text-indigo-900">Layover Allowed</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {pilotCarInfo.layoverRate && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Layover Rate</p>
                                <p className="font-semibold text-sm text-gray-900">
                                  ${pilotCarInfo.layoverRate}/day
                                </p>
                              </div>
                            )}
                            {pilotCarInfo.maxLayoverDays && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Max Layover Days</p>
                                <p className="font-medium text-sm text-gray-900">
                                  {pilotCarInfo.maxLayoverDays} days
                                </p>
                              </div>
                            )}
                          </div>

                          {pilotCarInfo.hotelRequired && (
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-indigo-200">
                              <CheckCircle className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-medium text-indigo-900">Hotel accommodations required</span>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )}

                {/* Load Information */}
                {(loadInfo.type || loadInfo.weight || loadInfo.length) && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      Load Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {loadInfo.type && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <p className="font-medium text-sm">{loadInfo.type}</p>
                        </div>
                      )}
                      {loadInfo.weight && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Weight</p>
                          <p className="font-medium text-sm">{loadInfo.weight} lbs</p>
                        </div>
                      )}
                      {(loadInfo.length || loadInfo.width || loadInfo.height) && (
                        <div className="col-span-2 bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                          <p className="font-medium text-sm">
                            {loadInfo.length || "N/A"}' L × {loadInfo.width || "N/A"}' W × {loadInfo.height || "N/A"}' H
                          </p>
                        </div>
                      )}
                      {loadInfo.description && (
                        <div className="col-span-2 bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Description</p>
                          <p className="text-sm">{loadInfo.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom spacing */}
                <div className="h-4" />
              </div>
            )}

            {activeTab === "bids" && (
              <div className="p-4">
                {bids.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">
                        {bids.length} active {bids.length === 1 ? "bid" : "bids"}
                      </p>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Sort by: Lowest Price</option>
                        <option>Sort by: Highest Rating</option>
                        <option>Sort by: Most Recent</option>
                      </select>
                    </div>

                    {[...bids]
                      .sort((a, b) => {
                        if (a.status === "Accepted") return -1;
                        if (b.status === "Accepted") return 1;
                        return 0;
                      })
                      .map((bid) => (
                        <div
                          key={bid.id}
                          className={`rounded-xl transition-all relative overflow-hidden ${
                            bid.status === "Accepted"
                              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 shadow-lg pt-12 px-4 pb-4"
                              : "bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md p-4"
                          }`}
                        >
                          {bid.status === "Accepted" && (
                            <div className="absolute top-0 left-0 right-0">
                              <div className="bg-green-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-md">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-semibold text-xs uppercase tracking-wide">
                                  Accepted Winner
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  bid.status === "Accepted" ? "bg-green-600" : "bg-blue-100"
                                }`}
                              >
                                <User
                                  className={`w-5 h-5 ${
                                    bid.status === "Accepted" ? "text-white" : "text-blue-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4
                                  className={`font-semibold text-base ${
                                    bid.status === "Accepted" ? "text-green-800" : "text-gray-900"
                                  }`}
                                >
                                  {bid.pcCompany || bid.companyName}
                                </h4>
                                {bid.driverName && (
                                  <p
                                    className={`font-medium text-sm ${
                                      bid.status === "Accepted" ? "text-green-700" : "text-gray-600"
                                    }`}
                                  >
                                    Driver: {bid.driverName}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                  {bid.rating && (
                                    <>
                                      <div className="flex items-center gap-1">
                                        <span className="text-yellow-500 text-sm">★</span>
                                        <span className="font-medium text-sm text-gray-900">
                                          {bid.rating}
                                        </span>
                                      </div>
                                      <span className="text-gray-300 text-xs">•</span>
                                    </>
                                  )}
                                  {bid.totalTrips && (
                                    <>
                                      <span className="text-sm text-gray-600">
                                        {bid.totalTrips} trips
                                      </span>
                                      <span className="text-gray-300 text-xs">•</span>
                                    </>
                                  )}
                                  {bid.experience && (
                                    <span className="text-sm text-gray-600">
                                      {bid.experience}
                                    </span>
                                  )}
                                  {bid.vehicleType && !bid.driverName && (
                                    <span className="text-sm text-gray-600">
                                      {bid.vehicleType}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-xl text-blue-600">
                                {bid.bidAmount || (bid.amount ? `$${bid.amount.toLocaleString()}` : 'N/A')}
                              </p>
                              <p className="text-xs text-gray-500">Total Bid</p>
                            </div>
                          </div>

                          {(bid.estimatedTime || bid.submittedDate || bid.vehicleType) && (
                            <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200">
                              {bid.estimatedTime && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Estimated Time</p>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <p className="font-medium text-sm text-gray-900">
                                      {bid.estimatedTime}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {bid.submittedDate && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Submitted</p>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="font-medium text-sm text-gray-900">
                                      {formatDate(bid.submittedDate)}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {bid.vehicleType && bid.driverName && (
                                <div className={bid.estimatedTime ? "" : "col-span-2"}>
                                  <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
                                  <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-gray-400" />
                                    <p className="font-medium text-sm text-gray-900">
                                      {bid.vehicleType}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {bid.certifications && bid.certifications.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-2">Certifications</p>
                              <div className="flex flex-wrap gap-2">
                                {bid.certifications.map((cert, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full font-medium text-xs"
                                  >
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Contact Information for Accepted Bids */}
                          {bid.status === 'Accepted' && (bid.contactPerson || bid.contactPhone || bid.contactEmail) && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Contact Information</p>
                              <div className="space-y-2">
                                {bid.contactPerson && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-900">{bid.contactPerson}</span>
                                  </div>
                                )}
                                {bid.contactPhone && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <a href={`tel:${bid.contactPhone}`} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                      {bid.contactPhone}
                                    </a>
                                  </div>
                                )}
                                {bid.contactEmail && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <a href={`mailto:${bid.contactEmail}`} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                      {bid.contactEmail}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Time Tracking for Accepted Bids */}
                          {bid.status === 'Accepted' && bid.jobStatus && (
                            <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-semibold text-gray-700 uppercase">Time Tracking</p>
                                <Badge variant="outline" className={`text-xs font-semibold ${
                                  bid.jobStatus === 'Not Started' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                  bid.jobStatus === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                  'bg-green-100 text-green-700 border-green-200'
                                }`}>
                                  {bid.jobStatus}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {bid.startTime && (
                                  <div className="bg-white border border-indigo-200 rounded-lg p-2">
                                    <p className="text-xs text-gray-500 mb-0.5">Start Time</p>
                                    <p className="text-xs font-bold text-gray-900">
                                      {formatDateTime(bid.startTime)}
                                    </p>
                                  </div>
                                )}
                                {bid.endTime && (
                                  <div className="bg-white border border-green-200 rounded-lg p-2">
                                    <p className="text-xs text-gray-500 mb-0.5">End Time</p>
                                    <p className="text-xs font-bold text-gray-900">
                                      {formatDateTime(bid.endTime)}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {bid.startTime && (() => {
                                const start = new Date(bid.startTime);
                                const end = bid.endTime ? new Date(bid.endTime) : new Date();
                                const diffMs = end.getTime() - start.getTime();
                                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                                return (
                                  <div className="bg-white border border-gray-200 rounded-lg p-2 flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-600">
                                      {bid.jobStatus === 'Completed' ? 'Duration' : 'Elapsed'}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                      {hours}h {minutes}m
                                    </span>
                                  </div>
                                );
                              })()}
                              
                              {bid.jobStatus === 'In Progress' && (
                                <div className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 rounded-lg p-2 mt-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                  <span className="text-xs font-semibold">Active Now</span>
                                </div>
                              )}
                            </div>
                          )}

                          {job.status === "Open" && bid.status === "Pending" && (
                            <div className="flex items-center gap-3 mt-4">
                              <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 active:scale-98 transition-all">
                                Accept Bid
                              </button>
                              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-98 transition-all">
                                Message
                              </button>
                            </div>
                          )}
                          {(job.status !== "Open" || bid.status !== "Pending") && (
                            <div className="flex items-center justify-end mt-4">
                              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-98 transition-all">
                                Message
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="font-semibold text-lg text-gray-600 mb-2">
                      No bids yet
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-sm">
                      Pilot car companies will submit their bids for this job soon.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fixed Footer */}
          <div className="border-t border-gray-200 px-5 py-4 bg-white flex-shrink-0">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-98 transition-all"
              >
                Close
              </button>
              {activeTab === "details" && (
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 active:scale-98 transition-all">
                  Edit Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}