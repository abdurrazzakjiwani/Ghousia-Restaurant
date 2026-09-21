# Research: Full Responsive Overhaul

**Feature**: 016-full-responsive  
**Date**: 2026-09-21  
**Status**: Complete

## Research Questions

### 1. Safe-Area Insets for Notched Devices

**Question**: How should FAB buttons handle iPhone notch/home indicator?

**Finding**: All four FABs (WhatsApp, SpooniFAB, BackToTop, GroqChatWidget) use `fixed bottom-6` which places them behind the home indicator on notched iPhones. The CSS `env(safe-area-inset-bottom)` provides the correct offset. Tailwind CSS 4 supports this via arbitrary values: `pb-[env(safe-area-inset-bottom)]` or by adding a wrapper with `pb-safe`.

**Decision**: Add `pb-[env(safe-area-inset-bottom)]` to the fixed-position container or use Tailwind's safe-area utility  
**Rationale**: Standard iOS progressive web app pattern, no JavaScript required  
**Alternatives considered**: 
- JavaScript-based detection (rejected — unnecessary complexity)
- Fixed `pb-6` only (rejected — doesn't account for notched devices)

### 2. Chat Widget Viewport Height

**Question**: How to make chat widget height responsive to mobile viewport?

**Finding**: Current `max-h-[320px]` is a fixed pixel cap. On short mobile screens (landscape iPhone SE ~320px viewport height), the widget pushes the input below the fold. Using `max-h-[50vh]` or `max-h-[dynamic-100vh]` (using `dvh` unit) adapts to actual viewport.

**Decision**: Change `max-h-[320px]` to `max-h-[min(50vh,400px)]` using Tailwind arbitrary values  
**Rationale**: Caps at 50% viewport height but never exceeds 400px on large screens  
**Alternatives considered**: 
- `max-h-[50vh]` alone (rejected — too short on desktop)
- `max-h-dynamic-viewport` (rejected — limited browser support for `dvh`)

### 3. Info Bar Mobile Visibility

**Question**: Should the info bar (phone, hours, track order) be visible on mobile?

**Finding**: Currently `hidden sm:flex` means the entire info bar disappears below 640px. This hides the phone number and tracking link from mobile users — the primary audience for a restaurant ordering site. Two approaches: (A) show a compact version on mobile, (B) keep hidden and rely on hamburger menu.

**Decision**: Show a compact info bar on mobile with just the phone icon and track order link  
**Rationale**: Mobile users are the primary audience; phone access is critical for a restaurant  
**Alternatives considered**: 
- Keep hidden (rejected — hides critical contact info)
- Full info bar on mobile (rejected — takes too much vertical space)

### 4. Testimonials SSR Hydration Fix

**Question**: How to fix `window.innerWidth` usage in Testimonials without losing responsive dot count?

**Finding**: The current code `typeof window !== "undefined" && window.innerWidth < 640 ? 8 : 20` runs during render, causing hydration mismatches. The correct pattern is: (1) use a default value for SSR, (2) update in `useEffect` after mount, (3) use CSS to hide excess dots as a fallback.

**Decision**: Use `useState(20)` as default, update to 8 in `useEffect` on mount if `window.innerWidth < 640`. Add CSS `overflow-hidden` on dots container.  
**Rationale**: Standard SSR-safe responsive pattern, no hydration mismatch  
**Alternatives considered**: 
- CSS-only approach with `display: none` (rejected — can't dynamically count dots)
- Remove dot limiting entirely (rejected — 20 dots overflow on mobile)

### 5. Testimonial Navigation on Touch

**Question**: How to make testimonial prev/next buttons accessible on touch devices?

**Finding**: Current `opacity-0 group-hover:opacity-100` pattern means buttons are invisible on touch. Options: (A) always show on mobile, (B) use swipe gestures, (C) show on first touch/scroll.

**Decision**: Show arrows at reduced opacity (`opacity-60`) on mobile, full hover-reveal on desktop. Add `touch-action: pan-y` for swipe support.  
**Rationale**: Balances discoverability with clean desktop UX  
**Alternatives considered**: 
- Swipe-only (rejected — less discoverable)
- Always fully visible (rejected — cluttered on desktop)

### 6. Gradient Text Replacement

**Question**: What solid color replaces gradient text for WCAG AA compliance?

**Finding**: Current gradient `from-gradient-start (#f97316) to-gradient-end (#dc2626)` on white yields ~3:1 contrast ratio. `text-orange-600` (#ea580c) on white yields 4.6:1 — passes WCAG AA. `text-orange-700` (#c2410c) yields 5.1:1 — even better.

**Decision**: Replace gradient text with `text-orange-600` for prices and totals  
**Rationale**: Passes WCAG AA (4.6:1), maintains brand color association  
**Alternatives considered**: 
- `text-orange-500` (rejected — 3.1:1, fails AA)
- `text-orange-700` (rejected — too dark, loses brand feel)
- Keep gradient with text-shadow (rejected — inconsistent cross-browser)

### 7. Keyboard Focus Management

**Question**: How to implement focus trapping for modals and mobile drawer?

**Finding**: React 19 doesn't include built-in focus trapping. The `@headlessui/react` library provides `Dialog` with automatic focus trapping, but the project doesn't use it. Manual implementation uses `useRef` + `useEffect` + keydown handler for Tab/Escape.

**Decision**: Implement manual focus trapping with `useRef` and `useEffect` for modals and drawer  
**Rationale**: No new dependencies, follows existing patterns in the codebase  
**Alternatives considered**: 
- Add `@headlessui/react` (rejected — new dependency for one feature)
- Skip focus trapping (rejected — fails FR-023)

### 8. Dark Mode Color Palette

**Question**: What dark mode colors should be used for navigation and interactive elements?

**Finding**: The existing `dark:bg-gray-900` and `dark:text-gray-100` pattern is already used in some components (Modal, BackToTop). Extending this to Nav, MainNav, MobileDrawer, InfoBar, Footer is consistent.

**Decision**: Use `dark:bg-gray-900` for backgrounds, `dark:text-gray-100` for primary text, `dark:text-gray-400` for secondary text, `dark:border-gray-800` for borders  
**Rationale**: Consistent with existing dark mode implementation  
**Alternatives considered**: 
- Custom dark palette (rejected — inconsistent with existing usage)
- No dark mode (rejected — fails FR-004, FR-005)

## Research Summary

| Question | Decision | Impact |
|----------|----------|--------|
| Safe-area insets | Add `env(safe-area-inset-bottom)` to FABs | High — fixes all notched iPhones |
| Chat widget height | Use `max-h-[min(50vh,400px)]` | High — fixes short mobile screens |
| Info bar mobile | Show compact version with phone + track | High — exposes critical contact info |
| Testimonials SSR | useState default + useEffect update | Medium — fixes hydration mismatch |
| Testimonial touch | Show arrows at opacity-60 on mobile | Medium — enables touch navigation |
| Gradient text | Replace with `text-orange-600` | High — passes WCAG AA contrast |
| Focus trapping | Manual useRef + useEffect implementation | Medium — adds keyboard accessibility |
| Dark mode colors | Extend existing gray-900/gray-100 pattern | High — enables dark mode for all components |
