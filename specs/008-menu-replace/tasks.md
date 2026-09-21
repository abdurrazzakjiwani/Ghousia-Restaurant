# Tasks: Menu Overhaul with Real Food Images

**Input**: Design documents from `/specs/008-menu-replace/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Tests are OPTIONAL.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source code**: `src/` at repository root
- **Public assets**: `public/` at repository root
- **Data files**: `src/lib/`

---

## Phase 1: Setup (Image Copy & Directory Creation)

**Purpose**: Copy all 86 images from D:\ to organized directories, create new category folders

**⚠️ CRITICAL**: All image files must be in place before menu data can reference them

- [x] T001 Create directory `public/images/food/paratha-breads/` for new Paratha & Breads category
- [x] T002 Create directory `public/images/food/desserts/` for new Desserts category
- [x] T003 Copy 5 burger images from D:\ to `public/images/food/burgers/` (Zinger Burger.png, Beef Burger.avif, Chicken Burger.jpg, Beef Cheese Burger.jpg, Grilled Chicken Burger.jpg)
- [x] T004 Copy 11 sandwich images from D:\ to `public/images/food/sandwiches/` (Club Sandwitch.png, Crispy Club Sandwitch.png, Chicken Sandwitch.jpg, Chicken Cheese Sandwitch.jpg, BBQ Grilled Sandwitch.jpg, BBQ Sandwitch.jpg, BBQ Cheese Sandwitch.webp, Grilled Chicken Sandwitch.jpg, Malai Club Sandwitch.jpg, Malai Club Cheese Sandwitch.jpg, Club Cheese Sandwitch.avif)
- [x] T005 Copy 4 broast images from D:\ to `public/images/food/broast/` (Fried chicken breast broast.jpg, Chatpata Masala Broast.webp, Dynamite Chicken Broast.webp, Fried Chicken Leg Broast.webp)
- [x] T006 Copy 16 BBQ images from D:\ to `public/images/food/bbq/` (BBQ Platter.png, BBQ Sauce.png, Beef Bihari Boti.png, Beef Dhaga Kabab.png, Beef Gola Kabab.png, Beef Seekh Kabab.png, Chandan Gola Kabab.png, Chicken Bihari Tikka Chest.png, Chicken Chandan Kabab.png, Chicken Green Malai Boti.png, Chicken Malai Boti.png, Chicken Reshmi Gola Kabab.png, Chicken Reshmi Kabab.png, Sizzling Malai Boti.png, Sizzling Tikka.png, Spicy Cicken Boti.png)
- [x] T007 Copy 1 chargha image from D:\ to `public/images/food/chargha/` (Grill Chargha.png)
- [x] T008 Copy 6 karahi images from D:\ to `public/images/food/karahi/` (Boneless Chicken Red Karahi.png, Boneless Chicken White Karahi.png, Chicken Green Karahi.png, Chicken Red Karahi.png, Chicken White Karahi.png, Shahi Chicken Karahi.png)
- [x] T009 Copy 3 handi images from D:\ to `public/images/food/handi/` (Boneless Chicken Creamy Handi.png, Boneless Chicken Handi.png, Boneless Chicken Kashmiri Handi.png)
- [x] T010 Copy 11 Chinese images from D:\ to `public/images/food/chinese/` (Chicken Chilli with rice.png, Chicken Dry Chilli with rice.png, Chicken Fried Rice.png, Chicken Ginger with rice.png, Chicken Jalfrezi with rice.png, Chicken Manchurian with Rice.png, Chicken Sauce with rice.png, Chicken Shashlik with rice.png, Garlic Chicken with Rice.png, Singaporean Chicken with rice.png, Vegetable Fried Rice.png)
- [x] T011 Copy 19 roll images from D:\ to `public/images/food/rolls/` (Beef boti chutney roll.png, Beef boti mayo garlic Roll.png, Beef kabab chutney Roll.png, Beef kabab mayo garlic Roll.png, Chicken cheese roll.png, Chicken Malai boti roll.png, Chicken Mayo Garlic Roll.png, Chicken Reshmi Kabab Garlic Mayo Roll.png, Chicken Reshmi kabab Roll.png, Jumbo Beef boti Roll.png, Jumbo Beef kabab mayo Roll.png, Jumbo Beef kabab Roll.png, Jumbo Beef mayo Roll.png, Jumbo chicken chutney Roll.png, Jumbo chicken mayo Roll.png, Jumbo chicken reshmi kabab mayo Roll.png, Jumbo chicken reshmi kabab Roll.png, Spicy Chicken Chutney roll.png, Zinger roll.png)
- [x] T012 Copy 2 pasta images from D:\ to `public/images/food/pasta/` (Chicken creamy pasta.png, Chicken Pasta.png)
- [x] T013 Copy 4 extras images from D:\ to `public/images/food/extras/` (Extra Bun.png, French Fries.png, Raita.png, Salad.png)
- [x] T014 Copy 2 paratha images from D:\ to `public/images/food/paratha-breads/` (Puri Paratha.png, Roghni Kulcha.png)
- [x] T015 Copy 1 dessert image from D:\ to `public/images/food/desserts/` (Halwa.png)

**Checkpoint**: All 86 images organized in correct directories

---

## Phase 2: Foundational - Menu Data Rewrite (US1 + US2 + US3 + US4)

**Purpose**: Rewrite src/lib/menu-data.ts with 15 categories, 86 items, corrected names, preserved prices

**⚠️ CRITICAL**: This is the core data file that powers the entire menu page and chatbot

### Implementation for User Stories 1, 2, 3, 4

- [x] T016 Rewrite `src/lib/menu-data.ts` categories array — replace 13 categories with 15 categories (remove "Fried" and "Beverages", add "Paratha & Breads" and "Desserts")
- [x] T017 Rewrite `src/lib/menu-data.ts` menuItems array — remove all 41 current items
- [x] T018 Add Burgers category items (5 items): Zinger Burger (Rs. 600), Chicken Burger (Rs. 550), Beef Burger (Rs. 650), Beef Cheese Burger (Rs. 700), Grilled Chicken Burger (Rs. 600)
- [x] T019 Add Sandwiches category items (11 items): Club Sandwich (Rs. 500), Crispy Club Sandwich (Rs. 550), Chicken Sandwich (Rs. 450), Chicken Cheese Sandwich (Rs. 500), BBQ Grilled Sandwich (Rs. 550), BBQ Sandwich (Rs. 500), BBQ Cheese Sandwich (Rs. 550), Grilled Chicken Sandwich (Rs. 500), Malai Club Sandwich (Rs. 500), Malai Club Cheese Sandwich (Rs. 550), Club Cheese Sandwich (Rs. 520)
- [x] T020 Add Broast category items (4 items): Fried Chicken Breast Broast (Rs. 900), Chatpata Masala Broast (Rs. 950), Dynamite Chicken Broast (Rs. 1000), Fried Chicken Leg Broast (Rs. 550)
- [x] T021 Add BBQ category items (16 items): BBQ Platter (Rs. 1500), BBQ Sauce (Rs. 100), Beef Bihari Boti (Rs. 1200), Beef Dhaga Kabab (Rs. 1100), Beef Gola Kabab (Rs. 1000), Beef Seekh Kabab (Rs. 1000), Chandan Gola Kabab (Rs. 900), Chicken Bihari Tikka Chest (Rs. 1100), Chicken Chandan Kabab (Rs. 900), Chicken Green Malai Boti (Rs. 1000), Chicken Malai Boti (Rs. 1000), Chicken Reshmi Gola Kabab (Rs. 900), Chicken Reshmi Kabab (Rs. 900), Sizzling Malai Boti (Rs. 1200), Sizzling Tikka (Rs. 1200), Spicy Chicken Boti (Rs. 900)
- [x] T022 Add Chargha category items (1 item): Grill Chargha (Rs. 1100)
- [x] T023 Add Karahi category items (6 items): Boneless Chicken Red Karahi (Rs. 1600), Boneless Chicken White Karahi (Rs. 1600), Chicken Green Karahi (Rs. 1400), Chicken Red Karahi (Rs. 1400), Chicken White Karahi (Rs. 1400), Shahi Chicken Karahi (Rs. 1800)
- [x] T024 Add Handi category items (3 items): Boneless Chicken Creamy Handi (Rs. 1500), Boneless Chicken Handi (Rs. 1300), Boneless Chicken Kashmiri Handi (Rs. 1600)
- [x] T025 Add Chinese category items (11 items): Chicken Chilli with Rice (Rs. 800), Chicken Dry Chilli with Rice (Rs. 800), Chicken Fried Rice (Rs. 650), Chicken Ginger with Rice (Rs. 750), Chicken Jalfrezi with Rice (Rs. 800), Chicken Manchurian with Rice (Rs. 750), Chicken Sauce with Rice (Rs. 700), Chicken Shashlik with Rice (Rs. 850), Garlic Chicken with Rice (Rs. 800), Singaporean Chicken with Rice (Rs. 850), Vegetable Fried Rice (Rs. 600)
- [x] T026 Add Rolls category items (19 items): Beef Boti Chutney Roll (Rs. 450), Beef Boti Mayo Garlic Roll (Rs. 480), Beef Kabab Chutney Roll (Rs. 420), Beef Kabab Mayo Garlic Roll (Rs. 450), Chicken Cheese Roll (Rs. 400), Chicken Malai Boti Roll (Rs. 450), Chicken Mayo Garlic Roll (Rs. 400), Chicken Reshmi Kabab Garlic Mayo Roll (Rs. 420), Chicken Reshmi Kabab Roll (Rs. 400), Jumbo Beef Boti Roll (Rs. 550), Jumbo Beef Kabab Mayo Roll (Rs. 520), Jumbo Beef Kabab Roll (Rs. 500), Jumbo Beef Mayo Roll (Rs. 520), Jumbo Chicken Chutney Roll (Rs. 500), Jumbo Chicken Mayo Roll (Rs. 500), Jumbo Chicken Reshmi Kabab Mayo Roll (Rs. 520), Jumbo Chicken Reshmi Kabab Roll (Rs. 500), Spicy Chicken Chutney Roll (Rs. 420), Zinger Roll (Rs. 400)
- [x] T027 Add Pasta category items (2 items): Chicken Creamy Pasta (Rs. 700), Chicken Pasta (Rs. 700)
- [x] T028 Add Extras category items (4 items): Extra Bun (Rs. 50), French Fries (Rs. 300), Raita (Rs. 80), Salad (Rs. 100)
- [x] T029 Add Paratha & Breads category items (2 items): Puri Paratha (Rs. 120), Roghni Kulcha (Rs. 100)
- [x] T030 Add Desserts category items (1 item): Halwa (Rs. 150)
- [x] T031 Fix all typos in item names: "Sandwitch" → "Sandwich", "Brger" → "Burger", "Cicken" → "Chicken"
- [x] T032 Verify all image_url paths point to correct files in public/images/food/
- [x] T033 Verify Zinger Burger price is Rs. 600 (preserved from original)
- [x] T034 Verify all 86 items have prices > 0 and < 5000

**Checkpoint**: Menu data file rewritten with 15 categories, 86 items, corrected names, valid prices

---

## Phase 3: User Story 5 - Chatbot Knows New Menu (Priority: P3)

**Goal**: Chatbot accurately answers questions about all 86 menu items

**Independent Test**: Ask chatbot about "Chatpata Masala Broast", "Puri Paratha", "Halwa" — verify accurate responses

### Implementation for User Story 5

- [x] T035 Verify `src/lib/website-context.ts` buildMenuContext() reads from updated menu-data.ts
- [x] T036 Verify `src/lib/groq.ts` buildSystemPrompt() includes updated menu context
- [x] T037 Verify chatbot responds accurately to "What broast options do you have?"
- [x] T038 Verify chatbot responds accurately to "Do you have paratha?"

**Checkpoint**: Chatbot knowledge synchronized with new 86-item menu

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T039 Run `npm run lint` and fix any ESLint errors
- [x] T040 Run `npm run build` and verify no build errors
- [x] T041 Verify menu page renders without errors at `/menu`
- [x] T042 Verify all 86 images load correctly on menu page
- [x] T043 Verify category filtering works with 15 categories
- [x] T044 Verify no Unsplash/stock images remain in menu data
- [x] T045 Deploy to Vercel and run quickstart.md validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (images must be in place)
- **US5 - Chatbot (Phase 3)**: Depends on Phase 2 (menu data must be updated)
- **Polish (Phase 4)**: Depends on all previous phases being complete

### User Story Dependencies

- **US1 (P1)**: Implemented in Phase 2 (menu data rewrite)
- **US2 (P1)**: Implemented in Phase 2 (category additions)
- **US3 (P2)**: Implemented in Phase 2 (typo fixes)
- **US4 (P2)**: Implemented in Phase 2 (price handling)
- **US5 (P3)**: Depends on Phase 2 - verifies chatbot integration

### Within Each Phase

- Image copy tasks (T003-T015) can run in parallel
- Menu data tasks (T016-T034) must run sequentially (same file)
- Verification tasks can run after implementation

### Parallel Opportunities

- **Phase 1**: All image copy tasks (T003-T015) can run in parallel
- **Phase 2**: All menu data tasks must be sequential (single file)
- **Phase 3**: Verification tasks can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1-4 Combined)

1. Complete Phase 1: Copy all 86 images
2. Complete Phase 2: Rewrite menu-data.ts with all items
3. **STOP and VALIDATE**: Test menu page independently
4. Deploy if ready

### Incremental Delivery

1. Complete Phase 1 → Images ready
2. Complete Phase 2 → Menu data complete (US1-US4 delivered together)
3. Complete Phase 3 → Chatbot synced (US5 delivered)
4. Complete Phase 4 → Polish and deploy

### Recommended Delivery Order

1. **Phase 1**: Image copy — ~10 min
2. **Phase 2**: Menu data rewrite — ~30 min
3. **Phase 3**: Chatbot verification — ~5 min
4. **Phase 4**: Polish — ~10 min

**Total estimated time**: ~55 minutes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1-US4 are tightly coupled (all involve menu-data.ts) and delivered together
- US5 is independent verification of chatbot integration
- All 86 images must be copied before menu data can reference them
- The chatbot automatically picks up menu changes via buildMenuContext()
- Commit after each phase
