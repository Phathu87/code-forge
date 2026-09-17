import test from "node:test";
import assert from "node:assert/strict";
import { Pool } from "pg";
import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import { DatabaseSync } from "node:sqlite";
import { importRepository, repositoryName } from "../server/github.mjs";
import { createApplication } from "../server/app.mjs";
const content = "export default function App() { return <h1>Hello</h1>; }";
const blobSha = createHash("sha1")
  .update(`blob ${Buffer.byteLength(content)}\0${content}`)
  .digest("hex");
const revision = "a".repeat(40),
  treeSha = "b".repeat(40);
function github(overrides = {}) {
  return async (url, options) => {
    assert.ok(url.startsWith("https://api.github.com/repos/owner/project"));
    assert.equal(options.redirect, "error");
    assert.equal(options.headers.Authorization, undefined);
    let value;
    if (url.endsWith("/owner/project"))
      value = { private: false, default_branch: "main" };
    else if (url.includes("/commits/"))
      value = { sha: revision, commit: { tree: { sha: treeSha } } };
    else if (url.includes("/git/trees/"))
      value = overrides.tree || {
        truncated: false,
        tree: [
          {
            type: "blob",
            mode: "100644",
            path: "src/App.jsx",
            sha: blobSha,
            size: Buffer.byteLength(content),
          },
          {
            type: "blob",
            mode: "100644",
            path: ".env",
            sha: blobSha,
            size: 10,
          },
        ],
      };
    else if (url.includes("/git/blobs/"))
      value = overrides.blob || {
        encoding: "base64",
        content: Buffer.from(content).toString("base64"),
      };
    else throw Error("Unexpected endpoint");
    return new Response(JSON.stringify(value), { status: 200 });
  };
}
test("GitHub import pins source, excludes hidden files and refuses unsafe or incomplete input", async () => {
  for (const url of [
    "https://evil.test/a/b",
    "http://github.com/a/b",
    "https://github.com/a/b?token=secret",
    "https://github.com/a/../b",
    "https://github.com/a/b/tree/main",
  ])
    assert.throws(() => repositoryName(url));
  const result = await importRepository(
    "https://github.com/owner/project",
    github(),
  );
  assert.equal(result.commit, revision);
  assert.equal(result.files[0].content, content);
  assert.equal(result.excludedEntries, 1);
  assert.equal(result.status, "Unverified");
  await assert.rejects(
    importRepository(
      result.url,
      github({ tree: { truncated: true, tree: [] } }),
    ),
    /too large/,
  );
  await assert.rejects(
    importRepository(
      result.url,
      github({
        blob: {
          encoding: "base64",
          content: Buffer.from("changed").toString("base64"),
        },
      }),
    ),
    /checksum/,
  );
  await assert.rejects(
    importRepository(
      result.url,
      async () => new Response("{}", { status: 403 }),
    ),
    /request limit/,
  );
  await assert.rejects(
    importRepository(
      result.url,
      github({
        tree: {
          truncated: false,
          tree: Array.from({ length: 31 }, (_, i) => ({
            type: "blob",
            mode: "100644",
            path: `file${i}.js`,
            sha: blobSha,
            size: 1,
          })),
        },
      }),
    ),
    /30 text files/,
  );
});
test("focus and source imports persist, remain private and unverified, export and cascade on deletion", async () => {
  const directory = await mkdtemp(join(tmpdir(), "codeforge-projects-"));
  const databasePath = join(directory, "db.sqlite");
  const messages = [];
  let server, address;
  let databaseUrl = process.env.TEST_DATABASE_URL;
  const schema = "test_" + randomUUID().replaceAll("-", "");
  let admin;
  if (databaseUrl) {
    const url = new URL(databaseUrl);
    url.hostname = url.hostname.replace("-pooler", "");
    url.searchParams.set("sslmode", "verify-full");
    admin = new Pool({ connectionString: url.toString(), max: 1 });
    await admin.query("CREATE SCHEMA " + schema);
    url.searchParams.set("options", "-c search_path=" + schema);
    databaseUrl = url.toString();
  }
  const start = async () => {
    server = createApplication({
      databasePath,
      databaseUrl,
      deliver: async (message) => messages.push(message),
      githubFetch: github(),
    });
    await server.ready;
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    address = `http://127.0.0.1:${server.address().port}/api`;
  };
  const stop = () =>
    new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  const request = async (path, method = "GET", data = {}, cookie = "") => {
    const r = await fetch(address + path, {
      method,
      headers: {
        cookie,
        "content-type": "application/json",
        "x-codeforge-request": "1",
      },
      ...(method === "GET" ? {} : { body: JSON.stringify(data) }),
    });
    return {
      status: r.status,
      body: await r.json(),
      cookie: r.headers.get("set-cookie")?.split(";")[0],
    };
  };
  const password = "disposable learning test password";
  const account = async (email) => {
    await request("/auth/register", "POST", { email, password });
    return (
      await request("/auth/verify", "POST", {
        email,
        otpCode: messages.at(-1).text.match(/\d{6}/)[0],
      })
    ).cookie;
  };
  try {
    await start();
    assert.equal((await request('/curriculum')).body.version, '1.0.0');
    const alice = await account("alice@projects.test"),
      bob = await account("bob@projects.test");
    assert.equal((await request("/projects")).status, 401);
    assert.equal(
      (await request("/learning/focus", "PUT", { milestone: "fake" }, alice))
        .status,
      400,
    );
    assert.equal(
      (await request("/learning/focus", "PUT", { milestone: "context" }, alice))
        .status,
      200,
    );
    assert.equal(
      (await request("/learning/focus", "GET", {}, bob)).body.milestone,
      "state",
    );
    const data = {
      url: "https://github.com/owner/project",
      confirmRights: true,
    };
    const imported = await request("/projects/github", "POST", data, alice);
    assert.equal(imported.status, 200);
    assert.equal(imported.body.status, "Unverified");
    assert.equal(
      (await request("/projects/github", "POST", data, alice)).body.id,
      imported.body.id,
    );
    assert.equal((await request("/projects", "GET", {}, bob)).body.length, 0);
    assert.equal(
      (
        await request(
          "/projects/github",
          "POST",
          { ...data, status: "Verified" },
          alice,
        )
      ).status,
      400,
    );
    await stop();
    await start();
    assert.equal((await request('/curriculum')).body.version, '1.0.0');
    assert.equal(
      (await request("/learning/focus", "GET", {}, alice)).body.milestone,
      "context",
    );
    assert.equal(
      (await request("/projects", "GET", {}, alice)).body[0].files[0].content,
      content,
    );
    const exported = (
      await request("/account/export", "POST", { password }, alice)
    ).body;
    assert.equal(exported.importedProjects.length, 1);
    assert.equal(exported.learningFocus, "context");
    assert.equal(
      (
        await request(
          "/account",
          "DELETE",
          { password, confirmation: "DELETE" },
          alice,
        )
      ).status,
      200,
    );
    assert.equal((await request("/auth/me", "GET", {}, bob)).status, 200);
    await stop();
    server = null;
    if (admin) {
      assert.equal(
        Number(
          (
            await admin.query(
              "SELECT COUNT(*) AS count FROM " + schema + ".github_imports",
            )
          ).rows[0].count,
        ),
        0,
      );
      assert.equal(
        Number(
          (
            await admin.query(
              "SELECT COUNT(*) AS count FROM " + schema + ".learning_focus",
            )
          ).rows[0].count,
        ),
        0,
      );
    } else {
      const db = new DatabaseSync(databasePath);
      assert.equal(
        db.prepare("SELECT COUNT(*) AS count FROM github_imports").get().count,
        0,
      );
      assert.equal(
        db.prepare("SELECT COUNT(*) AS count FROM learning_focus").get().count,
        0,
      );
      db.close();
    }
  } finally {
    if (server) await stop();
    if (admin) {
      await admin.query("DROP SCHEMA " + schema + " CASCADE");
      await admin.end();
    }
    await rm(directory, { recursive: true, force: true });
  }
});
