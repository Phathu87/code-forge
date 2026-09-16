import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, BadgeCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, label: "Learners", value: "12,480", sub: "1,184 active today" },
  { icon: Target, label: "Missions", value: "42", sub: "8 categories · 4 levels" },
  { icon: BadgeCheck, label: "Certificates issued", value: "216", sub: "demo data" },
  { icon: ShieldCheck, label: "Open integrity cases", value: "3", sub: "1 appealed · 1 under review" },
];

const statusPill = {
  Available: "bg-success/15 text-success",
  Beta: "bg-primary/15 text-primary",
  Preview: "bg-warning/15 text-warning",
  "Coming Soon": "bg-muted text-muted-foreground",
};

const featureFlags = [
  { name: "AI Code Coach", status: "Beta" },
  { name: "Community", status: "Available" },
  { name: "Leaderboard", status: "Available" },
  { name: "Verified Certificates", status: "Preview" },
  { name: "Python Runtime", status: "Coming Soon" },
  { name: "PHP Runtime", status: "Coming Soon" },
  { name: "Employer Verification", status: "Coming Soon" },
  { name: "Live Verification", status: "Coming Soon" },
];

const health = [
  { name: "Application", status: "Operational" },
  { name: "Code Execution (simulated)", status: "Preview" },
  { name: "Certificate Verification", status: "Preview" },
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</span>
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Feature flags</h3>
          <p className="text-[11px] text-muted-foreground/70 mb-3">Production configuration connects these flags to real availability. Never label simulated functionality as Verified.</p>
          <div className="flex flex-wrap gap-2">
            {featureFlags.map((f) => (
              <span key={f.name} className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md border border-border bg-muted/30">
                <span className="text-foreground">{f.name}</span>
                <span className={cn("text-[9px] uppercase font-medium px-1.5 py-0.5 rounded", statusPill[f.status])}>{f.status}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Service health</h3>
          <ul className="space-y-2">
            {health.map((h) => (
              <li key={h.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{h.name}</span>
                <span className={cn("text-[10px] uppercase font-medium px-2 py-0.5 rounded", statusPill[h.status])}>{h.status}</span>
              </li>
            ))}
          </ul>
          <Link to="/status" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-4">
            Public status page <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Integrity review queue</h3>
        <p className="text-xs text-muted-foreground">3 submissions awaiting reviewer action.</p>
        <Link to="/integrity" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-3">
          Open Review Queue <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}