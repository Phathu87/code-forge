// Centralised mock data for the developer-learning platform prototype.

export const navItems = [
  { label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard", status: "active" },
  { label: "Learn", icon: "BookOpen", path: "/learn", status: "active" },
  { label: "Roadmap", icon: "Route", path: "/roadmap", status: "active" },
  { label: "Missions", icon: "Target", path: "/missions", status: "active" },
  { label: "Code Lab", icon: "Code2", path: "/code-lab", status: "active" },
  { label: "Projects", icon: "FolderGit2", path: "/projects", status: "active" },
  { label: "Portfolio", icon: "Briefcase", path: "/portfolio", status: "active" },
  { label: "Skills", icon: "TrendingUp", path: "/skills", status: "active" },
  { label: "Achievements", icon: "Award", path: "/achievements", status: "active" },
  { label: "Certificates", icon: "BadgeCheck", path: "/certificates", status: "active" },
  { label: "Leaderboard", icon: "Trophy", path: "/leaderboard", status: "active" },
  { label: "Community", icon: "Users", path: "/community", status: "active" },
  { label: "Integrity", icon: "ShieldCheck", path: "/integrity", status: "active" },
  { label: "Settings", icon: "Settings", path: "/settings", status: "active" },
  { label: "Notifications", icon: "Bell", path: "/notifications", status: "active" },
  { label: "Admin", icon: "UserCog", path: "/admin", status: "active" },
];

export const userProfile = {
  name: "Phathu Rakhunwana",
  role: "Frontend Developer",
  level: 8,
  levelTitle: "Builder",
  xp: 4820,
  xpToNext: 6000,
  streak: 12,
  avatarInitials: "PR",
};

export const skillProgress = [
  { name: "JavaScript", level: 91, competency: "Advanced" },
  { name: "React", level: 82, competency: "Advanced" },
  { name: "Context API", level: 74, competency: "Competent" },
  { name: "REST APIs", level: 64, competency: "Competent" },
  { name: "Testing", level: 42, competency: "Foundation" },
];

export const continueLearning = {
  path: "React Frontend Developer",
  mission: "React State Management",
  progress: 78,
};

export const dailyMission = {
  title: "Fix a broken React form state update",
  level: "Intermediate",
  xp: 120,
  estimated: "20 min",
};

export const recommendedMission = {
  title: "Fetch & render user data from an API",
  reason: "You struggled with async JavaScript in your last two missions. Try this API challenge next.",
  level: "Intermediate",
  xp: 450,
};

export const recentProjects = [
  { name: "Expense Tracker", tech: ["React", "Context API", "Chart.js"], progress: 100, verified: true },
  { name: "Weather Dashboard", tech: ["React", "REST APIs"], progress: 60, verified: false },
  { name: "Task Board", tech: ["JavaScript", "DOM"], progress: 100, verified: true },
];

export const missionCategories = [
  "Bug Fixes", "Build From Scratch", "Real Client Scenario", "Refactoring",
  "API Integration", "UI Challenge", "Accessibility", "Performance",
  "Authentication", "Database Logic", "Debugging", "Algorithms", "Testing", "Deployment",
];

export const levelFilters = ["Beginner", "Intermediate", "Expert", "Specialist"];
export const statusFilters = ["Not started", "In progress", "Completed", "Locked"];

export const missions = [
  {
    id: "m1",
    title: "Shared Preferences",
    brief: "Build a React interface that lets the user switch their favourite programming language while sharing that preference across components.",
    category: "Build From Scratch",
    level: "Beginner",
    xp: 200,
    technologies: ["React", "useState", "createContext"],
    skills: ["useState", "Context.Provider", "useContext", "Event handling"],
    estimated: "1–2 hours",
    status: "In progress",
    progress: 40,
    verified: true,
    origin: true,
  },
  {
    id: "m2",
    title: "Build an Expense Tracker",
    brief: "Create an expense tracker that lets users add, filter and summarise transactions using React state and array methods.",
    category: "Build From Scratch",
    level: "Intermediate",
    xp: 750,
    technologies: ["React", "State Management", "Forms"],
    skills: ["State Management", "Forms", "Array Methods"],
    estimated: "2–3 hours",
    status: "In progress",
    progress: 78,
    verified: true,
  },
  {
    id: "m3",
    title: "Fix a broken React form state update",
    brief: "A controlled form updates state incorrectly. Diagnose the bug and repair the state flow without rewriting the component.",
    category: "Bug Fixes",
    level: "Intermediate",
    xp: 120,
    technologies: ["React"],
    skills: ["State Management", "Debugging"],
    estimated: "20 min",
    status: "Not started",
    progress: 0,
    verified: false,
  },
  {
    id: "m4",
    title: "Fetch & render user data from an API",
    brief: "Fetch a list of users from a REST endpoint, handle loading and error states, and render the data responsively.",
    category: "API Integration",
    level: "Intermediate",
    xp: 450,
    technologies: ["React", "REST APIs"],
    skills: ["Async", "Effects", "Error handling"],
    estimated: "1–2 hours",
    status: "Not started",
    progress: 0,
    verified: true,
  },
  {
    id: "m5",
    title: "Refactor a poorly structured React app",
    brief: "Inherit a tangled component with prop drilling and duplicated logic. Restructure it into maintainable, reusable pieces.",
    category: "Refactoring",
    level: "Expert",
    xp: 900,
    technologies: ["React", "Context API"],
    skills: ["Architecture", "Component structure"],
    estimated: "3–4 hours",
    status: "Locked",
    progress: 0,
    verified: true,
  },
  {
    id: "m6",
    title: "WooCommerce store performance rescue",
    brief: "You inherited a WooCommerce store with 12,000 products and severe frontend performance problems. Diagnose and improve the experience.",
    category: "Real Client Scenario",
    level: "Specialist",
    xp: 1200,
    technologies: ["WordPress", "Performance"],
    skills: ["Performance", "Debugging", "Professional judgement"],
    estimated: "4–6 hours",
    status: "Locked",
    progress: 0,
    verified: true,
  },
  {
    id: "m7",
    title: "Accessible navigation menu",
    brief: "Build a keyboard-navigable, screen-reader friendly dropdown menu that follows WAI-ARIA patterns.",
    category: "Accessibility",
    level: "Intermediate",
    xp: 350,
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: ["Accessibility", "Keyboard nav", "ARIA"],
    estimated: "1–2 hours",
    status: "Not started",
    progress: 0,
    verified: true,
  },
  {
    id: "m8",
    title: "Tip calculator",
    brief: "Build a tip calculator that splits a bill between people. A small, real utility — not a Hello World.",
    category: "Build From Scratch",
    level: "Beginner",
    xp: 150,
    technologies: ["JavaScript", "HTML", "CSS"],
    skills: ["State", "Events", "Forms"],
    estimated: "45 min",
    status: "Completed",
    progress: 100,
    verified: false,
  },
];

// ---- Code Lab mock files (Shared Preferences mission) ----
export const codeFiles = [
  {
    name: "App.jsx",
    path: "src/App.jsx",
    language: "jsx",
    content: `import React, { useState, useContext } from "react";
import { LanguageProvider, LanguageContext } from "./context/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";
import PreferenceDisplay from "./components/PreferenceDisplay";

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <h1>Programming Language Toggle</h1>
        <LanguageSelector />
        <PreferenceDisplay />
      </div>
    </LanguageProvider>
  );
}

export default App;`,
  },
  {
    name: "LanguageContext.jsx",
    path: "src/context/LanguageContext.jsx",
    language: "jsx",
    content: `import React, { createContext, useState } from "react";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("JavaScript");

  // TODO: persist preference across reloads
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}`,
  },
  {
    name: "LanguageSelector.jsx",
    path: "src/components/LanguageSelector.jsx",
    language: "jsx",
    content: `import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="selector">
      <button
        onClick={() => setLanguage("JavaScript")}
        data-active={language === "JavaScript"}
      >
        JavaScript
      </button>
      <button
        onClick={() => setLanguage("Python")}
        data-active={language === "Python"}
      >
        Python
      </button>
      {/* TODO: add a third language */}
    </div>
  );
}`,
  },
  {
    name: "PreferenceDisplay.jsx",
    path: "src/components/PreferenceDisplay.jsx",
    language: "jsx",
    content: `import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function PreferenceDisplay() {
  const { language } = useContext(LanguageContext);

  return (
    <p className="display">
      Favourite programming language: 🎯 {language}
    </p>
  );
}`,
  },
];

export const fileTree = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "App.jsx", type: "file", path: "src/App.jsx" },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "LanguageSelector.jsx", type: "file", path: "src/components/LanguageSelector.jsx" },
          { name: "PreferenceDisplay.jsx", type: "file", path: "src/components/PreferenceDisplay.jsx" },
        ],
      },
      {
        name: "context",
        type: "folder",
        children: [
          { name: "LanguageContext.jsx", type: "file", path: "src/context/LanguageContext.jsx" },
        ],
      },
      { name: "styles.css", type: "file", path: "src/styles.css" },
    ],
  },
];

