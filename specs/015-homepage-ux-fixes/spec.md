# Feature Specification: Homepage UX Fixes

**Feature Branch**: `015-homepage-ux-fixes`  
**Created**: 2026-09-21  
**Status**: Draft  
**Input**: User description: "Fix homepage issues: reduce specialties to 4 items, fix menu loading, modify CTA section, swap floating icons, add hero overlay"

## Clarifications

### Session 2026-09-21

- Q: What should the new CTA section text say? → A: "Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Menu Navigation Works Instantly (Priority: P1)

A customer visits the homepage and clicks "Menu" in the navigation bar, "View Full Menu" link, or any other menu-related link. The menu page loads immediately showing all available items without delay or loading state.

**Why this priority**: This is the core browsing experience. If customers cannot access the menu, they cannot order food. All menu navigation paths are currently broken.

**Independent Test**: Click "Menu" in navbar, "View Full Menu" on homepage, "Browse Menu" in empty cart, "Order Now" in Signature Dishes, and "View All Categories" in Popular Categories. All should load the menu page with items visible within 1 second.

**Acceptance Scenarios**:

1. **Given** customer is on homepage, **When** they click "Menu" in navbar, **Then** menu page loads with all items visible
2. **Given** customer is on homepage, **When** they click "View Full Menu" link, **Then** menu page loads with all items visible
3. **Given** customer has empty cart and clicks cart icon, **When** they click "Browse Menu" button, **Then** menu page loads with all items visible
4. **Given** customer is on homepage, **When** they click "Order Now" in Signature Dishes section, **Then** menu page loads filtered to Chargha category
5. **Given** customer is on homepage, **When** they click "View All Categories" in Popular Categories, **Then** menu page loads with all items visible

---

### User Story 2 - Homepage Specialties Shows 4 Items (Priority: P2)

A customer views the "Our Specialties" section on the homepage and sees exactly 4 featured items: Zinger Burger, Grill Chargha, Club Sandwich, and Boneless Creamy Handi. The section is clean and focused.

**Why this priority**: Reducing clutter improves visual hierarchy and helps customers focus on the most important dishes. This is a content curation decision.

**Independent Test**: Scroll to "Our Specialties" section on homepage. Verify exactly 4 items are displayed with correct names and images.

**Acceptance Scenarios**:

1. **Given** customer views homepage, **When** they scroll to "Our Specialties", **Then** exactly 4 items are displayed
2. **Given** customer views homepage, **When** they check "Our Specialties", **Then** items shown are: Zinger Burger, Grill Chargha, Club Sandwich, Boneless Creamy Handi

---

### User Story 3 - CTA Section Promotes Dine-In (Priority: P2)

A customer views the "Ready to Dine at Our Restaurant" section on the homepage. The section invites them to visit the restaurant with address information and a "Reserve a Table" button. No WhatsApp ordering option is shown.

**Why this priority**: The restaurant wants to emphasize dine-in experience over delivery. This changes the call-to-action to match business goals.

**Independent Test**: Scroll to CTA section on homepage. Verify heading says "Ready to Dine at Our Restaurant", no WhatsApp button exists, and "Reserve a Table" button is present.

**Acceptance Scenarios**:

1. **Given** customer views homepage, **When** they scroll to CTA section, **Then** heading reads "Ready to Dine at Our Restaurant"
2. **Given** customer views homepage, **When** they check CTA section, **Then** no "Order on WhatsApp" button is visible
3. **Given** customer views homepage, **When** they check CTA section, **Then** "Reserve a Table" button is present and functional
4. **Given** customer views homepage, **When** they check CTA section, **Then** text reads "Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience"

---

### User Story 4 - Floating Icons in Correct Positions (Priority: P3)

A customer sees three floating action buttons on the page: chatbot icon in bottom-right corner, WhatsApp icon in bottom-left area, and scroll-to-top button above the chatbot on the right side.

