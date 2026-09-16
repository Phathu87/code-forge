import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, Github, Linkedin, Bell, Shield, BookOpen, Check, Flame, Target, Save,
  Download, Info, Trash2, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { userProfile } from "@/lib/mockData";

export default function Settings() {
  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [commitment, setCommitment] = useState("10 hours");
  const [dailyGoal, setDailyGoal] = useState("150 XP");
  const [difficulty, setDifficulty] = useState("Adaptive");
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(true);
  const [notifications, setNotifications] = useState({ reminders: true, streak: true, digest: false, achievements: true });
  const [saved, setSaved] = useState(false);
  const [exportCats, setExportCats] = useState({
    Profile: true, "Learning Progress": true, Skills: true, Projects: true,
    Certificates: true, Achievements: true, "Activity History": true,
  });
  const [exportState, setExportState] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [upToDate, setUpToDate] = useState(false);

  const requestExport = () => {
    setExportState("preparing");
    setTimeout(() => setExportState("ready"), 1200);
  };

  const checkUpdates = () => {
    setUpToDate(false);
    setTimeout(() => setUpToDate(true), 900);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, learning preferences and connected accounts.</p>
      </div>

      {/* Profile */}
      <Card icon={User} title="Profile">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-heading font-bold text-primary-foreground">
            {userProfile.avatarInitials}
          </div>
          <div>
            <p className="text-sm text-foreground font-medium">{userProfile.name}</p>
            <p className="text-xs text-muted-foreground">Level {userProfile.level} · {userProfile.levelTitle} · {userProfile.xp.toLocaleString()} XP</p>
          </div>
        </div>
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </Field>
        <Field label="Headline / role">
          <input value={role} onChange={(e) => setRole(e.target.value)} className="input" />
        </Field>
      </Card>

      {/* Learning preferences */}
      <Card icon={BookOpen} title="Learning preferences">
        <Field label="Weekly commitment">
          <Select value={commitment} onChange={setCommitment} options={["2 hours", "5 hours", "10 hours", "15+ hours"]} />
        </Field>
        <Field label="Daily XP goal">
          <Select value={dailyGoal} onChange={setDailyGoal} options={["50 XP", "100 XP", "150 XP", "300 XP"]} />
        </Field>
        <Field label="Mission difficulty">
          <Select value={difficulty} onChange={setDifficulty} options={["Gentle", "Adaptive", "Challenging"]} />
        </Field>
      </Card>

      {/* Connected accounts */}
      <Card icon={Github} title="Connected accounts">
        <Row
          icon={Github}
          title="GitHub"
          desc={githubConnected ? "Connected — import repos from your portfolio." : "Connect to import completed projects into your portfolio."}
        >
          <button
            onClick={() => setGithubConnected(!githubConnected)}
            className={cn("px-3 h-8 rounded-md text-xs font-medium", githubConnected ? "border border-border text-muted-foreground hover:text-foreground" : "bg-foreground text-background hover:opacity-90")}
          >
            {githubConnected ? "Disconnect" : "Connect"}
          </button>
        </Row>
        <Row
          icon={Linkedin}
          title="LinkedIn"
          desc={linkedinConnected ? "Connected — badges and certificates can be shared." : "Connect to share achievements to your profile."}
        >
          <button
            onClick={() => setLinkedinConnected(!linkedinConnected)}
            className={cn("px-3 h-8 rounded-md text-xs font-medium", linkedinConnected ? "border border-border text-muted-foreground hover:text-foreground" : "bg-foreground text-background hover:opacity-90")}
          >
            {linkedinConnected ? "Disconnect" : "Connect"}
          </button>
        </Row>
        <p className="text-[11px] text-muted-foreground/70 mt-3">
          Real GitHub import requires a Builder+ plan — you can still import demo projects from your portfolio.
        </p>
      </Card>

      {/* Notifications */}
      <Card icon={Bell} title="Notifications">
        <ToggleRow icon={Target} label="Daily mission reminders" on={notifications.reminders} onToggle={() => setNotifications((n) => ({ ...n, reminders: !n.reminders }))} />
        <ToggleRow icon={Flame} label="Streak warnings" on={notifications.streak} onToggle={() => setNotifications((n) => ({ ...n, streak: !n.streak }))} />
        <ToggleRow icon={BookOpen} label="Weekly progress digest" on={notifications.digest} onToggle={() => setNotifications((n) => ({ ...n, digest: !n.digest }))} />
        <ToggleRow icon={Check} label="Achievement unlocked" on={notifications.achievements} onToggle={() => setNotifications((n) => ({ ...n, achievements: !n.achievements }))} />
      </Card>

      {/* Security */}
      <Card icon={Shield} title="Security">
        <Row icon={Shield} title="Password" desc="Last changed 3 months ago">
          <button className="px-3 h-8 rounded-md border border-border text-xs text-foreground hover:bg-muted">Change</button>
        </Row>
        <Row icon={Bell} title="Active sessions" desc="2 devices · this browser + iPhone">
          <button className="px-3 h-8 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground">Sign out all</button>
        </Row>
      </Card>

      {/* Your Data */}
      <Card icon={Download} title="Your Data">
        <div className="space-y-2">
          {Object.keys(exportCats).map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={exportCats[cat]}
                onChange={() => setExportCats((c) => ({ ...c, [cat]: !c[cat] }))}
                className="w-4 h-4 accent-[hsl(var(--primary))]"
              />
              {cat}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={requestExport}
            disabled={exportState === "preparing"}
            className="px-4 h-9 rounded-md border border-border text-sm text-foreground hover:bg-muted disabled:opacity-60"
          >
            {exportState === "preparing" ? "Preparing…" : "Request Export"}
          </button>
          {exportState === "ready" && (
            <span className="text-xs text-success flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Export ready — download links are generated by the production backend.
            </span>
          )}
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground">Delete My Account</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Deleting your account may remove your profile, private projects, progress, learning history, achievements and certificates. Exact
              behaviour is finalised with the backend and legal review.
            </p>
          </div>
          {!deleteOpen ? (
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-destructive/40 text-destructive text-sm hover:bg-destructive/10"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete My Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Type <span className="font-mono text-foreground">DELETE</span> to confirm. Re-authentication is required in production.
              </p>
              <input value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" className="input" />
              <div className="flex gap-2 flex-wrap">
                <button disabled={deleteConfirm !== "DELETE"} className="px-3 h-9 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 disabled:opacity-50">
                  Permanently delete my account
                </button>
                <button onClick={() => { setDeleteOpen(false); setDeleteConfirm(""); }} className="px-3 h-9 rounded-md border border-border text-sm text-foreground hover:bg-muted">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* About */}
      <Card icon={Info} title="About">
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-xs text-muted-foreground">App version</p><p className="text-sm text-foreground mt-0.5">0.1.0</p></div>
          <div><p className="text-xs text-muted-foreground">Build</p><p className="text-sm text-foreground mt-0.5">0001 · Beta</p></div>
          <div><p className="text-xs text-muted-foreground">Release channel</p><p className="text-sm text-foreground mt-0.5">Stable</p></div>
          <div><p className="text-xs text-muted-foreground">Environment</p><p className="text-sm text-foreground mt-0.5">Prototype</p></div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <Link to="/legal" className="text-primary hover:underline">Privacy</Link>
          <Link to="/legal" className="text-primary hover:underline">Terms</Link>
          <Link to="/help" className="text-primary hover:underline">Support</Link>
          <Link to="/legal" className="text-primary hover:underline">Security</Link>
          <span className="text-muted-foreground">Open-source licences</span>
          <Link to="/" className="text-primary hover:underline">Website</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={checkUpdates} className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-border text-sm text-foreground hover:bg-muted">
            <RefreshCw className="w-3.5 h-3.5" /> Check for Updates
          </button>
          {upToDate && <span className="text-xs text-success flex items-center gap-1"><Check className="w-3.5 h-3.5" /> You're up to date.</span>}
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <p className="text-sm font-medium text-foreground">What's New — Version 0.1</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• New: Code Lab workspace — terminal, problems, dependencies, docs and activity log.</li>
            <li>• New: Help Centre, Trust &amp; Legal, System Status and public portfolio pages.</li>
            <li>• Improved: File explorer with create, rename and delete.</li>
            <li>• Improved: Mobile bottom navigation and install/update prompts.</li>
          </ul>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-xs text-success flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>}
        <button onClick={save} className="inline-flex items-center gap-1.5 px-5 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Save className="w-4 h-4" /> Save changes
        </button>
      </div>

      <style>{`
        .input { width: 100%; height: 2.5rem; padding: 0 0.75rem; border-radius: 0.5rem; background: hsl(var(--muted)/.5); border: 1px solid hsl(var(--border)); font-size: 0.875rem; color: hsl(var(--foreground)); }
        .input:focus { outline: none; box-shadow: 0 0 0 2px hsl(var(--ring)/.4); }
      `}</style>
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
        <Icon className="w-4 h-4 text-primary" /> {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Row({ icon: Icon, title, desc, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ icon: Icon, label, on, onToggle }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      <button
        onClick={onToggle}
        className={cn("relative w-10 h-6 rounded-full transition-colors shrink-0", on ? "bg-primary" : "bg-muted")}
        aria-pressed={on}
      >
        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform", on ? "translate-x-[1.125rem]" : "translate-x-0.5")} />
      </button>
    </div>
  );
}