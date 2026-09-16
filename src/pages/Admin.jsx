import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { LayoutDashboard, Users, Package, Fingerprint, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import OverviewTab from "@/components/admin/OverviewTab";
import UsersTab from "@/components/admin/UsersTab";
import ReleaseTab from "@/components/admin/ReleaseTab";
import IdentityTab from "@/components/admin/IdentityTab";
import ScreenshotsTab from "@/components/admin/ScreenshotsTab";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "release", label: "Release & Store", icon: Package },
  { id: "screenshots", label: "Screenshots", icon: Smartphone },
  { id: "identity", label: "App Identity", icon: Fingerprint },
];

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const { user } = useAuth();
  if (user?.role !== "admin") return <p role="alert" className="p-6">Administrator access required.</p>;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl font-heading font-semibold text-foreground">Administration</h1>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">Internal · Demo data</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Release checks and store preparation. This prototype screen checks the account role; production backend authorization still requires validation. Administrative
          services are not implemented here.
        </p>
      </div>

      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
              tab === t.id
                ? "border-primary text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "users" && <UsersTab />}
      {tab === "release" && <ReleaseTab />}
      {tab === "screenshots" && <ScreenshotsTab />}
      {tab === "identity" && <IdentityTab />}
    </div>
  );
}