import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { openDatabase } from "../server/database.mjs";
import {
  seedLearning,
  authoredDefinitions,
  certificateDefinitions,
} from "../server/learning/definitions.mjs";
import { createLearningService } from "../server/learning/service.mjs";
import { curriculum } from "../curriculum/catalog.mjs";

async function setup(t, options = {}) {
  const dir = await mkdtemp(join(tmpdir(), "codeforge-learning-"));
  let databaseUrl = process.env.TEST_DATABASE_URL,
    admin;
  const schema = "test_" + randomUUID().replaceAll("-", "");
  if (databaseUrl) {
    const u = new URL(databaseUrl);
    u.hostname = u.hostname.replace("-pooler", "");
    u.searchParams.set("sslmode", "verify-full");
    admin = new Pool({ connectionString: u.toString(), max: 1 });
    await admin.query("CREATE SCHEMA " + schema);
    u.searchParams.set("options", "-c search_path=" + schema);
    databaseUrl = u.toString();
  }
  let db = openDatabase({ databasePath: join(dir, "db.sqlite"), databaseUrl });
  await db.ready;
  await db.run(() => seedLearning(db));
  t.after(async () => {
    await db.close();
    if (admin) {
      await admin.query("DROP SCHEMA " + schema + " CASCADE");
      await admin.end();
    }
    await rm(dir, { recursive: true, force: true });
  });
  const actors = {};
  await db.run(async () => {
    for (const [key, role] of Object.entries({
      learner: "user",
      other: "user",
      reviewer: "reviewer",
      manager: "review_manager",
      maintainer: "curriculum_maintainer",
      integrity: "integrity_reviewer",
      issuer: "credential_admin",
    })) {
      actors[key] = { id: randomUUID(), role };
      await db
        .prepare(
          "INSERT INTO users (id,email,password,name,role,verified) VALUES (?,?,?,?,?,1)",
        )
        .run(
          actors[key].id,
          key + "@example.test",
          "test-only-hash",
          "Test " + key,
          role,
        );
    }
  });
  let svc = createLearningService(db, {
    origin: "https://codeforge.example.test",
    verifiedEnabled: true,
    certificatesEnabled: true,
    ...options,
  });
  const call = (method, ...args) => db.run(() => svc[method](...args));
  return {
    actors,
    call,
    get db() {
      return db;
    },
    async restart() {
      await db.close();
      db = openDatabase({ databasePath: join(dir, "db.sqlite"), databaseUrl });
      await db.ready;
      await db.run(() => seedLearning(db));
      svc = createLearningService(db, {
        origin: "https://codeforge.example.test",
        verifiedEnabled: true,
        certificatesEnabled: true,
        ...options,
      });
    },
  };
}
const snap = (answers = {}) => ({
  files: [
    {
      path: "App.jsx",
      content: "// Explicit isolated test fixture; not a learner solution.",
    },
  ],
  explanation: "I explain the submitted fixture.",
  modification: "I describe the controlled change.",
  answers,
});
async function publish(f, d) {
  await f.call("saveDefinition", f.actors.maintainer, { definition: d });
  await f.call("publish", f.actors.maintainer, d.id, d.version, {
    state: "REVIEW",
  });
  await f.call("publish", f.actors.maintainer, d.id, d.version, {
    state: "PUBLISHED",
  });
}
function knowledge() {
  return {
    ...authoredDefinitions()[0],
    id: "isolated-knowledge-check",
    type: "knowledge",
    version: "2.0.0",
    prerequisites: [],
    criteria: [
      {
        id: "visible",
        text: "What is two plus two?",
        mandatory: true,
        method: "automated",
      },
      {
        id: "protected",
        text: "What type is a quoted word?",
        mandatory: true,
        method: "automated",
      },
    ],
    requirements: ["Answer both questions"],
    automatedRules: [
      {
        kind: "answer-equals",
        criterion: "visible",
        question: "What is two plus two?",
        answerKey: "sum",
        expected: "4",
      },
    ],
    protectedRules: [
      {
        kind: "answer-equals",
        criterion: "protected",
        question: "What type is a quoted word?",
        answerKey: "type",
        expected: "string",
      },
    ],
    automationReady: true,
    attemptPolicy: { maxAttempts: 8, cooldownSeconds: 0 },
    competencies: [
      { skill: "JavaScript", level: "Beginner", competency: "values/types" },
    ],
  };
}
async function startSubmit(f, d, answers = {}) {
  const a = await f.call("start", f.actors.learner, {
    assessmentId: d.id,
    version: d.version,
    requestKey: randomUUID(),
  });
  await f.call("submit", f.actors.learner, a.id, { snapshot: snap(answers) });
  return a;
}
async function reviewAll(f, d, a) {
  await f.call("assign", f.actors.manager, a.id, {
    reviewerId: f.actors.reviewer.id,
  });
  for (const c of d.criteria.filter(
    (c) => c.mandatory && c.method !== "automated",
  ))
    await f.call("review", f.actors.reviewer, a.id, {
      requestKey: randomUUID(),
      criterion: c.id,
      result: "PASS",
      notes: "Explicit isolated fixture review; not real learner evidence.",
      feedback: "",
    });
}

