# Quickstart: World-Class Restaurant Website Upgrade

**Date**: 2026-09-16  
**Feature**: 006-worldclass-web

## What This Feature Does

Transforms the restaurant website from basic (1.9/5 animation score) to world-class (4.0+/5) with:

1. **Fixed chatbot scroll** — Users can read history without being snapped back
2. **Page transitions** — Smooth cross-fade between routes
3. **Loading skeletons** — Shimmer placeholders on every page
4. **Micro-interactions** — Hover scale, card lift, button feedback on everything
5. **Hero parallax** — Immersive scroll effect on home page
6. **Form animations** — Success checkmarks, error shakes, loading spinners

## Prerequisites

- Framer Motion 13.3.0 already installed in `package.json`
- Existing `src/lib/animations.ts` presets (will be expanded, not replaced)
- Existing `globals.css` with `.chat-scroll` and `prefers-reduced-motion`

## Quick Start

### 1. Chat Scroll Fix (P1 — do first)

Edit `src/components/chat/ChatWidget.tsx`:
- Add `onScroll` handler to messages container
- Track `isNearBottom` state (threshold: 100px)
- Gate auto-scroll in `useEffect([messages])` with `isNearBottom`
- Add "scroll to bottom" FAB with `AnimatePresence`

### 2. Page Transitions (P1 — do first)

Create `src/components/layout/PageTransition.tsx`:
- `"use client"` component
- Wraps children in `AnimatePresence mode="wait"`
- Uses `usePathname()` as `motion.div` key
- Fade + slight Y offset animation

Edit `src/app/layout.tsx`:
- Import and wrap `{children}` in `<PageTransition>`

### 3. Loading Skeletons (P2)

Create `src/components/ui/Skeleton.tsx`:
- Reusable skeleton with `width`, `height`, `rounded` props
- CSS shimmer animation via Tailwind classes

Create `loading.tsx` in each route directory:
- Match skeleton shapes to actual page layouts
- Next.js App Router auto-shows these during navigation

### 4. Micro-Interactions (P2)

Expand `src/lib/animations.ts`:
- Add `spring`, `springBounce`, `scaleIn`, `slideInLeft`, `slideInRight` presets

Modify components:
- `MenuCard.tsx`: Image zoom on hover, quantity bounce
- `DarkModeToggle.tsx`: Icon rotation with AnimatePresence
- `CategoryFilter.tsx`: Sliding pill with layoutId
- `OrderSummary.tsx`: AnimatePresence for item removal
- `WhatsAppButton.tsx`: Convert to motion.a

### 5. Hero & Scroll Effects (P3)

Create `src/components/ui/ScrollProgress.tsx`:
- `useScroll()` + `useTransform()` for progress bar
- 3px gradient bar fixed at viewport top

Create `src/components/ui/BackToTop.tsx`:
- Visibility state from scroll position > 500px
- `motion.button` with fadeIn/Out

Modify `src/components/home/Hero.tsx`:
- Add `useScroll({ target: heroRef })` for parallax
- Bouncing scroll-down indicator

Modify `src/components/home/AboutPreview.tsx`:
- Create `useCountUp` hook for statistics

### 6. Form Animations (P3)

Modify `src/components/contact/ContactForm.tsx`:
- Add status state machine: idle → loading → success/error
- SVG checkmark animation on success
- CSS shake on error
- Loading spinner on submit button

Modify `src/components/reviews/ReviewForm.tsx`:
- Star rating scale/pop on hover
- Success state with animated checkmark

### 7. Polish

- Run `npm run build` — verify no compilation errors
- Run `npm run lint` — verify no lint errors
- Deploy to Vercel with `--force`
- Verify `prefers-reduced-motion` disables all animations
- Test on mobile for parallax performance

## File Change Summary

| Category | New Files | Modified Files |
|----------|-----------|----------------|
| UI Components | 3 (Skeleton, ScrollProgress, BackToTop) | 5 (Button, Card, Modal, DarkModeToggle, WhatsAppButton) |
| Layout | 1 (PageTransition) | 1 (layout.tsx) |
| Home | 0 | 4 (Hero, AboutPreview, FeaturedMenu, ReviewsSection) |
| Menu | 0 | 3 (MenuCard, MenuGrid, CategoryFilter) |
| Chat | 0 | 2 (ChatWidget, ChatMessage) |
| Forms | 0 | 3 (ContactForm, ReservationForm, ReviewForm) |
| Order/Tracking | 0 | 2 (OrderSummary, OrderTracker) |
| Loading | 8 (loading.tsx files) | 0 |
| Lib/Hooks | 1 (useCountUp) | 1 (animations.ts) |
| CSS | 0 | 1 (globals.css) |
| **Total** | **13** | **22** |
