import { coverage } from "./coverage.mjs";
import { createHash } from "node:crypto";
import { curriculum, allNodes } from "../../curriculum/catalog.mjs";
export const digest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
export const failure = (status, message) =>
  Object.assign(new Error(message), { status });
export const types = [
  "knowledge",
  "practice",
  "mission",
  "debugging",
  "refactoring",
  "project",
  "checkpoint",
  "placement",
  "verified",
  "capstone",
  "specialist",
];
export const levels = curriculum.policy.levels;
export const nodes = allNodes();
export const certificateDefinitions = curriculum.paths
  .filter((p) =>
    [
      "web-foundations-v1",
      "javascript-foundations-v1",
      "react-foundations-v1",
      "frontend-developer-foundation-v1",
    ].includes(p.id),
  )
  .map((p) => ({
    id: p.id,
    version: curriculum.version,
    title: `CodeForge Verified Practical Skills Certificate: ${p.title}`,
    level: p.level,
    path: p.id,
    requirements: p.stages.flatMap((s) => s.requirements),
    integrityRequired: true,
    verificationRequired: true,
    requiredCompetencies: (p.id.startsWith("javascript")
      ? ["JavaScript"]
      : p.id.startsWith("react")
        ? ["React"]
        : ["Frontend Development"]
    ).flatMap((skill) =>
      levels
        .slice(0, levels.indexOf(p.level) + 1)
        .flatMap((level) =>
          (curriculum.competencyMaps[skill]?.[level] || [])
            .filter(
              (competency) =>
                p.id !== "web-foundations-v1" ||
                !["JavaScript", "Git"].includes(competency),
            )
            .map((competency) => ({ skill, level, competency })),
        ),
    ),
  }));
