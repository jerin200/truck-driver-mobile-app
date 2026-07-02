# Clean Jurisdiction Workflow - Test Scenarios

## Test Scenario 1: Normal Multi-Jurisdiction Trip

### Setup
- Trip: REQ-1001 (NY → FL)
- Jurisdictions: NY, NJ, PA, VA, NC, SC, GA, FL
- All permits: Approved

### Steps

1. **Start Trip**
   ```
   Action: Tap "Slide to Start Trip"
   Expected:
   - Trip status → "In Transit"
   - NY jurisdiction → "Ready to Activate" (blue badge)
   - All others → "Upcoming" (gray badge)
   - Toast: "Trip started successfully - NY is ready to activate"
   - NO pilot notifications sent
   - NO billing started
   ```

2. **Activate First Jurisdiction (NY)**
   ```
   Action: Tap "Activate Jurisdiction" on NY card
   Expected:
   - NY jurisdiction → "Active" (green badge)
   - Green pulsing indicator appears
   - Start time displayed: "Started 8:30 AM"
   - Complete button appears
   - Toast: "NY activated - Pilot cars have been notified"
   - Console log: Pilot notification sent for NY
   - NJ and others still "Upcoming"
   ```

3. **Complete First Jurisdiction (NY)**
   ```
   Action: Tap "Complete Jurisdiction" on NY card
   Expected:
   - NY jurisdiction → "Completed" (gray badge)
   - Duration displayed: "Completed in 2h 15m"
   - NY card locked (no buttons)
   - NJ jurisdiction → "Ready to Activate" (blue badge)
   - Activate button appears on NJ card
   - Toast: "NY completed - NJ is ready to activate"
   - Others still "Upcoming"
   ```

4. **Activate Second Jurisdiction (NJ)**
   ```
   Action: Tap "Activate Jurisdiction" on NJ card
   Expected:
   - NJ jurisdiction → "Active" (green badge)
   - Console log: Pilot notification sent for NJ ONLY
   - NY remains "Completed"
   - PA still "Upcoming"
   ```

5. **Continue Through All Jurisdictions**
   ```
   Repeat steps 3-4 for: PA → VA → NC → SC → GA → FL
   Expected:
   - Each completes in order
   - Each activates manually
   - Each gets separate pilot notifications
   - Previous jurisdictions remain "Completed"
   ```

6. **Complete Last Jurisdiction (FL)**
   ```
   Action: Tap "Complete Jurisdiction" on FL card
   Expected:
   - FL jurisdiction → "Completed"
   - Trip status → "Completed"
   - Toast: "Trip completed! All jurisdictions have been completed"
   - All jurisdictions show "Completed" status
   - Total duration calculated
   ```

**✅ Pass Criteria:**
- All jurisdictions activated manually
- Notifications sent one at a time
- No auto-activation occurred
- No premature billing

---

## Test Scenario 2: Break During Active Jurisdiction

### Setup
- Trip: Started, WA jurisdiction active

### Steps

1. **Start Break While Jurisdiction Active**
   ```
   Action: Tap "Start Break" (Actions tab)
   Expected:
   - Break indicator appears
   - Timer paused
   - WA still "Active"
   - Toast: "Break started - Jurisdiction timer paused"
   ```

2. **Try to Complete Jurisdiction While On Break**
   ```
   Action: Tap "Complete Jurisdiction"
   Expected:
   - Error toast: "Cannot complete jurisdiction while break is active"
   - Jurisdiction remains "Active"
   - Complete button still visible but disabled
   ```

3. **End Break**
   ```
   Action: Tap "End Break"
   Expected:
   - Break indicator removed
   - Timer resumed
   - Toast: "Break ended - Break duration: 15m"
   - Complete button enabled
   ```

4. **Complete Jurisdiction After Break**
   ```
   Action: Tap "Complete Jurisdiction"
   Expected:
   - WA → "Completed"
   - Duration excludes break time
   - OR → "Ready to Activate"
   - Toast: "WA completed - OR is ready to activate"
   ```

**✅ Pass Criteria:**
- Cannot complete during break
- Break time excluded from jurisdiction duration
- Can complete after break ends

---

## Test Scenario 3: Attempt Invalid Actions

### Setup
- Trip: Started, WA jurisdiction "Ready to Activate"

### Test 3a: Try to Complete Without Activating

```
Action: Try to complete WA (status = ready-to-activate)
Expected:
- No "Complete" button visible
- Only "Activate" button visible
- Cannot complete without activating first
```

### Test 3b: Try to Activate While On Break

```
Setup: Start break
Action: Tap "Activate Jurisdiction"
Expected:
- Error toast: "Cannot activate jurisdiction while on break"
- Button disabled
- Jurisdiction remains "Ready to Activate"
```

### Test 3c: Try to Activate Already Active Jurisdiction

```
Setup: WA already active
Action: Try to activate WA again
Expected:
- No "Activate" button visible (replaced by "Complete")
- Cannot re-activate active jurisdiction
```

