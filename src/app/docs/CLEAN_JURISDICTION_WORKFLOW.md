# Clean Trip & Jurisdiction Activation Workflow

## Overview

This document describes the clean separation of trip execution from pilot car job management. The system prevents premature pilot billing, incorrect notifications, and operational confusion.

## Workflow States

### Jurisdiction States

Each jurisdiction progresses through these states:

1. **Upcoming** - Jurisdiction exists but is not yet ready to activate
2. **Ready to Activate** - Truck driver can activate this jurisdiction
3. **Active** - Jurisdiction is currently active, pilot cars have been notified
4. **Completed** - Jurisdiction has been completed and locked

### Trip States

- **Open** - Trip created but not started
- **In Transit** - Trip has been started
- **Completed** - All jurisdictions completed
- **Cancelled** - Trip was cancelled

## Complete Workflow

### 1️⃣ Start Trip (Truck Driver Action)

**Trigger:** Truck driver taps "Start Trip" button

**System Behavior:**
- Changes trip status from `Open` to `In Transit`
- Records trip start timestamp
- Sets first jurisdiction to `Ready to Activate`
- Sets all other jurisdictions to `Upcoming`

**Critical Rules:**
- ❌ Does NOT activate first jurisdiction
- ❌ Does NOT notify pilot cars
- ❌ Does NOT start pilot billing
- ✅ Validates first jurisdiction has approved permit

**UI Display:**
```
First Jurisdiction Card:
├─ Status Badge: "Ready"
└─ Button: [Activate Jurisdiction]

Other Jurisdiction Cards:
└─ Status Badge: "Upcoming"
```

**Code Location:**
- Service: `TripExecutionService.startTrip()`
- Hook: `useTripExecution().startTrip()`
- UI: ViewPermitRequest.tsx (Start Trip slider)

---

### 2️⃣ Activate Jurisdiction (Truck Driver Action)

**Trigger Options:**
- **Option A (Implemented):** Driver manually taps "Activate Jurisdiction" button
- **Option B (Future):** Geo-fence detection auto-activates on border crossing

**System Behavior:**
- Changes jurisdiction status from `Ready to Activate` to `Active`
- Records activation timestamp
- Sends notifications ONLY to pilot cars assigned to THIS jurisdiction
- Includes ETA in notification
- Makes pilot job status "Awaiting Pilot Start"

**Critical Rules:**
- ✅ Only activates ONE jurisdiction at a time
- ✅ Sends notifications ONLY for THIS jurisdiction
- ❌ Does NOT activate multiple jurisdictions
- ❌ Does NOT auto-start pilot billing (pilot controls that)
- ❌ Cannot activate while on break

**Notification Content:**
```
Subject: Jurisdiction {STATE} Active
Message: "Jurisdiction {STATE} is now active. Please begin escort duty."
ETA: {calculated_time}
Status: Awaiting Pilot Start
```

**UI Display:**
```
Active Jurisdiction Card:
├─ Status Badge: "Active"
├─ Status Indicator: "🟢 Jurisdiction Active"
├─ Started Time: "Started 2:30 PM"
└─ Button: [Complete Jurisdiction]
```

**Code Location:**
- Service: `TripExecutionService.activateJurisdiction()`
- Hook: `useTripExecution().activateJurisdiction()`
- UI: ViewPermitRequest.tsx > Permits Tab

---

### 3️⃣ Pilot Car Job Start (Pilot Controlled - Separate Flow)

**This is controlled by the PILOT CAR, not the truck driver.**

**Pilot Car Actions:**
1. Receives notification
2. Taps "Accept" job
3. Taps "Start Job"

**Only After Pilot Starts Job:**
- Pilot billing timer begins
- Waiting time tracking becomes available
- Break time tracking becomes available (for pilot)

**Critical Rules:**
- ❌ Truck driver does NOT control pilot billing
- ❌ Truck driver does NOT start pilot job
- ✅ Pilot job is completely separate workflow
- ✅ Pilot controls their own start/stop/billing

---

### 4️⃣ Break Handling (Truck Driver Action)

**Start Break:**
- Can only be started when trip = `In Transit`
- Pauses jurisdiction timer
- Does NOT start pilot billing
- Does NOT stop pilot billing
- Does NOT auto-complete jurisdiction
- Records break start time

**End Break:**
- Must end break before completing jurisdiction
- Calculates break duration
- Resumes jurisdiction timer
- Break time is tracked but separate from jurisdiction billing

**Critical Rules:**
- ❌ Break does NOT affect pilot billing
- ❌ Break does NOT complete jurisdiction
- ✅ Break pauses jurisdiction timer
- ✅ Break must end before completing jurisdiction

