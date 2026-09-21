# API Contracts: ElevenLabs Voice Agent Integration

**Date**: 2026-09-17  
**Feature**: 007-spooni-voice-agent

## Summary

This feature has **no API contracts**. The ElevenLabs voice agent widget is a self-contained web component that communicates directly with ElevenLabs' servers via WebSocket. The website does not proxy, store, or process any voice conversation data.

## Existing API Endpoints (unchanged)

The following existing API routes continue to work unchanged:

- `POST /api/reviews` — Submit customer reviews
- `POST /api/reservations` — Book table reservations
- `POST /api/contacts` — Submit contact form
- `POST /api/orders` — Create WhatsApp orders
- `GET /api/reviews` — Fetch reviews
- `POST /api/chat` — **ARCHIVED** (old Groq chatbot, no longer needed)

## No New Endpoints

The SPOONI voice agent handles all conversation processing server-side at ElevenLabs. No new API endpoints are required for this feature.
