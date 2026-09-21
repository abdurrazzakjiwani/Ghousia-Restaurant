# Implementation Plan: Hero Image Carousel

**Branch**: `001-hero-carousel` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hero-carousel/spec.md`

## Summary

Add a rotating image carousel to the homepage hero section using 3 existing hero images, and reposition the SPOONI voice agent floating button above the WhatsApp button to eliminate overlap. The carousel uses Framer Motion for crossfade transitions and includes dot navigation, parallax scroll, and reduced-motion support.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0 (existing)
**Storage**: N/A (no new data entities)
**Testing**: Manual browser testing, visual inspection
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile responsive
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Hero images load within 2 seconds, carousel transitions at 60fps
**Constraints**: Must not break existing features, images must be optimized for web
**Scale/Scope**: 1 modified component (Hero.tsx), 1 CSS addition (globals.css), 3 images moved to public/

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution file exists for this project. Standard quality practices apply:
- All code must follow existing TypeScript conventions
- No new external dependencies beyond what's already installed
- All existing functionality must continue to work
- Images must be optimized for web performance

## Project Structure

### Documentation (this feature)

```text
specs/001-hero-carousel/
├── plan.md              # This file
├── research.md          # Phase 0 output (carousel implementation research)
├── data-model.md        # Phase 1 output (no new entities)
├── quickstart.md        # Phase 1 output
├── checklists/          # Spec quality checklists
│   └── requirements.md
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
public/
└── images/
    └── hero/
        ├── hero1.png          # MOVED from project root (Hero 1.png)
        ├── hero2.png          # MOVED from project root (Hero 2.png)
        └── hero3.png          # MOVED from project root (Hero 3.png)

src/
├── components/
│   └── home/
│       └── Hero.tsx           # MODIFY: Add carousel with auto-rotation, dots, crossfade
├── app/
│   └── globals.css            # MODIFY: Add CSS to reposition SPOONI widget FAB
└── components/
    └── chat/
        └── SpooniWidget.tsx   # No changes needed (CSS handles repositioning)
```

**Structure Decision**: Minimal change — move 3 images to public/, modify Hero.tsx to add carousel, add CSS for button repositioning. No new files needed beyond image moves.

## Complexity Tracking

No constitution violations — no complexity tracking needed.
