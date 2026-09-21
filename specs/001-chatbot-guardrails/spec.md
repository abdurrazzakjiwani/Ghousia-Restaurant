# Feature Specification: Chatbot Guardrails & Dynamic Data

**Feature Branch**: `001-chatbot-guardrails`  
**Created**: 2026-09-18  
**Status**: Draft  
**Input**: User description: "Implement chatbot guardrails with abuse detection, context restriction, dynamic data building, and scrollbar fix for the Ghousia Golden Spoon restaurant website"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scrollable Chat History (Priority: P1)

As a customer using the chatbot, I want to scroll up and down through my conversation history so that I can review previous messages, menu items, and order details without losing context.

**Why this priority**: This is a fundamental UX issue — without a working scrollbar, customers cannot see previous messages once the conversation grows beyond the visible area. This blocks basic chatbot usability.

**Independent Test**: Open the chatbot, send 5+ messages, and verify that scrolling up shows earlier messages and scrolling down returns to the latest message. The scrollbar should be visible and functional.

**Acceptance Scenarios**:

1. **Given** the chatbot is open with 10+ messages, **When** the user scrolls up in the chat area, **Then** previous messages become visible and the scrollbar moves accordingly
2. **Given** the user has scrolled up to view older messages, **When** the user sends a new message, **Then** the chat automatically scrolls to the bottom to show the new message
3. **Given** the chat has more messages than fit in the visible area, **When** the user looks at the chat container, **Then** a visible scrollbar indicator is present on the right side

---

### User Story 2 - Off-Topic Question Refusal (Priority: P1)

As the restaurant owner, I want the chatbot to politely refuse to answer questions unrelated to Ghousia Golden Spoon so that the AI stays focused on restaurant-related assistance and does not provide inappropriate or irrelevant information.

**Why this priority**: Without context restriction, the chatbot could answer questions about politics, religion, coding, or other unrelated topics, which could damage the restaurant's reputation or confuse customers.

**Independent Test**: Ask the chatbot questions like "What is Python?", "Tell me about cricket", or "Who is the Prime Minister?" and verify it responds with a polite refusal that directs the user to ask restaurant-related questions.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the user asks "What is the capital of France?", **Then** the chatbot responds with a polite refusal message (e.g., "Sir, the question you asked isn't relevant right now; please ask questions related to our restaurant. JazakAllah Sir.")
2. **Given** the chatbot is open, **When** the user asks "Tell me about quantum physics", **Then** the chatbot responds with a different polite refusal variation (not the exact same message every time)
3. **Given** the chatbot has just refused an off-topic question, **When** the user then asks "What's on your menu?", **Then** the chatbot answers the menu question normally without carrying over the refusal context

---

### User Story 3 - Abusive Language Handling (Priority: P1)

As the restaurant owner, I want the chatbot to detect and politely handle abusive or disrespectful language so that the restaurant's brand is protected and all customers experience a respectful interaction.

**Why this priority**: Abusive messages could lead to inappropriate AI responses that damage the restaurant's reputation. This is a critical brand protection measure.

**Independent Test**: Send messages containing offensive words in English and Roman Urdu (e.g., common Pakistani profanity) and verify the chatbot responds with a polite, professional refusal.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the user sends a message containing English profanity, **Then** the chatbot responds with a polite refusal (e.g., "Sir, please maintain a respectful tone. I'm here to help you with our restaurant information. JazakAllah Sir.")
2. **Given** the chatbot is open, **When** the user sends a message containing Roman Urdu profanity (e.g., common Pakistani offensive words), **Then** the chatbot responds with a polite refusal without echoing or acknowledging the offensive content
3. **Given** the chatbot has just handled an abusive message, **When** the user then asks a normal restaurant question, **Then** the chatbot answers normally without carrying over the abuse context

---

### User Story 4 - Complete Restaurant Knowledge (Priority: P2)

As a customer, I want the chatbot to know everything about Ghousia Golden Spoon — menu, branches, hours, delivery info, about page content, FAQ, and customer reviews — so that I can get comprehensive answers without needing to browse the website.

**Why this priority**: The chatbot currently only knows about menu items. Customers asking about delivery areas, branch locations, cooking philosophy, or payment methods get incomplete or no answers. This reduces the chatbot's usefulness.

