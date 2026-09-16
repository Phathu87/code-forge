import React, { useState } from "react";
import { X, Github, Check, ArrowRight, Star, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { githubRepos } from "@/lib/mockData";

export default function GitHubImportModal({ onClose, onImport }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selected, setSelected] = useState([]);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (name) =>
    setSelected((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  const connect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1200);
  };

  const importNow = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setDone(true);
      onImport(githubRepos.filter((r) => selected.includes(r.name)));
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-scale-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute p-1.5 rounded hover:bg-muted text-muted-foreground top-3 right-3" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
              <Github className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Import from GitHub</h3>
              <p className="text-xs text-muted-foreground">Pull completed projects into your verified portfolio.</p>
            </div>
          </div>

          {!connected && !done && (
            <div className="mt-5 text-center py-6">
              <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                Connect your GitHub account to import repositories. Only repos with passing tests can become verified portfolio projects.
              </p>
              <button
                onClick={connect}
                disabled={connecting}
                className="inline-flex items-center gap-2 px-5 h-10 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {connecting ? (
                  <><span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" /> Connecting…</>
                ) : (
                  <><Github className="w-4 h-4" /> Connect GitHub</>
                )}
              </button>
            </div>
          )}

          {connected && !done && (
            <div className="mt-5">
              <div className="flex items-center gap-2 text-xs text-success mb-3">
                <Check className="w-3.5 h-3.5" /> Connected as @phathu-dev · {githubRepos.length} repos found
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {githubRepos.map((r) => {
                  const checked = selected.includes(r.name);
                  return (
                    <button
                      key={r.name}
                      onClick={() => toggle(r.name)}
                      className={cn(
                        "w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors",
                        checked ? "border-primary bg-primary/10" : "border-border hover:bg-muted/30"
                      )}
                    >
                      <span className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                        checked ? "bg-primary border-primary" : "border-border"
                      )}>
                        {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground font-mono">{r.name}</span>
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground"><Star className="w-3 h-3" /> {r.stars}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{r.desc}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5"><GitBranch className="w-3 h-3" /> {r.language}</span>
                          <span>·</span>
                          <span>{r.tests} tests</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">{selected.length} selected</span>
                <button
                  onClick={importNow}
                  disabled={selected.length === 0 || importing}
                  className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {importing ? <><span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> Importing…</> : <>Import {selected.length > 0 ? `(${selected.length})` : ""}</>}
                </button>
              </div>
            </div>
          )}

          {done && (
            <div className="mt-5 text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-success/15 flex items-center justify-center mb-3">
                <Check className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Imported {selected.length} project{selected.length !== 1 ? "s" : ""}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                Projects with all tests passing are now verified on your portfolio. Others are added as in-progress.
              </p>
              <button onClick={onClose} className="mt-5 inline-flex items-center gap-1.5 px-5 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                View portfolio <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}