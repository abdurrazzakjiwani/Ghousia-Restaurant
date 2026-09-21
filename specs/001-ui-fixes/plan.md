# Implementation Plan: UI/UX Fixes

**Branch**: `001-ui-fixes` | **Date**: 2026-09-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ui-fixes/spec.md`

## Summary

Fix 6 UI/UX issues on the Ghousia Golden Spoon restaurant website: remove the scroll progress bar, change orange gradients to white/light (light mode only), add unique colored SVG avatars for testimonials, fix the category filter bug, and remove the gradient overlay from the order mode selector. All changes are pure frontend CSS/component modifications with no data model or API changes.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0
**Storage**: N/A (no data changes)
**Testing**: `npm run lint`, `npm run build`
**Target Platform**: Web (modern browsers)
**Project Type**: Web application (existing Next.js project)
**Performance Goals**: No new performance requirements; maintain existing load times
**Constraints**: Changes must work in both light and dark modes; gradient changes apply to light mode only
**Scale/Scope**: ~8 files modified, no new files, no new data entities

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No specific constitution gates defined (constitution file is template). Proceeding with standard quality checks:
- [x] No new data entities required
- [x] No API changes required
- [x] No new dependencies required
- [x] All changes are backward-compatible
- [x] No security implications

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-fixes/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                    # Remove ScrollProgress import + JSX
│   └── menu/
│       └── page.tsx                  # Fix category filter sync
├── components/
│   ├── home/
│   │   ├── AboutPreview.tsx          # Update gradient colors
│   │   ├── CTABanner.tsx             # Update gradient colors
│   │   └── Testimonials.tsx          # SVG avatar component
│   ├── order/
│   │   └── OrderModeSelector.tsx     # Remove gradient overlay
│   └── ui/
│       └── ScrollProgress.tsx        # File to delete/unused after removal
└── lib/
    └── tailwind.config.ts            # Update gradient color definitions
```

**Structure Decision**: Existing Next.js App Router structure. No structural changes needed.

## Complexity Tracking

No violations to justify. This is a simple UI fix feature with minimal complexity.
