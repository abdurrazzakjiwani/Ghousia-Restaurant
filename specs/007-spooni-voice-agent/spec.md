# Feature Specification: ElevenLabs Voice Agent Integration

**Feature Branch**: `007-spooni-voice-agent`  
**Created**: 2026-09-17  
**Status**: Draft  
**Input**: User description: "Replace the current chatbot with ElevenLabs voice agent SPOONI, hide all ElevenLabs branding, archive old chatbot files"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Voice Conversation with SPOONI (Priority: P1)

A restaurant customer visits the Ghousia Golden Spoon website and wants to ask about the menu, place an order, or make a reservation. They click the floating chat button (SPOONI) in the bottom-right corner. The voice agent widget opens and requests microphone permission. The customer speaks naturally (in Urdu or English), and SPOONI responds with voice. The conversation flows naturally like talking to a restaurant staff member — asking about dishes, getting recommendations, placing orders, or booking a table.

**Why this priority**: This is the core feature — replacing the text-only chatbot with a voice-first experience that makes the website feel like a real restaurant host. Voice interaction is more natural for food ordering and reservations.

**Independent Test**: Can be fully tested by clicking the floating button, granting microphone access, speaking a question about the menu, and verifying SPOONI responds with voice. Delivers complete voice ordering capability.

**Acceptance Scenarios**:

1. **Given** a customer is on any page of the website, **When** they click the SPOONI floating button, **Then** the voice agent widget opens and requests microphone permission
2. **Given** microphone permission is granted, **When** the customer speaks a question (e.g., "What do you recommend?"), **Then** SPOONI processes the speech and responds with a voice answer within 3 seconds
3. **Given** an active voice conversation, **When** the customer asks about menu items, prices, or recommendations, **Then** SPOONI provides accurate information based on the restaurant's menu
4. **Given** an active voice conversation, **When** the customer wants to place an order or make a reservation, **Then** SPOONI guides them through the process verbally
5. **Given** the conversation is complete, **When** the customer clicks the end call button or closes the widget, **Then** the voice session terminates cleanly

---

### User Story 2 - Zero ElevenLabs Branding (Priority: P1)

A restaurant owner wants the website to feel like their own branded experience, not a third-party tool. When customers interact with the voice agent, there should be absolutely no mention of "ElevenLabs," "Powered by Eleven Agents," or any third-party branding anywhere in the widget — not in the header, footer, tooltip, or any hidden corner.

**Why this priority**: Branding removal is critical for professional appearance and is a hard requirement from the restaurant owner. Must be implemented alongside the voice agent itself.

**Independent Test**: Can be fully tested by opening the voice agent widget and visually inspecting every element for any ElevenLabs branding. Delivers a clean, white-labeled experience.

**Acceptance Scenarios**:

1. **Given** the voice agent widget is open, **When** a customer views the widget, **Then** there is no visible "ElevenLabs" text, logo, or branding anywhere in the widget
2. **Given** the voice agent widget is open, **When** a customer hovers over elements, **Then** no tooltips or hidden elements reveal "Powered by ElevenLabs" or similar third-party attribution
3. **Given** the voice agent widget is open, **When** the conversation ends, **Then** no post-conversation screen displays ElevenLabs branding
4. **Given** the website source code is inspected, **When** a developer checks the widget, **Then** all ElevenLabs branding is suppressed via configuration attributes and CSS

---

### User Story 3 - Old Chatbot Archived (Priority: P2)

The development team wants to preserve the old text-based chatbot code for reference or potential rollback, but remove it from the active codebase. The old chatbot files (ChatWidget, ChatMessage, useChat hook, chat API route) are moved to an archive directory, keeping the codebase clean while preserving history.

**Why this priority**: Clean codebase is important for maintainability, but archival is lower priority than getting the voice agent working.

**Independent Test**: Can be tested by verifying the old chatbot files exist in the archive directory and are no longer imported or referenced in the active codebase.

**Acceptance Scenarios**:

