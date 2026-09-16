import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, XCircle, BadgeCheck, Search, ArrowRight, Code2,
} from "lucide-react";
import { certificates, portfolioSkills, userProfile, portfolioProjects } from "@/lib/mockData";

export default function Verify() {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get("id") || "");
  const [searchedId, setSearchedId] = useState(params.get("id") || "");

  const cert = searchedId
    ? certificates.find((c) => c.id && c.id.toLowerCase() === searchedId.trim().toLowerCase())
    : null;
  const searched = searchedId.length > 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-foreground">CodeForge</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 animate-slide-up">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Employer verification
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSearchedId(query); }}
            className="flex gap-2 mb-6"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter certificate ID (e.g. DEV-REACT-2026-00482)"
                className="w-full h-10 pl-9 pr-3 rounded-md bg-muted/50 border border-border text-sm font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button type="submit" className="px-4 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center gap-1.5">
              Verify <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {!searched && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Enter a certificate ID to confirm it was issued by CodeForge and view the holder's verified skills.
            </p>
          )}

          {searched && !cert && (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-destructive/15 flex items-center justify-center mb-3">
                <XCircle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Certificate not found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                No verified certificate matches <span className="font-mono text-foreground">{searchedId}</span>.
              </p>
            </div>
          )}

          {searched && cert && (
            <div className="animate-fade-in">
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-7 h-7 text-success" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-success font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                  <h3 className="font-heading font-semibold text-foreground">{cert.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-border text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Holder</div>
                  <div className="text-foreground font-medium">{userProfile.name}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Issued</div>
                  <div className="text-foreground">{cert.issued}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Certificate ID</div>
                  <div className="text-foreground font-mono text-xs">{cert.id}</div>
                </div>
              </div>

              <div className="py-4 border-b border-border">
                <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Verified skills backing this certificate</h4>
                <div className="space-y-1.5">
                  {portfolioSkills.slice(0, 4).map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 text-success" /> {s.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{s.evidence}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-4">
                <h4 className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Evidence projects</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioProjects.filter((p) => p.status === "Verified").map((p) => (
                    <span key={p.name} className="text-xs px-2.5 py-1.5 rounded-md border border-border bg-muted/20 text-foreground">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <Link to="/portfolio" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                View full portfolio <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 mt-4">
          Try <button onClick={() => { setQuery("DEV-REACT-2026-00482"); setSearchedId("DEV-REACT-2026-00482"); }} className="text-primary hover:underline font-mono">DEV-REACT-2026-00482</button>
        </p>
      </div>
    </div>
  );
}