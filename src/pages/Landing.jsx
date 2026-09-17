import BrandMark from "@/components/BrandMark";
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Compass, Sparkles, CheckCircle2, Terminal,
} from "lucide-react";
import LandingSections from "@/components/landing/LandingSections";

const editorLines = [
  { t: 'import { createContext, useState } from "react";', mute: false },
  { t: "", mute: false },
  { t: "const LangContext = createContext();", mute: false },
  { t: "", mute: false },
  { t: "export function LangProvider({ children }) {", mute: false },
  { t: '  const [lang, setLang] = useState("JavaScript");', accent: true },
  { t: "  return (", mute: false },
  { t: '    <LangContext.Provider value={{ lang, setLang }}>', mute: false },
  { t: "      {children}", mute: false },
  { t: "    </LangContext.Provider>", mute: false },
  { t: "  );", mute: false },
  { t: "}", mute: false },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
            <span className="font-heading font-semibold text-lg">CodeForge</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">Preview</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link to="/how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
            <a href="#missions" className="hover:text-foreground transition-colors">Missions</a>
            <a href="#integrity" className="hover:text-foreground transition-colors">Integrity</a>
            <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5">Sign in</Link>
            <Link to="/code-lab" className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              Open workspace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-full px-3 py-1 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> You write the code. We help you understand it.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
              Learn to build.<br /><span className="text-primary">Not prompt.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Practise JavaScript and React through small coding exercises. Start with shared state, edit the code and save your work as you go.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/code-lab" className="inline-flex items-center gap-2 px-5 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                Open workspace <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#missions" className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted">
                Explore Missions
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> JavaScript
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> React
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Shared state
            </p>
          </div>

          {/* Faux editor */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-border bg-muted/30">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-warning/60" />
              <span className="w-3 h-3 rounded-full bg-success/60" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">LanguageContext.jsx</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-success"><Terminal className="w-3 h-3" /> Example exercise</span>
            </div>
            <div className="flex">
              <div className="py-4 px-3 text-right text-xs font-mono text-muted-foreground/50 select-none border-r border-border bg-muted/20">
                {editorLines.map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <pre className="py-4 px-4 text-xs font-mono leading-relaxed overflow-x-auto">
                {editorLines.map((l, i) => (
                  <div key={i} className={l.accent ? "text-primary" : l.mute ? "text-muted-foreground/50" : "text-foreground/90"}>{l.t || "\u00A0"}</div>
                ))}
              </pre>
            </div>
            <div className="flex items-center justify-between px-4 h-9 border-t border-border bg-muted/20 text-[11px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3" /> JavaScript · React</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Starter code</span>
            </div>
          </div>
        </div>
      </section>

      <LandingSections />

      {/* Final CTA */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Compass className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Start with Shared Preferences</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A language selector is a small project with room to practise state, context and persistence.
          </p>
          <Link to="/code-lab" className="mt-7 inline-flex items-center gap-2 px-6 h-12 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Open Code Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BrandMark />
            <span className="font-heading font-semibold text-foreground">CodeForge</span>
            <span className="text-xs">· Development preview</span>
          </div>
          <div className="flex gap-6">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <Link to="/verify" className="hover:text-foreground">Verify a certificate</Link>
          </div>
          <p className="text-xs">© 2026 Phathutshedzo Rakhunwana · CodeForge</p>
        </div>
      </footer>
    </div>
  );
}