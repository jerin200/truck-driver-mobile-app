import imgMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";
import { motion } from "motion/react";
import {
  Crosshair,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { useState } from "react";

interface LiveTrackingHeaderProps {
  currentLocation: string;
  speed: string;
  eta: string;
  progress: number; // 0-100
  onMaximize?: () => void;
}

function MapContainer() {
  return (
    <div
      className="absolute inset-0 size-full"
      data-name="Map Container"
    >
      <motion.div
        className="absolute inset-0 size-full"
        data-name="Map Image"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          alt="Map View"
          className="absolute inset-0 size-full object-cover"
          src={imgMapImage}
        />

        {/* Mock Route Line */}
        <svg
          className="absolute inset-0 size-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <path
            d="M 180 120 L 220 120 L 225 180 L 180 190 L 175 250"
            fill="none"
            stroke="#e85d04"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-md"
          />
          {/* Start Marker (Home) */}
          <circle
            cx="180"
            cy="120"
            r="16"
            fill="#1a1a1a"
            className="drop-shadow-lg"
          />
          <circle
            cx="180"
            cy="120"
            r="6"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M 177 122 L 180 119 L 183 122 M 177 122 V 125 H 183 V 122"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />

          {/* End Marker (Car) */}
          <circle
            cx="175"
            cy="250"
            r="16"
            fill="white"
            className="drop-shadow-lg"
          />
          <circle cx="175" cy="250" r="4" fill="#e85d04" />
        </svg>
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/90 pointer-events-none" />
    </div>
  );
}

function BottomControls({
  onCenter,
}: {
  onCenter?: () => void;
}) {
  return (
    <div className="absolute bottom-[40px] right-4 z-20">
      <button
        className="flex items-center justify-center size-8 bg-white rounded-full shadow-md hover:bg-gray-50 active:scale-95 transition-transform"
        onClick={onCenter}
        aria-label="Center map"
      >
        <Crosshair className="size-4 text-gray-800" />
      </button>
    </div>
  );
}

function InfoPanel({ eta }: { eta: string }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full z-10 bg-emerald-600/90 backdrop-blur-md py-2 px-4 rounded-t-[16px] border-t border-emerald-500/30 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      data-name="Info Container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <p className="text-[12px] text-white truncate">
        <span className="font-semibold">
          Reaching in {eta || "20 - 25 min"}
        </span>
        <span className="mx-1.5 text-white/50">•</span>
        <span className="text-white/80">ETA 20:20</span>
      </p>
    </motion.div>
  );
}

export default function LiveTrackingHeader({
  currentLocation,
  speed,
  eta,
  progress,
  onMaximize,
}: LiveTrackingHeaderProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="bg-white border border-[#e5e7eb] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)] overflow-hidden">
        {/* Single Line Header - Always Visible */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823] focus-visible:ring-offset-1"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="live-tracking-details"
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Live pulse indicator */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600" />
            </span>
            <p className="text-[13px] font-medium text-[#101828] truncate">
              {currentLocation}
            </p>
            <span className="text-[11px] text-[#717182] shrink-0">
              •
            </span>
            <p className="text-[13px] font-semibold text-emerald-700 shrink-0 whitespace-nowrap">
              ETA {eta}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-[#717182] shrink-0 ml-2 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {/* Expandable Map */}
        <div
          id="live-tracking-details"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t border-[#f3f4f6]">
            {/* Speed & Progress Summary */}
            <div className="px-4 py-2.5 flex items-center justify-between bg-[#fafafa]">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#717182]" />
                <span className="text-[12px] text-[#4a5565] font-medium">
                  {speed}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#4a5565] font-medium">
                  Progress
                </span>
                <div className="w-20 h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#717182] font-semibold">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Map */}
            <div
              className="relative h-[160px] cursor-pointer"
              onClick={onMaximize}
              role="button"
              tabIndex={0}
              aria-label="Open full screen map"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onMaximize?.();
                }
              }}
            >
              <MapContainer />
              <BottomControls onCenter={onMaximize} />
              <InfoPanel eta={eta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}