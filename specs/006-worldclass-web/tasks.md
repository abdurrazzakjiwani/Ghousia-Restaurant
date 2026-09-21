# Tasks: World-Class Restaurant Website Upgrade

**Input**: Design documents from `/specs/006-worldclass-web/`
**Prerequisites**: plan.md, spec.md, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Expand animation library with new presets and add CSS keyframe foundations

- [X] T001 Add spring, springBounce, scaleIn, slideInLeft, slideInRight, blurUp presets to src/lib/animations.ts
- [X] T002 [P] Add shimmer, pulse-glow, float, draw-checkmark, shake CSS keyframes to src/app/globals.css
- [X] T003 [P] Add body transition CSS (background-color 0.3s, color 0.3s) to src/app/globals.css for dark mode cross-fade

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create reusable components that ALL user stories depend on. MUST complete before user stories.

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create reusable Skeleton component in src/components/ui/Skeleton.tsx with width/height/rounded props and shimmer animation
- [X] T005 [P] Create ScrollProgress component in src/components/ui/ScrollProgress.tsx using useScroll + useTransform
- [X] T006 [P] Create BackToTop component in src/components/ui/BackToTop.tsx with scroll position visibility
- [X] T007 [P] Create useCountUp hook in src/hooks/useCountUp.ts with requestAnimationFrame and easing
- [X] T008 [P] Create PageTransition component in src/components/layout/PageTransition.tsx using AnimatePresence + usePathname
- [X] T009 Wrap {children} in PageTransition component in src/app/layout.tsx
- [X] T010 Add ScrollProgress and BackToTop components to src/app/layout.tsx (global placement)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Chatbot Scroll Fix & Polish (Priority: P1) MVP

**Goal**: Fix broken auto-scroll behavior, add scroll-to-bottom FAB, preserve existing chat functionality

**Independent Test**: Open chat, send messages, scroll up, send another message — verify no force-scroll back. Verify FAB appears when scrolled up.

### Implementation for User Story 1

- [X] T011 [US1] Add isNearBottom state and onScroll handler to messages container in src/components/chat/ChatWidget.tsx
- [X] T012 [US1] Gate auto-scroll in useEffect([messages]) with isNearBottom check in src/components/chat/ChatWidget.tsx
- [X] T013 [US1] Add "scroll to bottom" floating action button with AnimatePresence in src/components/chat/ChatWidget.tsx
- [X] T014 [US1] Add scrollToBottom click handler with smooth scroll behavior in src/components/chat/ChatWidget.tsx

**Checkpoint**: Chat scroll behavior fixed - users can read history without disruption

---

## Phase 4: User Story 2 - Page Transitions & Route Animations (Priority: P1)

**Goal**: Smooth animated transitions between all page routes

**Independent Test**: Click navigation links (Home → Menu → About → Contact) and verify smooth cross-fade transitions. No blank screens or jarring swaps.

### Implementation for User Story 2

- [X] T015 [P] [US2] Add page entrance animation (fadeIn + slight Y offset) to src/components/layout/PageTransition.tsx
- [X] T016 [US2] Verify page transitions work across all routes (home, menu, about, contact, reservation, location, tracking, order)

**Checkpoint**: All page routes transition smoothly with animated cross-fade

---

## Phase 5: User Story 3 - Brilliant Micro-Interactions (Priority: P2)

**Goal**: Every interactive element responds to hover and click with satisfying micro-animations

**Independent Test**: Hover over menu cards, click buttons, toggle dark mode, change category filters — verify smooth purposeful animation feedback.

### Implementation for User Story 3

