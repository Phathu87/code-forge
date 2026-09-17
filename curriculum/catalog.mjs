import { exercises } from "./fixtures/debugging.mjs";
import { modules } from "./content.mjs";
import {
  projects,
  checkpoints,
  paths,
  optionalSpecializations,
} from "./paths.mjs";
import { policy, competencyMaps } from "./policy.mjs";
export const version = "1.0.0";
const prereq = (target) => ({ target, type: "knowledge", strength: "hard" });
const levelDifficulty = {
  Beginner: "Easy",
  Foundation: "Moderate",
  Intermediate: "Moderate",
  Advanced: "Hard",
  Professional: "Challenging",
  Specialist: "Challenging",
};
function activity(value, kind, level, prerequisites, skills) {
  return {
    ...value,
    kind,
    version,
    level,
    difficulty: levelDifficulty[level],
    prerequisites,
    delivery: "brief-only",
    assessmentEnabled: false,
    skills,
    evidenceRequirements: skills.map((skill) => ({
      skill,
      level,
      strength:
        kind === "project"
          ? "Project"
          : kind === "assessment"
            ? "Assessment"
            : "Applied",
      verification: "not-awarded",
    })),
    rubric: [
      ...value.requirements.map((criterion, index) => ({
        id: `required-${index + 1}`,
        category: "required",
        method: "hybrid",
        criterion,
        automationStatus: "not-connected",
      })),
      {
        id: "explanation",
        category: "required",
        method: "reviewer",
        criterion: value.explanation,
        automationStatus: "not-applicable",
      },
      {
        id: "modification",
        category: "required",
        method: "hybrid",
        criterion: value.modification,
        automationStatus: "not-connected",
      },
      {
        id: "maintainability",
        category: "quality",
        method: "reviewer",
        criterion: `Readable names and appropriate structure for ${level} work; no penalty for an alternative valid implementation.`,
        automationStatus: "not-applicable",
      },
      ...value.bonus.map((criterion, index) => ({
        id: `bonus-${index + 1}`,
        category: "bonus",
        method: "reviewer",
        criterion,
        automationStatus: "not-applicable",
      })),
    ],
    testPlan: {
      status: "specified-not-implemented",
      visible: value.requirements,
      protectedImplementationIncluded: false,
      infrastructureOutcome: "Separate from learner failure",
    },
    completion: {
      required:
        "All required rubric criteria met with evaluator evidence; optional bonus never blocks.",
      runtimeErrors: "No blocking runtime error",
      verified: false,
    },
  };
}
const normalizedModules = modules.map((m) => {
  const units = m.lessons.map((lesson, index) => ({
    ...lesson,
    id: `${m.id}-unit-${index + 1}`,
    kind: "unit",
    version,
    level: m.level,
    prerequisites: index ? [prereq(`${m.id}-unit-${index}`)] : m.prerequisites,
    missionConnection: m.mission.id,
    completion: {
      required: [
        "Practice artifact demonstrates the stated objective",
        "Broken case diagnosed and explained",
        "Transfer application meets its stated behaviour",
      ],
      lessonViewsSuffice: false,
    },
  }));
  return {
    id: m.id,
    title: m.title,
    kind: "module",
    version,
    level: m.level,
    skills: m.skills,
    prerequisites: m.prerequisites,
    objectives: units.map((u) => u.objective),
    units,
    mission: activity(
      m.mission,
      "mission",
      m.level,
      [{ target: units.at(-1).id, type: "knowledge", strength: "hard" }],
      m.skills,
    ),
    assessment: activity(
      m.assessment,
      "assessment",
      m.level,
      [{ target: m.mission.id, type: "mission", strength: "hard" }],
      m.skills,
    ),
    completion: {
      required: [...units.map((u) => u.id), m.mission.id, m.assessment.id],
      evidenceRequired: true,
      lessonViewsSuffice: false,
    },
  };
});
export const curriculum = {
  id: "codeforge-developer-curriculum",
  version,
  title: "CodeForge Official Developer Curriculum",
  author: "Phathutshedzo Rakhunwana",
  contentStatus: "authored-v1",
  deliveryStatus: "reading-and-local-practice",
  practiceFixtures: exercises,
  policy,
  competencyMaps,
  paths,
  optionalSpecializations,
  modules: normalizedModules,
  projects: projects.map((p) =>
    activity(
      p,
      "project",
      p.level,
      p.prerequisites.map((target) => ({
        target,
        type: "skill",
        strength: "hard",
      })),
      p.skills,
    ),
  ),
  checkpoints: checkpoints.map((p) =>
    activity(
      p,
      "assessment",
      p.level,
      p.prerequisites.map((target) => ({
        target,
        type: "project",
        strength: "hard",
      })),
      p.skills,
    ),
  ),
};
export function allNodes(catalog = curriculum) {
  return [
    ...catalog.modules.flatMap((m) => [m, ...m.units, m.mission, m.assessment]),
    ...catalog.projects,
    ...catalog.checkpoints,
  ];
}
export function validateCurriculum(catalog = curriculum) {
  const nodes = allNodes(catalog);
  const byId = new Map();
  for (const node of nodes) {
    if (byId.has(node.id))
      throw new Error(`Duplicate curriculum ID: ${node.id}`);
    byId.set(node.id, node);
    if (
      !node.title ||
      node.version !== catalog.version ||
      !catalog.policy.levels.includes(node.level)
    )
      throw new Error(`Invalid metadata: ${node.id}`);
    if (!Array.isArray(node.prerequisites))
      throw new Error(`Missing prerequisites: ${node.id}`);
    if (
      node.kind === "unit" &&
      [
        "why",
        "example",
        "explanation",
        "code",
        "practice",
        "broken",
        "debug",
        "application",
        "missionConnection",
      ].some((key) => !node[key])
    )
      throw new Error(`Incomplete lesson: ${node.id}`);
    if (
      node.rubric &&
      (!node.rubric.some((r) => r.category === "required") ||
        !node.explanation ||
        !node.modification ||
        node.assessmentEnabled !== false)
    )
      throw new Error(`Unsafe activity: ${node.id}`);
  }
  for (const node of nodes)
    for (const dependency of node.prerequisites) {
      if (!byId.has(dependency.target))
        throw new Error(`Unknown prerequisite: ${dependency.target}`);
      if (
        !catalog.policy.progression.prerequisiteTypes.includes(
          dependency.type,
        ) ||
        !["hard", "soft"].includes(dependency.strength)
      )
        throw new Error(`Invalid prerequisite type: ${node.id}`);
    }
  const visiting = new Set(),
    done = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error(`Prerequisite cycle: ${id}`);
    if (done.has(id)) return;
    visiting.add(id);
    for (const p of byId.get(id).prerequisites) visit(p.target);
    visiting.delete(id);
    done.add(id);
  }
  nodes.forEach((n) => visit(n.id));
  for (const m of catalog.modules)
    for (const id of m.completion.required)
      if (!byId.has(id))
        throw new Error(`Unknown completion requirement: ${id}`);
  for (const p of catalog.paths)
    for (const stage of p.stages)
      for (const id of stage.requirements)
        if (!byId.has(id)) throw new Error(`Unknown path requirement: ${id}`);
  if (
    catalog.policy.certificates.issuanceEnabled ||
    catalog.policy.progression.enabled ||
    catalog.policy.assessment.enabled
  )
    throw new Error("Curriculum content cannot enable authoritative services.");
  return {
    modules: catalog.modules.length,
    units: nodes.filter((n) => n.kind === "unit").length,
    missions: nodes.filter((n) => n.kind === "mission").length,
    projects: catalog.projects.length,
    assessments: nodes.filter((n) => n.kind === "assessment").length,
    paths: catalog.paths.length,
  };
}

// Resolve prerequisite types from the referenced activity, not UI conditionals.
const nodeTypes = new Map(allNodes().map((node) => [node.id, node.kind]));
for (const node of allNodes())
  for (const dependency of node.prerequisites) {
    const kind = nodeTypes.get(dependency.target);
    dependency.type =
      kind === "module" ? "skill" : kind === "unit" ? "knowledge" : kind;
    if (node.id === "react-specialist" || node.id === "react-specialist-unit-1")
      dependency.type = "verification";
  }
