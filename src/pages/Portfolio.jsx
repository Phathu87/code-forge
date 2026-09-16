import React, { useState } from "react";
import {
  Trophy, Zap, FolderGit2, BadgeCheck, ShieldCheck, Award,
  ChevronDown, CheckCircle2, Target, Flame, Eye, Code2, Sparkles, Lock, Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  userProfile, portfolioStats, portfolioProjects, portfolioSkills,
  portfolioActivity, achievements, certificates,
} from "@/lib/mockData";
import GitHubImportModal from "@/components/GitHubImportModal";

const levelStyles = {
  Learning: "bg-muted text-muted-foreground",
  Foundation: "bg-warning/15 text-warning",
  Competent: "bg-primary/15 text-primary",
  Advanced: "bg-success/15 text-success",
  Expert: "bg-accent/15 text-accent",
  Specialist: "bg-chart-3/15 text-chart-3",
};

const activityIcons = {
  mission: Target, badge: Award, certificate: BadgeCheck, streak: Flame,
};

const tabs = ["Overview", "Projects", "Skills", "Certificates", "Achievements", "Activity"];

export default function Portfolio() {
  const [tab, setTab] = useState("Overview");
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [githubOpen, setGithubOpen] = useState(false);
  const [imported, setImported] = useState([]);

  const handleImport = (repos) => {
    const mapped = repos.map((r) => {
      const [pass, total] = r.tests.split("/").map((s) => parseInt(s.trim(), 10));
      return {
        name: r.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        problem: r.desc,
        tech: r.tech,
        skills: r.tech,
        tests: r.tests,
        status: pass >= total ? "Verified" : "In progress",
      };
    });
    setImported(mapped);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile header */}
      <div className="rounded-b-2xl border-b border-border bg-gradient-to-r from-primary/10 via-card to-card">
        <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-end gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-heading font-bold text-primary-foreground shrink-0 shadow-lg">
            {userProfile.avatarInitials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">{userProfile.name}</h2>
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{userProfile.role} · Level {userProfile.level} — {userProfile.levelTitle}</p>
            <p className="text-xs text-muted-foreground/70 mt-2 max-w-lg">
              Every skill below is backed by verified missions, real projects and passing automated tests.
            </p>
          </div>
          <button className="h-9 px-4 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 self-start sm:self-auto flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Share profile
          </button>
        </div>

        <div className="px-6 md:px-8 pb-6 flex flex-wrap gap-6">
          <Stat icon={Trophy} value={`Level ${userProfile.level}`} label={userProfile.levelTitle} />
          <Stat icon={Zap} value={userProfile.xp.toLocaleString()} label="Total XP" />
          <Stat icon={FolderGit2} value={portfolioStats.projects} label="Projects" />
          <Stat icon={ShieldCheck} value={portfolioStats.verifiedSkills} label="Verified skills" />
          <Stat icon={BadgeCheck} value={portfolioStats.certificates} label="Certificates" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-8 border-b border-border bg-card/50 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
              tab === t ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-8">
        {tab === "Overview" && <OverviewTab onTab={setTab} />}
        {tab === "Projects" && <ProjectsTab imported={imported} onOpenGithub={() => setGithubOpen(true)} />}
        {tab === "Skills" && <SkillsTab expanded={expandedSkill} setExpanded={setExpandedSkill} />}
        {tab === "Certificates" && <CertificatesTab />}
        {tab === "Achievements" && <AchievementsTab />}
        {tab === "Activity" && <ActivityTab />}
      </div>

      {githubOpen && (
        <GitHubImportModal onClose={() => setGithubOpen(false)} onImport={handleImport} />
      )}
    </div>
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

function OverviewTab({ onTab }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Current skills</h3>
        <div className="space-y-3">
          {portfolioSkills.slice(0, 5).map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{s.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
              </div>
              <span className={cn("text-[10px] uppercase px-2 py-0.5 rounded font-medium", levelStyles[s.level])}>{s.level}</span>
            </div>
          ))}
        </div>
        <button onClick={() => onTab("Skills")} className="text-xs text-primary hover:underline mt-4">View all skills with evidence →</button>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Recent activity</h3>
        <div className="space-y-3">
          {portfolioActivity.slice(0, 4).map((a, i) => {
            const Icon = activityIcons[a.type];
            return (
              <div key={i} className="flex items-start gap-2.5">
                <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground leading-snug">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.date}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => onTab("Activity")} className="text-xs text-primary hover:underline mt-4">Full activity →</button>
      </div>
    </div>
  );
}

function ProjectsTab({ imported = [], onOpenGithub }) {
  const all = [...portfolioProjects, ...imported];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{all.length} projects{imported.length > 0 ? ` · ${imported.length} imported from GitHub` : ""}</p>
        <button onClick={onOpenGithub} className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted">
          <Github className="w-3.5 h-3.5" /> Import from GitHub
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
      {all.map((p, i) => (
        <div key={p.name + i} className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up">
          <div className="h-32 bg-gradient-to-br from-muted to-card flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
              <FolderGit2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className={cn(
              "absolute top-3 right-3 flex items-center gap-1 text-[10px] px-2 py-1 rounded font-medium",
              p.status === "Verified" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
            )}>
              {p.status === "Verified" ? <ShieldCheck className="w-3 h-3" /> : <Lock className="w-3 h-3" />} {p.status}
            </span>
            {p.origin && (
              <span className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded bg-accent/15 text-accent">Origin project</span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-heading font-semibold text-foreground">{p.name}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.problem}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <span className="text-foreground font-medium">Tests:</span> {p.tests} passed
            </p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted flex items-center justify-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live preview
              </button>
              <button className="flex-1 h-8 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Source
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

function SkillsTab({ expanded, setExpanded }) {
  return (
    <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
      {portfolioSkills.map((s) => {
        const open = expanded === s.name;
        const evidenceProjects = portfolioProjects.filter((p) => p.tech.includes(s.name));
        return (
          <div key={s.name}>
            <button
              onClick={() => setExpanded(open ? null : s.name)}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
            >
              <span className="text-sm font-medium text-foreground flex-1">{s.name}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">{s.evidence}</span>
              <span className={cn("text-[10px] uppercase px-2 py-0.5 rounded font-medium", levelStyles[s.level])}>{s.level}</span>
              <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
            </button>
            {open && (
              <div className="px-5 pb-4 animate-fade-in">
                <p className="text-xs text-muted-foreground sm:hidden mb-2">{s.evidence}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Contributing projects</p>
                <div className="flex flex-wrap gap-2">
                  {evidenceProjects.length > 0 ? (
                    evidenceProjects.map((p) => (
                      <span key={p.name} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-border bg-muted/20 text-foreground">
                        <FolderGit2 className="w-3.5 h-3.5 text-primary" /> {p.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">Evidence from verified missions.</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certificates.map((c) => (
        <div key={c.name} className={cn(
          "rounded-xl border bg-card p-5 animate-slide-up",
          c.verified ? "border-success/30" : "border-border"
        )}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            {c.verified ? (
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-success font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> In progress
              </span>
            )}
          </div>
          <h3 className="font-heading font-semibold text-foreground mt-3">{c.name}</h3>
          {c.verified ? (
            <>
              <p className="text-xs text-muted-foreground mt-2">Issued {c.issued}</p>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">ID: {c.id}</p>
              <button className="mt-3 text-xs text-primary hover:underline">Public verification URL →</button>
            </>
          ) : (
            <div className="mt-3">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: `${c.progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{c.note}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AchievementsTab() {
  const earned = achievements.filter((a) => a.earned);
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      {achievements.map((a) => (
        <div key={a.name} className={cn(
          "rounded-xl border bg-card p-4 text-center",
          a.earned ? "border-primary/30" : "border-border/60 opacity-50"
        )}>
          <div className="w-11 h-11 mx-auto rounded-xl bg-muted/60 flex items-center justify-center mb-2">
            {a.earned ? <Award className="w-6 h-6 text-primary" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
          </div>
          <h4 className="text-sm font-medium text-foreground">{a.name}</h4>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{a.desc}</p>
          {a.earned && (
            <span className="inline-flex items-center gap-1 text-[10px] text-success mt-2">
              <CheckCircle2 className="w-3 h-3" /> {a.earnedDate}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="max-w-2xl">
      <div className="relative pl-6 space-y-6 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {portfolioActivity.map((a, i) => {
          const Icon = activityIcons[a.type];
          return (
            <div key={i} className="relative animate-slide-up">
              <div className="absolute -left-6 top-0 w-[19px] h-[19px] rounded-full bg-card border border-border flex items-center justify-center">
                <Icon className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-foreground leading-snug">{a.text}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{a.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}