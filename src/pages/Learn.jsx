import React from "react";
import LearningRoadmap from "@/components/LearningRoadmap";
export default function Learn() {
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      <h1 className="text-2xl font-heading font-semibold">
        Learn JavaScript and React
      </h1>
      <p className="text-muted-foreground">
        The current exercise covers shared state and persistent preferences.
        Select a milestone to see its task and skills.
      </p>
      <LearningRoadmap />
    </main>
  );
}
