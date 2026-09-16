import React, { useRef } from "react";
import { FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CodeEditor({ files, activePath, onSelect, onChange, onPaste }) {
  const active = files.find((f) => f.path === activePath) || files[0];
  const gutterRef = useRef(null);

  const lineCount = (active?.content || "").split("\n").length;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleScroll = (e) => {
    if (gutterRef.current) gutterRef.current.scrollTop = e.target.scrollTop;
  };

  return (
    <div className="flex flex-col h-full bg-card min-h-0">
      <div className="flex items-center border-b border-border bg-muted/40 overflow-x-auto shrink-0">
        {files.map((f) => (
          <button
            key={f.path}
            onClick={() => onSelect(f.path)}
            className={cn(
              "px-3 py-2 text-xs font-mono whitespace-nowrap border-r border-border flex items-center gap-1.5 transition-colors",
              f.path === active?.path
                ? "bg-card text-foreground border-t-2 border-t-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            )}
          >
            <FileCode className="w-3.5 h-3.5 shrink-0" />
            {f.name}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden font-mono text-[13px] leading-5 min-h-0">
        <pre
          ref={gutterRef}
          aria-hidden="true"
          className="py-3 px-3 text-right text-muted-foreground/40 select-none overflow-hidden bg-muted/20 shrink-0"
          style={{ minWidth: "3.5rem" }}
        >
          {lines.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </pre>
        <textarea
          value={active?.content || ""}
          onChange={(e) => active && onChange(active.path, e.target.value)}
          onScroll={handleScroll}
          onPaste={onPaste}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="flex-1 py-3 px-3 bg-transparent text-foreground outline-none resize-none whitespace-pre overflow-auto caret-primary min-w-0"
          aria-label="Code editor"
        />
      </div>
    </div>
  );
}