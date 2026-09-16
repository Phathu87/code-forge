import React from "react";
import { Award, BadgeCheck, Zap, Lock, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { achievements, certificates, userProfile } from "@/lib/mockData";

const rarityStyles = {
  Common: "border-border text-muted-foreground",
  Rare: "border-primary/40 text-primary",
  Epic: "border-chart-3/50 text-chart-3",
  Legendary: "border-warning/50 text-warning",
};

const achievementIcons = {
  Rocket: "🚀", Bug: "🐛", Flame: "🔥", Globe: "🌐",
  Code2: "⌨️", ShieldCheck: "🛡️", Accessibility: "♿", Server: "🖥️",
};

export default function MilestoneSection() {
  const earnedCount = achievements.filter((a) => a.earned).length;
  const nextLevelXp = 6000;
  const xpPct = Math.round((userProfile.xp / nextLevelXp) * 100);
  const remaining = nextLevelXp - userProfile.xp;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">Progress & Milestones</h3>
        <span className="text-xs text-muted-foreground">{earnedCount}/{achievements.length} achievements · {certificates.filter((c) => c.verified).length} certificates</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* XP progress */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" /> XP Progress
            </span>
            <span className="text-xs text-muted-foreground">Level {userProfile.level} · {userProfile.levelTitle}</span>
          </div>
          <div className="text-3xl font-heading font-semibold text-foreground mt-2">
            {userProfile.xp.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">/ {nextLevelXp.toLocaleString()} XP</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Earn {remaining.toLocaleString()} more XP to reach Level 9 — Architect</p>

          <div className="relative mt-5 h-2.5 rounded-full bg-muted overflow-visible">
            <div className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary" style={{ width: `${xpPct}%` }} />
            <MilestoneMark pct={50} label="Lvl 8 · Builder" />
            <MilestoneMark pct={100} label="Lvl 9 · Architect" highlight />
          </div>

          <div className="flex gap-2 mt-8 flex-wrap">
            <NextMilestone icon={Award} title="React Builder" sub="3 more React missions" />
            <NextMilestone icon={BadgeCheck} title="React Foundations Certificate" sub="Final practical assessment" />
          </div>
        </div>

        {/* Certificates */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-3">
            <BadgeCheck className="w-3.5 h-3.5 text-success" /> Certificates
          </h4>
          <div className="space-y-2.5">
            {certificates.map((c) => (
              <div key={c.name} className={cn("rounded-lg border p-3", c.verified ? "border-success/30 bg-success/5" : "border-border bg-muted/20")}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground leading-snug">{c.name}</span>
                  {c.verified ? (
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </div>
                {c.verified ? (
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                    <span className="text-[10px] text-muted-foreground">{c.issued}</span>
                  </div>
                ) : (
                  <>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{c.note} · {c.progress}%</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 2xl:grid-cols-8">
        {achievements.map((a) => (
          <div
            key={a.name}
            className={cn(
              "rounded-xl border bg-card p-4 text-center animate-slide-up relative",
              a.earned ? rarityStyles[a.rarity] : "border-border/60 opacity-60"
            )}
          >
            <div className={cn(
              "w-11 h-11 mx-auto rounded-xl flex items-center justify-center text-xl mb-2.5",
              a.earned ? "bg-muted/60" : "bg-muted/30 grayscale"
            )}>
              {achievementIcons[a.icon] || "🏅"}
            </div>
            <h4 className="text-sm font-medium text-foreground leading-tight">{a.name}</h4>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{a.desc}</p>
            <div className="mt-2.5">
              {a.earned ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-success">
                  <CheckCircle2 className="w-3 h-3" /> {a.earnedDate}
                </span>
              ) : a.progress ? (
                <span className="text-[10px] text-warning">{a.progress} — in progress</span>
              ) : (
                <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>
            <span className={cn(
              "absolute top-2 right-2 text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded",
              a.earned ? "bg-muted/80 " + rarityStyles[a.rarity] : "bg-muted/50 text-muted-foreground/50"
            )}>
              {a.rarity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MilestoneMark({ pct, label, highlight = false }) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${pct}%` }}>
      <div className={cn("w-2 h-2 rounded-full ring-4 ring-background", highlight ? "bg-primary" : "bg-muted-foreground/50")} />
      <span className={cn("absolute left-1/2 -translate-x-1/2 top-4 text-[10px] whitespace-nowrap", highlight ? "text-primary font-medium" : "text-muted-foreground")}>
        {label}
      </span>
    </div>
  );
}

function NextMilestone({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/20 px-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="leading-tight">
        <div className="text-xs font-medium text-foreground">{title}</div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
      <TrendingUp className="w-3.5 h-3.5 text-muted-foreground ml-1" />
    </div>
  );
}