1. **Given** the feature is complete, **When** a developer checks the source tree, **Then** old chatbot files exist in `archive/chat/` directory
2. **Given** the feature is complete, **When** the application builds, **Then** no imports or references to the old chatbot components remain in active code
3. **Given** the feature is complete, **When** the application runs, **Then** the old chatbot FAB button is replaced by the SPOONI voice agent widget

---

### Edge Cases

- What happens when the user denies microphone permission? The widget should display a message explaining that microphone access is required for voice conversation, and offer an alternative (e.g., link to WhatsApp for text ordering).
- What happens when the voice agent fails to connect or times out? The widget should display a friendly error message and suggest trying again or using WhatsApp.
- What happens on browsers that don't support the voice agent widget? The widget should gracefully fall back to showing the WhatsApp order button or a message to use a supported browser.
- What happens when the user is on a mobile device with no microphone? The widget should detect this and display an appropriate message directing them to WhatsApp.
- What happens when the user switches pages while in a conversation? The voice conversation should continue in the background (the widget is independent of page routing).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a floating action button (FAB) in the bottom-right corner of every page, positioned above the WhatsApp button
- **FR-002**: System MUST load the ElevenLabs conversational AI widget script asynchronously to avoid blocking page rendering
- **FR-003**: System MUST configure the widget with the agent ID `agent_8401m2qjrwryfh2b900egeqdnc7m`
- **FR-004**: System MUST suppress all ElevenLabs branding via the `disable-banner` configuration attribute
- **FR-005**: System MUST apply additional CSS rules to hide any residual branding elements that may appear through shadow DOM or dynamic rendering
- **FR-006**: System MUST customize the widget's visual appearance to match the restaurant's brand colors (purple-blue gradient: `#667eea` to `#764ba2`)
- **FR-007**: System MUST customize widget text labels (action text, start call text, end call text) to use restaurant-appropriate language
- **FR-008**: System MUST position the widget's floating button at the same location as the old chatbot FAB (bottom-right, above WhatsApp button)
- **FR-009**: System MUST preserve all existing website functionality (menu, reservations, ordering, reviews, dark mode) without regression
- **FR-010**: System MUST move old chatbot files (ChatWidget.tsx, ChatMessage.tsx, useChat.ts, API route) to an archive directory
- **FR-011**: System MUST remove all imports and references to old chatbot components from the layout and any other files
- **FR-012**: System MUST ensure the widget loads correctly on all page routes (home, menu, about, contact, reservation, location, tracking, order)
- **FR-013**: System MUST handle the case where the ElevenLabs script fails to load (network error, ad blocker) by displaying a fallback message

### Key Entities

- **Voice Agent Widget**: The ElevenLabs conversational AI widget embedded in the website. Key attributes: agent ID, visual configuration (colors, labels), branding suppression settings, position on page.
- **Old Chatbot Files**: The previous text-based chatbot implementation (ChatWidget, ChatMessage, useChat, chat API route). To be archived, not deleted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can initiate a voice conversation with SPOONI by clicking the floating button in under 2 seconds
- **SC-002**: Voice conversations start within 3 seconds of clicking the call button (after microphone permission)
- **SC-003**: Zero instances of "ElevenLabs" or "Powered by" branding visible in the widget (verified by visual inspection)
- **SC-004**: The website build completes without errors after the integration
- **SC-005**: All existing website features (menu browsing, ordering, reservations, reviews, dark mode) continue to work without regression
- **SC-006**: The voice agent widget loads and functions correctly on Chrome, Firefox, Safari, and Edge (latest versions)
- **SC-007**: Old chatbot files are preserved in archive directory and no longer referenced in active code

## Assumptions

- The ElevenLabs agent (SPOONI) is already configured with appropriate system prompts, voice settings, and knowledge about the restaurant's menu and services
- The ElevenLabs agent is set to public access (no authentication required) for the widget to work
- The user's browser supports WebRTC and the MediaDevices API (required for voice conversations)
- The website is served over HTTPS (required for microphone access)
- The ElevenLabs widget CDN (`unpkg.com/@elevenlabs/convai-widget-embed`) is accessible from the user's network
- The existing WhatsApp button and all other UI elements remain unchanged
- The widget's compact (floating button) variant is used, matching the existing chatbot UX pattern
