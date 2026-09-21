# Tasks: 001-restaurant-redesign

**Input**: Design documents from `/specs/001-restaurant-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested — manual browser testing and `npm run build` / `npm run lint` only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization — color scheme, fonts, asset moves

- [x] T001 [P] Replace purple gradient with orange in `tailwind.config.ts` — change `gradient.start` to `#f59e0b` and `gradient.end` to `#ea580c`
- [x] T002 [P] Add Poppins font import in `src/app/layout.tsx` — import `Poppins` from `next/font/google`, add `variable: "--font-poppins"`, apply to body alongside existing Inter variable
- [x] T003 [P] Move branch photos from project root to `public/images/branches/` — rename `Ghousia Golden Spoon.png` → `golden-spoon.png`, `Ghousia Silver Spoon.jpg` → `silver-spoon.jpg`, `Ghousia Fast Food and Chineese.jpg` → `fast-food-chinese.jpg`, `Family Hall 1.jpg` → `family-hall-1.jpg`, `Family Hall 2.jpg` → `family-hall-2.jpg`
- [x] T004 [P] Convert 3 hero images to WebP format (max 1920px width) — replace `public/images/hero/hero1.png`, `hero2.png`, `hero3.png` with `.webp` versions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core color/typography changes that affect ALL pages — must complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Replace all purple references with orange in `src/app/globals.css` — change `#667eea` → `#f59e0b`, `#764ba2` → `#ea580c` in all gradients, scrollbar colors, focus rings, and pulse-glow animations
- [x] T006 Apply `font-poppins` variable to headings in `src/app/globals.css` — add `font-family: var(--font-poppins)` to h1-h6 styles with `tracking-tight`
- [x] T007 Apply `font-inter` with `leading-relaxed` to body text in `src/app/globals.css` — ensure paragraphs and body elements use Inter with comfortable line height
- [x] T008 Update `src/app/layout.tsx` body className to include both `poppins.variable` and `inter.className`

**Checkpoint**: Foundation ready — orange color scheme and typography applied globally

---

## Phase 3: User Story 1 — Visual Identity Overhaul (Priority: P1) 🎯 MVP

**Goal**: Customers see orange scheme, Poppins headings, official WhatsApp logo on all pages

**Independent Test**: Visit any page — verify orange replaces purple, headings use Poppins, WhatsApp button shows official WhatsApp logo (not generic chat bubble)

### Implementation for User Story 1

- [x] T009 [P] [US1] Replace `MessageCircle` icon with inline WhatsApp SVG in `src/components/ui/WhatsAppButton.tsx` — use official WhatsApp logo path (green bubble with white phone)
- [x] T010 [P] [US1] Update orange colors in `src/components/home/Hero.tsx` — change gradient classes from purple to orange, set section background to `bg-gray-900`
- [x] T011 [P] [US1] Update orange colors in `src/components/home/FeaturedMenu.tsx` — change any purple gradient references to orange
- [x] T012 [P] [US1] Update orange colors in `src/components/home/AboutPreview.tsx` — change any purple gradient references to orange
- [x] T013 [P] [US1] Update orange colors in `src/components/ui/Button.tsx` — change primary gradient from purple to orange
- [x] T014 [P] [US1] Update orange colors in `src/components/ui/ScrollProgress.tsx` — change inline gradient color from purple to orange
- [x] T015 [US1] Update `src/app/location/page.tsx` — add "View all branches" link pointing to `/branches`

**Checkpoint**: US1 complete — orange scheme, Poppins headings, WhatsApp logo verified on all pages

---

## Phase 4: User Story 2 — Voice Agent Button Redesign (Priority: P1)

**Goal**: Clear robot icon button with "Give order in voice" label opens ElevenLabs widget

**Independent Test**: Visit any page — verify robot icon button appears above WhatsApp button, label shows on hover, clicking opens voice agent widget

### Implementation for User Story 2

