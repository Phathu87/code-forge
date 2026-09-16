import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from '@/api/client';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setLoading] = useState(true);
  const [authChecked, setChecked] = useState(false);
  const [authError, setError] = useState(null);
  const checkUserAuth = useCallback(async () => {
    setLoading(true);
    try { setUser(await api.auth.me()); setError(null); }
    catch (error) { setUser(null); setError(error.status === 401 ? null : { type: 'unavailable', message: 'Cannot reach your account. Please retry.' }); }
    finally { setLoading(false); setChecked(true); }
  }, []);
  useEffect(() => { checkUserAuth(); }, [checkUserAuth]);
  const logout = async (shouldRedirect = true) => {
    await api.auth.logout(); setUser(null);
    if (shouldRedirect) window.location.assign('/login');
  };
  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), isLoadingAuth, isLoadingPublicSettings: false, authChecked, authError, checkUserAuth, logout, navigateToLogin: () => window.location.assign('/login') }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Authentication context is missing.');
  return context;
}
