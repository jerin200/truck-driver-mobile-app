# Mobile Native Design Standards for Overwize Connect

## Overview
This document outlines the mobile-native design standards that should be applied consistently across all pages and components in the Overwize Connect application.

## Core Principles

### 1. Corner Radius Standardization
- **Main Cards (Container level)**: `rounded-2xl` (16px)
  - Trip cards, job cards, detail pages
- **Inner Elements/Sections**: `rounded-xl` (12px)
  - Nested cards, info sections, collapsible content
- **Small Elements**: `rounded-lg` (8px)
  - Badges, pills, small containers
- **Buttons**: `rounded-lg` to `rounded-xl` based on size

### 2. Spacing Standards

#### Container Padding
- **Main containers**: `px-5 py-5` (20px)
- **Card content**: `p-5` (20px)
- **Secondary sections**: `p-4` (16px)
- **Compact sections**: `p-3` (12px)

#### Vertical Spacing
- **Primary content spacing**: `space-y-4` (16px)
- **Section spacing**: `space-y-3` (12px)
- **Tight spacing**: `space-y-2` (8px)

#### Horizontal Spacing
- **Button groups**: `gap-3` (12px)
- **Icon + text**: `gap-2.5` to `gap-3` (10-12px)
- **Tight elements**: `gap-2` (8px)

### 3. Touch Targets (Minimum 44px)

#### Buttons
- **Primary actions**: `h-12` (48px) - Exceeds minimum
- **Secondary actions**: `h-11` (44px) - Meets minimum
- **Icon buttons**: `w-11 h-11` or `w-12 h-12`
- **Compact buttons**: `h-10` (40px) - Only for non-critical actions

#### Interactive Elements
- **List items**: Minimum `py-3` to `py-4`
- **Checkbox/Radio touch area**: At least 44px×44px
- **Links in text**: Adequate padding around

### 4. Typography

#### Headings
- **Page titles**: `text-xl` to `text-2xl` (20-24px)
- **Card titles**: `text-lg` (18px)
- **Section headings**: `text-base` (16px)
- **Small headings**: `text-sm` (14px)

#### Body Text
- **Primary content**: `text-base` (16px)
- **Secondary text**: `text-sm` (14px)
- **Metadata/labels**: `text-xs` (12px)

#### Line Heights
- Use default Tailwind line heights or specify for readability
- Critical: Never reduce line height below 1.25 for body text

### 5. Visual Feedback

#### Interactive States
- **Hover**: `hover:bg-gray-50` or appropriate color
- **Active/Tap**: `active:bg-gray-100` - Critical for mobile
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Focus**: Ensure visible focus states for accessibility

### 6. Badge Standardization
- **Standard padding**: `px-3 py-2` or `px-2.5 py-1`
- **Corner radius**: `rounded-lg`
- **Text size**: `text-xs`
- **Font weight**: `font-semibold` or `font-medium`

### 7. Status Colors (Per Design System)
- **Open**: `bg-orange-50` with `text-[#FB8C00]`
- **In Transit**: `bg-blue-100` with `text-blue-700`
- **Action Required**: `bg-[#FFEBEE]` with `text-[#E53935]`
- **Completed**: `bg-[#E8F5E9]` with `text-[#43A047]`

## Component-Specific Standards

### Cards
```tsx
// Main card container
<div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
  {/* Header section */}
  <div className="px-5 py-4 border-b border-gray-200">
    <h3 className="font-semibold text-base text-gray-900">Title</h3>
  </div>
  
  {/* Content section */}
  <div className="p-5 space-y-4">
    {/* Content here */}
  </div>
  
  {/* Action section */}
  <div className="px-5 py-5 border-t border-gray-200 flex gap-3">
    <Button className="flex-1 h-12">Primary</Button>
    <Button variant="outline" className="flex-1 h-12">Secondary</Button>
  </div>
</div>
```

### Search Inputs
```tsx
<div className="relative flex-1">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input 
    placeholder="Search..." 
    className="pl-10 h-12 rounded-xl"
  />
</div>
```