**Independent Test**: Ask the chatbot about branches, delivery areas, cooking philosophy, payment methods, catering, and vegetarian options. Verify it provides accurate, detailed answers for each.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the user asks "Where are your branches?", **Then** the chatbot lists all 3 branches with their addresses
2. **Given** the chatbot is open, **When** the user asks "Do you deliver to Clifton?", **Then** the chatbot confirms delivery to all Karachi areas including Clifton with estimated time
3. **Given** the chatbot is open, **When** the user asks "What's your cooking philosophy?", **Then** the chatbot describes charcoal grilling, hand-ground spices, and made-with-love approach
4. **Given** the chatbot is open, **When** the user asks "Do you have vegetarian options?", **Then** the chatbot lists vegetarian items (Paneer Karahi, French Fries, Naan, Raita, Salad, Lassi)
5. **Given** the chatbot is open, **When** the user asks "What payment methods do you accept?", **Then** the chatbot explains Cash on Delivery and in-restaurant payment

---

### User Story 5 - Auto-Refresh on Content Changes (Priority: P2)

As the restaurant owner, I want the chatbot to automatically know about new menu items or content changes after I deploy the website, so that I don't need to manually update the chatbot separately.

**Why this priority**: Without auto-refresh, every menu update would require separate chatbot configuration, creating maintenance overhead and risking the chatbot being out of sync with the actual website.

**Independent Test**: Add a new menu item to the data file, deploy the site, and verify the chatbot can answer questions about the new item without any manual chatbot configuration.

**Acceptance Scenarios**:

1. **Given** a new menu item is added to the menu data file and deployed, **When** a customer asks the chatbot about that item, **Then** the chatbot provides accurate information including name, price, and description
2. **Given** a menu item's price is updated and deployed, **When** a customer asks about that item's price, **Then** the chatbot shows the updated price
3. **Given** a new branch is added to the branches data file and deployed, **When** a customer asks about branches, **Then** the chatbot includes the new branch in its response

---

### User Story 6 - Natural Closing Salutations (Priority: P3)

As a customer, I want the chatbot to end its responses with a natural closing like "JazakAllah Sir", "Thank you", or "Shukriya" occasionally — not on every single message — so that the conversation feels human and not robotic.

**Why this priority**: If every message ends with the same closing, it feels repetitive and artificial. Occasional closings feel more natural and culturally appropriate.

**Independent Test**: Have a 10-message conversation and count how many responses end with a closing salutation. It should be roughly 2-3 out of 10, not all 10.

**Acceptance Scenarios**:

1. **Given** the chatbot is in a conversation, **When** it responds to 10 different questions, **Then** approximately 2-4 of those responses end with "JazakAllah Sir", "Thank you", or "Shukriya" (not all 10)
2. **Given** the chatbot just ended a response with "JazakAllah Sir", **When** it responds to the next question, **Then** it does NOT end with "JazakAllah Sir" again (no consecutive identical closings)
3. **Given** the chatbot refuses an off-topic question, **When** it provides the refusal message, **Then** the refusal message itself may include a closing as part of the polite refusal

---

### Edge Cases

