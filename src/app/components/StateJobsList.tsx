import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AlertBanner } from "./ui/alert";
import { formatDate, formatTime24h } from "../utils/dateFormat";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  ChevronRight,
  CheckCircle,
  Truck,
  CircleDot,
  Timer,
  Eye,
  Gavel,
  ClipboardCheck,
  ArrowRight,
  MapIcon,
  Download,
  Map,
  CheckCircle2,
} from "lucide-react";
import RouteSurveyMapDrawer, {
  RouteSurveyInfo,
} from "./RouteSurveyMapDrawer";
import { useSnackbar } from "../contexts/SnackbarContext";

// State-level Job Interface
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

interface StateJobsListProps {
  jobs: StateJob[];
  onJobClick: (job: StateJob) => void;
  onAssign?: (job: StateJob) => void;
  onEndBidding?: (job: StateJob) => void;
  hideFilters?: boolean;
}

type FilterTab =
  | "all"
  | "Open for Bidding"
  | "Bid Received"
  | "Bidding Closed"
  | "Assigned"
  | "In Progress"
  | "Completed"
  | "Expired";

// Urgency thresholds in hours
const URGENCY_WARNING_HOURS = 24;
const URGENCY_CRITICAL_HOURS = 6;

export default function StateJobsList({
  jobs,
  onJobClick,
  onAssign,
  onEndBidding,
  hideFilters,
}: StateJobsListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [surveyMapJob, setSurveyMapJob] =
    useState<StateJob | null>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const { showSnackbar } = useSnackbar();

  // Generate and download the completed route survey report for a job
  const handleDownloadSurveyReport = (job: StateJob) => {
    const survey = job.routeSurvey;
    if (!survey) return;

    const jobRef = job.pilotJobId || job.id;
    const completedAt = new Date(survey.completedAt);
    const lines = [
      "ROUTE SURVEY REPORT",
      "===================",
      "",
      `Report ID:       RS-${jobRef}`,
      `Trip:            ${job.tripId}`,
      `Job:             ${jobRef}`,
      `State:           ${job.state} (${job.stateCode})`,
      `Route:           ${job.origin} -> ${job.destination}`,
      "",
      `Survey Status:   ${survey.status}`,
      `Completed:       ${completedAt.toLocaleString()}`,
      `Surveyed By:     ${survey.surveyorName ?? "N/A"}`,
      `Distance:        ${survey.distanceMiles != null ? `${survey.distanceMiles} mi` : "N/A"}`,
      `Observations:    ${survey.observations ?? survey.observationsList?.length ?? 0}`,
      "",
      "OBSERVATIONS",
      "------------",
      ...(survey.observationsList?.length
        ? survey.observationsList.flatMap((obs, i) => [
            `${i + 1}. [${obs.severity.toUpperCase()}] ${obs.title}`,
            `   Location: ${obs.location}${obs.milepost ? ` (${obs.milepost})` : ""}`,
            `   Recorded: ${new Date(obs.recordedAt).toLocaleString()}`,
            ...(obs.note ? [`   Note: ${obs.note}`] : []),
            "",
          ])
        : ["No observations recorded.", ""]),
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Route-Survey-Report-${jobRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showSnackbar(
      `Route survey report for ${jobRef} downloaded`,
      "success",
    );
  };

  // Calculate counts per actual job status
  const counts = useMemo(() => {
    const totalCount = jobs.length;
    const openForBiddingCount = jobs.filter(
      (j) => j.status === "Open for Bidding",
    ).length;
    const bidReceivedCount = jobs.filter(
      (j) => j.status === "Bid Received",
    ).length;
    const biddingClosedCount = jobs.filter(
      (j) => j.status === "Bidding Closed",
    ).length;
    const assignedCount = jobs.filter(
      (j) => j.status === "Assigned",
    ).length;
    const inProgressCount = jobs.filter(
      (j) => j.status === "In Progress",
    ).length;
    const completedCount = jobs.filter(
      (j) => j.status === "Completed",
    ).length;
    const expiredCount = jobs.filter(
      (j) => j.status === "Expired",
    ).length;

    return {
      totalCount,
      openForBiddingCount,
      bidReceivedCount,
      biddingClosedCount,
      assignedCount,
      inProgressCount,
      completedCount,
      expiredCount,
    };
  }, [jobs]);

  // Filter jobs based on active tab
  const filteredJobs = useMemo(() => {
    if (activeTab === "all") return jobs;
    return jobs.filter((j) => j.status === activeTab);
  }, [jobs, activeTab]);

  // Calculate hours until expiry
  const getHoursUntilExpiry = (
    expiryDate: string,
    expiryTime: string,
  ): number => {
    const expiry = new Date(`${expiryDate}T${expiryTime}`);
    const now = new Date();
    return (
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
  };

  // Get urgency level: 'critical' (<6h), 'warning' (<24h), 'normal', or 'expired'
  const getUrgencyLevel = (
    expiryDate: string,
    expiryTime: string,
  ): "critical" | "warning" | "normal" | "expired" => {
    const hours = getHoursUntilExpiry(expiryDate, expiryTime);
    if (hours <= 0) return "expired";
    if (hours < URGENCY_CRITICAL_HOURS) return "critical";
    if (hours < URGENCY_WARNING_HOURS) return "warning";
    return "normal";
  };

  // Format remaining time human-readable
  const formatTimeRemaining = (
    expiryDate: string,
    expiryTime: string,
  ): string => {
    const hours = getHoursUntilExpiry(expiryDate, expiryTime);
    if (hours <= 0) return "Expired";
    if (hours < 1) {
      const mins = Math.ceil(hours * 60);
      return `${mins}m remaining`;
    }
    if (hours < 24) {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return m > 0
        ? `${h}h ${m}m remaining`
        : `${h}h remaining`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return remainingHours > 0
      ? `${days}d ${remainingHours}h remaining`
      : `${days}d remaining`;
  };

  // Format expiry date/time for display
  const formatExpiry = (date: string, time: string): string => {
    const expiry = new Date(`${date}T${time}`);
    return `${formatDate(expiry)} ${formatTime24h(expiry)}`;
  };

  // Get status badge styling — softer colors for modern look
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open for Bidding":
        return {
          classes: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };
      case "Bid Received":
        return {
          classes:
            "bg-orange-50 text-orange-700 border-orange-200",
          dot: "bg-orange-500",
        };
      case "Bidding Closed":
        return {
          classes:
            "bg-slate-50 text-slate-600 border-slate-200",
          dot: "bg-slate-500",
        };
      case "Assigned":
        return {
          classes:
            "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
        };
      case "In Progress":
        return {
          classes:
            "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };
      case "Completed":
        return {
          classes:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Expired":
        return {
          classes: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };
      default:
        return {
          classes: "bg-gray-50 text-gray-600 border-gray-200",
          dot: "bg-gray-500",
        };
    }
  };

  // Context-aware CTA label
  const getCtaLabel = (
    status: string,
  ): { label: string; icon: React.ReactNode } => {
    switch (status) {
      case "Open for Bidding":
        return {
          label: "Place Bid",
          icon: <Gavel className="h-3.5 w-3.5" />,
        };
      case "Bid Received":
        return {
          label: "View Bids",
          icon: <Eye className="h-3.5 w-3.5" />,
        };
      case "Bidding Closed":
        return {
          label: "Review",
          icon: <ClipboardCheck className="h-3.5 w-3.5" />,
        };
      case "Assigned":
        return {
          label: "View Assignment",
          icon: <CheckCircle className="h-3.5 w-3.5" />,
        };
      case "In Progress":
        return {
          label: "Track Escort",
          icon: <Truck className="h-3.5 w-3.5" />,
        };
      case "Completed":
        return {
          label: "View Summary",
          icon: <Eye className="h-3.5 w-3.5" />,
        };
      case "Expired":
        return {
          label: "View Details",
          icon: <ChevronRight className="h-3.5 w-3.5" />,
        };
      default:
        return {
          label: "View Details",
          icon: <ChevronRight className="h-3.5 w-3.5" />,
        };
    }
  };

  // CTA button style based on status — 3 levels: Primary (Orange), Secondary (Neutral), Tertiary (Outline)
  const getCtaStyle = (status: string): string => {
    switch (status) {
      case "Open for Bidding":
        return "bg-[#F89823] text-[#1a1a1a] hover:bg-[#e08820] border-[#F89823]"; // Primary
      case "Bid Received":
        return "bg-[#F89823] text-[#1a1a1a] hover:bg-[#e08820] border-[#F89823]"; // Primary
      case "Bidding Closed":
        return "bg-slate-600 text-white hover:bg-slate-700 border-slate-600"; // Secondary
      case "Assigned":
        return "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"; // Tertiary
      case "In Progress":
        return "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"; // Tertiary
      case "Completed":
        return "border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"; // Tertiary
      case "Expired":
        return "border-gray-300 text-gray-500 hover:bg-gray-50 bg-transparent"; // Tertiary
      default:
        return "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"; // Tertiary
    }
  };

  // Build filters dynamically — only show statuses that have jobs
  const allFilters: {
    key: FilterTab;
    label: string;
    count: number;
  }[] = [
    { key: "all", label: "All", count: counts.totalCount },
    {
      key: "Open for Bidding",
      label: "Open",
      count: counts.openForBiddingCount,
    },
    {
      key: "Bid Received",
      label: "Bids In",
      count: counts.bidReceivedCount,
    },
    {
      key: "Bidding Closed",
      label: "Closed",
      count: counts.biddingClosedCount,
    },
    {
      key: "Assigned",
      label: "Assigned",
      count: counts.assignedCount,
    },
    {
      key: "In Progress",
      label: "Active",
      count: counts.inProgressCount,
    },
    {
      key: "Completed",
      label: "Done",
      count: counts.completedCount,
    },
    {
      key: "Expired",
      label: "Expired",
      count: counts.expiredCount,
    },
  ];

  const filters = allFilters.filter(
    (f) => f.key === "all" || f.count > 0,
  );

  // Scroll active filter pill into view (horizontal only)
  useEffect(() => {
    if (filterScrollRef.current) {
      const activeButton =
        filterScrollRef.current.querySelector(
          '[data-active="true"]',
        ) as HTMLElement;
      if (activeButton) {
        // Only scroll the container horizontally, don't affect page scroll
        const container = filterScrollRef.current;
        const scrollLeft =
          activeButton.offsetLeft -
          container.clientWidth / 2 +
          activeButton.clientWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  // ── Route Survey Card ─────────────────────────────────────────────────────
  const RouteSurveyCard = ({ job }: { job: StateJob }) => {
    if (!job.allPermitsApproved || job.routeSurvey?.status !== "Completed") {
      return null;
    }
    const survey = job.routeSurvey;
    const surveyDate = new Date(survey.completedAt);
    const surveyDateStr = `${String(surveyDate.getMonth() + 1).padStart(2, "0")}/${String(surveyDate.getDate()).padStart(2, "0")}/${surveyDate.getFullYear()}`;
    const surveyTimeStr = `${String(surveyDate.getHours()).padStart(2, "0")}:${String(surveyDate.getMinutes()).padStart(2, "0")}`;

    return (
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md active:scale-[0.99]"
        onClick={() => onJobClick(job)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onJobClick(job);
          }
        }}
        aria-label={`View details for ${job.state} pilot car job ${job.pilotJobId || job.id}`}
      >
        {/* Subtle emerald accent line */}
        <div/>

        <div className="px-3 pt-3 pb-1">
          {/* Header row — job identity */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-gray-900 flex items-center gap-2 font-semibold">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#F0FDF4] text-[11px] text-[#16A34A] shrink-0 font-medium">
                  {job.stateCode}
                </span>
                {job.state}
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5 ml-9 flex items-center gap-1">
                <Map className="h-3 w-3 text-[#16A34A]" />
                Route Survey · {job.pilotJobId || job.id}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] font-semibold text-[#16A34A] shrink-0">
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </span>
          </div>

          {/* Meta row */}
          <div className="mt-2 ml-9 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="tabular-nums">{surveyDateStr}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="tabular-nums">{surveyTimeStr}</span>
            </div>
            {survey.surveyorName && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="text-gray-300">·</span>
                <span className="truncate max-w-[120px]">{survey.surveyorName}</span>
              </div>
            )}
          </div>

          {/* Observation / distance meta */}
          {(survey.observations !== undefined || survey.distanceMiles !== undefined) && (
            <div className="mt-1.5 ml-9 flex items-center gap-3">
              {survey.observations !== undefined && (
                <span className="text-[11px] text-gray-400">
                  <span className="font-medium text-gray-600 tabular-nums">{survey.observations}</span> observations
                </span>
              )}
              {survey.distanceMiles !== undefined && (
                <span className="text-[11px] text-gray-400">
                  <span className="font-medium text-gray-600 tabular-nums">{survey.distanceMiles}</span> mi surveyed
                </span>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 mt-3 border-t border-gray-100" />

        {/* Actions */}
        <div className="px-3 py-2.5 grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadSurveyReport(job);
            }}
            aria-label={`Download route survey report for ${job.state} job ${job.pilotJobId || job.id}`}
            className="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-gray-200 bg-white text-[12px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-500" />
            Download Report
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSurveyMapJob(job);
            }}
            aria-label={`View route survey map for ${job.state} job ${job.pilotJobId || job.id}`}
            className="flex items-center justify-center gap-1.5 h-9 rounded-lg bg-[#F89823] hover:bg-[#e8880d] active:bg-[#d97d0b] text-[12px] font-semibold text-[#1a1a1a] transition-colors"
          >
            <Map className="h-3.5 w-3.5" />
            View Route Map
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Sticky Filter Pills */}
      {!hideFilters && (
        <div className="sticky top-0 z-10 pb-2 pt-1 -mx-4 px-4 bg-[#ffffff]">
          <div
            ref={filterScrollRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Filter jobs by status"
          >
            {filters.map((filter) => {
              const isActive = activeTab === filter.key;
              return (
                <button
                  key={filter.key}
                  data-active={isActive}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="job-cards-list"
                  className={`px-2.5 py-1 rounded-full text-xs font-normal whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(filter.key)}
                >
                  {filter.label} ({filter.count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-1">
            No jobs match this filter
          </p>
          <Button
            variant="link"
            onClick={() => setActiveTab("all")}
            className="text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            Show all jobs
          </Button>
        </div>
      )}

      {/* Job Cards */}
      <div
        id="job-cards-list"
        role="tabpanel"
        className="space-y-4"
      >
        {filteredJobs.map((job) => {
          const hasCompletedSurvey =
            job.allPermitsApproved === true &&
            job.routeSurvey?.status === "Completed";

          // All permits approved + survey done — show only the Route Survey card
          if (hasCompletedSurvey) {
            return <RouteSurveyCard key={job.id} job={job} />;
          }

          const urgency = getUrgencyLevel(
            job.bidExpiryDate,
            job.bidExpiryTime,
          );
          const statusBadge = getStatusBadge(job.status);
          const cta = getCtaLabel(job.status);
          const ctaStyle = getCtaStyle(job.status);
          const isExpired = job.status === "Expired";
          const isInProgress = job.status === "In Progress";
          const isCompleted = job.status === "Completed";
          const showUrgency =
            (job.status === "Open for Bidding" ||
              job.status === "Bid Received") &&
            !isExpired;

          return (
            <div
              key={job.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all cursor-pointer active:scale-[0.99] ${
                isInProgress
                  ? "border-purple-200 shadow-md shadow-purple-50"
                  : isCompleted
                    ? "border-gray-200 shadow-sm opacity-90"
                    : urgency === "critical" && showUrgency
                      ? "border-red-300 shadow-md shadow-red-50"
                      : urgency === "warning" && showUrgency
                        ? "border-amber-300 shadow-sm shadow-amber-50"
                        : job.status === "Open for Bidding" ||
                            job.status === "Bid Received"
                          ? "border-blue-200 shadow-sm hover:shadow-md"
                          : "border-gray-200 shadow-sm hover:shadow-md"
              }`}
              onClick={() => onJobClick(job)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onJobClick(job);
                }
              }}
              aria-label={`View details for ${job.state} pilot car job ${job.id}`}
            >
              {/* Urgency Banner (critical/warning only) */}
              {showUrgency && urgency === "critical" && (
                <div className="bg-red-600 px-3 py-1 flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs text-white font-semibold">
                    {formatTimeRemaining(
                      job.bidExpiryDate,
                      job.bidExpiryTime,
                    )}
                  </span>
                </div>
              )}
              {showUrgency && urgency === "warning" && (
                <div className="bg-amber-500 px-3 py-1 flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs text-white font-semibold">
                    {formatTimeRemaining(
                      job.bidExpiryDate,
                      job.bidExpiryTime,
                    )}
                  </span>
                </div>
              )}

              {/* Card Header — State Name prominent, Job ID secondary */}
              <div className="px-3 pt-3 pb-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-gray-900 flex items-center gap-2 font-semibold">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-[11px] text-gray-600 shrink-0 font-medium">
                        {job.stateCode}
                      </span>
                      {job.state}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 ml-9">
                      {job.pilotJobId || job.id}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${statusBadge.classes} border font-medium text-[11px] px-2 py-0.5 shrink-0 flex items-center gap-1`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}
                    />
                    {job.status}
                  </Badge>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-3 border-t border-gray-100" />

              {/* Section A — Primary Info: Location, Date/Time */}
              <div className="px-3 py-2.5 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#F89823] mt-0.5 shrink-0" />
                  <span className="text-[13px] font-medium text-gray-800 leading-tight">
                    {job.entryLocation}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>{job.entryDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span>{job.entryTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-[13px] text-gray-600">
                    {job.positions}
                  </span>
                </div>
                {/* Route indicator */}
                <div className="flex items-center gap-2">
                  <MapIcon className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">
                    {job.origin} → {job.destination}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-3 border-t border-gray-100" />

              {/* Section B — Status-specific Info */}
              <div className="px-3 py-2.5">
                {/* No bids yet */}
                {job.bidCount === 0 &&
                  !isInProgress &&
                  !isCompleted &&
                  !isExpired && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                        <Users className="h-3.5 w-3.5 text-gray-300" />
                      </div>
                      <span className="text-[13px] text-gray-400">
                        No bids received yet
                      </span>
                    </div>
                  )}

                {/* Bids received */}
                {job.bidCount > 0 &&
                  job.status !== "Bidding Closed" &&
                  job.status !== "Assigned" &&
                  !isInProgress &&
                  !isCompleted && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <Users className="h-3.5 w-3.5 text-orange-600" />
                      </div>
                      <div>
                        <span className="text-[13px] font-medium text-gray-900">
                          {job.bidCount}{" "}
                          {job.bidCount === 1
                            ? (job.jobSource === "REQUESTED" ? "Quote" : "Bid")
                            : (job.jobSource === "REQUESTED" ? "Quotes" : "Bids")}{" "}
                          Received
                        </span>
                      </div>
                    </div>
                  )}

                {/* Bidding Closed — review prompt */}
                {job.status === "Bidding Closed" &&
                  !job.assignedTo && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <ClipboardCheck className="h-3.5 w-3.5 text-slate-600" />
                      </div>
                      <div>
                        <span className="text-[13px] font-medium text-gray-800">
                          {job.bidCount}{" "}
                          {job.bidCount === 1
                            ? (job.jobSource === "REQUESTED" ? "quote" : "bid")
                            : (job.jobSource === "REQUESTED" ? "quotes" : "bids")}{" "}
                          to review
                        </span>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Bidding closed — ready to assign
                        </p>
                      </div>
                    </div>
                  )}

                {/* Assigned / In Progress */}
                {(job.status === "Assigned" || isInProgress) &&
                  job.assignedTo && (
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isInProgress
                            ? "bg-purple-50"
                            : "bg-green-50"
                        }`}
                      >
                        {isInProgress ? (
                          <Truck className="h-3.5 w-3.5 text-purple-600" />
                        ) : (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                          {isInProgress
                            ? "Escorted by"
                            : "Assigned to"}
                        </p>
                        <p className="text-[13px] font-medium text-gray-900 mt-0.5">
                          {job.assignedTo}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Completed */}
                {isCompleted && job.assignedTo && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Completed by
                      </p>
                      <p className="text-[13px] font-medium text-gray-900 mt-0.5">
                        {job.assignedTo}
                      </p>
                    </div>
                  </div>
                )}

                {/* Expired */}
                {isExpired && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <span className="text-[13px] text-red-700">
                      Bidding expired — no assignment made
                    </span>
                  </div>
                )}
              </div>

              {/* Section C — Expiry Indicator (normal urgency, not shown for critical/warning since banner handles it) */}
              {showUrgency && urgency === "normal" && (
                <div className="mx-3 mb-2.5 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span className="text-[11px] text-blue-700">
                      Bidding ends{" "}
                      {formatExpiry(
                        job.bidExpiryDate,
                        job.bidExpiryTime,
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* In-Progress banner */}
              {isInProgress && (
                <div className="mx-3 mb-2.5 px-2.5 py-1.5 rounded-lg bg-purple-50 border border-purple-100 flex items-center gap-2">
                  <CircleDot className="h-3.5 w-3.5 text-purple-600 animate-pulse shrink-0" />
                  <span className="text-[11px] text-purple-700">
                    Escort in progress
                  </span>
                </div>
              )}

              {/* Completed banner */}
              {isCompleted && (
                <div className="mx-3 mb-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-emerald-700">
                    Escort completed
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <div className="px-3 pb-3 pt-1">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onJobClick(job);
                  }}
                  className={`w-full h-11 rounded-lg text-xs gap-1.5 transition-all font-medium ${ctaStyle}`}
                >
                  {cta.icon}
                  {cta.label}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Route Survey Map — recorded route and observations for the selected job */}
      <RouteSurveyMapDrawer
        job={surveyMapJob}
        open={surveyMapJob !== null}
        onOpenChange={(open) => {
          if (!open) setSurveyMapJob(null);
        }}
      />
    </div>
  );
}