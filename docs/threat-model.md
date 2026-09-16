# Threat model

Browser -> same-origin Node API -> Neon PostgreSQL on hosted preview, SQLite locally. Brevo HTTPS delivers transactional mail once configured; development outbox is local only. JSX is parsed/bundled by esbuild without executing source on the API, then rendered in an iframe with sandbox=allow-scripts, no same-origin grant and restrictive CSP. The original exercise is not served by the API.

| Boundary | Controls and remaining work |
|---|---|
| Browser to authentication | Password hashing, expiring hashed sessions, secure cookies, origin/header checks and rate limits. Hosting-proxy abuse review pending. |
| Account to private resources | Server-derived owner, revision comparison, A/B tests, password-confirmed export/deletion. |
| Learner source to compiler | Virtual files, path validation, package allowlist, source/output limits and compilation deadline. Compiler OS resource isolation remains incomplete. |
| Preview to platform | Opaque origin, blocked parent access, no cookies, restrictive network CSP. Browser resource-exhaustion/navigation matrix remains incomplete. |
| Server to database | TLS certificate verification, private credentials, parameterized queries, request-scoped connections and versioned schema. Production backup/restore still pending. |
| Server to mail | Server-only API key, timeout, generic provider failure. Real verified sender and delivery tests missing. |
| Operations to data | Logs omit tokens, bodies and query strings. Private support reader requires database access. Alert routing and offsite recovery not configured. |

No assessed XP, certificates, verified skills or employer decisions are produced. Local browser drafts remain sensitive device-local data. Production registration is closed; enabling preview registration requires named testers in the allowlist.
