import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  User,
  Truck,
  FileText,
  Download,
  CheckCircle2,
  CheckCircle,
  Clock,
  AlertCircle,
  Box,
  Scale,
  Navigation,
  Phone,
  CreditCard,
  ChevronRight,
  Map as MapIcon,
  Flag,
  Maximize2,
  Share,
  Briefcase,
  Users,
  Info,
  Star,
  Plus,
  Check,
  Play,
  Edit,
  Share2,
  X,
  Timer,
  Square,
  Camera,
  Shield,
  Mail,
  Eye,
  Receipt,
  AlertTriangle,
  Copy,
  Upload,
  Search,
  XCircle,
  Bell,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  UserCircle,
  Activity,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AlertBanner } from "./ui/alert";
import { useSnackbar } from "../contexts/SnackbarContext";
import {
  formatDate,
  formatTime24h,
  convertTo24h,
} from "../utils/dateFormat";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useTripExecution } from "../hooks/useTripExecution";
import {
  JurisdictionState,
  TripExecutionService,
} from "../services/tripExecutionService";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import svgPaths from "../imports/svg-xujrs56d33";
import TripInfoTab from "./TripInfoTab";
import InvoiceTabContent from "./InvoiceTabContent";
import Header from "./Header";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from "./ui/drawer";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { CompactPermitCard } from "./CompactPermitCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import mapImage from "figma:asset/dd9bc85e9f0a971b8c887413588bdac53d534e9b.png";
import trackingMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";
import {
  US_STATES,
  getStateCodes,
  getStateName,
} from "./us-states";
import TripDetailHeader from "./TripDetailHeader";
import LiveTrackingHeader from "./LiveTrackingHeader";
import GeneralInformationCard from "./GeneralInformationCard";
import LoadDetailsCard from "./LoadDetailsCard";
import VehicleDriverSection from "./VehicleDriverSection";
import { TimeTrackingSection } from "./TimeTrackingSection";
import AddJob from "./AddJob";
import PostJobPage from "./PostJobPage";
import TripIdHeader from "./TripIdHeader";
import PilotCarsByJurisdiction from "./PilotCarsByJurisdiction";
import JobDetailsPage from "./JobDetailsPage";
import LiveMapDriving from "./LiveMapDriving";
import ReportIncidentDrawer from "./ReportIncidentDrawer";
import SlideToConfirm from "./SlideToConfirm";
import SegmentedTabControl from "./SegmentedTabControl";
import StateJobsList from "./StateJobsList";
import { RouteSurveyInfo } from "./RouteSurveyMapDrawer";

interface PermitState {
  code: string;
  status: "Approved" | "Pending" | "Rejected" | "Expired";
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
  divisible?: string;
  selfPropelled?: string;
  commodityClass?: string;
  commodityType?: string;
  frontOverhang?: string;
  rearOverhang?: string;
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
    | "Approved"
    | "Draft"
    | "Expired"
    | "Requires Revision"
    | "Submitted"
    | "Rejected"
    | "In Transit";

  permitType?: string;
  reference?: string;
  duration?: string;

  truck?: TruckDetails;
  trailer?: TrailerDetails;
  driverDetails?: DriverDetails;
  load?: LoadDetails;
  routeDetails?: RouteDetails;
  tracking?: TrackingDetails;
}

interface ViewPermitRequestProps {
  permit: Permit;
  onBack: () => void;
}

// Jobs Types
interface Bid {
  id: string;
  companyName: string;
  amount: number;
  rating: number;
  vehicleType: string;
  status: "Pending" | "Accepted" | "Rejected";
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  jobStatus?: "Not Started" | "In Progress" | "Completed";
  startTime?: string;
  endTime?: string;
  pausedTime?: string;
  totalPausedDuration?: number; // in minutes
  // Completion details for finished jobs
  completionDetails?: {
    breaks: Array<{
      reason: string;
      startTime: string;
      endTime: string;
      duration: number; // in minutes
      notes?: string;
    }>;
    layovers: Array<{
      location: string;
      startTime: string;
      endTime: string;
      duration: number; // in hours
      reason: string;
    }>;
    incidents: Array<{
      type: string;
      time: string;
      description: string;
      resolved: boolean;
    }>;
    waitingPeriods: Array<{
      reason: string;
      startTime: string;
      endTime: string;
      duration: number; // in minutes
    }>;
    totalDrivingTime?: number; // in minutes
    totalBreakTime?: number; // in minutes
    totalLayoverTime?: number; // in hours
    totalWaitingTime?: number; // in minutes
    fuelStops?: number;
    notes?: string;
  };
}

interface PilotJob {
  id: string;
  tripId: string;
  jobTitle?: string; // Optional for backward compatibility
  jobType?: string; // e.g., "survey", "convoy", or combination
  origin: string;
  destination: string;
  pickupDate: string;
  startDate?: string; // Job start date
  endDate?: string; // Job end date
  estimatedDistance?: string;
  vehicleType: string;
  numberOfVehicles: number;
  status: "Open" | "Assigned" | "Completed";
  bids: Bid[];
  postedDate: string;
  freightDesc: string;
  dims: {
    height: string;
    width: string;
    length: string;
    weight: string;
  };
  notes: string;
  price: {
    type: "Per Mile" | "Flat Rate";
    value: string;
  };
  jurisdictions?: string[]; // States/jurisdictions this pilot car covers
  permits?: Array<{
    id: string;
    state: string;
    stateFull: string;
    jurisdiction: string;
    status:
      | "Approved"
      | "Payment Requested"
      | "In Review"
      | "Rejected"
      | "Route Suggested"
      | "Not Requested";
    permitNumber?: string;
    fee: string;
    expiryDate?: string;
    notes?: string;
    reason?: string;
    paymentEnabled?: boolean;
    feeBreakdown?: {
      processingFee: string;
      permitFee: string;
      totalAmount: string;
    };
    paymentStatus?: {
      fullPaymentPaid: boolean;
      fullPaymentAmount?: string;
    };
    refundInfo?: {
      amount: string;
      status: string;
      refundDate?: string;
    };
  }>;
}

