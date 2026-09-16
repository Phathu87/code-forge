import React from "react";
import PublicShell from "@/components/landing/PublicShell";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Clock, RefreshCw } from "lucide-react";

const statusStyles = {
  Operational: "bg-success/15 text-success",
  Degraded: "bg-warning/15 text-warning",
  "Partial Outage": "bg-warning/15 text-warning",
  "Major Outage": "bg-destructive/15 text-destructive",
  Maintenance: "bg-primary/15 text-primary",
};

const services = [
  { name: "Application", status: "Operational", note: "Web app, dashboards, public pages" },
  { name: "Authentication", status: "Operational", note: "Sign-in, sessions, email verification" },
  { name: "Code Execution", status: "Degraded", note: "Simulated sandbox — production isolated runtime pending" },
  { name: "Tests", status: "Operational", note: "Visible test runs; hidden tests at submission" },
  { name: "Code Coach", status: "Operational", note: "Guided hints, three levels" },
  { name: "Project Sync", status: "Operational", note: "Local drafts, syncing and conflict states" },
  { name: "Certificate Verification", status: "Degraded", note: "Demo verification lookups only" },
];

export default function Status() {
  const updated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const degraded = services.some((s) => s.status === "Degraded" || s.status === "Partial Outage" || s.status === "Major Outage");

  return (
    <PublicShell>
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">System Status</div>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-card">
            {degraded ? (
              <>
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium text-foreground">Mostly operational — some services simulated in beta</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-foreground">All systems operational</span>
              </>
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Updated {updated} · refreshes with real monitoring in production
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {services.map((s) => (
            <div key={s.name} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.note}</p>
              </div>
              <span className={cn("text-[10px] uppercase tracking-wide font-medium px-2.5 py-1 rounded whitespace-nowrap", statusStyles[s.status])}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-foreground">Recent incidents</h2>
            <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">No recent incidents. This prototype environment reports simulated status only — real incident history connects to production monitoring.</p>
        </div>

        <p className="text-[11px] text-muted-foreground/70 mt-6 text-center">
          Status subscriptions (email/webhook) arrive with the production monitoring backend.
        </p>
      </section>
    </PublicShell>
  );
}