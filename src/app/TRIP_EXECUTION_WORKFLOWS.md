# Trip Execution Workflows - Visual Guide

## Complete Trip Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TRUCK DRIVER TRIP FLOW                          │
└─────────────────────────────────────────────────────────────────────────┘

START: Trip Status = "Open"
│
├─ First Jurisdiction Permit = "Approved"? ────┬─ YES ──┐
│                                               │        │
│                                               └─ NO ───┤
│                                                        │
│                                                        ▼
│                                            [Warning Message Shown]
│                                            "Cannot Start Trip"
│                                            [No slide button available]
│                                                        │
│                                                        STOP
│
▼
[Truck Driver: Swipe "Slide to Start Trip"]
│
├─ Trip Execution Service: startTrip()
│  ├─ Validate first jurisdiction permit ✓
│  ├─ Change trip status → "In Transit"
│  ├─ Activate first jurisdiction (e.g., NY)
│  ├─ Record start timestamp
│  └─ 🔔 Send pilot car notifications (AUTOMATIC)
│
├─ UI Updates:
│  ├─ Trip moves from "Open" tab → "In Transit" tab
│  ├─ Actions tab shows new buttons:
│  │  ├─ "Start Break"
│  │  └─ "Complete NY Jurisdiction"
│  └─ Toast: "Trip started successfully - Now in transit through NY"
│
▼
[Trip Status: "In Transit" - NY Jurisdiction Active]
│
│  ┌─────────────────────────────────────┐
│  │      DURING TRIP - NY ACTIVE        │
│  └─────────────────────────────────────┘
│
├─ OPTIONAL: Truck Driver Takes Break
│  │
│  ├─ [Truck Driver: Tap "Start Break"]
│  │
│  ├─ Trip Execution Service: startBreak()
│  │  ├─ Validate: trip is In Transit ✓
│  │  ├─ Validate: no active break ✓
│  │  ├─ Create break record
│  │  ├─ Pause jurisdiction timer
│  │  └─ Mark break as active
│  │
│  ├─ UI Updates:
│  │  ├─ Blue "Break in Progress" card appears
│  │  ├─ "Complete NY Jurisdiction" button disabled
│  │  ├─ "End Trip" button disabled
│  │  └─ Toast: "Break started - Jurisdiction timer paused"
│  │
│  ├─ [Driver on break... 10 minutes pass]
│  │
│  ├─ [Truck Driver: Tap "End Break" in blue card]
│  │
│  ├─ Trip Execution Service: endBreak()
│  │  ├─ Calculate break duration (10 min)
│  │  ├─ Log break record
│  │  ├─ Resume jurisdiction timer
│  │  └─ Clear active break
│  │
│  └─ UI Updates:
│     ├─ Blue card disappears
│     ├─ Buttons re-enabled
│     └─ Toast: "Break ended - Break duration: 10m"
│
▼
[Driver Completes NY Jurisdiction]
│
├─ [Truck Driver: Tap "Complete NY Jurisdiction"]
│
├─ Trip Execution Service: completeJurisdiction()
│  ├─ Validate: no active break ✓
│  ├─ Mark NY jurisdiction → "completed"
│  ├─ Calculate NY duration (exclude break time)
│  ├─ Activate next jurisdiction (NJ)
│  ├─ Move currentJurisdictionIndex: 0 → 1
│  └─ 🔔 Send pilot car notifications for NJ (AUTOMATIC)
│
├─ UI Updates:
│  ├─ Button text changes: "Complete NJ Jurisdiction"
│  └─ Toast: "NY completed - Now active in NJ"
│
▼
[Trip Status: "In Transit" - NJ Jurisdiction Active]
│
│  ┌─────────────────────────────────────┐
│  │      DURING TRIP - NJ ACTIVE        │
│  └─────────────────────────────────────┘
│
├─ [Same options available: Start Break, Complete Jurisdiction]
│
├─ [Driver may take another break if needed]
│
├─ [Truck Driver: Tap "Complete NJ Jurisdiction"]
│
├─ Trip Execution Service: completeJurisdiction()
│  ├─ Mark NJ jurisdiction → "completed"
│  ├─ Activate next jurisdiction (PA)
│  └─ 🔔 Send pilot car notifications for PA (AUTOMATIC)
│
▼
[Trip Status: "In Transit" - PA Jurisdiction Active]
│
│  ┌─────────────────────────────────────┐
│  │      DURING TRIP - PA ACTIVE        │
│  │         (LAST JURISDICTION)         │
│  └─────────────────────────────────────┘
│
├─ [Truck Driver: Tap "Complete PA Jurisdiction"]
│
├─ Trip Execution Service: completeJurisdiction()
│  ├─ Mark PA jurisdiction → "completed"
│  ├─ Check: No more jurisdictions
│  ├─ Change trip status → "Completed"
│  ├─ Record end timestamp
│  └─ Calculate total duration
│
├─ UI Updates:
│  ├─ Trip moves from "In Transit" tab → "Completed" tab
│  ├─ Completion summary card shown
│  └─ Toast: "Trip completed! - All jurisdictions have been completed"
│
▼
END: Trip Status = "Completed"
```

---

## State Transitions

```
┌──────────────────────────────────────────────────────────────┐
│                    TRIP STATE MACHINE                        │
└──────────────────────────────────────────────────────────────┘