export const missionRequirements = {
  title: "Shared Preferences",
  tasks: [
    { label: "Render language toggle buttons", done: true },
    { label: "Share preference across components via Context", done: true },
    { label: "Persist preference after page reload", done: false },
    { label: "Add a third language (TypeScript or PHP)", done: false },
  ],
  concepts: ["React state", "createContext", "Context.Provider", "useContext", "Event handling"],
};

export const missionTests = [
  { name: "Application renders", status: "pass" },
  { name: "Toggle updates displayed language", status: "pass" },
  { name: "Preference persists across reload", status: "fail" },
  { name: "Third language selectable", status: "hidden" },
];

// ---- Code Lab workspace ----
export const projectMeta = {
  name: "shared-preferences",
  workspace: "~/projects/shared-preferences",
  runtime: "Node.js 22",
  memory: { used: 146, total: 512 },
  cpu: "Normal",
  storage: { used: 26, total: 500 },
  previewUrl: "sandbox.codeforge.dev/missions/shared-preferences",
};

export const initialDependencies = [
  { name: "react", version: "18.2.0" },
  { name: "react-dom", version: "18.2.0" },
];

export const dependencyVersions = {
  react: "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.26.0",
};

export const missionDependencyPolicy = {
  allowed: ["react", "react-dom", "react-router-dom"],
  note: "Verified mission policy — only approved dependencies may be installed.",
};

