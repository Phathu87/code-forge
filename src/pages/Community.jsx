import React, { useState } from "react";
import {
  Users, MessageSquare, Heart, Pin, CheckCircle2, Circle, Send, Hash, Clock, UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { communityStats, communityChannels, communityThreads, studyGroups } from "@/lib/mockData";

const colorMap = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  accent: "text-accent bg-accent/10",
  "chart-3": "text-chart-3 bg-chart-3/10",
  "chart-5": "text-chart-5 bg-chart-5/10",
};

export default function Community() {
  const [activeChannel, setActiveChannel] = useState("All");

  const threads = activeChannel === "All"
    ? communityThreads
    : communityThreads.filter((t) => t.channel === activeChannel);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Community</h2>
        <p className="text-sm text-muted-foreground mt-1">Discuss, get unstuck, and learn together — every member is verified through their builds.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Users} value={communityStats.members.toLocaleString()} label="Members" />
        <StatCard icon={Circle} value={communityStats.online.toString()} label="Online now" tone="success" />
        <StatCard icon={MessageSquare} value={communityStats.activeToday.toLocaleString()} label="Active today" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Channels */}
        <div className="rounded-xl border border-border bg-card p-3 h-fit">
          <button
            onClick={() => setActiveChannel("All")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full transition-colors",
              activeChannel === "All" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Hash className="w-4 h-4" /> All discussions
          </button>
          <div className="my-2 h-px bg-border" />
          {communityChannels.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveChannel(c.name)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full transition-colors",
                activeChannel === c.name ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span className={cn("w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold", colorMap[c.color])}>#</span>
              <span className="flex-1 text-left">{c.name}</span>
              <span className="text-[10px] text-muted-foreground/70">{(c.members / 1000).toFixed(1)}k</span>
            </button>
          ))}
        </div>

        {/* Thread feed */}
        <div className="space-y-4">
          {/* Composer */}
          <div className="rounded-xl border border-border bg-card p-4">
            <textarea
              placeholder="Share a question, win, or something you learned…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none resize-none"
              rows={2}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">{activeChannel === "All" ? "Posting to General" : `Posting to ${activeChannel}`}</span>
              <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </div>
          </div>

          {/* Threads */}
          {threads.map((t) => (
            <div key={t.id} className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
              {t.pinned && (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-accent mb-2">
                  <Pin className="w-3 h-3" /> Pinned
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{t.author}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">#{t.channel}</span>
                    {t.solved && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-success">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                    <span className="text-[11px] text-muted-foreground ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {t.time}
                    </span>
                  </div>
                  <h3 className="text-sm text-foreground mt-1.5 leading-snug">{t.title}</h3>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1.5 hover:text-foreground">
                      <MessageSquare className="w-3.5 h-3.5" /> {t.replies}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-foreground">
                      <Heart className="w-3.5 h-3.5" /> {t.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study groups */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3">Study groups</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {studyGroups.map((g) => {
            const full = g.members >= g.capacity;
            return (
              <div key={g.name} className="rounded-xl border border-border bg-card p-4 animate-slide-up">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{g.lead}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground leading-snug">{g.name}</h4>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {g.meets}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>{g.members} / {g.capacity} members</span>
                    <span>{full ? "Full" : `${g.capacity - g.members} spots`}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={cn("h-full rounded-full", full ? "bg-warning" : "bg-primary")} style={{ width: `${(g.members / g.capacity) * 100}%` }} />
                  </div>
                </div>
                <button
                  disabled={full}
                  className="mt-4 w-full h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserPlus className="w-3.5 h-3.5" /> {full ? "Waitlist" : "Join group"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, tone = "" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-4 h-4", tone === "success" ? "text-success" : "text-primary")} />
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-heading font-semibold text-foreground">{value}</div>
    </div>
  );
}