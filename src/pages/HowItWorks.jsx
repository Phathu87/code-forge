import React from "react";
import { Link } from "react-router-dom";
import {
  Compass, BookOpen, Code2, ShieldCheck, ArrowRight, Terminal, Zap,
  CheckCircle2, Lightbulb, GitBranch, Trophy, FlaskConical,
} from "lucide-react";
import PublicShell from "@/components/landing/PublicShell";

const steps = [
  { icon: Compass, title: "Choose your path", desc: "Set your level, goals and languages. We generate a structured, evidence-backed roadmap with milestones and estimated pace." },
  { icon: BookOpen, title: "Learn the concept", desc: "Short explanations of why a concept exists, what problem it solves and where you'll use it — then straight to practice." },
  { icon: Code2, title: "Build the solution", desc: "Write the code yourself in a real coding workspace: file explorer, editor, live preview, console and tests." },
  { icon: ShieldCheck, title: "Prove the skill", desc: "Passing work becomes verified skills, portfolio projects and certificates backed by real, inspectable evidence." },
];

const missionFlow = [
  { icon: BookOpen, title: "Read the brief", desc: "A realistic scenario — build, fix, refactor or integrate — with requirements and concepts listed." },
  { icon: Code2, title: "Write the code", desc: "Implement it yourself. Paste protection guards original work during verified missions." },
  { icon: Terminal, title: "Run preview & visible tests", desc: "See your app live and run visible tests while learning. Failures guide your debugging." },
  { icon: FlaskConical, title: "Submit to hidden tests", desc: "Final submission runs hidden verification tests — edge cases, accessibility, error handling." },
  { icon: ShieldCheck, title: "Authorship challenge", desc: "Explain, modify and debug your own code to prove the work is yours." },
  { icon: Trophy, title: "Earn evidence", desc: "XP, badges, verified skills and portfolio evidence — only when the work genuinely passes." },
];

export default function HowItWorks() {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">How it works</div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">From concept to proof — the CodeForge loop</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Learning leads to practice. Practice leads to evidence. Evidence becomes credibility. Here's exactly what happens, step by step.
          </p>
          <Link to="/onboarding" className="mt-7 inline-flex items-center gap-2 px-5 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Build my learning path <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Four-step model */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-5 relative">
              <span className="absolute top-4 right-4 text-3xl font-heading font-bold text-muted/40">{i + 1}</span>
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inside a mission */}
      <section className="border-t border-border bg-muted/15">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">Inside a mission</h2>
          <p className="text-muted-foreground mb-8">Every mission follows the same evidence-driven flow.</p>
          <ol className="relative border-l border-border pl-8 space-y-6">
            {missionFlow.map((m, i) => (
              <li key={m.title} className="relative">
                <span className="absolute -left-[33px] top-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold ring-4 ring-background">
                  {i + 1}
                </span>
                <div className="flex items-start gap-3">
                  <m.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Adaptive loop */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs text-primary mb-3"><GitBranch className="w-3.5 h-3.5" /> Adaptive learning</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The platform remembers your strengths and weak areas, then recommends missions that exercise the skills you struggled with — so practice stays targeted, not random.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">React State</span><span className="text-success">Strong</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Context API</span><span className="text-success">Strong</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Array Methods</span><span className="text-warning">Needs practice</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Async / Await</span><span className="text-warning">Needs practice</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-xs text-primary mb-3"><Lightbulb className="w-3.5 h-3.5" /> Recommended next</div>
            <h3 className="font-heading font-semibold">Handle API Loading and Failure States</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              You struggled with async JavaScript in your last two missions. This mission strengthens async, loading states and error handling together.
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" /> 450 XP</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-success" /> Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype boundary */}
      <section className="border-t border-border bg-muted/15">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="text-xl font-heading font-semibold flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5 text-success" /> What's real today vs. what's coming</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            This is an 18+ public beta prototype. Dashboards, the coding workspace, tests, integrity reports and certificates are simulated for demonstration. Secure code execution, real integrity scoring and reviewer workflows arrive with the production backend — the frontend is built to accept them without redesign.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold">Ready to build something real?</h2>
        <p className="mt-3 text-muted-foreground">Choose your path and write your first line of evidence-backed code today.</p>
        <Link to="/onboarding" className="mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          Start Building <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PublicShell>
  );
}