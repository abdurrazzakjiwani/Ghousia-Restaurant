# Data Model: Chatbot Guardrails & Dynamic Data

**Feature**: 001-chatbot-guardrails
**Date**: 2026-09-18

## Entities

### ChatMessage (existing, unchanged)

| Field | Type | Description |
|-------|------|-------------|
| role | "user" \| "assistant" | Who sent the message |
| content | string | The message text |
| orderUrl | string \| null | WhatsApp order URL (for order confirmations) |
| orderItems | OrderIntentItem[] \| null | Items in the order (for order confirmations) |
| orderTotal | number \| null | Total price (for order confirmations) |

### ProfanityKeyword (NEW, in guardrails.ts)

| Field | Type | Description |
|-------|------|-------------|
| word | string | The offensive word or phrase |
| language | "en" \| "ur" \| "roman" | Language/script of the keyword |

**Note**: This is an in-memory data structure (array of strings), not a database entity. No persistence needed.

**Implementation**:
```typescript
const ENGLISH_PROFANITY: string[] = [
  // Common English offensive words (20-30 entries)
];

const URDU_PROFANITY: string[] = [
  // Roman Urdu/Roman Hindi offensive words (15-20 entries)
  // chutiya, bhenchod, madarchod, gandu, kameena, haramkhor, etc.
];
```

### RefusalMessage (NEW, in guardrails.ts)

| Field | Type | Description |
|-------|------|-------------|
| message | string | The polite refusal text |
| type | "offtopic" \| "abuse" | Category of refusal |

**Implementation**:
```typescript
const OFFTOPIC_REFUSALS: string[] = [
  "Sir, the question you asked isn't relevant right now; please ask questions related to our restaurant. JazakAllah Sir.",
  "I can only assist with Ghousia Golden Spoon's menu, orders, and restaurant information. Please ask something related. Thank you.",
  "That's outside my area of expertise. I can help you with our menu, pricing, delivery, or branch locations. Shukriya.",
  "I'm here to help you with everything about Ghousia Golden Spoon — our menu, orders, branches, and more. Please ask a relevant question. JazakAllah.",
  "For questions unrelated to our restaurant, I'm unable to help. But I'd be happy to assist you with our menu or orders! Thank you.",
];

const ABUSE_REFUSALS: string[] = [
  "Sir, please maintain a respectful tone. I'm here to help you with our restaurant information. JazakAllah Sir.",
  "We value respectful communication. Please ask questions related to our menu or services. Thank you.",
  "I'm not able to respond to that, but I'd be happy to help you with our menu, orders, or restaurant details. Shukriya.",
];
```

### WebsiteContext (NEW, in website-context.ts)

| Builder Function | Source | Returns |
|------------------|--------|---------|
| `buildMenuContext()` | `menu-data.ts` | All 13 categories and 41 items with prices and descriptions |
| `buildBranchContext()` | `branches-data.ts` | All 3 branches and 2 family halls with addresses |
| `buildAboutContext()` | Hardcoded | Origin story, cooking philosophy, values |
| `buildFAQContext()` | Hardcoded | All 10 FAQ Q&As |
| `buildTestimonialContext()` | `testimonials-data.ts` | 10 representative customer reviews |
| `buildWebsiteContext()` | All above | Combined context string |

### SystemPrompt (NEW, in groq.ts)

| Field | Type | Description |
|-------|------|-------------|
| guardrailRules | string | Critical rules for the AI assistant |
| restaurantInfo | string | Static restaurant details (address, phones, hours) |
| websiteData | string | Dynamic context from buildWebsiteContext() |

**Note**: This is a function (`buildSystemPrompt()`) that returns a string, not a database entity.

## State Transitions

### Chat Session State

```
IDLE → RECEIVING_MESSAGE → PROCESSING →
  ├─ Abuse detected → RETURNING_ABUSE_REFUSAL → IDLE
  ├─ Off-topic → RETURNING_OFFTOPIC_REFUSAL → IDLE
  ├─ Message too long → RETURNING_LENGTH_NOTICE → IDLE
  ├─ Order intent detected → RETURNING_ORDER_CONFIRMATION → IDLE
  └─ Normal message → CALLING_GROQ → RETURNING_RESPONSE → IDLE
```

## Validation Rules

### Message Length
- Minimum: 1 character (empty messages rejected by existing validation)
- Maximum: 500 characters (new constraint)
- Rejection message: "Please keep your message short (under 500 characters). Thank you."

### Profanity Detection
- Case-insensitive matching
- Word boundary detection (avoid matching partial words)
- Normalization: lowercase, remove special characters before matching

### Context Check
- At least one restaurant-related keyword must be present
- Keywords are case-insensitive
- If no keywords found, message is treated as off-topic

### Closing Salutation
- Not added to every response
- Approximately every 3rd-4th message
- Never consecutive identical closings
- Only added if not already present at the end of the response
