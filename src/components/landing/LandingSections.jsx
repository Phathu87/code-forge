import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Save, ArrowRight } from 'lucide-react';

export default function LandingSections() {
  return <>
    <section id="how" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs uppercase tracking-wider text-primary mb-2">Getting started</p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold">A small exercise, a useful concept</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: BookOpen, title: 'Read the exercise', text: 'Start with Shared Preferences and learn how React components share state.' },
            { icon: Code2, title: 'Write your code', text: 'Edit the starter files in Code Lab. Keep the implementation your own.' },
            { icon: Save, title: 'Save and return', text: 'Your workspace saves to your account. Local drafts help you recover after a failed save.' },
          ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="w-6 h-6 text-primary mb-4" /><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted-foreground mt-2">{text}</p></article>)}
        </div>
      </div>
    </section>
    <section id="missions" className="border-t border-border bg-muted/15">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <div><p className="text-xs uppercase tracking-wider text-primary mb-2">First exercise</p><h2 className="text-2xl font-heading font-bold">Shared Preferences</h2><p className="mt-4 text-muted-foreground">Build a language selector whose value is shared across components using React Context. Add another language and make the preference survive a reload.</p><Link to="/code-lab" className="inline-flex items-center gap-2 mt-6 text-primary">Open Code Lab <ArrowRight className="w-4 h-4" /></Link></div>
        <div className="rounded-xl border border-border bg-card p-6"><h3 className="font-semibold">Where it started</h3><p className="text-sm text-muted-foreground mt-3">I built the original Programming Language Toggle app to practise useState, createContext and useContext. CodeForge expands that exercise into a workspace for learning JavaScript and React.</p><p className="text-sm mt-4">Phathutshedzo Rakhunwana</p><a href="https://github.com/Phathu87/code-forge" className="inline-block mt-3 text-sm text-primary underline">View the source</a></div>
      </div>
    </section>
    <section id="integrity" className="border-t border-border"><div className="max-w-6xl mx-auto px-4 py-16"><h2 className="text-2xl font-heading font-bold">Current development scope</h2><p className="mt-4 text-muted-foreground max-w-2xl">Accounts and workspace saving work. Code execution, automated assessment, progress tracking and certificates are still in development. No skill or certificate is verified by this build.</p></div></section>
    <section id="faq" className="border-t border-border"><div className="max-w-6xl mx-auto px-4 py-16"><h2 className="text-2xl font-heading font-bold">Before you start</h2><div className="grid md:grid-cols-2 gap-6 mt-6"><div><h3 className="font-semibold">Can I run code here?</h3><p className="text-sm text-muted-foreground mt-2">Not yet. You can edit, save and download your workspace. A secure execution service is still needed.</p></div><div><h3 className="font-semibold">Where is my work stored?</h3><p className="text-sm text-muted-foreground mt-2">Files are stored in your account on the server. Pending edits are also kept as a draft on this device. Download important work as an extra copy.</p></div></div></div></section>
  </>;
}
