import React, { useState } from "react";
import { Save, CheckCircle2, Code2 } from "lucide-react";

const fields = [
  { key: "name", label: "Application name", value: "CodeForge" },
  { key: "shortName", label: "Short name", value: "CodeForge" },
  { key: "tagline", label: "Tagline", value: "Learn. Build. Debug. Prove. Grow." },
  { key: "category", label: "Category", value: "Education (secondary: Developer Tools)" },
  { key: "publisher", label: "Developer / Publisher", value: "Phathu Rakhunwana" },
  { key: "supportContact", label: "Support contact", value: "support@codeforge.example" },
  { key: "supportSite", label: "Support website", value: "/help" },
  { key: "marketingSite", label: "Marketing website", value: "/" },
  { key: "privacyUrl", label: "Privacy Policy URL", value: "/legal" },
  { key: "termsUrl", label: "Terms of Service URL", value: "/legal" },
  { key: "copyright", label: "Copyright", value: "© 2026 CodeForge" },
  { key: "language", label: "Default language", value: "English" },
  { key: "audience", label: "Age audience", value: "18+ (initial release)" },
];

const visualPlaceholders = [
  "Master application icon",
  "Android adaptive icon (foreground + background)",
  "iOS / Huawei / Windows icons",
  "PWA + maskable icons",
  "Browser favicon",
  "Splash / launch screen (light & dark)",
];

export default function IdentityTab() {
  const [values, setValues] = useState(Object.fromEntries(fields.map((f) => [f.key, f.value])));
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        Central app identity configuration. The historical “Programming Language Toggle App” name is never used as the public product name — it lives on
        as the origin project and the introductory Shared Preferences mission.
      </p>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Identity</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs text-muted-foreground">{f.label}</span>
              <input
                value={values[f.key]}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-1 w-full h-9 px-3 rounded-md bg-muted/50 border border-border text-sm text-foreground"
              />
            </label>
          ))}
        </div>
        <button
          onClick={save}
          className="mt-5 inline-flex items-center gap-2 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved" : "Save identity"}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Icons &amp; launch visuals</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Placeholder slots — final assets are exported for each store during packaging. Icons must stay readable at small sizes, work on light and dark
          backgrounds, and remain recognisable without text.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {visualPlaceholders.map((v) => (
            <div key={v} className="flex items-center gap-2.5 rounded-lg border border-dashed border-border bg-muted/20 px-3 py-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}