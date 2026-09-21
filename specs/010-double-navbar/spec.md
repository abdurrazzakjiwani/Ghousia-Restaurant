# Feature Specification: Double Navbar Redesign

**Feature Branch**: `010-double-navbar`  
**Created**: 2026-09-18  
**Status**: Draft  
**Input**: User description: "Redesign the navbar into a double-row layout with an info bar on top (phone, hours, track order) and main navigation below (logo, links, cart, search, dark mode). Remove Branches, Location, and Reserve from nav. Menu dropdown shows categories only. Search is an expandable inline input."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Info Bar with Contact & Hours (Priority: P1)

As a restaurant customer, I want to see the restaurant's phone number and operating hours at the top of every page so I can quickly contact them or know when they're open without searching for the information.

**Why this priority**: This is the most visible new element and provides immediate practical value. It also establishes the two-row structure that all other features depend on.

**Independent Test**: Can be fully tested by visiting any page and verifying the top bar displays phone number, hours, and Track Order link. Delivers value by making contact info persistently visible.

**Acceptance Scenarios**:

1. **Given** I am on any page of the website, **When** I look at the top of the page, **Then** I see a thin info bar displaying the restaurant phone number, operating hours, and a Track Order link.
2. **Given** I am on a mobile device (screen width less than 640px), **When** I view the navbar, **Then** the info bar is hidden and only a phone-call icon is visible in the main nav area.
3. **Given** I see the phone number in the info bar, **When** I click on it, **Then** my phone's dialer opens with the number pre-filled.
4. **Given** I see the Track Order link in the info bar, **When** I click it, **Then** I am navigated to the order tracking page.

---

### User Story 2 - Main Navigation with Cart & Search (Priority: P1)

As a website visitor, I want a clean main navigation bar with the restaurant logo, key page links, a cart icon showing my item count, and a search icon so I can navigate the site, check my cart, and find menu items efficiently.

**Why this priority**: This is the core navigation experience. The cart badge and search icon are high-value additions that improve the primary user flows (browsing menu, placing orders).

**Independent Test**: Can be fully tested by navigating between pages, adding items to cart and verifying the badge count, and using the search icon to find menu items. Delivers value by consolidating navigation, cart, and search in one place.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I look at the main navigation row, **Then** I see the restaurant logo on the left, navigation links in the center, and search icon, cart icon, and dark mode toggle on the right.
2. **Given** I have added 3 items to my cart, **When** I look at the cart icon in the navbar, **Then** I see a badge showing the number "3".
3. **Given** I have an empty cart, **When** I look at the cart icon, **Then** no badge is displayed.
4. **Given** I click the cart icon, **When** the action completes, **Then** I am navigated to the order/checkout page.
5. **Given** I click the search icon, **When** the animation completes, **Then** a search input field expands inline within the navbar, focused and ready for typing.
6. **Given** the search input is open, **When** I type a query, **Then** matching menu items appear in a dropdown below the search input.
7. **Given** the search input is open, **When** I press Escape or click outside the search area, **Then** the search input collapses and returns to the search icon.
8. **Given** I select a search result, **When** the selection is confirmed, **Then** I am navigated to the menu page, the page scrolls to the selected item, and the item receives a temporary highlight border (visible for 2-3 seconds) to confirm the selection.

---

### User Story 3 - Menu Category Dropdown (Priority: P2)

As a menu browser, I want to hover over or click the "Menu" link in the navbar and see a dropdown of food categories so I can quickly jump to a specific category without scrolling through the entire menu.

**Why this priority**: This improves menu navigation efficiency but is secondary to the core nav/cart/search experience. The menu page already has category filtering, so this is an enhancement.

**Independent Test**: Can be fully tested by hovering/clicking the Menu link and verifying the category dropdown appears with all 13 categories. Delivers value by providing quick category access from any page.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I hover over the "Menu" link in the main nav, **Then** a dropdown appears showing all 13 food categories as clickable pills/buttons.
2. **Given** the Menu dropdown is open, **When** I click a category (e.g., "BBQ"), **Then** I am navigated to the menu page with that category pre-selected.
3. **Given** the Menu dropdown is open, **When** I click the "All" option, **Then** I am navigated to the menu page showing all items.
4. **Given** I am on a mobile device, **When** I tap the "Menu" link, **Then** I am navigated directly to the `/menu` page where the existing CategoryFilter bar handles category selection.
5. **Given** the Menu dropdown is open, **When** I move my mouse away from the dropdown and the menu link, **Then** the dropdown closes after a brief delay.

