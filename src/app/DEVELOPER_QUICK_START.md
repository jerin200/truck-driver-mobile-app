# Developer Quick Start - Trip Execution

## Quick Reference

### How to Use the Trip Execution System

The trip execution functionality is already integrated into the `ViewPermitRequest.tsx` component. No additional setup needed!

---

## Component Integration

### In Your Component (Already Done in ViewPermitRequest.tsx)

```typescript
import { useTripExecution } from '../hooks/useTripExecution';
import { JurisdictionState } from '../services/tripExecutionService';

// Convert your permit/trip data to jurisdictions
const jurisdictions: JurisdictionState[] = permit.states.map(state => ({
  code: state.code,
  status: 'pending',
  permitStatus: state.status,
  permitNumber: state.permitNumber
}));

// Initialize the hook
const tripExecution = useTripExecution(
  permit.requestId,  // Trip ID
  jurisdictions,     // Jurisdictions array
  onTripStarted,     // Callback when trip starts
  onJurisdictionCompleted,  // Callback when jurisdiction completes
  onTripCompleted    // Callback when trip completes
);
```

---

## Available Actions

### Start Trip
```typescript
// Check if can start
if (tripExecution.canStartTrip) {
  await tripExecution.startTrip();
}
```

**Validation Rules:**
- Trip status must be 'Open'
- First jurisdiction must have approved permit

**What Happens:**
- Trip status → 'In Transit'
- First jurisdiction → 'active'
- Pilot car notifications sent automatically
- Success toast displayed

---

### Start Break
```typescript
// Check if can start break
if (tripExecution.canStartBreak) {
  await tripExecution.startBreak();
}
```

**Validation Rules:**
- Trip must be 'In Transit'
- No active break already

**What Happens:**
- Active break created
- Jurisdiction timer paused
- Break card appears in UI

---

### End Break
```typescript
// Check if can end break
if (tripExecution.canEndBreak) {
  await tripExecution.endBreak();
}
```

**What Happens:**
- Break duration calculated
- Break logged to state
- Jurisdiction timer resumed
- Success toast with duration

---

### Complete Jurisdiction
```typescript
// Check if can complete
if (tripExecution.canCompleteJurisdiction) {
  await tripExecution.completeJurisdiction();
}
```

**Validation Rules:**
- No active break

**What Happens:**
- Current jurisdiction → 'completed'
- Next jurisdiction → 'active'
- Pilot car notifications sent for next jurisdiction
- If last jurisdiction → Trip completed

---

### End Trip (Manual/Emergency)
```typescript
// Check if can end
if (tripExecution.canEndTrip) {
  await tripExecution.endTrip();
}
```

**Validation Rules:**
- No active break

**What Happens:**
- Trip status → 'Completed'
- Total duration calculated
- Success toast displayed

---

## Available State

### Trip State
```typescript
tripExecution.tripState
// Returns: TripExecutionState | null
// Contains: status, jurisdictions, breaks, notifications, timestamps
```

### Boolean Flags
```typescript
tripExecution.canStartTrip          // Can the trip be started?
tripExecution.canStartBreak         // Can a break be started?
tripExecution.canEndBreak           // Can the current break be ended?
tripExecution.canCompleteJurisdiction  // Can current jurisdiction be completed?
tripExecution.canEndTrip            // Can the trip be ended?
tripExecution.isBreakActive         // Is there an active break?
tripExecution.isLoading             // Is an action in progress?
```

### Current Jurisdiction
```typescript
tripExecution.currentJurisdiction
// Returns: JurisdictionState | null
// Contains: code, status, permitStatus, startTime, duration, etc.
```

---

## UI Patterns

### Break Status Card (When Break Active)
```tsx
{tripExecution.isBreakActive && (
  <Card className="shadow-sm border-blue-200 bg-blue-50">
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <Timer className="h-5 w-5 text-blue-600 animate-pulse" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">Break in Progress</h3>
          <p className="text-sm text-blue-700">Jurisdiction timer paused</p>
        </div>
      </div>
      <Button 
        onClick={tripExecution.endBreak}
        disabled={!tripExecution.canEndBreak || tripExecution.isLoading}
      >
        End Break
      </Button>
    </CardContent>
  </Card>
)}
```

### Start Break Button
```tsx
<Button 
  onClick={tripExecution.startBreak}
  disabled={!tripExecution.canStartBreak || tripExecution.isLoading}
>
  <Timer className="mr-3 h-4 w-4" />
  {tripExecution.isBreakActive ? 'Break Active' : 'Start Break'}
</Button>
```

### Complete Jurisdiction Button
```tsx
{tripExecution.currentJurisdiction && (
  <Button 
    onClick={tripExecution.completeJurisdiction}
    disabled={!tripExecution.canCompleteJurisdiction || tripExecution.isLoading}
  >
    <CheckCircle className="mr-3 h-4 w-4" />
    Complete {tripExecution.currentJurisdiction.code} Jurisdiction
  </Button>
)}
```

### Start Trip Validation
```tsx
{tripExecution.canStartTrip ? (
  <SlideToConfirm
    text="Slide to Start Trip"
    onConfirm={() => setIsStartingTrip(true)}
  />
) : (
  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <p className="text-sm font-semibold text-amber-900">Cannot Start Trip</p>
    </div>
    <p className="text-xs text-amber-700">
      The first jurisdiction must have an approved permit before you can start the trip.
    </p>
  </div>
)}
```

---

## Callbacks

### On Trip Started
```typescript
const onTripStarted = () => {
  // Update your UI state
  setPermit(prev => ({
    ...prev,
    status: 'In Transit'
  }));
  
  // Add to history
  setTripHistory(prev => [{
    event: 'Trip Started',
    location: permit.origin,
    time: new Date().toLocaleTimeString()
  }, ...prev]);
  
  // Close any modals
  setIsStartingTrip(false);
};
```

