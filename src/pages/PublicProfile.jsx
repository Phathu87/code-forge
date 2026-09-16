import React from "react";
import { useParams } from "react-router-dom";
import { BadgeCheck, Trophy, Zap, FolderGit2, ShieldCheck, Lock } from "lucide-react";
import PublicShell from "@/components/landing/PublicShell";
import { cn } from "@/lib/utils";
import { userProfile, portfolioStats, portfolioSkills, portfolioProjects, certificates } from "@/lib/mockData";

const levelStyles = {
  Learning: "bg-muted text-muted-foreground",
  Foundation: "bg-warning/15 text-warning",
  Competent: "bg-primary/15 text-primary",
  Advanced: "bg-success/15 text-success",
  Expert: "bg-accent/15 text-accent",
  Specialist: "bg-chart-3/15 text-chart-3",
};

export default function PublicProfile() {
  const { username } = useParams();

  return (
    <PublicShell>
      <section className="border-b border-border bg-gradient-to-r from-primary/10 via-card to-card">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-heading font-bold text-primary-foreground shrink-0 shadow-lg">
              {userProfile.avatarInitials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-heading font-semibold text-foreground">{userProfile.name}</h1>
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded px-1.5 py-0.5">@{username || "profile"}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{userProfile.role} · Level {userProfile.level} — {userProfile.levelTitle}</p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Every skill below is backed by verified missions, real projects and passing automated tests.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            <Stat icon={Trophy} value={`Level ${userProfile.level}`} label={userProfile.levelTitle} />
            <Stat icon={Zap} value={userProfile.xp.toLocaleString()} label="Total XP" />
            <Stat icon={FolderGit2} value={portfolioStats.projects} label="Projects" />
            <Stat icon={ShieldCheck} value={portfolioStats.verifiedSkills} label="Verified skills" />
            <Stat icon={BadgeCheck} value={portfolioStats.certificates} label="Certificates" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <div>
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Verified skills</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {portfolioSkills.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" /> {s.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">{s.evidence}</p>
                </div>
                <span className={cn("text-[10px] uppercase px-2 py-0.5 rounded font-medium whitespace-nowrap", levelStyles[s.level])}>{s.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolioProjects.map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading font-semibold text-foreground">{p.name}</h3>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap", p.status === "Verified" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.problem}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <span className="text-foreground font-medium">Tests:</span> {p.tests} passed
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Certificates</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {certificates.filter((c) => c.verified).map((c) => (
              <div key={c.name} className="rounded-xl border border-success/30 bg-card p-4 flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-[11px] font-mono text-muted-foreground">ID: {c.id} · issued {c.issued}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/70 flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> Public profile — private assessment telemetry, hidden tests and review notes are never shown publicly.
        </p>
      </section>
    </PublicShell>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="w-4 h-4 text-primary" />
      <div className="leading-tight">
        <div className="text-lg font-heading font-semibold text-foreground">{value}</div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}