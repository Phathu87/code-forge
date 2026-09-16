import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AppLayout from '@/components/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Missions from '@/pages/Missions';
import CodeLab from '@/pages/CodeLab';
import Onboarding from '@/pages/Onboarding';
import Skills from '@/pages/Skills';
import Portfolio from '@/pages/Portfolio';
import Learn from '@/pages/Learn';
import Projects from '@/pages/Projects';
import Leaderboard from '@/pages/Leaderboard';
import Community from '@/pages/Community';
import Integrity from '@/pages/Integrity';
import VerificationUnavailable from '@/components/VerificationUnavailable';
import Achievements from '@/pages/Achievements';

import Settings from '@/pages/Settings';
import Roadmap from '@/pages/Roadmap';
import Landing from '@/pages/Landing';
import HowItWorks from '@/pages/HowItWorks';
import FAQ from '@/pages/FAQ';
import Help from '@/pages/Help';
import Legal from '@/pages/Legal';
import SystemStatus from '@/pages/Status';
import Notifications from '@/pages/Notifications';
import Admin from '@/pages/Admin';
import SessionExpired from '@/pages/SessionExpired';
import Maintenance from '@/pages/Maintenance';
import PublicProfile from '@/pages/PublicProfile';
import ErrorBoundary from '@/components/ErrorBoundary';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify" element={<VerificationUnavailable />} />
      <Route path="/" element={<Landing />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/help" element={<Help />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/status" element={<SystemStatus />} />
      <Route path="/session-expired" element={<SessionExpired />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/portfolio/:username" element={<PublicProfile />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/code-lab" element={<CodeLab />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/integrity" element={<Integrity />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/certificates" element={<VerificationUnavailable />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router><div className="border-b border-border bg-card p-2 text-center text-sm" role="note">Development preview. Accounts and workspaces save to your server. Execution, progress and certificates are not available yet.</div>
          <ScrollToTop />
          <ErrorBoundary>
            <AuthenticatedApp />
          </ErrorBoundary>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App