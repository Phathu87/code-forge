# Hosted development preview

Verified 2026-09-17 (Africa/Johannesburg).

- URL: https://code-forge-4fgj.onrender.com
- Product version: 0.1.0
- Deployed commit: 5bd8710dca023cc367947a883d43a33a8bf802e1
- Render service: srv-dalheiu5vjqs73fdqg90, free plan, Frankfurt
- Render deployment: dep-dalhjs2jnfac739judsg; live at 2026-09-16 22:37:36 UTC
- Database: Neon free project code-forge, Frankfurt; dedicated production branch; migration 0001
- Automatic deployment: disabled
- Registration: disabled

The deployed root returned HTTP 200 with the CodeForge title. /api/health returned ok, version 0.1.0 and the commit above after a successful database query. /api/config returned registrationEnabled false. The initial implementation passed GitHub Checks: https://github.com/Phathu87/code-forge/actions/runs/35157568000. The current preview also includes corrected public feature descriptions.

Seventeen local tests, lint, type checking and the production build passed. The account/workspace lifecycle also passed against a separate Neon integration branch. Credentials are configured privately and must never appear in this document, the frontend or tracked environment examples.

Brevo HTTPS integration is implemented, but the API key has been created with owner approval; saving it to the hosting environment and actual verification/recovery delivery checks are pending. Keep registration closed until mail works, then restrict access to named test addresses with REGISTRATION_ALLOWLIST. Public registration is intentionally rejected by the server without this allowlist.

This is a hosted development preview. The release decision remains NOT READY. Demonstration learning data, missing authoritative assessment/progress services, incomplete hostile-workload testing, operational restore/alert evidence and the other unresolved release gates still block public production release. Free hosting can sleep or reach usage limits. No paid service or persistent disk was provisioned.
