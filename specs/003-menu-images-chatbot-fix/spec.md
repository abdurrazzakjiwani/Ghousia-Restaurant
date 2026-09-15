# Feature Specification: Menu Images, Chatbot Fix & Page Upgrades

**Feature Branch**: `003-menu-images-chatbot-fix`  
**Created**: 2026-09-15  
**Status**: Draft  
**Input**: User description: "Add Unsplash menu images, fix chatbot order placement, upgrade Home and About pages"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Chatbot Order Placement (Priority: P1)

A customer opens the chat widget, types "I want to order a Zinger burger," and receives an immediate confirmation with a clickable WhatsApp button that opens a pre-filled order message ready to send to the restaurant.

**Why this priority**: This is the core broken feature. The chatbot currently fails to place orders — it only returns a text response. Without this fix, the chatbot has no practical ordering value.

**Independent Test**: Can be fully tested by opening the chat widget, typing "I want to order 2 Zinger burgers," and verifying a WhatsApp order button appears with the correct items and total.

**Acceptance Scenarios**:

1. **Given** the chat widget is open, **When** the customer types "I want to order a Zinger burger", **Then** the chatbot responds with order confirmation text and a clickable "Order on WhatsApp" button that opens a pre-filled message with the correct item name, quantity (1), and price (Rs. 600).
2. **Given** the chat widget is open, **When** the customer types "Give me 2 Club Sandwiches and 1 French Fries", **Then** the chatbot responds with a summary of all items (2x Club Sandwich Rs. 1000, 1x French Fries Rs. 300, Total Rs. 1300) and a WhatsApp order button.
3. **Given** the chat widget is open, **When** the customer types "What do you recommend?", **Then** the chatbot responds with helpful menu recommendations without showing an order button.
4. **Given** the chat widget is open, **When** the customer types a message that contains both an order and a question (e.g., "I want a Beef Burger, what are your hours?"), **Then** the chatbot responds to both the order and the question, showing the order button for the food item.

---

### User Story 2 - Menu Item Images (Priority: P2)

A customer browsing the menu or home page sees real, high-quality photographs of each food item instead of placeholder emoji icons. The images help the customer make informed ordering decisions.

**Why this priority**: Visual presentation directly impacts customer trust and ordering confidence. Without images, the menu feels incomplete and less professional.

**Independent Test**: Can be fully tested by visiting the home page and menu page, confirming all 39 menu items display photographic images instead of emoji placeholders.

**Acceptance Scenarios**:

1. **Given** a customer visits the home page, **When** the page loads, **Then** all featured menu items display real food photographs (not emoji placeholders).
2. **Given** a customer visits the menu page, **When** they browse any category, **Then** every item in that category displays a food photograph.
3. **Given** an image fails to load (network issue), **When** the customer views the menu, **Then** a graceful fallback is shown (item name and description remain visible, no broken image icon).
4. **Given** a customer views the menu on a mobile device, **When** the page loads, **Then** images are appropriately sized and do not slow down the page load experience.

---

### User Story 3 - Home Page Content Upgrade (Priority: P3)

A first-time visitor to the restaurant website reads compelling, authentic content on the home page that communicates the restaurant's story, values, and unique selling points — encouraging them to order or reserve a table.

**Why this priority**: The current home page has generic placeholder text. Upgraded content improves first impressions and conversion rates.

**Independent Test**: Can be fully tested by visiting the home page and verifying the hero section, about preview, and all text content are specific to Ghousia Golden Spoon (not generic template text).

**Acceptance Scenarios**:

1. **Given** a first-time visitor lands on the home page, **When** the page loads, **Then** the hero section displays a compelling tagline, the restaurant's opening hours, and three clear call-to-action buttons (View Menu, Reserve Table, Order on WhatsApp).
2. **Given** a visitor scrolls to the "Our Story" section, **When** they read the content, **Then** they find a specific narrative about Ghousia Golden Spoon's history, cooking methods, and what makes it unique — not generic restaurant template text.
3. **Given** a visitor views the stats section, **When** they see the numbers, **Then** the stats reflect actual restaurant metrics (e.g., menu items count, categories count, delivery coverage).

---

### User Story 4 - About Page Content Upgrade (Priority: P4)

A visitor who clicks "About Us" reads a rich, detailed page about the restaurant's journey, values, team, and cooking philosophy — building trust and emotional connection with the brand.

**Why this priority**: The About page is currently a minimal template. A well-crafted About page strengthens brand identity and converts curious visitors into customers.

**Independent Test**: Can be fully tested by visiting the About page and confirming all sections contain specific, authentic content about Ghousia Golden Spoon.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to the About page, **When** the page loads, **Then** they see a hero banner with the restaurant's story, a timeline of the restaurant's journey, descriptions of cooking methods, and a call-to-action to visit or call.
2. **Given** a visitor reads the "Our Values" section, **When** they review each value, **Then** each value has a specific description tied to the restaurant's actual practices (not generic placeholders).
3. **Given** a visitor reaches the bottom of the About page, **When** they see the contact section, **Then** they find the restaurant's address, phone numbers, operating hours, and a map embed.

