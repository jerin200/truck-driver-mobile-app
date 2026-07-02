import React from "react";
import { Star } from "lucide-react";

interface InlineStarRatingProps {
  value: number;
  maxStars?: number;
}

export function InlineStarRating({ 
  value, 
  maxStars = 5 
}: InlineStarRatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= fullStars;
        const isHalfFilled = starNumber === fullStars + 1 && hasHalfStar;

        return (
          <Star
            key={index}
            className={`w-4 h-4 ${
              isFilled || isHalfFilled
                ? "fill-[#F59E0B] text-[#F59E0B]"
                : "fill-[#E5E7EB] text-[#E5E7EB]"
            }`}
          />
        );
      })}
      <span className="ml-1 text-sm font-medium text-gray-900">
        {value.toFixed(1)}
      </span>
    </span>
  );
}
