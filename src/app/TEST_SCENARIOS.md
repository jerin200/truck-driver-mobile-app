# Trip Execution - Test Scenarios

## Test Environment Setup

### Prerequisites
1. Browser with localStorage enabled
2. Console open to view pilot car notification logs
3. Test trips with different permit statuses

### Test Data Available

**Trip #1 (REQ-1001)** - Can start immediately
- Status: Open
- First Jurisdiction: NY (Permit: Approved)
- States: NY, NJ, PA, CT, MA, MD, VA, NC, SC, GA, FL

**Trip #2 (REQ-1002)** - Cannot start (permits not approved)
- Status: Open
- First Jurisdiction: WA (Permit: Not Applied)
- States: WA, OR, CA

**Trip #2B (REQ-1002B)** - Can start immediately
- Status: Open
- First Jurisdiction: CA (Permit: Approved)
- States: CA (single jurisdiction)

---

## Test Suite 1: Start Trip Validation

### Test 1.1: Start Trip Successfully
**Setup:**
- Select Trip #1 (REQ-1001)
- Status: Open
- First jurisdiction: NY (Approved)

**Steps:**
1. Navigate to Trips tab
2. Click on Trip #1
3. Observe "Slide to Start Trip" button at bottom
4. Swipe right to complete slide
5. Observe confirmation drawer
6. Click "Start Trip"

**Expected Results:**
- ✅ Trip status changes to "In Transit"
- ✅ Trip moves from Open tab to In Transit tab
- ✅ Toast: "Trip started successfully - Now in transit through NY"
- ✅ Console logs: "Pilot car notifications sent for NY"
- ✅ Actions tab shows "Start Break" button
- ✅ Actions tab shows "Complete NY Jurisdiction" button

**Actual Results:** [ PASS / FAIL ]

---

### Test 1.2: Cannot Start Trip Without Approved Permit
**Setup:**
- Select Trip #2 (REQ-1002)
- Status: Open
- First jurisdiction: WA (Not Applied)

**Steps:**
1. Navigate to Trips tab
2. Click on Trip #2
3. Scroll to bottom footer

**Expected Results:**
- ✅ No "Slide to Start Trip" button shown
- ✅ Warning message displayed:
  - "⚠️ Cannot Start Trip"
  - "The first jurisdiction must have an approved permit before you can start the trip."
- ✅ Warning has amber/yellow background
- ✅ AlertCircle icon shown

**Actual Results:** [ PASS / FAIL ]

---

### Test 1.3: Cannot Start Trip Twice
**Setup:**
- Trip already started (Status: In Transit)

**Steps:**
1. Start Trip #1 successfully
2. Refresh page
3. Open same trip
4. Check footer

**Expected Results:**
- ✅ No "Slide to Start Trip" button
- ✅ No warning message
- ✅ Instead shows "Slide to Stop Trip" button

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 2: Break Time Tracking

### Test 2.1: Start Break During Trip
**Setup:**
- Trip #1 in "In Transit" status
- No active break

**Steps:**
1. Navigate to Trip #1
2. Go to Actions tab
3. Find "Start Break" button in Quick Actions
4. Click "Start Break"

**Expected Results:**
- ✅ Blue "Break in Progress" card appears above Quick Actions
- ✅ Card shows:
  - Animated timer icon (pulse animation)
  - "Break in Progress" title
  - "Jurisdiction timer paused" subtitle
  - "End Break" button
- ✅ Toast: "Break started - Jurisdiction timer paused"
- ✅ "Complete NY Jurisdiction" button becomes disabled
- ✅ "Start Break" button text changes to "Break Active"

**Actual Results:** [ PASS / FAIL ]

---

### Test 2.2: End Break
**Setup:**
- Trip #1 in "In Transit" status
- Break currently active

**Steps:**
1. Wait 30 seconds after starting break
2. Click "End Break" button in blue card

**Expected Results:**
- ✅ Blue break card disappears
- ✅ Toast: "Break ended - Break duration: [TIME]" (e.g., "30s" or "1m")
- ✅ "Complete NY Jurisdiction" button becomes enabled
- ✅ "Start Break" button text changes back to "Start Break"

**Actual Results:** [ PASS / FAIL ]

---

### Test 2.3: Cannot Start Break When Trip Not Started
**Setup:**
- Trip #1 in "Open" status

**Steps:**
1. Navigate to Trip #1
2. Go to Actions tab
3. Look for "Start Break" button

