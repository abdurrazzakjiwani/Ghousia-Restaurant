# Quickstart: Ghousia Golden Spoon Restaurant Website

**Feature**: 001-restaurant-website  
**Date**: 2026-09-14

## Prerequisites

- Node.js 18+ (recommended: 20.x LTS)
- npm, yarn, or pnpm
- Git
- Supabase account (free tier)
- Groq API key

## Setup (5 minutes)

### 1. Clone and install

```bash
cd "D:\Abdur Razzak Jiwani Docs\ghousia_golden_web"
git checkout 001-restaurant-website
npm install
```

### 2. Environment Variables

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq AI
GROQ_API_KEY=your_groq_api_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=923013631555

# Restaurant Info
NEXT_PUBLIC_RESTAURANT_NAME=Ghousia Golden Spoon
NEXT_PUBLIC_RESTAURANT_PHONE1=0321-8221010
NEXT_PUBLIC_RESTAURANT_PHONE2=0301-3631555
NEXT_PUBLIC_RESTAURANT_ADDRESS=Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi
NEXT_PUBLIC_RESTAURANT_HOURS=5:30 PM - 2:00 AM
```

### 3. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy Project URL and Anon Key to `.env.local`
3. Go to SQL Editor → Run the schema from `data-model.md`
4. Seed data: Run INSERT statements for categories and menu items

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with navbar/footer |
| `src/app/page.tsx` | Home page |
| `src/app/menu/page.tsx` | Menu display with filters |
| `src/lib/supabase.ts` | Supabase client config |
| `src/lib/groq.ts` | Groq AI client config |
| `src/hooks/useCart.ts` | Shopping cart state |
| `src/hooks/useTheme.ts` | Dark mode state |
| `src/types/index.ts` | TypeScript interfaces |

## Testing Checklist

### Menu Display
- [ ] Home page loads with hero section
- [ ] Menu page shows all 13 categories
- [ ] Category filter works correctly
- [ ] Search filters items by name
- [ ] Items display image, name, price

### Ordering
- [ ] Add items to cart
- [ ] Cart persists across pages
- [ ] WhatsApp link generates correctly
- [ ] Floating WhatsApp button works

### Dark Mode
- [ ] Toggle switches theme
- [ ] Preference persists on reload
- [ ] All pages respect dark mode

### Forms
- [ ] Reservation form validates inputs
- [ ] Contact form submits successfully
- [ ] Review form validates rating

### Chatbot
- [ ] Chat widget opens/closes
- [ ] AI responds to menu questions
- [ ] Order flow generates WhatsApp link

## Common Issues

### Supabase Connection Error
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Ensure Supabase project is not paused

### Groq API Error
- Check `GROQ_API_KEY` is valid
- Groq free tier: 30 requests/minute

### WhatsApp Link Not Working
- Ensure phone number format: `923013631555` (no +, no spaces)
- Test: `https://wa.me/923013631555?text=Hello`

### Dark Mode Flash
- Ensure `useTheme` hook runs before first render
- Check `localStorage` is available (not in private browsing on some browsers)
