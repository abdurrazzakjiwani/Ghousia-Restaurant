# Feature Specification: Hero Image Carousel

**Feature Branch**: `001-hero-carousel`  
**Created**: 2026-09-17  
**Status**: Draft  
**Input**: User description: "Add hero image carousel with 3 rotating images and fix floating button positioning"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Hero Image Carousel (Priority: P1)

A restaurant customer visits the Ghousia Golden Spoon homepage and sees a visually engaging hero section with rotating food images. The carousel automatically cycles through 3 hero images every few seconds, showcasing the restaurant's food and ambiance. The customer can also click dots below the carousel to jump to a specific image. The existing text overlay (tagline, description, CTA buttons) remains on top of the carousel with proper contrast.

**Why this priority**: The hero section is the first thing visitors see. Rotating images make the site feel alive and professional, immediately showing the restaurant's food quality. This is the core visual upgrade.

**Independent Test**: Open the homepage, observe the hero section, verify 3 images rotate automatically, click dots to navigate, verify text and buttons remain readable and functional.

**Acceptance Scenarios**:

1. **Given** a customer is on the homepage, **When** the page loads, **Then** the hero section displays the first image with text overlay
2. **Given** the hero section is visible, **When** 5 seconds pass, **Then** the carousel transitions to the next image with a smooth crossfade animation
3. **Given** the carousel is showing an image, **When** the customer clicks a dot indicator, **Then** the carousel jumps to the corresponding image
4. **Given** the carousel is on the last image, **When** auto-rotation triggers, **Then** it cycles back to the first image
5. **Given** the hero section is visible, **When** the customer scrolls down, **Then** the parallax effect works smoothly on the current carousel image

---

### User Story 2 - Floating Button Repositioning (Priority: P2)

A restaurant customer visits the website and sees two floating action buttons in the bottom-right corner: the green WhatsApp order button and the SPOONI voice agent button. Both buttons are clearly visible and accessible without overlapping each other. The SPOONI button is positioned above the WhatsApp button, creating a clean vertical stack.

**Why this priority**: The current layout has two buttons at overlapping positions, making both hard to use. Repositioning ensures both ordering channels (WhatsApp and voice) are accessible.

**Independent Test**: Open any page, verify two floating buttons visible at bottom-right, verify they don't overlap, verify WhatsApp button is at bottom and SPOONI is above it.

**Acceptance Scenarios**:

1. **Given** a customer is on any page, **When** they look at the bottom-right corner, **Then** two floating buttons are visible without overlapping
2. **Given** the two buttons are visible, **When** the customer examines the layout, **Then** the WhatsApp button is at the bottom and the SPOONI voice button is directly above it
3. **Given** both buttons are visible, **When** the customer clicks either button, **Then** the respective function works (WhatsApp opens chat, SPOONI opens voice agent)
4. **Given** the customer is on a mobile device, **When** they view the buttons, **Then** both buttons remain properly positioned and accessible

---

### Edge Cases

- What happens when a hero image fails to load? The carousel should skip to the next image or show a fallback gradient background
- What happens when the customer has `prefers-reduced-motion` enabled? The carousel should not auto-rotate and should show a static image
- What happens on very narrow screens (below 320px)? The buttons should remain accessible without horizontal overflow
- What happens when the ElevenLabs script hasn't loaded yet? The SPOONI button position should be reserved (no layout shift)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display 3 hero images in a rotating carousel on the homepage
- **FR-002**: System MUST automatically transition between images every 5 seconds with a smooth crossfade animation
- **FR-003**: System MUST display dot indicators below the carousel allowing manual navigation to any image
- **FR-004**: System MUST preserve the existing text overlay (tagline, description, CTA buttons) on top of the carousel with proper contrast
- **FR-005**: System MUST apply the existing parallax scroll effect to the current carousel image
- **FR-006**: System MUST stop auto-rotation when `prefers-reduced-motion` is enabled
- **FR-007**: System MUST handle image load failures gracefully by skipping to the next image or showing a gradient fallback
- **FR-008**: System MUST position the SPOONI voice agent floating button above the WhatsApp button (approximately 6rem higher)
- **FR-009**: System MUST ensure both floating buttons remain accessible and non-overlapping on all screen sizes
- **FR-010**: System MUST preserve all existing website functionality without regression

### Key Entities

- **Hero Carousel**: A rotating display of 3 images on the homepage. Key attributes: images, rotation interval, transition animation, current index, manual navigation controls.
- **Floating Buttons**: Two action buttons in the bottom-right corner. WhatsApp button (green, lower) and SPOONI button (voice agent, upper). Must maintain vertical separation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Customers see 3 different hero images rotating on the homepage within 2 seconds of page load
- **SC-002**: Carousel transitions are smooth (no jank or flicker) on Chrome, Firefox, Safari, and Edge
- **SC-003**: Both floating buttons are visible and clickable without overlapping on screens 320px and wider
- **SC-004**: Existing website features (menu, reservations, ordering, reviews, dark mode) continue to work without regression
- **SC-005**: Hero section maintains proper text contrast ratio (minimum 4.5:1) over all carousel images

## Assumptions

- The 3 hero images (Hero 1.png, Hero 2.png, Hero 3.png) exist at the project root and will be moved to the public directory
- Images are approximately 1920x1080 or similar widescreen aspect ratio
- The existing gradient background will be used as a fallback if images fail to load
- The current WhatsApp button position (bottom-6 right-6) remains unchanged
- The SPOONI widget FAB can be repositioned via CSS custom properties or deep selectors
- Auto-rotation interval of 5 seconds is appropriate for a restaurant website
- Dot indicators are sufficient for manual navigation (no arrow buttons needed)
