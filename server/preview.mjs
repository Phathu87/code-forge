import { context } from 'esbuild';
import { createRequire } from 'node:module';
import { posix } from 'node:path';
const require = createRequire(import.meta.url);
const libraries = new Map(['react', 'react-dom/client', 'react/jsx-runtime'].map((name) => [name, require.resolve(name)]));
const invalid = (message) => Object.assign(new Error(message), { status: 400 });

// Source is parsed and bundled here, never evaluated on the API server.
export async function compilePreview(files) {
  if (!Array.isArray(files) || files.length > 50) throw invalid('Preview supports up to 50 files.');
  const sources = new Map();
  let size = 0;
  for (const file of files) {
    if (!file || typeof file.path !== 'string' || !/^[\w./ -]{1,200}$/.test(file.path) || file.path.startsWith('/') || file.path.split('/').includes('..') || sources.has(file.path) || typeof file.content !== 'string') throw invalid('Invalid preview source.');
    size += Buffer.byteLength(file.content);
    if (size > 250000) throw invalid('Preview source must be smaller than 250 KB.');
    sources.set(file.path, file.content);
  }
  const entry = ['src/App.jsx', 'App.jsx', 'src/App.js', 'App.js'].find((path) => sources.has(path));
  if (!entry) throw invalid('Add an App.jsx file with a default React component export.');
  const build = await context({
    stdin: { contents: `import React from 'react'; import {createRoot} from 'react-dom/client'; import App from './${entry}'; createRoot(document.getElementById('root')).render(React.createElement(App));`, sourcefile: 'entry.jsx', resolveDir: '.' },
    bundle: true, write: false, platform: 'browser', format: 'iife', minify: true,
    jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'silent',
    plugins: [{ name: 'workspace-only', setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        // Only trusted, installed React internals may use normal filesystem resolution.
        if (args.namespace === 'file' && args.importer && args.importer !== 'entry.jsx' && !args.importer.endsWith('/entry.jsx') && !args.importer.endsWith('\\entry.jsx')) return;
        if (libraries.has(args.path)) return { path: libraries.get(args.path) };
        if (!args.path.startsWith('.')) return { errors: [{ text: `Package is not available in preview: ${args.path}` }] };
        const path = posix.normalize(posix.join(args.namespace === 'workspace' ? posix.dirname(args.importer) : '', args.path));
        const match = [path, `${path}.jsx`, `${path}.js`, `${path}/index.jsx`, `${path}/index.js`].find((item) => sources.has(item));
        return match ? { path: match, namespace: 'workspace' } : { errors: [{ text: `Workspace file not found: ${args.path}` }] };
      });
      build.onLoad({ filter: /.*/, namespace: 'workspace' }, ({ path }) => {
        if (path.endsWith('.css')) return { contents: `const style = document.createElement('style'); style.textContent = ${JSON.stringify(sources.get(path))}; document.head.appendChild(style);`, loader: 'js' };
        if (!/\.(jsx?|json)$/.test(path)) return { errors: [{ text: 'Preview supports JavaScript, JSX, CSS and JSON only.' }] };
        return { contents: sources.get(path), loader: path.endsWith('.json') ? 'json' : 'jsx' };
      });
    } }],
  });
  const timer = setTimeout(() => { build.cancel().catch(() => {}); }, 5000);
  try {
    const result = await build.rebuild();
    const code = result.outputFiles[0].text;
    if (code.length > 2000000) throw invalid('Compiled preview is too large.');
    return { code };
  } catch (error) {
    if (error.status) throw error;
    throw invalid(error.errors?.slice(0, 3).map((item) => item.text).join('\n') || 'Preview could not compile.');
  } finally { clearTimeout(timer); await build.dispose(); }
}
