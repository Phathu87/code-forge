import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

const deviceIcons = { Phone: Smartphone, Tablet: Tablet, Desktop: Monitor };

const shots = [
  { headline: "Build real projects. Not tutorial toys.", copy: "Solve practical development problems and turn completed work into portfolio evidence.", tag: "Missions + Code Lab", devices: ["Phone", "Tablet"] },
  { headline: "Missions that feel like real work.", copy: "Bug fixes, client briefs, API integration and refactoring — with requirements and tests.", tag: "Missions", devices: ["Phone", "Tablet", "Desktop"] },
  { headline: "A serious workspace for serious learning.", copy: "File explorer, editor, terminal, problems, live preview and tests in one place.", tag: "Code Lab", devices: ["Desktop", "Tablet"] },
  { headline: "AI teaches. You code.", copy: "The Code Coach explains and guides — it never writes your solution.", tag: "Code Coach", devices: ["Phone", "Tablet"] },
  { headline: "Know exactly what still needs work.", copy: "Run mission tests and see visible results instantly.", tag: "Tests", devices: ["Phone", "Desktop"] },
  { headline: "Prove what you can build.", copy: "Verified skills backed by missions, projects and passing tests.", tag: "Skills", devices: ["Phone", "Tablet"] },
  { headline: "Turn missions into a portfolio.", copy: "Every completed project becomes public evidence of ability.", tag: "Portfolio", devices: ["Phone", "Desktop"] },
  { headline: "Certificates backed by evidence.", copy: "Earn practical certificates through real assessments — not passive completion.", tag: "Certificates", devices: ["Phone", "Tablet"] },
  { headline: "Watch yourself grow.", copy: "XP, streaks, skill levels and a live leaderboard.", tag: "Progress", devices: ["Phone"] },
  { headline: "Achievements that mean something.", copy: "Integrity verification protects the value of every badge and certificate.", tag: "Integrity", devices: ["Phone", "Desktop"] },
];

export default function ScreenshotsTab() {
  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        Store-marketing screenshot compositions — each communicates one product benefit. Adaptable layouts: final assets export at each store's required
        dimensions at submission time. Marketing must reflect only released functionality.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shots.map((s) => (
          <div key={s.headline} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-primary/20 via-muted to-card flex items-center justify-center relative">
              <div className="rounded-lg border border-border bg-background/80 w-48 h-28 flex flex-col items-center justify-center gap-1.5 shadow-lg">
                <div className="w-16 h-1.5 rounded-full bg-primary/60" />
                <div className="w-24 h-1.5 rounded-full bg-muted-foreground/30" />
                <div className="w-20 h-1.5 rounded-full bg-muted-foreground/20" />
              </div>
              <span className="absolute top-2.5 left-2.5 text-[9px] uppercase tracking-wide px-2 py-0.5 rounded bg-background/80 border border-border text-muted-foreground">
                {s.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-heading font-semibold text-foreground">{s.headline}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.copy}</p>
              <div className="flex gap-1.5 mt-3">
                {s.devices.map((d) => {
                  const Icon = deviceIcons[d];
                  return (
                    <span key={d} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground px-2 py-0.5 rounded bg-muted/60">
                      <Icon className="w-3 h-3" /> {d}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}