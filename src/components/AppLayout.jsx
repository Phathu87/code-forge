import { useAuth } from "@/lib/AuthContext";
import React, { useState } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import {
  Code2, Menu, Search, Zap, Flame, Bell, Moon, Circle,
  LayoutDashboard, BookOpen, Target, FolderGit2, Briefcase,
  TrendingUp, Award, BadgeCheck, Trophy, Users, Settings, ShieldCheck, Route, UserCog,
} from "lucide-react";
import { navItems } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard, BookOpen, Target, Code2, FolderGit2, Briefcase,
  TrendingUp, Award, BadgeCheck, Trophy, Users, Settings, ShieldCheck, Route, Bell, UserCog,
};

function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 z-40 h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-semibold text-foreground text-sm">CodeForge</div>
            <div className="text-[10px] text-muted-foreground tracking-wide uppercase">Learn by building</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.filter((item) => item.path !== "/admin" || user?.role === "admin").map((item) => {
            const Icon = iconMap[item.icon] || Circle;
            const disabled = item.status === "soon";
            const content = (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {disabled && (
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 px-1.5 py-0.5 rounded bg-muted/60">
                    soon
                  </span>
                )}
              </>
            );
            if (disabled) {
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground/50 cursor-not-allowed"
                  title="Coming soon"
                >
                  {content}
                </div>
              );
            }
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-foreground font-medium"
                      : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                  )
                }
              >
                {content}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sidebar-accent/60 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {(user?.full_name || user?.email || "?").slice(0, 2).toUpperCase()}
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm text-foreground truncate">{user?.full_name || user?.email}</div>
              <div className="text-[11px] text-muted-foreground"><button onClick={() => logout()} className="underline">Sign out</button></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu }) {
  const location = useLocation();
  const current = navItems.find((n) => n.path === location.pathname && n.status === "active");
  const title = current?.label || "CodeForge";

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur flex items-center gap-4 px-4 md:px-6">
      <button
        onClick={onMenu}
        className="md:hidden p-2 rounded-md hover:bg-muted text-muted-foreground"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-heading font-semibold text-foreground hidden sm:block">{title}</h1>

      <div className="flex-1 max-w-md ml-auto sm:ml-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search missions, skills, projects…"
            className="w-full h-9 pl-9 pr-3 rounded-md bg-muted/60 border border-border text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">XP unavailable</span>
        <span className="text-xs text-muted-foreground">XP</span>
      </div>
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 border border-border">
        <Flame className="w-4 h-4 text-warning" />
        <span className="text-sm font-medium text-foreground">—</span>
        <span className="text-xs text-muted-foreground">days</span>
      </div>

      <Link to="/notifications" className="p-2 rounded-md hover:bg-muted text-muted-foreground relative block" aria-label="Notifications">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
      </Link>
      <button className="p-2 rounded-md hover:bg-muted text-muted-foreground" aria-label="Toggle theme">
        <Moon className="w-5 h-5" />
      </button>
    </header>
  );
}

const bottomNav = [
  { label: "Home", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Learn", icon: BookOpen, path: "/learn" },
  { label: "Missions", icon: Target, path: "/missions" },
  { label: "Projects", icon: FolderGit2, path: "/projects" },
  { label: "Portfolio", icon: Briefcase, path: "/portfolio" },
];

function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 h-16 border-t border-border bg-card/95 backdrop-blur flex items-center justify-around">
      {bottomNav.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-0.5 w-16 h-full text-[10px]",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenu={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}