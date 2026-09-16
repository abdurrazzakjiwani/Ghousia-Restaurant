# Implementation Plan: Website Animations & Chatbot Scroll

**Branch**: `005-animations` | **Date**: 2026-09-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-animations/spec.md`

## Summary

Add subtle, professional animations to the Ghousia Golden Spoon restaurant website. This includes scroll-triggered reveal animations on all pages, hover micro-interactions on cards/buttons, chatbot open/close and message entrance animations, and a custom-themed scrollbar in the chat widget. Uses Framer Motion for React animation orchestration and CSS custom properties for scrollbar styling.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion (NEW)
**Storage**: N/A (no new data entities)
**Testing**: Manual browser testing, Lighthouse performance audit
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile responsive
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: 60fps animations, all animations complete within 500ms
**Constraints**: Must respect `prefers-reduced-motion`, no regression on existing features
**Scale/Scope**: 17 components across 5 directories, 5 user stories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a template (not customized for this project). No specific gates to enforce. Standard quality practices apply:
- All code must follow existing TypeScript conventions
- No new external dependencies beyond Framer Motion
- All existing functionality must continue to work

## Project Structure

### Documentation (this feature)

```text
specs/005-animations/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (UI entities)
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (no API changes)
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx              # Add entrance animation (motion.div)
│   │   ├── AboutPreview.tsx      # Add scroll reveal (whileInView)
│   │   ├── FeaturedMenu.tsx      # Add staggered card reveal
│   │   ├── Testimonials.tsx      # Add scroll reveal
│   │   └── ReviewsSection.tsx    # Add scroll reveal
│   ├── chat/
│   │   ├── ChatWidget.tsx        # Add open/close animation (AnimatePresence)
│   │   └── ChatMessage.tsx       # Add message entrance animation
│   ├── menu/
│   │   ├── MenuCard.tsx          # Add hover scale + scroll reveal
│   │   ├── MenuGrid.tsx          # Add staggered grid reveal
│   │   └── CategoryFilter.tsx    # Add entrance animation
│   ├── layout/
│   │   ├── Navbar.tsx            # Add entrance animation
│   │   └── Footer.tsx            # Add scroll reveal
│   └── ui/
│       ├── Button.tsx            # Add hover scale micro-interaction
│       └── Card.tsx              # Already has hover, enhance with motion
├── app/
│   ├── globals.css               # Add custom scrollbar styles, reduced-motion
│   └── about/
│       └── page.tsx              # Add section reveal animations
├── lib/
│   └── animations.ts             # NEW: shared animation configs (variants, presets)
└── ...
```

**Structure Decision**: Existing Next.js App Router structure is maintained. One new utility file (`lib/animations.ts`) for shared animation configuration. All other changes are modifications to existing components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New dependency (Framer Motion) | Industry-standard React animation library with `whileInView`, `AnimatePresence`, gesture support | Pure CSS keyframes lack scroll-trigger detection, stagger control, and exit animations |
| New utility file (animations.ts) | Centralize animation variants to avoid duplication across 17 components | Inline variants in each component would duplicate timing/easing config |
