# Implementation Plan: Menu Overhaul with Real Food Images

**Branch**: `008-menu-replace` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-menu-replace/spec.md`

## Summary

Replace all 41 current menu items (many using Unsplash stock photos) with 86 real food photographs organized into 15 categories. Copy images from D:\ root to `public/images/food/{category}/`, rewrite `src/lib/menu-data.ts` with corrected names, preserved/estimated prices, and update the chatbot's menu knowledge.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+, Next.js 14 (App Router)
**Primary Dependencies**: React 18.3, Tailwind CSS 3.x, Groq SDK, Supabase JS Client
**Storage**: Supabase PostgreSQL (existing `customer_orders` table), static data files (no database for menu)
**Testing**: ESLint (no test framework currently configured)
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web application (Next.js 14 App Router)
**Performance Goals**: Menu page loads in under 3 seconds
**Constraints**: Must work within existing Next.js 14 App Router structure, no new backend services
**Scale/Scope**: Single restaurant website, 86 menu items across 15 categories, ~10 concurrent chatbot users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a placeholder with no specific principles defined. No gates to evaluate. Proceeding with standard best practices.

## Project Structure

### Documentation (this feature)

```text
specs/008-menu-replace/
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
├── lib/
│   ├── menu-data.ts           # REWRITE: 86 items, 15 categories, corrected names
│   ├── groq.ts                # VERIFY: buildSystemPrompt() auto-picks up new menu data
│   └── website-context.ts     # VERIFY: buildMenuContext() reads updated menu-data.ts
├── app/
│   ├── menu/
│   │   └── page.tsx           # VERIFY: renders with new item count
│   └── globals.css            # NO CHANGE
├── components/
│   ├── menu/
│   │   ├── MenuCard.tsx       # VERIFY: handles new image formats
│   │   ├── MenuGrid.tsx       # VERIFY: renders 86 items
│   │   └── CategoryFilter.tsx # VERIFY: handles 15 categories
│   └── chat/
│       └── GroqChatWidget.tsx # NO CHANGE
└── types/
    └── index.ts               # NO CHANGE: Category and MenuItem interfaces unchanged

public/
├── images/
│   └── food/
│       ├── burgers/           # 5 images
│       ├── sandwiches/        # 11 images
│       ├── broast/            # 4 images
│       ├── bbq/               # 16 images
│       ├── chargha/           # 1 image
│       ├── karahi/            # 6 images
│       ├── handi/             # 3 images
│       ├── chinese/           # 11 images
│       ├── rolls/             # 19 images
│       ├── pasta/             # 2 images
│       ├── extras/            # 4 images
│       ├── paratha-breads/    # 2 images (NEW category)
│       └── desserts/          # 1 image (NEW category)
└── ... (rest unchanged)
```

**Structure Decision**: Web application structure (existing Next.js 14 App Router). All changes are within `src/lib/menu-data.ts` and `public/images/food/`. No new directories or services needed. Two new subdirectories under `public/images/food/` for the new categories.

## Complexity Tracking

No constitution violations to justify.

## Phase 0: Research

No NEEDS CLARIFICATION items in the spec. All requirements are clear. Research will focus on:

1. Best practices for organizing static menu data in Next.js
2. Image format handling (PNG, JPG, WEBP, AVIF) in Next.js Image component
3. Menu page performance with 86 items

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for entity definitions.

### API Contracts

No API changes needed. The menu is served as static data from `src/lib/menu-data.ts`. The existing endpoints remain unchanged.

### Agent Context Update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode` to update the agent context with new technology from this plan.
