# Implementation Plan: Double Navbar Redesign

**Branch**: `010-double-navbar` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-double-navbar/spec.md`

## Summary

Redesign the single-row navbar into a double-row layout: a top info bar (phone, hours, Track Order) and a main navigation bar (logo, links, search, cart badge, dark mode). Remove Branches, Location, and Reserve from nav. Add menu category dropdown, expandable search input, cart badge with count, and accessibility improvements. Update Contact page to include links to removed pages.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+, Next.js 14 (App Router)
**Primary Dependencies**: React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Lucide React
**Storage**: localStorage for cart (existing `useCart` hook)
**Testing**: ESLint (no test framework configured)
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web application (Next.js 14 App Router)
**Performance Goals**: Navbar renders without layout shift, search results appear within 1 second, dropdown animations at 60fps
**Constraints**: Must work within existing Next.js 14 App Router structure, no new backend services, reuse existing components (Modal, useCart, CategoryFilter, DarkModeToggle), single sticky container for both navbar rows
**Scale/Scope**: Single restaurant website, ~85 menu items, ~10 concurrent users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution file exists (template only, no ratified constitution). No gates to evaluate. Proceeding with standard best practices.

## Project Structure

### Documentation (this feature)

```text
specs/010-double-navbar/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/
│   │   ├── DarkModeToggle.tsx    # REUSE: existing dark mode toggle
│   │   └── Modal.tsx             # NO CHANGE
│   ├── menu/
│   │   ├── CategoryFilter.tsx    # REUSE/ADAPT: horizontal scroll pills for navbar dropdown
│   │   ├── MenuCard.tsx          # NO CHANGE
│   │   ├── MenuGrid.tsx          # NO CHANGE
│   │   └── MenuItemModal.tsx     # NO CHANGE
│   ├── order/
│   │   └── (existing components) # NO CHANGE
│   ├── home/
│   │   └── (existing components) # NO CHANGE
│   ├── layout/
│   │   ├── Navbar.tsx            # REWRITE: two-band sticky structure
│   │   ├── InfoBar.tsx           # NEW: top info bar component
│   │   ├── MainNav.tsx           # NEW: main navigation row component
│   │   ├── CartBadge.tsx         # NEW: cart icon + animated count badge
│   │   ├── SearchInput.tsx       # NEW: expandable inline search input
│   │   ├── CategoryDropdown.tsx  # NEW: category dropdown for Menu link
│   │   ├── MobileDrawer.tsx      # NEW: full-width mobile navigation drawer
│   │   └── Footer.tsx            # NO CHANGE
│   └── contact/
│       └── ContactForm.tsx       # NO CHANGE
├── app/
│   ├── layout.tsx                # NO CHANGE (Navbar rendered once)
│   ├── page.tsx                  # NO CHANGE
│   ├── menu/
│   │   ├── page.tsx              # MODIFY: add search result highlight support
│   │   └── [id]/page.tsx         # NO CHANGE
│   ├── order/
│   │   └── page.tsx              # NO CHANGE
│   ├── contact/
│   │   └── page.tsx              # MODIFY: add Branches/Location/Reserve links
│   ├── about/
│   │   └── page.tsx              # NO CHANGE
│   ├── branches/
│   │   └── page.tsx              # NO CHANGE (route preserved)
│   ├── location/
│   │   └── page.tsx              # NO CHANGE (route preserved)
│   └── reservation/
│       └── page.tsx              # NO CHANGE (route preserved)
├── hooks/
│   └── useCart.ts                # NO CHANGE: existing cart hook
├── lib/
│   ├── utils.ts                  # REUSE: cn() utility
│   ├── menu-data.ts              # REUSE: searchItems(), categories, menuItems
│   ├── animations.ts             # REUSE: existing animation variants
│   └── branches-data.ts          # REUSE: branches data for Contact page
└── types/
    └── index.ts                  # NO CHANGE
```

**Structure Decision**: Web application structure (existing Next.js 14 App Router). Changes are within `src/components/layout/` (rewrite + 6 new components), `src/app/menu/page.tsx` (minor modification), and `src/app/contact/page.tsx` (add links). No new directories needed.

## Complexity Tracking

No constitution violations to justify.

## Phase 0: Research

All requirements are clear from the spec. Research focuses on:

1. Best practices for double/two-row navbar patterns in React/Next.js
2. Expandable search input patterns with animation
3. Category dropdown hover behavior with delay
4. Sticky container patterns for dual-row navbars
5. Cart badge patterns with real-time updates
6. Mobile drawer navigation patterns
7. Search result scroll-to-item with highlight animation

See [research.md](./research.md) for findings.

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for entity definitions.

### API Contracts

No new API endpoints needed. The feature uses:
- Existing `useCart` hook (localStorage)
- Existing `searchItems()` function (client-side)
- Existing `categories` array (client-side)
- Environment variables for phone and hours

See [contracts/](./contracts/) for data contracts.

### Agent Context Update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode` to update the agent context with new technology from this plan.
