import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { InlineStarRating } from "./InlineStarRating";

interface RatingSubmittedCardProps {
  overallRating: number;
  pilotCarName: string;
}

export function RatingSubmittedCard({
  overallRating,
  pilotCarName,
}: RatingSubmittedCardProps) {
  return (
    <Card className="mb-4 border-2 border-[#10B981] rounded-xl shadow-sm bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-start gap-4">
          {/* Icon with background */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
              <CheckCircle2
                className="w-5 h-5 text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-base font-semibold text-gray-900 mb-2">
              Thanks for your feedback!
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-sm font-medium text-gray-700">
                {pilotCarName}
              </span>
              <InlineStarRating value={overallRating} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}