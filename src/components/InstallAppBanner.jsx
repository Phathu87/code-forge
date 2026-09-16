import React, { useState } from "react";
import { MonitorSmartphone, X } from "lucide-react";

export default function InstallAppBanner() {
  const [open, setOpen] = useState(() => {
    try {
      return !localStorage.getItem("cf-install-dismissed");
    } catch {
      return true;
    }
  });

  if (!open) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("cf-install-dismissed", "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <MonitorSmartphone className="w-4 h-4 text-primary shrink-0" />
        <p className="text-sm text-foreground flex-1 min-w-0">
          Install CodeForge for quicker access to your learning paths, missions, projects and Code Lab.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={dismiss}
            className="px-3 h-8 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90"
          >
            Install
          </button>
          <button onClick={dismiss} className="text-xs text-muted-foreground hover:text-foreground px-2">
            Maybe later
          </button>
          <button onClick={dismiss} aria-label="Dismiss" className="p-1 rounded hover:bg-muted text-muted-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}