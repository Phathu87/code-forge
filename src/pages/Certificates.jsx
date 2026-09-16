import React from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck, ShieldCheck, Lock, FileText, Sparkles,
} from "lucide-react";
import { certificates, portfolioSkills } from "@/lib/mockData";
import LinkedInShareButton from "@/components/LinkedInShareButton";

const steps = [
  { title: "Complete the missions", desc: "Finish every mission in the path with passing automated tests." },
  { title: "Prove authorship", desc: "Pass the explain / modify / debug challenge for your own code." },
  { title: "Certificate issued", desc: "A verifiable certificate with a public ID is issued to you." },
];

export default function Certificates() {
  const earned = certificates.filter((c) => c.verified);
  const inProgress = certificates.filter((c) => !c.verified);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Certificates</h2>
        <p className="text-sm text-muted-foreground mt-1">Each certificate is backed by verified missions, passing tests and original work — employers can verify any one instantly.</p>
      </div>

      {/* Earned */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">Earned</h3>
        {earned.map((c) => (
          <div key={c.name} className="rounded-xl border border-success/30 bg-success/5 p-5 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-success/15 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-8 h-8 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-semibold text-foreground">{c.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-success font-medium">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span>Issued {c.issued}</span>
                  <span className="font-mono">ID: {c.id}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Link
                  to={`/verify?id=${c.id}`}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted"
                >
                  <FileText className="w-3.5 h-3.5" /> Verify
                </Link>
                <LinkedInShareButton
                  label="Share"
                  url={`${typeof window !== "undefined" ? window.location.origin : ""}/verify?id=${c.id}`}
                  title={`I earned the ${c.name} certificate on CodeForge`}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-success/20">
              <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Skills backing this certificate</h4>
              <div className="flex flex-wrap gap-1.5">
                {portfolioSkills.slice(0, 5).map((s) => (
                  <span key={s.name} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-muted/40 text-foreground">
                    <ShieldCheck className="w-3 h-3 text-success" /> {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In progress */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">In progress</h3>
        {inProgress.map((c) => (
          <div key={c.name} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center shrink-0">
                <Lock className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>{c.progress}% complete</span>
                    <span>{100 - c.progress}% to go</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs text-primary mb-4">
          <Sparkles className="w-3.5 h-3.5" /> How certification works
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                <h4 className="text-sm font-medium text-foreground">{s.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-8">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}