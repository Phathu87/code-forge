import React, { useState } from 'react';
import { api } from '@/api/client';
import { useAuth } from '@/lib/AuthContext';

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user.full_name || '');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function perform(action) {
    setBusy(true); setMessage(''); setError('');
    try { await action(); } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  const save = (event) => {
    event.preventDefault();
    perform(async () => { await api.profile.update({ name }); await refreshUser(); setMessage('Profile saved.'); });
  };
  const exportData = () => perform(async () => {
    const data = await api.account.export(password);
    // Include this device's pending work so an export does not omit unsynced edits.
    let localDraft = null;
    try { localDraft = localStorage.getItem(`codeforge.workspace.${user.id}`); } catch { /* Server export remains available. */ }
    const url = URL.createObjectURL(new Blob([JSON.stringify({ ...data, localDraft }, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'codeforge-data.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setPassword(''); setMessage('Your data export has been downloaded.');
  });
  const remove = () => perform(async () => {
    await api.account.delete(password, confirmation);
    try { localStorage.removeItem(`codeforge.workspace.${user.id}`); } catch { /* Account deletion has already completed. */ }
    window.location.assign('/');
  });
  const input = 'mt-2 w-full rounded-md border border-border bg-background p-3 text-foreground';
  return <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
    <h1 className="text-2xl font-semibold">Settings</h1>
    {message && <p role="status" className="text-success">{message}</p>}
    {error && <p role="alert" className="text-destructive">{error}</p>}
    <form onSubmit={save} className="rounded-xl border border-border p-5 space-y-4">
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      <label className="block">Full name<input className={input} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>
      <button disabled={busy} className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save profile</button>
    </form>
    <section className="rounded-xl border border-border p-5 space-y-4">
      <h2 className="text-lg font-semibold">Your data</h2>
      <p className="text-sm text-muted-foreground">Your profile and workspace are private. Export includes your account, saved workspace, support requests and any pending draft on this device. Passwords and session credentials are excluded.</p>
      <label className="block">Current password<input className={input} type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      <button disabled={busy || !password} type="button" onClick={exportData} className="rounded-md border border-border px-4 py-2 disabled:opacity-50">Download my data</button>
    </section>
    <section className="rounded-xl border border-destructive/40 p-5 space-y-4">
      <h2 className="text-lg font-semibold">Delete account</h2>
      <p className="text-sm text-muted-foreground">This permanently removes your account, active sessions, workspace and support requests from the live database. Download your work first. Other devices may retain local drafts; clear their CodeForge browser storage. Backups expire under the operator's retention policy.</p>
      <label className="block">Type DELETE to confirm<input className={input} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" /></label>
      <button type="button" onClick={remove} disabled={busy || !password || confirmation !== 'DELETE'} className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground disabled:opacity-50">Permanently delete my account</button>
    </section>
  </div>;
}
