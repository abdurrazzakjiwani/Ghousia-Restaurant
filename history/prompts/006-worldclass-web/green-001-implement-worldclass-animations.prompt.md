---
id: "006-worldclass-web-green-001"
title: "Implement world-class animations"
stage: green
date: 2026-09-16
surface: cli
model: mimo-v2.5-free
feature: 006-worldclass-web
branch: 006-worldclass-web
user: user
command: /sp.green
labels: [implementation, animations, framer-motion, ui]
links:
  spec: specs/006-worldclass-web/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - src/lib/animations.ts
  - src/app/globals.css
  - src/app/layout.tsx
  - src/components/ui/Skeleton.tsx
  - src/components/ui/ScrollProgress.tsx
  - src/components/ui/BackToTop.tsx
  - src/components/ui/DarkModeToggle.tsx
  - src/components/ui/WhatsAppButton.tsx
  - src/components/ui/Modal.tsx
  - src/components/layout/PageTransition.tsx
  - src/components/layout/Navbar.tsx
  - src/components/layout/Footer.tsx
  - src/components/chat/ChatWidget.tsx
  - src/components/menu/MenuCard.tsx
  - src/components/menu/MenuGrid.tsx
  - src/components/menu/CategoryFilter.tsx
  - src/components/order/OrderSummary.tsx
  - src/components/home/Hero.tsx
  - src/components/home/AboutPreview.tsx
  - src/components/home/FeaturedMenu.tsx
  - src/components/home/Testimonials.tsx
  - src/components/home/ReviewsSection.tsx
  - src/components/contact/ContactForm.tsx
  - src/components/reservation/ReservationForm.tsx
  - src/components/reviews/ReviewForm.tsx
  - src/components/reviews/ReviewList.tsx
  - src/components/tracking/OrderTracker.tsx
  - src/hooks/useCountUp.ts
  - src/app/loading.tsx
  - src/app/menu/loading.tsx
  - src/app/about/loading.tsx
  - src/app/contact/loading.tsx
  - src/app/reservation/loading.tsx
  - src/app/location/loading.tsx
  - src/app/tracking/loading.tsx
  - src/app/order/loading.tsx
tests:
  - Build passes (npm run build)
  - Lint passes (npm run lint)
  - Deployed to Vercel
---

## Prompt

/sp.green — Implement all 59 tasks across 9 phases for feature 006-worldclass-web (world-class restaurant website upgrade).

## Response snapshot

Successfully implemented all 59 tasks:
- **Phase 1 (Setup)**: Added spring, springBounce, scaleIn, slideInLeft, slideInRight, blurUp presets to animations.ts. Added shimmer, pulse-glow, float, draw-checkmark, shake, spin keyframes to globals.css. Added body transition CSS.
- **Phase 2 (Foundational)**: Created Skeleton.tsx, ScrollProgress.tsx, BackToTop.tsx, useCountUp.ts, PageTransition.tsx. Updated layout.tsx with ScrollProgress, BackToTop, and PageTransition wrapper.
- **Phase 3 (US1)**: Fixed chat scroll in ChatWidget.tsx with isNearBottom detection and scroll-to-bottom FAB.
- **Phase 4 (US2)**: Page transitions via PageTransition component with AnimatePresence + usePathname.
- **Phase 5 (US3)**: 11 micro-interaction tasks — image zoom (MenuCard, FeaturedMenu), icon rotation (DarkModeToggle), sliding pill (CategoryFilter), layout filter (MenuGrid), item removal animation (OrderSummary), WhatsApp button motion.a, mobile menu AnimatePresence (Navbar).
- **Phase 6 (US4)**: 8 loading.tsx skeleton files, ReviewList stagger, ReviewsSection loading skeleton.
- **Phase 7 (US5)**: Hero parallax with useScroll/useTransform, bouncing scroll-down indicator, useCountUp for statistics (AboutPreview), Footer column stagger.
- **Phase 8 (US6)**: ContactForm/ReservationForm/ReviewForm with status state machine, animated checkmark, shake animation, loading spinner. Modal AnimatePresence. Testimonials star pop. OrderTracker animated progress bar.
- **Phase 9 (Polish)**: Build passes, lint passes, deployed to Vercel with --force.

## Outcome

- ✅ Impact: 59/59 tasks completed. All animations implemented and deployed.
- 🧪 Tests: Build passes, lint passes, deployed to https://ghousiagoldenweb.vercel.app
- 📁 Files: 35 modified/created files across components, hooks, app routes, and CSS
- 🔁 Next prompts: Feature is complete. Future: admin CMS (Phase 2).
- 🧠 Reflection: Framer Motion type conflicts with motion.button/motion.div resolved with `{...(props as Record<string, unknown>)}` cast pattern. PageTransition needed `as const` on ease values for TypeScript Variants type.

## Evaluation notes (flywright)

- Failure modes observed: TypeScript Variants type error with ease string literal — fixed with `as const`
- Graders run and results: Build PASS, Lint PASS, Deploy PASS
- Prompt variant: N/A
- Next experiment: N/A — feature complete
