import React from "react";
import { cn } from "@/lib/utils";

const tones = {
  error: "bg-destructive/15 text-destructive",
  warning: "bg-warning/15 text-warning",
  info: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
};

export default function StateScreen({ icon: Icon, tone = "info", title, body, children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center animate-scale-in">
        <div className={cn("w-14 h-14 mx-auto rounded-2xl flex items-center justify-center", tones[tone])}>
          <Icon className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-heading font-semibold text-foreground mt-5">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-6">{children}</div>
      </div>
    </div>
  );
}