export const codeProblems = [
  { severity: "warning", file: "src/context/LanguageContext.jsx", line: 8, message: "Preference is not persisted — mission requirement not met yet." },
  { severity: "info", file: "src/components/LanguageSelector.jsx", line: 18, message: "TODO: add a third language to the selector." },
  { severity: "warning", file: "src/styles.css", line: 1, message: "Stylesheet is not imported by any component." },
];

export const copilotHints = {
  1: {
    label: "Nudge",
    text: "What value should the Context hold after the page reloads? Where could that value be saved before the app closes?",
  },
  2: {
    label: "Concept",
    text: "Persistence means writing state somewhere outside React — like localStorage — and reading it back when the provider initialises.",
  },
  3: {
    label: "Direction",
    text: "Look at the initial state in LanguageProvider. Try reading from localStorage in a lazy useState initializer, then writing to it inside setLanguage.",
  },
};

export const integrityStatus = {
  originalityMonitoring: "Active",
  codeHistory: "Active",
  pasteProtection: "Active",
  aiAssistanceAnalysis: "Active",
  assessmentRules: "Strict",
};

export const developmentTimeline = [
  { time: "09:03", event: "Mission started" },
  { time: "09:08", event: "Created LanguageContext" },
  { time: "09:14", event: "Added useState for language" },
  { time: "09:19", event: "First test run" },
  { time: "09:21", event: "Test failed — persistence" },
  { time: "09:27", event: "Updated state logic" },
  { time: "09:31", event: "Test passed — toggle" },
];

