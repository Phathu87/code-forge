import React from 'react';
const saveLabels = { local: 'Local draft', syncing: 'Saving...', saved: 'Saved', conflict: 'Conflict', unsaved: 'Not saved' };
export default function StatusBar({ saveState }) {
  return <div className="h-8 px-3 border-t border-border bg-card flex items-center gap-4 text-xs text-muted-foreground overflow-x-auto shrink-0"><span>React browser preview</span><span>Assessed execution unavailable</span><span className="ml-auto">{saveLabels[saveState] || 'Loading'}</span></div>;
}
