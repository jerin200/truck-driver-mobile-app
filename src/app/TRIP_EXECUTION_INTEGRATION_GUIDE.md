# Trip Execution Integration Guide

This document outlines the trip execution enhancements added to the Truck Driver Mobile App.

## Files Created

### 1. `/services/tripExecutionService.ts`
State management service for trip execution, jurisdiction progression, break tracking, and pilot car notifications.

**Key Features:**
- Start Trip validation and execution
- Automatic pilot car notifications
- Break time tracking with timer pause
- Sequential jurisdiction progression
- Local storage persistence
- Guardrails and validation

### 2. `/hooks/useTripExecution.ts`
React hook for integrating trip execution service with UI components.

**Provides:**
- State management
- Action handlers (startTrip, startBreak, endBreak, completeJurisdiction, endTrip)
- Validation flags (canStartTrip, canStartBreak, etc.)
- Toast notifications
- Loading states

## Integration Points

### ViewPermitRequest.tsx Integration

#### 1. Import the Hook
```typescript
import { useTripExecution } from '../hooks/useTripExecution';
import { JurisdictionState } from '../services/tripExecutionService';
```

#### 2. Convert Permit States to Jurisdictions
Add this code after the component state initialization (around line 1150):

```typescript
// Convert permit states to jurisdiction states for trip execution
const jurisdictions: JurisdictionState[] = permit.states.map(state => ({
  code: state.code,
  status: 'pending' as const,
  permitStatus: state.status,
  permitNumber: state.permitNumber,
}));

// Trip execution hook - integrates trip execution business logic
const tripExecution = useTripExecution(
  permit.requestId,
  jurisdictions,
  // onTripStarted callback
  () => {
    setPermit(prev => ({ ...prev, status: 'In Transit' }));
  },
  // onJurisdictionCompleted callback
  () => {
    // Refresh permit state or trigger any UI updates
  },
  // onTripCompleted callback
  () => {
    setPermit(prev => ({ ...prev, status: 'Completed' }));
  }
);
```

#### 3. Update handleStartTrip Function
Replace the existing handleStartTrip function (around line 1314) with:

```typescript
// Handle starting the trip - integrated with trip execution service
const handleStartTrip = async () => {
  try {
    // Use the trip execution service to start the trip
    await tripExecution.startTrip();
    
    const startTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newEvent = {
      event: 'Trip Started',
      location: permit.origin,
      time: startTime
    };
    setTripHistory(prev => [newEvent, ...prev]);
    
    // Update permit status to In Transit
    setPermit(prev => ({
      ...prev,
      status: 'In Transit',
      tracking: {
        status: 'In Transit',
        currentLocation: permit.origin,
        nextStop: permit.destination,
        eta: '2:30 PM',
        speed: '0 mph',
        distanceRemaining: prev.distance || '250 miles'
      }
    }));
    
    setIsStartingTrip(false);
  } catch (error) {
    // Error handling is done by the hook via toast
    setIsStartingTrip(false);
  }
};
```

#### 4. Add Break Time UI (Before Quick Actions Section)
Insert this code before the "Quick Actions" section (around line 1576):

```typescript
{/* Break Time Status - Show when break is active */}
{tripExecution.isBreakActive && (
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
        onClick={tripExecution.endBreak}
        disabled={!tripExecution.canEndBreak || tripExecution.isLoading}
      >
        End Break
      </Button>
    </CardContent>
  </Card>
)}
```

#### 5. Add Start Break Button
Add this button as the first item in the Quick Actions CardContent (after line 1581):

```typescript
{/* Break Time Tracking - Only show during In Transit */}
{permit.status === 'In Transit' && (
  <Button 
    variant="outline" 
    className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
    onClick={tripExecution.startBreak}
    disabled={!tripExecution.canStartBreak || tripExecution.isLoading}
  >
    <Timer className="mr-3 h-4 w-4 text-[#0066cc]" />
    <span className="text-gray-900">
      {tripExecution.isBreakActive ? 'Break Active' : 'Start Break'}
    </span>
  </Button>
)}
```

## Functional Behavior Added

### 1. Start Trip
**Entry Point:** Existing "Slide to Start Trip" button (line 2112)
**Rules:**
- Enabled only when trip status = "Open"
- First jurisdiction must have approved permit
**Behavior:**
- Trip status changes to "In Transit"
- First jurisdiction becomes active
- Records trip start timestamp
- Sends notifications to pilot cars assigned to first jurisdiction
- Shows toast: "Trip started successfully"