export const technologies = {
  Languages: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "C#", "C", "C++", "Go", "Rust", "Ruby", "Kotlin", "Swift", "Dart", "SQL", "Bash", "HTML", "CSS"],
  Frontend: ["React", "Vue", "Angular", "Next.js", "Nuxt", "Svelte", "Tailwind CSS", "Bootstrap", "Sass"],
  Backend: ["Node.js", "Express", "Laravel", "Django", "Flask", "FastAPI", "Spring Boot", "ASP.NET", "Ruby on Rails"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Supabase", "Firebase"],
  "CMS / Web Platforms": ["WordPress", "WooCommerce", "Shopify", "Webflow"],
  "Other Skills": ["Git", "GitHub", "REST APIs", "GraphQL", "Docker", "CI/CD", "Testing", "Accessibility", "SEO", "Performance", "UI architecture", "Cloud fundamentals"],
};

// ---- Onboarding wizard ----
export const experienceOptions = [
  { id: "never", label: "I have never coded", desc: "Starting completely from scratch" },
  { id: "beginner", label: "Beginner", desc: "I know some basics — variables, loops, simple pages" },
  { id: "intermediate", label: "Intermediate", desc: "I can build small projects with guidance" },
  { id: "advanced", label: "Advanced", desc: "I build independently and understand architecture" },
  { id: "professional", label: "Professional developer", desc: "I code for a living — here to prove and expand skills" },
];

export const goalOptions = [
  "Build websites",
  "Become a frontend developer",
  "Become a backend developer",
  "Become a full-stack developer",
  "Build mobile apps",
  "Learn automation",
  "Build APIs",
  "Learn WordPress development",
  "Improve existing skills",
  "Prepare for developer interviews",
];

export const commitmentOptions = [
  { hours: 2, label: "2 hours", desc: "Casual — weekends and evenings" },
  { hours: 5, label: "5 hours", desc: "Steady — most weekdays" },
  { hours: 10, label: "10 hours", desc: "Serious — daily practice" },
  { hours: 15, label: "15+ hours", desc: "Intensive — career switch pace" },
];

export const roadmapModules = [
  { name: "JavaScript Foundations", status: "done", xp: 400, skills: ["Variables", "Functions", "Arrays", "Objects", "DOM"], missions: 6, duration: "2 weeks" },
  { name: "DOM & Browser APIs", status: "done", xp: 350, skills: ["Events", "Selectors", "Storage"], missions: 4, duration: "1 week" },
  { name: "React Fundamentals", status: "current", xp: 500, skills: ["JSX", "Components", "Props", "Rendering"], missions: 7, duration: "2 weeks", focus: true },
  { name: "React State", status: "todo", xp: 450, skills: ["useState", "useEffect", "Lifting state"], missions: 5, duration: "2 weeks" },
  { name: "Context API", status: "todo", xp: 400, skills: ["createContext", "Provider", "useContext"], missions: 4, duration: "1 week" },
  { name: "Forms & Validation", status: "todo", xp: 450, skills: ["Controlled inputs", "Validation", "Errors"], missions: 5, duration: "2 weeks" },
  { name: "APIs", status: "todo", xp: 500, skills: ["Fetch", "Async/await", "Loading states", "Error handling"], missions: 6, duration: "2 weeks" },
  { name: "Routing", status: "todo", xp: 400, skills: ["React Router", "Params", "Navigation"], missions: 4, duration: "1 week" },
  { name: "Testing", status: "todo", xp: 450, skills: ["Unit tests", "Mocking", "Coverage"], missions: 5, duration: "2 weeks" },
  { name: "Production Project", status: "todo", xp: 900, skills: ["Architecture", "Deployment", "Performance"], missions: 1, duration: "3 weeks", capstone: true },
];

