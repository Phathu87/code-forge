import React from "react";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { codeProblems } from "@/lib/mockData";

const severityStyles = {
  error: { icon: XCircle, cls: "text-destructive" },
  warning: { icon: AlertTriangle, cls: "text-warning" },
  info: { icon: Info, cls: "text-primary" },
};

export default function ProblemsPanel() {
  const errors = codeProblems.filter((p) => p.severity === "error").length;
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground">
        {codeProblems.length} problems in this workspace · {errors} errors
      </p>
      <ul className="space-y-2.5">
        {codeProblems.map((p, i) => {
          const S = severityStyles[p.severity] || severityStyles.info;
          return (
            <li key={i} className="flex items-start gap-2">
              <S.icon className={cn("w-4 h-4 shrink-0 mt-0.5", S.cls)} />
              <div className="min-w-0">
                <p className="text-foreground leading-snug">{p.message}</p>
                <p className="text-[11px] font-mono text-muted-foreground truncate">{p.file}:{p.line}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}