### 2. Automatic Pilot Car Notifications
**Triggers:**
- On trip start → notifies pilot cars for first jurisdiction
- On jurisdiction completion → notifies pilot cars for next jurisdiction
**No Manual UI** - System managed only
**Logged to Console** - Can be seen in browser dev tools

### 3. Break Time Tracking
**Entry Point:** "Start Break" button in Quick Actions (only visible during In Transit)
**Behavior:**
- Start Break:
  - Pauses jurisdiction timer
  - Shows "Break in Progress" card
  - Disables conflicting actions
  - Shows toast: "Break started"
- End Break:
  - Resumes jurisdiction timer
  - Logs break duration
  - Updates total break time
  - Shows toast with duration: "Break ended - Break duration: 15m"

**Rules:**
- Cannot start if break already active
- Cannot complete jurisdiction while break active
- Cannot end trip while break active

### 4. Multi-Jurisdiction Handling
**Future Implementation:**
- Use `tripExecution.completeJurisdiction()` to complete current jurisdiction
- Automatically activates next jurisdiction
- Triggers pilot car notifications for next jurisdiction
- Shows toast: "[STATE] completed - Now active in [NEXT_STATE]"

### 5. Guardrails

**Start Trip:**
- ❌ Cannot start if first jurisdiction permit not approved
- ❌ Cannot start if already in transit

**Break Management:**
- ❌ Cannot start break if not in transit
- ❌ Cannot start break if break already active
- ❌ Cannot complete jurisdiction during break
- ❌ Cannot end trip during break

**State Persistence:**
- ✅ Trip state saved to localStorage
- ✅ Survives app close/reopen
- ✅ Survives network drop
- ✅ Automatic resume on app reopen

## Testing the Integration

### Test Start Trip
1. Navigate to a trip with status "Open"
2. Ensure first jurisdiction has "Approved" permit
3. Slide "Start Trip" button
4. Verify:
   - Toast shows "Trip started successfully"
   - Trip moves to "In Transit" tab
   - Console shows pilot car notification logs

### Test Break Tracking
1. Start a trip (status = "In Transit")
2. Click "Start Break" in Quick Actions
3. Verify:
   - "Break in Progress" card appears
   - Toast shows "Break started"
   - "Start Break" button is disabled
4. Click "End Break"
5. Verify:
   - "Break in Progress" card disappears
   - Toast shows break duration
   - "Start Break" button re-enabled

### Test Guardrails
1. Try to start trip without approved permit
   - Should show error toast
2. Try to start break when not in transit
   - Button should be disabled
3. Start a break, then try to end trip
   - Should show error toast

## API Integration Points (Future)

When integrating with real backend:

### TripExecutionService.sendPilotCarNotifications()
Replace mock implementation with API call:
```typescript
private static async sendPilotCarNotifications(
  tripId: string, 
  jurisdiction: JurisdictionState
): Promise<PilotCarNotification[]> {
  const response = await fetch('/api/pilot-car/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tripId, jurisdiction })
  });
  return response.json();
}
```

### State Persistence
Replace localStorage with API calls:
```typescript
static async getTripState(tripId: string): Promise<TripExecutionState | null> {
  const response = await fetch(`/api/trips/${tripId}/execution-state`);
  return response.json();
}

static async saveTripState(state: TripExecutionState): Promise<void> {
  await fetch(`/api/trips/${state.tripId}/execution-state`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
}
```

## Console Logs

The system logs important events to the browser console:

- `Pilot car notifications sent for [STATE]:` - Shows notification details
- Trip execution state changes
- Break start/end events
- Jurisdiction completions

## Next Steps

1. ✅ Trip execution service created
2. ✅ React hook created  
3. ⏳ Integrate into ViewPermitRequest.tsx (manual integration needed)
4. ⏳ Test all workflows
5. ⏳ Add jurisdiction completion UI (optional)
6. ⏳ Replace mock notifications with real API calls

## Summary

The trip execution functionality has been implemented as a **state management layer** that operates behind the existing UI. No visual changes are required - the system adds business logic to existing buttons and actions while maintaining WCAG AA compliance and the current design system.

All functionality is:
- ✅ State-based (conditional rendering)
- ✅ Validates business rules
- ✅ Persists to localStorage
- ✅ Provides user feedback via toasts
- ✅ Maintains existing UI structure
