import { api } from '@/api/client';
import { useAuth } from '@/lib/AuthContext';
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Search, Sparkles,
  Code2, Circle, Clock, Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { technologies, experienceOptions, goalOptions, commitmentOptions, roadmapModules } from "@/lib/mockData";

const stepLabels = ["Welcome", "Experience", "Goals", "Technologies", "Commitment", "Roadmap"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  async function finish() {
    setSaving(true); setError('');
    try { await api.profile.update({ onboarding: { experience, goals, techs, commitment, path: 'javascript-react', completed: true } }); await refreshUser(); navigate('/learn'); }
    catch (failure) { setError(failure.message); } finally { setSaving(false); }
  }
  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState(user.onboarding?.experience || null);
  const [goals, setGoals] = useState([]);
  const [techSearch, setTechSearch] = useState("");
  const [techs, setTechs] = useState(["JavaScript", "React"]);
  const [commitment, setCommitment] = useState(null);

  const toggle = (list, setList, value, max) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : max && prev.length >= max ? prev : [...prev, value]
    );
  };

  const filteredCategories = useMemo(() => {
    const q = techSearch.trim().toLowerCase();
    return Object.entries(technologies)
      .map(([cat, items]) => /** @type {[string, string[]]} */ ([cat, q ? items.filter((i) => i.toLowerCase().includes(q)) : items]))
      .filter(([, items]) => items.length > 0);
  }, [techSearch]);

  const canProceed =
    step === 0 ? true :
    step === 1 ? !!experience :
    step === 2 ? goals.length > 0 :
    step === 3 ? techs.length > 0 :
    step === 4 ? !!commitment : true;

  const totalHours = 160;
  const weeks = commitment ? Math.ceil(totalHours / commitmentOptions.find((c) => c.hours === commitment).hours) : null;
  const totalXp = roadmapModules.reduce((s, m) => s + m.xp, 0);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">{error && <p role="alert" className="text-destructive mb-4">{error}</p>}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">CodeForge</span>
          </Link>
          <span className="text-xs text-muted-foreground">Step {step + 1} of 6 · {stepLabels[step]}</span>
        </div>

        <div className="h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 6) * 100}%` }} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 animate-slide-up" key={step}>
          {step === 0 && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-heading font-semibold text-foreground">What do you want to build?</h1>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
                You'll learn by solving real problems — not watching endless tutorials. You write the code.
                We help you understand it.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-3">Six quick questions to generate your custom roadmap.</p>
              <button
                onClick={() => setStep(1)}
                className="mt-8 inline-flex items-center gap-2 px-6 h-11 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90"
              >
                Start my setup <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 1 && (
            <StepShell title="What's your current experience?" sub="This sets the starting difficulty of your missions.">
              <div className="space-y-2.5">
                {experienceOptions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setExperience(o.id)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-lg border text-left transition-colors",
                      experience === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium text-foreground">{o.label}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{o.desc}</span>
                    </span>
                    {experience === o.id && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell title="What are your learning goals?" sub="Choose everything that applies — you can change these later.">
              <div className="flex flex-wrap gap-2">
                {goalOptions.map((g) => (
                  <Chip key={g} active={goals.includes(g)} onClick={() => toggle(goals, setGoals, g)}>{g}</Chip>
                ))}
              </div>
              {goals.length > 0 && (
                <p className="text-xs text-muted-foreground mt-4">{goals.length} goal{goals.length > 1 ? "s" : ""} selected</p>
              )}
            </StepShell>
          )}

          {step === 3 && (
            <StepShell title="Which technologies interest you?" sub="Pick the languages and tools you want to learn — search and explore by category.">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={techSearch}
                  onChange={(e) => setTechSearch(e.target.value)}
                  placeholder="Search technologies…"
                  className="w-full h-9 pl-9 pr-3 rounded-md bg-muted/50 border border-border text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                {filteredCategories.map(([cat, items]) => (
                  <div key={cat}>
                    <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">{cat}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((t) => (
                        <Chip key={t} active={techs.includes(t)} onClick={() => toggle(techs, setTechs, t)}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">{techs.length} selected</p>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell title="How much time can you commit weekly?" sub="We'll pace your roadmap to fit your schedule — consistency beats intensity.">
              <div className="grid grid-cols-2 gap-2.5">
                {commitmentOptions.map((c) => (
                  <button
                    key={c.hours}
                    onClick={() => setCommitment(c.hours)}
                    className={cn(
                      "px-4 py-4 rounded-lg border text-left transition-colors",
                      commitment === c.hours ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                    )}
                  >
                    <span className="flex items-center gap-2 text-lg font-heading font-semibold text-foreground">
                      <Clock className="w-4.5 h-4.5 text-primary" /> {c.label}
                      <span className="text-xs text-muted-foreground font-normal">/ week</span>
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">{c.desc}</span>
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {step === 5 && (
            <div>
              <div className="flex items-center gap-2 text-xs text-primary mb-2">
                <Target className="w-3.5 h-3.5" /> Your generated roadmap
              </div>
              <h2 className="text-2xl font-heading font-semibold text-foreground">React Frontend Developer Path</h2>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                10 modules · ~{totalHours} hours · {weeks} weeks at your pace · {totalXp.toLocaleString()} XP
              </p>

              <div className="mt-5 space-y-1.5">
                {roadmapModules.map((m, i) => (
                  <div key={m.name} className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg border",
                    m.status === "current" ? "border-primary/50 bg-primary/10" : "border-border bg-muted/20"
                  )}>
                    <span className="text-xs text-muted-foreground w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    {m.status === "done" ? <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0" />
                      : m.status === "current" ? <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                      : <Circle className="w-4.5 h-4.5 text-muted-foreground/40 shrink-0" />}
                    <span className={cn("text-sm flex-1", m.status === "done" ? "text-muted-foreground" : "text-foreground font-medium")}>
                      {m.name}
                      {m.status === "current" && <span className="ml-2 text-[10px] uppercase text-primary tracking-wide">Next up</span>}
                    </span>
                    <span className="text-xs text-muted-foreground">{m.xp} XP</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Skill outcome</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Practise JavaScript and React by building projects.
                  Formal assessment and verified portfolios are not available yet.
                </p>
              </div>
            </div>
          )}
        </div>

        {step > 0 && (
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
                className="inline-flex items-center gap-1.5 px-5 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finish} disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                Start learning <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepShell({ title, sub, children }) {
  return (
    <div>
      <h2 className="text-xl font-heading font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-5">{sub}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full border text-sm transition-colors",
        active ? "border-primary bg-primary/15 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {children}
    </button>
  );
}
