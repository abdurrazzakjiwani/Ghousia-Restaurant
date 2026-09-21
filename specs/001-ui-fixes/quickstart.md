# Quickstart: UI/UX Fixes

**Feature**: 001-ui-fixes
**Date**: 2026-09-19

## Setup

No setup changes needed. This feature uses existing project dependencies.

## File Changes Summary

### 1. Remove Scroll Progress Bar (P1)

**File**: `src/app/layout.tsx`
- Remove `import ScrollProgress from "@/components/ui/ScrollProgress";`
- Remove `<ScrollProgress />` from JSX

### 2. Change Gradient Colors (P2)

**File**: `tailwind.config.ts`
- Update `gradient.start` from `#f59e0b` to `#f5f5f5` (light gray)
- Update `gradient.end` from `#ea580c` to `#e5e5e5` (slightly darker light gray)
- Add dark mode override to keep orange gradients

**Files**: `AboutPreview.tsx`, `CTABanner.tsx`
- No code changes needed (they use `from-gradient-start to-gradient-end` classes)

### 3. SVG Avatars for Testimonials (P2)

**File**: `src/components/home/Testimonials.tsx`
- Replace `SketchAvatar` component with SVG-based avatar
- Define rotating color palette (12-16 colors)
- Assign colors by testimonial index using modulo operation

**Color Palette Example**:
```typescript
const avatarColors = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16",
  "#f97316", "#6366f1", "#14b8a6", "#e11d48",
];
```

### 4. Fix Category Filter Bug (P1)

**File**: `src/app/menu/page.tsx`
- Ensure `useEffect` properly syncs `selectedCategory` with `categoryParam` from URL
- Add empty state handling for categories with no available items

### 5. Remove Order Mode Gradient (P3)

**File**: `src/components/order/OrderModeSelector.tsx`
- Remove the `motion.div` gradient overlay (lines 54-59)
- Keep border styling for selection indicator

## Testing Checklist

- [ ] Visit any page: no progress bar visible
- [ ] Homepage light mode: Our Story box uses white/light gradient
- [ ] Homepage light mode: Ready to Order section uses white/light gradient
- [ ] Homepage dark mode: Both sections retain orange gradients
- [ ] Menu page: click each category, correct items display
- [ ] Menu page: invalid URL category defaults to All
- [ ] Menu page: empty category shows "No items available" message
- [ ] Testimonials: each avatar has unique color
- [ ] Testimonials: no two adjacent reviews share same color
- [ ] Checkout: order mode selection has clean border, no gradient overlay
- [ ] Build passes with no new errors

## Deployment

```bash
npm run lint
npm run build
npx vercel --prod --yes
```
