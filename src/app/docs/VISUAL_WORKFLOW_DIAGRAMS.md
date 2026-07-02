# Clean Jurisdiction Workflow - Visual Diagrams

## 1. Complete System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TRUCK DRIVER MOBILE APP                         │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         TRIP EXECUTION                               │
│                                                                       │
│  Trip Status: Open → In Transit → Completed                         │
│                                                                       │
│  Jurisdiction States:                                                │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Upcoming → Ready to Activate → Active → Completed       │      │
│  └──────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
         ┌──────────────────┐      ┌──────────────────┐
         │  PILOT CAR APP   │      │  BACKEND API     │
         │                  │      │                  │
         │  - Notifications │      │  - State Sync   │
         │  - Job Accept    │      │  - Billing      │
         │  - Job Start     │      │  - Reports      │
         │  - Billing       │      │                  │
         └──────────────────┘      └──────────────────┘
```

---

## 2. Trip Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   START                                                               │
│     │                                                                 │
│     ▼                                                                 │
│  ┌──────────────────────────────────────────┐                       │
│  │  Trip Status: Open                       │                       │
│  │  - All jurisdictions undefined           │                       │
│  │  - No active state                       │                       │
│  └──────────────────────────────────────────┘                       │
│     │                                                                 │
│     │ [Driver: Start Trip]                                           │
│     ▼                                                                 │
│  ┌──────────────────────────────────────────┐                       │
│  │  Trip Status: In Transit                 │                       │
│  │  - Jurisdiction 1: Ready to Activate     │                       │
│  │  - Jurisdiction 2-N: Upcoming            │                       │
│  │  - Timer started                         │                       │
│  │  ❌ No pilot notifications sent          │                       │
│  └──────────────────────────────────────────┘                       │
│     │                                                                 │
│     │ [Driver: Activate Jurisdiction 1]                              │
│     ▼                                                                 │
│  ┌──────────────────────────────────────────┐                       │
│  │  Jurisdiction 1: Active                  │                       │
│  │  - Start time recorded                   │                       │
│  │  - Activation timestamp recorded         │                       │
│  │  ✅ Pilot notifications sent (J1 only)  │                       │
│  │  - Pilot job status: Awaiting Start      │                       │
│  └──────────────────────────────────────────┘                       │
│     │                                                                 │
│     │ [Pilot: Accept & Start Job] ← Separate workflow!              │
│     │                                                                 │
│     │ [Driver: Complete Jurisdiction 1]                              │
│     ▼                                                                 │
│  ┌──────────────────────────────────────────┐                       │
│  │  Jurisdiction 1: Completed               │                       │
│  │  - End time recorded                     │                       │
│  │  - Duration calculated                   │                       │
│  │  - Time logs locked                      │                       │
│  │  - Jurisdiction 2: Ready to Activate     │                       │
│  │  - Jurisdiction 3-N: Upcoming            │                       │
│  └──────────────────────────────────────────┘                       │
│     │                                                                 │
│     │ [Repeat for each jurisdiction]                                 │
│     ▼                                                                 │
│  ┌──────────────────────────────────────────┐                       │
│  │  All Jurisdictions: Completed            │                       │
│  │  Trip Status: Completed                  │                       │
│  │  - Total duration calculated             │                       │
│  │  - Final report generated                │                       │
│  └──────────────────────────────────────────┘                       │
│     │                                                                 │
│     ▼                                                                 │
│   END                                                                 │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Jurisdiction State Machine

```
                    ┌─────────────────────┐
                    │      UPCOMING       │
                    │                     │
                    │  • Future state     │
                    │  • No actions       │
                    │  • Gray badge       │
                    └──────────┬──────────┘
                               │
                               │ Previous jurisdiction
                               │ completed
                               │
                               ▼
                    ┌─────────────────────┐
                    │  READY TO ACTIVATE  │
                    │                     │
                    │  • Can activate     │
                    │  • Blue badge       │
                    │  • [Activate] btn   │
                    └──────────┬──────────┘
                               │
                               │ Driver taps
                               │ "Activate Jurisdiction"
                               │
                               ▼
                    ┌─────────────────────┐
                    │       ACTIVE        │
                    │                     │
                    │  • Timer running    │
                    │  • Green badge      │
                    │  • 🟢 indicator     │
                    │  • Pilot notified   │
                    │  • [Complete] btn   │
                    └──────────┬──────────┘
                               │
                               │ Driver taps
                               │ "Complete Jurisdiction"
                               │
                               ▼
                    ┌─────────────────────┐
                    │     COMPLETED       │
                    │                     │
                    │  • Locked           │
                    │  • Gray badge       │
                    │  • Duration shown   │
                    │  • No buttons       │
                    └─────────────────────┘
