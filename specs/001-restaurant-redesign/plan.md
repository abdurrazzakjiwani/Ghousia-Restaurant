# Implementation Plan: Restaurant Website Redesign

**Branch**: `001-restaurant-redesign` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-restaurant-redesign/spec.md`

## Summary

Comprehensive visual and content redesign of the Ghousia Golden Spoon restaurant website. Replaces the purple color scheme (`#667eea`/`#764ba2`) with warm orange (`#f59e0b`/`#ea580c`), upgrades typography to Poppins headings with Inter body text, replaces the generic WhatsApp chat icon with the official WhatsApp logo, redesigns the SPOONI voice agent button with a clear robot icon and "Give order in voice" label, overhauls testimonials to 100 auto-cycling reviews with sketch-style avatars, adds a dedicated branches page with 3 restaurant locations and 2 family halls, expands the homepage with WhyChooseUs/PopularCategories/CTABanner sections, and optimizes hero images to WebP format.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Lucide React, next/font/google (Poppins, Inter)
**Storage**: N/A (no new data entities — all data is static/hardcoded)
**Testing**: Manual browser testing, `npm run build`, `npm run lint`
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile responsive
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Hero images load within 2 seconds, all pages render within 1 second, carousel transitions at 60fps
**Constraints**: Must not break existing features, images must be optimized for web, no new external dependencies beyond what's already installed
**Scale/Scope**: 20+ files modified, 5 new components, 1 new page, 5 branch photos moved, 3 hero images replaced

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution file exists for this project. Standard quality practices apply:
- All code must follow existing TypeScript conventions
- No new external dependencies beyond what's already installed
- All existing functionality must continue to work
- Images must be optimized for web performance
- Each user story must be independently testable

**Gate Status**: PASS — no violations identified

## Project Structure

### Documentation (this feature)

```text
specs/001-restaurant-redesign/
├── plan.md              # This file
├── research.md          # Phase 0 output (all tech decisions resolved)
├── data-model.md        # Phase 1 output (no new entities)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (no API contracts needed)
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
public/
├── images/
│   ├── branches/
│   │   ├── golden-spoon.png    # MOVED from project root (Ghousia Golden Spoon.png)
│   │   ├── silver-spoon.jpg    # MOVED from project root (Ghousia Silver Spoon.jpg)
│   │   ├── fast-food-chinese.jpg # MOVED from project root (Ghousia Fast Food and Chineese.jpg)
│   │   ├── family-hall-1.jpg   # MOVED from project root (Family Hall 1.jpg)
│   │   └── family-hall-2.jpg   # MOVED from project root (Family Hall 2.jpg)
│   └── hero/
│       ├── hero1.webp          # REPLACED from hero1.png (WebP, optimized)
│       ├── hero2.webp          # REPLACED from hero2.png (WebP, optimized)
│       └── hero3.webp          # REPLACED from hero3.png (WebP, optimized)

src/
├── app/
│   ├── branches/
│   │   └── page.tsx            # NEW: Branches page with 3 branches + 2 family halls
│   ├── globals.css             # MODIFY: Replace purple with orange, scrollbar colors, pulse-glow
│   ├── layout.tsx              # MODIFY: Add Poppins font, apply font variable
│   └── page.tsx                # MODIFY: Add WhyChooseUs, PopularCategories, Testimonials, CTABanner
├── components/
│   ├── home/
│   │   ├── WhyChooseUs.tsx     # NEW: 4 feature cards
│   │   ├── PopularCategories.tsx # NEW: 8 category cards
│   │   ├── CTABanner.tsx       # NEW: "Ready to Order?" banner
│   │   ├── Testimonials.tsx    # REWRITE: 100 auto-cycling testimonials with sketch avatars
│   │   ├── Hero.tsx            # MODIFY: Update colors, WebP images, bg-gray-900
│   │   ├── FeaturedMenu.tsx    # MODIFY: Update colors
│   │   └── AboutPreview.tsx    # MODIFY: Update colors
│   ├── layout/
│   │   └── Navbar.tsx          # MODIFY: Add "Branches" link, update colors
│   ├── ui/
│   │   ├── WhatsAppButton.tsx  # MODIFY: Replace MessageCircle with WhatsApp SVG
│   │   ├── SpooniFAB.tsx       # NEW: Custom robot button for voice agent
│   │   ├── Button.tsx          # MODIFY: Update primary gradient
│   │   └── ScrollProgress.tsx  # MODIFY: Update inline gradient color
│   └── chat/
│       └── SpooniWidget.tsx    # MODIFY: Update orb colors to orange
├── lib/
│   ├── testimonials-data.ts    # NEW: 100 testimonial entries
│   ├── branches-data.ts        # NEW: 3 branch + 2 family hall data
│   └── menu-data.ts            # EXISTING: Used by PopularCategories
└── app/
    └── location/
        └── page.tsx            # MODIFY: Add "View all branches" link

tailwind.config.ts              # MODIFY: Replace purple with orange, add font-heading
```

**Structure Decision**: Minimal change — add 5 new components (WhyChooseUs, PopularCategories, CTABanner, SpooniFAB, Testimonials rewrite), 1 new page (branches), 2 new data files (testimonials-data, branches-data), move 5 photos to public/images/branches/, replace 3 hero images with WebP versions. No new dependencies required.

## Complexity Tracking

No constitution violations — no complexity tracking needed.
