# Engineering checks — 2026-09-17

The Node HTTP lifecycle suite passed against a dedicated Neon integration branch using a disposable schema. Checks include verification and concurrent replay rejection, login/logout, password reset, revoked sessions, cross-account workspace/support isolation, rejected role changes, stale revisions and API-restart persistence. The production branch was not used for these tests.

Browser smoke on the disposable local account: signed in, compiled and rendered the saved App.jsx, then ran controlled boundary probes. The iframe displayed Parent access blocked, Cookie access blocked and Network access blocked. The original test component was restored afterward. This is evidence for these boundaries only; it is not a complete sandbox validation.

SQLite backup test: took an online backup, restored into a new database, restarted the API and read the same source/support records. An overwrite attempt was rejected. Production PostgreSQL recovery remains untested.

Brevo adapter unit tests use an explicit mock HTTP response; no real email delivery is claimed.

Hosted email checks: approved test signup and recovery requests returned HTTP 200; both messages arrived in Gmail. An uninvited address received HTTP 403. The former SMTP key was deactivated in Brevo and rejected with SMTP 535 / EAUTH. See deployment.md for environment and revision.
