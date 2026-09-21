# Tasks: Hero Image Carousel

**Input**: Design documents from `/specs/001-hero-carousel/`
**Prerequisites**: plan.md, spec.md, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Move hero images from project root to public directory

- [X] T001 Create public/images/hero/ directory structure
- [X] T002 Move "Hero 1.png" from project root to public/images/hero/hero1.png
- [X] T003 Move "Hero 2.png" from project root to public/images/hero/hero2.png
- [X] T004 Move "Hero 3.png" from project root to public/images/hero/hero3.png

**Checkpoint**: Images in place — ready for carousel implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational tasks — US1 and US2 are independent

(No tasks — skip to Phase 3)

---

## Phase 3: User Story 1 - Hero Image Carousel (Priority: P1) MVP

**Goal**: Customer sees rotating hero images with crossfade, dot navigation, and parallax

**Independent Test**: Open homepage, verify 3 images rotate every 5s, click dots to navigate, verify text overlay readable

### Implementation for User Story 1

- [X] T005 [US1] Add useState for currentIndex and useEffect for 5-second auto-rotation interval in src/components/home/Hero.tsx
- [X] T006 [US1] Add useEffect to detect prefers-reduced-motion and disable auto-rotation when enabled in src/components/home/Hero.tsx
- [X] T007 [US1] Replace static gradient background with 3 Next.js Image components using AnimatePresence for crossfade transitions in src/components/home/Hero.tsx
- [X] T008 [US1] Add dot indicator navigation below hero content with active state styling in src/components/home/Hero.tsx
- [X] T009 [US1] Preserve existing parallax scroll effect on current carousel image using useScroll and useTransform in src/components/home/Hero.tsx
- [X] T010 [US1] Add onError handler to Image components to skip to next image on load failure in src/components/home/Hero.tsx

**Checkpoint**: Hero carousel working — images rotate, dots navigate, parallax works

---

## Phase 4: User Story 2 - Floating Button Repositioning (Priority: P2)

**Goal**: SPOONI button positioned above WhatsApp button, no overlap

**Independent Test**: Open any page, verify two buttons visible at bottom-right, verify they don't overlap

### Implementation for User Story 2

- [X] T011 [P] [US2] Add CSS rules to src/app/globals.css to reposition elevenlabs-convai element to bottom: 6rem (above WhatsApp button)

**Checkpoint**: Both buttons visible and accessible without overlap

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, performance check, and deployment

- [X] T012 Run npm run build and verify no compilation errors
- [X] T013 Run npm run lint and verify no lint errors
- [X] T014 Deploy to Vercel with --force flag for clean build
- [ ] T015 Verify carousel rotates images on live site
- [ ] T016 Verify dot navigation works on live site
- [ ] T017 Verify both floating buttons visible and non-overlapping on live site
- [ ] T018 Verify all existing features work without regression (menu, reservations, ordering, reviews, dark mode)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: No dependencies — skipped (none needed)
- **User Stories (Phase 3+)**: US1 depends on Phase 1 (images must be in place)
  - US1 (P1): Can start after Phase 1 — No dependencies on US2
  - US2 (P2): Independent of US1 — can run in parallel with US1
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 1 (images moved) — No dependencies on US2
- **US2 (P2)**: Independent — can start at any time

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Build verification after each story

### Parallel Opportunities

- US1 and US2 can run in parallel (different files: Hero.tsx vs globals.css)
- US2 is a single CSS task — can be done anytime

---

## Parallel Example: User Stories 1 + 2

```bash
# US1 and US2 can run in parallel (different files):
Task: "Implement carousel in Hero.tsx" (US1)
Task: "Add SPOONI repositioning CSS to globals.css" (US2)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (move images)
2. Complete Phase 3: US1 (hero carousel)
3. **STOP and VALIDATE**: Test carousel rotation and dots
4. Deploy to Vercel for live review

### Incremental Delivery

1. Setup → Images in place
2. Add US1 (carousel) → Test → Deploy (core visual upgrade!)
3. Add US2 (button fix) → Test → Deploy (usability fix!)
4. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- This is a simple feature — only 18 tasks total across 5 phases