[Open] ──────startTrip()─────> [In Transit] ──────completeLastJurisdiction()─────> [Completed]
   │                                 │
   │                                 │
   └─ Requirements:                  └─ Manual Actions Available:
      • First jurisdiction               • startBreak()
        permit = "Approved"              • endBreak()
                                         • completeJurisdiction()
                                         • endTrip() (emergency)
```

---

## Jurisdiction Progression

```
┌──────────────────────────────────────────────────────────────┐
│               JURISDICTION STATE MACHINE                     │
└──────────────────────────────────────────────────────────────┘

Trip Start:
[pending] ──> [active] ──> [pending] ──> [pending] ──> [pending]
   NY           NJ          PA           MD           VA

After NY Complete:
[completed] ──> [active] ──> [pending] ──> [pending] ──> [pending]
    NY            NJ          PA           MD           VA
                  ↑
                  └── Pilot Cars Notified

After NJ Complete:
[completed] ──> [completed] ──> [active] ──> [pending] ──> [pending]
    NY             NJ            PA          MD           VA
                                 ↑
                                 └── Pilot Cars Notified

After PA Complete:
[completed] ──> [completed] ──> [completed] ──> [active] ──> [pending]
    NY             NJ             PA           MD           VA
                                               ↑
                                               └── Pilot Cars Notified

After MD Complete:
[completed] ──> [completed] ──> [completed] ──> [completed] ──> [active]
    NY             NJ             PA            MD            VA
                                                              ↑
                                                              └── Pilot Cars Notified

After VA Complete:
[completed] ──> [completed] ──> [completed] ──> [completed] ──> [completed]
    NY             NJ             PA            MD             VA
                                                               
                    ╔════════════════════════╗
                    ║  TRIP COMPLETED ✓      ║
                    ╚════════════════════════╝
```

---

## Break Time Workflow

```
┌──────────────────────────────────────────────────────────────┐
│                   BREAK TIME TRACKING                        │
└──────────────────────────────────────────────────────────────┘

Trip Status: "In Transit"
Jurisdiction: NY (Active)
│
├─ [Truck Driver: Tap "Start Break"]
│
├─ Break State:
│  ├─ Active Break Created
│  ├─ Break Start Time: 10:30:00 AM
│  ├─ Associated Jurisdiction: NY
│  └─ Jurisdiction Timer: PAUSED ⏸
│
├─ UI State:
│  ├─ Blue "Break in Progress" card visible
│  ├─ "Complete NY Jurisdiction" button disabled
│  └─ "End Trip" button disabled
│
├─ [Time passes... 15 minutes]
│
├─ [Truck Driver: Tap "End Break"]
│
├─ Break State:
│  ├─ Break End Time: 10:45:00 AM
│  ├─ Duration Calculated: 15 minutes (900 seconds)
│  ├─ Break Record Logged
│  └─ Jurisdiction Timer: RESUMED ▶
│
└─ UI State:
   ├─ Blue card disappears
   ├─ Buttons re-enabled
   └─ Toast: "Break ended - Break duration: 15m"
