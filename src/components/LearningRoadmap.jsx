import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { learningPath } from "@/lib/curriculum";

export default function LearningRoadmap() {
  const [focus, setFocus] = useState(null);
  const [selected, setSelected] = useState(learningPath.milestones[0].id);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Loading your focus…");
  const load = () =>
    api.learning
      .focus()
      .then((value) => {
        setFocus(value.milestone);
        setSelected(value.milestone);
        setMessage("");
      })
      .catch((error) => setMessage(error.message));
  useEffect(() => {
    let active = true;
    api.learning
      .focus()
      .then((value) => {
        if (active) {
          setFocus(value.milestone);
          setSelected(value.milestone);
          setMessage("");
        }
      })
      .catch((error) => {
        if (active) setMessage(error.message);
      });
    return () => {
      active = false;
    };
  }, []);
  const milestone = learningPath.milestones.find(
    (item) => item.id === selected,
  );
  const current = learningPath.milestones.find((item) => item.id === focus);
  async function save() {
    setBusy(true);
    try {
      const value = await api.learning.setFocus(selected);
      setFocus(value.milestone);
      setMessage("Learning focus saved.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="rounded-xl border border-border bg-card p-5 space-y-5"
      aria-label="Learning roadmap"
    >
      <header>
        <h2 className="text-xl font-heading font-semibold">
          {learningPath.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {learningPath.description}
        </p>
      </header>
      {current && (
        <div className="rounded-lg bg-primary/10 p-4">
          <h3 className="font-semibold">Your current focus: {current.name}</h3>
          <ul
            className="flex flex-wrap gap-2 mt-2"
            aria-label="Skills in focus"
          >
            {current.skills.map((skill) => (
              <li
                key={skill}
                className="rounded bg-primary/15 px-2 py-1 text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        Choose a milestone to explore its task. Your focus is a learning
        preference; it does not award completion, XP or verified skills.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        <ol className="space-y-2" aria-label="Path milestones">
          {learningPath.milestones.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selected === item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left rounded-lg border p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${selected === item.id ? "border-primary bg-primary/10" : "border-border"}`}
              >
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                {item.name}
                {focus === item.id && (
                  <span className="text-xs text-primary ml-2">
                    Current focus
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
        <div className="rounded-lg border border-border p-4 space-y-3">
          <h3 className="font-semibold">{milestone.name}</h3>
          <p className="text-sm">{milestone.task}</p>
          <p className="text-sm text-muted-foreground">
            Skills: {milestone.skills.join(", ")}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={busy || !focus || selected === focus}
            className="rounded bg-primary text-primary-foreground px-4 py-2 disabled:opacity-50"
          >
            {busy
              ? "Saving…"
              : selected === focus
                ? "Current focus"
                : "Make this my focus"}
          </button>
        </div>
      </div>
      <p role="status" className="text-sm">
        {message}
      </p>
      {!focus && (
        <button onClick={load} className="underline">
          Retry loading focus
        </button>
      )}
      <Link to="/code-lab" className="inline-block text-primary underline">
        Open Shared Preferences in Code Lab
      </Link>
    </section>
  );
}
