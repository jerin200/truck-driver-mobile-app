import React from "react";
import { Star, X, ArrowRight, ChevronRight } from "lucide-react";

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
    <div className="mx-4 mt-4">
      {/* Section header — mirrors the Invoice card */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold text-[#0a0a0a]">Rating</span>
      </div>

      <button
        onClick={onRateNow}
        className="w-full text-left bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(22,163,74,0.10)] overflow-hidden active:scale-[0.99] transition-transform"
      >
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
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
              <p className="text-sm font-semibold text-[#0a0a0a] truncate">
                Rate Your Experience
              </p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {pilotCarName} · {tripId}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Your Rating
              </p>
              <div className="flex gap-1 mt-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-gray-200" />
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-sm text-[13px] font-semibold bg-[#F89823] text-[#1a1a1a] shadow-[0px_2px_8px_0px_rgba(248,152,35,0.25)]">
              Rate Now
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
