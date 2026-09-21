# Research: ElevenLabs Voice Agent Integration

**Date**: 2026-09-17  
**Feature**: 007-spooni-voice-agent  
**Input**: Technical unknowns from spec

## Decisions

### 1. Widget Embedding Strategy

**Decision**: Use the official ElevenLabs web component `<elevenlabs-convai>` loaded via CDN script tag (`https://unpkg.com/@elevenlabs/convai-widget-embed`).

**Rationale**: 
- This is the officially supported embedding method for ElevenLabs Conversational AI agents
- The web component handles all voice I/O, WebSocket connections, and audio playback internally
- No need for npm dependencies — the CDN script is loaded asynchronously
- The widget works as a self-contained floating button (compact variant) matching the existing chatbot UX

**Alternatives considered**:
- ElevenLabs SDK (`@elevenlabs/api`): More control but requires backend setup for signed URLs, significantly more complexity for the same result
- Custom WebRTC implementation: Full control but would take weeks to build what the widget provides out of the box
- iframe embed: Less flexible, can't suppress branding, poor mobile experience

### 2. Branding Suppression Strategy

**Decision**: Use a two-layer approach: `disable-banner` attribute on the web component + CSS rules targeting shadow DOM and dynamic elements.

**Rationale**:
- The `disable-banner` attribute is the official way to hide "Powered by ElevenLabs" (confirmed in ElevenLabs docs and GitHub skills repo)
- CSS fallback rules provide belt-and-suspenders protection against branding that may appear through shadow DOM or future widget updates
- The widget renders inside a shadow DOM, so CSS must use `::part()` or deep selectors where possible

**Implementation**:
```html
<elevenlabs-convai agent-id="..." disable-banner></elevenlabs-convai>
```
```css
elevenlabs-convai { --elevenlabs-convai-banner-display: none !important; }
elevenlabs-convai::part(footer) { display: none !important; }
```

**Alternatives considered**:
- Browser DevTools to find and hide elements: Not maintainable, breaks on widget updates
- CSS `display: none` on specific class names: Fragile, class names change between versions
- Widget configuration only: May not cover all branding locations (shadow DOM, tooltips)

### 3. Script Loading Strategy

**Decision**: Load the ElevenLabs widget script via `next/script` with `strategy="lazyOnload"` to avoid blocking page rendering.

**Rationale**:
- `next/script` is the Next.js recommended way to load third-party scripts
- `lazyOnload` ensures the script loads after the main page content, preventing any impact on Lighthouse performance scores
- The widget script is ~50KB and only needed when the user clicks the FAB, so lazy loading is ideal

**Alternatives considered**:
- Regular `<script>` tag in `<head>`: Blocks rendering, hurts performance
- `strategy="afterInteractive"`: Loads sooner than needed, slightly impacts performance
- Dynamic `document.createElement('script')`: Works but bypasses Next.js script optimization

### 4. Widget Positioning Strategy

**Decision**: Use CSS custom properties and fixed positioning to place the widget FAB at the same location as the old chatbot (bottom-right, above WhatsApp button).

**Rationale**:
- The ElevenLabs widget uses CSS custom properties (`--elevenlabs-convai-widget-*`) for positioning
- The widget's default position is bottom-right, which matches the existing layout
- The WhatsApp button is at `bottom-6 right-6`, so the widget FAB needs to be at `bottom-24 right-6` (same as old chatbot)
- CSS can override the widget's default positioning to match exactly

**Alternatives considered**:
- Hide default widget and use custom trigger: More complex, loses built-in widget UX
- Accept default position: May conflict with WhatsApp button z-index

### 5. Archival Strategy

**Decision**: Move old chatbot files to `archive/chat/` directory at the repository root, preserving file structure and names.

**Rationale**:
- User specified "archive" (not delete) — preserves code for reference/rollback
- `archive/` at repo root is clear and obvious location
- Preserving the directory structure (`chat/`) makes it easy to understand what was archived
- Git history preserves the files anyway, but having them in `archive/` makes them browsable without git commands

**Alternatives considered**:
- Delete files entirely: User explicitly requested archival
- Move to `deprecated/` directory: Less clear naming
- Keep in place with `.deprecated` suffix: Clutters active codebase

### 6. Next.js Script Component Usage

**Decision**: Use `next/script` imported from `next/script` in the SpooniWidget client component.

**Rationale**:
- The widget must be loaded in a client component (`"use client"`)
- `next/script` with `strategy="lazyOnload"` is the correct pattern for third-party scripts in Next.js App Router
- The script must be loaded before the web component can be used
- Loading in the component (not layout) ensures the script is only loaded when the component mounts

**Alternatives considered**:
- Script in layout.tsx: Would load globally even if widget is hidden, wastes bandwidth
- Regular script tag: Doesn't integrate with Next.js script optimization
