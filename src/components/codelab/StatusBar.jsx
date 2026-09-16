import React from "react";
import { Cpu, MemoryStick, HardDrive, Globe, SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectMeta } from "@/lib/mockData";

const saveLabels = { local: "Local draft", syncing: "Saving…", saved: "Saved", conflict: "Conflict", unsaved: "Not saved" };
const saveTones = { local: "text-warning", syncing: "text-primary", saved: "text-success" };

export default function StatusBar({ saveState, previewStatus }) {
  return (
    <div className="h-7 px-3 border-t border-border bg-card flex items-center gap-4 text-[10px] text-muted-foreground overflow-x-auto shrink-0">
      <span className="flex items-center gap-1 whitespace-nowrap">
        <Cpu className="w-3 h-3" /> {projectMeta.runtime}
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-success" /> Runtime unavailable
      </span>
      <span className="hidden sm:flex items-center gap-1 whitespace-nowrap">
        <MemoryStick className="w-3 h-3" /> {projectMeta.memory.used} MB / {projectMeta.memory.total} MB
      </span>
      <span className="hidden sm:flex whitespace-nowrap">CPU {projectMeta.cpu}</span>
      <span className="hidden md:flex items-center gap-1 whitespace-nowrap">
        <HardDrive className="w-3 h-3" /> {projectMeta.storage.used} MB / {projectMeta.storage.total} MB
      </span>
      <span className="hidden md:flex items-center gap-1 whitespace-nowrap">
        <Globe className="w-3 h-3" /> Preview {previewStatus}
      </span>
      <span className="hidden lg:flex items-center gap-1 whitespace-nowrap">
        <SquareTerminal className="w-3 h-3" /> Terminal demo
      </span>
      <span className={cn("ml-auto flex items-center gap-1 whitespace-nowrap", saveTones[saveState])}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" /> {saveLabels[saveState]}
      </span>
    </div>
  );
}