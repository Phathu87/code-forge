import React from "react";
import LearningRoadmap from "@/components/LearningRoadmap";
import CurriculumBrowser from "@/components/CurriculumBrowser";
export default function Roadmap() {
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      <h1 className="text-2xl font-heading font-semibold">
        Your learning roadmap
      </h1>
      <LearningRoadmap />
      <CurriculumBrowser mode="roadmap" />
    </main>
  );
}