test("grading uses every gate; immutable attempts, protected rules, retakes, idempotent XP, holds and persistence", async (t) => {
  const f = await setup(t);
  const d = knowledge();
  await publish(f, d);
  const catalog = await f.call("catalog");
  const serialized = JSON.stringify(catalog);
  assert.ok(!serialized.includes("expected"));
  assert.ok(!serialized.includes("protectedRules"));
  await assert.rejects(
    f.call("saveDefinition", f.actors.learner, { definition: d }),
    (e) => e.status === 403,
  );
  await assert.rejects(
    f.call("start", f.actors.learner, {
      assessmentId: d.id,
      version: "9.0.0",
      requestKey: randomUUID(),
    }),
    (e) => e.status === 404,
  );
  let a = await startSubmit(f, d, { sum: "3", type: "string" });
  let result = await f.call("grade", f.actors.learner, a.id, {
    requestKey: randomUUID(),
  });
  assert.equal(result.state, "TESTS_FAILED");
  assert.equal((await f.call("progress", f.actors.learner)).xp, 0);
  a = await startSubmit(f, d, { sum: "4", type: "number" });
  result = await f.call("grade", f.actors.learner, a.id, {
    requestKey: randomUUID(),
  });
  assert.equal(result.state, "TESTS_FAILED");
  const request = {
    assessmentId: d.id,
    version: d.version,
    requestKey: randomUUID(),
  };
  const starts = await Promise.all([
    f.call("start", f.actors.learner, request),
    f.call("start", f.actors.learner, request),
  ]);
  assert.equal(starts[0].id, starts[1].id);
  a = starts[0];
  await f.call("submit", f.actors.learner, a.id, {
    snapshot: snap({ sum: "4", type: "string" }),
  });
  await f.call("submit", f.actors.learner, a.id, {
    snapshot: snap({ sum: "4", type: "string" }),
  });
  await assert.rejects(
    f.call("submit", f.actors.learner, a.id, { snapshot: snap({ sum: "5" }) }),
    (e) => e.status === 409,
  );
  await assert.rejects(f.call("detail", f.actors.other, a.id), (e) =>
    [403, 404].includes(e.status),
  );
  await assert.rejects(
    f.call("grade", f.actors.learner, a.id, {
      requestKey: randomUUID(),
      passed: true,
    }),
    (e) => e.status === 400,
  );
  const runs = await Promise.all([
    f.call("grade", f.actors.learner, a.id, { requestKey: "duplicate-run" }),
    f.call("grade", f.actors.learner, a.id, { requestKey: "duplicate-run" }),
  ]);
  assert.ok(runs.every((r) => r.state === "PASSED"));
  let p = await f.call("progress", f.actors.learner);
  assert.equal(p.xp, d.xpReward);
  assert.equal(p.records.length, 1);
  assert.equal(p.skills.find((s) => s.skill === "JavaScript").level, null);
  await f.call("integrity", f.actors.integrity, a.id, {
    requestKey: randomUUID(),
    status: "HOLD",
    reason: "An isolated test hold requires investigation.",
    evidenceReferences: ["test-fixture"],
  });
  p = await f.call("progress", f.actors.learner);
  assert.equal(p.xp, 0);
  assert.equal(p.records.length, 0);
  await f.call("integrity", f.actors.integrity, a.id, {
    requestKey: randomUUID(),
    status: "CLEAR",
    reason: "The isolated test hold was resolved.",
    evidenceReferences: ["test-fixture-resolution"],
  });
  assert.equal((await f.call("progress", f.actors.learner)).xp, d.xpReward);
  await f.restart();
  assert.equal(
    (await f.call("detail", f.actors.learner, a.id)).state,
    "PASSED",
  );
  assert.equal((await f.call("progress", f.actors.learner)).xp, d.xpReward);
});

