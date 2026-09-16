import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PublicShell from "@/components/landing/PublicShell";

const categories = [
  {
    "name": "Getting started",
    "items": [
      {
        "q": "Who is CodeForge for?",
        "a": "People learning JavaScript and React through practical exercises. This build is a development preview, with public registration closed."
      },
      {
        "q": "What can I do in this build?",
        "a": "Invited testers can verify an account, complete onboarding, edit and save a workspace, preview React code, manage their profile and send a support request."
      },
      {
        "q": "Where did CodeForge start?",
        "a": "Phathutshedzo Rakhunwana built the original Programming Language Toggle exercise. CodeForge expands that React state and context exercise into a learning workspace."
      }
    ]
  },
  {
    "name": "Code Lab",
    "items": [
      {
        "q": "Can I run code?",
        "a": "Run compiles React code into a restricted browser preview. Local JavaScript, CSS and JSON imports are supported. Server-side execution, arbitrary package installation and assessed tests are not available."
      },
      {
        "q": "Is my work saved?",
        "a": "Workspace files save to your account on the server. Pending edits remain as local drafts on the device. If versions conflict, download your draft before loading the server version."
      },
      {
        "q": "What happens when I lose connectivity?",
        "a": "The editor keeps a local draft and reports the save status. Saving resumes when connectivity returns. Download important work as an additional copy; device storage can be cleared or become full."
      },
      {
        "q": "Does Code Coach use an AI provider?",
        "a": "No provider is connected in this build. The current coach shows demonstration responses. These are not a working assessment or tutoring service."
      }
    ]
  },
  {
    "name": "Skills and certificates",
    "items": [
      {
        "q": "Can I earn verified skills or certificates?",
        "a": "No. Authoritative skill verification, assessed mission completion, XP and certificate issuance are disabled or unfinished. Demonstration screens are not evidence of achievement."
      },
      {
        "q": "Are there hidden tests or integrity assessments?",
        "a": "No production test engine, reviewer workflow or integrity assessment is connected. These features require separate release validation before they can be enabled."
      },
      {
        "q": "When will these features be available?",
        "a": "No release date is committed. The repository release-readiness report records the remaining implementation and validation work."
      }
    ]
  },
  {
    "name": "Privacy and support",
    "items": [
      {
        "q": "Can I export or delete my data?",
        "a": "Settings provides account export and deletion after you confirm your current password. Export includes your profile, workspace and private support requests. Download any unsynced draft before deleting your account."
      },
      {
        "q": "Where is account data stored?",
        "a": "The hosted preview uses PostgreSQL on Neon. Workspace drafts also remain in browser storage on the device. Local development uses SQLite unless configured otherwise."
      },
      {
        "q": "How do I get help?",
        "a": "Signed-in testers can submit a private request through Help. Requests persist, but email acknowledgements and a response-time commitment are not configured."
      }
    ]
  }
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