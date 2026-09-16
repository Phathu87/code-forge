import { createHash } from "node:crypto";
const fail = (status, message) => Object.assign(new Error(message), { status });
const sha = (value) =>
  typeof value === "string" && /^[a-f0-9]{40}$/.test(value);
export function repositoryName(value) {
  if (typeof value !== "string")
    throw fail(400, "Enter a public GitHub repository URL.");
  const match =
    /^https:\/\/github\.com\/([A-Za-z0-9-]{1,39})\/([A-Za-z0-9_.-]{1,100})\/?$/.exec(
      value.trim(),
    );
  if (!match || [".", ".."].includes(match[2]))
    throw fail(
      400,
      "Use https://github.com/owner/repository without a branch or query string.",
    );
  return `${match[1]}/${match[2].replace(/\.git$/, "")}`;
}
export async function importRepository(url, fetcher = fetch) {
  const repo = repositoryName(url);
  const signal = AbortSignal.timeout(20000);
  async function get(path) {
    let response;
    try {
      response = await fetcher(`https://api.github.com/repos/${repo}${path}`, {
        signal,
        redirect: "error",
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeForge",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    } catch {
      throw fail(503, "GitHub could not be reached. Please retry.");
    }
    if (!response.ok)
      throw fail(
        response.status === 404 ? 404 : 503,
        response.status === 404
          ? "Public repository or revision not found."
          : "GitHub is unavailable or its request limit was reached. Retry later.",
      );
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > 1500000)
        throw fail(413, "Repository response exceeds the import limit.");
      chunks.push(chunk);
    }
    try {
      return JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw fail(502, "GitHub returned an invalid response.");
    }
  }
  const metadata = await get("");
  if (metadata.private || typeof metadata.default_branch !== "string")
    throw fail(
      400,
      "Only public repositories with a default branch can be imported.",
    );
  const revision = await get(
    `/commits/${encodeURIComponent(metadata.default_branch)}`,
  );
  if (!sha(revision.sha) || !sha(revision.commit?.tree?.sha))
    throw fail(502, "GitHub returned an invalid revision.");
  const tree = await get(`/git/trees/${revision.commit.tree.sha}?recursive=1`);
  if (tree.truncated || !Array.isArray(tree.tree))
    throw fail(413, "This repository is too large to snapshot.");
  const eligible = tree.tree.filter(
    (item) =>
      item.type === "blob" &&
      ["100644", "100755"].includes(item.mode) &&
      typeof item.path === "string" &&
      !item.path
        .split("/")
        .some(
          (part) =>
            part.startsWith(".") ||
            ["node_modules", "dist", "build", "vendor"].includes(part),
        ) &&
      !/(?:^|\/)(?:package-lock|yarn\.lock|pnpm-lock)/.test(item.path) &&
      /\.(?:[cm]?jsx?|tsx?|css|html|json|md|txt)$/i.test(item.path),
  );
  if (!eligible.length)
    throw fail(400, "No supported source or documentation files were found.");
  if (
    eligible.length > 30 ||
    eligible.some(
      (item) =>
        !sha(item.sha) ||
        !Number.isSafeInteger(item.size) ||
        item.size < 0 ||
        item.size > 100000,
    ) ||
    eligible.reduce((sum, item) => sum + item.size, 0) > 300000
  )
    throw fail(
      413,
      "Import supports up to 30 text files, 100 KB per file and 300 KB total.",
    );
  const files = [];
  for (const item of eligible) {
    const blob = await get(`/git/blobs/${item.sha}`);
    if (blob.encoding !== "base64" || typeof blob.content !== "string")
      throw fail(502, "Unsupported GitHub file encoding.");
    const bytes = Buffer.from(blob.content, "base64");
    const actual = createHash("sha1")
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest("hex");
    if (bytes.length !== item.size || actual !== item.sha)
      throw fail(502, "Source checksum did not match. Nothing was imported.");
    let content;
    try {
      content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      throw fail(400, "A selected source file is not UTF-8 text.");
    }
    files.push({ path: item.path, content, sha: item.sha });
  }
  return {
    repo,
    url: `https://github.com/${repo}`,
    commit: revision.sha,
    files,
    excludedEntries:
      tree.tree.filter((item) => item.type !== "tree").length - files.length,
    status: "Unverified",
    importedAt: new Date().toISOString(),
  };
}
