# Tasks: Double Navbar Redesign

**Input**: Design documents from `/specs/010-double-navbar/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: Not explicitly requested. Tests are OPTIONAL.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source code**: `src/` at repository root
- **Components**: `src/components/`
- **Pages**: `src/app/`

---

## Phase 1: Setup (Navbar Container)

**Purpose**: Rewrite the Navbar container to support two-band sticky structure

**⚠️ CRITICAL**: This establishes the foundation that all other components depend on

- [X] T001 Rewrite `src/components/layout/Navbar.tsx` — single sticky container (`sticky top-0 z-30`) wrapping two internal bands: InfoBar (top) and MainNav (bottom). Import and render InfoBar and MainNav components. Keep existing `useTheme` hook integration.

**Checkpoint**: Navbar renders a two-band structure (even if bands are empty placeholders)

---

## Phase 2: User Story 1 — Info Bar with Contact & Hours (Priority: P1)

**Goal**: Display restaurant phone number, operating hours, and Track Order link at the top of every page

**Independent Test**: Visit any page → verify info bar displays phone, hours, Track Order link

### Implementation for User Story 1

- [X] T002 [P] [US1] Create `src/components/layout/InfoBar.tsx` — top info bar component with: phone number (tap-to-call via `tel:` link), operating hours text, "Track Order" link to `/tracking`. Read values from environment variables (`NEXT_PUBLIC_RESTAURANT_PHONE2`, `NEXT_PUBLIC_RESTAURANT_HOURS`) with defaults. Responsive: hidden on mobile (`hidden sm:flex`), phone-only on tablet (`md:hidden`), full on desktop.

**Checkpoint**: Info bar displays phone, hours, and Track Order on desktop; hidden on mobile; phone-only on tablet

---

## Phase 3: User Story 2 — Main Navigation with Cart & Search (Priority: P1)

**Goal**: Clean main nav with logo, links, cart badge, search icon, dark mode toggle

**Independent Test**: Navigate between pages → verify logo, links, cart badge updates, search expands

### Implementation for User Story 2

- [X] T003 [P] [US2] Create `src/components/layout/CartBadge.tsx` — cart icon (`ShoppingCart` from lucide-react) with animated count badge. Use `useCart()` hook internally. Check `mounted` flag before rendering count to avoid hydration mismatch. Display "99+" when count > 99. Click navigates to `/order`.
- [X] T004 [P] [US2] Create `src/components/layout/SearchInput.tsx` — expandable inline search input. Collapsed: search icon button. Expanded: text input with results dropdown. Use `useState` for open/query/results. Auto-focus input on expand. Use `searchItems()` from `src/lib/menu-data.ts` for filtering. Show "No items found" when no results. Collapse on Escape, outside click, or result selection. Call `onNavigate` prop with `/menu?highlight={itemId}` when result selected.
- [X] T005 [US2] Create `src/components/layout/MainNav.tsx` — main navigation row. Logo (text "Ghousia Golden Spoon" with gradient) on left. Nav links (Home, Menu, About, Contact) in center. SearchInput, CartBadge, DarkModeToggle on right. Phone icon (tap-to-call) visible on mobile only. Hamburger button on mobile (`md:hidden`). Use `usePathname()` from `next/navigation` for active link highlighting. Pass `navLinks` array to MobileDrawer.

**Checkpoint**: Main nav shows logo, 4 links, search icon, cart badge, dark mode toggle; cart badge updates in real-time

---

## Phase 4: User Story 3 — Menu Category Dropdown (Priority: P2)

**Goal**: Hover/click Menu link → dropdown with 13 food categories

**Independent Test**: Hover Menu link → verify dropdown appears with all categories → click category → navigate to /menu with category selected

### Implementation for User Story 3

- [X] T006 [P] [US3] Create `src/components/layout/CategoryDropdown.tsx` — category dropdown component. Show all 13 categories from `categories` array in `src/lib/menu-data.ts` as horizontal pill buttons. Use Framer Motion for open/close animation. Handle hover open/close with 200ms delay (use `setTimeout`/`clearTimeout`). Close on Escape key. Call `onSelect(slug)` when category clicked.
- [X] T007 [US3] Modify `src/components/layout/MainNav.tsx` — add CategoryDropdown to the Menu link. Render CategoryDropdown below Menu link on hover/click. Pass `categories` array and navigation handler. On mobile: Menu link navigates to `/menu` directly (no dropdown).

**Checkpoint**: Hover Menu → dropdown with 13 categories → click category → navigate to /menu with category pre-selected

---

## Phase 5: User Story 4 — Simplified Navigation Links (Priority: P2)

**Goal**: Reduce nav links from 8 to 4 (Home, Menu, About, Contact). Add Branches/Location/Reserve links to Contact page.

**Independent Test**: Verify navbar shows only 4 links. Verify Contact page has links to Branches, Location, Reservation.

### Implementation for User Story 4

- [X] T008 [US4] Modify `src/components/layout/MainNav.tsx` — update `navLinks` array to only include Home, Menu, About, Contact. Remove Branches, Location, Reserve, Track Order from main nav links. Track Order moves to InfoBar (already done in T002).
- [X] T009 [US4] Modify `src/app/contact/page.tsx` — add a new section after the contact form with three card-style links: Branches (with branch image from `branches-data.ts`), Location (with map icon), Reservation (with calendar icon). Each card links to its respective page (`/branches`, `/location`, `/reservation`). Use existing `branches` data from `src/lib/branches-data.ts`.

**Checkpoint**: Navbar shows only Home, Menu, About, Contact. Contact page has Branches/Location/Reserve links. Direct URL access to /branches, /location, /reservation still works.

---

## Phase 6: User Story 5 — Mobile Responsive Design (Priority: P2)

**Goal**: Double navbar adapts to mobile/tablet with drawer navigation

**Independent Test**: Resize to mobile → verify info bar hidden, hamburger menu works, drawer slides in

### Implementation for User Story 5

- [X] T010 [P] [US5] Create `src/components/layout/MobileDrawer.tsx` — full-width slide-in drawer from right. Use Framer Motion `AnimatePresence` for enter/exit animation. Contains: all nav links, dark mode toggle, search option. Handle: backdrop click close, Escape key close, link click close + navigate. Accept `isOpen`, `onClose`, `navLinks`, `isDark`, `onToggleDark` props.
- [X] T011 [US5] Modify `src/components/layout/MainNav.tsx` — integrate MobileDrawer. Add hamburger button toggle state (`drawerOpen`). Pass state and handlers to MobileDrawer. On mobile: hamburger visible, desktop links hidden. Phone icon (tap-to-call) visible on mobile only.
- [X] T012 [US5] Modify `src/components/layout/InfoBar.tsx` — verify responsive behavior. Hidden on mobile (`< 640px`). Phone-only on tablet (`640px - 768px`). Full on desktop (`> 768px`). Use Tailwind responsive classes: `hidden sm:flex md:hidden lg:flex`.

**Checkpoint**: Mobile: info bar hidden, hamburger opens drawer with all links. Tablet: info bar shows phone only. Desktop: full double navbar.

---

## Phase 7: User Story 6 — Accessibility & Active State (Priority: P3)

**Goal**: Keyboard navigation, screen reader labels, active page highlighting

**Independent Test**: Tab through navbar → verify focus indicators. Use screen reader → verify aria labels. Navigate to page → verify active link highlighted.

### Implementation for User Story 6

- [X] T013 [P] [US6] Add `aria-label` attributes to all icon buttons across navbar components: hamburger (`aria-label="Open menu"` / `"Close menu"`), search icon (`aria-label="Search menu"`), cart icon (`aria-label="Shopping cart, N items"`), dark mode toggle (existing), phone icon (`aria-label="Call restaurant"`). Update `src/components/layout/MainNav.tsx`, `src/components/layout/CartBadge.tsx`, `src/components/layout/SearchInput.tsx`, `src/components/layout/MobileDrawer.tsx`.
- [X] T014 [P] [US6] Add `focus-visible` ring styles to all interactive navbar elements. Use Tailwind `focus-visible:ring-2 focus-visible:ring-gradient-start focus-visible:outline-none` on links, buttons, and icons. Apply to `src/components/layout/MainNav.tsx`, `src/components/layout/CartBadge.tsx`, `src/components/layout/SearchInput.tsx`, `src/components/layout/CategoryDropdown.tsx`, `src/components/layout/MobileDrawer.tsx`, `src/components/layout/InfoBar.tsx`.
- [X] T015 [US6] Add active page highlighting to `src/components/layout/MainNav.tsx`. Use `usePathname()` from `next/navigation` to detect current route. Apply visual indicator (underline or background color) to matching nav link. Use `cn()` utility for conditional class application.

**Checkpoint**: All icon buttons have aria-labels. All interactive elements have focus-visible rings. Active page link is visually highlighted.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Search highlight support, utility classes, final validation

- [X] T016 Modify `src/app/menu/page.tsx` — add search result highlight support. Accept `highlight` query parameter from URL. Use `useEffect` to find target item element by ID, call `scrollIntoView({ behavior: 'smooth', block: 'center' })`, apply temporary CSS class (border + background) that fades out after 2-3 seconds via `setTimeout`.
- [X] T017 Add `scrollbar-hide` utility class to `src/app/globals.css`. Use CSS to hide horizontal scrollbar on category dropdown and search results. Add `.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }` and `.scrollbar-hide::-webkit-scrollbar { display: none; }`.
- [X] T018 Run `npm run lint` and fix any ESLint errors
- [X] T019 Run `npm run build` and verify no build errors
- [X] T020 Verify all quickstart.md validation scenarios pass (13 scenarios)
- [X] T021 Deploy to Vercel and verify production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — must start first (establishes Navbar container)
- **Phase 2 (US1 - Info Bar)**: Depends on Phase 1 (T001)
- **Phase 3 (US2 - Main Nav)**: Depends on Phase 1 (T001)
- **Phase 4 (US3 - Category Dropdown)**: Depends on Phase 3 (T005 MainNav)
- **Phase 5 (US4 - Simplified Links)**: Depends on Phase 3 (T005 MainNav)
- **Phase 6 (US5 - Mobile)**: Depends on Phase 3 (T005 MainNav)
- **Phase 7 (US6 - Accessibility)**: Depends on Phases 3-6 (all components created)
- **Phase 8 (Polish)**: Depends on all previous phases

### User Story Dependencies

- **US1 (P1)**: Info Bar — independent (only needs Navbar container)
- **US2 (P1)**: Main Nav — independent (only needs Navbar container)
- **US3 (P2)**: Category Dropdown — depends on US2 (needs MainNav)
- **US4 (P2)**: Simplified Links — depends on US2 (needs MainNav)
- **US5 (P2)**: Mobile — depends on US2 (needs MainNav)
- **US6 (P3)**: Accessibility — depends on US2, US3, US4, US5 (needs all components)

### Within Each Phase

- Component creation tasks can run in parallel if different files
- Page modifications must be sequential (same file)

### Parallel Opportunities

- **Phase 2 + Phase 3**: T002 (InfoBar) and T003-T004 (CartBadge, SearchInput) can run in parallel (different files)
- **Phase 3**: T003 (CartBadge) and T004 (SearchInput) can run in parallel (different files)
- **Phase 4**: T006 (CategoryDropdown) can run in parallel with Phase 5 and 6 (different files)
- **Phase 5**: T008 and T009 can run in parallel (different files)
- **Phase 6**: T010 (MobileDrawer) can run in parallel with T013-T014 (accessibility)
- **Phase 7**: T013 and T014 can run in parallel (different aspects)
- **Cross-phase**: Phases 2 and 3 can run in parallel (both depend only on Phase 1)

---

## Implementation Strategy

### MVP First (User Stories 1+2 Combined)

1. Complete Phase 1: Navbar container (T001)
2. Complete Phase 2: Info Bar (T002)
3. Complete Phase 3: Main Nav with Cart & Search (T003-T005)
4. **STOP and VALIDATE**: Test info bar, cart badge, search on all pages
5. Continue with Phase 4, 5, or 6

### Incremental Delivery

1. Complete Phase 1 → Navbar container ready (deployable)
2. Complete Phase 2 → Info bar visible (deployable)
3. Complete Phase 3 → Main nav with cart & search (deployable)
4. Complete Phase 4 → Category dropdown working (deployable)
5. Complete Phase 5 → Simplified links + Contact page (deployable)
6. Complete Phase 6 → Mobile responsive (deployable)
7. Complete Phase 7 → Accessibility complete (deployable)
8. Complete Phase 8 → Polish and final deploy

### Recommended Delivery Order

1. **Phase 1**: Navbar container — ~5 min
2. **Phase 2**: Info Bar — ~10 min
3. **Phase 3**: Main Nav with Cart & Search — ~25 min
4. **Phase 4**: Category Dropdown — ~15 min
5. **Phase 5**: Simplified Links — ~10 min
6. **Phase 6**: Mobile Responsive — ~15 min
7. **Phase 7**: Accessibility — ~10 min
8. **Phase 8**: Polish — ~10 min

**Total estimated time**: ~100 minutes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 are independent and can be developed in parallel
- US3, US4, US5 depend on US2 (need MainNav component)
- US6 depends on all previous stories (accessibility touches all components)
- Reuses existing components: DarkModeToggle, useCart, useTheme, searchItems, categories, cn
- No new API endpoints needed — all changes are client-side
- Cart state unchanged (localStorage via useCart hook)
- Environment variables already configured for phone and hours
