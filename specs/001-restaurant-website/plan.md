# Implementation Plan: Ghousia Golden Spoon Restaurant Website

**Branch**: `001-restaurant-website` | **Date**: 2026-09-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-restaurant-website/spec.md`

## Summary

Build a professional restaurant website for Ghousia Golden Spoon with Next.js 14 (App Router) + Tailwind CSS + Supabase. The site features a 13-category menu with 57+ items, WhatsApp-based ordering, table reservations, live order tracking, customer reviews, an AI chatbot powered by Groq (Llama 3.3 70B), dark mode, delivery zone checker, and responsive design. Phase 1 delivers the customer-facing website; Phase 2 adds admin CMS.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 14 (App Router), Tailwind CSS, Supabase JS Client, Groq SDK, Lucide React  
**Storage**: Supabase (PostgreSQL)  
**Testing**: Playwright (E2E), Jest (unit)  
**Target Platform**: Web (responsive - mobile, tablet, desktop)  
**Project Type**: Web application (full-stack with API routes)  
**Performance Goals**: Menu page load <3s, chatbot response <3s, dark mode toggle <500ms  
**Constraints**: No Google Maps API key (free embed), wa.me for WhatsApp (no Business API), placeholder prices  
**Scale/Scope**: Single restaurant, ~57 menu items, 13 categories, 8 pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Check | Status | Notes |
|-------|--------|-------|
| Constitution exists | ⚠️ TEMPLATE | Constitution is unfilled template - using defaults |
| Tech stack defined | ✅ PASS | Next.js 14 + Tailwind + Supabase + Groq |
| No secrets in code | ✅ PASS | .env.local for all secrets |
| Responsive design | ✅ PASS | Mobile-first approach |
| Phase boundaries clear | ✅ PASS | Phase 1: website, Phase 2: CMS |

**Gate Result**: PASS (proceeding with informed defaults for unfilled constitution)

## Project Structure

### Documentation (this feature)

```text
specs/001-restaurant-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
│   └── api.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
ghousia_golden_web/
├── public/
│   └── images/
│       ├── logo/
│       │   └── Logo.png
│       └── food/
│           ├── burgers/
│           ├── sandwiches/
│           ├── broast/
│           ├── bbq/
│           ├── chargha/
│           ├── karahi/
│           ├── handi/
│           ├── chinese/
│           ├── rolls/
│           ├── pasta/
│           ├── extras/
│           ├── fried/
│           └── beverages/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (navbar, footer, theme)
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles + Tailwind
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── location/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── order/
│   │   │   └── page.tsx
│   │   ├── reservation/
│   │   │   └── page.tsx
│   │   ├── tracking/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── orders/
│   │       │   └── route.ts
│   │       ├── reservations/
│   │       │   └── route.ts
│   │       ├── reviews/
│   │       │   └── route.ts
│   │       ├── contacts/
│   │       │   └── route.ts
│   │       ├── chat/
│   │       │   └── route.ts
│   │       └── delivery-check/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedMenu.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── menu/
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── order/
│   │   │   ├── OrderSummary.tsx
│   │   │   └── PaymentForm.tsx
│   │   ├── chat/
│   │   │   ├── ChatWidget.tsx
│   │   │   └── ChatMessage.tsx
│   │   ├── reservation/
│   │   │   └── ReservationForm.tsx
│   │   ├── tracking/
│   │   │   └── OrderTracker.tsx
│   │   ├── reviews/
│   │   │   ├── ReviewForm.tsx
│   │   │   └── ReviewList.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── MapEmbed.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       ├── DarkModeToggle.tsx
│   │       └── WhatsAppButton.tsx
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   ├── groq.ts                 # Groq AI client
│   │   ├── menu-data.ts            # Menu data/config
│   │   └── utils.ts                # Helper functions
│   ├── hooks/
│   │   ├── useCart.ts              # Shopping cart state
│   │   ├── useTheme.ts             # Dark mode state
│   │   └── useChat.ts              # Chatbot state
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── .env.local                      # Environment variables
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

**Structure Decision**: Web application structure with Next.js App Router. Single project with `src/` directory. API routes in `src/app/api/` for serverless functions. Components organized by feature domain.

## Complexity Tracking

No constitution violations to justify - using standard web application patterns.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
