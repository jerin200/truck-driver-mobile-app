# Clean Trip & Jurisdiction Activation Workflow

## Overview

This implementation provides a clean separation between **trip start**, **jurisdiction activation**, and **pilot job management** in the Truck Driver mobile application, preventing premature pilot billing, incorrect notifications, and operational confusion.

## Key Principles

### Three Separate Actions

1. **Start Trip** (Truck Driver) - Begins the trip, does NOT activate jurisdictions
2. **Activate Jurisdiction** (Truck Driver) - Activates a specific jurisdiction, notifies pilots
3. **Start Pilot Job** (Pilot Car) - Pilot controls their own billing

**Critical:** These are independent actions controlled by different parties.

### Jurisdiction States

Each jurisdiction progresses through these states:

```
Upcoming → Ready to Activate → Active → Completed
```

- **Upcoming**: Future jurisdiction, not yet accessible
- **Ready to Activate**: Driver can activate this jurisdiction
- **Active**: Currently active, pilot cars notified
- **Completed**: Finished and locked

## Quick Start

### For Users (Truck Drivers)

1. **Start Your Trip**
   - Tap "Slide to Start Trip"
   - First jurisdiction becomes "Ready to Activate"
   - Other jurisdictions show as "Upcoming"

2. **Activate First Jurisdiction**
   - Go to "Permits" tab
   - Find the jurisdiction with "Ready" badge
   - Tap "Activate Jurisdiction"
   - Pilot cars are notified
   - Status changes to "Active"

3. **Complete Jurisdiction**
   - When done with jurisdiction, tap "Complete Jurisdiction"
   - Duration is calculated and locked
   - Next jurisdiction becomes "Ready to Activate"

4. **Repeat for All Jurisdictions**
   - Activate next jurisdiction
   - Complete it
   - Continue until trip is complete

### For Developers

See the comprehensive documentation below.

## Documentation

### Core Documentation

1. **[CLEAN_JURISDICTION_WORKFLOW.md](/docs/CLEAN_JURISDICTION_WORKFLOW.md)**
   - Complete workflow guide
   - System behavior for each action
   - State transition diagrams
   - Guardrails and validation rules
   - Pilot car perspective
   - **Read this first for complete understanding**

2. **[JURISDICTION_WORKFLOW_DEV_GUIDE.md](/docs/JURISDICTION_WORKFLOW_DEV_GUIDE.md)**
   - Developer quick reference
   - Code examples (correct vs incorrect)
   - Common mistakes to avoid
   - Service and hook API reference
   - UI implementation guide
   - Debugging tips
   - **Use this for daily development**

3. **[IMPLEMENTATION_SUMMARY.md](/docs/IMPLEMENTATION_SUMMARY.md)**
   - What was implemented
   - File changes
   - Testing results
   - Known limitations
   - Deployment notes
   - **Read this for project overview**

### Supplementary Documentation

4. **[TEST_SCENARIOS.md](/docs/TEST_SCENARIOS.md)**
   - 10 complete test scenarios
   - Manual testing checklist
   - Automated test templates
   - Edge case testing
   - **Use this for QA and testing**

5. **[VISUAL_WORKFLOW_DIAGRAMS.md](/docs/VISUAL_WORKFLOW_DIAGRAMS.md)**
   - System architecture diagram
   - Trip lifecycle flow
   - State machine diagram
   - Notification flow
   - Multi-jurisdiction example
   - **Use this for visual understanding**

## Architecture

### Service Layer

**`/services/tripExecutionService.ts`**

Core business logic for trip execution:

```typescript
export class TripExecutionService {
  // Start trip - prepares first jurisdiction
  static startTrip(tripId: string, jurisdictions: JurisdictionState[]): TripExecutionState
  
  // Activate jurisdiction - sends pilot notifications
  static activateJurisdiction(tripId: string): TripExecutionState
  
  // Complete jurisdiction - locks times, prepares next
  static completeJurisdiction(tripId: string): TripExecutionState
  
  // Break management
  static startBreak(tripId: string): TripExecutionState
  static endBreak(tripId: string): TripExecutionState
  
  // Validation methods
  static canStartTrip(tripId: string, jurisdictions: JurisdictionState[]): ValidationResult
  static canActivateJurisdiction(tripId: string): ValidationResult
  static canCompleteJurisdiction(tripId: string): ValidationResult
}
```