- [x] T016 [US2] Create `src/components/ui/SpooniFAB.tsx` — fixed position button (`bottom-24 right-6 z-50`), `Bot` icon from lucide-react, "Give order in voice" tooltip, orange gradient background, click handler dispatches event to `elevenlabs-convai` element
- [x] T017 [US2] Add ElevenLabs default FAB hiding CSS in `src/app/globals.css` — style rule to hide `elevenlabs-convai` default floating button
- [x] T018 [US2] Import and render `SpooniFAB` in `src/app/layout.tsx` — place above WhatsApp button in the layout

**Checkpoint**: US2 complete — robot button visible, labeled, functional

---

## Phase 5: User Story 3 — Branches Discovery Page (Priority: P2)

**Goal**: Dedicated `/branches` page shows 3 restaurant cards + 2 family halls with images

**Independent Test**: Navigate to `/branches` — verify all 3 branch cards with images/addresses, family halls section at bottom, mobile responsive stacking

### Implementation for User Story 3

- [x] T019 [P] [US3] Create `src/lib/branches-data.ts` — export typed arrays for 3 branches (name, address, image path, mapQuery) and 2 family halls (name, image path)
- [x] T020 [US3] Create `src/app/branches/page.tsx` — branch cards with images, names, addresses, Google Maps links; family halls section with "That's not all — we also have two large family halls for you" text
- [x] T021 [US3] Add "Branches" link to `src/components/layout/Navbar.tsx` — insert between "About" and "Location" nav items

**Checkpoint**: US3 complete — branches page loads with all cards, family halls, and navbar link

---

## Phase 6: User Story 4 — Enhanced Testimonials (Priority: P2)

**Goal**: 100 auto-cycling testimonials with sketch-style avatars in a single-card carousel

**Independent Test**: View homepage testimonials — verify auto-cycle every 4s, sketch avatars with initials, dot indicators for manual navigation, pause on hover

### Implementation for User Story 4

- [x] T022 [P] [US4] Create `src/lib/testimonials-data.ts` — export array of 100 testimonial objects with name (Pakistani names), rating (4-5), comment (food-related), and unique seed
- [x] T023 [US4] Rewrite `src/components/home/Testimonials.tsx` — import 100 testimonials, `useState` for currentIndex, `useEffect` with `setInterval` (4s), Framer Motion `AnimatePresence` crossfade, sketch-style inline SVG avatars (grayscale + contrast filters + dashed borders), dot indicators, pause on hover, `prefers-reduced-motion` support

**Checkpoint**: US4 complete — 100 testimonials cycling smoothly with sketch avatars

---

## Phase 7: User Story 5 — Richer Home Page Content (Priority: P3)

**Goal**: Homepage expanded with Why Choose Us, Popular Categories, and CTA Banner sections

**Independent Test**: Visit homepage — verify all 3 new sections render with correct content and styling between existing sections

### Implementation for User Story 5

- [x] T024 [P] [US5] Create `src/components/home/WhyChooseUs.tsx` — 4 feature cards (Fresh Ingredients, Fast Delivery, Family Recipes, Easy Ordering) with emoji icons, orange gradient icon circles, titles, and descriptions
- [x] T025 [P] [US5] Create `src/components/home/PopularCategories.tsx` — top 8 categories from `src/lib/menu-data.ts` displayed as cards with emoji icons, names, item counts, linking to `/menu`
- [x] T026 [P] [US5] Create `src/components/home/CTABanner.tsx` — full-width orange gradient banner with "Ready to Order?" headline, phone number, "Order on WhatsApp" and "Reserve a Table" buttons
- [x] T027 [US5] Add all 3 new sections to `src/app/page.tsx` — insert WhyChooseUs after FeaturedMenu, PopularCategories after AboutPreview, CTABanner after Testimonials

**Checkpoint**: US5 complete — homepage has all 6+ sections rendering correctly

---

## Phase 8: User Story 6 — Hero Image Optimization (Priority: P3)

**Goal**: Hero images load fast in WebP format with neutral dark fallback background

**Independent Test**: Open homepage — verify hero images load within 2s, no purple gradient placeholder, section background is dark neutral color

### Implementation for User Story 6

- [x] T028 [US6] Update `src/components/home/Hero.tsx` — change image paths from `.png` to `.webp`, ensure `priority` prop on first image, verify `bg-gray-900` section background
- [x] T029 [US6] Verify hero image optimization — confirm `npm run build` succeeds with WebP images, check file sizes are ~200-400KB each