**Code Location:**
- Service: `TripExecutionService.startBreak()` / `endBreak()`
- Hook: `useTripExecution().startBreak()` / `endBreak()`
- UI: ViewPermitRequest.tsx > Actions Tab

---

### 5️⃣ Complete Jurisdiction (Truck Driver Action)

**Trigger:** Driver taps "Complete Jurisdiction" button

**System Behavior:**
- Changes jurisdiction status from `Active` to `Completed`
- Records completion timestamp
- Calculates jurisdiction duration (excludes break time)
- Stops pilot job (if active) - LOCKS TIME LOGS
- Locks waiting time entries
- Locks break time entries
- Sets next jurisdiction to `Ready to Activate`

**Critical Rules:**
- ❌ Cannot complete if break is active (must end break first)
- ❌ Cannot complete if jurisdiction is not active
- ✅ Locks all time logs (prevents pilot from modifying)
- ✅ Makes next jurisdiction ready to activate
- ❌ Does NOT auto-notify next jurisdiction's pilots

**UI Display:**
```
Completed Jurisdiction Card:
├─ Status Badge: "Completed"
├─ Duration: "Completed in 2h 45m"
└─ Locked indicator

Next Jurisdiction Card:
├─ Status Badge: "Ready"
└─ Button: [Activate Jurisdiction]
```

**Code Location:**
- Service: `TripExecutionService.completeJurisdiction()`
- Hook: `useTripExecution().completeJurisdiction()`
- UI: ViewPermitRequest.tsx > Permits Tab

---

### 6️⃣ Repeat Until All Jurisdictions Complete

Driver continues the cycle:
```
Activate Jurisdiction → Complete Jurisdiction → Activate Next → Complete → ...
```

When last jurisdiction is completed:
- Trip status changes to `Completed`
- Records trip end timestamp
- Calculates total trip duration
- Displays trip summary

---

## Guardrails (System Enforcement)

The system enforces these critical rules:

### ❌ Prevented Actions

1. **Cannot auto-start pilot billing when truck starts trip**
   - Validation: `startTrip()` does not call pilot notification
   
2. **Cannot notify all jurisdictions at once**
   - Validation: `activateJurisdiction()` only sends notifications for current jurisdiction
   
3. **Cannot allow pilot job start without jurisdiction activation**
   - Validation: Pilot job status = "Awaiting Start" until jurisdiction active
   
4. **Cannot merge Start Trip and Activate Jurisdiction**
   - Validation: Separate methods, separate UI buttons
   
5. **Cannot skip jurisdictions**
   - Validation: Must complete current jurisdiction before next becomes ready
   
6. **Cannot activate while on break**
   - Validation: `canActivateJurisdiction()` checks for active break
   
7. **Cannot complete jurisdiction while on break**
   - Validation: `canCompleteJurisdiction()` checks for active break

### ✅ Enforced Rules

1. **First jurisdiction must have approved permit before trip start**
   - Validation: `canStartTrip()` checks first jurisdiction permit status
   
2. **Only one jurisdiction can be active at a time**
   - Validation: `currentJurisdictionIndex` tracks single active jurisdiction
   
3. **Jurisdictions must be completed in order**
   - Validation: Next jurisdiction only becomes ready after current completes
   
4. **All time logs are locked when jurisdiction completes**
   - Implementation: Timestamps recorded and saved to localStorage

---

## State Transition Diagram

```
Trip: Open
│
├─[Start Trip]────────────────► Trip: In Transit
│                                │
│                                ├─ Jurisdiction 1: Ready to Activate
│                                ├─ Jurisdiction 2: Upcoming
│                                └─ Jurisdiction 3: Upcoming
│
│
├─[Activate J1]──────────────► Jurisdiction 1: Active
│                                ├─ Pilot notified
│                                └─ Timer starts
│
│
├─[Pilot Accepts & Starts]───► Pilot billing starts (separate)
│
│
├─[Complete J1]───────────────► Jurisdiction 1: Completed
│                                │
│                                ├─ Jurisdiction 2: Ready to Activate
│                                └─ Jurisdiction 3: Upcoming
│
│
├─[Activate J2]──────────────► Jurisdiction 2: Active
│                                ├─ Pilot notified
│                                └─ Timer starts
│
│
└─[Repeat...]
      │
      └─[Complete Last J]─────► Trip: Completed
```

---

## Technical Implementation

### Service Layer (`tripExecutionService.ts`)

