import { jsPDF } from "jspdf";
import { randomUUID } from "node:crypto";
import { curriculum } from "../../curriculum/catalog.mjs";
import {
  digest,
  failure,
  validateDefinition,
  publicDefinition,
  certificateDefinitions,
  nodes,
} from "./definitions.mjs";
import {
  progressFor,
  publicProgress,
  certificateEligibility,
} from "./progress.mjs";
const now = () => Date.now();
const roles = (user, ...allowed) => {
  if (!allowed.includes(user.role))
    throw failure(403, "This operation requires a dedicated authorized role.");
};
const only = (data, keys) => {
  if (
    !data ||
    Array.isArray(data) ||
    typeof data !== "object" ||
    Object.keys(data).some((k) => !keys.includes(k))
  )
    throw failure(400, "Unsupported request fields.");
};
const text = (v, min = 1, max = 10000) =>
  typeof v === "string" && v.trim().length >= min && v.length <= max;
const key = (v) => {
  if (!text(v, 8, 100) || !/^[\w-]+$/.test(v))
    throw failure(400, "Supply a stable request key of 8-100 characters.");
  return v;
};
export async function transaction(db, work) {
  await db.exec("BEGIN IMMEDIATE");
  try {
    if (db.postgres) await db.exec("SELECT pg_advisory_xact_lock(81724502)");
    const result = await work();
    await db.exec("COMMIT");
    return result;
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
}
async function audit(db, actor, action, resource, document = {}) {
  await db
    .prepare("INSERT INTO learning_audit VALUES (?,?,?,?,?,?)")
    .run(
      randomUUID(),
      actor,
      action,
      resource,
      JSON.stringify(document),
      now(),
    );
}
async function definition(db, id, version) {
  const row = await db
    .prepare("SELECT * FROM learning_definitions WHERE id=? AND version=?")
    .get(id, version);
  if (!row) throw failure(404, "Assessment version not found.");
  return { ...row, value: JSON.parse(row.document) };
}
async function attempt(db, id) {
  const a = await db
    .prepare("SELECT * FROM learning_attempts WHERE id=?")
    .get(id);
  if (!a) throw failure(404, "Attempt not found.");
  return a;
}
async function owner(db, id, user) {
  const a = await attempt(db, id);
  if (a.user_id !== user.id) throw failure(404, "Attempt not found.");
  return a;
}
async function assigned(db, a, user) {
  roles(user, "reviewer");
  const assignment = await db
    .prepare("SELECT reviewer_id FROM learning_assignments WHERE attempt_id=?")
    .get(a.id);
  if (assignment?.reviewer_id !== user.id || a.user_id === user.id)
    throw failure(
      403,
      "Only the assigned reviewer can inspect or review this attempt.",
    );
}
async function event(db, a, eventKey, actor, kind, document) {
  const old = await db
    .prepare("SELECT * FROM learning_events WHERE attempt_id=? AND event_key=?")
    .get(a.id, eventKey);
  if (old) {
    if (
      old.kind !== kind ||
      digest(JSON.parse(old.document)) !== digest(document)
    )
      throw failure(409, "Request key was already used with different data.");
    return false;
  }
  await db
    .prepare("INSERT INTO learning_events VALUES (?,?,?,?,?,?,?)")
    .run(
      randomUUID(),
      a.id,
      eventKey,
      actor,
      kind,
      JSON.stringify(document),
      Math.max(
        now(),
        Number(
          (
            await db
              .prepare(
                "SELECT MAX(created_at) AS latest FROM learning_events WHERE attempt_id=?",
              )
              .get(a.id)
          ).latest || 0,
        ) + 1,
      ),
    );
  return true;
}
export async function evaluate(db, a, d) {
  const events = await db
    .prepare(
      "SELECT * FROM learning_events WHERE attempt_id=? ORDER BY created_at,id",
    )
    .all(a.id);
  const latest = (kind) => events.filter((e) => e.kind === kind).at(-1);
  const integrity = latest("integrity");
  const integrityValue = integrity ? JSON.parse(integrity.document) : null;
  let state = "REVIEW_REQUIRED";
  const run = latest("automated");
  const runValue = run ? JSON.parse(run.document) : null;
  const reviews = events
    .filter((e) => e.kind === "review")
    .map((e) => JSON.parse(e.document));
  const results = d.criteria.map((c) => {
    const reviewer = reviews.filter((r) => r.criterion === c.id).at(-1);
    const auto = runValue?.results?.find((r) => r.criterion === c.id);
    const needsAuto = ["automated", "hybrid"].includes(c.method),
      needsReview = ["reviewer", "hybrid"].includes(c.method);
    return {
      id: c.id,
      mandatory: c.mandatory,
      method: c.method,
      passed:
        (!needsAuto || auto?.passed === true) &&
        (!needsReview || reviewer?.result === "PASS"),
      reviewResult: reviewer?.result || null,
      automatedResult: needsAuto
        ? runValue?.infrastructureError
          ? "UNAVAILABLE"
          : auto?.passed === true
            ? "PASS"
            : auto?.passed === false
              ? "FAIL"
              : "PENDING"
        : null,
    };
  });
  const mandatory = results.filter((r) => r.mandatory);
  if (integrityValue?.status === "HOLD") state = "INTEGRITY_REVIEW_REQUIRED";
  else if (
    (await progressFor(db, a.user_id)).missingPrerequisites(d.prerequisites)
      .length
  )
    state = "REQUIREMENTS_NOT_MET";
  else if (
    runValue?.infrastructureError &&
    d.criteria.some((c) => c.mandatory && c.method !== "reviewer")
  )
    state = "INFRASTRUCTURE_ERROR";
  else if (mandatory.some((r) => r.automatedResult === "FAIL"))
    state = "TESTS_FAILED";
  else if (mandatory.some((r) => r.reviewResult === "FAIL"))
    state = "NEEDS_REVISION";
  else if (mandatory.some((r) => r.reviewResult === "MORE_EVIDENCE"))
    state = "ADDITIONAL_EVIDENCE_REQUIRED";
  else if (mandatory.every((r) => r.passed))
    state =
      d.verificationRequired && integrityValue?.status !== "VERIFIED"
        ? "VERIFICATION_PENDING"
        : integrityValue?.status === "VERIFIED"
          ? "VERIFIED"
          : "PASSED";
  await db
    .prepare("UPDATE learning_attempts SET state=? WHERE id=?")
    .run(state, a.id);
  if (["PASSED", "VERIFIED"].includes(state)) {
    const record = {
      curriculumVersion: d.curriculumVersion,
      assessmentVersion: d.version,
      skills: d.skills,
      competencies: d.competencies,
      level: d.level,
      category: d.evidenceCategory,
      prerequisites: d.prerequisites,
      placementTargets: d.placementTargets,
      snapshotHash: a.snapshot_hash,
      requirements: results,
      gradeEventIds: events.map((e) => e.id),
    };
    await db
      .prepare(
        "INSERT INTO learning_evidence VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(attempt_id) DO NOTHING",
      )
      .run(
        randomUUID(),
        a.user_id,
        d.id,
        d.curriculumVersion,
        d.version,
        a.id,
        JSON.stringify(record),
        now(),
      );
    await db
      .prepare(
        "INSERT INTO learning_xp VALUES (?,?,?,?,?) ON CONFLICT(user_id,activity_id,curriculum_version) DO NOTHING",
      )
      .run(a.user_id, d.id, d.curriculumVersion, d.xpReward, a.id);
  }
  const progress = await progressFor(db, a.user_id);
  const issued = await db
    .prepare(
      "SELECT id,document FROM learning_certificates WHERE user_id=? AND status='VALID'",
    )
    .all(a.user_id);
  for (const cert of issued)
    if (
      certificateEligibility(progress, JSON.parse(cert.document).definition)
        .state !== "ELIGIBLE" ||
      JSON.parse(cert.document).evidenceIds.some(id => !progress.records.some(record => record.id === id && record.active && record.verificationStatus === "VERIFIED"))
    ) {
      await db
        .prepare(
          "UPDATE learning_certificates SET status='REVOKED',revoked_at=? WHERE id=?",
        )
        .run(now(), cert.id);
      await audit(db, null, "certificate.revoked.evidence", cert.id, {
        attemptId: a.id,
      });
    }
  return { id: a.id, state, criteria: results };
}
function validateSnapshot(s) {
  only(s, ["files", "explanation", "modification", "answers", "projectId"]);
  if (
    !Array.isArray(s.files) ||
    s.files.length > 100 ||
    !text(s.explanation, 1, 20000) ||
    !text(s.modification, 1, 20000) ||
    JSON.stringify(s).length > 600000
  )
    throw failure(
      400,
      "Submit source, an explanation and modification evidence within size limits.",
    );
  const paths = new Set();
  for (const f of s.files) {
    only(f, ["path", "content"]);
    if (
      !text(f.path, 1, 200) ||
      !/^[\w./ -]+$/.test(f.path) ||
      f.path.startsWith("/") ||
      f.path.split("/").includes("..") ||
      paths.has(f.path) ||
      typeof f.content !== "string" ||
      f.content.length > 500000
    )
      throw failure(400, "Invalid source snapshot.");
    paths.add(f.path);
  }
  if (
    s.answers &&
    (typeof s.answers !== "object" ||
      Array.isArray(s.answers) ||
      Object.entries(s.answers).some(
        ([k, v]) =>
          !text(k, 1, 100) || typeof v !== "string" || v.length > 10000,
      ))
  )
    throw failure(400, "Invalid answer data.");
}
export function createLearningService(
  db,
  {
    enabled = true,
    verifiedEnabled = false,
    certificatesEnabled = false,
    runner = null,
    origin,
  },
) {
  const active = () => {
    if (!enabled)
      throw failure(
        503,
        "Assessment submission is not enabled in this environment.",
      );
  };
  const service = {
    async catalog() {
      const rows = await db
        .prepare(
          "SELECT document FROM learning_definitions WHERE state='PUBLISHED'",
        )
        .all();
      return {
        enabled,
        verifiedEnabled,
        certificatesEnabled,
        definitions: rows.map((r) => publicDefinition(JSON.parse(r.document))),
      };
    },
    async progress(user) {
      return publicProgress(await progressFor(db, user.id));
    },
    async start(user, data) {
      active();
      only(data, ["assessmentId", "version", "requestKey"]);
      key(data.requestKey);
      return transaction(db, async () => {
        const def = await definition(db, data.assessmentId, data.version);
        if (def.state !== "PUBLISHED")
          throw failure(409, "Assessment is not published.");
        const d = def.value;
        const old = await db
          .prepare(
            "SELECT id,state FROM learning_attempts WHERE user_id=? AND definition_id=? AND definition_version=? AND request_key=?",
          )
          .get(user.id, d.id, d.version, data.requestKey);
        if (old) return old;
        const progress = await progressFor(db, user.id);
        const missing = progress.missingPrerequisites(d.prerequisites);
        if (missing.length)
          throw failure(
            409,
            `Complete required prerequisites: ${missing.join(", ")}.`,
          );
        const previous = await db
          .prepare(
            "SELECT * FROM learning_attempts WHERE user_id=? AND definition_id=? AND definition_version=? ORDER BY created_at DESC",
          )
          .all(user.id, d.id, d.version);
        const latest = previous[0];
        if (
          latest &&
          ![
            "REQUIREMENTS_NOT_MET",
            "TESTS_FAILED",
            "NEEDS_REVISION",
            "ADDITIONAL_EVIDENCE_REQUIRED",
            "PASSED",
            "VERIFIED",
          ].includes(latest.state)
        )
          throw failure(
            409,
            "Resume the existing attempt; pending or infrastructure-failed attempts do not require a retake.",
          );
        if (previous.length >= d.attemptPolicy.maxAttempts)
          throw failure(
            429,
            "Attempt limit reached; contact support for review.",
          );
        if (
          latest &&
          now() - Number(latest.created_at) <
            d.attemptPolicy.cooldownSeconds * 1000
        )
          throw failure(429, "Review the feedback before starting a retake.");
        const id = randomUUID();
        await db
          .prepare(
            "INSERT INTO learning_attempts (id,user_id,definition_id,definition_version,request_key,state,created_at) VALUES (?,?,?,?,?,?,?)",
          )
          .run(
            id,
            user.id,
            d.id,
            d.version,
            data.requestKey,
            "IN_PROGRESS",
            now(),
          );
        await audit(db, user.id, "attempt.started", id, {
          definition: d.id,
          version: d.version,
        });
        return { id, state: "IN_PROGRESS" };
      });
    },
    async submit(user, id, data) {
      active();
      only(data, ["snapshot"]);
      validateSnapshot(data.snapshot);
      return transaction(db, async () => {
        const a = await owner(db, id, user);
        const def = await definition(db, a.definition_id, a.definition_version);
        const d = def.value;
        const hash = digest(data.snapshot);
        if (a.snapshot_hash) {
          if (a.snapshot_hash !== hash)
            throw failure(
              409,
              "Submission is immutable. Create a permitted retake to change it.",
            );
          return { id: a.id, state: a.state, snapshotHash: hash };
        }
        if (def.state !== "PUBLISHED" || a.state !== "IN_PROGRESS")
          throw failure(409, "Attempt cannot be submitted.");
        const p = await progressFor(db, user.id);
        if (p.missingPrerequisites(d.prerequisites).length)
          throw failure(409, "Prerequisite evidence is no longer valid.");
        if (data.snapshot.projectId) {
          const project = await db
            .prepare("SELECT id FROM github_imports WHERE id=? AND user_id=?")
            .get(data.snapshot.projectId, user.id);
          if (!project) throw failure(404, "Project not found.");
        }
        if (d.type !== "knowledge" && !data.snapshot.files.length)
          throw failure(400, "Practical work requires source files.");
        await db
          .prepare(
            "UPDATE learning_attempts SET snapshot=?,snapshot_hash=?,submitted_at=?,state='SUBMITTED' WHERE id=?",
          )
          .run(JSON.stringify(data.snapshot), hash, now(), id);
        await event(db, a, "submission", user.id, "submission", { hash });
        await audit(db, user.id, "attempt.submitted", id, { hash });
        return { id, state: "SUBMITTED", snapshotHash: hash };
      });
    },
    async detail(user, id) {
      const a = await attempt(db, id);
      if (a.user_id !== user.id) await assigned(db, a, user);
      const d = (await definition(db, a.definition_id, a.definition_version))
        .value;
      const events = await db
        .prepare(
          "SELECT id,kind,document,created_at FROM learning_events WHERE attempt_id=? ORDER BY created_at,id",
        )
        .all(id);
      return {
        id: a.id,
        assessmentId: a.definition_id,
        version: a.definition_version,
        state: a.state,
        snapshotHash: a.snapshot_hash,
        snapshot: a.snapshot ? JSON.parse(a.snapshot) : null,
        definition: publicDefinition(d),
        events: events.map((e) => ({
          id: e.id,
          kind: e.kind,
          createdAt: Number(e.created_at),
          ...(["review", "integrity"].includes(e.kind)
            ? {
                summary:
                  JSON.parse(e.document).result ||
                  JSON.parse(e.document).status,
                criterion: JSON.parse(e.document).criterion,
                feedback: JSON.parse(e.document).feedback || "",
              }
            : e.kind === "automated"
              ? {
                  infrastructureError: Boolean(
                    JSON.parse(e.document).infrastructureError,
                  ),
                }
              : {}),
        })),
      };
    },
    async grade(user, id, data) {
      active();
      only(data, ["requestKey"]);
      key(data.requestKey);
      return transaction(db, async () => {
        const a = await owner(db, id, user);
        if (!a.snapshot_hash) throw failure(409, "Submit the attempt first.");
        if (["PASSED", "VERIFIED"].includes(a.state))
          return { id, state: a.state };
        const d = (await definition(db, a.definition_id, a.definition_version))
          .value;
        const existing = await db
          .prepare(
            "SELECT id FROM learning_events WHERE attempt_id=? AND event_key=?",
          )
          .get(id, `run-${data.requestKey}`);
        if (existing) return { id, state: a.state };
        let outcome;
        if (d.type === "knowledge") {
          const answers = JSON.parse(a.snapshot).answers || {};
          const rules = [...d.automatedRules, ...d.protectedRules];
          outcome = {
            infrastructureError: false,
            results: d.criteria
              .filter((c) => c.method === "automated")
              .map((c) => ({
                criterion: c.id,
                passed: rules
                  .filter((r) => r.criterion === c.id)
                  .every((r) => answers[r.answerKey] === r.expected),
              })),
          };
        } else if (!d.criteria.some((c) => c.method !== "reviewer"))
          outcome = { infrastructureError: false, results: [] };
        else if (!runner || !d.automationReady)
          outcome = { infrastructureError: true, results: [] };
        else {
          try {
            outcome = await runner({
              attemptId: id,
              snapshotHash: a.snapshot_hash,
              snapshot: JSON.parse(a.snapshot),
              definition: d,
            });
          } catch {
            outcome = { infrastructureError: true, results: [] };
          }
        }
        if (
          !outcome ||
          typeof outcome.infrastructureError !== "boolean" ||
          !Array.isArray(outcome.results) ||
          outcome.results.some(
            (r) =>
              !d.criteria.some(
                (c) => c.id === r.criterion && c.method !== "reviewer",
              ) || typeof r.passed !== "boolean",
          ) ||
          new Set(outcome.results.map((r) => r.criterion)).size !==
            outcome.results.length
        )
          throw failure(502, "Invalid evaluator response.");
        if (
          !outcome.infrastructureError &&
          d.criteria.some(
            (c) =>
              c.mandatory &&
              c.method !== "reviewer" &&
              !outcome.results.some((r) => r.criterion === c.id),
          )
        )
          throw failure(502, "Evaluator omitted a required result.");
        await event(db, a, `run-${data.requestKey}`, null, "automated", {
          ...outcome,
          snapshotHash: a.snapshot_hash,
          definitionVersion: d.version,
        });
        await audit(db, user.id, "attempt.grading", id, {
          infrastructureError: outcome.infrastructureError,
        });
        return evaluate(db, a, d);
      });
    },
    async assign(user, id, data) {
      roles(user, "review_manager");
      only(data, ["reviewerId"]);
      return transaction(db, async () => {
        const a = await attempt(db, id);
        const r = await db
          .prepare("SELECT id,role,verified FROM users WHERE id=?")
          .get(data.reviewerId);
        if (r?.role !== "reviewer" || !r.verified || r.id === a.user_id)
          throw failure(400, "Choose a separate reviewer.");
        await db
          .prepare(
            "INSERT INTO learning_assignments VALUES (?,?) ON CONFLICT(attempt_id) DO UPDATE SET reviewer_id=excluded.reviewer_id",
          )
          .run(id, r.id);
        await audit(db, user.id, "review.assigned", id, { reviewerId: r.id });
        return { assigned: true };
      });
    },
    async queue(user) {
      roles(user, "reviewer");
      return db
        .prepare(
          "SELECT a.id,a.definition_id,a.definition_version,a.state FROM learning_attempts a JOIN learning_assignments s ON s.attempt_id=a.id WHERE s.reviewer_id=?",
        )
        .all(user.id);
    },
    async review(user, id, data) {
      active();
      only(data, ["requestKey", "criterion", "result", "notes", "feedback"]);
      key(data.requestKey);
      if (
        !["PASS", "FAIL", "MORE_EVIDENCE"].includes(data.result) ||
        !text(data.notes, 10, 10000) ||
        (data.feedback !== undefined && data.feedback !== "" && !text(data.feedback, 1, 5000))
      )
        throw failure(400, "Review needs a result and substantive notes.");
      return transaction(db, async () => {
        const a = await attempt(db, id);
        await assigned(db, a, user);
        if (!a.snapshot_hash)
          throw failure(409, "No immutable submission to review.");
        const d = (await definition(db, a.definition_id, a.definition_version))
          .value;
        const criterion = d.criteria.find((c) => c.id === data.criterion);
        if (!criterion || criterion.method === "automated")
          throw failure(400, "This criterion requires an automated evaluator.");
        await event(db, a, `review-${data.requestKey}`, user.id, "review", {
          criterion: data.criterion,
          result: data.result,
          notes: data.notes,
          feedback: data.feedback || "",
          snapshotHash: a.snapshot_hash,
        });
        await audit(db, user.id, "review.decided", id, {
          criterion: data.criterion,
          result: data.result,
        });
        return evaluate(db, a, d);
      });
    },
    async integrity(user, id, data) {
      roles(user, "integrity_reviewer");
      only(data, ["requestKey", "status", "reason", "evidenceReferences"]);
      key(data.requestKey);
      if (
        !["HOLD", "CLEAR", "VERIFIED"].includes(data.status) ||
        !text(data.reason, 10, 10000) ||
        !Array.isArray(data.evidenceReferences) ||
        !data.evidenceReferences.length ||
        data.evidenceReferences.some((r) => !text(r, 1, 200))
      )
        throw failure(
          400,
          "Integrity decisions need a reason and evidence references.",
        );
      if (data.status === "VERIFIED" && !verifiedEnabled)
        throw failure(
          503,
          "Verified learning is disabled by release controls.",
        );
      return transaction(db, async () => {
        const a = await attempt(db, id);
        if (a.user_id === user.id || !a.snapshot_hash)
          throw failure(403, "A separate submitted assessment is required.");
        await event(
          db,
          a,
          `integrity-${data.requestKey}`,
          user.id,
          "integrity",
          {
            status: data.status,
            reason: data.reason,
            evidenceReferences: data.evidenceReferences,
          },
        );
        await audit(db, user.id, "integrity.decided", id, {
          status: data.status,
        });
        const result = await evaluate(
          db,
          a,
          (await definition(db, a.definition_id, a.definition_version)).value,
        );
        if (data.status === "HOLD") {
          const certs = await db
            .prepare(
              "SELECT id,document FROM learning_certificates WHERE user_id=? AND status='VALID'",
            )
            .all(a.user_id);
          for (const c of certs) {
            const doc = JSON.parse(c.document);
            if (doc.attemptIds.includes(id)) {
              await db
                .prepare(
                  "UPDATE learning_certificates SET status='REVOKED',revoked_at=? WHERE id=?",
                )
                .run(now(), c.id);
              await audit(db, user.id, "certificate.revoked.integrity", c.id, {
                attempt: id,
              });
            }
          }
        }
        return result;
      });
    },
    async definitions(user) {
      roles(user, "curriculum_maintainer");
      return (await db.prepare("SELECT * FROM learning_definitions").all()).map(
        (r) => ({ ...r, document: JSON.parse(r.document) }),
      );
    },
    async saveDefinition(user, data) {
      roles(user, "curriculum_maintainer");
      only(data, ["definition"]);
      const d = validateDefinition(data.definition);
      return transaction(db, async () => {
        const old = await db
          .prepare(
            "SELECT state FROM learning_definitions WHERE id=? AND version=?",
          )
          .get(d.id, d.version);
        if (old && old.state !== "DRAFT")
          throw failure(
            409,
            "Create a new draft version; published/reviewed content cannot be overwritten.",
          );
        await db
          .prepare(
            "INSERT INTO learning_definitions VALUES (?,?,?,?,?,?) ON CONFLICT(id,version) DO UPDATE SET document=excluded.document,digest=excluded.digest",
          )
          .run(d.id, d.version, "DRAFT", JSON.stringify(d), digest(d), now());
        await audit(db, user.id, "definition.draft", d.id, {
          version: d.version,
          digest: digest(d),
        });
        return { id: d.id, version: d.version, state: "DRAFT" };
      });
    },
    async publish(user, id, version, data) {
      roles(user, "curriculum_maintainer");
      only(data, ["state"]);
      return transaction(db, async () => {
        const row = await definition(db, id, version);
        if (
          !{
            DRAFT: ["REVIEW"],
            REVIEW: ["PUBLISHED"],
            PUBLISHED: ["ARCHIVED"],
            ARCHIVED: [],
          }[row.state]?.includes(data.state)
        )
          throw failure(409, "Invalid publication transition.");
        validateDefinition(row.value);
        await db
          .prepare(
            "UPDATE learning_definitions SET state=? WHERE id=? AND version=?",
          )
          .run(data.state, id, version);
        await audit(db, user.id, "definition." + data.state.toLowerCase(), id, {
          version,
          digest: row.digest,
        });
        return { state: data.state };
      });
    },
    async certificates(user) {
      return (
        await db
          .prepare(
            "SELECT id,status,document,issued_at FROM learning_certificates WHERE user_id=?",
          )
          .all(user.id)
      ).map((r) => ({
        id: r.id,
        status: r.status,
        ...JSON.parse(r.document),
        issuedAt: Number(r.issued_at),
      }));
    },
    async issue(user, data) {
      roles(user, "credential_admin");
      only(data, ["learnerId", "definitionId"]);
      if (!certificatesEnabled || !verifiedEnabled)
        throw failure(
          503,
          "Authoritative certificates remain disabled by release controls.",
        );
      return transaction(db, async () => {
        const d = certificateDefinitions.find(
          (c) => c.id === data.definitionId,
        );
        if (!d) throw failure(404, "Certificate definition not found.");
        const learner = await db
          .prepare("SELECT id,name FROM users WHERE id=?")
          .get(data.learnerId);
        if (!learner || !learner.name.trim())
          throw failure(409, "Learner identity is incomplete.");
        const consent = await db
          .prepare(
            "SELECT created_at FROM learning_consents WHERE user_id=? AND definition_id=? AND curriculum_version=?",
          )
          .get(learner.id, d.id, d.version);
        if (!consent)
          throw failure(
            409,
            "Learner consent to public verification is required.",
          );
        const p = await progressFor(db, learner.id);
        const eligible = certificateEligibility(p, d);
        if (eligible.state !== "ELIGIBLE")
          throw failure(409, `Certificate is ${eligible.state.toLowerCase()}.`);
        const existing = await db
          .prepare(
            "SELECT id,status FROM learning_certificates WHERE user_id=? AND definition_id=? AND curriculum_version=?",
          )
          .get(learner.id, d.id, d.version);
        if (existing) return existing;
        const id = randomUUID();
        const requiredLeaves = new Set();
        const expand = (id) => {
          const n = nodes.find((n) => n.id === id);
          if (n?.kind === "module") n.completion.required.forEach(expand);
          else requiredLeaves.add(id);
        };
        d.requirements.forEach(expand);
        const evidence = [...new Map(p.records.filter((r) =>
          requiredLeaves.has(r.activityId) && r.active && r.verificationStatus === "VERIFIED",
        ).map(record => [record.activityId, record])).values()];
        const doc = {
          learnerName: learner.name,
          title: d.title,
          level: d.level,
          curriculumVersion: d.version,
          definition: d,
          assessmentVersions: [
            ...new Set(
              evidence.map((r) => `${r.activityId}@${r.assessmentVersion}`),
            ),
          ],
          skills: [...new Set(evidence.flatMap((r) => r.skills))],
          evidenceIds: evidence.map((r) => r.id),
          attemptIds: evidence.map((r) => r.attemptId),
          verificationUrl: `${origin}/verify/${id}`,
        };
        await db
          .prepare(
            "INSERT INTO learning_certificates VALUES (?,?,?,?,?,?,?,?,?)",
          )
          .run(
            id,
            learner.id,
            d.id,
            d.version,
            "VALID",
            1,
            JSON.stringify(doc),
            now(),
            null,
          );
        await audit(db, user.id, "certificate.issued", id, {
          consentedAt: Number(consent.created_at),
        });
        return { id, status: "VALID" };
      });
    },
    async consent(user, data) {
      only(data, ["definitionId", "allowPublicVerification"]);
      const d = certificateDefinitions.find((c) => c.id === data.definitionId);
      if (!d || typeof data.allowPublicVerification !== "boolean")
        throw failure(400, "Choose a certificate and a consent decision.");
      return transaction(db, async () => {
        if (data.allowPublicVerification)
          await db
            .prepare(
              "INSERT INTO learning_consents VALUES (?,?,?,?) ON CONFLICT(user_id,definition_id,curriculum_version) DO NOTHING",
            )
            .run(user.id, d.id, d.version, now());
        else {
          await db
            .prepare(
              "DELETE FROM learning_consents WHERE user_id=? AND definition_id=? AND curriculum_version=?",
            )
            .run(user.id, d.id, d.version);
          await db
            .prepare(
              "UPDATE learning_certificates SET public_consent=0 WHERE user_id=? AND definition_id=? AND curriculum_version=?",
            )
            .run(user.id, d.id, d.version);
        }
        await audit(db, user.id, "certificate.consent", d.id, {
          allow: data.allowPublicVerification,
        });
        return { saved: true };
      });
    },
    async document(user, id) {
      const c = await db
        .prepare("SELECT * FROM learning_certificates WHERE id=? AND user_id=?")
        .get(id, user.id);
      if (!c) throw failure(404, "Certificate not found.");
      const record = JSON.parse(c.document);
      if (/[^\x20-\x7e]/.test(record.learnerName)) throw failure(503, "Certificate PDF font support for this name is not available yet.");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(13, 162, 231);
      pdf.setFontSize(24);
      pdf.text("CodeForge", 20, 25);
      pdf.setTextColor(20, 24, 32);
      pdf.setFontSize(22);
      pdf.text(pdf.splitTextToSize(record.learnerName, 250), 20, 48);
      pdf.setFontSize(16);
      pdf.text(pdf.splitTextToSize(record.title, 250), 20, 70);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text(
        pdf.splitTextToSize(
          `Level: ${record.level} | Status: ${c.status}\nIssued: ${new Date(Number(c.issued_at)).toISOString().slice(0, 10)}\nCurriculum: ${record.curriculumVersion}\nSkills: ${record.skills.join(", ")}\nCertificate ID: ${id}\nVerify: ${record.verificationUrl}`,
          250,
        ),
        20,
        105,
      );
      return {
        filename: `codeforge-certificate-${id}.pdf`,
        contentType: "application/pdf",
        base64: Buffer.from(pdf.output("arraybuffer")).toString("base64"),
      };
    },
    async verify(id) {
      if (!/^[0-9a-f-]{36}$/.test(id)) return { status: "NOT_FOUND" };
      const c = await db
        .prepare("SELECT * FROM learning_certificates WHERE id=?")
        .get(id);
      if (!c || !c.user_id || !c.public_consent) return { status: "NOT_FOUND" };
      const d = JSON.parse(c.document);
      return {
        id: c.id,
        status: c.status,
        learnerName: d.learnerName,
        title: d.title,
        level: d.level,
        skills: d.skills,
        curriculumVersion: d.curriculumVersion,
        assessmentVersions: d.assessmentVersions,
        issuedAt: Number(c.issued_at),
        verificationUrl: d.verificationUrl,
      };
    },
    async revoke(user, id, data) {
      roles(user, "credential_admin");
      only(data, ["reason"]);
      if (!text(data.reason, 10, 2000))
        throw failure(400, "Revocation requires a reason.");
      return transaction(db, async () => {
        const c = await db
          .prepare("SELECT id,status FROM learning_certificates WHERE id=?")
          .get(id);
        if (!c) throw failure(404, "Certificate not found.");
        if (c.status === "REVOKED") return { id, status: c.status };
        await db
          .prepare(
            "UPDATE learning_certificates SET status='REVOKED',revoked_at=? WHERE id=?",
          )
          .run(now(), id);
        await audit(db, user.id, "certificate.revoked", id, {
          reason: data.reason,
        });
        return { id, status: "REVOKED" };
      });
    },
    async export(user) {
      return {
        progress: await service.progress(user),
        attempts: await Promise.all(
          (
            await db
              .prepare("SELECT id FROM learning_attempts WHERE user_id=?")
              .all(user.id)
          ).map((a) => service.detail(user, a.id)),
        ),
        certificates: await service.certificates(user),
      };
    },
    async eraseIdentity(user) {
      const cs = await db
        .prepare("SELECT id FROM learning_certificates WHERE user_id=?")
        .all(user.id);
      for (const c of cs) {
        await db
          .prepare(
            "UPDATE learning_certificates SET status='REVOKED',public_consent=0,document=? WHERE id=?",
          )
          .run(JSON.stringify({ withdrawn: true }), c.id);
        await audit(db, user.id, "certificate.privacy-withdrawal", c.id, {});
      }
    },
  };
  return service;
}
