import React, { useEffect, useState } from 'react';
import PublicShell from '@/components/landing/PublicShell';
export default function Status() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  async function check() {
    setChecking(true); setError(''); setHealth(null);
    try {
      const response = await fetch('/api/health', { cache: 'no-store' });
      if (!response.ok) throw new Error('The API health check did not pass.');
      setHealth(await response.json());
    } catch { setError('Could not confirm API availability. Try again shortly.'); }
    finally { setChecking(false); }
  }
  useEffect(() => { check(); }, []);
  return <PublicShell><main className="max-w-3xl mx-auto p-6 py-12 space-y-6"><h1 className="text-3xl font-semibold">Service status</h1><p>This checks the API and database connection now. It does not measure historical uptime or email delivery.</p><div role="status" className="rounded-xl border border-border p-5">{checking ? 'Checking...' : error || (health ? `API and database responded. Version ${health.version}.` : 'No result yet.')}</div>{health && <p className="text-sm text-muted-foreground break-all">Build: {health.commit}</p>}<button onClick={check} disabled={checking} className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Check again</button><p className="text-sm text-muted-foreground">Free hosting may take time to wake after an idle period. Assessed execution, XP and certificates remain unavailable.</p></main></PublicShell>;
}
