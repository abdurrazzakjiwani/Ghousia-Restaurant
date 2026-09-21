# Research: World-Class Restaurant Website Upgrade

**Date**: 2026-09-16  
**Feature**: 006-worldclass-web  
**Input**: Technical unknowns from spec

## Decisions

### 1. Chat Scroll Detection Strategy

**Decision**: Use `onScroll` event listener on the messages container to track scroll position, with a threshold of 100px from bottom to determine "near bottom" state.

**Rationale**: 
- The current `useEffect([messages])` unconditionally scrolls to bottom on every message array change, which snaps users back when reading history
- Need a `isNearBottom` state variable that gates auto-scroll
- A `scrollToBottom` FAB appears when `isNearBottom` is false
- This is the standard pattern used by WhatsApp Web, Telegram, and Slack

**Alternatives considered**:
- Intersection Observer on the end-of-messages div: More complex, doesn't give precise pixel distance
- CSS scroll-snap: Not suitable for chat UX, forces snap behavior
- Manual scroll position calculation with `scrollHeight - scrollTop - clientHeight`: Simple and reliable, this is what we'll use

**Implementation pattern**:
```
onScroll handler:
  scrollDistance = scrollHeight - scrollTop - clientHeight
  isNearBottom = scrollDistance < 100px

useEffect([messages]):
  if (isNearBottom) → scrollIntoView
  else → do nothing (user is reading history)
```

### 2. Page Transition Strategy

**Decision**: Use Framer Motion `AnimatePresence` wrapping a `PageTransition` client component that uses `usePathname()` as the animation key, combined with Next.js App Router's `loading.tsx` for skeleton states.

**Rationale**:
- Next.js 14 App Router supports `loading.tsx` per-route for instant skeleton display during navigation
- Framer Motion `AnimatePresence` with `mode="wait"` ensures the outgoing page animates out before the incoming page animates in
- Using `usePathname()` as the `key` on `motion.div` triggers the animation on route change
- This is the proven pattern for Next.js + Framer Motion page transitions

**Alternatives considered**:
- Next.js built-in route transitions: Not available in App Router (was only in Pages Router)
- GSAP ScrollTrigger for page transitions: Overkill, adds 30KB+ dependency
- CSS-only transitions: Cannot coordinate exit/enter animations between components
- View Transitions API: Not yet stable across all browsers (Chrome only as of 2026)

**Performance consideration**: Page transitions should be under 400ms to feel instant. Using `mode="wait"` with short durations (200-300ms) achieves this.

### 3. Loading Skeleton Architecture

**Decision**: Create a reusable `Skeleton.tsx` base component with Tailwind CSS shimmer animation via CSS `@keyframes`, then create route-specific `loading.tsx` files that compose skeleton primitives.

**Rationale**:
- Tailwind CSS `@keyframes` shimmer is performant (GPU-accelerated) and lightweight
- A single `Skeleton` component with `width`, `height`, `rounded` props covers most cases
- Route-specific `loading.tsx` files compose skeletons to match actual page layouts
- Skeletons appear instantly via Next.js App Router's built-in `loading.tsx` support

**Alternatives considered**:
- React Suspense + lazy loading: Works but doesn't provide visual skeleton feedback
- CSS `animation` with inline styles: Less maintainable than Tailwind classes
- Third-party skeleton libraries (e.g., react-loading-skeleton): Adds dependency, less control
- Framer Motion for skeleton animation: CSS animations are more performant for simple shimmer

**Skeleton shape mapping**:
- Menu page: 8 card skeletons (image rectangle + text lines)
- Home page: Hero skeleton + 4 featured card skeletons
- Contact/Reservation: Form field skeletons + button skeleton
- About: Section header skeletons + card skeletons

### 4. Micro-Interaction Animation Library

**Decision**: Expand existing `src/lib/animations.ts` with spring-based presets and add CSS keyframe animations in `globals.css` for effects that don't need Framer Motion.

**Rationale**:
- Existing presets use `easeOut` everywhere — adding spring physics makes animations feel alive
- CSS keyframes for shimmer, pulse, float effects are more performant than Framer Motion for simple loops
- Keeping all animation config centralized in `animations.ts` maintains consistency

**New presets to add**:
- `spring`: Framer Motion spring with stiffness=300, damping=24
- `springBounce`: Spring with overshoot for playful effects
- `scaleIn`: Scale from 0.8 + opacity for modal/card entrances
- `slideInLeft/Right`: Horizontal directional reveals
- `blurUp`: Opacity + blur for image reveals
- `countUp`: Number counting animation (custom hook)

**CSS keyframes to add**:
- `@keyframes shimmer`: Skeleton loading shimmer
- `@keyframes pulse-glow`: CTA button glow effect
- `@keyframes float`: Subtle floating decorative elements
- `@keyframes draw-checkmark`: SVG path animation for success states

