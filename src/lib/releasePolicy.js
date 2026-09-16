// Reviewed release metadata, never a learner-editable feature switch.
export const targets = {
  web: ['core'], pwa: ['core', 'pwa'],
  android: ['core', 'store', 'android'], ios: ['core', 'store', 'ios'],
  huawei: ['core', 'store', 'huawei'], windows: ['core', 'store', 'windows'],
  verified: ['core', 'verified', 'certificate'],
  employer: ['core', 'verified', 'certificate', 'employer'],
};

export function evaluateRelease(gates, assessment, target = 'web') {
  if (!Object.hasOwn(targets, target)) throw new Error(`Unknown release target: ${target}`);
  const identityValid = Boolean(assessment?.version &&
    /^[a-f0-9]{40}$/i.test(assessment?.commit || '') &&
    assessment?.environment && assessment.environment !== 'local' &&
    /^[a-f0-9]{64}$/i.test(assessment?.artifactSha256 || ''));
  const results = gates.map((gate) => {
    const record = assessment?.gates?.[gate.id];
    const pass = identityValid && record?.status === 'PASS' &&
      record.commit === assessment.commit && record.environment === assessment.environment &&
      record.artifactSha256 === assessment.artifactSha256 &&
      typeof record.reviewer === 'string' && record.reviewer.trim().length > 0 &&
      Number.isFinite(Date.parse(record.testedAt)) && Date.parse(record.testedAt) <= Date.now() &&
      Array.isArray(record.evidence) && record.evidence.length > 0 &&
      record.evidence.every((item) => typeof item === 'string' && item.trim().length > 0);
    return { ...gate, applicable: targets[target].includes(gate.scope), status: pass ? 'PASS' : 'BLOCK RELEASE' };
  });
  const blockers = results.filter((gate) => gate.applicable && gate.status !== 'PASS');
  const scopeFor = (id) => id <= 278 || id === 281 ? 'core' : ({ 279: 'store', 280: 'store', 282: 'store', 283: 'pwa', 284: 'android', 285: 'ios', 286: 'huawei', 287: 'windows', 288: 'verified', 289: 'certificate', 290: 'employer' })[id];
  const catalogueValid = gates.every((g) => g.scope === scopeFor(g.id)) && gates.length === 33 && new Set(gates.map((g) => g.id)).size === 33 &&
    Array.from({ length: 33 }, (_, i) => i + 258).every((id) => gates.some((g) => g.id === id));
  const signed = ['engineering', 'security', 'operations', 'product'].every((role) =>
    typeof assessment?.signoffs?.[role] === 'string' && assessment.signoffs[role].trim().length > 0);
  return { results, blockers, eligible: catalogueValid && identityValid && signed && blockers.length === 0 };
}
