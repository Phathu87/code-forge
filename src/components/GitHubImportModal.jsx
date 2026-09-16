import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@/api/client";
export default function GitHubImportModal({ onClose, onImport }) {
  const [url, setUrl] = useState("");
  const [rights, setRights] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const project = await api.projects.importGithub(url, rights);
      onImport(project);
      onClose();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.getElementById("github-import-button")?.focus();
          }}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-xl"
        >
          <header className="space-y-2 mb-4">
            <Dialog.Title className="font-semibold text-lg">
              Import project source from GitHub
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Save a private snapshot of a public repository at its current
              commit. Importing does not verify authorship, test results or
              skills.
            </Dialog.Description>
          </header>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm">
              Public repository URL
              <input
                type="url"
                required
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://github.com/owner/repository"
                className="mt-2 w-full rounded border border-border bg-background p-2"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Up to 30 source or documentation files, 100 KB each and 300 KB
              total. Binary files, hidden paths, build output and lockfiles are
              excluded. Private repositories and automatic syncing are not
              supported.
            </p>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={rights}
                onChange={(event) => setRights(event.target.checked)}
                required
              />
              I own this work or have permission to import it.
            </label>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              disabled={busy || !rights}
              className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            >
              {busy ? "Importing source…" : "Import snapshot"}
            </button>
          </form>
          <Dialog.Close
            disabled={busy}
            className="absolute right-3 top-2 p-2"
            aria-label="Close import"
          >
            ×
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
