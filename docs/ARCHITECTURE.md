# NEXUS AI — Initial Architecture

## Runtime topology

Android (Capacitor) / Web Browser → React UI → HTTPS JSON API → Express Server → Provider Adapters (Gemini/OpenAI) and SQLite.

## Boundaries
- src/: browser/mobile presentation and client-side state.
- server/: API, provider adapters, and persistence.
- docs/: product decisions, roadmap, architecture, and security.
- tests/: automated unit and integration coverage.

## Initial data model
Conversation: id, title, created_at, updated_at.  
Message: id, conversation_id, role, content, provider, model, created_at.

Provider credentials are read only by the server process from environment secrets. They must never be returned by API endpoints or embedded in the client bundle.

## Current limitations
The initial SQLite store is suitable only for a single server instance and local development. There is no authentication or per-user authorization yet. Do not expose this initial API publicly with private user data. Before multi-user deployment, add identity, ownership checks, migrations, backup/restore, and a production-grade database strategy.

The first chat endpoint uses request/response rather than streaming. Agent execution, memory, voice, browser automation, and GitHub actions are future phases until separately implemented and tested.