- [X] T017 [P] [US3] Add image zoom on hover (scale 1.05) to food images in src/components/menu/MenuCard.tsx
- [X] T018 [P] [US3] Add quantity counter bounce animation (scale spring) in src/components/menu/MenuCard.tsx
- [X] T019 [P] [US3] Add AnimatePresence icon rotation for sun/moon swap in src/components/ui/DarkModeToggle.tsx
- [X] T020 [P] [US3] Add CSS transition (background-color 0.3s, color 0.3s) to body and key containers in src/app/globals.css
- [X] T021 [P] [US3] Add sliding background pill indicator with layoutId in src/components/menu/CategoryFilter.tsx
- [X] T022 [P] [US3] Add AnimatePresence layout animation for menu grid items in src/components/menu/MenuGrid.tsx
- [X] T023 [P] [US3] Add AnimatePresence exit animation for cart item removal in src/components/order/OrderSummary.tsx
- [X] T024 [P] [US3] Convert WhatsApp button to motion.a with whileHover/whileTap scale in src/components/ui/WhatsAppButton.tsx
- [X] T025 [P] [US3] Add entrance animation (scale spring) to WhatsApp button in src/components/ui/WhatsAppButton.tsx
- [X] T026 [US3] Add hover image zoom to FeaturedCard in src/components/home/FeaturedMenu.tsx
- [X] T027 [US3] Add mobile menu AnimatePresence slide-down animation in src/components/layout/Navbar.tsx

**Checkpoint**: All interactive elements have satisfying hover/click micro-interactions

---

## Phase 6: User Story 4 - Loading Skeletons & States (Priority: P2)

**Goal**: Shimmer skeleton placeholders on every page route while content loads

**Independent Test**: Navigate to each page route and verify skeleton placeholders appear. Test with slow network throttling.

### Implementation for User Story 4

- [X] T028 [P] [US4] Create root loading skeleton in src/app/loading.tsx (hero shimmer + featured grid shimmer)
- [X] T029 [P] [US4] Create menu page loading skeleton in src/app/menu/loading.tsx (category filter + card grid shimmer)
- [X] T030 [P] [US4] Create about page loading skeleton in src/app/about/loading.tsx (section headers + card shimmer)
- [X] T031 [P] [US4] Create contact page loading skeleton in src/app/contact/loading.tsx (form fields + button shimmer)
- [X] T032 [P] [US4] Create reservation page loading skeleton in src/app/reservation/loading.tsx (form fields + button shimmer)
- [X] T033 [P] [US4] Create location page loading skeleton in src/app/location/loading.tsx (map + info cards shimmer)
- [X] T034 [P] [US4] Create tracking page loading skeleton in src/app/tracking/loading.tsx (search form + tracker shimmer)
- [X] T035 [P] [US4] Create order page loading skeleton in src/app/order/loading.tsx (cart items + total shimmer)
- [X] T036 [US4] Add review list stagger animation to src/components/reviews/ReviewList.tsx
- [X] T037 [US4] Add loading skeleton to ReviewsSection in src/components/home/ReviewsSection.tsx

**Checkpoint**: Every page route shows meaningful skeleton loading states

---

## Phase 7: User Story 5 - Hero Parallax & Scroll Effects (Priority: P3)

**Goal**: Immersive hero with parallax, scroll progress, back-to-top, and animated statistics

**Independent Test**: Scroll through home page — verify parallax on hero, progress bar fills, back-to-top appears, statistics count up.

### Implementation for User Story 5

- [X] T038 [P] [US5] Add useScroll + useTransform parallax to hero background in src/components/home/Hero.tsx
- [X] T039 [P] [US5] Add bouncing scroll-down indicator arrow to hero in src/components/home/Hero.tsx
- [X] T040 [P] [US5] Add useCountUp animation to statistics in src/components/home/AboutPreview.tsx
- [X] T041 [US5] Add footer column stagger animation with staggerContainer in src/components/layout/Footer.tsx

**Checkpoint**: Hero has parallax, statistics count up, scroll effects work globally

---

## Phase 8: User Story 6 - Form & Review Animations (Priority: P3)

**Goal**: Animated success/error states, loading spinners, star rating pop effects

**Independent Test**: Submit contact form, reservation form, and review form — verify animated checkmarks, error shakes, and loading spinners.

### Implementation for User Story 6

