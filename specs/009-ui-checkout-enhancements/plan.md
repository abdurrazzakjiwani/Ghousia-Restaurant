# Implementation Plan: UI & Checkout Enhancements

**Branch**: `009-ui-checkout-enhancements` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-ui-checkout-enhancements/spec.md`

## Summary

Four UI enhancements for the Ghousia Golden Spoon restaurant website: (1) remove the real-time clock from the header, (2) replace the menu item page navigation with a modal popup showing image/description/Add to Cart/Continue Order, (3) upgrade the `/order` page from a single-step WhatsApp link to a two-step checkout flow collecting customer details before sending a complete order message to WhatsApp, and (4) add a Grill Chargha rotating plate animation section on the home page below "Our Specialties".

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+, Next.js 14 (App Router)  
**Primary Dependencies**: React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Lucide React  
**Storage**: localStorage for cart (existing `useCart` hook), Supabase PostgreSQL for optional order persistence  
**Testing**: ESLint (no test framework configured)  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: Web application (Next.js 14 App Router)  
**Performance Goals**: Menu page loads under 3 seconds, modal opens under 200ms, animation runs at 60fps  
**Constraints**: Must work within existing Next.js 14 App Router structure, no new backend services, reuse existing components  
**Scale/Scope**: Single restaurant website, ~85 menu items, ~10 concurrent users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution file exists. No gates to evaluate. Proceeding with standard best practices.

## Project Structure

### Documentation (this feature)

```text
specs/009-ui-checkout-enhancements/
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
├── components/
│   ├── ui/
│   │   ├── Clock.tsx               # DELETE: no longer needed
│   │   └── Modal.tsx               # REUSE: existing modal component
│   ├── menu/
│   │   ├── MenuCard.tsx            # MODIFY: remove Link, add onClick for modal
│   │   ├── MenuGrid.tsx            # MODIFY: pass onViewDetail prop
│   │   ├── MenuItemModal.tsx       # NEW: item detail modal with image/desc/buttons
│   │   └── CategoryFilter.tsx      # NO CHANGE
│   ├── order/
│   │   ├── CheckoutStep1.tsx       # NEW: cart review + customer details form
│   │   ├── CheckoutStep2.tsx       # NEW: order summary + WhatsApp button
│   │   ├── OrderSummary.tsx        # REUSE: existing cart item list
│   │   ├── OrderModeSelector.tsx   # REUSE: delivery/pickup/dine-in
│   │   ├── OrderDetailsForm.tsx    # REUSE: name/phone form fields
│   │   └── QuantitySelector.tsx    # REUSE: +/- quantity controls
│   ├── home/
│   │   ├── GrillCharghaShowcase.tsx # NEW: rotating plate animation section
│   │   └── FeaturedMenu.tsx        # NO CHANGE
│   └── layout/
│       └── Navbar.tsx              # MODIFY: remove Clock import and usage
├── app/
│   ├── page.tsx                    # MODIFY: add GrillCharghaShowcase after FeaturedMenu
│   ├── menu/
│   │   └── page.tsx                # MODIFY: add selectedItem state, render MenuItemModal
│   └── order/
│       └── page.tsx                # REWRITE: two-step checkout flow
├── hooks/
│   └── useCart.ts                  # NO CHANGE: existing cart hook
├── lib/
│   ├── utils.ts                    # REUSE: generateFullOrderMessage, generateWhatsAppUrl
│   └── animations.ts               # REUSE: existing animation variants
└── types/
    └── index.ts                    # NO CHANGE: CartItem interface unchanged
```

**Structure Decision**: Web application structure (existing Next.js 14 App Router). Changes are within `src/components/` (new + modified), `src/app/` (modified pages), and deletion of `src/components/ui/Clock.tsx`. No new directories needed.

## Complexity Tracking

No constitution violations to justify.

## Phase 0: Research

All requirements are clear from the spec. No NEEDS CLARIFICATION items. Research focuses on:

1. Best practices for modal patterns in React/Next.js
2. Two-step checkout flow patterns
3. CSS/Framer Motion rotating animation techniques
4. WhatsApp deep linking with pre-filled messages

See [research.md](./research.md) for findings.

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for entity definitions.

### API Contracts

No new API endpoints needed. The feature uses:
- Existing `useCart` hook (localStorage)
- Existing `generateFullOrderMessage()` utility
- WhatsApp `wa.me` deep linking

See [contracts/](./contracts/) for data contracts.

### Agent Context Update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType opencode` to update the agent context with new technology from this plan.
