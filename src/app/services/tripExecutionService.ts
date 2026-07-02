/**
 * Trip Execution Service
 * 
 * Manages trip execution state, jurisdiction progression, break tracking,
 * and pilot car notifications with clean separation of concerns.
 * 
 * Workflow:
 * 1. Start Trip → First jurisdiction becomes "Ready to Activate"
 * 2. Activate Jurisdiction → Jurisdiction becomes "Active", pilots notified
 * 3. Pilot accepts and starts job (separate flow)
 * 4. Complete Jurisdiction → Lock times, next becomes "Ready to Activate"
 */

export interface JurisdictionState {
  code: string;
  name?: string; // Full state name (e.g., "Florida", "Georgia")
  status: 'upcoming' | 'ready-to-activate' | 'active' | 'completed' | 'skipped';
  permitStatus: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  requiresPilotCar: boolean; // Whether this jurisdiction requires pilot car escort
  pilotCarJobIds?: string[]; // IDs of pilot car jobs assigned to this jurisdiction
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in seconds
  waitingTime?: number; // in seconds
  breakTime?: number; // in seconds
  activatedAt?: Date; // when driver activated the jurisdiction
}

export interface BreakRecord {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in seconds
  jurisdictionCode?: string;
}

export interface PilotCarNotification {
  id: string;
  tripId: string;
  jurisdictionCode: string;
  role: 'Lead' | 'Chase' | 'High Pole';
  pilotCarDriverId?: string;
  sentAt: Date;
  status: 'sent' | 'acknowledged' | 'failed';
  message: string;
  estimatedArrivalTime?: string;
}

export interface TripExecutionState {
  tripId: string;
  status: 'Open' | 'In Transit' | 'Completed' | 'Cancelled';
  startTime?: Date;
  endTime?: Date;
  currentJurisdictionIndex: number;
  jurisdictions: JurisdictionState[];
  breaks: BreakRecord[];
  activeBreak?: BreakRecord;
  pilotCarNotifications: PilotCarNotification[];
  totalDuration?: number; // in seconds
  totalBreakTime?: number; // in seconds
  totalWaitingTime?: number; // in seconds
}

// Local storage key
const STORAGE_KEY_PREFIX = 'trip_execution_';

/**
 * Trip Execution Service Class
 */
