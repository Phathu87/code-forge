// Helpers for the Code Lab file explorer: tree building, path utils, language detection.

export function parentDir(path) {
  const parts = path.split("/");
  parts.pop();
  return parts.join("/");
}

export function extToLang(name) {
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  return (
    {
      jsx: "jsx",
      tsx: "tsx",
      js: "javascript",
      mjs: "javascript",
      cjs: "javascript",
      ts: "typescript",
      json: "json",
      css: "css",
      scss: "css",
      html: "html",
      md: "markdown",
      txt: "text",
    }[ext] || "text"
  );
}

export function folderAncestors(folderPath) {
  const parts = folderPath.split("/").filter(Boolean);
  const list = [];
  let acc = "";
  parts.forEach((p) => {
    acc = acc ? `${acc}/${p}` : p;
    list.push(acc);
  });
  return list;
}

export function addFolderPaths(folders, folderPath) {
  const set = new Set(folders);
  folderAncestors(folderPath).forEach((p) => set.add(p));
  return Array.from(set);
}

export function initialFolders(files) {
  const set = new Set();
  files.forEach((f) => {
    const parts = f.path.split("/");
    parts.pop();
    let acc = "";
    parts.forEach((p) => {
      acc = acc ? `${acc}/${p}` : p;
      set.add(acc);
    });
  });
  return Array.from(set);
}

export function buildTree(files, folders) {
  const root = [];
  const map = {};

  const ensureFolder = (path) => {
    if (map[path]) return map[path];
    const parts = path.split("/");
    const name = parts.pop();
    const parentPath = parts.join("/");
    const node = { name, path, type: "folder", children: [] };
    map[path] = node;
    if (parentPath === "") root.push(node);
    else ensureFolder(parentPath).children.push(node);
    return node;
  };

  new Set(folders).forEach(ensureFolder);

  files.forEach((f) => {
    const parts = f.path.split("/");
    const name = parts.pop();
    const parentPath = parts.join("/");
    const fileNode = {
      name,
      path: f.path,
      type: "file",
      language: f.language,
      content: f.content,
    };
    if (parentPath === "") root.push(fileNode);
    else ensureFolder(parentPath).children.push(fileNode);
  });

  const sort = (nodes) => {
    nodes.sort((a, b) =>
      a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1
    );
    nodes.forEach((n) => n.type === "folder" && sort(n.children));
  };
  sort(root);
  return root;
}