test("prerequisites, review assignment and infrastructure failures fail closed", async (t) => {
  let healthy = false;
  const f = await setup(t, {
    runner: async ({ definition }) => {
      if (!healthy) throw Error("worker unavailable");
      return {
        infrastructureError: false,
        results: definition.criteria
          .filter((c) => c.method !== "reviewer")
          .map((c) => ({ criterion: c.id, passed: true })),
      };
    },
  });
  const defs = authoredDefinitions();
  const first = {
    ...defs[0],
    version: "2.1.0",
    automationReady: true,
    criteria: [
      {
        id: "required",
        text: "Demonstrate the practical behaviour",
        mandatory: true,
        method: "hybrid",
      },
    ],
    attemptPolicy: { maxAttempts: 3, cooldownSeconds: 0 },
  };
  await publish(f, first);
  const locked = defs.find((d) =>
    d.prerequisites.some((p) => p.target === first.id),
  );
  await assert.rejects(
    f.call("start", f.actors.learner, {
      assessmentId: locked.id,
      version: locked.version,
      requestKey: randomUUID(),
    }),
    (e) => e.status === 409,
  );
  const a = await startSubmit(f, first);
  assert.equal(
    (
      await f.call("grade", f.actors.learner, a.id, {
        requestKey: randomUUID(),
      })
    ).state,
    "INFRASTRUCTURE_ERROR",
  );
  assert.equal((await f.call("progress", f.actors.learner)).xp, 0);
  await assert.rejects(
    f.call("review", f.actors.reviewer, a.id, {
      requestKey: randomUUID(),
      criterion: "required",
      result: "PASS",
      notes: "Not assigned reviewer yet.",
    }),
    (e) => e.status === 403,
  );
  await assert.rejects(
    f.call("assign", f.actors.learner, a.id, {
      reviewerId: f.actors.reviewer.id,
    }),
    (e) => e.status === 403,
  );
  await f.call("assign", f.actors.manager, a.id, {
    reviewerId: f.actors.reviewer.id,
  });
  assert.equal((await f.call("queue", f.actors.reviewer)).length, 1);
  healthy = true;
  assert.equal(
    (
      await f.call("grade", f.actors.learner, a.id, {
        requestKey: randomUUID(),
      })
    ).state,
    "REVIEW_REQUIRED",
  );
  const review = {
    requestKey: randomUUID(),
    criterion: "required",
    result: "PASS",
    notes: "The isolated fixture meets its criterion.",
  };
  assert.equal(
    (await f.call("review", f.actors.reviewer, a.id, review)).state,
    "PASSED",
  );
  await f.call("review", f.actors.reviewer, a.id, review);
  const p = await f.call("progress", f.actors.learner);
  assert.equal(p.items.find((n) => n.id === first.id).state, "COMPLETED");
  assert.equal(p.items.find((n) => n.id === locked.id).state, "AVAILABLE");
  assert.equal(p.xp, first.xpReward);
  assert.ok(
    !JSON.stringify(await f.call("detail", f.actors.learner, a.id)).includes(
      review.notes,
    ),
  );
  await assert.rejects(
    f.call("publish", f.actors.maintainer, first.id, first.version, {
      state: "DRAFT",
    }),
    (e) => e.status === 409,
  );
  await assert.rejects(
    f.call("saveDefinition", f.actors.maintainer, {
      definition: { ...first, title: "Changed" },
    }),
    (e) => e.status === 409,
  );
});

