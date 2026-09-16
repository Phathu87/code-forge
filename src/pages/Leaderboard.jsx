import React, { useState } from "react";
import { Flame, Zap, TrendingUp, Crown, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { leaderboard, leaderboardPeriods, yourRank, userProfile } from "@/lib/mockData";

export default function Leaderboard() {
  const [period, setPeriod] = useState("This week");
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]];

  const podiumConfig = [
    { place: 2, icon: Medal, accent: "text-chart-4 border-chart-4/40 bg-chart-4/5", h: "h-28" },
    { place: 1, icon: Crown, accent: "text-warning border-warning/50 bg-warning/5", h: "h-36" },
    { place: 3, icon: Medal, accent: "text-chart-1 border-chart-1/40 bg-chart-1/5", h: "h-24" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-heading font-semibold text-foreground">Leaderboard</h2>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-success/15 text-success font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Ranks by verified XP and completed mission milestones — updates in real time as builders pass tests.</p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg border border-border bg-card">
          {leaderboardPeriods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs transition-colors",
                period === p ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Your rank */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold text-foreground">#{yourRank.rank}</span>
              <span className="text-xs text-success flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{yourRank.change} this {period === "All time" ? "all-time" : "week"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Top {yourRank.percentile}% of all builders · {userProfile.xp.toLocaleString()} XP</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Metric label="Your level" value={`Lvl ${userProfile.level}`} />
          <Metric label="Streak" value={`${userProfile.streak}d`} />
        </div>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
        {podiumOrder.map((entry, i) => {
          const cfg = podiumConfig[i];
          const Icon = cfg.icon;
          return (
            <div key={entry.rank} className="text-center">
              <div className={cn("w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-heading font-bold text-primary-foreground mb-2", i === 1 && "w-14 h-14")}>
                {entry.avatar}
              </div>
              <p className="text-xs font-medium text-foreground truncate hidden sm:block">{entry.name}</p>
              <p className="text-[11px] text-muted-foreground">{entry.xp.toLocaleString()} XP</p>
              <div className={cn("mt-2 rounded-t-lg border border-b-0 flex items-center justify-center", cfg.h, cfg.accent)}>
                <Icon className={cn("w-7 h-7", cfg.accent.split(" ")[0])} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of the list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {rest.map((entry, i) => (
          <div
            key={entry.rank}
            className={cn(
              "flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0",
              entry.you && "bg-primary/5"
            )}
          >
            <span className="text-sm font-mono text-muted-foreground w-6 text-center">{entry.rank}</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
              {entry.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate">{entry.name}</span>
                {entry.you && <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary text-primary-foreground">You</span>}
              </div>
              <p className="text-[11px] text-muted-foreground">Level {entry.level} · {entry.levelTitle}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Flame className="w-3.5 h-3.5 text-warning" /> {entry.streak}d
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground w-24 justify-end">
              <Zap className="w-3.5 h-3.5 text-primary" /> {entry.xp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-lg font-heading font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}