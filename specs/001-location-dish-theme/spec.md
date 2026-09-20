# Feature Specification: Location, Signature Dish, CTA, and Light-Only Presentation

**Feature Branch**: `001-location-dish-theme`  
**Created**: 2026-09-20  
**Status**: Ready for planning  
**Input**: User description: "Add a mandatory Select your location card before browsing, spin only the plate behind the Signature Dish food item, restyle Ready to Order with a white background, black text, unchanged button colors, and a dot-pattern background, and remove dark theme support from the website."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Provide a delivery address before browsing (Priority: P1)

A first-time customer opens the website and immediately sees a clearly labeled "Select your location" card. The customer cannot interact with the underlying website until they enter and save a delivery address. Once saved, the address is retained for the same browser and is prefilled when the customer later reaches the delivery checkout form.

**Why this priority**: Delivery eligibility and address collection are essential to the ordering journey, so removing this friction early has the highest customer and business value.

**Independent Test**: Open the website in a browser with no saved address, verify that the location card appears before underlying controls can be used, enter a valid address, and confirm that browsing becomes available and the address appears in checkout.

**Acceptance Scenarios**:

1. **Given** a customer has no saved delivery address, **When** the customer opens any public website page, **Then** the "Select your location" card is visible before the underlying website becomes usable.
2. **Given** the location card is visible, **When** the customer submits an empty or whitespace-only address, **Then** the card remains open and shows a specific address-required error.
3. **Given** the customer enters a non-empty delivery address, **When** the customer saves it, **Then** the card closes, the underlying website becomes usable, and the address is retained for the same browser.
4. **Given** a saved address exists in the same browser, **When** the customer opens the website again, **Then** the location card does not reappear and the saved address is available in the delivery checkout form.

---

### User Story 2 - Keep the Signature Dish food stable while its plate spins (Priority: P2)

A customer viewing the homepage Signature Dish section sees the food presentation remain stable and readable while the decorative plate or rim behind the food rotates. The food image itself does not rotate, crop unexpectedly, or become difficult to inspect.

**Why this priority**: The requested motion improves visual interest without compromising the product image, which is central to the customer's purchase decision.

**Independent Test**: View the Signature Dish section on desktop and mobile, observe the food and plate independently, and confirm that only the plate rotates while the food remains stationary.

**Acceptance Scenarios**:

1. **Given** the Signature Dish section is visible, **When** the decorative plate animation runs, **Then** the food image remains stationary and fully readable.
2. **Given** the plate animation is enabled, **When** observed for 30 seconds, **Then** the plate completes at least three full rotations without changing the section layout.
3. **Given** the customer has enabled reduced-motion preferences, **When** the Signature Dish section is visible, **Then** continuous plate rotation is disabled or reduced to a static presentation.

---

### User Story 3 - Review a clear light Ready to Order call to action (Priority: P3)

A customer reaches the homepage Ready to Order section and sees a clean white background with black text, a subtle dot pattern, and the existing button colors. The section remains visually distinct without reducing the clarity of either call to action.

**Why this priority**: The call to action directly supports conversion, and the requested light treatment must preserve the established button recognition while improving section contrast.

**Independent Test**: Open the homepage, scroll to Ready to Order, and verify the section colors, text, pattern, button appearance, labels, and responsive layout on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** the customer views the Ready to Order section, **When** the section is rendered, **Then** its background is white and its primary text is black.
2. **Given** the section uses the requested dot pattern, **When** viewed at normal and enlarged sizes, **Then** the pattern is visible but does not reduce text or button readability.
3. **Given** the section contains the existing WhatsApp and reservation buttons, **When** the new section styling is applied, **Then** the buttons retain their existing colors, labels, and interactive states.

---

### User Story 4 - Use a consistent light-only website presentation (Priority: P4)

A customer uses the website on a device configured for dark appearance and sees the same readable light presentation as every other customer. No dark-theme toggle is available in the desktop navigation or mobile menu.

**Why this priority**: A consistent light-only presentation removes the requested theme control and prevents customers from encountering an unsupported or incomplete dark presentation.

**Independent Test**: Set the device or browser to a dark appearance, open the website, inspect desktop and mobile navigation, and verify that the site remains light-only and fully readable.

**Acceptance Scenarios**:

1. **Given** the device or browser is configured for a dark appearance, **When** the customer opens the website, **Then** the website remains in a light presentation.
2. **Given** the customer opens the desktop navigation, **When** inspecting available controls, **Then** no dark-theme toggle is present.
3. **Given** the customer opens the mobile navigation, **When** inspecting available controls, **Then** no dark-theme toggle or dark-mode label is present.
4. **Given** the website is in its light-only presentation, **When** the customer views navigation, forms, cards, and calls to action, **Then** text and interactive elements remain readable without relying on dark-theme styles.

---

### Edge Cases

