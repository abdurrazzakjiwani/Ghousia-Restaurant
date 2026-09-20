# Feature Specification: UI Styling Updates

**Feature Branch**: `013-ui-styling-updates`
**Created**: 2026-09-19
**Status**: Draft
**Input**: Remove orange gradients to solid orange, restyle stats card with DM Sans font, fix invisible Reserve Table button

## Clarifications

### Session 2026-09-19

- Q: Should email templates with inline CSS gradients be updated to solid orange? → A: Yes, update email templates to solid orange
- Q: Which fix approach for the invisible Reserve Table button? → A: White text on solid orange background (bg-orange-500 text-white)
- Q: What shadow and border values for the stats card? → A: shadow-md with border-l-4 border-orange-500

## User Scenarios & Testing (mandatory)

### User Story 1 - Fix Invisible Reserve Table Button (Priority: P1)

As a customer on the homepage, I want to see and click the "Reserve Table" button in the Ready to Order section so that I can make a reservation.

**Why this priority**: This is a critical usability bug. The button is currently invisible (white text on white background), preventing customers from discovering or using the reservation feature. This directly impacts business revenue.

**Independent Test**: Can be fully tested by visiting the homepage, scrolling to the Ready to Order section, and confirming the "Reserve Table" button is visible with readable text.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** scrolling to the Ready to Order section, **Then** the "Reserve Table" button is visible with dark text on a contrasting background
2. **Given** a user views the Ready to Order section, **When** hovering over the "Reserve Table" button, **Then** the button shows a clear hover state (e.g., background fill or color change)
3. **Given** a user sees the "Reserve Table" button, **When** clicking it, **Then** the user is navigated to the reservation page

---

### User Story 2 - Solid Orange Color Scheme (Priority: P2)

As a customer browsing the website, I want the orange decorative elements (buttons, icons, text accents) to use a consistent solid orange color instead of gradient effects, so the design feels cleaner and more modern.

**Why this priority**: The current gradient effects on orange elements create visual inconsistency and feel dated. Changing to solid orange modernizes the entire site's visual language across all pages.

**Independent Test**: Can be fully tested by visiting the homepage, menu page, checkout page, and other key pages, confirming all orange elements use solid color without gradients.

**Acceptance Scenarios**:

1. **Given** a user visits any page, **When** viewing orange elements (buttons, icons, text accents), **Then** the orange color is solid without any gradient effect
2. **Given** a user views the navigation bar, **When** looking at the logo or menu text, **Then** the orange color is solid without gradient
3. **Given** a user is on the menu page, **When** viewing the "Order Now" or "+" buttons, **Then** the orange color is solid
4. **Given** a user is on the checkout page, **When** viewing the "Continue" button, **Then** the orange color is solid

---

### User Story 3 - Restyled Stats Card in Our Story Section (Priority: P3)

As a customer reading the "Our Story" section on the homepage, I want the statistics box to look like a modern card with clean typography for numbers and labels, so the information is easy to read and visually appealing.

**Why this priority**: The current gradient background makes the stats box look like a colored block rather than a card. A card-style design with proper typography improves readability and visual hierarchy.

**Independent Test**: Can be fully tested by visiting the homepage, scrolling to the Our Story section, and confirming the stats box appears as a white card with shadow, orange-accented numbers in DM Sans font, and readable labels.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** viewing the Our Story section, **Then** the statistics box appears as a white card with rounded corners and subtle shadow
2. **Given** a user views the stats card, **When** looking at the numbers (39+, 13+, 5:30 PM, All KHI), **Then** the numbers are displayed in DM Sans font with orange color
3. **Given** a user views the stats card, **When** looking at the labels (Menu Items, Categories, Open Daily, Delivery Areas), **Then** the labels are displayed in a readable gray color
4. **Given** a user views the stats card, **When** looking at the card border, **Then** there is a subtle orange left border accent for visual interest

---

### Edge Cases

- What happens when the DM Sans font fails to load? The numbers should fall back to the default font (Poppins or system font) without layout breaking
- What happens when a user views the site on a very narrow mobile screen? The stats card should remain readable with proper spacing
- What happens when the orange solid color is applied to elements that previously had gradient animations? The animations should be removed or updated to work with solid colors

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: All orange gradient effects across the site MUST be replaced with solid orange color (#f97316)
- **FR-002**: The gradient color definition in the design system MUST be updated to use the same solid orange value for both start and end points
- **FR-003**: The "Reserve Table" button in the Ready to Order section MUST use white text on solid orange background (bg-orange-500 text-white)
- **FR-004**: The stats box in the Our Story section MUST be restyled as a white card with rounded-2xl, shadow-md, border-l-4 border-orange-500 accent
- **FR-005**: The stats numbers MUST use DM Sans font with orange color
- **FR-006**: The stats labels MUST use a readable gray color
- **FR-007**: The DM Sans font MUST be added to the project via Google Fonts integration
- **FR-008**: All changes MUST maintain responsive behavior on mobile and desktop screens
- **FR-009**: The scroll bar styling in the chat widget MUST use solid orange instead of gradient
- **FR-010**: The email templates (OrderConfirmation, RestaurantAlert) MUST use solid orange instead of inline CSS gradients

### Key Entities

- **Design System Colors**: Orange color palette definition used across all components
- **Typography**: Font configuration for DM Sans (numbers) and existing Poppins/Inter (headings/body)
- **Component Styles**: Button, card, and accent styling definitions

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: 100% of orange elements across the site display solid color without any gradient effect
- **SC-002**: The "Reserve Table" button is visible and clickable on all screen sizes
- **SC-003**: The stats card displays numbers in DM Sans font with proper orange color and readable gray labels
- **SC-004**: All changes pass build validation with no new errors or warnings
- **SC-005**: The site maintains responsive layout on mobile, tablet, and desktop viewports