// Mock jobs data
const MOCK_JOBS: PilotJob[] = [
  // REQ-1001: NY to FL trip - Different escorts for different state groups
  {
    id: "JOB-101",
    tripId: "REQ-1001",
    title: "Pilot Car Services - Multi-State Route",
    description: "Escort services through NC, VA, and MD",
    jobTitle: "Pilot Car Services - Multi-State Route",
    jobType: "convoy",
    origin: "Edmonton, AB",
    destination: "Yellowknife, NT",
    route: "1450 km",
    distance: "1450 km",
    pickupDate: "2024-12-01",
    startDate: "2024-12-01",
    startTime: "07:00",
    endDate: "2024-12-05",
    estimatedDuration: "4-5 days",
    estimatedDistance: "1450 km",
    meetAtJobStart:
      "Transport Depot - 8520 50 St NW, Edmonton, AB",
    vehicleType: "Lead Pilot Car",
    numberOfVehicles: 1,
    status: "Open",
    postedDate: "2024-11-25",
    freightDesc: "Escort services through NC, VA, and MD",
    commodityType: "Heavy Machinery",
    grossVehicleWeight: "85,000 lbs",
    loadWeight: "42,000 lbs",
    overHeight: "14' 2\"",
    overWidth: "10' 6\"",
    overLength: "42' 0\"",
    trailerLength: "53' 0\"",
    loadLength: "42' 0\"",
    specialHandling:
      "Winter route requiring experienced driver with cold weather expertise",
    statesProvinces: ["AB", "NT"],
    requestedRoute:
      "Highway 2 North to Highway 35, then Highway 1 through Wood Buffalo. Overnight stops in Slave Lake and High Level.",
    meetingLocation:
      "Transport Depot - 8520 50 St NW, Edmonton, AB",
    meetingInstructions:
      "Check in at main office. Meet with dispatch coordinator. Vehicle inspection required before departure.",
    contactName: "Robert Thompson",
    contactPhone: "(780) 555-0199",
    pricingType: "flat",
    baseRate: "4900",
    costPerMile: "3.38",
    costPerHour: "95",
    minimumDailyRate: "1200",
    specialInstructions:
      "Multi-state route escort service. All jurisdictions cleared. Winter driving conditions expected - chains may be required. Maintain constant CB communication on channel 19.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ab-1",
        state: "Alberta",
        stateCode: "AB",
        permitNumber: "AB-2024-34567",
        jurisdiction: "Alberta Transportation",
        validFrom: "2024-11-25",
        validTo: "2025-02-28",
        status: "Approved",
      },
      {
        id: "nt-1",
        state: "Northwest Territories",
        stateCode: "NT",
        permitNumber: "NT-2024-12890",
        jurisdiction: "Government of Northwest Territories",
        validFrom: "2024-11-25",
        validTo: "2025-02-28",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-024",
        company: "Northern Routes Escort",
        driver: "David Anderson",
        type: "Lead",
        experience: 18,
        rating: 4.9,
        jurisdictions: ["AB", "NT", "SK", "BC"],
        certifications: ["DOT", "P/EVO", "Winter Certified"],
        totalTrips: 520,
        requestedDate: "2024-11-20",
        quoteStatus: "submitted",
        quoteAmount: 4900,
        quoteSubmittedDate: "2024-11-23",
        notes:
          "Extensive winter driving experience. Familiar with northern routes.",
      },
      {
        id: "PC-026",
        company: "Arctic Pilot Services",
        driver: "Jennifer MacDonald",
        type: "Lead",
        experience: 14,
        rating: 4.8,
        jurisdictions: ["AB", "NT", "YT"],
        certifications: ["DOT", "Winter Certified"],
        totalTrips: 385,
        requestedDate: "2024-11-20",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "14'2\"",
      width: "10'6\"",
      length: "42'0\"",
      weight: "42,000 lbs",
    },
    notes:
      "Multi-state route escort service completed successfully. All jurisdictions cleared.",
    price: { type: "Flat Rate", value: "$4,900" },
    jurisdictions: ["North Carolina", "Virginia", "Maryland"],
    bids: [
      {
        id: "1",
        companyName: "Arctic Escort Services",
        amount: 4200,
        rating: 4.9,
        vehicleType: "Lead Pilot Car",
        status: "Pending",
        contactPerson: "John Miller",
        contactPhone: "(555) 123-4567",
        contactEmail: "john.miller@arcticescort.com",
      },
      {
        id: "2",
        companyName: "Northern Route Pilots",
        amount: 4500,
        rating: 4.7,
        vehicleType: "Lead Pilot Car",
        status: "Pending",
        contactPerson: "Sarah Johnson",
        contactPhone: "(555) 234-5678",
        contactEmail: "sarah.j@northernroute.com",
      },
      {
        id: "3",
        companyName: "Elite Highway Escorts",
        amount: 3950,
        rating: 4.8,
        vehicleType: "Lead Pilot Car",
        status: "Pending",
        contactPerson: "Mike Peterson",
        contactPhone: "(555) 345-6789",
        contactEmail: "mike.p@elitehighway.com",
      },
      {
        id: "4",
        companyName: "TransCanada Pilot Cars",
        amount: 4750,
        rating: 5.0,
        vehicleType: "Lead Pilot Car",
        status: "Pending",
        contactPerson: "David Chen",
        contactPhone: "(555) 456-7890",
        contactEmail: "david.chen@transcanadapilot.com",
      },
      {
        id: "5",
        companyName: "Frontier Escort Co.",
        amount: 4100,
        rating: 4.6,
        vehicleType: "Lead Pilot Car",
        status: "Pending",
        contactPerson: "Lisa Wong",
        contactPhone: "(555) 567-8901",
        contactEmail: "lisa.w@frontierescort.com",
      },
    ],
    permits: [
      {
        id: "permit-ab-1",
        state: "AB",
        stateFull: "Alberta",
        jurisdiction: "Alberta Transportation",
        status: "Approved",
        permitNumber: "AB-2024-34567",
        fee: "$825.00",
        expiryDate: "2025-02-28",
        paymentEnabled: true,
        feeBreakdown: {
          processingFee: "$125.00",
          permitFee: "$700.00",
          totalAmount: "$825.00",
        },
        paymentStatus: {
          fullPaymentPaid: true,
          fullPaymentAmount: "$825.00",
        },
      },
      {
        id: "permit-nt-1",
        state: "NT",
        stateFull: "Northwest Territories",
        jurisdiction: "Government of Northwest Territories",
        status: "In Review",
        permitNumber: undefined,
        fee: "$950.00",
        paymentEnabled: true,
        feeBreakdown: {
          processingFee: "$150.00",
          permitFee: "$800.00",
          totalAmount: "$950.00",
        },
        paymentStatus: {
          fullPaymentPaid: true,
          fullPaymentAmount: "$950.00",
        },
        notes:
          "Permit application submitted and payment received. Under review by territorial authority.",
      },
    ],
  },
  {
    id: "JOB-102",
    tripId: "REQ-1001",
    jobTitle: "MD to VA - Lead Escort (Mid-Atlantic)",
    title: "MD to VA - Lead Escort (Mid-Atlantic)",
    description: "Lead escort for mid-Atlantic region",
    jobType: "convoy",
    origin: "Baltimore, MD",
    destination: "Richmond, VA",
    route: "155 mi",
    distance: "155 mi",
    pickupDate: "2024-12-31",
    startDate: "2024-12-31",
    startTime: "08:15",
    endDate: "2024-12-31",
    estimatedDuration: "4-6 hours",
    estimatedDistance: "155 mi",
    meetAtJobStart:
      "Port of Baltimore - 2001 E McComas St, Baltimore, MD",
    vehicleType: "Lead",
    numberOfVehicles: 1,
    status: "Assigned",
    postedDate: "2024-12-01",
    freightDesc: "Lead escort for mid-Atlantic region",
    commodityType: "Construction Equipment",
    grossVehicleWeight: "78,000 lbs",
    loadWeight: "42,000 lbs",
    overHeight: "14' 2\"",
    overWidth: "10' 6\"",
    overLength: "42' 0\"",
    trailerLength: "48' 0\"",
    loadLength: "42' 0\"",
    specialHandling:
      "Interstate escort through I-95 corridor during business hours",
    statesProvinces: ["MD", "VA", "WV"],
    requestedRoute:
      "I-95 South from Baltimore to Richmond. Stay in right lanes where possible. Avoid peak rush hours if feasible.",
    meetingLocation:
      "Port of Baltimore - 2001 E McComas St, Baltimore, MD",
    meetingInstructions:
      "Meet at Port Gate 5. Sign in with security. Escort will brief on route and communications.",
    contactName: "David Martinez",
    contactPhone: "(410) 555-0288",
    pricingType: "flat",
    baseRate: "1450",
    costPerMile: "9.35",
    costPerHour: "125",
    minimumDailyRate: "950",
    specialInstructions:
      "Experienced with I-95 and I-81 corridors. Currently in progress. Maintain radio contact on channel 14. Watch for low clearances near Richmond exits.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "md-1",
        state: "Maryland",
        stateCode: "MD",
        permitNumber: "MD-2024-45678",
        jurisdiction: "Maryland State Highway Administration",
        validFrom: "2024-12-15",
        validTo: "2025-03-15",
        status: "Approved",
      },
      {
        id: "va-2",
        state: "Virginia",
        stateCode: "VA",
        permitNumber: "VA-2024-23456",
        jurisdiction: "Virginia Department of Transportation",
        validFrom: "2024-12-20",
        validTo: "2025-03-20",
        status: "Approved",
      },
      {
        id: "wv-1",
        state: "West Virginia",
        stateCode: "WV",
        permitNumber: "WV-2024-12345",
        jurisdiction: "West Virginia DOT",
        validFrom: "2024-12-18",
        validTo: "2025-03-18",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-031",
        company: "Mid-Atlantic Escorts",
        driver: "Robert Chen",
        type: "Lead",
        experience: 11,
        rating: 4.8,
        jurisdictions: ["MD", "VA", "WV", "PA"],
        certifications: ["DOT", "P/EVO"],
        totalTrips: 320,
        requestedDate: "2024-11-28",
        quoteStatus: "submitted",
        quoteAmount: 1450,
        quoteSubmittedDate: "2024-12-01",
        notes:
          "I-95 and I-81 corridor specialist. Available immediately.",
      },
    ],
    dims: {
      height: "14'2\"",
      width: "10'6\"",
      length: "42'0\"",
      weight: "42,000 lbs",
    },
    notes:
      "Covers MD, VA, WV. Experienced with I-95 and I-81 corridors. Currently in progress.",
    price: { type: "Flat Rate", value: "$1,450" },
    jurisdictions: ["Maryland", "Virginia", "West Virginia"],
    bids: [
      {
        id: "2",
        companyName: "Mid-Atlantic Escorts",
        amount: 1450,
        rating: 4.7,
        vehicleType: "Lead",
        status: "Accepted",
        contactPerson: "Sarah Chen",
        contactPhone: "(410) 555-0187",
        contactEmail: "sarah@midatlanticescorts.com",
        jobStatus: "In Progress",
        startTime: "2024-12-31T08:15:00",
      },
    ],
    permits: [
      {
        id: "permit-md-1",
        state: "MD",
        stateFull: "Maryland",
        jurisdiction: "Maryland State Highway Administration",
        status: "Approved",
        permitNumber: "MD-2024-45678",
        fee: "$675.00",
        expiryDate: "2025-03-15",
        paymentEnabled: true,
        feeBreakdown: {
          processingFee: "$100.00",
          permitFee: "$575.00",
          totalAmount: "$675.00",
        },
        paymentStatus: {
          fullPaymentPaid: true,
          fullPaymentAmount: "$675.00",
        },
      },
      {
        id: "permit-va-1",
        state: "VA",
        stateFull: "Virginia",
        jurisdiction: "Virginia Department of Transportation",
        status: "Approved",
        permitNumber: "VA-2024-23456",
        fee: "$725.00",
        expiryDate: "2025-03-20",
        paymentEnabled: true,
        feeBreakdown: {
          processingFee: "$110.00",
          permitFee: "$615.00",
          totalAmount: "$725.00",
        },
        paymentStatus: {
          fullPaymentPaid: true,
          fullPaymentAmount: "$725.00",
        },
      },
      {
        id: "permit-wv-1",
        state: "WV",
        stateFull: "West Virginia",
        jurisdiction: "West Virginia DOT",
        status: "Payment Requested",
        permitNumber: undefined,
        fee: "$600.00",
        expiryDate: "2025-03-18",
        paymentEnabled: true,
        feeBreakdown: {
          processingFee: "$95.00",
          permitFee: "$505.00",
          totalAmount: "$600.00",
        },
        paymentStatus: {
          fullPaymentPaid: false,
          fullPaymentAmount: "$600.00",
        },
        notes:
          "Payment requested. Please complete payment to finalize permit application.",
      },
    ],
  },
  {
    id: "JOB-103",
    tripId: "REQ-1001",
    jobTitle: "Carolinas Lead Escort - NC & SC",
    title: "Carolinas Lead Escort - NC & SC",
    description: "Lead escort for Carolinas region",
    jobType: "convoy",
    origin: "New York, NY",
    destination: "Miami, FL",
    route: "1,280 mi",
    distance: "1,280 mi",
    pickupDate: "2024-12-05",
    startDate: "2024-12-05",
    startTime: "06:00",
    endDate: "2024-12-07",
    estimatedDuration: "2-3 days",
    estimatedDistance: "1,280 mi",
    meetAtJobStart: "Rest Area - I-95 NC Border",
    vehicleType: "Lead",
    numberOfVehicles: 1,
    status: "Assigned",
    postedDate: "2024-12-01",
    freightDesc: "Lead escort for Carolinas",
    commodityType: "Industrial Equipment",
    grossVehicleWeight: "82,000 lbs",
    loadWeight: "42,000 lbs",
    overHeight: "14' 2\"",
    overWidth: "10' 6\"",
    overLength: "42' 0\"",
    trailerLength: "53' 0\"",
    loadLength: "42' 0\"",
    specialHandling:
      "Multi-day transport through Carolinas with overnight layover",
    statesProvinces: ["NC", "SC"],
    requestedRoute:
      "I-95 through NC and SC. Avoid Charlotte metro during rush hours. Overnight in Florence, SC area.",
    meetingLocation:
      "Welcome Center - I-95 Northbound, NC/VA Border",
    meetingInstructions:
      "Meet at rest area parking. Contact driver 30 minutes before arrival. CB channel 19 for communications.",
    contactName: "Michael Patterson",
    contactPhone: "(919) 555-0345",
    pricingType: "mileage",
    baseRate: "800",
    costPerMile: "2.50",
    costPerHour: "80",
    minimumDailyRate: "750",
    specialInstructions:
      "Required for both states per DOT regulations. Maintain lead position at 500ft minimum. Watch for construction zones near Fayetteville and Florence.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "nc-1",
        state: "North Carolina",
        stateCode: "NC",
        permitNumber: "NC-2024-67890",
        jurisdiction: "North Carolina DOT",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
      {
        id: "sc-1",
        state: "South Carolina",
        stateCode: "SC",
        permitNumber: "SC-2024-34567",
        jurisdiction: "South Carolina DOT",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-033",
        company: "Carolina Route Services",
        driver: "James Williams",
        type: "Lead",
        experience: 16,
        rating: 4.9,
        jurisdictions: ["NC", "SC", "GA", "TN"],
        certifications: ["DOT", "P/EVO", "Oversize Load"],
        totalTrips: 460,
        requestedDate: "2024-11-26",
        quoteStatus: "submitted",
        quoteAmount: 1350,
        quoteSubmittedDate: "2024-11-29",
        notes:
          "Carolina corridor specialist. Familiar with all metro areas.",
      },
      {
        id: "PC-035",
        company: "Southeast Pilot Escorts",
        driver: "Patricia Moore",
        type: "Lead",
        experience: 9,
        rating: 4.6,
        jurisdictions: ["NC", "SC", "VA"],
        certifications: ["DOT"],
        totalTrips: 240,
        requestedDate: "2024-11-26",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "14'2\"",
      width: "10'6\"",
      length: "42'0\"",
      weight: "42,000 lbs",
    },
    notes:
      "Covers NC, SC. Required for both states per DOT regulations.",
    price: { type: "Per Mile", value: "$2.50" },
    jurisdictions: ["North Carolina", "South Carolina"],
    bids: [
      {
        id: "3",
        companyName: "Carolina Route Escorts",
        amount: 1200,
        rating: 4.6,
        vehicleType: "Lead",
        status: "Accepted",
        contactPerson: "James Williams",
        contactPhone: "(919) 555-0245",
        contactEmail: "james@carolinaroute.com",
      },
    ],
  },
  {
    id: "JOB-104",
    tripId: "REQ-1001",
    jobTitle: "Georgia & Florida Dual Escort",
    title: "Georgia & Florida Dual Escort",
    description: "Lead and chase escort for GA & FL",
    jobType: "convoy",
    origin: "New York, NY",
    destination: "Miami, FL",
    route: "1,280 mi",
    distance: "1,280 mi",
    pickupDate: "2024-12-05",
    startDate: "2024-12-05",
    startTime: "05:30",
    endDate: "2024-12-08",
    estimatedDuration: "3-4 days",
    estimatedDistance: "1,280 mi",
    meetAtJobStart: "Truck Stop - I-95 GA/SC Border",
    vehicleType: "Lead",
    numberOfVehicles: 2,
    status: "Bidding Closed",
    postedDate: "2024-12-01",
    freightDesc: "Georgia & Florida escorts with chase",
    commodityType: "Heavy Equipment",
    grossVehicleWeight: "80,000 lbs",
    loadWeight: "42,000 lbs",
    overHeight: "14' 2\"",
    overWidth: "10' 6\"",
    overLength: "42' 0\"",
    trailerLength: "53' 0\"",
    loadLength: "42' 0\"",
    specialHandling:
      "Dual escort required through metro Atlanta and Miami approaches",
    statesProvinces: ["GA", "FL"],
    requestedRoute:
      "I-95 through GA and FL. Bypass Atlanta via I-285 if possible. Final approach to Miami via I-95 with both lead and chase active.",
    meetingLocation: "Flying J Travel Plaza - I-95 Exit 1, GA",
    meetingInstructions:
      "Meet at truck parking area. Lead and chase vehicles coordinate before departure. Driver briefing required.",
    contactName: "Thomas Rodriguez",
    contactPhone: "(404) 555-0567",
    pricingType: "mileage",
    baseRate: "1200",
    costPerMile: "2.25",
    costPerHour: "85",
    minimumDailyRate: "800",
    specialInstructions:
      "Lead and chase required for final leg to Miami. Both vehicles must maintain constant communication. Extra caution through Jacksonville and Miami metro areas.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ga-1",
        state: "Georgia",
        stateCode: "GA",
        permitNumber: "GA-2024-89012",
        jurisdiction: "Georgia Department of Transportation",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
      {
        id: "fl-2",
        state: "Florida",
        stateCode: "FL",
        permitNumber: "FL-2024-45678",
        jurisdiction: "Florida DOT",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-018",
        company: "Southern Escorts Inc",
        driver: "Michael Thompson",
        type: "Lead",
        experience: 12,
        rating: 4.9,
        jurisdictions: ["GA", "FL", "SC", "NC"],
        certifications: ["DOT", "P/EVO", "Oversize Load"],
        totalTrips: 380,
        requestedDate: "2024-11-25",
        quoteStatus: "submitted",
        quoteAmount: 1580,
        quoteSubmittedDate: "2024-11-30",
        notes:
          "Experienced with I-95 corridor. Can coordinate with chase vehicle.",
      },
      {
        id: "PC-022",
        company: "Florida Route Masters",
        driver: "Sarah Johnson",
        type: "Chase",
        experience: 8,
        rating: 4.7,
        jurisdictions: ["FL", "GA", "AL"],
        certifications: ["DOT", "P/EVO"],
        totalTrips: 225,
        requestedDate: "2024-11-25",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "14'2\"",
      width: "10'6\"",
      length: "42'0\"",
      weight: "42,000 lbs",
    },
    notes:
      "Covers GA & FL. Lead and chase required for final leg to Miami.",
    price: { type: "Per Mile", value: "$2.25" },
    jurisdictions: ["Georgia", "Florida"],
    bids: [
      {
        id: "bid-az-1",
        companyName: "Southeast Pilot Pros",
        amount: 1580,
        rating: 4.9,
        vehicleType: "Lead",
        status: "Pending",
        contactPerson: "Maria Rodriguez",
        contactPhone: "(404) 555-0398",
        contactEmail: "maria@southeastpilot.com",
      },
      {
        id: "bid-az-2",
        companyName: "Arizona Escort Services",
        amount: 1450,
        rating: 4.7,
        vehicleType: "Lead",
        status: "Pending",
        contactPerson: "John Smith",
        contactPhone: "(602) 555-0199",
        contactEmail: "john@azescort.com",
      },
      {
        id: "bid-az-3",
        companyName: "Desert Route Pilots",
        amount: 1620,
        rating: 4.8,
        vehicleType: "Chase",
        status: "Pending",
        contactPerson: "Sarah Johnson",
        contactPhone: "(480) 555-0287",
        contactEmail: "sarah@desertroutepilots.com",
      },
      {
        id: "bid-az-4",
        companyName: "Southwest Pilot Co",
        amount: 1500,
        rating: 4.6,
        vehicleType: "Lead",
        status: "Pending",
        contactPerson: "Mike Davis",
        contactPhone: "(520) 555-0345",
        contactEmail: "mike@swpilot.com",
      },
      {
        id: "bid-az-5",
        companyName: "Grand Canyon Escorts",
        amount: 1680,
        rating: 4.9,
        vehicleType: "Chase",
        status: "Pending",
        contactPerson: "Lisa Martinez",
        contactPhone: "(928) 555-0412",
        contactEmail: "lisa@gcescorts.com",
      },
    ],
  },
  {
    id: "JOB-105",
    tripId: "REQ-1001",
    jobTitle: "Pilot Car Job – New York, NY to Miami, FL",
    title: "Pilot Car Job – New York, NY to Miami, FL",
    jobType: "convoy",
    description:
      "Additional chase vehicle for wide sections through urban areas",
    origin: "New York, NY",
    destination: "Miami, FL",
    route: "1,280 mi",
    distance: "1,280 mi",
    pickupDate: "2024-12-06",
    startDate: "2024-12-06",
    startTime: "08:00",
    endDate: "2024-12-09",
    estimatedDuration: "3-4 days",
    estimatedDistance: "1,280 mi",
    meetAtJobStart:
      "Truck Depot - 123 Industrial Pkwy, Brooklyn, NY",
    vehicleType: "Chase",
    numberOfVehicles: 1,
    status: "Open",
    postedDate: "2024-12-28",
    freightDesc: "Additional chase vehicle for wide sections",
    commodityType: "Machinery",
    grossVehicleWeight: "80,000 lbs",
    loadWeight: "42,000 lbs",
    overHeight: "14' 2\"",
    overWidth: "10' 6\"",
    overLength: "42' 0\"",
    trailerLength: "48' 0\"",
    loadLength: "42' 0\"",
    specialHandling:
      "Requires wide load escort through urban corridors",
    statesProvinces: [
      "NY",
      "NJ",
      "PA",
      "DE",
      "MD",
      "VA",
      "NC",
      "SC",
      "GA",
      "FL",
    ],
    requestedRoute:
      "I-95 corridor, avoiding peak traffic hours in major cities. Preferred overnight stops in Richmond, VA and Savannah, GA.",
    meetingLocation:
      "Truck Depot - 123 Industrial Pkwy, Brooklyn, NY",
    meetingInstructions:
      "Meet at truck depot main gate. Check in with security and ask for dispatcher Mike Johnson. Arrive 30 minutes prior to departure.",
    contactName: "Mike Johnson",
    contactPhone: "(718) 555-0142",
    pricingType: "mileage",
    baseRate: "500",
    costPerMile: "2.00",
    costPerHour: "75",
    minimumDailyRate: "600",
    specialInstructions:
      "Backup chase car needed for certain wide sections through urban areas. Must have experience with I-95 corridor. CB radio required for communication with lead escort and driver.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ny-1",
        state: "New York",
        stateCode: "NY",
        permitNumber: "NY-2024-15678",
        jurisdiction: "New York State DOT",
        validFrom: "2024-12-01",
        validTo: "2025-01-31",
        status: "Approved",
      },
      {
        id: "nj-1",
        state: "New Jersey",
        stateCode: "NJ",
        permitNumber: "NJ-2024-08945",
        jurisdiction: "New Jersey DOT",
        validFrom: "2024-12-01",
        validTo: "2025-01-31",
        status: "Approved",
      },
      {
        id: "pa-1",
        state: "Pennsylvania",
        stateCode: "PA",
        permitNumber: "PA-2024-11223",
        jurisdiction: "Pennsylvania DOT",
        validFrom: "2024-12-01",
        validTo: "2025-01-31",
        status: "Approved",
      },
      {
        id: "va-1",
        state: "Virginia",
        stateCode: "VA",
        permitNumber: "VA-2024-09334",
        jurisdiction: "Virginia Department of Transportation",
        validFrom: "2024-12-05",
        validTo: "2025-01-31",
        status: "Approved",
      },
      {
        id: "fl-1",
        state: "Florida",
        stateCode: "FL",
        permitNumber: "FL-2024-07556",
        jurisdiction: "Florida DOT",
        validFrom: "2024-12-01",
        validTo: "2025-01-31",
        status: "Approved",
      },
    ],
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
    ],
    dims: {
      height: "14'2\"",
      width: "10'6\"",
      length: "42'0\"",
      weight: "42,000 lbs",
    },
    notes:
      "Backup chase car needed for certain wide sections through urban areas. Must have experience with I-95 corridor.",
    price: { type: "Per Mile", value: "$2.00" },
    jurisdictions: [
      "New York",
      "New Jersey",
      "Pennsylvania",
      "Delaware",
      "Maryland",
      "Virginia",
    ],
    bids: [
      {
        id: "BID-105-1",
        companyName: "Metro Pilot Services",
        amount: 1450,
        rating: 4.6,
        vehicleType: "Dodge Ram 3500",
        status: "Pending",
      },
      {
        id: "BID-105-2",
        companyName: "Coastal Escorts LLC",
        amount: 1580,
        rating: 4.8,
        vehicleType: "Ford F-350",
        status: "Pending",
      },
      {
        id: "BID-105-3",
        companyName: "Highway Guardians",
        amount: 1320,
        rating: 4.7,
        vehicleType: "Chevy Silverado 2500",
        status: "Pending",
      },
    ],
  },
  {
    id: "JOB-106",
    tripId: "REQ-1001",
    title: "Pilot Car Services - Northeast Corridor",
    description: "Escort services through NY, NJ, and PA",
    jobTitle: "Pilot Car Services - Northeast Corridor",
    jobType: "convoy",
    origin: "Buffalo, NY",
    destination: "Philadelphia, PA",
    route: "580 km",
    distance: "580 km",
    pickupDate: "2026-01-15",
    startDate: "2026-01-15",
    startTime: "06:00",
    endDate: "2026-01-17",
    estimatedDuration: "2-3 days",
    estimatedDistance: "580 km",
    meetAtJobStart:
      "Industrial Park - 1250 Niagara St, Buffalo, NY",
    vehicleType: "Lead Pilot Car",
    numberOfVehicles: 1,
    status: "Completed",
    postedDate: "2026-01-10",
    freightDesc: "Escort services through NY, NJ, and PA",
    commodityType: "Industrial Machinery",
    grossVehicleWeight: "75,000 lbs",
    loadWeight: "38,500 lbs",
    overHeight: "13' 8\"",
    overWidth: "11' 0\"",
    overLength: "38' 0\"",
    trailerLength: "48' 0\"",
    loadLength: "38' 0\"",
    specialHandling:
      "Northeast corridor winter transport with weather contingencies",
    statesProvinces: ["NY", "NJ", "PA"],
    requestedRoute:
      "I-90 East to I-81 South, then I-380 to I-80 East. Final approach via I-476 and I-76 to Philadelphia. Winter weather route adjustments allowed.",
    meetingLocation:
      "Industrial Park - 1250 Niagara St, Buffalo, NY",
    meetingInstructions:
      "Meet at loading dock 4. Driver briefing at 05:30. Weather check required before departure.",
    contactName: "Anthony Romano",
    contactPhone: "(716) 555-0234",
    pricingType: "flat",
    baseRate: "3200",
    costPerMile: "5.52",
    costPerHour: "110",
    minimumDailyRate: "1200",
    specialInstructions:
      "Northeast corridor escort service. All jurisdictions cleared. Winter driving conditions expected. Chains and winter equipment required. Flexible schedule for weather delays.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ny-2",
        state: "New York",
        stateCode: "NY",
        permitNumber: "NY-2026-23456",
        jurisdiction: "New York State DOT",
        validFrom: "2026-01-10",
        validTo: "2026-04-10",
        status: "Approved",
      },
      {
        id: "nj-2",
        state: "New Jersey",
        stateCode: "NJ",
        permitNumber: "NJ-2026-12345",
        jurisdiction: "New Jersey DOT",
        validFrom: "2026-01-10",
        validTo: "2026-04-10",
        status: "Approved",
      },
      {
        id: "pa-2",
        state: "Pennsylvania",
        stateCode: "PA",
        permitNumber: "PA-2026-34567",
        jurisdiction: "Pennsylvania DOT",
        validFrom: "2026-01-10",
        validTo: "2026-04-10",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-040",
        company: "Northeast Escort Pros",
        driver: "William Davis",
        type: "Lead",
        experience: 20,
        rating: 5.0,
        jurisdictions: ["NY", "NJ", "PA", "CT", "MA"],
        certifications: [
          "DOT",
          "P/EVO",
          "Winter Certified",
          "Oversize Load",
        ],
        totalTrips: 650,
        requestedDate: "2024-12-10",
        quoteStatus: "submitted",
        quoteAmount: 3200,
        quoteSubmittedDate: "2024-12-15",
        notes:
          "25 years experience. Northeast specialist with full winter equipment.",
      },
    ],
    dims: {
      height: "13'8\"",
      width: "11'0\"",
      length: "38'0\"",
      weight: "38,500 lbs",
    },
    notes:
      "Northeast corridor escort service completed successfully. All jurisdictions cleared.",
    price: { type: "Flat Rate", value: "$3,200" },
    jurisdictions: ["New York", "New Jersey", "Pennsylvania"],
    driverRating: {
      overallRating: 4.7,
      professionalism: 5,
      communication: 4,
      timeliness: 5,
      comment: 'Professional driver, handled the Northeast corridor route expertly. Good communication throughout the multi-day journey.',
      submittedAt: new Date('2026-01-17T17:30:00').toISOString(),
      submittedBy: 'David Thompson',
      pilotCarCompany: 'Northeast Express Escorts'
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
      comment: 'Excellent pilot car service! David maintained perfect positioning and communication throughout the entire Northeast corridor route. Very professional.',
      submittedAt: new Date('2026-01-17T17:00:00').toISOString()
    },
    bids: [
      {
        id: "6",
        companyName: "Northeast Express Escorts",
        amount: 3200,
        rating: 4.8,
        vehicleType: "Lead Pilot Car",
        status: "Accepted",
        contactPerson: "David Thompson",
        contactPhone: "(555) 987-6543",
        contactEmail: "david.thompson@neescorts.com",
        jobStatus: "Completed",
        startTime: "2026-01-15T06:00:00",
        endTime: "2026-01-17T16:00:00",
        totalPausedDuration: 180,
        invoiceApproved: false,
        completionDetails: {
          breaks: [
            {
              reason: "Fuel Break",
              startTime: "2026-01-15T09:30:00",
              endTime: "2026-01-15T09:50:00",
              duration: 20,
              notes: "Fuel stop in Syracuse, NY",
            },
            {
              reason: "Lunch Break",
              startTime: "2026-01-16T12:30:00",
              endTime: "2026-01-16T13:15:00",
              duration: 45,
            },
            {
              reason: "Rest Break",
              startTime: "2026-01-17T10:00:00",
              endTime: "2026-01-17T10:15:00",
              duration: 15,
            },
          ],
          layovers: [
            {
              location: "Scranton, PA",
              startTime: "2026-01-15T19:00:00",
              endTime: "2026-01-16T06:30:00",
              duration: 690,
              hotel: "Courtyard Scranton",
            },
            {
              location: "Allentown, PA",
              startTime: "2026-01-16T20:30:00",
              endTime: "2026-01-17T06:00:00",
              duration: 570,
              hotel: "Holiday Inn Allentown",
            },
          ],
          incidents: [],
          waitingPeriods: [
            {
              reason: "Traffic Delay",
              startTime: "2026-01-16T08:00:00",
              endTime: "2026-01-16T09:30:00",
              duration: 90,
            },
            {
              reason: "Weather Delay",
              startTime: "2026-01-17T11:30:00",
              endTime: "2026-01-17T13:00:00",
              duration: 90,
            },
          ],
          totalDrivingTime: 1560,
          totalBreakTime: 80,
          totalLayoverTime: 1260,
          totalWaitingTime: 180,
          fuelStops: 3,
          notes:
            "Northeast corridor route completed successfully. Minor weather delays due to winter conditions. All permits verified at state lines. No incidents reported.",
        },
      },
    ],
  },
  // REQ-1002: CA to AZ trip - Different escorts per state
  {
    id: "JOB-201",
    tripId: "REQ-1002",
    jobTitle: "California & Nevada Wide Load Escort",
    title: "California & Nevada Wide Load Escort",
    description:
      "Lead escort for extra-wide load through CA & NV",
    jobType: "convoy",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    route: "373 mi",
    distance: "373 mi",
    pickupDate: "2024-12-10",
    startDate: "2024-12-10",
    startTime: "08:15",
    endDate: "2024-12-10",
    estimatedDuration: "8-10 hours",
    estimatedDistance: "373 mi",
    meetAtJobStart:
      "Distribution Center - 12500 S Alameda St, Compton, CA",
    vehicleType: "Lead",
    numberOfVehicles: 1,
    status: "Assigned",
    postedDate: "2024-12-02",
    freightDesc: "California & Nevada wide load escort",
    commodityType: "Prefabricated Structure",
    grossVehicleWeight: "65,000 lbs",
    loadWeight: "28,000 lbs",
    overHeight: "13' 6\"",
    overWidth: "16' 0\"",
    overLength: "60' 0\"",
    trailerLength: "65' 0\"",
    loadLength: "60' 0\"",
    specialHandling:
      "Extra-wide load requiring careful navigation through mountain passes and tunnel avoidance",
    statesProvinces: ["CA", "NV", "AZ"],
    requestedRoute:
      "I-10 East through CA desert. Monitor clearances through mountain passes. Border inspection required at CA-AZ line.",
    meetingLocation:
      "Distribution Center - 12500 S Alameda St, Compton, CA",
    meetingInstructions:
      "Arrive at loading dock 7. Pre-trip inspection required. Driver will brief on load specifics and route restrictions.",
    contactName: "Lisa Wang",
    contactPhone: "(310) 555-0456",
    pricingType: "flat",
    baseRate: "850",
    costPerMile: "2.28",
    costPerHour: "95",
    minimumDailyRate: "800",
    specialInstructions:
      "16ft width requires lead vehicle through mountain passes. Avoid tunnel routes. State inspection stops required at CA-AZ border.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ca-1",
        state: "California",
        stateCode: "CA",
        permitNumber: "CA-2024-56789",
        jurisdiction: "California Department of Transportation",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
      {
        id: "nv-1",
        state: "Nevada",
        stateCode: "NV",
        permitNumber: "NV-2024-23456",
        jurisdiction: "Nevada DOT",
        validFrom: "2024-12-01",
        validTo: "2025-03-01",
        status: "Approved",
      },
      {
        id: "az-1",
        state: "Arizona",
        stateCode: "AZ",
        permitNumber: "AZ-2024-34567",
        jurisdiction: "Arizona Department of Transportation",
        validFrom: "2024-12-05",
        validTo: "2025-03-05",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-042",
        company: "Desert Mountain Escorts",
        driver: "Carlos Rivera",
        type: "Lead",
        experience: 13,
        rating: 4.8,
        jurisdictions: ["CA", "NV", "AZ", "UT"],
        certifications: ["DOT", "P/EVO", "Wide Load"],
        totalTrips: 390,
        requestedDate: "2024-11-30",
        quoteStatus: "submitted",
        quoteAmount: 850,
        quoteSubmittedDate: "2024-12-03",
        notes: "Mountain pass specialist. Wide load certified.",
      },
      {
        id: "PC-044",
        company: "West Coast Pilot Cars",
        driver: "Jessica Martinez",
        type: "Lead",
        experience: 8,
        rating: 4.7,
        jurisdictions: ["CA", "NV", "OR"],
        certifications: ["DOT", "Wide Load"],
        totalTrips: 210,
        requestedDate: "2024-11-30",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "13'6\"",
      width: "16'0\"",
      length: "60'0\"",
      weight: "28,000 lbs",
    },
    notes:
      "Covers CA & NV. 16ft width requires lead vehicle through mountain passes.",
    price: { type: "Flat Rate", value: "$850" },
    jurisdictions: ["California", "Nevada"],
    bids: [
      {
        id: "5",
        companyName: "West Coast Escorts",
        amount: 850,
        rating: 4.8,
        vehicleType: "Lead",
        status: "Accepted",
        contactPerson: "Michael Chen",
        contactPhone: "(555) 234-5678",
        contactEmail: "michael@westcoastescorts.com",
        jobStatus: "Completed",
        startTime: "2024-12-10T08:15:00",
        endTime: "2024-12-10T14:30:00",
        completionDetails: {
          breaks: [
            {
              reason: "Rest Break",
              startTime: "2024-12-10T10:30:00",
              endTime: "2024-12-10T10:45:00",
              duration: 15,
              notes: "Rest area stop - CA Route 10",
            },
            {
              reason: "Fuel Break",
              startTime: "2024-12-10T12:15:00",
              endTime: "2024-12-10T12:35:00",
              duration: 20,
              notes: "Fuel and vehicle inspection",
            },
          ],
          layovers: [
            {
              location: "Blythe, CA",
              startTime: "2024-12-10T11:00:00",
              endTime: "2024-12-10T13:00:00",
              duration: 2,
              reason: "Mandatory CA-AZ border inspection delay",
            },
          ],
          incidents: [],
          waitingPeriods: [
            {
              reason: "Border Inspection",
              startTime: "2024-12-10T11:00:00",
              endTime: "2024-12-10T13:00:00",
              duration: 120,
            },
          ],
          totalDrivingTime: 255, // 4h 15m
          totalBreakTime: 35,
          totalLayoverTime: 2,
          totalWaitingTime: 120,
          fuelStops: 1,
          notes:
            "Smooth trip overall. Border inspection took longer than expected but within normal range. No issues with clearances.",
        },
      },
    ],
  },
  {
    id: "JOB-202",
    tripId: "REQ-1002",
    jobTitle: "Arizona Chase Escort - Phoenix Approach",
    title: "Arizona Chase Escort - Phoenix Approach",
    description:
      "Chase vehicle for Arizona portion of wide load transport",
    jobType: "convoy",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    route: "373 mi",
    distance: "373 mi",
    pickupDate: "2024-12-10",
    startDate: "2024-12-10",
    startTime: "09:30",
    endDate: "2024-12-10",
    estimatedDuration: "5-6 hours",
    estimatedDistance: "373 mi",
    meetAtJobStart: "Rest Area - AZ Border I-10",
    vehicleType: "Chase",
    numberOfVehicles: 1,
    status: "Assigned",
    postedDate: "2024-12-02",
    freightDesc: "Arizona chase vehicle",
    commodityType: "Prefabricated Structure",
    grossVehicleWeight: "65,000 lbs",
    loadWeight: "28,000 lbs",
    overHeight: "13' 6\"",
    overWidth: "16' 0\"",
    overLength: "60' 0\"",
    trailerLength: "65' 0\"",
    loadLength: "60' 0\"",
    specialHandling:
      "Chase escort for wide load through Phoenix metro area",
    statesProvinces: ["AZ"],
    requestedRoute:
      "I-10 East from CA border to Phoenix. Monitor traffic for wide load clearance through metro area.",
    meetingLocation: "Rest Area - I-10 Eastbound, AZ Border",
    meetingInstructions:
      "Meet lead escort and driver at border rest area. Coordinate on radio channel. Take position 500ft behind load.",
    contactName: "Carlos Hernandez",
    contactPhone: "(602) 555-0789",
    pricingType: "flat",
    baseRate: "550",
    costPerMile: "1.47",
    costPerHour: "85",
    minimumDailyRate: "500",
    specialInstructions:
      "Arizona portion only. Chase required on I-10 for wide loads. Maintain rear position through Phoenix metro. Watch for merging traffic.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "az-2",
        state: "Arizona",
        stateCode: "AZ",
        permitNumber: "AZ-2024-45678",
        jurisdiction: "Arizona Department of Transportation",
        validFrom: "2024-12-05",
        validTo: "2025-03-05",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-046",
        company: "Arizona Escort Services",
        driver: "Thomas Rodriguez",
        type: "Chase",
        experience: 10,
        rating: 4.6,
        jurisdictions: ["AZ", "NM", "CA"],
        certifications: ["DOT", "Wide Load"],
        totalTrips: 280,
        requestedDate: "2024-12-01",
        quoteStatus: "submitted",
        quoteAmount: 600,
        quoteSubmittedDate: "2024-12-04",
        notes:
          "Phoenix metro specialist. I-10 corridor expert.",
      },
    ],
    dims: {
      height: "13'6\"",
      width: "16'0\"",
      length: "60'0\"",
      weight: "28,000 lbs",
    },
    notes:
      "Arizona portion only. Chase required on I-10 for wide loads.",
    price: { type: "Flat Rate", value: "$550" },
    jurisdictions: ["Arizona"],
    bids: [
      {
        id: "6",
        companyName: "Desert Pilot Services",
        amount: 550,
        rating: 4.9,
        vehicleType: "Chase",
        status: "Accepted",
        contactPerson: "Sarah Martinez",
        contactPhone: "(555) 876-5432",
        contactEmail: "sarah@desertpilot.com",
        jobStatus: "In Progress",
        startTime: "2024-12-10T09:30:00",
      },
    ],
  },
  // REQ-1004: Miami, FL to Atlanta, GA trip - Pilot cars needed for both FL and GA
  {
    id: "JOB-401",
    tripId: "REQ-1004",
    jobTitle: "Florida Lead Escort - Miami to GA Border",
    title: "Florida Lead Escort - Miami to GA Border",
    description: "Lead pilot car escort through Florida",
    jobType: "convoy",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    route: "663 mi",
    distance: "663 mi",
    pickupDate: "2024-12-15",
    startDate: "2024-12-15",
    startTime: "06:00",
    endDate: "2024-12-16",
    estimatedDuration: "1-2 days",
    estimatedDistance: "320 mi",
    meetAtJobStart:
      "Port of Miami - 1015 North America Way, Miami, FL",
    vehicleType: "Lead",
    numberOfVehicles: 1,
    status: "Assigned",
    postedDate: "2024-12-08",
    freightDesc:
      "Lead escort required through Florida I-75 corridor",
    commodityType: "Industrial Equipment",
    grossVehicleWeight: "92,000 lbs",
    loadWeight: "52,000 lbs",
    overHeight: "15' 0\"",
    overWidth: "12' 6\"",
    overLength: "65' 0\"",
    trailerLength: "70' 0\"",
    loadLength: "65' 0\"",
    specialHandling:
      "Oversized load requiring lead pilot through Florida turnpike and I-75",
    statesProvinces: ["FL"],
    requestedRoute:
      "Florida Turnpike North to I-75 North. Exit at GA state line.",
    meetingLocation:
      "Port of Miami - 1015 North America Way, Miami, FL",
    meetingInstructions:
      "Meet at Port Gate 4. Security clearance required. Driver briefing at 05:30.",
    contactName: "Carlos Martinez",
    contactPhone: "(305) 555-0892",
    pricingType: "mileage",
    baseRate: "600",
    costPerMile: "1.85",
    costPerHour: "75",
    minimumDailyRate: "600",
    specialInstructions:
      "Florida DOT requires lead escort for 12ft+ width. Maintain 500ft lead distance. CB channel 19.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "fl-4004",
        state: "Florida",
        stateCode: "FL",
        permitNumber: "FL-2024-19283",
        jurisdiction: "Florida DOT",
        validFrom: "2024-12-10",
        validTo: "2025-03-10",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-050",
        company: "Florida Route Specialists",
        driver: "Maria Gonzalez",
        type: "Lead",
        experience: 12,
        rating: 4.9,
        jurisdictions: ["FL", "GA", "AL"],
        certifications: ["DOT", "P/EVO", "Wide Load"],
        totalTrips: 360,
        requestedDate: "2024-12-05",
        quoteStatus: "submitted",
        quoteAmount: 725,
        quoteSubmittedDate: "2024-12-08",
        notes:
          "Florida Turnpike and I-75 specialist. Port clearance experience.",
      },
    ],
    dims: {
      height: "15'0\"",
      width: "12'6\"",
      length: "65'0\"",
      weight: "52,000 lbs",
    },
    notes:
      "Florida leg only. Lead escort required for wide load through FL Turnpike and I-75.",
    price: { type: "Per Mile", value: "$1.85" },
    jurisdictions: ["FL"],
    bids: [
      {
        id: "BID-401-1",
        companyName: "Sunshine State Escorts",
        amount: 592,
        rating: 4.7,
        vehicleType: "Lead",
        status: "Accepted",
        contactPerson: "Miguel Santos",
        contactPhone: "(305) 555-0234",
        contactEmail: "miguel@sunshineescorts.com",
        jobStatus: "Not Started",
      },
    ],
  },
  {
    id: "JOB-402",
    tripId: "REQ-1004",
    jobTitle: "Georgia Dual Escort - FL Border to Atlanta",
    title: "Georgia Dual Escort - FL Border to Atlanta",
    description:
      "Lead and chase pilot cars for Georgia portion",
    jobType: "convoy",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    route: "663 mi",
    distance: "343 mi",
    pickupDate: "2024-12-15",
    startDate: "2024-12-16",
    startTime: "08:00",
    endDate: "2024-12-16",
    estimatedDuration: "8-10 hours",
    estimatedDistance: "343 mi",
    meetAtJobStart:
      "Welcome Center - I-75 Northbound, GA/FL Border",
    vehicleType: "Lead",
    numberOfVehicles: 2,
    status: "Assigned",
    postedDate: "2024-12-08",
    freightDesc:
      "Dual escort (lead + chase) required through Georgia",
    commodityType: "Industrial Equipment",
    grossVehicleWeight: "92,000 lbs",
    loadWeight: "52,000 lbs",
    overHeight: "15' 0\"",
    overWidth: "12' 6\"",
    overLength: "65' 0\"",
    trailerLength: "70' 0\"",
    loadLength: "65' 0\"",
    specialHandling:
      "Metro Atlanta requires both lead and chase escorts per GA DOT regulations",
    statesProvinces: ["GA"],
    requestedRoute:
      "I-75 North through Valdosta, Macon, and metro Atlanta. Final destination industrial park north of Atlanta.",
    meetingLocation:
      "Welcome Center - I-75 Northbound Mile Marker 2, GA",
    meetingInstructions:
      "Coordinate with Florida escort for handoff. Both lead and chase must be present before proceeding.",
    contactName: "Jennifer Thompson",
    contactPhone: "(404) 555-0567",
    pricingType: "mileage",
    baseRate: "900",
    costPerMile: "2.60",
    costPerHour: "90",
    minimumDailyRate: "900",
    specialInstructions:
      "Georgia requires BOTH lead and chase for 12ft+ width through metro areas. Extra caution through Atlanta I-285 interchange. Permits verified.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "ga-4004",
        state: "Georgia",
        stateCode: "GA",
        permitNumber: "GA-2024-45672",
        jurisdiction: "Georgia Department of Transportation",
        validFrom: "2024-12-10",
        validTo: "2025-03-10",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-052",
        company: "Atlanta Metro Escorts",
        driver: "Brandon Wilson",
        type: "Lead",
        experience: 15,
        rating: 4.9,
        jurisdictions: ["GA", "AL", "TN", "SC"],
        certifications: ["DOT", "P/EVO", "Wide Load"],
        totalTrips: 425,
        requestedDate: "2024-12-06",
        quoteStatus: "submitted",
        quoteAmount: 1100,
        quoteSubmittedDate: "2024-12-09",
        notes:
          "Atlanta metro specialist. I-285 navigation expert.",
      },
      {
        id: "PC-054",
        company: "Peach State Pilot Cars",
        driver: "Ashley Brown",
        type: "Chase",
        experience: 9,
        rating: 4.7,
        jurisdictions: ["GA", "FL", "SC"],
        certifications: ["DOT", "Wide Load"],
        totalTrips: 265,
        requestedDate: "2024-12-06",
        quoteStatus: "submitted",
        quoteAmount: 850,
        quoteSubmittedDate: "2024-12-09",
        notes: "Chase specialist with metro experience.",
      },
    ],
    dims: {
      height: "15'0\"",
      width: "12'6\"",
      length: "65'0\"",
      weight: "52,000 lbs",
    },
    notes:
      "Georgia leg only. Both lead and chase required per GA DOT for metro Atlanta transit.",
    price: { type: "Per Mile", value: "$2.60" },
    jurisdictions: ["GA"],
    bids: [
      {
        id: "BID-402-1",
        companyName: "Peach State Pilot Services",
        amount: 891,
        rating: 4.9,
        vehicleType: "Lead + Chase",
        status: "Accepted",
        contactPerson: "David Williams",
        contactPhone: "(404) 555-0891",
        contactEmail: "david@peachstatepilot.com",
        jobStatus: "Not Started",
      },
    ],
  },
  // REQ-1003: TX internal - single state
  {
    id: "JOB-301",
    tripId: "REQ-1003",
    jobTitle: "Texas High Pole Escort - Dallas to Houston",
    title: "Texas High Pole Escort - Dallas to Houston",
    description:
      "High pole escort for tall industrial equipment",
    jobType: "high-pole",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    route: "240 mi",
    distance: "240 mi",
    estimatedDistance: "240 mi",
    pickupDate: "2024-12-15",
    startDate: "2024-12-15",
    startTime: "07:00",
    endDate: "2024-12-15",
    estimatedDuration: "6-8 hours",
    meetAtJobStart:
      "Industrial Park - 3500 W Miller Rd, Garland, TX",
    vehicleType: "High Pole",
    numberOfVehicles: 1,
    status: "Open",
    postedDate: "2024-12-03",
    freightDesc: "High pole for tall industrial equipment",
    commodityType: "Industrial Equipment",
    grossVehicleWeight: "72,000 lbs",
    loadWeight: "35,000 lbs",
    overHeight: "15' 4\"",
    overWidth: "9' 0\"",
    overLength: "38' 0\"",
    trailerLength: "45' 0\"",
    loadLength: "38' 0\"",
    specialHandling:
      "Critical height clearance - all overpasses and obstacles must be measured and documented",
    statesProvinces: ["TX"],
    requestedRoute:
      "I-45 South from Dallas to Houston. Route selected to avoid known low clearances. Measure all bridges and overpasses.",
    meetingLocation:
      "Industrial Park - 3500 W Miller Rd, Garland, TX",
    meetingInstructions:
      "Arrive with calibrated high pole equipment. Pre-trip inspection and height verification required. Route briefing mandatory.",
    contactName: "James Patterson",
    contactPhone: "(214) 555-0891",
    pricingType: "flat",
    baseRate: "650",
    costPerMile: "2.71",
    costPerHour: "95",
    minimumDailyRate: "600",
    specialInstructions:
      "Height clearance critical - must measure all overpasses. Document any clearances under 16ft. Slow down for bridge approaches. CB radio required.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "tx-1",
        state: "Texas",
        stateCode: "TX",
        permitNumber: "TX-2024-67890",
        jurisdiction: "Texas Department of Transportation",
        validFrom: "2024-12-10",
        validTo: "2025-03-10",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-060",
        company: "Texas High Pole Services",
        driver: "James Mitchell",
        type: "High Pole",
        experience: 17,
        rating: 4.9,
        jurisdictions: ["TX", "OK", "LA", "NM"],
        certifications: ["DOT", "P/EVO", "High Pole Certified"],
        totalTrips: 480,
        requestedDate: "2024-12-08",
        quoteStatus: "submitted",
        quoteAmount: 650,
        quoteSubmittedDate: "2024-12-11",
        notes:
          "Dallas-Houston corridor specialist. Height clearance certified.",
      },
      {
        id: "PC-062",
        company: "Lone Star Escorts",
        driver: "Rachel Thompson",
        type: "High Pole",
        experience: 11,
        rating: 4.7,
        jurisdictions: ["TX", "LA"],
        certifications: ["DOT", "High Pole Certified"],
        totalTrips: 305,
        requestedDate: "2024-12-08",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "15'4\"",
      width: "9'0\"",
      length: "38'0\"",
      weight: "35,000 lbs",
    },
    notes:
      "Texas only. Height clearance critical - must measure all overpasses.",
    price: { type: "Flat Rate", value: "$650" },
    jurisdictions: ["Texas"],
    bids: [
      {
        id: "7",
        companyName: "Texas Height Services",
        amount: 650,
        rating: 4.5,
        vehicleType: "High Pole",
        status: "Pending",
      },
    ],
  },
  // REQ-1008: CA to OR border crossing
  {
    id: "JOB-2024-202",
    tripId: "REQ-1008",
    jobTitle: "Oregon Border to Border Oversize Escort",
    title: "Oregon Border to Border Oversize Escort",
    description: "Multi-position escort through Oregon state",
    jobType: "convoy",
    origin: "California-Oregon Border",
    destination: "Oregon-Nevada Border",
    route: "280 mi",
    distance: "280 mi",
    estimatedDistance: "280 mi",
    pickupDate: "2024-12-19",
    startDate: "2024-12-19",
    startTime: "06:30",
    endDate: "2024-12-19",
    estimatedDuration: "7-9 hours",
    meetAtJobStart: "Rest Area - I-5 CA/OR Border",
    vehicleType: "Front, Rear",
    numberOfVehicles: 3,
    status: "Assigned",
    postedDate: "2024-12-10",
    freightDesc: "Multi-position escort through Oregon",
    commodityType: "Heavy Machinery",
    grossVehicleWeight: "95,000 lbs",
    loadWeight: "48,000 lbs",
    overHeight: "13' 6\"",
    overWidth: "12' 0\"",
    overLength: "55' 0\"",
    trailerLength: "60' 0\"",
    loadLength: "55' 0\"",
    specialHandling:
      "Multi-vehicle escort convoy through Oregon mountains - requires coordination between all escort vehicles",
    statesProvinces: ["OR"],
    requestedRoute:
      "I-5 North to Medford, then US-97 North to Klamath Falls, continuing east to Nevada border. Mountain routes require extra caution.",
    meetingLocation:
      "Rest Area - I-5 Northbound, CA/OR State Line",
    meetingInstructions:
      "All three escort vehicles meet at border rest area. Convoy briefing required before departure. Lead escort coordinates positioning.",
    contactName: "Jennifer Walsh",
    contactPhone: "(541) 555-0234",
    pricingType: "flat",
    baseRate: "2200",
    costPerMile: "7.86",
    costPerHour: "130",
    minimumDailyRate: "1800",
    specialInstructions:
      "Requires 2 front pilot cars and 1 rear pilot car. All vehicles must maintain constant radio communication. Mountain routes require extra caution for wide load. Watch for winter weather conditions.",
    permitSelection: "existing",
    selectedPermits: [
      {
        id: "or-1",
        state: "Oregon",
        stateCode: "OR",
        permitNumber: "OR-2024-00456",
        jurisdiction: "Oregon Department of Transportation",
        validFrom: "2024-12-15",
        validTo: "2025-03-15",
        status: "Approved",
      },
    ],
    requestedPilotCars: [
      {
        id: "PC-070",
        company: "Pacific Northwest Escorts",
        driver: "Andrew Miller",
        type: "Lead",
        experience: 19,
        rating: 5.0,
        jurisdictions: ["OR", "WA", "CA", "NV"],
        certifications: [
          "DOT",
          "P/EVO",
          "Wide Load",
          "Winter Certified",
        ],
        totalTrips: 590,
        requestedDate: "2024-12-05",
        quoteStatus: "submitted",
        quoteAmount: 1200,
        quoteSubmittedDate: "2024-12-08",
        notes:
          "Lead position 1. Oregon mountain route specialist.",
      },
      {
        id: "PC-072",
        company: "Cascade Pilot Services",
        driver: "Emily Davis",
        type: "Lead",
        experience: 13,
        rating: 4.8,
        jurisdictions: ["OR", "WA", "ID"],
        certifications: ["DOT", "P/EVO", "Winter Certified"],
        totalTrips: 380,
        requestedDate: "2024-12-05",
        quoteStatus: "submitted",
        quoteAmount: 1100,
        quoteSubmittedDate: "2024-12-08",
        notes: "Lead position 2. Winter equipment included.",
      },
      {
        id: "PC-074",
        company: "Oregon Wide Load Escorts",
        driver: "Michael Johnson",
        type: "Chase",
        experience: 10,
        rating: 4.7,
        jurisdictions: ["OR", "CA", "NV"],
        certifications: ["DOT", "Wide Load"],
        totalTrips: 290,
        requestedDate: "2024-12-05",
        quoteStatus: "pending",
        quoteAmount: null,
        quoteSubmittedDate: null,
      },
    ],
    dims: {
      height: "13'6\"",
      width: "12'0\"",
      length: "55'0\"",
      weight: "48,000 lbs",
    },
    notes:
      "Requires 2 front pilot cars and 1 rear pilot car. Oregon permit OR-2024-00456 covers full route.",
    price: { type: "Flat Rate", value: "$2,200" },
    jurisdictions: ["Oregon"],
    bids: [
      {
        id: "BID-202-1",
        companyName: "Alice Johnson Pilot Services",
        amount: 2200,
        rating: 4.9,
        vehicleType: "Multi-position",
        status: "Accepted",
        contactPerson: "Alice Johnson",
        contactPhone: "(555) 987-6543",
        contactEmail: "alice@ajpilotservices.com",
        jobStatus: "Not Started",
      },
    ],
  },
  {
    id: "JOB-1001-NEW",
    tripId: "REQ-1001",
    jobTitle: "Pennsylvania to Maryland Interstate Escort",
    title: "Pennsylvania to Maryland Interstate Escort",
    description: "Chase car escort for wide industrial equipment through PA/MD corridor",
    jobType: "chase",
    origin: "Pittsburgh, PA",
    destination: "Baltimore, MD",
    route: "248 mi",
    distance: "248 mi",
    pickupDate: "2026-02-10",
    startDate: "2026-02-10",
    startTime: "06:30",
    endDate: "2026-02-10",
    estimatedDuration: "1 day",
    estimatedDistance: "248 mi",
    meetAtJobStart: "Pittsburgh Industrial Park",
    vehicleType: "Chase",
    numberOfVehicles: 1,
    status: "Completed",
    postedDate: "2026-02-02",
    freightDesc: "Wide industrial machinery",
    commodityType: "Industrial Equipment",
    grossVehicleWeight: "86,000 lbs",
    loadWeight: "39,000 lbs",
    overHeight: '12\' 6"',
    overWidth: '13\' 0"',
    overLength: '46\' 0"',
    trailerLength: '53\' 0"',
    loadLength: '46\' 0"',
    specialHandling: "Chase car required for wide load through Pennsylvania Turnpike and I-70 corridor",
    statesProvinces: ["PA", "MD"],
    requestedRoute: "I-76 Pennsylvania Turnpike to I-70 East. Maintain rear position 500ft. Monitor for swing on curves.",
    meetingLocation: "Pittsburgh Industrial Park - 3400 Penn Ave, Pittsburgh, PA",
    meetingInstructions: "Report to Gate 3. Safety briefing at 06:15. Emergency lights and CB channel 19 required.",
    contactName: "David Patterson",
    contactPhone: "(412) 555-0789",
    pricingType: "mileage",
    baseRate: "750",
    costPerMile: "3.02",
    costPerHour: "80",
    minimumDailyRate: "700",
    specialInstructions: "Chase car escort through PA/MD corridor. Emergency lights required. Maintain safe rear distance.",
    permitSelection: "existing",
    selectedPermits: [
      { id: "pa-10", state: "Pennsylvania", stateCode: "PA", permitNumber: "PA-2026-99999", jurisdiction: "Pennsylvania DOT", validFrom: "2026-02-08", validTo: "2026-05-08", status: "Approved" },
      { id: "md-10", state: "Maryland", stateCode: "MD", permitNumber: "MD-2026-88888", jurisdiction: "Maryland DOT", validFrom: "2026-02-08", validTo: "2026-05-08", status: "Approved" }
    ],
    requestedPilotCars: [
      { position: "Chase", type: "Chase", count: 1 }
    ],
    dims: { height: '12\' 6"', width: '13\' 0"', length: '46\' 0"', weight: "39,000 lbs" },
    notes: "Chase car escort for wide machinery through PA/MD interstate corridor.",
    price: { type: "Per Mile", value: "$3.02" },
    jurisdictions: ["PA", "MD"],
    driverRating: {
      overallRating: 4.8,
      professionalism: 5,
      communication: 5,
      timeliness: 4,
      comment: "Excellent customer! Very organized, clear communication, and professional throughout. Made my job easy.",
      submittedAt: new Date("2026-02-10T15:30:00").toISOString(),
      submittedBy: "Angela Roberts",
      pilotCarCompany: "Keystone Pilot Services"
    },
    bids: [
      { 
        id: "BID-1001-NEW-1", 
        companyName: "Keystone Pilot Services", 
        driverName: "Angela Roberts",
        amount: 750, 
        rating: 4.9, 
        vehicleType: "Ford F-350", 
        status: "Accepted",
        bidType: "requested",
        jobStatus: "Completed",
        startTime: new Date("2026-02-10T06:30:00").toISOString(),
        endTime: new Date("2026-02-10T12:15:00").toISOString(),
        contactPerson: "Angela Roberts",
        contactPhone: "(717) 555-0432",
        contactEmail: "angela@keystonepilot.com",
        company: "Keystone Pilot Services",
        companyEmail: "billing@keystonepilot.com",
        invoiceApproved: true
      }
    ]
  },
];

