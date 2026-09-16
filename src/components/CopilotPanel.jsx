import React, { useState } from "react";
import { Sparkles, Lightbulb, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { copilotHints } from "@/lib/mockData";

const REFUSAL =
  "I can help you work it out, but this mission requires you to implement the solution yourself. I won't write the code for you — let's build your understanding instead.";

export default function CopilotPanel({ open, onClose }) {
  const [hintsUsed, setHintsUsed] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(null);

  const revealHint = (level) => {
    setUnlocked(Math.max(unlocked, level));
    setHintsUsed((h) => Math.max(h, level));
  };

  const ask = () => {
    const q = input.trim().toLowerCase();
    if (!q) return;
    if (q.includes("fix") || q.includes("write") || q.includes("give me") || q.includes("complete") || q.includes("generate")) {
      setReply({ type: "refusal", text: REFUSAL });
    } else {
      setReply({
        type: "guide",
        text: "Good question. Start by describing what you expect the code to do, then compare that to what it actually does. Which line do you think behaves differently from your expectation?",
      });
    }
    setInput("");
  };

  return (
    <aside
      className={cn(
        "border-l border-border bg-card flex flex-col h-full transition-all duration-300 shrink-0 overflow-hidden",
        open ? "w-80 lg:w-96" : "w-0"
      )}
    >
      <div className={cn("flex flex-col h-full min-w-0", !open && "opacity-0")}>
        <div className="flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground leading-none">Learning Copilot</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Guides — never writes for you</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-muted text-muted-foreground" aria-label="Close copilot">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              I'm your debug coach. I ask questions, explain concepts, and point you toward the right area — but the code is yours to write.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Progressive Hints</h4>
              <span className="text-[11px] text-muted-foreground">Hints used: {hintsUsed}/3</span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((level) => {
                const hint = copilotHints[level];
                const isUnlocked = unlocked >= level;
                return (
                  <div key={level} className={cn("rounded-lg border p-3", isUnlocked ? "border-border bg-card" : "border-dashed border-border/60 bg-muted/20")}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Lightbulb className={cn("w-3.5 h-3.5", level === 1 && "text-success", level === 2 && "text-warning", level === 3 && "text-destructive")} />
                        Hint {level} — {hint.label}
                      </span>
                      {!isUnlocked && (
                        <button onClick={() => revealHint(level)} className="text-[11px] text-primary hover:underline">
                          Reveal
                        </button>
                      )}
                    </div>
                    {isUnlocked ? (
                      <p className="text-xs text-muted-foreground leading-relaxed">{hint.text}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground/50 italic">Hidden to preserve your bonus XP.</p>
                    )}
                  </div>
                );
              })}
            </div>
            {hintsUsed > 0 && (
              <p className="text-[11px] text-warning mt-2">Using more hints may reduce bonus XP — but never blocks your progress.</p>
            )}
          </div>

          {reply && (
            <div className={cn("rounded-lg p-3 text-xs leading-relaxed animate-fade-in", reply.type === "refusal" ? "bg-destructive/10 border border-destructive/30 text-foreground" : "bg-muted/40 border border-border text-foreground")}>
              {reply.text}
            </div>
          )}
        </div>

        <div className="border-t border-border p-3 shrink-0">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="Ask for guidance…"
              className="flex-1 h-9 px-3 rounded-md bg-muted/60 border border-border text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button onClick={ask} className="h-9 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 text-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setReply({ type: "guide", text: "Tell me what you're trying to do and where you think it breaks." })} className="text-[11px] text-muted-foreground hover:text-foreground">
              Explain the concept
            </button>
            <span className="text-muted-foreground/40">·</span>
            <button onClick={() => setReply({ type: "guide", text: "Which error are you seeing? Paste only the error message — not your code." })} className="text-[11px] text-muted-foreground hover:text-foreground">
              Explain an error
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}