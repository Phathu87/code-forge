import React from "react";
import { Link } from "react-router-dom";
import {
  Zap, Flame, Trophy, Target, ArrowRight, CheckCircle2, Circle,
  Sparkles, ShieldCheck, Clock, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  userProfile, skillProgress, continueLearning, dailyMission,
  recommendedMission, recentProjects,
} from "@/lib/mockData";
import MilestoneSection from "@/components/dashboard/MilestoneSection";

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", accent)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-heading font-semibold text-foreground">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const xpPct = Math.round((userProfile.xp / userProfile.xpToNext) * 100);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome / Continue Learning */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-5 animate-slide-up">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            Continue Learning
          </div>
          <h2 className="text-xl font-heading font-semibold text-foreground">{continueLearning.mission}</h2>
          <p className="text-sm text-muted-foreground mt-1">{continueLearning.path} path</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{continueLearning.progress}% complete</span>
              <span>{100 - continueLearning.progress}% to go</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${continueLearning.progress}%` }} />
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <Link to="/code-lab" className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              Continue Mission <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/missions" className="inline-flex items-center px-4 h-9 rounded-md border border-border text-sm text-foreground hover:bg-muted">
              Browse missions
            </Link>
            <Link to="/onboarding" className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
              Set up roadmap
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 animate-slide-up">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Target className="w-3.5 h-3.5 text-warning" />
            Daily Mission
          </div>
          <h3 className="text-sm font-medium text-foreground leading-snug">{dailyMission.title}</h3>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{dailyMission.estimated}</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" />{dailyMission.xp} XP</span>
          </div>
          <Link to="/code-lab" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            Start challenge <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Zap} label="Total XP" value={userProfile.xp.toLocaleString()} sub={`${xpPct}% to Level ${userProfile.level + 1}`} accent="bg-primary/15 text-primary" />
        <StatCard icon={Trophy} label="Current Level" value={`Level ${userProfile.level}`} sub={userProfile.levelTitle} accent="bg-accent/15 text-accent" />
        <StatCard icon={Flame} label="Current Streak" value={`${userProfile.streak} days`} sub="Keep it alive today" accent="bg-warning/15 text-warning" />
        <StatCard icon={ShieldCheck} label="Verified Skills" value="14" sub="across 6 technologies" accent="bg-success/15 text-success" />
      </div>

      {/* Skills + Recommended */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Skills Progress</h3>
            <span className="text-xs text-muted-foreground">Competency levels</span>
          </div>
          <div className="space-y-4">
            {skillProgress.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{s.competency} · {s.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full", s.level >= 80 ? "bg-success" : s.level >= 60 ? "bg-primary" : "bg-warning")} style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center gap-2 text-xs text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Recommended for you
          </div>
          <h3 className="text-sm font-medium text-foreground leading-snug">{recommendedMission.title}</h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{recommendedMission.reason}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 rounded bg-muted/60">{recommendedMission.level}</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" />{recommendedMission.xp} XP</span>
          </div>
          <Link to="/missions" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            View mission <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Recent Projects</h3>
          <Link to="/projects" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((p) => (
            <div key={p.name} className="rounded-lg border border-border bg-muted/20 overflow-hidden hover:border-primary/40 transition-colors">
              <div className="h-28 bg-gradient-to-br from-muted to-card flex items-center justify-center">
                <div className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{p.name}</h4>
                  {p.verified && <ShieldCheck className="w-4 h-4 text-success" />}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {p.progress === 100 ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Circle className="w-3.5 h-3.5" />}
                    {p.progress === 100 ? "Completed" : `${p.progress}% done`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MilestoneSection />
    </div>
  );
}