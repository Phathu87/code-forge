import React, { useState } from "react";
import { Award, Lock, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { achievements } from "@/lib/mockData";
import LinkedInShareButton from "@/components/LinkedInShareButton";

const rarityBadge = {
  Common: "bg-muted text-muted-foreground",
  Rare: "bg-primary/15 text-primary",
  Epic: "bg-chart-3/15 text-chart-3",
  Legendary: "bg-warning/15 text-warning",
};

const rarityBorder = {
  Common: "border-border",
  Rare: "border-primary/40",
  Epic: "border-chart-3/50",
  Legendary: "border-warning/50",
};

const achievementIcons = {
  Rocket: "🚀", Bug: "🐛", Flame: "🔥", Globe: "🌐",
  Code2: "⌨️", ShieldCheck: "🛡️", Accessibility: "♿", Server: "🖥️",
};

const filters = ["All", "Earned", "In progress", "Locked"];

export default function Achievements() {
  const [filter, setFilter] = useState("All");

  const filtered = achievements.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Earned") return a.earned;
    if (filter === "In progress") return !a.earned && !!a.progress;
    return !a.earned && !a.progress;
  });

  const earned = achievements.filter((a) => a.earned);
  const shareUrl = (typeof window !== "undefined" ? window.location.origin + "/portfolio" : "");

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Achievements</h2>
        <p className="text-sm text-muted-foreground mt-1">Badges earned through verified, original work — share them to your LinkedIn profile.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Earned" value={earned.length} tone="text-success" />
        <Stat label="In progress" value={achievements.filter((a) => !a.earned && a.progress).length} tone="text-warning" />
        <Stat label="Locked" value={achievements.filter((a) => !a.earned && !a.progress).length} tone="text-muted-foreground" />
        <Stat label="Legendary" value={earned.filter((a) => a.rarity === "Legendary").length} tone="text-warning" />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
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

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((a) => {
          const inProgress = !a.earned && a.progress;
          return (
            <div
              key={a.name}
              className={cn(
                "rounded-xl border bg-card p-5 flex flex-col animate-slide-up relative",
                a.earned ? rarityBorder[a.rarity] : "border-border/60 opacity-70"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl", a.earned ? "bg-muted/60" : "bg-muted/30 grayscale")}>
                  {achievementIcons[a.icon] || "🏅"}
                </div>
                <span className={cn("text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium", rarityBadge[a.rarity])}>
                  {a.rarity}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-foreground leading-tight">{a.name}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-snug flex-1">{a.desc}</p>

              <div className="mt-3">
                {a.earned ? (
                  <span className="inline-flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Earned {a.earnedDate}
                  </span>
                ) : inProgress ? (
                  <span className="inline-flex items-center gap-1 text-xs text-warning">
                    <Sparkles className="w-3.5 h-3.5" /> {a.progress} — in progress
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>

              {a.earned && (
                <div className="mt-3 pt-3 border-t border-border">
                  <LinkedInShareButton
                    label="Share"
                    url={shareUrl}
                    title={`I earned the ${a.name} badge on CodeForge`}
                    className="w-full justify-center"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Award className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No achievements in this category yet.</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <div className={cn("text-2xl font-heading font-semibold", tone)}>{value}</div>
    </div>
  );
}