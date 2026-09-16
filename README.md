# CodeForge

A developer-learning project by **Phathutshedzo Rakhunwana**.

CodeForge builds on my original Programming Language Toggle exercise. The original app is preserved in `programming-language-toggle-app/`; the current app runs from this repository's root.

## Run locally

Requires Node.js 22.17 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. The API listens on port 3001. Without DATABASE_URL, accounts, sessions and source files live in `.data/codeforge.sqlite`. Development verification and password-reset messages are written to `.data/outbox/`. Both are ignored by Git.

Create an account with a password of at least 12 characters and verify using the development outbox. Code Lab autosaves to your account and retains pending drafts locally. Conflicts do not overwrite the server: download your draft before loading another version.

Run compiles your App.jsx and local JavaScript, CSS and JSON imports into a React browser preview. Preview has an opaque origin, cannot access platform DOM/cookies, and blocks network requests. It does not run Node.js, install arbitrary packages, award XP or assess mission completion. Infinite-loop/resource-exhaustion protection still needs further work before public release.

Settings saves your name, exports your account/workspace/support records and deletes your account after password confirmation. Help saves private requests. Onboarding saves your selected preferences. Other learning screens still contain labelled demonstration data.

## Hosting

The free deployment uses Render for the Node service and Neon PostgreSQL for durable storage. Render's temporary filesystem must never hold hosted learner data. The server refuses to start on Render without DATABASE_URL.

`render.yaml` defines a free service with registration closed. Provide DATABASE_URL privately. APP_ORIGIN defaults to Render's HTTPS external URL; set it explicitly when using a custom domain. Keep automatic deploys disabled until the candidate is checked.

For email, create a free Brevo account, verify a sender, and privately configure BREVO_API_KEY and MAIL_FROM (plain email address). The app uses Brevo's HTTPS API because Render's free tier blocks standard SMTP ports. After actual verification and recovery delivery tests, set REGISTRATION_ALLOWLIST to the invited test addresses and enable REGISTRATION_ENABLED. Missing email configuration never falls back to local outbox in production.

```sh
npm run build
npm start
```

Render's free tier sleeps when idle and has shared usage limits. This setup is for preview/development, not a claim of public production readiness. See `docs/operations.md` and `docs/release-readiness-report.md`.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run release:check -- web
```

To test the PostgreSQL adapter, put TEST_DATABASE_URL for a dedicated integration branch in the ignored `.env.integration` file, then run:

```sh
node --env-file=.env.integration --test tests/server.test.mjs
```

The integration test creates and removes its own random schema. Do not point it at a production database. SQLite restore tests use temporary files and preserve the local development database.

## Ownership

Maintained by Phathutshedzo Rakhunwana. The original project history is preserved. Third-party libraries retain their respective licences.
