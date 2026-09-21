# Research: UI & Checkout Enhancements

**Date**: 2026-09-18
**Feature**: 009-ui-checkout-enhancements

## Research Items

### R1: Modal Pattern for Menu Item Details

**Decision**: Reuse existing `Modal.tsx` component with AnimatePresence, ESC handling, and backdrop click-to-close. Create a new `MenuItemModal.tsx` that composes `Modal` with item-specific content.

**Rationale**: The existing `Modal.tsx` already handles all modal lifecycle concerns (body scroll lock, ESC key, backdrop click, animation). Creating a wrapper component follows the single-responsibility principle and keeps the codebase consistent.

**Alternatives considered**:
- Using a full page navigation (`/menu/[id]`): Rejected because user wants to stay on menu page
- Creating a custom modal from scratch: Rejected because existing Modal already works perfectly
- Using a drawer/sliding panel: Rejected because modal is more standard for item details

### R2: Two-Step Checkout Flow

**Decision**: Replace the current single-step `/order` page with a two-step wizard using React state (`step: "details" | "confirm"`). Step 1 shows cart + customer form, Step 2 shows confirmation + WhatsApp button.

**Rationale**: The existing `/menu/[id]` page already has a 4-step wizard pattern. Simplifying to 2 steps for the cart checkout is more appropriate since we're handling multiple items (not collecting per-item details). Using React state for step management is simple and requires no URL changes.

**Alternatives considered**:
- Separate pages for each step (`/order/details`, `/order/confirm`): Rejected because it adds URL complexity and loses state on back navigation
- Using the existing 4-step wizard from `/menu/[id]`: Rejected because it's designed for single items, not cart checkout
- Using a modal for checkout: Rejected because checkout needs full page attention

### R3: Rotating Plate Animation

**Decision**: Use CSS `@keyframes` for the rotation animation combined with Framer Motion for scroll-triggered reveal. The plate rotates via CSS `transform: rotate(360deg)` with `animation: spin 8s linear infinite`. Text overlay is positioned absolutely on top.

**Rationale**: CSS animations are more performant for continuous rotations than JavaScript-driven animations. Framer Motion is used for the scroll-triggered entrance (consistent with other sections). The combination gives smooth 60fps rotation with elegant reveal.

**Alternatives considered**:
- Pure Framer Motion rotation: Rejected because CSS animations are more efficient for infinite loops
- Three.js or WebGL 3D rotation: Rejected as overkill for a 2D plate spin
- SVG animation: Rejected because we're rotating a raster image, not vector art
- GIF/WebP animated image: Rejected because it reduces quality and removes control

### R4: WhatsApp Deep Linking

**Decision**: Use the existing `generateWhatsAppUrl()` and `generateFullOrderMessage()` utilities from `src/lib/utils.ts`. The checkout Step 2 generates the URL and opens it in a new tab.

**Rationale**: These utilities already handle URL encoding, phone number formatting, and message construction. The `generateFullOrderMessage()` function already includes customer name, phone, order mode, items, and total — exactly what the spec requires.

**Alternatives considered**:
- WhatsApp Business API: Rejected because it requires API keys and server-side integration
- Custom protocol handler (`whatsapp://send`): Rejected because `wa.me` is more universal
- SMS fallback: Not requested in spec

### R5: State Management for Checkout

**Decision**: Use React `useState` for checkout step and customer details. Cart state remains in `useCart` hook (localStorage). No new state management needed.

**Rationale**: The checkout flow is ephemeral (no need to persist step position). Customer details only need to survive within the checkout session. localStorage for cart is already proven and working.

**Alternatives considered**:
- React Context for checkout state: Rejected as unnecessary complexity for 2 steps
- URL-based state (query params): Rejected because it exposes internal flow to users
- Server-side session: Rejected because no backend changes needed
