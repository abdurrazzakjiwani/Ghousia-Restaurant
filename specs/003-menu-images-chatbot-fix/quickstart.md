# Quickstart: Menu Images, Chatbot Fix & Page Upgrades

**Feature**: 003-menu-images-chatbot-fix  
**Branch**: `003-menu-images-chatbot-fix`

## Prerequisites

- Node.js 18+
- npm
- Git
- Groq API key in `.env.local` as `GROQ_API_KEY`

## Setup

```bash
git checkout 003-menu-images-chatbot-fix
npm install
npm run dev
```

Visit `http://localhost:3000`

## What Changed

### 1. Menu Images (39 items)

All menu items in `src/lib/menu-data.ts` now have `image_url` values pointing to Unsplash food photographs. Images render on:
- Home page featured section
- Menu page grid
- Each card shows the photograph with fallback gradient on load error

### 2. Chatbot Order Placement

Open the chat widget (bottom-right corner) and try:
- "I want to order a Zinger burger" → Shows order summary + WhatsApp button
- "Give me 2 Club Sandwiches and 1 French Fries" → Multi-item order
- "What do you recommend?" → Conversational response (no order button)

The chatbot now:
1. Detects order intent from keywords
2. Matches items against the 39-item menu
3. Generates a wa.me WhatsApp link with pre-filled order
4. Renders a clickable "Order on WhatsApp" button

### 3. Home Page

- Hero section with tagline, hours badge, and 3 CTAs (View Menu, Reserve Table, Order on WhatsApp)
- "Our Story" section with authentic restaurant narrative
- Stats section with real metrics

### 4. About Page

- Hero banner with restaurant story
- Journey timeline
- Cooking philosophy section
- Team descriptions
- Contact section with address, phones, hours, map embed

## Testing

```bash
npm run build    # Verify no build errors
npm run lint     # Verify no lint errors
npm test         # Run existing tests
```

### Manual Testing Checklist

- [ ] Home page loads with all images visible
- [ ] Menu page shows images for all 39 items
- [ ] Broken image fallback works (disconnect network, verify graceful fallback)
- [ ] Chatbot: type "I want to order a Zinger burger" → WhatsApp button appears
- [ ] Chatbot: click WhatsApp button → opens wa.me with correct order text
- [ ] Chatbot: type "What do you recommend?" → text response, no order button
- [ ] Chatbot: multi-item order works correctly
- [ ] About page has all sections with authentic content
- [ ] Dark mode works on all pages
- [ ] Mobile responsive on all pages
