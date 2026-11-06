# ADR-001: Android-first 3D game engine

- **Status:** Provisional selection for Phase 1; validation prototype required.
- **Date:** 2026-11-06
- **Decision owners:** NEXUS × HACKER PROTOCOL project

## Context

The shared universe targets Android first. The project owner currently develops from an Android phone, so the workflow must not assume a desktop-only editor is always available. The game also has ambitious goals: a large streamed world, detailed full-body human characters, animation, AI-driven NPCs, and scalable visual quality.

The current `NATIONVK/Nexus` repository is a React/Express AI service foundation. It is not a 3D game project and should not be converted into a monolithic game repository.

## Options reviewed

### Godot 4.x (GDScript)

- Official Android editor exists and can edit projects directly on Android.
- Android export is supported; Godot documents direct Android-editor export workflows.
- GDScript avoids the Android editor's current lack of C# support.
- Mobile renderer and scalable assets are suitable for an Android-first vertical slice.
- Important limitation: the official Android editor is experimental and its UI is not yet touch-optimized; a hardware keyboard and mouse are strongly recommended.
- High-end photorealism must be validated with real character assets and device profiling; do not assume desktop-quality effects run on every phone.

### Unreal Engine 5.x

- Strong candidate when maximum visual fidelity and advanced human rendering are the overriding priorities.
- Official Android workflow requires Unreal Editor and a development computer/toolchain; this is a poor fit for a phone-only editing workflow.
- Keep as a future reconsideration if a desktop/cloud workstation becomes available and the Godot vertical slice cannot meet the approved visual target.

### Unity 6

- Mature Android player support and a broad mobile ecosystem.
- The Unity Editor workflow is desktop-based, so it does not solve the current phone-only authoring constraint as directly as Godot's Android editor.

## Decision

Use **Godot 4.7.x stable, GDScript, and the Mobile renderer** as the provisional HACKER PROTOCOL game-engine baseline for Phase 1.

Keep the NEXUS AI service as a separate React/Express system. The future Godot game client will communicate with NEXUS through authenticated, versioned HTTPS APIs and explicit shared-universe schemas.

This is a practical workflow decision, not a claim that Godot automatically delivers Unreal-level photorealism. Human assets, lighting, skin/hair materials, animation quality, and performance must be demonstrated in a vertical slice before the engine choice is considered validated.

## vivo Y29 test profile

The owner identified the primary test device as vivo Y29. The Bangladesh official Y29 4G product listing specifies Snapdragon 685, Adreno 610, Android 15/Funtouch OS 15 at launch, 6 GB or 8 GB RAM configurations, eMMC 5.1 storage, and a 1608×720 120 Hz display. The owner has confirmed 6 GB physical RAM (Extended RAM excluded). Exact model code, storage size, installed OS build, and GPU driver/API support remain unverified on the actual handset.

Proposed initial graphics target:
- Stable 30 FPS, not 120 FPS.
- 1608×720 output with dynamic 0.70–0.90 render-scale starting range.
- Test Mobile (Vulkan) and Compatibility (OpenGL) builds on-device before locking renderer.
- Baked lighting for most static world geometry, few dynamic lights, limited shadow casters, selective reflections, restrained post-processing.
- Compressed textures/mipmaps, mesh LOD, occlusion, instancing, streamed world cells, and bounded caches.
- One detailed hero character in the first vertical slice; lower-detail NPCs later.
- Profile a sustained 10-minute test and record frame-time, memory, temperature/thermal state, and battery drain.

These are proposed targets, not results. See [vivo Y29 device profile](../VIVO-Y29-DEVICE-PROFILE.md).

## Validation gates before locking the engine

1. Create a minimal Godot Android project with GDScript and test both Mobile and Compatibility renderers.
2. Build and install debug APKs on the owner's actual vivo Y29.
3. Verify touch controls, camera movement, one streamed test environment, and one rigged human character.
4. Record exact model code, physical RAM, storage, Android build, graphics API/driver, frame-time percentiles, memory, thermals, and install size.
5. Test low/medium/high quality profiles and verify graceful fallback.
6. Confirm the project can be built reproducibly in CI or a documented Android workflow.
7. Review visual quality against the intended human-character target.

If validation fails, compare alternatives again rather than silently accepting poor performance or claiming the engine is final.

## Source references

- [vivo Bangladesh — Y29 specifications](https://www.vivo.com/bd/products/param/y29)
- [Godot system requirements](https://docs.godotengine.org/en/latest/about/system_requirements.html)
- [Godot renderer overview](https://docs.godotengine.org/en/latest/tutorials/rendering/renderers.html)
- [Godot Android download and editor notes](https://godotengine.org/download/android/)
- [Godot Android export documentation](https://docs.godotengine.org/en/latest/tutorials/export/exporting_for_android.html)
- [Unreal Engine Android Quick Start](https://dev.epicgames.com/documentation/unreal-engine/android-quick-start)
- [Unity 6 Android player requirements](https://docs.unity.com/en-us/engine/6000.0/manual/get-started/install-and-upgrade/getting-started-installing-unity/system-requirements)

## Consequences

- Game code will use GDScript initially; do not introduce C# dependencies into the Android-editor workflow.
- HACKER PROTOCOL should live in its own repository, separate from `NATIONVK/Nexus`.
- Keep assets modular and stream world regions; storage has no fixed ceiling, but runtime RAM, GPU, thermal, battery, and network budgets remain real constraints.
- Keep engine-specific code behind clear game-client boundaries to make a future engine migration possible if justified by measured results.
- Do not mark Phase 1 complete until the Android vertical slice has been built and tested on the actual target phone.