- The customer submits an address containing only spaces or line breaks; the card remains open and displays an address-required error.
- The customer enters a very long address; the card remains usable, the text wraps, and the save action still works without horizontal scrolling.
- The customer closes the browser or refreshes after saving an address; the address remains available in the same browser and prefills checkout.
- The customer has no browser storage available; the card remains usable for the current visit and does not prevent the customer from entering an address.
- The customer uses a keyboard or assistive technology; the location card receives focus, its field has a visible label, errors are announced, and the save action is keyboard operable.
- The customer enables reduced-motion preferences; the plate does not continuously rotate and all other content remains usable.
- The website is viewed on narrow mobile screens; the location card, Signature Dish presentation, Ready to Order section, and navigation remain within the viewport without horizontal scrolling.
- The customer has a saved address but later wants to change it; the checkout form allows the address to be edited before order submission.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a clearly labeled "Select your location" card during the initial website visit when no delivery address is saved.
- **FR-002**: The system MUST prevent interaction with underlying website content while the mandatory location card is open.
- **FR-003**: The location card MUST provide one visibly labeled delivery-address input and one clearly labeled save action.
- **FR-004**: The system MUST reject an empty or whitespace-only address and display a specific, understandable error without closing the card.
- **FR-005**: The system MUST retain a successfully saved delivery address for the same browser and reuse it to prefill the delivery checkout form on a later visit.
- **FR-006**: The system MUST allow the customer to edit the prefilled delivery address during checkout before submitting an order.
- **FR-007**: The Signature Dish food image MUST remain stationary while the decorative plate or rim behind it rotates.
- **FR-008**: The plate animation MUST not change the Signature Dish section's layout, image dimensions, or text positions while running.
- **FR-009**: The system MUST disable continuous plate rotation when the customer requests reduced motion.
- **FR-010**: The Ready to Order section MUST use a white background and black primary text.
- **FR-011**: The Ready to Order section MUST include a subtle, regularly spaced dot pattern that does not impair readability.
- **FR-012**: The Ready to Order buttons MUST retain their existing colors, labels, and interactive feedback.
- **FR-013**: The website MUST present a light-only appearance regardless of the customer's device or browser appearance preference.
- **FR-014**: The desktop navigation and mobile navigation MUST not contain a dark-theme toggle or dark-mode label.
- **FR-015**: All navigation, forms, cards, and calls to action MUST remain readable in the light-only presentation.
- **FR-016**: The location card MUST be keyboard operable, focus the address input when opened, and expose validation errors to assistive technology.

### Key Entities

- **Saved delivery address**: A customer-supplied text address retained for the same browser and used to prefill the delivery checkout form.
- **Location prompt state**: The current state indicating whether the customer has provided a delivery address for the current browser.
- **Signature Dish presentation**: The homepage food presentation composed of a stationary food image and a decorative rotating plate or rim.
- **Ready to Order presentation**: The homepage call-to-action section with a white background, black text, dot pattern, and existing button styling.

### Assumptions

- The initial location request collects a free-text delivery address; automatic geolocation and map-pin selection are not part of this feature.
- The address is saved only for the same browser and is not treated as a customer account or shared across devices.
- Saving an address does not automatically create an order, select a branch, or confirm delivery eligibility beyond the website's existing checkout behavior.
- The decorative plate can be represented as a visual layer behind the existing food presentation; no new food photography is required.
- "Button colors remain unchanged" means the existing WhatsApp and reservation button colors and hover/active feedback remain visually the same.
- "Remove dark theme support" means the entire website is light-only, not merely that the visible toggle is hidden.

### Scope Boundaries

- This feature does not add a new delivery-area database, address autocomplete service, customer account, or order record.
- This feature does not change menu data, prices, checkout validation rules, order submission, reservation behavior, or WhatsApp message content.
- This feature does not introduce a new page; the location card is an initial website interaction layer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of first-visit tests with no saved address, the location card appears before any underlying website control can be used.
- **SC-002**: In at least 95% of valid-address tests, a customer can save an address and reach usable website content within 1 second of submitting the form.
- **SC-003**: In at least 95% of repeat-visit tests in the same browser, the saved address prefills the delivery checkout form without requiring re-entry.
- **SC-004**: In 100% of Signature Dish tests, the food image remains stationary while the plate completes at least three full rotations during a 30-second observation period.
- **SC-005**: In 100% of reduced-motion tests, continuous plate rotation is absent while the Signature Dish content remains fully visible.
- **SC-006**: In 100% of desktop and mobile visual checks, the Ready to Order section has a white background, black primary text, a visible dot pattern, and unchanged button colors.
- **SC-007**: In 100% of desktop and mobile navigation checks, no dark-theme toggle or dark-mode label is present.
- **SC-008**: In 100% of dark-device-appearance tests, the website remains light-only and all primary text meets readable contrast against its background.
- **SC-009**: In usability testing, at least 90% of participants complete the initial address-entry task without assistance or navigation errors.
- **SC-010**: No requested change causes horizontal scrolling, clipped controls, or unreadable content at the supported mobile viewport widths.
