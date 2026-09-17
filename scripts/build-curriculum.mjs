import { mkdir, writeFile } from "node:fs/promises";
import { curriculum, validateCurriculum } from "../curriculum/catalog.mjs";
const counts = validateCurriculum();
await mkdir("docs/curriculum", { recursive: true });
const lines = [
  `# ${curriculum.title}`,
  `Version ${curriculum.version}. Author: ${curriculum.author}.`,
  curriculum.policy.philosophy,
  "This is authored learning content and a public assessment specification. Reading and local practice are available; automated assessment, evidence awards and certificate issuance remain disabled.",
  `Inventory: ${counts.paths} paths, ${counts.modules} modules, ${counts.units} lesson units, ${counts.missions} missions, ${counts.projects} projects and ${counts.assessments} assessment briefs.`,
];
for (const path of curriculum.paths) {
  lines.push(
    `## Path: ${path.title}`,
    `ID: ${path.id}. Version: ${path.version}.`,
  );
  for (const stage of path.stages)
    lines.push(
      `### ${stage.title}`,
      stage.requirements.join(", ") ||
        "Optional specialization; not required for graduation.",
    );
  lines.push(`Certificate mapping (disabled): ${path.certificateTitle}`);
}
function activity(n) {
  lines.push(
    `### ${n.title}`,
    `ID: ${n.id} | ${n.level} | ${n.difficulty} | ${n.kind}`,
    n.brief,
    "Prerequisites: " +
      n.prerequisites
        .map((p) => `${p.target} (${p.strength}, ${p.type})`)
        .join(", "),
    "#### Required behaviour",
    ...n.requirements.map((r) => `- ${r}`),
    "#### Explain",
    n.explanation,
    "#### Modify",
    n.modification,
    "#### Rubric",
    ...n.rubric.map((r) => `- **${r.category} / ${r.method}:** ${r.criterion}`),
    "Evidence requirements: " +
      n.evidenceRequirements.map((e) => `${e.skill}: ${e.strength}`).join("; "),
    "Test plan: specified, not connected to an evaluator. No protected test implementation is published.",
  );
}
for (const m of curriculum.modules) {
  lines.push(
    `## Module: ${m.title}`,
    `ID: ${m.id} | ${m.level} | Version ${m.version}`,
    "Prerequisites: " +
      (m.prerequisites
        .map((p) => `${p.target} (${p.strength}, ${p.type})`)
        .join(", ") || "None"),
    "### Objectives",
    ...m.objectives.map((o) => `- ${o}`),
  );
  for (const u of m.units)
    lines.push(
      `### Lesson: ${u.title}`,
      `ID: ${u.id}`,
      "Prerequisites: " +
        (u.prerequisites
          .map((p) => `${p.target} (${p.strength}, ${p.type})`)
          .join(", ") || "None"),
      "**Why it exists.** " + u.why,
      "**Real-world example.** " + u.example,
      "**How it works.** " + u.explanation,
      "```\n" + u.code + "\n```",
      "**Try it.** " + u.practice,
      "**Break it.** " + u.broken,
      "**Debug it.** " + u.debug,
      "**Apply it.** " + u.application,
      `Mission connection: ${u.missionConnection}. Completion requires practical work, diagnosis and transfer; lesson views never suffice.`,
    );
  activity(m.mission);
  activity(m.assessment);
  lines.push(
    "Module completion: " +
      m.completion.required.join(", ") +
      ". All require evaluator evidence; optional work does not block.",
  );
}
lines.push("## Project ladder");
curriculum.projects.forEach(activity);
lines.push("## Additional checkpoints");
curriculum.checkpoints.forEach(activity);
lines.push(
  "## Competency maps",
  ...Object.entries(curriculum.competencyMaps).flatMap(([skill, levels]) => [
    `### ${skill}`,
    ...Object.entries(levels).map(
      ([level, values]) => `- **${level}:** ${values.join(", ")}`,
    ),
  ]),
);
lines.push(
  "## Deliberate debugging fixtures",
  ...Object.entries(curriculum.practiceFixtures).flatMap(([id, f]) => [
    "### " + id,
    f.prompt,
    "```\n" + f.code + "\n```",
    "Expected behaviour: " + f.expectedBehaviour,
  ]),
);
lines.push(
  "## References",
  ...curriculum.policy.sources.map(
    (s) => `- [${s.title}](${s.url}) — ${s.use}`,
  ),
);
await writeFile(
  "docs/curriculum/official-curriculum-v1.md",
  lines.join("\n\n") + "\n",
);
await writeFile(
  "curriculum/v1.json",
  JSON.stringify(curriculum, null, 2) + "\n",
);
console.log(JSON.stringify(counts));
