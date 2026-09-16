import React from "react";
import { X, ShieldCheck, History, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { integritySignals, developmentTimeline } from "@/lib/mockData";

export default function IntegrityModal({ onClose }) {
  const ai = integritySignals.aiRiskScore;
  const riskLabel = ai < 30 ? "Low" : ai < 60 ? "Moderate" : "High";
  const riskTone = ai < 30 ? "text-success" : ai < 60 ? "text-warning" : "text-destructive";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Integrity Status</h3>
              <p className="text-xs text-muted-foreground">We're verifying your skills so your achievements mean something.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">AI-risk score</span>
              <span className={cn("text-sm font-semibold", riskTone)}>{ai}% · {riskLabel}</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-success/25" />
                <div className="flex-1 bg-warning/25" />
                <div className="flex-1 bg-destructive/25" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground ring-2 ring-card" style={{ left: `calc(${ai}% - 6px)` }} />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground/70 mt-1">
              <span>Low</span><span>Moderate</span><span>High</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SignalCard label="Code similarity" value={`${integritySignals.codeSimilarity.score}%`} tone="success" sub={integritySignals.codeSimilarity.topMatch} />
            <SignalCard label="Authorship consistency" value={`${integritySignals.authorshipConsistency.score}%`} tone="success" sub={integritySignals.authorshipConsistency.keystrokeVariance} />
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2"><History className="w-3.5 h-3.5" /> Development Timeline</h4>
            <ul className="space-y-1 text-xs font-mono text-muted-foreground">
              {developmentTimeline.map((e, i) => (
                <li key={i} className="flex gap-3"><span className="text-muted-foreground/60">{e.time}</span>{e.event}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <Metric label="Paste events" value={String(integritySignals.pasteEvents)} tone="success" />
            <Metric label="Hints used" value={String(integritySignals.hintsUsed)} tone="warning" />
            <Metric label="Originality" value={`${integritySignals.originality}%`} tone="success" />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-3 py-2.5">
            <span className="text-xs text-muted-foreground">Authorship verification</span>
            <span className="flex items-center gap-1.5 text-xs text-success font-medium">
              <CheckCircle2 className="w-4 h-4" /> Passed · {integritySignals.verificationChallenge.score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, tone }) {
  const toneClass = { success: "text-success", warning: "text-warning", destructive: "text-destructive" };
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-2.5">
      <div className={cn("text-lg font-semibold", toneClass[tone])}>{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function SignalCard({ label, value, tone, sub }) {
  const toneClass = { success: "text-success", warning: "text-warning", destructive: "text-destructive" };
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("text-lg font-semibold mt-0.5", toneClass[tone])}>{value}</div>
      <div className="text-[10px] text-muted-foreground/70 mt-0.5 line-clamp-1">{sub}</div>
    </div>
  );
}