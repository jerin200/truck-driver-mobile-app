/**
 * TripExecutionActions Component
 * 
 * Reusable component for trip execution actions including:
 * - Break time tracking UI
 * - Start/End break buttons
 * - Break status indicator
 * 
 * This component can be imported into ViewPermitRequest to add trip execution
 * functionality without modifying existing code structure.
 */

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Timer } from 'lucide-react';

interface TripExecutionActionsProps {
  isBreakActive: boolean;
  canStartBreak: boolean;
  canEndBreak: boolean;
  isLoading: boolean;
  onStartBreak: () => void;
  onEndBreak: () => void;
  showInQuickActions?: boolean;
}

/**
 * Break Status Card
 * Shows when a break is active
 */
export function BreakStatusCard({
  canEndBreak,
  isLoading,
  onEndBreak
}: {
  canEndBreak: boolean;
  isLoading: boolean;
  onEndBreak: () => void;
}) {
  return (
    <Card className="shadow-sm border-blue-200 bg-blue-50 overflow-hidden mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Timer className="h-5 w-5 text-blue-600 animate-pulse" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900">Break in Progress</h3>
            <p className="text-sm text-blue-700">Jurisdiction timer paused</p>
          </div>
        </div>
        <Button 
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onEndBreak}
          disabled={!canEndBreak || isLoading}
        >
          End Break
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Start Break Action Button
 * Shows in Quick Actions menu during In Transit status
 */
export function StartBreakButton({
  isBreakActive,
  canStartBreak,
  isLoading,
  onStartBreak
}: {
  isBreakActive: boolean;
  canStartBreak: boolean;
  isLoading: boolean;
  onStartBreak: () => void;
}) {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
      onClick={onStartBreak}
      disabled={!canStartBreak || isLoading}
    >
      <Timer className="mr-3 h-4 w-4 text-[#0066cc]" />
      <span className="text-gray-900">
        {isBreakActive ? 'Break Active' : 'Start Break'}
      </span>
    </Button>
  );
}

/**
 * Combined Trip Execution Actions
 * Use this component to add all trip execution UI elements
 */
export function TripExecutionActions({
  isBreakActive,
  canStartBreak,
  canEndBreak,
  isLoading,
  onStartBreak,
  onEndBreak,
  showInQuickActions = true
}: TripExecutionActionsProps) {
  return (
    <>
      {/* Break Status Card - Shows when break is active */}
      {isBreakActive && (
        <BreakStatusCard
          canEndBreak={canEndBreak}
          isLoading={isLoading}
          onEndBreak={onEndBreak}
        />
      )}

      {/* Start Break Button - Shows in Quick Actions */}
      {showInQuickActions && (
        <StartBreakButton
          isBreakActive={isBreakActive}
          canStartBreak={canStartBreak}
          isLoading={isLoading}
          onStartBreak={onStartBreak}
        />
      )}
    </>
  );
}

export default TripExecutionActions;
