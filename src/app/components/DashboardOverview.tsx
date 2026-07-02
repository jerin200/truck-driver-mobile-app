import {
  Truck,
  Briefcase,
  Check,
  Navigation,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Package,
  MapPin,
  Activity,
  Bell,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Header from "./Header";

interface PermitState {
  code: string;
  status:
    | "Approved"
    | "Pending"
    | "Rejected"
    | "Expired"
    | "Not Applied";
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
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
  status: "In Transit" | "Stopped" | "Delivered";
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
  status:
    | "Open"
    | "In Transit"
    | "Action Required"
    | "Completed";
  truck?: TruckDetails;
  trailer?: TrailerDetails;
  driverDetails?: DriverDetails;
  load?: LoadDetails;
  routeDetails?: RouteDetails;
  tracking?: TrackingDetails;
}

interface StateJob {
  id: string;
  tripId: string;
  state: string;
  stateCode: string;
  entryLocation: string;
  entryDate: string;
  entryTime: string;
  positions: string;
  status:
    | "Open for Bidding"
    | "Bid Received"
    | "Bidding Closed"
    | "Assigned"
    | "In Progress"
    | "Completed"
    | "Expired";
  bidCount: number;
  bidExpiryDate: string;
  bidExpiryTime: string;
  assignedTo?: string;
  origin: string;
  destination: string;
}

const MOCK_PERMITS: Permit[] = [
  {
    id: "1",
    requestId: "REQ-1001",
    permitNumber: "PER-2024-88A",
    createdDate: "2024-12-01",
    effectiveDate: "2024-12-05",
    expiryDate: "2024-12-15",
    driver: "John Doe",
    states: [
      {
        code: "NY",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "NY-8829",
      },
      { code: "NJ", status: "Pending" },
      { code: "PA", status: "Rejected" },
      {
        code: "CT",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "CT-2291",
      },
      { code: "MA", status: "Pending" },
      {
        code: "MD",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "MD-5591",
      },
      {
        code: "VA",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "VA-1022",
      },
      {
        code: "NC",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "NC-4822",
      },
      {
        code: "SC",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "SC-9912",
      },
      {
        code: "GA",
        status: "Approved",
        effectiveDate: "2024-12-05",
        expiryDate: "2024-12-10",
        permitNumber: "GA-2281",
      },
      { code: "FL", status: "Pending" },
    ],
    origin: "New York, NY",
    destination: "Miami, FL",
    status: "In Transit",
    truck: {
      unit: "TRK-2025",
      plate: "DEF-5678",
      make: "Kenworth",
      year: "2022",
      vin: "1M123456789ABC",
      axleConfig: "3 Axle",
      grossWeight: "80,000 lbs",
      unladenWeight: "18,000 lbs",
    },
    trailer: {
      unit: "TRL-5001",
      plate: "TLR-9988",
      type: "Flatbed",
      length: "53 ft",
      axles: "2",
      width: "102 in",
    },
    driverDetails: {
      name: "John Doe",
      license: "D12345678",
      state: "NY",
      phone: "(555) 123-4567",
    },
    load: {
      type: "Excavator",
      description: "Heavy machinery transport",
      width: "8.5 ft",
      height: "10 ft",
      length: "20 ft",
      weight: "45,000 lbs",
    },
    routeDetails: { miles: "1280" },
    tracking: {
      status: "In Transit",
      currentLocation: "Richmond, VA (I-95 South)",
      nextStop: "Florence, SC",
      eta: "5h 30m",
      speed: "62 mph",
      distanceRemaining: "450 miles",
      progress: 35,
    },
  },
  {
    id: "2",
    requestId: "REQ-1002",
    permitNumber: "PER-2024-92B",
    createdDate: "2024-12-03",
    effectiveDate: "2024-12-10",
    expiryDate: "2024-12-20",
    driver: "Sarah Smith",
    states: [
      { code: "WA", status: "Not Applied" },
      { code: "OR", status: "Not Applied" },
      { code: "CA", status: "Not Applied" },
    ],
    origin: "Seattle, WA",
    destination: "Los Angeles, CA",
    status: "Open",
  },
  {
    id: "5",
    requestId: "PRM-2024-003",
    createdDate: "2024-12-08",
    effectiveDate: "2024-12-16",
    expiryDate: "2024-12-26",
    driver: "Robert Brown",
    states: [
      { code: "TX", status: "Rejected" },
      { code: "NM", status: "Pending" },
    ],
    origin: "Houston, TX",
    destination: "Santa Fe, NM",
    status: "Action Required",
  },
  {
    id: "7",
    requestId: "REQ-1006",
    createdDate: "2024-10-15",
    effectiveDate: "2024-10-20",
    expiryDate: "2024-10-30",
    driver: "Sarah Smith",
    states: [
      { code: "CA", status: "Rejected" },
      { code: "NV", status: "Rejected" },
    ],
    origin: "Sacramento, CA",
    destination: "Reno, NV",
    status: "Completed",
  },
];

const MOCK_STATE_JOBS: StateJob[] = [
  {
    id: "JOB-CA-001",
    tripId: "REQ-1001",
    state: "California",
    stateCode: "CA",
    entryLocation: "Sacramento Truck Stop, I-5",
    entryDate: "02/15/2026",
    entryTime: "08:00",
    positions: "2x Front, 1x Rear",
    status: "Open for Bidding",
    bidCount: 0,
    bidExpiryDate: "2026-02-15",
    bidExpiryTime: "10:00",
    origin: "Sacramento, CA",
    destination: "CA/OR Border",
  },
  {
    id: "JOB-OR-001",
    tripId: "REQ-1001",
    state: "Oregon",
    stateCode: "OR",
    entryLocation: "Oregon Welcome Center, I-5",
    entryDate: "02/15/2026",
    entryTime: "14:00",
    positions: "1x Front",
    status: "Bid Received",
    bidCount: 3,
    bidExpiryDate: "2026-02-17",
    bidExpiryTime: "17:00",
    origin: "OR/CA Border",
    destination: "Portland, OR",
  },
  {
    id: "JOB-NV-001",
    tripId: "REQ-1001",
    state: "Nevada",
    stateCode: "NV",
    entryLocation: "Reno Truck Plaza, US-95",
    entryDate: "02/16/2026",
    entryTime: "06:00",
    positions: "1x Front",
    status: "Assigned",
    bidCount: 2,
    bidExpiryDate: "2026-02-10",
    bidExpiryTime: "23:59",
    assignedTo: "Desert Pilot Services",
    origin: "Reno, NV",
    destination: "Las Vegas, NV",
  },
  {
    id: "JOB-AZ-001",
    tripId: "REQ-1001",
    state: "Arizona",
    stateCode: "AZ",
    entryLocation: "Kingman Rest Area, I-40",
    entryDate: "02/17/2026",
    entryTime: "10:00",
    positions: "1x Front, 1x Rear",
    status: "Bidding Closed",
    bidCount: 5,
    bidExpiryDate: "2026-02-12",
    bidExpiryTime: "18:00",
    origin: "Kingman, AZ",
    destination: "Phoenix, AZ",
  },
  {
    id: "JOB-TX-001",
    tripId: "REQ-1002",
    state: "Texas",
    stateCode: "TX",
    entryLocation: "Houston Truck Plaza",
    entryDate: "02/20/2026",
    entryTime: "06:00",
    positions: "2x Front",
    status: "Open for Bidding",
    bidCount: 0,
    bidExpiryDate: "2026-02-16",
    bidExpiryTime: "18:00",
    origin: "Houston, TX",
    destination: "Austin, TX",
  },
  {
    id: "JOB-NM-001",
    tripId: "REQ-1002",
    state: "New Mexico",
    stateCode: "NM",
    entryLocation: "Albuquerque Rest Stop",
    entryDate: "02/21/2026",
    entryTime: "14:30",
    positions: "1x Front, 1x Rear",
    status: "Open for Bidding",
    bidCount: 0,
    bidExpiryDate: "2026-02-16",
    bidExpiryTime: "12:00",
    origin: "Albuquerque, NM",
    destination: "Santa Fe, NM",
  },
];

interface DashboardOverviewProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function DashboardOverview({
  onNavigate,
}: DashboardOverviewProps) {
  // Compute Stats
  const activeTripsCount = MOCK_PERMITS.filter(
    (p) => p.status === "In Transit",
  ).length;
  const completedCount = MOCK_PERMITS.filter(
    (p) => p.status === "Completed",
  ).length;

  // Pilot Car Jobs Stats
  const openForBiddingJobs = MOCK_STATE_JOBS.filter(
    (j) => j.status === "Open for Bidding",
  );
  const jobsWithBids = MOCK_STATE_JOBS.filter(
    (j) => j.status === "Bid Received",
  );
  const assignedJobs = MOCK_STATE_JOBS.filter(
    (j) => j.status === "Assigned",
  );
  const closingSoonJobs = MOCK_STATE_JOBS.filter((j) => {
    const expiryDate = new Date(
      j.bidExpiryDate + " " + j.bidExpiryTime,
    );
    const now = new Date("2026-02-16T00:00:00"); // Using current mock date
    const hoursUntilExpiry =
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return (
      hoursUntilExpiry <= 24 &&
      hoursUntilExpiry > 0 &&
      (j.status === "Open for Bidding" ||
        j.status === "Bid Received")
    );
  });

  // Action Required Items
  const permitIssuesCount = MOCK_PERMITS.reduce(
    (count, permit) => {
      const rejectedStates = permit.states.filter(
        (s) => s.status === "Rejected",
      ).length;
      return count + rejectedStates;
    },
    0,
  );

  const unassignedJobsCount = MOCK_STATE_JOBS.filter(
    (j) => j.status === "Open for Bidding" && j.bidCount === 0,
  ).length;

  const totalActionItems =
    permitIssuesCount + unassignedJobsCount;

  const inTransitTrip = MOCK_PERMITS.find(
    (p) => p.status === "In Transit",
  );

  // Get next state for active trip
  const getNextStateInfo = (permit: Permit) => {
    const nextState = permit.states.find(
      (s) =>
        s.status === "Pending" || s.status === "Not Applied",
    );
    const relatedJob = MOCK_STATE_JOBS.find(
      (j) =>
        j.tripId === permit.requestId &&
        j.stateCode === nextState?.code,
    );
    return { nextState, relatedJob };
  };

  return (
    <div className="flex flex-col flex-1 bg-[#f6f6f6] w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Header
          title="Dashboard"
          onNotificationClick={() =>
            onNavigate && onNavigate("notifications")
          }
          onProfileClick={() =>
            onNavigate && onNavigate("overview")
          }
          notificationCount={2}
        />

        <div className="p-4 space-y-4 pb-24">
          {/* Welcome Section */}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() =>
                onNavigate && onNavigate("manage-trips")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-baseline justify-start gap-0.5">
                    <span className="text-2xl font-bold text-gray-900">
                      {activeTripsCount}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Active Trips
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() =>
                onNavigate && onNavigate("pilot-car-jobs")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="rounded-lg">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="flex items-baseline justify-start gap-0.5">
                    <span className="text-2xl font-bold text-gray-900">
                      {openForBiddingJobs.length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Open Jobs
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() =>
                onNavigate && onNavigate("manage-trips")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="rounded-lg">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-baseline justify-start gap-0.5">
                    <span className="text-2xl font-bold text-gray-900">
                      {completedCount}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Completed
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Action Items Row - Full Width */}
          {totalActionItems > 0 && null}

          {/* Active Trip Card */}
          {inTransitTrip && inTransitTrip.tracking && (
            <Card
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() =>
                onNavigate &&
                onNavigate("view-permit-request", inTransitTrip)
              }
            >
              <CardContent className="p-0">
                {/* Header with softer gradient */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                        <Navigation className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">
                        Live Trip
                      </span>
                    </div>
                    <span className="text-white/90 text-xs font-medium">
                      {inTransitTrip.requestId}
                    </span>
                  </div>
                </div>

                {/* Route - Compact */}
                <div className="px-4 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <span className="font-medium">
                      {inTransitTrip.origin}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium">
                      {inTransitTrip.destination}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>
                        {inTransitTrip.tracking.currentLocation}
                      </span>
                    </div>
                    <span>•</span>
                    <span className="font-medium text-blue-600">
                      {inTransitTrip.tracking.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-4 py-2.5 bg-gray-50">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${inTransitTrip.tracking.progress}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>
                      Next:{" "}
                      <span className="font-medium text-gray-900">
                        {inTransitTrip.tracking.nextStop}
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="font-medium text-blue-600">
                        {inTransitTrip.tracking.eta}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pilot Car Jobs */}
          <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-50 rounded-md p-1.5 shrink-0">
                      <Briefcase className="h-4 w-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Pilot Car Jobs
                    </h3>
                  </div>
                  <Badge className="bg-[#F89823] text-[#1a1a1a] border-0 text-xs">
                    {MOCK_STATE_JOBS.length}
                  </Badge>
                </div>
              </div>

              {/* Job Categories - Full Width */}
              <div className="p-3 space-y-2">
                {/* Open for Bidding */}
                {openForBiddingJobs.length > 0 && (
                  <button
                    onClick={() =>
                      onNavigate && onNavigate("pilot-car-jobs")
                    }
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Briefcase className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <p className="text-xs font-medium text-gray-900">
                        Open for Bidding{" "}
                        <span className="text-gray-500">
                          · {openForBiddingJobs.length}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0 group-hover:text-blue-600 transition-colors" />
                  </button>
                )}

                {/* Closing Soon */}
                {closingSoonJobs.length > 0 && (
                  <button
                    onClick={() =>
                      onNavigate && onNavigate("pilot-car-jobs")
                    }
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Clock className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                      <p className="text-xs font-medium text-gray-900">
                        Closing Soon{" "}
                        <span className="text-gray-500">
                          · {closingSoonJobs.length}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0 group-hover:text-orange-600 transition-colors" />
                  </button>
                )}

                {/* Bids Received */}
                {jobsWithBids.length > 0 && (
                  <button
                    onClick={() =>
                      onNavigate && onNavigate("pilot-car-jobs")
                    }
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FileText className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      <p className="text-xs font-medium text-gray-900">
                        Bids Received{" "}
                        <span className="text-gray-500">
                          · {jobsWithBids.length}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0 group-hover:text-purple-600 transition-colors" />
                  </button>
                )}

                {/* Assigned */}
                {assignedJobs.length > 0 && (
                  <button
                    onClick={() =>
                      onNavigate && onNavigate("pilot-car-jobs")
                    }
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <p className="text-xs font-medium text-gray-900">
                        Assigned{" "}
                        <span className="text-gray-500">
                          · {assignedJobs.length}
                        </span>
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0 group-hover:text-green-600 transition-colors" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    onNavigate && onNavigate("alert-demo")
                  }
                  className="flex flex-col items-center justify-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border-2 border-amber-300 hover:border-amber-400 transition-colors group"
                >
                  <div className="bg-amber-100 p-3 rounded-lg mb-2 group-hover:bg-amber-200 transition-colors">
                    <Bell className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-amber-900">
                    🎯 Alert Demo
                  </span>
                </button>

                

                

                <button
                  onClick={() =>
                    onNavigate && onNavigate("permits")
                  }
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-[#F89823] transition-colors group"
                >
                  <div className="bg-blue-50 p-3 rounded-lg mb-2 group-hover:bg-blue-100 transition-colors">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    View Trips
                  </span>
                </button>

                <button
                  onClick={() =>
                    onNavigate && onNavigate("pilot-car-jobs")
                  }
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-[#F89823] transition-colors group"
                >
                  <div className="bg-orange-50 p-3 rounded-lg mb-2 group-hover:bg-orange-100 transition-colors">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    Browse Jobs
                  </span>
                </button>

                <button
                  onClick={() =>
                    onNavigate && onNavigate("new-permit")
                  }
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-[#F89823] transition-colors group"
                >
                  <div className="bg-green-50 p-3 rounded-lg mb-2 group-hover:bg-green-100 transition-colors">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    New Permit
                  </span>
                </button>

                <button
                  onClick={() =>
                    onNavigate && onNavigate("notifications")
                  }
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-[#F89823] transition-colors group"
                >
                  <div className="bg-purple-50 p-3 rounded-lg mb-2 group-hover:bg-purple-100 transition-colors">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    Activity
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}