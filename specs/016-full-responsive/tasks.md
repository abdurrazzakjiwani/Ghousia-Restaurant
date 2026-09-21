# Tasks: Full Responsive Overhaul

**Feature**: 016-full-responsive  
**Branch**: `016-full-responsive`  
**Date**: 2026-09-21  
**Spec**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)

## Summary

- **Total Tasks**: 38
- **User Stories**: 5 (P1: US1, US2 | P2: US3, US4 | P3: US5)
- **Phases**: 7 (Setup, Foundational, US1, US2, US3, US4, US5)
- **Parallel Opportunities**: 15 tasks marked [P]
- **Estimated Complexity**: Medium

## Implementation Strategy

**MVP Scope**: User Story 1 (Content Visible on All Mobile Devices) — fixes the core visibility problem.

**Incremental Delivery**:
1. Phase 1-2: Setup + Foundational (safe-area, globals) → all stories unblocked
2. Phase 3: US1 (mobile visibility) → website usable on mobile
3. Phase 4: US2 (dark mode) → website usable in dark mode
4. Phase 5: US3 (touch targets) → accessible on touch devices
5. Phase 6: US4 (contrast) → readable text everywhere
6. Phase 7: US5 (animations) → graceful degradation

---

## Phase 1: Setup

> No user story label — project initialization tasks.

- [ ] T001 Verify build passes on current branch: `cmd /c "npm run build"` in project root
- [ ] T002 Verify lint passes: `cmd /c "npm run lint"` in project root
- [ ] T003 Create specs/016-full-responsive/ directory structure if not already present

---

## Phase 2: Foundational

> No user story label — blocking prerequisites for ALL user stories.

- [ ] T004 Remove `overflow-x: hidden` from `html` in src/app/globals.css (line 20-22) and add `overflow-x: clip` to `body` as safer alternative
- [ ] T005 [P] Add safe-area-inset-bottom utility class in src/app/globals.css for FAB positioning on notched devices
- [ ] T006 [P] Add responsive font size utility classes in src/app/globals.css for mobile-to-desktop text scaling
- [ ] T007 [P] Add focus-visible ring utility styles in src/app/globals.css for keyboard navigation indicators

---

## Phase 3: User Story 1 — Content Visible on All Mobile Devices (P1)

> **Story Goal**: All text, buttons, images visible on 320px+ viewports without horizontal overflow.
> **Independent Test**: Open site at 320px width, scroll every page, verify no horizontal scrollbar and all content readable.

