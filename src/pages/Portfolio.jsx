import React, { useEffect, useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import GitHubImportModal from "@/components/GitHubImportModal";
export default function Portfolio() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const load = () => {
    setLoading(true);
    setError("");
    api.projects
      .list()
      .then(setProjects)
      .catch((failure) => setError(failure.message))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    let active = true;
    api.projects
      .list()
      .then((value) => {
        if (active) setProjects(value);
      })
      .catch((failure) => {
        if (active) setError(failure.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  function download(project) {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(project, null, 2)], {
        type: "application/json",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `project-${project.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      <header className="flex flex-wrap gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">
            {user?.full_name
              ? `${user.full_name}'s projects`
              : "Your project portfolio"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Private source snapshots. Public publishing and authoritative skill
            verification are not enabled.
          </p>
        </div>
        <button
          id="github-import-button"
          onClick={() => setOpen(true)}
          className="rounded bg-primary px-4 py-2 text-primary-foreground"
        >
          Import from GitHub
        </button>
      </header>
      {loading && <p role="status">Loading projects…</p>}
      {error && (
        <div role="alert">
          {error}{" "}
          <button className="underline" onClick={load}>
            Retry
          </button>
        </div>
      )}
      {!loading && !error && !projects.length && (
        <p className="rounded-xl border border-border p-6">
          No imported projects yet. Import your first public repository to keep
          a source snapshot with your account.
        </p>
      )}
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-xl border border-border bg-card p-5 space-y-3"
        >
          <div className="flex flex-wrap justify-between gap-2">
            <h2 className="font-semibold break-all">{project.repo}</h2>
            <span className="text-sm text-muted-foreground">
              Unverified · Private
            </span>
          </div>
          <p className="text-xs text-muted-foreground break-all">
            Commit {project.commit} · {project.files.length} files imported ·{" "}
            {project.excludedEntries} entries excluded
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={`${project.url}/tree/${project.commit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              View original commit
            </a>
            <button
              className="text-primary underline"
              onClick={() => download(project)}
            >
              Download snapshot
            </button>
          </div>
          <details>
            <summary className="cursor-pointer">Browse imported source</summary>
            <div className="mt-3 space-y-2">
              {project.files.map((file) => (
                <details key={file.path}>
                  <summary className="text-sm break-all cursor-pointer">
                    {file.path}
                  </summary>
                  <pre className="text-xs bg-background border border-border p-3 mt-2 max-h-80 overflow-auto">
                    <code>{file.content}</code>
                  </pre>
                </details>
              ))}
            </div>
          </details>
        </article>
      ))}
      {open && (
        <GitHubImportModal
          onClose={() => setOpen(false)}
          onImport={(project) =>
            setProjects((previous) => [
              project,
              ...previous.filter((item) => item.id !== project.id),
            ])
          }
        />
      )}
    </main>
  );
}
