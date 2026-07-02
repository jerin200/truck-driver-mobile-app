import React from "react";
import { StarRating } from "./StarRating";
import { CheckCircle2 } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function RatingDisplay({
  rating,
  size = "sm",
  showLabel = true,
}: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-green-600" />
      {showLabel && (
        <span className="text-sm text-gray-600">You rated this trip:</span>
      )}
      <StarRating value={rating} readonly size={size} showValue />
    </div>
  );
}
