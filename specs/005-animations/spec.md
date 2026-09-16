# Feature Specification: Website Animations & Chatbot Scroll

**Feature Branch**: `005-animations`
**Created**: 2026-09-15
**Status**: Draft
**Input**: User description: "Add subtle professional animations to the website and custom styled scrollbar + message animations to the chatbot"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scroll Reveal Animations (Priority: P1)

As a visitor browsing the Ghousia Golden Spoon website, I want sections and content to gently fade in as I scroll down the page, so the website feels polished and modern without being distracting.

**Why this priority**: This is the most impactful visual improvement — it affects every page and makes the entire site feel professional. First impressions matter for a restaurant website.

**Independent Test**: Can be fully tested by scrolling through the home page and verifying that the Hero, About Preview, Featured Menu, and Footer sections all fade in smoothly as they enter the viewport.

**Acceptance Scenarios**:

1. **Given** a visitor loads the home page, **When** the Hero section is visible, **Then** it fades in and slides up gently within 500ms of page load
2. **Given** a visitor scrolls down the home page, **When** the About Preview section enters the viewport, **Then** it fades in from opacity 0 to 1 with a subtle upward movement
3. **Given** a visitor scrolls to the Featured Menu section, **When** the menu cards enter the viewport, **Then** they appear with a staggered delay (each card 100ms after the previous)
4. **Given** a visitor scrolls to the footer, **When** the footer enters the viewport, **Then** it fades in smoothly
5. **Given** a visitor navigates to the Menu page, **When** the page loads, **Then** the category filter and menu cards animate in with a staggered reveal
6. **Given** a visitor navigates to the About page, **When** each section (hero, story, philosophy, values, contact) enters the viewport, **Then** each section fades in independently

---

### User Story 2 - Hover Micro-Interactions (Priority: P2)

As a visitor interacting with menu cards and buttons, I want subtle hover effects that provide visual feedback, so I feel confident about what I'm clicking and the site feels responsive.

**Why this priority**: Hover effects are expected in modern web design and provide important UX feedback. They complement the scroll animations.

**Independent Test**: Can be tested by hovering over menu cards, buttons, and links to verify smooth scale/shadow transitions.

**Acceptance Scenarios**:

1. **Given** a visitor hovers over a menu card, **When** the cursor enters the card area, **Then** the card scales up slightly (1.02x) and the shadow deepens
2. **Given** a visitor hovers over a menu card, **When** the cursor leaves the card area, **Then** the card returns to its original size and shadow smoothly
3. **Given** a visitor hovers over any primary button, **When** the cursor enters the button, **Then** the button shows a subtle scale or brightness change
4. **Given** a visitor hovers over navigation links, **When** the cursor enters the link, **Then** the link color transitions smoothly

---

### User Story 3 - Chatbot Open/Close Animation (Priority: P2)

As a visitor opening the chatbot, I want the widget to slide up and fade in smoothly instead of appearing instantly, so the interaction feels polished and intentional.

**Why this priority**: The chatbot is a key feature — a smooth open/close animation makes it feel like a premium assistant rather than a popup.

**Independent Test**: Can be tested by clicking the chat bubble and verifying the widget slides up from the bottom with a fade-in effect, and slides down when closed.

**Acceptance Scenarios**:

1. **Given** the chat widget is closed, **When** the visitor clicks the chat bubble, **Then** the widget slides up from below and fades in within 300ms
2. **Given** the chat widget is open, **When** the visitor clicks the close button, **Then** the widget slides down and fades out within 200ms
3. **Given** the chat widget is opening, **When** the animation is in progress, **Then** the chat bubble icon transitions from MessageCircle to X smoothly

---

### User Story 4 - Chat Message Entrance Animation (Priority: P2)

As a visitor using the chatbot, I want each new message to slide in from the bottom with a fade effect, so the conversation feels dynamic and alive.

**Why this priority**: Message animations make the chat feel responsive and help users follow the conversation flow.

**Independent Test**: Can be tested by sending messages in the chat and verifying each message animates in individually.

**Acceptance Scenarios**:

1. **Given** a visitor sends a message, **When** the user message appears, **Then** it fades in and slides up from below within 200ms
2. **Given** the AI responds, **When** the assistant message appears, **Then** it fades in and slides up from below within 200ms
3. **Given** the AI is generating a response, **When** the typing indicator appears, **Then** it fades in smoothly
4. **Given** multiple messages are sent rapidly, **When** messages appear in sequence, **Then** each message animates independently without overlapping

