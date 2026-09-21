# Quickstart: Menu Overhaul Validation

**Date**: 2026-09-18
**Feature**: 008-menu-replace

## Prerequisites

- Development server running (`npm run dev`)
- Browser open to `http://localhost:3000/menu`

## Validation Scenarios

### Scenario 1: All Items Display

1. Open `/menu` page
2. Scroll through entire menu
3. **Verify**: Count shows 86 items total
4. **Verify**: All items have real food photographs (no Unsplash/stock images)
5. **Verify**: All images load correctly (no broken image icons)

### Scenario 2: Category Filtering

1. Open `/menu` page
2. Click each category filter button
3. **Verify**: Exactly 15 category buttons exist
4. **Verify**: Each category shows correct item count:
   - Burgers: 5
   - Sandwiches: 11
   - Broast: 4
   - BBQ: 16
   - Chargha: 1
   - Karahi: 6
   - Handi: 3
   - Chinese: 11
   - Rolls: 19
   - Pasta: 2
   - Extras: 4
   - Paratha & Breads: 2
   - Desserts: 1
5. **Verify**: "All" button shows all 86 items

### Scenario 3: Typo Corrections

1. Open `/menu` page
2. Search for "Sandwitch" in item names
3. **Verify**: Zero results (should be "Sandwich")
4. Search for "Brger" in item names
5. **Verify**: Zero results (should be "Burger")
6. Search for "Cicken" in item names
7. **Verify**: Zero results (should be "Chicken")

### Scenario 4: Price Validation

1. Open `/menu` page
2. Find "Zinger Burger"
3. **Verify**: Price shows Rs. 600 (unchanged from before)
4. Check all items have prices > 0
5. **Verify**: No item shows Rs. 0 or "Price coming soon"
6. Check similar items in same category
7. **Verify**: Prices are within reasonable range for the category

### Scenario 5: New Categories

1. Open `/menu` page
2. Find "Paratha & Breads" category
3. **Verify**: Shows Puri Paratha and Roghni Kulcha
4. Find "Desserts" category
5. **Verify**: Shows Halwa

### Scenario 6: Chatbot Knowledge

1. Open chatbot widget
2. Ask: "Do you have Chatpata Masala Broast?"
3. **Verify**: Chatbot responds with accurate price and description
4. Ask: "What paratha options do you have?"
5. **Verify**: Chatbot mentions Puri Paratha and Roghni Kulcha
6. Ask: "What desserts are available?"
7. **Verify**: Chatbot mentions Halwa

### Scenario 7: Build Validation

1. Run `npm run lint`
2. **Verify**: No new warnings or errors
3. Run `npm run build`
4. **Verify**: Build completes successfully
5. **Verify**: No TypeScript errors

## Success Criteria Checklist

- [ ] SC-001: 86 items displayed with real food photos
- [ ] SC-002: 15 categories navigable and filtering correctly
- [ ] SC-003: Zero typos in displayed item names
- [ ] SC-004: All 86 images load correctly
- [ ] SC-005: Chatbot answers questions about new items
- [ ] SC-006: Menu page loads in under 3 seconds
- [ ] SC-007: Build passes with zero errors
- [ ] SC-008: Lint passes with zero new warnings
