# Implementation Plan: Bug Fixes, Order Persistence & Email Notifications

**Branch**: `011-fix-bugs-orders-email` | **Date**: 2026-09-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-fix-bugs-orders-email/spec.md`

## Summary

Fix 4 critical bugs (category dropdown navigation, search navigation, cart reactivity, missing quantity controls), connect checkout to Supabase API with unique order numbers (GGS-YYYYMMDD-XXXX), add thank you page and real-time order tracking via 30-second polling, and integrate Resend email notifications for order confirmations — all while preserving the existing WhatsApp flow as a secondary option.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Supabase JS Client, Lucide React  
**Storage**: Supabase PostgreSQL (existing `customer_orders` table, extended with new columns)  
**Testing**: Manual testing (no test framework currently configured)  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Single Next.js web application  
**Performance Goals**: Cart badge update <100ms, tracking page load <5s, email delivery <30s  
**Constraints**: No payment gateway (Cash on Delivery only), Resend test domain (no custom domain), polling-based tracking (no WebSocket)  
**Scale/Scope**: Small restaurant, ~100-500 orders/day, single Supabase project

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a template with no project-specific principles defined. No gates to evaluate. Proceeding with standard best practices:

- ✅ No violations — all changes are within a single Next.js project
- ✅ No new databases — extending existing Supabase table
- ✅ No new frameworks — using established stack (Next.js, React, Supabase)
- ✅ Simplicity — YAGNI applied (no admin UI, no WebSocket, no payment gateway)

## Project Structure

### Documentation (this feature)

```text
specs/011-fix-bugs-orders-email/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI contract
└── tasks.md             # Phase 2 output (/sp.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   ├── orders/
│   │   │   └── route.ts          # MODIFY: add order_number, email trigger, order_number lookup
│   │   └── email/
│   │       └── send/
│   │           └── route.ts      # NEW: email API endpoint
│   ├── menu/
│   │   └── page.tsx              # MODIFY: read ?category= and ?highlight= params
│   ├── order/
│   │   └── page.tsx              # MODIFY: handle post-order redirect
│   ├── thank-you/
│   │   └── page.tsx              # NEW: post-order confirmation page
│   └── tracking/
│       └── page.tsx              # MODIFY: order_number lookup + 30s polling
├── components/
│   ├── layout/
│   │   ├── MainNav.tsx           # MODIFY: fix search to call router.push()
│   │   └── CartBadge.tsx         # MODIFY: use CartContext
│   ├── menu/
│   │   └── MenuItemModal.tsx     # MODIFY: add quantity +/- controls
│   └── order/
│       └── CheckoutStep2.tsx     # MODIFY: call POST API + WhatsApp
├── contexts/
│   └── CartContext.tsx           # NEW: React Context for cart state
├── hooks/
│   └── useCart.ts                # REWRITE: thin wrapper around CartContext
├── lib/
│   ├── email/
│   │   └── resend.ts             # NEW: Resend client setup
│   └── orders.ts                 # NEW: order number generation logic
├── emails/
│   ├── OrderConfirmation.tsx     # NEW: customer email template
│   └── RestaurantAlert.tsx       # NEW: restaurant email template
├── types/
│   └── index.ts                  # MODIFY: add order_number to types
└── app/
    └── layout.tsx                # MODIFY: wrap with CartProvider
```

**Structure Decision**: Single Next.js project. All new files follow existing conventions: App Router pages in `src/app/`, components in `src/components/`, utilities in `src/lib/`, types in `src/types/`.

## Complexity Tracking

> No Constitution Check violations — no complexity justifications needed.
