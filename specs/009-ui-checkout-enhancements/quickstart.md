# Quickstart: UI & Checkout Enhancements Validation

**Date**: 2026-09-18
**Feature**: 009-ui-checkout-enhancements

## Prerequisites

- Development server running (`npm run dev`)
- Browser open to `http://localhost:3000`

## Validation Scenarios

### Scenario 1: Clock Removed from Header

1. Open any page (home, menu, about, etc.)
2. Look at the header navigation area
3. **Verify**: No real-time clock display is visible
4. Open mobile navigation menu
5. **Verify**: No clock in mobile menu either

### Scenario 2: Menu Item Modal Opens on Click

1. Navigate to `/menu`
2. Click on any food item card (image or name area)
3. **Verify**: A modal/popup appears with:
   - Full-size item image
   - Complete item name
   - Full description (not truncated)
   - Price displayed
   - "Add to Cart" button
   - "Continue Order" button
   - Close (X) button

### Scenario 3: Modal Add to Cart

1. Open a menu item modal
2. Click "Add to Cart"
3. **Verify**: Item is added to cart (cart count updates)
4. **Verify**: Modal remains open (or shows success indication)

### Scenario 4: Modal Continue Order

1. Open a menu item modal
2. Click "Continue Order"
3. **Verify**: Item is added to cart
4. **Verify**: Page navigates to `/order` checkout

### Scenario 5: Modal Close Methods

1. Open a menu item modal
2. Click the X button → **Verify**: Modal closes
3. Reopen modal, click outside the modal → **Verify**: Modal closes
4. Reopen modal, press Escape key → **Verify**: Modal closes

### Scenario 6: Two-Step Checkout Flow

1. Add items to cart from menu page
2. Navigate to `/order`
3. **Verify Step 1**: See all cart items with quantities, customer form (name, phone, order mode), "Continue to Confirm" button
4. Fill in name, phone, select order mode
5. Click "Continue to Confirm"
6. **Verify Step 2**: See order summary with items, customer details, mode, total price
7. Click "Back" → **Verify**: Return to Step 1 with details preserved

### Scenario 7: WhatsApp Order Delivery

1. Complete Steps 1-2 of checkout
2. Click "Place Order via WhatsApp"
3. **Verify**: WhatsApp opens with pre-filled message to +923013631555
4. **Verify**: Message contains: customer name, phone, order mode, item list with quantities and prices, total

### Scenario 8: Empty Cart Checkout

1. Clear all items from cart
2. Navigate to `/order`
3. **Verify**: Empty cart message with "Browse Menu" link

### Scenario 9: Grill Chargha Animation

1. Navigate to home page (`/`)
2. Scroll past "Our Specialties" section
3. **Verify**: See a Grill Chargha showcase section
4. **Verify**: Plate image rotates continuously (like oven plate)
5. **Verify**: Static text overlay shows dish name, description, price
6. Click on the section
7. **Verify**: Navigates to menu or opens item detail

### Scenario 10: Build Validation

1. Run `npm run lint`
2. **Verify**: No new warnings or errors
3. Run `npm run build`
4. **Verify**: Build completes successfully

## Success Criteria Checklist

- [ ] SC-001: Header displays no clock on any page
- [ ] SC-002: Item details viewable in modal without leaving menu page
- [ ] SC-003: Checkout completable in under 2 minutes
- [ ] SC-004: WhatsApp messages contain 100% required information
- [ ] SC-005: Grill Chargha animation runs smoothly at 60fps
- [ ] SC-006: All existing cart functionality works correctly
- [ ] SC-007: Zero new lint or build errors