```

---

## 4. Notification Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                  NOTIFICATION TIMELINE                              │
└────────────────────────────────────────────────────────────────────┘

Trip Start:
│
├─ Truck driver starts trip
│  └─ ❌ NO notifications sent
│
├─ Jurisdiction 1: Ready to Activate
│  └─ ❌ NO notifications sent
│

Activate Jurisdiction 1 (e.g., WA):
│
├─ Truck driver activates WA
│  └─ ✅ Notification sent to WA pilots ONLY
│     └─ "Jurisdiction WA is now active. Please begin escort duty."
│     └─ Includes: ETA, Contact info
│
├─ WA Pilot receives notification
│  └─ Pilot action required (Accept & Start)
│

Complete Jurisdiction 1:
│
├─ Truck driver completes WA
│  └─ ❌ NO notifications sent yet
│
├─ Jurisdiction 2: Ready to Activate
│  └─ ❌ NO notifications sent (waiting for activation)
│

Activate Jurisdiction 2 (e.g., OR):
│
├─ Truck driver activates OR
│  └─ ✅ Notification sent to OR pilots ONLY
│     └─ "Jurisdiction OR is now active. Please begin escort duty."
│
├─ OR Pilot receives notification
│  └─ Pilot action required
│
└─ [Repeat for each jurisdiction]
```

---

## 5. Break Integration Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                  BREAK HANDLING DURING TRIP                         │
└────────────────────────────────────────────────────────────────────┘

Normal Flow:                    With Break:

Jurisdiction Active            Jurisdiction Active
       │                              │
       │                              ├─ [Start Break]
       │                              │
       │                              ▼
       │                       ┌──────────────────┐
       │                       │  Break Active    │
       │                       │  • Timer paused  │
       │                       │  ❌ Cannot       │
       │                       │    complete      │
       │                       └────────┬─────────┘
       │                                │
       │                                ├─ [End Break]
       │                                │
       │                                ▼
       │                       ┌──────────────────┐
       │                       │  Break Ended     │
       │                       │  • Timer resumed │
       │                       │  • Duration      │
       │                       │    recorded      │
       │                       └────────┬─────────┘
       │                                │
       ▼                                ▼
   [Complete]  ←──────────────────  [Complete]
   Jurisdiction                     Jurisdiction
       │                                │
       ▼                                ▼
    Duration:                        Duration:
    Excludes                         Excludes
    no breaks                        break time
```

---

## 6. Validation Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                    VALIDATION CHECKS                                │
└────────────────────────────────────────────────────────────────────┘

START TRIP:
    │
    ├─ ✓ Trip status = Open?
    ├─ ✓ First jurisdiction has approved permit?
    ├─ ✓ Not already in transit?
    │
    └─► If all pass: Start trip
        If any fail: Show error


ACTIVATE JURISDICTION:
    │
    ├─ ✓ Trip status = In Transit?
    ├─ ✓ No active break?
    ├─ ✓ Current jurisdiction status = ready-to-activate?
    ├─ ✓ Is current jurisdiction (not skipping)?
    │
    └─► If all pass: Activate jurisdiction
        If any fail: Show error / disable button


COMPLETE JURISDICTION:
    │
    ├─ ✓ No active break?
    ├─ ✓ Current jurisdiction status = active?
    ├─ ✓ Not skipping jurisdictions?
    │
    └─► If all pass: Complete jurisdiction
        If any fail: Show error


START BREAK:
    │
    ├─ ✓ Trip status = In Transit?
    ├─ ✓ No existing active break?
    │
    └─► If all pass: Start break
        If any fail: Show error


END BREAK:
    │
    ├─ ✓ Active break exists?
    │
    └─► If pass: End break
        If fail: Show error
```

