# Release readiness

**NOT READY for public production release.** Source publication is separate from deployment.

Version: 0.1.0. Environments: local Windows, isolated Neon integration branch and a hosted development preview on free Render with Neon storage. Date: 2026-09-17. Deployed preview revision: ca77dd335f203f09d8b25d62de804e823eaae419. Registration is limited to two explicitly approved addresses. No public production release, operator sign-off or store submission has been approved. See [deployment record](deployment.md).

## Implemented

Standalone Node.js API, Neon PostgreSQL for free hosting and SQLite for local development, email verification, password recovery, hashed passwords and session tokens, HttpOnly cookies, request-origin checks and rate limits. Workspace reads/writes use the authenticated account, persist across API restarts, and reject stale revisions. The editor keeps local drafts and supports download/recovery. Brevo HTTPS email and optional SMTP adapters are implemented. Verification and recovery messages from the hosted app reached the approved test inbox. Production may run without mail only with registration explicitly closed.

Password-confirmed data export/deletion, private support requests, onboarding persistence, a compiling React browser preview, request logs, health checks and SQLite backup/restore tools are implemented. The original app and Git history are preserved. The frontend uses a normal Vite build. The project has its own branding and setup instructions. No hosted app-builder service is required.

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
| 262 | Authentication | BLOCK RELEASE | Standalone sessions, verification and reset implemented and tested locally. Hosted verification and recovery delivery passed; full production authentication review remains pending. |
| 263 | Authorization | BLOCK RELEASE | Workspace ownership and client role-edit rejection pass API tests. Future sensitive resources need separate authorization tests. |
| 264 | Execution sandbox | BLOCK RELEASE | No execution service or sandbox configuration in checkout. |
| 265 | Preview isolation | BLOCK RELEASE | Real React preview uses an opaque sandboxed iframe and restrictive CSP. Browser smoke confirms parent DOM, cookies and API network requests are blocked. Hostile navigation/resource-exhaustion matrix is incomplete. |
| 266 | Test engine | BLOCK RELEASE | Simulated test results removed from Code Lab; no execution runner is connected. |
| 267 | Progress and XP integrity | BLOCK RELEASE | Code Lab no longer awards simulated XP. Server progress service still required. |
| 268 | AI Code Coach | BLOCK RELEASE | CopilotPanel uses canned responses and keyword filtering. |
| 269 | Privacy | BLOCK RELEASE | Export and password-confirmed account deletion pass API tests. Reviewed disclosures and broader privacy QA remain pending. |
| 270 | Logging and secrets | BLOCK RELEASE | Removed hosted SDK/plugin and environment bootstrap. Full production artifact and logging review still required. |
| 271 | Backups and restore | BLOCK RELEASE | SQLite backup/restore passes a local API restore test. Neon restore drill, offsite retention and monitoring remain outstanding. |
| 272 | Observability | BLOCK RELEASE | No operational alert delivery evidence or named on-call owner supplied. |
| 273 | Performance | BLOCK RELEASE | No representative production measurements supplied. |
| 274 | Accessibility | BLOCK RELEASE | No critical-journey accessibility QA records supplied. |
| 275 | Responsiveness | BLOCK RELEASE | Responsive classes exist; no recorded viewport QA proves usability. |
| 276 | Real devices | BLOCK RELEASE | No release-candidate Android, Apple or Windows device test records. |
| 277 | Legal and trust content | BLOCK RELEASE | Legal.jsx contains draft policies awaiting review. |
| 278 | Support | BLOCK RELEASE | Private support requests persist and the operator has a read tool. A monitored inbox and external security contact remain unconfigured. |
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

Assessed execution isolation, real test engine, server progress/XP, project publishing, monitored support routing, reviewed legal text, PostgreSQL restore, alert delivery and real-device QA. Latest dependency audit has no reported advisories; this does not prove absence of vulnerabilities. Hosted storage is Neon PostgreSQL; ephemeral SQLite is rejected on Render. Free hosting has sleep and quota limits. Browser drafts are device-local, are not encrypted by this app and can be lost if browser storage is cleared; download important work. Multi-tab/offline recovery needs broader testing.

Engineering, security, operations and product sign-offs: pending. Deferred: verified learning, certificates, employer ecosystem, PWA and store packages. Deployment status is recorded in docs/deployment.md; a closed-registration preview is not a public release.

Current source adds account-saved learning focus and private, unverified GitHub snapshots. See engineering-checks.md for 19 passing tests and isolated PostgreSQL/browser evidence. Full curriculum, official brand assets and the existing public release blockers remain outstanding.
