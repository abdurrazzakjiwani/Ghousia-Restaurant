# Data Model: Menu Images, Chatbot Fix & Page Upgrades

**Feature**: 003-menu-images-chatbot-fix  
**Date**: 2026-09-15

## Entities

### Menu Item (Existing — Extended)

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "101") |
| category_id | string | Foreign key to Category |
| name | string | Display name (e.g., "Zinger Burger") |
| description | string | Short description |
| price | number | Price in PKR |
| image_url | string \| null | **Updated**: URL to food photograph |
| is_available | boolean | Whether item is currently available |
| is_featured | boolean | Whether to show on home page |

**Changes**: Add `image_url` values to all 39 items in static `menu-data.ts`. No schema change — field already exists.

### Order Intent (New — Transient)

| Field | Type | Description |
|-------|------|-------------|
| items | OrderIntentItem[] | Matched menu items with quantities |
| total | number | Computed total in PKR |
| is_valid | boolean | Whether all items were matched |
| unmatched_text | string \| null | Any unmatched portions of the message |

### OrderIntentItem (New — Transient)

| Field | Type | Description |
|-------|------|-------------|
| menu_item_id | string | Matched menu item ID |
| name | string | Item name (for display) |
| quantity | number | Requested quantity (default: 1) |
| price | number | Unit price from menu |
| subtotal | number | quantity × price |

### Chat Message (Existing — Extended)

| Field | Type | Description |
|-------|------|-------------|
| role | "user" \| "assistant" | Message sender |
| content | string | Message text |
| order_url | string \| null | **New**: WhatsApp order URL if order detected |
| order_items | OrderIntentItem[] \| null | **New**: Parsed order items if order detected |

**Changes**: Add `order_url` and `order_items` fields to the client-side message type.

### Session (Existing — Extended)

| Field | Type | Description |
|-------|------|-------------|
| session_id | string | Unique session identifier |
| messages | Message[] | Conversation history |

**Changes**: Messages now include order context. History is sent to LLM API for context.

## State Transitions

### Chat Message Flow

```
User Input
    ↓
[Intent Detection]
    ↓
┌─ Order Intent Detected ──→ Parse Items → Match Menu → Compute Total → Generate wa.me URL
│                                                                      ↓
│                                                         Return { response, orderUrl, orderItems }
│                                                                      ↓
│                                                         ChatMessage renders WhatsApp button
│
└─ No Order Intent ──→ Send to LLM with history → Return text response
```

### Image Load Flow

```
Menu Card Renders
    ↓
[img src = image_url]
    ↓
┌─ Load Success ──→ Show photograph
│
└─ Load Failure ──→ onError fires → Set fallback state → Show gradient + item name
```

## Validation Rules

- **Order Intent**: At least 1 menu item must be matched for order to be valid
- **Quantity**: Must be positive integer; default 1 if not specified
- **WhatsApp URL**: Phone number must be in format `92XXXXXXXXXX` (no +, spaces, dashes)
- **Image URL**: Must be valid HTTP(S) URL; fallback on any load error
