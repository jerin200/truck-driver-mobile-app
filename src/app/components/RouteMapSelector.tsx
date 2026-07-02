import { useState, useRef } from 'react';
import { MapPin, X, Navigation, Info } from 'lucide-react';
import { Button } from './ui/button';
import trackingMapImage from 'figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png';

interface Waypoint {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface RouteMapSelectorProps {
  onRouteChange?: (waypoints: Waypoint[]) => void;
  initialWaypoints?: Waypoint[];
}

export default function RouteMapSelector({ onRouteChange, initialWaypoints = [] }: RouteMapSelectorProps) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>(initialWaypoints);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newWaypoint: Waypoint = {
      id: `wp-${Date.now()}`,
      x,
      y,
      label: `Point ${waypoints.length + 1}`
    };
    
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
    onRouteChange?.(updatedWaypoints);
  };

  const removeWaypoint = (id: string) => {
    const updatedWaypoints = waypoints.filter(wp => wp.id !== id);
    setWaypoints(updatedWaypoints);
    onRouteChange?.(updatedWaypoints);
  };

  const clearAllWaypoints = () => {
    setWaypoints([]);
    onRouteChange?.([]);
  };

  // Draw SVG path through waypoints
  const getPathD = () => {
    if (waypoints.length < 2) return '';
    
    let d = `M ${waypoints[0].x} ${waypoints[0].y}`;
    for (let i = 1; i < waypoints.length; i++) {
      d += ` L ${waypoints[i].x} ${waypoints[i].y}`;
    }
    return d;
  };

  return (
    <div className="space-y-3">
      {/* Info Banner */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-[6px]">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[11px] text-blue-800 leading-relaxed">
            Tap on the map to add waypoints for your custom route. The route will be drawn connecting all points in order.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-[6px] overflow-hidden border border-gray-200">
        <div 
          ref={mapRef}
          onClick={handleMapClick}
          className="relative w-full h-[280px] cursor-crosshair"
          style={{ backgroundImage: `url(${trackingMapImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Route Path */}
          {waypoints.length >= 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={getPathD()}
                stroke="#F89823"
                strokeWidth="0.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 1"
              />
            </svg>
          )}
          
          {/* Waypoints */}
          {waypoints.map((waypoint, index) => (
            <div
              key={waypoint.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${waypoint.x}%`, top: `${waypoint.y}%` }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#F89823] border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">{index + 1}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWaypoint(waypoint.id);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2.5 h-2.5 text-white" />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {waypoints.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="text-center p-4 bg-white/90 rounded-lg shadow-md">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-[12px] text-gray-600 font-medium">Tap to add waypoints</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay Controls */}
        {waypoints.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
              <span className="text-[11px] font-semibold text-gray-700">
                {waypoints.length} waypoint{waypoints.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAllWaypoints();
              }}
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Waypoint List */}
      {waypoints.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-[6px] p-3">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-3.5 h-3.5 text-gray-600" />
            <h4 className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
              Route Sequence
            </h4>
          </div>
          <div className="space-y-1.5">
            {waypoints.map((waypoint, index) => (
              <div
                key={waypoint.id}
                className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-[4px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#F89823] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{index + 1}</span>
                  </div>
                  <span className="text-[12px] text-gray-700 font-medium">
                    Waypoint {index + 1}
                  </span>
                </div>
                <button
                  onClick={() => removeWaypoint(waypoint.id)}
                  className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