**Checkpoint**: US6 complete — hero loads fast with WebP, no purple placeholder visible

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T030 Run `npm run lint` — fix any lint errors across all modified/new files
- [x] T031 Run `npm run build` — verify zero build errors
- [x] T032 Run quickstart.md validation — manually test all 9 steps from quickstart.md to confirm everything works end-to-end
- [x] T033 Verify no regression — test existing features (menu, reservations, ordering, reviews, dark mode, chatbot) still work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately. T001-T004 all parallel.
- **Foundational (Phase 2)**: Depends on T001 (tailwind.config.ts) and T002 (layout.tsx) completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 2 completion — can run parallel with US1
- **US3 (Phase 5)**: Depends on Phase 2 completion — can run parallel with US1/US2
- **US4 (Phase 6)**: Depends on Phase 2 completion — can run parallel with US1/US2/US3
- **US5 (Phase 7)**: Depends on Phase 2 completion — can run parallel with US1-US4
- **US6 (Phase 8)**: Depends on Phase 2 completion — can run parallel with US1-US5
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no dependencies on other stories
- **US2 (P1)**: After Phase 2 — no dependencies on other stories
- **US3 (P2)**: After Phase 2 — no dependencies on other stories
- **US4 (P2)**: After Phase 2 — no dependencies on other stories
- **US5 (P3)**: After Phase 2 — no dependencies on other stories
- **US6 (P3)**: After Phase 2 — no dependencies on other stories (T010 in US1 already sets `bg-gray-900`)

### Within Each User Story

- Static data files before components that consume them
- Components before page integration
- Core implementation before polish

### Parallel Opportunities

- **Phase 1**: All 4 tasks (T001-T004) run in parallel
- **Phase 2**: T005-T008 can run in parallel (different CSS concerns)
- **Phase 3 (US1)**: T009-T014 all run in parallel (different component files)
- **Phase 5 (US3)**: T019 runs first (data), then T020-T021 in parallel
- **Phase 6 (US4)**: T022 runs first (data), then T023
- **Phase 7 (US5)**: T024-T026 all run in parallel (different component files), then T027
- **Cross-story**: Once Phase 2 completes, all 6 user stories can be worked on in parallel

---

## Parallel Example: User Story 1

```bash
# After Phase 2 completes, launch all US1 tasks in parallel:
Task: "Replace MessageCircle with WhatsApp SVG in WhatsAppButton.tsx"
Task: "Update orange colors in Hero.tsx"
Task: "Update orange colors in FeaturedMenu.tsx"
Task: "Update orange colors in AboutPreview.tsx"
Task: "Update orange colors in Button.tsx"
Task: "Update orange colors in ScrollProgress.tsx"
```

---

## Parallel Example: All User Stories (After Foundational)

```bash
# After Phase 2 completes, all stories can start simultaneously:
# US1: Color updates across 7 files
# US2: Create SpooniFAB.tsx + layout integration
# US3: Create branches-data.ts + branches page + navbar link
# US4: Create testimonials-data.ts + rewrite Testimonials.tsx
# US5: Create 3 new components + add to page.tsx
# US6: Update Hero.tsx image paths to WebP
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T008)
3. Complete Phase 3: User Story 1 (T009-T015)
4. **STOP and VALIDATE**: Test orange scheme, Poppins headings, WhatsApp logo
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Visual Identity) → Test → Deploy (MVP!)
3. Add US2 (Voice Agent) → Test → Deploy
4. Add US3 (Branches) → Test → Deploy
5. Add US4 (Testimonials) → Test → Deploy
6. Add US5 (Home Sections) → Test → Deploy
7. Add US6 (Hero Optimization) → Test → Deploy
8. Polish → Final build → Ship

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 + US2 (P1 stories — visual identity + voice agent)
   - Developer B: US3 + US4 (P2 stories — branches + testimonials)
   - Developer C: US5 + US6 (P3 stories — home sections + hero optimization)
3. Stories complete and integrate independently
4. Polish phase together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks included (not requested) — use manual browser testing + `npm run build` + `npm run lint`
