# Engineering checks — 2026-09-17

The Node HTTP lifecycle suite passed against a dedicated Neon integration branch using a disposable schema. Checks include verification and concurrent replay rejection, login/logout, password reset, revoked sessions, cross-account workspace/support isolation, rejected role changes, stale revisions and API-restart persistence. The production branch was not used for these tests.

Browser smoke on the disposable local account: signed in, compiled and rendered the saved App.jsx, then ran controlled boundary probes. The iframe displayed Parent access blocked, Cookie access blocked and Network access blocked. The original test component was restored afterward. This is evidence for these boundaries only; it is not a complete sandbox validation.

SQLite backup test: took an online backup, restored into a new database, restarted the API and read the same source/support records. An overwrite attempt was rejected. Production PostgreSQL recovery remains untested.

Brevo adapter unit tests use an explicit mock HTTP response; no real email delivery is claimed.

Hosted email checks: approved test signup and recovery requests returned HTTP 200; both messages arrived in Gmail. An uninvited address received HTTP 403. The former SMTP key was deactivated in Brevo and rejected with SMTP 535 / EAUTH. See deployment.md for environment and revision.

## Roadmap and project update — 2026-09-17

The current source replaces demo dashboard, roadmap, mission catalogue, portfolio and achievement records. Shared Preferences has four actionable milestones, account-saved focus and dashboard skill highlights. Projects and Portfolio save private, unverified public-GitHub source snapshots pinned to a commit. No authorship, assessment or certificate claim is made. Full approved curriculum and official brand assets remain outstanding.

All 19 automated tests, lint, type checking and build passed. New lifecycle checks also passed in an isolated PostgreSQL schema: account isolation, duplicate imports, restart persistence, export and deletion cascades. GitHub tests cover fixed-host requests, source integrity, limits and provider errors. A live GitHub fetch returned a three-file snapshot. Local browser checks confirmed focus survives reload, the empty portfolio, import dialog rendering, Escape dismissal and focus restoration. The build retains a bundle-size warning above 500 KB.

Public release remains blocked. Hosted email delivery is confirmed and signup is restricted to two approved addresses. Other demonstration screens and operational release gates remain unresolved.

## Official curriculum update — 2026-09-17

Curriculum version 1.0.0 contains eight paths, 37 modules, 53 lesson units, 37 missions, eight projects and 40 assessment briefs. This supersedes the earlier note that the full authored curriculum was outstanding. Production assessment runners, server-authoritative progression and verified evidence remain unfinished.

All 22 automated tests, lint, type checking and the build passed. Curriculum checks cover reference validity, prerequisite cycles, generated-source consistency, database readback, SQLite restart persistence and rejection of changed content under an existing version. The project lifecycle suite also passed in an isolated PostgreSQL schema with curriculum migration/readback. The public task-manager behaviour suite has 11 checks but still needs an adapter to a real learner interface; its infrastructure-error tests are not learner assessment results.

A disposable local browser account opened the curriculum, selected the JavaScript path, expanded a storage lesson and viewed the Persistent Developer Preferences requirements and public rubric. These checks do not establish full curriculum accessibility, assessment execution or public-release readiness. The build retains its bundle-size warning above 500 KB.

## Brand system update — 2026-09-17

The existing blue Code2 mark, dark palette and typography stacks were extracted into canonical assets and documented tokens. Landing, shell, auth and onboarding share the mark. The mint favicon, inactive theme control and admin identity's fake save/placeholder support address were corrected. The original exercise and published curriculum version remain unchanged.

All 24 tests passed, including email HTML escaping, plain-text preservation, provider failure handling and safe reset links. Lint and type checking passed. Local browser review confirmed the landing layout and headline, canonical mark, authentication labels and visible input focus. The social image was visually inspected; all 33 manifest-listed assets exist and PNG dimensions were checked. Native candidates have not been tested in packages. No real email was sent by these tests and no full visual-parity or accessibility pass is claimed.
The final production build passed; the existing bundle-size warning above 500 KB remains.

## Learning core checks — 2026-09-17

The local suite passes 29 tests, followed by lint, TypeScript checks and the Vite production build. Learning tests cover required grading gates, protected rules, cross-user access, immutable snapshots, retries, XP, prerequisites, reviewer assignment, infrastructure failure, placement, certificate lifecycle and privacy. A retake preserves original evidence and does not duplicate XP; holding certificate source evidence revokes that certificate even when replacement evidence exists.

Browser smoke on an isolated local database: sign-in, assessment catalog, required criteria, persisted attempt creation, rejection of a practical submission without source files, ordinary-account exclusion from reviewer operations, and the separate reviewer's assignment queue. No production reviewer role was granted. This does not establish full browser, accessibility or device QA.

The build still warns about a JavaScript bundle larger than 500 kB. PostgreSQL integration validation is recorded separately when completed. Synthetic graders and human-review fixtures test state transitions only; they do not validate execution isolation or learner competence.
