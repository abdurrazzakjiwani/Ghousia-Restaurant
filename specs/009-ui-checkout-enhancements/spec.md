# Feature Specification: UI & Checkout Enhancements

**Feature Branch**: `009-ui-checkout-enhancements`  
**Created**: 2026-09-18  
**Status**: Draft  
**Input**: User description: "Remove clock from header, add menu item modal with image/description/Add to Cart/Continue Order, implement two-step cart checkout with WhatsApp order delivery, and add Grill Chargha rotating plate animation on home page"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remove Clock from Header (Priority: P1)

As a website visitor, I want the header to be clean and focused on navigation without a distracting real-time clock, so that I can focus on browsing the menu and placing orders.

**Why this priority**: Quick win that immediately improves the header cleanliness. No dependencies on other features.

**Independent Test**: Can be fully tested by visiting any page and verifying the clock no longer appears in the header navigation area.

**Acceptance Scenarios**:

1. **Given** I am on any page of the website, **When** I look at the header navigation, **Then** I should NOT see a real-time clock display
2. **Given** I am on the mobile version of the site, **When** I open the mobile navigation menu, **Then** I should NOT see a clock in the mobile menu

---

### User Story 2 - Menu Item Detail Modal (Priority: P1)

As a customer browsing the menu, I want to click on a food item and see a popup with the full image, complete description, price, and options to add it to my cart or continue ordering, so that I can make informed decisions without leaving the menu page.

**Why this priority**: Core UX improvement that directly impacts the ordering experience. Customers currently navigate away from the menu to view item details, losing their browsing context.

**Independent Test**: Can be fully tested by clicking any menu item card and verifying the modal appears with image, full description, price, "Add to Cart" button, and "Continue Order" button.

**Acceptance Scenarios**:

1. **Given** I am on the menu page, **When** I click on a food item card (image or name area), **Then** a modal/popup should appear showing the item's full-size image, complete description (not truncated), and price
2. **Given** the item modal is open, **When** I click the "Add to Cart" button, **Then** the item should be added to my cart and the modal should remain open (or close with a success indication)
3. **Given** the item modal is open, **When** I click the "Continue Order" button, **Then** the item should be added to my cart and I should be taken to the checkout page
4. **Given** the item modal is open, **When** I click the close button (X) or click outside the modal, **Then** the modal should close and I should remain on the menu page
5. **Given** the item modal is open, **When** I press the Escape key, **Then** the modal should close

---

### User Story 3 - Two-Step Cart Checkout (Priority: P2)

As a customer with items in my cart, I want a clear two-step checkout process where I first review my order and provide my details, then confirm and send the order to the restaurant via WhatsApp, so that I can complete my order quickly and accurately.

**Why this priority**: The current `/order` page sends orders to WhatsApp without collecting customer details (name, phone, delivery address). This enhancement makes the order process complete and professional.

**Independent Test**: Can be fully tested by adding items to cart, navigating to checkout, filling in details in step 1, reviewing in step 2, and clicking "Place Order" which opens WhatsApp with a complete order message.

**Acceptance Scenarios**:

1. **Given** I have items in my cart and click "Continue Order" or navigate to checkout, **When** I see Step 1, **Then** I should see all cart items with quantities, a form for customer details (name, phone, order mode), and a "Continue to Confirm" button
2. **Given** I am on Step 1, **When** I fill in my name, phone, and select an order mode (delivery/pickup/dine-in), **Then** the "Continue to Confirm" button should become active
3. **Given** I am on Step 1 and click "Continue to Confirm", **When** I see Step 2, **Then** I should see a complete order summary with my items, customer details, order mode, and total price
4. **Given** I am on Step 2, **When** I click "Place Order via WhatsApp", **Then** a WhatsApp chat should open with the restaurant's number (+923013631555) and a pre-filled message containing my complete order details
5. **Given** I am on Step 2, **When** I click "Back", **Then** I should return to Step 1 with my previously entered details preserved
6. **Given** I am on Step 1, **When** I click "Back to Menu", **Then** I should return to the menu page with my cart preserved

---

### User Story 4 - Grill Chargha Signature Animation (Priority: P3)

As a visitor on the home page, I want to see the restaurant's most famous dish (Grill Chargha) displayed with an eye-catching rotating plate animation and descriptive text, so that I am immediately drawn to try the signature dish.

**Why this priority**: Visual showcase that highlights the restaurant's signature item. Enhances brand identity and drives orders for the most profitable item.

