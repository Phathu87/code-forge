import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
export default function Skills() {
  const [progress, setProgress] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    api.learningCore
      .progress()
      .then(setProgress)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Skill evidence</h1>
      <p>
        Levels require curriculum evidence across the required competencies. XP,
        reading and repository imports cannot award them.
      </p>
      {error && <p role="alert">{error}</p>}
      {!progress && !error ? (
        <p role="status">Loading evidence...</p>
      ) : (
        progress?.skills.map((s) => (
          <section
            key={s.skill}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h2 className="text-lg font-semibold">{s.skill}</h2>
            <p>Demonstrated level: {s.level || "Not yet established"}</p>
            {s.requirements.map((r) => (
              <details key={r.level} className="mt-3">
                <summary>
                  {r.level}:{" "}
                  {r.eligible
                    ? "Requirements met"
                    : `${r.missingActivities.length} activities and ${r.missingCompetencies.length} competencies remain`}
                </summary>
                <ul className="list-disc pl-5">
                  {r.missingCompetencies.map((c) => (
                    <li key={`${c.level}-${c.competency}`}>
                      {c.level}: {c.competency}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
        ))
      )}
      <Link to="/assessments" className="text-primary underline">
        View assessments and progress
      </Link>
    </main>
  );
}
