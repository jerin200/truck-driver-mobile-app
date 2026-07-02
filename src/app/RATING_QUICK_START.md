# Pilot Car Rating Feature - Quick Start Guide

## 🚀 Quick Test (5 Minutes)

### Step 1: Open the App
```
Navigate to: Manage Trips → Jobs Tab
```

### Step 2: Filter to Completed Jobs
```
Click the "Completed" filter button
```

### Step 3: Test Rating Prompt
```
Click: JOB-2024-301 (REQ-1015 - Denver to Salt Lake City)
✅ You should see: Orange "Rate Your Experience" card at top
```

### Step 4: Submit a Rating
```
1. Click "Rate Now"
2. Rate all 6 categories (tap stars)
3. (Optional) Add a comment
4. Click "Submit Rating"
5. ✅ Success! Rating display replaces prompt
```

### Step 5: View Completed Rating
```
Go back → Click: JOB-2024-302 (REQ-1016 - Phoenix to Las Vegas)
✅ You should see: "You rated this trip: ⭐ 4.8" (no prompt)
```

---

## 📋 Component Quick Reference

### Import Components
```tsx
import { StarRating } from "./components/StarRating";
import { RatingPromptCard } from "./components/RatingPromptCard";
import { PilotCarRatingDrawer } from "./components/PilotCarRatingDrawer";
import { RatingDisplay } from "./components/RatingDisplay";
```

### 1. StarRating
```tsx
<StarRating 
  value={rating}              // number (0-5)
  onChange={(val) => ...}     // function
  size="md"                   // "sm" | "md" | "lg"
  readonly={false}            // boolean
  showValue={false}           // boolean
/>
```

### 2. RatingPromptCard
```tsx
<RatingPromptCard
  tripId="REQ-1001"           // string
  pilotCarName="ABC Escorts"  // string
  onRateNow={() => ...}       // function
  onDismiss={() => ...}       // function (optional)
/>
```

### 3. PilotCarRatingDrawer
```tsx
<PilotCarRatingDrawer
  open={isOpen}               // boolean
  onOpenChange={setOpen}      // function
  tripId="REQ-1001"           // string
  pilotCarId="BID-123"        // string
  pilotCarName="ABC Escorts"  // string
  onSubmitSuccess={(rating) => ...} // function
/>
```

### 4. RatingDisplay
```tsx
<RatingDisplay
  rating={4.8}                // number (1-5)
  size="sm"                   // "sm" | "md" | "lg"
  showLabel={true}            // boolean
/>
```

---

## 🎯 Integration Checklist

### In Your Job Details Component:

#### 1. Add Rating Field to Interface
```typescript
interface Job {
  // ... existing fields
  rating?: {
    overallRating: number;
    submittedAt: string;
    ratingDismissed?: boolean;
  };
}
```

#### 2. Add State
```typescript
const [ratingDrawerOpen, setRatingDrawerOpen] = useState(false);
const [jobRating, setJobRating] = useState(job.rating);
```

#### 3. Add Logic
```typescript
const acceptedBid = job.bids.find(b => b.status === 'Accepted');

const showRatingPrompt = 
  (job.status === "Completed" || acceptedBid?.jobStatus === "Completed") && 
  !jobRating?.overallRating && 
  !jobRating?.ratingDismissed &&
  acceptedBid;
```

#### 4. Add Handlers
```typescript
const handleRatingSubmit = (rating) => {
  setJobRating({
    overallRating: rating.overallRating,
    submittedAt: rating.timestamp,
  });
  // Update parent component, save to backend, etc.
};

const handleDismissRating = () => {
  setJobRating({ ...jobRating, ratingDismissed: true });
  // Save dismiss state to backend
};
```

#### 5. Add to JSX
```tsx
{/* Rating Prompt */}
{showRatingPrompt && (
  <RatingPromptCard
    tripId={job.tripId}
    pilotCarName={acceptedBid.companyName}
    onRateNow={() => setRatingDrawerOpen(true)}
    onDismiss={handleDismissRating}
  />
)}

{/* Rating Display */}
{jobRating?.overallRating && (
  <RatingDisplay rating={jobRating.overallRating} />
)}

{/* Rating Drawer */}
{acceptedBid && (
  <PilotCarRatingDrawer
    open={ratingDrawerOpen}
    onOpenChange={setRatingDrawerOpen}
    tripId={job.tripId}
    pilotCarId={acceptedBid.id}
    pilotCarName={acceptedBid.companyName}
    onSubmitSuccess={handleRatingSubmit}
  />
)}
```

---

## 🔧 Common Customizations

### Change Star Color
```tsx
// In StarRating.tsx, line ~42
fill-[#YOUR_COLOR] text-[#YOUR_COLOR]
```

### Change Rating Categories
```tsx
// In PilotCarRatingDrawer.tsx, line ~47-52
const [categories, setCategories] = useState([
  { id: "safety", label: "Your Label", value: 0 },
  // ... add/remove categories
]);
```

### Change Low Rating Threshold
```tsx
// In PilotCarRatingDrawer.tsx, line ~78
if (overallRating <= 3) {  // Change to 2.5, 4, etc.
  // Trigger alert
}
```

