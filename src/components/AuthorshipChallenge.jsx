import React, { useState } from "react";
import { ShieldCheck, ArrowRight, CheckCircle2, X, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { verificationChallenges } from "@/lib/mockData";

export default function AuthorshipChallenge({ missionTitle, onClose }) {
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const challenge = verificationChallenges[active];
  const answeredCount = answers.filter((a) => a.trim().length > 20).length;
  const canSubmit = answeredCount >= 2;

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const score = Math.min(96, 70 + answeredCount * 9);
      setResult({ score });
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-scale-in overflow-hidden">
        <button onClick={onClose} className="absolute p-1.5 rounded hover:bg-muted text-muted-foreground top-3 right-3" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        {result ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-success/15 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground">Authorship verified</h3>
            <p className="text-sm text-muted-foreground mt-1">“{missionTitle}” is locked in as genuinely yours.</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-2xl font-heading font-bold text-success tabular-nums">{result.score}%</span>
              <span className="text-xs text-muted-foreground">consistency</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto leading-relaxed">
              Your answers were cross-checked against your development timeline and keystroke patterns.
              This mission now counts toward your verified skills and certificates.
            </p>
            <button onClick={onClose} className="mt-6 h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 inline-flex items-center gap-1.5">
              Done <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Prove you wrote this</h3>
                <p className="text-xs text-muted-foreground">Authorship verification · {missionTitle}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Answer at least two of the three challenges in your own words. There are no right answers to copy —
              we're checking that you understand the code you submitted.
            </p>

            <div className="flex gap-1 mt-4 p-1 rounded-lg bg-muted/40 border border-border">
              {verificationChallenges.map((c, i) => (
                <button
                  key={c.type}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex-1 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5",
                    active === i ? "bg-card text-foreground border border-border" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {answers[i].trim().length > 20 && <CheckCircle2 className="w-3 h-3 text-success" />}
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-sm text-foreground leading-snug">{challenge.prompt}</p>
              <textarea
                value={answers[active]}
                onChange={(e) => setAnswers((prev) => prev.map((a, i) => (i === active ? e.target.value : a)))}
                placeholder={challenge.placeholder}
                rows={4}
                className="mt-2 w-full rounded-lg bg-muted/40 border border-border p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                {answers[active].trim().length} chars · {answers[active].trim().length > 20 ? "accepted" : "needs a little more"}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lightbulb className="w-3.5 h-3.5 text-warning" /> {answeredCount}/3 answered
              </div>
              <button
                onClick={submit}
                disabled={!canSubmit || submitting}
                className="ml-auto px-5 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {submitting ? "Verifying…" : "Verify authorship"} {submitting ? null : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
            {!canSubmit && (
              <p className="text-[11px] text-muted-foreground/70 mt-2 text-right">Answer at least two challenges to continue.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}