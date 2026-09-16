# Mock and placeholder audit

Current application, 2026-09-17. This is not a completed MVP audit.

| Area | Classification | Current action |
|---|---|---|
| Accounts and workspace | REPLACE WITH PRODUCTION | Standalone authenticated storage implemented; hosted preview uses Neon. Real email delivery is pending. |
| Settings | REPLACE WITH PRODUCTION | Profile save, data export and password-confirmed deletion use actual API operations. |
| Help | REPLACE WITH PRODUCTION | Requests persist under the authenticated account. Automated routing/acknowledgements remain incomplete. |
| Onboarding | REPLACE WITH PRODUCTION | Selected preferences now persist to the account. Suggested roadmap content remains illustrative. |
| Code Lab preview | REPLACE WITH PRODUCTION | Run compiles actual learner React source into a restricted iframe. It is not an assessed runtime. |
| Code Lab tests/XP | REMOVE | Fake passing tests and completion rewards are not active; assessment remains unavailable. |
| Status | REPLACE WITH PRODUCTION | Performs an actual health request; fabricated uptime/service statuses removed. |
| Dashboard, portfolio, skills, achievements and other learning screens | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Still incomplete and visibly labelled development preview; block public release. |
| tests/ | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Disposable test accounts, source fixtures and mocked provider responses. |
| programming-language-toggle-app/ | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Original example preserved for history, not served by the current backend. |

Remaining simulated learning functions must be replaced before removing the development notice or opening public registration. Registration is closed on the hosted preview. Trust features remain disabled.
