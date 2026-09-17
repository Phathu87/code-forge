# Authoritative learning system

Status: internal QA implementation. Public release is **NOT READY**. Assessment submissions are closed unless the operator explicitly sets `LEARNING_CORE_ENABLED=true`. The executable keeps verified learning and certificate issuance disabled.

## Stored authority

Migration 0004 stores versioned assessment definitions, immutable submission snapshots and hashes, reviewer assignments, assessment events, evidence, an XP ledger, audit records, certificate consent and certificate records. PostgreSQL and local SQLite use the same service. Transactions serialize consequential decisions; unique keys protect retries and XP awards. Each passed attempt retains its own evidence record, so a retake cannot overwrite an earlier certificate's source evidence.

Definitions pin curriculum and assessment versions. Publishing locks their content. The lifecycle is DRAFT, REVIEW, PUBLISHED, ARCHIVED. Existing curriculum 1.0.0 remains unchanged; its source content continues through repository review. The definition editor governs assessments, not a general-purpose lesson publishing CMS.

Submissions include saved source files, answers, explanation and modification evidence. A later edit requires another attempt. Public catalog responses exclude protected rules and expected answers. Learners receive criterion outcomes and public feedback; private reviewer notes remain restricted.

Every required criterion must pass. Practical automation has no production runner configured and reports infrastructure failure without awarding completion or consuming a failed learner result. The built-in knowledge grader supports deterministic answer checks only. It does not execute learner code. A trusted runner adapter must return every configured automated criterion exactly once; missing or malformed results fail as infrastructure errors. No arbitrary learner-controlled grading callback is exposed.

Progress is derived from accepted evidence and hard prerequisites. Placement can grant entry equivalence without claiming completion of skipped work. Skill levels require the official competency coverage and practical evidence; XP does not award skill levels. Integrity holds remove affected evidence from effective progress. Certificate eligibility additionally requires verified evidence and coverage.

## Roles and review

Learners use `/assessments`; reviewers use `/assessment-review`. Your intended role is human reviewer, with assistance interpreting the rubric. A separate verified reviewer account must be identified and provisioned by the operator before submissions open. No account has been granted a role by this change.

Roles are deliberately separate: `reviewer`, `review_manager`, `curriculum_maintainer`, `integrity_reviewer`, and `credential_admin`. A reviewer sees assigned attempts only and cannot review their own work. Review managers assign attempts; maintainers publish definitions; integrity reviewers record holds and decisions; credential administrators issue or revoke eligible certificates. Ordinary admin status does not confer these permissions. The current UI provides review, assignment and definition editing; integrity and credential operations currently have authenticated API endpoints only.

Reviews preserve criterion decisions, private notes, learner feedback and actor identity. Automated assistance does not replace the authenticated human's decision. A production role-provisioning procedure and reviewer onboarding remain required.

## Certificates and privacy

Issuance requires enabled release flags, server-calculated eligibility, learner consent and an authorized issuer. IDs are server-generated and duplicate issuance is prevented. Records retain criteria versions, source attempts and evidence references. Revocation is audited; an integrity hold invalidating eligibility revokes existing valid certificates. Public verification exposes a limited record, not private source, test rules or reviewer notes. Consent withdrawal hides the public record. Account deletion removes learner evidence and redacts retained certificate identity.

PDF generation uses stored certificate data, never browser-supplied eligibility. The current font supports ASCII learner names only; unsupported names return an explicit error. International font support and layout QA are release blockers for certificate documents. Issuance remains disabled.

## API

Authenticated routes are under `/api/learning-core`: `catalog`, `progress`, `attempts`, attempt `submit`, `grade`, `review`, `assign`, `integrity`, `review-queue`, `definitions`, `certificates`, `certificate-consent`, certificate `document` and `revoke`. All sensitive resources enforce ownership or a dedicated role on the server. Public verification is `/api/certificates/verify/:id`. Existing password-confirmed export includes learning records; account deletion includes learning data cleanup.

## Remaining release work

A validated isolated practical grader; trustworthy integrity collection and investigation; appeals; operational reviewer provisioning; complete learner and operator browser QA; published privacy/retention review; production restore and alert evidence; real-device QA; and the complete new-account journey are still required. Similarity analysis, interview authenticity and specialist review cannot be inferred from passing fixture tests.

The tests use synthetic submissions and explicit trusted runner/reviewer fixtures in disposable databases. They verify decisions and authorization; they do not prove a learner's competence or sandbox security. Do not enable verified learning or issue real certificates from this test evidence.
