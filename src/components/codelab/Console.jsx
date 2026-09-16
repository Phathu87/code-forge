import React from "react";

export default function ConsolePanel({ running }) {
  return (
    <div className="font-mono text-xs space-y-1 text-muted-foreground">
      {running ? (
        <div className="text-primary">▶ compiling src/App.jsx …</div>
      ) : (
        <>
          <div className="text-success">✓ compiled successfully</div>
          <div className="text-muted-foreground/60">— no runtime errors —</div>
          <div className="text-warning mt-2">⚠ Test "Preference persists across reload" failed</div>
          <div className="text-muted-foreground/70 pl-3">Expected language to restore from storage, got default "JavaScript".</div>
        </>
      )}
    </div>
  );
}