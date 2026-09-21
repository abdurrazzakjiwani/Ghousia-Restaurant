# Quickstart: ElevenLabs Voice Agent Integration

**Date**: 2026-09-17  
**Feature**: 007-spooni-voice-agent

## What This Feature Does

Replaces the text-based Groq chatbot with ElevenLabs voice agent SPOONI:
- Customers click a floating button and speak naturally
- SPOONI responds with voice (menu info, ordering, reservations)
- Zero ElevenLabs branding visible anywhere
- Old chatbot code archived for reference

## Prerequisites

- ElevenLabs agent configured (SPOONI) with agent ID `agent_8401m2qjrwryfh2b900egeqdnc7m`
- Agent set to public access (no auth required)
- Website served over HTTPS (required for microphone)
- Existing WhatsApp button and all UI elements unchanged

## Quick Start

### 1. Create SpooniWidget Component

Create `src/components/chat/SpooniWidget.tsx`:
- `"use client"` component
- Load `@elevenlabs/convai-widget-embed` via `next/script` with `strategy="lazyOnload"`
- Render `<elevenlabs-convai>` web component with:
  - `agent-id="agent_8401m2qjrwryfh2b900egeqdnc7m"`
  - `disable-banner` attribute
  - `variant="compact"` (floating button)
  - Custom brand colors and text labels
- Handle script load/error states for fallback UI

### 2. Update Layout

Edit `src/app/layout.tsx`:
- Remove `import ChatWidget from "@/components/chat/ChatWidget"`
- Add `import SpooniWidget from "@/components/chat/SpooniWidget"`
- Replace `<ChatWidget />` with `<SpooniWidget />`

### 3. Add Branding Suppression CSS

Edit `src/app/globals.css`:
- Add CSS to hide any residual ElevenLabs branding via shadow DOM selectors
- Hide banner, footer, and tooltip elements

### 4. Archive Old Chatbot Files

Move to `archive/chat/`:
- `src/components/chat/ChatWidget.tsx`
- `src/components/chat/ChatMessage.tsx`
- `src/hooks/useChat.ts`
- `src/app/api/chat/route.ts`

### 5. Build & Deploy

- Run `npm run build` — verify no compilation errors
- Run `npm run lint` — verify no lint errors
- Deploy to Vercel with `--force`
- Visually inspect widget for zero ElevenLabs branding

## File Change Summary

| Category | New Files | Modified Files | Archived Files |
|----------|-----------|----------------|----------------|
| Components | 1 (SpooniWidget.tsx) | 0 | 2 (ChatWidget, ChatMessage) |
| Layout | 0 | 1 (layout.tsx) | 0 |
| CSS | 0 | 1 (globals.css) | 0 |
| Hooks | 0 | 0 | 1 (useChat.ts) |
| API | 0 | 0 | 1 (route.ts) |
| **Total** | **1** | **2** | **4** |
