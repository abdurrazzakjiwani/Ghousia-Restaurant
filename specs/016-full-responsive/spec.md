# Feature Specification: Full Responsive Overhaul

**Feature Branch**: `016-full-responsive`  
**Created**: 2026-09-21  
**Status**: Draft  
**Input**: User description: "Make the entire website fully responsive across all devices worldwide, fixing visibility issues with text, colors, buttons, and other elements. Content, text, buttons, and interactive elements must be visible and usable on all screen sizes from 320px phones to large desktop monitors."

## Clarifications

### Session 2026-09-21

- Q: Should dark mode be fully supported? → A: Yes, all components must have proper dark mode variants so text and elements are visible in both light and dark themes.
- Q: What is the minimum device width to support? → A: 320px (iPhone SE and similar small phones).
- Q: Should Framer Motion entrance animations be preserved? → A: Yes, but with a CSS fallback so content is visible even before JavaScript loads.
- Q: Which browsers must the responsive fixes support? → A: Last 2 versions of Chrome, Safari, Firefox, Samsung Internet, and Edge.
- Q: Should the responsive overhaul include keyboard navigation and focus management fixes? → A: Yes, include contrast + touch targets + keyboard navigation. No screen reader changes required.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Content Visible on All Mobile Devices (Priority: P1)

A customer opens the website on any mobile phone (iPhone SE 320px, iPhone 14 390px, Samsung Galaxy S23 360px, etc.) and can see all text, headings, paragraphs, buttons, and images without horizontal scrolling, clipping, or elements being invisible.

**Why this priority**: This is the core problem reported by the user. Content that is invisible or clipped means the website is completely unusable on those devices.

**Independent Test**: Open the website on a 320px-wide viewport. Scroll through every page (home, menu, about, contact, tracking, reservation, branches, location). Verify all text is readable, all buttons are tappable, and no horizontal scrollbar appears.

**Acceptance Scenarios**:

1. **Given** customer opens homepage on a 320px-wide device, **When** the page loads, **Then** all text headings, body text, and button labels are visible and readable
2. **Given** customer opens homepage on a 320px-wide device, **When** they scroll through all sections, **Then** no content overflows horizontally and no horizontal scrollbar appears
3. **Given** customer opens the menu page on a 320px-wide device, **When** they view menu cards, **Then** all item names, prices, descriptions, and Add buttons are visible and tappable
4. **Given** customer opens any page on a 320px-wide device, **When** they look at the navigation, **Then** the hamburger menu icon is visible and tappable
5. **Given** customer opens any page on a 320px-wide device, **When** they look at the bottom of the screen, **Then** the WhatsApp and chatbot floating buttons are visible and do not overlap each other

---

### User Story 2 - Dark Mode Content Visibility (Priority: P1)

A customer enables dark mode on their device or browser and visits the website. All text remains readable against dark backgrounds, all buttons have visible borders or backgrounds, and no element becomes invisible due to color conflicts.

**Why this priority**: Dark mode is a standard user preference. If elements disappear in dark mode, the website is broken for a significant portion of users.

**Independent Test**: Enable dark mode in the browser. Visit every page. Verify that navigation text, body text, button text, form labels, footer text, and all interactive elements are visible against their backgrounds.

**Acceptance Scenarios**:

1. **Given** customer has dark mode enabled, **When** they view the navigation bar, **Then** all nav links, brand name, and icons are visible against the dark background
2. **Given** customer has dark mode enabled, **When** they open the mobile menu drawer, **Then** the drawer background is dark, all menu links are visible, and the close button is visible
3. **Given** customer has dark mode enabled, **When** they view the footer, **Then** all footer text, links, and contact information are visible
4. **Given** customer has dark mode enabled, **When** they view any form (contact, reservation, review), **Then** all form labels, input borders, and placeholder text are visible
5. **Given** customer has dark mode enabled, **When** they view menu cards, **Then** card backgrounds, text, prices, and buttons are all visible

---

### User Story 3 - Touch Targets Meet Accessibility Standards (Priority: P2)

A customer on a touch device (phone or tablet) can accurately tap all interactive elements including buttons, links, form inputs, close icons, star ratings, and navigation controls without accidentally tapping the wrong element.

**Why this priority**: Small touch targets frustrate mobile users and cause accidental taps. WCAG recommends minimum 44x44px touch targets.

