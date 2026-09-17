# CodeForge Design System v1.0

Extracted from the existing application on 2026-09-17. Token authority: `src/brand/tokens.css`; Tailwind mappings and standard breakpoints: `tailwind.config.js`. All existing colour values were preserved. Values below are HSL channels unless explicitly expressed otherwise.

| Token | Actual value |
| --- | --- |


## Foundations

Tailwind spacing uses 4px units: common gaps 8/12/16/24/32px. Page containers use max-w-6xl on the landing page and max-w-2xl for onboarding; sidebar width is 256px and header height 64px. Standard breakpoints remain sm 640, md 768, lg 1024, xl 1280 and 2xl 1536px. They are build-time Tailwind values, not CSS media queries using unresolved variables.

Body is the system-resolved Inter stack, 16px base, 1.5 line-height. UI labels/buttons usually text-sm (14px/20px), captions text-xs (12px/16px), dense metadata 10–11px. Headings use weight 600–700; authentication heading 30px/36px, landing 36/48/60px across breakpoints with line-height 1.05 and tight tracking. Code uses the JetBrains Mono fallback stack, typically 12px/1.625. Tiny captions and muted text still require screen-level accessibility review.

Borders are 1px semantic border/input colours. Base radius 10px, md 8px and sm 6px; card radius often 12px, authentication 16px. Shadows retain Tailwind shadow-sm, shadow and shadow-2xl presets; do not invent new shadow colours per screen. Shared animation variables retain 200ms scale/accordion and 400ms fade/slide, ease-out, 12px entry translation and scale .96. Sidebar uses 300ms transform; onboarding progress uses 500ms. Reduced-motion media rules suppress CSS transitions and animations. Framer Motion flows require separate review.

## Component inventory

Existing `src/components/ui/` provides Button (including icon size), Input, Textarea, Select, Checkbox, RadioGroup, Switch, Badge, Card, Alert, Dialog, Sheet, Drawer, Tooltip, DropdownMenu, Tabs, Table, Pagination, Progress, Avatar, Toast/Sonner and Skeleton. Preserve Radix keyboard/focus semantics when composing them. Panels use Card or semantic sections; error states use Alert or role=alert. Existing feature components provide mission, editor, console, test and Coach surfaces. They are not proof that their underlying assessed services work.

BrandMark is shared by landing, application shell, authentication and onboarding. Decorative duplicates have empty alt text. Focus-visible gets a 2px ring with 3px offset. Status must include text rather than colour alone. Retain normal browser zoom and native controls.

There is no approved formal certificate template or authoritative VerificationShield component yet. Do not introduce one as a decorative badge. Public portfolio branding should remain secondary to learner identity when public portfolios are enabled. New disabled features need truthful empty states rather than simulated evidence.

## Regression review

Intentional changes: canonical blue favicon/mark assets and requested headline. Accessibility fixes: logo semantics, focus ring and reduced CSS motion. Production requirements: email HTML/plain-text parity, metadata and removal of the inactive theme toggle. No navigation, card, typography or core palette redesign is intended.

The original hosted design and owner-approved screenshots were not supplied in this task. Current repository/browser observations are an implementation baseline, not a completed historical visual-parity sign-off. Review landing, auth, onboarding, dashboard, Learn, Missions, Code Lab, Projects, Portfolio, Skills, Achievements, Certificates, Settings and Integrity before release. Classify differences as INTENTIONAL_IMPROVEMENT, ACCESSIBILITY_FIX, RESPONSIVE_FIX, PRODUCTION_REQUIREMENT or UNINTENTIONAL_REGRESSION.
