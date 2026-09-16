import React, { useState } from "react";
import { Package, Plus } from "lucide-react";
import { missionDependencyPolicy } from "@/lib/mockData";

export default function DependenciesPanel({ deps, onInstall, onBlocked }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const submit = () => {
    const pkg = name.trim();
    if (!pkg) {
      setAdding(false);
      setError(null);
      return;
    }
    if (missionDependencyPolicy.allowed.includes(pkg)) {
      onInstall(pkg);
      setName("");
      setAdding(false);
      setError(null);
    } else {
      setError(`"${pkg}" is not allowed by this mission's dependency policy.`);
      onBlocked(pkg);
    }
  };

  return (
    <div>
      <div className="px-3 h-8 flex items-center justify-between border-b border-border">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
          <Package className="w-3 h-3" /> Dependencies
        </span>
        <button
          onClick={() => { setAdding(!adding); setError(null); }}
          title="Add dependency"
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-2 space-y-1">
        {adding && (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") { setAdding(false); setError(null); setName(""); }
            }}
            onBlur={submit}
            placeholder="package name"
            className="w-full h-6 px-1.5 rounded bg-background border border-primary/50 text-xs text-foreground outline-none"
          />
        )}
        {error && <p className="text-[10px] text-destructive leading-snug">{error}</p>}
        {deps.map((d) => (
          <div key={d.name} className="flex items-center justify-between px-2 py-1 rounded text-xs">
            <span className="text-foreground truncate">{d.name}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{d.version}</span>
          </div>
        ))}
        <p className="text-[10px] text-muted-foreground/60 leading-snug pt-1.5 border-t border-border">
          {missionDependencyPolicy.note} Allowed: {missionDependencyPolicy.allowed.join(", ")}.
        </p>
      </div>
    </div>
  );
}