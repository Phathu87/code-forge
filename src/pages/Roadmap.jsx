import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2, Circle, Lock, Zap, ArrowRight, Target, Sparkles, Flag, Code2, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { roadmapModules, learningPaths } from "@/lib/mockData";

export default function Roadmap() {
  const currentIdx = roadmapModules.findIndex((m) => m.status === "current");
  const [selected, setSelected] = useState(currentIdx >= 0 ? currentIdx : 0);
  const active = learningPaths[0];
  const done = roadmapModules.filter((m) => m.status === "done").length;
  const pct = Math.round((done / roadmapModules.length) * 100);
  const mod = roadmapModules[selected];

  const nodeVisual = (m) => {
    if (m.status === "done") return { ring: "bg-success/15 text-success border-success/40", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    if (m.status === "current") return { ring: "bg-primary/15 text-primary border-primary ring-2 ring-primary/40", icon: <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> };
    if (m.capstone) return { ring: "bg-warning/15 text-warning border-warning/40", icon: <Flag className="w-3.5 h-3.5" /> };
    return { ring: "bg-muted text-muted-foreground border-border", icon: <Circle className="w-3 h-3" /> };
  };

  const upcoming = roadmapModules.filter((m) => m.status === "todo" && !m.capstone).slice(0, 3);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Roadmap</h2>
        <p className="text-sm text-muted-foreground mt-1">Your interactive path — tap any milestone to see the skills you'll build and what's up next.</p>
      </div>

      {/* Path summary */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-primary mb-1">
              <Sparkles className="w-3.5 h-3.5" /> {active.name}
            </div>
            <p className="text-xs text-muted-foreground">{active.level} · {active.modules} milestones · {active.weeks} weeks at your pace</p>
          </div>
          <Link to="/code-lab" className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 self-start">
            Continue current <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>{done} of {roadmapModules.length} milestones complete</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Timeline */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Milestones</h3>
          <div className="relative pl-7">
            <div className="absolute left-[13px] top-1 bottom-1 w-px bg-border" />
            {roadmapModules.map((m, i) => {
              const v = nodeVisual(m);
              const isActive = selected === i;
              return (
                <button
                  key={m.name}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "relative flex items-start gap-3 pb-5 last:pb-0 w-full text-left group",
                  )}
                >
                  <span className={cn(
                    "absolute -left-7 top-0.5 w-[26px] h-[26px] rounded-full border flex items-center justify-center transition-transform group-hover:scale-110",
                    v.ring
                  )}>
                    {v.icon}
                  </span>
                  <div className={cn("flex-1 rounded-lg px-3 py-2 transition-colors", isActive ? "bg-primary/10" : "group-hover:bg-muted/30")}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("text-sm font-medium", m.status === "done" ? "text-muted-foreground" : "text-foreground")}>{m.name}</span>
                      {m.status === "current" && <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary text-primary-foreground">Now</span>}
                      {m.capstone && <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-warning/15 text-warning">Capstone</span>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.missions} missions · {m.duration} · {m.xp} XP</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={cn(
              "text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-medium",
              mod.status === "done" ? "bg-success/15 text-success" : mod.status === "current" ? "bg-primary/15 text-primary" : mod.capstone ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
            )}>
              {mod.status === "done" ? "Completed" : mod.status === "current" ? "In progress" : mod.capstone ? "Capstone project" : "Upcoming"}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" /> {mod.xp} XP</span>
          </div>

          <h3 className="text-xl font-heading font-semibold text-foreground">{mod.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{mod.missions} missions · {mod.duration}</p>

          <div className="mt-4">
            <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Skills you'll build
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {mod.skills.map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-md bg-muted/60 text-foreground">{s}</span>
              ))}
            </div>
          </div>

          {mod.status === "current" && (
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-1">
                <Target className="w-3.5 h-3.5" /> Currently focusing on
              </div>
              <p className="text-sm text-foreground">You're working through this milestone now. Each mission here strengthens the skills above and feeds your verified skill ratings.</p>
            </div>
          )}

          <div className="mt-5">
            <Link to="/code-lab" className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              {mod.status === "done" ? "Review missions" : mod.status === "current" ? "Continue milestone" : "Preview missions"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming skill milestones */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Upcoming skill milestones
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((m) => (
            <div key={m.name} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-foreground">{m.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Unlocks these skills:</p>
              <div className="flex flex-wrap gap-1.5">
                {m.skills.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">{s}</span>
                ))}
              </div>
              <button onClick={() => setSelected(roadmapModules.indexOf(m))} className="text-xs text-primary hover:underline mt-3">
                View milestone →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}