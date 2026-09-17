import { coverage } from "./coverage.mjs";
import { curriculum } from "../../curriculum/catalog.mjs";
import { nodes, levels, certificateDefinitions } from "./definitions.mjs";
export async function progressFor(db, userId) {
  const rows = await db
    .prepare(
      "SELECT e.*,a.state FROM learning_evidence e JOIN learning_attempts a ON a.id=e.attempt_id WHERE e.user_id=? AND e.curriculum_version=? ORDER BY e.created_at,e.id",
    )
    .all(userId, curriculum.version);
  const records = rows
    .filter((r) => ["PASSED", "VERIFIED"].includes(r.state))
    .map((r) => ({
      ...JSON.parse(r.document),
      id: r.id,
      activityId: r.activity_id,
      attemptId: r.attempt_id,
      verificationStatus: r.state === "VERIFIED" ? "VERIFIED" : "UNVERIFIED",
      createdAt: Number(r.created_at),
    }));
  const byActivity = new Map();
  for (const record of records) {
    if (record.verificationStatus === "VERIFIED" || byActivity.get(record.activityId)?.verificationStatus !== "VERIFIED") byActivity.set(record.activityId, record);
  }
  const placement = new Set(records.flatMap((r) => r.placementTargets || []));
  const memo = new Map();
  const completed = (id) => {
    if (memo.has(id)) return memo.get(id);
    const n = nodes.find((n) => n.id === id);
    const prerequisitesMet = (n?.prerequisites || [])
      .filter((p) => p.strength === "hard")
      .every((p) =>
        p.type === "verification"
          ? verified(p.target)
          : completed(p.target) || placement.has(p.target),
      );
    const result =
      prerequisitesMet &&
      (n?.kind === "module"
        ? n.completion.required.every(completed)
        : byActivity.has(id));
    memo.set(id, Boolean(result));
    return Boolean(result);
  };
  const verified = (id) => {
    const n = nodes.find((n) => n.id === id);
    return (
      completed(id) &&
      (n?.kind === "module"
        ? n.completion.required.every(verified)
        : byActivity.get(id)?.verificationStatus === "VERIFIED")
    );
  };
  const missingPrerequisites = (prereqs) =>
    prereqs
      .filter(
        (p) =>
          p.strength === "hard" &&
          !(p.type === "verification"
            ? verified(p.target)
            : completed(p.target) || placement.has(p.target)),
      )
      .map((p) => p.target);
  const attempts = await db
    .prepare(
      "SELECT id,definition_id,definition_version,state,created_at FROM learning_attempts WHERE user_id=? ORDER BY created_at DESC",
    )
    .all(userId);
  const items = nodes.map((n) => {
    const missing = missingPrerequisites(n.prerequisites);
    return {
      id: n.id,
      title: n.title,
      kind: n.kind,
      level: n.level,
      missingPrerequisites: missing,
      state: completed(n.id)
        ? verified(n.id)
          ? "VERIFIED"
          : "COMPLETED"
        : missing.length
          ? "LOCKED"
          : attempts.some((a) => a.definition_id === n.id)
            ? "IN_PROGRESS"
            : "AVAILABLE",
    };
  });
  const paths = curriculum.paths.map((p) => {
    const stages = p.stages.map((s, i) => ({
      id: `${p.id}:stage-${i + 1}`,
      title: s.title,
      requirements: s.requirements,
      missing: s.requirements.filter((id) => !completed(id)),
      completed: s.requirements.every(completed),
    }));
    const total = p.stages.flatMap((s) => s.requirements);
    return {
      id: p.id,
      title: p.title,
      stages,
      completed: total.every(completed),
      percent: Math.floor(
        (total.filter(completed).length * 100) / total.length,
      ),
    };
  });
  const skills = Object.entries(curriculum.competencyMaps).map(
    ([skill, map]) => {
      let awarded = null;
      const requirements = levels.map((level) => {
        const index = levels.indexOf(level);
        const requiredCompetencies = levels
          .slice(0, index + 1)
          .flatMap((l) =>
            (map[l] || []).map((competency) => ({ level: l, competency })),
          );
        const missingCompetencies = requiredCompetencies.filter(
          (c) =>
            !records.some(
              (r) =>
                completed(r.activityId) &&
                r.competencies?.some(
                  (e) =>
                    e.skill === skill &&
                    e.level === c.level &&
                    e.competency === c.competency,
                ),
            ),
        );
        const requiredActivities = nodes
          .filter(
            (n) =>
              ["module", "project", "assessment"].includes(n.kind) &&
              (n.skills?.includes(skill) ||
                coverage[n.id]?.[skill] ||
                curriculum.modules.some(
                  (m) => m.assessment.id === n.id && coverage[m.id]?.[skill],
                )) &&
              levels.indexOf(n.level) <= index,
          )
          .map((n) => n.id);
        const missingActivities = requiredActivities.filter(
          (id) => !completed(id),
        );
        const projects = records.filter(
          (r) =>
            completed(r.activityId) &&
            r.category === "Project" &&
            r.skills.includes(skill),
        );
        const distinctVerifiedProjects = new Set(
          projects
            .filter((r) => r.verificationStatus === "VERIFIED")
            .map((r) => r.activityId),
        ).size;
        const eligible =
          (index < 1 || projects.length >= 1) &&
          requiredActivities.length > 0 &&
          !missingActivities.length &&
          !missingCompetencies.length &&
          (level !== "Specialist" || distinctVerifiedProjects >= 2);
        if (eligible) awarded = level;
        return {
          level,
          eligible,
          missingActivities,
          missingCompetencies,
          distinctVerifiedProjects,
        };
      });
      return { skill, level: awarded, requirements };
    },
  );
  const xpRows = await db
    .prepare(
      "SELECT activity_id,amount FROM learning_xp WHERE user_id=? AND curriculum_version=?",
    )
    .all(userId, curriculum.version);
  return {
    curriculumVersion: curriculum.version,
    records: records.map((r) => ({ ...r, active: completed(r.activityId) })),
    items,
    paths,
    skills,
    attempts,
    xp: xpRows
      .filter((r) => completed(r.activity_id))
      .reduce((s, r) => s + Number(r.amount), 0),
    completed,
    verified,
    missingPrerequisites,
  };
}
export function certificateEligibility(progress, definition) {
  const missing = definition.requirements.filter(
    (id) => !progress.completed(id),
  );
  const missingCompetencies = (definition.requiredCompetencies || []).filter(
    (c) =>
      !progress.records.some(
        (r) =>
          progress.completed(r.activityId) &&
          r.verificationStatus === "VERIFIED" &&
          r.competencies?.some(
            (e) =>
              e.skill === c.skill &&
              e.level === c.level &&
              e.competency === c.competency,
          ),
      ),
  );
  const unverified = definition.requirements.filter(
    (id) => progress.completed(id) && !progress.verified(id),
  );
  return {
    id: definition.id,
    title: definition.title,
    curriculumVersion: definition.version,
    state: missing.length
      ? "NOT_ELIGIBLE"
      : unverified.length
        ? "VERIFICATION_PENDING"
        : missingCompetencies.length
          ? "ASSESSMENT_REQUIRED"
          : "ELIGIBLE",
    missing,
    unverified,
    missingCompetencies,
  };
}
export function publicProgress(p) {
  const { completed, verified, missingPrerequisites, ...safe } = p;
  return {
    ...safe,
    certificates: certificateDefinitions.map((d) =>
      certificateEligibility(p, d),
    ),
  };
}
