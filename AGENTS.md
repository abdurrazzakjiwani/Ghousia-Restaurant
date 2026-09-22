# ghousia_golden_web Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-09-14

## Active Technologies
- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), Tailwind CSS, Supabase JS Client, Groq SDK (Llama 3.3 70B), Lucide React (003-menu-images-chatbot-fix)
- Supabase PostgreSQL (existing 8 tables, no schema changes needed) (003-menu-images-chatbot-fix)
- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion (NEW) (005-animations)
- N/A (no new data entities) (005-animations)
- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0 (existing) (006-worldclass-web)
- N/A (no new data entities — the voice agent is managed entirely by ElevenLabs) (007-spooni-voice-agent)
- TypeScript 5.x, Node.js 18+, Next.js 14 (App Router) + React 18.3, Tailwind CSS, Groq SDK (`groq-sdk`), Supabase JS Client (`@supabase/supabase-js`), Lucide React, Framer Motion (001-chatbot-guardrails)
- Supabase PostgreSQL (existing `customer_orders` table), in-memory chat state (no persistence between sessions) (001-chatbot-guardrails)
- TypeScript 5.x, Node.js 18+, Next.js 14 (App Router) + React 18.3, Tailwind CSS 3.x, Groq SDK, Supabase JS Client (008-menu-replace)
- Supabase PostgreSQL (existing `customer_orders` table), static data files (no database for menu) (008-menu-replace)
- TypeScript 5.x, Node.js 18+, Next.js 14 (App Router) + React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Lucide React (009-ui-checkout-enhancements)
- localStorage for cart (existing `useCart` hook), Supabase PostgreSQL for optional order persistence (009-ui-checkout-enhancements)
- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Supabase JS Client, Lucide React (011-fix-bugs-orders-email)
- Supabase PostgreSQL (existing `customer_orders` table, extended with new columns) (011-fix-bugs-orders-email)
- N/A (no data changes) (001-ui-fixes)
- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (001-location-dish-theme)
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (001-location-dish-theme)
- TypeScript 5.x, Node.js 18+ + Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion) (015-homepage-ux-fixes)
- localStorage for cart (existing), static menu data (015-homepage-ux-fixes)
- Node.js 18+, Next.js 16 (App Router), React 19 + Tailwind CSS 4, Groq SDK, @supabase/supabase-js, framer-motion (017-post-deploy-fixes)
- localStorage (for cart), Supabase PostgreSQL (for order persistence) (017-post-deploy-fixes)

- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), Tailwind CSS, Supabase JS Client, Groq SDK, Lucide React (001-restaurant-website)
- TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0, Lucide React, next/font/google (Poppins, Inter) (001-restaurant-redesign)
- N/A (no new data entities — all data is static/hardcoded) (001-restaurant-redesign)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.x, Node.js 18+: Follow standard conventions

## Recent Changes
- 017-post-deploy-fixes: Added Node.js 18+, Next.js 16 (App Router), React 19 + Tailwind CSS 4, Groq SDK, @supabase/supabase-js, framer-motion
- 015-homepage-ux-fixes: Added TypeScript 5.x, Node.js 18+ + Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion)
- 013-ui-styling-updates: Added TypeScript 5.x, Node.js 18+ + Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x, Framer Motion 13.3.0


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
