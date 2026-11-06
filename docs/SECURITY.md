# NEXUS AI — Security Requirements

## Secrets
- Never commit API keys, tokens, passwords, signing keys, or private credentials.
- Keep provider credentials in server-side environment secrets.
- Never expose secrets in Vite variables, browser bundles, Android assets, logs, or error responses.

## Data
- Authenticate users before storing private user content in a public deployment.
- Enforce ownership checks for every conversation, file, memory, and project query.
- Provide user controls to review, export, and delete stored information.
- Validate file type, size, and content before processing uploads.

## Autonomous actions
- Separate planning from execution.
- Show the action, target, and expected effect before consequential operations.
- Require explicit user approval before external writes, sending messages, publishing, purchases, repository mutations, or destructive actions.
- Provide cancellation where possible and maintain an audit log.
- Treat webpages, documents, and tool output as untrusted data, never as instructions that override policy.

## Reliability
- Validate inputs, limit request sizes, apply rate limits, and use bounded timeouts.
- Avoid unbounded automatic retries.
- Report errors honestly; never claim an action succeeded without a confirmed result.
