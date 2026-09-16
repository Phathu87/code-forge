import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicShell from '@/components/landing/PublicShell';
import { useAuth } from '@/lib/AuthContext';
import { api } from '@/api/client';

export default function Help() {
  const { user } = useAuth();
  const [form, setForm] = useState({ category: 'Account', subject: '', description: '' });
  const [tickets, setTickets] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (user) api.support.list().then(setTickets).catch((failure) => setError(failure.message)); }, [user]);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const ticket = await api.support.create(form);
      setMessage(`Request ${ticket.id} saved. You can find it below.`);
      setForm({ category: 'Account', subject: '', description: '' });
      setTickets(await api.support.list());
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  const input = 'mt-2 w-full rounded-md border border-border bg-background p-3';
  return <PublicShell><main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
    <h1 className="text-3xl font-semibold">Help and support</h1>
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Workspace recovery</h2>
      <p>Code Lab saves changes to your account and keeps a local draft while a save is pending. If you see a conflict or cannot connect, download your draft before loading another version.</p>
      <p>Export your data or delete your account from <Link className="text-primary underline" to="/settings">Settings</Link>. Execution, certificates and verified assessments are still unavailable.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Contact the operator</h2>
      <p className="text-sm text-muted-foreground">Requests are stored in your account for the operator to review. Email acknowledgements and response-time guarantees are not configured. Do not include passwords, tokens or private keys.</p>
      {!user ? <Link to="/login?returnTo=%2Fhelp" className="text-primary underline">Sign in to send and view requests</Link> : <>
        {message && <p role="status">{message}</p>}{error && <p role="alert" className="text-destructive">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <label className="block">Category<select className={input} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{['Account', 'Mission', 'Code Lab', 'Bug', 'Privacy', 'Security', 'Other'].map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="block">Subject<input className={input} required minLength={3} maxLength={160} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} /></label>
          <label className="block">Description<textarea className={input} required rows={5} minLength={10} maxLength={10000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <button disabled={busy} className="rounded-md bg-primary text-primary-foreground px-4 py-2 disabled:opacity-50">{busy ? 'Sending...' : 'Send request'}</button>
        </form>
        <h2 className="text-lg font-semibold">Your requests</h2>
        {!tickets.length && <p>No requests yet.</p>}
        {tickets.map((ticket) => <article key={ticket.id} className="rounded-lg border border-border p-4 space-y-2"><h3 className="font-medium">{ticket.subject}</h3><p className="text-sm break-all">{ticket.id} · {ticket.category} · {ticket.status}</p><p className="whitespace-pre-wrap">{ticket.description}</p></article>)}
      </>}
    </section>
  </main></PublicShell>;
}