---

## 7. Truck Driver vs Pilot Car Control

```
┌──────────────────────────────────────────────────────────────────┐
│                    SEPARATION OF CONCERNS                         │
└──────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐     ┌────────────────────────────┐
│      TRUCK DRIVER          │     │       PILOT CAR            │
│       CONTROLS             │     │        CONTROLS            │
├────────────────────────────┤     ├────────────────────────────┤
│                            │     │                            │
│  • Start Trip              │     │  • Accept Job              │
│  • Activate Jurisdiction   │     │  • Decline Job             │
│  • Complete Jurisdiction   │     │  • Start Job               │
│  • Start Break             │     │  • End Job                 │
│  • End Break               │     │  • Start Pilot Break       │
│  • End Trip                │     │  • End Pilot Break         │
│                            │     │  • Log Waiting Time        │
│  ✅ Controls jurisdiction  │     │  • Submit Invoice          │
│     progression            │     │                            │
│                            │     │  ✅ Controls pilot billing │
│  ❌ Does NOT control       │     │                            │
│     pilot billing          │     │  ❌ Does NOT control       │
│                            │     │     jurisdiction status    │
└────────────────────────────┘     └────────────────────────────┘
         │                                      │
         │                                      │
         └──────────┬───────────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   BACKEND SYSTEM    │
         ├─────────────────────┤
         │  • Coordinates      │
         │  • Validates        │
         │  • Records          │
         │  • Calculates       │
         └─────────────────────┘
```

---

## 8. Data Flow Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW                                   │
└────────────────────────────────────────────────────────────────────┘

UI Action
    │
    ▼
┌────────────────────┐
│  useTripExecution  │  ← React Hook
│      Hook          │
└─────────┬──────────┘
          │
          ├─ Validation
          ├─ Loading State
          ├─ Error Handling
          │
          ▼
┌─────────────────────────┐
│  TripExecutionService   │  ← Business Logic
└─────────┬───────────────┘
          │
          ├─ State Validation
          ├─ State Transition
          ├─ Timestamp Recording
          ├─ Duration Calculation
          │
          ▼
┌─────────────────┐
│  localStorage   │  ← Data Persistence
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  State Update   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  UI Re-render   │
└─────────────────┘
          │
          ▼
    User Sees Update
```

---

## 9. Multi-Jurisdiction Example

```
Trip: NY → NJ → PA → MD
Permits: All Approved

┌─────────────────────────────────────────────────────────────┐
│  START TRIP                                                  │
└─────────────────────────────────────────────────────────────┘

State:
┌────────┬──────────────────────┬──────────┐
│  NY    │  Ready to Activate   │  [Act]   │  ← Can activate
├────────┼──────────────────────┼──────────┤
│  NJ    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  PA    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  MD    │  Upcoming            │          │
└────────┴──────────────────────┴──────────┘

┌─────────────────────────────────────────────────────────────┐
│  ACTIVATE NY                                                 │
└─────────────────────────────────────────────────────────────┘

State:
┌────────┬──────────────────────┬──────────┐
│  NY    │  Active 🟢          │  [Comp]  │  ← Active, can complete
├────────┼──────────────────────┼──────────┤
│  NJ    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  PA    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  MD    │  Upcoming            │          │
└────────┴──────────────────────┴──────────┘

Notification: NY pilots notified

┌─────────────────────────────────────────────────────────────┐
│  COMPLETE NY                                                 │
└─────────────────────────────────────────────────────────────┘

