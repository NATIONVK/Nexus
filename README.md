# NEXUS AI

**Your Personal Intelligence. Your Digital Universe.**

NEXUS AI is the intelligence layer of a much larger long-term project: **NEXUS × HACKER PROTOCOL**, an expandable AI-powered 3D universe.

## Combined universe vision

- **NEXUS AI:** conversational intelligence, memory, voice, agents, personality, and an embodied AI avatar.
- **HACKER PROTOCOL: CYBER WORLD:** a large interactive 3D world with exploration, missions, hacker labs, lifelike characters, NPCs, and multiplayer ambitions.
- **Shared universe:** common identity/session contracts, world state, character presence, and versioned integration APIs.

## Confirmed product decisions

- **Primary platform: Android.**
- PC and Web are possible secondary platforms.
- Development is organized into **50 major phases**.
- No fixed APK or total-world storage ceiling. Use the storage genuinely required for the intended content and quality.
- High-detail 3D environments and lifelike full-body human characters are core goals.
- Use streaming, downloadable content, LOD, caching, and device-quality profiles so large content does not overwhelm RAM, CPU, GPU, battery, or thermal limits.
- The earlier 200–500 MB idea is superseded; it is not a maximum.

## This repository

`NATIONVK/Nexus` is the canonical repository for NEXUS AI source code, services, tests, documentation, and NEXUS-side integration. HACKER PROTOCOL will use a separate game repository when initialized.

The current codebase is an early foundation, not the completed 3D universe. The roadmap describes future work; features must not be described as implemented until coded and verified.

## Current stack foundation

- NEXUS frontend: React + Vite
- NEXUS backend: Node.js + Express
- Persistence: SQLite for initial local development
- NEXUS Android wrapper: Capacitor configuration
- AI providers: server-side Gemini and OpenAI adapters
- **Provisional HACKER PROTOCOL game engine:** Godot 4.7.x stable, GDScript, Mobile renderer. See [ADR-001](docs/decisions/ADR-001-android-game-engine.md); this requires an on-device vertical-slice validation and is not yet a completed game runtime.
- Quality: automated tests and GitHub Actions

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env
# Add a provider key to .env (server-side only)
npm run dev
```

Web app: http://localhost:5173  
API health: http://localhost:8787/api/health

## Android packaging

```bash
npm run android:add
npm run android:sync
```

Build/sign the generated Android project using Android Studio and an Android SDK. The deployed API must be reachable by the device.

## Development principles

1. Work in the canonical NEXUS repository for NEXUS-side features.
2. Preserve working functionality and inspect current code before each update.
3. Implement one coherent milestone at a time.
4. Test and build before declaring a milestone complete.
5. Never claim an APK, workflow, provider, or deployment succeeded without verification.
6. Keep secrets out of Git and client-side bundles.
7. Require approval for consequential external or destructive agent actions.
8. Document limitations and known issues honestly.

See [the 50-phase roadmap](docs/ROADMAP.md), [architecture](docs/ARCHITECTURE.md), [engine decision](docs/decisions/ADR-001-android-game-engine.md), and [security model](docs/SECURITY.md).
