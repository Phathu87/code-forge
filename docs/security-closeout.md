# Security closeout

Status: BLOCK RELEASE. Date: 2026-09-16. Scope: local version 0.0.0; current revision available with git rev-parse HEAD. No public security sign-off or accepted risk waiver.

Implemented controls: scrypt password hashing, hashed expiring sessions, HttpOnly/SameSite cookies (Secure in production), origin/custom-header checks, database-backed request limits, single-use verification/reset challenges and reset session revocation. Workspace ownership comes only from the authenticated session. Saves use conditional revisions. Client role changes and traversal-style source paths are rejected. Tests cover these boundaries and API restart persistence.

Open high-impact work: secure code execution, production SMTP and reverse-proxy configuration, privacy operations, support routing, comprehensive abuse testing, dependency remediation, backup/restore and alert delivery. Local draft storage is not an encrypted vault. Assessment, certificate and employer features are not approved. No breach or sandbox escape is asserted.

See threat-model.md for boundaries and dependency-audit.json for advisory results. Follow security-incident-response.md for suspected incidents. Preserve evidence before recovery operations and make only supported impact statements. Security, engineering and operations review is still required.
