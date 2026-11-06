# NEXUS AI

**Your Personal Intelligence. Your Digital Universe.**

NEXUS AI is a long-term, advanced personal-intelligence platform for Android and Web. The project is designed to grow through small, reviewable, tested milestones rather than one unverified code dump.

## Product vision

- Bilingual Bangla + English AI assistant
- Modular AI provider layer (Gemini and OpenAI first)
- Persistent conversations and user-controlled neural memory
- Autonomous task planning and specialized agents
- Voice interaction
- Coding and GitHub intelligence
- Browser automation with explicit approval for consequential actions
- Cinematic, accessible, responsive interface
- Android application and web companion

## Repository status

**Milestone 0 — Foundation bootstrap.** This repository is the canonical home for all NEXUS AI source code, documentation, tests, and release workflows.

The first implementation milestone is a working AI chat foundation. Later roadmap capabilities must not be presented as implemented until they are coded and tested.

## Planned stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Persistence: SQLite for the initial single-instance development setup
- Mobile packaging: Capacitor for Android
- Providers: server-side Gemini and OpenAI adapters
- Quality: automated tests, build checks, security review, and GitHub Actions

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env
# Add at least one provider key to .env
npm run dev
```

Web app: http://localhost:5173  
API health: http://localhost:8787/api/health

Never put provider keys in frontend variables, Android assets, source control, screenshots, or logs. Use server-side environment secrets.

## Android packaging

```bash
npm run android:add
npm run android:sync
```

Build/sign the generated Android project using Android Studio and an Android SDK. The deployed API must be reachable by the device.

## Development principles

1. Work only in this repository: `NATIONVK/Nexus`.
2. Preserve working features and review the existing code before every update.
3. Implement one coherent milestone at a time.
4. Add tests and run them before declaring a milestone complete.
5. Never claim a build, provider connection, deployment, or APK succeeded without verified evidence.
6. Keep secrets out of Git.
7. Require user confirmation before consequential external or destructive agent actions.
8. Document limitations and known issues honestly.

See [the roadmap](docs/ROADMAP.md), [architecture](docs/ARCHITECTURE.md), and [security model](docs/SECURITY.md).
