# Feature Specification: Bug Fixes, Order Persistence & Email Notifications

**Feature Branch**: `011-fix-bugs-orders-email`  
**Created**: 2026-09-19  
**Status**: Draft  
**Input**: User description: "Fix category dropdown navigation, search navigation, cart reactivity, add quantity controls to menu modal, connect checkout to Supabase API with unique order numbers, add thank you page and real-time order tracking via polling, integrate Resend email notifications for order confirmations"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cart & Navigation Bug Fixes (Priority: P1)

As a customer, I want the category dropdown to take me to the correct category when I click it, the search bar to navigate me to the specific item I searched for, the cart badge to update in real-time when I modify items, and quantity controls when adding items from the menu modal.

**Why this priority**: These are critical bugs that break core navigation and cart functionality. Without these fixes, basic browsing and ordering are unreliable.

**Independent Test**: Can be fully tested by: (1) hovering over Menu in navbar, clicking a category, verifying it shows only that category's items, (2) typing an item name in navbar search, clicking it, verifying it navigates to that item, (3) adding/removing items in cart and verifying the navbar badge updates instantly, (4) clicking a menu item and verifying +/- quantity controls appear in the modal.

**Acceptance Scenarios**:

1. **Given** the customer is on any page, **When** they hover over "Menu" in the navbar and click a category (e.g., "Burgers"), **Then** they are navigated to `/menu?category=burgers` and only burger items are displayed.
2. **Given** the customer is on any page, **When** they type "Zinger" in the navbar search and click the result, **Then** they are navigated to `/menu?highlight=101` and the Zinger Burger item is scrolled into view with a temporary highlight.
3. **Given** the customer has items in their cart, **When** they remove an item from the order page, **Then** the cart badge in the navbar immediately reflects the new count without requiring a page reload.
4. **Given** the customer clicks a menu item to open the modal, **When** the modal opens, **Then** they see plus (+) and minus (-) buttons to adjust quantity (range 1-20) before adding to cart.
5. **Given** the customer sets quantity to 5 in the modal and clicks "Add to Cart", **When** the cart updates, **Then** 5 units of that item are added (not just 1).

---

### User Story 2 - Order Persistence & Tracking (Priority: P1)

As a customer, I want my order to be saved in the system with a unique order number, receive a thank you confirmation with that number, and be able to track my order status in real-time.

**Why this priority**: Without order persistence, orders are only sent via WhatsApp and cannot be tracked. This is essential for the restaurant to manage orders and for customers to know their order status.

**Independent Test**: Can be fully tested by: (1) completing the checkout flow and verifying the order is saved to the database, (2) verifying a unique order number (GGS-YYYYMMDD-XXXX) is generated, (3) seeing a thank you page with the order number, (4) navigating to the tracking page and seeing the order status update every 30 seconds.

**Acceptance Scenarios**:

1. **Given** the customer has completed checkout and clicked "Place Order", **When** the order is processed, **Then** a unique order number in format `GGS-YYYYMMDD-XXXX` is generated (e.g., `GGS-20260919-0001`) and the order is saved to the database.
2. **Given** the order has been placed successfully, **When** the customer sees the confirmation, **Then** they see a "Thank You" page displaying their order number, order summary, and estimated preparation time.
3. **Given** the customer has an order number, **When** they visit `/tracking?order=GGS-20260919-0001`, **Then** they see the current order status (pending → confirmed → preparing → out for delivery → delivered) with a visual progress indicator.
4. **Given** the customer is on the tracking page, **When** 30 seconds pass, **Then** the order status automatically refreshes to show the latest status without requiring manual refresh.
5. **Given** the order number does not exist, **When** the customer enters it on the tracking page, **Then** they see a clear "Order not found" message.

---

### User Story 3 - Email Notifications (Priority: P2)

As a restaurant owner, I want to receive an email notification whenever a new order is placed, containing full customer details and order items. As a customer, I want to receive an order confirmation email with my order number and details.

**Why this priority**: Email notifications ensure the restaurant never misses an order and customers have a record of their purchase. This is important but can be added after core ordering works.

**Independent Test**: Can be fully tested by: (1) placing an order and verifying the restaurant receives an email notification, (2) verifying the customer receives a confirmation email (if email provided), (3) verifying both emails contain correct order details.

**Acceptance Scenarios**:

1. **Given** a customer has placed an order, **When** the order is saved to the database, **Then** an email notification is sent to the restaurant's email address (abdurrazzakjiwani.work@gmail.com) containing: order number, customer name, phone, order items, total amount, delivery address (if applicable), and order mode.
2. **Given** the customer provided an email address during checkout, **When** the order is confirmed, **Then** they receive an order confirmation email containing: order number, order summary, total amount, and a link to track their order.
3. **Given** the restaurant receives an order notification email, **When** they open it, **Then** the email clearly displays all order details in a readable format with the order number prominently shown.
4. **Given** the email service is temporarily unavailable, **When** an order is placed, **Then** the order is still saved successfully and the customer still sees the thank you page (email failure does not block order placement).