- [ ] T008 [P] [US1] Fix WhatsApp button safe-area: add `pb-[env(safe-area-inset-bottom)]` in src/components/ui/WhatsAppButton.tsx
- [ ] T009 [P] [US1] Fix SpooniFAB safe-area: add `pb-[env(safe-area-inset-bottom)]` in src/components/ui/SpooniFAB.tsx
- [ ] T010 [P] [US1] Fix BackToTop safe-area and stacking: add safe-area inset, adjust `bottom-24` to `bottom-20 sm:bottom-24` in src/components/ui/BackToTop.tsx
- [ ] T011 [P] [US1] Fix chat widget responsive height: change `max-h-[320px]` to `max-h-[min(50vh,400px)]` in src/components/chat/GroqChatWidget.tsx
- [ ] T012 [P] [US1] Fix MapEmbed responsive height: replace `height="400"` with aspect-ratio wrapper div using `aspect-[4/3] sm:aspect-video` in src/components/contact/MapEmbed.tsx
- [ ] T013 [US1] Show compact info bar on mobile: change `hidden sm:flex` to `flex` with compact layout (phone icon + track order only) in src/components/layout/InfoBar.tsx
- [ ] T014 [US1] Add cart badge to mobile header: add CartBadge component next to hamburger icon in src/components/layout/MainNav.tsx
- [ ] T015 [US1] Fix hero section mobile padding: change `py-24` to `py-16 md:py-24` in src/components/home/Hero.tsx
- [ ] T016 [US1] Fix hero dot/chevron overlap: adjust `bottom-12` to `bottom-14 sm:bottom-20` for dots, `bottom-4` to `bottom-2 sm:bottom-4` for chevron in src/components/home/Hero.tsx
- [ ] T017 [US1] Fix testimonials SSR hydration: replace `window.innerWidth` with `useState(20)` + `useEffect` update pattern in src/components/home/Testimonials.tsx
- [ ] T018 [US1] Fix testimonials touch navigation: change `opacity-0 group-hover:opacity-100` to `opacity-60 md:opacity-0 md:group-hover:opacity-100` for arrows in src/components/home/Testimonials.tsx
- [ ] T019 [US1] Fix testimonials dot limit: add `overflow-hidden` to dots container, use SSR-safe useState pattern for dot count in src/components/home/Testimonials.tsx
- [ ] T020 [US1] Fix footer phone number wrapping: add `flex-wrap gap-y-1` to phone container in src/components/layout/Footer.tsx
- [ ] T021 [US1] Fix checkout grid responsive: change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2` in src/components/order/CheckoutStep2.tsx
- [ ] T022 [US1] Fix mobile drawer slide animation: add `transition-transform duration-300` and conditional `translate-x-full` class in src/components/layout/MobileDrawer.tsx
- [ ] T023 [US1] Fix GrillCharghaShowcase mobile overflow: change `w-72 h-72` to `w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96`, reduce `gap-12` to `gap-8 sm:gap-12` in src/components/home/GrillCharghaShowcase.tsx
- [ ] T024 [US1] Fix MapPicker responsive height: change `h-64` to `h-48 sm:h-56 md:h-64` in src/components/order/MapPicker.tsx
- [ ] T025 [US1] Fix about page map height: change `h-80` to `h-64 sm:h-80` in src/app/about/page.tsx

---

## Phase 4: User Story 2 — Dark Mode Content Visibility (P1)

> **Story Goal**: All text and elements visible in dark mode across all components.
> **Independent Test**: Enable dark mode, visit every page, verify all text readable and buttons visible.

- [ ] T026 [P] [US2] Add dark mode to Navbar: `dark:bg-gray-900/80 dark:border-gray-800` in src/components/layout/Navbar.tsx
- [ ] T027 [P] [US2] Add dark mode to MainNav: `dark:text-gray-200`, `dark:hover:bg-gray-800`, active `dark:bg-amber-900/30 dark:text-amber-400` in src/components/layout/MainNav.tsx
- [ ] T028 [P] [US2] Add dark mode to MobileDrawer: `dark:bg-gray-900`, `dark:border-gray-700`, `dark:text-gray-200`, `dark:hover:bg-gray-800` in src/components/layout/MobileDrawer.tsx
- [ ] T029 [P] [US2] Add dark mode to InfoBar: `dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800` in src/components/layout/InfoBar.tsx
- [ ] T030 [P] [US2] Add dark mode to Footer: verify existing `bg-gray-900 text-gray-300` works, add `dark:text-gray-400` to secondary text in src/components/layout/Footer.tsx
- [ ] T031 [US2] Add dark mode to btn-secondary utility: `dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-200` in src/app/globals.css
- [ ] T032 [US2] Add dark mode to card utility: `dark:bg-gray-900 dark:border-gray-800` in src/app/globals.css

---

## Phase 5: User Story 3 — Touch Targets Meet Accessibility Standards (P2)

> **Story Goal**: All interactive elements have minimum 44x44px touch targets.
> **Independent Test**: On touch device, tap every button, link, icon — verify each is easy to tap accurately.

- [ ] T033 [US3] Increase modal close button touch target: change `p-1` to `p-2` and add `min-w-[44px] min-h-[44px]` in src/components/ui/Modal.tsx
- [ ] T034 [US3] Increase star rating touch targets: change `p-0.5` to `p-1.5` (or wrap in min-w/min-h container) in src/components/reviews/ReviewForm.tsx
- [ ] T035 [US3] Increase mobile drawer close button touch target: change `p-2` to `p-2.5` and add `min-w-[44px] min-h-[44px]` in src/components/layout/MobileDrawer.tsx
- [ ] T036 [US3] Increase cart badge readability: change `text-[10px]` to `text-[11px]`, `min-w-[18px] h-[18px]` to `min-w-[20px] h-[20px]` in src/components/layout/CartBadge.tsx
- [ ] T037 [US3] Increase chat input touch target: change `py-2` to `py-3` on input field in src/components/chat/GroqChatWidget.tsx
- [ ] T038 [US3] Add focus trapping to MobileDrawer: implement `useRef` + `useEffect` + keydown handler for Tab/Escape in src/components/layout/MobileDrawer.tsx
- [ ] T039 [US3] Add focus trapping to Modal: implement `useRef` + `useEffect` + keydown handler for Tab/Escape in src/components/ui/Modal.tsx

---

## Phase 6: User Story 4 — Text Contrast Meets Readability Standards (P2)

> **Story Goal**: All text has 4.5:1+ contrast, gradient text replaced with solid colors.
> **Independent Test**: View all text on website, verify readable in bright outdoor conditions.

- [ ] T040 [P] [US4] Replace gradient text in FeaturedMenu.tsx: change `bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent` to `text-orange-600` in src/components/home/FeaturedMenu.tsx
- [ ] T041 [P] [US4] Replace gradient text in GrillCharghaShowcase.tsx: same change in src/components/home/GrillCharghaShowcase.tsx
- [ ] T042 [P] [US4] Replace gradient text in MenuCard.tsx: same change in src/components/menu/MenuCard.tsx
- [ ] T043 [P] [US4] Replace gradient text in MenuItemModal.tsx: same change in src/components/menu/MenuItemModal.tsx
- [ ] T044 [P] [US4] Replace gradient text in CheckoutStep2.tsx: same change in src/components/order/CheckoutStep2.tsx
- [ ] T045 [P] [US4] Replace gradient text in OrderConfirmation.tsx: same change in src/components/order/OrderConfirmation.tsx
- [ ] T046 [P] [US4] Replace gradient text in OrderSummary.tsx: same change in src/components/order/OrderSummary.tsx
- [ ] T047 [P] [US4] Replace gradient text in ThankYouClientContent.tsx: same change in src/components/order/ThankYouClientContent.tsx

---

## Phase 7: User Story 5 — Animations Degrade Gracefully (P3)

> **Story Goal**: Content visible without JS, animations enhance on load.
> **Independent Test**: Disable JS, load pages — verify all content visible. Re-enable JS — verify animations work.

- [ ] T048 [US5] Add CSS fallback for Framer Motion animations: ensure `opacity: 1; transform: none` is the CSS default that motion overrides, verify `<noscript>` or CSS rule makes content visible in src/app/globals.css and src/components/layout/PageTransition.tsx
- [ ] T049 [US5] Verify prefers-reduced-motion support: ensure existing `@media (prefers-reduced-motion: reduce)` in globals.css disables all non-essential animations
- [ ] T050 [US5] Test content visibility with JS disabled: manually verify all pages render content without JavaScript

---

## Phase 8: Polish & Cross-Cutting

> No user story label — final cleanup and verification.

- [ ] T051 [P] Fix SearchInput dropdown responsive width: change `w-72` to `w-72 max-w-[calc(100vw-2rem)]` in src/components/layout/SearchInput.tsx
- [ ] T052 [P] Fix CategoryDropdown responsive width: change `w-80` to `w-80 max-w-[calc(100vw-2rem)]` in src/components/layout/CategoryDropdown.tsx
- [ ] T053 [P] Add CategoryFilter scroll indicators: add fade gradient hints on left/right edges in src/components/menu/CategoryFilter.tsx
- [ ] T054 [P] Fix Button component responsive sizes: change `sm` variant `py-1.5` to `py-2.5` in src/components/ui/Button.tsx
- [ ] T055 Run full build verification: `cmd /c "npm run build"`
- [ ] T056 Run lint verification: `cmd /c "npm run lint"`
- [ ] T057 Test on 320px viewport: verify all pages in Chrome DevTools at 320px width
- [ ] T058 Test dark mode: enable dark mode, verify all pages
- [ ] T059 Test keyboard navigation: Tab through all interactive elements, verify focus indicators
- [ ] T060 Commit all changes with descriptive message

---

## Dependencies

```text
Phase 1 (Setup) ─────────────────────────────────────────┐
Phase 2 (Foundational) ──────────────────────────────────┤
                                                          ├──► Phase 3 (US1) ──┐
                                                          ├──► Phase 4 (US2) ──┤
                                                          ├──► Phase 5 (US3) ──┤
                                                          ├──► Phase 6 (US4) ──┤
                                                          └──► Phase 7 (US5) ──┘
                                                                                   │
                                                                              Phase 8 (Polish)
