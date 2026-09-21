# Implementation Plan: Homepage UX Fixes

**Branch**: `015-homepage-ux-fixes` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/015-homepage-ux-fixes/spec.md`

## Summary

Fix 5 critical homepage UX issues: (1) menu navigation broken across all entry points due to `useSearchParams()` suspension, (2) "Our Specialties" shows 11 items instead of 4, (3) CTA section needs dine-in focus with specific text, (4) floating icons need position rotation, (5) hero section needs darker overlay for text readability.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion)  
**Storage**: localStorage for cart (existing), static menu data  
**Testing**: Manual verification, npm run build  
**Target Platform**: Web (modern browsers)  
**Project Type**: Web application (Next.js)  
**Performance Goals**: Menu page load < 1 second  
**Constraints**: Static menu data, no backend changes required  
**Scale/Scope**: Single restaurant website, ~87 menu items

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: Constitution file is a template (not filled in). No constitutional gates to check. Proceeding with implementation.

## Project Structure

### Documentation (this feature)

```text
specs/015-homepage-ux-fixes/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API changes)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx                    # Homepage (no changes needed)
│   └── menu/
│       └── page.tsx                # Menu page (no changes needed)
├── components/
│   ├── home/
│   │   ├── FeaturedMenu.tsx        # MODIFY: Filter to 4 items
│   │   ├── CTABanner.tsx           # MODIFY: Dine-in text, remove WhatsApp
│   │   ├── Hero.tsx                # MODIFY: Increase overlay opacity
│   │   ├── GrillCharghaShowcase.tsx # No changes (link already correct)
│   │   └── PopularCategories.tsx   # No changes (link already correct)
│   ├── menu/
│   │   └── MenuClientContent.tsx   # MODIFY: Fix useSearchParams suspension
│   ├── layout/
│   │   └── CartBadge.tsx           # No changes (link already correct)
│   └── ui/
│       ├── SpooniFAB.tsx           # MODIFY: Position bottom-6 right-6
│       ├── WhatsAppButton.tsx      # MODIFY: Position bottom-24 left-6
│       └── BackToTop.tsx           # MODIFY: Position bottom-24 right-6
├── lib/
│   └── menu-data.ts                # MODIFY: Un-feature 7 items
└── chat/
    └── GroqChatWidget.tsx          # MODIFY: Position bottom-6 right-6
```

**Structure Decision**: Existing Next.js App Router structure maintained. All changes are component-level modifications within the existing architecture.

## Complexity Tracking

> No constitution violations to justify. Feature is straightforward UI modifications.
