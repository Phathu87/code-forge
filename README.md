# CodeForge

A JavaScript and React learning project by **Phathutshedzo Rakhunwana**.

CodeForge grew from my Programming Language Toggle exercise into a workspace for learning through practical projects. The first exercise, **Shared Preferences**, explores React state, context and browser storage.

**You write the code. We help you understand it.**

[Hosted preview](https://code-forge-4fgj.onrender.com) · [Source](https://github.com/Phathu87/code-forge) · [Release readiness](docs/release-readiness-report.md)

## Current status

This is a development preview. Registration is restricted to approved testers; public production release remains blocked. A working screen or an imported repository does not establish verified skill evidence.

| Area | Current behaviour |
| --- | --- |
| Accounts | Registration, email verification, sign-in/out, password recovery and server sessions |
| Workspace | Account-scoped file storage, autosave, local recovery drafts and revision conflict detection |
| React preview | Compiles local JavaScript, JSX, CSS and JSON into a restricted browser preview |
| Profile and privacy | Name updates, onboarding preferences, password-confirmed export and account deletion |
| Support | Private requests persist; email acknowledgements and a response-time commitment are not configured |
| Learning curriculum | Versioned lessons, prerequisites, mission/project briefs and public rubrics across 8 frontend paths; reading and local practice available |
| GitHub imports | Private source snapshots of public repositories, pinned to a commit, with source browsing and JSON download |
| Assessment | Versioned submissions, reviewer decisions, evidence-derived progress and idempotent XP implemented for internal QA; practical grading is not connected |
| Trust features | Verified skills, certificates and employer verification are not enabled |

The browser preview does not provide a Node.js runtime or arbitrary dependency installation. Resource-exhaustion testing and the remaining release gates must pass before public launch. See the [deployment record](docs/deployment.md) for the tested build and [engineering checks](docs/engineering-checks.md) for evidence.

Assessment submissions remain closed by default. The [learning system implementation](docs/learning-core.md) describes reviewer access, release restrictions and the remaining work.

## Run locally

Use **Node.js 22.17 or newer**. Run these commands from the repository root:

```sh
npm ci
npm run dev
```

Open [localhost:5173](http://localhost:5173). The development command starts both Vite and the Node API; the API listens on port 3001.

Without `DATABASE_URL`, local account and workspace data is stored in `.data/codeforge.sqlite`. Development verification codes and reset messages are written to `.data/outbox/`. These paths are excluded from Git.

1. Create an account with a password of at least 12 characters.
2. Open the latest verification message in `.data/outbox/` and enter its code.
3. Complete onboarding, then open Code Lab to edit the Shared Preferences workspace.
4. Watch the save status. Download your local draft before discarding it or loading a conflicting server version.

To change settings, copy `.env.example` to `.env.local`. Keep real credentials only in ignored local environment files or the hosting environment, never in `.env.example`.

## Configuration and hosting

The hosted preview uses a Node service on Render, PostgreSQL on Neon and Brevo's HTTPS email API. It does not store learner data on Render's temporary filesystem. Local development can continue using SQLite.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string; required on Render |
| `DATABASE_PATH` | SQLite path when no PostgreSQL connection is configured |
| `APP_ORIGIN` | Public application origin; must use HTTPS in production. Defaults to Render's external URL when available |
| `HOST`, `PORT` | HTTP bind address and port; Render uses `HOST=0.0.0.0` |
| `NODE_ENV` | Set to `production` for hosting |
| `BREVO_API_KEY`, `MAIL_FROM` | Private API key and verified sender email address |
| `REGISTRATION_ENABLED` | Set to `false` to close signup |
| `REGISTRATION_ALLOWLIST` | Comma-separated invited addresses; required when production preview signup is enabled |
| `SMTP_URL` | Optional alternative mail transport on hosts that support SMTP |

```sh
npm run build
npm start
```

The Node server serves the compiled frontend and API. Production never uses the development email outbox. New services described by `render.yaml` start with registration closed; the existing preview has an explicitly approved tester allowlist.

Automatic deployment is disabled. A Git push publishes source, but a checked candidate must be deployed separately. Free hosting has idle and usage limits. See [operations](docs/operations.md) for mail setup, backups, restore procedures and operator responsibilities.

## Project layout

```text
src/                              React application
  api/client.js                   HTTP API client
  components/                     Shared and feature-specific UI
  lib/                            Authentication, workspace helpers and demo data
  pages/                          Routed screens
server/                           Node API, authentication, mail and preview compiler
  migrations/                     Database schema
scripts/                          Local development, operations and release checks
tests/                            API, privacy, preview and release-policy tests
docs/                             Deployment evidence and release documentation
release/                          Machine-readable release gates
programming-language-toggle-app/   Preserved original exercise
```

The frontend uses React 18, React Router 7, Vite, Tailwind CSS and Radix/shadcn components. The backend uses Node.js, PostgreSQL or SQLite, and esbuild for preview compilation. UI tokens live in `src/index.css` and `tailwind.config.js`.

The root project is the current application. The [original exercise](programming-language-toggle-app/README) is preserved for reference and has a separate package manifest; do not use it to start the current CodeForge app.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run release:check -- web
```

The release check is expected to block public launch until the documented gates pass. Passing the engineering checks alone does not mean the application is ready for release.

For PostgreSQL integration testing, put `TEST_DATABASE_URL` for a dedicated test branch in the ignored `.env.integration` file:

```sh
node --env-file=.env.integration --test tests/server.test.mjs tests/projects.test.mjs
```

These tests create and remove a disposable schema. Do not point them at production. SQLite restore tests use temporary files.

## GitHub source imports

From Projects or Portfolio, enter a public `https://github.com/owner/repository` URL and confirm your right to import the work. The server retrieves source through the [GitHub Git database API](https://docs.github.com/en/rest/git), pins it to a commit and stores the snapshot with your account. Reimporting the same commit does not duplicate it. Account export includes snapshots; account deletion removes them.

Imports support up to 30 text files, 100 KB per file and 300 KB total. Binary files, hidden paths, build output and lockfiles are excluded; the UI reports the excluded count. Private repository access, automatic syncing, public portfolio publishing and authorship verification are not implemented. An imported project is always **Unverified**. GitHub availability and API rate limits can temporarily prevent imports.

## Official curriculum

[Curriculum v1.0.0](docs/curriculum/official-curriculum-v1.md) contains 37 modules, 53 lesson units, 37 missions, 8 projects and 40 assessment briefs. The [delivery and governance guide](docs/curriculum/README.md) explains prerequisites, rubrics, versioning, evidence and disabled certificate mappings. Learn and Roadmap browse the database-backed catalogue; the existing Shared Preferences focus is preserved.

Author content in the curriculum source files, then run `node scripts/build-curriculum.mjs` to regenerate the JSON and Markdown artifacts. Published curriculum versions are immutable; change the version rather than overwrite historical requirements. The [local practice fixtures](curriculum/fixtures/README.md) include deliberate bugs and an adapter-based visible test suite.

Reading a brief is not a completed mission. New activity runners, automated grading and authoritative progression remain unavailable.

## Remaining work

- Connect the authored curriculum to mission workspaces, assessment runners, evidence-based progression and reviewer workflows. Official brand assets remain outstanding.
- Complete learning progress, assessment, project publishing and Code Coach services.
- Validate execution isolation, recovery, accessibility, devices and operational monitoring.
- Enable verified learning and certificates only after their separate release gates pass.

Web is the current preview target. PWA installation and Android, iOS, Huawei and Windows store packages are not available in this build. The [MVP closeout record](docs/mvp-closeout.md) tracks delivered and deferred work.

## Ownership

Maintained by Phathutshedzo Rakhunwana. This repository preserves the original project history. Third-party dependencies retain their respective licences.

## Brand system

The existing CodeForge identity is documented in [Brand System 1.0](docs/brand-system.md), with [design tokens and components](docs/design-system.md), an [asset inventory](docs/brand-assets.md) and an explicit [brand closeout](docs/brand-closeout.md). Public brand approval remains blocked; native assets are candidates until packaging and review.
