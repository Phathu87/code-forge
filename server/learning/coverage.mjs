// Explicit curriculum-to-competency mappings. These become published reviewer gates,
// not automatic credit for merely opening a module or submitting source.
export const coverage = {
  "web-how-it-works": { "Frontend Development": ["browser fundamentals"] },
  "html-core": { "Frontend Development": ["semantic HTML"] },
  "css-core": { "Frontend Development": ["CSS"] },
  "responsive-web": { "Frontend Development": ["responsive design"] },
  "accessibility-foundations": { "Frontend Development": ["accessibility"] },
  "browser-devtools": { "Frontend Development": ["debugging"] },
  "javascript-programming-basics": {
    JavaScript: ["values/types", "variables", "operators"],
  },
  "javascript-conditions": { JavaScript: ["conditions"] },
  "javascript-functions": { JavaScript: ["functions", "scope"] },
  "javascript-data-collections": { JavaScript: ["arrays", "objects", "loops"] },
  "javascript-debugging-foundations": { JavaScript: ["debugging"] },
  "javascript-dom": { JavaScript: ["DOM"] },
  "javascript-events": { JavaScript: ["events"] },
  "javascript-forms-validation": { JavaScript: ["forms"] },
  "javascript-array-transformations": {
    JavaScript: ["array transformations", "immutability"],
  },
  "javascript-browser-storage": {
    JavaScript: ["JSON", "persistence"],
    "Frontend Development": ["JavaScript"],
  },
  "git-foundations": { "Frontend Development": ["Git"] },
  "javascript-modules": { JavaScript: ["modules"] },
  "javascript-async": { JavaScript: ["async", "promises", "errors"] },
  "http-rest-apis": {
    JavaScript: ["fetch", "HTTP"],
    "Frontend Development": ["API integration"],
  },
  "javascript-advanced": {
    JavaScript: [
      "closures",
      "prototypes",
      "classes versus composition",
      "event loop",
      "cancellation",
      "concurrency",
      "performance",
      "architecture",
    ],
  },
  "react-beginner": {
    React: [
      "JSX",
      "components",
      "props",
      "events",
      "state",
      "conditional rendering",
      "lists/keys",
    ],
  },
  "react-state-composition": { React: ["state ownership", "composition"] },
  "react-forms-effects": { React: ["forms", "effects", "hooks"] },
  "react-context": { React: ["Context", "persistence"] },
  "react-routing": { React: ["routing"], "Frontend Development": ["React"] },
  "testing-foundations": {
    JavaScript: ["testing"],
    "Frontend Development": ["testing"],
  },
  "react-application-development": {
    React: [
      "data fetching",
      "API states",
      "reducers",
      "validation",
      "component testing",
    ],
    "Frontend Development": ["forms and state"],
  },
  "react-advanced-architecture": {
    React: [
      "architecture",
      "provider boundaries",
      "lazy loading",
      "error boundaries",
      "complex forms",
    ],
    "Frontend Development": ["architecture"],
  },
  "accessible-components": { React: ["accessibility"] },
  "frontend-performance": {
    React: ["profiling", "memoization judgement"],
    "Frontend Development": ["performance"],
  },
  "testing-strategy": {
    React: ["test strategy"],
    "Frontend Development": ["API reliability", "integration testing"],
  },
  "frontend-security": { "Frontend Development": ["security"] },
  "deployment-fundamentals": {
    "Frontend Development": ["deployment", "recovery", "documentation"],
  },
  "professional-frontend": {
    JavaScript: [
      "unfamiliar-code debugging",
      "maintainability",
      "reliability",
      "review",
      "requirement changes",
    ],
    React: [
      "production debugging",
      "prioritization",
      "maintainability",
      "technical explanation",
      "modification",
    ],
    "Frontend Development": ["client briefs", "review", "capstone"],
  },
  "react-specialist": {
    React: [
      "unfamiliar codebase",
      "deep mental model",
      "architecture judgement",
      "performance diagnosis",
      "verified diverse evidence",
    ],
  },
};
