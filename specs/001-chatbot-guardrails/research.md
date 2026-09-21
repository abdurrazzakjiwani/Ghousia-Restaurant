# Research: Chatbot Guardrails & Dynamic Data

**Feature**: 001-chatbot-guardrails
**Date**: 2026-09-18
**Status**: Complete

## R1: Keyword-Based Profanity Detection in TypeScript

**Decision**: Use a simple array-based keyword matching approach with case-insensitive regex.

**Rationale**:
- The restaurant needs to detect English and Roman Urdu profanity in user messages
- No external API or AI-based content moderation needed for this use case
- Simple keyword matching is fast, deterministic, and sufficient for catching obvious profanity
- Can be extended later if needed

**Alternatives considered**:
- External content moderation API (e.g., OpenAI moderation endpoint): Rejected due to cost, latency, and dependency on external service
- Machine learning classifier: Overkill for this use case, requires training data
- Simple includes() check: Rejected because it doesn't handle variations (e.g., "chutiya" vs "chutia")

**Implementation approach**:
```typescript
// Normalize input: lowercase, remove special characters
// Check against profanity keyword arrays using regex word boundaries
// Return boolean result
```

**Keywords to detect**:
- English: Common offensive words (20-30 entries)
- Roman Urdu/Roman Hindi: Common Pakistani offensive words (15-20 entries)
  - chutiya, chutia, bhenchod, bhenchod, madarchod, madarchod, gandu, kameena, kameenay, haramkhor, saala, salay, bakwas, bewakoof, pagal, ullu, etc.

## R2: Context Restriction Pattern

**Decision**: Use keyword-based context checking with a comprehensive list of restaurant-related terms.

**Rationale**:
- The chatbot should only answer restaurant-related questions
- Need to distinguish between restaurant-related and off-topic messages
- Keyword matching is fast and deterministic
- Can be tuned by adding/removing keywords

**Alternatives considered**:
- LLM-based classification (ask Groq to classify the message first): Rejected due to extra API call cost and latency
- Embedding-based similarity: Overkill for this use case
- Simple regex patterns: Too rigid, would miss many valid restaurant questions

**Implementation approach**:
```typescript
// Define comprehensive list of restaurant-related keywords
// Check if message contains at least one keyword
// If no keywords found, treat as off-topic
// Keywords: menu, order, price, delivery, branch, hours, food, karahi, BBQ,
//           biryani, burger, sandwich, broast, kebab, chargha, handi, pasta,
//           roll, fries, naan, salad, raita, lassi, coke, sprite, water,
//           reserve, reservation, catering, vegetarian, phone, address,
//           location, contact, pay, payment, cash, about, story, philosophy,
//           values, review, testimonial, recommend, best, popular, favorite,
//           spicy, taste, quality, fresh, hot, cold, dine, pickup, takeaway,
//           family, hall, event, wedding, dawat, open, close, timing,
//           available, cost, charges, bill, discount, deal, combo, special,
//           featured, chicken, mutton, beef, fish, prawn, paneer, noodle,
//           rice, manchurian, chili, wings, keema, seekh, reshmi, tandoori,
//           grill, fried, roasted, masala, platter, leg, piece, club,
//           paratha, shawarma, roll, wraps, zinger, club, etc.
```

## R3: Dynamic System Prompt Building

**Decision**: Build the system prompt dynamically from data files on each API request.

**Rationale**:
- When data files (menu-data.ts, branches-data.ts, etc.) are updated and deployed, the chatbot automatically picks up the changes
- No caching, no database, no re-embedding needed
- Next.js API routes are serverless and fresh each time
- Simple and maintainable

**Alternatives considered**:
- Cache the system prompt with TTL: Not needed because Next.js serverless functions don't persist state between invocations
- Store in Supabase and query: Extra complexity, not needed when data files are the source of truth
- Pre-build at startup: Not applicable in serverless environment

