import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  Navigation, 
  Phone, 
  AlertTriangle,
  Camera,
  Edit,
  MapPin,
  Clock,
  Share2,
  Settings,
  Volume2,
  VolumeX,
  Flag,
  X,
  Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from './ui/drawer';
import trackingMapImage from 'figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png';
import ReportIncidentDrawer from './ReportIncidentDrawer';
import ConvoyJobFlow from './ConvoyJobFlow';
import { useTripExecution } from '../hooks/useTripExecution';

interface LiveMapDrivingProps {
  tripId?: string;
  route?: string;
  currentLocation?: string;
  eta?: string;
  speed?: number;
  onBack?: () => void;
}

export default function LiveMapDriving({
  tripId = "REQ-1001",
  route = "NY - FL",
  currentLocation = "Richmond, VA (I-95 South)",
  eta = "5h 38m",
  speed = 62,
  onBack
}: LiveMapDrivingProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [isIncidentDrawerOpen, setIsIncidentDrawerOpen] = useState(false);
  const [isEndTripOpen, setIsEndTripOpen] = useState(false);
  const [showNotifyBanner, setShowNotifyBanner] = useState(false);
  
  // Trip execution hook for jurisdiction management
  const tripExecution = useTripExecution(tripId);
  const currentJurisdiction = tripExecution.currentJurisdiction;
  const jurisdictionState = currentJurisdiction 
    ? tripExecution.getJurisdictionState(currentJurisdiction.code)
    : null;

  // Debug logging
  useEffect(() => {
    console.log('LiveMapDriving - Debug:', {
      tripId,
      currentJurisdiction,
      jurisdictionState,
      status: jurisdictionState?.status,
      showNotifyBanner,
      tripState: tripExecution.tripState
    });
    
    // Helper message for testing
    if (!tripExecution.tripState) {
      console.log('%c⚠️ No trip state found for ' + tripId, 'color: orange; font-weight: bold;');
      console.log('%cTo test the notification banner, try REQ-1004:', 'color: blue;');
      console.log('%c1. Navigate to Manage Trips', 'color: gray;');
      console.log('%c2. Click on REQ-1004 (Emily Davis - Miami to Atlanta)', 'color: gray;');
      console.log('%c3. Click "Start Trip"', 'color: gray;');
      console.log('%c4. Wait 5 seconds for notification banner', 'color: gray;');
    }
  }, [tripId, currentJurisdiction, jurisdictionState, showNotifyBanner, tripExecution.tripState]);

  // Show notification banner after 5 seconds when jurisdiction is ready to activate
  useEffect(() => {
    console.log('LiveMapDriving - Timer effect triggered:', {
      status: jurisdictionState?.status,
      code: currentJurisdiction?.code,
      requiresPilotCar: jurisdictionState?.requiresPilotCar
    });
    
    // Only show banner if:
    // 1. Jurisdiction is ready to activate
    // 2. Jurisdiction REQUIRES pilot car
    if (jurisdictionState?.status === 'ready-to-activate' && jurisdictionState?.requiresPilotCar) {
      setShowNotifyBanner(false); // Reset first
      console.log('Setting 5-second timer for notification banner...');
      const timer = setTimeout(() => {
        console.log('✅ 5 seconds elapsed - showing notification banner');
        setShowNotifyBanner(true);
      }, 5000); // 5 seconds delay
      
      return () => {
        console.log('Clearing timer');
        clearTimeout(timer);
      };
    } else {
      console.log('Hiding notification banner - either not ready-to-activate or pilot car not required');
      setShowNotifyBanner(false);
    }
  }, [jurisdictionState?.status, currentJurisdiction?.code, jurisdictionState?.requiresPilotCar]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      // Check if fullscreen is supported - silently ignore if not
      if (!document.fullscreenEnabled) {
        return;
      }

      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(() => {
          // Silently handle fullscreen request failure
        });
      } else {
        await document.exitFullscreen().catch(() => {
          // Silently handle fullscreen exit failure
        });
      }
    } catch (err) {
      // Silently handle any fullscreen errors
    }
  };

  // Auto-hide actions after 5 seconds in fullscreen
  useEffect(() => {
    if (isFullscreen && showActions) {
      const timer = setTimeout(() => setShowActions(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, showActions]);

  const handleMapClick = () => {
    if (isFullscreen) {
      setShowActions(true);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-gray-900 flex flex-col relative">
      {/* Map Container */}
      <div 
        className="flex-1 relative overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Map Image - In production, this would be a real map component */}
        <img 
          src={trackingMapImage} 
          alt="Live tracking map" 
          className="w-full h-full object-cover"
        />

        {/* Live Status Card - Compact overlay at TOP */}
        {(!isFullscreen || showActions) && (
          <Card className="absolute top-4 left-4 right-4 bg-white shadow-lg z-30">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                    Live Tracking
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Trip {tripId}
                </Badge>
              </div>
              
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-900 font-medium">{currentLocation}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-600">ETA: <span className="font-semibold text-gray-900">{eta}</span></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-600"><span className="font-semibold text-gray-900">{speed}</span> mph</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Jurisdiction Notification Banner - Shows when ready to activate next jurisdiction */}
        {(!isFullscreen || showActions) && 
         currentJurisdiction && 
         jurisdictionState?.status === 'ready-to-activate' && 
         showNotifyBanner && (
          <Card className="absolute top-28 left-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl z-30 border-0 animate-in slide-in-from-top duration-500">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-lg animate-pulse">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Entering {currentJurisdiction.name}
                  </h3>
                  <p className="text-blue-100 text-xs">
                    Tap below to notify pilot cars assigned to this jurisdiction
                  </p>
                </div>
              </div>
              
              <Button
                onClick={tripExecution.activateJurisdiction}
                disabled={!tripExecution.canActivateJurisdiction || tripExecution.isLoading}
                className="w-full bg-white hover:bg-blue-50 text-blue-700 font-semibold h-11 shadow-md"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Pilot Cars for {currentJurisdiction.code}
              </Button>
            </div>
          </Card>
        )}

        {/* Fullscreen Toggle Button - At BOTTOM of map */}
        
        {/* Minimize Button - Bottom Right */}
        {onBack && (!isFullscreen || showActions) && (
          <Button
            size="icon"
            className="absolute bottom-4 right-4 bg-white text-gray-900 shadow-lg hover:bg-gray-100 z-50"
            onClick={onBack}
            aria-label="Close full screen map"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Bottom Actions Panel */}
      {(!isFullscreen || showActions) && (
        <div className="bg-white border-t border-gray-200 px-4 py-4 safe-area-bottom z-40">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Log Incident */}
              <Button 
                variant="outline" 
                className="h-14 flex-col gap-1 border-2"
                onClick={() => setIsIncidentDrawerOpen(true)}
              >
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-xs font-medium">Log Incident</span>
              </Button>

              {/* End Trip */}
              <Button 
                variant="outline" 
                className="h-14 flex-col gap-1 border-2"
                onClick={() => setIsEndTripOpen(true)}
              >
                <Flag className="h-5 w-5 text-[#F89823]" />
                <span className="text-xs font-medium">End Trip</span>
              </Button>

              {/* Request Route Change */}
              <Button 
                variant="outline" 
                className="h-14 flex-col gap-1 border-2"
              >
                <Edit className="h-5 w-5 text-orange-500" />
                <span className="text-xs font-medium">Route Change</span>
              </Button>

              {/* Share Location */}
              <Button 
                variant="outline" 
                className="h-14 flex-col gap-1 border-2"
              >
                <Share2 className="h-5 w-5 text-green-500" />
                <span className="text-xs font-medium">Share Location</span>
              </Button>
            </div>

            {/* Emergency Contact */}
            <Button 
              className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white h-12"
            >
              <Phone className="h-5 w-5 mr-2" />
              Emergency Contact
            </Button>
          </div>
        </div>
      )}

      {/* Fullscreen Hint */}
      {isFullscreen && !showActions && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-gray-900/80 text-white px-4 py-2 rounded-full text-sm opacity-0 animate-fade-in">
            Tap to show controls
          </div>
        </div>
      )}

      {/* Report Incident Drawer */}
      <ReportIncidentDrawer isOpen={isIncidentDrawerOpen} onClose={() => setIsIncidentDrawerOpen(false)} />

      {/* End Trip Confirmation Drawer */}
      <Drawer open={isEndTripOpen} onOpenChange={setIsEndTripOpen}>
        <DrawerContent>
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="text-left relative">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              <DrawerTitle>End Trip</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to end this trip?
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 pb-4 space-y-4">
              <p className="text-sm text-gray-500">
                Ending the trip will update the status to "Completed" and stop GPS tracking. 
                This action will finalize all permits and jobs associated with this trip.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Important</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Please ensure all deliveries are completed and all documentation is finalized before ending the trip.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DrawerFooter className="gap-2">
              <Button 
                className="w-full bg-[#F89823] hover:bg-[#e08820] text-[#1A1A1A]"
                onClick={() => {
                  // Handle end trip logic
                  console.log('Ending trip:', tripId);
                  alert('Trip ended successfully!\\n\\nIn a real application, this would:\\n- Update trip status to "Completed"\\n- Stop GPS tracking\\n- Finalize all permits and jobs\\n- Generate completion reports');
                  setIsEndTripOpen(false);
                }}
              >
                <Flag className="mr-2 h-5 w-5" />
                End Trip
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Pilot/Escort Convoy Job — notifications + job confirmation, payment hold,
          invoice review/dispute, and payment capture, all layered over this screen. */}
      <ConvoyJobFlow onExitToTrip={onBack} />
    </div>
  );
}