# Quickstart: Double Navbar Redesign Validation

**Date**: 2026-09-18
**Feature**: 010-double-navbar

## Prerequisites

- Development server running (`npm run dev`)
- Browser open to `http://localhost:3000`
- Cart has at least 3 items (for badge testing)

## Validation Scenarios

### Scenario 1: Info Bar Displays on Desktop

1. Open any page (home, menu, about, etc.)
2. Look at the very top of the page
3. **Verify**: A thin info bar is visible with:
   - Phone number (0301-3631555)
   - Operating hours (5:30 PM - 2:00 AM)
   - "Track Order" link
4. Click the phone number
5. **Verify**: Phone dialer opens with the number pre-filled
6. Click "Track Order"
7. **Verify**: Navigated to the tracking page

### Scenario 2: Info Bar Responsive Behavior

1. Resize browser to mobile width (< 640px)
2. **Verify**: Info bar is completely hidden
3. **Verify**: A phone-call icon is visible in the main nav area
4. Click the phone-call icon
5. **Verify**: Phone dialer opens
6. Resize to tablet width (640px - 768px)
7. **Verify**: Info bar shows phone number only (no hours, no Track Order)

### Scenario 3: Main Nav Layout

1. Resize to desktop width (> 768px)
2. **Verify**: Main nav shows:
   - Logo ("Ghousia Golden Spoon") on the left
   - Nav links in the center: Home, Menu, About, Contact
   - Right side: Search icon, Cart icon with badge, Dark mode toggle
3. **Verify**: "Menu" link has a dropdown indicator (chevron or arrow)

### Scenario 4: Cart Badge

1. Verify cart has items (check badge count)
2. **Verify**: Cart icon shows a badge with the item count
3. Add one more item from the menu page
4. **Verify**: Badge count updates immediately
5. Remove an item from the cart
6. **Verify**: Badge count decreases immediately
7. Clear all items from cart
8. **Verify**: No badge is displayed (empty cart)
9. Click the cart icon
10. **Verify**: Navigated to the order/checkout page

### Scenario 5: Search Input Expansion

1. Click the search icon in the navbar
2. **Verify**: A search input field expands inline within the navbar
3. **Verify**: The input is focused and ready for typing
4. Type "zinger" in the search input
5. **Verify**: A dropdown appears below the search input showing matching items
6. Click outside the search area
7. **Verify**: The search input collapses back to the search icon
8. Reopen search, type a query, press Escape
9. **Verify**: The search input collapses

### Scenario 6: Search Result Navigation

1. Open the search input
2. Type "burger" to see matching results
3. Click on "Zinger Burger" in the results
4. **Verify**: Navigated to the menu page
5. **Verify**: The page scrolls to the Zinger Burger item
6. **Verify**: The Zinger Burger item has a temporary highlight border (visible for 2-3 seconds)
7. **Verify**: The highlight fades away after 2-3 seconds

### Scenario 7: Menu Category Dropdown

1. Hover over the "Menu" link in the navbar
2. **Verify**: A dropdown appears showing all 13 categories as pill buttons
3. Click "BBQ" category
4. **Verify**: Navigated to the menu page with BBQ category pre-selected
5. Hover over Menu again, click "All"
6. **Verify**: Navigated to the menu page showing all items
7. Open dropdown, move mouse away
8. **Verify**: Dropdown closes after a brief delay (~200ms)
9. Open dropdown, press Escape
10. **Verify**: Dropdown closes immediately

### Scenario 8: Mobile Navigation

1. Resize to mobile width (< 640px)
2. **Verify**: Nav shows logo, cart icon, phone icon, and hamburger menu
3. Tap the hamburger menu
4. **Verify**: A full-width drawer slides in from the right
5. **Verify**: Drawer contains: Home, Menu, About, Contact, dark mode toggle, search option
6. Tap "Menu"
7. **Verify**: Navigated to the /menu page (not a dropdown)
8. Reopen drawer, tap a link
9. **Verify**: Drawer closes and navigates to the selected page
10. Tap outside the drawer or press Escape
11. **Verify**: Drawer closes

### Scenario 9: Active Link Highlighting

1. Navigate to the Menu page
2. **Verify**: The "Menu" link in the navbar is visually highlighted (different color/underline)
3. Navigate to the About page
4. **Verify**: The "About" link is now highlighted, "Menu" is no longer highlighted
5. Navigate to the Contact page
6. **Verify**: The "Contact" link is highlighted

### Scenario 10: Contact Page Integration

1. Navigate to the Contact page
2. Scroll down past the contact form and phone numbers
3. **Verify**: Find a section with links to:
   - Branches page (with branch image/name)
   - Location page (with map preview)
   - Reservation page (with booking icon)
4. Click the Branches link
5. **Verify**: Navigated to the /branches page
6. Go back to Contact, click Location
7. **Verify**: Navigated to the /location page
8. Go back to Contact, click Reservation
9. **Verify**: Navigated to the /reservation page

### Scenario 11: Keyboard Navigation

1. Press Tab to navigate through the navbar
2. **Verify**: Each interactive element receives a visible focus indicator
3. Navigate to the Menu link using Tab
4. Press Enter
5. **Verify**: Category dropdown opens
6. Use arrow keys or Tab to navigate categories
7. Press Enter on a category
8. **Verify**: Navigated to the menu page with that category

### Scenario 12: Dark Mode Integration

1. Toggle dark mode using the dark mode toggle in the navbar
2. **Verify**: The entire navbar (both info bar and main nav) switches to dark theme
3. **Verify**: The category dropdown also switches to dark theme
4. **Verify**: The search input and results dropdown switch to dark theme
5. **Verify**: The mobile drawer switches to dark theme

### Scenario 13: Build Validation

1. Run `npm run lint`
2. **Verify**: No new warnings or errors
3. Run `npm run build`
4. **Verify**: Build completes successfully
5. **Verify**: All pages are generated without errors

## Success Criteria Checklist

- [ ] SC-001: Phone and hours visible on every page without scrolling
- [ ] SC-002: Any main page reachable within one click
- [ ] SC-003: Cart count updates in navbar within 1 second
- [ ] SC-004: Search results appear within 1 second of typing
- [ ] SC-005: Any category accessible within 2 clicks
- [ ] SC-006: Total navbar height does not exceed 100px on desktop
- [ ] SC-007: Navbar collapses to single row on mobile without overflow
- [ ] SC-008: All elements reachable via keyboard with focus indicators
- [ ] SC-009: Screen readers announce all interactive elements
- [ ] SC-010: Cart functionality works identically with new navbar
