import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import StateScreen from "@/components/StateScreen";

export default function SessionExpired() {
  return (
    <StateScreen
      icon={Clock}
      tone="info"
      title="Session expired"
      body="For your security, please sign in again. Your unsaved local work has been preserved and you'll return to where you left off."
    >
      <Link to="/login" className="px-4 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center justify-center">
        Sign in
      </Link>
      <Link to="/" className="px-4 h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted flex items-center justify-center">
        Back to home
      </Link>
    </StateScreen>
  );
}