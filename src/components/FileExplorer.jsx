import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown, ChevronRight, Folder, FolderOpen, FileCode,
  FilePlus2, FolderPlus, Pencil, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buildTree, parentDir } from "@/lib/fileTree";

const fileIconColor = {
  jsx: "text-primary",
  tsx: "text-primary",
  javascript: "text-warning",
  typescript: "text-primary",
  css: "text-chart-3",
  html: "text-warning",
  json: "text-warning",
  markdown: "text-muted-foreground",
  text: "text-muted-foreground",
};

export default function FileExplorer({
  files,
  folders,
  activePath,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}) {
  const tree = buildTree(files, folders);
  const [expanded, setExpanded] = useState(() => new Set(folders));
  const [creating, setCreating] = useState(null); // { parentPath, type }
  const [renaming, setRenaming] = useState(null); // { path }

  const toggle = (path) =>
    setExpanded((s) => {
      const next = new Set(s);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  const expand = (path) => setExpanded((s) => new Set(s).add(path));

  const cancel = () => {
    setCreating(null);
    setRenaming(null);
  };
  const startCreate = (parentPath, type) => {
    if (parentPath) expand(parentPath);
    setCreating({ parentPath, type });
    setRenaming(null);
  };
  const submitCreate = (name) => {
    if (creating && name.trim() && !name.includes("/")) {
      onCreate(creating.parentPath, creating.type, name.trim());
    }
    setCreating(null);
  };
  const submitRename = (name) => {
    if (renaming && name.trim() && !name.includes("/")) {
      onRename(renaming.path, name.trim());
    }
    setRenaming(null);
  };

  const selectedParent = activePath ? parentDir(activePath) : "";

  const ctx = {
    activePath,
    onSelect,
    creating,
    submitCreate,
    renaming,
    submitRename,
    expanded,
    toggle,
    startCreate,
    cancel,
    rename: (path) => {
      setRenaming({ path });
      setCreating(null);
    },
    remove: (path) => {
      if (folders.includes(path) && !window.confirm(`Delete "${path}" and everything inside it?`)) return;
      onDelete(path);
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 h-9 flex items-center justify-between border-b border-border shrink-0">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Explorer</span>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => startCreate(selectedParent, "file")}
            title="New file"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => startCreate(selectedParent, "folder")}
            title="New folder"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1 px-1">
        <Branch nodes={tree} folderPath="" depth={0} ctx={ctx} />
        {tree.length === 0 && !creating && (
          <p className="text-[11px] text-muted-foreground/60 px-2 py-3">No files. Use + to add one.</p>
        )}
      </div>
    </div>
  );
}

function Branch({ nodes, folderPath, depth, ctx }) {
  return (
    <div>
      {ctx.creating && ctx.creating.parentPath === folderPath && (
        <CreateRow depth={depth} type={ctx.creating.type} onSubmit={ctx.submitCreate} onCancel={ctx.cancel} />
      )}
      {nodes.map((node) => (
        <NodeRow key={node.path} node={node} depth={depth} ctx={ctx} />
      ))}
    </div>
  );
}

function NodeRow({ node, depth, ctx }) {
  const isOpen = ctx.expanded.has(node.path);
  const isRenaming = ctx.renaming && ctx.renaming.path === node.path;

  if (node.type === "folder") {
    return (
      <div>
        <div
          className="group flex items-center gap-1 w-full text-xs rounded text-muted-foreground hover:bg-muted/40"
          style={{ paddingLeft: depth * 12 + 4 }}
        >
          <div
            onClick={() => !isRenaming && ctx.toggle(node.path)}
            className="flex items-center gap-1.5 flex-1 py-1 min-w-0 cursor-pointer"
          >
            {isOpen ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
            {isOpen ? (
              <FolderOpen className="w-3.5 h-3.5 shrink-0 text-primary/80" />
            ) : (
              <Folder className="w-3.5 h-3.5 shrink-0 text-primary/80" />
            )}
            {isRenaming ? (
              <NameInput initial={node.name} onSubmit={ctx.submitRename} onCancel={ctx.cancel} />
            ) : (
              <span className="truncate text-foreground/90">{node.name}</span>
            )}
          </div>
          <RowActions
            onAddFile={() => ctx.startCreate(node.path, "file")}
            onAddFolder={() => ctx.startCreate(node.path, "folder")}
            onRename={() => ctx.rename(node.path)}
            onDelete={() => ctx.remove(node.path)}
          />
        </div>
        {isOpen && <Branch nodes={node.children} folderPath={node.path} depth={depth + 1} ctx={ctx} />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-1 w-full text-xs rounded",
        node.path === ctx.activePath ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/40"
      )}
      style={{ paddingLeft: depth * 12 + 8 }}
    >
      <div
        onClick={() => !isRenaming && ctx.onSelect(node.path)}
        className="flex items-center gap-1.5 flex-1 py-1 min-w-0 cursor-pointer"
      >
        <FileCode className={cn("w-3.5 h-3.5 shrink-0", fileIconColor[node.language] || "text-muted-foreground")} />
        {isRenaming ? (
          <NameInput initial={node.name} onSubmit={ctx.submitRename} onCancel={ctx.cancel} />
        ) : (
          <span className="truncate">{node.name}</span>
        )}
      </div>
      <RowActions onRename={() => ctx.rename(node.path)} onDelete={() => ctx.remove(node.path)} hideAdd />
    </div>
  );
}

function RowActions({ onAddFile = undefined, onAddFolder = undefined, onRename, onDelete, hideAdd = false }) {
  return (
    <div className="flex items-center gap-0.5 mr-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
      {!hideAdd && (
        <>
          <button onClick={onAddFile} title="New file here" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
            <FilePlus2 className="w-3 h-3" />
          </button>
          <button onClick={onAddFolder} title="New folder here" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
            <FolderPlus className="w-3 h-3" />
          </button>
        </>
      )}
      <button onClick={onRename} title="Rename" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
        <Pencil className="w-3 h-3" />
      </button>
      <button onClick={onDelete} title="Delete" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive">
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

function CreateRow({ depth, type, onSubmit, onCancel }) {
  return (
    <div className="flex items-center gap-1.5 py-1" style={{ paddingLeft: depth * 12 + 8 }}>
      {type === "folder" ? (
        <Folder className="w-3.5 h-3.5 shrink-0 text-primary/80" />
      ) : (
        <FileCode className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
      )}
      <NameInput
        initial=""
        placeholder={type === "folder" ? "folder name" : "file name (e.g. App.jsx)"}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}

function NameInput({ initial, placeholder = "", onSubmit, onCancel }) {
  const [value, setValue] = useState(initial || "");
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  return (
    <input
      ref={ref}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit(value);
        } else if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      onBlur={() => (value.trim() ? onSubmit(value) : onCancel())}
      className="flex-1 min-w-0 h-5 px-1 rounded bg-background border border-primary/50 text-xs text-foreground outline-none"
    />
  );
}