// ---- Achievements & certificates ----
export const achievements = [
  { name: "First Build", desc: "Complete your first application.", icon: "Rocket", rarity: "Common", earned: true, earnedDate: "18 Jul 2026" },
  { name: "Debugger", desc: "Fix 25 bugs without requesting the final answer.", icon: "Bug", rarity: "Rare", earned: true, earnedDate: "22 Aug 2026" },
  { name: "Seven Day Streak", desc: "Code for seven consecutive days.", icon: "Flame", rarity: "Common", earned: true, earnedDate: "24 Aug 2026" },
  { name: "API Explorer", desc: "Complete five API missions.", icon: "Globe", rarity: "Rare", earned: true, earnedDate: "30 Aug 2026" },
  { name: "React Builder", desc: "Complete ten React missions.", icon: "Code2", rarity: "Rare", earned: false, progress: "7/10" },
  { name: "No Shortcut", desc: "Complete an advanced project without using Level 3 hints.", icon: "ShieldCheck", rarity: "Epic", earned: false },
  { name: "Accessibility Advocate", desc: "Pass five accessibility missions.", icon: "Accessibility", rarity: "Rare", earned: false, progress: "3/5" },
  { name: "Production Ready", desc: "Deploy five verified applications.", icon: "Server", rarity: "Legendary", earned: false, progress: "1/5" },
];

export const certificates = [
  { name: "JavaScript Foundations", id: "DEV-JS-2026-00112", issued: "12 Jul 2026", verified: true },
  { name: "React Developer – Foundation", id: "DEV-REACT-2026-00482", issued: "28 Aug 2026", verified: true },
  { name: "Advanced React Specialist", id: null, issued: null, verified: false, progress: 67, note: "8/12 missions · 2 projects" },
];

// ---- Detailed skills (Skills page) ----
export const detailedSkills = [
  { name: "JavaScript", level: "Advanced", category: "Languages", missions: 18, projects: 7, tests: 112, lastVerified: "2 weeks ago", weakArea: "Async patterns", nextMission: "Build a rate-limited API client" },
  { name: "React", level: "Advanced", category: "Frontend", missions: 14, projects: 6, tests: 82, lastVerified: "2 weeks ago", weakArea: "Performance optimisation", nextMission: "Optimise a large React dashboard" },
  { name: "Context API", level: "Competent", category: "Frontend", missions: 8, projects: 4, tests: 34, lastVerified: "1 week ago", weakArea: null, nextMission: "Persist global preferences with a custom hook" },
  { name: "TypeScript", level: "Competent", category: "Languages", missions: 8, projects: 3, tests: 41, lastVerified: "3 weeks ago", weakArea: "Generics", nextMission: "Type a dynamic form builder" },
  { name: "REST APIs", level: "Competent", category: "Other Skills", missions: 9, projects: 4, tests: 47, lastVerified: "10 days ago", weakArea: "Error handling", nextMission: "Fetch & render user data from an API" },
  { name: "HTML", level: "Expert", category: "Languages", missions: 12, projects: 8, tests: 66, lastVerified: "1 month ago", weakArea: null, nextMission: "Semantic markup for a marketing site" },
  { name: "CSS", level: "Advanced", category: "Frontend", missions: 15, projects: 8, tests: 71, lastVerified: "3 weeks ago", weakArea: "Animations", nextMission: "Responsive landing page from a client brief" },
  { name: "Testing", level: "Foundation", category: "Other Skills", missions: 4, projects: 1, tests: 18, lastVerified: "1 week ago", weakArea: "Mocking", nextMission: "Write your first component tests" },
  { name: "Node.js", level: "Learning", category: "Backend", missions: 2, projects: 0, tests: 6, lastVerified: "5 days ago", weakArea: "Async flow", nextMission: "Build a JSON file-based API" },
];

// ---- Public portfolio ----
export const portfolioStats = { projects: 6, verifiedSkills: 14, certificates: 2 };

