import React, { useEffect, useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
const field = "block w-full bg-background border border-border rounded-md p-2";
export default function AssessmentReview() {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]),
    [attempt, setAttempt] = useState(null),
    [notes, setNotes] = useState(""),
    [feedback, setFeedback] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [draft, setDraft] = useState(""),
    [definitions, setDefinitions] = useState([]),
    [attemptId, setAttemptId] = useState(""),
    [reviewerId, setReviewerId] = useState("");
  async function load() {
    if (user?.role === "reviewer") setQueue(await api.learningCore.queue());
    if (user?.role === "curriculum_maintainer")
      setDefinitions(await api.learningCore.definitions());
  }
  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [user?.role]);
  async function run(work) {
    setBusy(true);
    setError("");
    try {
      await work();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Assessment operations</h1>
      <p>
        Actions are authorized and audited on the server. Review only evidence
        you have inspected; uncertainty requires more evidence.
      </p>
      {error && <p role="alert">{error}</p>}
      {user?.role === "reviewer" && (
        <>
          <h2>Assigned submissions</h2>
          {queue.length ? (
            queue.map((a) => (
              <button
                className="block text-primary underline"
                key={a.id}
                onClick={() =>
                  run(async () => {
                    setAttempt(await api.learningCore.detail(a.id));
                    setNotes("");
                    setFeedback("");
                  })
                }
              >
                {a.definition_id} - {a.state}
              </button>
            ))
          ) : (
            <p>No submissions assigned.</p>
          )}
          {attempt && (
            <section className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h2>{attempt.definition.title}</h2>
              <p>Snapshot: {attempt.snapshotHash}</p>
              <p>{attempt.snapshot?.explanation}</p>
              <p>{attempt.snapshot?.modification}</p>
              {attempt.snapshot?.files.map((f) => (
                <details key={f.path}>
                  <summary>{f.path}</summary>
                  <pre className="overflow-auto text-xs">{f.content}</pre>
                </details>
              ))}
              <label>
                Private reviewer notes
                <textarea
                  className={field}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <label>
                Learner feedback
                <textarea
                  className={field}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </label>
              {attempt.definition.criteria
                .filter((c) => c.method !== "automated")
                .map((c) => (
                  <div key={c.id} className="border-t border-border py-3">
                    <p>
                      {c.mandatory ? "Required" : "Quality"}: {c.text}
                    </p>
                    {["PASS", "FAIL", "MORE_EVIDENCE"].map((result) => (
                      <button
                        disabled={busy}
                        className="border border-border rounded px-3 py-2 mr-2"
                        key={result}
                        onClick={() =>
                          run(async () => {
                            await api.learningCore.action(
                              attempt.id,
                              "review",
                              {
                                requestKey: crypto.randomUUID(),
                                criterion: c.id,
                                result,
                                notes,
                                feedback,
                              },
                            );
                            setAttempt(
                              await api.learningCore.detail(attempt.id),
                            );
                          })
                        }
                      >
                        {result.replaceAll("_", " ")}
                      </button>
                    ))}
                  </div>
                ))}
              <p role="status">{attempt.state}</p>
            </section>
          )}
        </>
      )}
      {user?.role === "review_manager" && (
        <section className="space-y-3">
          <h2>Assign a reviewer</h2>
          <label>
            Submission ID
            <input
              className={field}
              value={attemptId}
              onChange={(e) => setAttemptId(e.target.value)}
            />
          </label>
          <label>
            Reviewer account ID
            <input
              className={field}
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
            />
          </label>
          <button
            disabled={busy}
            className="text-primary underline"
            onClick={() =>
              run(() =>
                api.learningCore.action(attemptId, "assign", { reviewerId }),
              )
            }
          >
            Assign
          </button>
        </section>
      )}
      {user?.role === "curriculum_maintainer" && (
        <section className="space-y-3">
          <h2>Versioned assessment definitions</h2>
          <p>
            Use a new version for changes. DRAFT, REVIEW, PUBLISHED and ARCHIVED
            transitions never overwrite published assessment criteria.
            Curriculum lessons and paths use the documented source-review
            workflow.
          </p>
          <select
            className={field}
            defaultValue=""
            onChange={(e) =>
              setDraft(
                JSON.stringify(
                  definitions[Number(e.target.value)].document,
                  null,
                  2,
                ),
              )
            }
          >
            <option value="" disabled>
              Inspect an existing definition
            </option>
            {definitions.map((d, i) => (
              <option key={`${d.id}@${d.version}`} value={i}>
                {d.id} {d.version} {d.state}
              </option>
            ))}
          </select>
          <label>
            Assessment JSON
            <textarea
              rows={18}
              className={field + " font-mono text-xs"}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </label>
          <button
            disabled={busy}
            className="text-primary underline"
            onClick={() =>
              run(() => api.learningCore.saveDefinition(JSON.parse(draft)))
            }
          >
            Save draft
          </button>
          {["REVIEW", "PUBLISHED", "ARCHIVED"].map((state) => (
            <button
              disabled={busy}
              className="border border-border p-2 ml-2"
              key={state}
              onClick={() =>
                run(() => {
                  const d = JSON.parse(draft);
                  return api.learningCore.publish(d.id, d.version, state);
                })
              }
            >
              Move to {state}
            </button>
          ))}
        </section>
      )}
      {!["reviewer", "review_manager", "curriculum_maintainer"].includes(
        user?.role,
      ) && <p>No operations are available to this account.</p>}
    </main>
  );
}
