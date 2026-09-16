import React, { useMemo, useState } from "react";
import {
  ShieldCheck, Flag, Clock, CheckCircle2, AlertTriangle, ChevronDown, Gavel, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { flaggedSubmissions, integrityStatusFilters } from "@/lib/mockData";

const statusStyles = {
  Flagged: "bg-destructive/15 text-destructive",
  "Under review": "bg-warning/15 text-warning",
  Appealed: "bg-chart-3/15 text-chart-3",
  Cleared: "bg-success/15 text-success",
};

function riskTone(v) {
  return v < 30 ? "text-success" : v < 60 ? "text-warning" : "text-destructive";
}

export default function Integrity() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "All" ? flaggedSubmissions : flaggedSubmissions.filter((s) => s.status === filter);

  const counts = useMemo(() => {
    const c = { Flagged: 0, "Under review": 0, Appealed: 0, Cleared: 0 };
    flaggedSubmissions.forEach((s) => { c[s.status] = (c[s.status] || 0) + 1; });
    return c;
  }, []);
  const avgRisk = Math.round(flaggedSubmissions.reduce((s, x) => s + x.aiRisk, 0) / flaggedSubmissions.length);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-heading font-semibold text-foreground">Integrity Center</h2>
            <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-primary/15 text-primary">Reviewer</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Flagged submissions, authorship signals and appeals — only verified work becomes certificates.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard icon={Flag} value={counts.Flagged} label="Flagged" tone="text-destructive" />
        <StatCard icon={Clock} value={counts["Under review"]} label="Under review" tone="text-warning" />
        <StatCard icon={Gavel} value={counts.Appealed} label="Appealed" tone="text-chart-3" />
        <StatCard icon={CheckCircle2} value={counts.Cleared} label="Cleared" tone="text-success" />
        <StatCard icon={Zap} value={`${avgRisk}%`} label="Avg AI-risk" tone="text-warning" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {integrityStatusFilters.map((f) => (
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

      {/* Queue */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {filtered.map((s) => {
          const open = expanded === s.id;
          return (
            <div key={s.id} className="border-b border-border last:border-b-0">
              <button
                onClick={() => setExpanded(open ? null : s.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors text-left"
              >
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform shrink-0", !open && "-rotate-90")} />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground truncate">{s.learner}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{s.id}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{s.mission} · {s.submitted}</p>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-xs">
                  <Signal label="AI" value={s.aiRisk} />
                  <Signal label="Sim" value={s.similarity} />
                  <Signal label="Auth" value={s.authorship} />
                </div>
                {s.pasteEvents > 0 && (
                  <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-destructive">
                    <AlertTriangle className="w-3 h-3" /> {s.pasteEvents} paste
                  </span>
                )}
                <span className={cn("text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-medium shrink-0", statusStyles[s.status])}>
                  {s.status}
                </span>
              </button>

              {open && (
                <div className="px-4 pb-4 pl-11 animate-fade-in">
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Signals</h4>
                    <ul className="space-y-1">
                      {s.signals.map((sig, i) => (
                        <li key={i} className="text-xs text-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" /> {sig}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {s.appealReason && (
                    <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-3 mt-2">
                      <h4 className="text-[11px] uppercase tracking-wide text-chart-3 mb-1.5 flex items-center gap-1.5">
                        <Gavel className="w-3.5 h-3.5" /> Learner appeal
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">“{s.appealReason}”</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    <button className="px-3 h-8 rounded-md bg-success/15 text-success text-xs font-medium hover:bg-success/25 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="px-3 h-8 rounded-md bg-warning/15 text-warning text-xs font-medium hover:bg-warning/25 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Request re-verification
                    </button>
                    {s.status === "Appealed" ? (
                      <button className="px-3 h-8 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 flex items-center gap-1.5">
                        <Gavel className="w-3.5 h-3.5" /> Resolve appeal
                      </button>
                    ) : (
                      <button className="px-3 h-8 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5">
                        <Flag className="w-3.5 h-3.5" /> Escalate
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <ShieldCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>No submissions in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Signal({ label, value }) {
  return (
    <div className="text-center w-12">
      <div className={cn("text-sm font-semibold tabular-nums", riskTone(value))}>{value}%</div>
      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, tone }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-4 h-4", tone)} />
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-heading font-semibold text-foreground">{value}</div>
    </div>
  );
}