State:
┌────────┬──────────────────────┬──────────┐
│  NY    │  Completed ✓         │          │  ← Locked
│        │  Duration: 1h 30m    │          │
├────────┼──────────────────────┼──────────┤
│  NJ    │  Ready to Activate   │  [Act]   │  ← Can activate
├────────┼──────────────────────┼──────────┤
│  PA    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  MD    │  Upcoming            │          │
└────────┴──────────────────────┴──────────┘

┌─────────────────────────────────────────────────────────────┐
│  ACTIVATE NJ                                                 │
└─────────────────────────────────────────────────────────────┘

State:
┌────────┬──────────────────────┬──────────┐
│  NY    │  Completed ✓         │          │
│        │  Duration: 1h 30m    │          │
├────────┼──────────────────────┼──────────┤
│  NJ    │  Active 🟢          │  [Comp]  │  ← Active
├────────┼──────────────────────┼──────────┤
│  PA    │  Upcoming            │          │
├────────┼──────────────────────┼──────────┤
│  MD    │  Upcoming            │          │
└────────┴──────────────────────┴──────────┘

Notification: NJ pilots notified (only NJ, not PA or MD)

[Continue until all completed...]

┌─────────────────────────────────────────────────────────────┐
│  TRIP COMPLETED                                              │
└─────────────────────────────────────────────────────────────┘

State:
┌────────┬──────────────────────┬──────────┐
│  NY    │  Completed ✓         │          │
│        │  Duration: 1h 30m    │          │
├────────┼──────────────────────┼──────────┤
│  NJ    │  Completed ✓         │          │
│        │  Duration: 0h 45m    │          │
├────────┼──────────────────────┼──────────┤
│  PA    │  Completed ✓         │          │
│        │  Duration: 1h 15m    │          │
├────────┼──────────────────────┼──────────┤
│  MD    │  Completed ✓         │          │
│        │  Duration: 0h 55m    │          │
└────────┴──────────────────────┴──────────┘

Total Trip Duration: 4h 25m (excluding breaks)
```

---

## 10. Error Scenarios

```
┌────────────────────────────────────────────────────────────┐
│  ERROR: Try to activate without starting trip              │
└────────────────────────────────────────────────────────────┘

Action: Tap "Activate Jurisdiction"
Result: ❌ Button disabled / not visible
Reason: Trip must be "In Transit" first


┌────────────────────────────────────────────────────────────┐
│  ERROR: Try to complete while on break                     │
└────────────────────────────────────────────────────────────┘

Action: Tap "Complete Jurisdiction" while break active
Result: ❌ Error toast: "Cannot complete while break is active"
Fix: End break first


┌────────────────────────────────────────────────────────────┐
│  ERROR: Try to start trip without approved permit          │
└────────────────────────────────────────────────────────────┘

Action: Slide "Start Trip" (first permit = Pending)
Result: ❌ Error: "First jurisdiction requires approved permit"
Fix: Approve permit first


┌────────────────────────────────────────────────────────────┐
│  ERROR: Try to skip jurisdiction                           │
└────────────────────────────────────────────────────────────┘

Scenario: NY active, try to activate PA (skipping NJ)
Result: ❌ PA shows "Upcoming" with no activate button
Reason: Must complete jurisdictions in order
```

---

## Summary

These visual diagrams illustrate:

1. **System Architecture** - How components interact
2. **Trip Lifecycle** - Complete journey from start to finish
3. **State Machine** - Jurisdiction state transitions
4. **Notification Flow** - When and how notifications are sent
5. **Break Integration** - How breaks affect jurisdiction timing
6. **Validation Rules** - What checks are performed
7. **Control Separation** - Truck driver vs pilot responsibilities
8. **Data Flow** - How information moves through the system
9. **Multi-Jurisdiction** - Real-world scenario walkthrough
10. **Error Handling** - What happens when things go wrong

All diagrams show the clean separation between:
- Trip Start
- Jurisdiction Activation
- Pilot Job Management

This ensures no premature billing, correct notifications, and operational clarity.
