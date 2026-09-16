import { useWorkspace } from "@/hooks/use-workspace";
import { useAuth } from "@/lib/AuthContext";
import React, { useState } from "react";
import {
  Shield, ShieldCheck, Play, Send, Terminal, ListChecks, Lightbulb,
  AlertTriangle, History, Cpu, SquareTerminal, FileText, Check, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";
import FileExplorer from "@/components/FileExplorer";
import CopilotPanel from "@/components/CopilotPanel";
import AuthorshipChallenge from "@/components/AuthorshipChallenge";
import TerminalPanel from "@/components/codelab/Terminal";
import ProblemsPanel from "@/components/codelab/Problems";
import DependenciesPanel from "@/components/codelab/Dependencies";
import DocsPanel from "@/components/codelab/Docs";
import ActivityPanel from "@/components/codelab/Activity";
import StatusBar from "@/components/codelab/StatusBar";
import Preview from "@/components/codelab/Preview";
import RequirementsPanel from "@/components/codelab/Requirements";
import TestsPanel from "@/components/codelab/Tests";
import ConsolePanel from "@/components/codelab/Console";
import IntegrityModal from "@/components/codelab/IntegrityModal";
import PasteWarning from "@/components/codelab/PasteWarning";
import {
  codeFiles, missionRequirements, developmentTimeline,
  initialDependencies, dependencyVersions, codeProblems, projectMeta,
} from "@/lib/mockData";
import { initialFolders, addFolderPaths, parentDir, extToLang } from "@/lib/fileTree";

export default function CodeLab() {
  const { user } = useAuth();
  const workspace = useWorkspace(user.id, { files: codeFiles, folders: initialFolders(codeFiles), deps: initialDependencies });
  const files = workspace.data.files;
  const setFiles = (value) => workspace.update("files", value);
  const [activePath, setActivePath] = useState(codeFiles[0].path);
  const folders = workspace.data.folders || [];
  const setFolders = (value) => workspace.update("folders", value);
  const [bottomTab, setBottomTab] = useState("requirements");
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [integrityOpen, setIntegrityOpen] = useState(false);
  const [pasteWarning, setPasteWarning] = useState(null);
  const running = false;
  const [authorshipOpen, setAuthorshipOpen] = useState(false);
  const deps = workspace.data.deps || initialDependencies;
  const setDeps = (value) => workspace.update("deps", value);
  const [devLog, setDevLog] = useState(developmentTimeline);
  const saveState = workspace.status;
  const [previewStatus, setPreviewStatus] = useState("Running");

  const logEvent = (event) =>
    setDevLog((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), event },
    ]);



  const onChange = (path, content) => {
    setFiles((prev) => prev.map((f) => (f.path === path ? { ...f, content } : f)));
  };

  const handleCreate = (parentPath, type, name) => {
    const newPath = parentPath ? `${parentPath}/${name}` : name;
    if (type === "file") {
      setFiles((prev) =>
        prev.some((f) => f.path === newPath)
          ? prev
          : [...prev, { name, path: newPath, language: extToLang(name), content: "" }]
      );
      setActivePath(newPath);
      logEvent(`Created ${newPath}`);
    } else {
      setFolders((prev) => addFolderPaths(prev, newPath));
      logEvent(`Created folder ${newPath}/`);
    }
  };

  const handleRename = (path, newName) => {
    const parent = parentDir(path);
    const newPath = parent ? `${parent}/${newName}` : newName;
    const oldName = path.split("/").pop();
    if (folders.includes(path)) {
      setFolders((prev) =>
        prev.map((p) => (p === path ? newPath : p.startsWith(path + "/") ? newPath + p.slice(path.length) : p))
      );
      setFiles((prev) =>
        prev.map((f) => (f.path.startsWith(path + "/") ? { ...f, path: newPath + f.path.slice(path.length) } : f))
      );
    } else {
      setFiles((prev) =>
        prev.map((f) => (f.path === path ? { ...f, name: newName, path: newPath, language: extToLang(newName) } : f))
      );
    }
    setActivePath((ap) =>
      ap === path ? newPath : ap.startsWith(path + "/") ? newPath + ap.slice(path.length) : ap
    );
    logEvent(`Renamed ${oldName} → ${newName}`);
  };

  const handleDelete = (path) => {
    const isFolder = folders.includes(path);
    const name = path.split("/").pop();
    if (isFolder) {
      setFiles((prev) => prev.filter((f) => !f.path.startsWith(path + "/")));
      setFolders((prev) => prev.filter((p) => p !== path && !p.startsWith(path + "/")));
      logEvent(`Deleted folder ${name}/`);
    } else {
      setFiles((prev) => prev.filter((f) => f.path !== path));
      logEvent(`Deleted ${name}`);
    }
    setActivePath((ap) => {
      if (ap !== path && !ap.startsWith(path + "/")) return ap;
      const remaining = files.filter((f) => f.path !== path && !f.path.startsWith(path + "/"));
      return remaining[0]?.path || "";
    });
  };

  const handleInstall = (pkg) => {
    setDeps((prev) =>
      prev.some((d) => d.name === pkg)
        ? prev
        : [...prev, { name: pkg, version: dependencyVersions[pkg] || "latest" }]
    );
    logEvent(`Installed ${pkg}`);
  };

  const handleUninstall = (pkg) => {
    setDeps((prev) => prev.filter((d) => d.name !== pkg));
    logEvent(`Removed ${pkg}`);
  };

  const handleBlockedDependency = (pkg) => logEvent(`Blocked dependency install: ${pkg}`);

  const refreshPreview = () => {
    setPreviewStatus("Restarting");
    logEvent("Preview restarted");
    setTimeout(() => setPreviewStatus("Running"), 900);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    const lines = text.split("\n").length;
    if (lines > 5) {
      e.preventDefault();
      setPasteWarning({ lines, chars: text.length });
    }
  };

  const runTests = () => setBottomTab("tests");

  const bottomTabs = [
    { id: "requirements", label: "Requirements", icon: ListChecks },
    { id: "tests", label: "Tests", icon: ShieldCheck },
    { id: "problems", label: "Problems", icon: AlertTriangle, badge: codeProblems.length },
    { id: "console", label: "Console", icon: Terminal },
    { id: "terminal", label: "Terminal", icon: SquareTerminal },
    { id: "hints", label: "Hints", icon: Lightbulb },
    { id: "activity", label: "Activity", icon: History },
    { id: "docs", label: "Docs", icon: FileText },
  ];

  const saveLabel = ({ saved: "Saved", local: "Local draft", syncing: "Saving…", conflict: "Conflict", unsaved: "Not saved" })[saveState] || "Loading";
  if (!workspace.ready) return <div className="p-6" role="status">{workspace.message}<button className="ml-3 underline" onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-4 py-2 text-xs border-b border-border flex gap-3 items-center"><span role="status">{workspace.message}</span><button className="underline ml-auto" onClick={workspace.download}>Download draft</button>{saveState === "conflict" && <button className="underline" onClick={workspace.loadServer}>Load server version</button>}</div>
      {/* Mission top bar */}
      <div className="flex items-center gap-3 px-4 h-12 border-b border-border bg-card shrink-0">
        <button
          onClick={() => setIntegrityOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/15"
          title="Integrity status"
        >
          <Shield className="w-3.5 h-3.5" />
          PRACTICE MISSION
        </button>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-foreground font-medium">{missionRequirements.title}</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">· Beginner · 200 XP</span>
        <span className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 border border-border text-[11px] text-muted-foreground whitespace-nowrap">
          <Cpu className="w-3 h-3" /> {projectMeta.runtime}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-muted/50 border border-border text-xs text-muted-foreground whitespace-nowrap">
            {saveState === "saved" ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
            )}
            {saveLabel}
          </span>
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className={cn("px-2.5 py-1.5 rounded-md text-xs flex items-center gap-1.5 border", copilotOpen ? "bg-accent/10 border-accent/30 text-accent" : "border-border text-muted-foreground hover:text-foreground")}
          >
            <Lightbulb className="w-3.5 h-3.5" /> Copilot
          </button>
          <button
            onClick={runTests}
            disabled={running}
            className="px-3 py-1.5 rounded-md bg-muted/60 border border-border text-xs text-foreground hover:bg-muted flex items-center gap-1.5 disabled:opacity-60"
          >
            <Play className="w-3.5 h-3.5" /> Tests unavailable
          </button>
          <button
            disabled title="Submissions are not available yet"
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 flex items-center gap-1.5 disabled:opacity-60"
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex flex-1 min-h-0">
        {/* File explorer + dependencies */}
        <div className="hidden md:flex flex-col w-60 border-r border-border bg-card shrink-0">
          <div className="flex-1 min-h-0">
            <FileExplorer
              files={files}
              folders={folders}
              activePath={activePath}
              onSelect={setActivePath}
              onCreate={handleCreate}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          </div>
          <div className="border-t border-border max-h-56 overflow-y-auto shrink-0">
            <DependenciesPanel deps={deps} onInstall={handleInstall} onBlocked={handleBlockedDependency} />
          </div>
        </div>

        {/* Editor + bottom panel */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-1 min-h-0">
            <CodeEditor files={files} activePath={activePath} onSelect={setActivePath} onChange={onChange} onPaste={handlePaste} />
          </div>

          {/* Developer panel */}
          <div className="h-60 border-t border-border bg-card flex flex-col shrink-0">
            <div className="flex items-center border-b border-border shrink-0 overflow-x-auto">
              {bottomTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setBottomTab(t.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 h-9 text-xs border-r border-border transition-colors whitespace-nowrap",
                    bottomTab === t.id
                      ? "bg-card text-foreground border-t-2 border-t-primary -mt-px"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <t.icon className="w-3.5 h-3.5" /> {t.label}
                  {t.badge && <span className="ml-0.5 px-1.5 rounded-full bg-warning/15 text-warning text-[9px]">{t.badge}</span>}
                </button>
              ))}
            </div>
            <div className="flex-1 min-h-0">
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "requirements" && "hidden")}>
                <RequirementsPanel />
              </div>
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "tests" && "hidden")}>
                <TestsPanel />
              </div>
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "problems" && "hidden")}>
                <ProblemsPanel />
              </div>
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "console" && "hidden")}>
                <ConsolePanel running={running} />
              </div>
              <div className={cn("h-full min-h-0", bottomTab !== "terminal" && "hidden")}>
                <TerminalPanel
                  files={files}
                  deps={deps}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                  onEvent={logEvent}
                />
              </div>
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "hints" && "hidden")}>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Hints are available in the Copilot panel →</p>
                  <button onClick={() => setCopilotOpen(true)} className="text-primary hover:underline">Open Learning Copilot</button>
                </div>
              </div>
              <div className={cn("h-full overflow-y-auto p-3 text-xs", bottomTab !== "activity" && "hidden")}>
                <ActivityPanel log={devLog} />
              </div>
              <div className={cn("h-full min-h-0", bottomTab !== "docs" && "hidden")}>
                <DocsPanel files={files} deps={deps} devLog={devLog} />
              </div>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="hidden lg:flex flex-col w-80 border-l border-border bg-card shrink-0">
          <Preview status={previewStatus} onRefresh={refreshPreview} />
        </div>

        <CopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
      </div>

      {/* Runtime status bar */}
      <StatusBar saveState={saveState} previewStatus={previewStatus} />

      {/* Modals */}
      {integrityOpen && <IntegrityModal onClose={() => setIntegrityOpen(false)} />}
      {pasteWarning && <PasteWarning data={pasteWarning} onClose={() => setPasteWarning(null)} />}

      {authorshipOpen && (
        <AuthorshipChallenge
          missionTitle={missionRequirements.title}
          onClose={() => setAuthorshipOpen(false)}
        />
      )}
    </div>
  );
}