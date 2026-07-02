import svgPaths from '../imports/svg-6etbckrnri';
import { ArrowLeft, Bell, User } from 'lucide-react';

function SignalIcons() {
  return (
    <div className="h-[11.5px] relative shrink-0 w-[18.366px]" data-name="Signal Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 12">
        <g id="Signal Icons">
          <rect fill="var(--fill-0, white)" height="11.5" id="signal-4" opacity="0.2" rx="1" width="3.47464" x="14.8916" />
          <path d={svgPaths.p2db675a8} fill="var(--fill-0, white)" id="signal-3" />
          <path d={svgPaths.p1f6d9500} fill="var(--fill-0, white)" id="signa-2" />
          <path d={svgPaths.paccab00} fill="var(--fill-0, white)" id="signal-1" />
        </g>
      </svg>
    </div>
  );
}

function WiFiIcons() {
  return (
    <div className="h-[10.75px] relative shrink-0 w-[15.884px]" data-name="WiFi Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="WiFi Icons">
          <path d={svgPaths.p28412700} fill="var(--fill-0, white)" id="wifi-low" />
          <path d={svgPaths.p325b1d00} fill="var(--fill-0, white)" id="wifi-medium" />
          <path d={svgPaths.p3fdac200} fill="var(--fill-0, white)" id="wifi-high" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

function BatteryIcons() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[26.308px]" data-name="Battery Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 13">
        <g id="Battery Icons">
          <path d={svgPaths.pfeeb200} fill="var(--fill-0, white)" id="level-start" />
          <path d={svgPaths.pcc9ec00} fill="var(--fill-0, white)" id="level-2" />
          <path d={svgPaths.p8c94a00} fill="var(--fill-0, white)" id="level-3" />
          <path d={svgPaths.p373ee600} fill="var(--fill-0, white)" id="level-4" />
          <path d={svgPaths.p26dd6e00} fill="var(--fill-0, white)" id="level-5" />
          <path d={svgPaths.p1fdbd300} fill="var(--fill-0, white)" id="level-6" />
          <path d={svgPaths.p187f3280} fill="var(--fill-0, white)" id="level-7" />
          <path d={svgPaths.p3bd9fd80} fill="var(--fill-0, white)" id="level-last" />
          <g id="Vector" opacity="0.5">
            <path clipRule="evenodd" d={svgPaths.p129d0d00} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p12a75000} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Status Icons">
      <SignalIcons />
      <WiFiIcons />
      <BatteryIcons />
    </div>
  );
}

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] hover:bg-white/20 transition-colors cursor-pointer"
      onClick={onClick}
      data-name="Back Button"
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </button>
  );
}

function MenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
      onClick={onClick}
      data-name="Menu Button"
    >
      <Bell className="w-6 h-6 text-white" />
    </button>
  );
}

function BackButton1() {
  return (
    <div className="w-[44px] h-[44px]" data-name="Back Button Placeholder" />
  );
}



interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  rightElement?: React.ReactNode;
  jobNumber?: string;
  backButtonText?: string;
  origin?: string;
  destination?: string;
  notificationCount?: number; // Add notification count prop
}

export default function Header({ title, onBack, showBackButton = false, onNotificationClick, onProfileClick, rightElement, jobNumber, backButtonText, origin, destination, notificationCount = 0 }: HeaderProps) {
  // Helper function to extract state code from location string
  const extractStateCode = (location: string) => {
    // Try to extract state code (e.g., "NY" from "New York, NY")
    const match = location.match(/,\s*([A-Z]{2})$/);
    return match ? match[1] : location.split(',')[0].trim();
  };

  // Generate route display text
  const routeDisplayText = origin && destination 
    ? `${extractStateCode(origin)} - ${extractStateCode(destination)}`
    : title;

  // Format notification count - show "9+" if count > 9
  const formatNotificationCount = (count: number) => {
    if (count === 0) return null;
    return count > 9 ? '9+' : count.toString();
  };

  const displayCount = formatNotificationCount(notificationCount);

  return (
    <div 
      className="content-stretch flex flex-col items-start shrink-0 w-full overflow-hidden z-50"
      data-name="Header" 
      style={{
        backgroundImage: "linear-gradient(109.083deg, rgb(11, 18, 21) 0.3559%, rgb(48, 48, 49) 106.2%)"
      }}
    >
      <div className="relative shrink-0 w-full z-10" data-name="Progress bar">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex items-center justify-between pb-[12px] pt-[12px] px-[16px] relative w-full">
            {jobNumber ? (
              // Job Details Layout - Simplified
              <>
                <div className="flex items-center justify-center relative shrink-0">
                  {showBackButton && onBack ? (
                    <button
                      onClick={onBack}
                      className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] hover:bg-white/10 transition-colors"
                      aria-label="Go back"
                    >
                      <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                  ) : (
                    <BackButton1 />
                  )}
                </div>
                <div className="basis-0 flex flex-col font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                  <p className="leading-[normal]">{jobNumber || title}</p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  {rightElement || <div className="w-[32px] h-[32px]" />}
                </div>
              </>
            ) : (
              // Default Layout
              <>
                <div className="flex items-center justify-center relative shrink-0">
                  {showBackButton && onBack ? (
                    <BackButton onClick={onBack} />
                  ) : (
                    <BackButton1 />
                  )}
                </div>
                <div className="basis-0 flex flex-col font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                  <p className="leading-[normal]">{routeDisplayText}</p>
                </div>
                <div className="flex items-center gap-3 relative shrink-0">
                  {rightElement ? (
                    rightElement
                  ) : (
                    <>
                      <button 
                        className="flex items-center justify-center w-[36px] h-[36px] rounded-[12px] bg-white/10 hover:bg-white/20 transition-colors cursor-pointer relative"
                        onClick={onNotificationClick}
                        aria-label="Notifications"
                      >
                        <Bell className="w-5 h-5 text-white" />
                        {displayCount && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {displayCount}
                          </span>
                        )}
                      </button>
                      <button 
                        className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer overflow-hidden"
                        onClick={onProfileClick}
                        aria-label="Profile"
                      >
                        <User className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}