**Implementation approach**:
```typescript
// website-context.ts exports builder functions:
// - buildMenuContext(): reads from menu-data.ts
// - buildBranchContext(): reads from branches-data.ts
// - buildAboutContext(): returns hardcoded about page content
// - buildFAQContext(): returns hardcoded FAQ content
// - buildTestimonialContext(): returns representative testimonials
// - buildWebsiteContext(): combines all of the above

// groq.ts exports buildSystemPrompt():
// - Combines guardrail rules + dynamic website context
// - Called on each API request
```

## R4: Natural Closing Salutations

**Decision**: Use a counter-based approach in the API route to track when to add closings.

**Rationale**:
- User wants closings on approximately every 3rd-4th message, not every message
- No consecutive identical closings
- Needs to feel natural, not robotic

**Alternatives considered**:
- Random 25% chance: Could lead to consecutive closings or long gaps
- LLM-based decision: Extra token usage, not needed for this simple logic
- Fixed pattern (every 3rd message): Too predictable

**Implementation approach**:
```typescript
// In the API route, maintain a message counter per session (or use history length)
// After Groq responds, check if closing should be added:
// - If (messageCount % 3 === 0 || messageCount % 4 === 0): ~25-33% chance
// - Track last closing used to prevent consecutive identical closings
// - Pick from array: ["JazakAllah Sir", "Thank you", "Shukriya"]
// - Only add if not already present at the end of the response
```

**Note**: Since chat state is in-memory and per-session, the counter is simple. If the user sends 10 messages, approximately 3-4 will have closings.

## R5: Scrollbar CSS Best Practices

**Decision**: Use CSS `overflow-y: auto` with `min-h-0` on the flex child, plus custom scrollbar styling.

**Rationale**:
- The current `h-80` + `flex-1` combination doesn't properly constrain height in flex layout
- `min-h-0` allows the flex child to shrink below its content size, enabling overflow
- Custom scrollbar styling with the restaurant's gradient colors
- Cross-browser support via webkit and Firefox scrollbar APIs

**Alternatives considered**:
- Fixed height without flex: Would break the overall layout
- JavaScript-based scroll: Unnecessary when CSS handles it
- Third-party scrollbar library: Overkill for this use case

**Implementation approach**:
```css
/* GroqChatWidget.tsx */
.messages-container {
  flex: 1;
  min-h-0;
  overflow-y: auto;
  max-h: 320px; /* replaces h-80 */
}

/* globals.css */
.chat-scroll::-webkit-scrollbar {
  width: 8px;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #f59e0b, #ea580c);
  border-radius: 4px;
  transition: background 0.2s ease;
}
.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: #f59e0b transparent;
}
```

## R6: Error Handling Patterns

**Decision**: Return user-friendly JSON responses with appropriate HTTP status codes.

**Rationale**:
- All error responses should be polite and helpful
- Include suggestions for what the user can do instead
- Maintain consistent response structure

**Implementation approach**:
```typescript
// Abuse detected: 200 OK with refusal response (not an error)
// Off-topic: 200 OK with refusal response
// Message too long: 200 OK with length limit notice
// Groq API error: 200 OK with fallback message (existing behavior)
// Validation error: 400 Bad Request (existing behavior)
```

## R7: Profanity List Sources

**Decision**: Curate a custom list of English and Roman Urdu profanity based on common Pakistani offensive language.

**Rationale**:
- Standard profanity lists may not cover Roman Urdu/Roman Hindi
- Need to include common variations and misspellings
- Can be extended over time

**Sources**:
- Common English profanity: Standard lists available online
- Roman Urdu/Hindi: Curated from common Pakistani offensive terms
- Note: The list should be reviewed periodically and updated as needed

**Keywords**:
- English: Common 2-letter through 10-letter offensive words
- Roman Urdu: chutiya, chutia, bhenchod, bhenchod, madarchod, madarchod, gandu, kameena, kameenay, haramkhor, saala, salay, bakwas, bewakoof, pagal (when used offensively), ullu, etc.
