import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Clock, Zap, BookOpen, Sparkles, Lock, Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { learningPaths, roadmapModules } from "@/lib/mockData";

export default function Learn() {
  const active = learningPaths[0];
  const done = roadmapModules.filter((m) => m.status === "done").length;
  const pct = Math.round((done / roadmapModules.length) * 100);
  const currentIdx = roadmapModules.findIndex((m) => m.status === "current");

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Learn</h2>
        <p className="text-sm text-muted-foreground mt-1">Structured paths that take you from zero to a verified, job-ready skill set.</p>
      </div>

      {/* Active path */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-center gap-2 text-xs text-primary mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Your active path
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">{active.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {active.level} · {active.modules} modules · {active.hours}h · {active.weeks} weeks · {active.xp.toLocaleString()} XP
            </p>
          </div>
          <Link to="/code-lab" className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 self-start">
            Continue path <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{done} of {roadmapModules.length} modules complete</span>
            <span>{pct}%</span>
          </div>
          <div className="flex gap-1.5">
            {roadmapModules.map((m, i) => (
              <div
                key={m.name}
                title={m.name}
                className={cn(
                  "h-2 flex-1 rounded-full",
                  m.status === "done" ? "bg-success" : m.status === "current" ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          {currentIdx >= 0 && (
            <p className="text-xs text-muted-foreground mt-3">
              Next up: <span className="text-foreground font-medium">{roadmapModules[currentIdx].name}</span> · {roadmapModules[currentIdx].xp} XP
            </p>
          )}
        </div>
      </div>

      {/* Explore paths */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3">Explore paths</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((p) => {
            const locked = p.status === "Locked";
            return (
              <div
                key={p.id}
                className={cn(
                  "rounded-xl border bg-card p-5 flex flex-col animate-slide-up",
                  locked ? "border-border/60 opacity-70" : "border-border hover:border-primary/40 transition-colors"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                    <BookOpen className="w-4.5 h-4.5 text-primary" />
                  </div>
                  {locked ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : p.status === "In progress" ? (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-primary/15 text-primary">Active</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-muted text-muted-foreground">Available</span>
                  )}
                </div>

                <h4 className="font-heading font-semibold text-foreground">{p.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{p.level}</p>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed flex items-start gap-1.5">
                  <Target className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  {p.outcome}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{p.modules} modules</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.weeks}w</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" />{p.xp.toLocaleString()}</span>
                </div>

                <div className="mt-auto pt-4">
                  {locked ? (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> {p.lockReason}
                    </p>
                  ) : (
                    <Link to="/code-lab" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      {p.status === "In progress" ? "Continue" : "Start path"} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}