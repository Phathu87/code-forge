import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/api/client";

function Bullets({ items }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
function Lesson({ unit }) {
  return (
    <article className="space-y-4">
      <p>
        <strong>What you are learning:</strong> {unit.title}
      </p>
      <p>
        <strong>Why it exists:</strong> {unit.why}
      </p>
      <p>
        <strong>Real-world example:</strong> {unit.example}
      </p>
      <p>
        <strong>How it works:</strong> {unit.explanation}
      </p>
      <pre className="overflow-x-auto rounded-lg bg-background p-4 text-sm">
        <code>{unit.code}</code>
      </pre>
      <p>
        <strong>Try it:</strong> {unit.practice}
      </p>
      <p>
        <strong>Break it:</strong> {unit.broken}
      </p>
      <p>
        <strong>Debug it:</strong> {unit.debug}
      </p>
      <p>
        <strong>Apply it:</strong> {unit.application}
      </p>
      <Link
        className="text-primary underline"
        to={`/learn?node=${unit.missionConnection}`}
      >
        Read the connected mission
      </Link>
      <p className="text-sm text-muted-foreground">
        Completion requires practical work and an explanation. Reading this
        lesson does not mark it complete.
      </p>
    </article>
  );
}
function Activity({ node }) {
  return (
    <div className="space-y-5">
      <p>{node.brief}</p>
      <p className="text-sm text-muted-foreground">
        {node.difficulty} difficulty · {node.kind} · {node.level}. Brief
        available for local practice; submission and grading are not enabled.
      </p>
      <h3 className="font-semibold">Required behaviour</h3>
      <Bullets items={node.requirements} />
      <h3 className="font-semibold">Explain your work</h3>
      <p>{node.explanation}</p>
      <h3 className="font-semibold">Modify the requirement</h3>
      <p>{node.modification}</p>
      <details className="rounded border border-border p-3">
        <summary className="cursor-pointer font-semibold">
          Public assessment rubric and test plan
        </summary>
        <p className="my-3 text-sm">
          Every required criterion must be met. Quality guides feedback. Bonus
          work is optional. These are evaluation specifications, not executed
          test results.
        </p>
        <ul className="space-y-3">
          {node.rubric.map((row) => (
            <li key={row.id}>
              <strong>
                {row.category} · {row.method}:
              </strong>{" "}
              {row.criterion}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Automated test implementation is not connected. No hidden tests or
          reviewer notes are included. Infrastructure failures must be
          distinguished from learner mistakes.
        </p>
      </details>
      <p>
        <strong>Evidence to collect:</strong>{" "}
        {node.evidenceRequirements
          .map((e) => `${e.skill} (${e.strength})`)
          .join(", ")}
        . Evidence is not awarded by opening this page.
      </p>
      {node.portfolioEligible && (
        <p>
          Curriculum-eligible for a portfolio after its requirements are
          satisfied. Publication and verified status require their separate
          platform gates.
        </p>
      )}
      {node.id === "shared-preferences" && (
        <Link className="text-primary underline" to="/code-lab">
          Open the existing Shared Preferences workspace
        </Link>
      )}
    </div>
  );
}
export default function CurriculumBrowser({ mode = "learn" }) {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    let active = true;
    setError("");
    api
      .curriculum()
      .then((value) => {
        if (active) setCatalog(value);
      })
      .catch((failure) => {
        if (active) setError(failure.message);
      });
    return () => {
      active = false;
    };
  }, [retry]);
  if (error)
    return (
      <section role="alert" className="p-5 border rounded-lg">
        <p>{error}</p>
        <button
          className="underline"
          onClick={() => setRetry((value) => value + 1)}
        >
          Retry curriculum
        </button>
      </section>
    );
  if (!catalog) return <p role="status">Loading curriculum…</p>;
  const all = [
    ...catalog.modules.flatMap((m) => [m, ...m.units, m.mission, m.assessment]),
    ...catalog.projects,
    ...catalog.checkpoints,
  ];
  const byId = new Map(all.map((n) => [n.id, n]));
  const path =
    catalog.paths.find((p) => p.id === params.get("path")) || catalog.paths[0];
  const defaultId =
    mode === "missions"
      ? catalog.modules[0].mission.id
      : path.stages[0].requirements[0];
  const selected = byId.get(params.get("node") || defaultId);
  const visible =
    mode === "missions"
      ? all.filter((n) => n.kind === "mission")
      : path.stages.flatMap((s) => s.requirements).map((id) => byId.get(id));
  const filtered = visible.filter((n) =>
    `${n.title} ${n.skills?.join(" ") || ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const select = (id) => setParams({ path: path.id, node: id });
  return (
    <section className="space-y-5" aria-label="Official curriculum">
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="text-xl font-semibold">
          {catalog.title} · {catalog.version}
        </h2>
        <p>{catalog.policy.philosophy}</p>
        <p className="text-sm text-muted-foreground">
          {catalog.policy.technology.delivery}
        </p>
        <p className="text-sm">
          You can explore every brief. Prerequisites describe the evidence
          needed for progression; reading, selecting a focus or importing code
          does not award completion, XP or verification.
        </p>
        {mode !== "missions" && (
          <label className="block">
            Learning path
            <select
              value={path.id}
              onChange={(event) => setParams({ path: event.target.value })}
              className="block mt-2 w-full rounded border border-border bg-background p-3"
            >
              {catalog.paths.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {mode === "roadmap" && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3">
            Path stages and required evidence
          </h3>
          <ol className="space-y-4 list-decimal pl-5">
            {path.stages.map((stage) => (
              <li key={stage.title}>
                <strong>{stage.title}</strong>
                {stage.requirements.length ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    {stage.requirements.map((id) => (
                      <li key={id}>
                        <button
                          className="underline text-primary text-left"
                          onClick={() => select(id)}
                        >
                          {byId.get(id).title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">
                    Optional specialization does not block path completion.
                    Specialist assessment and certification remain disabled.
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="grid lg:grid-cols-[minmax(14rem,1fr)_minmax(0,3fr)] gap-5">
        <nav
          aria-label="Curriculum content"
          className="rounded-xl border border-border bg-card p-4 space-y-3 self-start"
        >
          <label className="block text-sm">
            Find in {mode === "missions" ? "missions" : "this path"}
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              className="block mt-2 w-full rounded border border-border bg-background p-2"
            />
          </label>
          <ul className="space-y-2">
            {filtered.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  aria-current={selected?.id === n.id ? "page" : undefined}
                  onClick={() => select(n.id)}
                  className={`text-left w-full rounded p-2 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${selected?.id === n.id ? "border-primary bg-primary/10" : "border-transparent"}`}
                >
                  {n.title}
                  <span className="block text-xs text-muted-foreground">
                    {n.level} · {n.kind}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {!filtered.length && (
            <p role="status">No matching curriculum items.</p>
          )}
        </nav>
        <div className="min-w-0 rounded-xl border border-border bg-card p-5 space-y-5">
          {!selected ? (
            <p role="alert">
              This curriculum item does not exist. Choose an item from the list.
            </p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{selected.title}</h2>
              <p className="text-sm text-muted-foreground">
                {selected.level} · Version {selected.version} · {selected.id}
              </p>
              <div>
                <h3 className="font-semibold">Prerequisites</h3>
                {selected.prerequisites.length ? (
                  <ul className="space-y-2 mt-2">
                    {selected.prerequisites.map((p) => (
                      <li key={p.target}>
                        <Link
                          className="text-primary underline"
                          to={`/learn?path=${path.id}&node=${p.target}`}
                        >
                          {byId.get(p.target).title}
                        </Link>{" "}
                        — {p.strength} {p.type} prerequisite
                        {p.strength === "soft" ? " (recommended review)" : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No prior curriculum evidence required.</p>
                )}
              </div>
              {selected.kind === "module" ? (
                <>
                  <h3 className="font-semibold">Learning objectives</h3>
                  <Bullets items={selected.objectives} />
                  <div className="space-y-3">
                    {selected.units.map((unit) => (
                      <details
                        key={unit.id}
                        className="rounded border border-border p-4"
                      >
                        <summary className="cursor-pointer font-semibold">
                          {unit.title}
                        </summary>
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-3">
                            Before this unit:{" "}
                            {unit.prerequisites
                              .map((p) => byId.get(p.target).title)
                              .join(", ") || "No prior unit"}
                            .
                          </p>
                          <Lesson unit={unit} />
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="text-primary underline"
                      onClick={() => select(selected.mission.id)}
                    >
                      Mission: {selected.mission.title}
                    </button>
                    <button
                      className="text-primary underline"
                      onClick={() => select(selected.assessment.id)}
                    >
                      Assessment: {selected.assessment.title}
                    </button>
                  </div>
                  <p className="text-sm">
                    Module completion requires practical unit work, the
                    mandatory mission and the assessment. Progress evaluation is
                    not yet connected.
                  </p>
                </>
              ) : selected.kind === "unit" ? (
                <Lesson unit={selected} />
              ) : (
                <Activity node={selected} />
              )}
            </>
          )}
        </div>
      </div>
      <details className="rounded-xl border border-border bg-card p-5">
        <summary className="cursor-pointer font-semibold">
          Debugging practice: deliberately broken examples
        </summary>
        <p className="mt-3 text-sm">
          Copy one example into a disposable local exercise. These defects are
          intentional. They are not production code or completed solutions.
        </p>
        <div className="space-y-3 mt-4">
          {Object.entries(catalog.practiceFixtures).map(([id, fixture]) => (
            <details key={id} className="border border-border rounded p-3">
              <summary className="cursor-pointer">{id}</summary>
              <p className="my-3">{fixture.prompt}</p>
              <pre className="overflow-x-auto bg-background rounded p-3 text-sm">
                <code>{fixture.code}</code>
              </pre>
              <p className="mt-3">
                <strong>Expected behaviour:</strong> {fixture.expectedBehaviour}
              </p>
            </details>
          ))}
        </div>
      </details>
      <details className="rounded-xl border border-border bg-card p-5">
        <summary className="cursor-pointer font-semibold">
          Progress, evidence and certificate policy
        </summary>
        <div className="mt-4 space-y-3">
          <p>{catalog.policy.progression.authority}</p>
          <p>
            Completed: {catalog.policy.progression.distinctions.completed}{" "}
            Demonstrated: {catalog.policy.progression.distinctions.demonstrated}{" "}
            Verified: {catalog.policy.progression.distinctions.verified}
          </p>
          <p>{catalog.policy.assessment.rule}</p>
          <p>{catalog.policy.assessment.retakes}</p>
          <p>{catalog.policy.evidence.recency}</p>
          <p>{catalog.policy.certificates.rule}</p>
          <p>{catalog.policy.evidence.promotion.Specialist}</p>
          <h3 className="font-semibold">Technical references</h3>
          <ul>
            {catalog.policy.sources.map((source) => (
              <li key={source.url}>
                <a
                  className="text-primary underline"
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