**Independent Test**: Can be fully tested by visiting the home page and verifying a rotating plate animation appears with the Grill Chargha image and overlaid text (name, price, description).

**Acceptance Scenarios**:

1. **Given** I am on the home page, **When** I scroll past the "Our Specialties" section, **Then** I should see a dedicated Grill Chargha showcase section with a rotating plate animation
2. **Given** the Grill Chargha section is visible, **When** I look at the animation, **Then** the plate holding the Grill Chargha image should rotate continuously (like a plate spinning in an oven)
3. **Given** the Grill Chargha section is visible, **When** I look at the text overlay, **Then** I should see the dish name "Grill Chargha", a brief description, and the price (Rs. 1,100) displayed statically on top of the rotating image
4. **Given** the Grill Chargha section is visible, **When** I click on it, **Then** I should be navigated to the menu page or the item detail modal for Grill Chargha

---

### Edge Cases

- What happens when a customer clicks "Add to Cart" multiple times for the same item? (Quantity should increment, not duplicate)
- What happens when the cart is empty and the customer navigates to checkout? (Should show empty cart message with a link back to menu)
- What happens when a customer tries to proceed to Step 2 without filling required fields? (Should show validation errors)
- What happens when the Grill Chargha image fails to load? (Should show a fallback emoji or placeholder)
- What happens on slow network connections? (Modal should show a loading state until image loads)
- What happens if the customer closes the browser during checkout? (Cart is preserved in localStorage)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove the real-time clock display from the header navigation (both desktop and mobile)
- **FR-002**: System MUST display a modal/popup when a customer clicks on a menu item card
- **FR-003**: The item modal MUST show the item's full-size image, complete name, full description (not truncated), and price
- **FR-004**: The item modal MUST include an "Add to Cart" button that adds the item to the customer's cart
- **FR-005**: The item modal MUST include a "Continue Order" button that adds the item to cart and navigates to checkout
- **FR-006**: The item modal MUST be closeable via X button, backdrop click, or Escape key
- **FR-007**: System MUST implement a two-step checkout flow on the `/order` page
- **FR-008**: Checkout Step 1 MUST display all cart items with quantity controls and a customer details form (name, phone, order mode)
- **FR-009**: Checkout Step 2 MUST display a complete order summary with all items, customer details, order mode, and total price
- **FR-010**: Checkout Step 2 MUST include a "Place Order via WhatsApp" button that opens WhatsApp with a pre-filled complete order message sent to +923013631555
- **FR-011**: The WhatsApp order message MUST include customer name, phone, order mode, item list with quantities and prices, and total
- **FR-012**: System MUST display a Grill Chargha showcase section on the home page with a continuously rotating plate animation
- **FR-013**: The Grill Chargha section MUST display the dish name, description, and price as static text overlaid on the rotating image
- **FR-014**: The Grill Chargha section MUST be clickable and navigate to the item detail or menu page

### Key Entities

- **CartItem**: Represents an item in the customer's cart (item reference, name, price, quantity, image)
- **OrderDetails**: Customer information for checkout (name, phone, order mode, address/branch)
- **WhatsAppOrder**: Complete order message formatted for WhatsApp delivery

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Header no longer displays any clock element on any page (desktop or mobile)
- **SC-002**: Customers can view item details in a modal without leaving the menu page, reducing navigation steps from 2 to 1
- **SC-003**: Customers can complete checkout in under 2 minutes (from clicking "Continue Order" to WhatsApp message sent)
- **SC-004**: WhatsApp order messages contain 100% of required information (customer name, phone, mode, items, total)
- **SC-005**: Grill Chargha animation loads and plays smoothly without jank on standard devices
- **SC-006**: All existing cart functionality (add, remove, update quantity) continues to work correctly after changes
- **SC-007**: Zero new lint or build errors introduced

## Assumptions

- The existing `Modal.tsx` component will be reused for the item detail modal
- The existing `useCart` hook (localStorage-based) will continue to handle cart state
- The existing `generateFullOrderMessage()` utility will be used to format WhatsApp messages
- The order mode options (delivery/pickup/dine-in) will use the existing `OrderModeSelector` component
- For delivery orders, customers can type their address manually (map picker is optional for this iteration)
- The Grill Chargha animation will use CSS keyframe animations or Framer Motion (already installed at v13.3.0)
- The clock component file (`Clock.tsx`) will be deleted after removal from the header
