CREATE TABLE IF NOT EXISTS curriculum_versions (version TEXT PRIMARY KEY, content_hash TEXT NOT NULL, document TEXT NOT NULL, created_at BIGINT NOT NULL);
INSERT INTO schema_migrations (version) VALUES (3) ON CONFLICT(version) DO NOTHING;
