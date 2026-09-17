import React from "react";
import CurriculumBrowser from "@/components/CurriculumBrowser";
export default function Missions() {
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      <h1 className="text-2xl font-heading font-semibold">Mission briefs</h1>
      <CurriculumBrowser mode="missions" />
    </main>
  );
}
