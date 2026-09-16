export const learningPath = {
  id: "shared-preferences",
  name: "Shared Preferences",
  description: "Build on the original Programming Language Toggle exercise.",
  milestones: [
    {
      id: "state",
      name: "Choose a language",
      skills: ["useState", "Event handling"],
      task: "Store the selected language in React state and update it when the learner chooses another language.",
    },
    {
      id: "context",
      name: "Share the preference",
      skills: ["createContext", "Context.Provider", "useContext"],
      task: "Move the language preference into a provider and read the same value from two separate components.",
    },
    {
      id: "extend",
      name: "Add a language",
      skills: ["Component reuse", "Array rendering"],
      task: "Add another language option without duplicating the selection logic. Confirm both consumers update together.",
    },
    {
      id: "persist",
      name: "Keep the selection",
      skills: ["localStorage", "State initialization"],
      task: "Save the selected language in browser storage and restore it after a reload. Handle missing or invalid stored values.",
    },
  ],
};