**Independent Test**: On a touch device, tap every interactive element: nav links, hamburger menu, close buttons, form submit buttons, star ratings, quantity selectors, modal close buttons, chat send button, floating action buttons. Verify each can be tapped accurately.

**Acceptance Scenarios**:

1. **Given** customer views a modal dialog, **When** they tap the close button (X), **Then** the touch target is at least 44x44px and the modal closes
2. **Given** customer views the review form, **When** they tap a star rating, **Then** each star has a touch target of at least 44x44px
3. **Given** customer views a menu card on mobile, **When** they tap the quantity increment/decrement buttons, **Then** each button is at least 44x44px
4. **Given** customer has items in cart, **When** they look at the cart badge, **Then** the count is readable (at least 11px font) and the badge area is tappable
5. **Given** customer opens the chat widget, **When** they tap the send button, **Then** the button is at least 44x44px and easy to tap

**Keyboard Navigation Scenarios**:

6. **Given** customer uses keyboard only, **When** they press Tab to navigate the page, **Then** all interactive elements receive visible focus indicators in logical order
7. **Given** customer has the mobile drawer open, **When** they press Escape, **Then** the drawer closes and focus returns to the hamburger button
8. **Given** customer has a modal open, **When** they press Tab, **Then** focus cycles within the modal and does not escape to the page behind

---

### User Story 4 - Text Contrast Meets Readability Standards (Priority: P2)

A customer views any text on the website and can read it comfortably. Price text, body text, headings, and button labels all have sufficient contrast against their backgrounds. Text is not rendered as low-contrast gradient effects that wash out on mobile screens.

**Why this priority**: Readable text is fundamental to usability. Gradient text effects that look good on desktop may be unreadable on mobile in bright outdoor conditions.

**Independent Test**: View all text elements on the website. Verify that body text has at least 4.5:1 contrast ratio, large text has at least 3:1, and no text uses gradient effects that reduce readability below these thresholds.

**Acceptance Scenarios**:

1. **Given** customer views any page, **When** they read body text (paragraphs, descriptions), **Then** text has solid color with contrast ratio of at least 4.5:1 against background
2. **Given** customer views menu cards, **When** they look at prices, **Then** prices are displayed in solid color (not gradient) with at least 4.5:1 contrast
3. **Given** customer views the order summary or checkout, **When** they look at totals, **Then** total amounts are in solid color with at least 4.5:1 contrast
4. **Given** customer views any page in bright outdoor lighting, **When** they read text, **Then** all text remains readable without squinting

---

### User Story 5 - Animations Degrade Gracefully (Priority: P3)

A customer on a slow connection or with JavaScript disabled can still see all page content. Framer Motion entrance animations enhance the experience when JavaScript loads, but content is never invisible waiting for JavaScript.

**Why this priority**: Progressive enhancement ensures the website works for everyone, including users on slow networks, with assistive technologies, or with JavaScript disabled.

**Independent Test**: Disable JavaScript in the browser. Load every page. Verify all content is visible. Re-enable JavaScript and verify animations still work as before.

**Acceptance Scenarios**:

1. **Given** customer has JavaScript disabled, **When** they load any page, **Then** all text, images, and buttons are visible without any animation
2. **Given** customer has JavaScript enabled, **When** they load any page, **Then** entrance animations play smoothly (fade in, slide up)
3. **Given** customer is on a slow 3G connection, **When** they load the homepage, **Then** content appears immediately even before JavaScript finishes loading

---

### Edge Cases