**Expected Results:**
- ✅ "Start Break" button NOT visible
- ✅ Only shows: Request Route/Time Change, Log Incident, Download Permits

**Actual Results:** [ PASS / FAIL ]

---

### Test 2.4: Cannot Start Break Twice
**Setup:**
- Trip #1 in "In Transit" status
- Break already active

**Steps:**
1. Start a break
2. Try to click "Start Break" button again

**Expected Results:**
- ✅ "Start Break" button is disabled
- ✅ Button text shows "Break Active"
- ✅ Button appears grayed out

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 3: Jurisdiction Completion

### Test 3.1: Complete First Jurisdiction
**Setup:**
- Trip #1 in "In Transit" status
- NY jurisdiction active
- No active break

**Steps:**
1. Navigate to Trip #1
2. Go to Actions tab
3. Find "Complete NY Jurisdiction" button
4. Click the button

**Expected Results:**
- ✅ Toast: "NY completed - Now active in NJ"
- ✅ Console logs: "Pilot car notifications sent for NJ"
- ✅ Button text changes to "Complete NJ Jurisdiction"
- ✅ NY marked as completed in jurisdiction list

**Actual Results:** [ PASS / FAIL ]

---

### Test 3.2: Complete Middle Jurisdiction
**Setup:**
- Trip #1 in "In Transit" status
- NJ jurisdiction active (NY already completed)

**Steps:**
1. Complete NY jurisdiction (from Test 3.1)
2. Click "Complete NJ Jurisdiction"

**Expected Results:**
- ✅ Toast: "NJ completed - Now active in PA"
- ✅ Console logs: "Pilot car notifications sent for PA"
- ✅ Button text changes to "Complete PA Jurisdiction"

**Actual Results:** [ PASS / FAIL ]

---

### Test 3.3: Complete Last Jurisdiction (Trip Completion)
**Setup:**
- Trip #2B (single jurisdiction: CA)
- CA jurisdiction active

**Steps:**
1. Start Trip #2B
2. Complete CA jurisdiction

**Expected Results:**
- ✅ Toast: "Trip completed! - All jurisdictions have been completed"
- ✅ Trip status changes to "Completed"
- ✅ Trip moves from "In Transit" tab to "Completed" tab
- ✅ Actions tab shows completion summary instead of quick actions

**Actual Results:** [ PASS / FAIL ]

---

### Test 3.4: Cannot Complete Jurisdiction During Break
**Setup:**
- Trip #1 in "In Transit" status
- Break active

**Steps:**
1. Start a break
2. Try to click "Complete NY Jurisdiction" button

**Expected Results:**
- ✅ Button is disabled (grayed out)
- ✅ Button cannot be clicked
- ✅ No action occurs

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 4: Pilot Car Notifications

### Test 4.1: Notifications on Trip Start
**Setup:**
- Trip #1 in "Open" status
- Console open

**Steps:**
1. Start Trip #1
2. Observe console logs

**Expected Results:**
- ✅ Console log: "Pilot car notifications sent for NY: [...]"
- ✅ Notification object contains:
  - tripId: "REQ-1001"
  - jurisdictionCode: "NY"
  - role: "Lead" (or similar)
  - sentAt: [current timestamp]
  - status: "sent"

**Actual Results:** [ PASS / FAIL ]

---

### Test 4.2: Notifications on Jurisdiction Completion
**Setup:**
- Trip #1 in "In Transit" status
- NY jurisdiction active
- Console open

**Steps:**
1. Complete NY jurisdiction
2. Observe console logs

**Expected Results:**
- ✅ Console log: "Pilot car notifications sent for NJ: [...]"
- ✅ Notification object contains:
  - tripId: "REQ-1001"
  - jurisdictionCode: "NJ"
  - role: "Lead" (or similar)
  - sentAt: [current timestamp]
  - status: "sent"

**Actual Results:** [ PASS / FAIL ]

---

### Test 4.3: No Manual Notification Controls in UI
**Setup:**
- Any trip in any status

**Steps:**
1. Navigate through all tabs
2. Check Quick Actions menu
3. Check all drawers and modals

**Expected Results:**
- ✅ No "Notify Pilot Cars" button anywhere
- ✅ No "Send Notification" option
- ✅ No manual notification controls visible
- ✅ Notifications are 100% automatic

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 5: State Persistence

### Test 5.1: Persist Trip Start
**Setup:**
- Trip #1 in "Open" status