test("official path completion, verified certificate eligibility, unique issuance, authoritative PDF, revocation and privacy", async (t) => {
  // This runner and reviews are test-only. They do not validate real code or satisfy production release gates.
  const f = await setup(t, {
    runner: async ({ definition }) => ({
      infrastructureError: false,
      results: definition.criteria
        .filter((c) => c.method !== "reviewer")
        .map((c) => ({ criterion: c.id, passed: true })),
    }),
  });
  const cert = certificateDefinitions.find(
    (d) => d.id === "web-foundations-v1",
  );
  assert.ok(cert);
  assert.equal(
    (await f.call("progress", f.actors.learner)).certificates.find(
      (c) => c.id === cert.id,
    ).state,
    "NOT_ELIGIBLE",
  );
  await assert.rejects(
    f.call("issue", f.actors.learner, {
      learnerId: f.actors.learner.id,
      definitionId: cert.id,
    }),
    (e) => e.status === 403,
  );
  await f.call("consent", f.actors.learner, {
    definitionId: cert.id,
    allowPublicVerification: true,
  });
  await assert.rejects(
    f.call("issue", f.actors.issuer, {
      learnerId: f.actors.learner.id,
      definitionId: cert.id,
    }),
    (e) => e.status === 409,
  );
  const moduleIds = cert.requirements.filter((id) =>
    curriculum.modules.some((m) => m.id === id),
  );
  const activities = authoredDefinitions().filter(
    (d) =>
      cert.requirements.includes(d.id) ||
      curriculum.modules
        .filter((m) => moduleIds.includes(m.id))
        .some((m) =>
          [...m.units.map((u) => u.id), m.mission.id, m.assessment.id].includes(
            d.id,
          ),
        ),
  );
  const attempts = [];
  for (const original of activities) {
    const d = {
      ...original,
      version: "3.0.0",
      automationReady: true,
      competencies: cert.requiredCompetencies,
      attemptPolicy: { maxAttempts: 3, cooldownSeconds: 0 },
    };
    await publish(f, d);
    const a = await startSubmit(f, d);
    await f.call("grade", f.actors.learner, a.id, { requestKey: randomUUID() });
    await reviewAll(f, d, a);
    attempts.push(a);
    await f.call("integrity", f.actors.integrity, a.id, {
      requestKey: randomUUID(),
      status: "VERIFIED",
      reason:
        "Isolated fixture verification, not a production integrity decision.",
      evidenceReferences: ["fixture-only"],
    });
  }
  const p = await f.call("progress", f.actors.learner);
  assert.equal(p.paths.find((x) => x.id === cert.id).percent, 100);
  assert.ok(
    p.paths.find((x) => x.id === cert.id).stages.every((s) => s.completed),
  );
  assert.equal(p.certificates.find((c) => c.id === cert.id).state, "ELIGIBLE");
  assert.equal(
    p.skills.find((s) => s.skill === "Frontend Development").level,
    "Beginner",
  );
  const issued = await f.call("issue", f.actors.issuer, {
    learnerId: f.actors.learner.id,
    definitionId: cert.id,
  });
  assert.equal(
    (
      await f.call("issue", f.actors.issuer, {
        learnerId: f.actors.learner.id,
        definitionId: cert.id,
      })
    ).id,
    issued.id,
  );
  const publicRecord = await f.call("verify", issued.id);
  assert.equal(publicRecord.status, "VALID");
  assert.equal(publicRecord.curriculumVersion, "1.0.0");
  assert.ok(!("evidenceIds" in publicRecord));
  assert.ok(!("attemptIds" in publicRecord));
  const pdf = await f.call("document", f.actors.learner, issued.id);
  assert.ok(Buffer.from(pdf.base64, "base64").toString().startsWith("%PDF"));
  assert.ok(Buffer.from(pdf.base64, "base64").toString().includes(issued.id));
  await assert.rejects(
    f.call("document", f.actors.other, issued.id),
    (e) => e.status === 404,
  );
  assert.equal((await f.call("verify", "invalid")).status, "NOT_FOUND");
  await assert.rejects(
    f.call("revoke", f.actors.learner, issued.id, {
      reason: "Unauthorized attempt to revoke.",
    }),
    (e) => e.status === 403,
  );
  const originalEvidence = (await f.call("progress", f.actors.learner)).records.find(r => r.attemptId === attempts[0].id);
  const retakeDefinition = {...activities[0], version: "3.0.0"};
  const retake = await startSubmit(f, retakeDefinition);
  await f.call("grade", f.actors.learner, retake.id, {requestKey: randomUUID()});
  await reviewAll(f, retakeDefinition, retake);
  assert.equal((await f.call("verify", issued.id)).status, "VALID");
  await f.call("integrity", f.actors.integrity, retake.id, {requestKey: randomUUID(), status: "VERIFIED", reason: "Isolated retake fixture verification.", evidenceReferences: ["fixture-only"]});
  const retakenProgress = await f.call("progress", f.actors.learner);
  assert.deepEqual(retakenProgress.records.find(r => r.id === originalEvidence.id), originalEvidence);
  assert.equal(retakenProgress.xp, p.xp);
  await f.call("integrity", f.actors.integrity, attempts[0].id, {
    requestKey: randomUUID(),
    status: "HOLD",
    reason: "Evidence hold invalidates this test certificate.",
    evidenceReferences: ["fixture-review"],
  });
  assert.equal((await f.call("verify", issued.id)).status, "REVOKED");
  await f.call("revoke", f.actors.issuer, issued.id, {
    reason: "Explicit duplicate revocation test.",
  });
  await f.call("consent", f.actors.learner, {
    definitionId: cert.id,
    allowPublicVerification: false,
  });
  assert.equal((await f.call("verify", issued.id)).status, "NOT_FOUND");
  await f.call("eraseIdentity", f.actors.learner);
  await f.db.run(() =>
    f.db.prepare("DELETE FROM users WHERE id=?").run(f.actors.learner.id),
  );
  assert.equal((await f.call("verify", issued.id)).status, "NOT_FOUND");
});