```

---

## Pilot Car Notification Timeline

```
┌──────────────────────────────────────────────────────────────┐
│          AUTOMATIC PILOT CAR NOTIFICATIONS                   │
└──────────────────────────────────────────────────────────────┘

10:00 AM - Trip Started (NY Active)
│
├─ 🔔 Notifications Sent AUTOMATICALLY:
│  ├─ Lead Pilot Car (NY): "Trip REQ-1001 starting in NY. Prepare for escort."
│  └─ Chase Pilot Car (NY): "Trip REQ-1001 starting in NY. Prepare for escort."
│
│  ┌────────────────────────────────┐
│  │ TRUCK DRIVER SEES NO UI        │
│  │ Notifications sent in background│
│  └────────────────────────────────┘
│
│
12:00 PM - NY Jurisdiction Completed
│
├─ 🔔 Notifications Sent AUTOMATICALLY:
│  ├─ Lead Pilot Car (NJ): "Trip REQ-1001 entering NJ. ETA: 12:15 PM"
│  └─ Chase Pilot Car (NJ): "Trip REQ-1001 entering NJ. ETA: 12:15 PM"
│
│  ┌────────────────────────────────┐
│  │ TRUCK DRIVER SEES NO UI        │
│  │ Notifications sent in background│
│  └────────────────────────────────┘
│
│
2:00 PM - NJ Jurisdiction Completed
│
├─ 🔔 Notifications Sent AUTOMATICALLY:
│  ├─ Lead Pilot Car (PA): "Trip REQ-1001 entering PA. ETA: 2:15 PM"
│  └─ Chase Pilot Car (PA): "Trip REQ-1001 entering PA. ETA: 2:15 PM"
│
└─ Pattern continues for all jurisdictions...
```

---

## Validation & Error Handling

```
┌──────────────────────────────────────────────────────────────┐
│              VALIDATION DECISION TREE                        │
└──────────────────────────────────────────────────────────────┘

Can Start Trip?
│
├─ Trip Status = "Open"? ────┬─ NO ──> ❌ Cannot start (already started/completed)
│                            │
│                            └─ YES
│                               │
└─ First Jurisdiction Permit = "Approved"? ────┬─ NO ──> ❌ Show warning message
                                               │
                                               └─ YES ──> ✅ Allow start


Can Start Break?
│
├─ Trip Status = "In Transit"? ────┬─ NO ──> ❌ Cannot start (trip not active)
│                                  │
│                                  └─ YES
│                                     │
└─ Active Break Exists? ────┬─ YES ──> ❌ Cannot start (break already active)
                            │
                            └─ NO ──> ✅ Allow start


Can End Break?
│
└─ Active Break Exists? ────┬─ NO ──> ❌ Cannot end (no active break)
                            │
                            └─ YES ──> ✅ Allow end


Can Complete Jurisdiction?
│
├─ Active Break Exists? ────┬─ YES ──> ❌ Cannot complete (end break first)
│                           │
│                           └─ NO
│                              │
└─ Current Jurisdiction Exists? ────┬─ NO ──> ❌ Cannot complete (no active jurisdiction)
                                    │
                                    └─ YES ──> ✅ Allow complete


Can End Trip?
│
├─ Trip Status = "In Transit"? ────┬─ NO ──> ❌ Cannot end (not started)
│                                  │
│                                  └─ YES
│                                     │
└─ Active Break Exists? ────┬─ YES ──> ❌ Cannot end (end break first)
                            │
                            └─ NO ──> ✅ Allow end
```

---

## Data Storage Flow

```
┌──────────────────────────────────────────────────────────────┐
│                 LOCAL STORAGE PERSISTENCE                    │
└──────────────────────────────────────────────────────────────┘

User Action
    ↓
Trip Execution Service
    ↓
Validate Action ────┬─ INVALID ──> Throw Error ──> Toast Error Message
                    │
                    └─ VALID
                       ↓