### Icon Buttons
```tsx
<Button size="icon" className="w-11 h-11 rounded-xl">
  <Icon className="w-5 h-5" />
</Button>
```

### List Items (Interactive)
```tsx
<div className="p-5 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
  {/* Content */}
</div>
```

### Stat Cards
```tsx
<div className="bg-white border border-gray-200 rounded-xl p-3">
  <p className="text-xs text-gray-500 mb-1">Label</p>
  <p className="text-sm font-bold text-gray-900">Value</p>
</div>
```

### Info Sections
```tsx
<div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
  <div className="flex justify-between">
    <span className="text-gray-600 text-base">Label</span>
    <span className="font-medium text-gray-900 text-base">Value</span>
  </div>
</div>
```

### Contact Sections
```tsx
<div className="border-t border-gray-200 bg-blue-50 p-5 space-y-4">
  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
    Contact Information
  </p>
  <div className="space-y-3">
    <div className="flex items-center gap-3 text-sm">
      <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
      <span className="font-medium text-gray-900">Contact Name</span>
    </div>
  </div>
  <div className="grid grid-cols-2 gap-3">
    <Button className="h-11">
      <Phone className="w-4 h-4 mr-2" />
      Call
    </Button>
  </div>
</div>
```

## Implementation Checklist

When updating a page/component, verify:

- [ ] Main cards use `rounded-2xl`
- [ ] Nested elements use `rounded-xl`
- [ ] Small elements use `rounded-lg`
- [ ] Container padding is `px-5 py-5` (or appropriate)
- [ ] Primary buttons are `h-12`
- [ ] Secondary buttons are `h-11`
- [ ] Icon buttons are `w-11 h-11` or `w-12 h-12`
- [ ] Card spacing is `space-y-4`
- [ ] Typography uses `text-base` for readability
- [ ] Interactive elements have `active:` states
- [ ] Icons have `flex-shrink-0` where needed
- [ ] Text containers have `min-w-0` for truncation
- [ ] Badges use consistent padding `px-3 py-2`
- [ ] Touch targets meet 44px minimum
- [ ] Gap spacing is appropriate (typically `gap-3`)

## Files to Update

### Priority 1 (Main User-Facing Pages)
- `/components/ManageTrips.tsx` - ✓ Partially completed
- `/components/JobDetailsPage.tsx` - ✓ Completed
- `/components/CreateTripPage.tsx`
- `/components/PostJobPage.tsx`
- `/components/ManagePermits.tsx`

### Priority 2 (Secondary Pages)
- `/components/ViewPermitRequest.tsx`
- `/components/NewPermitApplication.tsx`
- `/components/ListPilotCarsPage.tsx`
- `/components/PilotCarJobs.tsx`

### Priority 3 (Supporting Components)
- `/components/JobDetailsTab.tsx`
- `/components/TripInfoTab.tsx`
- `/components/TimeTrackingSection.tsx`
- All drawer/modal components

## Search & Replace Patterns

Quick fixes that can be applied globally:

1. **Main cards**: `rounded-lg` → `rounded-2xl` (for main containers)
2. **Padding**: `px-4 py-3` → `px-5 py-4` (for main sections)
3. **Padding**: `p-4` → `p-5` (for card content)
4. **Buttons**: `h-8` → `h-11`, `h-9` → `h-11`, `h-10` → `h-12`
5. **Search inputs**: `h-[45px]` → `h-12`
6. **Badge padding**: `py-1` → `py-2`
7. **Card spacing**: `space-y-3` → `space-y-4` (for main content)
8. **Gaps**: `gap-2` → `gap-3` (for button groups and flex containers)

## Notes

- These standards follow iOS Human Interface Guidelines and Material Design recommendations for mobile touch interfaces
- All measurements ensure comfortable interaction on mobile devices with varying screen sizes
- Consistent application of these standards improves usability, accessibility, and professional appearance
- When in doubt, prefer larger touch targets and more generous spacing over compact designs
