import React from "react";
import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import StateScreen from "@/components/StateScreen";

export default function Maintenance() {
  return (
    <StateScreen
      icon={Wrench}
      tone="warning"
      title="We'll be back shortly"
      body="We're performing scheduled maintenance. Your projects and progress are safe. Expected return: 10:30 SAST."
    >
      <button onClick={() => window.location.reload()} className="px-4 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
        Check again
      </button>
      <Link to="/status" className="px-4 h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted flex items-center justify-center">
        View status
      </Link>
    </StateScreen>
  );
}