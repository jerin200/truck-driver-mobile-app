/**
 * JurisdictionProgressTracker Component
 * 
 * Displays jurisdiction progression status and provides controls
 * for completing jurisdictions during trip execution.
 * 
 * This component can be added to the ViewPermitRequest Actions tab
 * to show real-time jurisdiction status.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Circle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { JurisdictionState } from '../services/tripExecutionService';

interface JurisdictionProgressTrackerProps {
  jurisdictions: JurisdictionState[];
  currentIndex: number;
  canCompleteJurisdiction: boolean;
  isLoading: boolean;
  onCompleteJurisdiction: () => void;
  isBreakActive: boolean;
}

/**
 * Get status color for jurisdiction badge
 */
function getJurisdictionStatusColor(status: JurisdictionState['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'active':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'pending':
      return 'bg-gray-100 text-gray-600 border-gray-300';
    case 'skipped':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300';
  }
}

/**
 * Get status icon for jurisdiction
 */
function getJurisdictionIcon(status: JurisdictionState['status']) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'active':
      return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
    case 'pending':
      return <Circle className="h-4 w-4 text-gray-400" />;
    case 'skipped':
      return <ChevronRight className="h-4 w-4 text-yellow-600" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
}

/**
 * Jurisdiction Progress Tracker Component
 */
export function JurisdictionProgressTracker({
  jurisdictions,
  currentIndex,
  canCompleteJurisdiction,
  isLoading,
  onCompleteJurisdiction,
  isBreakActive
}: JurisdictionProgressTrackerProps) {
  if (jurisdictions.length === 0) {
    return null;
  }

  const currentJurisdiction = jurisdictions[currentIndex];
  const completedCount = jurisdictions.filter(j => j.status === 'completed').length;
  const progress = (completedCount / jurisdictions.length) * 100;

  return (
    <div className="space-y-4">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-700" />
              Jurisdiction Progress
            </CardTitle>
            <span className="text-xs text-gray-500">
              {completedCount} of {jurisdictions.length} completed
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Current Jurisdiction Card */}
          {currentJurisdiction && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="text-sm font-semibold text-blue-900">
                    Current: {currentJurisdiction.code}
                  </span>
                </div>
                <Badge className={getJurisdictionStatusColor(currentJurisdiction.status)}>
                  {currentJurisdiction.status}
                </Badge>
              </div>

              {currentJurisdiction.permitNumber && (
                <p className="text-xs text-blue-700 mb-2">
                  Permit: {currentJurisdiction.permitNumber}
                </p>
              )}

              {/* Complete Jurisdiction Button */}
              {currentJurisdiction.status === 'active' && (
                <>
                  <Button 
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onCompleteJurisdiction}
                    disabled={!canCompleteJurisdiction || isLoading || isBreakActive}
                  >
                    Complete {currentJurisdiction.code}
                  </Button>
                  
                  {isBreakActive && (
                    <p className="text-xs text-amber-600 mt-2 text-center">
                      End break before completing jurisdiction
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* All Jurisdictions List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {jurisdictions.map((jurisdiction, index) => (
              <div 
                key={jurisdiction.code}
                className={`flex items-center gap-3 p-2 rounded-lg border ${
                  jurisdiction.status === 'active' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {getJurisdictionIcon(jurisdiction.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      jurisdiction.status === 'active' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {jurisdiction.code}
                    </span>
                    
                    {jurisdiction.permitNumber && (
                      <span className="text-xs text-gray-500">
                        {jurisdiction.permitNumber}
                      </span>
                    )}
                  </div>
                  
                  {jurisdiction.duration && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Duration: {Math.floor(jurisdiction.duration / 60)}m
                    </p>
                  )}
                </div>
                
                <Badge 
                  className={`text-xs ${getJurisdictionStatusColor(jurisdiction.status)}`}
                >
                  {jurisdiction.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Next Jurisdiction Preview */}
          {currentIndex < jurisdictions.length - 1 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  Next: <span className="font-semibold">{jurisdictions[currentIndex + 1].code}</span>
                </span>
              </div>
            </div>
          )}

          {/* All Complete Message */}
          {completedCount === jurisdictions.length && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-green-900">
                All Jurisdictions Completed!
              </p>
              <p className="text-xs text-green-700 mt-1">
                Trip ready for final completion
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default JurisdictionProgressTracker;

/**
 * USAGE EXAMPLE:
 * 
 * In ViewPermitRequest.tsx Actions tab, add this after the Break Status Card:
 * 
 * {tripExecution.tripState && tripExecution.tripState.status === 'In Transit' && (
 *   <JurisdictionProgressTracker
 *     jurisdictions={tripExecution.tripState.jurisdictions}
 *     currentIndex={tripExecution.tripState.currentJurisdictionIndex}
 *     canCompleteJurisdiction={tripExecution.canCompleteJurisdiction}
 *     isLoading={tripExecution.isLoading}
 *     onCompleteJurisdiction={tripExecution.completeJurisdiction}
 *     isBreakActive={tripExecution.isBreakActive}
 *   />
 * )}
 */