### On Jurisdiction Completed
```typescript
const onJurisdictionCompleted = () => {
  const currentJurisdiction = tripExecution.currentJurisdiction;
  if (currentJurisdiction) {
    setTripHistory(prev => [{
      event: `Jurisdiction ${currentJurisdiction.code} Completed`,
      location: `${currentJurisdiction.code} Border`,
      time: new Date().toLocaleTimeString()
    }, ...prev]);
  }
};
```

### On Trip Completed
```typescript
const onTripCompleted = () => {
  setPermit(prev => ({
    ...prev,
    status: 'Completed'
  }));
  
  setTripHistory(prev => [{
    event: 'Trip Completed',
    location: permit.destination,
    time: new Date().toLocaleTimeString()
  }, ...prev]);
};
```

---

## Local Storage

### Access Trip State Directly
```typescript
import { TripExecutionService } from '../services/tripExecutionService';

// Get state
const state = TripExecutionService.getTripState(tripId);

// Clear state (for testing)
TripExecutionService.clearTripState(tripId);

// Format duration
const formatted = TripExecutionService.formatDuration(3665); // "1h 1m"
```

### Storage Key Format
```
trip_execution_{tripId}
```

Example: `trip_execution_REQ-1001`

---

## Testing in Browser

### 1. Start a Trip
1. Go to Trips tab
2. Click on an "Open" trip with approved permits
3. Swipe "Slide to Start Trip"
4. Check console for pilot car notifications

### 2. Take a Break
1. While trip is "In Transit"
2. Go to Actions tab
3. Click "Start Break"
4. Wait a few seconds
5. Click "End Break" in the blue card
6. Check toast for duration

### 3. Complete Jurisdictions
1. While trip is "In Transit"
2. Go to Actions tab
3. Click "Complete [STATE] Jurisdiction"
4. Check console for pilot car notifications
5. Repeat until all jurisdictions complete

### 4. Check State Persistence
1. Start a trip and take a break
2. Refresh the page
3. Break should still be active
4. State fully preserved

### 5. Check Validation
1. Try to complete jurisdiction during break → Should be disabled
2. Try to end trip during break → Should show error
3. Try to start trip without approved permit → Should show warning

---

## Console Commands (for Testing)

```javascript
// View current trip state
const state = JSON.parse(localStorage.getItem('trip_execution_REQ-1001'));
console.log(state);

// Clear trip state
localStorage.removeItem('trip_execution_REQ-1001');

// View all trips
Object.keys(localStorage).filter(k => k.startsWith('trip_execution_'));
```

---

## Error Handling

All errors are caught and displayed as toast notifications:

```typescript
try {
  await tripExecution.startTrip();
} catch (error) {
  // Error automatically shown as toast
  // "Cannot start trip - First jurisdiction requires approved permit"
}
```

---

## TypeScript Types

### JurisdictionState
```typescript
interface JurisdictionState {
  code: string;  // State code (e.g., "NY")
  status: 'pending' | 'active' | 'completed' | 'skipped';
  permitStatus: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;  // in seconds
  waitingTime?: number;
  breakTime?: number;
}
```

### TripExecutionState
```typescript
interface TripExecutionState {
  tripId: string;
  status: 'Open' | 'In Transit' | 'Completed' | 'Cancelled';
  startTime?: Date;
  endTime?: Date;
  currentJurisdictionIndex: number;
  jurisdictions: JurisdictionState[];
  breaks: BreakRecord[];
  activeBreak?: BreakRecord;
  pilotCarNotifications: PilotCarNotification[];
  totalDuration?: number;
  totalBreakTime?: number;
  totalWaitingTime?: number;
}
```

### BreakRecord
```typescript
interface BreakRecord {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;  // in seconds
  jurisdictionCode?: string;
}
```

### PilotCarNotification
```typescript
interface PilotCarNotification {
  id: string;
  tripId: string;
  jurisdictionCode: string;
  role: 'Lead' | 'Chase' | 'High Pole';
  pilotCarDriverId?: string;
  sentAt: Date;
  status: 'sent' | 'acknowledged' | 'failed';
  message: string;
}
```

---

## Common Patterns

### Conditional Rendering Based on Trip Status
```tsx
{permit.status === 'Open' && (
  // Show start trip button
)}

{permit.status === 'In Transit' && (
  // Show break, complete jurisdiction, end trip buttons
)}

{permit.status === 'Completed' && (
  // Show completion summary
)}
```

### Conditional Rendering Based on Break Status
```tsx
{tripExecution.isBreakActive && (
  // Show break status card
)}

{!tripExecution.isBreakActive && permit.status === 'In Transit' && (
  // Show start break button
)}
```

### Disable Actions During Loading
```tsx
<Button
  onClick={tripExecution.startBreak}
  disabled={!tripExecution.canStartBreak || tripExecution.isLoading}
>
  Start Break
</Button>
```

---

## Best Practices

✅ **Always check `can*` flags before showing actions**
✅ **Always disable buttons with `isLoading` check**
✅ **Use callbacks for UI updates after state changes**
✅ **Trust the validation logic - don't duplicate it in UI**
✅ **Let the service handle pilot car notifications - don't add manual controls**
✅ **Use toast notifications for user feedback - they're automatic**

---

## Need Help?

See full documentation:
- `/TRUCK_DRIVER_TRIP_EXECUTION_GUIDE.md` - Complete feature guide
- `/IMPLEMENTATION_SUMMARY_TRIP_EXECUTION.md` - Implementation details
- `/hooks/useTripExecution.ts` - Hook source code
- `/services/tripExecutionService.ts` - Business logic source code
