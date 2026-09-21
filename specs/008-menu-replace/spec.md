# Feature Specification: Menu Overhaul with Real Food Images

**Feature Branch**: `008-menu-replace`  
**Created**: 2026-09-18  
**Status**: Draft  
**Input**: User description: "Replace all current menu items with 86 new food images from the D: drive. Upload images organized by correct categories, fix typos in filenames, create new categories where needed, and ensure professional presentation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Complete Real Menu (Priority: P1)

A customer visits the Ghousia Golden Spoon website and browses the menu page. They see all 86 food items displayed with real, high-quality photos of actual dishes (not stock images). Each item shows its name, price, and category. The customer can filter by category and see items organized logically.

**Why this priority**: The menu is the core of the restaurant website. Without accurate, real food images, customers cannot make informed ordering decisions. This is the foundation for all other menu-related features.

**Independent Test**: Open the menu page, verify all 86 items display with real food photos, verify category filtering works, verify no stock/Unsplash images remain.

**Acceptance Scenarios**:

1. **Given** a customer visits the menu page, **When** the page loads, **Then** all 86 menu items are displayed with real food photographs
2. **Given** a customer views the menu, **When** they click a category filter, **Then** only items from that category are shown
3. **Given** a customer views a menu item, **When** they look at the image, **Then** the image matches the actual dish name (e.g., "Chicken Karahi" shows a chicken karahi, not a stock photo)
4. **Given** a customer views the menu, **When** they scroll through items, **Then** all images load correctly without broken links

---

### User Story 2 - Accurate Category Organization (Priority: P1)

A customer navigates the menu and finds items organized into 15 logical categories. New categories like "Paratha & Breads" and "Desserts" exist alongside the original categories. Items are correctly categorized (e.g., all rolls are under "Rolls", all karahi dishes under "Karahi").

**Why this priority**: Proper categorization helps customers find what they're looking for. Incorrectly categorized items confuse customers and reduce order confidence.

**Independent Test**: Count items per category, verify each item is in the correct category based on its name, verify all 15 categories exist and are navigable.

**Acceptance Scenarios**:

1. **Given** a customer views the menu, **When** they count categories, **Then** there are exactly 15 categories displayed
2. **Given** a customer selects "Rolls" category, **When** items filter, **Then** all 19 roll items are shown (Beef Boti Chutney Roll through Zinger Roll)
3. **Given** a customer selects "BBQ" category, **When** items filter, **Then** all 16 BBQ items are shown (BBQ Platter through Spicy Chicken Boti)
4. **Given** a customer selects "Paratha & Breads" category, **When** items filter, **Then** Puri Paratha and Roghni Kulcha are shown
5. **Given** a customer selects "Desserts" category, **When** items filter, **Then** Halwa is shown

---

### User Story 3 - Professional Filename Presentation (Priority: P2)

A customer views menu item names and sees clean, professional text without typos. Filenames like "Sandwitch" are corrected to "Sandwich", "Brger" to "Burger", "Cicken" to "Chicken". Item names appear polished and trustworthy.

**Why this priority**: Typos in item names reduce customer trust and make the restaurant appear unprofessional. This is a quality polish item.

**Independent Test**: Search for common typo patterns ("Sandwitch", "Brger", "Cicken") in displayed item names, verify zero results.

**Acceptance Scenarios**:

1. **Given** a customer views the menu, **When** they read item names, **Then** no typos are visible (no "Sandwitch", "Brger", "Cicken")
2. **Given** a customer views sandwich items, **When** they read names, **Then** all show "Sandwich" not "Sandwitch"
3. **Given** a customer views burger items, **When** they read names, **Then** all show "Burger" not "Brger"

---

### User Story 4 - Menu Prices retained and Extended (Priority: P2)

A customer views menu items and sees appropriate prices in PKR. Items that existed before retain their original prices. New items have reasonable prices estimated based on similar items in the same category.

**Why this priority**: Pricing is essential for ordering decisions. Existing prices must be preserved for continuity; new items need reasonable defaults.

**Independent Test**: Verify Zinger Burger is still Rs. 600, verify all items have prices > 0, verify no item exceeds Rs. 5000.

**Acceptance Scenarios**:

