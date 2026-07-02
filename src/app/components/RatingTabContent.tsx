import React from "react";
import DriverRatingDisplay from "./DriverRatingDisplay";
import { PrimaryButton } from "./ui/primary-button";
import { Star } from "lucide-react";

interface Bid {
  id: string;
  companyName: string;
  companyEmail?: string;
  amount: number;
  message: string;
  bidDate: string;
  rating: number;
  jobStatus?: string;
  invoiceApproved?: boolean;
  invoiceUrl?: string;
}

interface JobRating {
  overallRating: number;
  categories?: Array<{
    id: string;
    label: string;
    value: number;
  }>;
  comment?: string;
  // Legacy fields for backward compatibility
  professionalism?: number;
  communication?: number;
  timeliness?: number;
}

interface RatingTabContentProps {
  jobRating?: JobRating | null;
  driverRating?: {
    overallRating: number;
    pilotCarCompany?: string;
    professionalism?: number;
    communication?: number;
    timeliness?: number;
    comment?: string;
  } | null;
  acceptedBid?: Bid;
  isCompleted: boolean;
  onSubmitRating?: () => void;
}

export function RatingTabContent({
  jobRating,
  driverRating,
  acceptedBid,
  isCompleted,
  onSubmitRating,
}: RatingTabContentProps) {
  const hasRatingGiven = jobRating?.overallRating;
  const hasRatingReceived = driverRating?.overallRating;

  // Show "Rate Now" prompt if completed, invoice approved, but no rating given yet
  const canSubmitRating =
    isCompleted &&
    acceptedBid?.invoiceApproved === true &&
    !hasRatingGiven;

  // If no ratings exist yet
  if (!hasRatingGiven && !hasRatingReceived) {
    return (
      <div className="bg-white rounded-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)] p-8">
        {canSubmitRating && onSubmitRating ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-[#F89823]" />
            </div>
            <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
              Rate Your Experience
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Share your feedback about{" "}
              {acceptedBid?.companyName ||
                "the pilot car service"}
            </p>
            <PrimaryButton
              onClick={onSubmitRating}
              className="mx-auto"
            >
              Rate Now
            </PrimaryButton>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              {isCompleted
                ? "No ratings available for this trip yet."
                : "Ratings will be available after the trip is completed."}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Submit Rating Prompt - Show if completed, invoice approved, but no rating given yet */}
      {canSubmitRating && onSubmitRating && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-[#F89823]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-gray-900">
                Rate{" "}
                {acceptedBid?.companyName || "the pilot car"}
              </p>
              <p className="text-[12px] text-gray-600">
                Share your experience to help others
              </p>
            </div>
            <PrimaryButton
              onClick={onSubmitRating}
              size="sm"
              className="flex-shrink-0"
            >
              Rate Now
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* Rating Given - Rating the truck driver gave TO the pilot car */}
      {hasRatingGiven && (
        <div className="bg-white rounded-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)] p-4">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-black">
              Rating Given
            </p>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <DriverRatingDisplay
                  rating={jobRating.overallRating}
                  source={
                    acceptedBid?.companyName || "Pilot Car"
                  }
                  variant="inline"
                />
              </div>
          
            </div>

            {/* Detailed ratings breakdown */}
            {jobRating.categories && jobRating.categories.length > 0 ? (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                {jobRating.categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">
                      {category.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= category.value
                              ? "text-[#F89823] fill-current"
                              : "text-gray-300"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Fallback to legacy fields for backward compatibility
              (jobRating.professionalism ||
                jobRating.communication ||
                jobRating.timeliness) && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {jobRating.professionalism && (
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#6b7280]">
                        Professionalism
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= jobRating.professionalism!
                                ? "text-[#F89823] fill-current"
                                : "text-gray-300"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                  {jobRating.communication && (
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#6b7280]">
                        Communication
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= jobRating.communication!
                                ? "text-[#F89823] fill-current"
                                : "text-gray-300"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                  {jobRating.timeliness && (
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#6b7280]">
                        Timeliness
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= jobRating.timeliness!
                                ? "text-[#F89823] fill-current"
                                : "text-gray-300"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}

            {/* Comment */}
            {jobRating.comment && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[12px] text-[#6b7280] mb-1">
                  Your comment:
                </p>
                <p className="text-[13px] text-gray-900">
                  {jobRating.comment}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rating Received - Rating the truck driver received FROM the pilot car */}
      {hasRatingReceived && (
        <div className="bg-white rounded-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)] p-4">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-black">
              Rating Received
            </p>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <DriverRatingDisplay
                  rating={driverRating.overallRating}
                  source={
                    driverRating.pilotCarCompany || "Pilot Car"
                  }
                  variant="inline"
                />
              </div>
            </div>

            {/* Detailed ratings breakdown */}
            {(driverRating.professionalism ||
              driverRating.communication ||
              driverRating.timeliness) && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                {driverRating.professionalism && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">
                      Professionalism
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <=
                            driverRating.professionalism!
                              ? "text-[#F89823] fill-current"
                              : "text-gray-300"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
                {driverRating.communication && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">
                      Communication
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= driverRating.communication!
                              ? "text-[#F89823] fill-current"
                              : "text-gray-300"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
                {driverRating.timeliness && (
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">
                      Timeliness
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= driverRating.timeliness!
                              ? "text-[#F89823] fill-current"
                              : "text-gray-300"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comment */}
            {driverRating.comment && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[12px] text-[#6b7280] mb-1">
                  Their comment:
                </p>
                <p className="text-[13px] text-gray-900">
                  {driverRating.comment}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}