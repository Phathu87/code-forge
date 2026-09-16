import React from "react";
import { Link } from "react-router-dom";
export default function Achievements() {
  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-heading font-semibold">Achievements</h1>
      <section className="rounded-xl border border-border bg-card p-6 space-y-3">
        <h2 className="font-semibold">Achievement awards are not enabled</h2>
        <p className="text-sm text-muted-foreground">
          No badges have been issued by this build. Awards require defined
          criteria and server-validated assessment results. Selecting a learning
          focus or importing a repository does not award a badge.
        </p>
        <Link className="inline-block text-primary underline" to="/roadmap">
          Continue learning
        </Link>
      </section>
    </main>
  );
}