- What happens if a user rotates their phone from portrait to landscape mid-page? → Layout should reflow responsively without content loss or horizontal overflow
- What happens on tablets in split-screen mode (e.g., iPad 50/50 split at ~393px)? → Should render as mobile layout since viewport width is below 640px
- What happens if the user has a very large font size set in their OS accessibility settings? → Text should scale and layout should reflow without clipping
- What happens if the user has a very small screen (e.g., Apple Watch browser)? → Basic content should still be readable, even if layout is simplified
- What happens if the chat widget is open on a 320px screen? → Widget should take full width minus margins and not block all content

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render all page content visible without requiring JavaScript (CSS fallback for animations)
- **FR-002**: System MUST support viewports from 320px to 2560px wide without horizontal overflow
- **FR-003**: System MUST display all text with contrast ratio of at least 4.5:1 for normal text and 3:1 for large text against backgrounds in both light and dark modes
- **FR-004**: System MUST provide dark mode variants for all navigation components (Navbar, MainNav, MobileDrawer, InfoBar)
- **FR-005**: System MUST provide dark mode variants for all interactive elements (buttons, form inputs, modals, cards)
- **FR-006**: System MUST ensure all interactive elements have minimum touch target size of 44x44px on touch devices
- **FR-007**: System MUST replace gradient text effects on prices and totals with solid colors for readability
- **FR-008**: System MUST NOT hide horizontal overflow on the root element to mask layout bugs; any content that would overflow must be made to fit within the viewport
- **FR-009**: System MUST display floating action buttons (WhatsApp, chatbot, back-to-top) without overlapping on any screen size
- **FR-010**: System MUST use responsive font sizes that scale appropriately from mobile to desktop
- **FR-011**: System MUST display the mobile navigation drawer with proper dark mode colors and tappable close button
- **FR-012**: System MUST display the hero section with call-to-action buttons visible above the fold on mobile devices
- **FR-013**: System MUST display testimonial navigation controls (prev/next buttons) that are accessible on touch devices
- **FR-014**: System MUST display map embeds with responsive height that adapts to viewport size
- **FR-015**: System MUST display footer contact information without overflow on narrow screens
- **FR-016**: System MUST ensure the chat widget does not obscure critical page content on small screens
- **FR-017**: System MUST determine responsive behavior based on viewport width, not on device detection or fixed assumptions
- **FR-018**: System MUST respect user preferences for reduced motion and disable non-essential animations when requested
- **FR-019**: System MUST display the contact page WhatsApp button with minimum 44px touch target height
- **FR-020**: System MUST display the mobile menu drawer close button with minimum 44px touch target
- **FR-021**: System MUST ensure all interactive elements are reachable via keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- **FR-022**: System MUST maintain logical focus order when the mobile navigation drawer opens and closes
- **FR-023**: System MUST trap focus within modal dialogs and the mobile navigation drawer when open

### Key Entities

- **Page Layout**: The overall page structure including navigation, content, and footer that must adapt to all viewport sizes
- **Floating Action Button**: Fixed-position interactive buttons (WhatsApp, chatbot, back-to-top) that must not overlap
- **Navigation Component**: The multi-tier navigation system (info bar, main nav, mobile drawer) that must be visible and usable in all modes
- **Form Input**: Text fields, textareas, and buttons in forms that must be tappable and readable
- **Menu Card**: Food item display cards that must show all information on narrow screens
- **Modal Dialog**: Overlay dialogs that must be closable with adequate touch targets

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of text elements pass WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) in both light and dark modes
- **SC-002**: 100% of interactive elements meet minimum 44x44px touch target size on mobile viewports
- **SC-003**: Zero horizontal overflow issues on viewports from 320px to 2560px across all pages
- **SC-004**: All pages load with content visible within 1 second even before JavaScript hydrates
- **SC-005**: All navigation components (navbar, mobile drawer, footer links) are fully functional in both light and dark modes
- **SC-006**: Floating action buttons (WhatsApp, chatbot, back-to-top) are all visible and accessible without overlapping on any viewport from 320px up
- **SC-007**: All form inputs, buttons, and interactive elements are tappable and usable on touch devices
- **SC-008**: Website renders correctly on iPhone SE (320px), iPhone 14 (390px), Samsung Galaxy S23 (360px), iPad (768px), and desktop (1920px)
- **SC-009**: All interactive elements are reachable via keyboard with visible focus indicators
- **SC-010**: Focus is properly trapped within modals and mobile drawer when open

## Assumptions

- The website uses a utility-first CSS framework with standard responsive breakpoints at 640px, 768px, 1024px, and 1280px
- Entrance animations are implemented with a JavaScript animation library and must be preserved with a CSS fallback for progressive enhancement
- Dark mode is implemented via a class-based strategy on the root element
- The existing color palette (orange primary, dark gray backgrounds) should be maintained
- All existing functionality (ordering, chat, tracking, reservations) must continue working after responsive fixes
- The website is built with a modern JavaScript framework supporting server-side rendering
- No new pages or features are being added; this is purely a responsive/visibility fix
- The WhatsApp number and restaurant details remain unchanged
- Browser support: Last 2 versions of Chrome, Safari, Firefox, Samsung Internet, and Edge
