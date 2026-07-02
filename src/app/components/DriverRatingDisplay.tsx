import { Star } from 'lucide-react';

interface DriverRatingDisplayProps {
  rating: number;
  source?: string;
  totalRatings?: number;
  variant?: 'inline' | 'profile' | 'card';
  className?: string;
}

/**
 * Compact rating display component for showing Pilot Car ratings of Truck Drivers
 * Minimal, clean design following WCAG AA guidelines
 */
export default function DriverRatingDisplay({ 
  rating, 
  source = 'Pilot Car', 
  totalRatings,
  variant = 'inline',
  className = ''
}: DriverRatingDisplayProps) {
  // Format rating to 1 decimal place
  const formattedRating = rating.toFixed(1);

  if (variant === 'profile') {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
          <span className="text-[24px] font-semibold text-black">{formattedRating}</span>
        </div>
        {totalRatings !== undefined && (
          <p className="text-[14px] text-[#6b7280]">
            {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
        <span className="text-[14px] font-medium text-black">{formattedRating}</span>
      </div>
    );
  }

  // inline variant (default)
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-1.5">
        <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
        <span className="text-[16px] font-semibold text-black">{formattedRating}</span>
      </div>
      <p className="text-[12px] text-[#6b7280]">Rated by {source}</p>
    </div>
  );
}
