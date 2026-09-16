import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Target, Zap, Clock, ShieldCheck, Lock, Search, Filter, ArrowRight, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { missions, missionCategories, levelFilters, statusFilters } from "@/lib/mockData";

const levelColor = {
  Beginner: "bg-success/15 text-success",
  Intermediate: "bg-primary/15 text-primary",
  Expert: "bg-accent/15 text-accent",
  Specialist: "bg-warning/15 text-warning",
};

export default function Missions() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return missions.filter((m) => {
      if (search && !(`${m.title} ${m.brief}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (level !== "All" && m.level !== level) return false;
      if (status !== "All" && m.status !== status) return false;
      if (category !== "All" && m.category !== category) return false;
      return true;
    });
  }, [search, level, status, category]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Missions</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-world problems. You write the code — we help you understand it.</p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search missions…"
            className="w-full h-10 pl-9 pr-3 rounded-md bg-muted/50 border border-border text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <FilterSelect label="Level" value={level} onChange={setLevel} options={["All", ...levelFilters]} />
          <FilterSelect label="Status" value={status} onChange={setStatus} options={["All", ...statusFilters]} />
          <FilterSelect label="Category" value={category} onChange={setCategory} options={["All", ...missionCategories]} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => {
          const locked = m.status === "Locked";
          return (
            <div
              key={m.id}
              className={cn(
                "rounded-xl border bg-card p-4 flex flex-col animate-slide-up",
                locked ? "border-border/60 opacity-70" : "border-border hover:border-primary/40 transition-colors"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wide", levelColor[m.level])}>
                    {m.level}
                  </span>
                  {m.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-success" title="Verified mission">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                  {m.origin && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent" title="Origin mission">Origin</span>
                  )}
                </div>
                {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
              </div>

              <h3 className="font-heading font-semibold text-foreground leading-snug">{m.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{m.brief}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {m.technologies.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" />{m.xp} XP</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{m.estimated}</span>
              </div>

              <div className="mt-auto pt-4">
                {m.status === "In progress" && (
                  <div className="mb-3">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {m.status === "Completed" ? (
                      <><CheckCircle2 className="w-4 h-4 text-success" /> Completed</>
                    ) : m.status === "In progress" ? (
                      <><PlayCircle className="w-4 h-4 text-primary" /> {m.progress}%</>
                    ) : locked ? (
                      <><Lock className="w-3.5 h-3.5" /> Locked</>
                    ) : (
                      <><Circle className="w-4 h-4" /> Not started</>
                    )}
                  </span>
                  {!locked && (
                    <Link to="/code-lab" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      {m.status === "Completed" ? "Review" : m.status === "In progress" ? "Continue" : "Start"} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No missions match your filters.</p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
        <Filter className="w-3 h-3" /> {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-3 rounded-md bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}