**Steps:**
1. Start Trip #1
2. Wait for trip to be "In Transit"
3. Refresh the browser page
4. Navigate to Trip #1

**Expected Results:**
- ✅ Trip still shows status "In Transit"
- ✅ Trip is in "In Transit" tab
- ✅ NY jurisdiction still active
- ✅ "Complete NY Jurisdiction" button visible
- ✅ All state preserved

**Actual Results:** [ PASS / FAIL ]

---

### Test 5.2: Persist Active Break
**Setup:**
- Trip #1 in "In Transit" status
- Break started

**Steps:**
1. Start a break
2. Wait 1 minute
3. Refresh the browser page
4. Navigate to Trip #1
5. Go to Actions tab

**Expected Results:**
- ✅ Blue "Break in Progress" card still visible
- ✅ "End Break" button available
- ✅ Break still marked as active
- ✅ Can end break normally

**Actual Results:** [ PASS / FAIL ]

---

### Test 5.3: Persist Jurisdiction Progress
**Setup:**
- Trip #1 in "In Transit" status
- NY jurisdiction completed

**Steps:**
1. Complete NY jurisdiction
2. NJ becomes active
3. Refresh the browser page
4. Navigate to Trip #1

**Expected Results:**
- ✅ NY still marked as completed
- ✅ NJ still marked as active
- ✅ Button text: "Complete NJ Jurisdiction"
- ✅ Progress preserved

**Actual Results:** [ PASS / FAIL ]

---

### Test 5.4: Persist Break History
**Setup:**
- Trip #1 in "In Transit" status

**Steps:**
1. Start a break
2. Wait 1 minute
3. End break
4. Refresh the browser page
5. Open browser console
6. Run: `JSON.parse(localStorage.getItem('trip_execution_REQ-1001')).breaks`

**Expected Results:**
- ✅ Break record exists in storage
- ✅ Break has startTime, endTime, duration
- ✅ Duration approximately 60 seconds

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 6: Error Handling & Validation

### Test 6.1: End Trip During Active Break
**Setup:**
- Trip #1 in "In Transit" status
- Break active

**Steps:**
1. Start a break
2. Try to click "End Trip" button

**Expected Results:**
- ✅ "End Trip" button is disabled
- ✅ Button cannot be clicked
- ✅ No action occurs

**Actual Results:** [ PASS / FAIL ]

---

### Test 6.2: Validation Error Messages
**Setup:**
- Various invalid states

**Steps:**
Test different invalid actions

**Expected Results:**
All validation rules enforced:
- ✅ Cannot start trip without approved permit → Warning shown
- ✅ Cannot start break when not in transit → Button not visible
- ✅ Cannot start break twice → Button disabled
- ✅ Cannot end break when no break active → Not applicable (button in card)
- ✅ Cannot complete jurisdiction during break → Button disabled
- ✅ Cannot end trip during break → Button disabled

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 7: UI/UX Integration

### Test 7.1: Break Status Card Appearance
**Setup:**
- Trip #1 in "In Transit" status

**Steps:**
1. Start a break
2. Observe the break status card

**Expected Results:**
- ✅ Card has blue background (bg-blue-50)
- ✅ Card has blue border (border-blue-200)
- ✅ Timer icon is animated (animate-pulse class)
- ✅ Text is blue (text-blue-900, text-blue-700)
- ✅ "End Break" button is blue (bg-blue-600)
- ✅ Card appears ABOVE Quick Actions section
- ✅ Card is visually distinct and noticeable

**Actual Results:** [ PASS / FAIL ]

---

### Test 7.2: Button States
**Setup:**
- Various trip states

**Steps:**
Check button appearances in different states

**Expected Results:**
- ✅ Enabled buttons: Full color, clickable
- ✅ Disabled buttons: Grayed out, not clickable
- ✅ Loading state: Buttons show loading indicator (if applicable)
- ✅ Icons properly aligned (mr-3 spacing)
- ✅ Text properly aligned (text-gray-900)

**Actual Results:** [ PASS / FAIL ]

---

### Test 7.3: Toast Notifications
**Setup:**
- Track all toast notifications

**Steps:**
1. Start trip → Check toast
2. Start break → Check toast
3. End break → Check toast
4. Complete jurisdiction → Check toast
5. Complete last jurisdiction → Check toast

