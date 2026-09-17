# Curriculum delivery and governance

Version 1.0.0 implements the educational scope supplied by Phathutshedzo Rakhunwana on 2026-09-17. The five distinct supplied documents were consolidated; the sixth repeats the browser-storage material exactly. Later complete sections replace truncated overlaps. References to the former app builder are interpreted as frontend responsibilities in the existing standalone application.

The authored source is `curriculum/content.mjs`, `paths.mjs` and `policy.mjs`. `catalog.mjs` normalizes explicit records and validates their prerequisite graph. `node scripts/build-curriculum.mjs` produces `curriculum/v1.json` and the readable [official curriculum](official-curriculum-v1.md). Regenerate both after changes. Tests reject drift between source and JSON.

## What is available

Learn exposes the versioned lessons, practical tasks, mission briefs, projects, prerequisites and public rubrics. Roadmap exposes path stages; the existing Shared Preferences focus and workspace remain intact. The Node API seeds a versioned document into PostgreSQL or SQLite and serves it through read-only `/api/curriculum`. Migration 0003 adds only the curriculum table. Public curriculum content contains no learner evidence, reviewer notes, provider credentials or hidden test implementation.

This is a curriculum release, not an assessment-service release. Local practice is possible with a browser/editor. The existing Code Lab opens Shared Preferences; it does not silently pretend to run every new HTML, API, Git or project activity. New automated grading, mission-specific workspaces, production progress, placement routing, recommendations, reviewer workflow and verified awards still require implementation. Public production release remains blocked.

## Educational organization

The eight paths are Web Development Foundations, JavaScript Foundations, JavaScript Application Development, React Foundations, Frontend Developer Foundation, Frontend Developer, React Application Development and Advanced Frontend Development. The career path progresses through stages A–I, with J reserved for optional specialization. React Specialist has a practical assessment specification; other specialist and non-frontend paths remain explicit future scope.

Related small concepts are grouped into authored lesson units rather than creating an empty page for every topic label. Each unit includes the problem, real-world context, mechanics, an example, practice, a deliberate defect, debugging guidance and transfer work. Mandatory activity briefs have explicit behaviour, explanation, modification and rubric records. Supporting reading never replaces practical completion. The original Programming Language Toggle App is acknowledged in Shared Preferences and preserved unchanged.

## Prerequisites and progression contract

Every unit, module and activity defines prerequisite records. References form a checked acyclic graph. Types are knowledge, skill, mission, project, assessment and verification. Hard prerequisites restrict assessed starts; soft prerequisites offer review guidance. Read-only exploration remains available. The normal React route requires the JavaScript Foundation checkpoint and async/module competence. A future practical placement assessment may establish equivalent entry evidence, but may not award skipped skills or certificates.

The current application exposes no curriculum-completion or evidence-write endpoint. When delivery is implemented, the server must resolve eligibility using authenticated, version-matched evaluator records, never client-submitted booleans, lesson views, XP or self-ratings. A missing evaluator or unavailable evidence must not unlock an assessed attempt. Preserve an eligibility decision containing the rule version and evidence IDs so the operator can answer why progression was allowed.

Unit completion requires the practice artifact, diagnosis and transfer task. Module completion adds its mandatory mission and practical assessment. Stage/path completion requires all mandatory references and ignores optional exploration. Completed means the curriculum requirement was satisfied; Demonstrated means practical evidence exists; Verified means the separate integrity process completed. No single universal developer level is inferred from one skill.

## Assessment and feedback

Every mandatory criterion is a gate. Quality criteria guide feedback and bonuses are optional; there is no arbitrary universal pass percentage. Public rubrics state expectations. Automated checks should inspect externally observable behaviour; reviewer checks cover reasoning and judgement, and hybrid checks combine them. Architecture is mandatory only where it is an explicit objective, such as Context in Shared Preferences.

Hidden tests may cover communicated edges but cannot introduce secret requirements. Their implementation and reviewer notes belong in protected server infrastructure, never in the public catalogue. Explanation assesses understanding, consequences and trade-offs rather than English polish. Debugging assesses reproduction, evidence, cause and regression checks rather than speed. Requirement changes modify the existing solution and retain previous behaviour.

Checkpoint outcomes are PASS, NEEDS_PRACTICE and ADDITIONAL_EVIDENCE_REQUIRED. Mission states are specified in `policy.mjs`. Service failures are a separate operational result, not a learner failure. Report partial successes against individual requirements. Preserve private attempts and remediation; do not expose a public history of mistakes. Low-stakes retakes follow feedback; verified retakes need equivalent fresh scenarios and an explicit published policy.

Code Coach may support diagnostic steps and allowed hints. It must not generate an assessed full solution, reveal protected tests or return another learner's work. Provider outages do not reduce learner outcomes.

## Evidence, skills and certificates

Evidence records require learner, activity, skill, competency coverage, level, difficulty, outcome, demonstrated/verified dates, curriculum and assessment versions, technology context, immutable submission reference, evaluator record and visibility. Supporting, Applied, Project, Assessment, Verified and Specialist evidence have different strength. Repeated narrow exercises cannot replace diverse competence. Recency is recorded without arbitrary universal expiry.

The JavaScript, React and Frontend competency maps specify depth by level. Advancement requires several appropriate sources, projects and checkpoints. Specialist requires Professional prerequisite evidence, at least two different substantial verified projects, unfamiliar-codebase work, domain judgement, explanation, modification and review. XP cannot establish any of these.

The initial certificate mappings are Web Development Foundations, JavaScript Foundations, React Foundations and Frontend Developer Foundation. Later mappings follow the application, advanced and professional paths. All issuance remains disabled. Each mapping inherits the path's mandatory modules, missions, project and checkpoint criteria. Verified issuance additionally needs immutable submissions, protected tests where specified, integrity checks, review, appeals, server-generated IDs, audit, public verification, revocation and appropriate privacy disclosure.

## Version changes and operations

Published documents are immutable by version. Startup uses insert-if-absent and rejects a different hash for the same version. Never fix that rejection by overwriting the old document. Bump the curriculum version, preserve the old document and plan any prerequisite equivalences explicitly. Future learner evidence and certificates must retain their original version. The app deploy version and curriculum version are separate.

Use an isolated database/schema for tests. Verify migration, readback and restart persistence before deploying. Never mix private learner records into curriculum fixtures. The readable curriculum is a generated review artifact, not another independently edited authority.

## Requirements coverage

| Supplied sections | Implementation |
| --- | --- |
| 1–7 | Versioned V1 scope, evidence-based levels, problem-first lesson structure and practical completion rules |
| 8–21 | Web, HTML, CSS, JavaScript and React through Professional; React Specialist specification |
| 22–33 | Git/GitHub, accessibility, testing, APIs, security, performance, responsive work, project ladder and separate difficulty |
| 34–71 | Typed prerequisite graph, completion/progression/placement/remediation/retake policies, versioning and capstone |
| 72–102 | Public rubrics, assessment dimensions, outcomes, evidence schema, competency maps and promotion rules |
| 103–116 | Disabled certificate mappings and authored Web Foundations modules |
| 117–133 | Responsive/accessibility/DevTools, web project/checkpoint and JavaScript modules with required practical work |
| 134–152 | Browser storage lifecycle, strings/JSON, validation, safe recovery, security limits, preferences mission and reading-list assessment |
| 153–167 | Vanilla task-manager project, public behaviour harness, debugging/README/portfolio requirements, independent checkpoint and transition into async/APIs/React |

The [fixture guide](../../curriculum/fixtures/README.md) explains deliberate broken examples and the adapter-based visible task-manager checks. Those checks are not connected to the production assessment engine.
