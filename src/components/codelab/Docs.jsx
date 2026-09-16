import React from "react";
import { Download } from "lucide-react";
import { codeProblems, missionRequirements, missionTests } from "@/lib/mockData";

const OVERVIEW =
  "A React interface that lets the user switch their favourite programming language while sharing that preference across components.";
const PROBLEM =
  "State created in one component often needs to be read and changed somewhere else. This project teaches how to share and persist a preference across a component tree without prop drilling.";

function buildSections({ files, deps, devLog }) {
  const done = missionRequirements.tasks.filter((t) => t.done);
  const todo = missionRequirements.tasks.filter((t) => !t.done);
  const visible = missionTests.filter((t) => t.status !== "hidden");
  const passed = visible.filter((t) => t.status === "pass").length;
  return [
    ["Project Overview", OVERVIEW],
    ["Problem Statement", PROBLEM],
    ["Requirements", missionRequirements.tasks.map((t) => `${t.done ? "☑" : "☐"} ${t.label}`).join("\n")],
    ["Technology Stack", ["React 18"].concat(deps.map((d) => `${d.name} ${d.version}`)).join("\n")],
    ["Dependencies", deps.map((d) => `${d.name} ${d.version} — approved for this mission`).join("\n")],
    ["Architecture", files.map((f) => f.path).join("\n")],
    ["Features Completed", done.map((t) => `• ${t.label}`).join("\n")],
    ["Work in Progress", todo.map((t) => `• ${t.label}`).join("\n") || "—"],
    ["Known Issues", codeProblems.map((p) => `• ${p.file}:${p.line} — ${p.message}`).join("\n")],
    ["Testing Status", `Visible tests: ${passed} / ${visible.length} passed\nHidden verification: Pending`],
    ["Future Improvements", "• Persist the preference after refresh\n• Add a third language (TypeScript or PHP)\n• Add component tests"],
    ["Learning Evidence", missionRequirements.concepts.map((c) => `• ${c}`).join("\n")],
    ["Development Log", devLog.map((e) => `${e.time} — ${e.event}`).join("\n")],
  ];
}

export default function DocsPanel({ files, deps, devLog }) {
  const sections = buildSections({ files, deps, devLog });

  const exportDoc = () => {
    const md = ["# Project Documentation — Shared Preferences", ""]
      .concat(sections.flatMap(([title, body]) => [`## ${title}`, "", body, ""]))
      .join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PROJECT-DOCUMENTATION.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border shrink-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Project Documentation</p>
        <button
          onClick={exportDoc}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border text-[11px] text-foreground hover:bg-muted"
        >
          <Download className="w-3 h-3" /> Export Documentation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 grid gap-3 md:grid-cols-2 content-start">
        {sections.map(([title, body]) => (
          <div key={title} className="rounded-lg border border-border bg-muted/20 p-3">
            <h4 className="text-[11px] uppercase tracking-wide text-primary font-semibold">{title}</h4>
            <pre className="mt-1.5 whitespace-pre-wrap font-body text-xs text-muted-foreground leading-relaxed">{body}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}