---

### User Story 4 - Simplified Navigation Links (Priority: P2)

As a website visitor, I want the main navigation to show only the most important pages (Home, Menu, About, Contact) so the navbar is clean and uncluttered. I expect to find Branches, Location, and Reservation information on the Contact page instead.

**Why this priority**: Reducing nav link count from 8 to 4 improves visual clarity and reduces cognitive load. The removed pages remain accessible via the Contact page.

**Independent Test**: Can be fully tested by verifying the navbar shows only Home, Menu, About, and Contact links, and that Branches/Location/Reserve are accessible from the Contact page.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I look at the main navigation links, **Then** I see only: Home, Menu, About, and Contact.
2. **Given** I am on the Contact page, **When** I scroll down, **Then** I find a section with links to the Branches page (showing branch locations and images), the Location page (showing the embedded map), and the Reservation page (showing the booking form).
3. **Given** I try to navigate to /branches, /location, or /reservation via direct URL, **When** the page loads, **Then** the page still works (routes are not removed, only nav links).

---

### User Story 5 - Mobile Responsive Design (Priority: P2)

As a mobile user, I want the double navbar to adapt gracefully to my screen size so I can access all navigation features without horizontal scrolling or overlapping elements.

**Why this priority**: Mobile traffic is significant for restaurant websites. The double navbar must not break the mobile experience.

**Independent Test**: Can be fully tested by resizing the browser to mobile widths and verifying the navbar collapses appropriately. Delivers value by maintaining usability across all devices.

**Acceptance Scenarios**:

1. **Given** I am on a mobile device (width < 640px), **When** I view the navbar, **Then** the info bar is hidden and the main nav shows the logo, cart icon, and hamburger menu button.
2. **Given** I am on a tablet (640px <= width < 768px), **When** I view the navbar, **Then** the info bar shows phone number only (no hours or Track Order), and the main nav shows condensed links.
3. **Given** I tap the hamburger menu on mobile, **When** the menu opens, **Then** I see all navigation links, dark mode toggle, and a search option in a full-width drawer.
4. **Given** the mobile menu is open, **When** I tap a link, **Then** the menu closes and I am navigated to the selected page.

---

### User Story 6 - Accessibility & Active State (Priority: P3)

As a user relying on keyboard navigation or screen readers, I want the navbar to be fully accessible with proper labels, focus indicators, and active page highlighting so I can navigate the site effectively.

**Why this priority**: Accessibility is important for inclusivity but does not block core functionality. This can be implemented after the visual structure is in place.

**Independent Test**: Can be tested by navigating the navbar using only the Tab key and verifying focus indicators appear, and by using a screen reader to verify aria labels are present.

**Acceptance Scenarios**:

1. **Given** I am navigating with a keyboard, **When** I Tab through the navbar, **Then** each interactive element (links, icons, buttons) receives a visible focus indicator.
2. **Given** I am on the Menu page, **When** I look at the navbar, **Then** the "Menu" link is visually highlighted as the active page.
3. **Given** I am using a screen reader, **When** I encounter the hamburger button, **Then** it is announced as "Open menu" or "Close menu" depending on state.
4. **Given** I am using a screen reader, **When** I encounter the cart icon, **Then** it is announced as "Shopping cart, N items" (where N is the count).

---

### Edge Cases

