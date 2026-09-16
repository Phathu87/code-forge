import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, Target, BadgeCheck, Award, ShieldCheck, Lock, Users, CheckCheck, Settings, Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons = {
  mission: Target,
  certificate: BadgeCheck,
  achievement: Award,
  integrity: ShieldCheck,
  security: Lock,
  community: Users,
  account: Settings,
};

const initial = [
  { id: 1, type: "certificate", title: "Certificate issued: React Developer – Foundation", body: "Your certificate DEV-REACT-2026-00482 has been issued and is publicly verifiable.", time: "2h ago", read: false },
  { id: 2, type: "integrity", title: "Integrity review completed", body: "Your Shared Preferences submission passed verification with 94% originality.", time: "5h ago", read: false },
  { id: 3, type: "mission", title: "New mission recommended", body: "“Fetch & render user data from an API” matches your current skill level.", time: "1d ago", read: false },
  { id: 4, type: "achievement", title: "Achievement earned: API Explorer", body: "You completed five API missions.", time: "1d ago", read: true },
  { id: 5, type: "community", title: "New reply in your thread", body: "Liam Nkosi replied to “How do you structure Context for a large app?”.", time: "2d ago", read: true },
  { id: 6, type: "security", title: "New sign-in detected", body: "A new sign-in from Chrome on Windows was detected. If this wasn't you, review your account security.", time: "3d ago", read: true },
];

export default function Notifications() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState("all");

  const unread = items.filter((n) => !n.read).length;
  const shown = items.filter((n) => (filter === "unread" ? !n.read : true));

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> Notifications
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">{unread} unread</p>
        </div>
        <button
          onClick={markAll}
          disabled={unread === 0}
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted disabled:opacity-50"
        >
          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      <div className="flex gap-1 mt-5 border-b border-border">
        {["all", "unread"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2.5 text-sm border-b-2 -mb-px capitalize transition-colors",
              filter === f ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {shown.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <Inbox className="w-8 h-8 text-muted-foreground/50 mx-auto" />
            <p className="text-sm text-muted-foreground mt-3">You're all caught up.</p>
          </div>
        )}
        {shown.map((n) => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={cn(
                "w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-colors",
                n.read ? "border-border bg-card opacity-70" : "border-primary/30 bg-primary/5"
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1.5">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Manage what you receive in{" "}
        <Link to="/settings" className="text-primary hover:underline">Settings → Notifications</Link>. Push notifications arrive with the native mobile apps.
      </p>
    </div>
  );
}