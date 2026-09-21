# Implementation Plan: Chatbot Guardrails & Dynamic Data

**Branch**: `001-chatbot-guardrails` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-chatbot-guardrails/spec.md`

## Summary

Implement chatbot guardrails (abuse detection, context restriction, polite refusals), dynamic data building (restaurant knowledge from all data files), natural conversation closings, and scrollbar fix for the Ghousia Golden Spoon restaurant website chatbot.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+, Next.js 14 (App Router)
**Primary Dependencies**: React 18.3, Tailwind CSS, Groq SDK (`groq-sdk`), Supabase JS Client (`@supabase/supabase-js`), Lucide React, Framer Motion
**Storage**: Supabase PostgreSQL (existing `customer_orders` table), in-memory chat state (no persistence between sessions)
**Testing**: ESLint (no test framework currently configured)
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web application (Next.js 14 App Router)
**Performance Goals**: Standard web app, chat responses within 2-3 seconds
**Constraints**: Must work within existing Next.js 14 App Router structure, no new backend services, no external embedding APIs
**Scale/Scope**: Single restaurant website, 41 menu items across 13 categories, 3 branches, ~10 FAQ items, ~10 concurrent chatbot users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a placeholder with no specific principles defined. No gates to evaluate. Proceeding with standard best practices.

## Project Structure

### Documentation (this feature)

```text
specs/001-chatbot-guardrails/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── guardrails.ts          # NEW: Abuse detection, context check, refusal messages
│   ├── website-context.ts     # NEW: Dynamic data builders for all website content
│   ├── groq.ts                # MODIFY: Rewrite with buildSystemPrompt() + guardrails
│   ├── menu-data.ts           # MODIFY: Export buildMenuContext() function
│   ├── branches-data.ts       # MODIFY: Export buildBranchContext() function
│   ├── testimonials-data.ts   # MODIFY: Export buildTestimonialContext() function
│   └── ... (existing files unchanged)
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # MODIFY: Add abuse detection, length limit, dynamic prompt
│   └── globals.css            # MODIFY: Improve scrollbar visibility
├── components/
│   └── chat/
│       ├── GroqChatWidget.tsx  # MODIFY: Fix scroll container height
│       └── ... (existing files unchanged)
└── ... (rest of project unchanged)
```

**Structure Decision**: Web application structure (existing Next.js 14 App Router). All changes are within the existing `src/` directory. No new directories or services needed.

## Complexity Tracking

No constitution violations to justify.

## Phase 0: Research

No NEEDS CLARIFICATION items in the spec. All requirements are clear and well-defined. Research will focus on:

1. Best practices for keyword-based profanity detection in TypeScript
2. Patterns for dynamic system prompt building in Next.js API routes
3. Scrollbar CSS best practices for cross-browser compatibility

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for entity definitions.

### API Contracts

The chat API endpoint (`POST /api/chat`) remains unchanged in structure. The only changes are:
- Input validation (message length check)
- Pre-processing (abuse detection, context check)
- Dynamic system prompt generation

### Agent Context Update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode` to update the agent context with new technology from this plan.
