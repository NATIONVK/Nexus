# Android Test Device Profile — vivo Y29 (Bangladesh)

- **Role:** Primary Phase 1 development and runtime test device.
- **Device identified by owner:** vivo Y29.
- **Variant assumption:** Bangladesh official Y29 4G, model family shown on vivo Bangladesh product page. Confirm the exact model code in Settings before final compatibility sign-off.
- **OS at product launch:** Android 15 / Funtouch OS 15 (verify the installed build on the actual handset).
- **SoC:** Qualcomm Snapdragon 685.
- **GPU:** Qualcomm Adreno 610.
- **CPU:** Octa-core, 4 × up to 2.8 GHz + 4 × up to 1.9 GHz (official product specification).
- **Owner-confirmed physical RAM:** 6 GB (confirmed by owner; do not add Extended RAM to this figure).
- **RAM family/configurations:** LPDDR4X; official product configurations include 6 GB and 8 GB.
- **Storage configurations:** 128 GB or 256 GB eMMC 5.1; owner's exact capacity is not yet confirmed.
- **Display:** 1608 × 720, 120 Hz LCD.
- **Battery:** 6500 mAh typical.
- **Network:** 4G; Wi-Fi 2.4/5 GHz.

## Hardware assessment

This device is suitable as the first Android compatibility target for a carefully optimized 3D vertical slice. It is not a basis for promising a large photorealistic open world at high settings. The Adreno 610 is an entry-level mobile GPU; world size must be separated from the amount of content resident in memory and currently rendered.

Godot's current requirements list Vulkan 1.0 as the requirement for the Mobile renderer on Android and OpenGL ES 3.0 for Compatibility. The Y29's exact driver/API support must be checked on-device before selecting the final renderer. Do not infer Vulkan compatibility solely from the GPU name.

## Proposed initial graphics profile (targets, not measured results)

- Target frame rate: stable 30 FPS; do not target 120 FPS just because the screen supports 120 Hz.
- Output: native 1608 × 720 display.
- Initial 3D render scale: dynamic range approximately 0.70–0.90 of native resolution, tuned by measurement.
- Renderer: test Godot Mobile (Vulkan) first; also build a Compatibility (OpenGL) fallback test. Choose based on real-device results.
- Lighting: baked/static lighting for most environment surfaces; a small budget for dynamic lights.
- Shadows: limited dynamic shadow casters and distance; baked shadows for static geometry where suitable.
- Reflections: selective probes; avoid expensive full-screen reflection effects.
- Post-processing: restrained; avoid heavy screen-space effects on the baseline profile.
- Textures: compressed GPU formats and mipmaps; 512 px–1K for common props, up to 1K–2K for hero-character maps only after memory profiling.
- Geometry: mesh LODs, occlusion culling, instancing, and bounded visible object counts.
- World: stream small cells/regions asynchronously; unload distant cells; never load the full universe into RAM.
- Characters: one detailed player/hero character at a time in the initial vertical slice; lower-cost NPC LODs later.
- Effects: bounded particle counts, pooled effects, simplified transparent materials.
- Thermal/power: profile sustained sessions, not only short benchmark bursts; lower quality or frame rate when thermal pressure rises.

## Performance gates for the first vertical slice

1. Launch and run reliably on the actual Y29.
2. Hold a stable 30 FPS target in the small test district for a 10-minute sustained run; record frame-time percentiles rather than relying on a single FPS reading.
3. No crash, out-of-memory termination, or runaway memory growth during repeated region load/unload.
4. Record physical RAM configuration, free storage, Android build, GPU driver, Vulkan/OpenGL capability, peak memory, average and 1% low FPS, device temperature/thermal state, and battery drain.
5. Verify touch input, camera, character locomotion, and one region transition.
6. Test Mobile and Compatibility renderer APKs; choose default only after comparing real-device stability and quality.

These are proposed acceptance targets for the prototype, not claims that the phone has already passed them.

## Information still needed from the owner

- Exact model number / model code from Settings → About phone.
- Internal storage variant and available free space.
- Current Android version/build number.
- Internal storage variant and available free space.
- Current Android version/build number.
- Whether the phone is Y29 4G (Snapdragon 685) or a differently named regional variant.

## Sources

- [vivo Bangladesh — Y29 specifications](https://www.vivo.com/bd/products/param/y29)
- [vivo Bangladesh — Y29 product page](https://www.vivo.com/bd/products/y29)
- [Godot system requirements](https://docs.godotengine.org/en/latest/about/system_requirements.html)
- [Godot renderer overview](https://docs.godotengine.org/en/latest/tutorials/rendering/renderers.html)