**Why this priority**: Proper icon placement improves usability and follows the user's desired layout. This is a visual organization fix.

**Independent Test**: Verify chatbot is at bottom-6 right-6, WhatsApp is at bottom-24 left-6, and scroll-to-top is at bottom-24 right-6.

**Acceptance Scenarios**:

1. **Given** customer views any page, **When** they look at bottom-right corner, **Then** chatbot icon is visible at bottom-6 right-6 position
2. **Given** customer views any page, **When** they look at bottom-left area, **Then** WhatsApp icon is visible at bottom-24 left-6 position
3. **Given** customer scrolls down 500+ pixels, **When** they look at bottom-right above chatbot, **Then** scroll-to-top button appears at bottom-24 right-6

---

### User Story 5 - Hero Section Text Clearly Visible (Priority: P3)

A customer views the hero section and can clearly read all text overlaying the background image. The text has sufficient contrast against the image.

**Why this priority**: Text readability is essential for communicating the restaurant's value proposition and call-to-action buttons.

**Independent Test**: View hero section on any device. Verify text "Where Every Bite Tells a Story" and all button text is clearly readable.

**Acceptance Scenarios**:

1. **Given** customer views homepage, **When** hero section loads, **Then** all text is clearly readable against background
2. **Given** customer views homepage on mobile, **When** hero section loads, **Then** text remains readable with adequate contrast

---

### Edge Cases

- What happens if menu data fails to load? System should show a user-friendly error message with retry option
- What happens if customer clicks menu link rapidly multiple times? System should debounce navigation and only load once
- What happens on slow network connections? Menu should show skeleton loading state while content loads
- What happens if images fail to load in Specialties section? Placeholder icon should display with item name

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display exactly 4 items in "Our Specialties" section: Zinger Burger, Grill Chargha, Club Sandwich, Boneless Creamy Handi
- **FR-002**: System MUST load menu page within 1 second when any menu navigation link is clicked
- **FR-003**: System MUST display all available menu items when menu page loads
- **FR-004**: System MUST filter menu items by category when category parameter is provided in URL
- **FR-005**: System MUST display "Ready to Dine at Our Restaurant" heading in CTA section
- **FR-006**: System MUST NOT display "Order on WhatsApp" button in CTA section
- **FR-007**: System MUST display "Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience" and "Reserve a Table" button in CTA section
- **FR-008**: System MUST position chatbot icon at bottom-6 right-6
- **FR-009**: System MUST position WhatsApp icon at bottom-24 left-6
- **FR-010**: System MUST position scroll-to-top button at bottom-24 right-6
- **FR-011**: System MUST apply dark overlay on hero section for text readability
- **FR-012**: System MUST show "Browse Menu" button in empty cart state that navigates to menu

### Key Entities

- **Menu Item**: A food item with name, description, price, image, category, and featured status
- **Category**: A food category with name, slug, icon, and display order
- **Cart**: User's selected items for ordering, persisted in local storage
- **Floating Action Button**: Interactive icon button fixed to viewport corner

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Menu page loads in under 1 second from any navigation entry point
- **SC-002**: 100% of menu navigation links successfully load the menu page
- **SC-003**: "Our Specialties" section displays exactly 4 items
- **SC-004**: All text in hero section has contrast ratio of at least 4.5:1 against background
- **SC-005**: All three floating icons are visible and clickable in their designated positions
- **SC-006**: CTA section shows dine-in messaging without any delivery/WhatsApp ordering options

## Assumptions

- Menu data is statically defined and does not require database queries
- All menu items have valid image paths or graceful fallback handling
- Cart functionality is already working and only the "Browse Menu" navigation needs fixing
- The restaurant address "Block 3, Federal B Area, Hussainabad" is correct for the CTA section
- Float icon positions are based on Tailwind CSS utility classes (bottom-6 = 1.5rem, bottom-24 = 6rem)