### Hook Layer

**`/hooks/useTripExecution.ts`**

React hook for managing trip execution state:

```typescript
export function useTripExecution(
  tripId: string,
  jurisdictions: JurisdictionState[],
  onTripStarted?: () => void,
  onJurisdictionActivated?: () => void,
  onJurisdictionCompleted?: () => void,
  onTripCompleted?: () => void
): UseTripExecutionResult
```

Returns:
- State: `tripState`, `currentJurisdiction`, `isBreakActive`
- Flags: `canStartTrip`, `canActivateJurisdiction`, `canCompleteJurisdiction`
- Actions: `startTrip()`, `activateJurisdiction()`, `completeJurisdiction()`

### UI Layer

**`/components/ViewPermitRequest.tsx`**

Truck driver UI with:
- Start trip slider (bottom of screen)
- Jurisdiction cards in Permits tab
- Activate/Complete buttons in jurisdiction cards
- Status badges and indicators
- Break controls in Actions tab

## Key Features

### ✅ What This Implements

- **Clean State Separation**: Trip start ≠ jurisdiction activation ≠ pilot billing
- **Manual Jurisdiction Activation**: Driver explicitly activates each jurisdiction
- **Targeted Notifications**: Only pilots for active jurisdiction are notified
- **Proper Sequencing**: Jurisdictions must be completed in order
- **Break Integration**: Breaks pause jurisdiction timers but don't affect pilots
- **Time Locking**: All time logs locked when jurisdiction completes
- **Validation**: Comprehensive checks at every step

### ❌ What This Prevents

- **No Premature Billing**: Pilots not auto-billed when trip starts
- **No Mass Notifications**: Pilots not all notified at once
- **No Auto-Activation**: First jurisdiction not auto-activated
- **No Jurisdiction Skipping**: Must complete in order
- **No Break Conflicts**: Cannot complete jurisdiction while on break

## Common Use Cases

### Use Case 1: Multi-State Trip

**Scenario:** NY → NJ → PA → MD

**Workflow:**
1. Start trip → NY ready
2. Activate NY → NY pilots notified
3. Drive through NY
4. Complete NY → NJ ready
5. Activate NJ → NJ pilots notified
6. Continue through all states
7. Complete MD → Trip complete

**Key Point:** Each jurisdiction activated separately, pilots notified one at a time.

### Use Case 2: Break During Trip

**Scenario:** Active jurisdiction, need a break

**Workflow:**
1. Jurisdiction active
2. Start break → Timer pauses
3. Take break
4. End break → Timer resumes
5. Complete jurisdiction → Duration excludes break time

**Key Point:** Break does not complete jurisdiction or affect pilot billing.

### Use Case 3: First Permit Not Approved

**Scenario:** Try to start trip with pending permit

**Workflow:**
1. Try to start trip → Error shown
2. Error: "First jurisdiction requires approved permit"
3. Approve permit
4. Start trip → Success

**Key Point:** Cannot start without approved first permit.

## Validation Rules

### Start Trip
- ✓ First jurisdiction must have approved permit
- ✓ Trip must be in "Open" status
- ✓ Not already in transit

### Activate Jurisdiction
- ✓ Trip must be "In Transit"
- ✓ No active break
- ✓ Jurisdiction must be "Ready to Activate"
- ✓ Is current jurisdiction (no skipping)

### Complete Jurisdiction
- ✓ No active break
- ✓ Jurisdiction must be "Active"
- ✓ Is current jurisdiction

### Start Break
- ✓ Trip must be "In Transit"
- ✓ No existing active break

## Data Persistence

All state stored in `localStorage`:

```
Key: trip_execution_{tripId}

Data:
- Trip status and timestamps
- Jurisdiction states and timestamps
- Break records with durations
- Pilot notification records
```

**Note:** State persists across page reloads but is device-local only.

## Browser Support

Tested and working in:
- ✅ Chrome (latest)
- ✅ Safari (iOS)
- ✅ Firefox (latest)
- ✅ Edge (latest)

## Known Limitations

