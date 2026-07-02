# Alert & Snackbar System - Mobile UX Enhancement

## 📦 Components Created

### 1. **AlertBanner Component** (`/components/ui/alert.tsx`)
Persistent, high-priority messages for critical information.

> **Note:** This component is called `AlertBanner` to avoid conflicts with the existing shadcn `Alert` component. The same file also exports the original shadcn `Alert`, `AlertTitle`, and `AlertDescription` components.

#### Props:
```typescript
interface AlertBannerProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  message: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

#### Usage:
```tsx
import { AlertBanner } from "./ui/alert";

<AlertBanner
  type="warning"
  title="Permit expires in 1 day"
  message="Review expiration dates before continuing"
  ctaLabel="View"
  onCtaClick={() => console.log("View details")}
  dismissible
  onDismiss={() => setShowAlert(false)}
/>
```

### 2. **Snackbar Component** (`/components/ui/snackbar.tsx`)
Temporary feedback messages for instant action feedback.

#### Props:
```typescript
interface SnackbarProps {
  message: string;
  type?: "info" | "warning" | "error" | "success";
  duration?: number; // milliseconds, 0 = no auto-dismiss
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  visible?: boolean;
}
```

#### Usage with Hook:
```tsx
import { useSnackbar } from "../contexts/SnackbarContext";

const { showSnackbar } = useSnackbar();

// Simple success message
showSnackbar("Permit downloaded successfully", "success", 3000);

// Error with retry action
showSnackbar(
  "Failed to download permit",
  "error",
  4000,
  "Retry",
  () => retryDownload()
);
```

### 3. **Snackbar Context** (`/contexts/SnackbarContext.tsx`)
Global snackbar management system.

## 🎨 Design System

### Alert Variants

#### ⚠️ Warning (type="warning")
- **Background**: Soft amber (bg-amber-50)
- **Border**: Amber (border-amber-200)
- **Icon**: AlertTriangle
- **Use**: Permit expiring, approaching deadlines

#### ❌ Error (type="error")
- **Background**: Soft red (bg-red-50)
- **Border**: Red (border-red-200)
- **Icon**: AlertCircle
- **Use**: Missing data, expired permits, critical issues

#### ℹ️ Info (type="info")
- **Background**: Soft blue (bg-blue-50)
- **Border**: Blue (border-blue-200)
- **Icon**: Info
- **Use**: Available jobs, helpful information

#### ✅ Success (type="success")
- **Background**: Soft green (bg-green-50)
- **Border**: Green (border-green-200)
- **Icon**: CheckCircle
- **Use**: Confirmation messages, successful actions

### Snackbar Variants

#### ✔ Success (type="success")
- **Background**: Green (bg-green-600)
- **Text**: White
- **Icon**: CheckCircle
- **Example**: "Permit downloaded successfully"

#### ❌ Error (type="error")
- **Background**: Red (bg-red-600)
- **Text**: White
- **Icon**: AlertCircle
- **Example**: "Failed to download permit [Retry]"

#### ℹ Info (type="info")
- **Background**: Blue (bg-blue-600)
- **Text**: White
- **Icon**: Info
- **Example**: "Changes saved"

#### ⚠ Warning (type="warning")
- **Background**: Amber (bg-amber-600)
- **Text**: White
- **Icon**: AlertTriangle
- **Example**: "No pilot cars selected"

## 📍 Placement Rules

### Alerts
- **Location**: Top of content area, below header
- **Behavior**: Persistent until dismissed or resolved
- **Stack**: Multiple alerts stack vertically
- **Width**: Full-width within container

### Snackbar
- **Location**: Bottom of screen (fixed position)
- **Behavior**: Auto-dismiss (2-4 seconds)
- **Stack**: One at a time (new replaces old)
- **Width**: Full-width with horizontal padding

## 🎯 When to Use What

### Use Alert When:
- ✅ User must take action
- ✅ Issue affects workflow
- ✅ Information is persistent
- ✅ Requires attention before proceeding

**Examples:**
- Permit expiring/expired
- Missing required data
- Compliance issues
- Action required states

### Use Snackbar When:
- ✅ Action just happened
- ✅ Feedback is temporary
- ✅ No decision required
- ✅ Quick confirmation needed

**Examples:**
- "Saved"
- "Download complete"
- "Request sent"
- "Failed to upload [Retry]"

## 💡 Implementation Examples

### Example 1: Permit Expiry Alert
```tsx
const [showExpiryAlert, setShowExpiryAlert] = useState(true);

{permit.daysUntilExpiry <= 1 && showExpiryAlert && (
  <AlertBanner
    type="warning"
    title={`Permit expires in ${permit.daysUntilExpiry} day`}
    message="Review expiration dates before continuing"
    ctaLabel="View Permit"
    onCtaClick={() => navigateToPermit(permit.id)}
    dismissible
    onDismiss={() => setShowExpiryAlert(false)}
  />
)}
```

### Example 2: Download Success Snackbar
```tsx
const { showSnackbar } = useSnackbar();

