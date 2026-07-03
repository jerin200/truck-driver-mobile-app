import React from "react";
import { Star, X, ChevronRight } from "lucide-react";

interface RatingPromptCardProps {
  tripId: string;
  pilotCarName: string;
  onRateNow: () => void;
  onDismiss?: () => void;
}

export function RatingPromptCard({
  tripId,
  pilotCarName,
  onRateNow,
  onDismiss,
}: RatingPromptCardProps) {
  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(22,163,74,0.10)] overflow-hidden">
      {/* Top amber accent bar */}
      <div />

      <div className="px-4 pt-4 pb-4">
        <div className="flex items-start gap-3">
          {/* Star cluster icon */}
          <div className="w-11 h-11 rounded-xl bg-[#FFF8F0] border border-[#FED7AA] flex items-center justify-center shrink-0">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-[#F89823] text-[#F89823]"
                  style={{ opacity: i === 3 ? 0.5 : 1 }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[15px] font-semibold text-[#0a0a0a] leading-snug">
                  Rate Your Experience
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  How was {pilotCarName}&apos;s service on trip{" "}
                  <span className="font-medium text-gray-700 tabular-nums">
                    {tripId}
                  </span>
                  ?
                </p>
              </div>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0 -mt-0.5 -mr-1"
                  aria-label="Dismiss rating prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Empty stars preview */}
            <div className="flex gap-1 mt-2.5 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-gray-200"
                />
              ))}
            </div>

            <button
              onClick={onRateNow}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#F89823] hover:bg-[#e8880d] active:bg-[#d97d0b] text-[#1a1a1a] text-sm font-semibold transition-colors"
            >
              Rate Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
