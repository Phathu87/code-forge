import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PublicShell from "@/components/landing/PublicShell";

const categories = [
  {
    name: "Getting started",
    items: [
      { q: "Is this an AI app generator?", a: "No. AI assists learning — it explains errors, syntax and concepts and asks guiding questions, but it never writes your solution. You write the code; the Code Coach helps you understand it." },
      { q: "Who is CodeForge for?", a: "Developers learning by building — from complete beginners to working professionals. It also supports future reviewers and employers verifying skills. The first release is an 18+ public beta." },
      { q: "Do I need prior coding experience?", a: "No. A beginner path starts from variables, conditions and functions. Your self-assessed level just sets the starting point — the path later adjusts to demonstrated skill." },
      { q: "How long does a path take?", a: "That depends on your weekly commitment. We show estimated pace (e.g. React Foundations in 10–12 weeks at 5 hours/week), but we never guarantee completion times." },
    ],
  },
  {
    name: "Learning & missions",
    items: [
      { q: "What is a mission?", a: "A realistic coding challenge — build from scratch, fix a bug, refactor, integrate an API, implement UI, improve accessibility or performance, and more. Each has a brief, requirements, visible tests and hidden verification tests." },
      { q: "Do I write all the code myself?", a: "Yes. That's the whole point. The platform teaches, hints and verifies — but you write the implementation. Paste protection guards original work during verified missions." },
      { q: "What does the Code Coach do?", a: "It's a constrained teaching assistant with three hint levels — Nudge, Concept and Direction. It explains errors and points to documentation, but never generates the mission solution." },
      { q: "Can the AI complete a function or component for me?", a: "No. The coach will not generate solutions, complete entire functions or components, rewrite your project, reveal hidden tests, or give certification answers." },
      { q: "What mission types exist?", a: "Build From Scratch, Bug Fix, Real Client Brief, Refactor, API Integration, UI Implementation, Accessibility, Performance, Authentication, Database Logic, Algorithms, Testing and Deployment." },
    ],
  },
  {
    name: "Skills & certificates",
    items: [
      { q: "How are skills verified?", a: "Through completed missions, passing automated and hidden tests, practical assessments, and authorship challenges against your own code. A skill rating always links to the evidence behind it." },
      { q: "What skill levels exist?", a: "Beginner, Foundation, Intermediate, Advanced, Professional and Specialist — based on demonstrated evidence, not course completion. Specialist reflects deep, technology-specific competence." },
      { q: "Are certificates accredited?", a: "No. They are Verified Practical Skills Certificates — evidence-backed, not university or government accredited. Each carries a unique ID and a public verification link." },
      { q: "How do I earn a certificate?", a: "Complete the required missions and projects, pass automated and hidden tests, pass a practical assessment, and pass code integrity verification (explain, modify and debug your own code)." },
    ],
  },
  {
    name: "Integrity & verification",
    items: [
      { q: "What is Verified Mission Mode?", a: "A strict assessment mode used for certificates, final skill assessments, specialist challenges and hiring assessments. It enables paste protection, development snapshots, authorship challenges and external-activity signals." },
      { q: "Can I paste code during a verified mission?", a: "Large pastes are flagged and may be blocked in strict certification mode. You can explain a legitimate source (official docs, starter code, approved dependencies, your previous approved code)." },
      { q: "Will I be automatically failed by AI detection?", a: "Never on a single signal. Similarity, tab-switching, fast completion or clean code alone never prove misconduct. Only substantial, multi-signal evidence — and serious consequences require human review." },
      { q: "Can I appeal an integrity decision?", a: "Yes. You can request review with an explanation. A false positive never stays permanently on your public profile. Disputed high-value results can be resolved with a live verification challenge." },
      { q: "What is authorship verification?", a: "After tests pass, you may be asked to explain parts of your code, modify your solution under new requirements, and debug injected defects — proving the work is genuinely yours." },
    ],
  },
  {
    name: "Privacy & data",
    items: [
      { q: "What data is collected during verified missions?", a: "Code history, timestamps, test history, paste events, focus events, hint history and solution similarity. It exists to protect the value of legitimate achievements." },
      { q: "Who can see it?", a: "You and authorised reviewers. Behavioural telemetry is never shown publicly — employers see only public-safe verification data." },
      { q: "Can I export or delete my data?", a: "Yes. Export Data and Delete Account options are provided in settings. Assessment-data and consent-history areas are laid out for future legal review." },
    ],
  },
  {
    name: "Beta & production",
    items: [
      { q: "Is this a real sandboxed runtime?", a: "Not yet. This is a public beta prototype. Secure code execution, real integrity scoring, reviewer workflows and certificate issuance arrive with the production backend — the frontend is architected to accept them without redesign." },
      { q: "What's simulated in the prototype?", a: "Dashboards, the coding workspace, tests, achievements, portfolio, certificates and integrity reports are realistic mock interactions for demonstration." },
      { q: "When will production features arrive?", a: "Through phased rollout: closed beta (auth, JS/React runtime, real tests), verified learning (hidden tests, integrity engine, reviewer workflows), multi-language runtimes, and eventually the employer ecosystem." },
    ],
  },
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(categories[0].name);

  const filtered = categories
    .map((c) => ({
      ...c,
      items: c.items.filter(
        (it) => it.q.toLowerCase().includes(query.toLowerCase()) || it.a.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">FAQ</div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">Questions, answered</h1>
          <p className="mt-4 text-muted-foreground">Everything about learning by building, verification and integrity.</p>
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full h-11 pl-10 pr-3 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[200px_1fr] gap-8">
        {/* Category nav */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => { setActive(c.name); setQuery(""); }}
                className={cn(
                  "px-3 py-2 rounded-md text-sm whitespace-nowrap text-left transition-colors",
                  active === c.name && !query ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Questions */}
        <div className="space-y-10">
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-center py-12">No questions match “{query}”.</p>
          )}
          {filtered.map((c) => (
            <div key={c.name}>
              <h2 className="text-lg font-heading font-semibold mb-3">{c.name}</h2>
              <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
                {c.items.map((it) => (
                  <details key={it.q} className="group p-5" open={query ? true : undefined}>
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-medium pr-4">{it.q}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-heading font-semibold">Still have a question?</h2>
          <p className="text-sm text-muted-foreground mt-2">Start building and see the platform for yourself.</p>
          <Link to="/onboarding" className="mt-5 inline-flex items-center gap-2 px-5 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Start Building <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}