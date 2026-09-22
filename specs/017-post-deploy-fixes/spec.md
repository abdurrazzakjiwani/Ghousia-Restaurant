# Feature Specification: Post-Deployment UI Fixes

**Feature Branch**: `017-post-deploy-fixes`  
**Created**: 2026-09-22  
**Status**: Draft  
**Input**: User description: "Fix post-deployment UI issues: hamburger menu text visibility in dark mode, replace remaining gradient text with solid orange colors, replace About page hero image, and adjust hero overlays to 50% opacity."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Hamburger Menu Text Visibility (Priority: P1)

As a mobile user in dark mode, I want to see all navigation links clearly in the hamburger menu so I can navigate the website without confusion.

**Why this priority**: The hamburger menu is the primary navigation method on mobile devices. When text is invisible, users cannot access any pages, making the site effectively unusable on mobile in dark mode.

**Independent Test**: Open the website on a mobile device (or narrow viewport) with dark mode enabled, tap the hamburger menu, and verify all navigation links and the phone number are clearly visible against the dark background.

**Acceptance Scenarios**:

1. **Given** a user is on mobile with dark mode enabled, **When** they tap the hamburger menu icon, **Then** all navigation links (Home, Menu, Order, Branches, About, Contact) should be clearly visible in light text against the dark drawer background.
2. **Given** a user is on mobile with dark mode enabled, **When** they open the hamburger menu, **Then** the phone number should be clearly visible and distinguishable from other links.
3. **Given** a user is on mobile with dark mode enabled, **When** they open the hamburger menu, **Then** the close button (X icon) should be clearly visible.
4. **Given** a user is on mobile with dark mode disabled (light mode), **When** they open the hamburger menu, **Then** all elements should remain clearly visible (no regression).

---

### User Story 2 - Consistent Orange Branding (Priority: P2)

As a website visitor, I want to see consistent orange branding colors across all pages so the site feels cohesive and professional.

**Why this priority**: Inconsistent colors (gradient vs solid orange) create a fragmented visual experience that undermines brand identity. While not blocking functionality, it affects perceived quality.

**Independent Test**: Visit the home page, About page, Location page, Branches page, and a Menu item detail page, and verify all accent/highlight text uses the same solid orange color.

**Acceptance Scenarios**:

1. **Given** a user visits the home page, **When** they view the hero section heading, popular categories, FAQ section, and about preview, **Then** all accent text should display in solid orange (#ea580c).
2. **Given** a user visits the Location page, **When** they view branch information headings, **Then** all accent text should display in solid orange.
3. **Given** a user visits the Branches page, **When** they view branch cards and headings, **Then** all accent text should display in solid orange.
4. **Given** a user visits a Menu item detail page, **When** they view the item name heading, **Then** the heading should display in solid orange.
5. **Given** a user hovers over any orange text link, **When** they hover, **Then** the text should darken slightly (to #c2410c) to indicate interactivity.

---

### User Story 3 - About Page Hero Image (Priority: P2)

As a visitor to the About page, I want to see a relevant hero image that represents the restaurant's story so I feel connected to the brand.

**Why this priority**: The current About page uses a generic hero image that doesn't match the page's purpose. A dedicated "Our Story" image creates better brand storytelling.

**Independent Test**: Navigate to the About page and verify the hero section displays the dedicated "Our Story BG.jpg" image instead of the generic restaurant hero image.

**Acceptance Scenarios**:

1. **Given** a user navigates to the About page, **When** the page loads, **Then** the hero section should display the "Our Story" background image.
2. **Given** a user navigates to the About page, **When** the hero image loads, **Then** the image should be properly sized and not stretched or distorted. **Additionally**, when screen reader technology is active, the image should have alternative text `alt="Ghousia Restaurant story and ambiance"`.
3. **Given** a user navigates to the Home page, **When** the hero section loads, **Then** it should still display the original hero image (no change to home page).

---

### User Story 4 - Hero Overlay Contrast (Priority: P3)

As a visitor, I want text overlaid on hero images to be clearly readable so I can understand the page's main message without straining.

**Why this priority**: While the current 40% overlay is functional, increasing to 50% improves text readability across all devices, especially on bright screens or high-resolution displays.

**Independent Test**: Visit the home page and verify the hero text is clearly readable against the background image with the increased overlay darkness.

**Acceptance Scenarios**:

1. **Given** a user visits the home page, **When** the hero section loads, **Then** the text overlay should provide sufficient contrast for comfortable reading.
2. **Given** a user visits the About page, **When** the hero section loads, **Then** the overlay should remain at 50% (no change needed).
3. **Given** a user views the hero on any device size, **When** they read the overlay text, **Then** the text should be clearly legible without eye strain.

---

### Edge Cases

- What happens if the "Our Story BG.jpg" image fails to load? The system should fall back to a solid dark background color to maintain the dark overlay aesthetic.
- What happens if a user has `prefers-color-scheme: dark` set at the OS level but hasn't explicitly chosen dark mode? The hamburger menu should still display correctly.
- What happens on very narrow screens (320px)? The hamburger menu text should remain readable and not overflow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display all hamburger menu navigation links with sufficient color contrast in dark mode (minimum 4.5:1 ratio against background).
- **FR-002**: System MUST display the phone number in the hamburger menu with sufficient color contrast in dark mode.
- **FR-003**: System MUST display the close button in the hamburger menu with sufficient color contrast in dark mode.
- **FR-004**: System MUST display mobile header icons (phone, hamburger, close) with sufficient color contrast in dark mode.
- **FR-005**: System MUST use solid orange (#ea580c) for all accent/highlight text across home page sections, Location page, Branches page, and Menu detail pages.
- **FR-006**: System MUST display the "Our Story" background image on the About page hero section.
- **FR-007**: System MUST apply a 50% dark overlay on the home page hero section.
- **FR-008**: System MUST apply a 50% dark overlay on the About page hero section (already correct, no change).
- **FR-009**: System MUST NOT change the home page hero image.
- **FR-010**: System MUST maintain all existing functionality when applying these visual fixes (no breaking changes to navigation, ordering, or other features).

### Key Entities

- **Navigation Menu**: The hamburger/drawer menu component that provides mobile navigation.
- **Hero Section**: The large banner image with text overlay at the top of pages.
- **Accent Text**: Text elements styled with the brand's orange color for headings and highlights.
- **Dark Mode**: A color scheme preference that uses dark backgrounds with light text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of hamburger menu items are visible and readable in dark mode on mobile devices.
- **SC-002**: All accent/highlight text across the website uses a single, consistent orange color.
- **SC-003**: The About page displays a dedicated "Our Story" hero image.
- **SC-004**: Hero text readability is improved with 50% overlay contrast on the home page. **Minimum contrast ratio of 4.5:1 between text and overlay background, with maximum line length of 60 characters**.
- **SC-005**: No visual regressions in light mode across all pages.
- **SC-006**: All changes pass build verification without errors.

## Assumptions

- The "Our Story BG.jpg" image exists at the project root and is suitable for use as a hero background.
- The current gradient color tokens (`text-gradient-start`, `text-gradient-end`) are only used for text styling and can be replaced with solid orange without affecting other elements.
- The 10% increase in overlay darkness (40% → 50%) is visually acceptable and improves readability without obscuring the background image too much.
- All existing responsive breakpoints and mobile layouts remain unchanged.
- Dark mode is managed by the existing `useTheme` hook and toggles the `dark` class on the HTML element.
- System respects `prefers-contrast` media query and adjusts accent colors automatically for accessibility.
