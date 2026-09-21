# Feature Specification: UI/UX Fixes

**Feature Branch**: `001-ui-fixes`
**Created**: 2026-09-19
**Status**: Draft
**Input**: Fix 6 UI/UX issues: remove scroll progress bar, change gradient colors to white/light, add unique SVG avatars for testimonials, fix category filter bug, remove gradient box from order mode selector

## Clarifications

### Session 2026-09-19

- Q: Should gradient color change work in both light and dark modes? → A: Only change gradient in light mode, keep orange in dark mode
- Q: How should avatar colors be assigned to ensure uniqueness? → A: Rotating palette of 12-16 predefined colors, cycled by index
- Q: When a category filter is selected but has no available items, what should display? → A: Show "No items available in this category" message

## User Scenarios & Testing (mandatory)

### User Story 1 - Remove Scroll Progress Bar (Priority: P1)

As a customer browsing the website, I do not want to see a progress line above the header so that the page looks cleaner and the header area is not obstructed.

**Why this priority**: This is a visual obstruction that affects every page load. Removing it is a quick, high-impact fix.

**Independent Test**: Can be fully tested by visiting any page and confirming no progress line appears above the navbar.

**Acceptance Scenarios**:

1. **Given** a user visits any page, **When** the page loads, **Then** no progress line appears above the navigation header
2. **Given** a user scrolls down any page, **When** scrolling, **Then** no orange progress indicator appears at the top

---

### User Story 2 - Change Gradient Colors to White/Light (Priority: P2)

As a customer, I want the decorative gradient boxes and section backgrounds to use a white/light color scheme instead of orange so that the design feels more modern and less visually overwhelming.

**Why this priority**: The orange gradients dominate multiple sections and make the site feel dated. Changing to white/light improves the overall aesthetic across the homepage, menu, and checkout flows.

**Independent Test**: Can be fully tested by visiting the homepage, menu page, and checkout page, confirming all gradient elements use white/light tones instead of orange.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** viewing the Our Story section, **Then** the statistics box uses a white/light gradient instead of orange
2. **Given** a user visits the homepage, **When** scrolling to the Ready to Order section, **Then** the section background uses a white/light gradient instead of orange
3. **Given** a user is on the menu page, **When** selecting a category filter, **Then** the active category pill uses white/light styling instead of orange
4. **Given** a user is on the checkout page, **When** viewing the order mode selector, **Then** the selected option uses white/light styling instead of orange
5. **Given** a user is on the checkout page, **When** viewing the Continue to Confirm button, **Then** the button uses a white/light gradient instead of orange

---

### User Story 3 - Unique SVG Avatars for Testimonials (Priority: P2)

As a customer reading testimonials, I want to see unique, visually distinct avatar icons for each reviewer instead of letter initials, so the testimonials feel more authentic and visually engaging.

**Why this priority**: The current letter initials look generic and unprofessional. Unique avatars improve trust and visual appeal of the social proof section.

**Independent Test**: Can be fully tested by scrolling through the testimonials carousel and confirming each visible review shows a distinct colored avatar with initials.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** scrolling to the What Our Customers Say section, **Then** each testimonial displays a unique colored SVG avatar instead of a plain letter mark
2. **Given** a user views the testimonials carousel, **When** clicking through reviews, **Then** each review shows a distinct background color for the avatar circle
3. **Given** a user views the testimonials, **When** observing the avatars, **Then** the avatars display the customer initials in a visually appealing, colored circular design

---

### User Story 4 - Fix Category Filter Bug (Priority: P1)

As a customer browsing the menu, I want to click on category filters like Burgers, BBQ, etc. and see the corresponding menu items displayed, so I can easily find food in my preferred category.

**Why this priority**: This is a core functionality bug. Customers cannot browse by category, which is a primary navigation method for the menu. This directly prevents customers from finding and ordering food.

**Independent Test**: Can be fully tested by visiting the menu page, clicking each category filter, and confirming the correct items appear.

**Acceptance Scenarios**:

1. **Given** a user is on the menu page with All selected, **When** clicking the Burgers category, **Then** only burger items are displayed
2. **Given** a user is on the menu page, **When** clicking the BBQ category, **Then** only BBQ items are displayed
3. **Given** a user is on the menu page with a category selected, **When** clicking All, **Then** all available menu items are displayed again
4. **Given** a user navigates from the homepage via a category link, **When** the menu page loads, **Then** the correct category is pre-selected and its items are displayed
5. **Given** a user has selected a category filter, **When** using the search box, **Then** the search results override the category filter and show matching items across all categories

---

### User Story 5 - Remove Gradient Box from Order Mode Selector (Priority: P3)

As a customer selecting a delivery method (Delivery, Pickup, or Dine-in), I want the selected option to be visually indicated without a gradient overlay box, so the selection feels cleaner and less visually noisy.

**Why this priority**: The gradient overlay on the selected order mode is a minor visual annoyance. The selection indicator still works, but the gradient box adds unnecessary visual clutter.

**Independent Test**: Can be fully tested by going to checkout, selecting each order mode, and confirming the selected option has a clean border highlight without a gradient overlay.

**Acceptance Scenarios**:

1. **Given** a user is on the checkout page, **When** selecting Delivery, **Then** the option is highlighted with a clean border without a gradient overlay box
2. **Given** a user is on the checkout page, **When** switching between Delivery/Pickup/Dine-in, **Then** only the currently selected option shows a subtle border highlight without gradient backgrounds
3. **Given** a user is on the checkout page, **When** viewing the order mode options, **Then** the selected option is clearly distinguishable from unselected options through border styling only

---

### Edge Cases

- What happens when a user rapidly clicks between category filters? The menu should update immediately without visual glitches or stale items
- What happens when the menu page is loaded with an invalid category parameter in the URL? The page should default to showing All items
- What happens when a user navigates directly to /menu?category=invalid-slug? The page should display all items with no category selected
- What happens when a testimonial has a single-word name? The avatar should display the first letter properly centered
- What happens when a category filter is selected but has no available items? Show "No items available in this category" message

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The scroll progress indicator MUST be completely removed from all pages
- **FR-002**: All site-wide gradient colors MUST change from orange to white/light gray in light mode only; dark mode retains orange gradients
- **FR-003**: The global gradient color definition MUST be updated in the design system configuration
- **FR-004**: Testimonial avatars MUST display unique colored SVG circles with customer initials using a rotating palette of 12-16 predefined colors
- **FR-005**: Each testimonial MUST have a distinct background color based on its index, cycling through the predefined palette
- **FR-006**: Category filter clicks MUST correctly filter and display matching menu items
- **FR-007**: URL-based category parameters MUST properly sync with the category filter state
- **FR-008**: The order mode selector MUST indicate selection through border styling only, without gradient overlays
- **FR-009**: The gradient overlay animation on order mode selection MUST be removed

### Key Entities

- **MenuItem**: Represents a food item with name, price, image, and category assignment
- **Category**: Represents a menu category with name, slug, and display order
- **Testimonial**: Represents a customer review with name, rating, comment, and seed for avatar generation

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: No visual progress indicator appears on any page during scrolling
- **SC-002**: All gradient elements across the site display white/light gray instead of orange in light mode; dark mode retains original orange gradients
- **SC-003**: Every testimonial avatar shows a unique color, with no two adjacent reviews sharing the same color
- **SC-004**: 100% of category filters correctly display their corresponding menu items when clicked
- **SC-005**: Category navigation from homepage Popular Categories section correctly pre-selects and filters items
- **SC-006**: Order mode selection uses clean border highlighting without gradient backgrounds
- **SC-007**: All changes pass build validation with no new errors or warnings
