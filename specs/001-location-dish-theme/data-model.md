# Data Model: Location, Signature Dish, CTA, and Light-Only Presentation

## Entity: Saved Delivery Address

- **Name**: `deliveryAddress`
- **Type**: `string` (free‑text, trimmed of leading/trailing whitespace)
- **Validation**:
  - Must not be empty after trimming.
  - Minimum length of 3 characters (to avoid accidental saves).
- **Retention**: Browser `localStorage` key `ghousia-delivery-address`; persists across page reloads within the same browser.
- **Usage**:
  - Prefills the delivery‑address field in the checkout form (`src/components/order/CheckoutStep1.tsx`).
  - Shown in the location‑prompt state (`location prompt state` entity) to decide whether the mandatory card appears.

## Entity: Location Prompt State

- **Name**: `locationPromptState`
- **Type**: `enum` – `idle`, `pending`, `saved`
- **Description**:
  - `idle` – no address entered yet; mandatory card is shown on first visit.
  - `pending` – address being entered; card open, validation running.
  - `saved` – address saved; card hidden, address available in checkout.
- **Transitions**:
  - `idle → pending` when user focuses the address input.
  - `pending → saved` on successful save (non‑empty address).
  - `saved → idle` when browser storage is cleared or address is removed.

## Entity: Signature Dish Presentation

- **Name**: `signatureDishPresentation`
- **Components**:
  - `foodImage` – static `<Image>` element (no rotation).
  - `plateRim` – decorative CSS/JS layer that rotates; animation disabled when `prefers-reduced-motion` is set.
- **State**:
  - `rotating` – plate continuously spins (unless reduced‑motion).
  - `static` – plate stationary.

## Entity: Ready to Order Presentation

- **Name**: `readyToOrderPresentation`
- **Attributes**:
  - `backgroundColor`: `white`
  - `textColor`: `black`
  - `dotPattern`: subtle radial‑gradient dot pattern (1 px spacing).
  - `buttonColors`: unchanged from existing WhatsApp (`bg-green-500`) and reservation (`border-white text-white`) buttons.
- **State**: immutable for the duration of the feature; no dynamic changes.

## Relationships

- `Saved Delivery Address` **→** used by `Checkout Step 1` to prefill the address field.
- `Location Prompt State` **→** controls visibility of the mandatory location card (User Story 1).
- `Signature Dish Presentation` **→** independent of address flow; only affected by reduced‑motion preference.
- `Ready to Order Presentation` **→** independent of other entities; visual style only.

---

*Generated on 2026‑09‑20 as part of the /sp.plan workflow for feature `001-location-dish-theme`.*