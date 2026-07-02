# Pilot Car Rating Feature - Implementation Guide

## Overview

A clean, minimal, and professional mobile-first rating system that allows Truck Drivers to rate Pilot Cars after trip completion. The feature is designed with low visual weight, aligned with modern SaaS dashboards.

## Components

### 1. StarRating (`/components/StarRating.tsx`)
Interactive star rating component (1-5 stars) with:
- Read-only and editable modes
- Three sizes: sm, md, lg
- Optional rating value display
- Orange color scheme (#F89823) matching primary brand
- Accessible with proper ARIA labels

**Usage:**
```tsx
<StarRating 
  value={rating} 
  onChange={(value) => setRating(value)} 
  size="md" 
/>
```

### 2. RatingPromptCard (`/components/RatingPromptCard.tsx`)
Non-blocking prompt card displayed at the top of completed trip details:
- Clean card UI with subtle shadow
- Left border accent in primary orange
- "Rate Now" CTA button
- "Remind Later" option to dismiss temporarily
- Displays Trip ID and Pilot Car name

**Behavior:**
- Shows only when trip is completed and rating not submitted
- Hidden if rating already exists
- Can be dismissed (sets `ratingDismissed` flag)

### 3. PilotCarRatingDrawer (`/components/PilotCarRatingDrawer.tsx`)
Bottom drawer/sheet for submitting ratings:

**Rating Categories (All Mandatory):**
- Safety
- Driving & Compliance
- Communication
- Professionalism
- Vehicle & Equipment
- Asset Health

**Features:**
- All 6 categories must be rated before submission
- Optional comments text area
- Submit button disabled until all ratings complete
- Success confirmation with overall rating display
- Auto-closes after 2 seconds
- Calculates overall rating as average of all categories

**Low Rating Alert:**
- If overall rating ≤ 3, logs admin notification to console
- Format: "Pilot Car {Name} received a rating of {Rating}★ for Trip {ID}"

### 4. RatingDisplay (`/components/RatingDisplay.tsx`)
Shows completed rating state:
- Green checkmark icon
- "You rated this trip" label
- Star display with overall rating value
- Minimal, compact design

## Integration Points

### JobDetailsPage (`/components/JobDetailsPage.tsx`)

**Added Fields:**
```typescript
interface PilotJob {
  // ... existing fields
  rating?: {
    overallRating: number;
    submittedAt: string;
    ratingDismissed?: boolean;
  };
}
```

**Rating Logic:**
```typescript
const showRatingPrompt = 
  (jobStatus === "Completed" || acceptedBid?.jobStatus === "Completed") && 
  !jobRating?.overallRating && 
  !jobRating?.ratingDismissed &&
  acceptedBid;
```

**UI Placement:**
- Rating prompt appears at top of all tabs (when eligible)
- Rating display shows when rating submitted
- Rating drawer accessible via "Rate Now" button

### ManageTrips (`/components/ManageTrips.tsx`)

**Test Data Added:**
1. **JOB-2024-301** - Completed job without rating (shows prompt)
2. **JOB-2024-302** - Completed job with rating (shows rating display)

## User Flow

### 1. Trip Completion
When a trip status changes to "Completed" or Pilot Car ends service:
- Rating prompt card appears at top of trip details
- User sees: "Rate Your Experience"
- Two options: "Rate Now" or "Remind Later"

### 2. Rating Submission
User clicks "Rate Now":
1. Drawer opens with trip details
2. User rates all 6 categories (mandatory)
3. Optionally adds comments
4. Clicks "Submit Rating" (enabled when all rated)
5. Success screen shows for 2 seconds
6. Drawer auto-closes
7. Rating prompt replaced with rating display

### 3. Remind Later
User clicks "Remind Later":
- Sets `ratingDismissed: true` flag
- Hides prompt for this session
- Can be shown again in future (logic TBD)

## Business Rules

### Eligibility
✅ **Can Rate:**
- Truck Driver (individual account)
- Must have completed trip with assigned Pilot Car

❌ **Cannot Rate:**
- Company Admin
- Sub-admin
- Overwize Admin
- Trips without accepted bids

### Data Structure
```typescript
{
  tripId: string;           // Trip identifier
  pilotCarId: string;       // Accepted bid ID
  overallRating: number;    // 1.0 - 5.0 (avg of categories)
  categories: [
    { id: string, label: string, value: number }
  ];
  comments: string;         // Optional
  timestamp: string;        // ISO 8601
}
```

### Calculation
- Overall rating = sum of all 6 categories ÷ 6
- Rounded to 1 decimal place
- Only overall rating displayed in UI

## Edge Cases Handled

1. **Multiple Pilot Cars**: Feature supports rating per Pilot Car (single bid shown in current implementation)
2. **Duplicate Submissions**: Once submitted, prompt is hidden and rating display shown
3. **Partial Completion**: Submit button disabled until all 6 categories rated
4. **Dismiss Behavior**: "Remind Later" sets flag to hide prompt
5. **Network Errors**: Uses snackbar notifications for error handling (via SnackbarContext)

## Design Guidelines

### Visual Style
- **Minimal & Clean**: No heavy visuals, subtle shadows
- **Compact Spacing**: Mobile-first vertical layout
- **Neutral Colors**: Gray scale + primary orange (#F89823)
- **Typography**: Inter font family (existing)

### Accessibility
- ARIA labels on star buttons
- Keyboard navigation support
- Clear visual feedback for interactions
- Sufficient color contrast (WCAG AA)

### Animation
- Smooth drawer transitions
- Active state scale animation on stars (scale-90)
- Success confirmation with icon

## Admin Notifications

When overall rating ≤ 3:
```javascript
console.log({
  title: "Low Rating Alert – Pilot Car",
  message: `Pilot Car ${pilotCarName} received a rating of ${overallRating.toFixed(1)}★ for Trip ${tripId}. Please review the feedback.`
});
```

**Implementation Note**: Currently logs to console. In production, this should trigger:
- Email to admin
- In-app notification
- Dashboard alert

## Testing Scenarios

### Scenario 1: Rate Completed Trip
1. Open ManageTrips
2. Switch to "Jobs" tab
3. Filter to "Completed"
4. Click JOB-2024-301 (REQ-1015)
5. See rating prompt at top
6. Click "Rate Now"
7. Rate all 6 categories
8. Add optional comment
9. Submit
10. See success confirmation
11. Rating display replaces prompt

### Scenario 2: View Already Rated Trip
1. Open ManageTrips
2. Switch to "Jobs" tab
3. Filter to "Completed"
4. Click JOB-2024-302 (REQ-1016)
5. See rating display (4.8★)
6. No rating prompt shown

### Scenario 3: Dismiss Rating Prompt
1. Open completed trip with rating prompt
2. Click "Remind Later"
3. Prompt disappears
4. Re-open trip (prompt still hidden)

## Future Enhancements

1. **Persistent Dismiss**: Track dismissed ratings in backend
2. **Re-prompt Logic**: Show dismissed prompts after X days
3. **Rating History**: View all submitted ratings
4. **Admin Dashboard**: Analytics for low ratings
5. **Push Notifications**: Remind drivers to rate
6. **Pilot Car Response**: Allow Pilot Cars to respond to ratings
7. **Rating Trends**: Show rating trends over time

## File Changes Summary

### New Files
- `/components/StarRating.tsx`
- `/components/RatingPromptCard.tsx`
- `/components/PilotCarRatingDrawer.tsx`
- `/components/RatingDisplay.tsx`

### Modified Files
- `/components/JobDetailsPage.tsx` - Added rating integration
- `/components/ManageTrips.tsx` - Added rating field to interface + test data

### Integration Points
- Uses existing SnackbarContext for notifications
- Uses existing drawer/sheet components from shadcn
- Follows existing design patterns and color scheme
