CREATE TABLE IF NOT EXISTS learning_focus (user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, milestone TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS github_imports (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, repo TEXT NOT NULL, commit_sha TEXT NOT NULL, snapshot TEXT NOT NULL, created_at BIGINT NOT NULL, UNIQUE(user_id,repo,commit_sha));
INSERT INTO schema_migrations (version) VALUES (2) ON CONFLICT(version) DO NOTHING;
