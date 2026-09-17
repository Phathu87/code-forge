import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
const field =
  "w-full rounded-md border border-border bg-background p-2 text-sm";
const button =
  "rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm disabled:opacity-50";
const friendly = {
  IN_PROGRESS: "In progress",
  SUBMITTED: "Submitted for assessment",
  REVIEW_REQUIRED: "Waiting for reviewer",
  INFRASTRUCTURE_ERROR:
    "Evaluation service unavailable. Your submission is safe; retry this attempt.",
  TESTS_FAILED: "Tests need attention",
  NEEDS_REVISION: "Review feedback requires a revision",
  ADDITIONAL_EVIDENCE_REQUIRED: "More evidence needed",
  PASSED: "Passed the required assessment gates",
  VERIFIED: "Verification completed",
  VERIFICATION_PENDING: "Assessment complete; verification pending",
  INTEGRITY_REVIEW_REQUIRED: "Additional integrity review required",
  REQUIREMENTS_NOT_MET: "Required evidence is missing",
};
export default function Assessments() {
  const { user } = useAuth();
  const [catalog, setCatalog] = useState(null),
    [progress, setProgress] = useState(null),
    [selected, setSelected] = useState(""),
    [attempt, setAttempt] = useState(null),
    [explanation, setExplanation] = useState(""),
    [modification, setModification] = useState(""),
    [answers, setAnswers] = useState({}),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function refresh() {
    const [c, p] = await Promise.all([
      api.learningCore.catalog(),
      api.learningCore.progress(),
    ]);
    setCatalog(c);
    setProgress(p);
  }
  useEffect(() => {
    refresh().catch((e) => setError(e.message));
  }, []);
  const d = catalog?.definitions.find(
    (d) => `${d.id}@${d.version}` === selected,
  );
  async function run(work) {
    setBusy(true);
    setError("");
    try {
      await work();
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function open(id) {
    setAttempt(await api.learningCore.detail(id));
  }
  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <h1 className="text-2xl font-semibold">Assessments and progress</h1>
      <p className="text-muted-foreground">
        Submissions are immutable copies of your work. Passing requires every
        mandatory criterion; XP does not establish a skill level.
      </p>
      {error && (
        <p role="alert" className="text-destructive">
          {error}
        </p>
      )}
      {!catalog ? (
        <p role="status">Loading assessment definitions...</p>
      ) : (
        <>
          {!catalog.enabled && (
            <p role="status" className="rounded-lg border border-border p-4">
              Submissions are closed while reviewer access and operational
              checks are being prepared.
            </p>
          )}
          <p>
            Recorded XP: {progress.xp}.{" "}
            <Link className="text-primary underline" to="/skills">
              View skill evidence
            </Link>
          </p>
          {["reviewer", "review_manager", "curriculum_maintainer"].includes(
            user?.role,
          ) && (
            <Link className="text-primary underline" to="/assessment-review">
              Review and content operations
            </Link>
          )}
          <section className="bg-card border border-border rounded-xl p-5 space-y-3">
            <label htmlFor="assessment">Assessment and version</label>
            <select
              id="assessment"
              className={field}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Choose an assessment</option>
              {catalog.definitions.map((d) => (
                <option
                  key={`${d.id}@${d.version}`}
                  value={`${d.id}@${d.version}`}
                >
                  {d.title} - {d.version}
                </option>
              ))}
            </select>
            {d && (
              <>
                <p>
                  Hard prerequisites:{" "}
                  {d.prerequisites
                    .filter((p) => p.strength === "hard")
                    .map((p) => p.target)
                    .join(", ") || "None"}
                </p>
                <p>
                  Attempt limit: {d.attemptPolicy.maxAttempts}. Retake cooldown:{" "}
                  {d.attemptPolicy.cooldownSeconds} seconds.
                </p>
                <ul className="list-disc pl-5">
                  {d.criteria.map((c) => (
                    <li key={c.id}>
                      {c.mandatory ? "Required" : "Quality"}: {c.text}
                    </li>
                  ))}
                </ul>
                <button
                  className={button}
                  disabled={busy || !catalog.enabled}
                  onClick={() =>
                    run(async () => {
                      const a = await api.learningCore.start({
                        assessmentId: d.id,
                        version: d.version,
                        requestKey: crypto.randomUUID(),
                      });
                      await open(a.id);
                    })
                  }
                >
                  Start assessment
                </button>
              </>
            )}
          </section>
          <section className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h2 className="text-lg font-semibold">Your attempts</h2>
            {!progress.attempts.length ? (
              <p>No assessment submissions yet.</p>
            ) : (
              progress.attempts.map((a) => (
                <button
                  className="block text-primary underline text-left"
                  key={a.id}
                  onClick={() => run(() => open(a.id))}
                >
                  {a.definition_id} ({a.definition_version}) -{" "}
                  {friendly[a.state] || a.state}
                </button>
              ))
            )}
          </section>
          {attempt && (
            <section className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2 className="text-lg font-semibold">
                {attempt.definition.title}
              </h2>
              <p role="status">{friendly[attempt.state] || attempt.state}</p>
              {attempt.events
                .filter((e) => e.kind === "review")
                .map((e) => (
                  <p key={e.id}>
                    {e.criterion}: {e.summary}. {e.feedback}
                  </p>
                ))}
              {attempt.state === "IN_PROGRESS" ? (
                <>
                  <p>
                    Submit the currently saved Code Lab workspace. Save your
                    changes first. A submission cannot be edited; revisions use
                    a permitted new attempt.
                  </p>
                  {attempt.definition.questions.map((q) => (
                    <label className="block" key={q.id}>
                      {q.prompt}
                      <input
                        className={field}
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers({ ...answers, [q.id]: e.target.value })
                        }
                      />
                    </label>
                  ))}
                  <label className="block">
                    Explain your implementation
                    <textarea
                      className={field}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                  </label>
                  <p>{attempt.definition.explanation}</p>
                  <label className="block">
                    Explain the required modification
                    <textarea
                      className={field}
                      value={modification}
                      onChange={(e) => setModification(e.target.value)}
                    />
                  </label>
                  <p>{attempt.definition.modification}</p>
                  <button
                    disabled={busy || !catalog.enabled}
                    className={button}
                    onClick={() =>
                      run(async () => {
                        const w = await api.workspace.load();
                        await api.learningCore.action(attempt.id, "submit", {
                          snapshot: {
                            files: w.data?.files || [],
                            explanation,
                            modification,
                            answers,
                          },
                        });
                        await open(attempt.id);
                      })
                    }
                  >
                    Submit saved workspace snapshot
                  </button>
                </>
              ) : (
                <>
                  <p className="break-all text-xs">
                    Submission hash: {attempt.snapshotHash}
                  </p>
                  <details>
                    <summary>Inspect submitted source</summary>
                    {attempt.snapshot?.files.map((f) => (
                      <div key={f.path}>
                        <h3>{f.path}</h3>
                        <pre className="overflow-auto text-xs p-3">
                          {f.content}
                        </pre>
                      </div>
                    ))}
                  </details>
                  <button
                    className={button}
                    disabled={
                      busy ||
                      !catalog.enabled ||
                      ["PASSED", "VERIFIED"].includes(attempt.state)
                    }
                    onClick={() =>
                      run(async () => {
                        await api.learningCore.action(attempt.id, "grade", {
                          requestKey: crypto.randomUUID(),
                        });
                        await open(attempt.id);
                      })
                    }
                  >
                    Evaluate or retry evaluation
                  </button>
                  <p className="text-sm text-muted-foreground">
                    An unavailable evaluator does not fail your work or consume
                    a new attempt.
                  </p>
                </>
              )}
            </section>
          )}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Path requirements</h2>
            {progress.paths.map((p) => (
              <details
                key={p.id}
                className="border border-border rounded-lg p-3"
              >
                <summary>
                  {p.title}: {p.percent}% of required items completed
                </summary>
                {p.stages.map((s) => (
                  <p key={s.id}>
                    {s.title}:{" "}
                    {s.completed
                      ? "Completed"
                      : `${s.missing.length} required items remain`}
                  </p>
                ))}
              </details>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
