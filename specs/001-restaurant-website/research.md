# Research: Ghousia Golden Spoon Restaurant Website

**Feature**: 001-restaurant-website  
**Date**: 2026-09-14  
**Status**: Complete

## Decision Log

### D-001: Frontend Framework

**Decision**: Next.js 14 (App Router)  
**Rationale**: SSR/SSG for SEO, built-in API routes, React ecosystem, excellent deployment on Vercel  
**Alternatives considered**:
- React SPA (Vite): Rejected - poor SEO, no SSR
- Nuxt.js: Rejected - team familiarity with React
- Plain HTML/CSS: Rejected - no dynamic features, poor maintainability

### D-002: Styling Framework

**Decision**: Tailwind CSS  
**Rationale**: Utility-first, rapid prototyping, built-in dark mode support, responsive utilities  
**Alternatives considered**:
- CSS Modules: Rejected - more boilerplate, no utility classes
- Styled Components: Rejected - runtime overhead, SSR complications
- Chakra UI: Rejected - heavier bundle, less customization

### D-003: Database/Backend

**Decision**: Supabase (PostgreSQL)  
**Rationale**: Free tier generous, real-time subscriptions for order tracking, built-in auth for future CMS, auto-generated REST API  
**Alternatives considered**:
- Firebase: Rejected - vendor lock-in, NoSQL not ideal for relational data
- MongoDB Atlas: Rejected - less suitable for relational menu/order data
- Custom Node.js + PostgreSQL: Rejected - more maintenance overhead

### D-004: AI Chatbot

**Decision**: Groq API (Llama 3.3 70B Versatile)  
**Rationale**: Ultra-fast inference, free tier (30 RPM), function calling support for order extraction, Pakistan-friendly  
**Alternatives considered**:
- OpenAI GPT-4: Rejected - higher cost, slower
- Anthropic Claude: Rejected - no free tier, slower
- Local LLM: Rejected - requires GPU, too complex

### D-005: WhatsApp Integration

**Decision**: wa.me links (no Business API)  
**Rationale**: Free, no setup required, works on all devices, pre-filled messages via URL parameters  
**Alternatives considered**:
- WhatsApp Business API: Deferred to Phase 2 - requires business verification, monthly costs
- Direct `whatsapp://` scheme: Rejected - not all devices support it
- SMS fallback: Out of scope

### D-006: Map Integration

**Decision**: Google Maps Embed (free, no API key)  
**Rationale**: Free, no API key needed, sufficient for single location display  
**Alternatives considered**:
- Google Maps JavaScript API: Rejected - requires API key, billing
- Mapbox: Rejected - requires API key
- OpenStreetMap: Rejected - less accurate for Pakistan addresses

### D-007: Dark Mode Implementation

**Decision**: Tailwind CSS `dark:` variant with `localStorage` persistence  
**Rationale**: Native Tailwind support, no extra dependencies, system preference detection  
**Alternatives considered**:
- CSS variables + JS toggle: More manual work
- next-themes library: Adds dependency for simple use case
- OS-level only: No user control

### D-008: State Management

**Decision**: React Context API (useCart, useTheme, useChat)  
**Rationale**: Sufficient for app complexity, no extra dependencies, built into React  
**Alternatives considered**:
- Zustand: Overkill for this scope
- Redux Toolkit: Too verbose
- Jotai: Unnecessary atomic state

### D-009: Form Handling

**Decision**: Native HTML forms with client-side validation  
**Rationale**: Simple forms don't need heavy libraries, native validation sufficient  
**Alternatives considered**:
- React Hook Form: Added complexity for simple forms
- Formik: Heavier, more boilerplate

### D-010: Icon Library

**Decision**: Lucide React  
**Rationale**: Tree-shakeable, consistent design, 1000+ icons, React-native  
**Alternatives considered**:
- Heroicons: Fewer icons
- React Icons: Larger bundle, mixed icon sets
- Font Awesome: Heavier, licensing concerns

## Best Practices Identified

### Next.js App Router Patterns
- Use `loading.tsx` for Suspense boundaries
- Server Components by default, Client Components only when needed (interactivity)
- API routes in `src/app/api/` for serverless functions
- Metadata API for SEO per page

### Supabase Patterns
- Use Row Level Security (RLS) for data protection
- Use Supabase client for read operations
- Use server-side calls for write operations
- Real-time subscriptions for order tracking

### Groq API Patterns
- System prompt with full menu data for context
- Function calling for order item extraction
- Session-based chat history (last 10 messages)
- Fallback response for unrecognized inputs

### Dark Mode Patterns
- Respect `prefers-color-scheme` media query
- Persist preference in `localStorage`
- Apply `dark` class to `<html>` element
- Use Tailwind `dark:` prefix for all color overrides

## Research Sources

- Next.js 14 Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Groq API Documentation: https://console.groq.com/docs
- Tailwind CSS Dark Mode: https://tailwindcss.com/docs/dark-mode
- WhatsApp Click to Chat: https://faq.whatsapp.com/5913398998672934