**Expected Results:**
All toasts appear with:
- ✅ "Trip started successfully - Now in transit through NY"
- ✅ "Break started - Jurisdiction timer paused"
- ✅ "Break ended - Break duration: [TIME]"
- ✅ "NY completed - Now active in NJ"
- ✅ "Trip completed! - All jurisdictions have been completed"

**Actual Results:** [ PASS / FAIL ]

---

### Test 7.4: Responsive Layout
**Setup:**
- Test on different screen sizes

**Steps:**
1. View on desktop (1920x1080)
2. View on tablet (768x1024)
3. View on mobile (375x667)

**Expected Results:**
- ✅ Break card responsive on all sizes
- ✅ Buttons stack properly on mobile
- ✅ Text doesn't overflow
- ✅ Icons visible and aligned
- ✅ No horizontal scrolling

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 8: Edge Cases

### Test 8.1: Rapid Action Clicks
**Setup:**
- Trip #1 in "In Transit" status

**Steps:**
1. Click "Start Break" rapidly 5 times
2. Click "Complete Jurisdiction" rapidly 5 times

**Expected Results:**
- ✅ Only one action processed
- ✅ No duplicate breaks created
- ✅ No duplicate completions
- ✅ isLoading flag prevents duplicate calls

**Actual Results:** [ PASS / FAIL ]

---

### Test 8.2: Very Long Break Duration
**Setup:**
- Trip #1 in "In Transit" status

**Steps:**
1. Start a break
2. Wait 10 minutes (or use browser time manipulation)
3. End break

**Expected Results:**
- ✅ Duration calculated correctly
- ✅ Toast shows proper duration (e.g., "10m")
- ✅ Break logged with correct duration
- ✅ Jurisdiction timer excludes break time

**Actual Results:** [ PASS / FAIL ]

---

### Test 8.3: Complete All Jurisdictions Sequentially
**Setup:**
- Trip #1 with 11 jurisdictions

**Steps:**
1. Start trip
2. Complete NY
3. Complete NJ
4. Complete PA
5. Continue for all 11 jurisdictions
6. Observe final jurisdiction completion

**Expected Results:**
- ✅ Each completion activates next jurisdiction
- ✅ Pilot cars notified for each jurisdiction (check console)
- ✅ Final completion changes trip to "Completed"
- ✅ All 11 jurisdictions marked as completed
- ✅ Trip history shows all completions

**Actual Results:** [ PASS / FAIL ]

---

## Test Suite 9: Browser Compatibility

### Test 9.1: Chrome
- [ ] All test suites pass in Chrome

### Test 9.2: Firefox
- [ ] All test suites pass in Firefox

### Test 9.3: Safari
- [ ] All test suites pass in Safari

### Test 9.4: Edge
- [ ] All test suites pass in Edge

---

## Test Suite 10: Performance

### Test 10.1: localStorage Performance
**Setup:**
- Create 10 trips in various states

**Steps:**
1. Start all 10 trips
2. Take breaks in all 10 trips
3. Complete jurisdictions in all 10 trips
4. Check localStorage size

**Expected Results:**
- ✅ localStorage not exceeded
- ✅ All trip states saved
- ✅ No performance degradation
- ✅ State loads quickly

**Actual Results:** [ PASS / FAIL ]

---

## Test Results Summary

| Test Suite | Tests | Passed | Failed | Notes |
|------------|-------|--------|--------|-------|
| 1. Start Trip Validation | 3 | | | |
| 2. Break Time Tracking | 4 | | | |
| 3. Jurisdiction Completion | 4 | | | |
| 4. Pilot Car Notifications | 3 | | | |
| 5. State Persistence | 4 | | | |
| 6. Error Handling | 2 | | | |
| 7. UI/UX Integration | 4 | | | |
| 8. Edge Cases | 3 | | | |
| 9. Browser Compatibility | 4 | | | |
| 10. Performance | 1 | | | |
| **TOTAL** | **32** | | | |

---

## Critical Bugs Found

1. **Bug ID:** 
   - **Description:** 
   - **Severity:** [ Critical / High / Medium / Low ]
   - **Steps to Reproduce:** 
   - **Expected:** 
   - **Actual:** 

---

## Test Environment Info

- **Date Tested:** 
- **Tester:** 
- **Browser:** 
- **OS:** 
- **Screen Size:** 
- **App Version:** 
- **Notes:** 

---

## Sign-off

- [ ] All critical tests passed
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Ready for production

**QA Lead Signature:** ________________  **Date:** ________