const handleDownload = async () => {
  try {
    await downloadPermit(permitId);
    showSnackbar("Permit downloaded successfully", "success", 3000);
  } catch (error) {
    showSnackbar(
      "Failed to download permit",
      "error",
      4000,
      "Retry",
      () => handleDownload()
    );
  }
};
```

### Example 3: Multiple Alerts Scenario
```tsx
<div className="space-y-4">
  {/* Alert 1: Critical - Permit Expired */}
  {permit.isExpired && (
    <AlertBanner
      type="error"
      title="Permit expired"
      message="Update permit to continue the trip"
      ctaLabel="Renew Now"
      onCtaClick={() => renewPermit()}
    />
  )}

  {/* Alert 2: Warning - Missing Pilot Cars */}
  {!hasPilotCarsAssigned && (
    <AlertBanner
      type="warning"
      title="No pilot cars assigned"
      message="This jurisdiction requires pilot car escorts"
      ctaLabel="Assign Now"
      onCtaClick={() => openPilotCarDrawer()}
      dismissible
      onDismiss={() => setShowPilotAlert(false)}
    />
  )}

  {/* Alert 3: Info - Available Jobs */}
  {availableJobs > 0 && (
    <AlertBanner
      type="info"
      message={`${availableJobs} pilot car jobs are available in this area`}
      ctaLabel="View"
      onCtaClick={() => viewAvailableJobs()}
      dismissible
      onDismiss={() => setShowJobsAlert(false)}
    />
  )}
</div>
```

## 🎨 Styling Consistency

### Font Sizes
- **Alert Title**: text-sm font-semibold
- **Alert Message**: text-sm
- **Alert CTA**: Button size="sm"
- **Snackbar Text**: text-sm font-medium

### Spacing
- **Alert Padding**: p-4
- **Alert Icon Spacing**: gap-3
- **Snackbar Padding**: px-4 py-3
- **Snackbar Icon Spacing**: gap-3

### Border Radius
- **Alert**: rounded-lg (8px)
- **Snackbar**: rounded-lg (8px)

### Icons
- **Alert Icons**: h-5 w-5
- **Snackbar Icons**: h-5 w-5

## ♿ Accessibility

### Alert
- ✅ `role="alert"` for screen readers
- ✅ Semantic color contrast (WCAG AA)
- ✅ Clear icon + text combination
- ✅ Keyboard accessible dismiss button
- ✅ Tap target >= 44x44px

### Snackbar
- ✅ `role="alert"` for screen readers
- ✅ `aria-live="polite"` for non-intrusive announcements
- ✅ High contrast white text on colored background
- ✅ Readable font size (14px)
- ✅ Action buttons with clear labels

## 🚀 Integration Checklist

### Step 1: Wrap App with SnackbarProvider
```tsx
// App.tsx
import { SnackbarProvider } from './contexts/SnackbarContext';

export default function App() {
  return (
    <SnackbarProvider>
      {/* Your app content */}
    </SnackbarProvider>
  );
}
```

### Step 2: Import Components
```tsx
import { AlertBanner } from "./ui/alert";
import { useSnackbar } from "../contexts/SnackbarContext";
```

### Step 3: Add Alerts to Screens
```tsx
// At the top of content area, below header
{showAlert && (
  <AlertBanner
    type="warning"
    title="Action Required"
    message="Complete all fields before submitting"
    ctaLabel="Fix Now"
    onCtaClick={handleFix}
    dismissible
    onDismiss={() => setShowAlert(false)}
  />
)}
```

### Step 4: Add Snackbar Triggers
```tsx
const { showSnackbar } = useSnackbar();

const handleSave = () => {
  // ... save logic
  showSnackbar("Changes saved successfully", "success", 3000);
};
```

## 🧪 Testing the Demo

1. Navigate to the demo screen
2. Try all alert types (info, warning, error, success)
3. Test dismiss functionality
4. Test CTA button navigation
5. Trigger snackbar messages
6. Test snackbar with action button (Retry)
7. Verify auto-dismiss timing
8. Check mobile responsiveness

## 📱 Mobile-First Considerations

- **Touch Targets**: All buttons >= 44x44px
- **Responsive Width**: Full-width with padding
- **Safe Area**: Snackbar respects bottom safe area
- **Swipe to Dismiss**: Snackbar supports swipe gesture
- **Animation**: Smooth slide-in/out transitions (300ms)
- **Z-Index**: Alert (z-10), Snackbar (z-50)

## 🎯 Key Principles

1. **Alerts = "Pay attention"** - Persistent, actionable
2. **Snackbar = "Action feedback"** - Temporary, informative
3. **Non-intrusive** - Never blocks critical UI
4. **Consistent** - Same patterns across the app
5. **Accessible** - Keyboard and screen reader friendly

## 🔧 Customization

### Custom Alert Style
```tsx
<AlertBanner
  type="info"
  message="Custom alert"
  className="shadow-xl"
/>
```

### Custom Snackbar Duration
```tsx
// Show for 5 seconds
showSnackbar("Long message", "info", 5000);

// No auto-dismiss
showSnackbar("Permanent message", "info", 0);
```

## 📊 Performance Considerations

- ✅ Minimal re-renders (context-based state)
- ✅ Efficient animations (CSS transforms)
- ✅ No layout shift (fixed positioning for snackbar)
- ✅ Lazy component mounting
- ✅ Single snackbar instance (global)

---

**✅ Implementation Complete!**

The Alert and Snackbar system is now fully integrated and ready to use across the application. No business logic has been changed—only UI feedback patterns have been enhanced.