---

### Edge Cases

- What happens when two customers place orders at the exact same millisecond and order numbers would collide?
- What happens when the customer's internet drops mid-checkout — is the order saved or lost?
- What happens when the tracking page polls but the database is temporarily unreachable?
- What happens when the customer provides an invalid email address in checkout?
- What happens when the order number sequence resets at midnight (new day = new sequence)?
- What happens when the customer tries to track an order from a previous day?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST navigate to the correct category when a category is selected from the navbar dropdown, passing the category slug as a URL query parameter.
- **FR-002**: System MUST navigate to the menu page and highlight the specific item when a search result is selected from the navbar search.
- **FR-003**: Cart badge MUST update in real-time across all components when cart items are added, removed, or modified — without requiring a page reload.
- **FR-004**: Menu item modal MUST include quantity controls (plus/minus buttons) allowing customers to select quantity between 1 and 20 before adding to cart.
- **FR-005**: System MUST persist orders to the database when the customer clicks "Place Order" (not just via WhatsApp).
- **FR-006**: System MUST generate unique order numbers in format `GGS-YYYYMMDD-XXXX` where YYYYMMDD is the date and XXXX is a 4-digit sequential number starting from 0001 each day.
- **FR-007**: System MUST display a "Thank You" page after successful order placement showing the order number, order summary, and estimated preparation time.
- **FR-008**: Tracking page MUST support lookup by order number (not just phone number).
- **FR-009**: Tracking page MUST automatically refresh order status every 30 seconds via polling.
- **FR-010**: System MUST send an email notification to the restaurant when a new order is placed.
- **FR-011**: System MUST send an order confirmation email to the customer if they provided an email address.
- **FR-012**: Email sending MUST NOT block or fail the order placement process — orders must succeed even if email fails.
- **FR-013**: Order number generation MUST handle concurrent orders without collisions.
- **FR-014**: System MUST support order status values: pending, confirmed, preparing, out_for_delivery, delivered.
- **FR-015**: Tracking page MUST display a clear error message when an order number is not found.

### Key Entities

- **Order**: Represents a customer order. Key attributes: order number (unique, format GGS-YYYYMMDD-XXXX), customer name, phone, email (optional), order mode (delivery/pickup/dine-in), branch, address, items (list of menu items with quantities and prices), total amount, order status, payment method (default: cash on delivery), notes, created timestamp.
- **Order Item**: Represents a single item within an order. Key attributes: menu item ID, name, price, quantity.
- **Email Notification**: Represents a sent email. Key attributes: recipient email, subject, order reference, sent timestamp, delivery status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Category dropdown click navigates to correct category 100% of the time.
- **SC-002**: Search result click navigates to the specific item and highlights it within 2 seconds.
- **SC-003**: Cart badge updates within 100ms of any cart modification (add/remove/update quantity).
- **SC-004**: Customers can set quantity from 1-20 in the menu modal before adding to cart.
- **SC-005**: 100% of completed checkouts result in a persisted order in the database.
- **SC-006**: Order numbers are unique — zero collisions across all orders.
- **SC-007**: Thank you page displays within 3 seconds of order placement.
- **SC-008**: Tracking page shows order status within 5 seconds of page load.
- **SC-009**: Tracking page auto-refreshes status every 30 seconds (±5 seconds tolerance).
- **SC-010**: Restaurant receives order notification email within 30 seconds of order placement.
- **SC-011**: Customer receives confirmation email within 30 seconds of order placement (if email provided).
- **SC-012**: Order placement succeeds even when email service is unavailable (100% availability for order flow).
- **SC-013**: Zero data loss — every order placed via the UI is persisted to the database.

## Assumptions

- The existing Supabase `customer_orders` table will be extended with new columns (order_number, customer_email, order_status, payment_method).
- The restaurant email for notifications is abdurrazzakjiwani.work@gmail.com.
- Email will use Resend's test domain (no custom domain verification required for initial implementation).
- Order tracking is polling-based (30-second interval) — no WebSocket or real-time push notifications.
- Payment method defaults to "Cash on Delivery" — online payment integration is excluded from this feature.
- The existing order number sequence resets daily at midnight (PKT timezone).
- Estimated preparation time is a fixed value (e.g., 30 minutes) — not dynamically calculated.
- The WhatsApp ordering flow is preserved as a secondary option alongside the new API-based ordering.

## Clarifications

### Session 2026-09-19

- Q: How should order statuses be updated (manually via dashboard, admin UI, or auto-timer)? → A: Deferred — will be addressed in a future feature. For now, status defaults to "pending" and can be updated directly in Supabase.
- Q: How should concurrent order number collisions be handled? → A: Deferred — will be addressed in planning phase with database-level unique constraint + retry logic.
