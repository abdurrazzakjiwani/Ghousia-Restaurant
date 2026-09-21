# Research: UI/UX Fixes

**Feature**: 001-ui-fixes
**Date**: 2026-09-19
**Status**: Complete

## Research Questions

All research questions were resolved during the clarification phase. No additional research needed.

### R1: Gradient Color Change Scope

**Decision**: Change gradients to white/light in light mode only; dark mode retains orange gradients.
**Rationale**: White gradients on dark backgrounds would look washed out and reduce readability. Keeping orange in dark mode maintains brand consistency where it works well.
**Alternatives considered**:
- Same gradient in both modes (rejected: poor dark mode visibility)
- Different gradients for each mode (accepted: implemented as light-only change)

### R2: Avatar Color Strategy

**Decision**: Rotating palette of 12-16 predefined colors, cycled by testimonial index.
**Rationale**: Simple, predictable, guarantees no two adjacent reviews share the same color (with proper palette design). No runtime computation needed.
**Alternatives considered**:
- Hash-based color generation (rejected: harder to control adjacent color conflicts)
- Single image for all avatars (rejected: user wanted unique avatars)

### R3: Empty Category State

**Decision**: Show "No items available in this category" message when a selected category has no available items.
**Rationale**: Clear, informative UX that tells the user what happened without breaking the layout.
**Alternatives considered**:
- Auto-switch to "All" (rejected: confusing, user loses their selection)
- Hide the category (rejected: category might have items later)

### R4: Category Filter Bug Root Cause

**Decision**: Investigate and fix the URL parameter sync issue in the menu page.
**Rationale**: The category data and filtering logic are correct in code. The bug is likely in how `useSearchParams()` or the `useEffect` syncs state with URL parameters.
**Alternatives considered**:
- N/A (this is a bug fix, not a design decision)

## Files to Modify

| File | Change | Priority |
|------|--------|----------|
| `src/app/layout.tsx` | Remove ScrollProgress import + JSX | P1 |
| `tailwind.config.ts` | Update gradient colors (light mode) | P2 |
| `src/components/home/AboutPreview.tsx` | Use updated gradient classes | P2 |
| `src/components/home/CTABanner.tsx` | Use updated gradient classes | P2 |
| `src/components/home/Testimonials.tsx` | New SVG avatar component | P2 |
| `src/app/menu/page.tsx` | Fix category filter sync | P1 |
| `src/components/order/OrderModeSelector.tsx` | Remove gradient overlay | P3 |

## No New Dependencies

All fixes use existing dependencies (Tailwind CSS, Framer Motion, React). No new packages needed.
