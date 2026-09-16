import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/api/client';

export function useWorkspace(userId, initial) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Loading workspace…');
  const [tick, setTick] = useState(0);
  const state = useRef({ data: initial, revision: 0, ready: false, dirty: false, conflict: false, storageFailed: false, saving: false });
  const key = `codeforge.workspace.${userId}`;
  const persist = useCallback(() => {
    try {
      localStorage.setItem(key, JSON.stringify({ data: state.current.data, revision: state.current.revision }));
      state.current.storageFailed = false;
    } catch {
      state.current.storageFailed = true;
      setMessage('Browser storage is full or unavailable. Keep this tab open and download your draft.');
    }
  }, [key]);
  useEffect(() => {
    let active = true;
    async function load() {
      let draft;
      try { draft = JSON.parse(localStorage.getItem(key) || 'null'); }
      catch { setMessage('A local draft could not be read. It has been kept in browser storage.'); }
      try {
        const remote = await api.workspace.load();
        if (!active) return;
        const validDraft = draft && Array.isArray(draft.data?.files) && Number.isSafeInteger(draft.revision);
        const conflict = validDraft && draft.revision !== remote.revision;
        const restored = validDraft ? draft.data : remote.data || initial;
        state.current = { data: restored, revision: validDraft ? draft.revision : remote.revision, ready: true, dirty: Boolean(validDraft), conflict, storageFailed: false, saving: false };
        setData(restored);
        setStatus(conflict ? 'conflict' : validDraft ? 'local' : 'saved');
        setMessage(conflict ? 'Your draft and the server version differ. Download your draft before loading the server version.' : validDraft ? 'Recovered local draft. Waiting to sync.' : remote.data ? 'Workspace loaded.' : 'Ready. Changes will save automatically.');
        setTick((value) => value + 1);
      } catch {
        if (!active) return;
        // Do not start with a blank workspace when the existing server state is unknown.
        if (draft && Array.isArray(draft.data?.files) && Number.isSafeInteger(draft.revision)) {
          state.current = { data: draft.data, revision: draft.revision, ready: true, dirty: true, conflict: false, storageFailed: false, saving: false };
          setData(draft.data); setStatus('local'); setTick((value) => value + 1);
          setMessage('Offline. Your draft is available and will sync when connected.');
        } else { setStatus('error'); setMessage('Could not load your workspace. Reconnect and reload before editing.'); }
      }
    }
    load();
    return () => { active = false; };
    // The initial fixture is only used for a workspace that has no saved state.
  }, [userId, key]);
  useEffect(() => {
    const wake = () => setTick((value) => value + 1);
    const leave = (event) => { if (state.current.dirty && state.current.storageFailed) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('online', wake); window.addEventListener('beforeunload', leave);
    return () => { window.removeEventListener('online', wake); window.removeEventListener('beforeunload', leave); };
  }, []);
  useEffect(() => {
    const current = state.current;
    if (!current.ready || !current.dirty || current.conflict) return;
    const timer = setTimeout(async () => {
      // A single request is allowed at a time; later edits stay in the draft.
      if (current.saving) return;
      current.saving = true;
      const sent = current.data;
      setStatus('syncing');
      try {
        const saved = await api.workspace.save(sent, current.revision);
        current.revision = saved.revision;
        current.dirty = current.data !== sent;
        if (current.dirty) persist();
        else { try { localStorage.removeItem(key); } catch { /* A stale draft will be detected as a conflict. */ } }
        { setStatus(current.dirty ? 'local' : 'saved'); setMessage(current.dirty ? 'New edits are waiting to sync.' : 'Saved to your account.'); }
      } catch (error) {
        current.conflict = error.status === 409;
        { setStatus(current.conflict ? 'conflict' : 'local'); setMessage(error.status === 401 ? 'Session expired. Download your draft before signing in again.' : current.conflict ? error.message : current.storageFailed ? 'Save failed and browser storage is unavailable. Keep this tab open and download your draft.' : 'Save failed. Your local draft is kept; retrying when connected.'); }
      } finally {
        current.saving = false;
        // Trigger another save even when an edit replaced this effect during the request.
        setTick((value) => value + 1);
      }
    }, status === 'local' ? 1500 : 700);
    return () => clearTimeout(timer);
  }, [tick, key, persist]);
  const update = (field, value) => {
    if (!state.current.ready) return;
    state.current.data = { ...state.current.data, [field]: typeof value === 'function' ? value(state.current.data[field]) : value };
    state.current.dirty = true;
    persist(); setData(state.current.data);
    setStatus(state.current.conflict ? 'conflict' : state.current.storageFailed ? 'unsaved' : 'local');
    if (!state.current.storageFailed) setMessage(state.current.conflict ? 'Conflict: changes are kept locally only.' : 'Draft saved on this device.');
    setTick((value) => value + 1);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state.current.data, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'codeforge-workspace.json'; link.click(); URL.revokeObjectURL(url);
  };
  const loadServer = async () => {
    if (!window.confirm('Replace the local draft with the server version? Download your draft first if you want to keep it.')) return;
    try { const remote = await api.workspace.load(); localStorage.removeItem(key); state.current = { data: remote.data || initial, revision: remote.revision, ready: true, dirty: false, conflict: false, storageFailed: false, saving: false }; setData(state.current.data); setStatus('saved'); setMessage('Server version loaded.'); }
    catch { setMessage('Could not load the server version. Your draft has been kept.'); }
  };
  return { data, update, status, message, download, loadServer, ready: state.current.ready };
}
