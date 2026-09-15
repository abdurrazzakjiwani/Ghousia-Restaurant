# Research: Menu Images, Chatbot Fix & Page Upgrades

**Feature**: 003-menu-images-chatbot-fix  
**Date**: 2026-09-15

## R1: Unsplash Image URLs (No API Key)

**Decision**: Use direct `images.unsplash.com` photo URLs with query parameters for resizing.

**Rationale**: The `source.unsplash.com` service is deprecated. Direct `images.unsplash.com` URLs work without an API key and support dynamic resizing via Imgix parameters (`w`, `h`, `fit`, `q`, `auto`). The existing `next.config.js` has `images.unoptimized: true`, so `<img>` tags work directly. The `FeaturedMenu` component already renders `<img src={item.image_url}>` when `image_url` is present.

**URL format**:
```
https://images.unsplash.com/photo-{ID}?w=600&h=400&fit=crop&auto=format&q=80
```

**Alternatives considered**:
- `source.unsplash.com/featured/?{query}` — Deprecated, unreliable
- Pexels API — Requires API key, adds dependency
- Local image files — Increases repo size, requires hosting

**Next.js config**: Since `images.unoptimized: true`, standard `<img>` tags work. No `remotePatterns` config needed for unoptimized mode. However, if switched to optimized mode later, `images.unsplash.com` must be added to `remotePatterns`.

## R2: WhatsApp Order Link Format

**Decision**: Use `https://wa.me/923013631555?text={url-encoded-order}` format.

**Rationale**: WhatsApp's official click-to-chat format. Phone number in international format without `+`, spaces, or dashes. The `text` parameter accepts URL-encoded pre-filled messages. The existing `generateWhatsAppUrl()` in `utils.ts` already implements this pattern.

**Message format** (from existing `generateOrderMessage()`):
```
Assalam-o-Alaikum! I'd like to place an order:

1x Zinger Burger - Rs. 600
2x Club Sandwich - Rs. 1,000

Total: Rs. 1,600

Thank you!
```

**Alternatives considered**:
- `api.whatsapp.com/send?phone=...` — Longer URL, same functionality
- WhatsApp Business API — Requires business verification, costs money, overkill

## R3: Order Intent Detection (No External NLP)

**Decision**: Keyword-based intent detection with menu item matching, before LLM fallback.

**Rationale**: For a single-restaurant chatbot with a known menu of 39 items, keyword matching is sufficient and more reliable than sending every message to the LLM. The detection pipeline:

1. **Intent keywords**: Check for order-related words (`order`, `want`, `buy`, `give`, `add`, `get`, `have`, `take`, `please`, `send`)
2. **Item matching**: Tokenize message, match against menu item names using substring + fuzzy matching (Levenshtein distance for typo tolerance)
3. **Quantity extraction**: Regex for patterns like `2x`, `2 X`, `2 ` before item name; default to 1
4. **Multi-item parsing**: Split on conjunctions (`and`, `+`, `,`, `with`)
5. **Fallback**: If no items matched, send to LLM for conversational response

**Alternatives considered**:
- LLM-only approach — Current implementation, unreliable for order detection
- Rasa NLU — Overkill for 39 items, adds Python dependency
- OpenAI function calling — Adds cost, not needed for keyword matching

## R4: Conversation Context

**Decision**: Pass conversation history to the LLM API (last 10 messages).

**Rationale**: Currently the API route only sends the system prompt + current message, making the chatbot stateless. Adding history enables follow-up like "Add one more" or "Remove the fries." Store messages in client-side state (already done in `useChat.ts`), send last N messages to API.

**Alternatives considered**:
- Server-side session storage — Adds complexity, Supabase dependency for chat
- Redis — Additional infrastructure, not needed for single-restaurant scale

## R5: Image Fallback Strategy

**Decision**: Use `onError` handler on `<img>` tags to swap to a gradient placeholder with item name.

**Rationale**: Unsplash URLs are generally reliable but may be slow on poor connections. The `onError` event fires when an image fails to load. Swap `src` to empty string and show a CSS gradient fallback with the item name overlaid.

**Alternatives considered**:
- Next.js `<Image>` with `placeholder` prop — Requires optimized mode
- CSS `background-image` with fallback — More complex, same result
