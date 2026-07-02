import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SlideToConfirmProps {
  onConfirm: () => void;
  text?: string;
  successText?: string; // Text to show when slide is complete
  icon?: React.ReactNode;
  className?: string;
  sliderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  direction?: 'left' | 'right'; // Direction to slide: 'right' = slide right, 'left' = slide left
  chevronColor?: string; // Color of the chevron arrows
  progressColor?: string; // Color of the progress overlay
}

export default function SlideToConfirm({
  onConfirm,
  text = "Slide to confirm",
  successText = "Loading...",
  icon,
  className = "",
  sliderColor = "bg-white",
  textColor = "text-white",
  backgroundColor = "bg-gradient-to-r from-green-600 to-green-700",
  direction = 'left', // Default: slide from right to left (like the screenshot)
  chevronColor = "text-green-600",
  progressColor = "bg-green-800"
}: SlideToConfirmProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const hasConfirmedRef = useRef(false); // Track if we've already confirmed

  const SLIDER_WIDTH = 40; // Width of the slider button (matches w-10)
  const COMPLETION_THRESHOLD = 0.85; // 85% to complete

  useEffect(() => {
    if (isComplete && !hasConfirmedRef.current) {
      hasConfirmedRef.current = true; // Mark as confirmed immediately
      const timer = setTimeout(() => {
        onConfirm();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const handleStart = (clientX: number) => {
    if (isComplete) return;
    setIsDragging(true);
    startXRef.current = clientX - position;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || isComplete || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const maxPosition = containerWidth - SLIDER_WIDTH;
    
    let newPosition: number;
    
    if (direction === 'left') {
      // Sliding from right to left (position goes negative)
      newPosition = Math.min(0, Math.max(clientX - startXRef.current, -maxPosition));
      
      // Check if we've reached the threshold
      if (Math.abs(newPosition) >= maxPosition * COMPLETION_THRESHOLD) {
        setIsComplete(true);
        setPosition(-maxPosition);
      } else {
        setPosition(newPosition);
      }
    } else {
      // Sliding from left to right (position goes positive)
      newPosition = Math.max(0, Math.min(clientX - startXRef.current, maxPosition));
      setPosition(newPosition);
      
      // Check if we've reached the threshold
      if (newPosition >= maxPosition * COMPLETION_THRESHOLD) {
        setIsComplete(true);
        setPosition(maxPosition);
      }
    }
  };

  const handleEnd = () => {
    if (isComplete) return;
    setIsDragging(false);
    
    // Reset to start position
    setPosition(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const progress = containerRef.current 
    ? (Math.abs(position) / (containerRef.current.offsetWidth - SLIDER_WIDTH)) * 100 
    : 0;

  // Calculate initial position for right-aligned slider
  const initialOffset = direction === 'left' && containerRef.current 
    ? containerRef.current.offsetWidth - SLIDER_WIDTH - 4 // 4px for padding
    : 0;

  return (
    <div
      ref={containerRef}
      className={`relative h-12 rounded-full overflow-hidden select-none ${backgroundColor} ${className}`}
    >
      {/* Progress overlay */}
      {direction === 'left' ? (
        <div 
          className={`absolute inset-0 ${progressColor} transition-all duration-100 right-0`}
          style={{ 
            width: `${Math.abs(position) + SLIDER_WIDTH}px`,
            opacity: isComplete ? 1 : 0.3,
            marginLeft: 'auto'
          }}
        />
      ) : (
        <div 
          className={`absolute inset-0 ${progressColor} transition-all duration-100`}
          style={{ 
            width: `${position + SLIDER_WIDTH}px`,
            opacity: isComplete ? 1 : 0.3
          }}
        />
      )}

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span 
          className={`font-semibold text-sm transition-opacity duration-200 ${textColor}`}
          style={{ opacity: isComplete ? 0 : 1 - (progress / 100) * 0.7 }}
        >
          {text}
        </span>
      </div>

      {/* Success text */}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-semibold text-sm text-white animate-pulse">
            {successText}
          </span>
        </div>
      )}

      {/* Slider button */}
      <div
        ref={sliderRef}
        className={`absolute top-1 w-10 h-10 ${sliderColor} rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform ${
          isDragging ? 'scale-95' : 'scale-100'
        } ${isComplete ? 'opacity-0' : 'opacity-100'}`}
        style={{
          [direction === 'left' ? 'right' : 'left']: '4px',
          transform: `translateX(${position}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.2s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {icon || (
          direction === 'left' ? (
            <div className="flex items-center justify-center">
              <ChevronLeft className={`h-5 w-5 ${chevronColor || 'text-green-600'} -mr-2`} />
              <ChevronLeft className={`h-5 w-5 ${chevronColor || 'text-green-600'}`} />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ChevronRight className={`h-5 w-5 ${chevronColor || 'text-green-600'}`} />
              <ChevronRight className={`h-5 w-5 ${chevronColor || 'text-green-600'} -ml-2`} />
            </div>
          )
        )}
      </div>
    </div>
  );
}