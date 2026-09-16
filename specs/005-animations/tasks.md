# Tasks: Website Animations & Chatbot Scroll

**Input**: Design documents from `/specs/005-animations/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install animation library and create shared configuration

- [ ] T001 Install framer-motion dependency in package.json
- [ ] T002 [P] Create shared animation presets file in src/lib/animations.ts
- [ ] T003 [P] Add custom scrollbar CSS styles and reduced-motion media query to src/app/globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add "use client" to server components that need Framer Motion. MUST complete before user stories.

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Add "use client" directive to src/components/home/Hero.tsx
- [ ] T005 [P] Add "use client" directive to src/components/home/AboutPreview.tsx
- [ ] T006 [P] Add "use client" directive to src/components/layout/Footer.tsx
- [ ] T007 [P] Add "use client" directive to src/components/home/Testimonials.tsx
- [ ] T008 [P] Add "use client" directive to src/components/home/ReviewsSection.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Scroll Reveal Animations (Priority: P1) MVP

**Goal**: Sections and content gently fade in as visitor scrolls down the page

**Independent Test**: Scroll through home page and verify Hero, About Preview, Featured Menu, and Footer sections all fade in smoothly as they enter the viewport

### Implementation for User Story 1

- [ ] T009 [P] [US1] Add fadeInUp entrance animation to src/components/home/Hero.tsx using motion.div with whileInView
- [ ] T010 [P] [US1] Add scroll reveal animation to src/components/home/AboutPreview.tsx using motion.div with whileInView
- [ ] T011 [P] [US1] Add staggered card reveal to src/components/home/FeaturedMenu.tsx using staggerContainer variants
- [ ] T012 [P] [US1] Add scroll reveal animation to src/components/layout/Footer.tsx using motion.div with whileInView
- [ ] T013 [P] [US1] Add staggered reveal to src/components/menu/MenuGrid.tsx using staggerContainer variants
- [ ] T014 [P] [US1] Add entrance animation to src/components/menu/CategoryFilter.tsx using motion.div
- [ ] T015 [P] [US1] Add section reveal animations to src/app/about/page.tsx for hero, story, philosophy, values, and contact sections
- [ ] T016 [P] [US1] Add entrance animation to src/components/layout/Navbar.tsx using motion.div
- [ ] T017 [P] [US1] Add scroll reveal to src/components/home/Testimonials.tsx using motion.div with whileInView
- [ ] T018 [P] [US1] Add scroll reveal to src/components/home/ReviewsSection.tsx using motion.div with whileInView

**Checkpoint**: All page sections fade in on scroll across home, menu, about pages

---

## Phase 4: User Story 2 - Hover Micro-Interactions (Priority: P2)

**Goal**: Subtle hover scale and shadow effects on interactive cards and buttons

**Independent Test**: Hover over menu cards, buttons, and links to verify smooth scale/shadow transitions

### Implementation for User Story 2

- [ ] T019 [P] [US2] Add hover scale (1.02x) and shadow animation to src/components/menu/MenuCard.tsx using motion.div whileHover
- [ ] T020 [P] [US2] Add hover scale animation to src/components/home/FeaturedMenu.tsx FeaturedCard using motion.div whileHover
- [ ] T021 [P] [US2] Add hover scale micro-interaction to src/components/ui/Button.tsx using motion.button whileHover
- [ ] T022 [P] [US2] Enhance hover effect on src/components/ui/Card.tsx using motion.div whileHover

**Checkpoint**: Menu cards and buttons show smooth hover scale and shadow effects

---

## Phase 5: User Story 3 - Chatbot Open/Close Animation (Priority: P2)

**Goal**: Chat widget slides up and fades in smoothly when opening, slides down when closing

**Independent Test**: Click chat bubble and verify widget slides up from bottom with fade-in, slides down when closed

### Implementation for User Story 3

- [ ] T023 [US3] Add AnimatePresence and motion.div open/close animation to src/components/chat/ChatWidget.tsx with slide-up/slide-down variants
- [ ] T024 [US3] Add motion transition to chat bubble icon toggle in src/components/chat/ChatWidget.tsx

**Checkpoint**: Chat widget opens with slide-up + fade and closes with slide-down + fade

---

## Phase 6: User Story 4 - Chat Message Entrance Animation (Priority: P2)

**Goal**: Each new chat message slides in from bottom with fade effect

**Independent Test**: Send messages in chat and verify each message animates in individually

### Implementation for User Story 4

- [ ] T025 [P] [US4] Add motion.div fade-in + slide-up animation to src/components/chat/ChatMessage.tsx for each message bubble
- [ ] T026 [US4] Add fade-in animation to typing indicator dots in src/components/chat/ChatWidget.tsx

**Checkpoint**: Each chat message animates in smoothly, typing indicator fades in

---

## Phase 7: User Story 5 - Custom Chatbot Scrollbar (Priority: P3)

**Goal**: Thin, themed scrollbar in chat message area matching website gradient colors

**Independent Test**: Send enough messages to overflow chat container and verify scrollbar is thin, styled, and functional

### Implementation for User Story 5

- [ ] T027 [US5] Add chat-scroll class to message container div in src/components/chat/ChatWidget.tsx
- [ ] T028 [US5] Add dark mode scrollbar color variant to src/app/globals.css for .chat-scroll selector

**Checkpoint**: Chat scrollbar is thin (6px), gradient-themed, and adapts to dark mode

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, performance check, and deployment

- [ ] T029 Run npm run build and verify no compilation errors
- [ ] T030 Run npm run lint and verify no lint errors
- [ ] T031 Deploy to Vercel with --force flag for clean build
- [ ] T032 Verify all animations work on live site (scroll, hover, chat open/close, messages, scrollbar)
- [ ] T033 Verify prefers-reduced-motion disables all animations
- [ ] T034 Verify dark mode scrollbar and animations work correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational
  - US2 (P2): Can start after Foundational, independent of US1
  - US3 (P2): Can start after Foundational, independent of US1/US2
  - US4 (P2): Can start after Foundational, independent of US1/US2
  - US5 (P3): Can start after Foundational, independent of US1/US2/US3/US4
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P2)**: Can start after Foundational - Independent of US1 (different components)
- **US3 (P2)**: Can start after Foundational - Independent of US1/US2 (chat components)
- **US4 (P2)**: Can start after Foundational - Independent of US1/US2 (chat components)
- **US5 (P3)**: Can start after Foundational - Independent of all other stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Build verification after each story

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel (T005-T008)
- Once Foundational completes, US1 and US2 can run in parallel (different files)
- US3 and US4 can run in parallel (different parts of chat)
- Within US1: all scroll reveal tasks can run in parallel (T009-T018)
- Within US2: all hover tasks can run in parallel (T019-T022)

---

## Parallel Example: User Story 1

```bash
# All scroll reveal tasks can run in parallel (different files):
Task: "Add fadeInUp animation to Hero.tsx"
Task: "Add scroll reveal to AboutPreview.tsx"
Task: "Add staggered reveal to FeaturedMenu.tsx"
Task: "Add scroll reveal to Footer.tsx"
Task: "Add staggered reveal to MenuGrid.tsx"
# ... etc
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install framer-motion, create animations.ts, add CSS)
2. Complete Phase 2: Foundational (add "use client" to server components)
3. Complete Phase 3: User Story 1 (scroll reveal on all pages)
4. **STOP and VALIDATE**: Test scroll animations on home, menu, about pages
5. Deploy to Vercel for live review

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (scroll reveal) → Test → Deploy (MVP!)
3. Add US2 (hover effects) → Test → Deploy
4. Add US3 (chat open/close) → Test → Deploy
5. Add US4 (message animations) → Test → Deploy
6. Add US5 (scrollbar) → Test → Deploy
7. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