Update State Object
    ↓
Save to Local Storage
    ↓
Key: "trip_execution_REQ-1001"
    ↓
Value: {
  tripId: "REQ-1001",
  status: "In Transit",
  startTime: "2024-12-11T10:30:00Z",
  currentJurisdictionIndex: 1,
  jurisdictions: [...],
  breaks: [...],
  pilotCarNotifications: [...]
}
    ↓
Return Updated State
    ↓
React Hook (useTripExecution)
    ↓
Update React State
    ↓
UI Re-renders
    ↓
Toast Success Message


On Page Refresh/App Reopen:
    ↓
useTripExecution Hook Initializes
    ↓
Load State from Local Storage
    ↓
Parse JSON + Convert Dates
    ↓
Set React State
    ↓
UI Renders with Restored State ✓
```

---

## UI Component Tree

```
┌──────────────────────────────────────────────────────────────┐
│                 UI COMPONENT STRUCTURE                       │
└──────────────────────────────────────────────────────────────┘

ViewPermitRequest.tsx
│
├─ useTripExecution Hook
│  ├─ Input: tripId, jurisdictions, callbacks
│  └─ Output: state, actions, flags
│
├─ Header
│  ├─ Trip ID
│  └─ Back Button
│
├─ Tabs
│  │
│  ├─ Actions Tab
│  │  │
│  │  ├─ [CONDITIONAL] Break Status Card
│  │  │  └─ Visible when: isBreakActive = true
│  │  │     ├─ Timer Icon (animated)
│  │  │     ├─ "Break in Progress"
│  │  │     └─ "End Break" button
│  │  │
│  │  └─ Quick Actions Card
│  │     │
│  │     ├─ [CONDITIONAL] "Start Break" button
│  │     │  └─ Visible when: status = "In Transit" AND !isBreakActive
│  │     │
│  │     ├─ [CONDITIONAL] "Complete [STATE] Jurisdiction" button
│  │     │  └─ Visible when: status = "In Transit" AND currentJurisdiction exists
│  │     │
│  │     ├─ [CONDITIONAL] "Share Tracking Link" button
│  │     │  └─ Visible when: status = "In Transit"
│  │     │
│  │     ├─ "Request Route/Time Change" button
│  │     ├─ "Log Incident" button
│  │     ├─ "Download All Permits" button
│  │     │
│  │     └─ [CONDITIONAL] "End Trip" button
│  │        └─ Visible when: status = "In Transit"
│  │
│  ├─ Jobs Tab
│  ├─ Permits Tab
│  ├─ Info Tab
│  └─ Invoice Tab
│
└─ Footer
   │
   ├─ [CONDITIONAL] "Slide to Start Trip"
   │  └─ Visible when: status = "Open" AND canStartTrip = true
   │
   ├─ [CONDITIONAL] Warning Message
   │  └─ Visible when: status = "Open" AND canStartTrip = false
   │
   └─ [CONDITIONAL] "Slide to Stop Trip"
      └─ Visible when: status = "In Transit"
```

---

## Timeline Example: Full Trip

```
┌──────────────────────────────────────────────────────────────┐
│           EXAMPLE: NY TO FL TRIP TIMELINE                    │
└──────────────────────────────────────────────────────────────┘

10:00 AM - Trip Created (Status: Open)
           Jurisdictions: NY, NJ, PA, MD, VA, NC, SC, GA, FL
           NY Permit: Approved ✓
           Driver: Opens trip details
           UI: Shows "Slide to Start Trip"

10:05 AM - Trip Started
           Action: Driver swipes to start
           System: Status → "In Transit", NY → Active
           🔔 NY pilot cars notified
           UI: Trip moves to In Transit tab

10:30 AM - Break Started
           Action: Driver taps "Start Break"
           System: Break active, timer paused
           UI: Blue break card appears

10:45 AM - Break Ended (15 min break)
           Action: Driver taps "End Break"
           System: Break logged, timer resumed
           UI: Break card disappears

