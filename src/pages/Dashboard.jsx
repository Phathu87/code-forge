import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import LearningRoadmap from "@/components/LearningRoadmap";
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-heading font-semibold">
          Welcome{user?.full_name ? `, ${user.full_name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-2">
          Pick a focus, practise it in Code Lab and keep your project evidence
          together.
        </p>
      </header>
      <LearningRoadmap />
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          className="p-5 rounded-xl border border-border bg-card hover:border-primary"
          to="/portfolio"
        >
          <h2 className="font-semibold">Your project portfolio</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Import a public GitHub source snapshot. Imports remain private and
            unverified.
          </p>
        </Link>
        <Link
          className="p-5 rounded-xl border border-border bg-card hover:border-primary"
          to="/settings"
        >
          <h2 className="font-semibold">Your account and data</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Update your name, export your data or manage your account.
          </p>
        </Link>
      </div>
    </main>
  );
}
