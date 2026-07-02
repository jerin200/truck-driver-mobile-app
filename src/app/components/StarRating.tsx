import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readonly}
          className={`${
            readonly ? "cursor-default" : "cursor-pointer"
          } transition-transform active:scale-90 disabled:active:scale-100`}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors ${
              star <= value
                ? "fill-[#F59E0B] text-[#F59E0B]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}