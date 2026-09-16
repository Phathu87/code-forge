# CodeForge

A developer-learning project by **Phathutshedzo Rakhunwana**.

CodeForge builds on my original Programming Language Toggle exercise. The original app is preserved in `programming-language-toggle-app/`; the current application runs from this repository's root.

## Run locally

Requires Node.js 22.17 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. The API listens on port 3001. Accounts, sessions and workspace files are stored in `.data/codeforge.sqlite`. Development verification codes and password-reset messages are written to `.data/outbox/`. These files are private local data and are excluded from Git.

Create an account with a password of at least 12 characters. Open the latest message in the outbox to enter the verification code. After sign-in, use Code Lab to edit the Shared Preferences workspace. Changes save automatically; the status shows whether they are local, saving, saved or in conflict. Download a draft before discarding it or resolving a conflict.

## Configuration

Copy `.env.example` to `.env.local` to change settings. Never commit credentials.

Production requires `NODE_ENV=production`, an HTTPS `APP_ORIGIN`, `SMTP_URL` and `MAIL_FROM`. Set `DATABASE_PATH` to a persistent volume, put the server behind an HTTPS reverse proxy and configure backups. The server binds to localhost unless `HOST` is set explicitly. Development email files are never used in production.

```sh
npm run build
npm start
```

The API server also serves the compiled frontend. Configure the proxy to preserve the external request origin. The database is intended for a single server instance; do not share its file across multiple hosts.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run release:check -- web
```

The release check currently blocks public launch. See `docs/release-readiness-report.md` for what works and what remains unfinished. Publishing source code does not mean the service has been deployed.

## Current scope

Working: email registration and verification, sign-in/out, password recovery, server sessions, account-scoped workspace storage, local drafts and revision conflicts.

Still unfinished: isolated code execution, real mission tests, progress and XP, project publishing, privacy operations, production support and operational readiness. Demonstration screens remain labelled. Certificates and authoritative verification are disabled.

## Ownership and history

Maintained by Phathutshedzo Rakhunwana. Git history preserves the original project. Third-party libraries retain their respective licences.
