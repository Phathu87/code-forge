# Security closeout

Status: BLOCK RELEASE. Date: 2026-09-17. Scope: 0.1.0 preview. No public security sign-off.

Implemented: scrypt passwords; hashed expiring sessions; HttpOnly/SameSite cookies, Secure in production; origin/header checks; database-backed rate limits; single-use verification/reset; session revocation; account-owned workspace/support records; revision conflicts; password-confirmed export/deletion; restricted React compilation and opaque iframe preview. Tests run locally and on an isolated Neon integration schema. Registration is closed on the hosted preview. Production preview registration requires an explicit tester allowlist.

Browser checks block parent DOM, cookie and API network access from the preview. These checks are not a full sandbox audit. Hostile navigation, browser CPU/memory exhaustion, compiler resource limits and complete execution infrastructure remain release blockers. The preview provides no assessed execution or authoritative test results.

Latest npm audit reports zero advisories. This is dependency evidence, not a guarantee of security. Outstanding: real email delivery, abuse testing behind the hosting proxy, reviewed disclosures, operator support routing, PostgreSQL recovery, offsite backups, alert delivery and critical device/accessibility QA. Browser drafts are not an encrypted vault.

Follow security-incident-response.md for suspected incidents. Preserve evidence before recovery and avoid unsupported impact claims.
