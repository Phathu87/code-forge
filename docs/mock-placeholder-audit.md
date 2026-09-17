# Mock and placeholder audit

Current application, 2026-09-17. This is not a completed MVP audit.

| Area | Classification | Current action |
|---|---|---|
| Accounts and workspace | REPLACE WITH PRODUCTION | Standalone authenticated storage implemented; hosted preview uses Neon. Verification and recovery delivery reached the approved inbox. |
| Settings | REPLACE WITH PRODUCTION | Profile save, data export and password-confirmed deletion use actual API operations. |
| Help | REPLACE WITH PRODUCTION | Requests persist under the authenticated account. Automated routing/acknowledgements remain incomplete. |
| Onboarding | REPLACE WITH PRODUCTION | Selected preferences now persist to the account. Suggested roadmap content remains illustrative. |
| Code Lab preview | REPLACE WITH PRODUCTION | Run compiles actual learner React source into a restricted iframe. It is not an assessed runtime. |
| Code Lab tests/XP | REMOVE | Fake passing tests and completion rewards are not active; assessment remains unavailable. |
| Status | REPLACE WITH PRODUCTION | Performs an actual health request; fabricated uptime/service statuses removed. |
| Dashboard, Learn, Roadmap and Missions | REPLACE WITH PRODUCTION | Original Shared Preferences exercise with four actionable milestones and account-saved focus. Full approved curriculum remains outstanding. |
| Projects and Portfolio | REPLACE WITH PRODUCTION | Private public-GitHub source snapshots pinned to a commit. No fabricated projects, skill evidence or verification. Public publishing remains unavailable. |
| Achievements | REMOVE | Fabricated badges removed; awards explicitly unavailable. |
| Skills and other remaining demonstration screens | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Incomplete development-preview content still blocks public release. |
| tests/ | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Disposable test accounts, source fixtures and mocked provider responses. |
| programming-language-toggle-app/ | KEEP AS EXPLICIT DEMO/TEST FIXTURE | Original example preserved for history, not served by the current backend. |

Remaining simulated learning functions must be replaced before removing the development notice or opening public registration. Hosted signup is restricted to two approved addresses. Trust features remain disabled.

Curriculum v1.0.0 supersedes the limited exercise-only catalogue. Learn, Roadmap and Missions now expose actual authored content and public briefs from versioned server storage. Deliberately broken examples in curriculum/fixtures are KEEP AS EXPLICIT DEMO/TEST FIXTURE for debugging practice; they are never imported as production application behaviour. Test plans are labelled specified, not executed. No fabricated completion or evidence is awarded.

Brand identity audit: removed the admin identity panel's local-only Saved state and placeholder email address. It now displays read-only source configuration. Removed the inactive theme toggle. Replaced the inconsistent favicon with the existing blue application mark. Historical origin references remain intentionally documented; no Base44 runtime strings/dependencies, inconsistent spaced product name, trademark symbol or codeforge.example address were found in the scoped production source/manifest search. Native assets and dormant email templates are explicitly candidates, not simulated live features.
