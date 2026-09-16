import React, { useState } from "react";
import PublicShell from "@/components/landing/PublicShell";
import { cn } from "@/lib/utils";
import { FileText, ShieldCheck } from "lucide-react";

const topics = [
  {
    id: "terms",
    title: "Terms of Service",
    status: "Draft — pending legal review",
    sections: [
      { h: "Using CodeForge", p: "CodeForge is a developer learning platform for users aged 18 and over. You are responsible for your account activity and for following these terms, the Acceptable Use Policy and the Assessment Rules." },
      { h: "Prototype status", p: "The current application is a public beta prototype. Several features — code execution, integrity verification, certificate issuance — are simulated. These terms will be finalised before production release." },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "Data we process", p: "Your profile, learning progress, project work and — during verified assessments — code history, test history, timestamps, paste events, focus events, hint usage and solution-similarity analysis." },
      { h: "Your rights", p: "You can export your data and request account deletion from Settings. Assessment-data transparency options are provided so verification never feels like a black box." },
    ],
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "Essential cookies", p: "Session and authentication cookies are required for the product to function and cannot be disabled." },
      { h: "Optional cookies", p: "Preference and analytics cookies are optional. No private integrity telemetry is ever used for marketing analytics." },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "Fair use", p: "No abuse of the platform or its infrastructure, no account sharing, no attempts to bypass verification, rate limits or sandbox restrictions." },
      { h: "Community", p: "Interact respectfully. Harassment and spam lead to moderation action under the Community Guidelines." },
    ],
  },
  {
    id: "integrity",
    title: "Code Integrity Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "Multi-signal verification", p: "Integrity decisions combine development history, paste activity, similarity analysis, timing, authorship challenges, hidden tests and human review. No single automated signal proves misconduct." },
      { h: "Evidence, not assumptions", p: "Serious consequences require substantial, multi-signal evidence and human review. Verification exists to protect the value of legitimate achievements." },
    ],
  },
  {
    id: "assessment-rules",
    title: "Assessment Rules",
    status: "Draft — pending legal review",
    sections: [
      { h: "Original work", p: "Verified missions measure what you personally build. Large pasted blocks are recorded; a complete copied solution may be blocked in strict assessment mode." },
      { h: "Permitted resources", p: "Official documentation, starter code and approved dependency documentation are permitted. Each mission clearly lists permitted and restricted resources before you start." },
    ],
  },
  {
    id: "ai-assistance",
    title: "AI Assistance Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "The Code Coach boundary", p: "The coach explains, guides, questions, diagnoses and recommends documentation. It never generates complete assessed functions or components, exposes hidden tests or solves assessments." },
      { h: "Enforcement", p: "These boundaries are enforced server-side in production — not merely by frontend instructions." },
    ],
  },
  {
    id: "certificate-terms",
    title: "Certificate Terms",
    status: "Draft — pending legal review",
    sections: [
      { h: "Verified Practical Skills Certificates", p: "Certificates evidence practical ability through missions, projects, tests and integrity verification. They are not university, government or professional-body accredited." },
      { h: "Revocation", p: "Certificates may be revoked for confirmed integrity violations. Each certificate carries a unique ID and a public verification record." },
    ],
  },
  {
    id: "community",
    title: "Community Guidelines",
    status: "Draft — pending legal review",
    sections: [
      { h: "Constructive participation", p: "Help others learn. Don't post complete solutions to active missions — threads for missions you haven't completed stay hidden until you finish them." },
      { h: "Moderation", p: "Reports are reviewed by moderators; repeated violations lead to suspension." },
    ],
  },
  {
    id: "appeals",
    title: "Appeals Policy",
    status: "Draft — pending legal review",
    sections: [
      { h: "Requesting review", p: "You can appeal any integrity decision with a reason, explanation and supporting information. Statuses: Submitted → Under Review → Additional Verification Required → Resolved." },
      { h: "False positives", p: "Automated false positives never permanently remain against a learner after successful review." },
    ],
  },
  {
    id: "security",
    title: "Security",
    status: "Planned",
    sections: [
      { h: "Reporting vulnerabilities", p: "Security reports can be submitted through Support. Please avoid publicly disclosing suspected vulnerabilities before review." },
      { h: "Handling", p: "Production secret management, audit logging and sandbox isolation are implemented in the backend phase — never in client code." },
    ],
  },
  {
    id: "data-requests",
    title: "Data Requests",
    status: "Planned",
    sections: [
      { h: "Export & deletion", p: "Use Settings → Your Data to export your data or request account deletion. Response timelines are published once the production backend and final legal review are complete." },
    ],
  },
  {
    id: "support",
    title: "Support",
    status: "Available",
    sections: [
      { h: "Getting help", p: "Browse the Help Centre or contact support with a category, subject and description. Device, platform and app version are attached automatically." },
    ],
  },
];

export default function Legal() {
  const [active, setActive] = useState(topics[0].id);
  const topic = topics.find((t) => t.id === active);

  return (
    <PublicShell>
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">Trust &amp; Legal</div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">Policies &amp; trust centre</h1>
          <p className="mt-4 text-muted-foreground">
            Verification exists to protect the value of legitimate achievements. These layouts are ready for final legal content.
          </p>
          <p className="text-[11px] text-muted-foreground/70 mt-3">
            Placeholder content — no POPIA/GDPR or accreditation compliance is claimed until independently reviewed.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm whitespace-nowrap text-left transition-colors",
                  active === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                {t.title}
              </button>
            ))}
          </div>
        </aside>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">{topic.title}</h2>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-muted text-muted-foreground border border-border">
              <ShieldCheck className="w-3 h-3" /> {topic.status}
            </span>
          </div>
          <div className="mt-6 space-y-6">
            {topic.sections.map((s) => (
              <div key={s.h}>
                <h3 className="text-sm font-semibold text-foreground">{s.h}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}