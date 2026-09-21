# Implementation Plan: World-Class Restaurant Website Upgrade

**Branch**: `006-worldclass-web` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-worldclass-web/spec.md`

## Summary

Transform the Ghousia Golden Spoon restaurant website from a basic functional site (animation score 1.9/5) into a world-class, premium experience (target 4.0+/5). This involves fixing the broken chatbot scroll UX, adding page transitions, loading skeletons, micro-interactions, parallax effects, form animations, and scroll-based UI elements. Uses Framer Motion (already installed) for React animation orchestration and CSS keyframes for performance-critical loops.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0 (existing)
**Storage**: N/A (no new data entities)
**Testing**: Manual browser testing, Lighthouse performance audit
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile responsive
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: 60fps animations, all transitions under 400ms, Lighthouse score 90+
**Constraints**: Must respect `prefers-reduced-motion`, no regression on existing features, total JS increase < 15KB gzipped
**Scale/Scope**: ~20 files modified, 5 new files created, 6 user stories, 20 functional requirements

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a template (not customized for this project). No specific gates to enforce. Standard quality practices apply:
- All code must follow existing TypeScript conventions
- No new external dependencies beyond what's already installed (Framer Motion)
- All existing functionality must continue to work
- Animations must respect `prefers-reduced-motion`

## Project Structure

### Documentation (this feature)

```text
specs/006-worldclass-web/
├── plan.md              # This file
├── research.md          # Phase 0 output (10 technical decisions)
├── data-model.md        # Phase 1 output (no new entities)
├── quickstart.md        # Phase 1 output
├── checklists/          # Spec quality checklists
│   └── requirements.md
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx                    # MODIFY: Add parallax scroll effect
│   │   ├── AboutPreview.tsx            # MODIFY: Add number counter animation
│   │   ├── FeaturedMenu.tsx            # MODIFY: Enhance card hover animations
│   │   ├── Testimonials.tsx            # MODIFY: Add star animation
│   │   └── ReviewsSection.tsx          # MODIFY: Add review stagger + skeleton
│   ├── chat/
│   │   ├── ChatWidget.tsx              # MODIFY: Fix scroll detection + FAB
│   │   └── ChatMessage.tsx             # MODIFY: Enhance message entrance
│   ├── menu/
│   │   ├── MenuCard.tsx                # MODIFY: Enhance hover + add-to-cart animation
│   │   ├── MenuGrid.tsx                # MODIFY: Add AnimatePresence layout filter
│   │   └── CategoryFilter.tsx          # MODIFY: Add sliding pill indicator
│   ├── layout/
│   │   ├── Navbar.tsx                  # MODIFY: Add mobile menu animation
│   │   └── Footer.tsx                  # MODIFY: Add column stagger
│   ├── ui/
│   │   ├── Button.tsx                  # MODIFY: Add loading spinner prop
│   │   ├── Card.tsx                    # MODIFY: Enhance hover
│   │   ├── Modal.tsx                   # MODIFY: Add AnimatePresence open/close
│   │   ├── DarkModeToggle.tsx          # MODIFY: Add icon rotation animation
│   │   ├── WhatsAppButton.tsx          # MODIFY: Convert to motion.a
│   │   ├── ScrollProgress.tsx          # NEW: Scroll progress bar component
│   │   ├── BackToTop.tsx               # NEW: Back-to-top floating button
│   │   └── Skeleton.tsx                # NEW: Reusable skeleton component
│   ├── order/
│   │   └── OrderSummary.tsx            # MODIFY: Add AnimatePresence for items
│   ├── tracking/
│   │   └── OrderTracker.tsx            # MODIFY: Animate progress bar
│   ├── contact/
│   │   └── ContactForm.tsx             # MODIFY: Add success/error animations
│   ├── reservation/
│   │   └── ReservationForm.tsx         # MODIFY: Add success/error animations
│   └── reviews/
│       ├── ReviewList.tsx              # MODIFY: Add stagger animation
│       └── ReviewForm.tsx              # MODIFY: Add star pop + success animation
├── components/layout/
│   └── PageTransition.tsx              # NEW: AnimatePresence page wrapper
├── hooks/
│   └── useCountUp.ts                   # NEW: Number counting animation hook
├── app/
│   ├── globals.css                     # MODIFY: Add shimmer keyframes, transitions
│   ├── layout.tsx                      # MODIFY: Wrap children in PageTransition
│   ├── loading.tsx                     # NEW: Root loading skeleton
│   ├── menu/loading.tsx                # NEW: Menu page skeleton
│   ├── about/loading.tsx               # NEW: About page skeleton
│   ├── contact/loading.tsx             # NEW: Contact page skeleton
│   ├── reservation/loading.tsx         # NEW: Reservation page skeleton
│   ├── location/loading.tsx            # NEW: Location page skeleton
│   ├── tracking/loading.tsx            # NEW: Tracking page skeleton
│   └── order/loading.tsx               # NEW: Order page skeleton
└── lib/
    └── animations.ts                   # MODIFY: Add spring, scaleIn, blurUp presets
```

**Structure Decision**: Existing Next.js App Router structure is maintained. One new utility file (`hooks/useCountUp.ts`), 3 new UI components (`ScrollProgress`, `BackToTop`, `Skeleton`), 1 new layout component (`PageTransition`), 8 new `loading.tsx` files, and modifications to ~18 existing components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New hook (useCountUp) | Number counting animation requires precise frame-by-frame control with requestAnimationFrame | CSS counter-animation is not precise enough for counting from 0 to N with easing |
| New component (Skeleton) | Reusable skeleton with configurable shapes needed across 8+ routes | Inline skeleton markup in each loading.tsx would duplicate shimmer CSS and shape logic |
| PageTransition wrapper | Framer Motion AnimatePresence requires "use client" but layout.tsx is a server component | Cannot use Framer Motion directly in server components — wrapper isolates client boundary |