---

### User Story 5 - Custom Chatbot Scrollbar (Priority: P3)

As a visitor scrolling through chat messages, I want a thin, styled scrollbar that matches the website's theme colors, so the chat feels cohesive with the rest of the design.

**Why this priority**: A themed scrollbar is a polish detail that enhances the overall visual consistency.

**Independent Test**: Can be tested by sending enough messages to overflow the chat container and verifying the scrollbar is thin, styled with theme colors, and functional.

**Acceptance Scenarios**:

1. **Given** the chat has enough messages to overflow, **When** the visitor scrolls, **Then** a thin (6px) scrollbar appears with a gradient-colored thumb matching the theme
2. **Given** the chat scrollbar is visible, **When** the visitor hovers over the scrollbar thumb, **Then** the thumb becomes slightly darker/more opaque
3. **Given** the chat scrollbar is visible on a dark background, **When** dark mode is active, **Then** the scrollbar colors adjust to match the dark theme

---

### Edge Cases

- What happens when a visitor has `prefers-reduced-motion` enabled? Animations should be disabled or minimized for accessibility
- What happens when the page loads slowly? Animations should not block content from being readable
- What happens when the chat has only 1-2 messages? The scrollbar should not appear (no overflow)
- What happens on mobile devices? Scroll animations should still work, hover effects should be replaced with tap feedback
- What happens when the visitor rapidly navigates between pages? Page entrance animations should not stack or cause flickering

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST animate page sections into view as the visitor scrolls down (scroll-triggered reveal)
- **FR-002**: System MUST apply a staggered delay to grid/list items so they appear one after another
- **FR-003**: System MUST provide smooth hover scale and shadow effects on interactive cards
- **FR-004**: System MUST animate the chatbot widget open/close with slide and fade transitions
- **FR-005**: System MUST animate each chat message entrance with fade and slide-up effect
- **FR-006**: System MUST display a custom-styled scrollbar in the chat message area that matches the theme
- **FR-007**: System MUST respect the `prefers-reduced-motion` accessibility setting and disable animations when requested
- **FR-008**: System MUST ensure all animations complete within 500ms to feel snappy
- **FR-009**: System MUST maintain all existing functionality (ordering, navigation, dark mode) without regression
- **FR-010**: System MUST ensure animations work correctly in both light and dark modes

### Key Entities

- **Animation Configuration**: Defines timing, easing, and delay values for each animation type (reveal, hover, message entrance)
- **Scroll Observer**: Detects when elements enter the viewport to trigger reveal animations
- **Theme Colors**: Used for scrollbar styling and animation accents, consistent with existing gradient palette

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All page sections fade in within 500ms of entering the viewport
- **SC-002**: Menu card hover effects respond within 100ms of cursor interaction
- **SC-003**: Chat widget opens/closes within 300ms with smooth animation
- **SC-004**: Each chat message animates in within 200ms of appearing
- **SC-005**: Scrollbar is visually consistent with theme across light and dark modes
- **SC-006**: Website maintains 60fps animation performance (no jank or frame drops)
- **SC-007**: All existing features (menu browsing, ordering, reservations, chatbot, dark mode) continue to work without regression
- **SC-008**: Users with reduced-motion preferences see no animations

## Assumptions

- The website currently has no animation infrastructure (no framer-motion, no CSS keyframes)
- Framer Motion will be used as the animation library (standard for React/Next.js)
- All animations should be subtle and professional — not flashy or distracting
- Scroll animations trigger once per element (not repeated on re-scroll)
- Dark mode scrollbar colors will use the same gradient theme but with adjusted opacity
- Mobile hover effects will use tap feedback instead of hover scale

## Scope

**In scope**:
- Scroll-triggered reveal animations on all pages
- Hover micro-interactions on cards and buttons
- Chatbot open/close animation
- Chat message entrance animation
- Custom themed scrollbar in chat
- Reduced-motion accessibility support

**Out of scope**:
- Page transition animations (route changes)
- Parallax scrolling effects
- Loading screen animations
- Particle effects or background animations
- Complex 3D animations