1. **Local Storage Only** - State not synced to backend
2. **Mock Notifications** - Pilot notifications simulated (console.log)
3. **No Geo-Fencing** - Activation is manual only
4. **Simple ETA** - Mock calculation, not real-time

See [IMPLEMENTATION_SUMMARY.md](/docs/IMPLEMENTATION_SUMMARY.md) for details.

## Future Enhancements

### Planned Features

1. **Geo-Fence Auto-Activation**
   - Detect border crossing via GPS
   - Auto-trigger activation
   - Fallback to manual if GPS unavailable

2. **Real API Integration**
   - Backend state synchronization
   - Real push notifications to pilots
   - Database persistence

3. **Enhanced Time Tracking**
   - Waiting time (separate from breaks)
   - Layover tracking
   - Fuel stop tracking

See documentation for details.

## Troubleshooting

### Issue: Activate button not showing

**Check:**
- Is trip status "In Transit"?
- Is jurisdiction status "Ready to Activate"?
- Is this the current jurisdiction?
- Is there an active break?

### Issue: Cannot complete jurisdiction

**Check:**
- Is there an active break? (End it first)
- Is jurisdiction status "Active"?
- Is this the current jurisdiction?

### Issue: State lost after reload

**Check:**
- Is localStorage enabled in browser?
- Check for localStorage quota exceeded
- Look for `trip_execution_` keys in localStorage

### Issue: No pilot notifications

**Check:**
- Notifications are currently simulated (console.log)
- Check browser console for notification logs
- Real API integration not yet implemented

## Testing

### Manual Testing

See [TEST_SCENARIOS.md](/docs/TEST_SCENARIOS.md) for:
- 10 complete test scenarios
- Manual testing checklist
- Edge case testing
- Performance testing

### Automated Testing

Unit test templates provided in [JURISDICTION_WORKFLOW_DEV_GUIDE.md](/docs/JURISDICTION_WORKFLOW_DEV_GUIDE.md)

## Contributing

When modifying this system:

1. **Read** [JURISDICTION_WORKFLOW_DEV_GUIDE.md](/docs/JURISDICTION_WORKFLOW_DEV_GUIDE.md)
2. **Understand** the three-action separation
3. **Maintain** validation rules
4. **Test** with provided scenarios
5. **Document** any changes

### Critical Rules

Never:
- ❌ Auto-activate jurisdictions on trip start
- ❌ Send notifications for all jurisdictions at once
- ❌ Auto-start pilot billing
- ❌ Allow jurisdiction skipping
- ❌ Complete jurisdiction while on break

Always:
- ✅ Validate at every step
- ✅ Send notifications one jurisdiction at a time
- ✅ Let pilot control their own billing
- ✅ Enforce sequential completion
- ✅ Lock times when complete

## Support

For questions or issues:

1. Check [JURISDICTION_WORKFLOW_DEV_GUIDE.md](/docs/JURISDICTION_WORKFLOW_DEV_GUIDE.md)
2. Review [TEST_SCENARIOS.md](/docs/TEST_SCENARIOS.md)
3. Consult [CLEAN_JURISDICTION_WORKFLOW.md](/docs/CLEAN_JURISDICTION_WORKFLOW.md)

## License

[Your License Here]

## Changelog

### Version 1.0.0 (Current)

**Implemented:**
- ✅ Clean jurisdiction state machine
- ✅ Manual jurisdiction activation
- ✅ Targeted pilot notifications
- ✅ Sequential completion enforcement
- ✅ Break integration
- ✅ Time locking
- ✅ Comprehensive validation
- ✅ UI integration in Permits tab
- ✅ Complete documentation

**Not Implemented:**
- ⏳ Geo-fence auto-activation
- ⏳ Real API integration
- ⏳ Backend synchronization
- ⏳ Enhanced time tracking

---

## Quick Reference

### For Truck Drivers

```
Start Trip → Activate J1 → Complete J1 → Activate J2 → Complete J2 → ...
```

### For Pilots

```
Receive Notification → Accept Job → Start Job → Complete Job
```

### For Developers

```
useTripExecution Hook → TripExecutionService → localStorage → UI Update
```

---

**Remember:** Trip Start ≠ Jurisdiction Activation ≠ Pilot Billing

These are three separate, independently controlled actions.
