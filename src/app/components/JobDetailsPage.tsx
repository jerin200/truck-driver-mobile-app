import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  User,
  Truck,
  FileText,
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Box,
  Scale,
  Phone,
  Map as MapIcon,
  Flag,
  Users,
  Star,
  Share2,
  Timer,
  Shield,
  Mail,
  Eye,
  Receipt,
  AlertTriangle,
  Briefcase,
  X,
  RotateCcw,
  Trash2,
  XCircle,
  DollarSign,
  Download,
  RefreshCw,
  Info,
  CreditCard,
  Award,
  TrendingDown,
  CircleDot,
  ChevronRight,
  Search,
  ChevronDown,
  Route,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  formatDateTime,
  formatDate,
  formatDateTimeBullet,
} from "../utils/dateFormat";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import JobDetailsTab from "./JobDetailsTab";
import SegmentedTabControl from "./SegmentedTabControl";
import JobDetailsPageSkeleton from "./JobDetailsPageSkeleton";
import { PrimaryButton } from "./ui/primary-button";
import PermitsTabContent from "./PermitsTabContent";
import RaiseDisputeSheet, {
  DisputeData,
} from "./RaiseDisputeSheet";
import { BidsTabContent } from "./BidsTabContent";
import { PilotCarRatingDrawer, SubmittedRating } from "./PilotCarRatingDrawer";
import { RatingTabContent } from "./RatingTabContent";

interface PermitJurisdiction {
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
}

interface PilotJob {
  id: string;
  tripId: string;
  status:
    | "Open"
    | "Assigned"
    | "In Transit"
    | "Completed"
    | "Open for Bidding"
    | "Bid Received"
    | "Bidding Closed";
  jobSource?: "OPEN" | "REQUESTED";
  jobTitle?: string;
  title?: string;
  jobType?: string;
  description?: string;

  // Route Information
  origin: string;
  destination: string;
  route?: string;
  distance?: string;
  statesProvinces?: string[];
  requestedRoute?: string;

  // Schedule & Timing
  startDate?: string;
  pickupDate: string;
  startTime?: string;
  endDate?: string;
  estimatedDuration?: string;
  meetAtJobStart?: string;

  // Load Details
  commodityType?: string;
  grossVehicleWeight?: string;
  loadWeight?: string;
  overHeight?: string;
  overWidth?: string;
  overLength?: string;
  trailerLength?: string;
  loadLength?: string;
  specialHandling?: string;

  // Additional Information
  specialInstructions?: string;

  // Pickup & Meeting Details
  meetingLocation?: string;
  meetingInstructions?: string;
  contactName?: string;
  contactPhone?: string;

  // Pricing Model
  pricingType?: string;
  baseRate?: string;
  costPerMile?: string;
  costPerHour?: string;
  minimumDailyRate?: string;

  // Pilot Car Requirements
  requestedPilotCars?: any[];
  associatedPermit?: string;
  permits?: PermitJurisdiction[];
  numberOfVehicles?: number;
  vehicleType?: string;
  
  // Rating data
  rating?: {
    overallRating: number;
    submittedAt: string;
    ratingDismissed?: boolean;
  };
  
  bids: Array<{
    id: string;
    companyName: string;
    rating: number;
    amount: number;
    vehicleType: string;
    status: "Pending" | "Accepted" | "Declined";
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    jobStatus?: "Not Started" | "In Progress" | "Completed";
    startTime?: string;
    endTime?: string;
    invoiceApproved?: boolean;
    responseTime?: string;
    estimatedDistance?: string;
    company?: string;
    companyEmail?: string;
  }>;
  acceptedBid?: {
    id: string;
    companyName: string;
    rating: number;
    amount: number;
    vehicleType: string;
    status: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    jobStatus?: "Not Started" | "In Progress" | "Completed";
    startTime?: string;
    endTime?: string;
    invoiceApproved?: boolean;
    company?: string;
    companyEmail?: string;
  };
}

interface JobDetailsPageProps {
  job: PilotJob;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: "details" | "bidding" | "invoice";
  loading?: boolean;
  onJobUpdate?: (updatedJob: PilotJob) => void;
}

