# Implementation Plan: Menu Images, Chatbot Fix & Page Upgrades

**Branch**: `003-menu-images-chatbot-fix` | **Date**: 2026-09-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-menu-images-chatbot-fix/spec.md`

## Summary

Three-part feature: (1) Add Unsplash free stock photos to all 39 menu items, replacing emoji placeholders across the home page and menu page; (2) Fix the chatbot to detect order intent from natural language, match items against the menu, generate WhatsApp order links, and render clickable order buttons in the chat UI; (3) Upgrade the Home and About pages with authentic, restaurant-specific content replacing generic template text.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 14 (App Router), Tailwind CSS, Supabase JS Client, Groq SDK (Llama 3.3 70B), Lucide React  
**Storage**: Supabase PostgreSQL (existing 8 tables, no schema changes needed)  
**Testing**: `npm test` (existing), `npm run lint`  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web application (frontend + backend API routes)  
**Performance Goals**: Menu page loads with images in under 3 seconds on mobile; chatbot responds in under 5 seconds  
**Constraints**: Unsplash free-tier URLs (no API key); wa.me links for WhatsApp (no WhatsApp Business API); existing Supabase schema unchanged  
**Scale/Scope**: 39 menu items, 13 categories, single restaurant, Karachi delivery area

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is a template with no configured principles. No constitution gates to evaluate. Proceeding with standard best practices.

## Project Structure

### Documentation (this feature)

```text
specs/003-menu-images-chatbot-fix/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/sp.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx                    # Home page (edit: Hero, AboutPreview content)
│   ├── about/page.tsx              # About page (rewrite)
│   ├── menu/page.tsx               # Menu page (images auto-render)
│   └── api/
│       └── chat/route.ts           # Chat endpoint (add order intent detection)
├── components/
│   ├── home/
│   │   ├── Hero.tsx                # Edit: tagline, hours, 3 CTAs
│   │   ├── AboutPreview.tsx        # Edit: authentic story content
│   │   └── FeaturedMenu.tsx        # Images auto-render (no code change)
│   └── chat/
│       ├── ChatWidget.tsx          # Minor: pass orderUrl to messages
│       └── ChatMessage.tsx         # Edit: render WhatsApp order button
├── hooks/
│   └── useChat.ts                  # Edit: track orderUrl in messages
├── lib/
│   ├── menu-data.ts                # Edit: add image_url to all 39 items
│   └── groq.ts                     # Edit: update system prompt
└── types/
    └── index.ts                    # No changes needed (image_url already exists)
```

**Structure Decision**: Existing Next.js App Router structure maintained. No new files needed — all changes are edits to existing files.

## Complexity Tracking

No constitution violations to justify. All changes are edits to existing files within the established project structure.
