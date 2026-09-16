import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateRelease, targets } from '../src/lib/releasePolicy.js';
const gates = JSON.parse(readFileSync(new URL('../release/gates.json', import.meta.url)));
function complete() {
  const identity = { commit: 'a'.repeat(40), environment: 'staging', artifactSha256: 'b'.repeat(64) };
  return { ...identity, version: '1.0.0', signoffs: { engineering: 'Engineer', security: 'Security', operations: 'Operator', product: 'Owner' },
    gates: Object.fromEntries(gates.map((g) => [g.id, { ...identity, status: 'PASS', reviewer: 'QA', testedAt: '2026-01-01T00:00:00Z', evidence: ['evidence/test-run.txt'] }])) };
}
test('missing evidence blocks every target', () => {
  for (const target of Object.keys(targets)) assert.equal(evaluateRelease(gates, {}, target).eligible, false);
});
test('complete reviewed evidence satisfies all targets', () => {
  for (const target of Object.keys(targets)) assert.equal(evaluateRelease(gates, complete(), target).eligible, true);
});
test('failed core gate blocks all targets', () => {
  const a = complete(); a.gates[261].status = 'FAIL';
  for (const target of Object.keys(targets)) assert.equal(evaluateRelease(gates, a, target).eligible, false);
});
test('stale, missing, future and mismatched evidence cannot pass', () => {
  for (const patch of [{ commit: 'c'.repeat(40) }, { environment: 'production' }, { artifactSha256: 'c'.repeat(64) }, { evidence: [] }, { evidence: [' '] }, { reviewer: '' }, { testedAt: '2999-01-01' }, { testedAt: 'invalid' }]) {
    const a = complete(); Object.assign(a.gates[258], patch);
    assert.equal(evaluateRelease(gates, a).eligible, false);
  }
});
test('platform deferral cannot enable that platform or verified learning', () => {
  const a = complete(); delete a.gates[286]; delete a.gates[288];
  assert.equal(evaluateRelease(gates, a, 'web').eligible, true);
  assert.equal(evaluateRelease(gates, a, 'huawei').eligible, false);
  assert.equal(evaluateRelease(gates, a, 'verified').eligible, false);
});
test('missing catalogue, identity, signoff and invalid target fail closed', () => {
  assert.equal(evaluateRelease([], complete()).eligible, false);
  const a = complete(); a.commit = null;
  assert.equal(evaluateRelease(gates, a).eligible, false);
  const b = complete(); delete b.signoffs.security;
  assert.equal(evaluateRelease(gates, b).eligible, false);
  assert.throws(() => evaluateRelease(gates, complete(), 'unknown'));
});
test('misclassified or duplicated catalogue cannot bypass required gates', () => {
  const changed = gates.map((g) => g.id === 261 ? { ...g, scope: 'deferred' } : g);
  assert.equal(evaluateRelease(changed, complete()).eligible, false);
  assert.equal(evaluateRelease([...gates.slice(1), gates[1]], complete()).eligible, false);
});