// State-Level Jobs Interface
interface StateJob {
  id: string;
  tripId: string;
  pilotJobId?: string; // Optional link to corresponding PilotJob
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
  jobSource?: "OPEN" | "REQUESTED";
  /** True when every permit required for this job's state is approved */
  allPermitsApproved?: boolean;
  /** Present when a pilot car has completed a route survey for this job */
  routeSurvey?: RouteSurveyInfo;
}

// Mock State-Level Jobs Data
const MOCK_STATE_JOBS: StateJob[] = [
  {
    id: "JOB-CA-001",
    tripId: "REQ-1001",
    pilotJobId: "JOB-101", // Maps to first pilot job
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
    pilotJobId: "JOB-102", // Maps to second pilot job
    state: "Oregon",
    stateCode: "OR",
    entryLocation: "Oregon Welcome Center, I-5",
    entryDate: "02/15/2026",
    entryTime: "14:00",
    positions: "1x Front",
    status: "Bid Received",
    bidCount: 3,
    bidExpiryDate: "2026-02-14",
    bidExpiryTime: "17:00",
    origin: "OR/CA Border",
    destination: "Portland, OR",
  },
  {
    id: "JOB-NV-001",
    tripId: "REQ-1001",
    pilotJobId: "JOB-103", // Maps to third pilot job
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
    pilotJobId: "JOB-104", // Maps to fourth pilot job
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
    id: "JOB-UT-001",
    tripId: "REQ-1001",
    pilotJobId: "JOB-105", // Maps to fifth pilot job
    state: "Utah",
    stateCode: "UT",
    entryLocation: "St. George Welcome Center, I-15",
    entryDate: "02/18/2026",
    entryTime: "07:30",
    positions: "1x Front, 1x Rear",
    status: "In Progress",
    bidCount: 4,
    bidExpiryDate: "2026-02-11",
    bidExpiryTime: "12:00",
    assignedTo: "Mountain West Escorts",
    origin: "St. George, UT",
    destination: "Salt Lake City, UT",
  },
  {
    id: "JOB-CO-001",
    tripId: "REQ-1001",
    pilotJobId: "JOB-106", // Maps to sixth pilot job
    state: "Colorado",
    stateCode: "CO",
    entryLocation: "Grand Junction Weigh Station, I-70",
    entryDate: "02/19/2026",
    entryTime: "09:00",
    positions: "2x Front",
    status: "Completed",
    bidCount: 3,
    bidExpiryDate: "2026-02-09",
    bidExpiryTime: "16:00",
    assignedTo: "Rocky Mountain Pilot Cars",
    origin: "Grand Junction, CO",
    destination: "Denver, CO",
  },
  {
    id: "JOB-PA-MD-001",
    tripId: "REQ-1001",
    pilotJobId: "JOB-1001-NEW",
    state: "Pennsylvania / Maryland",
    stateCode: "PA/MD",
    entryLocation: "Pittsburgh Industrial Park, PA",
    entryDate: "02/10/2026",
    entryTime: "06:30",
    positions: "1x Chase",
    status: "Completed",
    bidCount: 1,
    bidExpiryDate: "2026-02-09",
    bidExpiryTime: "18:00",
    assignedTo: "Keystone Pilot Services",
    origin: "Pittsburgh, PA",
    destination: "Baltimore, MD",
  },
  // REQ-1004 — Miami, FL → Atlanta, GA (both FL and GA permits Approved)
  {
    id: "JOB-FL-401",
    tripId: "REQ-1004",
    pilotJobId: "JOB-401", // Maps to Florida Lead Escort job
    state: "Florida",
    stateCode: "FL",
    entryLocation: "Port of Miami - 1015 North America Way, Miami, FL",
    entryDate: "12/15/2024",
    entryTime: "06:00",
    positions: "1x Lead",
    status: "Assigned",
    bidCount: 3,
    bidExpiryDate: "2024-12-10",
    bidExpiryTime: "17:00",
    assignedTo: "Sunshine State Escorts",
    origin: "Miami, FL",
    destination: "FL/GA Border",
    jobSource: "OPEN",
    allPermitsApproved: true,
    routeSurvey: {
      status: "Completed",
      completedAt: "2024-12-12T10:00:00",
      surveyorName: "Sunshine State Escorts",
      observations: 6,
      distanceMiles: 375,
      observationsList: [
        {
          id: "OBS-FL-1",
          type: "load-clearance",
          title: "Low overpass clearance 14' 2\"",
          latitude: 25.984,
          longitude: -80.307,
          description:
            "Load height 15' 0\" exceeds posted clearance at the Okeechobee Rd overpass. Exit at MM 86 and rejoin via SR-91 frontage as marked on surveyed route.",
          attachments: [
            { id: "ATT-FL-1a", name: "IMG_2041.jpg", source: "camera" },
            { id: "ATT-FL-1b", name: "IMG_2042.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-12T06:42:00",
        },
        {
          id: "OBS-FL-2",
          type: "safety-hazard",
          title: "No breakdown shoulder for oversize loads",
          latitude: 27.5253,
          longitude: -80.8106,
          description:
            "Narrow shoulder through Fort Drum segment (MM 184–192). No usable breakdown shoulder for oversize loads; plan no-stop transit through this segment.",
          attachments: [
            { id: "ATT-FL-2a", name: "IMG_2057.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-12T07:10:00",
        },
        {
          id: "OBS-FL-3",
          type: "safety-hazard",
          title: "Lane closure — resurfacing work",
          latitude: 29.1872,
          longitude: -82.1401,
          description:
            "Right lane closed 06:00–18:00 near Ocala (MM 285). Single-lane escort spacing required for approx. 4 miles.",
          attachments: [
            { id: "ATT-FL-3a", name: "IMG_2065.jpg", source: "camera" },
            { id: "ATT-FL-3b", name: "roadwork_notice.jpg", source: "gallery" },
          ],
          recordedAt: "2024-12-12T07:55:00",
        },
        {
          id: "OBS-FL-4",
          type: "load-clearance",
          title: "Overhead utility lines at exit ramp",
          latitude: 29.228,
          longitude: -82.112,
          description:
            "Lines measured at 15' 9\" over the Exit 358 ramp apex. Adequate but verify with high pole before ramp use.",
          attachments: [
            { id: "ATT-FL-4a", name: "IMG_2071.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-12T08:35:00",
        },
        {
          id: "OBS-FL-5",
          type: "custom",
          title: "Tight ramp curve at Turnpike/I-75 merge",
          latitude: 28.8656,
          longitude: -82.0387,
          description:
            "25 mph advisory curve at the Wildwood interchange; trailer off-tracking observed — use full ramp width.",
          attachments: [
            { id: "ATT-FL-5a", name: "ramp_curve.jpg", source: "gallery" },
          ],
          recordedAt: "2024-12-12T08:50:00",
        },
        {
          id: "OBS-FL-6",
          type: "custom",
          title: "Suitable staging area before state line",
          latitude: 30.3305,
          longitude: -82.759,
          description:
            "Rest area at I-75 N White Springs (MM 413) has long pull-through parking available for GA escort handoff staging.",
          attachments: [
            { id: "ATT-FL-6a", name: "IMG_2089.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-12T09:40:00",
        },
      ],
    },
  },
  {
    id: "JOB-GA-402",
    tripId: "REQ-1004",
    pilotJobId: "JOB-402", // Maps to Georgia Dual Escort job
    state: "Georgia",
    stateCode: "GA",
    entryLocation: "Welcome Center - I-75 Northbound Mile Marker 2, GA",
    entryDate: "12/16/2024",
    entryTime: "08:00",
    positions: "1x Lead, 1x Chase",
    status: "Assigned",
    bidCount: 2,
    bidExpiryDate: "2024-12-11",
    bidExpiryTime: "18:00",
    assignedTo: "Peach State Pilot Services",
    origin: "FL/GA Border",
    destination: "Atlanta, GA",
    jobSource: "OPEN",
    allPermitsApproved: true,
    routeSurvey: {
      status: "Completed",
      completedAt: "2024-12-13T09:45:00",
      surveyorName: "Peach State Pilot Services",
      observations: 5,
      distanceMiles: 220,
      observationsList: [
        {
          id: "OBS-GA-1",
          type: "load-clearance",
          title: "Sign bridge clearance 15' 8\"",
          latitude: 31.4505,
          longitude: -83.5085,
          description:
            "Clearance adequate for 15' 0\" load at I-75 N MM 62 approaching Tifton, but requires centered lane position under structure.",
          attachments: [
            { id: "ATT-GA-1a", name: "IMG_3102.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-13T06:30:00",
        },
        {
          id: "OBS-GA-2",
          type: "safety-hazard",
          title: "Rough railroad crossing on detour route",
          latitude: 32.472,
          longitude: -83.732,
          description:
            "Significant grade change at the GA-401 frontage road crossing in Perry; cross at under 5 mph to protect low trailer clearance.",
          attachments: [
            { id: "ATT-GA-2a", name: "IMG_3118.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-13T08:05:00",
        },
        {
          id: "OBS-GA-3",
          type: "safety-hazard",
          title: "Shifted lanes with concrete barriers",
          latitude: 32.8065,
          longitude: -83.6974,
          description:
            "Resurfacing project on I-475 W Macon bypass (MM 5–9); 11' travel lane width — chase car must hold traffic at barrier taper.",
          attachments: [
            { id: "ATT-GA-3a", name: "IMG_3124.jpg", source: "camera" },
            { id: "ATT-GA-3b", name: "barrier_taper.jpg", source: "gallery" },
          ],
          recordedAt: "2024-12-13T07:40:00",
        },
        {
          id: "OBS-GA-4",
          type: "safety-hazard",
          title: "Heavy congestion at I-285 interchange",
          latitude: 33.9203,
          longitude: -84.3502,
          description:
            "Metro transit window restricted to 09:00–15:00 per GA DOT at the I-75 N / I-285 interchange (Exit 238). Both escorts required through interchange.",
          attachments: [
            { id: "ATT-GA-4a", name: "IMG_3140.jpg", source: "camera" },
          ],
          recordedAt: "2024-12-13T09:10:00",
        },
        {
          id: "OBS-GA-5",
          type: "custom",
          title: "Final approach staging point",
          latitude: 34.029,
          longitude: -84.388,
          description:
            "Industrial park entrance in north Atlanta has a wide, signal-controlled turn; site contact required 30 min before arrival.",
          attachments: [
            { id: "ATT-GA-5a", name: "staging_area.jpg", source: "gallery" },
          ],
          recordedAt: "2024-12-13T09:35:00",
        },
      ],
    },
  },
];

export default function ViewPermitRequest({
  permit: initialPermit,
  onBack,
}: ViewPermitRequestProps) {
  // Local state for permit to allow updates
  const [permit, setPermit] = useState(initialPermit);

  // Local state for jobs to allow updates
  const [jobs, setJobs] = useState<PilotJob[]>(MOCK_JOBS);

  const [selectedStatePermit, setSelectedStatePermit] =
    useState<PermitState | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "actions" | "jobs" | "permits" | "info" | "invoice"
  >("jobs");
  const [activeJob, setActiveJob] = useState<PilotJob | null>(
    null,
  );
  const [activeJobTab, setActiveJobTab] = useState<
    "details" | "bidding" | "invoice"
  >("details");
  const [showJobDetailsPage, setShowJobDetailsPage] =
    useState(false);
  const [addJurisdictionOpen, setAddJurisdictionOpen] =
    useState(false);
  const [selectedStates, setSelectedStates] = useState<
    string[]
  >([]);
  const [tripHistory, setTripHistory] = useState<
    Array<{ event: string; location?: string; time: string }>
  >([
    // Add mock history for completed trips
    ...(permit.status === "Completed"
      ? [
          {
            event: "Trip Completed",
            location: permit.destination,
            time: formatTime24h(new Date()),
          },
          {
            event: "Final Checkpoint",
            location: "Approaching destination",
            time: formatTime24h(new Date(Date.now() - 3600000)),
          },
          {
            event: "Rest Stop",
            location: "Midpoint rest area",
            time: formatTime24h(new Date(Date.now() - 7200000)),
          },
          {
            event: "Trip Started",
            location: permit.origin,
            time: formatTime24h(
              new Date(Date.now() - 14400000),
            ),
          },
        ]
      : []),
  ]);
  const [shareTrackingOpen, setShareTrackingOpen] =
    useState(false);
  const [routeChangeOpen, setRouteChangeOpen] = useState(false);
  const [endTripOpen, setEndTripOpen] = useState(false);
  const [approvedGroupCollapsed, setApprovedGroupCollapsed] =
    useState(false);

  // Success feedback states
  const [successMessage, setSuccessMessage] = useState<
    string | null
  >(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success message with auto-dismiss
  const displaySuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => setSuccessMessage(null), 300);
    }, 3000);
  };

  // Note: Break and waiting time tracking is now handled by the trip execution hook

  const [changeType, setChangeType] = useState<
    "route" | "time"
  >("route");
  const [newDestination, setNewDestination] = useState("");
  const [newPickupDate, setNewPickupDate] = useState("");
  const [newPickupTime, setNewPickupTime] = useState("");
  const [routeChangeReason, setRouteChangeReason] =
    useState("");
  const [requestChangeOpen, setRequestChangeOpen] =
    useState(false);
  const [logIncidentOpen, setLogIncidentOpen] = useState(false);
  const [isStartingTrip, setIsStartingTrip] = useState(false);
  const [showPostJobPage, setShowPostJobPage] = useState(false);
  const [fullScreenMapOpen, setFullScreenMapOpen] =
    useState(false);
  const [jurisdictionSearch, setJurisdictionSearch] =
    useState("");

  // Mobile-first UX states
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [mapCollapsed, setMapCollapsed] = useState(false);

  // Invoice dispute state
  const [disputeDialogOpen, setDisputeDialogOpen] =
    useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeDescription, setDisputeDescription] =
    useState("");

  // Job filter state
  const [jobFilter, setJobFilter] = useState<
    "active" | "completed"
  >("active");
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobStatusFilter, setJobStatusFilter] =
    useState<string>("all");

  // Alert state
  const [showExpiryAlert, setShowExpiryAlert] = useState(true);
  const [showMissingPilotAlert, setShowMissingPilotAlert] =
    useState(true);
  const [showRejectedPermitAlert, setShowRejectedPermitAlert] =
    useState(true);

  // Snackbar hook
  const { showSnackbar } = useSnackbar();

  // Handler for job updates from JobDetailsPage
  const handleJobUpdate = (updatedJob: PilotJob) => {
    // Update the jobs array with the new job data
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job,
      ),
    );

    // If this is the active job, update it as well
    if (activeJob && activeJob.id === updatedJob.id) {
      setActiveJob(updatedJob);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useScrollDirection(scrollRef);

  // Find related jobs for this trip FIRST (needed for jurisdiction mapping)
  const relatedJobs = jobs.filter(
    (job) => job.tripId === permit.requestId,
  );

  // Convert permit states to JurisdictionState format for trip execution
  const jurisdictions: JurisdictionState[] = permit.states.map(
    (state) => {
      // Check if this jurisdiction has pilot car jobs assigned
      const pilotJobsForJurisdiction = relatedJobs.filter(
        (job) =>
          job.jurisdictions &&
          job.jurisdictions.includes(state.code),
      );

      return {
        code: state.code,
        name: US_STATES[state.code] || state.code, // Get full state name
        status: "upcoming",
        permitStatus: state.status,
        permitNumber: state.permitNumber,
        requiresPilotCar: pilotJobsForJurisdiction.length > 0, // Only require if jobs exist
        pilotCarJobIds: pilotJobsForJurisdiction.map(
          (job) => job.id,
        ),
      };
    },
  );

  // Debug logging - Detailed breakdown
  console.log("=== TRIP DEBUG START ===");
  console.log("1. Permit Object:", permit);
  console.log("2. Request ID:", permit.requestId);
  console.log("3. Permit Status:", permit.status);
  console.log("4. Permit States Array:", permit.states);
  console.log("5. Jurisdictions Created:", jurisdictions);
  console.log("6. First Jurisdiction:", jurisdictions[0]);
  console.log(
    "7. First Jurisdiction Permit Status:",
    jurisdictions[0]?.permitStatus,
  );
  console.log(
    "8. Existing Trip State:",
    TripExecutionService.getTripState(permit.requestId),
  );
  console.log("=== TRIP DEBUG END ===");

  // TEMPORARY: Add clear function to window for testing
  if (typeof window !== "undefined") {
    (window as any).clearTripState = () => {
      TripExecutionService.clearTripState(permit.requestId);
      console.log(`Trip state cleared for ${permit.requestId}`);
      window.location.reload();
    };
    console.log(
      "💡 To reset trip state, run: clearTripState()",
    );
  }

  // Initialize trip execution hook
  const tripExecution = useTripExecution(
    permit.requestId,
    jurisdictions,
    () => {
      // On trip started - update permit status
      setPermit((prev) => ({
        ...prev,
        status: "In Transit",
        tracking: {
          status: "In Transit",
          currentLocation: permit.origin,
          nextStop: permit.destination,
          eta: "14:30",
          speed: "0 mph",
          distanceRemaining:
            prev.routeDetails?.miles || "250 miles",
          progress: 0,
        },
      }));

      const startTime = formatTime24h(new Date());
      setTripHistory((prev) => [
        {
          event: "Trip Started",
          location: permit.origin,
          time: startTime,
        },
        ...prev,
      ]);

      setIsStartingTrip(false);
    },
    () => {
      // On jurisdiction completed
      const currentJurisdiction =
        tripExecution.currentJurisdiction;
      if (currentJurisdiction) {
        const time = formatTime24h(new Date());
        setTripHistory((prev) => [
          {
            event: `Jurisdiction ${currentJurisdiction.code} Completed`,
            location: `${currentJurisdiction.code} Border`,
            time,
          },
          ...prev,
        ]);
      }
    },
    () => {
      // On trip completed
      setPermit((prev) => ({
        ...prev,
        status: "Completed",
      }));

      const time = formatTime24h(new Date());
      setTripHistory((prev) => [
        {
          event: "Trip Completed",
          location: permit.destination,
          time,
        },
        ...prev,
      ]);
    },
  );

  // Sort related jobs by priority (active first, then completed, then others)
  const sortedRelatedJobs = relatedJobs.sort((a, b) => {
    // Get job status from accepted bids
    const aAcceptedBid = a.bids.find(
      (bid: any) => bid.status === "Accepted",
    );
    const bAcceptedBid = b.bids.find(
      (bid: any) => bid.status === "Accepted",
    );
    const aIsActive = aAcceptedBid?.jobStatus === "In Progress";
    const bIsActive = bAcceptedBid?.jobStatus === "In Progress";

    // Active jobs first
    if (aIsActive && !bIsActive) return -1;
    if (!aIsActive && bIsActive) return 1;

    // Then completed jobs
    const aIsCompleted = a.status === "Completed";
    const bIsCompleted = b.status === "Completed";
    if (aIsCompleted && !bIsCompleted) return -1;
    if (!aIsCompleted && bIsCompleted) return 1;

    return 0;
  });

  // Filter state-level jobs for this trip
  const relatedStateJobs = MOCK_STATE_JOBS.filter(
    (job) => job.tripId === permit.requestId,
  );

  // Search-filtered state jobs
  const searchFilteredStateJobs = jobSearchQuery.trim()
    ? relatedStateJobs.filter((job) => {
        const q = jobSearchQuery.toLowerCase();
        return (
          job.id.toLowerCase().includes(q) ||
          job.state.toLowerCase().includes(q) ||
          job.stateCode.toLowerCase().includes(q) ||
          job.origin.toLowerCase().includes(q) ||
          job.destination.toLowerCase().includes(q) ||
          job.entryLocation.toLowerCase().includes(q) ||
          job.positions.toLowerCase().includes(q) ||
          job.status.toLowerCase().includes(q) ||
          (job.assignedTo &&
            job.assignedTo.toLowerCase().includes(q))
        );
      })
    : relatedStateJobs;

  // Status filter counts (based on search-filtered results)
  const jobStatusCounts = {
    total: searchFilteredStateJobs.length,
    openForBidding: searchFilteredStateJobs.filter(
      (j) => j.status === "Open for Bidding",
    ).length,
    bidReceived: searchFilteredStateJobs.filter(
      (j) => j.status === "Bid Received",
    ).length,
    biddingClosed: searchFilteredStateJobs.filter(
      (j) => j.status === "Bidding Closed",
    ).length,
    assigned: searchFilteredStateJobs.filter(
      (j) => j.status === "Assigned",
    ).length,
    inProgress: searchFilteredStateJobs.filter(
      (j) => j.status === "In Progress",
    ).length,
    completed: searchFilteredStateJobs.filter(
      (j) => j.status === "Completed",
    ).length,
    expired: searchFilteredStateJobs.filter(
      (j) => j.status === "Expired",
    ).length,
  };

  // Build filter tabs dynamically — only show statuses that have jobs
  const jobFilterTabs: {
    key: string;
    label: string;
    count: number;
  }[] = [
    { key: "all", label: "All", count: jobStatusCounts.total },
    {
      key: "Open for Bidding",
      label: "Open",
      count: jobStatusCounts.openForBidding,
    },
    {
      key: "Bid Received",
      label: "Bids In",
      count: jobStatusCounts.bidReceived,
    },
    {
      key: "Bidding Closed",
      label: "Closed",
      count: jobStatusCounts.biddingClosed,
    },
    {
      key: "Assigned",
      label: "Assigned",
      count: jobStatusCounts.assigned,
    },
    {
      key: "In Progress",
      label: "Active",
      count: jobStatusCounts.inProgress,
    },
    {
      key: "Completed",
      label: "Done",
      count: jobStatusCounts.completed,
    },
    {
      key: "Expired",
      label: "Expired",
      count: jobStatusCounts.expired,
    },
  ].filter((f) => f.key === "all" || f.count > 0);

  // Final filtered jobs (search + status filter)
  const finalFilteredStateJobs =
    jobStatusFilter === "all"
      ? searchFilteredStateJobs
      : searchFilteredStateJobs.filter(
          (j) => j.status === jobStatusFilter,
        );

  // Scroll position is now retained when switching tabs
  // Removed: Reset scroll position when switching tabs

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-600";
      case "Draft":
        return "bg-gray-500";
      case "Requires Revision":
        return "bg-amber-600";
      case "Submitted":
        return "bg-blue-600";
      case "Rejected":
        return "bg-red-600";
      case "Expired":
        return "bg-gray-400";
      case "In Transit":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case "Requires Revision":
        return <AlertCircle className="w-4 h-4 mr-1" />;
      case "Submitted":
        return <Clock className="w-4 h-4 mr-1" />;
      case "In Transit":
        return <Truck className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-[#E3F2FD] text-[#1E88E5] border-[#BBDEFB]";
      case "Assigned":
        return "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]";
      case "In Transit":
        return "bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]";
      case "Bid Submitted":
        return "bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]";
      case "Action Required":
        return "bg-[#FDECEA] text-[#C62828] border-[#EF9A9A]";
      case "Completed":
        return "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]";
      case "Cancelled":
        return "bg-[#FDECEA] text-[#C62828] border-transparent";
      case "On Hold":
        return "bg-[#FFF8E1] text-[#F9A825] border-transparent";
      case "Draft":
        return "bg-[#F5F5F5] text-[#757575] border-transparent";
      case "Survey Completed":
        return "bg-[#E0F2F1] text-[#00897B] border-transparent";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Helper to ensure we have data even if missing (for demo of older records)
  const truck = permit.truck || {
    unit: "TRK-2025",
    plate: "DEF-5678",
    make: "Kenworth",
    year: "2022",
    vin: "1M123456789ABC",
    axleConfig: "3 Axle",
    grossWeight: "80,000 lbs",
    unladenWeight: "18,000 lbs",
  };
  const trailer = permit.trailer || {
    unit: "TRL-5001",
    plate: "TLR-9988",
    type: "Flatbed",
    length: "53 ft",
    axles: "2",
    width: "102 in",
  };
  const driverDetails = permit.driverDetails || {
    name: permit.driver,
    license: "D12345678",
    state: "NY",
    phone: "(555) 123-4567",
  };
  const load = permit.load || {
    type: "Excavator",
    description: "Heavy machinery transport",
    width: "8.5 ft",
    height: "10 ft",
    length: "20 ft",
    weight: "45,000 lbs",
  };
  const routeDetails = permit.routeDetails || { miles: "215" };

  // Get available states (not already in permit)
  const existingStateCodes = permit.states.map((s) => s.code);
  const availableStates = US_STATES.filter(
    (state) => !existingStateCodes.includes(state.code),
  );

  // Toggle state selection
  const toggleStateSelection = (stateCode: string) => {
    setSelectedStates((prev) =>
      prev.includes(stateCode)
        ? prev.filter((code) => code !== stateCode)
        : [...prev, stateCode],
    );
  };

  // Handle adding jurisdictions
  const handleAddJurisdictions = () => {
    // In a real app, this would make an API call to add the selected states
    console.log("Adding jurisdictions:", selectedStates);
    alert(
      `Adding ${selectedStates.length} jurisdiction(s): ${selectedStates.join(", ")}\n\nIn a real application, this would submit to the server and update the permit.`,
    );
    setSelectedStates([]);
    setAddJurisdictionOpen(false);
  };

  // Handle starting the trip
  const handleStartTrip = async () => {
    // Use the trip execution service to start the trip
    // This will:
    // 1. Validate that first jurisdiction has approved permit
    // 2. Change trip status to 'In Transit'
    // 3. Activate first jurisdiction
    // 4. Send automatic pilot car notifications
    await tripExecution.startTrip();
  };

  // Handle sharing tracking link
  const handleShareTracking = (method: string) => {
    console.log("Sharing tracking link via:", method);
    alert(
      `Sharing tracking link via ${method}!\n\nIn a real application, this would generate a secure tracking URL and share it via ${method}.`,
    );
    setShareTrackingOpen(false);
  };

  // Handle requesting changes
  const handleRequestChange = (
    type: string,
    details: string,
  ) => {
    console.log("Requesting change:", type, details);
    alert(
      `Request submitted: ${type}\n\nDetails: ${details}\n\nIn a real application, this would notify dispatch and update the trip record.`,
    );
    setRequestChangeOpen(false);
  };

  // Handle logging incident
  const handleLogIncident = (
    incidentType: string,
    description: string,
  ) => {
    const time = formatTime24h(new Date());
    const newEvent = {
      event: `Incident: ${incidentType}`,
      location: permit.tracking?.currentLocation || "Unknown",
      time: time,
    };
    setTripHistory((prev) => [newEvent, ...prev]);
    console.log("Logging incident:", incidentType, description);
    alert(
      `Incident logged: ${incidentType}\n\nDescription: ${description}\n\nTime: ${time}\n\nIn a real application, this would create an incident report and alert dispatch.`,
    );
    setLogIncidentOpen(false);
  };

  // Get current and next state permit
  const getCurrentPermitState = () => {
    const approvedStates = permit.states.filter(
      (s) => s.status === "Approved",
    );
    const rejectedStates = permit.states.filter(
      (s) => s.status === "Rejected" || s.status === "Pending",
    );
    return {
      current: approvedStates[0] || permit.states[0],
      next: approvedStates[1] || permit.states[1],
      attention: rejectedStates[0],
    };
  };

  // Helper: Check if permit is expiring soon (within 3 days)
  const isPermitExpiringSoon = () => {
    const expiryDate = new Date(permit.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry > 0 && daysUntilExpiry <= 3;
  };

  // Helper: Check if permit is expired
  const isPermitExpired = () => {
    const expiryDate = new Date(permit.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  // Helper: Calculate days until expiry
  const getDaysUntilExpiry = () => {
    const expiryDate = new Date(permit.expiryDate);
    const today = new Date();
    return Math.ceil(
      (expiryDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24),
    );
  };

  // Helper: Check if any permits are rejected
  const hasRejectedPermits = () => {
    return permit.states.some(
      (state) => state.status === "Rejected",
    );
  };

  // Helper: Check if pilot cars are missing for states that need them
  const isMissingPilotCars = () => {
    // Check if there are states with approved permits but no assigned pilot cars
    const statesNeedingEscort = permit.states.filter(
      (state) => state.status === "Approved",
    );
    return (
      statesNeedingEscort.length > 0 &&
      relatedStateJobs.filter(
        (job) =>
          job.status === "Assigned" ||
          job.status === "In Progress",
      ).length === 0
    );
  };

  if (showPostJobPage) {
    return (
      <PostJobPage
        onBack={() => setShowPostJobPage(false)}
        onSave={(data) => {
          console.log("Job saved:", data);
          const allocation = data?.allocation;
          const message =
            allocation?.mode === "group"
              ? `Job posted to ${allocation.groupName}`
              : "Job posted to all qualified pilot cars";
          showSnackbar(message, "success");
          setShowPostJobPage(false);
        }}
        loadInfo={{
          type: permit.load?.type || "Excavator",
          description:
            permit.load?.description ||
            "Heavy machinery transport",
          width: permit.load?.width || "12.5",
          height: permit.load?.height || "14.0",
          length: permit.load?.length || "65.0",
          weight: permit.load?.weight || "80000",
          commodityType: "Heavy Equipment",
          specialHandling:
            "Requires careful handling due to oversize dimensions. Avoid low clearance routes.",
          trailerLength: "53.0",
          loadLength: "48.0",
          loadWeight: "45000",
        }}
        tripId={permit.requestId}
        routeOrigin={permit.origin}
        routeDestination={permit.destination}
        routeStartDate={permit.effectiveDate}
        routeStates={permit.states.map((s) => s.code)}
        tripPermits={permit.states.map((state, index) => ({
          id: `${permit.requestId}-${state.code}-${index}`,
          name: `${state.code} State Permit`,
          state: state.code,
        }))}
      />
    );
  }

  if (fullScreenMapOpen) {
    return (
      <LiveMapDriving
        tripId={permit.requestId}
        route={`${permit.origin} - ${permit.destination}`}
        currentLocation={permit.tracking?.currentLocation}
        eta={permit.tracking?.eta}
        speed={permit.tracking?.speed}
        onBack={() => setFullScreenMapOpen(false)}
      />
    );
  }

  return (
    <div
      className="flex flex-col w-full h-full bg-[#f6f6f6] overflow-y-auto"
      ref={scrollRef}
    >
      <div className="relative z-20 bg-[#f6f6f6] flex flex-col">
        {/* Content Area */}
        <div className="flex-1">
          {/* Full-Screen Map Section - Only show for In Transit trips */}
          {permit.status === "In Transit" &&
            permit.tracking && (
              <div className="relative w-full h-[200px] bg-gray-200">
                {/* Map Image - Full Bleed */}
                <img
                  src={trackingMapImage}
                  alt="Route map"
                  className="w-full h-full object-cover"
                />

                {/* Bottom gradient for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

                {/* Floating Overlay Controls */}

                {/* Back Button - Top Left */}
                <button
                  onClick={onBack}
                  className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>

                {/* Merged Info Card - Single floating card with all info */}
                <div className="absolute top-3 left-16 right-3"></div>

                {/* Maximize Button - Bottom Right */}
                <button
                  onClick={() => setFullScreenMapOpen(true)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#F89823] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  aria-label="Maximize map"
                >
                  <Maximize2 className="w-4 h-4 text-[#1a1a1a]" />
                </button>
              </div>
            )}

          {/* Trip ID + Tabs Container with White Background */}
          <div className="bg-white shadow-[0px_1px_4px_0px_rgba(95,95,95,0.12)]">
            {/* Trip Summary Card */}
            <div className="px-4 pt-2">
              <div className="py-2 flex items-center justify-between gap-3">
                {/* Back button for Open status trips */}
                {permit.status === "Open" && (
                  <button
                    onClick={onBack}
                    className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors shrink-0"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
                  </button>
                )}
                {/* Back button for Completed status trips */}
                {permit.status === "Completed" && (
                  <button
                    onClick={onBack}
                    className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors shrink-0"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
                  </button>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#101828] truncate text-[16px]">
                    {permit.origin} → {permit.destination}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Trip {permit.requestId}
                  </p>
                </div>
                <div
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium shrink-0"
                  style={{
                    backgroundColor: "#FFF7ED",
                    borderColor: "#FED7AA",
                    color: "#C2410C",
                  }}
                  role="status"
                  aria-label={`Trip status: ${permit.status}`}
                >
                  {permit.status === "In Transit" ? (
                    <>
                      <Truck className="w-3 h-3 mr-1" />
                      {permit.status}
                    </>
                  ) : (
                    permit.status
                  )}
                </div>
              </div>
            </div>

            {/* Main Content - Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(
                  value as
                    | "actions"
                    | "jobs"
                    | "bids"
                    | "permits"
                    | "info"
                    | "invoice",
                )
              }
              className="flex flex-col"
            >
              {/* Tabs List */}
              <div className="sticky top-0 bg-white z-10">
                <SegmentedTabControl
                  activeTab={activeTab}
                  onTabChange={(tab) =>
                    setActiveTab(
                      tab as
                        | "actions"
                        | "jobs"
                        | "permits"
                        | "info"
                        | "invoice",
                    )
                  }
                  tabs={[
                    {
                      value: "jobs",
                      label: "Jobs",
                      badge:
                        relatedStateJobs.length > 0
                          ? relatedStateJobs.length
                          : undefined,
                    },
                    { value: "actions", label: "Activities" },
                    { value: "permits", label: "Permits" },
                    { value: "info", label: "Details" },
                    {
                      value: "invoice",
                      label: "Invoice",
                      badge: (() => {
                        const pendingInvoices =
                          relatedJobs.filter(
                            (job) =>
                              job.acceptedBid?.jobStatus ===
                                "Completed" &&
                              !job.acceptedBid?.invoiceApproved,
                          ).length;
                        return pendingInvoices > 0
                          ? pendingInvoices
                          : undefined;
                      })(),
                    },
                  ]}
                />
              </div>

              {/* Tab Contents */}
              <div className="w-full min-w-0 bg-[#f6f6f6]">
                {/* Quick Actions Tab */}
                {/* Controls Tab - Mobile-First Simplified */}
                <TabsContent
                  value="actions"
                  className="mt-0 pb-24 min-w-0 flex flex-col h-full"
                >
                  {/* Success Feedback Banner */}
                  {showSuccess && successMessage && (
                    <div className="mx-4 mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg animate-in slide-in-from-top-2 duration-300 shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <p className="text-sm font-semibold text-green-900">
                          {successMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Critical Alert — Non-disruptive inline banner */}
                  {permit.status === "In Transit" &&
                    permit.expiryDate &&
                    new Date(permit.expiryDate).getTime() -
                      new Date().getTime() <
                      24 * 60 * 60 * 1000 && (
                      <div className="mx-4 mt-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <p className="text-xs text-amber-800 flex-1">
                            Permit expires in 1 day
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-700 hover:text-amber-900 text-xs h-7 px-2.5"
                            onClick={() =>
                              setActiveTab("permits")
                            }
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    )}

                  {/* Trip Completed Summary */}
                  {permit.status === "Completed" && (
                    <div className="px-4 pt-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm text-green-900">
                              Trip Completed
                            </h3>
                            <p className="text-xs text-green-600 mt-0.5">
                              {formatDate(new Date())} •{" "}
                              {permit.routeDetails?.miles ||
                                "0"}{" "}
                              miles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Break Active Banner */}
                  {tripExecution.isBreakActive &&
                    permit.status === "In Transit" && (
                      <div className="mx-4 mt-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                          <Timer className="h-4 w-4 text-blue-600 animate-pulse flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-blue-800">
                              Break in progress — timer paused
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Activity Timeline — In Transit */}
                  {permit.status === "In Transit" && (
                    <div className="px-4 pt-4 pb-28 space-y-3">
                      {/* Current Jurisdiction — Compact status card */}
                      {tripExecution.currentJurisdiction && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-gradient-to-r from-[#F89823]/10 to-transparent px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#F89823]/15 flex items-center justify-center">
                                  <Navigation className="h-4 w-4 text-[#F89823]" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                    Now in
                                  </p>
                                  <p className="text-base text-gray-900">
                                    {tripExecution
                                      .currentJurisdiction
                                      .name ||
                                      tripExecution
                                        .currentJurisdiction
                                        .code}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                  Entered
                                </p>
                                <p className="text-sm text-gray-900 tabular-nums">
                                  {tripExecution
                                    .currentJurisdiction
                                    .enteredAt
                                    ? formatTime24h(
                                        tripExecution
                                          .currentJurisdiction
                                          .enteredAt,
                                      )
                                    : "--:--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Inline Summary — always visible at a glance */}
                          <div className="grid grid-cols-3 divide-x divide-gray-100">
                            <div className="px-3 py-2.5 text-center">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                Drive
                              </p>
                              <p className="text-sm text-gray-900 tabular-nums mt-0.5">
                                8h 30m
                              </p>
                            </div>
                            <div className="px-3 py-2.5 text-center">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                Break
                              </p>
                              <p className="text-sm text-gray-900 tabular-nums mt-0.5">
                                1h 15m
                              </p>
                            </div>
                            <div className="px-3 py-2.5 text-center">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                Wait
                              </p>
                              <p className="text-sm text-gray-900 tabular-nums mt-0.5">
                                2h 05m
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Timeline Card */}
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* ── Today Group ────────────────────── */}
                        <div className="px-4 pt-4 pb-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                              Today
                            </span>
                            <span className="text-[10px] text-gray-300">
                              •
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {formatDate(
                                new Date(2026, 1, 15),
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="relative px-4">
                          {/* Timeline vertical line */}
                          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-gray-100" />

                          {/* ── CURRENT: Layover (highlighted) ── */}
                          <div className="relative flex gap-3 py-3">
                            <div className="relative z-10 shrink-0 mt-0.5">
                              <div className="w-[14px] h-[14px] rounded-full bg-[#3b82f6] shadow-[0_0_0_4px_rgba(59,130,246,0.15)]">
                                <div className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-30" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 -mt-0.5">
                              <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3">
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <span className="inline-flex items-center rounded-full bg-blue-600 px-1.5 py-[1px] text-[9px] text-white uppercase tracking-wider">
                                        Current
                                      </span>
                                    </div>
                                    <p className="text-sm text-[#101828]">
                                      Layover — Mike Johnson
                                    </p>
                                  </div>
                                  <span className="text-sm text-gray-900 tabular-nums shrink-0">
                                    14:15
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    Mile Marker 234, I-76 PA
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    45 min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Rest Break ── */}
                          <div className="relative flex gap-3 py-2.5">
                            <div className="relative z-10 shrink-0 mt-1.5">
                              <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b] border-2 border-white shadow-[0_0_0_1px_rgba(245,158,11,0.3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm text-[#101828]">
                                    Rest Break — Sarah Williams
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Exit 142, OH
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm text-gray-900 tabular-nums">
                                    12:30
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    30 min
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Waiting at Scale ── */}
                          <div className="relative flex gap-3 py-2.5">
                            <div className="relative z-10 shrink-0 mt-1.5">
                              <div className="w-[10px] h-[10px] rounded-full bg-[#ef4444] border-2 border-white shadow-[0_0_0_1px_rgba(239,68,68,0.3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm text-[#101828]">
                                    Waiting at Scale
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    OH Weigh Station — I-70
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm text-gray-900 tabular-nums">
                                    11:45
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    1h 15m
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Fuel Stop (past — reduced weight) ── */}
                          <div className="relative flex gap-3 py-2.5 opacity-50">
                            <div className="relative z-10 shrink-0 mt-1.5">
                              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border-2 border-white shadow-[0_0_0_1px_rgba(209,213,219,0.3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm text-gray-700">
                                    Fuel Stop
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Flying J — Exit 156, PA
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm text-gray-500 tabular-nums">
                                    10:30
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    20 min
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Entered OH (past — reduced weight) ── */}
                          <div className="relative flex gap-3 py-2.5 opacity-50">
                            <div className="relative z-10 shrink-0 mt-1.5">
                              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border-2 border-white shadow-[0_0_0_1px_rgba(209,213,219,0.3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm text-gray-700">
                                    Entered OH
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Ohio State Line
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm text-gray-500 tabular-nums">
                                    09:15
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Yesterday Group ────────────────────── */}
                        <div className="px-4 pt-4 pb-1 border-t border-gray-100 mt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                              Yesterday
                            </span>
                            <span className="text-[10px] text-gray-300">
                              •
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {formatDate(
                                new Date(2026, 1, 14),
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="relative px-4 pb-4">
                          {/* Timeline vertical line */}
                          <div className="absolute left-[25px] top-0 bottom-4 w-[2px] bg-gray-100" />

                          {/* ── Trip Started (oldest — most faded) ── */}
                          <div className="relative flex gap-3 py-2.5 opacity-40">
                            <div className="relative z-10 shrink-0 mt-1.5">
                              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border-2 border-white shadow-[0_0_0_1px_rgba(209,213,219,0.3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm text-gray-700">
                                    Trip Started
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Pittsburgh, PA
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm text-gray-500 tabular-nums">
                                    06:00
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Total Time — Featured Summary */}
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                            Trip Summary
                          </p>
                          <span className="text-[10px] text-gray-400">
                            6 activities
                          </span>
                        </div>
                        <div className="px-4 py-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                              <span className="text-xs text-gray-500">
                                Drive Time
                              </span>
                            </div>
                            <span className="text-xs text-gray-900 tabular-nums">
                              8h 30m
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-xs text-gray-500">
                                Break Time
                              </span>
                            </div>
                            <span className="text-xs text-gray-900 tabular-nums">
                              1h 15m
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                              <span className="text-xs text-gray-500">
                                Waiting Time
                              </span>
                            </div>
                            <span className="text-xs text-gray-900 tabular-nums">
                              2h 05m
                            </span>
                          </div>
                        </div>
                        {/* Total — Visually separated & prominent */}
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                          <span className="text-sm text-gray-900">
                            Total Time
                          </span>
                          <span className="text-lg text-gray-900 tabular-nums">
                            11h 50m
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No Activities - For non-In Transit statuses */}
                  {permit.status !== "In Transit" &&
                    permit.status !== "Completed" && (
                      <div className="px-4 pt-4 pb-28 flex items-center justify-center">
                        <div className="text-center py-12">
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Activity className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            No Activities Yet
                          </h3>
                          <p className="text-xs text-gray-500 max-w-xs mx-auto">
                            Activity tracking will begin once
                            the trip is in transit
                          </p>
                        </div>
                      </div>
                    )}

                  {/* Preserved comment anchors for feature stubs */}
                  {/* Trip Controls - Moved to More Options drawer */}
                  {/* Communication - Moved to More Options drawer */}
                  {/* Documents - Moved to More Options drawer */}
                  {/* Advanced - Moved to More Options drawer */}
                  {/* Pilot Car Status - Hidden for mobile-first simplification, available in Jobs tab */}
                  {/* Trip History - Hidden for mobile-first simplification, focus on actions */}
                </TabsContent>

                {/* Pilot Car Jobs Tab */}
                <TabsContent
                  value="jobs"
                  className="mt-0 pb-32 max-w-3xl mx-auto min-w-0"
                >
                  {/* Alerts for Jobs Tab */}
                  {relatedStateJobs.length > 0 && (
                    null
                  )}

                  {/* Jobs Header + Search + Filters — White Card */}
                  {relatedStateJobs.length > 0 &&
                    (() => {
                      const actionNeededCount =
                        relatedStateJobs.filter(
                          (j) =>
                            j.status === "Open for Bidding" ||
                            j.status === "Bid Received" ||
                            j.status === "Bidding Closed",
                        ).length;
                      return (
                        <div className="w-full bg-white border-b border-[#e6e3df] shadow-[0px_1px_4px_0px_rgba(95,95,95,0.12)]">
                          {/* Search and Filter Bar */}
                          <div className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {/* Search Input */}
                              <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type="text"
                                  placeholder="Search jobs by state, location, ID..."
                                  value={jobSearchQuery}
                                  onChange={(e) =>
                                    setJobSearchQuery(
                                      e.target.value,
                                    )
                                  }
                                  className="pl-9 h-10 bg-white border-gray-200 text-sm"
                                />
                                {jobSearchQuery && (
                                  <button
                                    onClick={() =>
                                      setJobSearchQuery("")
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                  >
                                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                  </button>
                                )}
                              </div>

                              {/* Filter Dropdown */}
                              <Select
                                value={jobStatusFilter}
                                onValueChange={(
                                  value: string,
                                ) => setJobStatusFilter(value)}
                              >
                                <SelectTrigger className="w-[100px] h-10 bg-white border-gray-200 text-sm">
                                  <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {jobFilterTabs.map(
                                    (filter) => (
                                      <SelectItem
                                        key={filter.key}
                                        value={filter.key}
                                      >
                                        {filter.label} (
                                        {filter.count})
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  <div className="p-4 space-y-6">
                    {finalFilteredStateJobs.length > 0 ? (
                      <>
                        <div>
                          {/* State-Level Jobs List */}
                          <StateJobsList
                            jobs={finalFilteredStateJobs}
                            hideFilters
                            onJobClick={(job) => {
                              // Find corresponding old job format for drawer
                              let oldFormatJob;

                              // First, try to use explicit pilotJobId mapping if available
                              if (job.pilotJobId) {
                                oldFormatJob = jobs.find(
                                  (j) =>
                                    j.id === job.pilotJobId,
                                );
                              }

                              // Second, try to match by tripId AND stateCode
                              if (!oldFormatJob) {
                                oldFormatJob = jobs.find(
                                  (j) =>
                                    j.tripId === job.tripId &&
                                    j.statesProvinces?.includes(
                                      job.stateCode,
                                    ),
                                );
                              }

                              // Fallback: just match by tripId (take first match)
                              if (!oldFormatJob) {
                                oldFormatJob = jobs.find(
                                  (j) =>
                                    j.tripId === job.tripId,
                                );
                              }

                              if (oldFormatJob) {
                                // Fix status for jobs with "Open" status that have bids
                                const fixedJob = oldFormatJob.status === "Open" && oldFormatJob.bids && oldFormatJob.bids.length > 0
                                  ? { ...oldFormatJob, status: "Open for Bidding" as any }
                                  : oldFormatJob;
                                setActiveJob(fixedJob);
                                // Open to Bidding tab for jobs in bidding workflow
                                const biddingStatuses = [
                                  "Open for Bidding",
                                  "Bid Received",
                                  "Bidding Closed",
                                ];
                                const initialTab =
                                  biddingStatuses.includes(
                                    fixedJob.status as any,
                                  )
                                    ? "bidding"
                                    : "details";
                                setActiveJobTab(initialTab);
                                setShowJobDetailsPage(true);
                              }
                            }}
                            onAssign={(job) => {
                              // Handle assignment logic
                              console.log("Assign job:", job);
                            }}
                            onEndBidding={(job) => {
                              // Handle end bidding logic
                              console.log("End bidding:", job);
                            }}
                          />

                          {/* Old job list - hidden for reference */}
                          <div className="hidden">
                            <div className="space-y-3 w-full min-w-0">
                              {relatedJobs.map((job) => {
                                const acceptedBid =
                                  job.bids.find(
                                    (bid: any) =>
                                      bid.status === "Accepted",
                                  );
                                const isActive =
                                  acceptedBid?.jobStatus ===
                                  "In Progress";
                                const isCompleted =
                                  job.status === "Completed" ||
                                  acceptedBid?.jobStatus ===
                                    "Completed";

                                return (
                                  <Card
                                    key={job.id}
                                    className={`shadow-sm overflow-hidden transition-all relative w-full min-w-0 ${
                                      isActive
                                        ? "border-2 border-green-500 shadow-lg"
                                        : "border-gray-200"
                                    }`}
                                  >
                                    {/* Active Job Indicator */}

                                    <CardContent
                                      className="p-4 w-full min-w-0 cursor-pointer hover:bg-gray-50 transition-colors"
                                      onClick={() => {
                                        // Fix status for jobs with "Open" status that have bids
                                        const fixedJob = job.status === "Open" && job.bids && job.bids.length > 0
                                          ? { ...job, status: "Open for Bidding" as any }
                                          : job;
                                        setActiveJob(fixedJob);
                                        setActiveJobTab(
                                          "details",
                                        );
                                        setShowJobDetailsPage(
                                          true,
                                        );
                                      }}
                                    >
                                      <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-sm font-bold text-gray-900">
                                            {job.id}
                                          </span>
                                          <Badge
                                            variant="secondary"
                                            className={`${getJobStatusColor(isActive ? "In Transit" : job.status)} border text-xs px-2 py-0`}
                                          >
                                            {isActive
                                              ? "Active"
                                              : job.status}
                                          </Badge>
                                          {job.jobType && (
                                            <Badge
                                              variant="outline"
                                              className="bg-gray-50 text-gray-600 border-gray-200 text-xs"
                                            >
                                              {job.jobType ===
                                              "survey"
                                                ? "Survey"
                                                : job.jobType ===
                                                    "convoy"
                                                  ? "Convoy"
                                                  : job.jobType
                                                      .split(
                                                        ",",
                                                      )
                                                      .map(
                                                        (t) =>
                                                          t
                                                            .charAt(
                                                              0,
                                                            )
                                                            .toUpperCase() +
                                                          t.slice(
                                                            1,
                                                          ),
                                                      )
                                                      .join(
                                                        ", ",
                                                      )}
                                            </Badge>
                                          )}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          {formatDate(
                                            job.pickupDate,
                                          )}
                                        </span>
                                      </div>

                                      {/* Job Title (if available) */}
                                      {job.jobTitle && (
                                        <h3 className="font-bold text-gray-900 mb-2">
                                          {job.jobTitle}
                                        </h3>
                                      )}

                                      {/* Route */}
                                      <div className="font-medium text-gray-700 flex items-center flex-wrap gap-2 mb-2 text-sm">
                                        {job.origin}
                                        <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                                        {job.destination}
                                      </div>

                                      {/* Commodity Type & GVW */}
                                      <div className="grid grid-cols-2 gap-2 mb-3 w-full min-w-0">
                                        {job.pilotCarJobInfo
                                          ?.commodityType && (
                                          <div className="text-xs min-w-0">
                                            <span className="text-gray-500">
                                              Commodity:{" "}
                                            </span>
                                            <span className="font-medium text-gray-900">
                                              {
                                                job
                                                  .pilotCarJobInfo
                                                  .commodityType
                                              }
                                            </span>
                                          </div>
                                        )}
                                        {job.pilotCarJobInfo
                                          ?.grossVehicleWeight && (
                                          <div className="text-xs min-w-0">
                                            <span className="text-gray-500">
                                              GVW:{" "}
                                            </span>
                                            <span className="font-medium text-gray-900">
                                              {parseInt(
                                                job
                                                  .pilotCarJobInfo
                                                  .grossVehicleWeight,
                                              ).toLocaleString()}{" "}
                                              lbs
                                            </span>
                                          </div>
                                        )}
                                      </div>

                                      <p className="text-sm text-gray-600 mb-3">
                                        {job.freightDesc}
                                      </p>

                                      {/* Enhanced Details Grid - 2 columns instead of 3, removed Distance */}
                                      <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-100 mb-3 w-full min-w-0">
                                        <div className="space-y-1 min-w-0">
                                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            Required
                                          </span>
                                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                            <Truck className="h-3.5 w-3.5 text-[#0066cc] flex-shrink-0" />
                                            <span className="truncate">
                                              {
                                                job.numberOfVehicles
                                              }
                                              x{" "}
                                              {job.vehicleType}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            Bids
                                          </span>
                                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                            <Users className="h-3.5 w-3.5 text-[#0066cc] flex-shrink-0" />
                                            <span className="truncate">
                                              {job.bids.length}{" "}
                                              {job.bids
                                                .length === 1
                                                ? "Bid"
                                                : "Bids"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Price and Jurisdictions */}
                                      <div className="flex items-center justify-between mb-4">
                                        {job.price && (
                                          <div className="flex items-center gap-1 text-sm font-semibold text-green-700">
                                            {/* <DollarSign className="w-4 h-4" /> */}
                                            <span>
                                              {job.price.value}{" "}
                                              {job.price
                                                .type ===
                                              "Per Mile"
                                                ? "/mi"
                                                : ""}
                                            </span>
                                          </div>
                                        )}
                                        {job.jurisdictions &&
                                          job.jurisdictions
                                            .length > 0 && (
                                            <Badge
                                              variant="outline"
                                              className="bg-gray-50 text-gray-700 border-gray-200 text-xs"
                                            >
                                              <MapPin className="w-3 h-3 mr-1" />
                                              {getStateCodes(
                                                job.jurisdictions,
                                              ).join(", ")}
                                            </Badge>
                                          )}
                                      </div>

                                      {/* Full-Width Stacked CTA Buttons */}
                                      <div className="space-y-2 w-full">
                                        {job.status ===
                                          "Open" && (
                                          <Button
                                            variant="outline"
                                            className="w-full justify-center h-11 border-[#0066cc] text-[#0066cc] hover:bg-blue-50"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveJob(job);
                                              setActiveJobTab(
                                                "bidding",
                                              );
                                              setShowJobDetailsPage(
                                                true,
                                              );
                                            }}
                                          >
                                            <Users className="mr-2 h-4 w-4" />
                                            <span className="font-medium">
                                              View Bids (
                                              {job.bids.length})
                                            </span>
                                          </Button>
                                        )}

                                        {(job.status ===
                                          "Assigned" ||
                                          isActive) && (
                                          <Button
                                            variant="outline"
                                            className="w-full justify-center h-11 border-blue-600 text-blue-600 hover:bg-blue-50"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveJob(job);
                                              setActiveJobTab(
                                                "details",
                                              );
                                              setShowJobDetailsPage(
                                                true,
                                              );
                                            }}
                                          >
                                            <Eye className="mr-1 h-4 w-4" />
                                            <span className="font-medium">
                                              View Details
                                            </span>
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                          </Button>
                                        )}

                                        {isCompleted && (
                                          <>
                                            <Button
                                              variant="outline"
                                              className="w-full justify-center h-11 border-[#0066cc] text-[#0066cc] hover:bg-blue-50"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveJob(
                                                  job,
                                                );
                                                setActiveJobTab(
                                                  "invoice",
                                                );
                                                setShowJobDetailsPage(
                                                  true,
                                                );
                                              }}
                                            >
                                              <Receipt className="mr-2 h-4 w-4" />
                                              <span className="font-medium">
                                                View Invoice
                                              </span>
                                            </Button>
                                            <Button
                                              variant="outline"
                                              className="w-full justify-center h-11 border-gray-200 hover:bg-gray-50 gap-2"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveJob(
                                                  job,
                                                );
                                                setActiveJobTab(
                                                  "details",
                                                );
                                                setShowJobDetailsPage(
                                                  true,
                                                );
                                              }}
                                            >
                                              <span className="font-medium">
                                                Details
                                              </span>
                                              <ArrowRight className="h-4 w-4" />
                                            </Button>
                                          </>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : relatedStateJobs.length > 0 &&
                      (jobSearchQuery ||
                        jobStatusFilter !== "all") ? (
                      /* Search or filter returned no results */
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-gray-100 rounded-full p-4 mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {jobSearchQuery
                            ? `No jobs match "${jobSearchQuery}"`
                            : "No jobs match this filter"}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          {jobSearchQuery
                            ? "Try a different search term or clear the search."
                            : "Try selecting a different filter."}
                        </p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setJobSearchQuery("");
                            setJobStatusFilter("all");
                          }}
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        >
                          {jobSearchQuery
                            ? "Clear search"
                            : "Show all jobs"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-gray-100 rounded-full p-4 mb-4">
                          <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          No Jobs Added Yet
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          No jobs have been posted for this trip
                          yet.
                        </p>
                        {/* FAB Button shown instead of inline button */}
                      </div>
                    )}
                  </div>

                  {/* FAB Button - Create Job (Jobs tab) */}
                  {permit.status !== "Completed" &&
                    activeTab === "jobs" && (
                      <button
                        className="fixed bottom-24 right-4 z-40 h-14 w-14 rounded-full hover:bg-[#e8880d] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center active:scale-95 bg-[#101010]"
                        onClick={() => setShowPostJobPage(true)}
                        aria-label="Create New Job"
                      >
                        <Plus className="h-6 w-6 text-[#ffffff]" />
                      </button>
                    )}
                </TabsContent>

                {/* Permits Tab */}
                <TabsContent
                  value="permits"
                  className="mt-0 p-4 space-y-6 pb-32 max-w-3xl mx-auto min-w-0"
                >
                  {/* Alerts Section */}
                  <div className="space-y-3">
                    {/* Permit Expired Alert */}
                    {isPermitExpired() && (
                      <AlertBanner
                        type="error"
                        title="Permit expired"
                        message={`This permit expired ${Math.abs(getDaysUntilExpiry())} ${Math.abs(getDaysUntilExpiry()) === 1 ? "day" : "days"} ago. Update permit to continue the trip.`}
                        ctaLabel="Renew Now"
                        onCtaClick={() => {
                          showSnackbar(
                            "Permit renewal process initiated",
                            "info",
                            3000,
                          );
                        }}
                      />
                    )}

                    {/* Permit Expiring Soon Alert */}
                    {!isPermitExpired() &&
                      isPermitExpiringSoon() &&
                      showExpiryAlert && (
                        <AlertBanner
                          type="warning"
                          title={`Permit expires in ${getDaysUntilExpiry()} ${getDaysUntilExpiry() === 1 ? "day" : "days"}`}
                          message="Review expiration dates before continuing"
                          ctaLabel="View Details"
                          onCtaClick={() => {
                            setShowExpiryAlert(false);
                          }}
                          dismissible
                          onDismiss={() =>
                            setShowExpiryAlert(false)
                          }
                        />
                      )}

                    {/* Rejected Permits Alert */}
                    {hasRejectedPermits() &&
                      showRejectedPermitAlert && (
                        <AlertBanner
                          type="error"
                          title="Action required"
                          message="Some state permits have been rejected. Review and resubmit."
                          ctaLabel="Review"
                          onCtaClick={() => {
                            setShowRejectedPermitAlert(false);
                          }}
                          dismissible
                          onDismiss={() =>
                            setShowRejectedPermitAlert(false)
                          }
                        />
                      )}

                    {/* Missing Pilot Cars Alert */}
                    {permit.status === "Approved" &&
                      isMissingPilotCars() &&
                      showMissingPilotAlert && (
                        <AlertBanner
                          type="warning"
                          title="No pilot cars assigned"
                          message="This trip requires pilot car escorts. Assign pilot cars before starting."
                          ctaLabel="Post Job"
                          onCtaClick={() => {
                            setActiveTab("jobs");
                            setShowMissingPilotAlert(false);
                          }}
                          dismissible
                          onDismiss={() =>
                            setShowMissingPilotAlert(false)
                          }
                        />
                      )}
                  </div>

                  {(() => {
                    // --- Grouping & Summary Logic ---
                    const statesWithIndex = permit.states.map(
                      (state, index) => ({ state, index }),
                    );
                    const actionRequired =
                      statesWithIndex.filter(
                        (s) => s.state.status === "Rejected",
                      );
                    const pending = statesWithIndex.filter(
                      (s) => s.state.status === "Pending",
                    );
                    const approved = statesWithIndex.filter(
                      (s) =>
                        s.state.status === "Approved" ||
                        s.state.status === "Expired",
                    );
                    const approvedCount = permit.states.filter(
                      (s) => s.status === "Approved",
                    ).length;
                    const pendingCount = permit.states.filter(
                      (s) => s.status === "Pending",
                    ).length;
                    const rejectedCount = permit.states.filter(
                      (s) => s.status === "Rejected",
                    ).length;
                    const hasActionItems =
                      actionRequired.length > 0 ||
                      pending.length > 0;

                    // Relative expiry helper
                    const getExpiryInfo = (
                      expiryDate?: string,
                    ) => {
                      if (!expiryDate) return null;
                      const now = new Date("2026-02-16");
                      const expiry = new Date(expiryDate);
                      const diffDays = Math.ceil(
                        (expiry.getTime() - now.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      if (diffDays < 0)
                        return {
                          text: `Expired ${Math.abs(diffDays)}d ago`,
                          urgent: "expired" as const,
                        };
                      if (diffDays === 0)
                        return {
                          text: "Expires today",
                          urgent: "critical" as const,
                        };
                      if (diffDays <= 3)
                        return {
                          text: `Expires in ${diffDays}d`,
                          urgent: "critical" as const,
                        };
                      if (diffDays <= 7)
                        return {
                          text: `Expires in ${diffDays}d`,
                          urgent: "warning" as const,
                        };
                      return {
                        text: `Expires in ${diffDays}d`,
                        urgent: "normal" as const,
                      };
                    };

                    // Status chip styles — tinted backgrounds matching ManageTrips state badge pattern
                    const getStatusChipClass = (
                      status: string,
                    ) => {
                      switch (status) {
                        case "Approved":
                          return "bg-[#ecfdf3] text-[#067647] border-[#abefc6]";
                        case "Rejected":
                          return "bg-[#fef3f2] text-[#b42318] border-[#fecdca]";
                        case "Pending":
                          return "bg-[#eff8ff] text-[#2563eb] border-[#bfdbfe]";
                        case "Expired":
                          return "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]";
                        default:
                          return "bg-gray-50 text-gray-700 border-gray-200";
                      }
                    };

                    // Left border class - removed for cleaner UI
                    const getLeftBorder = (status: string) => {
                      return "";
                    };

                    // Render a single permit card using compact design
                    const renderPermitCard = (
                      state: PermitState,
                      originalIndex: number,
                    ) => {
                      const jurisdictionState =
                        tripExecution.tripState?.jurisdictions[
                          originalIndex
                        ];
                      const isCurrentJurisdiction =
                        tripExecution.tripState &&
                        tripExecution.tripState
                          .currentJurisdictionIndex ===
                          originalIndex;

                      return (
                        <div key={state.code}>
                          {/* Compact Permit Card */}
                          <CompactPermitCard
                            state={state}
                            stateName={getStateName(state.code)}
                            onDownload={
                              state.status === "Approved" && !jurisdictionState
                                ? () => {
                                    setSelectedStatePermit(state);
                                    showSnackbar(
                                      `${state.code} permit downloaded successfully`,
                                      "success",
                                      3000,
                                    );
                                  }
                                : undefined
                            }
                          />

                          {/* Jurisdiction Action Buttons - Appended after compact card */}
                          {isCurrentJurisdiction &&
                            jurisdictionState && (
                              <div className="px-3 pb-3 pt-2 bg-white border border-t-0 border-gray-100 rounded-b-2xl -mt-2">
                                {/* Jurisdiction Status Badge */}
                                <div className="mb-2">
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] h-5 px-1.5 ${
                                      jurisdictionState.status ===
                                      "ready-to-activate"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : jurisdictionState.status ===
                                            "active"
                                          ? "bg-green-50 text-green-700 border-green-200"
                                          : jurisdictionState.status ===
                                              "completed"
                                            ? "bg-gray-50 text-gray-700 border-gray-200"
                                            : "bg-gray-50 text-gray-500 border-gray-200"
                                    }`}
                                  >
                                    {jurisdictionState.status ===
                                    "ready-to-activate"
                                      ? "Ready to Activate"
                                      : jurisdictionState.status ===
                                          "active"
                                        ? "Active"
                                        : jurisdictionState.status ===
                                            "completed"
                                          ? "Completed"
                                          : jurisdictionState.status ===
                                              "upcoming"
                                            ? "Upcoming"
                                            : jurisdictionState.status}
                                  </Badge>
                                </div>

                                {jurisdictionState.status ===
                                  "ready-to-activate" && (
                                  <Button
                                    onClick={() => {
                                      tripExecution.activateJurisdiction();
                                      showSnackbar(
                                        "Pilot cars have been notified",
                                        "success",
                                        3000,
                                      );
                                    }}
                                    disabled={
                                      !tripExecution.canActivateJurisdiction ||
                                      tripExecution.isLoading
                                    }
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm font-medium"
                                  >
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notify Pilot Cars
                                  </Button>
                                )}

                                {jurisdictionState.status ===
                                  "active" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 border border-green-200 rounded p-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                      <span className="font-medium">
                                        Jurisdiction Active
                                      </span>
                                      {jurisdictionState.startTime && (
                                        <span className="text-gray-500 ml-auto">
                                          Started{" "}
                                          {formatTime24h(
                                            jurisdictionState.startTime,
                                          )}
                                        </span>
                                      )}
                                    </div>
                                    <Button
                                      onClick={
                                        tripExecution.completeJurisdiction
                                      }
                                      disabled={
                                        !tripExecution.canCompleteJurisdiction ||
                                        tripExecution.isLoading
                                      }
                                      className="w-full bg-green-600 hover:bg-green-700 text-white h-9 text-sm font-medium"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Complete Jurisdiction
                                    </Button>
                                  </div>
                                )}

                                {jurisdictionState.status ===
                                  "completed" &&
                                  jurisdictionState.duration && (
                                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2">
                                      <CheckCircle className="w-4 h-4 text-gray-500" />
                                      <span>
                                        Completed in{" "}
                                        {TripExecutionService.formatDuration(
                                          jurisdictionState.duration,
                                        )}
                                      </span>
                                    </div>
                                  )}
                              </div>
                            )}
                        </div>
                      );
                    };

                    return (
                      <div>
                        {/* Action Required Group (Rejected) */}
                        {actionRequired.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1 h-4 rounded-full bg-[#b42318]" />
                              <span className="text-[11px] text-[#b42318] uppercase tracking-wider">
                                Action Required (
                                {actionRequired.length})
                              </span>
                            </div>
                            <div className="space-y-3">
                              {actionRequired.map(
                                ({ state, index }) =>
                                  renderPermitCard(
                                    state,
                                    index,
                                  ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Pending Group */}
                        {pending.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1 h-4 rounded-full bg-[#2563eb]" />
                              <span className="text-[11px] text-[#2563eb] uppercase tracking-wider">
                                Pending ({pending.length})
                              </span>
                            </div>
                            <div className="space-y-3">
                              {pending.map(({ state, index }) =>
                                renderPermitCard(state, index),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Approved Group (collapsible if action items exist) */}
                        {approved.length > 0 && (
                          <div className="mb-4">
                            <button
                              onClick={() =>
                                setApprovedGroupCollapsed(
                                  !approvedGroupCollapsed,
                                )
                              }
                              className="flex items-center gap-2 mb-2 w-full text-left"
                            >
                              <div className="w-1 h-4 rounded-full bg-[#067647]" />
                              <span className="text-[11px] text-[#067647] uppercase tracking-wider">
                                Approved ({approved.length})
                              </span>
                              {hasActionItems && (
                                <span className="ml-auto text-gray-400">
                                  {approvedGroupCollapsed ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronUp className="w-4 h-4" />
                                  )}
                                </span>
                              )}
                            </button>
                            {(!approvedGroupCollapsed ||
                              !hasActionItems) && (
                              <div className="space-y-3">
                                {approved.map(
                                  ({ state, index }) =>
                                    renderPermitCard(
                                      state,
                                      index,
                                    ),
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Download CTA with count */}
                        {/* {approvedCount > 0 && (
                          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#e6e3df] z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <div className="max-w-3xl mx-auto">
                              <Button
                                onClick={() => {
                                  alert(
                                    "Downloading all approved permits...",
                                  );
                                }}
                                className="w-full bg-[#F89823] hover:bg-[#e8880d] text-[#1A1A1A] shadow-sm h-11 text-sm font-semibold rounded-lg border border-[#F89823]/20"
                              >
                                <Download className="w-5 h-5 mr-2 flex-shrink-0" />
                                <span className="whitespace-nowrap">Download {approvedCount} Approved Permit{approvedCount !== 1 ? "s" : ""}</span>
                              </Button>
                            </div>
                          </div>
                        )} */}

                        {/* Download CTA disabled state when no approved */}
                        {approvedCount === 0 &&
                          permit.states.length > 0 &&
                          !permit.states.some(
                            (s) => s.status === "Pending",
                          ) && (
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#e6e3df] z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                              <div className="max-w-3xl mx-auto">
                                <Button
                                  disabled
                                  className="w-full bg-[#F89823]/40 text-[#1A1A1A]/40 cursor-not-allowed shadow-sm h-11 text-sm font-semibold rounded-lg border border-[#F89823]/10"
                                >
                                  <Download className="w-5 h-5 mr-2 flex-shrink-0" />
                                  <span className="whitespace-nowrap">
                                    No Approved Permits to
                                    Download
                                  </span>
                                </Button>
                              </div>
                            </div>
                          )}

                        {/* Footer with Apply All Permits Button */}
                        {permit.status === "Open" &&
                          permit.states.some(
                            (state) =>
                              state.status === "Pending" ||
                              state.status === "Not Applied",
                          ) && (
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#e6e3df] z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                              <div className="max-w-3xl mx-auto">
                                <Button
                                  onClick={() => {
                                    alert(
                                      "All permits applied successfully! Trip status will change to In Transit.",
                                    );
                                  }}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                                >
                                  <FileText className="w-4 h-4 mr-2" />
                                  Apply All Permits
                                </Button>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })()}
                </TabsContent>

                {/* Other Information Tab */}
                <TabsContent value="info" className="mt-0">
                  <TripInfoTab
                    permit={permit}
                    routeDetails={routeDetails}
                    load={load}
                    driverDetails={driverDetails}
                    truck={truck}
                    trailer={trailer}
                  />
                </TabsContent>

                {/* Invoice Tab */}
                <TabsContent
                  value="invoice"
                  className="mt-0 pb-20 max-w-3xl mx-auto min-w-0"
                >
                  <InvoiceTabContent
                    relatedJobs={relatedJobs}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Sticky Bottom Bar - Log Incident + Kebab Menu (Mobile-First) - Shows on all tabs */}
          {permit.status === "In Transit" && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30 shadow-lg">
              <div className="mx-auto flex gap-2">
                {/* Log Incident - Takes remaining space */}
                <Button
                  variant="outline"
                  className="flex-1 h-11 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 hover:border-red-400"
                  onClick={() => setLogIncidentOpen(true)}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Log Incident
                </Button>

                {/* Kebab Menu - Fixed 40px width */}
                <Button
                  variant="outline"
                  className="h-11 p-0 border-gray-300 hover:bg-gray-50 shrink-0"
                  style={{ width: "40px", minWidth: "40px" }}
                  onClick={() => setMoreOptionsOpen(true)}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Completed Trip - Sticky Bottom with Kebab Menu - Shows on all tabs */}
          {permit.status === "Completed" && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30 shadow-lg">
              <div className="max-w-xs mx-auto">
                <Button
                  variant="outline"
                  className="w-12 h-12 p-0 border-gray-300 hover:bg-gray-50 mx-auto block"
                  onClick={() => setMoreOptionsOpen(true)}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Fixed Bottom Start Trip Button */}
          {permit.status === "Open" && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="max-w-3xl mx-auto">
                {tripExecution.canStartTrip ? (
                  <>
                    <SlideToConfirm
                      text="Slide to Start Trip"
                      successText="Starting..."
                      onConfirm={() => setIsStartingTrip(true)}
                      backgroundColor="bg-gradient-to-r from-green-600 to-green-700"
                      textColor="text-white"
                      sliderColor="bg-white"
                      direction="right"
                    />
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Begin GPS tracking and update trip status
                    </p>
                  </>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <p className="text-sm font-semibold text-amber-900">
                        Cannot Start Trip
                      </p>
                    </div>
                    <p className="text-xs text-amber-700">
                      {tripExecution.canStartTripReason ||
                        "The first jurisdiction must have an approved permit before you can start the trip."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sticky Bottom Action Bar - For Completed Trips */}
          {permit.status === "Completed" && (
            <div className="border-t border-gray-200 bg-white shadow-lg pb-20">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      Trip Completed
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-600 border-gray-200 text-xs"
                  >
                    {
                      relatedJobs.filter(
                        (j) => j.status === "Completed",
                      ).length
                    }
                    /{relatedJobs.length} Jobs Done
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-sm"
                    onClick={() => {}}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button
                    className="flex-1 h-10 text-sm bg-[#0066cc] hover:bg-[#0052a3]"
                    onClick={() => setActiveTab("invoice")}
                  >
                    <Receipt className="w-4 h-4 mr-2" />
                    View Invoices
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permit Preview Drawer */}
      <Drawer
        open={!!selectedStatePermit}
        onOpenChange={(open) => {
          if (!open) setSelectedStatePermit(null);
        }}
      >
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="text-left border-b pb-4 relative">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-lg">
                {selectedStatePermit?.code}
              </div>
              <div>
                <DrawerTitle>
                  {selectedStatePermit?.code} Permit
                </DrawerTitle>
                <DrawerDescription className="mt-1">
                  Permit #
                  {selectedStatePermit?.permitNumber ||
                    "PENDING"}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          <div className="flex-1 bg-gray-100 p-4 overflow-hidden flex items-center justify-center">
            <div className="bg-white shadow-lg w-full max-w-md h-full max-h-[500px] rounded-lg flex flex-col items-center justify-center text-gray-400 border border-gray-200">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p>PDF Preview Unavailable</p>
              <p className="text-sm mt-2">
                This is a mock preview.
              </p>
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button className="w-full bg-[#0066cc]">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Add Jurisdiction Drawer */}
      <Drawer
        open={addJurisdictionOpen}
        onOpenChange={(open) => {
          if (!open) {
            setAddJurisdictionOpen(false);
            setJurisdictionSearch("");
          }
        }}
      >
        <DrawerContent className="h-[95vh] flex flex-col">
          <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 overflow-hidden">
            <DrawerHeader className="text-left flex-none border-b border-gray-200 pb-4 relative">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-xl flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                Add Jurisdictions
              </DrawerTitle>
              <DrawerDescription className="text-gray-600 mt-2">
                Select additional states that your route will
                pass through. Each jurisdiction requires
                separate permit approval.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
              <div className="space-y-6 mt-4">
                {/* Current Route Summary */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Navigation className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-blue-900 mb-1 uppercase tracking-wide">
                          Current Route
                        </p>
                        <p className="text-sm text-gray-900 mb-2">
                          {permit.origin} → {permit.destination}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {permit.states.map((state) => (
                            <Badge
                              key={state.code}
                              variant="outline"
                              className="bg-white/60 text-blue-900 border-blue-300 text-xs"
                            >
                              {state.code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search states by name or code..."
                    value={jurisdictionSearch}
                    onChange={(e) =>
                      setJurisdictionSearch(e.target.value)
                    }
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  {jurisdictionSearch && (
                    <button
                      onClick={() => setJurisdictionSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* State Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    <span>Available Jurisdictions</span>
                    <span className="text-xs font-normal text-gray-500">
                      {
                        availableStates.filter(
                          (state) =>
                            jurisdictionSearch === "" ||
                            state.name
                              .toLowerCase()
                              .includes(
                                jurisdictionSearch.toLowerCase(),
                              ) ||
                            state.code
                              .toLowerCase()
                              .includes(
                                jurisdictionSearch.toLowerCase(),
                              ),
                        ).length
                      }{" "}
                      of {availableStates.length}
                    </span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {availableStates
                      .filter(
                        (state) =>
                          jurisdictionSearch === "" ||
                          state.name
                            .toLowerCase()
                            .includes(
                              jurisdictionSearch.toLowerCase(),
                            ) ||
                          state.code
                            .toLowerCase()
                            .includes(
                              jurisdictionSearch.toLowerCase(),
                            ),
                      )
                      .map((state) => {
                        const isSelected =
                          selectedStates.includes(state.code);
                        return (
                          <Card
                            key={state.code}
                            className={`cursor-pointer transition-all duration-200 border-2 ${
                              isSelected
                                ? "bg-blue-50 border-blue-500 shadow-md"
                                : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                            }`}
                            onClick={() =>
                              toggleStateSelection(state.code)
                            }
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900 text-sm">
                                      {state.code}
                                    </span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 truncate">
                                    {state.name}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>

                {/* Selected States Count */}
                {selectedStates.length > 0 && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-900">
                            {selectedStates.length}{" "}
                            {selectedStates.length === 1
                              ? "State"
                              : "States"}{" "}
                            Selected
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStates([])}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-7 text-xs"
                        >
                          Clear All
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedStates.map((code) => {
                          const state = US_STATES.find(
                            (s) => s.code === code,
                          );
                          return (
                            <Badge
                              key={code}
                              variant="secondary"
                              className="bg-white text-blue-900 border-blue-300 text-xs"
                            >
                              {state?.code || code}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Info Section */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-1">
                        Important Notes
                      </p>
                      <ul className="text-xs text-amber-800 space-y-1">
                        <li>
                          • Each added jurisdiction requires
                          separate permit processing
                        </li>
                        <li>
                          • Processing times vary by state
                          (typically 2-5 business days)
                        </li>
                        <li>
                          • Additional fees may apply based on
                          jurisdiction requirements
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DrawerFooter className="flex-none pt-4 border-t border-gray-200 bg-gray-50">
            <Button
              className="w-full bg-[#0066cc] h-12 text-base font-semibold"
              onClick={handleAddJurisdictions}
              disabled={selectedStates.length === 0}
            >
              {selectedStates.length > 0
                ? `Add ${selectedStates.length} ${selectedStates.length === 1 ? "Jurisdiction" : "Jurisdictions"}`
                : "Select States to Continue"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Share Tracking Link Drawer */}
      <Drawer
        open={shareTrackingOpen}
        onOpenChange={setShareTrackingOpen}
      >
        <DrawerContent>
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="text-left">
              <DrawerTitle>Share Tracking Link</DrawerTitle>
              <DrawerDescription>
                Share this link with clients or stakeholders to
                track this shipment in real-time
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">
                  Tracking Link
                </p>
                <p className="text-sm tracking-wide text-gray-900 break-all">
                  https://track.overwize.com/{permit.id}
                </p>
              </div>
              <Button
                className="w-full bg-[#F89823]"
                onClick={(event) => {
                  const text = `https://track.overwize.com/${permit.id}`;
                  // Fallback method that works without Clipboard API
                  const textArea =
                    document.createElement("textarea");
                  textArea.value = text;
                  textArea.style.position = "fixed";
                  textArea.style.left = "-999999px";
                  textArea.style.top = "-999999px";
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  try {
                    document.execCommand("copy");
                    // Show success feedback
                    const btn =
                      event?.currentTarget as HTMLButtonElement;
                    if (btn) {
                      const originalHTML = btn.innerHTML;
                      btn.textContent = "Copied!";
                      setTimeout(() => {
                        btn.innerHTML = originalHTML;
                      }, 2000);
                    }
                  } catch (err) {
                    console.error("Failed to copy text: ", err);
                  }
                  textArea.remove();
                }}
              >
                <Copy className="w-4 h-4 mr-2 text-[#1A1A1A]" />
                <span className="text-[#1A1A1A]">
                  Copy Link
                </span>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Route Change Drawer */}
      <Drawer
        open={routeChangeOpen}
        onOpenChange={setRouteChangeOpen}
      >
        <DrawerContent className="max-h-[95vh] flex flex-col">
          <div className="max-w-md mx-auto w-full flex flex-col flex-1 overflow-hidden">
            <DrawerHeader className="text-left flex-shrink-0 relative">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle>
                Request Route or Time Change
              </DrawerTitle>
              <DrawerDescription>
                Request a route or schedule modification for
                this trip.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto min-h-0 px-4">
              <div className="space-y-4 pb-4 pt-2">
                {/* Change Type Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    What would you like to change?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        changeType === "route"
                          ? "default"
                          : "outline"
                      }
                      className={
                        changeType === "route"
                          ? "bg-[#0066cc]"
                          : ""
                      }
                      onClick={() => setChangeType("route")}
                    >
                      Route
                    </Button>
                    <Button
                      variant={
                        changeType === "time"
                          ? "default"
                          : "outline"
                      }
                      className={
                        changeType === "time"
                          ? "bg-[#0066cc]"
                          : ""
                      }
                      onClick={() => setChangeType("time")}
                    >
                      Time/Date
                    </Button>
                  </div>
                </div>

                {changeType === "route" && (
                  <>
                    {/* Current Route */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-3">
                        Current Route
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <div className="w-0.5 flex-1 bg-gray-300 min-h-[30px]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <p className="text-xs text-gray-500 uppercase">
                                From
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {permit.origin}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase">
                                To
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {permit.destination}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* New Destination */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        New Destination
                      </label>
                      <input
                        type="text"
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900"
                        placeholder="Enter new destination address..."
                        value={newDestination}
                        onChange={(e) =>
                          setNewDestination(e.target.value)
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the complete address with city and
                        state
                      </p>
                    </div>

                    {/* Reason for Change */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Reason for Change
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 mb-2"
                        value={routeChangeReason}
                        onChange={(e) =>
                          setRouteChangeReason(e.target.value)
                        }
                      >
                        <option value="">
                          Select a reason...
                        </option>
                        <option value="road_closure">
                          Road Closure / Construction
                        </option>
                        <option value="weather">
                          Weather Conditions
                        </option>
                        <option value="customer_request">
                          Customer Request
                        </option>
                        <option value="detour">
                          Detour Required
                        </option>
                        <option value="delivery_change">
                          Delivery Location Changed
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Additional Notes (Optional)
                      </label>
                      <Textarea
                        className="h-20 text-sm"
                        placeholder="Provide any additional details about the route change..."
                        id="route-change-notes"
                      />
                    </div>

                    {/* Permit Requirement Warning */}
                    {newDestination && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-900 text-sm mb-2">
                              New Permits Required
                            </p>
                            <p className="text-xs text-blue-800 mb-3">
                              Changing your route may require
                              permits for new states. You'll
                              need to create a new permit
                              request for the updated route.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 text-xs h-8"
                              onClick={() => {
                                alert(
                                  "This would navigate to Create Permit Request page.\\n\\nIn a real application, this would:\\n• Pre-fill origin and new destination\\n• Allow you to request permits for new jurisdictions\\n• Link the new permit to this trip",
                                );
                              }}
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              Create Permit Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {changeType === "time" && (
                  <>
                    {/* Current Schedule */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-3">
                        Current Schedule
                      </p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">
                            Pickup Date
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(permit.effectiveDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* New Schedule */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        New Pickup Date
                      </label>
                      <input
                        type="date"
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900"
                        value={newPickupDate}
                        onChange={(e) =>
                          setNewPickupDate(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Preferred Pickup Time (Optional)
                      </label>
                      <input
                        type="time"
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900"
                        value={newPickupTime}
                        onChange={(e) =>
                          setNewPickupTime(e.target.value)
                        }
                      />
                    </div>

                    {/* Reason for Time Change */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Reason for Change
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900"
                        value={routeChangeReason}
                        onChange={(e) =>
                          setRouteChangeReason(e.target.value)
                        }
                      >
                        <option value="">
                          Select a reason...
                        </option>
                        <option value="customer_request">
                          Customer Request
                        </option>
                        <option value="equipment_delay">
                          Equipment Delay
                        </option>
                        <option value="driver_availability">
                          Driver Availability
                        </option>
                        <option value="weather">
                          Weather Conditions
                        </option>
                        <option value="loading_delay">
                          Loading Delay
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Time Change Info */}
                    {newPickupDate && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-900 text-sm mb-1">
                              No Additional Permits Needed
                            </p>
                            <p className="text-xs text-green-800">
                              Your existing permits and pilot
                              car arrangements can be updated to
                              the new schedule.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    className="h-20 text-sm"
                    placeholder={`Provide any additional details about the ${changeType} change...`}
                    id="change-notes"
                  />
                </div>
              </div>
            </div>

            <DrawerFooter className="flex-shrink-0">
              <Button
                className="w-full bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880f]"
                disabled={
                  changeType === "route"
                    ? !newDestination || !routeChangeReason
                    : !newPickupDate || !routeChangeReason
                }
                onClick={() => {
                  const notes =
                    (
                      document.getElementById(
                        "change-notes",
                      ) as HTMLTextAreaElement
                    )?.value || "";
                  if (changeType === "route") {
                    alert(
                      `Route Change Request Submitted\\n\\n` +
                        `From: ${permit.origin}\\n` +
                        `To: ${newDestination}\\n\\n` +
                        `Reason: ${routeChangeReason}\\n` +
                        `Notes: ${notes || "None"}\\n\\n` +
                        `Your dispatch team has been notified. They will review the request and coordinate:\\n` +
                        `• New permit requirements\\n` +
                        `• Pilot car adjustments\\n` +
                        `• Route approval\\n\\n` +
                        `You'll receive a notification within 2-4 hours.`,
                    );
                  } else {
                    alert(
                      `Schedule Change Request Submitted\\\\n\\\\n` +
                        `New Pickup Date: ${newPickupDate}\\\\n` +
                        `New Pickup Time: ${newPickupTime || "Not specified"}\\\\n\\\\n` +
                        `Reason: ${routeChangeReason}\\\\n` +
                        `Notes: ${notes || "None"}\\\\n\\\\n` +
                        `Your dispatch team will:\\\\n` +
                        `• Update permit effective dates\\\\n` +
                        `• Reschedule pilot car escorts\\\\n` +
                        `• Notify customer of changes\\\\n` +
                        `• Confirm new schedule within 1-2 hours`,
                    );
                  }
                  setRouteChangeOpen(false);
                  setNewDestination("");
                  setNewPickupDate("");
                  setNewPickupTime("");
                  setRouteChangeReason("");
                }}
              >
                Submit{" "}
                {changeType === "route" ? "Route" : "Schedule"}{" "}
                Change Request
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Log Incident Drawer */}
      <ReportIncidentDrawer
        isOpen={logIncidentOpen}
        onClose={() => setLogIncidentOpen(false)}
      />

      {/* Start Trip Confirmation Drawer */}
      <Drawer
        open={isStartingTrip}
        onOpenChange={setIsStartingTrip}
      >
        <DrawerContent>
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="text-left relative">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle>Start Trip</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to start this trip?
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-4 space-y-4">
              <p className="text-sm text-gray-500">
                Starting the trip will update the status to "In
                Transit" and begin GPS tracking.
              </p>
            </div>

            <DrawerFooter>
              <Button
                className="w-full bg-[#0066cc]"
                onClick={handleStartTrip}
              >
                Start Trip
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* End Trip Confirmation Drawer - Safety-focused with destructive styling */}
      <Drawer open={endTripOpen} onOpenChange={setEndTripOpen}>
        <DrawerContent>
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="text-left relative">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-red-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                End Trip?
              </DrawerTitle>
              <DrawerDescription className="text-red-700">
                This action will complete and finalize this trip
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-4 space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4">
                <div className="flex gap-3">
                  <Flag className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-900">
                      Confirm trip completion
                    </p>
                    <p className="text-sm text-red-700">
                      Ending this trip will:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                      <li>Mark trip status as "Completed"</li>
                      <li>Stop GPS tracking</li>
                      <li>
                        Finalize all permits and documentation
                      </li>
                      <li>Close all associated jobs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      Before you continue
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Ensure all deliveries are complete,
                      documentation is finalized, and all
                      jurisdictions have been marked complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DrawerFooter className="gap-2">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-300"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => {
                  // Handle end trip logic
                  console.log("Ending trip:", permit.requestId);
                  setEndTripOpen(false);
                  displaySuccessMessage(
                    "Trip ended successfully - Status updated to Completed",
                  );
                  // In real app: update status, stop GPS, finalize permits, generate reports
                }}
              >
                <Flag className="mr-2 h-5 w-5" />
                Confirm End Trip
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Dispute Invoice Dialog */}
      <Drawer
        open={disputeDialogOpen}
        onOpenChange={setDisputeDialogOpen}
      >
        <DrawerContent className="max-h-[90vh]">
          <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
            <DrawerHeader className="text-left flex-none relative">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Dispute Invoice
              </DrawerTitle>
              <DrawerDescription>
                Submit a dispute for this invoice. Provide
                details about the items you're disputing.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-4">
                {/* Dispute Reason Selection */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Dispute Reason *
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: "incorrect_hours",
                        label: "Incorrect Hours/Time",
                        icon: Clock,
                      },
                      {
                        value: "incorrect_distance",
                        label: "Incorrect Distance/Mileage",
                        icon: MapPin,
                      },
                      {
                        value: "unauthorized_charges",
                        label: "Unauthorized Charges",
                        icon: AlertCircle,
                      },
                      {
                        value: "service_quality",
                        label: "Service Quality Issues",
                        icon: AlertCircle,
                      },
                      {
                        value: "duplicate_charges",
                        label: "Duplicate Charges",
                        icon: Copy,
                      },
                      {
                        value: "other",
                        label: "Other",
                        icon: FileText,
                      },
                    ].map((reason) => {
                      const Icon = reason.icon;
                      return (
                        <Button
                          key={reason.value}
                          variant={
                            disputeReason === reason.value
                              ? "default"
                              : "outline"
                          }
                          className={`w-full justify-start h-12 gap-3 ${
                            disputeReason === reason.value
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            setDisputeReason(reason.value)
                          }
                        >
                          <Icon className="w-4 h-4" />
                          {reason.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Detailed Description *
                  </label>
                  <Textarea
                    className="min-h-32 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Provide specific details about your dispute. Include any relevant information such as actual vs. billed hours, expected vs. charged amounts, or specific incidents..."
                    value={disputeDescription}
                    onChange={(e) =>
                      setDisputeDescription(e.target.value)
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 20 characters required
                  </p>
                </div>

                {/* Supporting Documentation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 text-sm mb-2">
                        Supporting Documentation
                      </p>
                      <ul className="text-xs text-blue-800 space-y-1 mb-3">
                        <li>
                          • GPS tracking logs (automatically
                          included)
                        </li>
                        <li>
                          • Time stamp records (automatically
                          included)
                        </li>
                        <li>
                          • Communication logs with pilot car
                          driver
                        </li>
                        <li>
                          • Any relevant photos or documentation
                        </li>
                      </ul>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-blue-700 border-blue-300 hover:bg-blue-100"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Additional Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">
                    What Happens Next?
                  </h4>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">
                          1
                        </span>
                      </div>
                      <p>
                        Your dispute will be reviewed by our
                        billing team within 24-48 hours
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">
                          2
                        </span>
                      </div>
                      <p>
                        We'll contact the pilot car driver for
                        their records and response
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">
                          3
                        </span>
                      </div>
                      <p>
                        You'll receive a resolution notification
                        with adjusted invoice or explanation
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">
                          4
                        </span>
                      </div>
                      <p>
                        Payment will be held until the dispute
                        is resolved
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-orange-900 text-sm mb-1">
                        Important Notice
                      </p>
                      <p className="text-xs text-orange-800">
                        Submitting false or fraudulent disputes
                        may result in account suspension and
                        legal action. All disputes are
                        thoroughly investigated with GPS data,
                        time logs, and communication records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Actions */}
            <DrawerFooter className="flex-none pt-4 pb-4 border-t border-gray-200">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white gap-2 h-12"
                disabled={
                  !disputeReason ||
                  disputeDescription.length < 20
                }
                onClick={() => {
                  alert(
                    `Dispute Submitted Successfully\\n\\n` +
                      `Reason: ${disputeReason}\\n` +
                      `Description: ${disputeDescription}\\n\\n` +
                      `Your dispute has been logged and will be reviewed within 24-48 hours. ` +
                      `You'll receive email and app notifications with updates. ` +
                      `Invoice payment is now on hold pending resolution.`,
                  );
                  setDisputeDialogOpen(false);
                  setDisputeReason("");
                  setDisputeDescription("");
                }}
              >
                <AlertTriangle className="w-4 h-4" />
                Submit Dispute
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Job Details Drawer */}
      {activeJob && (
        <JobDetailsPage
          job={activeJob}
          open={showJobDetailsPage}
          onOpenChange={(open) => {
            setShowJobDetailsPage(open);
            if (!open) {
              setActiveJob(null);
            }
          }}
          initialTab={activeJobTab}
          onJobUpdate={handleJobUpdate}
          onConfirmJob={() => {
            setShowJobDetailsPage(false);
            setActiveJob(null);
            setFullScreenMapOpen(true);
          }}
        />
      )}

      {/* More Options Bottom Sheet - Secondary Actions */}
      <Drawer
        open={moreOptionsOpen}
        onOpenChange={setMoreOptionsOpen}
      >
        <DrawerContent>
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="text-left pb-2">
              <DrawerTitle className="text-center text-sm font-medium text-gray-500">
                Trip Actions
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                Additional trip management actions
              </DrawerDescription>
            </DrawerHeader>

            <div className="pb-6">
              <div className="divide-y divide-gray-200">
                {/* Trip Controls */}
                {permit.status === "In Transit" && (
                  <>
                    {tripExecution.currentJurisdiction && (
                      <button
                        className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          tripExecution.completeJurisdiction();
                          setMoreOptionsOpen(false);
                        }}
                        disabled={
                          !tripExecution.canCompleteJurisdiction ||
                          tripExecution.isLoading
                        }
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-gray-700 flex-shrink-0" />
                          <span className="text-gray-900">
                            Complete{" "}
                            {
                              tripExecution.currentJurisdiction
                                .code
                            }{" "}
                            Jurisdiction
                          </span>
                        </div>
                      </button>
                    )}

                    <button
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={() => {
                        setMoreOptionsOpen(false);
                        setShareTrackingOpen(true);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Share2 className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <span className="text-gray-900">
                          Share Tracking Link
                        </span>
                      </div>
                    </button>
                  </>
                )}

                <button
                  className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  onClick={() => {
                    setMoreOptionsOpen(false);
                    setRouteChangeOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Edit className="h-5 w-5 text-gray-700 flex-shrink-0" />
                    <span className="text-gray-900">
                      Request Route/Time Change
                    </span>
                  </div>
                </button>

                <button
                  className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  onClick={() => {
                    setMoreOptionsOpen(false);
                    setActiveTab("permits");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-700 flex-shrink-0" />
                    <span className="text-gray-900">
                      View Permits
                    </span>
                  </div>
                </button>

                {permit.status === "Completed" && (
                  <>
                    <button
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={() => setMoreOptionsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Download className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <span className="text-gray-900">
                          Download Trip Report
                        </span>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={() => setMoreOptionsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Receipt className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <span className="text-gray-900">
                          View All Invoices
                        </span>
                      </div>
                    </button>
                  </>
                )}

                {permit.status === "In Transit" && (
                  <>
                    {/* Destructive Action */}
                    <button
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={() => {
                        setMoreOptionsOpen(false);
                        setEndTripOpen(true);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Flag className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <span className="text-red-600 font-medium">
                          End Trip
                        </span>
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Cancel Button */}
              <div className="px-4 pt-2">
                <button
                  className="w-full py-3 text-center text-gray-600 font-medium hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMoreOptionsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}