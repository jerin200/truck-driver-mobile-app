import svgPaths from '../imports/svg-8sy3yvlqma';
import dateIconPaths from '../imports/svg-2spubxy7rr';
import TripIdHeader from './TripIdHeader';

interface TripDetailHeaderProps {
  tripId: string;
  status: 'In Transit' | 'Stopped' | 'Delivered' | 'Pending' | 'Scheduled';
  startDate: string;
  endDate: string;
  origin: string;
  destination: string;
  currentLocation: string;
  currentStatus: string;
  eta: string;
  speed: string;
  pickupTime: string;
  deliveryTime: string;
  totalDistance: string;
  estimatedTime: string;
  progress?: number; // 0-100
  mapImage: string;
}

export default function TripDetailHeader({
  tripId,
  status,
  startDate,
  endDate,
  origin,
  destination,
  currentLocation,
  currentStatus,
  eta,
  speed,
  pickupTime,
  deliveryTime,
  totalDistance,
  estimatedTime,
  progress = 50,
  mapImage
}: TripDetailHeaderProps) {
  // Status badge colors
  const statusColors = {
    'In Transit': { bg: '#2383f8', icon: '#155DFC' },
    'Stopped': { bg: '#f59e0b', icon: '#d97706' },
    'Delivered': { bg: '#10b981', icon: '#059669' },
    'Pending': { bg: '#6b7280', icon: '#4b5563' },
    'Scheduled': { bg: '#8b5cf6', icon: '#7c3aed' }
  };

  const statusColor = statusColors[status] || statusColors['In Transit'];

  return (
    <div className="space-y-4">
      {/* Map and Live Tracking Section */}
      <div className="bg-[#d4d3d3] flex flex-col overflow-hidden rounded-tl-[16px] rounded-tr-[16px] shadow-lg">
        {/* Map Container */}
        <div className="relative h-[294px] flex flex-col items-center justify-end">
          <div className="absolute inset-0 -top-[130px]">
            <img 
              alt="Trip Route Map" 
              className="w-full h-full object-cover pointer-events-none" 
              src={mapImage} 
            />
          </div>

          {/* Info Container - Live Tracking Overlay */}
          <div className="bg-white/90 backdrop-blur-sm relative w-full">
            <div className="flex flex-col items-center justify-end">
              <div className="flex flex-col gap-2 items-center justify-end p-4 w-full">
                {/* Live Tracking Badge and ETA */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
                    </span>
                    <p className="font-bold text-sm tracking-[0.3px] uppercase text-[#101828]">
                      Live Tracking
                    </p>
                  </div>
                  <div className="bg-[#f3f4f6] h-6 px-2 rounded flex items-center justify-center">
                    <p className="tabular-nums text-xs text-[#4a5565] font-bold">
                      ETA: {eta}
                    </p>
                  </div>
                </div>

                {/* Current Location and Speed */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-[14px] h-[14px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <g clipPath="url(#clip0_156_1299)">
                          <path d={svgPaths.p3e500d80} stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                          <path d="M8.74812 10.4977H5.24887" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                          <path d={svgPaths.p5753980} stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                          <path d={svgPaths.p3d9bef00} stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                          <path d={svgPaths.p3492100} stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                        </g>
                        <defs>
                          <clipPath id="clip0_156_1299">
                            <rect fill="white" height="13.997" width="13.997" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="font-medium text-sm text-[#101828]">
                      {currentLocation}
                    </p>
                  </div>
                  <p className="font-medium text-sm text-[#4a5565]">
                    {speed}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#f3f4f6] h-2 rounded-full w-full overflow-hidden">
                  <div 
                    className="bg-[#00a63e] h-full rounded-full shadow-[0px_0px_10px_0px_rgba(37,99,235,0.5)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Header - ID and Status */}
      <TripIdHeader tripId={tripId} status={status} startDate={startDate} endDate={endDate} />

      {/* Route Information Card */}
      <div className="bg-white rounded-[14px] border border-[#e6e3df] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)] overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#f9fafb] border-b border-[#f3f4f6] p-4 flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#dbeafe' }}
          >
            <div className="relative w-4 h-4">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path d={svgPaths.p11b23400} stroke="#0066CC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
              </svg>
            </div>
          </div>
          <p className="font-semibold text-sm text-[#101828]">
            Route Information
          </p>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-4">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute bg-[#e5e7eb] h-[167px] left-[8px] top-2 w-[2px]" />

            {/* Origin */}
            <div className="relative flex gap-4 mb-6">
              <div className="bg-[#00c950] border-[3.5px] border-solid border-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-5 h-5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-xs uppercase text-[#4a5565]">
                  Origin
                </p>
                <p className="font-bold text-base text-[#101828]">
                  {origin}
                </p>
                <p className="font-normal text-sm text-[#4a5565]">
                  Pickup: {pickupTime}
                </p>
              </div>
            </div>

            {/* Current Status */}
            <div className="relative flex gap-4 mb-6">
              <div className="bg-[#2b7fff] border-[3.5px] border-solid border-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-5 h-5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-xs uppercase text-[#4a5565]">
                  Current Status
                </p>
                <p className="font-bold text-base text-[#101828]">
                  {currentStatus}
                </p>
                <p className="font-normal text-sm text-[#155dfc]">
                  {currentLocation}
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="relative flex gap-4">
              <div className="bg-[#fb2c36] border-[3.5px] border-solid border-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-5 h-5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-xs uppercase text-[#4a5565]">
                  Destination
                </p>
                <p className="font-bold text-base text-[#101828]">
                  {destination}
                </p>
                <p className="font-normal text-sm text-[#4a5565]">
                  Delivery: {deliveryTime}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="border-t border-[#f3f4f6] pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g>
                    <path d={svgPaths.p34b54c00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                    <path d="M9.99291 3.83995V13.8329" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                    <path d="M5.99575 2.1558V12.1487" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                  </g>
                </svg>
              </div>
              <div>
                <p className="font-normal text-xs text-[#4a5565]">
                  Total Distance
                </p>
                <p className="font-bold text-sm text-[#101828]">
                  {totalDistance}
                </p>
              </div>
            </div>

            <div className="bg-[#e5e7eb] h-8 w-[1px]" />

            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g clipPath="url(#clip0_156_1313)">
                    <path d={svgPaths.p1847f8e0} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                    <path d={svgPaths.p320b3800} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
                  </g>
                  <defs>
                    <clipPath id="clip0_156_1313">
                      <rect fill="white" height="15.9887" width="15.9887" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-normal text-xs text-[#4a5565]">
                  Est. Time
                </p>
                <p className="font-bold text-sm text-[#101828]">
                  {estimatedTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}