import { useState, useEffect, useRef } from "react";
import {
  formatDate,
  formatDateTimeBullet,
} from "../utils/dateFormat";
import {
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Receipt,
  Search,
  Filter,
  X,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import RaiseDisputeSheet, { DisputeData } from "./RaiseDisputeSheet";
import { useSnackbar } from "../contexts/SnackbarContext";

interface InvoiceTabContentProps {
  relatedJobs: any[];
}

export default function InvoiceTabContent({
  relatedJobs,
}: InvoiceTabContentProps) {
  const [expandedInvoices, setExpandedInvoices] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "past-due"
  >("all");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Invoice management states
  const [invoiceStatuses, setInvoiceStatuses] = useState<{
    [key: string]: "Awaiting Review" | "Disputed" | "Accepted" | "Payment Pending" | "Paid";
  }>({});
  const [disputeData, setDisputeData] = useState<{
    [key: string]: DisputeData | null;
  }>({});
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [disputeSheetOpen, setDisputeSheetOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // User role (for demo purposes - in real app, this would come from auth context)
  const [userRole] = useState<"individual" | "company-invited">("individual");

  // Snackbar context
  const { showSnackbar } = useSnackbar();

  const toggleExpanded = (jobId: string) => {
    setExpandedInvoices((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  // Get invoice status for a job
  const getInvoiceStatus = (jobId: string) => {
    return invoiceStatuses[jobId] || "Awaiting Review";
  };

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const completedJobs = relatedJobs.filter((job) => {
    const acceptedBid = job.bids.find(
      (bid: any) => bid.status === "Accepted",
    );
    return acceptedBid?.jobStatus === "Completed";
  });

  const pendingCount = completedJobs.filter((job) => {
    const acceptedBid = job.bids.find(
      (bid: any) => bid.status === "Accepted",
    );
    return !acceptedBid?.invoiceApproved;
  }).length;

  // Filter and search logic
  const filteredJobs = completedJobs.filter((job, index) => {
    const bid = job.bids.find(
      (bid: any) => bid.status === "Accepted",
    );
    if (!bid) return false;

    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      job.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      job.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      bid.companyName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (filterStatus === "paid") {
      matchesStatus = bid.invoiceApproved === true;
    } else if (filterStatus === "pending") {
      matchesStatus = !bid.invoiceApproved && index !== 1;
    } else if (filterStatus === "past-due") {
      matchesStatus = !bid.invoiceApproved && index === 1;
    }

    return matchesSearch && matchesStatus;
  });

  if (completedJobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <Receipt className="h-10 w-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">
          No invoices available
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Invoice summaries will appear here when jobs are
          completed
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      {/* Sticky Header with Search and Filter */}
      <div
        ref={headerRef}
        className={`sticky top-0 z-20 bg-white border-b border-gray-200 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Invoices
          </h2>
          {pendingCount > 0 && (
            <Badge className="bg-red-100 text-red-700 border-0 text-xs px-2 py-0.5">
              {pendingCount} Pending
            </Badge>
          )}
        </div>

        {/* Search Bar and Filter Dropdown */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-10 bg-gray-50 border-gray-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <Select
              value={filterStatus}
              onValueChange={(value: any) =>
                setFilterStatus(value)
              }
            >
              <SelectTrigger className="w-[120px] h-10 bg-gray-50 border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All ({completedJobs.length})
                </SelectItem>
                <SelectItem value="pending">
                  Pending ({pendingCount})
                </SelectItem>
                <SelectItem value="paid">
                  Paid (
                  {
                    completedJobs.filter(
                      (_, i) =>
                        completedJobs.findIndex(
                          (j) =>
                            j.bids.find(
                              (b: any) =>
                                b.status === "Accepted",
                            )?.invoiceApproved,
                        ) === i,
                    ).length
                  }
                  )
                </SelectItem>
                <SelectItem value="past-due">
                  Past Due
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Consolidated Total Summary */}
      <div className="px-4 py-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-600">
              Total Invoice Amount
            </p>
            <p className="font-bold text-gray-900 text-[24px]">
              $
              {completedJobs
                .reduce((total, job) => {
                  const bid = job.bids.find(
                    (bid: any) => bid.status === "Accepted",
                  );
                  if (!bid) return total;

                  const distance = parseFloat(
                    job.route?.replace(" km", "") || "0",
                  );
                  const baseRate = 1.5;
                  const waitingHours = 3;
                  const waitingRate = 45;
                  const layoverDays = 1;
                  const layoverRate = 150;
                  const overtimeHours = 2;
                  const overtimeRate = 60;

                  const totalAmount =
                    distance * baseRate +
                    waitingHours * waitingRate +
                    layoverDays * layoverRate +
                    overtimeHours * overtimeRate;

                  return total + totalAmount;
                }, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>{pendingCount} Pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>
                  {
                    completedJobs.filter((job) => {
                      const bid = job.bids.find(
                        (b: any) => b.status === "Accepted",
                      );
                      return bid?.invoiceApproved;
                    }).length
                  }{" "}
                  Paid
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Receipt className="w-3 h-3 text-gray-500" />
                <span>{completedJobs.length} Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="p-4 space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No invoices found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredJobs.map((job, index) => {
            const bid = job.bids.find(
              (bid: any) => bid.status === "Accepted",
            );
            if (!bid) return null;

            // Calculate total with fees and tax
            const baseRate = 2.5;
            const waitingRate = 50.0;
            const layoverRate = 200.0;
            const overtimeRate = 75.0;
            const distance = parseInt(
              job.route?.replace(" km", "") || "0",
            );
            const waitingHours = 4.5;
            const layoverDays = 3;
            const overtimeHours = 6.0;
            
            const serviceCost =
              distance * baseRate +
              waitingHours * waitingRate +
              layoverDays * layoverRate +
              overtimeHours * overtimeRate;
            const serviceFee = serviceCost * 0.05; // 5% Overwize fee
            const tax = (serviceCost + serviceFee) * 0.13; // 13% tax
            const netAmount = serviceCost + serviceFee + tax;

            // Get invoice status
            const invoiceStatus = getInvoiceStatus(job.id);
            const jobDisputeData = disputeData[job.id];

            // Status badge configuration
            const getStatusBadge = () => {
              switch (invoiceStatus) {
                case "Awaiting Review":
                  return {
                    text: "⚠ Awaiting Review",
                    className: "bg-yellow-100 text-yellow-700 border-0",
                  };
                case "Accepted":
                  return {
                    text: "✔ Accepted",
                    className: "bg-green-100 text-green-700 border-0",
                  };
                case "Payment Pending":
                  return {
                    text: "💰 Payment Pending",
                    className: "bg-blue-100 text-blue-700 border-0",
                  };
                case "Disputed":
                  return {
                    text: "⚠ Disputed",
                    className: "bg-orange-100 text-orange-700 border-0",
                  };
                case "Paid":
                  return {
                    text: "✔ Paid",
                    className: "bg-green-100 text-green-700 border-0",
                  };
                default:
                  return {
                    text: "Draft",
                    className: "bg-gray-100 text-gray-700 border-0",
                  };
              }
            };

            const statusBadge = getStatusBadge();
            const isExpanded =
              expandedInvoices[job.id] || false;

            return (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* Main Invoice Card - Summary View */}
                <div className="p-3">
                  {/* Invoice Icon */}
                  <div className="flex justify-center mb-2">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                      <div className="absolute inset-0 bg-white/40 rounded-lg" />
                      <Receipt className="w-5 h-5 text-blue-500 relative z-10" />
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">
                          $
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount - Centered */}
                  <div className="text-center mb-0.5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {netAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      USD
                    </h3>
                  </div>

                  {/* Invoice Number - Centered */}
                  <div className="text-center mb-3">
                    <p className="text-xs text-gray-500">
                      No. {job.id}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2" />

                  {/* Two Column Summary */}
                  <div className="space-y-1.5">
                    {/* Status Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Status
                      </span>
                      <Badge
                        className={`text-xs px-2.5 py-0.5 ${statusBadge.className}`}
                      >
                        {statusBadge.text}
                      </Badge>
                    </div>

                    {/* Payment Date Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Payment Date
                      </span>
                      <span className="text-xs font-medium text-gray-900">
                        {invoiceStatus === "Paid"
                          ? `Paid at ${formatDate(job.endDate)}`
                          : "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-8"
                      onClick={() => toggleExpanded(job.id)}
                    >
                      <span className="text-xs font-medium">
                        {isExpanded
                          ? "Hide Details"
                          : "View Details"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 ml-2 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Expandable Details Section */}
                {isExpanded && (
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
                            {bid.companyName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">
                            Email
                          </div>
                          <div className="font-medium text-gray-900 break-all">
                            {bid.companyEmail ||
                              `${bid.companyName}@example.com`}
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
                              {distance} km
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
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Base Charges
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">
                              Mileage{" "}
                              <span className="text-gray-400">
                                ({distance} km @ ${baseRate}/km)
                              </span>
                            </span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${(distance * baseRate).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">
                              Waiting Time{" "}
                              <span className="text-gray-400">
                                ({waitingHours}h @ ${waitingRate}/h)
                              </span>
                            </span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${(waitingHours * waitingRate).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">
                              Layover{" "}
                              <span className="text-gray-400">
                                ({layoverDays} days @ ${layoverRate}/day)
                              </span>
                            </span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${(layoverDays * layoverRate).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">
                              Overtime{" "}
                              <span className="text-gray-400">
                                ({overtimeHours}h @ ${overtimeRate}/h)
                              </span>
                            </span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${(overtimeHours * overtimeRate).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        {/* Summary Section */}
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Summary
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">Service Cost</span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${serviceCost.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">Overwize Service Fee (5%)</span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${serviceFee.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-gray-600">Tax (13%)</span>
                            <span className="font-medium text-gray-900 tabular-nums">
                              ${tax.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        {/* Net Amount Payable - Prominent */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-bold text-blue-900 text-base">
                              Net Amount Payable
                            </span>
                            <span className="font-bold text-blue-900 text-xl tabular-nums">
                              ${netAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* System Note */}
                        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200 mt-3">
                          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-blue-900">
                            Grace period applies for waiting time
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information Banner (for Accepted/Payment Pending status) */}
                    {(invoiceStatus === "Accepted" || invoiceStatus === "Payment Pending") && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">
                            Payment Required
                          </p>
                          <p className="text-sm text-blue-800">
                            Payment must be completed through the Web Portal. Please log in to your account on the web to proceed with payment.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Dispute Details Section (Show when disputed) */}
                    {invoiceStatus === "Disputed" && jobDisputeData && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-xs font-semibold text-amber-900 uppercase tracking-wide flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Dispute Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <div className="text-xs text-amber-700 font-medium mb-1">
                              Reason
                            </div>
                            <div className="text-amber-900">
                              {jobDisputeData.reason}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-amber-700 font-medium mb-1">
                              Description
                            </div>
                            <div className="text-amber-900">
                              {jobDisputeData.description}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-amber-700 font-medium mb-1">
                              Submitted On
                            </div>
                            <div className="text-amber-900">
                              {formatDateTimeBullet(jobDisputeData.submittedOn)}
                            </div>
                          </div>
                          {jobDisputeData.evidence.length > 0 && (
                            <div>
                              <div className="text-xs text-amber-700 font-medium mb-1">
                                Evidence Attached
                              </div>
                              <div className="text-amber-900">
                                {jobDisputeData.evidence.length} file(s)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons - Role-Based Visibility */}
                    {userRole === "individual" && invoiceStatus === "Awaiting Review" && (
                      <div className="flex flex-col gap-3 pt-2">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-semibold shadow-sm"
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setAcceptDialogOpen(true);
                          }}
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Accept Invoice
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold"
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setDisputeSheetOpen(true);
                          }}
                        >
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Raise Dispute
                        </Button>
                      </div>
                    )}

                    {/* Read-only view for company-invited drivers */}
                    {userRole === "company-invited" && invoiceStatus === "Awaiting Review" && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <Info className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          You have view-only access to this invoice.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Contact the trip owner for invoice actions.
                        </p>
                      </div>
                    )}

                    {/* Show message when invoice is disputed */}
                    {invoiceStatus === "Disputed" && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600">
                          This invoice is currently under dispute and cannot be modified.
                        </p>
                      </div>
                    )}

                    {/* Accepted/Paid status message */}
                    {(invoiceStatus === "Accepted" || invoiceStatus === "Paid") && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-900">
                          {invoiceStatus === "Paid" ? "Invoice Paid" : "Invoice Accepted"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {invoiceStatus === "Paid" 
                            ? "Payment has been processed successfully." 
                            : "Awaiting payment completion on the web portal."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Accept Invoice Confirmation Dialog */}
      <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Accept Invoice
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              By accepting this invoice, you confirm the charges are accurate.
              Payment must be completed through the Web Portal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setAcceptDialogOpen(false)}
              className="w-full sm:w-auto h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedJobId) {
                  setInvoiceStatuses(prev => ({
                    ...prev,
                    [selectedJobId]: "Payment Pending"
                  }));
                  setAcceptDialogOpen(false);
                  showSnackbar(
                    "Invoice accepted successfully. Please complete payment via Web Portal.",
                    "success"
                  );
                }
              }}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white h-11 font-semibold"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Raise Dispute Sheet */}
      {selectedJobId && (
        <RaiseDisputeSheet
          open={disputeSheetOpen}
          onOpenChange={setDisputeSheetOpen}
          jobId={selectedJobId}
          onDisputeSubmitted={(data) => {
            setDisputeData(prev => ({
              ...prev,
              [selectedJobId]: data
            }));
            setInvoiceStatuses(prev => ({
              ...prev,
              [selectedJobId]: "Disputed"
            }));
          }}
        />
      )}
    </div>
  );
}