### Test 3d: Try to Skip Jurisdiction

```
Setup: WA is current jurisdiction
Action: Try to activate OR (next jurisdiction)
Expected:
- OR card shows "Upcoming" only
- No activate button on OR card
- Must complete WA first
```

**✅ Pass Criteria:**
- All invalid actions prevented
- Appropriate error messages shown
- State remains consistent

---

## Test Scenario 4: First Jurisdiction Without Approved Permit

### Setup
- Trip: Open status
- WA permit: Pending (not Approved)

### Steps

1. **Try to Start Trip**
   ```
   Action: Tap "Slide to Start Trip"
   Expected:
   - Trip does NOT start
   - Error message: "Cannot start trip"
   - Description: "First jurisdiction (WA) requires approved permit"
   - Trip remains "Open"
   ```

2. **Approve WA Permit (simulate)**
   ```
   Action: Change WA permit to "Approved"
   Expected:
   - Start trip validation passes
   ```

3. **Start Trip Successfully**
   ```
   Action: Tap "Slide to Start Trip"
   Expected:
   - Trip starts successfully
   - WA → "Ready to Activate"
   ```

**✅ Pass Criteria:**
- Cannot start without approved first permit
- Clear error message
- Can start after permit approved

---

## Test Scenario 5: State Persistence

### Setup
- Trip: In transit, WA active

### Steps

1. **Reload Page**
   ```
   Action: Refresh browser
   Expected:
   - Trip state loads from localStorage
   - Trip status: "In Transit"
   - WA jurisdiction: "Active"
   - Start time preserved
   - All state intact
   ```

2. **Complete Jurisdiction After Reload**
   ```
   Action: Tap "Complete Jurisdiction"
   Expected:
   - Completes successfully
   - Duration calculated correctly
   - OR becomes "Ready to Activate"
   ```

**✅ Pass Criteria:**
- State persists across reloads
- Timestamps preserved correctly
- Can continue trip after reload

---

## Test Scenario 6: Rapid Actions (Race Conditions)

### Setup
- Trip: Started, WA "Ready to Activate"

### Steps

1. **Rapid Activate and Complete**
   ```
   Action: Tap "Activate" then immediately tap "Complete"
   Expected:
   - First action completes
   - Loading state prevents second action
   - No race condition
   - State remains consistent
   ```

2. **Multiple Activate Attempts**
   ```
   Action: Tap "Activate" multiple times quickly
   Expected:
   - Only one activation occurs
   - Button disabled during loading
   - No duplicate notifications
   ```

**✅ Pass Criteria:**
- No race conditions
- Loading states prevent duplicate actions
- State remains consistent

---

## Test Scenario 7: Trip with Single Jurisdiction

### Setup
- Trip: CA → CA (same state)
- Jurisdiction: CA only

### Steps

1. **Start Trip**
   ```
   Expected:
   - CA → "Ready to Activate"
   ```

2. **Activate CA**
   ```
   Expected:
   - CA → "Active"
   - Notification sent
   ```

3. **Complete CA**
   ```
   Expected:
   - CA → "Completed"
   - Trip → "Completed"
   - No next jurisdiction
   - Toast: "Trip completed!"
   ```

**✅ Pass Criteria:**
- Single jurisdiction handled correctly
- Trip completes when last jurisdiction completes
- No errors with single jurisdiction

---

## Test Scenario 8: Pilot Perspective (Separate System)

### Setup
- Truck driver activates WA jurisdiction
- Pilot receives notification

### Pilot Actions (In Pilot App - Not Tested Here)

1. **Pilot Receives Notification**
   ```
   Notification: "Jurisdiction WA is now active. Please begin escort duty."
   ETA: "8:45 AM"
   ```

2. **Pilot Accepts Job**
   ```
   Action: Tap "Accept"
   Expected:
   - Job status → "Accepted"
   - Billing NOT started yet
   ```

3. **Pilot Starts Job**
   ```
   Action: Tap "Start Job"
   Expected:
   - Job status → "In Progress"
   - Billing timer starts
   - Pilot controls their own billing
   ```

**✅ Pass Criteria:**
- Pilot controls their own billing
- Truck driver activation ≠ pilot billing start
- Separate workflows maintained

---

## Test Scenario 9: Break Time Tracking

### Setup
- Trip: In transit, WA active

### Steps

1. **Start Break During WA**
   ```
   Action: Start break
   Expected:
   - Break recorded with jurisdictionCode: "WA"
   ```

2. **Switch to OR, Start Break During OR**
   ```
   Setup: Complete WA, activate OR
   Action: Start break
   Expected:
   - Break recorded with jurisdictionCode: "OR"
   ```

3. **Complete OR**
   ```
   Expected:
   - OR duration excludes breaks in OR
   - WA breaks not counted toward OR duration
   ```

**✅ Pass Criteria:**
- Breaks associated with correct jurisdiction
- Break time excluded from jurisdiction duration
- Breaks tracked per jurisdiction

---

## Test Scenario 10: Edge Case - Emergency Trip End