12:00 PM - NY Jurisdiction Completed
           Action: Driver taps "Complete NY Jurisdiction"
           System: NY → Completed, NJ → Active
           🔔 NJ pilot cars notified
           UI: Button text changes to "Complete NJ Jurisdiction"

1:30 PM  - NJ Jurisdiction Completed
           Action: Driver taps "Complete NJ Jurisdiction"
           System: NJ → Completed, PA → Active
           🔔 PA pilot cars notified

2:00 PM  - Break Started
           Action: Driver taps "Start Break"
           System: Break active in PA
           UI: Blue break card appears

2:30 PM  - Break Ended (30 min break)
           Action: Driver taps "End Break"
           System: Break logged
           UI: Break card disappears

4:00 PM  - PA Jurisdiction Completed
           System: PA → Completed, MD → Active
           🔔 MD pilot cars notified

5:30 PM  - MD Jurisdiction Completed
           System: MD → Completed, VA → Active
           🔔 VA pilot cars notified

7:00 PM  - VA Jurisdiction Completed
           System: VA → Completed, NC → Active
           🔔 NC pilot cars notified

8:30 PM  - NC Jurisdiction Completed
           System: NC → Completed, SC → Active
           🔔 SC pilot cars notified

10:00 PM - SC Jurisdiction Completed
           System: SC → Completed, GA → Active
           🔔 GA pilot cars notified

11:30 PM - GA Jurisdiction Completed
           System: GA → Completed, FL → Active
           🔔 FL pilot cars notified

1:00 AM  - FL Jurisdiction Completed
           Action: Driver taps "Complete FL Jurisdiction"
           System: FL → Completed, Status → "Completed"
           UI: Trip moves to Completed tab
           🎉 Toast: "Trip completed!"

Total Trip Duration: 15 hours
Total Break Time: 45 minutes
Active Driving Time: 14 hours 15 minutes
Jurisdictions Completed: 9
Pilot Car Notifications Sent: 18 (2 per jurisdiction)
```

---

## Error Recovery Flow

```
┌──────────────────────────────────────────────────────────────┐
│              ERROR RECOVERY & RESILIENCE                     │
└──────────────────────────────────────────────────────────────┘

Scenario 1: Network Drops During Trip
│
├─ Action: Driver completes jurisdiction
├─ Result: Action saved to local storage
├─ Status: Changes reflected in UI immediately
├─ Network: Offline, no API call
│
└─ Recovery:
   ├─ When network returns
   ├─ Background sync (future enhancement)
   └─ State remains consistent


Scenario 2: Browser/App Closes During Break
│
├─ State: Break active, started at 10:30 AM
├─ Event: Browser closed at 10:35 AM
├─ Storage: State persisted to localStorage
│
└─ Recovery:
   ├─ App reopened at 10:45 AM
   ├─ Hook loads state from localStorage
   ├─ Break still active (started 15 min ago)
   ├─ UI shows blue break card
   └─ Driver can end break normally ✓


Scenario 3: Try to Start Trip Without Permit
│
├─ State: Trip Open, First jurisdiction = WA (Pending)
├─ Check: canStartTrip = false
├─ UI: Warning message shown, no slide button
│
└─ Resolution:
   ├─ Driver must request/approve permit first
   ├─ Once approved, canStartTrip = true
   └─ Slide button appears


Scenario 4: Try to Complete Jurisdiction During Break
│
├─ State: Break active
├─ Check: canCompleteJurisdiction = false
├─ UI: "Complete Jurisdiction" button disabled
├─ Action: Driver tries to click
│
└─ Result:
   ├─ Button does nothing (disabled)
   ├─ No error thrown
   └─ Driver must end break first


Scenario 5: Multiple Tabs Open
│
├─ Tab 1: Driver starts trip
├─ Tab 2: Same trip opened
├─ Storage: State saved by Tab 1
│
└─ Behavior:
   ├─ Tab 2 won't auto-refresh
   ├─ Tab 2 needs manual refresh
   ├─ After refresh: Tab 2 shows updated state
   └─ (Multi-tab sync is future enhancement)
```

This visual guide provides clear workflows for all trip execution scenarios!
