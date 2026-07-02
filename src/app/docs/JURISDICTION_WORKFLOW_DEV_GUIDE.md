# Clean Jurisdiction Workflow - Developer Quick Reference

## Key Concepts

**Trip Start ≠ Jurisdiction Activation ≠ Pilot Job Start**

These are THREE SEPARATE actions controlled by different parties:
1. **Trip Start** - Truck driver starts the trip
2. **Jurisdiction Activation** - Truck driver activates a jurisdiction
3. **Pilot Job Start** - Pilot car starts their job and billing

## Jurisdiction State Machine

```
upcoming → ready-to-activate → active → completed
```

- **upcoming**: Future jurisdiction, not yet accessible
- **ready-to-activate**: Driver can activate this jurisdiction
- **active**: Currently active, pilot cars notified
- **completed**: Finished and locked

## Critical Rules (DO NOT VIOLATE)

### ❌ What NOT to Do

```typescript
// ❌ WRONG: Auto-activating jurisdiction on trip start
static startTrip(tripId, jurisdictions) {
  // DON'T DO THIS:
  jurisdictions[0].status = 'active';
  this.sendPilotCarNotifications(jurisdictions[0]); // ❌
}

// ❌ WRONG: Notifying all pilots at once
static startTrip(tripId, jurisdictions) {
  // DON'T DO THIS:
  jurisdictions.forEach(j => {
    this.sendPilotCarNotifications(j); // ❌
  });
}

// ❌ WRONG: Auto-starting pilot billing
static activateJurisdiction(tripId) {
  // DON'T DO THIS:
  this.startPilotBilling(); // ❌
}
```

### ✅ What TO Do

```typescript
// ✅ CORRECT: Trip start sets first to ready-to-activate
static startTrip(tripId: string, jurisdictions: JurisdictionState[]) {
  const updatedJurisdictions = jurisdictions.map((j, index) => ({
    ...j,
    status: index === 0 ? 'ready-to-activate' : 'upcoming', // ✅
  }));
  // No pilot notifications here ✅
}

// ✅ CORRECT: Activate sends notifications for ONE jurisdiction
static activateJurisdiction(tripId: string) {
  const currentJurisdiction = state.jurisdictions[state.currentJurisdictionIndex];
  currentJurisdiction.status = 'active';
  // Send notifications ONLY for this jurisdiction ✅
  const notifications = this.sendPilotCarNotifications(tripId, currentJurisdiction);
}

// ✅ CORRECT: Complete prepares next jurisdiction
static completeJurisdiction(tripId: string) {
  currentJurisdiction.status = 'completed';
  if (nextJurisdiction) {
    nextJurisdiction.status = 'ready-to-activate'; // ✅
    // No auto-activation, no notifications ✅
  }
}
```

## Service Methods

### TripExecutionService

```typescript
// Start trip - prepares first jurisdiction
startTrip(tripId, jurisdictions): TripExecutionState
  - Sets trip status to 'In Transit'
  - Sets first jurisdiction to 'ready-to-activate'
  - Sets others to 'upcoming'
  - Does NOT send notifications

// Activate jurisdiction - notifies pilots
activateJurisdiction(tripId): TripExecutionState
  - Sets jurisdiction to 'active'
  - Records activation timestamp
  - Sends notifications for THIS jurisdiction ONLY
  - Does NOT start pilot billing

// Complete jurisdiction - locks and prepares next
completeJurisdiction(tripId): TripExecutionState
  - Sets jurisdiction to 'completed'
  - Locks time logs
  - Sets next to 'ready-to-activate'
  - Does NOT auto-activate next

// Break management
startBreak(tripId): TripExecutionState
  - Can only start during active trip
  - Pauses jurisdiction timer
  - Does NOT affect pilot billing

endBreak(tripId): TripExecutionState
  - Calculates break duration
  - Resumes jurisdiction timer
  - Must end before completing jurisdiction
```

### Validation Methods