---

## 🐛 Troubleshooting

### Rating Prompt Not Showing?
**Check:**
1. ✅ Is `job.status === "Completed"` OR `acceptedBid.jobStatus === "Completed"`?
2. ✅ Does `acceptedBid` exist?
3. ✅ Is `jobRating?.overallRating` undefined?
4. ✅ Is `jobRating?.ratingDismissed` false or undefined?

### Submit Button Disabled?
**Check:**
1. ✅ Have all 6 categories been rated (value > 0)?
2. ✅ Look at state: `categories.every(cat => cat.value > 0)`

### Rating Drawer Won't Open?
**Check:**
1. ✅ Is `ratingDrawerOpen` state set to `true`?
2. ✅ Is `acceptedBid` defined?
3. ✅ Check browser console for errors

### Low Rating Alert Not Showing?
**Check:**
1. ✅ Open browser console (F12)
2. ✅ Submit rating with overall ≤ 3.0
3. ✅ Look for console.log message

---

## 📱 Mobile Testing Tips

### Test Responsive Design
```
1. Open Chrome DevTools (F12)
2. Click mobile device icon (Ctrl+Shift+M)
3. Set device to iPhone 12 Pro (390px) or Pixel 5 (393px)
4. Test all interactions
```

### Common Mobile Widths
- **iPhone SE:** 375px
- **iPhone 12/13:** 390px
- **iPhone 14 Pro Max:** 430px
- **Android (Pixel 5):** 393px

---

## 🎨 Design Tokens

### Colors
```css
Primary Orange: #F89823
Text Dark: #1a1a1a
Success Green: #2E7D32 (from Tailwind)
Gray Scale: Tailwind defaults
```

### Spacing
```
Card Padding: p-4 (16px)
Gap: gap-2 (8px), gap-3 (12px), gap-4 (16px)
Rounded: rounded-lg (8px)
```

### Typography
```
Font Family: Inter (system default)
Sizes: text-sm (14px), text-base (16px)
Weights: font-medium (500), font-semibold (600)
```

---

## 📊 Data Flow

```
User clicks "Rate Now"
    ↓
PilotCarRatingDrawer opens
    ↓
User rates 6 categories
    ↓
User clicks "Submit Rating"
    ↓
PilotCarRatingDrawer:
  - Calculates overall rating
  - Checks if rating ≤ 3 (low rating alert)
  - Calls onSubmitSuccess(rating)
  - Shows success screen (2 sec)
  - Auto-closes drawer
    ↓
Parent Component:
  - Receives rating via onSubmitSuccess
  - Updates jobRating state
  - Hides prompt, shows RatingDisplay
  - (Optional) Saves to backend
```

---

## 🧪 Testing Checklist

- [ ] Rating prompt appears for completed trips
- [ ] "Rate Now" opens drawer correctly
- [ ] All 6 rating categories work
- [ ] Submit disabled when incomplete
- [ ] Submit enabled when all rated
- [ ] Comments field accepts text
- [ ] Success screen displays
- [ ] Drawer auto-closes after 2 sec
- [ ] Rating display replaces prompt
- [ ] "Remind Later" dismisses prompt
- [ ] Dismissed prompt stays hidden
- [ ] Low rating (≤3) logs to console
- [ ] Mobile responsive at 375px
- [ ] Keyboard navigation works
- [ ] Star rating accessible

---

## 💡 Pro Tips

1. **Use Demo Page**: Test components in isolation at `/components/RatingFeatureDemo.tsx`
2. **Console Logging**: Check browser console for low rating alerts
3. **State Persistence**: Currently in-memory only. Add backend integration for persistence.
4. **Multiple Pilot Cars**: Feature supports it via `pilotCarId` parameter
5. **Customization**: All components are modular and customizable

---

## 📚 Full Documentation

- **Comprehensive Guide:** `/RATING_FEATURE_GUIDE.md`
- **Implementation Summary:** `/RATING_IMPLEMENTATION_SUMMARY.md`
- **This Quick Start:** `/RATING_QUICK_START.md`

---

## ❓ Need Help?

**Common Questions:**

**Q: How do I integrate with backend?**
A: In `handleRatingSubmit`, add API call to save rating. Example:
```tsx
const handleRatingSubmit = async (rating) => {
  await fetch('/api/ratings', {
    method: 'POST',
    body: JSON.stringify(rating)
  });
  setJobRating({...});
};
```

**Q: How do I customize rating categories?**
A: Edit `PilotCarRatingDrawer.tsx`, line 47-52. Add/remove categories as needed.

**Q: Can I disable "Remind Later"?**
A: Yes. In `RatingPromptCard`, don't pass `onDismiss` prop:
```tsx
<RatingPromptCard
  tripId={...}
  pilotCarName={...}
  onRateNow={...}
  // No onDismiss prop = no "Remind Later" button
/>
```

**Q: How do I test low rating alerts?**
A: Rate all categories 2 or 3 stars. Check browser console for log message.

---

**Last Updated:** February 24, 2026
**Version:** 1.0.0
