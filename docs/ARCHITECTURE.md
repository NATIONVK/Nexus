# NEXUS × HACKER PROTOCOL — Architecture Direction

## Product boundary

The combined product has two distinct applications connected by versioned contracts:

- **NEXUS AI** owns AI services: provider routing, conversations, memory, voice, agent planning, permissions, and NEXUS avatar intelligence.
- **HACKER PROTOCOL** owns the 3D game client: world rendering, player controls, environment, game rules, missions, NPC presentation, and game-specific persistence.
- **Shared universe contracts** define identity, session, avatar profile, world events, permissions, and save synchronization. They must be versioned and tested rather than tightly coupling unrelated codebases.

The canonical NEXUS repository is `NATIONVK/Nexus`. HACKER PROTOCOL will have a separate game repository.

## Primary platform and content strategy

Android is the primary platform. PC and Web may be secondary targets later.

There is no fixed APK or total-world storage ceiling. Large regions and high-detail content may be distributed as downloadable asset packs. The base install should contain only essential runtime and starter content.

Large storage capacity does not remove runtime limits. The client must use:
- Region/asset streaming and asynchronous loading.
- Level-of-detail, texture mipmaps, mesh simplification, and occlusion.
- Device-tier render profiles and configurable quality.
- Bounded caches and memory budgets.
- Background downloads with pause/resume, integrity verification, and version checks.
- Battery, thermal, network, and low-storage safeguards.
- Android scoped-storage and permission-compliant file handling.

The earlier 200–500 MB target is superseded and must not be treated as a maximum.

## Game engine direction

The provisional HACKER PROTOCOL baseline is **Godot 4.7.x stable + GDScript + Mobile renderer**, selected because the project owner currently develops from an Android phone and Godot provides an Android editor/export workflow.

This is not yet a fully validated final engine decision. The Android editor is experimental and its UI is not touch-optimized; hardware keyboard/mouse are recommended. C# is not available in the Android editor. A device-tested vertical slice is required before Phase 1 can be completed.

Unreal Engine remains a possible later alternative if a desktop/cloud workstation becomes available and measured visual-quality requirements cannot be met with the Godot prototype. See [ADR-001](decisions/ADR-001-android-game-engine.md).

## Lifelike character pipeline

The target is detailed human-like full-body characters with facial structure, skin, eyes, hair, clothing, hands, facial expressions, lip-sync, and believable movement. The implementation pipeline will need:
- Rigged human meshes and consistent skeleton standards.
- Animation retargeting and locomotion blending.
- Facial rigs/blend shapes and speech synchronization.
- Material and texture quality tiers.
- Character LOD and animation budgets for Android.
- Clear separation between player avatars, NEXUS embodied avatar, and simulated NPCs.

Photorealistic quality is a target, not a claim about current assets.

## AI integration topology (target)

Android 3D client ↔ authenticated NEXUS API ↔ AI orchestration/provider adapters ↔ memory and permissioned tools.

World events and character actions should pass through explicit schemas. AI-driven actions must be bounded by permissions, safety policy, rate limits, and user approval for consequential actions. Do not expose provider keys in the Android package.

## Current repository topology

Android (Capacitor wrapper) / Web Browser → React UI → HTTPS JSON API → Express Server → Provider Adapters (Gemini/OpenAI) and SQLite.

This is the current early NEXUS foundation, not the final 3D runtime. The separate Godot game client and shared-universe bridge remain future work.

## Current limitations

- The initial SQLite store is suitable only for a single server instance and local development.
- There is no authentication or per-user authorization yet; do not expose the initial API publicly with private user data.
- The current chat endpoint is request/response rather than streaming.
- No 3D game engine project, 3D world, human character assets, NPC simulation, multiplayer runtime, or downloadable world-content pipeline is implemented yet.
- Neural memory, autonomous agents, voice, and browser automation are roadmap items until separately implemented and tested.

## Architecture change policy

Record engine choices, API contracts, asset formats, minimum Android device tiers, performance budgets, and cross-repository integration decisions in version-controlled docs before implementing dependent phases.