test("placement opens entry only; release controls prevent authoritative verification and issuance", async (t) => {
  const f = await setup(t, {
    verifiedEnabled: false,
    certificatesEnabled: false,
  });
  const first = authoredDefinitions()[0];
  const next = authoredDefinitions().find((d) =>
    d.prerequisites.some((p) => p.target === first.id),
  );
  const d = {
    ...first,
    id: "entry-placement-fixture",
    type: "placement",
    version: "5.0.0",
    placementTargets: [first.id],
    prerequisites: [],
    criteria: [
      {
        id: "placement",
        text: "Demonstrate practical entry competence",
        mandatory: true,
        method: "reviewer",
      },
    ],
  };
  await publish(f, d);
  const a = await startSubmit(f, d);
  await reviewAll(f, d, a);
  const p = await f.call("progress", f.actors.learner);
  assert.equal(p.items.find((x) => x.id === first.id).state, "AVAILABLE");
  assert.equal(p.items.find((x) => x.id === next.id).state, "AVAILABLE");
  assert.ok(!p.records.some((r) => r.activityId === first.id));
  await assert.rejects(
    f.call("integrity", f.actors.integrity, a.id, {
      requestKey: randomUUID(),
      status: "VERIFIED",
      reason: "This must remain disabled in the preview.",
      evidenceReferences: ["fixture"],
    }),
    (e) => e.status === 503,
  );
  await assert.rejects(
    f.call("issue", f.actors.issuer, {
      learnerId: f.actors.learner.id,
      definitionId: certificateDefinitions[0].id,
    }),
    (e) => e.status === 503,
  );
});