```typescript
// Check if trip can start
canStartTrip(tripId, jurisdictions): { canStart: boolean, reason?: string }
  - Validates first jurisdiction has approved permit
  - Checks trip not already in transit

// Check if jurisdiction can activate
canActivateJurisdiction(tripId): { canActivate: boolean, reason?: string }
  - Validates trip is in transit
  - Checks no active break
  - Validates current jurisdiction is 'ready-to-activate'

// Check if jurisdiction can complete
canCompleteJurisdiction(tripId): { canComplete: boolean, reason?: string }
  - Validates no active break
  - Checks jurisdiction is 'active'
```

## Hook Usage

```typescript
const tripExecution = useTripExecution(
  permit.requestId,
  jurisdictions,
  onTripStarted,
  onJurisdictionActivated,
  onJurisdictionCompleted,
  onTripCompleted
);

// Access state
tripExecution.tripState.jurisdictions[0].status; // 'ready-to-activate'
tripExecution.currentJurisdiction.code; // 'WA'
tripExecution.canActivateJurisdiction; // true/false

// Call actions
await tripExecution.startTrip();
await tripExecution.activateJurisdiction();
await tripExecution.startBreak();
await tripExecution.endBreak();
await tripExecution.completeJurisdiction();
```

## UI Implementation

### Jurisdiction Card Structure

```tsx
{permit.states.map((state, index) => {
  const jurisdictionState = tripExecution.tripState?.jurisdictions[index];
  const isCurrentJurisdiction = tripExecution.tripState?.currentJurisdictionIndex === index;
  
  return (
    <Card>
      {/* Permit info */}
      <Badge>{state.status}</Badge>
      
      {/* Jurisdiction status */}
      {jurisdictionState && (
        <Badge className={getJurisdictionBadgeColor(jurisdictionState.status)}>
          {formatJurisdictionStatus(jurisdictionState.status)}
        </Badge>
      )}
      
      {/* Action buttons (only for current jurisdiction) */}
      {isCurrentJurisdiction && (
        <>
          {jurisdictionState.status === 'ready-to-activate' && (
            <Button onClick={tripExecution.activateJurisdiction}>
              Activate Jurisdiction
            </Button>
          )}
          
          {jurisdictionState.status === 'active' && (
            <Button onClick={tripExecution.completeJurisdiction}>
              Complete Jurisdiction
            </Button>
          )}
        </>
      )}
    </Card>
  );
})}
```

### Badge Colors

