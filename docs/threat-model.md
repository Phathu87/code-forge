# Threat model

Current flow: browser → same-origin Node.js API → SQLite on a persistent local volume. SMTP delivers verification/reset messages in production; development mail is local and ignored by Git. The server serves only dist assets. The old app is a preserved example, not part of the running server.

Assets: account credentials, sessions, source files, private drafts and future assessment evidence.

| Boundary | Risk | Current controls / remaining work |
|---|---|---|
| Browser → auth | Credential guessing, forged requests, token theft | Scrypt, request limits, origin/header checks, expiring HttpOnly sessions; production review pending |
| Learner → workspace | Cross-account reads/writes, overwritten edits | Session-derived owner and conditional revision updates; A/B and concurrent-save tests pass |
| Browser → draft storage | Shared-device exposure, cleared storage, multiple tabs | Account-scoped local draft, explicit status/download; broader recovery tests required |
| Recovery link → account | Replay and stolen sessions | Expiring single-use token; password reset revokes sessions |
| Learner code → host | Execution escape and resource abuse | No execution service enabled; isolation must be validated before enabling it |
| Public UI → trust claims | Simulated results mistaken for evidence | Test rewards and authoritative certificate routes disabled; remaining demo screens labelled |
| Operator → database/email | Exposed files, untested restore, mail failure | Private data excluded from Git; production requires SMTP/HTTPS; backups and alerting not yet configured |

No production security approval. Update this model when adding execution, public publishing, file uploads, assessment, external AI providers or native bridges.
