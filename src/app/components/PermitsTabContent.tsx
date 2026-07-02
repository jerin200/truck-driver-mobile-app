import {
  FileText,
  CheckCircle2,
  DollarSign,
  Clock,
  XCircle,
  AlertTriangle,
  Info,
  Download,
  RefreshCw,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "../utils/dateFormat";
import PermitRouteDisplay from "./PermitRouteDisplay";

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

interface PermitsTabContentProps {
  permits?: PermitJurisdiction[];
  userRole?: "admin" | "driver";
  origin?: string;
  destination?: string;
  pickupDate?: string;
  endDate?: string;
}

export default function PermitsTabContent({
  permits,
  userRole = "admin",
  origin,
  destination,
  pickupDate,
  endDate,
}: PermitsTabContentProps) {
  // Helper function to check if PDF is downloadable
  const isPdfDownloadable = (permit: PermitJurisdiction) => {
    return (
      permit.status === "Approved" &&
      permit.paymentStatus?.fullPaymentPaid
    );
  };

  // Helper function to get next payment action
  const getNextPaymentAction = (permit: PermitJurisdiction) => {
    if (!permit.paymentEnabled || !permit.feeBreakdown)
      return null;

    // If payment not yet made
    if (!permit.paymentStatus?.fullPaymentPaid) {
      return {
        type: "full",
        amount: permit.feeBreakdown.totalAmount,
        label: "Pay Full Amount",
      };
    }

    return null;
  };

  // Helper function to check if payment action is available for user role
  const hasPaymentActionAvailable = (
    permit: PermitJurisdiction,
    role?: string,
  ) => {
    // Only admins can make payments
    return role === "admin";
  };

  // Helper function to get payment info banner
  const getPaymentInfo = (permit: PermitJurisdiction) => {
    // Show payment requested info for Payment Requested status
    if (permit.status === "Payment Requested") {
      return (
        <div className="flex items-start gap-2 bg-[#fffbeb] border border-[#fcd34d] rounded-lg px-3 py-2">
          <DollarSign className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-[12px] text-[#d97706]">
              Payment Requested
            </p>
            <p className="text-[11px] text-[#d97706] mt-0.5">
              Please complete the payment to proceed with your
              permit application.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!permits || permits.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500 font-medium mb-1">
          No Permits
        </p>
        <p className="text-sm text-gray-400">
          No permit information available for this job.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Route Display - Show if route info is available */}
      {origin && destination && pickupDate && endDate && null}

      {permits.map((permit) => (
        <div
          key={permit.id}
          className="bg-white rounded-[10px] overflow-hidden border border-[#e5e7eb] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]"
        >
          <div className="p-[16px]">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-[12px]">
              <div className="flex items-center gap-[12px]">
                {/* State Badge */}
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#eff6ff] border border-[#bfdbfe]">
                  <span className="font-semibold text-[14px] text-[#2563eb]">
                    {permit.state}
                  </span>
                </div>
                {/* Jurisdiction */}
                <div>
                  <p className="text-[12px] text-[#6b7280] leading-[18px]">
                    {permit.jurisdiction}
                  </p>
                </div>
              </div>
              {/* Permit Status */}
              <div>
                {permit.status === "Approved" &&
                isPdfDownloadable(permit) ? (
                  <div className="flex items-center gap-[6px] bg-[#f0fdf4] border border-[#86efac] px-[11px] py-px rounded-[10px] h-[28px]">
                    <CheckCircle className="w-[14px] h-[14px] text-[#16a34a]" />
                    <span className="font-medium text-[12px] text-[#15803d] leading-[18px]">
                      Approved
                    </span>
                  </div>
                ) : permit.status === "Payment Requested" ? (
                  <div className="flex items-center gap-[6px] bg-[#fef3c7] border border-[#fcd34d] px-[11px] py-px rounded-[10px] h-[28px]">
                    <DollarSign className="w-[14px] h-[14px] text-[#f59e0b]" />
                    <span className="font-medium text-[12px] text-[#d97706] leading-[18px]">
                      Payment Requested
                    </span>
                  </div>
                ) : permit.status === "Approved" ? (
                  <div className="flex items-center gap-[6px] bg-[#f0fdf4] border border-[#86efac] px-[11px] py-px rounded-[10px] h-[28px]">
                    <CheckCircle className="w-[14px] h-[14px] text-[#16a34a]" />
                    <span className="font-medium text-[12px] text-[#15803d] leading-[18px]">
                      Approved
                    </span>
                  </div>
                ) : permit.status === "In Review" ? (
                  <div className="flex items-center gap-[6px] bg-[#fef9c3] border border-[#fde047] px-[11px] py-px rounded-[10px] h-[28px]">
                    <Clock className="w-[14px] h-[14px] text-[#ca8a04]" />
                    <span className="font-medium text-[12px] text-[#a16207] leading-[18px]">
                      In Review
                    </span>
                  </div>
                ) : permit.status === "Rejected" ? (
                  <div className="flex items-center gap-[6px] bg-[#fee2e2] border border-[#fca5a5] px-[11px] py-px rounded-[10px] h-[28px]">
                    <XCircle className="w-[14px] h-[14px] text-[#dc2626]" />
                    <span className="font-medium text-[12px] text-[#b91c1c] leading-[18px]">
                      Rejected
                    </span>
                  </div>
                ) : permit.status === "Route Suggested" ? (
                  <div className="flex items-center gap-[6px] bg-[#fef3c7] border border-[#fcd34d] px-[11px] py-px rounded-[10px] h-[28px]">
                    <AlertTriangle className="w-[14px] h-[14px] text-[#f59e0b]" />
                    <span className="font-medium text-[12px] text-[#d97706] leading-[18px]">
                      Route Suggested
                    </span>
                  </div>
                ) : permit.status === "Not Requested" ? (
                  <div className="flex items-center gap-[6px] bg-[#f3f4f6] border border-[#d1d5db] px-[11px] py-px rounded-[10px] h-[28px]">
                    <span className="font-medium text-[12px] text-[#6b7280] leading-[18px]">
                      Not Requested
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Payment Info Banner */}
            {getPaymentInfo(permit) && (
              <div className="mb-[12px]">
                {getPaymentInfo(permit)}
              </div>
            )}

            {/* Permit Expiry Alert Banner - Only show for Approved permits */}
            {permit.status === "Approved" &&
              permit.expiryDate &&
              (() => {
                const expiryDate = new Date(permit.expiryDate);
                const today = new Date();
                const daysUntilExpiry = Math.ceil(
                  (expiryDate.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                const isExpired = daysUntilExpiry < 0;
                const isExpiringSoon =
                  daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
                const isWarning =
                  daysUntilExpiry > 7 && daysUntilExpiry <= 30;

                if (isExpired || isExpiringSoon || isWarning) {
                  const message = isExpired
                    ? `Expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) !== 1 ? "s" : ""} ago`
                    : isExpiringSoon
                      ? `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? "s" : ""}`
                      : `Expires in ${daysUntilExpiry} days`;

                  return (
                    <div
                      className={`mb-[12px] flex items-start gap-[8px] rounded-[10px] px-[13px] py-[9px] border relative ${
                        isExpired
                          ? "bg-[#fef2f2] border-[#fca5a5]"
                          : isExpiringSoon
                            ? "bg-[#FEF3C7] border-[#FCD34D]"
                            : "bg-[#FFF7ED] border-[#FDBA74]"
                      }`}
                    >
                      <AlertTriangle
                        className={`w-[16px] h-[16px] mt-[2px] flex-shrink-0 ${
                          isExpired
                            ? "text-[#dc2626]"
                            : isExpiringSoon
                              ? "text-[#D97706]"
                              : "text-[#EA580C]"
                        }`}
                      />
                      <div className="flex flex-col gap-[2px]">
                        <p
                          className={`font-medium text-[12px] leading-[18px] ${
                            isExpired
                              ? "text-[#b91c1c]"
                              : isExpiringSoon
                                ? "text-[#B45309]"
                                : "text-[#C2410C]"
                          }`}
                        >
                          {isExpired
                            ? "⚠️ Permit Expired"
                            : "⚠️ Permit Expiring Soon"}
                        </p>
                        <p
                          className={`text-[11px] leading-[16.5px] ${
                            isExpired
                              ? "text-[#b91c1c]"
                              : isExpiringSoon
                                ? "text-[#B45309]"
                                : "text-[#C2410C]"
                          }`}
                        >
                          {message}.{" "}
                          {isExpired
                            ? "This permit is no longer valid for the trip."
                            : "Please apply for a new permit before your trip start date."}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

            {/* Details Grid */}
            <div className="border-t border-b border-[#f3f4f6] py-[13px] mb-[12px]">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-[#6b7280] mb-[4px] leading-[16.5px]">
                    Permit Number
                  </p>
                  <p className="font-medium text-[13px] text-[#202224] leading-[19.5px]">
                    {permit.permitNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6b7280] mb-[4px] leading-[16.5px]">
                    Total Fee
                  </p>
                  <p className="font-medium text-[13px] text-[#202224] leading-[19.5px]">
                    {permit.fee}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6b7280] mb-[4px] leading-[16.5px]">
                    Payment Type
                  </p>
                  <p className="font-medium text-[13px] text-[#202224] leading-[19.5px]">
                    Full Upfront
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Breakdown and Payment Status - Combined */}
            {permit.feeBreakdown && permit.paymentEnabled && (
              <div className="mb-[12px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-[13px]">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <DollarSign className="w-[16px] h-[16px] text-[#0a0a0a]" />
                  <h5 className="font-semibold text-[12px] text-[#0a0a0a] leading-[18px]">
                    Fee Breakdown & Payment Status
                  </h5>
                </div>

                <div className="space-y-[8px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#0a0a0a] leading-[18px]">
                      Overwize Fee
                    </span>
                    <span className="font-medium text-[13px] text-[#0a0a0a] leading-[19.5px]">
                      {permit.feeBreakdown.processingFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#0a0a0a] leading-[18px]">
                      Permit Fee
                    </span>
                    <span className="font-medium text-[13px] text-[#0a0a0a] leading-[19.5px]">
                      {permit.feeBreakdown.permitFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-px border-t border-[rgba(0,0,0,0.1)]">
                    <span className="font-semibold text-[13px] text-[#0a0a0a] leading-[19.5px]">
                      Total Payable Now
                    </span>
                    <span className="font-semibold text-[15px] text-[#0a0a0a] leading-[22.5px]">
                      {permit.feeBreakdown.totalAmount}
                    </span>
                  </div>

                  {/* Payment Status - Only show if not "Not Requested" */}
                  {permit.status !== "Not Requested" &&
                    permit.paymentStatus && (
                      <>
                        <div className="h-[9px] border-t border-[#e5e7eb]"></div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px]">
                            {permit.paymentStatus
                              .fullPaymentPaid ? (
                              <CheckCircle className="w-[14px] h-[14px] text-[#16a34a]" />
                            ) : (
                              <Clock className="w-[14px] h-[14px] text-[#f59e0b]" />
                            )}
                            <span className="text-[12px] text-[#4b5563] leading-[18px]">
                              Payment Status
                            </span>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            {permit.paymentStatus
                              .fullPaymentAmount && (
                              <span className="font-medium text-[12px] text-[#202224] leading-[18px]">
                                {
                                  permit.paymentStatus
                                    .fullPaymentAmount
                                }
                              </span>
                            )}
                            <span
                              className={`font-medium text-[11px] px-[8px] py-[2px] rounded leading-[16.5px] ${
                                permit.paymentStatus
                                  .fullPaymentPaid
                                  ? "bg-[#dcfce7] text-[#16a34a]"
                                  : "bg-[#fef3c7] text-[#d97706]"
                              }`}
                            >
                              {permit.paymentStatus
                                .fullPaymentPaid
                                ? "Paid"
                                : "Pending"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            )}

            {/* Notes/Reason */}
            {(permit.notes || permit.reason) && (
              <div className="mb-[12px]">
                <p className="text-[12px] text-[#6b7280] leading-[19.5px]">
                  {permit.reason || permit.notes}
                </p>
              </div>
            )}

            {/* Informational Messages */}
            {permit.status === "In Review" && (
              <div className="mb-[12px] flex items-start gap-[8px] bg-[#fef9c3] border border-[#fde047] rounded-[10px] px-[13px] py-[9px]">
                <Clock className="w-[16px] h-[16px] text-[#ca8a04] mt-[2px] flex-shrink-0" />
                <div>
                  <p className="font-medium text-[12px] text-[#a16207] leading-[18px]">
                    Under Review
                  </p>
                  <p className="text-[11px] text-[#a16207] mt-[2px] leading-[16.5px]">
                    Your payment has been received. The permit
                    application is being reviewed by the state
                    authority.
                  </p>
                </div>
              </div>
            )}

            {/* PDF Locked Message - Show when approved but PDF not downloadable */}
            {permit.status === "Approved" &&
              !isPdfDownloadable(permit) && (
                <div className="mb-[12px] flex items-start gap-[8px] bg-[#fef3c7] border border-[#fcd34d] rounded-[10px] px-[13px] py-[9px]">
                  <Info className="w-[16px] h-[16px] text-[#f59e0b] mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[12px] text-[#d97706] leading-[18px]">
                      Payment Required
                    </p>
                    <p className="text-[11px] text-[#d97706] mt-[2px] leading-[16.5px]">
                      Permit fee payment is required to download
                      the permit PDF.
                    </p>
                  </div>
                </div>
              )}

            {/* Rejected Permit Message */}
            {permit.status === "Rejected" &&
              permit.refundInfo && (
                <div className="mb-[12px] flex items-start gap-[8px] bg-[#fee2e2] border border-[#fca5a5] rounded-[10px] px-[13px] py-[9px]">
                  <XCircle className="w-[16px] h-[16px] text-[#dc2626] mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[12px] text-[#b91c1c] leading-[18px]">
                      Permit Rejected - Refund Processed
                    </p>
                    <p className="text-[11px] text-[#b91c1c] mt-[2px] leading-[16.5px]">
                      Your refund of {permit.refundInfo.amount}{" "}
                      has been{" "}
                      {permit.refundInfo.status === "completed"
                        ? "processed"
                        : "initiated"}
                      .
                      {permit.refundInfo.refundDate &&
                        ` (${formatDate(permit.refundInfo.refundDate)})`}
                    </p>
                  </div>
                </div>
              )}

            {/* Rejected Permit Message (no refund) */}
            {permit.status === "Rejected" &&
              !permit.refundInfo && (
                <div className="mb-[12px] flex items-start gap-[8px] bg-[#fee2e2] border border-[#fca5a5] rounded-[10px] px-[13px] py-[9px]">
                  <XCircle className="w-[16px] h-[16px] text-[#dc2626] mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[12px] text-[#b91c1c] leading-[18px]">
                      Permit Rejected
                    </p>
                    <p className="text-[11px] text-[#b91c1c] mt-[2px] leading-[16.5px]">
                      This permit request was rejected. No
                      further action is required.
                    </p>
                  </div>
                </div>
              )}

            {/* Action Footer */}
            <div className="flex justify-end gap-[8px]">
              {/* Pay Now Button - Only show if payment is needed and user has permission */}
              {getNextPaymentAction(permit) &&
                hasPaymentActionAvailable(permit, userRole) && (
                  <button
                    onClick={() => {
                      alert(
                        `Processing payment of ${getNextPaymentAction(permit)?.amount} for ${permit.stateFull}`,
                      );
                    }}
                    className="flex items-center gap-[8px] bg-[#f89823] hover:bg-[#e0881f] disabled:bg-[#9ca3af] text-[#1A1A1A] px-[16px] py-[8px] rounded-[10px] font-medium text-[12px] leading-[18px] h-[34px] transition-colors"
                  >
                    <CreditCard className="w-[14px] h-[14px]" />
                    Pay Full Amount{" "}
                    {getNextPaymentAction(permit)?.amount}
                  </button>
                )}

              {/* Payment Required (View-only for drivers) */}
              {getNextPaymentAction(permit) &&
                !hasPaymentActionAvailable(permit, userRole) &&
                permit.status !== "Not Requested" && (
                  <div className="flex items-center gap-[8px] text-[#6b7280] px-[16px] py-[8px] text-[12px] leading-[18px] bg-[#f9fafb] rounded-[10px] border border-[#e5e7eb] h-[34px]">
                    <Clock className="w-[14px] h-[14px]" />
                    Payment Required (Admin only)
                  </div>
                )}

              {/* Download Permit Button - Only enabled when approved and all payments complete */}
              {permit.status !== "Not Requested" &&
                permit.status !== "Rejected" &&
                permit.status !== "Route Suggested" && (
                  <button
                    onClick={() => {
                      if (isPdfDownloadable(permit)) {
                        alert(
                          `Downloading permit for ${permit.stateFull}`,
                        );
                      }
                    }}
                    disabled={!isPdfDownloadable(permit)}
                    className={`relative flex items-center justify-center px-[16px] gap-[8px] py-[8px] rounded-[10px] font-medium text-[12px] leading-[18px] h-[34px] transition-all duration-300 ${
                      isPdfDownloadable(permit)
                        ? "bg-[#16a34a] hover:bg-[#15803d] text-white cursor-pointer"
                        : "bg-[#16a34a] text-white opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <Download className="w-[14px] h-[14px]" />
                    <span className="text-center">
                      Download Permit
                    </span>
                  </button>
                )}

              {/* Re-apply / Update & Resubmit (Rejected / Route Suggested) */}
              {(permit.status === "Rejected" ||
                permit.status === "Route Suggested") && (
                <button
                  onClick={() => {
                    alert(
                      `Re-applying for ${permit.stateFull} permit`,
                    );
                  }}
                  className="flex items-center gap-[8px] bg-[#f59e0b] hover:bg-[#d97706] text-white px-[16px] py-[8px] rounded-[10px] font-medium text-[12px] leading-[18px] h-[34px] transition-colors"
                >
                  <RefreshCw className="w-[14px] h-[14px]" />
                  {permit.status === "Rejected"
                    ? "Re-apply"
                    : "Update & Resubmit"}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}