import React from "react";
import { Link } from "react-router-dom";
import CurriculumBrowser from "@/components/CurriculumBrowser";
export default function Learn() {
  return (
    <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      <h1 className="text-2xl font-heading font-semibold">Learn by building</h1>
      <Link to="/assessments" className="text-primary underline">Assessments and server-recorded progress</Link>
      <CurriculumBrowser />
    </main>
  );
}