1. **Given** a customer views the menu, **When** they check Zinger Burger price, **Then** it shows Rs. 600 (unchanged)
2. **Given** a customer views the menu, **When** they check any item, **Then** it has a positive price in PKR
3. **Given** a customer views the menu, **When** they compare similar items, **Then** prices are within a reasonable range (e.g., all rolls between Rs. 250-600)

---

### User Story 5 - Chatbot Knows New Menu (Priority: P3)

A customer asks the chatbot about menu items that were added in the overhaul. The chatbot accurately describes the new items, their prices, and categories. The chatbot's knowledge reflects the updated 86-item menu.

**Why this priority**: The chatbot must stay synchronized with the menu. If a customer asks about "Chatpata Masala Broast" and the chatbot doesn't know it, the experience breaks.

**Independent Test**: Ask chatbot about "Chatpata Masala Broast", "Dynamite Chicken Broast", "Puri Paratha", "Halwa" — verify accurate responses.

**Acceptance Scenarios**:

1. **Given** a customer asks the chatbot about a new menu item, **When** the chatbot responds, **Then** it provides accurate name, price, and description
2. **Given** a customer asks about a category, **When** the chatbot responds, **Then** it lists all items in that category correctly
3. **Given** a customer asks "What's new on the menu?", **When** the chatbot responds, **Then** it can mention recently added items

---

### Edge Cases

- What happens when a menu item image file is missing or corrupted? — System should display a placeholder image and log a warning
- What happens when two items have the same name in different categories? — System should allow it (e.g., "Chicken Pasta" in Pasta and "Chicken Creamy Pasta" in Pasta are different items)
- What happens when a category has zero items? — Category should not be displayed on the menu page
- What happens when a price is missing? — System should flag the item as "Price coming soon" rather than showing Rs. 0
- What happens when image filenames contain special characters? — System should handle URL encoding correctly

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display all 86 menu items with real food photographs sourced from D: drive images
- **FR-002**: System MUST organize items into 15 categories (13 existing + 2 new: Paratha & Breads, Desserts)
- **FR-003**: System MUST copy all 86 image files from D:\ root to `public/images/food/{category}/` organized by category
- **FR-004**: System MUST fix typos in item names: "Sandwitch" → "Sandwich", "Brger" → "Burger", "Cicken" → "Chicken"
- **FR-005**: System MUST preserve existing prices for items that existed before (e.g., Zinger Burger = Rs. 600)
- **FR-006**: System MUST assign reasonable PKR prices to new items based on similar items in the same category
- **FR-007**: System MUST remove all current menu items from the data file before adding new ones
- **FR-008**: System MUST update the chatbot's system prompt to reflect the new 86-item menu
- **FR-009**: System MUST ensure all image paths are valid and images load correctly on the menu page
- **FR-010**: System MUST maintain category filtering functionality with the new category count
- **FR-011**: System MUST ensure the menu page renders without errors after the overhaul
- **FR-012**: System MUST handle image format variations (PNG, JPG, WEBP, AVIF) correctly

### Key Entities

- **Category**: Menu category with id, name, slug, display_order, icon. 15 total categories.
- **MenuItem**: Individual menu item with id, category_id, name, description, price, image_url, is_available, is_featured. 86 total items.
- **Image File**: Food photograph stored in `public/images/food/{category}/` directory. 86 total images.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Menu page displays all 86 items with real food photographs (0 stock/Unsplash images)
- **SC-002**: All 15 categories are navigable and correctly filter items
- **SC-003**: Zero typos visible in displayed item names (verified by searching for "Sandwitch", "Brger", "Cicken")
- **SC-004**: All 86 images load correctly (0 broken image links)
- **SC-005**: Chatbot accurately answers questions about all 86 menu items
- **SC-006**: Menu page loads in under 3 seconds on desktop and mobile
- **SC-007**: Build passes with zero errors after the overhaul
- **SC-008**: Lint passes with zero new warnings after the overhaul

## Assumptions

- All 86 image files at D:\ root are food-related images for the restaurant menu
- Image filenames accurately represent the dish names (with typos to fix)
- Existing menu prices are current and correct
- The restaurant wants all 86 items displayed (no items hidden by default)
- New category icons (Paratha & Breads = 🫓, Desserts = 🍮) are acceptable
- The chatbot's existing context-building system (website-context.ts) will automatically pick up the new menu data
