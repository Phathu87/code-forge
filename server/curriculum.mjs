import { createHash } from "node:crypto";
import { curriculum, validateCurriculum } from "../curriculum/catalog.mjs";
export async function seedCurriculum(db) {
  validateCurriculum(curriculum);
  const document = JSON.stringify(curriculum);
  const contentHash = createHash("sha256").update(document).digest("hex");
  await db
    .prepare(
      "INSERT INTO curriculum_versions (version, content_hash, document, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(version) DO NOTHING",
    )
    .run(curriculum.version, contentHash, document, Date.now());
  const stored = await db
    .prepare("SELECT content_hash FROM curriculum_versions WHERE version=?")
    .get(curriculum.version);
  if (stored.content_hash !== contentHash)
    throw new Error(
      "Published curriculum version differs from source. Publish a new curriculum version; never overwrite historical content.",
    );
}
export async function readCurriculum(db) {
  const row = await db
    .prepare("SELECT document FROM curriculum_versions WHERE version=?")
    .get(curriculum.version);
  if (!row) throw new Error("Curriculum unavailable.");
  return JSON.parse(row.document);
}