- [X] T042 [P] [US6] Add status state machine (idle/loading/success/error) and animated checkmark to src/components/contact/ContactForm.tsx
- [X] T043 [P] [US6] Add loading spinner replacement on submit button in src/components/contact/ContactForm.tsx
- [X] T044 [P] [US6] Add CSS shake animation for validation errors in src/components/contact/ContactForm.tsx
- [X] T045 [P] [US6] Add status state machine and animated checkmark to src/components/reservation/ReservationForm.tsx
- [X] T046 [P] [US6] Add loading spinner on submit button in src/components/reservation/ReservationForm.tsx
- [X] T047 [P] [US6] Add star rating scale/pop animation on hover in src/components/reviews/ReviewForm.tsx
- [X] T048 [P] [US6] Add animated success state with checkmark to src/components/reviews/ReviewForm.tsx
- [X] T049 [US6] Add AnimatePresence to Modal open/close with overlay fade and scale entrance in src/components/ui/Modal.tsx
- [X] T050 [US6] Add stagger animation to Testimonials star ratings in src/components/home/Testimonials.tsx
- [X] T051 [US6] Add OrderTracker progress bar fill animation with spring in src/components/tracking/OrderTracker.tsx

**Checkpoint**: All forms have animated feedback, modals animate open/close, tracker animates

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, performance check, and deployment

- [X] T052 Verify prefers-reduced-motion disables all animations (test with OS setting)
- [X] T053 Run npm run build and verify no compilation errors
- [X] T054 Run npm run lint and verify no lint errors
- [X] T055 Deploy to Vercel with --force flag for clean build
- [X] T056 Verify all animations work on live site (scroll, hover, chat, transitions, skeletons)
- [X] T057 Verify dark mode transitions work smoothly with cross-fade
- [X] T058 Verify parallax performance on mobile (no jank)
- [X] T059 Verify Lighthouse Performance score is 90+

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational - No dependencies on other stories
  - US2 (P1): Can start after Foundational - No dependencies on other stories
  - US3 (P2): Can start after Foundational - Independent of US1/US2
  - US4 (P2): Can start after Foundational - Independent of US1/US2/US3
  - US5 (P3): Can start after Foundational - Independent of all stories
  - US6 (P3): Can start after Foundational - Independent of all stories
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P1)**: Can start after Foundational - No dependencies on other stories
- **US3 (P2)**: Can start after Foundational - Independent of US1/US2 (different components)
- **US4 (P2)**: Can start after Foundational - Independent of US1/US2/US3
- **US5 (P3)**: Can start after Foundational - Independent of all stories
- **US6 (P3)**: Can start after Foundational - Independent of all stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Build verification after each story

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel (T005-T008)
- Once Foundational completes, US1, US2, US3, US4, US5, US6 can all run in parallel (different files)
- Within US3: all micro-interaction tasks can run in parallel (T017-T025)
- Within US4: all loading.tsx files can run in parallel (T028-T035)
- Within US5: parallax, scroll indicator, counters can run in parallel (T038-T040)
- Within US6: all form animations can run in parallel (T042-T048)

---

## Parallel Example: User Story 3 (Micro-Interactions)

```bash
# All micro-interaction tasks can run in parallel (different files):
Task: "Add image zoom to MenuCard.tsx"
Task: "Add quantity bounce to MenuCard.tsx"
Task: "Add icon rotation to DarkModeToggle.tsx"
Task: "Add dark mode CSS transitions to globals.css"
Task: "Add sliding pill to CategoryFilter.tsx"
Task: "Add layout filter to MenuGrid.tsx"
Task: "Add item removal animation to OrderSummary.tsx"
Task: "Convert WhatsAppButton to motion.a"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (animation presets + CSS)
2. Complete Phase 2: Foundational (Skeleton, PageTransition, ScrollProgress, BackToTop, useCountUp)
3. Complete Phase 3: US1 (Chat scroll fix)
4. Complete Phase 4: US2 (Page transitions)
5. **STOP and VALIDATE**: Test chat scroll and page transitions
6. Deploy to Vercel for live review

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (chat fix) → Test → Deploy (critical bug fix!)
3. Add US2 (page transitions) → Test → Deploy (highest visual impact!)
4. Add US3 (micro-interactions) → Test → Deploy (delight factor!)
5. Add US4 (skeletons) → Test → Deploy (perceived performance!)
6. Add US5 (parallax + scroll) → Test → Deploy (premium feel!)
7. Add US6 (form animations) → Test → Deploy (completion!)
8. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
