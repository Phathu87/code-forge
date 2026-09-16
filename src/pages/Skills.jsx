import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, AlertTriangle, ArrowRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { detailedSkills } from "@/lib/mockData";

const levelStyles = {
  Learning: "bg-muted text-muted-foreground",
  Foundation: "bg-warning/15 text-warning",
  Competent: "bg-primary/15 text-primary",
  Advanced: "bg-success/15 text-success",
  Expert: "bg-accent/15 text-accent",
  Specialist: "bg-chart-3/15 text-chart-3",
};

export default function Skills() {
  const categories = ["All", ...new Set(detailedSkills.map((s) => s.category))];
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? detailedSkills : detailedSkills.filter((s) => s.category === category);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Skills</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Every rating is earned through verified missions, real projects and passing tests — never through watching lessons.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "px-3.5 py-1.5 rounded-full border text-sm transition-colors",
              category === c
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <div key={s.name} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-semibold text-foreground">{s.name}</h3>
                <ShieldCheck className="w-4 h-4 text-success" aria-label="Verified skill" />
              </div>
              <span className={cn("text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-medium", levelStyles[s.level])}>
                {s.level}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span><span className="text-foreground font-medium">{s.missions}</span> missions</span>
              <span><span className="text-foreground font-medium">{s.projects}</span> projects</span>
              <span><span className="text-foreground font-medium">{s.tests}</span> tests passed</span>
            </div>

            <p className="text-[11px] text-muted-foreground/70 mt-2">Last verified {s.lastVerified}</p>

            {s.weakArea && (
              <div className="flex items-center gap-1.5 mt-3 text-xs text-warning">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Weak area: {s.weakArea}
              </div>
            )}

            <Link
              to="/missions"
              className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="flex-1">Recommended next: {s.nextMission}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}