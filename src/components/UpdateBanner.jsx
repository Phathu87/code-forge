import React, { useState } from "react";
import { RefreshCw, X } from "lucide-react";

export default function UpdateBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="border-b border-primary/20 bg-primary/10 px-4 py-2 flex items-center gap-3 flex-wrap">
      <p className="text-xs flex-1 min-w-0">
        <span className="font-medium text-foreground">Update available.</span>{" "}
        <span className="text-muted-foreground">A new version of the app is ready. Your work will be saved before updating.</span>
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-1.5 px-3 h-7 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90"
      >
        <RefreshCw className="w-3 h-3" /> Restart &amp; Update
      </button>
      <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted text-muted-foreground" aria-label="Later">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}