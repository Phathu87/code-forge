# Operating CodeForge

## Free deployment

Render My Workspace hosts the Node service on its free plan in Frankfurt. Neon organization Phathutshedzo hosts the dedicated code-forge PostgreSQL project on its free plan in Frankfurt. The production and integration branches are separate. No paid disk or compute was approved or provisioned.

Render free services sleep after idle periods, have shared monthly instance-hour limits, and may suspend when limits are exhausted. Free-tier constraints do not meet the public-production availability gate. Do not upgrade a plan automatically. Review usage in both consoles and keep within the free allocations.

DATABASE_URL is private server configuration. The frontend must never receive it. The server refuses ephemeral SQLite on Render. APP_ORIGIN defaults to the Render HTTPS URL; custom domains require an explicit value. SQL schema lives in server/migrations and is applied through a Drizzle transaction protected by a migration lock. Changes must pass on the integration branch first.

## Email and registration

Brevo's free plan currently includes 300 email sends/day. Use its HTTPS transactional API; Render free services block outbound standard SMTP ports.

1. Create the Brevo account yourself and verify your sender address.
2. Add BREVO_API_KEY and MAIL_FROM in the private Render environment. MAIL_FROM is the verified plain email address.
3. Keep REGISTRATION_ENABLED=false until delivery is configured. Test verification and recovery using a controlled account before public access.
4. Confirm actual delivery and link expiry before opening registration. No message body or credential should appear in application logs.

The published preview can start without email only when registration is explicitly closed. It never writes production messages to a local outbox.

## Health and logs

GET /api/health checks database connectivity and reports the build version and Render commit. Configure uptime checks and deployment-failure alerts to reach the operator. Request logs record request ID, method, status and elapsed time; omit bodies, queries, cookies and credentials. Alert delivery has not yet been tested.

## Recovery

PostgreSQL: use Neon's retained history/restore workflow, and configure independent encrypted backups before public release. The free plan's short history window is not a substitute for the required backup retention. A PostgreSQL restore drill and offsite backup monitoring remain outstanding. Preserve the current branch and investigate before changing production data. After a restore, reconcile subsequent account deletions and revoke restored sessions before reopening access.

SQLite local development: when BACKUP_DIRECTORY is set, the app takes a verified online backup at startup and every 24 hours, retaining 7 days by default. It logs backup_success or backup_failed. These local copies are not offsite protection.

```sh
node scripts/database.mjs backup .data/codeforge.sqlite .data/backups
node scripts/database.mjs restore .data/backups/<backup>.sqlite .data/restored.sqlite
```

Restore refuses to overwrite an existing file. Stop writes, preserve the previous database/WAL/SHM as evidence, validate the new file and change DATABASE_PATH. Local tests restore and verify accounts, source and support requests through the API.

## Support

Private requests are persisted under their account, with Privacy and Security categories. An operator with database access can run locally using a private DATABASE_URL:

```sh
node --env-file-if-exists=.env.local scripts/support.mjs
node --env-file-if-exists=.env.local scripts/support.mjs Security
node --env-file-if-exists=.env.local scripts/support.mjs Privacy
```

Output contains private messages: do not publish or send it to build logs. A monitored operator inbox, external unauthenticated security contact and email acknowledgements remain to be configured. The UI makes no delivery or response-time promise.

Deletion removes live account data and dependent records immediately. Backup copies expire under their configured retention; local drafts on other devices remain until browser storage is cleared.
