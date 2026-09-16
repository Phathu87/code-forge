import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderGit2, ShieldCheck, Lock, Plus, Clock, CheckCircle2, Circle, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, projectFilters } from "@/lib/mockData";

const statusStyles = {
  Verified: "bg-success/15 text-success",
  "In progress": "bg-warning/15 text-warning",
  Draft: "bg-muted text-muted-foreground",
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">Your build history — verified projects can be added to your public portfolio.</p>
        </div>
        <Link to="/missions" className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 self-start">
          <Plus className="w-4 h-4" /> New project
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {projectFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3.5 py-1.5 rounded-full border text-sm transition-colors",
              filter === f ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-5 flex flex-col animate-slide-up">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                  <FolderGit2 className="w-4.5 h-4.5 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground leading-tight truncate">{p.name}</h3>
              </div>
              <span className={cn("text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-medium shrink-0", statusStyles[p.status])}>
                {p.status}
              </span>
            </div>

            {p.origin && (
              <span className="inline-flex items-center gap-1 text-[10px] text-accent mb-2">
                <Sparkles className="w-3 h-3" /> Origin project
              </span>
            )}

            <div className="flex flex-wrap gap-1">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
              ))}
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full", p.progress === 100 ? "bg-success" : "bg-primary")} style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {p.status === "Verified" ? <ShieldCheck className="w-3.5 h-3.5 text-success" /> : <Lock className="w-3.5 h-3.5" />}
                {p.tests} tests
              </span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.updated}</span>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">
              <span className={cn(
                "flex items-center gap-1.5 text-xs",
                p.inPortfolio ? "text-primary" : "text-muted-foreground/60"
              )}>
                {p.inPortfolio ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                {p.inPortfolio ? "In portfolio" : "Not in portfolio"}
              </span>
              <Link to="/code-lab" className="text-sm text-primary hover:underline">
                {p.status === "Draft" ? "Continue" : "Open"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <FolderGit2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}