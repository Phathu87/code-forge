# Hosted development preview

Verified 2026-09-17 (Africa/Johannesburg).

- URL: https://code-forge-4fgj.onrender.com
- Product version: 0.1.0
- Deployed commit: ca77dd335f203f09d8b25d62de804e823eaae419
- Render service: srv-dalheiu5vjqs73fdqg90, free plan, Frankfurt
- Render deployment: dep-dalhq04doqps73fhbjig; live at 2026-09-16 22:51:36 UTC
- Database: Neon free project code-forge, Frankfurt; dedicated production branch; migration 0001
- Automatic deployment: disabled
- Registration: enabled only for two owner-approved addresses; all others rejected

The deployed root returned HTTP 200 with the CodeForge title. /api/health returned ok, version 0.1.0 and the commit above after a successful database query. /api/config returned registrationEnabled true after the approved allowlist change. GitHub Checks passed for the earlier implementation revision: https://github.com/Phathu87/code-forge/actions/runs/35158691804.

Seventeen local tests, lint, type checking and the production build passed. The account/workspace lifecycle also passed against a separate Neon integration branch. Credentials are configured privately and must never appear in this document, the frontend or tracked environment examples.

Brevo HTTPS email is configured privately in Render. The verified sender and API key are active. Render outbound ranges 74.220.51.0/24 and 74.220.59.0/24 were authorized with explicit owner approval; Brevo IP blocking remains enabled. Registration permits only the owner and a dedicated test alias. An unrelated address received HTTP 403.

Delivery checks on 2026-09-17: test signup returned HTTP 200; its verification email arrived in the Gmail inbox. Password recovery returned HTTP 200; its reset email also arrived in that inbox. These verify delivery, not completion of the full learner journey. The former SMTP credential was deactivated and a separate authentication check returned SMTP 535 / EAUTH. Private incident evidence remains outside Git.

This is a hosted development preview. The release decision remains NOT READY. Demonstration learning data, missing authoritative assessment/progress services, incomplete hostile-workload testing, operational restore/alert evidence and the other unresolved release gates still block public production release. Free hosting can sleep or reach usage limits. No paid service or persistent disk was provisioned.