---

### Edge Cases

- What happens when the customer types an item name that doesn't exist on the menu? The chatbot should respond that the item wasn't found and suggest similar items.
- What happens when the customer orders an item that is currently unavailable? The chatbot should inform the customer and suggest alternatives.
- What happens when the Unsplash image URL is broken or slow to load? The menu card should show a fallback with the item name and description visible.
- What happens when the customer types a very long order (10+ items)? The chatbot should handle multi-item orders correctly and generate a complete WhatsApp message.
- What happens when the chatbot receives a message in a language other than English/Urdu? The chatbot should attempt to respond in the language used by the customer.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect order intent from natural language messages (e.g., "I want to order," "Give me," "Add," "Buy," or direct item names with quantities).
- **FR-002**: System MUST match ordered items against the known menu of 39 items across 13 categories, including fuzzy matching for slight misspellings.
- **FR-003**: System MUST extract quantity from the message (e.g., "2 Zinger Burgers" → quantity: 2, item: "Zinger Burger"). Default quantity is 1 when not specified.
- **FR-004**: System MUST generate a WhatsApp order link using the format `wa.me/{phone}?text={url-encoded-order}` that, when clicked, opens WhatsApp with a pre-filled message containing item names, quantities, prices, and total.
- **FR-005**: System MUST display the order summary and a clickable "Order on WhatsApp" button in the chat interface when an order is detected.
- **FR-006**: System MUST handle multi-item orders in a single message (e.g., "2 Zinger Burgers and 1 French Fries").
- **FR-007**: System MUST fall back to the AI language model for non-order messages (recommendations, questions, general conversation).
- **FR-008**: System MUST maintain conversation context within a session so the chatbot can handle follow-up messages like "Add one more" or "Remove the fries."
- **FR-009**: System MUST display real food photographs for all 39 menu items sourced from a free stock photography service.
- **FR-010**: System MUST show a graceful fallback (item name visible) when an image fails to load.
- **FR-011**: System MUST present the home page hero section with a restaurant-specific tagline, opening hours indicator, and three call-to-action buttons.
- **FR-012**: System MUST present the home page "Our Story" section with authentic content about the restaurant's history, cooking methods, and unique value proposition.
- **FR-013**: System MUST present the About page with a hero banner, journey timeline, cooking philosophy, team descriptions, and a contact section with address, phone numbers, and map.
- **FR-014**: System MUST generate the WhatsApp order message in a format suitable for the restaurant to process (item names, quantities, prices, total, delivery address prompt).

### Key Entities

- **Menu Item**: A food or beverage offering with a name, description, price, category, image availability, and availability status. 39 items across 13 categories.
- **Chat Message**: A single message in a conversation, with a role (customer or assistant), content text, and optional order data (items, total, WhatsApp URL).
- **Order Intent**: A parsed representation of a customer's order message, containing matched menu items, quantities, and computed totals.
- **Session**: A conversation session identified by a unique ID, containing multiple chat messages and maintaining context for follow-up interactions.
- **WhatsApp Order**: The final formatted message sent to the restaurant via WhatsApp, containing itemized order details and total.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Customer can place an order via chatbot in under 30 seconds (from opening chat to clicking WhatsApp button).
- **SC-002**: Chatbot correctly identifies and processes order intent from natural language in at least 90% of common order patterns (single item, multi-item, with/without quantities).
- **SC-003**: Generated WhatsApp order link opens correctly on mobile and desktop with all order details pre-filled.
- **SC-004**: All 39 menu items display photographic images on both home page and menu page.
- **SC-005**: Menu page loads with images in under 3 seconds on a standard mobile connection.
- **SC-006**: Home page and About page contain zero instances of generic placeholder text — all content is specific to Ghousia Golden Spoon.
- **SC-007**: Chatbot handles multi-item orders (up to 10 items) without errors or missing items.
- **SC-008**: 95% of chatbot responses for order intents include a functional WhatsApp order button.

## Assumptions

- The restaurant's WhatsApp number (+92 301 3631555) remains the primary contact for orders.
- All menu item prices are provided as-is and do not include delivery charges (delivery pricing is handled by the restaurant directly).
- Unsplash free-tier image URLs are reliable enough for production use and do not require API keys.
- The existing Supabase database schema does not need modification — menu item images are stored as URLs in the static menu data file.
- Customers are comfortable using WhatsApp for order placement (standard in Pakistan).
- The chatbot does not need to handle payment processing — payment is handled via cash on delivery or in-person at the restaurant.