### Setup
- Trip: In transit, WA active, OR and CA upcoming

### Steps

1. **End Trip Early (Emergency)**
   ```
   Action: Use emergency "End Trip" function
   Expected:
   - Trip → "Completed"
   - WA → "Completed"
   - OR and CA remain as-is
   - Total duration calculated
   ```

**✅ Pass Criteria:**
- Can end trip early if needed
- Partial completion tracked
- No errors with incomplete jurisdictions

---

## Automated Test Coverage

### Unit Tests (Service Layer)

```typescript
describe('TripExecutionService', () => {
  it('startTrip sets first jurisdiction to ready-to-activate', () => {
    const state = TripExecutionService.startTrip(tripId, jurisdictions);
    expect(state.jurisdictions[0].status).toBe('ready-to-activate');
  });

  it('startTrip does not send pilot notifications', () => {
    const spy = jest.spyOn(console, 'log');
    TripExecutionService.startTrip(tripId, jurisdictions);
    expect(spy).not.toHaveBeenCalledWith(expect.stringContaining('Pilot car notifications'));
  });

  it('activateJurisdiction changes status to active', () => {
    TripExecutionService.startTrip(tripId, jurisdictions);
    const state = TripExecutionService.activateJurisdiction(tripId);
    expect(state.jurisdictions[0].status).toBe('active');
  });

  it('activateJurisdiction sends pilot notifications', () => {
    const spy = jest.spyOn(console, 'log');
    TripExecutionService.startTrip(tripId, jurisdictions);
    TripExecutionService.activateJurisdiction(tripId);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Pilot car notifications'));
  });

  it('completeJurisdiction sets next to ready-to-activate', () => {
    TripExecutionService.startTrip(tripId, jurisdictions);
    TripExecutionService.activateJurisdiction(tripId);
    const state = TripExecutionService.completeJurisdiction(tripId);
    expect(state.jurisdictions[1].status).toBe('ready-to-activate');
  });

  it('completeJurisdiction throws error if break active', () => {
    TripExecutionService.startTrip(tripId, jurisdictions);
    TripExecutionService.activateJurisdiction(tripId);
    TripExecutionService.startBreak(tripId);
    expect(() => TripExecutionService.completeJurisdiction(tripId))
      .toThrow('Cannot complete jurisdiction while break is active');
  });

  it('canActivateJurisdiction returns false if not ready', () => {
    const result = TripExecutionService.canActivateJurisdiction(tripId);
    expect(result.canActivate).toBe(false);
  });

  it('canActivateJurisdiction returns true if ready', () => {
    TripExecutionService.startTrip(tripId, jurisdictions);
    const result = TripExecutionService.canActivateJurisdiction(tripId);
    expect(result.canActivate).toBe(true);
  });
});
```

---

## Manual Testing Checklist

### Pre-Testing Setup
- [ ] Clear localStorage
- [ ] Open browser console
- [ ] Navigate to trip detail view

### Core Flow Testing
- [ ] Start trip → First jurisdiction "Ready"
- [ ] Others "Upcoming"
- [ ] No console errors
- [ ] Activate jurisdiction → Status "Active"
- [ ] Pilot notification logged
- [ ] Complete jurisdiction → Status "Completed"
- [ ] Next jurisdiction "Ready"
- [ ] Repeat for 2-3 jurisdictions

### Break Testing
- [ ] Start break during active jurisdiction
- [ ] Try to complete → Error shown
- [ ] End break
- [ ] Complete jurisdiction → Success

### Error Testing
- [ ] Try to start without permit → Error
- [ ] Try to activate on break → Error
- [ ] Try to complete on break → Error

### State Persistence
- [ ] Activate jurisdiction
- [ ] Reload page
- [ ] State preserved
- [ ] Can continue normally

### UI Testing
- [ ] Badges show correct colors
- [ ] Buttons appear/disappear correctly
- [ ] Loading states work
- [ ] Toast notifications appear
- [ ] Times display correctly

---

## Regression Testing

Test these existing features still work:

- [ ] Trip start validation (permit check)
- [ ] Break start/end
- [ ] Time tracking
- [ ] Quick actions menu
- [ ] Pilot car jobs display
- [ ] Permits tab display
- [ ] Trip history
- [ ] Live tracking (if applicable)

---

## Performance Testing

- [ ] Large number of jurisdictions (10+)
- [ ] Rapid button clicks
- [ ] Multiple tab switches
- [ ] localStorage size reasonable
- [ ] No memory leaks
- [ ] Smooth animations

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Safari (iOS)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## Summary

**Total Test Scenarios:** 10 main scenarios
**Total Test Cases:** 50+ individual tests
**Coverage Areas:**
- ✅ Normal workflow
- ✅ Error handling
- ✅ Edge cases
- ✅ State persistence
- ✅ Race conditions
- ✅ Break integration
- ✅ Validation rules
- ✅ UI behavior

**Success Criteria:**
All scenarios must pass without errors or unexpected behavior.
