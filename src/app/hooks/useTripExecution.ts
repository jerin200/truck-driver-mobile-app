/**
 * useTripExecution Hook
 * 
 * React hook for managing trip execution state with clean jurisdiction workflow:
 * 1. Start Trip → First jurisdiction becomes "ready-to-activate"
 * 2. Activate Jurisdiction → Sends pilot notifications, starts timing
 * 3. Complete Jurisdiction → Locks times, prepares next jurisdiction
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  TripExecutionService, 
  TripExecutionState, 
  JurisdictionState 
} from '../services/tripExecutionService';
import { toast } from 'sonner';

interface UseTripExecutionResult {
  tripState: TripExecutionState | null;
  isLoading: boolean;
  canStartTrip: boolean;
  canStartTripReason?: string;
  canActivateJurisdiction: boolean;
  canActivateJurisdictionReason?: string;
  canStartBreak: boolean;
  canStartBreakReason?: string;
  canEndBreak: boolean;
  canCompleteJurisdiction: boolean;
  canCompleteJurisdictionReason?: string;
  canEndTrip: boolean;
  isBreakActive: boolean;
  currentJurisdiction: JurisdictionState | null;
  getJurisdictionState: (code: string) => JurisdictionState | null;
  startTrip: () => Promise<void>;
  activateJurisdiction: () => Promise<void>;
  startBreak: () => Promise<void>;
  endBreak: () => Promise<void>;
  completeJurisdiction: () => Promise<void>;
  endTrip: () => Promise<void>;
  refreshState: () => void;
}

export function useTripExecution(
  tripId: string,
  jurisdictions?: JurisdictionState[],
  onTripStarted?: () => void,
  onJurisdictionActivated?: () => void,
  onJurisdictionCompleted?: () => void,
  onTripCompleted?: () => void
): UseTripExecutionResult {
  const [tripState, setTripState] = useState<TripExecutionState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load trip state on mount and when tripId changes
  const refreshState = useCallback(() => {
    const state = TripExecutionService.getTripState(tripId);
    setTripState(state);
  }, [tripId]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  // Use jurisdictions from state if available, otherwise use passed jurisdictions
  const effectiveJurisdictions = tripState?.jurisdictions || jurisdictions || [];

  // Compute derived state
  const canStartTripCheck = TripExecutionService.canStartTrip(tripId, effectiveJurisdictions);
  const canActivateJurisdictionCheck = TripExecutionService.canActivateJurisdiction(tripId);
  const canStartBreakCheck = TripExecutionService.canStartBreak(tripId);
  const canCompleteJurisdictionCheck = TripExecutionService.canCompleteJurisdiction(tripId);
  
  console.log('useTripExecution - canStartTripCheck:', {
    tripId,
    jurisdictionsCount: effectiveJurisdictions.length,
    canStartTripCheck
  });
  
  const canStartTrip = canStartTripCheck.canStart;
  const canActivateJurisdiction = canActivateJurisdictionCheck.canActivate;
  const canStartBreak = canStartBreakCheck.canStart;
  const canEndBreak = !!tripState?.activeBreak;
  const canCompleteJurisdiction = canCompleteJurisdictionCheck.canComplete;
  const canEndTrip = tripState?.status === 'In Transit' && !tripState?.activeBreak;
  const isBreakActive = !!tripState?.activeBreak;
  const currentJurisdiction = TripExecutionService.getCurrentJurisdiction(tripId);

  // Start trip action
  const startTrip = useCallback(async () => {
    setIsLoading(true);
    try {
      const newState = TripExecutionService.startTrip(tripId, effectiveJurisdictions);
      setTripState(newState);
      
      const firstJurisdiction = newState.jurisdictions[0];
      toast.success('Trip started successfully', {
        description: `${firstJurisdiction.code} is ready to activate`
      });

      if (onTripStarted) {
        onTripStarted();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to start trip';
      toast.error('Cannot start trip', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId, effectiveJurisdictions, onTripStarted]);

  // Activate jurisdiction action
  const activateJurisdiction = useCallback(async () => {
    setIsLoading(true);
    try {
      const newState = TripExecutionService.activateJurisdiction(tripId);
      setTripState(newState);
      
      const activeJurisdiction = newState.jurisdictions[newState.currentJurisdictionIndex];
      toast.success(`${activeJurisdiction.code} activated`, {
        description: 'Pilot cars have been notified'
      });

      if (onJurisdictionActivated) {
        onJurisdictionActivated();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to activate jurisdiction';
      toast.error('Cannot activate jurisdiction', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId, onJurisdictionActivated]);

  // Start break action
  const startBreak = useCallback(async () => {
    setIsLoading(true);
    try {
      const newState = TripExecutionService.startBreak(tripId);
      setTripState(newState);
      
      toast.success('Break started', {
        description: 'Jurisdiction timer paused'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to start break';
      toast.error('Cannot start break', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  // End break action
  const endBreak = useCallback(async () => {
    setIsLoading(true);
    try {
      const newState = TripExecutionService.endBreak(tripId);
      setTripState(newState);
      
      const breakDuration = newState.breaks[newState.breaks.length - 1]?.duration || 0;
      const durationText = TripExecutionService.formatDuration(breakDuration);
      
      toast.success('Break ended', {
        description: `Break duration: ${durationText}`
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to end break';
      toast.error('Cannot end break', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  // Complete jurisdiction action
  const completeJurisdiction = useCallback(async () => {
    setIsLoading(true);
    try {
      const oldState = TripExecutionService.getTripState(tripId);
      const completingJurisdiction = oldState?.jurisdictions[oldState.currentJurisdictionIndex];
      
      console.log('=== COMPLETING JURISDICTION ===');
      console.log('Old state:', oldState);
      console.log('Completing jurisdiction:', completingJurisdiction);
      console.log('Current index:', oldState?.currentJurisdictionIndex);
      console.log('Total jurisdictions:', oldState?.jurisdictions.length);
      
      const newState = TripExecutionService.completeJurisdiction(tripId);
      setTripState(newState);
      
      console.log('New state after completion:', newState);
      console.log('New status:', newState.status);
      console.log('New current index:', newState.currentJurisdictionIndex);
      
      if (newState.status === 'Completed') {
        console.log('✅ Trip completed - calling onTripCompleted');
        toast.success('Trip completed!', {
          description: 'All jurisdictions have been completed'
        });
        
        if (onTripCompleted) {
          onTripCompleted();
        }
      } else {
        const nextJurisdiction = newState.jurisdictions[newState.currentJurisdictionIndex];
        console.log('✅ Jurisdiction completed - next jurisdiction:', nextJurisdiction);
        toast.success(`${completingJurisdiction?.code || 'Jurisdiction'} completed`, {
          description: `${nextJurisdiction.code} is ready to activate`
        });
        
        if (onJurisdictionCompleted) {
          onJurisdictionCompleted();
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to complete jurisdiction';
      console.error('❌ Error completing jurisdiction:', error);
      toast.error('Cannot complete jurisdiction', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId, onJurisdictionCompleted, onTripCompleted]);

  // End trip action (for cancellation or emergency)
  const endTrip = useCallback(async () => {
    setIsLoading(true);
    try {
      const newState = TripExecutionService.endTrip(tripId);
      setTripState(newState);
      
      toast.success('Trip ended', {
        description: 'Trip has been completed'
      });

      if (onTripCompleted) {
        onTripCompleted();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to end trip';
      toast.error('Cannot end trip', {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  }, [tripId, onTripCompleted]);

  // Get jurisdiction state by code
  const getJurisdictionState = useCallback((code: string) => {
    return tripState?.jurisdictions.find(jurisdiction => jurisdiction.code === code) || null;
  }, [tripState]);

  return {
    tripState,
    isLoading,
    canStartTrip,
    canStartTripReason: canStartTripCheck.reason,
    canActivateJurisdiction,
    canActivateJurisdictionReason: canActivateJurisdictionCheck.reason,
    canStartBreak,
    canStartBreakReason: canStartBreakCheck.reason,
    canEndBreak,
    canCompleteJurisdiction,
    canCompleteJurisdictionReason: canCompleteJurisdictionCheck.reason,
    canEndTrip,
    isBreakActive,
    currentJurisdiction,
    getJurisdictionState,
    startTrip,
    activateJurisdiction,
    startBreak,
    endBreak,
    completeJurisdiction,
    endTrip,
    refreshState
  };
}