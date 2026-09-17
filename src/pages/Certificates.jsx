import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/api/client";
export function PublicCertificate() {
  const { id } = useParams();
  const [record, setRecord] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    if (id)
      api.learningCore
        .verify(id)
        .then(setRecord)
        .catch((e) => setError(e.message));
  }, [id]);
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        CodeForge certificate verification
      </h1>
      {error ? (
        <p role="alert">Verification service unavailable. Retry later.</p>
      ) : !id ? (
        <p>
          Use the unique verification link printed on a certificate.
          Authoritative issuance is currently disabled.
        </p>
      ) : !record ? (
        <p role="status">Checking certificate...</p>
      ) : record.status === "NOT_FOUND" ? (
        <p>No public certificate record was found.</p>
      ) : (
        <>
          <p className="text-lg font-semibold">{record.status}</p>
          <h2>{record.learnerName}</h2>
          <p>{record.title}</p>
          <p>
            {record.level} - issued{" "}
            {new Date(record.issuedAt).toLocaleDateString()}
          </p>
          <p>{record.skills.join(", ")}</p>
          <p>Curriculum {record.curriculumVersion}</p>
          <p className="text-xs break-all">{record.id}</p>
        </>
      )}
    </main>
  );
}
export default function Certificates() {
  const [data, setData] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      api.learningCore.progress(),
      api.learningCore.certificates(),
      api.learningCore.catalog(),
    ])
      .then(([progress, certificates, catalog]) =>
        setData({ progress, certificates, catalog }),
      )
      .catch((e) => setError(e.message));
  }, []);
  async function download(id) {
    try {
      const d = await api.learningCore.document(id);
      const bytes = Uint8Array.from(atob(d.base64), (c) => c.charCodeAt(0));
      const url = URL.createObjectURL(
        new Blob([bytes], { type: d.contentType }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = d.filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Certificates</h1>
      {error && <p role="alert">{error}</p>}
      {!data ? (
        <p role="status">Loading certificate requirements...</p>
      ) : (
        <>
          <p>
            {data.catalog.certificatesEnabled
              ? "Issuance requires verified evidence and consent."
              : "Authoritative issuance remains disabled until integrity, privacy, appeals and release gates pass."}
          </p>
          {data.progress.certificates.map((c) => (
            <section
              key={c.id}
              className="border border-border bg-card rounded-xl p-5 space-y-2"
            >
              <h2>{c.title}</h2>
              <p>{c.state.replaceAll("_", " ")}</p>
              <label className="block">
                <input
                  type="checkbox"
                  disabled={!data.catalog.certificatesEnabled}
                  onChange={(e) =>
                    api.learningCore
                      .consent(c.id, e.target.checked)
                      .catch((e) => setError(e.message))
                  }
                />{" "}
                Allow public certificate verification to show my name,
                demonstrated skills and issue details when eligible.
              </label>
              <p>
                {c.missing.length} required items; {c.unverified.length} items
                awaiting verification; {c.missingCompetencies.length}{" "}
                competencies still need verified evidence.
              </p>
            </section>
          ))}
          {data.certificates.map((c) => (
            <section key={c.id} className="border border-border p-4">
              <h2>{c.title}</h2>
              <p>{c.status}</p>
              <a className="text-primary underline" href={c.verificationUrl}>
                Public verification
              </a>
              <button
                className="block text-primary underline"
                onClick={() => download(c.id)}
              >
                Download server-generated PDF
              </button>
              <button
                className="block text-primary underline"
                onClick={() =>
                  api.learningCore
                    .consent(c.definition.id, false)
                    .then(() =>
                      setError("Public verification details withdrawn."),
                    )
                    .catch((e) => setError(e.message))
                }
              >
                Withdraw public verification details
              </button>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
