import React, { useState } from 'react';
import gates from '../../../release/gates.json';
import assessment from '../../../release/assessment.json';
import { evaluateRelease, targets } from '@/lib/releasePolicy';

export default function ReleaseTab() {
  const [target, setTarget] = useState('web');
  const { results, eligible } = evaluateRelease(gates, assessment, target);
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold">Release decision: {eligible ? 'Awaiting operator decision' : 'NOT READY'}</h3>
        <p className="text-sm text-muted-foreground mt-2">Repository assessment · {assessment.date} · version {assessment.version}. Missing evidence blocks release. This screen does not verify a deployment or approve publication.</p>
        <label htmlFor="release-target" className="block text-sm mt-4 mb-2">Release target</label>
        <select id="release-target" value={target} onChange={(e) => setTarget(e.target.value)} className="bg-background border border-border rounded p-2">
          {Object.keys(targets).map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <p role="status" className="text-sm mt-3">{results.filter((g) => g.applicable && g.status === 'PASS').length} of {results.filter((g) => g.applicable).length} applicable gates passed.</p>
      </section>
      <section className="space-y-3" aria-label="Release gates">
        {results.map((gate) => (
          <article key={gate.id} className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-medium text-sm">{gate.id} · {gate.name}</h4>
            <p className="text-xs font-semibold mt-1">{gate.applicable ? gate.status : 'DEFERRED FOR THIS TARGET - separate approval required'}</p>
            <p className="text-sm text-muted-foreground mt-2">{gate.finding}</p>
          </article>
        ))}
      </section>
      <p className="text-xs text-muted-foreground">Verified learning, certificates and employer verification are not approved. Store requirements must be checked at submission time. See docs/release-readiness-report.md for evidence requirements.</p>
    </div>
  );
}