- What happens when the cart count exceeds 99? The badge should show "99+" to avoid layout overflow.
- What happens when the search query returns no results? A "No items found" message should appear in the dropdown.
- What happens when the user is on the menu page and clicks a category from the navbar dropdown? The page should scroll to top and update the category filter.
- What happens when the user clicks the search icon while already on the menu page? The search input should expand inline without navigating away.
- What happens when the user resizes from desktop to mobile while the search input is open? The search should collapse automatically.
- What happens when the category dropdown is open and the user scrolls the page? The dropdown should close.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a persistent info bar at the top of every page containing the restaurant phone number, operating hours, and a Track Order link.
- **FR-002**: System MUST display a main navigation bar below the info bar containing the restaurant logo, navigation links (Home, Menu, About, Contact), search icon, cart icon with item count badge, and dark mode toggle.
- **FR-003**: System MUST hide the info bar on mobile screens (width < 640px) and show only a phone-call icon in the main nav.
- **FR-004**: System MUST display a category dropdown when the user hovers over or clicks the "Menu" link, showing all 13 food categories as clickable items.
- **FR-005**: System MUST navigate to the menu page with the selected category pre-filtered when a category is clicked in the dropdown.
- **FR-006**: System MUST expand a search input inline within the navbar when the search icon is clicked, with the input auto-focused.
- **FR-007**: System MUST display matching menu items in a dropdown below the search input as the user types.
- **FR-008**: System MUST collapse the search input when the user presses Escape, clicks outside the search area, or selects a result.
- **FR-009**: System MUST display a cart badge with the item count on the cart icon, updating in real-time as items are added or removed.
- **FR-010**: System MUST navigate to the order page when the cart icon is clicked.
- **FR-011**: System MUST limit the cart badge display to "99+" when the count exceeds 99.
- **FR-012**: System MUST highlight the currently active page link in the navigation with a visual indicator.
- **FR-013**: System MUST provide proper aria-labels on all icon buttons (hamburger, search, cart, dark mode toggle).
- **FR-014**: System MUST support keyboard navigation through all navbar elements with visible focus indicators.
- **FR-015**: System MUST close the category dropdown when the user moves the mouse away (with a brief delay) or presses Escape.
- **FR-016**: System MUST close the mobile menu when a link is selected.
- **FR-017**: System MUST preserve the two-band navbar structure within a single sticky container to ensure both rows pin at the top together.
- **FR-018**: System MUST keep the existing /branches, /location, and /reservation routes functional even though their nav links are removed.
- **FR-019**: System MUST display links to the Branches, Location, and Reservation pages on the Contact page so users can find them after their nav links are removed.
- **FR-020**: System MUST scroll to the selected search result item on the menu page and apply a temporary highlight border (visible for 2-3 seconds) to confirm the selection.
- **FR-021**: System MUST close the category dropdown after a 200ms delay when the mouse leaves the dropdown area.

### Key Entities

- **NavItem**: Represents a navigation link with a label and destination URL. The navbar displays a subset of all available pages.
- **Category**: Represents a food category (e.g., Burgers, BBQ, Chinese). 13 categories exist, each with a name, icon, and slug.
- **CartItem**: Represents an item in the user's cart. The navbar cart badge reads the count from the existing cart state.
- **SearchResult**: Represents a menu item matching the user's search query. Generated from the existing menu data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can see the restaurant phone number and hours on every page without scrolling or navigating to a contact page.
- **SC-002**: Users can navigate to any main page (Home, Menu, About, Contact) within one click from any page.
- **SC-003**: Users can add items to cart and see the updated count in the navbar within 1 second.
- **SC-004**: Users can search for menu items and see results within 1 second of typing.
- **SC-005**: Users can access any food category from the navbar dropdown within 2 clicks (hover Menu → click category).
- **SC-006**: The double navbar does not exceed 100px total height on desktop (info bar + main nav combined).
- **SC-007**: The navbar fully collapses to a single row on mobile devices without horizontal overflow.
- **SC-008**: All navbar elements are reachable via keyboard navigation with visible focus indicators.
- **SC-009**: Screen readers correctly announce all interactive navbar elements and their states.
- **SC-010**: The existing cart functionality (add, remove, update quantity) works identically with the new navbar cart badge.

## Clarifications

### Session 2026-09-18

- Q: Mobile Menu dropdown behavior - should it open a category dropdown or navigate to /menu? → A: Navigate to `/menu` page directly (existing CategoryFilter handles categories there)
- Q: Search result navigation - how should the menu page present a selected search result? → A: Scroll to the item and add a temporary highlight/border (2-3 seconds)
- Q: Contact page integration - should this feature include modifying the Contact page to add Branches/Location/Reserve links? → A: Include Contact page updates in this feature (add Branches/Location/Reserve links/sections)

## Assumptions

- The restaurant's phone number and operating hours are available via environment variables (already configured).
- The existing 13 food categories and 85 menu items remain unchanged.
- The existing cart state (localStorage via useCart hook) remains the source of truth for cart data.
- The existing search function (searchItems in menu-data.ts) is sufficient for the navbar search feature.
- No authentication system exists yet, so no user/login icon is included in this version.
- The Branches, Location, and Reservation pages remain accessible via direct URL and will be linked from the Contact page.
- The ScrollProgress component (z-[60]) continues to render above the navbar (z-30) without conflict.
- The category dropdown closes after a 200ms delay when the mouse leaves (industry-standard hover delay).
- The info bar uses a lighter shade of the main nav background to visually differentiate the two bands.
