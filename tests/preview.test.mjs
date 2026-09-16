import test from 'node:test';
import assert from 'node:assert/strict';
import { compilePreview } from '../server/preview.mjs';
import { previewDocument } from '../src/lib/preview.js';

test('preview compiles local React sources without evaluating learner code', async () => {
  const result = await compilePreview([
    { path: 'src/App.jsx', content: `import React from 'react'; import Title from './Title'; import './style.css'; throw new Error('must not execute on server'); export default function App(){ return <Title/> }` },
    { path: 'src/Title.jsx', content: `export default () => <h1>Preview content</h1>` },
    { path: 'src/style.css', content: 'h1 { color: red; }' },
  ]);
  assert.match(result.code, /Preview content/);
  assert.match(result.code, /must not execute on server/);
});

test('preview denies host paths, network imports, unknown packages, malformed and oversized source', async () => {
  for (const specifier of ['node:fs', '/etc/passwd', 'https://example.com/module.js', '../secret', 'lodash']) {
    await assert.rejects(compilePreview([{ path: 'App.jsx', content: `import x from '${specifier}'; export default x;` }]), (error) => error.status === 400);
  }
  await assert.rejects(compilePreview([{ path: '../App.jsx', content: 'x' }]), /Invalid/);
  await assert.rejects(compilePreview([{ path: 'App.jsx', content: 'x'.repeat(250001) }]), /250 KB/);
  await assert.rejects(compilePreview([{ path: 'App.jsx', content: 'export default <' }]), (error) => error.status === 400);
});

test('preview document blocks network and escapes closing script tags', () => {
  const html = previewDocument('console.log("</script><img src=x>")');
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /form-action 'none'/);
  assert.ok(!html.includes('"</script><img'));
});