### 5. Parallax Implementation

**Decision**: Use Framer Motion's `useScroll` and `useTransform` hooks for hero parallax, combined with `will-change: transform` CSS for GPU acceleration.

**Rationale**:
- `useScroll({ target: heroRef })` tracks scroll position relative to the hero element
- `useTransform(scrollYProgress, [0, 1], [0, -150])` maps scroll to background Y offset
- `will-change: transform` ensures the browser composites the element on a separate layer
- This is the standard Framer Motion parallax pattern

**Performance consideration**: Parallax must not cause layout thrashing. Using `transform: translateY()` only (no layout-triggering properties) ensures 60fps on mobile.

**Alternatives considered**:
- CSS `background-attachment: fixed`: Simpler but doesn't work on iOS Safari
- GSAP ScrollTrigger: More powerful but adds 30KB dependency
- Intersection Observer + CSS transforms: More complex to implement

### 6. Dark Mode Transition

**Decision**: Add CSS `transition: background-color 0.3s, color 0.3s` to the `body` and key elements, combined with Framer Motion `AnimatePresence` for the toggle icon rotation.

**Rationale**:
- The current theme switch is instant (no transition) — adding CSS transitions on background/text colors creates a smooth cross-fade
- The Sun/Moon icon swap needs `AnimatePresence` with `rotate` variant for the spin effect
- CSS transitions are more performant than Framer Motion for bulk color changes across many elements

**Implementation**:
- `body { transition: background-color 0.3s, color 0.3s }` in globals.css
- `.dark { transition: background-color 0.3s, color 0.3s }` on key containers
- Framer Motion `AnimatePresence mode="wait"` on the toggle icon with `rotate: 180` variant

### 7. Scroll Progress & Back-to-Top

**Decision**: Create a `ScrollProgress` component using Framer Motion `useScroll` + `useTransform` for the progress bar, and a `BackToTop` component using scroll position state.

**Rationale**:
- `useScroll()` gives `scrollYProgress` (0 to 1) which maps directly to progress bar width
- The progress bar uses `scaleX` transform for GPU-accelerated animation
- Back-to-top visibility is controlled by a `useState` that tracks `window.scrollY > 500`
- Both components are lightweight and don't need routing context

**Progress bar design**: Thin (3px) gradient bar fixed at top of viewport, below navbar z-index.

### 8. Menu Filter Animation

**Decision**: Use Framer Motion `AnimatePresence` with `layout` prop on menu grid items for smooth add/remove transitions when filtering by category.

**Rationale**:
- `layout` prop enables automatic layout animation when items are added/removed
- `AnimatePresence` handles exit animations when items leave the grid
- The category filter pill uses `layoutId` for a smooth sliding background indicator
- This is the canonical Framer Motion pattern for animated filtering

**Alternatives considered**:
- CSS Grid auto-fill with transitions: Doesn't handle item removal gracefully
- React Spring: More complex API for the same result
- Virtual list (react-window): Overkill for 39 menu items

### 9. Form Success/Error Animations

**Decision**: Use SVG path animation (`stroke-dasharray`/`stroke-dashoffset`) for checkmark drawing, CSS `@keyframes shake` for error states, and Framer Motion `AnimatePresence` for message entrance/exit.

**Rationale**:
- SVG path animation for checkmarks is performant and looks premium (used by Stripe, Linear)
- CSS shake animation is simple and effective for error feedback
- `AnimatePresence` with `initial={{ opacity: 0, y: 10 }}` for success/error messages

**Loading spinner**: Use a simple CSS spinner (border-based) on the submit button during loading, replacing the text "Sending..." with an animated spinner icon.

### 10. WhatsApp Button Animation

**Decision**: Convert WhatsApp button to `motion.a` with `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.95 }}`, add entrance animation with `initial={{ opacity: 0, scale: 0.8 }}` and `animate={{ opacity: 1, scale: 1 }}`.

**Rationale**:
- The WhatsApp button is a prominent CTA — it should have the same micro-interaction quality as the chat FAB
- Spring-based scale on hover gives it a "pop" feel
- Entrance animation makes it feel like it's arriving on the page

## Performance Budget

| Metric | Target | Notes |
|--------|--------|-------|
| Total JS increase | < 15KB gzipped | Framer Motion is already installed, new code is minimal |
| Animation frame rate | 60fps | All animations use transform/opacity only (composited properties) |
| Lighthouse Performance | 90+ | Skeletons and lazy loading improve perceived performance |
| Page transition duration | < 400ms | `mode="wait"` with 200-300ms durations |
| Skeleton appearance | < 100ms | Instant via Next.js `loading.tsx` |
