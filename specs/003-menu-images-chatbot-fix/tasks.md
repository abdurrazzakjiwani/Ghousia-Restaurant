# Tasks: Menu Images, Chatbot Fix & Page Upgrades

**Input**: Design documents from `/specs/003-menu-images-chatbot-fix/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-api.md

**Tests**: Not requested in feature specification. Implementation only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Exact file paths included in all descriptions

---

## Phase 1: Setup

**Purpose**: Verify project builds and dependencies are current

- [x] T001 Verify project builds successfully with `npm run build`
- [x] T002 Verify lint passes with `npm run lint`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Order detection utilities that US1 depends on

**⚠️ CRITICAL**: US1 (Chatbot) cannot begin until this phase is complete

- [x] T003 [P] Add OrderIntent and OrderIntentItem types to `src/types/index.ts`
- [x] T004 [P] Create order detection utility with keyword matching, menu item matching, and quantity extraction in `src/lib/order-detection.ts`
- [x] T005 Update WhatsApp order message generation to accept OrderIntentItem array in `src/lib/utils.ts`

**Checkpoint**: Foundation ready — US1 implementation can begin

---

## Phase 3: User Story 1 — Chatbot Order Placement (Priority: P1) 🎯 MVP

**Goal**: Customer types "I want to order a Zinger burger" and gets a clickable WhatsApp order button

**Independent Test**: Open chat widget, type "I want to order 2 Zinger burgers", verify WhatsApp button appears with correct order

### Implementation for User Story 1

- [x] T006 [US1] Update chat system prompt with WhatsApp URL format and structured response instructions in `src/lib/groq.ts`
- [x] T007 [US1] Add order intent detection before LLM fallback in POST /api/chat endpoint in `src/app/api/chat/route.ts`
- [x] T008 [US1] Add conversation history passing (last 10 messages) to LLM API in `src/app/api/chat/route.ts`
- [x] T009 [US1] Extend Message interface with orderUrl and orderItems fields in `src/hooks/useChat.ts`
- [x] T010 [US1] Update useChat hook to parse and expose orderUrl/orderItems from API response in `src/hooks/useChat.ts`
- [x] T011 [US1] Add WhatsApp order button rendering to ChatMessage component in `src/components/chat/ChatMessage.tsx`
- [x] T012 [US1] Pass orderUrl and orderItems from useChat through ChatWidget to ChatMessage in `src/components/chat/ChatWidget.tsx`

**Checkpoint**: Chatbot order placement fully functional — MVP complete

---

## Phase 4: User Story 2 — Menu Item Images (Priority: P2)

**Goal**: All 39 menu items display real food photographs instead of emoji placeholders

**Independent Test**: Visit home page and menu page, confirm all items show photographic images

### Implementation for User Story 2

- [x] T013 [P] [US2] Add Unsplash image URLs for Burgers (3 items) in `src/lib/menu-data.ts`
- [x] T014 [P] [US2] Add Unsplash image URLs for Sandwiches (2 items) in `src/lib/menu-data.ts`
- [x] T015 [P] [US2] Add Unsplash image URLs for Broast (3 items) in `src/lib/menu-data.ts`
- [x] T016 [P] [US2] Add Unsplash image URLs for BBQ (3 items) in `src/lib/menu-data.ts`
- [x] T017 [P] [US2] Add Unsplash image URLs for Chargha (2 items) in `src/lib/menu-data.ts`
- [x] T018 [P] [US2] Add Unsplash image URLs for Karahi (3 items) in `src/lib/menu-data.ts`
- [x] T019 [P] [US2] Add Unsplash image URLs for Handi (3 items) in `src/lib/menu-data.ts`
- [x] T020 [P] [US2] Add Unsplash image URLs for Chinese (4 items) in `src/lib/menu-data.ts`
- [x] T021 [P] [US2] Add Unsplash image URLs for Rolls (3 items) in `src/lib/menu-data.ts`
- [x] T022 [P] [US2] Add Unsplash image URLs for Pasta (2 items) in `src/lib/menu-data.ts`
- [x] T023 [P] [US2] Add Unsplash image URLs for Extras (4 items) in `src/lib/menu-data.ts`
- [x] T024 [P] [US2] Add Unsplash image URLs for Fried (2 items) in `src/lib/menu-data.ts`
- [x] T025 [P] [US2] Add Unsplash image URLs for Beverages (4 items) in `src/lib/menu-data.ts`
- [x] T026 [US2] Add image onError fallback handler to display item name on load failure in `src/components/home/FeaturedMenu.tsx`
- [x] T027 [US2] Add image onError fallback handler to display item name on load failure in `src/app/menu/page.tsx`

**Checkpoint**: All 39 menu items display photographic images with graceful fallback

---

## Phase 5: User Story 3 — Home Page Content Upgrade (Priority: P3)

**Goal**: Home page shows authentic, compelling content specific to Ghousia Golden Spoon

**Independent Test**: Visit home page, verify hero tagline, hours, 3 CTAs, Our Story narrative, and stats are all restaurant-specific

### Implementation for User Story 3

- [x] T028 [P] [US3] Rewrite Hero section with tagline, opening hours badge, and 3 CTAs (View Menu, Reserve Table, Order on WhatsApp) in `src/components/home/Hero.tsx`
- [x] T029 [P] [US3] Rewrite AboutPreview "Our Story" section with authentic restaurant narrative and updated stats in `src/components/home/AboutPreview.tsx`

**Checkpoint**: Home page content is authentic and compelling

---

## Phase 6: User Story 4 — About Page Content Upgrade (Priority: P4)

**Goal**: About page tells the restaurant's full story with timeline, values, team, and contact info

**Independent Test**: Visit About page, verify hero banner, journey timeline, cooking philosophy, team cards, values, and contact section with map

### Implementation for User Story 4

- [x] T030 [US4] Rewrite About page with hero banner, journey timeline, cooking philosophy, team descriptions, values section, and contact section with address/phones/hours/map in `src/app/about/page.tsx`

**Checkpoint**: About page is a rich, brand-building experience

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and build verification

- [x] T031 Run `npm run build` to verify no build errors
- [x] T032 Run `npm run lint` to verify no lint errors
- [ ] T033 Manual smoke test: chatbot order flow end-to-end
- [ ] T034 Manual smoke test: menu images load on home and menu pages
- [ ] T035 Manual smoke test: home page content is authentic
- [ ] T036 Manual smoke test: about page content is complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS US1
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: No dependency on Phase 2 or US1 — can start after Phase 1
- **Phase 5 (US3)**: No dependency on other stories — can start after Phase 1
- **Phase 6 (US4)**: No dependency on other stories — can start after Phase 1
- **Phase 7 (Polish)**: Depends on all desired stories being complete

### User Story Dependencies

- **US1 (Chatbot)**: Depends on Phase 2 (order detection utilities). Independent of US2, US3, US4.
- **US2 (Images)**: Independent of all other stories. Can start after Phase 1.
- **US3 (Home Page)**: Independent of all other stories. Can start after Phase 1.
- **US4 (About Page)**: Independent of all other stories. Can start after Phase 1.

### Parallel Opportunities

- Phase 1 tasks T001-T002 can run in parallel
- Phase 2 tasks T003-T005 can run in parallel (different files)
- US2 image tasks T013-T025 can all run in parallel (same file but different sections)
- US3 tasks T028-T029 can run in parallel (different files)
- US2, US3, US4 can all start simultaneously after Phase 1

---

## Parallel Example: User Story 2 (Images)

```bash
# All image tasks target different sections of the same file and can be parallelized:
Task T013: "Add Unsplash URLs for Burgers in src/lib/menu-data.ts"
Task T014: "Add Unsplash URLs for Sandwiches in src/lib/menu-data.ts"
Task T015: "Add Unsplash URLs for Broast in src/lib/menu-data.ts"
# ... through T025
```

## Parallel Example: User Stories 2, 3, 4

```bash
# After Phase 1, these stories are fully independent:
Task T013-T027: US2 (Images) — menu-data.ts, FeaturedMenu.tsx, menu/page.tsx
Task T028-T029: US3 (Home) — Hero.tsx, AboutPreview.tsx
Task T030: US4 (About) — about/page.tsx
# No file conflicts between these stories
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T005)
3. Complete Phase 3: User Story 1 (T006-T012)
4. **STOP and VALIDATE**: Test chatbot order flow end-to-end
5. Deploy if ready — chatbot can now place orders via WhatsApp

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. US1 (Chatbot) → Test independently → Deploy (MVP!)
3. US2 (Images) → Test independently → Deploy
4. US3 (Home Page) → Test independently → Deploy
5. US4 (About Page) → Test independently → Deploy
6. Each story adds value without breaking previous stories

### Recommended Order (Solo Developer)

1. **US2 (Images)** first — T013-T025 are simple data entry, quick win
2. **US3 (Home Page)** second — T028-T029 are content rewrites
3. **US4 (About Page)** third — T030 is a single file rewrite
4. **US1 (Chatbot)** last — Most complex, benefits from having the rest of the site polished

---

## Notes

- [P] tasks = different files or different sections, no dependency conflicts
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All 39 menu items need Unsplash URLs — research.md has the URL format: `https://images.unsplash.com/photo-{ID}?w=600&h=400&fit=crop&auto=format&q=80`
