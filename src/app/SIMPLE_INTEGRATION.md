# Simple Integration Guide

This is a simplified guide to integrate trip execution functionality into your Truck Driver app.

## Quick Start (3 Steps)

### Step 1: Add Imports to ViewPermitRequest.tsx

Add these two lines after your existing imports (around line 48):

```typescript
import { useTripExecution } from '../hooks/useTripExecution';
import { BreakStatusCard, StartBreakButton } from './TripExecutionActions';
```

### Step 2: Add the Hook

Add this code right after `const [permit, setPermit] = useState(initialPermit);` (around line 1150):

```typescript
// Trip execution - convert permit states to jurisdictions
const jurisdictions = permit.states.map(state => ({
  code: state.code,
  status: 'pending' as const,
  permitStatus: state.status,
  permitNumber: state.permitNumber,
}));

// Initialize trip execution hook
const tripExecution = useTripExecution(
  permit.requestId,
  jurisdictions,
  () => setPermit(prev => ({ ...prev, status: 'In Transit' })),
  () => {},
  () => setPermit(prev => ({ ...prev, status: 'Completed' }))
);
```

### Step 3: Add UI Components

#### 3a. Add Break Status Card (before Quick Actions, around line 1575):

```tsx
{/* Break Status - shows when break is active */}
{tripExecution.isBreakActive && (
  <BreakStatusCard
    canEndBreak={tripExecution.canEndBreak}
    isLoading={tripExecution.isLoading}
    onEndBreak={tripExecution.endBreak}
  />
)}
```

#### 3b. Add Start Break Button (first button in Quick Actions, around line 1582):

```tsx
{/* Start Break - only during In Transit */}
{permit.status === 'In Transit' && (
  <StartBreakButton
    isBreakActive={tripExecution.isBreakActive}
    canStartBreak={tripExecution.canStartBreak}
    isLoading={tripExecution.isLoading}
    onStartBreak={tripExecution.startBreak}
  />
)}
```

#### 3c. Update handleStartTrip (replace existing function, around line 1314):

```typescript
const handleStartTrip = async () => {
  try {
    await tripExecution.startTrip(); // ← Add this line
    
    // ... keep all existing code below this ...
    const startTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    // ... rest of existing code ...
    
    setIsStartingTrip(false);
  } catch (error) {
    setIsStartingTrip(false);
  }
};
```

## That's It!

You now have:
- ✅ Trip start validation
- ✅ Automatic pilot car notifications
- ✅ Break time tracking
- ✅ State persistence
- ✅ All guardrails and validations

## Test It

1. **Start Trip**: Go to a trip with status "Open" and approved permits → Slide to start
2. **Start Break**: Click "Start Break" button → See "Break in Progress" card appear
3. **End Break**: Click "End Break" → See toast with break duration

## What Happens Behind the Scenes

### When you start a trip:
- Validates first jurisdiction has approved permit
- Changes status from "Open" to "In Transit"  
- Activates first jurisdiction
- Sends notifications to pilot cars (logged to console)
- Saves state to localStorage
- Shows success toast

### When you start a break:
- Pauses jurisdiction timer
- Shows "Break in Progress" card
- Disables conflicting actions
- Logs break start time
- Shows success toast

### When you end a break:
- Calculates and logs break duration
- Hides "Break in Progress" card
- Re-enables other actions
- Updates total break time
- Shows toast with duration

## Advanced Usage (Optional)

### Complete a Jurisdiction

```typescript
// Call this when truck driver exits a jurisdiction
await tripExecution.completeJurisdiction();
```

This will:
- Mark current jurisdiction as complete
- Activate next jurisdiction
- Send notifications to pilot cars for next jurisdiction
- If last jurisdiction → mark trip as complete

### Access Trip State

```typescript
// Current active jurisdiction
const currentJurisdiction = tripExecution.currentJurisdiction;

// Full trip state
const tripState = tripExecution.tripState;

// Check if actions are allowed
const canStart = tripExecution.canStartTrip;
const canBreak = tripExecution.canStartBreak;
```

## Troubleshooting

**Q: Start Trip button doesn't work**
- A: Check console for error. Likely first jurisdiction doesn't have approved permit.

**Q: Break button is disabled**
- A: Break can only be started when trip is "In Transit" and no other break is active.

**Q: Where are the pilot car notifications?**
- A: Currently logged to browser console. Search for "Pilot car notifications sent"

**Q: Trip state doesn't persist after refresh**
- A: Check browser console for localStorage errors. State is saved to `trip_execution_[tripId]`

## Files Reference

- `/services/tripExecutionService.ts` - Business logic
- `/hooks/useTripExecution.ts` - React integration
- `/components/TripExecutionActions.tsx` - UI components
- `/components/ViewPermitRequest.tsx` - Main component (needs integration)
