import React from "react";

export default function ActivityPanel({ log }) {
  return (
    <div className="relative pl-5 space-y-3 before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-border">
      {log.map((e, i) => (
        <div key={i} className="relative">
          <span className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border border-border bg-card" />
          <p className="text-xs text-foreground leading-snug">{e.event}</p>
          <p className="text-[10px] font-mono text-muted-foreground">{e.time}</p>
        </div>
      ))}
    </div>
  );
}