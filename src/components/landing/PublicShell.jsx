import React from "react";
import { Link } from "react-router-dom";
import { Code2, ArrowRight } from "lucide-react";
import InstallAppBanner from "@/components/InstallAppBanner";

export default function PublicShell({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-lg">CodeForge</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">Preview</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link to="/how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
            <a href="/#missions" className="hover:text-foreground transition-colors">Missions</a>
            <a href="/#integrity" className="hover:text-foreground transition-colors">Integrity</a>
            <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/help" className="hover:text-foreground transition-colors">Help</Link>
            <Link to="/status" className="hover:text-foreground transition-colors">Status</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5">Sign in</Link>
            <Link to="/onboarding" className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              Start Building <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <InstallAppBanner />

      {children}

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">CodeForge</span>
            <span className="text-xs">· Development preview</span>
          </div>
          <div className="flex gap-6">
            <Link to="/how-it-works" className="hover:text-foreground">How it works</Link>
            <Link to="/faq" className="hover:text-foreground">FAQ</Link>
            <Link to="/verify" className="hover:text-foreground">Verify a certificate</Link>
            <Link to="/legal" className="hover:text-foreground">Trust &amp; Legal</Link>
            <Link to="/status" className="hover:text-foreground">System status</Link>
          </div>
          <p className="text-xs">© 2026 Phathutshedzo Rakhunwana · CodeForge</p>
        </div>
      </footer>
    </div>
  );
}