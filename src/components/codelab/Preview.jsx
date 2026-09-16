import React, { useState } from 'react';
import { api } from '@/api/client';
import { previewDocument } from '@/lib/preview';
export default function Preview({ files }) {
  const [document, setDocument] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true); setError(''); setDocument('');
    try { const result = await api.preview(files); setDocument(previewDocument(result.code)); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return <section className="flex flex-col h-full min-h-0">
    <div className="p-3 flex items-center justify-between border-b border-border"><h2 className="text-sm font-medium">Browser preview</h2><div className="flex gap-2"><button onClick={run} disabled={busy} className="rounded bg-primary px-3 py-2 text-xs text-primary-foreground disabled:opacity-50">{busy ? 'Compiling...' : 'Run'}</button><button onClick={() => setDocument('')} className="rounded border border-border px-3 py-2 text-xs">Stop</button></div></div>
    {error && <p role="alert" className="p-3 text-sm text-destructive whitespace-pre-wrap">{error}</p>}
    {document ? <iframe title="Your application preview" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={document} className="flex-1 w-full bg-white min-h-80" /> : <p className="p-4 text-sm text-muted-foreground">Run your App.jsx to preview it here. React and local JavaScript/CSS imports are supported. Network requests, browser storage and external packages are unavailable.</p>}
  </section>;
}
