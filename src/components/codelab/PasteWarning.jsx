import React from "react";
import { AlertTriangle } from "lucide-react";

export default function PasteWarning({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-warning/40 bg-card shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-warning/15 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <h3 className="font-heading font-semibold text-foreground">Large Paste Detected</h3>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verified assessments require original implementation. A block of <span className="text-foreground font-medium">{data.lines} lines</span> was pasted into the editor. This activity has been recorded.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1.5">Original Work Required</p>
            This mission measures what you can personally build. Large pasted code blocks are not allowed. Type and understand your solution.
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 h-9 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90">
              Remove Pasted Code
            </button>
            <button onClick={onClose} className="flex-1 h-9 rounded-md border border-border text-sm text-foreground hover:bg-muted">
              Explain Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}