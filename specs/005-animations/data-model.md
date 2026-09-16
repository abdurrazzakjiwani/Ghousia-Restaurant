# Data Model: Website Animations & Chatbot Scroll

**Feature**: 005-animations
**Date**: 2026-09-15

## Overview

This feature is purely visual/UI — it does not introduce new database entities or API changes. The "data model" here defines the animation configuration structures used in code.

## Animation Configuration Entities

### AnimationPreset

Defines timing and easing for a category of animations.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Identifier (e.g., "fadeInUp", "stagger") |
| `duration` | number | Animation duration in seconds |
| `delay` | number | Delay before animation starts (seconds) |
| `ease` | string | Easing function name |
| `viewport` | object | When to trigger (once, amount) |

### ScrollRevealConfig

Configuration for scroll-triggered reveal animations.

| Field | Type | Description |
|-------|------|-------------|
| `direction` | enum | "up", "down", "left", "right" — slide direction |
| `distance` | number | Slide distance in pixels (default: 20) |
| `duration` | number | Fade + slide duration (default: 0.4s) |
| `once` | boolean | Whether to animate only once (default: true) |
| `amount` | number | How much must be visible to trigger (0-1, default: 0.2) |

### HoverConfig

Configuration for hover micro-interactions.

| Field | Type | Description |
|-------|------|-------------|
| `scale` | number | Scale factor on hover (e.g., 1.02 for 2% larger) |
| `duration` | number | Transition duration (default: 0.15s) |
| `shadow` | boolean | Whether to deepen shadow on hover |

### ChatAnimationConfig

Configuration for chatbot animations.

| Field | Type | Description |
|-------|------|-------------|
| `openDuration` | number | Widget open animation duration (default: 0.2s) |
| `closeDuration` | number | Widget close animation duration (default: 0.15s) |
| `messageDuration` | number | Message entrance duration (default: 0.2s) |
| `slideDistance` | number | Open/close slide distance in pixels (default: 20) |

## State Transitions

### Chat Widget State

```
CLOSED --[click bubble]--> OPENING --[animation complete]--> OPEN
OPEN --[click close]--> CLOSING --[animation complete]--> CLOSED
```

### Scroll Reveal State

```
HIDDEN (opacity: 0, translated) --[enters viewport]--> REVEALING --[animation complete]--> VISIBLE (opacity: 1, no transform)
```

## Theme Colors for Scrollbar

| Mode | Thumb Color | Track Color | Hover Thumb |
|------|-------------|-------------|-------------|
| Light | `#667eea → #764ba2` gradient | transparent | Darker gradient |
| Dark | `#667eea → #764ba2` at 70% opacity | transparent | Darker gradient |