```tsx
const getJurisdictionBadgeColor = (status) => {
  switch (status) {
    case 'upcoming':
      return 'bg-gray-50 text-gray-500 border-gray-200';
    case 'ready-to-activate':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'completed':
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Auto-activating on trip start
```typescript
// WRONG
const startTrip = () => {
  TripExecutionService.startTrip(tripId, jurisdictions);
  TripExecutionService.activateJurisdiction(tripId); // ❌
};
```

**✅ Fix:** Let driver manually activate
```typescript
// CORRECT
const startTrip = () => {
  TripExecutionService.startTrip(tripId, jurisdictions);
  // Driver will activate manually when ready
};
```

### ❌ Mistake 2: Notifying all pilots at trip start
```typescript
// WRONG
static startTrip(tripId, jurisdictions) {
  jurisdictions.forEach(j => {
    this.sendPilotCarNotifications(tripId, j); // ❌
  });
}
```

**✅ Fix:** Only notify on activation
```typescript
// CORRECT
static activateJurisdiction(tripId) {
  const current = state.jurisdictions[state.currentJurisdictionIndex];
  this.sendPilotCarNotifications(tripId, current); // ✅
}
```

### ❌ Mistake 3: Auto-completing jurisdiction
```typescript
// WRONG
const onBreakEnd = () => {
  endBreak();
  completeJurisdiction(); // ❌
};
```

**✅ Fix:** Let driver complete manually
```typescript
// CORRECT
const onBreakEnd = () => {
  endBreak();
  // Driver will complete when ready
};
```

### ❌ Mistake 4: Allowing completion while on break
```typescript
// WRONG
const completeJurisdiction = () => {
  // No validation ❌
  currentJurisdiction.status = 'completed';
};
```

**✅ Fix:** Validate no active break
```typescript
// CORRECT
static completeJurisdiction(tripId) {
  if (state.activeBreak) {
    throw new Error('Cannot complete while on break'); // ✅
  }
  currentJurisdiction.status = 'completed';
}
```

## Testing Checklist

### Unit Tests

- [ ] `startTrip()` sets first jurisdiction to 'ready-to-activate'
- [ ] `startTrip()` sets others to 'upcoming'
- [ ] `startTrip()` does NOT send notifications
- [ ] `activateJurisdiction()` sets status to 'active'
- [ ] `activateJurisdiction()` sends notifications for ONE jurisdiction
- [ ] `activateJurisdiction()` fails if status is not 'ready-to-activate'
- [ ] `completeJurisdiction()` fails if break is active
- [ ] `completeJurisdiction()` sets next to 'ready-to-activate'
- [ ] `completeJurisdiction()` does NOT auto-activate next

### Integration Tests

- [ ] Full trip flow: Start → Activate → Complete → Activate → Complete
- [ ] Break handling: Start break → Cannot complete → End break → Can complete
- [ ] Error handling: Try to skip jurisdiction → Error
- [ ] Error handling: Try to complete without activation → Error

### Manual Testing

- [ ] Start trip shows first jurisdiction as "Ready"
- [ ] Other jurisdictions show as "Upcoming"
- [ ] Activate button appears for ready jurisdiction
- [ ] Activation shows "Active" badge with green indicator
- [ ] Complete button appears for active jurisdiction
- [ ] Completion shows next jurisdiction as "Ready"
- [ ] Cannot complete while on break

## Data Flow

```
User Action → Hook Method → Service Method → State Update → localStorage → UI Update
    ↓             ↓              ↓               ↓              ↓            ↓
Start Trip → startTrip() → startTrip() → Update state → Save → Re-render
```

## State Persistence

```typescript
// Saved to localStorage
const storageKey = `trip_execution_${tripId}`;

// State structure
{
  tripId: string,
  status: 'In Transit',
  startTime: Date,
  currentJurisdictionIndex: 0,
  jurisdictions: [
    {
      code: 'WA',
      status: 'active',
      startTime: Date,
      activatedAt: Date,
      // ...
    }
  ],
  breaks: [...],
  pilotCarNotifications: [...]
}
```

## Debugging Tips

### Check Current State
```typescript
const state = TripExecutionService.getTripState(tripId);
console.log('Current jurisdiction:', state.jurisdictions[state.currentJurisdictionIndex]);
console.log('All jurisdictions:', state.jurisdictions.map(j => `${j.code}: ${j.status}`));
```

### Verify Validation
```typescript
const canActivate = TripExecutionService.canActivateJurisdiction(tripId);
console.log('Can activate?', canActivate);
// If false, check canActivate.reason
```

### Clear State (Testing)
```typescript
TripExecutionService.clearTripState(tripId);
// Removes all state for this trip
```

## Performance Considerations

- State updates are synchronous (localStorage)
- No network calls in current implementation
- Future: API calls for pilot notifications
- Use React.memo for jurisdiction cards if performance issues

## Security Considerations

- localStorage is client-side only
- No sensitive data stored (permit numbers are already visible)
- Future: Sync to backend API
- Future: Authenticate pilot notifications

## Summary

**Remember the Three Rules:**

1. **Start Trip ≠ Activate Jurisdiction**
   - Starting trip prepares first jurisdiction
   - Driver must manually activate

2. **Activate ONE Jurisdiction at a Time**
   - Only send notifications for current jurisdiction
   - Other jurisdictions remain upcoming

3. **Pilot Controls Their Own Billing**
   - Jurisdiction activation ≠ billing start
   - Pilot must accept and start job
   - Truck driver does NOT control pilot billing