test("HTTP learners cannot award results, inspect other attempts or publish protected policy", async (t) => {
  const { createApplication } = await import("../server/app.mjs");
  const { once } = await import("node:events");
  const dir = await mkdtemp(join(tmpdir(), "codeforge-learning-http-"));
  const messages = [];
  const server = createApplication({
    databasePath: join(dir, "db.sqlite"),
    deliver: async (m) => messages.push(m),
  });
  await server.ready;
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    await new Promise((r) => server.close(r));
    await rm(dir, { recursive: true, force: true });
  });
  const base = `http://127.0.0.1:${server.address().port}/api`;
  async function req(path, method = "GET", data = {}, cookie = "") {
    const r = await fetch(base + path, {
      method,
      headers: {
        "content-type": "application/json",
        "x-codeforge-request": "1",
        cookie,
      },
      ...(method === "GET" ? {} : { body: JSON.stringify(data) }),
    });
    return {
      status: r.status,
      body: await r.json(),
      cookie: r.headers.get("set-cookie")?.split(";")[0],
    };
  }
  async function account(email) {
    await req("/auth/register", "POST", {
      email,
      password: "A real test-only password 123!",
    });
    return req("/auth/verify", "POST", {
      email,
      otpCode: messages.at(-1).text.match(/\b\d{6}\b/)[0],
    });
  }
  const a = await account("learner-a@example.test"),
    b = await account("learner-b@example.test");
  const d = authoredDefinitions()[0];
  const started = await req(
    "/learning-core/attempts",
    "POST",
    { assessmentId: d.id, version: d.version, requestKey: randomUUID() },
    a.cookie,
  );
  assert.equal(started.status, 200);
  const id = started.body.id;
  assert.ok(
    [403, 404].includes(
      (await req("/learning-core/attempts/" + id, "GET", {}, b.cookie)).status,
    ),
  );
  assert.equal(
    (
      await req(
        "/learning-core/attempts/" + id + "/submit",
        "POST",
        { snapshot: snap() },
        a.cookie,
      )
    ).status,
    200,
  );
  for (const [path, data] of [
    [
      "/learning-core/attempts/" + id + "/review",
      {
        requestKey: randomUUID(),
        criterion: "practice-1",
        result: "PASS",
        notes: "Unauthorized self evaluation.",
      },
    ],
    ["/learning-core/definitions", { definition: knowledge() }],
    [
      "/learning-core/certificates",
      { learnerId: "other", definitionId: certificateDefinitions[0].id },
    ],
  ])
    assert.equal((await req(path, "POST", data, a.cookie)).status, 403);
  assert.equal(
    (
      await req(
        "/learning-core/progress",
        "POST",
        { xp: 9999, completed: true },
        a.cookie,
      )
    ).status,
    404,
  );
  const pub = await req("/learning-core/catalog", "GET", {}, a.cookie);
  assert.ok(!JSON.stringify(pub.body).includes("protectedRules"));
  assert.ok(!JSON.stringify(pub.body).includes("expected"));
  const p = await req("/learning-core/progress", "GET", {}, a.cookie);
  assert.equal(p.body.xp, 0);
  assert.equal(p.body.records.length, 0);
  assert.equal(
    (await req("/certificates/verify/not-a-certificate")).body.status,
    "NOT_FOUND",
  );
  const exp = await req(
    "/account/export",
    "POST",
    { password: "A real test-only password 123!" },
    a.cookie,
  );
  assert.equal(exp.body.learning.attempts.length, 1);
});
