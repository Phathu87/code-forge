# Release readiness

**NOT READY for public production release.** Source publication is separate from deployment.

Version: 0.0.0. Environment: local Windows development. Date: 2026-09-16. Source revision: use `git rev-parse HEAD` for the checked-out commit. No production artifact, operator sign-off or store submission has been approved.

## Implemented

Standalone Node.js API, SQLite storage, email verification, password recovery, hashed passwords and session tokens, HttpOnly cookies, request-origin checks and rate limits. Workspace reads/writes use the authenticated account, persist across API restarts, and reject stale revisions. The editor keeps local drafts and supports download/recovery. SMTP is required in production; local development writes mail to an ignored outbox.

The original app and Git history are preserved. The frontend uses a normal Vite build. The project has its own branding and setup instructions. No hosted app-builder service is required.

## Validation

See test-results.txt, lint-results.txt, typecheck-results.txt and build-results.txt for local checks. API tests cover account verification, login/logout, password recovery and replay rejection, session revocation, two-account workspace isolation, rejected role edits, origin checks, path validation, concurrent-save conflicts and restart persistence. Browser smoke test: sign in, edit Code Lab and reload; source remains. These checks do not complete the full production journey.

## Gate register

No production gate has been granted PASS. Local improvements do not substitute for production, device, restore or operator evidence. Platform gates block their own submissions; trust features stay disabled.

| Requirement | Gate | Decision | Finding |
|---|---|---|---|
| 258 | Product completeness | BLOCK RELEASE | Account and workspace services work locally. Several learning screens still use demonstration data. |
| 259 | Core journey | BLOCK RELEASE | Account, edit, save and reload tested locally; execution, assessment and public project journey remain incomplete. |
| 260 | Data persistence | BLOCK RELEASE | SQLite workspace persistence passes logout/login and API restart tests. Other learner resources still lack production storage. |
| 261 | Data-loss resilience | BLOCK RELEASE | Local drafts and server revision conflicts implemented. Full network, device, crash and storage-quota matrix remains open. |
| 262 | Authentication | BLOCK RELEASE | Standalone sessions, verification and reset implemented and tested locally. SMTP delivery and production security review pending. |
| 263 | Authorization | BLOCK RELEASE | Workspace ownership and client role-edit rejection pass API tests. Future sensitive resources need separate authorization tests. |
| 264 | Execution sandbox | BLOCK RELEASE | No execution service or sandbox configuration in checkout. |
| 265 | Preview isolation | BLOCK RELEASE | Preview.jsx renders static example, not isolated learner execution. |
| 266 | Test engine | BLOCK RELEASE | Simulated test results removed from Code Lab; no execution runner is connected. |
| 267 | Progress and XP integrity | BLOCK RELEASE | Code Lab no longer awards simulated XP. Server progress service still required. |
| 268 | AI Code Coach | BLOCK RELEASE | CopilotPanel uses canned responses and keyword filtering. |
| 269 | Privacy | BLOCK RELEASE | Legal text is draft; Settings export uses a timer. |
| 270 | Logging and secrets | BLOCK RELEASE | Removed hosted SDK/plugin and environment bootstrap. Full production artifact and logging review still required. |
| 271 | Backups and restore | BLOCK RELEASE | No backup configuration or actual restore evidence supplied. |
| 272 | Observability | BLOCK RELEASE | No operational alert delivery evidence or named on-call owner supplied. |
| 273 | Performance | BLOCK RELEASE | No representative production measurements supplied. |
| 274 | Accessibility | BLOCK RELEASE | No critical-journey accessibility QA records supplied. |
| 275 | Responsiveness | BLOCK RELEASE | Responsive classes exist; no recorded viewport QA proves usability. |
| 276 | Real devices | BLOCK RELEASE | No release-candidate Android, Apple or Windows device test records. |
| 277 | Legal and trust content | BLOCK RELEASE | Legal.jsx contains draft policies awaiting review. |
| 278 | Support | BLOCK RELEASE | No support entity/function or delivery evidence locally. |
| 279 | Store truthfulness | BLOCK RELEASE | No exact packaged-build versus listing comparison supplied. |
| 280 | Store metadata | BLOCK RELEASE | No finalized store submission evidence supplied. |
| 281 | App versioning | BLOCK RELEASE | Original Git history restored at repository root. No deployed artifact identity or migration release approved. |
| 282 | Install, update and uninstall | BLOCK RELEASE | No packaged application or lifecycle evidence supplied. |
| 283 | PWA | BLOCK RELEASE | No application manifest or service worker found. |
| 284 | Google Play | BLOCK RELEASE | No Android package or current submission review supplied. |
| 285 | Apple App Store | BLOCK RELEASE | No iOS package or beta evidence supplied. |
| 286 | Huawei AppGallery | BLOCK RELEASE | No Huawei-compatible package or test evidence supplied. |
| 287 | Microsoft Store | BLOCK RELEASE | No Windows package or submission evidence supplied. |
| 288 | Verified learning | KEEP FEATURE DISABLED | Integrity and verification screens use fixtures; authoritative feature must remain disabled. |
| 289 | Certificates | KEEP FEATURE DISABLED | Fixture data; no authoritative issuance service locally. |
| 290 | Employer ecosystem | KEEP FEATURE DISABLED | Trustworthy evidence and verification dependencies are not implemented locally. |

## Remaining blockers

Execution isolation, real test engine, server progress/XP, project publishing, export/deletion, support, reviewed legal text, backup restore, monitoring and real-device QA. Dependency advisories require review. SQLite requires a persistent volume and a single server instance. Browser drafts are device-local, are not encrypted by this app and can be lost if browser storage is cleared; download important work. Multi-tab/offline recovery needs broader testing.

Engineering, security, operations and product sign-offs: pending. Deferred: verified learning, certificates, employer ecosystem, PWA and store packages. No deployment was made by this change.
