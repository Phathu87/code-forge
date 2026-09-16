import React from "react";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { missionRequirements } from "@/lib/mockData";

export default function RequirementsPanel() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Requirements</h4>
        <ul className="space-y-1.5">
          {missionRequirements.tasks.map((t, i) => (
            <li key={i} className="flex items-center gap-2 text-muted-foreground">
              {t.done ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
              <span className={t.done ? "line-through opacity-70" : ""}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Concepts</h4>
        <div className="flex flex-wrap gap-1.5">
          {missionRequirements.concepts.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded bg-muted/70 text-muted-foreground">{c}</span>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-warning flex items-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5" /> You cannot submit until mandatory tests pass.
      </p>
    </div>
  );
}