export function authoredDefinitions() {
  return nodes
    .filter((n) => n.kind !== "module")
    .map((n) => {
      const parent = curriculum.modules.find((m) =>
        m.units.some((u) => u.id === n.id),
      );
      const module = curriculum.modules.find((m) => m.assessment.id === n.id);
      const mapped = coverage[module?.id] || {};
      const competencies = Object.entries(mapped).flatMap(([skill, values]) =>
        values.flatMap((competency) =>
          Object.entries(curriculum.competencyMaps[skill])
            .filter(([, list]) => list.includes(competency))
            .map(([level]) => ({ skill, level, competency })),
        ),
      );
      const skills = [
        ...new Set([
          ...(n.skills || parent?.skills || []),
          ...(n.kind === "project" ? ["Frontend Development"] : []),
          ...competencies.map((c) => c.skill),
        ]),
      ];
      return {
        id: n.id,
        version: "1.0.0",
        curriculumVersion: curriculum.version,
        title: n.title,
        type:
          n.kind === "unit"
            ? "practice"
            : n.kind === "assessment"
              ? "checkpoint"
              : n.kind,
        level: n.level,
        technologies: skills,
        skills,
        competencies,
        prerequisites: n.prerequisites,
        attemptPolicy: { maxAttempts: 10, cooldownSeconds: 60 },
        requirements:
          n.kind === "unit" ? n.completion.required : n.requirements,
        criteria:
          n.kind === "unit"
            ? n.completion.required.map((text, i) => ({
                id: `practice-${i + 1}`,
                text,
                mandatory: true,
                method: "reviewer",
              }))
            : n.rubric
                .map((r) => ({
                  id: r.id,
                  text: r.criterion,
                  mandatory: r.category === "required",
                  method: r.method === "reviewer" ? "reviewer" : "hybrid",
                }))
                .concat(
                  competencies.map((c, i) => ({
                    id: `competency-${i + 1}`,
                    text: `Demonstrate ${c.skill}: ${c.competency} (${c.level}) through the submitted work and explanation.`,
                    mandatory: true,
                    method: "reviewer",
                  })),
                ),
        explanation: n.kind === "unit" ? n.debug : n.explanation,
        modification: n.kind === "unit" ? n.apply : n.modification,
        protectedRules: [],
        automatedRules: [],
        automationReady: false,
        xpReward: n.kind === "unit" ? 5 : n.kind === "project" ? 100 : 25,
        verificationRequired: n.level === "Specialist",
        placementTargets: [],
        evidenceCategory:
          n.kind === "unit"
            ? "Supporting"
            : n.kind === "project"
              ? "Project"
              : n.kind === "assessment"
                ? "Assessment"
                : "Applied",
        certificateRelationships: certificateDefinitions
          .filter(
            (c) =>
              c.requirements.includes(n.id) ||
              c.requirements.includes(parent?.id),
          )
          .map((c) => c.id),
      };
    });
}
export function validateDefinition(d) {
  const allowed = [
    "id",
    "version",
    "curriculumVersion",
    "title",
    "type",
    "level",
    "technologies",
    "skills",
    "competencies",
    "prerequisites",
    "attemptPolicy",
    "requirements",
    "criteria",
    "explanation",
    "modification",
    "protectedRules",
    "automatedRules",
    "automationReady",
    "xpReward",
    "verificationRequired",
    "placementTargets",
    "evidenceCategory",
    "certificateRelationships",
  ];
  if (d && Object.keys(d).some((k) => !allowed.includes(k)))
    throw failure(400, "Unknown definition fields are not permitted.");
  if (
    !d ||
    !/^[a-z0-9][a-z0-9-]{1,100}$/.test(d.id) ||
    !/^\d+\.\d+\.\d+$/.test(d.version) ||
    d.curriculumVersion !== curriculum.version ||
    !types.includes(d.type) ||
    !levels.includes(d.level) ||
    typeof d.title !== "string" ||
    !d.title.trim() ||
    d.title.length > 200
  )
    throw failure(400, "Invalid assessment identity or version.");
  if (
    !nodes.some((n) => n.id === d.id) &&
    !["knowledge", "placement"].includes(d.type)
  )
    throw failure(
      400,
      "Assessment must reference an official curriculum activity.",
    );
  for (const key of [
    "criteria",
    "prerequisites",
    "requirements",
    "skills",
    "competencies",
    "automatedRules",
    "protectedRules",
    "placementTargets",
  ])
    if (!Array.isArray(d[key])) throw failure(400, `Missing ${key}.`);
  if (
    !d.criteria.length ||
    d.criteria.length > 100 ||
    !d.criteria.some((c) => c.mandatory) ||
    new Set(d.criteria.map((c) => c.id)).size !== d.criteria.length
  )
    throw failure(400, "Provide unique mandatory criteria.");
  for (const c of d.criteria)
    if (
      !/^[\w-]{1,80}$/.test(c.id) ||
      typeof c.text !== "string" ||
      !c.text.trim() ||
      typeof c.mandatory !== "boolean" ||
      !["automated", "reviewer", "hybrid"].includes(c.method)
    )
      throw failure(400, "Invalid rubric criterion.");
  for (const p of d.prerequisites)
    if (
      !nodes.some((n) => n.id === p.target) ||
      !["hard", "soft"].includes(p.strength) ||
      !curriculum.policy.progression.prerequisiteTypes.includes(p.type)
    )
      throw failure(400, "Unknown prerequisite.");
  for (const c of d.competencies)
    if (
      !curriculum.competencyMaps[c.skill]?.[c.level]?.includes(c.competency) ||
      !levels.includes(c.level)
    )
      throw failure(400, "Unknown competency coverage.");
  if (
    !Number.isInteger(d.xpReward) ||
    d.xpReward < 0 ||
    d.xpReward > 1000 ||
    !Number.isInteger(d.attemptPolicy?.maxAttempts) ||
    d.attemptPolicy.maxAttempts < 1 ||
    d.attemptPolicy.maxAttempts > 100 ||
    !Number.isInteger(d.attemptPolicy.cooldownSeconds) ||
    d.attemptPolicy.cooldownSeconds < 0
  )
    throw failure(400, "Invalid attempt/reward policy.");
  if (
    typeof d.verificationRequired !== "boolean" ||
    typeof d.automationReady !== "boolean" ||
    ![
      "Supporting",
      "Applied",
      "Project",
      "Assessment",
      "Verified",
      "Specialist",
    ].includes(d.evidenceCategory)
  )
    throw failure(400, "Invalid evidence policy.");
  if (d.type === "placement" && d.prerequisites.length)
    throw failure(
      400,
      "Entry placement must not depend on the prerequisites it establishes.",
    );
  if (d.type !== "placement" && d.placementTargets.length)
    throw failure(400, "Only placement can establish entry equivalence.");
  for (const id of d.placementTargets)
    if (!nodes.some((n) => n.id === id && ["unit", "module"].includes(n.kind)))
      throw failure(400, "Invalid placement target.");
  for (const r of [...d.automatedRules, ...d.protectedRules])
    if (
      d.type !== "knowledge" ||
      r.kind !== "answer-equals" ||
      !d.criteria.some(
        (c) => c.id === r.criterion && c.method === "automated",
      ) ||
      typeof r.question !== "string" ||
      !r.question.trim() ||
      typeof r.answerKey !== "string" ||
      typeof r.expected !== "string"
    )
      throw failure(
        400,
        "Only declarative knowledge answer rules are supported by the built-in evaluator.",
      );
  if (
    d.type === "knowledge" &&
    d.criteria.some(
      (c) =>
        c.mandatory &&
        c.method === "automated" &&
        ![...d.automatedRules, ...d.protectedRules].some(
          (r) => r.criterion === c.id,
        ),
    )
  )
    throw failure(400, "Automated knowledge criterion lacks a rule.");
  if (d.level === "Specialist" && !d.verificationRequired)
    throw failure(400, "Specialist requires verification.");
  if (JSON.stringify(d).length > 150000)
    throw failure(400, "Assessment is too large.");
  return d;
}
export function publicDefinition(d) {
  const { protectedRules, automatedRules, ...safe } = d;
  return {
    ...safe,
    questions: [...automatedRules, ...protectedRules].map((r) => ({
      id: r.answerKey,
      prompt: r.question,
    })),
    protectedChecks: protectedRules.length > 0,
  };
}
export async function seedLearning(db) {
  const definitions = authoredDefinitions();
  for (const definition of definitions) validateDefinition(definition);
  const values = definitions.flatMap(d => [d.id, d.version, "PUBLISHED", JSON.stringify(d), digest(d), Date.now()]);
  await db.prepare(`INSERT INTO learning_definitions VALUES ${definitions.map(() => "(?,?,?,?,?,?)").join(",")} ON CONFLICT(id,version) DO NOTHING`).run(...values);
  const saved = await db.prepare("SELECT id,version,digest FROM learning_definitions").all();
  const hashes = new Map(saved.map(row => [`${row.id}:${row.version}`, row.digest]));
  for (const definition of definitions) {
    if (hashes.get(`${definition.id}:${definition.version}`) !== digest(definition)) {
      throw Error("Published assessment differs from source; create a new version.");
    }
  }
}