export default function JobDetailsPage({
  job,
  open,
  onOpenChange,
  initialTab,
  loading = false,
  onJobUpdate,
}: JobDetailsPageProps) {
  // Determine default tab based on job status
  const getDefaultTab = ():
    | "details"
    | "bidding"
    | "invoice" => {
    if (initialTab) return initialTab;

    // Always default to Job Details tab on first load
    return "details";
  };

  const [activeTab, setActiveTab] = useState<
    "details" | "bidding" | "permits" | "invoice"
  >(getDefaultTab());
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakStartTime, setBreakStartTime] =
    useState<Date | null>(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [breakHistory, setBreakHistory] = useState<
    Array<{ start: Date; end: Date; duration: number }>
  >([]);
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bids, setBids] = useState(job.bids);
  const [jobStatus, setJobStatus] = useState(job.status);
  const [confirmDialogOpen, setConfirmDialogOpen] =
    useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "accept" | "decline" | null
  >(null);
  const [bidToConfirm, setBidToConfirm] = useState<any>(null);
  const [endBidDialogOpen, setEndBidDialogOpen] =
    useState(false);
  const [checkedBidId, setCheckedBidId] = useState<
    string | null
  >(null);

  // Dispute states
  const [disputeSheetOpen, setDisputeSheetOpen] =
    useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<
    | "Awaiting Review"
    | "Disputed"
    | "Accepted"
    | "Payment Pending"
    | "Paid"
  >("Awaiting Review");
  const [disputeData, setDisputeData] =
    useState<DisputeData | null>(null);
  const [acceptDialogOpen, setAcceptDialogOpen] =
    useState(false);
  
  // Rating states
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState(false);
  const [jobRating, setJobRating] = useState(job.rating);

  // User role (for demo purposes - in real app, this would come from auth context)
  const [userRole] = useState<"individual" | "company-invited">(
    "individual",
  );

  // Source-derived labels for bid vs quote terminology
  const isRequestedSource = job.jobSource === "REQUESTED";
  const bidNoun = isRequestedSource ? "Quote" : "Bid";
  const bidNounLower = isRequestedSource ? "quote" : "bid";
  const bidNounPlural = isRequestedSource ? "quotes" : "bids";

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [bidFilter, setBidFilter] = useState<
    "all" | "pending" | "accepted"
  >("all");

  // Snackbar context
  const { showSnackbar } = useSnackbar();

  // Ensure correct tab is selected on mount or when job changes
  useEffect(() => {
    const defaultTab = getDefaultTab();
    console.log(
      "JobDetailsPage - Setting default tab:",
      defaultTab,
    );
    console.log("JobDetailsPage - Job status:", job.status);
    console.log("JobDetailsPage - Job bids:", job.bids);
    console.log("JobDetailsPage - Bids state:", bids);
    console.log("JobDetailsPage - Active tab:", activeTab);
    setActiveTab(defaultTab);

    // Sync job status when job prop changes
    setJobStatus(job.status);
    setBids(job.bids);
  }, [job.id, job.status, job.bids?.length]);

  // Show skeleton if loading
  if (loading) {
    return <JobDetailsPageSkeleton />;
  }

  const acceptedBid = bids.find(
    (bid: any) => bid.status === "Accepted",
  );
  const isActive = acceptedBid?.jobStatus === "In Progress";
  const isCompleted =
    job.status === "Completed" ||
    acceptedBid?.jobStatus === "Completed";

  // Filter and search bids
  const filteredBids = bids
    .filter((bid: any) => {
      // For "In Progress" and "Completed", show only accepted bid
      if (
        jobStatus === "In Progress" ||
        jobStatus === "Completed"
      ) {
        return bid.status === "Accepted";
      }

      // Filter by status
      if (bidFilter === "pending" && bid.status !== "Pending")
        return false;
      if (bidFilter === "accepted" && bid.status !== "Accepted")
        return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCompany = bid.companyName
          ?.toLowerCase()
          .includes(query);
        const matchesContact = bid.contactPerson
          ?.toLowerCase()
          .includes(query);
        const matchesVehicle = bid.vehicleType
          ?.toLowerCase()
          .includes(query);
        return (
          matchesCompany || matchesContact || matchesVehicle
        );
      }

      return true;
    })
    .sort((a: any, b: any) => {
      // Sort: Accepted bids first, then pending bids
      if (a.status === "Accepted" && b.status !== "Accepted")
        return -1;
      if (a.status !== "Accepted" && b.status === "Accepted")
        return 1;
      return 0; // Keep original order for same status
    });

  // Compute best bid & top rated for highlight badges
  const pendingBids = filteredBids.filter(
    (b: any) => b.status === "Pending",
  );
  const lowestBid =
    pendingBids.length > 0
      ? pendingBids.reduce(
          (min: any, b: any) =>
            b.amount < min.amount ? b : min,
          pendingBids[0],
        )
      : null;
  const topRatedBid =
    pendingBids.length > 0
      ? pendingBids.reduce(
          (max: any, b: any) =>
            b.rating > max.rating ? b : max,
          pendingBids[0],
        )
      : null;
  const checkedBid = checkedBidId
    ? filteredBids.find(
        (b: any) =>
          b.id === checkedBidId && b.status === "Pending",
      )
    : null;

  const handleBidClick = (bid: any) => {
    setSelectedBid(bid);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedBid(null), 300); // Clear after animation
  };

  const handleAcceptBid = (bidId: string) => {
    const bid = bids.find((b: any) => b.id === bidId);
    if (!bid) return;

    setBidToConfirm(bid);
    setConfirmAction("accept");
    setConfirmDialogOpen(true);
  };

  const handleDeclineBid = (bidId: string) => {
    const bid = bids.find((b: any) => b.id === bidId);
    if (!bid) return;

    setBidToConfirm(bid);
    setConfirmAction("decline");
    setConfirmDialogOpen(true);
  };

  const confirmBidAction = () => {
    if (!bidToConfirm) return;

    if (confirmAction === "accept") {
      // Snapshot previous state for undo
      const prevBids = [...bids];
      const prevJobStatus = jobStatus;

      // Update bids: accept the selected one, decline all others
      const updatedBids = bids.map((b: any) => ({
        ...b,
        status:
          b.id === bidToConfirm.id
            ? "Accepted"
            : b.status === "Pending"
              ? "Declined"
              : b.status,
        jobStatus:
          b.id === bidToConfirm.id
            ? "Not Started"
            : b.jobStatus,
      }));

      setBids(updatedBids);

      // Update job status to Assigned
      const newStatus = "Assigned";
      setJobStatus(newStatus);

      // Notify parent component of the update
      if (onJobUpdate) {
        onJobUpdate({
          ...job,
          status: newStatus,
          bids: updatedBids,
          acceptedBid: updatedBids.find(
            (b: any) => b.id === bidToConfirm.id,
          ),
        });
      }

      showSnackbar(
        `Bid accepted — assigned to ${bidToConfirm.contactPerson || bidToConfirm.companyName}`,
        "success",
        6000,
        "Undo",
        () => {
          setBids(prevBids);
          setJobStatus(prevJobStatus);
          if (onJobUpdate) {
            onJobUpdate({
              ...job,
              status: prevJobStatus,
              bids: prevBids,
              acceptedBid: undefined,
            });
          }
        },
      );
    } else if (confirmAction === "decline") {
      // Snapshot previous state for undo
      const prevBids = [...bids];

      // Update the bid status to Declined
      const updatedBids = bids.map((b: any) =>
        b.id === bidToConfirm.id
          ? { ...b, status: "Declined" }
          : b,
      );

      setBids(updatedBids);

      // Notify parent component of the update
      if (onJobUpdate) {
        onJobUpdate({
          ...job,
          bids: updatedBids,
        });
      }

      showSnackbar("Bid declined", "info", 5000, "Undo", () => {
        setBids(prevBids);
        if (onJobUpdate) {
          onJobUpdate({ ...job, bids: prevBids });
        }
      });
    }

    setConfirmDialogOpen(false);
    setBidToConfirm(null);
    setConfirmAction(null);
  };

  const cancelBidAction = () => {
    setConfirmDialogOpen(false);
    setBidToConfirm(null);
    setConfirmAction(null);
  };

  const handleRevokeAcceptance = (bidId: string) => {
    const bid = bids.find((b: any) => b.id === bidId);
    if (!bid) return;

    // Snapshot previous state for undo
    const prevBids = [...bids];
    const prevJobStatus = jobStatus;

    // Revert accepted bid to pending and restore all declined bids to pending
    const updatedBids = bids.map((b: any) => ({
      ...b,
      status:
        b.status === "Accepted" || b.status === "Declined"
          ? "Pending"
          : b.status,
      jobStatus: b.id === bidId ? undefined : b.jobStatus,
    }));

    setBids(updatedBids);

    // Update job status back to Open for Bidding
    const newStatus = "Open for Bidding";
    setJobStatus(newStatus);

    // Notify parent component of the update
    if (onJobUpdate) {
      onJobUpdate({
        ...job,
        status: newStatus,
        bids: updatedBids,
        acceptedBid: undefined,
      });
    }

    showSnackbar(
      "Bid acceptance revoked — job reopened for bidding",
      "warning",
      6000,
      "Undo",
      () => {
        setBids(prevBids);
        setJobStatus(prevJobStatus);
        if (onJobUpdate) {
          onJobUpdate({
            ...job,
            status: prevJobStatus,
            bids: prevBids,
            acceptedBid: prevBids.find(
              (b: any) => b.status === "Accepted",
            ),
          });
        }
      },
    );
  };

  const handleUndoDecline = (bidId: string) => {
    const bid = bids.find((b: any) => b.id === bidId);
    if (!bid) return;

    // Update the bid status back to Pending
    setBids(
      bids.map((b: any) =>
        b.id === bidId ? { ...b, status: "Pending" } : b,
      ),
    );

    showSnackbar(
      `Bid from ${bid.companyName} restored to pending`,
      "success",
      3000,
    );
  };

  const handleRemoveBid = (bidId: string) => {
    const bid = bids.find((b: any) => b.id === bidId);
    if (!bid) return;

    // Snapshot previous state for undo
    const prevBids = [...bids];

    // Remove the bid from the list
    setBids(bids.filter((b: any) => b.id !== bidId));

    showSnackbar(
      `Bid from ${bid.companyName} removed`,
      "info",
      5000,
      "Undo",
      () => {
        setBids(prevBids);
        if (onJobUpdate) {
          onJobUpdate({ ...job, bids: prevBids });
        }
      },
    );
  };

  const handleStartJob = () => {
    showSnackbar(
      "Job started — timer is now running",
      "success",
      4000,
    );
  };

  const handleStopJob = () => {
    showSnackbar(
      "Job ended and marked as completed",
      "success",
      4000,
    );
  };

  const handleEndBidding = () => {
    setEndBidDialogOpen(false);

    // Snapshot previous state for undo
    const prevJobStatus = jobStatus;

    // Update job status to Bidding Closed
    const newStatus = "Bidding Closed";
    setJobStatus(newStatus);

    // Notify parent component of the update
    if (onJobUpdate) {
      onJobUpdate({
        ...job,
        status: newStatus,
        bids: bids,
      });
    }

    const pendingCount = bids.filter(
      (b: any) => b.status === "Pending",
    ).length;
    showSnackbar(
      `Bidding closed — ${pendingCount} pending bid${pendingCount !== 1 ? "s" : ""} to review`,
      "info",
      6000,
      "Undo",
      () => {
        setJobStatus(prevJobStatus);
        if (onJobUpdate) {
          onJobUpdate({
            ...job,
            status: prevJobStatus,
            bids: bids,
          });
        }
      },
    );
  };

  const handleStartBreak = () => {
    setIsOnBreak(true);
    setBreakStartTime(new Date());
  };

  const handleEndBreak = () => {
    if (breakStartTime) {
      const endTime = new Date();
      const breakDuration = Math.floor(
        (endTime.getTime() - breakStartTime.getTime()) /
          (1000 * 60),
      );
      setTotalBreakTime((prev) => prev + breakDuration);

      // Add to break history
      setBreakHistory((prev) => [
        ...prev,
        {
          start: breakStartTime,
          end: endTime,
          duration: breakDuration,
        },
      ]);
    }
    setIsOnBreak(false);
    setBreakStartTime(null);
  };

  const handleCompleteJob = () => {
    if (!acceptedBid) return;

    // Snapshot previous state for undo
    const prevBids = [...bids];
    const prevJobStatus = jobStatus;

    // Update bid job status to Completed
    const updatedBids = bids.map((b: any) =>
      b.id === acceptedBid.id
        ? {
            ...b,
            jobStatus: "Completed",
            endTime: new Date().toISOString(),
          }
        : b,
    );

    setBids(updatedBids);

    // Update job status to Completed
    const newStatus = "Completed";
    setJobStatus(newStatus);

    // Notify parent component of the update
    if (onJobUpdate) {
      onJobUpdate({
        ...job,
        status: newStatus,
        bids: updatedBids,
        acceptedBid: updatedBids.find(
          (b: any) => b.id === acceptedBid.id,
        ),
      });
    }

    showSnackbar(
      "Job marked as completed",
      "success",
      6000,
      "Undo",
      () => {
        setBids(prevBids);
        setJobStatus(prevJobStatus);
        if (onJobUpdate) {
          onJobUpdate({
            ...job,
            status: prevJobStatus,
            bids: prevBids,
            acceptedBid: prevBids.find(
              (b: any) => b.id === acceptedBid.id,
            ),
          });
        }
      },
    );
  };

  const handleConfirmBidAccept = () => {
    if (!bidToConfirm) return;

    confirmBidAction();
    setConfirmDialogOpen(false);
  };

  const handleRatingSubmit = (rating: SubmittedRating) => {
    const updatedRating = {
      overallRating: rating.overallRating,
      categories: rating.categories,
      comment: rating.comments,
      submittedAt: rating.timestamp,
    };
    
    setJobRating(updatedRating);
    
    // Notify parent component
    if (onJobUpdate) {
      onJobUpdate({
        ...job,
        rating: updatedRating,
      });
    }
    
    showSnackbar("Rating submitted successfully", "success");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#f6f6f6] flex flex-col">
      {/* Page Header */}
      <div className="flex-none bg-white border-b border-[#e6e3df]">
        <div className="flex items-center h-14 px-4 max-w-5xl mx-auto w-full">
          <button
            onClick={() => onOpenChange(false)}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div className="ml-2 flex-1 min-w-0">
            <h1 className="text-[#0a0a0a] truncate text-[16px] font-bold">
              Job Details
            </h1>
            <p className="tabular-nums text-[12px] text-[#666f80]">
              #{job.id}
            </p>
          </div>
          {/* Status & Job Type Badges in Header */}
          <div className="flex items-center gap-1.5">
            {jobStatus && (
              <Badge
                variant="secondary"
                className={`text-[11px] font-medium px-2.5 py-1 border ${
                  (isActive ? "In Transit" : jobStatus) ===
                  "Open"
                    ? "bg-[#E3F2FD] text-[#1E88E5] border-[#BBDEFB]"
                    : (isActive ? "In Transit" : jobStatus) ===
                        "Assigned"
                      ? "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]"
                      : (isActive
                            ? "In Transit"
                            : jobStatus) === "In Transit"
                        ? "bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]"
                        : (isActive
                              ? "In Transit"
                              : jobStatus) === "Bid Submitted"
                          ? "bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]"
                          : (isActive
                                ? "In Transit"
                                : jobStatus) ===
                              "Open for Bidding"
                            ? "bg-[#E3F2FD] text-[#1E88E5] border-[#BBDEFB]"
                            : (isActive
                                  ? "In Transit"
                                  : jobStatus) ===
                                "Bidding Closed"
                              ? "bg-[#FFF3E0] text-[#C2410C] border-[#FFE0B2]"
                              : (isActive
                                    ? "In Transit"
                                    : jobStatus) ===
                                  "Action Required"
                                ? "bg-[#FDECEA] text-[#C62828] border-[#EF9A9A]"
                                : (isActive
                                      ? "In Transit"
                                      : jobStatus) ===
                                    "Completed"
                                  ? "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {isActive ? (
                  <>
                    <Truck className="w-3 h-3 mr-1" />
                    In Transit
                  </>
                ) : (
                  jobStatus
                )}
              </Badge>
            )}
            {job.jobType && (
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-600 border-gray-200 text-[11px] font-normal px-2.5 py-1"
              >
                {job.jobType === "survey"
                  ? "Survey"
                  : job.jobType === "convoy"
                    ? "Convoy"
                    : job.jobType
                        .split(",")
                        .map(
                          (t) =>
                            t.charAt(0).toUpperCase() +
                            t.slice(1),
                        )
                        .join(", ")}
              </Badge>
            )}
            {isActive && (
              <Badge className="bg-green-500 text-white text-[11px] font-medium px-2.5 py-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1" />
                Active
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Job Details Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Job Title */}
                <h1 className="text-base font-medium text-[#1A1A1A] mb-3 leading-tight">
                  {job.jobTitle ||
                    job.title ||
                    `${job.origin} to ${job.destination}`}
                </h1>

                {/* Rating Row */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9</span>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{job.origin}</span>
                  </div>
                  {job.distance && (
                    <div className="flex items-center gap-1.5">
                      <Route className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">
                        {job.distance}
                      </span>
                    </div>
                  )}
                </div>

                {/* Vehicle + Schedule Row - Inline Layout */}
                <div className="flex items-center gap-4 text-sm text-[#1A1A1A]">
                  {/* Vehicle */}
                  {job.numberOfVehicles && job.vehicleType && (
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-gray-500" />
                      <span>
                        {job.numberOfVehicles}x{" "}
                        {job.vehicleType}
                      </span>
                    </div>
                  )}
                  {/* Schedule */}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{formatDate(job.pickupDate)}</span>
                  </div>
                </div>

                {/* End Bid Button for Open Bidding Jobs */}
                {jobStatus === "Open for Bidding" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => setEndBidDialogOpen(true)}
                      className="w-full h-11 bg-[#F89823] hover:bg-[#e08820] text-[#1a1a1a] font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      End Bidding
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Timer Banner for Active Jobs */}
        {isActive &&
          acceptedBid?.startTime &&
          (() => {
            const LiveTimer = () => {
              const [elapsedTime, setElapsedTime] =
                useState("");

              useEffect(() => {
                const updateTimer = () => {
                  const start = new Date(
                    acceptedBid.startTime!,
                  );
                  const now = new Date();
                  const diffMs =
                    now.getTime() - start.getTime();
                  const hours = Math.floor(
                    diffMs / (1000 * 60 * 60),
                  );
                  const minutes = Math.floor(
                    (diffMs % (1000 * 60 * 60)) / (1000 * 60),
                  );
                  const seconds = Math.floor(
                    (diffMs % (1000 * 60)) / 1000,
                  );
                  setElapsedTime(
                    `${hours}h ${minutes}m ${seconds}s`,
                  );
                };

                updateTimer();
                const interval = setInterval(updateTimer, 1000);

                return () => clearInterval(interval);
              }, []);

              return (
                <div className="bg-white border-b border-gray-200">
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-[#1A1A1A]" />
                        </div>
                        <div>
                          <div className="font-bold text-base text-[#1A1A1A]">
                            {acceptedBid.contactPerson ||
                              "Driver"}
                          </div>
                          <div className="text-sm text-[#1A1A1A]/70 mt-0.5">
                            {acceptedBid.company ||
                              "In Transit"}{" "}
                            • {elapsedTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {acceptedBid.contactPhone && (
                          <a
                            href={`tel:${acceptedBid.contactPhone}`}
                            className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors active:bg-blue-200"
                          >
                            <Phone className="w-5 h-5 text-blue-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            return <LiveTimer />;
          })()}

        {/* Tabs - Outside Content Area */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as any)}
          defaultValue={activeTab}
          className="w-full"
        >
          <div className="bg-white border-b border-gray-100 px-4 pt-3">
            <SegmentedTabControl
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as any)}
              tabs={(() => {
                const biddingTab = {
                  value: "bidding",
                  label:
                    job.jobSource === "REQUESTED"
                      ? "Quotes"
                      : "Bids",
                  badge: bids.length,
                };
                const detailsTab = {
                  value: "details",
                  label: "Details",
                };
                const permitsTab = {
                  value: "permits",
                  label: "Permits",
                  badge: job.permits?.length || undefined,
                };
                const invoiceTab = {
                  value: "invoice",
                  label: "Invoice",
                  badge: acceptedBid?.invoiceApproved
                    ? "✓"
                    : undefined,
                };
                const ratingTab = {
                  value: "rating",
                  label: "Rating",
                };

                // For completed jobs, show Invoice tab first (CHECK THIS FIRST)
                if (isCompleted) {
                  return [
                    invoiceTab,
                    ratingTab,
                    detailsTab,
                    permitsTab,
                    biddingTab,
                  ];
                }

                // For jobs with bids (Bid Received, Open for Bidding, or Bidding Closed), show Bidding tab first
                if (
                  jobStatus === "Bid Received" ||
                  jobStatus === "Open for Bidding" ||
                  jobStatus === "Bidding Closed" ||
                  (job.bids && job.bids.length > 0)
                ) {
                  return [
                    biddingTab,
                    detailsTab,
                    permitsTab,
                    invoiceTab,
                  ];
                }

                // Default order
                return [
                  detailsTab,
                  permitsTab,
                  biddingTab,
                  invoiceTab,
                ];
              })()}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 overflow-y-auto pb-6">
            <div className="px-4 py-4">
              <TabsContent
                value="details"
                className="space-y-4 animate-in slide-in-from-left-2 duration-300"
              >
                <JobDetailsTab job={job} />
              </TabsContent>

              <TabsContent
                value="bidding"
                className="animate-in slide-in-from-right-2 duration-300"
              >
                <BidsTabContent
                  bids={bids}
                  selectedBidId={checkedBidId}
                  onSelectBid={(bidId) =>
                    setCheckedBidId(bidId)
                  }
                  onAssignPilot={() => {
                    if (checkedBidId) {
                      handleAcceptBid(checkedBidId);
                    }
                  }}
                  jobStatus={jobStatus}
                  biddingModel={
                    job.jobSource === "REQUESTED"
                      ? "INVITED_ONLY"
                      : "OPEN_MARKET"
                  }
                  onRequestPilotCars={undefined}
                  onPostToAll={undefined}
                />

                {/* Bottom Action Bar - Only show for OPEN_MARKET pending bids */}
                {checkedBidId &&
                  pendingBids.length > 0 &&
                  job.jobSource !== "REQUESTED" &&
                  (jobStatus === "Bid Received" ||
                    jobStatus === "Bidding Closed" ||
                    jobStatus === "Open for Bidding") && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50 safe-area-inset-bottom animate-in slide-in-from-bottom duration-300">
                      <div className="max-w-5xl mx-auto p-4">
                        {checkedBid ? (
                          <div>
                            {/* Selected bid summary */}
                            <div className="flex items-center justify-between mb-2 px-0.5">
                              <span className="text-xs text-gray-500">
                                Selected
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {checkedBid.companyName} —{" "}
                                <span className="tabular-nums">
                                  $
                                  {checkedBid.amount.toLocaleString()}
                                </span>
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1 h-11 bg-white text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-medium rounded-lg active:scale-[0.98] transition-all"
                                onClick={() =>
                                  handleDeclineBid(
                                    checkedBidId!,
                                  )
                                }
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                              <Button
                                className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md active:scale-[0.98] transition-all"
                                onClick={() =>
                                  handleAcceptBid(checkedBidId!)
                                }
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                {jobStatus === "Bidding Closed"
                                  ? `Assign Selected ${bidNoun}`
                                  : `Accept ${bidNoun}`}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-sm text-gray-400 mb-2">
                              Select a {bidNounLower} above to
                              continue
                            </p>
                            <Button
                              disabled
                              className="w-full h-11 bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg"
                            >
                              {jobStatus === "Bidding Closed"
                                ? `Assign Selected ${bidNoun}`
                                : `Accept ${bidNoun}`}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </TabsContent>

              <TabsContent
                value="permits"
                className="space-y-4 animate-in slide-in-from-left-2 duration-300"
              >
                <PermitsTabContent
                  permits={job.permits}
                  origin={job.origin}
                  destination={job.destination}
                  pickupDate={job.pickupDate}
                  endDate={job.endDate}
                />
              </TabsContent>

              <TabsContent
                value="rating"
                className="space-y-4 animate-in slide-in-from-left-2 duration-300"
              >
                <RatingTabContent
                  jobRating={jobRating}
                  driverRating={(job as any).driverRating}
                  acceptedBid={acceptedBid}
                  isCompleted={isCompleted}
                  onSubmitRating={() => setRatingDrawerOpen(true)}
                />
              </TabsContent>

              <TabsContent
                value="invoice"
                className="space-y-4 animate-in slide-in-from-right-2 duration-300"
              >
                {acceptedBid?.jobStatus === "Completed" ? (
                  <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                    {/* Company Info */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Company Information
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Company
                          </div>
                          <div className="font-medium text-gray-900">
                            {acceptedBid.companyName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Email
                          </div>
                          <div className="font-medium text-gray-900 break-all">
                            {acceptedBid.companyEmail ||
                              `${acceptedBid.companyName}@example.com`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Info */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Job Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Route
                          </div>
                          <div className="font-medium text-gray-900">
                            {job.origin} → {job.destination}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-0.5">
                              Distance
                            </div>
                            <div className="font-medium text-gray-900">
                              {job.distance}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-0.5">
                              Vehicle Type
                            </div>
                            <div className="font-medium text-gray-900">
                              {job.vehicleType}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Subject
                          </div>
                          <div className="font-medium text-gray-900">
                            {job.title || job.description}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Dates */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Invoice Timeline
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Created
                          </div>
                          <div className="font-medium text-gray-900">
                            {formatDateTimeBullet(
                              job.startDate,
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Last Updated
                          </div>
                          <div className="font-medium text-gray-900">
                            {formatDateTimeBullet(job.endDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Itemized Charges */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Itemized Charges
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                        {(() => {
                          const distance = parseInt(
                            job.route?.replace(" km", "") ||
                              "0",
                          );
                          const baseRate = 2.5;
                          const waitingHours = 4.5;
                          const waitingRate = 50.0;
                          const layoverDays = 3;
                          const layoverRate = 200.0;
                          const overtimeHours = 6.0;
                          const overtimeRate = 75.0;

                          const serviceCost =
                            distance * baseRate +
                            waitingHours * waitingRate +
                            layoverDays * layoverRate +
                            overtimeHours * overtimeRate;
                          const serviceFee = serviceCost * 0.05;
                          const tax =
                            (serviceCost + serviceFee) * 0.13;
                          const netAmount =
                            serviceCost + serviceFee + tax;

                          return (
                            <>
                              <div className="space-y-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                  Base Charges
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Mileage{" "}
                                    <span className="text-gray-400">
                                      ({distance} km @ $
                                      {baseRate}/km)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    $
                                    {(
                                      distance * baseRate
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Waiting Time{" "}
                                    <span className="text-gray-400">
                                      ({waitingHours}h @ $
                                      {waitingRate}/h)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    $
                                    {(
                                      waitingHours * waitingRate
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Layover{" "}
                                    <span className="text-gray-400">
                                      ({layoverDays} days @ $
                                      {layoverRate}/day)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    $
                                    {(
                                      layoverDays * layoverRate
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Overtime{" "}
                                    <span className="text-gray-400">
                                      ({overtimeHours}h @ $
                                      {overtimeRate}/h)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    $
                                    {(
                                      overtimeHours *
                                      overtimeRate
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <Separator className="bg-gray-300" />

                              <div className="space-y-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                  Fees & Taxes
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Service Subtotal
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    ${serviceCost.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Overwize Fee{" "}
                                    <span className="text-gray-400">
                                      (5%)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    ${serviceFee.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-gray-600">
                                    Tax{" "}
                                    <span className="text-gray-400">
                                      (13%)
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900 tabular-nums">
                                    ${tax.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <Separator className="bg-gray-300" />

                              <div className="flex items-center justify-between gap-4 text-base">
                                <span className="font-semibold text-gray-900">
                                  NET AMOUNT
                                </span>
                                <span className="font-bold text-gray-900 tabular-nums">
                                  ${netAmount.toFixed(2)}
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Payment Actions */}
                    <div className="flex gap-3 pt-2">
                      <p className="text-sm text-gray-500">
                        Payment actions will appear here once
                        the invoice is reviewed.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>
                      Invoice will be available once the job is
                      marked as Completed.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="documents"
                className="space-y-4 animate-in slide-in-from-right-2 duration-300"
              >
                <div className="border-t border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-500 text-center">
                    No documents uploaded yet.
                  </p>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Bottom Action Bar - Outside Content Area */}
        <div className="border-t border-gray-200 bg-white px-4 py-3">
          {jobStatus === "Bid Received" ||
          jobStatus === "Bidding Closed" ||
          jobStatus === "Open for Bidding" ? (
            <p className="text-sm text-gray-500 text-center">
              Select a bid from the Bidding tab to continue
            </p>
          ) : jobStatus === "Assigned" ? (
            <PrimaryButton
              className="w-full h-12"
              onClick={handleStartJob}
            >
              Start Job
            </PrimaryButton>
          ) : jobStatus === "In Progress" ? (
            <PrimaryButton
              className="w-full h-12"
              onClick={handleCompleteJob}
            >
              Mark as Complete
            </PrimaryButton>
          ) : null}
        </div>

        {/* Bid Confirmation Dialog - FOR OPEN_MARKET JOBS */}
        <Dialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {confirmAction === "accept" 
                  ? "Confirm Bid Assignment" 
                  : "Decline Bid"}
              </DialogTitle>
              <DialogDescription>
                {confirmAction === "accept"
                  ? "Review the bid details before assigning this job."
                  : "Are you sure you want to decline this bid?"}
              </DialogDescription>
            </DialogHeader>

            {bidToConfirm && (
              <div className="space-y-4 py-4">
                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">
                        {bidToConfirm.companyName}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i <
                                  Math.floor(
                                    bidToConfirm.rating,
                                  )
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ),
                          )}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">
                          {bidToConfirm.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${bidToConfirm.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Bid Amount
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bid Details - only show for accept action */}
                {confirmAction === "accept" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Vehicle Type
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {bidToConfirm.vehicleType}
                      </span>
                    </div>

                    {bidToConfirm.responseTime && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">
                          Response Time
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {bidToConfirm.responseTime}
                        </span>
                      </div>
                    )}

                    {bidToConfirm.estimatedDistance && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">
                          Distance
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {bidToConfirm.estimatedDistance}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Decline warning message */}
                {confirmAction === "decline" && (
                  <p className="text-sm text-gray-600">
                    This bid will be marked as declined and the pilot car company will be notified.
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              {confirmAction === "accept" ? (
                <PrimaryButton onClick={handleConfirmBidAccept}>
                  Confirm Assignment
                </PrimaryButton>
              ) : (
                <Button 
                  onClick={confirmBidAction}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  Decline Bid
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Accept Invoice Dialog */}
        <Dialog
          open={acceptDialogOpen}
          onOpenChange={setAcceptDialogOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Accept Invoice</DialogTitle>
              <DialogDescription>
                Please confirm you want to accept this invoice
                for payment.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-gray-600 py-4">
              By accepting, you acknowledge the invoice is
              correct and payment will be processed.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAcceptDialogOpen(false)}
              >
                Cancel
              </Button>
              <PrimaryButton
                onClick={() => {
                  setInvoiceStatus("Accepted");
                  setAcceptDialogOpen(false);
                  showSnackbar(
                    "Invoice accepted successfully",
                    "success",
                  );
                }}
              >
                Accept Invoice
              </PrimaryButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Raise Dispute Sheet */}
        <RaiseDisputeSheet
          open={disputeSheetOpen}
          onOpenChange={setDisputeSheetOpen}
          jobId={job.id}
          onDisputeSubmitted={(data) => {
            setDisputeData(data);
            setInvoiceStatus("Disputed");
            showSnackbar(
              "Dispute raised successfully",
              "success",
            );
          }}
        />

        {/* End Bidding Dialog */}
        <Dialog
          open={endBidDialogOpen}
          onOpenChange={setEndBidDialogOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>End Bidding Period</DialogTitle>
              <DialogDescription>
                Are you sure you want to close bidding for this
                job?
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-gray-600 py-4">
              No new bids will be accepted after closing. You
              can review and accept pending bids.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEndBidDialogOpen(false)}
              >
                Cancel
              </Button>
              <PrimaryButton onClick={handleEndBidding}>
                End Bidding
              </PrimaryButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pilot Car Rating Drawer */}
        {acceptedBid && (
          <PilotCarRatingDrawer
            open={ratingDrawerOpen}
            onOpenChange={setRatingDrawerOpen}
            tripId={job.tripId}
            pilotCarId={acceptedBid.id}
            pilotCarName={acceptedBid.companyName}
            onSubmitSuccess={handleRatingSubmit}
          />
        )}
      </div>
    </div>
  );
}