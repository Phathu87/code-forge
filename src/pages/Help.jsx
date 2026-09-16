import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Send, CheckCircle2, Rocket, Map, Target, Code2, Play, ListChecks,
  Lightbulb, FolderGit2, Briefcase, BadgeCheck, ShieldCheck, User, Lock, Wrench,
} from "lucide-react";
import PublicShell from "@/components/landing/PublicShell";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Getting Started", icon: Rocket, count: 6 },
  { name: "Learning Paths", icon: Map, count: 4 },
  { name: "Missions", icon: Target, count: 8 },
  { name: "Code Lab", icon: Code2, count: 7 },
  { name: "Running Code", icon: Play, count: 3 },
  { name: "Tests", icon: ListChecks, count: 5 },
  { name: "Code Coach", icon: Lightbulb, count: 4 },
  { name: "Projects", icon: FolderGit2, count: 5 },
  { name: "Portfolio", icon: Briefcase, count: 4 },
  { name: "Certificates", icon: BadgeCheck, count: 6 },
  { name: "Integrity Verification", icon: ShieldCheck, count: 5 },
  { name: "Account", icon: User, count: 4 },
  { name: "Privacy", icon: Lock, count: 3 },
  { name: "Troubleshooting", icon: Wrench, count: 6 },
];

const articles = [
  { title: "Creating your account and verifying your email", category: "Getting Started", answer: "Sign up with email, confirm the verification link, then complete onboarding to personalise your learning path." },
  { title: "What counts as original work in a mission?", category: "Missions", answer: "Code you personally wrote. Small references from official docs are fine; complete pasted solutions are not — and are recorded during verified missions." },
  { title: "Running your project in the Code Lab", category: "Code Lab", answer: "Use the terminal (npm run dev) or the preview refresh button. The prototype simulates a sandboxed Node.js runtime." },
  { title: "Understanding visible vs hidden tests", category: "Tests", answer: "Visible tests run while you work. Hidden verification tests run at submission and are never exposed." },
  { title: "How the Code Coach helps without solving", category: "Code Coach", answer: "Three hint levels — Nudge, Concept and Direction — plus error and test-failure explanations. It never writes assessed code." },
  { title: "Requesting a certificate", category: "Certificates", answer: "Certificates are issued after required missions, projects, passing tests and integrity verification — currently a prototype flow." },
  { title: "Appealing an integrity decision", category: "Integrity Verification", answer: "Open the decision in your Integrity area and request review with your explanation. False positives never remain on your profile." },
  { title: "Exporting or deleting your data", category: "Privacy", answer: "Settings → Your Data offers export and deletion flows. Production generation arrives with the backend." },
];

const supportCategories = ["Account", "Billing (placeholder)", "Mission", "Code Lab", "Certificate", "Integrity Review", "Bug", "Privacy", "Other"];

export default function Help() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [form, setForm] = useState({ category: supportCategories[0], subject: "", description: "" });
  const [sent, setSent] = useState(false);

  const filtered = articles.filter(
    (a) =>
      (category ? a.category === category : true) &&
      (query ? (a.title + a.answer).toLowerCase().includes(query.toLowerCase()) : true)
  );

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">Help Centre</div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">How can we help?</h1>
          <p className="mt-4 text-muted-foreground">Answers about missions, the Code Lab, verification and your account.</p>
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCategory(null); }}
              placeholder="Search help articles…"
              className="w-full h-11 pl-10 pr-3 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Browse by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => { setCategory(category === c.name ? null : c.name); setQuery(""); }}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors",
                category === c.name ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-primary/30"
              )}
            >
              <c.icon className={cn("w-5 h-5", category === c.name ? "text-primary" : "text-muted-foreground")} />
              <div className="text-sm font-medium text-foreground mt-2">{c.name}</div>
              <div className="text-[11px] text-muted-foreground">{c.count} articles</div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
          {category ? `Articles · ${category}` : "Popular articles"}
        </h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground p-6 text-center">No articles match your search.</p>
          )}
          {filtered.map((a) => (
            <details key={a.title} className="group p-5">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium pr-4 text-sm">{a.title}</span>
                <span className="text-[10px] uppercase tracking-wide text-primary border border-primary/30 rounded px-1.5 py-0.5 shrink-0 hidden sm:inline">{a.category}</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-xl font-heading font-semibold text-center">Contact Support</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">Can't find an answer? Send us the details.</p>
          {sent ? (
            <div className="mt-6 rounded-xl border border-success/30 bg-success/5 p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
              <p className="font-medium text-foreground mt-3">Support request submitted</p>
              <p className="text-sm text-muted-foreground mt-1">We'll get back to you by email. Ticket creation connects to the production backend later.</p>
              <button onClick={() => { setSent(false); setForm({ category: supportCategories[0], subject: "", description: "" }); }} className="mt-4 text-sm text-primary hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs text-muted-foreground">Category</span>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-md bg-muted/50 border border-border text-sm text-foreground">
                    {supportCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">Subject</span>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-md bg-muted/50 border border-border text-sm" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-muted-foreground">Description</span>
                <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full p-3 rounded-md bg-muted/50 border border-border text-sm" />
              </label>
              <p className="text-[11px] text-muted-foreground/70">Device, platform and app version are attached automatically. Screenshot attachments arrive with the production backend.</p>
              <button type="submit" className="inline-flex items-center gap-2 px-5 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                <Send className="w-4 h-4" /> Send Request
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h2 className="text-lg font-heading font-semibold">Legal, privacy and status</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/legal" className="text-primary hover:underline">Trust &amp; Legal</Link>
            <Link to="/status" className="text-primary hover:underline">System status</Link>
            <Link to="/faq" className="text-primary hover:underline">FAQ</Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}