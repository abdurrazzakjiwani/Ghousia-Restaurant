# Implementation Plan: UI Styling Updates

**Branch**: `013-ui-styling-updates` | **Date**: 2026-09-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-ui-styling-updates/spec.md`

## Summary

Three UI styling improvements: (1) Fix invisible "Reserve Table" button by changing from white-on-white to white-on-orange, (2) Replace all orange gradient effects with solid orange (#f97316) across ~68 instances in ~29 files including email templates, (3) Restyle the stats card in "Our Story" section as a white card with shadow, orange border accent, and DM Sans font for numbers.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0
**Storage**: N/A (no data changes)
**Testing**: npm run lint, npm run build (manual visual verification)
**Target Platform**: Web (responsive, mobile-first)
**Project Type**: web application (Next.js frontend)
**Performance Goals**: No new performance targets; DM Sans font adds ~20KB
**Constraints**: Must maintain responsive layout; no breaking changes to existing components
**Scale/Scope**: ~29 files to modify, ~68 gradient instances to replace

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a template with no project-specific rules defined. No gates to enforce. Proceeding.

## Project Structure

### Documentation (this feature)

```text
specs/013-ui-styling-updates/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A - no data changes)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no new APIs)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css                    # Gradient CSS, scrollbar styles
│   ├── layout.tsx                     # Add DM Sans font
│   ├── contact/page.tsx               # 3 gradient icon circles
│   └── emails/
│       ├── OrderConfirmation.tsx      # Inline CSS gradients
│       └── RestaurantAlert.tsx        # Inline CSS gradient
├── components/
│   ├── home/
│   │   ├── AboutPreview.tsx           # Stats card redesign
│   │   └── CTABanner.tsx              # Button visibility fix
│   ├── layout/
│   │   ├── MainNav.tsx                # Gradient text
│   │   └── MobileDrawer.tsx           # Gradient text
│   └── ui/Button.tsx                  # Primary button gradient
└── tailwind.config.ts                 # Gradient color definition
```

**Structure Decision**: Single Next.js project. All changes are in existing files - no new files or directories needed.

## Complexity Tracking

No constitution violations to justify. This is a straightforward UI styling refactor with no architectural changes.
