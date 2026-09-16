import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { missionDependencyPolicy, dependencyVersions, projectMeta } from "@/lib/mockData";

const lineStyle = {
  cmd: "text-foreground",
  out: "text-muted-foreground",
  success: "text-success",
  error: "text-destructive",
  info: "text-primary",
  muted: "text-muted-foreground/60",
};

const helpLines = [
  { text: "Available commands", type: "info" },
  { text: "  npm install <package>   install an approved dependency", type: "out" },
  { text: "  npm run dev             start the preview server", type: "out" },
  { text: "  npm test                run the mission test suite", type: "out" },
  { text: "  npm run build           build the project", type: "out" },
  { text: "  npm uninstall <package> remove a dependency", type: "out" },
  { text: "  git status / git log    version control", type: "out" },
  { text: "  ls / clear / help", type: "out" },
];

const lsLines = (files) => {
  const roots = new Set(files.map((f) => f.path.split("/")[0]));
  roots.add("package.json");
  roots.add("README.md");
  return [{ text: Array.from(roots).join("   "), type: "out" }];
};

export default function TerminalPanel({ files, deps, onInstall, onUninstall, onEvent }) {
  const [lines, setLines] = useState([
    { text: "CodeForge sandbox — isolated Node.js 22 runtime", type: "info" },
    { text: "Type 'help' for available commands.", type: "muted" },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const push = (newLines) => {
    setBusy(true);
    newLines.forEach((l, i) =>
      setTimeout(() => {
        setLines((prev) => [...prev, l]);
        if (i === newLines.length - 1) setBusy(false);
      }, i * 140)
    );
  };

  const npm = (sub, rest) => {
    if (!sub) return push([{ text: "Usage: npm <install|uninstall|run|test> ...", type: "error" }]);
    if (sub === "install" || sub === "i" || sub === "add") {
      const pkg = rest[0];
      if (!pkg) {
        return push([
          { text: `up to date, audited ${deps.length * 37 + 41} packages in 312ms`, type: "out" },
          { text: "found 0 vulnerabilities", type: "out" },
        ]);
      }
      if (!missionDependencyPolicy.allowed.includes(pkg)) {
        onEvent?.(`Blocked dependency install: ${pkg}`);
        return push([
          { text: `npm ERR! Dependency "${pkg}" is not allowed by this mission's dependency policy.`, type: "error" },
          { text: `Allowed: ${missionDependencyPolicy.allowed.join(", ")}`, type: "muted" },
        ]);
      }
      if (deps.some((d) => d.name === pkg)) {
        return push([{ text: `${pkg}@${dependencyVersions[pkg] || "latest"} is already installed`, type: "out" }]);
      }
      onInstall?.(pkg);
      return push([
        { text: `added 1 package, and audited ${deps.length + 1} packages in ${280 + deps.length * 13}ms`, type: "out" },
        { text: `+ ${pkg}@${dependencyVersions[pkg] || "latest"}`, type: "success" },
        { text: "found 0 vulnerabilities", type: "out" },
      ]);
    }
    if (sub === "uninstall" || sub === "remove") {
      const pkg = rest[0];
      if (!pkg || !deps.some((d) => d.name === pkg)) {
        return push([{ text: `npm ERR! Package "${pkg || ""}" is not installed.`, type: "error" }]);
      }
      onUninstall?.(pkg);
      return push([{ text: `removed 1 package, and audited ${deps.length - 1} packages in 241ms`, type: "out" }]);
    }
    if (sub === "test") {
      onEvent?.("Tests executed");
      return push([
        { text: "> shared-preferences@0.1.0 test", type: "muted" },
        { text: "PASS  src/tests/toggle.test.jsx", type: "success" },
        { text: "FAIL  src/tests/persistence.test.jsx — preference resets on reload", type: "error" },
        { text: "Tests: 2 passed, 1 failed, 4 total", type: "out" },
      ]);
    }
    if (sub === "run") {
      const script = rest[0];
      if (script === "dev") {
        onEvent?.("Preview started");
        return push([
          { text: "> shared-preferences@0.1.0 dev", type: "muted" },
          { text: "VITE v5.4.8  ready in 214 ms", type: "out" },
          { text: "➜  Local:   http://localhost:5173/", type: "info" },
          { text: "Local preview ready.", type: "success" },
        ]);
      }
      if (script === "build") {
        onEvent?.("Build completed");
        return push([
          { text: "vite v5.4.8 building for production...", type: "out" },
          { text: "✓ 8 modules transformed.", type: "success" },
          { text: "dist/index.html  0.61 kB │ gzip: 0.35 kB", type: "out" },
          { text: "✓ built in 1.42s", type: "success" },
        ]);
      }
      if (script === "test") return npm("test", []);
      return push([{ text: `npm ERR! Missing script: "${script || ""}"`, type: "error" }]);
    }
    push([{ text: `Usage: npm <install|uninstall|run|test> ...`, type: "error" }]);
  };

  const git = (sub) => {
    if (sub === "status") {
      return push([
        { text: "On branch master", type: "out" },
        { text: "Your branch is up to date with 'origin/master'.", type: "out" },
        { text: "Changes not staged for commit:", type: "out" },
        { text: "  modified:   src/context/LanguageContext.jsx", type: "error" },
      ]);
    }
    if (sub === "log") {
      return push([
        { text: "commit 9f2c1a7 (HEAD -> master)", type: "out" },
        { text: "    Mission: Shared Preferences — in progress", type: "muted" },
        { text: "commit 4b81e0d", type: "out" },
        { text: "    Set up LanguageContext provider", type: "muted" },
        { text: "commit c3d9041", type: "out" },
        { text: "    Initial commit: programming language toggle (origin project)", type: "muted" },
      ]);
    }
    push([{ text: `git: '${sub || ""}' is not supported in this sandbox`, type: "error" }]);
  };

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines((prev) => [...prev, { text: `$ ${cmd}`, type: "cmd" }]);
    setHistory((h) => [...h, cmd]);
    setHistIndex(-1);
    setValue("");

    const [bin, sub, ...rest] = cmd.split(/\s+/);
    if (bin === "clear") return setLines([]);
    if (bin === "help") return push(helpLines);
    if (bin === "ls") return push(lsLines(files));
    if (bin === "git") return git(sub);
    if (bin === "npm") return npm(sub, rest);
    push([{ text: `command not found: ${bin}`, type: "error" }]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") run(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(i);
      setValue(history[i]);
    }
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs min-h-0" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-border text-[10px] text-muted-foreground shrink-0">
        <span>Terminal</span>
        <span>Runtime: Node.js</span>
        <span className="hidden sm:inline">Workspace: {projectMeta.workspace}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 min-h-0">
        {lines.map((l, i) => (
          <div key={i} className={cn("whitespace-pre-wrap leading-5", lineStyle[l.type] || "text-muted-foreground")}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 py-2 border-t border-border shrink-0">
        <span className="text-success">$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          disabled={busy}
          placeholder={busy ? "running…" : "npm install react-router-dom"}
          className="flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}