```typescript
export interface JurisdictionState {
  code: string;
  status: 'upcoming' | 'ready-to-activate' | 'active' | 'completed';
  permitStatus: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  activatedAt?: Date;
}

export class TripExecutionService {
  // Start trip - does NOT activate jurisdictions
  static startTrip(tripId: string, jurisdictions: JurisdictionState[]): TripExecutionState
  
  // Activate jurisdiction - sends pilot notifications
  static activateJurisdiction(tripId: string): TripExecutionState
  
  // Complete jurisdiction - locks times, prepares next
  static completeJurisdiction(tripId: string): TripExecutionState
  
  // Break management
  static startBreak(tripId: string): TripExecutionState
  static endBreak(tripId: string): TripExecutionState
}
```

### Hook Layer (`useTripExecution.ts`)

```typescript
export function useTripExecution(
  tripId: string,
  jurisdictions: JurisdictionState[],
  onTripStarted?: () => void,
  onJurisdictionActivated?: () => void,
  onJurisdictionCompleted?: () => void,
  onTripCompleted?: () => void
): UseTripExecutionResult {
  return {
    canStartTrip: boolean,
    canActivateJurisdiction: boolean,
    canCompleteJurisdiction: boolean,
    startTrip: () => Promise<void>,
    activateJurisdiction: () => Promise<void>,
    completeJurisdiction: () => Promise<void>,
    // ...
  };
}
```

### UI Layer (`ViewPermitRequest.tsx`)

**Permits Tab Displays:**
- Jurisdiction cards with status badges
- "Activate Jurisdiction" button (when ready)
- "Complete Jurisdiction" button (when active)
- Active indicator with start time
- Completed indicator with duration

**Start Trip Control:**
- Slider at bottom of screen (when trip = Open)
- Validates first jurisdiction permit
- Shows error if permit not approved

---

## Testing Scenarios

### Scenario 1: Normal Multi-Jurisdiction Trip
```
1. Start Trip → WA becomes "Ready to Activate"
2. Activate WA → Pilot notified, WA becomes "Active"
3. Pilot accepts and starts job → Billing begins
4. Complete WA → WA locked, OR becomes "Ready to Activate"
5. Activate OR → Pilot notified, OR becomes "Active"
6. Complete OR → Trip completed
```

### Scenario 2: Break During Active Jurisdiction
```
1. Start Trip, Activate WA
2. Start Break → Timer pauses
3. Try to Complete WA → Error: "Must end break first"
4. End Break → Timer resumes
5. Complete WA → Success
```

### Scenario 3: Attempt to Skip Jurisdiction
```
1. Start Trip → WA is "Ready to Activate"
2. Try to activate OR → Error: "Must complete current jurisdiction first"
```

### Scenario 4: No Approved Permit
```
1. Try to Start Trip (first jurisdiction = Pending)
2. Error: "First jurisdiction requires approved permit"
3. Cannot start until permit approved
```

---

## Pilot Car Perspective

**Pilot Car Flow:**
1. Receives notification: "Jurisdiction WA is now active"
2. Opens app, sees job
3. Taps "Accept" job
4. Taps "Start Job" → Billing begins
5. Completes work
6. Taps "Complete Job" → Billing ends, submits invoice

**Pilot Does NOT:**
- Start automatically when truck starts trip
- Receive notifications for all jurisdictions at once
- Have billing auto-start when jurisdiction activates

---

## Data Persistence

All state is stored in `localStorage` with key: `trip_execution_{tripId}`

**Stored Data:**
- Trip status
- All jurisdiction states and timestamps
- Break records with durations
- Pilot notifications sent
- Total durations

**Date Serialization:**
- Dates stored as ISO strings
- Converted back to Date objects on load
- Ensures consistent time calculations

---

## Future Enhancements

### Geo-Fence Auto-Activation (Optional)
- Use GPS coordinates to detect border crossing
- Auto-trigger `activateJurisdiction()` when truck enters new state
- Show notification: "Entering {STATE} - Activating jurisdiction"
- Fallback to manual activation if GPS unavailable

### Real-time Pilot Notifications
- Replace console.log with actual API calls
- Send push notifications to pilot mobile apps
- Send SMS for critical updates
- Email notifications with job details

### Advanced Time Tracking
- Add waiting time tracking (separate from breaks)
- Add layover tracking
- Add fuel stop tracking
- All locked when jurisdiction completes

---

## Summary

This clean workflow ensures:
✅ **No premature pilot billing** - Pilots control their own start time
✅ **Correct notifications** - Only one jurisdiction at a time
✅ **Operational clarity** - Clear separation of truck vs pilot actions
✅ **Data integrity** - All times locked when jurisdiction completes
✅ **Proper sequencing** - Jurisdictions must be completed in order

The system enforces these rules at every level (service, hook, UI) to prevent operational errors.
