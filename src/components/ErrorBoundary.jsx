import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import StateScreen from "@/components/StateScreen";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <StateScreen
          icon={AlertTriangle}
          tone="error"
          title="Something went wrong"
          body="Your saved work should still be safe. Reload the application or return to your dashboard."
        >
          <button onClick={() => window.location.reload()} className="px-4 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Reload Application
          </button>
          <Link to="/dashboard" className="px-4 h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted flex items-center justify-center">
            Return to Dashboard
          </Link>
        </StateScreen>
      );
    }
    return this.props.children;
  }
}