```

**Story Dependencies**:
- US1, US2, US3, US4, US5 are **independent** after Phase 2 completes
- Phase 8 (Polish) depends on all stories completing
- Within each story, tasks are independent unless noted

## Parallel Execution Examples

**Batch 1 (Phase 2 — all parallel)**:
```
T004, T005, T006, T007 — all different files, no dependencies
```

**Batch 2 (Phase 3 — most parallel)**:
```
T008, T009, T010, T011, T012 — all different FAB/component files
T013, T014 — different layout files
```

**Batch 3 (Phase 4 — all parallel)**:
```
T026, T027, T028, T029, T030 — all different component files
T031, T032 — globals.css (sequential, same file)
```

**Batch 4 (Phase 6 — all parallel)**:
```
T040, T041, T042, T043, T044, T045, T046, T047 — all different files
```

## Task Count Summary

| Phase | Tasks | Parallel [P] |
|-------|-------|--------------|
| Setup | 3 | 0 |
| Foundational | 4 | 3 |
| US1 (Mobile Visibility) | 18 | 5 |
| US2 (Dark Mode) | 7 | 5 |
| US3 (Touch Targets) | 7 | 0 |
| US4 (Contrast) | 8 | 8 |
| US5 (Animations) | 3 | 0 |
| Polish | 10 | 4 |
| **Total** | **60** | **25** |