export const portfolioProjects = [
  { name: "Expense Management Dashboard", problem: "Track and visualise monthly spending across categories.", tech: ["React", "Context API", "REST APIs", "Chart.js"], skills: ["State management", "Component architecture", "API integration", "Responsive layout", "Data visualisation"], tests: "24 / 24", status: "Verified" },
  { name: "Task Board", problem: "Kanban-style task manager with drag-and-drop columns.", tech: ["JavaScript", "DOM", "LocalStorage"], skills: ["Event handling", "Data persistence", "Component structure"], tests: "18 / 18", status: "Verified" },
  { name: "Language Toggle", problem: "Share a favourite-language preference across components — the project that started it all.", tech: ["React", "Context API"], skills: ["useState", "Context.Provider", "useContext"], tests: "9 / 9", status: "Verified", origin: true },
  { name: "Weather Dashboard", problem: "Five-day forecast with geolocation and unit switching.", tech: ["React", "REST APIs"], skills: ["API integration", "Loading states", "Error handling"], tests: "11 / 14", status: "In progress" },
];

export const portfolioSkills = [
  { name: "React", level: "Advanced", evidence: "14 missions · 6 projects · 82 tests" },
  { name: "JavaScript", level: "Advanced", evidence: "18 missions · 7 projects · 112 tests" },
  { name: "HTML", level: "Expert", evidence: "12 missions · 8 projects · 66 tests" },
  { name: "Context API", level: "Competent", evidence: "8 missions · 4 projects · 34 tests" },
  { name: "TypeScript", level: "Competent", evidence: "8 missions · 3 projects · 41 tests" },
  { name: "REST APIs", level: "Competent", evidence: "9 missions · 4 projects · 47 tests" },
  { name: "Testing", level: "Foundation", evidence: "4 missions · 1 project · 18 tests" },
];

export const portfolioActivity = [
  { date: "5 Sep 2026", text: "Completed mission: Fetch & render user data from an API (+450 XP)", type: "mission" },
  { date: "30 Aug 2026", text: "Earned achievement: API Explorer", type: "badge" },
  { date: "28 Aug 2026", text: "Certificate issued: React Developer – Foundation", type: "certificate" },
  { date: "24 Aug 2026", text: "7-day streak reached (+300 XP)", type: "streak" },
  { date: "22 Aug 2026", text: "Earned achievement: Debugger", type: "badge" },
  { date: "18 Jul 2026", text: "First mission completed: Tip calculator (+150 XP)", type: "mission" },
];

