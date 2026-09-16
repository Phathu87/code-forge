import { readFileSync } from 'node:fs';
import { evaluateRelease } from '../src/lib/releasePolicy.js';
const gates = JSON.parse(readFileSync(new URL('../release/gates.json', import.meta.url)));
const assessment = JSON.parse(readFileSync(new URL('../release/assessment.json', import.meta.url)));
try {
  const target = process.argv[2] || 'web';
  const result = evaluateRelease(gates, assessment, target);
  console.log(`${target}: ${result.eligible ? 'GATE EVIDENCE COMPLETE - operator release decision still required' : 'NOT READY'}`);
  for (const gate of result.blockers) console.log(`${gate.id}: BLOCK RELEASE - ${gate.name}`);
  if (!result.eligible) console.log('Require evidence, artifact identity and engineering/security/operations/product sign-offs.');
  process.exitCode = result.eligible ? 0 : 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
