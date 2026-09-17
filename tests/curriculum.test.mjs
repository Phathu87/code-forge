import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { once } from "node:events";
import {
  curriculum,
  validateCurriculum,
  allNodes,
} from "../curriculum/catalog.mjs";
import { createApplication } from "../server/app.mjs";
import { openDatabase } from "../server/database.mjs";
import { seedCurriculum } from "../server/curriculum.mjs";

test("curriculum references, practical content, prerequisite graph and generated snapshot agree", async () => {
  const counts = validateCurriculum();
  assert.equal(counts.paths, 8);
  assert.equal(counts.modules, 37);
  assert.deepEqual(
    JSON.parse(
      await readFile(new URL("../curriculum/v1.json", import.meta.url), "utf8"),
    ),
    curriculum,
  );
  const nodes = allNodes();
  const ids = new Set(nodes.map((n) => n.id));
  for (const u of nodes.filter((n) => n.kind === "unit"))
    assert.ok(ids.has(u.missionConnection));
  for (const p of curriculum.policy.certificates.initialPaths.concat(
    curriculum.policy.certificates.laterPaths,
  ))
    assert.ok(curriculum.paths.some((path) => path.id === p));
  const storage = curriculum.modules.find(
    (m) => m.id === "javascript-browser-storage",
  );
  assert.equal(storage.mission.id, "persistent-developer-preferences");
  assert.ok(storage.mission.requirements.some((r) => r.includes("malformed")));
  assert.ok(storage.units.some((u) => u.explanation.includes("Number(null)")));
  assert.match(
    curriculum.modules.find((m) => m.id === "react-context").mission.brief,
    /original Programming Language Toggle App/,
  );
  for (const node of nodes.filter((n) => n.rubric)) {
    assert.equal(node.assessmentEnabled, false);
    assert.equal(node.testPlan.status, "specified-not-implemented");
    assert.ok(
      node.rubric.some(
        (r) => r.method === "reviewer" && r.category === "required",
      ),
    );
  }
  const cycle = structuredClone(curriculum);
  cycle.modules[0].prerequisites.push({
    target: cycle.modules[1].id,
    type: "skill",
    strength: "hard",
  });
  assert.throws(() => validateCurriculum(cycle), /cycle/);
  const missing = structuredClone(curriculum);
  missing.modules[0].prerequisites.push({
    target: "missing",
    type: "skill",
    strength: "hard",
  });
  assert.throws(() => validateCurriculum(missing), /Unknown prerequisite/);
  const unsafe = structuredClone(curriculum);
  unsafe.policy.certificates.issuanceEnabled = true;
  assert.throws(() => validateCurriculum(unsafe), /cannot enable/);
});
test("curriculum is durable and read-only; reusing a version for changed content is rejected", async () => {
  const directory = await mkdtemp(join(tmpdir(), "codeforge-curriculum-"));
  const databasePath = join(directory, "db.sqlite");
  let server;
  const start = async () => {
    server = createApplication({ databasePath, deliver: async () => {} });
    await server.ready;
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    return `http://127.0.0.1:${server.address().port}/api/curriculum`;
  };
  const stop = () =>
    new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  try {
    let url = await start();
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), curriculum);
    const denied = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-codeforge-request": "1",
      },
      body: JSON.stringify({ version: "1.0.0", verified: true }),
    });
    assert.equal(denied.status, 401);
    await stop();
    server = null;
    url = await start();
    assert.deepEqual(await (await fetch(url)).json(), curriculum);
    await stop();
    server = null;
    const db = openDatabase({ databasePath });
    await db.ready;
    try {
      assert.equal(
        db.prepare("SELECT COUNT(*) AS n FROM curriculum_versions").get().n,
        1,
      );
      assert.equal(db.prepare("SELECT COUNT(*) AS n FROM users").get().n, 0);
      db.prepare(
        "UPDATE curriculum_versions SET content_hash=? WHERE version=?",
      ).run("invalid", "1.0.0");
      await assert.rejects(
        seedCurriculum(db),
        /Publish a new curriculum version/,
      );
      assert.equal(
        db.prepare("SELECT content_hash FROM curriculum_versions").get()
          .content_hash,
        "invalid",
      );
    } finally {
      await db.close();
    }
  } finally {
    if (server) await stop();
    await rm(directory, { recursive: true, force: true });
  }
});

test("public task-manager checks separate wrong behaviour from infrastructure failures", async () => {
  const { checkTaskManager } = await import(
    "../curriculum/fixtures/task-manager-behaviour.mjs"
  );
  // Deliberately incomplete test double: proves the harness rejects false success.
  const wrong = {
    reset: async () => {},
    ready: async () => true,
    add: async () => {},
    items: async () => [],
    validationVisible: async () => false,
    toggle: async () => {},
    edit: async () => {},
    remove: async () => {},
    filter: async () => {},
    reload: async () => {},
    seedStorage: async () => {},
    recoveryVisible: async () => false,
  };
  const results = await checkTaskManager(wrong);
  assert.equal(results.length, 11);
  assert.equal(
    results.find((r) => r.name === "Valid task can be added").status,
    "REQUIREMENTS_NOT_MET",
  );
  assert.equal(
    results.find((r) => r.name === "Tasks and completion survive reload")
      .status,
    "REQUIREMENTS_NOT_MET",
  );
  const failed = await checkTaskManager({
    ...wrong,
    reset: async () => {
      throw Object.assign(new Error("Browser unavailable"), {
        infrastructure: true,
      });
    },
  });
  assert.ok(failed.every((r) => r.status === "INFRASTRUCTURE_ERROR"));
});
