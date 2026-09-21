# Quickstart: Chatbot Guardrails & Dynamic Data

**Feature**: 001-chatbot-guardrails
**Date**: 2026-09-18

## Prerequisites

- Node.js 18+ installed
- `.env.local` with `GROQ_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Run `npm install` to install dependencies

## Setup

```bash
# Checkout the feature branch
git checkout 001-chatbot-guardrails

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

## Testing

### 1. Scrollbar Fix

1. Open http://localhost:3000
2. Click the chatbot icon (bottom-right)
3. Send 5+ messages
4. Verify you can scroll up and down through the conversation
5. Verify the scrollbar is visible on the right side
6. Verify scrolling to bottom happens automatically when new messages arrive

### 2. Off-Topic Refusal

1. Open the chatbot
2. Send: "What is Python?"
3. Verify you get a polite refusal like: "Sir, the question you asked isn't relevant right now; please ask questions related to our restaurant. JazakAllah Sir."
4. Send: "Tell me about cricket"
5. Verify you get a DIFFERENT refusal variation
6. Send: "What's on your menu?"
7. Verify you get a normal menu answer (not a refusal)

### 3. Abusive Language Handling

1. Open the chatbot
2. Send a message containing offensive language (English or Roman Urdu)
3. Verify you get a polite refusal like: "Sir, please maintain a respectful tone. I'm here to help you with our restaurant information. JazakAllah Sir."
4. Verify the offensive content is NOT echoed back

### 4. Complete Restaurant Knowledge

1. Open the chatbot
2. Ask: "Where are your branches?" → Should list all 3 branches
3. Ask: "Do you deliver to Clifton?" → Should confirm delivery to all Karachi
4. Ask: "What's your cooking philosophy?" → Should describe charcoal grilling, hand-ground spices
5. Ask: "Do you have vegetarian options?" → Should list Paneer Karahi, French Fries, Naan, etc.
6. Ask: "What payment methods do you accept?" → Should explain Cash on Delivery
7. Ask: "What are your hours?" → Should say 5:30 PM - 2:00 AM

### 5. Auto-Refresh

1. Add a new menu item to `src/lib/menu-data.ts`
2. Deploy to Vercel (or restart dev server)
3. Ask the chatbot about the new item
4. Verify it knows about the new item

### 6. Natural Closing Salutations

1. Send 10 different questions
2. Count how many responses end with "JazakAllah Sir", "Thank you", or "Shukriya"
3. Should be approximately 2-4 out of 10 (not all 10)
4. Verify no two consecutive responses end with the same closing

### 7. Message Length Limit

1. Send a message longer than 500 characters
2. Verify you get: "Please keep your message short (under 500 characters). Thank you."

## Build

```bash
# Run lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Files to Modify

| File | Action |
|------|--------|
| `src/lib/guardrails.ts` | Create — abuse detection, context check, refusal messages |
| `src/lib/website-context.ts` | Create — dynamic data builders for all content |
| `src/lib/groq.ts` | Modify — rewrite with `buildSystemPrompt()` + guardrails |
| `src/lib/menu-data.ts` | Modify — export `buildMenuContext()` function |
| `src/lib/branches-data.ts` | Modify — export `buildBranchContext()` function |
| `src/lib/testimonials-data.ts` | Modify — export `buildTestimonialContext()` function |
| `src/app/api/chat/route.ts` | Modify — add abuse detection, length limit, dynamic prompt |
| `src/components/chat/GroqChatWidget.tsx` | Modify — fix scroll container height |
| `src/app/globals.css` | Modify — improve scrollbar visibility |
