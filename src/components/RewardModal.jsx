import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { CheckCircle2, X, Zap, Award, ShieldCheck, ArrowRight, Lock } from "lucide-react";

const gradingSteps = [
  "Application renders",
  "Toggle updates displayed language",
  "Preference persists across reload",
  "Third language selectable (hidden test)",
  "Originality verification",
];

export default function RewardModal({ result, onClose }) {
  const [phase, setPhase] = useState("tests");
  const [revealed, setRevealed] = useState(0);
  const [xpCount, setXpCount] = useState(0);
  const firedRef = useRef(false);

  useEffect(() => {
    setPhase("tests");
    setRevealed(0);
    setXpCount(0);
    firedRef.current = false;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= gradingSteps.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("reward"), 600);
      }
    }, 420);
    return () => clearInterval(interval);
  }, [result]);

  useEffect(() => {
    if (phase !== "reward" || !result) return;
    if (!firedRef.current) {
      firedRef.current = true;
      confetti({
        particleCount: 130,
        spread: 75,
        origin: { y: 0.55 },
        colors: ["#38bdf8", "#22d3ee", "#a78bfa", "#4ade80"],
      });
    }
    let c = 0;
    const counter = setInterval(() => {
      c += Math.ceil(result.xp / 25);
      if (c >= result.xp) {
        c = result.xp;
        clearInterval(counter);
      }
      setXpCount(c);
    }, 35);
    return () => clearInterval(counter);
  }, [phase, result]);

  if (!result) return null;

  const newXp = result.newTotal;
  const nextLevel = 6000;
  const pct = Math.round((newXp / nextLevel) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl animate-scale-in overflow-hidden">
        {phase === "tests" ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Grading submission…</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Running visible and hidden tests</p>
              </div>
              <span className="text-xs text-primary animate-pulse">Running</span>
            </div>
            <ul className="space-y-2.5">
              {gradingSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-2.5 text-sm">
                  {revealed > i ? (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0 animate-scale-in" />
                      <span className="text-foreground">{s}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-muted-foreground/30 shrink-0" />
                      <span className="text-muted-foreground/40">{s}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-6 text-center">
            <button onClick={onClose} className="absolute p-1.5 rounded hover:bg-muted text-muted-foreground top-3 right-3" aria-label="Close">
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground">Mission Complete</h3>
            <p className="text-sm text-muted-foreground mt-1">{result.missionTitle}</p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-4xl font-heading font-bold text-primary tabular-nums">+{xpCount}</span>
              <span className="text-sm text-muted-foreground mt-2">XP earned</span>
            </div>

            <div className="mt-5 text-left">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{newXp.toLocaleString()} / {nextLevel.toLocaleString()} XP</span>
                <span>Level 9 — Architect</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Badge unlocked — {result.badge.name}</span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">{result.badge.rarity}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{result.badge.desc}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={onClose} className="flex-1 h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted">
                Keep coding
              </button>
              <Link
                to="/portfolio"
                onClick={onClose}
                className="flex-1 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center justify-center gap-1.5"
              >
                View portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}