// ---- Learning paths (Learn page) ----
export const learningPaths = [
  { id: "p1", name: "React Frontend Developer", level: "Beginner → Intermediate", modules: 10, hours: 160, weeks: 14, xp: 4950, outcome: "Job-ready React frontend developer", progress: 20, status: "In progress", tech: ["JavaScript", "React", "Context API", "REST APIs", "Testing"] },
  { id: "p2", name: "WordPress Developer", level: "Beginner → Specialist", modules: 12, hours: 180, weeks: 16, xp: 5200, outcome: "Professional WordPress & WooCommerce developer", progress: 0, status: "Available", tech: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"] },
  { id: "p3", name: "Full-Stack JavaScript", level: "Intermediate → Advanced", modules: 14, hours: 220, weeks: 20, xp: 7800, outcome: "Full-stack JS developer (Node + React)", progress: 0, status: "Available", tech: ["JavaScript", "React", "Node.js", "Express", "REST APIs"] },
  { id: "p4", name: "Backend APIs with Node.js", level: "Beginner → Intermediate", modules: 8, hours: 120, weeks: 10, xp: 3600, outcome: "Backend API developer", progress: 0, status: "Locked", lockReason: "Complete JavaScript Foundations first", tech: ["Node.js", "Express", "REST APIs", "Databases"] },
];

// ---- Projects dashboard ----
export const projectFilters = ["All", "Verified", "In progress", "Draft"];
export const projects = [
  { id: "pr1", name: "Expense Management Dashboard", status: "Verified", progress: 100, tech: ["React", "Context API", "REST APIs", "Chart.js"], skills: ["State management", "API integration", "Data visualisation"], tests: "24 / 24", updated: "2 weeks ago", inPortfolio: true },
  { id: "pr2", name: "Task Board", status: "Verified", progress: 100, tech: ["JavaScript", "DOM", "LocalStorage"], skills: ["Event handling", "Data persistence"], tests: "18 / 18", updated: "3 weeks ago", inPortfolio: true },
  { id: "pr3", name: "Language Toggle", status: "Verified", progress: 100, tech: ["React", "Context API"], skills: ["useState", "Context.Provider"], tests: "9 / 9", updated: "1 month ago", inPortfolio: true, origin: true },
  { id: "pr4", name: "Weather Dashboard", status: "In progress", progress: 60, tech: ["React", "REST APIs"], skills: ["API integration", "Loading states"], tests: "11 / 14", updated: "5 days ago", inPortfolio: false },
  { id: "pr5", name: "Markdown Note App", status: "Draft", progress: 10, tech: ["React", "TypeScript"], skills: ["State", "Forms"], tests: "0 / 8", updated: "yesterday", inPortfolio: false },
];

// ---- Leaderboard ----
export const leaderboardPeriods = ["This week", "This month", "All time"];
export const yourRank = { rank: 7, percentile: 8, change: 2 };
export const leaderboard = [
  { rank: 1, name: "Liam Nkosi", xp: 18420, level: 22, levelTitle: "Specialist", streak: 47, avatar: "LN" },
  { rank: 2, name: "Priya Sharma", xp: 16780, level: 20, levelTitle: "Specialist", streak: 31, avatar: "PS" },
  { rank: 3, name: "Marco Bianchi", xp: 15210, level: 19, levelTitle: "Expert", streak: 22, avatar: "MB" },
  { rank: 4, name: "Aisha Khan", xp: 12450, level: 17, levelTitle: "Expert", streak: 18, avatar: "AK" },
  { rank: 5, name: "Tom Wilson", xp: 9870, level: 14, levelTitle: "Advanced", streak: 12, avatar: "TW" },
  { rank: 6, name: "Elena Rossi", xp: 6240, level: 10, levelTitle: "Competent", streak: 9, avatar: "ER" },
  { rank: 7, name: "Phathu Rakhunwana", xp: 4820, level: 8, levelTitle: "Builder", streak: 12, avatar: "PR", you: true },
  { rank: 8, name: "Diego Santos", xp: 4510, level: 8, levelTitle: "Builder", streak: 5, avatar: "DS" },
  { rank: 9, name: "Mei Lin", xp: 3980, level: 7, levelTitle: "Builder", streak: 3, avatar: "ML" },
  { rank: 10, name: "Omar Farouk", xp: 3420, level: 6, levelTitle: "Foundation", streak: 1, avatar: "OF" },
];

// ---- Community ----
export const communityStats = { members: 12480, online: 312, activeToday: 1184 };
export const communityChannels = [
  { name: "JavaScript", members: 5600, color: "success" },
  { name: "React", members: 4200, color: "primary" },
  { name: "CSS", members: 2400, color: "chart-3" },
  { name: "WordPress", members: 2100, color: "warning" },
  { name: "Node.js", members: 1800, color: "accent" },
  { name: "Career", members: 1500, color: "chart-5" },
];
export const communityThreads = [
  { id: "t1", author: "Liam Nkosi", avatar: "LN", title: "How do you structure Context for a large app without prop-drilling?", channel: "React", replies: 14, likes: 32, time: "2h ago", solved: true, pinned: true },
  { id: "t2", author: "Priya Sharma", avatar: "PS", title: "WooCommerce: caching product queries without a plugin?", channel: "WordPress", replies: 8, likes: 21, time: "5h ago", solved: false, pinned: false },
  { id: "t3", author: "Marco Bianchi", avatar: "MB", title: "useState vs useReducer — when does the switch actually make sense?", channel: "React", replies: 23, likes: 41, time: "8h ago", solved: true, pinned: false },
  { id: "t4", author: "Aisha Khan", avatar: "AK", title: "Land your first dev job: portfolio tips from a recent hire", channel: "Career", replies: 19, likes: 58, time: "1d ago", solved: false, pinned: false },
];
export const studyGroups = [
  { name: "React beginners — September cohort", members: 24, capacity: 30, lead: "Aisha K.", meets: "Tue 7pm SAST" },
  { name: "WordPress builders club", members: 18, capacity: 25, lead: "Marco B.", meets: "Thu 6pm SAST" },
  { name: "Daily algorithm grind", members: 42, capacity: 50, lead: "Liam N.", meets: "Every day 8pm" },
];

// ---- Integrity suite ----
export const integritySignals = {
  aiRiskScore: 12,
  codeSimilarity: { score: 8, topMatch: "Public gist — localStorage helper (23%)" },
  authorshipConsistency: { score: 88, keystrokeVariance: "Consistent with learner history" },
  pasteEvents: 0,
  hintsUsed: 1,
  originality: 94,
  verificationChallenge: { status: "passed", score: 92 },
};

export const verificationChallenges = [
  { type: "explain", label: "Explain", prompt: "In your own words: what value does LanguageContext provide, and which component reads it?", placeholder: "Explain what your context holds and where it's consumed…" },
  { type: "modify", label: "Modify", prompt: "Add a third language (TypeScript) to the selector without losing the persisted preference.", placeholder: "Describe the change you'd make, or paste the updated snippet…" },
  { type: "debug", label: "Debug", prompt: "If the preference resets on reload, where would you look first — and why?", placeholder: "Explain your debugging approach…" },
];

export const flaggedSubmissions = [
  {
    id: "SUB-2041", learner: "Diego Santos", avatar: "DS", mission: "Refactor a poorly structured React app",
    submitted: "3h ago", aiRisk: 78, similarity: 64, authorship: 41, pasteEvents: 3, status: "Flagged",
    signals: ["High AI-likelihood (78%)", "Code matches public gist (64%)", "Erratic keystroke pattern"],
    appealReason: null,
  },
  {
    id: "SUB-2038", learner: "Mei Lin", avatar: "ML", mission: "Fetch & render user data from an API",
    submitted: "6h ago", aiRisk: 22, similarity: 12, authorship: 81, pasteEvents: 0, status: "Under review",
    signals: ["Authorship challenge pending", "AI-risk low, similarity nominal"],
    appealReason: null,
  },
  {
    id: "SUB-2030", learner: "Elena Rossi", avatar: "ER", mission: "Build an Expense Tracker",
    submitted: "2d ago", aiRisk: 54, similarity: 38, authorship: 55, pasteEvents: 2, status: "Appealed",
    signals: ["AI-likelihood elevated (54%)", "Moderate similarity (38%)"],
    appealReason: "I used a public chart helper for the data viz but wrote all the React state and API logic myself. Please re-check my authorship challenge and commit history.",
  },
  {
    id: "SUB-2035", learner: "Omar Farouk", avatar: "OF", mission: "Accessible navigation menu",
    submitted: "1d ago", aiRisk: 9, similarity: 6, authorship: 92, pasteEvents: 0, status: "Cleared",
    signals: ["All signals nominal", "Authorship verified (92%)"],
    appealReason: null,
  },
];

export const integrityStatusFilters = ["All", "Flagged", "Under review", "Appealed", "Cleared"];

// ---- GitHub import (mock) ----
export const githubRepos = [
  { name: "expense-dashboard", desc: "React + Context API expense tracker with charts.", language: "JavaScript", stars: 14, tests: "24 / 24", tech: ["React", "Context API", "REST APIs", "Chart.js"] },
  { name: "kanban-task-board", desc: "Vanilla JS drag-and-drop task board with persistence.", language: "JavaScript", stars: 8, tests: "18 / 18", tech: ["JavaScript", "DOM", "LocalStorage"] },
  { name: "weather-forecast", desc: "Five-day forecast with geolocation and unit switching.", language: "JavaScript", stars: 5, tests: "11 / 14", tech: ["React", "REST APIs"] },
  { name: "markdown-notes", desc: "Offline markdown note app with local save.", language: "TypeScript", stars: 3, tests: "0 / 8", tech: ["React", "TypeScript"] },
];