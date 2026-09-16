import React from "react";
import { Link } from "react-router-dom";
import { learningPath } from "@/lib/curriculum";
export default function Missions() {
  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <h1 className="text-2xl font-heading font-semibold">Missions</h1>
      <article className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h2 className="text-xl font-semibold">{learningPath.name}</h2>
        <p>
          Build a language selector whose preference is shared across React
          components and survives a reload.
        </p>
        <h3 className="font-semibold">Tasks</h3>
        <ol className="list-decimal pl-5 space-y-3">
          {learningPath.milestones.map((item) => (
            <li key={item.id}>
              <strong>{item.name}.</strong> {item.task}
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          Check each task in the browser preview. Automated assessment, XP and
          completion awards are not enabled.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/code-lab" className="text-primary underline">
            Start in Code Lab
          </Link>
          <Link to="/roadmap" className="text-primary underline">
            Explore the learning milestones
          </Link>
        </div>
      </article>
      <p className="text-sm text-muted-foreground">
        Additional missions will be listed when their course content is
        approved.
      </p>
    </main>
  );
}
