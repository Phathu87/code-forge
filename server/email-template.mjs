const escape = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const emailTitles = Object.freeze({
  verify: 'Verify your CodeForge email', reset: 'Reset your CodeForge password',
  security: 'CodeForge account security notice', deletion: 'CodeForge account deletion confirmation',
  welcome: 'Welcome to CodeForge', milestone: 'CodeForge mission milestone',
  project: 'CodeForge project completed', assessment: 'CodeForge assessment submitted',
  verified: 'CodeForge verification complete', additional: 'Additional verification required',
  appeal: 'CodeForge appeal update', certificate: 'CodeForge certificate issued',
});

/** Templates do not create events or confer verified status. Only verify/reset are connected. */
export function renderEmail({ kind, text }) {
  const subject = Object.hasOwn(emailTitles, kind) ? emailTitles[kind] : null;
  if (!subject) throw new Error('Unknown transactional email kind.');
  const safeText = escape(text);
  const resetUrl = kind === 'reset' ? String(text).match(/https:\/\/[^\s<>]+/)?.[0] : null;
  const action = resetUrl ? `<p><a href="${escape(resetUrl)}" style="display:inline-block;background:#0da2e7;color:#0e1015;padding:12px 18px;border-radius:8px;font-weight:bold">Reset password</a></p>` : '';
  const footer = ['verify', 'reset', 'security'].includes(kind)
    ? 'Keep verification codes and password-reset links private. If you did not request this message, contact the operator through CodeForge support.'
    : 'For questions about this update, use CodeForge support.';
  // Text content remains the primary, complete fallback. No remote tracking assets.
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#0e1015;color:#edf0f3;font:16px/1.6 Arial,sans-serif"><main style="max-width:560px;margin:32px auto;padding:24px"><div style="font-size:22px;font-weight:bold;color:#0da2e7">CodeForge</div><h1 style="font-size:24px;line-height:1.3">${escape(subject)}</h1><p style="white-space:pre-wrap;overflow-wrap:anywhere">${safeText}</p>${action}<p style="color:#8f9caf;font-size:14px">${footer}</p></main></body></html>`;
  return { subject, text, html };
}
