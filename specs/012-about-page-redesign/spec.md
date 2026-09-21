# Feature Specification: About Page Redesign

**Feature Branch**: `012-about-page-redesign`
**Created**: 2026-09-19
**Status**: Draft
**Input**: Improve the about page with UI/UX enhancements — add food imagery, visual timeline for origin story, image cards for cooking philosophy, animated stats bar, and styled contact map section

## User Scenarios & Testing (mandatory)

### User Story 1 - Visually Engaging Hero Section (Priority: P1)

As a customer visiting the about page, I want to see a hero section with a background food/restaurant image so that I immediately understand this is a restaurant and feel drawn to explore more.

**Why this priority**: The hero is the first thing users see. A plain gradient with text feels generic and doesn't convey the restaurant's identity. Adding imagery creates instant visual impact.

**Independent Test**: Can be fully tested by visiting the about page and confirming a hero image is visible with text overlay, and that it looks good on mobile and desktop.

**Acceptance Scenarios**:

1. **Given** a user visits the about page, **When** the page loads, **Then** a full-width hero section with a background image and dark overlay is displayed
2. **Given** a user views the hero on mobile, **When** the screen is窄, **Then** the hero image scales properly and text remains readable
3. **Given** a user views the hero, **When** they scroll down, **Then** a subtle scroll indicator is visible at the bottom

---

### User Story 2 - Visual Origin Story with Food Imagery (Priority: P1)

As a customer reading the restaurant's story, I want to see food photos alongside the text so that the story feels authentic and appetizing rather than just a wall of text.

**Why this priority**: The origin story is the core content of the about page. Without imagery, it reads like a generic blog post. Food photos make the story tangible and engaging.

**Independent Test**: Can be fully tested by scrolling through the origin story section and confirming each story beat has an accompanying food/restaurant image.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the origin story, **When** reading each paragraph, **Then** a relevant food or restaurant image is displayed alongside the text
2. **Given** a user views the origin story on mobile, **When** the screen is narrow, **Then** images stack above/below text in a readable layout
3. **Given** a user reads the story, **When** they see a key quote, **Then** it is visually emphasized with a pull-quote style (larger italic text with accent border)

---

### User Story 3 - Cooking Philosophy Image Cards (Priority: P2)

As a customer learning about the cooking philosophy, I want to see food photos on the philosophy cards so that I can visualize what "charcoal-grilled perfection" and "hand-ground spices" actually look like.

**Why this priority**: The current philosophy cards use small icons that don't convey the richness of the cooking process. Food photography is more persuasive and appetizing.

**Independent Test**: Can be fully tested by scrolling to the cooking philosophy section and confirming each card has a food photo background with text overlay.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the cooking philosophy, **When** viewing the three cards, **Then** each card displays a food photograph as a background
2. **Given** a user views a philosophy card, **When** they hover over it (desktop), **Then** there is a subtle visual feedback effect
3. **Given** a user reads the card text, **When** viewing on any device, **Then** the text is clearly readable against the image background (sufficient contrast)

---

### User Story 4 - Animated Stats Bar (Priority: P2)

As a customer, I want to see key restaurant statistics (menu items, categories, weekly customers) displayed prominently so that I can quickly understand the restaurant's scale and credibility.

**Why this priority**: Stats provide social proof and credibility. Animated count-up numbers are more engaging than static text and draw attention to the restaurant's achievements.

**Independent Test**: Can be fully tested by scrolling to the stats section and confirming the numbers animate from 0 to their final values.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the stats section, **When** the section enters the viewport, **Then** the numbers animate from 0 to their final values
2. **Given** a user views the stats on mobile, **When** the screen is narrow, **Then** the stats display in a 2x2 grid
3. **Given** a user has reduced motion preferences enabled, **When** the stats section loads, **Then** numbers appear immediately without animation

---

### User Story 5 - Styled Contact Section with Map (Priority: P3)

As a customer wanting to visit the restaurant, I want to see the contact information and map in a clean, styled layout so that the page feels polished and professional end-to-end.

**Why this priority**: The current raw Google Maps iframe looks unstyled and breaks the design consistency. A styled container improves the overall page quality.

**Independent Test**: Can be fully tested by scrolling to the contact section and confirming the map is inside a styled card container with proper rounded corners and shadow.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the contact section, **When** viewing the map, **Then** it is displayed inside a styled card with rounded corners and shadow
2. **Given** a user views the contact info, **When** reading address/phone/hours, **Then** each item has a gradient icon circle (consistent with existing design patterns)
3. **Given** a user wants to reserve a table, **When** they click the WhatsApp button, **Then** it opens WhatsApp with a pre-filled message

---

### Edge Cases

- What happens when a hero image fails to load? The section should display a solid gradient fallback color
- What happens when the user has `prefers-reduced-motion` enabled? All count-up animations should be disabled and numbers shown immediately
- What happens on very narrow screens (320px)? The origin story images should stack vertically with appropriate spacing
- What happens when the Google Maps embed fails to load? A fallback link to Google Maps should be shown

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The hero section MUST display a background image with a dark overlay and text content
- **FR-002**: The hero section MUST use an existing hero image from the project assets
- **FR-003**: The origin story section MUST display at least 3 food/restaurant images alongside the story text
- **FR-004**: The origin story MUST include a visually styled pull quote for key phrases
- **FR-005**: The cooking philosophy section MUST display 3 cards with food photography backgrounds
- **FR-006**: Each philosophy card MUST have sufficient text contrast over the image (minimum 4.5:1 ratio)
- **FR-007**: The stats bar MUST display 4 statistics with animated count-up numbers
- **FR-008**: The stats animation MUST respect `prefers-reduced-motion` media query
- **FR-009**: The contact section MUST display the map inside a styled card container
- **FR-010**: The contact section MUST maintain all existing contact information (address, phone, hours)
- **FR-011**: All images MUST have meaningful alt text for accessibility
- **FR-012**: The page MUST be fully responsive across mobile, tablet, and desktop viewports
- **FR-013**: All existing scroll-triggered animations MUST continue to work
- **FR-014**: The WhatsApp reservation button MUST remain functional

### Key Entities

- **About Page Section**: A distinct content block on the about page (hero, origin, philosophy, stats, contact)
- **Food Image**: A photograph of a restaurant dish used as visual content
- **Pull Quote**: A visually emphasized text excerpt from the story

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: The about page contains at least 8 food/restaurant images (hero + 3 origin + 3 philosophy + 1 contact area)
- **SC-002**: All text on image backgrounds maintains a minimum 4.5:1 contrast ratio
- **SC-003**: The page loads and renders without layout shift (CLS < 0.1)
- **SC-004**: Stats numbers animate from 0 to final value within 2 seconds
- **SC-005**: The page passes all accessibility checks (alt text, contrast, keyboard navigation)
- **SC-006**: The page displays correctly at 375px, 768px, 1024px, and 1440px viewports
- **SC-007**: All existing functionality (WhatsApp button, navigation, animations) remains intact

## Assumptions

- Existing hero images (`hero1.webp`, `hero2.webp`, `hero3.webp`) are high enough quality for a hero background
- Existing food images in `public/images/food/` are suitable for use in origin story and philosophy cards
- The `useCountUp` hook from `AboutPreview.tsx` can be reused for the stats bar
- The existing animation utilities (`fadeInUp`, `staggerContainer`, `staggerItem`) are sufficient for new animations
- No new dependencies are required — all changes use existing Tailwind CSS, Framer Motion, and Lucide React
