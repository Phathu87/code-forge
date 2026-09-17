export const policy = {
  philosophy: "You write the code. We help you understand it.",
  cycle: [
    "Concept",
    "Practice",
    "Mission",
    "Project",
    "Assessment",
    "Evidence",
  ],
  levels: [
    "Beginner",
    "Foundation",
    "Intermediate",
    "Advanced",
    "Professional",
    "Specialist",
  ],
  difficulty: ["Easy", "Moderate", "Hard", "Challenging"],
  progression: {
    authority:
      "Server-recorded practical evidence; never lesson views, XP, streaks, payment, elapsed time or self-selected level.",
    enabled: false,
    prerequisiteTypes: [
      "knowledge",
      "skill",
      "mission",
      "project",
      "assessment",
      "verification",
    ],
    prerequisiteStrengths: ["hard", "soft"],
    hard: "Required before an assessed start. Read-only exploration is allowed. If the evidence service cannot establish eligibility, assessed start remains unavailable.",
    soft: "Show Review First and, when delivery is enabled, Continue Anyway. A recommendation does not create an artificial lock.",
    placement:
      "A practical implementation, code-reading, debugging and explanation checkpoint can establish entry prerequisites; it cannot award skipped project evidence or verified skills.",
    distinctions: {
      completed: "Required curriculum work satisfied.",
      demonstrated: "Practical evidence supports the competency.",
      verified: "The defined integrity and review process actually completed.",
    },
    primaryAndExploration:
      "A primary path guides recommendations; exploratory work retains its own evidence and does not abandon the primary path.",
    recommendations: [
      "Missing hard prerequisite",
      "Repeated relevant weak skill",
      "Current path objective",
      "Upcoming project requirement",
      "Evidence recency",
      "Learner goal",
    ],
    infrastructureFailure:
      "Record an infrastructure result separately; do not penalize the learner or infer a skill gap from unavailable tests.",
    unitRule:
      "Required practice artifact, debugging explanation and transfer task meet their visible criteria; opening a lesson alone does not complete it.",
    moduleRule:
      "Required units, mandatory mission, visible behaviour requirements and practical assessment all satisfied; no blocking runtime defect.",
    stageRule:
      "All mandatory module, mission, project and checkpoint evidence required by the stage; optional work does not block completion.",
  },
  assessment: {
    enabled: false,
    outcomes: ["PASS", "NEEDS_PRACTICE", "ADDITIONAL_EVIDENCE_REQUIRED"],
    missionStates: [
      "NOT_STARTED",
      "IN_PROGRESS",
      "REQUIREMENTS_NOT_MET",
      "TESTS_FAILED",
      "NEEDS_REVISION",
      "COMPLETED",
      "VERIFICATION_PENDING",
      "VERIFIED",
    ],
    methods: ["automated", "reviewer", "hybrid"],
    rule: "Every required criterion must be met. Quality informs feedback; bonus work cannot compensate for or block mandatory criteria. No universal percentage pass rule.",
    hiddenTests:
      "Protected implementation may test only published requirements and their communicated edge cases. Never require arbitrary variable names or one architecture unless that architecture is the objective.",
    explanation:
      "Judge code behaviour, choices, trade-offs and consequences. Do not grade English polish or spelling as programming competence.",
    debugging:
      "Require reproduction, relevant observations, a cause-related fix, verified behaviour and an appropriate explanation. Do not grade speed.",
    modification:
      "Use the learner’s existing solution, a new stated requirement, regression checks and explanation; do not ask for a complete rewrite as a shortcut.",
    retakes:
      "Practice is freely repeatable. Low-stakes checkpoints allow retry after feedback. Verified retakes use an equivalent new scenario and the published assessment policy; no automatic irreversible failure.",
    history:
      "Keep previous attempt, outcome, remediation and new attempt privately. Public evidence must not shame practice mistakes.",
    reviewerPrivacy:
      "Keep reviewer notes, integrity telemetry and protected tests separate from this public curriculum. Do not include real protected assessment implementation in frontend artifacts.",
    codeCoach:
      "Practice hints may identify a concept, diagnostic observation or next small step. During assessed work enforce allowed hint level; do not give complete solutions or hidden tests. Provider failures must not count as learner failure.",
  },
  evidence: {
    enabled: false,
    fields: [
      "id",
      "learnerId",
      "skill",
      "level",
      "competencyIds",
      "activityId",
      "difficulty",
      "outcome",
      "demonstratedAt",
      "verifiedAt",
      "verificationStatus",
      "curriculumVersion",
      "assessmentVersion",
      "technologyContext",
      "submissionSnapshotId",
      "evaluatorRecordId",
      "visibility",
    ],
    strengths: [
      "Supporting",
      "Applied",
      "Project",
      "Assessment",
      "Verified",
      "Specialist",
    ],
    privacy:
      "Private by default; publish only eligible evidence through explicit learner controls. Imported source is unverified and does not establish authorship.",
    recency:
      "Retain Last Demonstrated and Last Verified with curriculum/technology context. Aging evidence prompts review, not arbitrary deletion or universal expiry.",
    diversity:
      "Repeated evidence for one narrow competency cannot substitute for coverage of the level’s competency map.",
    promotion: {
      Foundation:
        "Purpose and fundamentals, guided practice, independent small solution and simple debugging from more than one activity.",
      Intermediate:
        "Foundation evidence, multiple interacting-concept missions, a complete project, testing evidence and a practical checkpoint.",
      Advanced:
        "Intermediate evidence plus unfamiliar feature, API, debugging, refactoring, testing, accessibility and architecture problems with justified trade-offs.",
      Professional:
        "Substantial projects, production-style briefs, requirement changes, architecture, testing, accessibility, documentation and explanation. Public verified claims require corresponding verified evidence.",
      Specialist:
        "Professional prerequisite, at least two distinct substantial verified projects, specialist investigation, unfamiliar codebase, domain-specific analysis, explanation, modification and verified practical review. Human assessment of depth is mandatory.",
    },
  },
  certificates: {
    issuanceEnabled: false,
    initialPaths: [
      "web-foundations-v1",
      "javascript-foundations-v1",
      "react-foundations-v1",
      "frontend-developer-foundation-v1",
    ],
    laterPaths: [
      "javascript-application-development-v1",
      "react-application-development-v1",
      "advanced-frontend-v1",
      "frontend-developer-v1",
    ],
    requirements: [
      "Versioned curriculum and assessment requirements",
      "All mandatory modules/missions/projects/checkpoints",
      "Immutable submission snapshot",
      "Server-authoritative eligibility and generated certificate ID",
      "Hidden tests where specified",
      "Explanation and modification challenge",
      "Integrity workflow and required review",
      "Appeals",
      "Audit trail",
      "Public verification and revocation",
      "Privacy disclosure",
    ],
    rule: "A path reaching 100%, an imported repository or XP cannot issue a certificate. All certificate names in this catalogue describe future mappings, not an available credential.",
  },
  technology: {
    reviewedOn: "2026-09-17",
    react:
      "React 18-compatible function components, hooks and Context.Provider match the existing runtime. Review major-version changes before changing assessment requirements.",
    javascript:
      "Modern ECMAScript modules and browser APIs; Node.js only for explicitly local tooling/tests. No Python, PHP or Java runtime is advertised.",
    viewportTargets: [320, 390, 768, 1024, 1440],
    touchTarget:
      "44 by 44 CSS pixels is the curriculum usability target, not a claim of complete standards conformance.",
    delivery:
      "Read lessons and briefs here. Use a local browser/editor for HTML, CSS, Vanilla JavaScript, Git and API fixture work. Existing Code Lab supports the Shared Preferences React exercise only; new mission workspaces, tests and assessment submission are not connected.",
  },
  sources: [
    {
      title: "React documentation",
      url: "https://react.dev/learn",
      use: "Review reference for React terminology and current documentation; teaching examples are authored for this curriculum.",
    },
    {
      title: "MDN web development",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
      use: "Further reading for web platform topics.",
    },
    {
      title: "MDN Web Storage",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API",
      use: "Review reference for storage lifetimes, strings and failure handling.",
    },
    {
      title: "W3C accessibility tutorials",
      url: "https://www.w3.org/WAI/tutorials/",
      use: "Further reading; practical and automated checks do not independently establish complete conformance.",
    },
    {
      title: "Git reference",
      url: "https://git-scm.com/docs",
      use: "Reference for installed Git command behaviour.",
    },
  ],
  futurePaths: [
    "Backend",
    "Full-Stack",
    "WordPress",
    "Mobile",
    "Python",
    "Java",
    ".NET",
    "PHP",
    "Node.js",
    "Vue",
    "DevOps / Cloud",
    "Software Testing specialization",
    "Accessibility specialization",
    "Frontend Performance specialization",
    "API Development",
    "Database Development",
  ],
};
export const competencyMaps = {
  JavaScript: {
    Beginner: [
      "values/types",
      "variables",
      "operators",
      "conditions",
      "functions",
      "scope",
      "arrays",
      "objects",
      "loops",
      "debugging",
    ],
    Foundation: [
      "array transformations",
      "modules",
      "DOM",
      "events",
      "forms",
      "JSON",
      "persistence",
      "immutability",
    ],
    Intermediate: [
      "async",
      "promises",
      "fetch",
      "HTTP",
      "errors",
      "testing",
      "application composition",
    ],
    Advanced: [
      "closures",
      "prototypes",
      "classes versus composition",
      "event loop",
      "cancellation",
      "concurrency",
      "performance",
      "architecture",
    ],
    Professional: [
      "unfamiliar-code debugging",
      "maintainability",
      "reliability",
      "review",
      "requirement changes",
    ],
    Specialist: ["deep domain review across diverse verified projects"],
  },
  React: {
    Beginner: [
      "JSX",
      "components",
      "props",
      "events",
      "state",
      "conditional rendering",
      "lists/keys",
    ],
    Foundation: [
      "forms",
      "state ownership",
      "composition",
      "effects",
      "Context",
      "hooks",
      "routing",
      "persistence",
    ],
    Intermediate: [
      "data fetching",
      "API states",
      "reducers",
      "validation",
      "accessibility",
      "component testing",
    ],
    Advanced: [
      "architecture",
      "provider boundaries",
      "profiling",
      "memoization judgement",
      "lazy loading",
      "error boundaries",
      "complex forms",
      "test strategy",
    ],
    Professional: [
      "production debugging",
      "prioritization",
      "maintainability",
      "technical explanation",
      "modification",
    ],
    Specialist: [
      "unfamiliar codebase",
      "deep mental model",
      "architecture judgement",
      "performance diagnosis",
      "verified diverse evidence",
    ],
  },
  "Frontend Development": {
    Beginner: ["browser fundamentals", "semantic HTML", "CSS"],
    Foundation: [
      "responsive design",
      "JavaScript",
      "accessibility",
      "Git",
      "debugging",
    ],
    Intermediate: ["React", "API integration", "testing", "forms and state"],
    Advanced: [
      "architecture",
      "performance",
      "security",
      "API reliability",
      "integration testing",
    ],
    Professional: [
      "deployment",
      "recovery",
      "client briefs",
      "documentation",
      "review",
      "capstone",
    ],
    Specialist: ["domain-specific evidence beyond general frontend completion"],
  },
};
