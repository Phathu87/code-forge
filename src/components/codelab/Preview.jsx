import React, { useState } from "react";
import { RotateCcw, ExternalLink, Monitor, Tablet, Smartphone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectMeta } from "@/lib/mockData";

const viewports = [
  { id: "mobile", icon: Smartphone, width: "max-w-[300px]" },
  { id: "tablet", icon: Tablet, width: "max-w-[480px]" },
  { id: "desktop", icon: Monitor, width: "w-full" },
];

export default function Preview({ status, onRefresh }) {
  const [vpIndex, setVpIndex] = useState(2);
  const vp = viewports[vpIndex];
  const VpIcon = vp.icon;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-3 h-9 flex items-center justify-between border-b border-border shrink-0">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Live Preview</span>
        <span className={cn("flex items-center gap-1.5 text-[10px]", status === "Running" ? "text-success" : "text-warning")}>
          {status === "Running" ? (
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
          ) : (
            <Loader2 className="w-3 h-3 animate-spin" />
          )}
          {status}
        </span>
      </div>

      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-border shrink-0">
        <button
          onClick={onRefresh}
          title="Refresh preview"
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className={cn("w-3.5 h-3.5", status !== "Running" && "animate-spin")} />
        </button>
        <span className="flex-1 min-w-0 truncate font-mono text-[10px] text-muted-foreground/70 px-1">
          http://{projectMeta.previewUrl}
        </span>
        <button
          onClick={() => setVpIndex((i) => (i + 1) % viewports.length)}
          title={`Viewport: ${vp.id}`}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <VpIcon className="w-3.5 h-3.5" />
        </button>
        <a
          href="https://programming-language-toggle-app.netlify.app/"
          target="_blank"
          rel="noreferrer"
          title="Open preview in new tab"
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-muted/20 min-h-0">
        <div className={cn("mx-auto transition-all", vp.width)}>
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <h1 className="text-base font-semibold text-foreground mb-3">Programming Language Toggle</h1>
            <div className="flex gap-2 justify-center mb-3">
              <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs">JavaScript</button>
              <button className="px-3 py-1.5 rounded border border-border text-xs text-foreground">Python</button>
            </div>
            <p className="text-sm text-muted-foreground">Favourite programming language: 🎯 JavaScript</p>
          </div>
        </div>
      </div>
    </div>
  );
}