- What happens when a user sends an empty message? → The system should reject empty messages
- What happens when a user sends a very long message (500+ characters)? → The system should respond with a short message limit notice
- What happens when a user mixes restaurant keywords with profanity? → Profanity detection takes priority; the abuse refusal is returned
- What happens when the Groq API is unavailable? → The existing fallback message is returned
- What happens when a user asks the same off-topic question repeatedly? → Each refusal should use a different variation (no consecutive identical responses)
- What happens when a user asks about a menu item that was just removed? → The chatbot should only know about currently available items

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect abusive language in user messages by checking against English and Roman Urdu profanity keyword lists
- **FR-002**: System MUST reject messages exceeding 500 characters with a polite notice
- **FR-003**: System MUST restrict chatbot responses to restaurant-related topics only (menu, branches, hours, delivery, orders, about, FAQ, reviews, catering, reservations)
- **FR-004**: System MUST respond to off-topic questions with one of several polite refusal messages, varying the response each time
- **FR-005**: System MUST respond to abusive messages with one of several polite refusal messages without echoing the offensive content
- **FR-006**: System MUST dynamically build its knowledge base from the restaurant's data files (menu items, branches, about content, FAQ) on each request
- **FR-007**: System MUST include complete menu information with all items, prices, categories, descriptions, and featured status
- **FR-008**: System MUST include branch information with all 3 branch addresses and 2 family halls
- **FR-009**: System MUST include restaurant details (address, phones, hours, delivery coverage, payment methods)
- **FR-010**: System MUST include about page content (origin story, cooking philosophy, values)
- **FR-011**: System MUST include FAQ content (10 Q&As covering hours, delivery, ordering, events, payment, catering, branches, customization, vegetarian, contact)
- **FR-012**: System MUST include representative customer testimonials
- **FR-013**: System MUST include ordering information (WhatsApp, phone, website, order modes)
- **FR-014**: System MUST include delivery information (all Karachi, 45-60 min estimated time)
- **FR-015**: System MUST include catering information (available for large events, 24hr advance notice)
- **FR-016**: System MUST include reservation information (how to book, 1-20 guests, special requests)
- **FR-017**: System MUST include vegetarian options information
- **FR-018**: System MUST end responses with a natural closing ("JazakAllah Sir", "Thank you", or "Shukriya") only occasionally (approximately every 3rd-4th message), not on every response
- **FR-019**: System MUST NOT use the same closing on consecutive responses
- **FR-020**: System MUST auto-refresh its knowledge when data files are updated and deployed (no manual reconfiguration needed)
- **FR-021**: Chatbot UI MUST display a visible scrollbar when chat history exceeds the visible area
- **FR-022**: Chatbot UI MUST automatically scroll to the bottom when new messages arrive
- **FR-023**: Chatbot UI MUST allow users to scroll up to view previous messages

### Key Entities

- **Chat Message**: A single message in the conversation, with role (user/assistant), content text, and optional order data
- **Profanity Keyword**: An offensive word or phrase in English or Roman Urdu that triggers abuse detection
- **Refusal Message**: A pre-defined polite response for off-topic questions or abusive language
- **Menu Context**: Dynamically generated text containing all menu items, categories, prices, and descriptions
- **Branch Context**: Dynamically generated text containing all branch addresses and family hall information
- **About Context**: Restaurant origin story, cooking philosophy, and values
- **FAQ Context**: All 10 frequently asked questions and answers
- **Testimonial Context**: Representative customer review quotes
- **System Prompt**: The complete AI instruction set including guardrails, restaurant knowledge, and response guidelines

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of off-topic questions (e.g., "What is Python?", "Tell me about cricket") receive a polite refusal response
- **SC-002**: 100% of messages containing profanity (English or Roman Urdu) receive a polite abuse refusal response
- **SC-003**: The chatbot correctly answers questions about all 13 menu categories with accurate prices
- **SC-004**: The chatbot correctly answers questions about all 3 branches with accurate addresses
- **SC-005**: The chatbot correctly answers questions about delivery coverage, hours, payment methods, and vegetarian options
- **SC-006**: After adding a new menu item to the data file and deploying, the chatbot answers questions about the new item within the next request
- **SC-007**: Users can scroll through the complete chat history without messages being cut off
- **SC-008**: The scrollbar is visible and functional on all major browsers (Chrome, Firefox, Safari, Edge)
- **SC-009**: Closing salutations appear on approximately 25-40% of responses (not 0% and not 100%)
- **SC-010**: No two consecutive responses end with the same closing salutation
- **SC-011**: Message length limit of 500 characters is enforced with a polite notice
- **SC-012**: The chatbot maintains conversation context and provides coherent multi-turn responses

## Assumptions

- The restaurant's data files (menu-data.ts, branches-data.ts, testimonials-data.ts) are the source of truth for all restaurant content
- When data files are updated and deployed to Vercel, the chatbot automatically picks up the changes on the next request
- The Groq API (openai/gpt-oss-20b model) is available and functional for chat completions
- The existing order intent detection system (detectOrderIntent) continues to work alongside the new guardrails
- Profanity detection uses keyword matching (not AI-based content moderation) — sufficient for this use case
- The chatbot does not need to persist conversation history between sessions (in-memory state is sufficient)
- The restaurant's WhatsApp number (0301-3631555) and phone numbers (0321-8221010) remain unchanged