export class TripExecutionService {
  /**
   * Get trip execution state from local storage
   */
  static getTripState(tripId: string): TripExecutionState | null {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${tripId}`);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      if (parsed.startTime) parsed.startTime = new Date(parsed.startTime);
      if (parsed.endTime) parsed.endTime = new Date(parsed.endTime);
      if (parsed.activeBreak?.startTime) {
        parsed.activeBreak.startTime = new Date(parsed.activeBreak.startTime);
      }
      parsed.breaks = parsed.breaks.map((b: any) => ({
        ...b,
        startTime: new Date(b.startTime),
        endTime: b.endTime ? new Date(b.endTime) : undefined
      }));
      parsed.jurisdictions = parsed.jurisdictions.map((j: any) => ({
        ...j,
        startTime: j.startTime ? new Date(j.startTime) : undefined,
        endTime: j.endTime ? new Date(j.endTime) : undefined,
        activatedAt: j.activatedAt ? new Date(j.activatedAt) : undefined
      }));
      parsed.pilotCarNotifications = parsed.pilotCarNotifications.map((n: any) => ({
        ...n,
        sentAt: new Date(n.sentAt)
      }));
      
      return parsed;
    } catch (error) {
      console.error('Error loading trip state:', error);
      return null;
    }
  }

  /**
   * Save trip execution state to local storage
   */
  static saveTripState(state: TripExecutionState): void {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${state.tripId}`, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving trip state:', error);
    }
  }

  /**
   * Validates if a trip can be started
   * - Trip status must be 'Open'
   * - First jurisdiction must have approved permit
   */
  static canStartTrip(tripId: string, jurisdictions: JurisdictionState[]): {
    canStart: boolean;
    reason?: string;
  } {
    const state = this.getTripState(tripId);
    
    // Add null check for jurisdictions
    if (!jurisdictions || jurisdictions.length === 0) {
      console.log('canStartTrip: No jurisdictions provided or empty array', { tripId, jurisdictions });
      return { canStart: false, reason: 'No jurisdictions defined' };
    }
    
    console.log('canStartTrip Debug:', {
      tripId,
      state,
      jurisdictions,
      jurisdictionsLength: jurisdictions.length,
      firstJurisdiction: jurisdictions[0]
    });
    
    // If already in transit, cannot start again
    if (state && state.status === 'In Transit') {
      return { canStart: false, reason: 'Trip already in transit' };
    }

    const firstJurisdiction = jurisdictions[0];
    
    console.log('Checking first jurisdiction permit status:', {
      code: firstJurisdiction.code,
      permitStatus: firstJurisdiction.permitStatus,
      isApproved: firstJurisdiction.permitStatus === 'Approved',
      strictCheck: firstJurisdiction.permitStatus !== 'Approved'
    });
    
    if (firstJurisdiction.permitStatus !== 'Approved') {
      const result = { 
        canStart: false, 
        reason: `First jurisdiction (${firstJurisdiction.code}) requires approved permit` 
      };
      console.log('canStartTrip returning FALSE:', result);
      return result;
    }

    const result = { canStart: true };
    console.log('canStartTrip returning TRUE:', result);
    return result;
  }

  /**
   * Start a trip
   * - Changes status to 'In Transit'
   * - Sets first jurisdiction to 'ready-to-activate'
   * - Sets all other jurisdictions to 'upcoming'
   * - Records start timestamp
   * - DOES NOT notify pilot cars
   * - DOES NOT start pilot billing
   */
  static startTrip(tripId: string, jurisdictions: JurisdictionState[]): TripExecutionState {
    const canStartResult = this.canStartTrip(tripId, jurisdictions);
    if (!canStartResult.canStart) {
      throw new Error(canStartResult.reason || 'Cannot start trip');
    }

    const now = new Date();
    
    // Create initial state with proper jurisdiction statuses
    const updatedJurisdictions = jurisdictions.map((j, index) => ({
      ...j,
      status: index === 0 ? 'ready-to-activate' : 'upcoming',
      // Don't set startTime yet - that happens on activation
    })) as JurisdictionState[];

    const state: TripExecutionState = {
      tripId,
      status: 'In Transit',
      startTime: now,
      currentJurisdictionIndex: 0,
      jurisdictions: updatedJurisdictions,
      breaks: [],
      pilotCarNotifications: [],
    };

    // Save state WITHOUT sending pilot notifications
    this.saveTripState(state);

    console.log(`Trip ${tripId} started. First jurisdiction (${updatedJurisdictions[0].code}) is ready to activate.`);

    return state;
  }

  /**
   * Activate a jurisdiction
   * - Changes jurisdiction status from 'ready-to-activate' to 'active'
   * - Records activation timestamp
   * - Sends notifications ONLY to pilot cars assigned to THIS jurisdiction
   * - DOES NOT start pilot billing (pilot controls that)
   */
  static activateJurisdiction(tripId: string): TripExecutionState {
    const state = this.getTripState(tripId);
    if (!state) {
      throw new Error('Trip state not found');
    }

    if (state.status !== 'In Transit') {
      throw new Error('Trip must be in transit to activate jurisdiction');
    }

    const currentIndex = state.currentJurisdictionIndex;
    if (currentIndex >= state.jurisdictions.length) {
      throw new Error('No jurisdiction to activate');
    }

    const currentJurisdiction = state.jurisdictions[currentIndex];
    
    if (currentJurisdiction.status !== 'ready-to-activate') {
      throw new Error(`Jurisdiction ${currentJurisdiction.code} is not ready to activate (current status: ${currentJurisdiction.status})`);
    }

    const now = new Date();
    
    // Update jurisdiction to active
    currentJurisdiction.status = 'active';
    currentJurisdiction.startTime = now;
    currentJurisdiction.activatedAt = now;

    // Send pilot car notifications for THIS jurisdiction ONLY
    const notifications = this.sendPilotCarNotifications(tripId, currentJurisdiction);
    state.pilotCarNotifications.push(...notifications);

    // Save state
    this.saveTripState(state);

    console.log(`Jurisdiction ${currentJurisdiction.code} activated. Pilot cars notified.`);

    return state;
  }

  /**
   * Check if jurisdiction can be activated
   */
  static canActivateJurisdiction(tripId: string): { canActivate: boolean; reason?: string } {
    const state = this.getTripState(tripId);
    
    if (!state) {
      return { canActivate: false, reason: 'Trip not found' };
    }

    if (state.status !== 'In Transit') {
      return { canActivate: false, reason: 'Trip must be in transit' };
    }

    if (state.activeBreak) {
      return { canActivate: false, reason: 'Cannot activate jurisdiction while on break' };
    }

    const currentIndex = state.currentJurisdictionIndex;
    if (currentIndex >= state.jurisdictions.length) {
      return { canActivate: false, reason: 'No jurisdiction to activate' };
    }

    const currentJurisdiction = state.jurisdictions[currentIndex];
    if (currentJurisdiction.status !== 'ready-to-activate') {
      return { canActivate: false, reason: `Jurisdiction ${currentJurisdiction.code} is not ready to activate` };
    }

    return { canActivate: true };
  }

  /**
   * Send pilot car notifications for a jurisdiction
   * (This is a simulation - in production, this would call an API)
   */
  private static sendPilotCarNotifications(
    tripId: string, 
    jurisdiction: JurisdictionState
  ): PilotCarNotification[] {
    // Simulate sending notifications
    // In production, this would:
    // 1. Look up assigned pilot cars for this jurisdiction
    // 2. Send push notifications/SMS/email
    // 3. Calculate ETA
    // 4. Record notification status
    
    const notifications: PilotCarNotification[] = [];
    
    // Example: Create notification records
    // (In real implementation, these would be based on actual job assignments)
    const notificationId = `notif_${Date.now()}`;
    
    // Calculate mock ETA (in production, use actual GPS data)
    const now = new Date();
    const eta = new Date(now.getTime() + 15 * 60000); // 15 minutes from now
    const hh = String(eta.getHours()).padStart(2, '0');
    const mm = String(eta.getMinutes()).padStart(2, '0');
    const etaString = `${hh}:${mm}`;
    
    notifications.push({
      id: notificationId,
      tripId,
      jurisdictionCode: jurisdiction.code,
      role: 'Lead', // Would be determined by job assignment
      sentAt: new Date(),
      status: 'sent',
      message: `Jurisdiction ${jurisdiction.code} is now active. Please begin escort duty.`,
      estimatedArrivalTime: etaString
    });

    console.log(`Pilot car notifications sent for ${jurisdiction.code}:`, notifications);
    
    return notifications;
  }

  /**
   * Start a break
   * - Cannot start if break already active
   * - Pauses jurisdiction timer
   * - DOES NOT affect pilot billing
   * - DOES NOT complete jurisdiction
   */
  static startBreak(tripId: string): TripExecutionState {
    const state = this.getTripState(tripId);
    if (!state) {
      throw new Error('Trip state not found');
    }

    if (state.status !== 'In Transit') {
      throw new Error('Can only take breaks during active trip');
    }

    if (state.activeBreak) {
      throw new Error('Break already in progress');
    }

    const breakRecord: BreakRecord = {
      id: `break_${Date.now()}`,
      startTime: new Date(),
      jurisdictionCode: state.jurisdictions[state.currentJurisdictionIndex]?.code
    };

    state.activeBreak = breakRecord;
    state.breaks.push(breakRecord);

    this.saveTripState(state);
    return state;
  }

  /**
   * End active break
   * - Calculates duration
   * - Resumes jurisdiction timer
   * - Break time is tracked but doesn't affect jurisdiction billing
   */
  static endBreak(tripId: string): TripExecutionState {
    const state = this.getTripState(tripId);
    if (!state) {
      throw new Error('Trip state not found');
    }

    if (!state.activeBreak) {
      throw new Error('No active break to end');
    }

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - state.activeBreak.startTime.getTime()) / 1000);

    // Update the break record in the breaks array
    const breakIndex = state.breaks.findIndex(b => b.id === state.activeBreak!.id);
    if (breakIndex !== -1) {
      state.breaks[breakIndex].endTime = endTime;
      state.breaks[breakIndex].duration = duration;
    }

    // Calculate total break time
    state.totalBreakTime = state.breaks.reduce((sum, b) => sum + (b.duration || 0), 0);

    delete state.activeBreak;

    this.saveTripState(state);
    return state;
  }

  /**
   * Complete current jurisdiction and prepare next
   * - Cannot complete if break is active
   * - Cannot complete if jurisdiction not active
   * - Marks jurisdiction as 'completed'
   * - Stops pilot job (if active) - LOCKS TIME LOGS
   * - Sets next jurisdiction to 'ready-to-activate'
   * - DOES NOT auto-notify next jurisdiction's pilots
   */
  static completeJurisdiction(tripId: string): TripExecutionState {
    const state = this.getTripState(tripId);
    if (!state) {
      throw new Error('Trip state not found');
    }

    if (state.activeBreak) {
      throw new Error('Cannot complete jurisdiction while break is active. End break first.');
    }

    const currentIndex = state.currentJurisdictionIndex;
    if (currentIndex >= state.jurisdictions.length) {
      throw new Error('No active jurisdiction to complete');
    }

    const currentJurisdiction = state.jurisdictions[currentIndex];
    
    if (currentJurisdiction.status !== 'active') {
      throw new Error(`Cannot complete jurisdiction ${currentJurisdiction.code} - it is not active (status: ${currentJurisdiction.status})`);
    }

    const now = new Date();
    
    // Mark current jurisdiction as completed
    currentJurisdiction.status = 'completed';
    currentJurisdiction.endTime = now;
    
    // Calculate duration (excluding break time for this jurisdiction)
    if (currentJurisdiction.startTime) {
      const totalTime = Math.floor((now.getTime() - currentJurisdiction.startTime.getTime()) / 1000);
      const jurisdictionBreakTime = state.breaks
        .filter(b => b.jurisdictionCode === currentJurisdiction.code)
        .reduce((sum, b) => sum + (b.duration || 0), 0);
      currentJurisdiction.duration = totalTime - jurisdictionBreakTime;
      currentJurisdiction.breakTime = jurisdictionBreakTime;
    }

    // Prepare next jurisdiction if exists
    if (currentIndex + 1 < state.jurisdictions.length) {
      const nextJurisdiction = state.jurisdictions[currentIndex + 1];
      nextJurisdiction.status = 'ready-to-activate';
      state.currentJurisdictionIndex = currentIndex + 1;

      console.log(`Jurisdiction ${currentJurisdiction.code} completed. Next jurisdiction ${nextJurisdiction.code} is ready to activate.`);
      
      // DO NOT send notifications here - driver must activate jurisdiction first
    } else {
      // All jurisdictions completed - trip is complete
      state.status = 'Completed';
      state.endTime = now;
      
      if (state.startTime) {
        state.totalDuration = Math.floor((now.getTime() - state.startTime.getTime()) / 1000);
      }

      console.log(`All jurisdictions completed. Trip ${tripId} is complete.`);
    }

    this.saveTripState(state);
    return state;
  }

  /**
   * End trip (for emergency situations or cancellations)
   * - Cannot end if break is active
   */
  static endTrip(tripId: string): TripExecutionState {
    const state = this.getTripState(tripId);
    if (!state) {
      throw new Error('Trip state not found');
    }

    if (state.activeBreak) {
      throw new Error('Cannot end trip while break is active. Please end the break first.');
    }

    const now = new Date();
    state.status = 'Completed';
    state.endTime = now;

    if (state.startTime) {
      state.totalDuration = Math.floor((now.getTime() - state.startTime.getTime()) / 1000);
    }

    this.saveTripState(state);
    return state;
  }

  /**
   * Get current active or ready-to-activate jurisdiction
   */
  static getCurrentJurisdiction(tripId: string): JurisdictionState | null {
    const state = this.getTripState(tripId);
    if (!state) return null;
    
    return state.jurisdictions[state.currentJurisdictionIndex] || null;
  }

  /**
   * Check if break can be started
   */
  static canStartBreak(tripId: string): { canStart: boolean; reason?: string } {
    const state = this.getTripState(tripId);
    
    if (!state) {
      return { canStart: false, reason: 'Trip not found' };
    }

    if (state.status !== 'In Transit') {
      return { canStart: false, reason: 'Trip must be in transit' };
    }

    if (state.activeBreak) {
      return { canStart: false, reason: 'Break already in progress' };
    }

    return { canStart: true };
  }

  /**
   * Check if jurisdiction can be completed
   */
  static canCompleteJurisdiction(tripId: string): { canComplete: boolean; reason?: string } {
    const state = this.getTripState(tripId);
    
    if (!state) {
      return { canComplete: false, reason: 'Trip not found' };
    }

    if (state.activeBreak) {
      return { canComplete: false, reason: 'Cannot complete jurisdiction while break is active' };
    }

    const currentIndex = state.currentJurisdictionIndex;
    if (currentIndex >= state.jurisdictions.length) {
      return { canComplete: false, reason: 'No active jurisdiction' };
    }

    const currentJurisdiction = state.jurisdictions[currentIndex];
    if (currentJurisdiction.status !== 'active') {
      return { canComplete: false, reason: `Jurisdiction must be active to complete (current: ${currentJurisdiction.status})` };
    }

    return { canComplete: true };
  }

  /**
   * Format duration in seconds to human-readable format
   */
  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  /**
   * Clear trip state (for testing or trip deletion)
   */
  static clearTripState(tripId: string): void {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${tripId}`);
  }
}