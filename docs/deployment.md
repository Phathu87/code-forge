# Hosted development preview

Verified 2026-09-17 (Africa/Johannesburg).

- URL: https://code-forge-4fgj.onrender.com
- Product version: 0.1.0
- Deployed commit: dac5a53c8ed886331e16282c033eca0f44b09c23
- Render service: srv-dalheiu5vjqs73fdqg90, free plan, Frankfurt
- Render deployment: dep-dalheje5vjqs73fdqikg; live at 2026-09-16 22:26:17 UTC
- Database: Neon free project code-forge, Frankfurt; dedicated production branch; migration 0001
- Automatic deployment: disabled
- Registration: disabled

The deployed root returned HTTP 200 with the CodeForge title. /api/health returned ok, version 0.1.0 and the commit above after a successful database query. /api/config returned registrationEnabled false. GitHub Checks passed for the deployed commit: https://github.com/Phathu87/code-forge/actions/runs/35157568000.

Seventeen local tests, lint, type checking and the production build passed. The account/workspace lifecycle also passed against a separate Neon integration branch. Credentials are configured privately and must never appear in this document, the frontend or tracked environment examples.

Brevo HTTPS integration is implemented, but the provider API key and actual verification/recovery delivery checks are pending. Keep registration closed until mail works, then restrict access to named test addresses with REGISTRATION_ALLOWLIST. Public registration is intentionally rejected by the server without this allowlist.

This is a hosted development preview. The release decision remains NOT READY. Demonstration learning data, missing authoritative assessment/progress services, incomplete hostile-workload testing, operational restore/alert evidence and the other unresolved release gates still block public production release. Free hosting can sleep or reach usage limits. No paid service or persistent disk was provisioned.
