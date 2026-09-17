# CodeForge Official Developer Curriculum

Version 1.0.0. Author: Phathutshedzo Rakhunwana.

You write the code. We help you understand it.

This is authored learning content and a public assessment specification. Reading and local practice are available; automated assessment, evidence awards and certificate issuance remain disabled.

Inventory: 8 paths, 37 modules, 53 lesson units, 37 missions, 8 projects and 40 assessment briefs.

## Path: Web Development Foundations

ID: web-foundations-v1. Version: 1.0.0.

### Understanding the Web

web-how-it-works

### HTML Foundations

html-core

### CSS Foundations

css-core

### Responsive Design

responsive-web

### Accessibility Foundations

accessibility-foundations

### Developer Tools

browser-devtools

### Foundation Project

responsive-business-website

### Practical Checkpoint

web-foundations-checkpoint-v1

Certificate mapping (disabled): Web Development Foundations — Verified Practical Skills Certificate

## Path: JavaScript Foundations

ID: javascript-foundations-v1. Version: 1.0.0.

### Programming Fundamentals

javascript-programming-basics

### Decisions and Logic

javascript-conditions

### Functions

javascript-functions

### Collections and Data

javascript-data-collections

### Debugging

javascript-debugging-foundations

### DOM

javascript-dom

### Events

javascript-events

### Forms

javascript-forms-validation

### Data Transformation

javascript-array-transformations

### Browser Persistence

javascript-browser-storage

### Foundation Project

vanilla-js-task-manager

### Practical Checkpoint

javascript-foundation-checkpoint-v1

Certificate mapping (disabled): JavaScript Foundations — Verified Practical Skills Certificate

## Path: JavaScript Application Development

ID: javascript-application-development-v1. Version: 1.0.0.

### Module Boundaries

javascript-modules

### Asynchronous JavaScript

javascript-async

### HTTP and APIs

http-rest-apis

### Behavioural Testing

testing-foundations

### Intermediate Project

expense-management-application

### React Entry or Deeper JavaScript

react-entry

Certificate mapping (disabled): JavaScript Application Development — Verified Practical Skills Certificate

## Path: React Foundations

ID: react-foundations-v1. Version: 1.0.0.

### Practical JavaScript Entry

react-entry

### React Beginner

react-beginner

### State Ownership

react-state-composition

### Forms, Effects and Hooks

react-forms-effects

### Shared Preferences

react-context

### Routing

react-routing

### Foundation Project

react-developer-preferences

### Practical Checkpoint

react-foundation-checkpoint-v1

Certificate mapping (disabled): React Foundations — Verified Practical Skills Certificate

## Path: Frontend Developer Foundation

ID: frontend-developer-foundation-v1. Version: 1.0.0.

### Web Evidence

web-foundations-checkpoint-v1

### JavaScript Evidence

javascript-foundation-checkpoint-v1

### Git and APIs

git-foundations, http-rest-apis

### React and Testing

react-developer-preferences, testing-foundations

### Combined Practical Checkpoint

frontend-foundation-checkpoint-v1

Certificate mapping (disabled): Frontend Developer Foundation — Verified Practical Skills Certificate

## Path: Frontend Developer

ID: frontend-developer-v1. Version: 1.0.0.

### A · Web Foundations

web-how-it-works, html-core, css-core, browser-devtools

### B · Interactive Web

javascript-programming-basics, javascript-conditions, javascript-functions, javascript-data-collections, javascript-debugging-foundations, javascript-dom, javascript-events, javascript-forms-validation

### C · Application Foundations

responsive-web, accessibility-foundations, git-foundations, javascript-array-transformations, javascript-browser-storage, vanilla-js-task-manager, javascript-foundation-checkpoint-v1

### D · Data and APIs

javascript-modules, javascript-async, http-rest-apis, expense-management-application

### E · React

react-entry, react-beginner, react-state-composition, react-forms-effects, react-context, react-routing, react-developer-preferences

### F · Application Development

testing-foundations, react-application-development, task-management-dashboard

### G · Advanced Frontend

javascript-advanced, react-advanced-architecture, accessible-components, frontend-performance, testing-strategy, frontend-security, production-javascript-dashboard, production-saas-dashboard

### H · Professional Frontend

deployment-fundamentals, professional-frontend

### I · Capstone

frontend-capstone

### J · Optional Specialization

Optional specialization; not required for graduation.

Certificate mapping (disabled): Professional Frontend Developer — Verified Practical Skills Certificate

## Path: React Application Development

ID: react-application-development-v1. Version: 1.0.0.

### Foundation Evidence

react-foundation-checkpoint-v1, react-developer-preferences

### Application Development

react-application-development

### Project

task-management-dashboard

### Practical Checkpoint

frontend-intermediate-checkpoint-v1

Certificate mapping (disabled): React Application Development — Verified Practical Skills Certificate

## Path: Advanced Frontend Development

ID: advanced-frontend-v1. Version: 1.0.0.

### Intermediate Evidence

task-management-dashboard, frontend-intermediate-checkpoint-v1

### Advanced Reasoning

javascript-advanced, react-advanced-architecture

### Quality Across Boundaries

accessible-components, frontend-performance, testing-strategy, frontend-security

### Advanced Project

production-saas-dashboard

### Practical Checkpoint

react-advanced-checkpoint-v1

Certificate mapping (disabled): Advanced Frontend Development — Verified Practical Skills Certificate

## Module: Understanding the Web

ID: web-how-it-works | Beginner | Version 1.0.0

Prerequisites: None

### Objectives

- Identify the scheme, host, path, query and fragment; inspect one document request in Network.

- Inspect source and the Elements panel; identify a heading, stylesheet and script.

### Lesson: From address to page

ID: web-how-it-works-unit-1

Prerequisites: None

**Why it exists.** A browser needs a way to ask another computer for a document.

**Real-world example.** Opening a library catalogue starts a request, not a copy of the whole internet.

**How it works.** A URL names a resource. Its scheme selects a protocol, its host identifies a server and its path selects a resource. DNS resolves host names to addresses. The browser requests HTML over HTTP, receives a status, headers and body, then requests linked styles, scripts and images. HTTPS protects transport; it does not guarantee that content is trustworthy.

```
https://example.org/catalogue?category=books#opening-hours
```

**Try it.** Identify the scheme, host, path, query and fragment; inspect one document request in Network.

**Break it.** Open an intentionally missing path on your own local page.

**Debug it.** Compare its status and response with the working page. Explain why an error page can still contain HTML.

**Apply it.** Trace a stylesheet request from its link in HTML to its response.

Mission connection: inspect-the-web. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Source, DOM and responsibilities

ID: web-how-it-works-unit-2

Prerequisites: web-how-it-works-unit-1 (hard, knowledge)

**Why it exists.** Source files and the live page are related but not identical.

**Real-world example.** A booking page changes available dates after a response arrives.

**How it works.** HTML describes document meaning, CSS controls presentation and JavaScript controls behaviour. The DOM is the browser’s live document representation. Client code runs in the browser; backend code handles server responsibilities such as authorization. Static files can still run interactive JavaScript; dynamic responses can be generated on a server.

```
<h1>Library catalogue</h1>
<link rel="stylesheet" href="styles.css">
<script src="app.js" defer></script>
```

**Try it.** Inspect source and the Elements panel; identify a heading, stylesheet and script.

**Break it.** Edit a heading in Elements, then reload.

**Debug it.** Explain why an inspector edit did not change the source file.

**Apply it.** Draw a request/response diagram and assign a search interface and private database to the appropriate side.

Mission connection: inspect-the-web. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Inspect the Web

ID: inspect-the-web | Beginner | Easy | mission

Inspect a local page you control; record observations without collecting another person’s traffic.

Prerequisites: web-how-it-works-unit-2 (hard, knowledge)

#### Required behaviour

- Identify the main document URL and status

- Locate a heading in source and DOM

- Trace a stylesheet and script request

- Explain client/server roles and static/dynamic behaviour

#### Explain

Explain how the browser obtained one visible element.

#### Modify

Change a linked filename, diagnose the failed request, then restore it.

#### Rubric

- **required / hybrid:** Identify the main document URL and status

- **required / hybrid:** Locate a heading in source and DOM

- **required / hybrid:** Trace a stylesheet and script request

- **required / hybrid:** Explain client/server roles and static/dynamic behaviour

- **required / reviewer:** Explain how the browser obtained one visible element.

- **required / hybrid:** Change a linked filename, diagnose the failed request, then restore it.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: Web Fundamentals: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Trace a museum page

ID: web-request-check | Beginner | Easy | assessment

Investigate a different local page with a missing image.

Prerequisites: inspect-the-web (hard, mission)

#### Required behaviour

- Record the requested URL and status

- Locate the incorrect reference

- Repair it and verify the new request

#### Explain

Explain why reloading alone did not fix the path.

#### Modify

Move the image into a subdirectory and update the reference.

#### Rubric

- **required / hybrid:** Record the requested URL and status

- **required / hybrid:** Locate the incorrect reference

- **required / hybrid:** Repair it and verify the new request

- **required / reviewer:** Explain why reloading alone did not fix the path.

- **required / hybrid:** Move the image into a subdirectory and update the reference.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: Web Fundamentals: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: web-how-it-works-unit-1, web-how-it-works-unit-2, inspect-the-web, web-request-check. All require evaluator evidence; optional work does not block.

## Module: HTML Core

ID: html-core | Beginner | Version 1.0.0

Prerequisites: web-how-it-works (hard, skill)

### Objectives

- Build a personal profile with headings, a skills list, a descriptive link and an image alternative.

- Build a labelled contact form and a two-column schedule table.

### Lesson: Document and content structure

ID: html-core-unit-1

Prerequisites: web-how-it-works (hard, skill)

**Why it exists.** Documents need meaningful structure before decoration.

**Real-world example.** A personal profile has one main subject, related sections and contact links.

**How it works.** Use a doctype, language, head with title and viewport, and body. Headings label sections in a logical hierarchy; paragraphs and lists describe content. Links navigate, buttons perform actions. Give meaningful images useful alternatives and decorative images an empty alt. Use header, nav, main, section, article, aside and footer for their meaning, not their appearance.

```
<!doctype html>
<html lang="en"><head><title>Profile</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><main><h1>Lerato</h1><p>Frontend learner</p></main></body></html>
```

**Try it.** Build a personal profile with headings, a skills list, a descriptive link and an image alternative.

**Break it.** Replace headings with bold paragraphs.

**Debug it.** Inspect the heading outline and restore meaningful headings; explain the lost information.

**Apply it.** Build a contact card for a different person using fictional public details.

Mission connection: semantic-business-landing-page. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Forms and tabular data

ID: html-core-unit-2

Prerequisites: html-core-unit-1 (hard, knowledge)

**Why it exists.** People need named controls and understandable relationships between values.

**Real-world example.** A workshop registration form collects a name and a chosen session.

**How it works.** Associate each label with an input using for/id. Use suitable input types, textarea for long text and select for a finite choice. A submit button belongs to a form. A table represents row/column data: include caption and scoped headers. A static form does not send a real message without a receiving service; never claim it has delivered one.

```
<label for="guest">Guest name</label><input id="guest" name="guest" required>
<table><caption>Opening times</caption><tr><th scope="row">Monday</th><td>09:00–17:00</td></tr></table>
```

**Try it.** Build a labelled contact form and a two-column schedule table.

**Break it.** Remove a label association and use a table to position the entire page.

**Debug it.** Click the label and inspect its accessible name; restore the association and move page layout out of the table.

**Apply it.** Add a contact-method choice and instructions without relying on placeholder text.

Mission connection: semantic-business-landing-page. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Semantic Business Landing Page

ID: semantic-business-landing-page | Beginner | Easy | mission

Create a page for a fictional repair shop; include a Contact Card and Accessible Contact Form.

Prerequisites: html-core-unit-2 (hard, knowledge)

#### Required behaviour

- Use meaningful landmarks and a logical heading hierarchy

- Include services, contact details, navigation and image alternatives

- Associate every form field with a label

- Use a caption and headers for opening-time data

- Describe the form as a local exercise, not a delivered message

#### Explain

Explain why a button and a link have different jobs.

#### Modify

Add a service section without breaking navigation or heading order.

#### Rubric

- **required / hybrid:** Use meaningful landmarks and a logical heading hierarchy

- **required / hybrid:** Include services, contact details, navigation and image alternatives

- **required / hybrid:** Associate every form field with a label

- **required / hybrid:** Use a caption and headers for opening-time data

- **required / hybrid:** Describe the form as a local exercise, not a delivered message

- **required / reviewer:** Explain why a button and a link have different jobs.

- **required / hybrid:** Add a service section without breaking navigation or heading order.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: HTML: Applied; Semantic HTML: Applied; Forms: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Community noticeboard

ID: html-community-check | Beginner | Easy | assessment

Build a new noticeboard with event details and an enquiry form.

Prerequisites: semantic-business-landing-page (hard, mission)

#### Required behaviour

- Represent events as meaningful content

- Label controls

- Provide understandable navigation and a schedule

#### Explain

Explain the document outline.

#### Modify

Add a second event with a distinct heading.

#### Rubric

- **required / hybrid:** Represent events as meaningful content

- **required / hybrid:** Label controls

- **required / hybrid:** Provide understandable navigation and a schedule

- **required / reviewer:** Explain the document outline.

- **required / hybrid:** Add a second event with a distinct heading.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: HTML: Assessment; Semantic HTML: Assessment; Forms: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: html-core-unit-1, html-core-unit-2, semantic-business-landing-page, html-community-check. All require evaluator evidence; optional work does not block.

## Module: CSS Core

ID: css-core | Foundation | Version 1.0.0

Prerequisites: html-core (hard, skill)

### Objectives

- Style the contact card with readable type, spacing, a border, background and focus state.

- Build a Product Card Grid with a title, image, price and link on every card.

### Lesson: Cascade and the box model

ID: css-core-unit-1

Prerequisites: html-core (hard, skill)

**Why it exists.** Without predictable rules, small style changes can affect unrelated content.

**Real-world example.** Two rules compete to set a contact card’s text colour.

**How it works.** A selector chooses elements. The cascade considers origin, importance, layers, specificity and source order; inheritance supplies some unset values from ancestors. Inspect the winning rule instead of adding !important reflexively. Content, padding, border and margin form the box; border-box includes padding and border in declared width. Prefer readable rem typography and reusable custom properties.

```
:root { --space: 1rem; }
.card { box-sizing: border-box; padding: var(--space); border: 1px solid; }
.card a:focus-visible { outline: 3px solid currentColor; }
```

**Try it.** Style the contact card with readable type, spacing, a border, background and focus state.

**Break it.** Give a fixed-width card padding under content-box and add a competing selector.

**Debug it.** Use computed styles and the box model to identify both causes.

**Apply it.** Create a second card using the same spacing variable.

Mission connection: style-contact-card. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Layout, positioning and states

ID: css-core-unit-2

Prerequisites: css-core-unit-1 (hard, knowledge)

**Why it exists.** Normal flow often needs controlled alignment rather than arbitrary pixel offsets.

**Real-world example.** A product list has repeating cards and each card has aligned actions.

**How it works.** Block and inline display participate differently in flow. Flexbox arranges a row or column; Grid coordinates rows and columns. Relative positioning establishes a reference; absolute positioning removes an element from normal flow and may overlap content. Keep content in flow unless an overlay genuinely needs positioning. Hover, focus and disabled states need distinguishable styles. Transitions should be short and respect reduced-motion preferences.

```
.products { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.actions { display: flex; flex-wrap: wrap; gap: .5rem; }
```

**Try it.** Build a Product Card Grid with a title, image, price and link on every card.

**Break it.** Absolutely position all card titles and enlarge one title.

**Debug it.** Explain the overlap and restore a flow-based layout.

**Apply it.** Add a sale label without obscuring the product link.

Mission connection: style-contact-card. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Style the Contact Card and Product Grid

ID: style-contact-card | Foundation | Moderate | mission

Style your semantic content and a four-product grid.

Prerequisites: css-core-unit-2 (hard, knowledge)

#### Required behaviour

- Preserve HTML semantics

- Use deliberate typography, colour, spacing and box sizing

- Use Grid for cards and Flexbox for actions

- Expose focus as well as hover

- Explain a cascade conflict using computed styles

#### Explain

Explain which property is inherited and which is not.

#### Modify

Add a very long product name without overlap.

#### Rubric

- **required / hybrid:** Preserve HTML semantics

- **required / hybrid:** Use deliberate typography, colour, spacing and box sizing

- **required / hybrid:** Use Grid for cards and Flexbox for actions

- **required / hybrid:** Expose focus as well as hover

- **required / hybrid:** Explain a cascade conflict using computed styles

- **required / reviewer:** Explain which property is inherited and which is not.

- **required / hybrid:** Add a very long product name without overlap.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: CSS: Applied; CSS Layout: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Exhibition cards

ID: css-exhibition-check | Foundation | Moderate | assessment

Style an unfamiliar set of exhibition cards.

Prerequisites: style-contact-card (hard, mission)

#### Required behaviour

- Repair a specificity defect

- Create readable spacing

- Keep content in flow without overlaps

#### Explain

Explain the winning declaration.

#### Modify

Add an extra action to every card.

#### Rubric

- **required / hybrid:** Repair a specificity defect

- **required / hybrid:** Create readable spacing

- **required / hybrid:** Keep content in flow without overlaps

- **required / reviewer:** Explain the winning declaration.

- **required / hybrid:** Add an extra action to every card.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: CSS: Assessment; CSS Layout: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: css-core-unit-1, css-core-unit-2, style-contact-card, css-exhibition-check. All require evaluator evidence; optional work does not block.

## Module: Responsive Web

ID: responsive-web | Foundation | Version 1.0.0

Prerequisites: html-core (hard, skill), css-core (hard, skill)

### Objectives

- Repair overflow, resize product images and establish readable fluid typography and spacing.

- Build Flexible Product Cards and transform navigation at the width where its content stops fitting.

### Lesson: Available space and flexible sizing

ID: responsive-web-unit-1

Prerequisites: html-core (hard, skill), css-core (hard, skill)

**Why it exists.** A fixed desktop width can make controls unreachable on a phone.

**Real-world example.** A catalogue must work with long names, zoom and narrow windows.

**How it works.** The viewport is available layout space, not a reliable device identity. Start with a simple narrow layout. Percentages depend on a containing block; rem depends on root font size and em on local font sizing. Viewport units track the viewport but can make text or mobile heights awkward. min(), max() and clamp() bound fluid sizes. Keep images within their container and preserve aspect ratio.

```
.page { width: min(100% - 2rem, 70rem); margin-inline: auto; }
img { max-width: 100%; height: auto; }
h1 { font-size: clamp(1.5rem, 1rem + 2vw, 3rem); }
```

**Try it.** Repair overflow, resize product images and establish readable fluid typography and spacing.

**Break it.** Set a card to width: 800px and insert an unbroken long word.

**Debug it.** Inspect scroll width and the responsible element; fix sizing and wrapping rather than hiding all overflow.

**Apply it.** Test at 320, 390, 768, 1024 and 1440 CSS pixels and at 200% zoom.

Mission connection: responsive-product-catalogue. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Content-driven breakpoints

ID: responsive-web-unit-2

Prerequisites: responsive-web-unit-1 (hard, knowledge)

**Why it exists.** A layout should change when its content stops fitting.

**Real-world example.** Four navigation links fit until translation makes their labels longer.

**How it works.** Use media queries to introduce roomier arrangements after the content needs them. Flex wrapping and Grid minmax reduce special cases. Do not hide core actions on smaller screens. Navigation may wrap or use a disclosed menu; a disclosure needs a native button, accurate expanded state, keyboard operation and predictable focus. Use a project target of at least 44 by 44 CSS pixels for touch controls; this is an internal usability target, not a complete accessibility conformance claim.

```
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
@media (min-width: 48rem) { .page { padding-block: 2rem; } }
```

**Try it.** Build Flexible Product Cards and transform navigation at the width where its content stops fitting.

**Break it.** Choose a breakpoint by device name, then resize slowly between standard widths.

**Debug it.** Record the first broken width; explain and change the breakpoint based on content.

**Apply it.** Repeat with longer labels, touch input and keyboard-only navigation.

Mission connection: responsive-product-catalogue. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Responsive Product Catalogue

ID: responsive-product-catalogue | Foundation | Moderate | mission

Build a catalogue and Responsive Navigation for phone, tablet and desktop.

Prerequisites: responsive-web-unit-2 (hard, knowledge)

#### Required behaviour

- Responsive grid, images, typography and spacing

- No unintended horizontal scrolling at 320, 390, 768, 1024 and 1440 CSS pixels

- Keyboard-operable navigation with visible focus

- Accurate open/closed state if navigation collapses

- Usable touch targets and content reflow at 200% zoom

#### Explain

Explain one content-driven breakpoint and one relative unit.

#### Modify

Add long translated product and navigation labels.

#### Rubric

- **required / hybrid:** Responsive grid, images, typography and spacing

- **required / hybrid:** No unintended horizontal scrolling at 320, 390, 768, 1024 and 1440 CSS pixels

- **required / hybrid:** Keyboard-operable navigation with visible focus

- **required / hybrid:** Accurate open/closed state if navigation collapses

- **required / hybrid:** Usable touch targets and content reflow at 200% zoom

- **required / reviewer:** Explain one content-driven breakpoint and one relative unit.

- **required / hybrid:** Add long translated product and navigation labels.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Responsive Design: Applied; CSS Layout: Applied; Accessibility: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Responsive Navigation

ID: responsive-navigation | Foundation | Moderate | assessment

Build navigation for a different community site; a hamburger menu is not mandatory.

Prerequisites: responsive-product-catalogue (hard, mission)

#### Required behaviour

- All destinations remain reachable at required widths

- Keyboard and touch controls work

- If collapsible, expanded state and focus remain correct

- No clipped links during zoom

#### Explain

Explain why this design fits the content.

#### Modify

Add two destinations and demonstrate behaviour around each breakpoint.

#### Rubric

- **required / hybrid:** All destinations remain reachable at required widths

- **required / hybrid:** Keyboard and touch controls work

- **required / hybrid:** If collapsible, expanded state and focus remain correct

- **required / hybrid:** No clipped links during zoom

- **required / reviewer:** Explain why this design fits the content.

- **required / hybrid:** Add two destinations and demonstrate behaviour around each breakpoint.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Responsive Design: Assessment; CSS Layout: Assessment; Accessibility: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: responsive-web-unit-1, responsive-web-unit-2, responsive-product-catalogue, responsive-navigation. All require evaluator evidence; optional work does not block.

## Module: Accessibility Foundations

ID: accessibility-foundations | Foundation | Version 1.0.0

Prerequisites: html-core (hard, skill), css-core (hard, skill)

### Objectives

- Complete Keyboard-Only Challenge and Semantic Repair; record each unreachable or unnamed control.

- Fix the Form, investigate contrast and replace a colour-only success state with meaningful text.

### Lesson: Meaning, keyboard and focus

ID: accessibility-foundations-unit-1

Prerequisites: html-core (hard, skill), css-core (hard, skill)

**Why it exists.** A visual layout alone does not communicate how to operate a page.

**Real-world example.** A signup form can look complete while excluding keyboard and screen-reader users.

**How it works.** Native links, buttons and inputs provide behaviour and semantics that generic elements do not. Accessible names identify controls; visible labels should agree with them. Landmarks and heading hierarchy support navigation. Keep focus visible, preserve a logical order and avoid positive tabindex. Alternative text should convey an image’s purpose; decorative images have empty alt. ARIA supplements missing semantics but does not add keyboard behaviour.

```
<button type="button">Save draft</button>
<label for="email">Email address</label><input id="email" type="email" aria-describedby="email-help">
<p id="email-help">Used to reply to your enquiry.</p>
```

**Try it.** Complete Keyboard-Only Challenge and Semantic Repair; record each unreachable or unnamed control.

**Break it.** Replace a button with a clickable div and remove focus styling.

**Debug it.** Explain the lost behaviour; restore native semantics and focus indication.

**Apply it.** Inspect accessible names and headings in browser tools, then check with a screen reader.

Mission connection: repair-inaccessible-signup. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Errors, contrast and status

ID: accessibility-foundations-unit-2

Prerequisites: accessibility-foundations-unit-1 (hard, knowledge)

**Why it exists.** Information must remain understandable without colour or visual position alone.

**Real-world example.** A red border does not tell a user what is wrong with an email address.

**How it works.** Write specific error text and associate it with its field. Indicate invalid fields, move focus deliberately after submission when useful, and announce asynchronous status without repeatedly interrupting the user. Contrast tools identify colour problems, but automated scans do not prove usability. Check text, focus, zoom and keyboard behaviour manually too.

```
<p id="email-error">Enter an address containing @.</p>
<input aria-invalid="true" aria-describedby="email-error">
<p role="status">Draft saved.</p>
```

**Try it.** Fix the Form, investigate contrast and replace a colour-only success state with meaningful text.

**Break it.** Announce every keystroke in an assertive live region.

**Debug it.** Explain the interruption and reduce announcements to useful state changes.

**Apply it.** Write a short accessibility test record covering names, focus, errors, contrast and zoom.

Mission connection: repair-inaccessible-signup. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Repair an Inaccessible Signup Form

ID: repair-inaccessible-signup | Foundation | Moderate | mission

Repair a local form with missing labels, click-only actions and red-only errors.

Prerequisites: accessibility-foundations-unit-2 (hard, knowledge)

#### Required behaviour

- Associated labels and useful instructions

- Logical keyboard order and visible focus

- Textual validation and accessible error association

- Status communicated without colour alone

- Keyboard, zoom and screen-reader observations recorded

#### Explain

Explain why ARIA is unnecessary for one native control.

#### Modify

Add a new required field and preserve error navigation.

#### Rubric

- **required / hybrid:** Associated labels and useful instructions

- **required / hybrid:** Logical keyboard order and visible focus

- **required / hybrid:** Textual validation and accessible error association

- **required / hybrid:** Status communicated without colour alone

- **required / hybrid:** Keyboard, zoom and screen-reader observations recorded

- **required / reviewer:** Explain why ARIA is unnecessary for one native control.

- **required / hybrid:** Add a new required field and preserve error navigation.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Accessibility: Applied; Semantic HTML: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Repair a booking form

ID: accessible-booking-check | Foundation | Moderate | assessment

Audit a different booking form and correct its accessibility defects.

Prerequisites: repair-inaccessible-signup (hard, mission)

#### Required behaviour

- Diagnose rather than merely restyle the form

- Restore accessible names and operation

- Record manual checks alongside automated findings

#### Explain

Explain a limitation of automated accessibility scans.

#### Modify

Make a newly added confirmation message perceivable.

#### Rubric

- **required / hybrid:** Diagnose rather than merely restyle the form

- **required / hybrid:** Restore accessible names and operation

- **required / hybrid:** Record manual checks alongside automated findings

- **required / reviewer:** Explain a limitation of automated accessibility scans.

- **required / hybrid:** Make a newly added confirmation message perceivable.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Accessibility: Assessment; Semantic HTML: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: accessibility-foundations-unit-1, accessibility-foundations-unit-2, repair-inaccessible-signup, accessible-booking-check. All require evaluator evidence; optional work does not block.

## Module: Browser Developer Tools

ID: browser-devtools | Foundation | Version 1.0.0

Prerequisites: web-how-it-works (hard, skill), html-core (soft, skill), css-core (soft, skill)

### Objectives

- Find the Missing Style, Find the Failed Request, Fix the Layout and trace one console error to its file.

### Lesson: Inspect, hypothesize, verify

ID: browser-devtools-unit-1

Prerequisites: web-how-it-works (hard, skill), html-core (soft, skill), css-core (soft, skill)

**Why it exists.** Guessing at a defect makes it difficult to know whether a fix worked.

**Real-world example.** A landing page contains a failed stylesheet, an overflowing image and an undefined variable.

**How it works.** Elements exposes the DOM; Styles and Computed explain the cascade and box model. Console errors identify a source location, while Network shows URLs, status and responses. Responsive mode helps reproduce layout failures; Storage exposes local values; accessibility inspection shows roles and names. Save fixes in source, not just in an inspector. Never copy authentication tokens into a public bug report.

```
Observation → reproducible steps → hypothesis → one change → regression check
```

**Try it.** Find the Missing Style, Find the Failed Request, Fix the Layout and trace one console error to its file.

**Break it.** Change multiple unrelated declarations before testing.

**Debug it.** Revert unrelated edits and isolate one cause at a time using evidence.

**Apply it.** Write a five-defect investigation log including a semantic issue.

Mission connection: debug-broken-landing-page. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Debug a Broken Landing Page

ID: debug-broken-landing-page | Foundation | Moderate | mission

Diagnose incorrect CSS, a missing asset, a console error, overflow and a semantic defect in a local page.

Prerequisites: browser-devtools-unit-1 (hard, knowledge)

#### Required behaviour

- Reproduction steps for five defects

- Tool observation supporting each cause

- Source fixes and regression checks

- No secret traffic or tokens in the report

#### Explain

Explain one hypothesis that the evidence rejected.

#### Modify

Introduce a new asset path and verify it without changing unrelated code.

#### Rubric

- **required / hybrid:** Reproduction steps for five defects

- **required / hybrid:** Tool observation supporting each cause

- **required / hybrid:** Source fixes and regression checks

- **required / hybrid:** No secret traffic or tokens in the report

- **required / reviewer:** Explain one hypothesis that the evidence rejected.

- **required / hybrid:** Introduce a new asset path and verify it without changing unrelated code.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Browser DevTools: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Investigate an event page

ID: devtools-check | Foundation | Moderate | assessment

Use an unfamiliar local event page with a bad image URL and spacing defect.

Prerequisites: debug-broken-landing-page (hard, mission)

#### Required behaviour

- Use Network and computed styles

- Fix source and reload

- Describe the remaining uncertainty

#### Explain

Distinguish a network failure from a CSS failure.

#### Modify

Reproduce the same layout issue at another width.

#### Rubric

- **required / hybrid:** Use Network and computed styles

- **required / hybrid:** Fix source and reload

- **required / hybrid:** Describe the remaining uncertainty

- **required / reviewer:** Distinguish a network failure from a CSS failure.

- **required / hybrid:** Reproduce the same layout issue at another width.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Browser DevTools: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: browser-devtools-unit-1, debug-broken-landing-page, devtools-check. All require evaluator evidence; optional work does not block.

## Module: Programming with JavaScript

ID: javascript-programming-basics | Beginner | Version 1.0.0

Prerequisites: web-how-it-works (hard, skill)

### Objectives

- Build a Price Calculator, Temperature Converter, User Greeting and Discount Calculator with named inputs and predicted results.

- Predict comparisons for 0, a positive number, a numeric string, null and undefined.

### Lesson: Values before variable names

ID: javascript-programming-basics-unit-1

Prerequisites: web-how-it-works (hard, skill)

**Why it exists.** Programs need to remember and calculate with information.

**Real-world example.** A receipt contains a numeric price, a product name and a paid/unpaid state.

**How it works.** Strings represent text, numbers support arithmetic and booleans represent true/false. null can represent an intentional absence; undefined often means no value was supplied. const prevents reassignment of a binding, not all changes to an object. let permits reassignment. Use typeof and console output to inspect values. User input is often text and must be checked before numeric conversion.

```
const price = 25;
let quantity = 2;
const total = price * quantity;
console.log(total, typeof total);
```

**Try it.** Build a Price Calculator, Temperature Converter, User Greeting and Discount Calculator with named inputs and predicted results.

**Break it.** Add a numeric-looking string to a number, then try reassigning a const.

**Debug it.** Inspect types and read the error location. Convert deliberately; reject blank or non-finite input rather than silently using zero.

**Apply it.** Calculate a different receipt and explain every stored value.

Mission connection: tip-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Comparison and logical decisions

ID: javascript-programming-basics-unit-2

Prerequisites: javascript-programming-basics-unit-1 (hard, knowledge)

**Why it exists.** A result often depends on more than arithmetic.

**Real-world example.** A delivery can be eligible only when it has an address and a non-negative total.

**How it works.** Strict equality avoids implicit type conversion. Comparisons produce booleans; logical AND and OR combine conditions, while NOT reverses truth. Parentheses make intent readable. Evaluate a few concrete cases before running code. A comparison is not an assignment.

```
const valid = Number.isFinite(total) && total >= 0;
console.log(total === 50, valid);
```

**Try it.** Predict comparisons for 0, a positive number, a numeric string, null and undefined.

**Break it.** Use assignment instead of comparison inside a condition.

**Debug it.** Trace which value changed and replace the unintended assignment.

**Apply it.** Define valid input rules for a calculator before writing its formula.

Mission connection: tip-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Tip Calculator

ID: tip-calculator | Beginner | Easy | mission

Calculate a tip and total from a bill and percentage; this is a learning exercise, not financial advice.

Prerequisites: javascript-programming-basics-unit-2 (hard, knowledge)

#### Required behaviour

- Accept finite, non-negative numeric inputs

- Reject empty and invalid input with an explanation

- Calculate tip and total correctly for zero and positive cases

- Display rounded output without changing the underlying formula

#### Explain

Explain why input text must be validated before arithmetic.

#### Modify

Allow splitting a bill between a positive integer number of people.

#### Rubric

- **required / hybrid:** Accept finite, non-negative numeric inputs

- **required / hybrid:** Reject empty and invalid input with an explanation

- **required / hybrid:** Calculate tip and total correctly for zero and positive cases

- **required / hybrid:** Display rounded output without changing the underlying formula

- **required / reviewer:** Explain why input text must be validated before arithmetic.

- **required / hybrid:** Allow splitting a bill between a positive integer number of people.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Applied; Variables: Applied; Operators: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Ticket price calculator

ID: price-check | Beginner | Easy | assessment

Calculate ticket subtotal and service charge using a different formula.

Prerequisites: tip-calculator (hard, mission)

#### Required behaviour

- Validate quantity and unit price

- Show subtotal and final total

- Test zero, invalid and ordinary cases

#### Explain

Explain string versus numeric addition.

#### Modify

Introduce a fixed handling charge without double-counting it.

#### Rubric

- **required / hybrid:** Validate quantity and unit price

- **required / hybrid:** Show subtotal and final total

- **required / hybrid:** Test zero, invalid and ordinary cases

- **required / reviewer:** Explain string versus numeric addition.

- **required / hybrid:** Introduce a fixed handling charge without double-counting it.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Assessment; Variables: Assessment; Operators: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-programming-basics-unit-1, javascript-programming-basics-unit-2, tip-calculator, price-check. All require evaluator evidence; optional work does not block.

## Module: Conditions and Decisions

ID: javascript-conditions | Beginner | Version 1.0.0

Prerequisites: javascript-programming-basics (hard, skill)

### Objectives

- Implement age eligibility, account-state messaging, delivery pricing and grade classification; write boundary cases first.

### Lesson: Choose branches deliberately

ID: javascript-conditions-unit-1

Prerequisites: javascript-programming-basics (hard, skill)

**Why it exists.** Software must respond differently to different data.

**Real-world example.** A club offers an activity to eligible ages when places remain.

**How it works.** if selects a branch, else supplies an alternative and else if checks another possibility. Order matters when conditions overlap. Guard clauses can reject invalid input early. switch is useful for several explicit discrete cases, not every range. Truthiness is a conversion rule: 0 and an empty string are falsy; the text "false" is truthy.

```
if (!Number.isFinite(age)) { console.log("Enter an age"); }
else if (age >= 16) { console.log("Age requirement met"); }
else { console.log("Choose the junior activity"); }
```

**Try it.** Implement age eligibility, account-state messaging, delivery pricing and grade classification; write boundary cases first.

**Break it.** Place a broad age branch before a narrower overlapping branch.

**Debug it.** Trace both sides of every boundary and explain the unreachable branch.

**Apply it.** Use a switch for three delivery methods and justify that choice.

Mission connection: eligibility-checker. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Eligibility Checker

ID: eligibility-checker | Beginner | Easy | mission

A fictional workshop accepts ages 16 and above when seats remain; younger learners require the junior session.

Prerequisites: javascript-conditions-unit-1 (hard, knowledge)

#### Required behaviour

- Reject missing or negative ages and invalid seat counts

- Handle age 15 and 16 distinctly

- Report a full session before promising a place

- Return clear reasons for each outcome

#### Explain

Explain condition order with a truth table.

#### Modify

Add an adult-only session without breaking junior guidance.

#### Rubric

- **required / hybrid:** Reject missing or negative ages and invalid seat counts

- **required / hybrid:** Handle age 15 and 16 distinctly

- **required / hybrid:** Report a full session before promising a place

- **required / hybrid:** Return clear reasons for each outcome

- **required / reviewer:** Explain condition order with a truth table.

- **required / hybrid:** Add an adult-only session without breaking junior guidance.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Applied; Conditional Logic: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Delivery rules

ID: delivery-check | Beginner | Easy | assessment

Compute free delivery for orders at least 500 unless the area requires collection.

Prerequisites: eligibility-checker (hard, mission)

#### Required behaviour

- Check invalid amounts

- Test the exact threshold

- Prioritize the collection restriction

#### Explain

Explain overlapping conditions.

#### Modify

Add a separate express delivery option.

#### Rubric

- **required / hybrid:** Check invalid amounts

- **required / hybrid:** Test the exact threshold

- **required / hybrid:** Prioritize the collection restriction

- **required / reviewer:** Explain overlapping conditions.

- **required / hybrid:** Add a separate express delivery option.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Assessment; Conditional Logic: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-conditions-unit-1, eligibility-checker, delivery-check. All require evaluator evidence; optional work does not block.

## Module: Functions

ID: javascript-functions | Beginner | Version 1.0.0

Prerequisites: javascript-programming-basics (hard, skill), javascript-conditions (hard, skill)

### Objectives

- Write Calculate Tax, Format Name, Calculate Cart Total and Validate Age functions with explicit inputs and outputs.

- Predict the example result and explain which rate is used.

### Lesson: Reusable behaviour and returned values

ID: javascript-functions-unit-1

Prerequisites: javascript-programming-basics (hard, skill), javascript-conditions (hard, skill)

**Why it exists.** Repeating a formula makes later changes easy to miss.

**Real-world example.** Several checkout screens need the same subtotal calculation.

**How it works.** A function groups behaviour. Parameters name incoming values; arguments supply them at a call. return sends a result to the caller and ends that invocation; console.log only displays information. Local variables belong to their scope. Function declarations, expressions and arrow functions can all be useful. A pure function depends on inputs and avoids unrelated side effects, making examples easier to test.

```
function lineTotal(price, count) {
  return price * count;
}
const result = lineTotal(12, 3);
const double = value => value * 2;
```

**Try it.** Write Calculate Tax, Format Name, Calculate Cart Total and Validate Age functions with explicit inputs and outputs.

**Break it.** Remove return from a calculator and read its result.

**Debug it.** Compare logged output with the returned undefined value; restore the return and add a check.

**Apply it.** Reuse one function in two different scenarios without a global mutable total.

Mission connection: checkout-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Scope and debugging calls

ID: javascript-functions-unit-2

Prerequisites: javascript-functions-unit-1 (hard, knowledge)

**Why it exists.** Names can refer to different values in different parts of a program.

**Real-world example.** A discount accidentally reads an old global rate instead of the supplied rate.

**How it works.** Block-scoped let and const are limited to their block. A function can access its surrounding lexical scope; passing values explicitly often makes dependencies clearer. Trace arguments at the call and parameters inside the function separately. Give a returned value a meaningful name and test it independently of a UI.

```
const rate = 0.1;
function discounted(amount, rate) { return amount * (1 - rate); }
console.log(discounted(100, 0.2));
```

**Try it.** Predict the example result and explain which rate is used.

**Break it.** Call a two-parameter function with one argument.

**Debug it.** Inspect the missing parameter and resulting NaN; validate inputs or supply the intended argument.

**Apply it.** Refactor a repeated tax formula without changing results.

Mission connection: checkout-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Checkout Calculator

ID: checkout-calculator | Beginner | Easy | mission

Compose reusable subtotal, discount, tax and final-total functions.

Prerequisites: javascript-functions-unit-2 (hard, knowledge)

#### Required behaviour

- Explicit input and return contracts

- Discount applied before tax under the stated exercise rule

- Invalid amounts rejected

- Independent examples cover zero and normal cases

- No accidental global accumulated total

#### Explain

Explain each function’s responsibility and scope.

#### Modify

Add a capped discount and update regression examples.

#### Rubric

- **required / hybrid:** Explicit input and return contracts

- **required / hybrid:** Discount applied before tax under the stated exercise rule

- **required / hybrid:** Invalid amounts rejected

- **required / hybrid:** Independent examples cover zero and normal cases

- **required / hybrid:** No accidental global accumulated total

- **required / reviewer:** Explain each function’s responsibility and scope.

- **required / hybrid:** Add a capped discount and update regression examples.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: Functions: Applied; JavaScript: Applied; Problem Solving: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Shipping quote functions

ID: function-check | Beginner | Easy | assessment

Compose weight and zone calculations for a shipping quote.

Prerequisites: checkout-calculator (hard, mission)

#### Required behaviour

- Return results rather than only logging

- Handle unknown zones deliberately

- Reuse calculation behaviour across two orders

#### Explain

Explain one pure function.

#### Modify

Change the base fee in one place.

#### Rubric

- **required / hybrid:** Return results rather than only logging

- **required / hybrid:** Handle unknown zones deliberately

- **required / hybrid:** Reuse calculation behaviour across two orders

- **required / reviewer:** Explain one pure function.

- **required / hybrid:** Change the base fee in one place.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: Functions: Assessment; JavaScript: Assessment; Problem Solving: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-functions-unit-1, javascript-functions-unit-2, checkout-calculator, function-check. All require evaluator evidence; optional work does not block.

## Module: Arrays and Objects

ID: javascript-data-collections | Foundation | Version 1.0.0

Prerequisites: javascript-functions (hard, skill)

### Objectives

- Create product, contact, cart and task records; add and remove items and inspect their shape.

### Lesson: Groups, records and identity

ID: javascript-data-collections-unit-1

Prerequisites: javascript-functions (hard, skill)

**Why it exists.** Applications need both ordered collections and structured individual records.

**Real-world example.** A shopping list contains items with stable identities and quantities.

**How it works.** An array groups values and uses zero-based indexes; length is the count, so the last index is length minus one. Objects group named properties. An array of objects represents many records. for and for...of iterate; while repeats until a condition changes. push appends and splice removes by position, but a record’s identity should not depend on its changing index. Nested shapes require deliberate access.

```
const items = [{ id: "apples", title: "Apples", count: 2 }];
for (const item of items) { console.log(item.title, item.count); }
```

**Try it.** Create product, contact, cart and task records; add and remove items and inspect their shape.

**Break it.** Iterate while index <= items.length and access each item title.

**Debug it.** Identify the out-of-range undefined value and correct the boundary.

**Apply it.** Update a record by stable ID after removing an earlier item.

Mission connection: shopping-list-logic. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Shopping List Logic

ID: shopping-list-logic | Foundation | Moderate | mission

Implement an in-memory shopping list before adding a browser interface.

Prerequisites: javascript-data-collections-unit-1 (hard, knowledge)

#### Required behaviour

- Add, identify, update and remove items

- Use stable item identity

- Compute item count from current data

- Handle missing IDs without editing a different item

- Loop safely over an empty list

#### Explain

Explain array versus object and identity versus position.

#### Modify

Support quantities without confusing record count with total quantity.

#### Rubric

- **required / hybrid:** Add, identify, update and remove items

- **required / hybrid:** Use stable item identity

- **required / hybrid:** Compute item count from current data

- **required / hybrid:** Handle missing IDs without editing a different item

- **required / hybrid:** Loop safely over an empty list

- **required / reviewer:** Explain array versus object and identity versus position.

- **required / hybrid:** Support quantities without confusing record count with total quantity.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Arrays: Applied; Objects: Applied; Data Modelling: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Contact Data Formatter

ID: collections-check | Foundation | Moderate | assessment

Format contact records with optional phone numbers.

Prerequisites: shopping-list-logic (hard, mission)

#### Required behaviour

- Handle empty and missing optional data

- Preserve the original records

- Produce one result for each contact

#### Explain

Explain the chosen data shape.

#### Modify

Add a preferred contact method.

#### Rubric

- **required / hybrid:** Handle empty and missing optional data

- **required / hybrid:** Preserve the original records

- **required / hybrid:** Produce one result for each contact

- **required / reviewer:** Explain the chosen data shape.

- **required / hybrid:** Add a preferred contact method.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Arrays: Assessment; Objects: Assessment; Data Modelling: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-data-collections-unit-1, shopping-list-logic, collections-check. All require evaluator evidence; optional work does not block.

## Module: JavaScript Debugging

ID: javascript-debugging-foundations | Foundation | Version 1.0.0

Prerequisites: javascript-functions (hard, skill), javascript-data-collections (hard, skill)

### Objectives

- Repair Broken Price Calculator, Broken Contact Formatter and Broken Shopping List; keep before/after observations.

### Lesson: Reproduce, inspect and explain

ID: javascript-debugging-foundations-unit-1

Prerequisites: javascript-functions (hard, skill), javascript-data-collections (hard, skill)

**Why it exists.** A plausible edit is not evidence that a bug is fixed.

**Real-world example.** A price calculator concatenates strings and a contact formatter crashes on an absent field.

**How it works.** Syntax errors prevent parsing; runtime errors interrupt execution; logic errors produce the wrong behaviour without throwing. Read the message and stack location, inspect values and types, reduce the case, state a hypothesis and test one change. Keep the original failing input as a regression example. Debugging is evaluated by reasoning and result, not speed.

```
const brokenTotal = "12" + 3;
console.log({ brokenTotal, type: typeof brokenTotal });
```

**Try it.** Repair Broken Price Calculator, Broken Contact Formatter and Broken Shopping List; keep before/after observations.

**Break it.** Apply a catch that silently hides every error.

**Debug it.** Remove the blanket suppression and inspect the first meaningful failure.

**Apply it.** Write a root-cause note another learner could reproduce.

Mission connection: debugging-trio. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Three Debugging Investigations

ID: debugging-trio | Foundation | Moderate | mission

Fix arithmetic type confusion, missing contact data and an off-by-one list loop.

Prerequisites: javascript-debugging-foundations-unit-1 (hard, knowledge)

#### Required behaviour

- Reproduce all three defects

- Record relevant values and source locations

- Fix the cause with regression cases

- Explain why the original behaviour occurred

#### Explain

Distinguish syntax, runtime and logic failures.

#### Modify

Test the repaired list with zero and one item.

#### Rubric

- **required / hybrid:** Reproduce all three defects

- **required / hybrid:** Record relevant values and source locations

- **required / hybrid:** Fix the cause with regression cases

- **required / hybrid:** Explain why the original behaviour occurred

- **required / reviewer:** Distinguish syntax, runtime and logic failures.

- **required / hybrid:** Test the repaired list with zero and one item.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Debugging: Applied; JavaScript: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Broken score calculator

ID: debugging-check | Foundation | Moderate | assessment

Investigate a score total that omits the last round.

Prerequisites: debugging-trio (hard, mission)

#### Required behaviour

- Reproduce with a small input

- Locate the boundary defect

- Fix and verify empty, one-round and multi-round cases

#### Explain

Explain the cause without relying on speed.

#### Modify

Add excluded rounds without losing correct totals.

#### Rubric

- **required / hybrid:** Reproduce with a small input

- **required / hybrid:** Locate the boundary defect

- **required / hybrid:** Fix and verify empty, one-round and multi-round cases

- **required / reviewer:** Explain the cause without relying on speed.

- **required / hybrid:** Add excluded rounds without losing correct totals.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Debugging: Assessment; JavaScript: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-debugging-foundations-unit-1, debugging-trio, debugging-check. All require evaluator evidence; optional work does not block.

## Module: DOM Foundations

ID: javascript-dom | Foundation | Version 1.0.0

Prerequisites: html-core (hard, skill), javascript-functions (hard, skill), javascript-data-collections (hard, skill)

### Objectives

- Update a heading, toggle a class, render one product and then an array with an empty state.

### Lesson: Render application data

ID: javascript-dom-unit-1

Prerequisites: html-core (hard, skill), javascript-functions (hard, skill), javascript-data-collections (hard, skill)

**Why it exists.** JavaScript values need a visible representation that reflects current data.

**Real-world example.** A contact directory displays records and an empty state.

**How it works.** The DOM is an object representation of the live document. querySelector finds an element or null. Read or set textContent for plain text, update classList and attributes for state, and create/append/remove elements for collections. Render from application data instead of storing conflicting copies in several elements. Do not use untrusted text as innerHTML.

```
const heading = document.querySelector("h1");
if (heading) heading.textContent = "Contacts";
const item = document.createElement("li");
item.textContent = "Lerato";
```

**Try it.** Update a heading, toggle a class, render one product and then an array with an empty state.

**Break it.** Run selection before an element exists and call a method on null.

**Debug it.** Inspect timing and markup; load the script with defer or initialize after the DOM is ready.

**Apply it.** Render user-entered angle brackets as text instead of executable markup.

Mission connection: dynamic-contact-directory. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Dynamic Contact Directory

ID: dynamic-contact-directory | Foundation | Moderate | mission

Render structured contacts into a semantic list.

Prerequisites: javascript-dom-unit-1 (hard, knowledge)

#### Required behaviour

- Data-driven names and contact methods

- Empty state for no contacts

- Safe plain-text rendering

- No duplicated stale rows after rendering again

#### Explain

Explain HTML source versus live DOM.

#### Modify

Add an optional role field without crashing old records.

#### Rubric

- **required / hybrid:** Data-driven names and contact methods

- **required / hybrid:** Empty state for no contacts

- **required / hybrid:** Safe plain-text rendering

- **required / hybrid:** No duplicated stale rows after rendering again

- **required / reviewer:** Explain HTML source versus live DOM.

- **required / hybrid:** Add an optional role field without crashing old records.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: DOM: Applied; JavaScript: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Museum object list

ID: dom-check | Foundation | Moderate | assessment

Render objects grouped by gallery.

Prerequisites: dynamic-contact-directory (hard, mission)

#### Required behaviour

- Correct grouping and labels

- Missing optional data handled

- Updating data updates the visible list

#### Explain

Explain where application data lives.

#### Modify

Remove an object and rerender without leftovers.

#### Rubric

- **required / hybrid:** Correct grouping and labels

- **required / hybrid:** Missing optional data handled

- **required / hybrid:** Updating data updates the visible list

- **required / reviewer:** Explain where application data lives.

- **required / hybrid:** Remove an object and rerender without leftovers.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: DOM: Assessment; JavaScript: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-dom-unit-1, dynamic-contact-directory, dom-check. All require evaluator evidence; optional work does not block.

## Module: Events and Interaction

ID: javascript-events | Foundation | Version 1.0.0

Prerequisites: javascript-dom (hard, skill)

### Objectives

- Add, remove and complete items with visible updates; submit by keyboard.

### Lesson: Respond to user intent

ID: javascript-events-unit-1

Prerequisites: javascript-dom (hard, skill)

**Why it exists.** The page must connect actions to changes in data.

**Real-world example.** A shopping-list form should submit from a button or Enter.

**How it works.** addEventListener registers a function for later. The event object describes the interaction; target is the originating element and currentTarget is the listener’s element. Events can propagate through ancestors. Listen to form submit for submission and preventDefault only when replacing the native behaviour intentionally. Native buttons provide keyboard activation; adding key handlers to a div is not an equivalent shortcut.

```
form.addEventListener("submit", event => {
  event.preventDefault();
  console.log(new FormData(form).get("item"));
});
```

**Try it.** Add, remove and complete items with visible updates; submit by keyboard.

**Break it.** Register the same listener after every render.

**Debug it.** Count handler calls and move registration to the correct lifecycle point.

**Apply it.** Use event delegation for a list and distinguish the clicked action from its container.

Mission connection: interactive-shopping-list. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Interactive Shopping List

ID: interactive-shopping-list | Foundation | Moderate | mission

Connect your shopping-list logic to a labelled form and visible list.

Prerequisites: javascript-events-unit-1 (hard, knowledge)

#### Required behaviour

- Add, remove and mark complete

- Use keyboard-operable controls

- Render each action once

- Completion state is not colour-only

- No duplicate listeners after repeated operations

#### Explain

Explain propagation and why submit is preferable to a click-only handler.

#### Modify

Add an undo-completion action.

#### Rubric

- **required / hybrid:** Add, remove and mark complete

- **required / hybrid:** Use keyboard-operable controls

- **required / hybrid:** Render each action once

- **required / hybrid:** Completion state is not colour-only

- **required / hybrid:** No duplicate listeners after repeated operations

- **required / reviewer:** Explain propagation and why submit is preferable to a click-only handler.

- **required / hybrid:** Add an undo-completion action.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Events: Applied; DOM: Applied; Accessibility: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Attendance list

ID: events-check | Foundation | Moderate | assessment

Build a local attendee list with arrival toggles.

Prerequisites: interactive-shopping-list (hard, mission)

#### Required behaviour

- Enter submission works

- Each control changes only its target record

- Visible state follows data

#### Explain

Explain stable identity in an event handler.

#### Modify

Add a clear-completed action with an explicit label.

#### Rubric

- **required / hybrid:** Enter submission works

- **required / hybrid:** Each control changes only its target record

- **required / hybrid:** Visible state follows data

- **required / reviewer:** Explain stable identity in an event handler.

- **required / hybrid:** Add a clear-completed action with an explicit label.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Events: Assessment; DOM: Assessment; Accessibility: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-events-unit-1, interactive-shopping-list, events-check. All require evaluator evidence; optional work does not block.

## Module: Forms and Validation

ID: javascript-forms-validation | Foundation | Version 1.0.0

Prerequisites: javascript-events (hard, skill), accessibility-foundations (soft, skill)

### Objectives

- Build validation functions and render specific accessible errors without losing valid inputs.

### Lesson: Validate for useful feedback

ID: javascript-forms-validation-unit-1

Prerequisites: javascript-events (hard, skill), accessibility-foundations (soft, skill)

**Why it exists.** Invalid input should be explainable before it becomes broken application state.

**Real-world example.** A registration exercise needs a name, email and sufficiently long password.

**How it works.** Read values, normalize non-sensitive text deliberately, validate against explicit rules and show errors next to associated controls. Do not trim passwords or silently change their meaning. Native required/type constraints help, but client checks are bypassable and never authorize server operations. This local practice does not create an account or send credentials anywhere.

```
const name = String(new FormData(form).get("name") ?? "").trim();
const error = name ? "" : "Enter your name.";
```

**Try it.** Build validation functions and render specific accessible errors without losing valid inputs.

**Break it.** Show a green success box even when required fields are empty.

**Debug it.** Trace the submit path and stop success until every required condition is met.

**Apply it.** Add error-summary links to invalid fields for a longer form.

Mission connection: registration-form-validator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Registration Form Validator

ID: registration-form-validator | Foundation | Moderate | mission

Build a local-only form; use invented values, never a real password.

Prerequisites: javascript-forms-validation-unit-1 (hard, knowledge)

#### Required behaviour

- Name cannot be whitespace only

- Email has an appropriate exercise-level format check

- Password minimum is explicitly shown as 12 characters

- Invalid submission retains input and shows associated errors

- Valid state says validation succeeded locally, not account created

- No password stored or logged

#### Explain

Explain why server validation is still required.

#### Modify

Add a contact preference that changes which non-sensitive field is required.

#### Rubric

- **required / hybrid:** Name cannot be whitespace only

- **required / hybrid:** Email has an appropriate exercise-level format check

- **required / hybrid:** Password minimum is explicitly shown as 12 characters

- **required / hybrid:** Invalid submission retains input and shows associated errors

- **required / hybrid:** Valid state says validation succeeded locally, not account created

- **required / hybrid:** No password stored or logged

- **required / reviewer:** Explain why server validation is still required.

- **required / hybrid:** Add a contact preference that changes which non-sensitive field is required.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Forms: Applied; Validation: Applied; Accessibility: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Volunteer enquiry form

ID: forms-check | Foundation | Moderate | assessment

Validate a different name, contact and availability form.

Prerequisites: registration-form-validator (hard, mission)

#### Required behaviour

- Normalize name text

- Reject missing required contact details

- Keyboard-accessible feedback

- No false message-delivery claim

#### Explain

Explain one normalization choice.

#### Modify

Add a conditional availability field.

#### Rubric

- **required / hybrid:** Normalize name text

- **required / hybrid:** Reject missing required contact details

- **required / hybrid:** Keyboard-accessible feedback

- **required / hybrid:** No false message-delivery claim

- **required / reviewer:** Explain one normalization choice.

- **required / hybrid:** Add a conditional availability field.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Forms: Assessment; Validation: Assessment; Accessibility: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-forms-validation-unit-1, registration-form-validator, forms-check. All require evaluator evidence; optional work does not block.

## Module: Array Transformations

ID: javascript-array-transformations | Foundation | Version 1.0.0

Prerequisites: javascript-data-collections (hard, skill), javascript-functions (hard, skill)

### Objectives

- Predict results for all six methods, then implement immutable updates and a derived count.

### Lesson: Derive views from one collection

ID: javascript-array-transformations-unit-1

Prerequisites: javascript-data-collections (hard, skill), javascript-functions (hard, skill)

**Why it exists.** Copying lists into independent state makes counts and filters disagree.

**Real-world example.** A product catalogue needs search, category filtering and a total.

**How it works.** map transforms each value, filter selects a subset, find returns one match, some and every answer boolean questions, forEach performs side effects and reduce combines values using an accumulator. Use an initial accumulator for an empty collection. Spread copies shallowly; nested changes require copying each changed level. Derived results should come from the underlying collection rather than a second mutable source of truth.

```
const visible = products.filter(p => p.category === category);
const names = visible.map(p => p.name);
const total = visible.reduce((sum, p) => sum + p.price, 0);
```

**Try it.** Predict results for all six methods, then implement immutable updates and a derived count.

**Break it.** Use map without returning a value or mutate nested data after a shallow copy.

**Debug it.** Inspect the output and original collection; explain what was shared.

**Apply it.** Combine a case-insensitive search and category filter without losing the original list.

Mission connection: product-search-filter. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Product Search and Filter

ID: product-search-filter | Foundation | Moderate | mission

Build a view of a supplied product collection.

Prerequisites: javascript-array-transformations-unit-1 (hard, knowledge)

#### Required behaviour

- Render products

- Combine search and category filter

- Derive result count from the same visible collection

- Provide an empty state

- Preserve original data

#### Explain

Explain map versus filter and when reduce is useful.

#### Modify

Add a price-range filter while keeping all filters composable.

#### Rubric

- **required / hybrid:** Render products

- **required / hybrid:** Combine search and category filter

- **required / hybrid:** Derive result count from the same visible collection

- **required / hybrid:** Provide an empty state

- **required / hybrid:** Preserve original data

- **required / reviewer:** Explain map versus filter and when reduce is useful.

- **required / hybrid:** Add a price-range filter while keeping all filters composable.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Array Transformations: Applied; Immutability: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Expense summary

ID: transform-check | Foundation | Moderate | assessment

Group and total expenses without mutating the input.

Prerequisites: product-search-filter (hard, mission)

#### Required behaviour

- Correct empty and ordinary totals

- Filter by category

- Stable underlying data

#### Explain

Explain accumulator initialization.

#### Modify

Add a refundable flag and derive net totals.

#### Rubric

- **required / hybrid:** Correct empty and ordinary totals

- **required / hybrid:** Filter by category

- **required / hybrid:** Stable underlying data

- **required / reviewer:** Explain accumulator initialization.

- **required / hybrid:** Add a refundable flag and derive net totals.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Array Transformations: Assessment; Immutability: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-array-transformations-unit-1, product-search-filter, transform-check. All require evaluator evidence; optional work does not block.

## Module: Browser Storage

ID: javascript-browser-storage | Foundation | Version 1.0.0

Prerequisites: javascript-data-collections (hard, skill), javascript-dom (hard, skill), javascript-events (hard, skill), javascript-forms-validation (hard, skill), javascript-array-transformations (hard, skill)

### Objectives

- Increment a counter, reload and explain the reset before adding persistence.

- Build Remember My Theme with light/dark selection, refresh restoration and single-key reset.

- Persist a structured shopping list; inspect the encoded string and restored array.

- Complete Persistent Shopping List and reproduce a completed-item restoration bug.

- Document what the preference app stores, its origin and its recovery limits.

### Lesson: Why data disappears

ID: javascript-browser-storage-unit-1

Prerequisites: javascript-data-collections (hard, skill), javascript-dom (hard, skill), javascript-events (hard, skill), javascript-forms-validation (hard, skill), javascript-array-transformations (hard, skill)

**Why it exists.** An in-memory variable is recreated when the page starts again.

**Real-world example.** A list containing Finish portfolio, Practice React and Update CV vanishes after refresh.

**How it works.** Application state describes the current running instance. Persistence stores a representation outside that instance. Refresh starts JavaScript again; an ordinary variable has no automatic relationship to saved data. Decide what should survive, for whom and for how long before choosing storage. Browser storage is per origin and can be unavailable, cleared or evicted; it is not a cross-device guarantee.

```
let tasks = [];
let count = 0;
```

**Try it.** Increment a counter, reload and explain the reset before adding persistence.

**Break it.** Assume declaring the variable with const would preserve it.

**Debug it.** Compare variable lifetime with storage lifetime; const controls reassignment, not persistence.

**Apply it.** Classify a theme, a shopping list and a database password by whether browser persistence is suitable.

Mission connection: persistent-developer-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Local and session storage

ID: javascript-browser-storage-unit-2

Prerequisites: javascript-browser-storage-unit-1 (hard, knowledge)

**Why it exists.** Different information has different lifetimes.

**Real-world example.** A theme may be remembered across sessions while wizard progress is scoped to a tab session.

**How it works.** localStorage retains string key/value pairs across ordinary browser sessions unless removed. sessionStorage is scoped to an origin and top-level browsing context and normally lasts for the tab’s session, including reloads. Use setItem, getItem and removeItem with namespaced keys. Do not clear all origin data to reset one preference. Access and writes can throw, so keep the UI usable and show an understandable save failure.

```
localStorage.setItem("practice:theme", "dark");
const theme = localStorage.getItem("practice:theme");
localStorage.removeItem("practice:theme");
sessionStorage.setItem("practice:step", "2");
```

**Try it.** Build Remember My Theme with light/dark selection, refresh restoration and single-key reset.

**Break it.** Save under one key and load from a different key.

**Debug it.** Inspect both keys in DevTools and trace when reads and writes happen.

**Apply it.** Choose storage for a temporary wizard and explain the decision.

Mission connection: persistent-developer-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Strings, JSON and arrays

ID: javascript-browser-storage-unit-3

Prerequisites: javascript-browser-storage-unit-2 (hard, knowledge)

**Why it exists.** Structured data must be encoded and reconstructed without losing its shape.

**Real-world example.** A task record has an ID, title and completed boolean.

**How it works.** Storage converts values to strings. Writing an object directly loses the structure you intended. JSON.stringify serializes JSON-compatible data; JSON.parse decodes text and can throw. Parse success does not prove a valid shape: check Array.isArray and relevant field types. For numbers, handle a missing null before conversion because Number(null) is zero. Avoid treating zero as missing with a truthiness fallback.

```
const raw = localStorage.getItem("practice:count");
const count = raw === null ? 0 : Number(raw);
const encoded = JSON.stringify([{ id: "a", title: "Read", completed: false }]);
const decoded = JSON.parse(encoded);
console.log(Array.isArray(decoded));
```

**Try it.** Persist a structured shopping list; inspect the encoded string and restored array.

**Break it.** Save an object without serialization, omit parsing, then test malformed JSON and valid JSON with the wrong shape.

**Debug it.** Identify conversion versus parsing versus validation failures separately.

**Apply it.** Store a preferences object and reject an unknown theme or language.

Mission connection: persistent-developer-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Load, modify, save, restore

ID: javascript-browser-storage-unit-4

Prerequisites: javascript-browser-storage-unit-3 (hard, knowledge)

**Why it exists.** Calling setItem once is not a complete persistence lifecycle.

**Real-world example.** Completed tasks should remain completed after a reload.

**How it works.** On startup read saved data, parse and validate it, and choose a sensible default if absent. Render this state, modify it on interaction and save the updated representation after each relevant change. A read failure should not automatically overwrite the recoverable original. Offer a warning and deliberate reset/export path where appropriate. Catch storage errors at the boundary and distinguish unsaved changes from saved data.

```
function decodeList(raw) {
  if (raw === null) return [];
  const value = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error("Expected a list");
  return value; // Validate record fields before using them.
}
```

**Try it.** Complete Persistent Shopping List and reproduce a completed-item restoration bug.

**Break it.** Write an empty default before reading the previous list.

**Debug it.** Trace startup order; preserve the old raw value while repairing restore logic.

**Apply it.** Add a reset that removes only the exercise key and clearly states what will be lost.

Mission connection: persistent-developer-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Storage boundaries

ID: javascript-browser-storage-unit-5

Prerequisites: javascript-browser-storage-unit-4 (hard, knowledge)

**Why it exists.** Convenient local persistence does not provide server trust or a secure vault.

**Real-world example.** A locally edited score cannot be authoritative proof of achievement.

**How it works.** Scripts in an origin can read its browser storage; do not put passwords, private API keys, database credentials or server secrets there. A backend is needed for authenticated multi-user access, server validation, collaboration and reliable centralized records. Small non-sensitive preferences or drafts can use browser storage with clear limitations. Authentication storage needs a separate security design.

```
// Local preference only; never a server credential.
const key = "practice:preferredLanguage";
```

**Try it.** Document what the preference app stores, its origin and its recovery limits.

**Break it.** Pretend a browser-edited completion flag proves a passed assessment.

**Debug it.** Identify the missing trusted evaluator and reject the claim.

**Apply it.** Compare a local task list with a team task service requiring multiple devices.

Mission connection: persistent-developer-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Persistent Developer Preferences

ID: persistent-developer-preferences | Foundation | Moderate | mission

Build a Vanilla JavaScript preference interface inspired by the original Programming Language Toggle App; React is not required.

Prerequisites: javascript-browser-storage-unit-5 (hard, knowledge)

#### Required behaviour

- Offer JavaScript, Python, TypeScript and PHP as preference labels, not executable runtimes

- Offer light and dark themes

- Render and update selected values

- Persist and restore after reload

- Use sensible first-run defaults

- Handle malformed and wrong-shaped saved data without crashing

- Report unavailable storage honestly and avoid destroying unrelated keys

- Keep controls labelled and keyboard accessible

#### Explain

Explain what is stored, when it is written and when it is restored.

#### Modify

Add a reset-to-defaults action that preserves an unrelated storage key.

#### Rubric

- **required / hybrid:** Offer JavaScript, Python, TypeScript and PHP as preference labels, not executable runtimes

- **required / hybrid:** Offer light and dark themes

- **required / hybrid:** Render and update selected values

- **required / hybrid:** Persist and restore after reload

- **required / hybrid:** Use sensible first-run defaults

- **required / hybrid:** Handle malformed and wrong-shaped saved data without crashing

- **required / hybrid:** Report unavailable storage honestly and avoid destroying unrelated keys

- **required / hybrid:** Keep controls labelled and keyboard accessible

- **required / reviewer:** Explain what is stored, when it is written and when it is restored.

- **required / hybrid:** Add a reset-to-defaults action that preserves an unrelated storage key.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Browser Storage: Applied; JSON: Applied; Persistence: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Reading List Persistence

ID: reading-list-persistence | Foundation | Moderate | assessment

Repair a partially working reading list whose completion changes are not saved.

Prerequisites: persistent-developer-preferences (hard, mission)

#### Required behaviour

- Add, complete and remove books

- Save and restore structured records

- Handle missing, malformed and wrong-shaped data

- Reproduce and fix the controlled persistence defect

- Explain serialization and startup order

#### Explain

Explain why the list looked correct before reload but lost changes afterward.

#### Modify

Add an optional author field while handling older records.

#### Rubric

- **required / hybrid:** Add, complete and remove books

- **required / hybrid:** Save and restore structured records

- **required / hybrid:** Handle missing, malformed and wrong-shaped data

- **required / hybrid:** Reproduce and fix the controlled persistence defect

- **required / hybrid:** Explain serialization and startup order

- **required / reviewer:** Explain why the list looked correct before reload but lost changes afterward.

- **required / hybrid:** Add an optional author field while handling older records.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Browser Storage: Assessment; JSON: Assessment; Persistence: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-browser-storage-unit-1, javascript-browser-storage-unit-2, javascript-browser-storage-unit-3, javascript-browser-storage-unit-4, javascript-browser-storage-unit-5, persistent-developer-preferences, reading-list-persistence. All require evaluator evidence; optional work does not block.

## Module: Git and GitHub Foundations

ID: git-foundations | Foundation | Version 1.0.0

Prerequisites: browser-devtools (hard, skill)

### Objectives

- Create a disposable local repository, commit a profile page, make a branch and merge a small change.

- Create an issue and review a pull request in your own training repository, or prepare local review artifacts if remote access is unavailable.

### Lesson: Record and review changes

ID: git-foundations-unit-1

Prerequisites: browser-devtools (hard, skill)

**Why it exists.** A saved file does not explain what changed or provide an understandable history.

**Real-world example.** A teammate needs to review a validation fix independently of a layout change.

**How it works.** Git tracks a working tree, staging area and committed history. Review a diff, stage intended files and commit a coherent change. A branch names a line of development; merging integrates history and may require resolving conflicts. A remote is another repository location; clone obtains a copy, fetch obtains remote history, pull integrates and push publishes. Inspect before overwriting work.

```
git status
git diff
git add README.md
git commit -m "Explain local setup"
git switch -c improve-form
```

**Try it.** Create a disposable local repository, commit a profile page, make a branch and merge a small change.

**Break it.** Make conflicting edits to the same paragraph on two branches.

**Debug it.** Read both intentions, resolve the content, inspect the resulting diff and run the relevant checks.

**Apply it.** Clone your own practice repository and explain local versus remote history.

Mission connection: repository-handoff. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Repository collaboration

ID: git-foundations-unit-2

Prerequisites: git-foundations-unit-1 (hard, knowledge)

**Why it exists.** Code needs context for someone who did not write it.

**Real-world example.** An issue describes a broken form and a pull request links the fix and test evidence.

**How it works.** A GitHub repository hosts history and collaboration. Write a README with purpose, setup, limitations and test instructions. Use issues for reproducible problems and a pull request to explain changes and review them. Do not commit secrets or personal data. A public repository is inspectable; importing one is not proof that its importer authored it. Never rewrite shared history casually.

```
README: Purpose → Setup → Behaviour → Checks → Limitations
```

**Try it.** Create an issue and review a pull request in your own training repository, or prepare local review artifacts if remote access is unavailable.

**Break it.** Commit an invented example secret in a disposable repository and notice that deleting the current file leaves history.

**Debug it.** Explain why real exposed credentials require revocation rather than only a new commit.

**Apply it.** Prepare a review comment about observable behaviour and a supporting test.

Mission connection: repository-handoff. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Repository Handoff

ID: repository-handoff | Foundation | Moderate | mission

Prepare a real local repository and, when available, your own GitHub remote.

Prerequisites: git-foundations-unit-2 (hard, knowledge)

#### Required behaviour

- Coherent commits and readable diff

- Branch and merge demonstrated

- README setup can be followed

- Issue/review artifacts include reproduction and validation

- No credentials committed; unavailable remote steps clearly reported

#### Explain

Explain working tree, staging, commit and remote.

#### Modify

Resolve a controlled README conflict without losing either intended instruction.

#### Rubric

- **required / hybrid:** Coherent commits and readable diff

- **required / hybrid:** Branch and merge demonstrated

- **required / hybrid:** README setup can be followed

- **required / hybrid:** Issue/review artifacts include reproduction and validation

- **required / hybrid:** No credentials committed; unavailable remote steps clearly reported

- **required / reviewer:** Explain working tree, staging, commit and remote.

- **required / hybrid:** Resolve a controlled README conflict without losing either intended instruction.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Git: Applied; GitHub: Applied; Documentation: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Review a repair

ID: git-check | Foundation | Moderate | assessment

Review a small change in a disposable repository.

Prerequisites: repository-handoff (hard, mission)

#### Required behaviour

- Identify unintended edits

- Propose or apply a focused fix

- Preserve useful history

#### Explain

Explain what push would publish.

#### Modify

Add a regression check in a separate coherent commit.

#### Rubric

- **required / hybrid:** Identify unintended edits

- **required / hybrid:** Propose or apply a focused fix

- **required / hybrid:** Preserve useful history

- **required / reviewer:** Explain what push would publish.

- **required / hybrid:** Add a regression check in a separate coherent commit.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Git: Assessment; GitHub: Assessment; Documentation: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: git-foundations-unit-1, git-foundations-unit-2, repository-handoff, git-check. All require evaluator evidence; optional work does not block.

## Module: JavaScript Modules and Composition

ID: javascript-modules | Foundation | Version 1.0.0

Prerequisites: javascript-array-transformations (hard, skill)

### Objectives

- Separate a formatter, validator and renderer into modules; use destructuring, spread and template literals deliberately.

### Lesson: Explicit boundaries

ID: javascript-modules-unit-1

Prerequisites: javascript-array-transformations (hard, skill)

**Why it exists.** A growing application needs reusable code without relying on shared globals.

**Real-world example.** A task manager separates pure validation from DOM rendering.

**How it works.** ES modules export named or default values and import them explicitly. Use a module script or a build tool with correct paths. Destructuring binds selected properties or array positions; defaults handle undefined values, not every invalid input. Spread copies enumerable values shallowly. Template literals interpolate expressions. Keep modules focused and avoid circular initialization dependencies.

```
export function label({ title, completed = false }) {
  return `${completed ? "Done" : "Open"}: ${title}`;
}
// In another module: import { label } from "./labels.js";
```

**Try it.** Separate a formatter, validator and renderer into modules; use destructuring, spread and template literals deliberately.

**Break it.** Mismatch a named export and import, then mutate a nested value through a shallow copy.

**Debug it.** Read the import error and trace object identity separately.

**Apply it.** Reuse the validator in a console test without loading the DOM.

Mission connection: modular-expense-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Modular Expense Calculator

ID: modular-expense-calculator | Foundation | Moderate | mission

Split expense validation, totals and rendering into explicit modules.

Prerequisites: javascript-modules-unit-1 (hard, knowledge)

#### Required behaviour

- No implicit global dependencies

- Imports resolve

- Derived totals remain correct

- Immutable updates preserve source records

#### Explain

Explain why a shallow copy may still share nested data.

#### Modify

Add a different display without changing calculation logic.

#### Rubric

- **required / hybrid:** No implicit global dependencies

- **required / hybrid:** Imports resolve

- **required / hybrid:** Derived totals remain correct

- **required / hybrid:** Immutable updates preserve source records

- **required / reviewer:** Explain why a shallow copy may still share nested data.

- **required / hybrid:** Add a different display without changing calculation logic.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Modules: Applied; Destructuring: Applied; Spread: Applied; JavaScript: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Library data utilities

ID: modules-check | Foundation | Moderate | assessment

Organize filtering and formatting for a library list.

Prerequisites: modular-expense-calculator (hard, mission)

#### Required behaviour

- Pure utilities usable independently

- Correct import/export contracts

- Readable boundaries

#### Explain

Explain the direction of dependencies.

#### Modify

Replace the renderer while retaining utility tests.

#### Rubric

- **required / hybrid:** Pure utilities usable independently

- **required / hybrid:** Correct import/export contracts

- **required / hybrid:** Readable boundaries

- **required / reviewer:** Explain the direction of dependencies.

- **required / hybrid:** Replace the renderer while retaining utility tests.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Modules: Assessment; Destructuring: Assessment; Spread: Assessment; JavaScript: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-modules-unit-1, modular-expense-calculator, modules-check. All require evaluator evidence; optional work does not block.

## Module: Asynchronous JavaScript

ID: javascript-async | Intermediate | Version 1.0.0

Prerequisites: javascript-modules (hard, skill), javascript-debugging-foundations (hard, skill)

### Objectives

- Predict output order, handle a rejected promise and compare sequential versus independent parallel work.

### Lesson: Work that finishes later

ID: javascript-async-unit-1

Prerequisites: javascript-modules (hard, skill), javascript-debugging-foundations (hard, skill)

**Why it exists.** Waiting for I/O should not freeze the interface.

**Real-world example.** A search request returns after the user has typed another query.

**How it works.** A promise represents eventual fulfillment or rejection. then chains results; async functions return promises and await pauses that function’s continuation. A try/catch catches an awaited rejection, not an unrelated asynchronous callback. Use finally for cleanup but avoid making an obsolete request clear the state of a newer one. Independent operations may run together; sequence dependent operations deliberately.

```
async function loadValue(read) {
  try { return await read(); }
  catch { throw new Error("Could not load the value"); }
}
```

**Try it.** Predict output order, handle a rejected promise and compare sequential versus independent parallel work.

**Break it.** Forget await inside try/catch or let an older search overwrite newer results.

**Debug it.** Trace which promise was awaited and which request owns the result.

**Apply it.** Add cancellation or a request-generation check to protect current results.

Mission connection: async-search-controller. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Async Search Controller

ID: async-search-controller | Intermediate | Moderate | mission

Use a local fake transport with controlled delays; it is an explicit exercise fixture.

Prerequisites: javascript-async-unit-1 (hard, knowledge)

#### Required behaviour

- Loading, success and failure represented separately

- Rejections handled

- Old results cannot replace the newest query

- Cleanup does not clear unrelated work

#### Explain

Explain why a promise is not the result itself.

#### Modify

Introduce a cancelled request without showing it as a learner error.

#### Rubric

- **required / hybrid:** Loading, success and failure represented separately

- **required / hybrid:** Rejections handled

- **required / hybrid:** Old results cannot replace the newest query

- **required / hybrid:** Cleanup does not clear unrelated work

- **required / reviewer:** Explain why a promise is not the result itself.

- **required / hybrid:** Introduce a cancelled request without showing it as a learner error.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: Async: Applied; Promises: Applied; Error Handling: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Delayed availability

ID: async-check | Intermediate | Moderate | assessment

Load availability from a delayed local fixture.

Prerequisites: async-search-controller (hard, mission)

#### Required behaviour

- No unhandled rejection

- Correct ordering across overlapping requests

- Usable retry

#### Explain

Explain a race you reproduced.

#### Modify

Allow two independent resources to load together.

#### Rubric

- **required / hybrid:** No unhandled rejection

- **required / hybrid:** Correct ordering across overlapping requests

- **required / hybrid:** Usable retry

- **required / reviewer:** Explain a race you reproduced.

- **required / hybrid:** Allow two independent resources to load together.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: Async: Assessment; Promises: Assessment; Error Handling: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-async-unit-1, async-search-controller, async-check. All require evaluator evidence; optional work does not block.

## Module: HTTP, REST and API Interfaces

ID: http-rest-apis | Intermediate | Version 1.0.0

Prerequisites: javascript-async (hard, skill)

### Objectives

- Inspect method, URL, status, headers and JSON for a local API fixture and one documented public endpoint.

- Build a Weather Data Interface, GitHub Profile Viewer and API Error Handler against documented endpoints or labelled fixtures.

### Lesson: Request and response contracts

ID: http-rest-apis-unit-1

Prerequisites: javascript-async (hard, skill)

**Why it exists.** Applications communicate through contracts rather than direct access to another system’s memory.

**Real-world example.** A product browser requests a page of results from a service.

**How it works.** HTTP methods express operations; status codes describe outcomes. fetch usually resolves for an HTTP error response, so check response.ok or status before parsing. JSON is a representation, not a guarantee of valid fields. Authentication identifies a caller; authorization decides access. Never put a private provider key in browser source. Public API availability and limits are outside the UI’s control.

```
const response = await fetch("/api/products?page=1");
if (!response.ok) throw new Error(`Request failed: ${response.status}`);
const value = await response.json();
```

**Try it.** Inspect method, URL, status, headers and JSON for a local API fixture and one documented public endpoint.

**Break it.** Treat a 404 response as successful data.

**Debug it.** Inspect status before rendering; distinguish transport, HTTP and data-shape errors.

**Apply it.** Design a page contract that includes items and whether a next page exists.

Mission connection: paginated-product-browser. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Honest API states and safe retries

ID: http-rest-apis-unit-2

Prerequisites: http-rest-apis-unit-1 (hard, knowledge)

**Why it exists.** Users need a usable interface when the network is slow or unavailable.

**Real-world example.** A weather search may have no result, a limit response or a stale request.

**How it works.** Represent idle, loading, success, empty and failure explicitly. Preserve useful input on failure. Retry transient reads with a bound and respect Retry-After where present; do not loop on invalid input or repeat a mutation blindly. Pagination and debouncing reduce work but must not hide control state. Abort obsolete fetches with AbortController and check result ownership.

```
const controller = new AbortController();
fetch("/api/search?q=books", { signal: controller.signal });
// Cancel obsolete work: controller.abort();
```

**Try it.** Build a Weather Data Interface, GitHub Profile Viewer and API Error Handler against documented endpoints or labelled fixtures.

**Break it.** Retry every failure without a limit and discard the search input.

**Debug it.** Count requests, stop the retry loop and distinguish a user correction from a transient failure.

**Apply it.** Build a paginated search with accessible loading/error status.

Mission connection: paginated-product-browser. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Paginated Product Browser

ID: paginated-product-browser | Intermediate | Moderate | mission

Use a documented API or deterministic local fixture; disclose which one.

Prerequisites: http-rest-apis-unit-2 (hard, knowledge)

#### Required behaviour

- Search and pagination

- Loading, error and empty states

- Correct status and data validation

- No stale result overwrite

- Bounded retries for appropriate read failures

- Keyboard-operable controls; no client secrets

#### Explain

Explain authentication versus authorization and why a retry is safe here.

#### Modify

Handle a rate-limit response while preserving the current results.

#### Rubric

- **required / hybrid:** Search and pagination

- **required / hybrid:** Loading, error and empty states

- **required / hybrid:** Correct status and data validation

- **required / hybrid:** No stale result overwrite

- **required / hybrid:** Bounded retries for appropriate read failures

- **required / hybrid:** Keyboard-operable controls; no client secrets

- **required / reviewer:** Explain authentication versus authorization and why a retry is safe here.

- **required / hybrid:** Handle a rate-limit response while preserving the current results.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: HTTP: Applied; REST APIs: Applied; JSON: Applied; API Integration: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Community resource finder

ID: api-search-check | Intermediate | Moderate | assessment

Build a different API-driven resource search.

Prerequisites: paginated-product-browser (hard, mission)

#### Required behaviour

- Validate the response shape

- Handle timeout, empty and HTTP-error responses

- Paginate without duplicating results

#### Explain

Explain transport versus HTTP failure.

#### Modify

Add cancellation when a new query starts.

#### Rubric

- **required / hybrid:** Validate the response shape

- **required / hybrid:** Handle timeout, empty and HTTP-error responses

- **required / hybrid:** Paginate without duplicating results

- **required / reviewer:** Explain transport versus HTTP failure.

- **required / hybrid:** Add cancellation when a new query starts.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: HTTP: Assessment; REST APIs: Assessment; JSON: Assessment; API Integration: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: http-rest-apis-unit-1, http-rest-apis-unit-2, paginated-product-browser, api-search-check. All require evaluator evidence; optional work does not block.

## Module: Advanced JavaScript Reasoning

ID: javascript-advanced | Advanced | Version 1.0.0

Prerequisites: http-rest-apis (hard, skill)

### Objectives

- Predict the order, build a closure-backed counter and compare a composed service with a small class.

- Design a bounded request queue with cancellation and predictable result ordering.

### Lesson: Scope, objects and scheduling

ID: javascript-advanced-unit-1

Prerequisites: http-rest-apis (hard, skill)

**Why it exists.** Non-trivial bugs often involve retained state or work scheduled in an unexpected order.

**Real-world example.** A dashboard retains a stale filter in a callback and accumulates listeners after navigation.

**How it works.** Closures retain access to lexical bindings, not frozen copies of values. The call stack runs synchronous work; promise continuations use microtasks, while timer callbacks run later tasks. Microtask chains can also delay other work. Objects delegate through prototypes; class syntax organizes constructor and prototype behaviour. Prefer composition when independently testable capabilities fit better than inheritance. Remove listeners and cancel obsolete work to avoid retaining unnecessary resources.

```
console.log("start");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
```

**Try it.** Predict the order, build a closure-backed counter and compare a composed service with a small class.

**Break it.** Capture an old filter or attach a new listener on every navigation without cleanup.

**Debug it.** Trace retained references and callback timing; verify cleanup over repeated navigation.

**Apply it.** Explain when a closure, prototype method or composed function fits a requirement.

Mission connection: dashboard-queue-repair. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Concurrency and maintainable architecture

ID: javascript-advanced-unit-2

Prerequisites: javascript-advanced-unit-1 (hard, knowledge)

**Why it exists.** More parallel requests do not automatically make an application faster or safer.

**Real-world example.** A dashboard can overload a service by fetching every card at once.

**How it works.** Bound concurrent work, cancel obsolete tasks and isolate modules by responsibility. Measure memory and interaction behaviour under repeated use. Functional transformations simplify data flow, but unnecessary copies of large structures can cost work. Optimize measured bottlenecks and preserve correct behaviour with regression tests.

```
const pending = new Set(); // Track ownership; define a bounded queue contract before implementation.
```

**Try it.** Design a bounded request queue with cancellation and predictable result ordering.

**Break it.** Launch an unbounded batch and ignore component removal.

**Debug it.** Measure outstanding requests and retained work; add a limit and cleanup.

**Apply it.** Refactor the queue behind an interface that can use a deterministic test transport.

Mission connection: dashboard-queue-repair. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Repair Dashboard Request Scheduling

ID: dashboard-queue-repair | Advanced | Hard | mission

Investigate a local dashboard with stale data, unbounded requests and retained listeners.

Prerequisites: javascript-advanced-unit-2 (hard, knowledge)

#### Required behaviour

- Reproduce timing and cleanup defects

- Bound concurrent requests

- Cancel obsolete work

- Preserve result ordering and visible failure states

- Provide regression tests and measurements

#### Explain

Explain event-loop ordering and one architecture trade-off.

#### Modify

Add a request priority without starving lower-priority work.

#### Rubric

- **required / hybrid:** Reproduce timing and cleanup defects

- **required / hybrid:** Bound concurrent requests

- **required / hybrid:** Cancel obsolete work

- **required / hybrid:** Preserve result ordering and visible failure states

- **required / hybrid:** Provide regression tests and measurements

- **required / reviewer:** Explain event-loop ordering and one architecture trade-off.

- **required / hybrid:** Add a request priority without starving lower-priority work.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Closures: Applied; Event Loop: Applied; Composition: Applied; Architecture: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Report processing pipeline

ID: javascript-advanced-check | Advanced | Hard | assessment

Refactor an unfamiliar report pipeline.

Prerequisites: dashboard-queue-repair (hard, mission)

#### Required behaviour

- Preserve functional behaviour

- Bound async work

- Remove retained resources

- Test cancellation and failure

#### Explain

Explain composition versus inheritance for this design.

#### Modify

Support an additional report format behind the same interface.

#### Rubric

- **required / hybrid:** Preserve functional behaviour

- **required / hybrid:** Bound async work

- **required / hybrid:** Remove retained resources

- **required / hybrid:** Test cancellation and failure

- **required / reviewer:** Explain composition versus inheritance for this design.

- **required / hybrid:** Support an additional report format behind the same interface.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Closures: Assessment; Event Loop: Assessment; Composition: Assessment; Architecture: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: javascript-advanced-unit-1, javascript-advanced-unit-2, dashboard-queue-repair, javascript-advanced-check. All require evaluator evidence; optional work does not block.

## Module: React Entry Assessment

ID: react-entry | Foundation | Version 1.0.0

Prerequisites: javascript-modules (hard, skill), http-rest-apis (hard, skill), javascript-foundation-checkpoint-v1 (hard, assessment)

### Objectives

- Read the transformation, predict the result and implement a different update without mutating the input.

### Lesson: Check the JavaScript underneath

ID: react-entry-unit-1

Prerequisites: javascript-modules (hard, skill), http-rest-apis (hard, skill), javascript-foundation-checkpoint-v1 (hard, assessment)

**Why it exists.** React relies on functions and data reasoning rather than replacing them.

**Real-world example.** A component event handler transforms a collection and starts an asynchronous operation.

**How it works.** Before React, demonstrate functions, arrays, objects, destructuring, spread, modules, events and async basics. Experienced learners can use a practical placement route instead of repeating training; placement determines an entry point and does not verify skipped skills. Explain a transformation and debug a stale response without a framework.

```
const rename = (records, id, title) => records.map(record => record.id === id ? { ...record, title } : record);
```

**Try it.** Read the transformation, predict the result and implement a different update without mutating the input.

**Break it.** Use assignment in the ID comparison or let an old asynchronous result win.

**Debug it.** Write a failing example, inspect identity and ordering, then verify the repair.

**Apply it.** Build a small module that filters records and renders status through a DOM event.

Mission connection: javascript-placement-v1. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### JavaScript Practical Placement

ID: javascript-placement-v1 | Foundation | Moderate | mission

Use a short unfamiliar record-search task to establish the appropriate entry point.

Prerequisites: react-entry-unit-1 (hard, knowledge)

#### Required behaviour

- Implement a pure transformation

- Use an explicit module boundary

- Wire an accessible event

- Handle an awaited failure

- Debug a provided mutation defect

- Explain inputs, outputs and trade-offs

#### Explain

Explain the code without relying on framework vocabulary.

#### Modify

Add a new field without changing existing records.

#### Rubric

- **required / hybrid:** Implement a pure transformation

- **required / hybrid:** Use an explicit module boundary

- **required / hybrid:** Wire an accessible event

- **required / hybrid:** Handle an awaited failure

- **required / hybrid:** Debug a provided mutation defect

- **required / hybrid:** Explain inputs, outputs and trade-offs

- **required / reviewer:** Explain the code without relying on framework vocabulary.

- **required / hybrid:** Add a new field without changing existing records.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Applied; Debugging: Applied; Async: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### React Entry Checkpoint

ID: react-entry-checkpoint-v1 | Foundation | Moderate | assessment

Build a small searchable reading catalogue using JavaScript before React.

Prerequisites: javascript-placement-v1 (hard, mission)

#### Required behaviour

- Functions, arrays, objects, destructuring and spread used correctly

- ES modules and events work

- Async loading and failure handled

- Explain and modify the implementation

#### Explain

Explain why React would not remove the need for these skills.

#### Modify

Change the filtering rule and preserve prior behaviour.

#### Rubric

- **required / hybrid:** Functions, arrays, objects, destructuring and spread used correctly

- **required / hybrid:** ES modules and events work

- **required / hybrid:** Async loading and failure handled

- **required / hybrid:** Explain and modify the implementation

- **required / reviewer:** Explain why React would not remove the need for these skills.

- **required / hybrid:** Change the filtering rule and preserve prior behaviour.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Assessment; Debugging: Assessment; Async: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-entry-unit-1, javascript-placement-v1, react-entry-checkpoint-v1. All require evaluator evidence; optional work does not block.

## Module: React Beginner

ID: react-beginner | Beginner | Version 1.0.0

Prerequisites: react-entry (hard, skill)

### Objectives

- Build Profile Card and Product List using props, composition and meaningful HTML.

- Build Counter With Rules, Expandable FAQ and Basic Todo Interface.

### Lesson: Components describe an interface

ID: react-beginner-unit-1

Prerequisites: react-entry (hard, skill)

**Why it exists.** Manual DOM updates become difficult when many parts depend on the same data.

**Real-world example.** A product card appears several times with different content.

**How it works.** A function component returns JSX describing UI. JSX uses expressions in braces, className for CSS classes and properly closed tags. Props are inputs from the parent; do not mutate them. Compose small components and let state-driven rendering update the screen. This curriculum uses React 18-compatible function components and hooks; later major-version features require a separate version review.

```
function ProductCard({ name }) {
  return <article><h2>{name}</h2></article>;
}
```

**Try it.** Build Profile Card and Product List using props, composition and meaningful HTML.

**Break it.** Mutate a prop or return adjacent JSX elements without a shared wrapper.

**Debug it.** Read the error and trace ownership; repair the boundary instead of changing parent data inside a child.

**Apply it.** Render a second kind of card using the same layout component.

Mission connection: react-basic-todo. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Remember interaction state

ID: react-beginner-unit-2

Prerequisites: react-beginner-unit-1 (hard, knowledge)

**Why it exists.** A component needs to remember values across renders.

**Real-world example.** A counter obeys a limit and an FAQ remembers which answer is expanded.

**How it works.** useState returns a render’s value and a setter that schedules another render. Call hooks at the top level. Pass an event handler rather than invoking it during render. Use updater functions when the next state depends on the previous value. Conditional rendering selects UI; list keys identify stable records across insertion and reordering.

```
const [count, setCount] = useState(0);
<button onClick={() => setCount(value => value + 1)}>Add</button>
```

**Try it.** Build Counter With Rules, Expandable FAQ and Basic Todo Interface.

**Break it.** Use an array index as the key for editable records and reorder them.

**Debug it.** Observe identity errors, switch to stable IDs and verify edit state follows the correct record.

**Apply it.** Add a counter reset and show an empty state when the todo list is empty.

Mission connection: react-basic-todo. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Basic Todo Interface

ID: react-basic-todo | Beginner | Easy | mission

Build a local React task list using components, props and state.

Prerequisites: react-beginner-unit-2 (hard, knowledge)

#### Required behaviour

- Add and toggle tasks

- Stable keys

- No direct state or prop mutation

- Labelled form and semantic controls

- Useful empty state

#### Explain

Explain why a plain local variable does not replace state.

#### Modify

Add a remaining-task count derived from the list.

#### Rubric

- **required / hybrid:** Add and toggle tasks

- **required / hybrid:** Stable keys

- **required / hybrid:** No direct state or prop mutation

- **required / hybrid:** Labelled form and semantic controls

- **required / hybrid:** Useful empty state

- **required / reviewer:** Explain why a plain local variable does not replace state.

- **required / hybrid:** Add a remaining-task count derived from the list.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; JSX: Applied; Components: Applied; Props: Applied; State: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Expandable reading cards

ID: react-beginner-check | Beginner | Easy | assessment

Build independently expandable reading cards.

Prerequisites: react-basic-todo (hard, mission)

#### Required behaviour

- Reusable component with props

- Correct per-card state

- Stable identity after insertion

- Keyboard-operable disclosure

#### Explain

Explain a render and its event handler.

#### Modify

Add an expand-all control with deliberate state ownership.

#### Rubric

- **required / hybrid:** Reusable component with props

- **required / hybrid:** Correct per-card state

- **required / hybrid:** Stable identity after insertion

- **required / hybrid:** Keyboard-operable disclosure

- **required / reviewer:** Explain a render and its event handler.

- **required / hybrid:** Add an expand-all control with deliberate state ownership.

- **quality / reviewer:** Readable names and appropriate structure for Beginner work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; JSX: Assessment; Components: Assessment; Props: Assessment; State: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-beginner-unit-1, react-beginner-unit-2, react-basic-todo, react-beginner-check. All require evaluator evidence; optional work does not block.

## Module: State Ownership and Composition

ID: react-state-composition | Foundation | Version 1.0.0

Prerequisites: react-beginner (hard, skill)

### Objectives

- Lift a query from a search field and share it with a count and list.

### Lesson: One owner for shared information

ID: react-state-composition-unit-1

Prerequisites: react-beginner (hard, skill)

**Why it exists.** Two editable copies of the same value can disagree.

**Real-world example.** A filter control and result list need the same search query.

**How it works.** Place state in the nearest common owner that needs to coordinate it. Pass values and callbacks down; children describe intent upward. Compute derived values during rendering when possible instead of storing a second synchronized state value. Composition through children or explicit slots can avoid excessive configuration props.

```
const visible = items.filter(item => item.title.includes(query));
<Search value={query} onChange={setQuery} />
```

**Try it.** Lift a query from a search field and share it with a count and list.

**Break it.** Store filtered items separately and forget to update them after deletion.

**Debug it.** Trace the sources of truth; derive the view from items and query.

**Apply it.** Compose a reusable panel without moving all state into a global provider.

Mission connection: shared-filter-panel. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Shared Filter Panel

ID: shared-filter-panel | Foundation | Moderate | mission

Coordinate a search control, result count and product list.

Prerequisites: react-state-composition-unit-1 (hard, knowledge)

#### Required behaviour

- One authoritative query value

- Derived count and list agree

- Components expose clear props and callbacks

- No mutation or synchronization effect for derived values

#### Explain

Explain why the chosen component owns the state.

#### Modify

Add a category filter without duplicating the item collection.

#### Rubric

- **required / hybrid:** One authoritative query value

- **required / hybrid:** Derived count and list agree

- **required / hybrid:** Components expose clear props and callbacks

- **required / hybrid:** No mutation or synchronization effect for derived values

- **required / reviewer:** Explain why the chosen component owns the state.

- **required / hybrid:** Add a category filter without duplicating the item collection.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; State Ownership: Applied; Composition: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Booking selection summary

ID: composition-check | Foundation | Moderate | assessment

Coordinate session choices and a booking summary.

Prerequisites: shared-filter-panel (hard, mission)

#### Required behaviour

- One source of truth

- Reusable display components

- Invalid choices cannot remain selected

#### Explain

Explain composition versus copied markup.

#### Modify

Add a clear-selection action from a different component.

#### Rubric

- **required / hybrid:** One source of truth

- **required / hybrid:** Reusable display components

- **required / hybrid:** Invalid choices cannot remain selected

- **required / reviewer:** Explain composition versus copied markup.

- **required / hybrid:** Add a clear-selection action from a different component.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; State Ownership: Assessment; Composition: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-state-composition-unit-1, shared-filter-panel, composition-check. All require evaluator evidence; optional work does not block.

## Module: Forms, Effects and Custom Hooks

ID: react-forms-effects | Foundation | Version 1.0.0

Prerequisites: react-state-composition (hard, skill), javascript-browser-storage (hard, skill)

### Objectives

- Implement Controlled Form Basics with visible validation and keyboard submission.

- Extract a small reusable subscription hook; connect and disconnect it repeatedly.

### Lesson: Controlled forms

ID: react-forms-effects-unit-1

Prerequisites: react-state-composition (hard, skill), javascript-browser-storage (hard, skill)

**Why it exists.** A form’s visible value and application state must agree.

**Real-world example.** A preference form previews changes before saving.

**How it works.** A controlled input receives a value and updates state through onChange. Handle submit at the form. Validate deliberately, keep useful input after errors and associate feedback with fields. Do not alternate between undefined and a defined controlled value. Derive validation that needs no external synchronization directly from state.

```
const [name, setName] = useState("");
<input value={name} onChange={event => setName(event.target.value)} aria-label="Name" />
```

**Try it.** Implement Controlled Form Basics with visible validation and keyboard submission.

**Break it.** Switch an input from undefined to a string after loading.

**Debug it.** Inspect the warning and initialize a stable controlled value.

**Apply it.** Add a draft preview without another copy of the name.

Mission connection: controlled-form-basics. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Lesson: Effects synchronize external systems

ID: react-forms-effects-unit-2

Prerequisites: react-forms-effects-unit-1 (hard, knowledge)

**Why it exists.** Some work connects React to something outside rendering.

**Real-world example.** A subscription needs cleanup when its component leaves the screen.

**How it works.** Effects run after commit to synchronize external systems. Declare reactive dependencies and return cleanup for subscriptions. Development Strict Mode may repeat setup/cleanup to reveal missing cleanup; suppressing it hides defects. Do not use an effect to calculate an ordinary derived total. A custom hook reuses stateful logic, not a shared instance of state. Guard storage reads and writes, including first-run defaults.

```
useEffect(() => {
  const unsubscribe = source.subscribe(onMessage);
  return unsubscribe;
}, [source, onMessage]);
```

**Try it.** Extract a small reusable subscription hook; connect and disconnect it repeatedly.

**Break it.** Leave a timer or listener active after unmount.

**Debug it.** Count active work before and after removal; implement matching cleanup.

**Apply it.** Create a local-preference hook with missing-data and storage-failure handling.

Mission connection: controlled-form-basics. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Controlled Form Basics

ID: controlled-form-basics | Foundation | Moderate | mission

Build a profile-preference form with a preview and guarded persistence.

Prerequisites: react-forms-effects-unit-2 (hard, knowledge)

#### Required behaviour

- Controlled labelled fields

- Valid state and useful errors

- No unnecessary effect for derived display

- Persistence failure is visible

- Hook and effect cleanup explained

#### Explain

Explain an event-driven action versus synchronization in an effect.

#### Modify

Add a field and preserve previously saved records.

#### Rubric

- **required / hybrid:** Controlled labelled fields

- **required / hybrid:** Valid state and useful errors

- **required / hybrid:** No unnecessary effect for derived display

- **required / hybrid:** Persistence failure is visible

- **required / hybrid:** Hook and effect cleanup explained

- **required / reviewer:** Explain an event-driven action versus synchronization in an effect.

- **required / hybrid:** Add a field and preserve previously saved records.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; Forms: Applied; Effects: Applied; Hooks: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Subscription preferences

ID: effects-check | Foundation | Moderate | assessment

Connect a local event source to a settings panel.

Prerequisites: controlled-form-basics (hard, mission)

#### Required behaviour

- Setup and cleanup balance

- No duplicate updates after remount

- Stable controlled input values

#### Explain

Explain dependency choices.

#### Modify

Switch event sources without retaining the old subscription.

#### Rubric

- **required / hybrid:** Setup and cleanup balance

- **required / hybrid:** No duplicate updates after remount

- **required / hybrid:** Stable controlled input values

- **required / reviewer:** Explain dependency choices.

- **required / hybrid:** Switch event sources without retaining the old subscription.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; Forms: Assessment; Effects: Assessment; Hooks: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-forms-effects-unit-1, react-forms-effects-unit-2, controlled-form-basics, effects-check. All require evaluator evidence; optional work does not block.

## Module: React Context and Shared Preferences

ID: react-context | Foundation | Version 1.0.0

Prerequisites: javascript-functions (hard, skill), javascript-data-collections (hard, skill), javascript-modules (hard, skill), react-beginner (hard, skill), react-state-composition (hard, skill), react-forms-effects (hard, skill)

### Objectives

- Create two consumers that show the same JavaScript/Python selection.

### Lesson: Provide shared values intentionally

ID: react-context-unit-1

Prerequisites: javascript-functions (hard, skill), javascript-data-collections (hard, skill), javascript-modules (hard, skill), react-beginner (hard, skill), react-state-composition (hard, skill), react-forms-effects (hard, skill)

**Why it exists.** Some related consumers need coordinated state without every intermediate component forwarding it.

**Real-world example.** A language selector and summary both display the same preference.

**How it works.** Create a context, place a provider above consumers, and read it with useContext. Keep state ownership clear; Context transports a value but does not independently persist or validate it. A missing provider can lead to an unexpected default, so a custom hook may check for it. Avoid putting every unrelated field into one broad provider. Use Context.Provider for compatibility with the application’s React 18 runtime.

```
const PreferenceContext = createContext(null);
// Provider owns state; consumers read it with useContext(PreferenceContext).
```

**Try it.** Create two consumers that show the same JavaScript/Python selection.

**Break it.** Render a consumer outside its provider or create two separate providers with independent state.

**Debug it.** Inspect the component tree and explain which provider each consumer reads.

**Apply it.** Extract a custom context hook with a clear missing-provider error.

Mission connection: shared-preferences. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Shared Preferences

ID: shared-preferences | Foundation | Moderate | mission

Evolved from Phathutshedzo Rakhunwana’s original Programming Language Toggle App, preserved in programming-language-toggle-app/.

Prerequisites: react-context-unit-1 (hard, knowledge)

#### Required behaviour

- Initially offer JavaScript and Python as preference labels

- Provider owns selected state and at least two consumers use useContext

- Toggle interaction keeps consumers synchronized

- Variation 1: add more language options without duplicating state logic

- Variation 2: persist and validate the preference across reload

- Variation 3: add a second independently placed consumer

- Variation 4: introduce a theme preference with accessible controls

- Variation 5: extract a custom context hook

- Report storage failures and never imply a Python runtime exists

#### Explain

Explain state ownership, provider scope and why persistence is separate.

#### Modify

Support a new preference with a default while preserving older saved data.

#### Rubric

- **required / hybrid:** Initially offer JavaScript and Python as preference labels

- **required / hybrid:** Provider owns selected state and at least two consumers use useContext

- **required / hybrid:** Toggle interaction keeps consumers synchronized

- **required / hybrid:** Variation 1: add more language options without duplicating state logic

- **required / hybrid:** Variation 2: persist and validate the preference across reload

- **required / hybrid:** Variation 3: add a second independently placed consumer

- **required / hybrid:** Variation 4: introduce a theme preference with accessible controls

- **required / hybrid:** Variation 5: extract a custom context hook

- **required / hybrid:** Report storage failures and never imply a Python runtime exists

- **required / reviewer:** Explain state ownership, provider scope and why persistence is separate.

- **required / hybrid:** Support a new preference with a default while preserving older saved data.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; Context: Applied; State Ownership: Applied; Hooks: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Shared display settings

ID: react-context-check | Foundation | Moderate | assessment

Build text-size and density preferences for a reading app.

Prerequisites: shared-preferences (hard, mission)

#### Required behaviour

- Shared provider and multiple consumers

- Valid restored settings and safe defaults

- Labelled keyboard controls

- Explain and test provider placement

#### Explain

Explain why separate provider instances do not share state.

#### Modify

Add a reset from a consumer outside the settings panel.

#### Rubric

- **required / hybrid:** Shared provider and multiple consumers

- **required / hybrid:** Valid restored settings and safe defaults

- **required / hybrid:** Labelled keyboard controls

- **required / hybrid:** Explain and test provider placement

- **required / reviewer:** Explain why separate provider instances do not share state.

- **required / hybrid:** Add a reset from a consumer outside the settings panel.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; Context: Assessment; State Ownership: Assessment; Hooks: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-context-unit-1, shared-preferences, react-context-check. All require evaluator evidence; optional work does not block.

## Module: Routing Fundamentals

ID: react-routing | Foundation | Version 1.0.0

Prerequisites: react-context (hard, skill)

### Objectives

- Build a list, detail and settings view with links and a not-found view.

### Lesson: Location as application state

ID: react-routing-unit-1

Prerequisites: react-context (hard, skill)

**Why it exists.** People need to bookmark and navigate meaningful views.

**Real-world example.** A task detail should still open after a reload or shared link.

**How it works.** Routes map paths to views, parameters identify resources and nested layouts share navigation. Use links for navigation and preserve browser back/forward behaviour. A route guard is not backend authorization. Configure the hosting fallback for client routes and provide useful not-found content. Keep document titles and focus context understandable after navigation.

```
/tasks → task list
/tasks/:taskId → task detail
/settings → preferences
```

**Try it.** Build a list, detail and settings view with links and a not-found view.

**Break it.** Store the selected detail only in component state and reload its URL.

**Debug it.** Compare location and state; represent the resource identity in the route.

**Apply it.** Test keyboard navigation, back/forward and direct loading of each route.

Mission connection: routed-preferences-app. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Routed Developer Preferences

ID: routed-preferences-app | Foundation | Moderate | mission

Add routed views to the preferences application.

Prerequisites: react-routing-unit-1 (hard, knowledge)

#### Required behaviour

- List/detail/settings routes with meaningful links

- Direct loads and back/forward work

- Shared layout and not-found view

- No claim that frontend routing protects private data

#### Explain

Explain route identity and component state.

#### Modify

Add a nested settings view without duplicating navigation.

#### Rubric

- **required / hybrid:** List/detail/settings routes with meaningful links

- **required / hybrid:** Direct loads and back/forward work

- **required / hybrid:** Shared layout and not-found view

- **required / hybrid:** No claim that frontend routing protects private data

- **required / reviewer:** Explain route identity and component state.

- **required / hybrid:** Add a nested settings view without duplicating navigation.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; Routing: Applied; Accessibility: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### React Foundation Practical Checkpoint

ID: react-foundation-checkpoint-v1 | Foundation | Moderate | assessment

Build a multi-view reading planner with state, props, controlled forms, effects and shared display settings.

Prerequisites: routed-preferences-app (hard, mission)

#### Required behaviour

- Correct create/update behaviour

- Sensible component/state ownership

- Shared settings use Context as explicitly required

- Persistence handles missing and invalid data

- Routing and keyboard controls work

- No blocking runtime error; explain and modify the code

#### Explain

Explain an effect, a state owner and provider scope.

#### Modify

Add per-category display settings while preserving existing behaviour.

#### Rubric

- **required / hybrid:** Correct create/update behaviour

- **required / hybrid:** Sensible component/state ownership

- **required / hybrid:** Shared settings use Context as explicitly required

- **required / hybrid:** Persistence handles missing and invalid data

- **required / hybrid:** Routing and keyboard controls work

- **required / hybrid:** No blocking runtime error; explain and modify the code

- **required / reviewer:** Explain an effect, a state owner and provider scope.

- **required / hybrid:** Add per-category display settings while preserving existing behaviour.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; Routing: Assessment; Accessibility: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-routing-unit-1, routed-preferences-app, react-foundation-checkpoint-v1. All require evaluator evidence; optional work does not block.

## Module: Testing for Behaviour

ID: testing-foundations | Foundation | Version 1.0.0

Prerequisites: javascript-modules (hard, skill), react-beginner (soft, skill)

### Objectives

- Write simple assertions for calculation, validation and immutable updates.

### Lesson: Examples that can catch regressions

ID: testing-foundations-unit-1

Prerequisites: javascript-modules (hard, skill), react-beginner (soft, skill)

**Why it exists.** A working happy path does not establish that boundary cases still work.

**Real-world example.** A calculator passes an ordinary input but mishandles an empty collection.

**How it works.** State the behaviour, arrange input, perform an action and compare the observable result. Cover representative valid cases, boundaries and failures. A regression test should fail for the original defect and pass after repair. A failing test can indicate a test or infrastructure defect; investigate before blaming learner code. Coverage measures executed lines, not adequate requirements.

```
import assert from "node:assert/strict";
assert.equal(sum([]), 0);
assert.equal(sum([2, 3]), 5);
```

**Try it.** Write simple assertions for calculation, validation and immutable updates.

**Break it.** Assert only that the function exists or duplicate its implementation inside the test.

**Debug it.** Change the implementation deliberately and check whether the test detects a meaningful wrong result.

**Apply it.** Describe behaviour checks for a component through labels and user actions.

Mission connection: test-the-calculator. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Test the Calculator

ID: test-the-calculator | Foundation | Moderate | mission

Create behavioural checks for the checkout calculator and a form.

Prerequisites: testing-foundations-unit-1 (hard, knowledge)

#### Required behaviour

- Normal, boundary and invalid cases

- Regression test for one reproduced defect

- Assertions on observable results

- Infrastructure failure distinguished from a wrong answer

#### Explain

Explain what confidence each test provides and what it cannot establish.

#### Modify

Change a requirement and update only the affected expectation.

#### Rubric

- **required / hybrid:** Normal, boundary and invalid cases

- **required / hybrid:** Regression test for one reproduced defect

- **required / hybrid:** Assertions on observable results

- **required / hybrid:** Infrastructure failure distinguished from a wrong answer

- **required / reviewer:** Explain what confidence each test provides and what it cannot establish.

- **required / hybrid:** Change a requirement and update only the affected expectation.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Testing: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Unreliable total test

ID: testing-check | Foundation | Moderate | assessment

Repair a test that depends on execution order.

Prerequisites: test-the-calculator (hard, mission)

#### Required behaviour

- Reproduce the order dependency

- Isolate test data

- Prove the repaired test catches a real defect

#### Explain

Explain why 100% coverage alone is insufficient.

#### Modify

Run the examples in a different order.

#### Rubric

- **required / hybrid:** Reproduce the order dependency

- **required / hybrid:** Isolate test data

- **required / hybrid:** Prove the repaired test catches a real defect

- **required / reviewer:** Explain why 100% coverage alone is insufficient.

- **required / hybrid:** Run the examples in a different order.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Testing: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: testing-foundations-unit-1, test-the-calculator, testing-check. All require evaluator evidence; optional work does not block.

## Module: React Application Development

ID: react-application-development | Intermediate | Version 1.0.0

Prerequisites: react-routing (hard, skill), http-rest-apis (hard, skill), testing-foundations (hard, skill)

### Objectives

- Build a Weather Application, Booking Interface, E-Commerce Cart and API Dashboard with deterministic fixtures before a safe API.

### Lesson: Data, forms and application states

ID: react-application-development-unit-1

Prerequisites: react-routing (hard, skill), http-rest-apis (hard, skill), testing-foundations (hard, skill)

**Why it exists.** An application must keep several interacting concerns consistent.

**Real-world example.** A booking screen fetches availability while retaining an unfinished form.

**How it works.** Use explicit idle/loading/success/empty/error states and validate responses. Cancel obsolete work and retain useful input after failures. A reducer describes state transitions and should not perform I/O. Context can distribute a reducer’s state/actions within a suitable boundary. Custom hooks isolate reusable data behaviour. Optimistic UI needs rollback or reconciliation when a mutation fails; server confirmation is still authoritative.

```
function reducer(state, action) {
  if (action.type === "filterChanged") return { ...state, filter: action.value };
  return state;
}
```

**Try it.** Build a Weather Application, Booking Interface, E-Commerce Cart and API Dashboard with deterministic fixtures before a safe API.

**Break it.** Clear a booking form whenever loading begins or retain an optimistic item after the server rejects it.

**Debug it.** Trace ownership and pending operations; preserve input and reconcile the rejected change.

**Apply it.** Build an Authentication Interface that displays session states while explaining that authentication happens on a server.

Mission connection: react-api-dashboard. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### API Dashboard

ID: react-api-dashboard | Intermediate | Moderate | mission

Build a routed dashboard with search, filters and editable preferences.

Prerequisites: react-application-development-unit-1 (hard, knowledge)

#### Required behaviour

- Loading, empty, error and retry flows

- Validated API data and stale-request protection

- Controlled accessible forms

- Reducer used only where transitions justify it

- Behaviour tests for successful and failed operations

#### Explain

Explain reducer, local state and Context boundaries.

#### Modify

Add an optimistic preference update with rollback on a controlled rejection.

#### Rubric

- **required / hybrid:** Loading, empty, error and retry flows

- **required / hybrid:** Validated API data and stale-request protection

- **required / hybrid:** Controlled accessible forms

- **required / hybrid:** Reducer used only where transitions justify it

- **required / hybrid:** Behaviour tests for successful and failed operations

- **required / reviewer:** Explain reducer, local state and Context boundaries.

- **required / hybrid:** Add an optimistic preference update with rollback on a controlled rejection.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; API Integration: Applied; Reducers: Applied; Testing: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Frontend Intermediate Checkpoint

ID: frontend-intermediate-checkpoint-v1 | Intermediate | Moderate | assessment

Build a responsive service-booking browser with API data and a local draft.

Prerequisites: react-api-dashboard (hard, mission)

#### Required behaviour

- API and validation failures remain usable

- Responsive accessible routes and forms

- Tests cover important user actions

- Explain data ownership and retry behaviour

#### Explain

Explain which state the server owns.

#### Modify

Handle a newly unavailable booking without losing the rest of the draft.

#### Rubric

- **required / hybrid:** API and validation failures remain usable

- **required / hybrid:** Responsive accessible routes and forms

- **required / hybrid:** Tests cover important user actions

- **required / hybrid:** Explain data ownership and retry behaviour

- **required / reviewer:** Explain which state the server owns.

- **required / hybrid:** Handle a newly unavailable booking without losing the rest of the draft.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; API Integration: Assessment; Reducers: Assessment; Testing: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-application-development-unit-1, react-api-dashboard, frontend-intermediate-checkpoint-v1. All require evaluator evidence; optional work does not block.

## Module: Advanced React Architecture

ID: react-advanced-architecture | Advanced | Version 1.0.0

Prerequisites: react-application-development (hard, skill), javascript-advanced (hard, skill)

### Objectives

- Refactor State Architecture and Refactor Duplicated Components in an inherited local dashboard.

### Lesson: Boundaries before abstractions

ID: react-advanced-architecture-unit-1

Prerequisites: react-application-development (hard, skill), javascript-advanced (hard, skill)

**Why it exists.** A large state container or duplicated components can make small changes risky.

**Real-world example.** An analytics dashboard has five subtly different filter panels.

**How it works.** Identify changing responsibilities and actual duplication. Split providers by related state, keep derived values derived and use reducer transitions where they make intent explicit. Shared components need clear contracts rather than a growing list of unrelated flags. Error boundaries contain rendering failures in their subtree but do not catch every event-handler or asynchronous error. Lazy loading and code splitting need loading and recovery behaviour.

```
Feature view → focused hook → transport contract
Shared control → explicit props → native semantics
```

**Try it.** Refactor State Architecture and Refactor Duplicated Components in an inherited local dashboard.

**Break it.** Move every field into one provider or hide all failures behind an empty fallback.

**Debug it.** Trace updates and error ownership; narrow boundaries and show actionable recovery.

**Apply it.** Explain when leaving two similar components separate is more maintainable.

Mission connection: refactor-state-architecture. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Refactor State Architecture

ID: refactor-state-architecture | Advanced | Hard | mission

Improve an inherited dashboard without changing its required behaviour.

Prerequisites: react-advanced-architecture-unit-1 (hard, knowledge)

#### Required behaviour

- Baseline behaviour captured

- State ownership and provider scope documented

- Duplication reduced where responsibilities match

- Rendering and async failures handled appropriately

- Regression tests preserve core flows

#### Explain

Explain a rejected abstraction and its trade-off.

#### Modify

Add a new filter type without reopening unrelated feature modules.

#### Rubric

- **required / hybrid:** Baseline behaviour captured

- **required / hybrid:** State ownership and provider scope documented

- **required / hybrid:** Duplication reduced where responsibilities match

- **required / hybrid:** Rendering and async failures handled appropriately

- **required / hybrid:** Regression tests preserve core flows

- **required / reviewer:** Explain a rejected abstraction and its trade-off.

- **required / hybrid:** Add a new filter type without reopening unrelated feature modules.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; Architecture: Applied; Refactoring: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Frontend Advanced Checkpoint

ID: react-advanced-checkpoint-v1 | Advanced | Hard | assessment

Refactor an unfamiliar marketplace frontend.

Prerequisites: refactor-state-architecture (hard, mission)

#### Required behaviour

- Reproduce state and rendering defects

- Improve boundaries

- Cover errors and edge cases

- Preserve accessibility and measurable baseline behaviour

#### Explain

Explain the architecture using concrete dependencies.

#### Modify

Introduce an additional seller view with shared but distinct requirements.

#### Rubric

- **required / hybrid:** Reproduce state and rendering defects

- **required / hybrid:** Improve boundaries

- **required / hybrid:** Cover errors and edge cases

- **required / hybrid:** Preserve accessibility and measurable baseline behaviour

- **required / reviewer:** Explain the architecture using concrete dependencies.

- **required / hybrid:** Introduce an additional seller view with shared but distinct requirements.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; Architecture: Assessment; Refactoring: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-advanced-architecture-unit-1, refactor-state-architecture, react-advanced-checkpoint-v1. All require evaluator evidence; optional work does not block.

## Module: Accessible Component Systems

ID: accessible-components | Advanced | Version 1.0.0

Prerequisites: accessibility-foundations (hard, skill), react-application-development (hard, skill)

### Objectives

- Build Accessible Modal System and repair a complex form’s error navigation.

### Lesson: Interaction contracts

ID: accessible-components-unit-1

Prerequisites: accessibility-foundations (hard, skill), react-application-development (hard, skill)

**Why it exists.** A reusable component must preserve behaviour across every place it is used.

**Real-world example.** A modal opens from one of several buttons and must return focus to the right one.

**How it works.** Define roles, names, keyboard actions and focus behaviour before styling. A modal needs an accessible name, deliberate initial focus, contained tab navigation while open, an available close path and focus restoration. Prevent background interaction appropriately. Prefer a proven native or library primitive when its behaviour fits, but test the integrated result. Tabs, disclosures and dialogs have different contracts; do not apply one pattern to all.

```
Open trigger → named dialog → initial focus → keyboard operation → close → originating trigger
```

**Try it.** Build Accessible Modal System and repair a complex form’s error navigation.

**Break it.** Close the modal and leave focus on a removed element.

**Debug it.** Follow focus before opening, during interaction and after closure; restore it to the trigger or a logical surviving element.

**Apply it.** Document component behaviour with keyboard and screen-reader observations.

Mission connection: accessible-modal-system. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Build Accessible Modal System

ID: accessible-modal-system | Advanced | Hard | mission

Implement and document a reusable modal with a form.

Prerequisites: accessible-components-unit-1 (hard, knowledge)

#### Required behaviour

- Accessible name and useful initial focus

- Keyboard operation and focus containment

- Escape or another clearly documented close mechanism

- Background interaction prevented while modal

- Focus restored after closing

- Manual assistive-technology checks recorded

#### Explain

Explain why a role attribute alone does not implement interaction.

#### Modify

Remove the originating item during the modal operation and choose a logical focus destination.

#### Rubric

- **required / hybrid:** Accessible name and useful initial focus

- **required / hybrid:** Keyboard operation and focus containment

- **required / hybrid:** Escape or another clearly documented close mechanism

- **required / hybrid:** Background interaction prevented while modal

- **required / hybrid:** Focus restored after closing

- **required / hybrid:** Manual assistive-technology checks recorded

- **required / reviewer:** Explain why a role attribute alone does not implement interaction.

- **required / hybrid:** Remove the originating item during the modal operation and choose a logical focus destination.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Accessibility: Applied; React: Applied; Component Design: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Repair a settings dialog

ID: accessible-components-check | Advanced | Hard | assessment

Audit and repair an unfamiliar settings dialog.

Prerequisites: accessible-modal-system (hard, mission)

#### Required behaviour

- Identify name, focus and error-feedback defects

- Fix without breaking pointer operation

- Test zoom and keyboard flows

#### Explain

Explain one automated-test limitation.

#### Modify

Add a validation error that receives appropriate attention.

#### Rubric

- **required / hybrid:** Identify name, focus and error-feedback defects

- **required / hybrid:** Fix without breaking pointer operation

- **required / hybrid:** Test zoom and keyboard flows

- **required / reviewer:** Explain one automated-test limitation.

- **required / hybrid:** Add a validation error that receives appropriate attention.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Accessibility: Assessment; React: Assessment; Component Design: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: accessible-components-unit-1, accessible-modal-system, accessible-components-check. All require evaluator evidence; optional work does not block.

## Module: Frontend Performance

ID: frontend-performance | Advanced | Version 1.0.0

Prerequisites: react-application-development (hard, skill), browser-devtools (hard, skill)

### Objectives

- Profile initial load and a filter interaction; compare image, network and rendering costs.

### Lesson: Measure before optimizing

ID: frontend-performance-unit-1

Prerequisites: react-application-development (hard, skill), browser-devtools (hard, skill)

**Why it exists.** Unnecessary work should be identified, not guessed from familiar advice.

**Real-world example.** A large searchable list becomes slow while images delay the first useful content.

**How it works.** Record a repeatable scenario, device assumptions, network conditions and baseline. Network tools reveal transfers and waterfalls; profiling shows scripting/rendering cost. Resize/compress images, avoid unnecessary requests and split code when evidence supports it. Memoization has maintenance and comparison costs and is not a correctness mechanism. Caching needs invalidation and privacy boundaries. A local measurement is not a universal marketing promise.

```
Record: build, device, dataset, network, scenario, repetitions, median, variation and limitations.
```

**Try it.** Profile initial load and a filter interaction; compare image, network and rendering costs.

**Break it.** Add memoization everywhere and measure only one unusually fast run.

**Debug it.** Use repeated comparable runs; remove changes that add complexity without useful improvement.

**Apply it.** Fix Render Performance and test lazy-loading failure recovery.

Mission connection: fix-render-performance. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Fix Render Performance

ID: fix-render-performance | Advanced | Hard | mission

Investigate a dashboard with unnecessary work using a recorded baseline.

Prerequisites: frontend-performance-unit-1 (hard, knowledge)

#### Required behaviour

- Repeatable baseline and target chosen before changes

- Profiler/network evidence identifies a cause

- Focused improvement with comparable measurements

- Core behaviour and accessibility preserved

- Trade-offs and remaining limits documented

#### Explain

Explain why a proposed optimization was unnecessary.

#### Modify

Increase the dataset and identify where the current design stops meeting the target.

#### Rubric

- **required / hybrid:** Repeatable baseline and target chosen before changes

- **required / hybrid:** Profiler/network evidence identifies a cause

- **required / hybrid:** Focused improvement with comparable measurements

- **required / hybrid:** Core behaviour and accessibility preserved

- **required / hybrid:** Trade-offs and remaining limits documented

- **required / reviewer:** Explain why a proposed optimization was unnecessary.

- **required / hybrid:** Increase the dataset and identify where the current design stops meeting the target.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Performance: Applied; React: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Slow catalogue investigation

ID: performance-check | Advanced | Hard | assessment

Diagnose an unfamiliar slow catalogue.

Prerequisites: fix-render-performance (hard, mission)

#### Required behaviour

- Separate network and interaction bottlenecks

- Improve the measured cause

- Provide reproducible before/after evidence

#### Explain

Explain measurement uncertainty.

#### Modify

Add a constrained-device scenario.

#### Rubric

- **required / hybrid:** Separate network and interaction bottlenecks

- **required / hybrid:** Improve the measured cause

- **required / hybrid:** Provide reproducible before/after evidence

- **required / reviewer:** Explain measurement uncertainty.

- **required / hybrid:** Add a constrained-device scenario.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Performance: Assessment; React: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: frontend-performance-unit-1, fix-render-performance, performance-check. All require evaluator evidence; optional work does not block.

## Module: Integration and Test Strategy

ID: testing-strategy | Advanced | Version 1.0.0

Prerequisites: testing-foundations (hard, skill), react-application-development (hard, skill)

### Objectives

- Create an integration strategy for the task dashboard and debug an unreliable loading-state test.

### Lesson: Confidence across boundaries

ID: testing-strategy-unit-1

Prerequisites: testing-foundations (hard, skill), react-application-development (hard, skill)

**Why it exists.** Unit tests alone can miss how routing, forms and data services interact.

**Real-world example.** A save button looks successful even though a retry creates duplicate records.

**How it works.** Use unit tests for pure logic, component tests for user interactions, integration tests for contracts and a small number of end-to-end checks for critical journeys. Control time, randomness and network responses in deterministic tests; also test real boundaries safely. Classify infrastructure failures separately and preserve diagnostics. Prefer resilient role/label queries over implementation-specific selectors. Choose coverage by impact and risk, not a blanket percentage.

```
Scenario: edit → save → response lost → retry → one durable result
```

**Try it.** Create an integration strategy for the task dashboard and debug an unreliable loading-state test.

**Break it.** Use arbitrary sleeps or share mutable data across tests.

**Debug it.** Control completion signals and isolate fixtures; repeat the regression under controlled timing.

**Apply it.** Add a small end-to-end check that exercises the real persistence boundary in a safe environment.

Mission connection: recover-api-failures. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Recover From API Failures

ID: recover-api-failures | Advanced | Hard | mission

Add reliable tests and UI recovery for timeout, malformed response and service unavailability.

Prerequisites: testing-strategy-unit-1 (hard, knowledge)

#### Required behaviour

- Learner errors distinguished from transport/infrastructure failures

- Useful retry without losing input

- Deterministic failure fixtures

- At least one real safe contract check

- No false saved state

#### Explain

Explain why one test belongs at the integration boundary.

#### Modify

Simulate a response lost after a successful server write and prevent duplicate work.

#### Rubric

- **required / hybrid:** Learner errors distinguished from transport/infrastructure failures

- **required / hybrid:** Useful retry without losing input

- **required / hybrid:** Deterministic failure fixtures

- **required / hybrid:** At least one real safe contract check

- **required / hybrid:** No false saved state

- **required / reviewer:** Explain why one test belongs at the integration boundary.

- **required / hybrid:** Simulate a response lost after a successful server write and prevent duplicate work.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Testing: Applied; API Reliability: Applied; Debugging: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Repair an unreliable suite

ID: testing-strategy-check | Advanced | Hard | assessment

Fix order- and timing-dependent tests in an unfamiliar frontend.

Prerequisites: recover-api-failures (hard, mission)

#### Required behaviour

- Reproduce unreliable behaviour

- Control relevant boundaries

- Tests catch actual regressions

- Document what remains untested

#### Explain

Explain a deliberate omission from end-to-end coverage.

#### Modify

Add a new failure case without introducing a sleep.

#### Rubric

- **required / hybrid:** Reproduce unreliable behaviour

- **required / hybrid:** Control relevant boundaries

- **required / hybrid:** Tests catch actual regressions

- **required / hybrid:** Document what remains untested

- **required / reviewer:** Explain a deliberate omission from end-to-end coverage.

- **required / hybrid:** Add a new failure case without introducing a sleep.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Testing: Assessment; API Reliability: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: testing-strategy-unit-1, recover-api-failures, testing-strategy-check. All require evaluator evidence; optional work does not block.

## Module: Frontend Security Foundations

ID: frontend-security | Advanced | Version 1.0.0

Prerequisites: http-rest-apis (hard, skill), javascript-browser-storage (hard, skill)

### Objectives

- Map browser, API and storage boundaries for your project and classify every configured value.

### Lesson: Trust boundaries and secrets

ID: frontend-security-unit-1

Prerequisites: http-rest-apis (hard, skill), javascript-browser-storage (hard, skill)

**Why it exists.** Anything in a browser can be inspected or manipulated by its user.

**Real-world example.** Hiding an admin link does not protect an API endpoint.

**How it works.** Authentication identifies a caller; authorization checks allowed actions on each resource on the server. Validate inputs at trust boundaries. Render untrusted text safely; unsafe HTML insertion can create XSS. HTTPS protects transport but not an exposed client secret. Build-time frontend environment variables are bundled data, not a vault. Review dependencies, lockfiles and update impact. Browser storage is not a secure credential store; follow an explicit session architecture.

```
// Text remains text.
node.textContent = userSuppliedTitle;
// Server authorization must independently check the resource owner.
```

**Try it.** Map browser, API and storage boundaries for your project and classify every configured value.

**Break it.** Put an invented secret in a frontend environment variable and inspect the build output.

**Debug it.** Explain why the bundle contains it; remove the pattern and document server-only configuration.

**Apply it.** Review a dependency update and record evidence rather than assuming latest means safe.

Mission connection: frontend-trust-audit. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Frontend Trust Audit

ID: frontend-trust-audit | Advanced | Hard | mission

Audit your own local project for client trust and accidental secret exposure.

Prerequisites: frontend-security-unit-1 (hard, knowledge)

#### Required behaviour

- Map resource ownership checks

- Remove unsafe text rendering

- Identify public versus server-only configuration

- Document storage/session limits

- Review dependencies without exposing credentials

#### Explain

Explain why UI guards cannot authorize a resource.

#### Modify

Add a private project resource and describe the required server check.

#### Rubric

- **required / hybrid:** Map resource ownership checks

- **required / hybrid:** Remove unsafe text rendering

- **required / hybrid:** Identify public versus server-only configuration

- **required / hybrid:** Document storage/session limits

- **required / hybrid:** Review dependencies without exposing credentials

- **required / reviewer:** Explain why UI guards cannot authorize a resource.

- **required / hybrid:** Add a private project resource and describe the required server check.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Security: Applied; Authorization: Applied; Dependency Risk: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Review a private notes design

ID: security-foundation-check | Advanced | Hard | assessment

Evaluate a supplied design that trusts a client-edited owner ID.

Prerequisites: frontend-trust-audit (hard, mission)

#### Required behaviour

- Identify the trust failure

- Specify a server-authoritative resource check

- Avoid storing backend secrets in the browser

#### Explain

Explain authentication versus authorization in this example.

#### Modify

Account for public read-only notes without exposing private ones.

#### Rubric

- **required / hybrid:** Identify the trust failure

- **required / hybrid:** Specify a server-authoritative resource check

- **required / hybrid:** Avoid storing backend secrets in the browser

- **required / reviewer:** Explain authentication versus authorization in this example.

- **required / hybrid:** Account for public read-only notes without exposing private ones.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: Security: Assessment; Authorization: Assessment; Dependency Risk: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: frontend-security-unit-1, frontend-trust-audit, security-foundation-check. All require evaluator evidence; optional work does not block.

## Module: Deployment Fundamentals

ID: deployment-fundamentals | Professional | Version 1.0.0

Prerequisites: git-foundations (hard, skill), testing-strategy (hard, skill), frontend-security (hard, skill)

### Objectives

- Build your project, serve it locally as production assets and test direct routes and API failures.

### Lesson: Builds, environments and recovery

ID: deployment-fundamentals-unit-1

Prerequisites: git-foundations (hard, skill), testing-strategy (hard, skill), frontend-security (hard, skill)

**Why it exists.** Working on a development server does not prove a deployable release.

**Real-world example.** A routed application works locally but its detail URL fails after deployment.

**How it works.** A production build transforms source into assets; the server must route API requests and client-side routes correctly. Record the commit, product version, environment and compatible API/schema versions. Keep secrets in server configuration. Test direct navigation, health, rollback and cache invalidation. Define monitoring ownership and support routing. A preview deployment is not public production readiness; a backup is not demonstrated recovery until a safe restore succeeds.

```
Release record: commit → build → checks → preview URL → smoke results → rollback procedure
```

**Try it.** Build your project, serve it locally as production assets and test direct routes and API failures.

**Break it.** Deploy incompatible cached client code against a changed API in a disposable environment.

**Debug it.** Record the mismatch; restore a compatible build and define an update strategy.

**Apply it.** Prepare deployment instructions including environment names but no real credentials.

Mission connection: deployment-handoff. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Deployment Handoff

ID: deployment-handoff | Professional | Challenging | mission

Prepare a reproducible release for a safe preview environment or local production server.

Prerequisites: deployment-fundamentals-unit-1 (hard, knowledge)

#### Required behaviour

- Build and commit identifiable

- Direct routes and API configuration checked

- Secrets excluded from assets and logs

- Rollback and monitoring owner recorded

- Limitations and support route explicit

#### Explain

Explain a deployment success versus a production-ready release.

#### Modify

Change one API contract and propose a backward-compatible rollout.

#### Rubric

- **required / hybrid:** Build and commit identifiable

- **required / hybrid:** Direct routes and API configuration checked

- **required / hybrid:** Secrets excluded from assets and logs

- **required / hybrid:** Rollback and monitoring owner recorded

- **required / hybrid:** Limitations and support route explicit

- **required / reviewer:** Explain a deployment success versus a production-ready release.

- **required / hybrid:** Change one API contract and propose a backward-compatible rollout.

- **quality / reviewer:** Readable names and appropriate structure for Professional work; no penalty for an alternative valid implementation.

Evidence requirements: Deployment: Applied; Git: Applied; Operations: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Recover a broken preview

ID: deployment-check | Professional | Challenging | assessment

Investigate a disposable preview with a wrong API origin and routing fallback.

Prerequisites: deployment-handoff (hard, mission)

#### Required behaviour

- Diagnose using logs and responses

- Restore working configuration

- Verify critical routes

- Record the exact build and evidence

#### Explain

Explain what the health check does not establish.

#### Modify

Plan recovery if a new build corrupts a local draft format.

#### Rubric

- **required / hybrid:** Diagnose using logs and responses

- **required / hybrid:** Restore working configuration

- **required / hybrid:** Verify critical routes

- **required / hybrid:** Record the exact build and evidence

- **required / reviewer:** Explain what the health check does not establish.

- **required / hybrid:** Plan recovery if a new build corrupts a local draft format.

- **quality / reviewer:** Readable names and appropriate structure for Professional work; no penalty for an alternative valid implementation.

Evidence requirements: Deployment: Assessment; Git: Assessment; Operations: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: deployment-fundamentals-unit-1, deployment-handoff, deployment-check. All require evaluator evidence; optional work does not block.

## Module: Professional Frontend Practice

ID: professional-frontend | Professional | Version 1.0.0

Prerequisites: react-advanced-architecture (hard, skill), accessible-components (hard, skill), frontend-performance (hard, skill), testing-strategy (hard, skill), frontend-security (hard, skill), deployment-fundamentals (hard, skill)

### Objectives

- Audit duplicate requests, inconsistent loading, an inaccessible modal, rerenders, duplicated components and weak error handling.

### Lesson: Work from an imperfect brief

ID: professional-frontend-unit-1

Prerequisites: react-advanced-architecture (hard, skill), accessible-components (hard, skill), frontend-performance (hard, skill), testing-strategy (hard, skill), frontend-security (hard, skill), deployment-fundamentals (hard, skill)

**Why it exists.** Real projects involve priorities and constraints rather than a fixed tutorial path.

**Real-world example.** A client reports that an analytics dashboard feels unreliable and excludes keyboard users.

**How it works.** Translate reports into reproducible behaviours and acceptance criteria. Separate blocking correctness/accessibility defects from optional polish. Capture a baseline and inspect the code before choosing architecture. Discuss ambiguous requirements and state assumptions. Make reviewable changes, test regressions, document decisions and preserve evidence. Explain trade-offs in concrete terms rather than judging work by buzzwords or polished English.

```
Issue → reproduction → impact → acceptance criteria → focused change → evidence → handoff
```

**Try it.** Audit duplicate requests, inconsistent loading, an inaccessible modal, rerenders, duplicated components and weak error handling.

**Break it.** Rewrite the entire app before identifying which defects cause user harm.

**Debug it.** Return to a reproducible baseline; prioritize and justify a smaller sequence of changes.

**Apply it.** Prepare a client-facing handoff with known limitations and a rollback plan.

Mission connection: broken-analytics-dashboard. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### Client Brief: Broken Analytics Dashboard

ID: broken-analytics-dashboard | Professional | Challenging | mission

Audit and improve an inherited dashboard without step-by-step implementation instructions.

Prerequisites: professional-frontend-unit-1 (hard, knowledge)

#### Required behaviour

- Prioritized defect report with evidence

- Fix duplicate requests and inconsistent states

- Repair modal accessibility

- Address measured unnecessary rendering

- Refactor justified duplication

- Add behavioural regression tests

- Explain architecture, trade-offs and unresolved risks

#### Explain

Defend your priorities and one decision to leave code unchanged.

#### Modify

The client adds saved filters and a slow-network requirement; adapt your existing solution.

#### Rubric

- **required / hybrid:** Prioritized defect report with evidence

- **required / hybrid:** Fix duplicate requests and inconsistent states

- **required / hybrid:** Repair modal accessibility

- **required / hybrid:** Address measured unnecessary rendering

- **required / hybrid:** Refactor justified duplication

- **required / hybrid:** Add behavioural regression tests

- **required / hybrid:** Explain architecture, trade-offs and unresolved risks

- **required / reviewer:** Defend your priorities and one decision to leave code unchanged.

- **required / hybrid:** The client adds saved filters and a slow-network requirement; adapt your existing solution.

- **quality / reviewer:** Readable names and appropriate structure for Professional work; no penalty for an alternative valid implementation.

Evidence requirements: Frontend Development: Applied; Architecture: Applied; Debugging: Applied; Technical Communication: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Professional Frontend Checkpoint

ID: professional-frontend-checkpoint-v1 | Professional | Challenging | assessment

Take over an unfamiliar service-management interface and deliver a tested repair.

Prerequisites: broken-analytics-dashboard (hard, mission)

#### Required behaviour

- Interpret incomplete requirements and record assumptions

- Diagnose and fix a correctness and accessibility defect

- Improve reliability and measured performance

- Provide tests, reviewable history and documentation

- Explain and implement a controlled requirement change

#### Explain

Explain how evidence changed your initial diagnosis.

#### Modify

Add another user workflow without regressing existing flows.

#### Rubric

- **required / hybrid:** Interpret incomplete requirements and record assumptions

- **required / hybrid:** Diagnose and fix a correctness and accessibility defect

- **required / hybrid:** Improve reliability and measured performance

- **required / hybrid:** Provide tests, reviewable history and documentation

- **required / hybrid:** Explain and implement a controlled requirement change

- **required / reviewer:** Explain how evidence changed your initial diagnosis.

- **required / hybrid:** Add another user workflow without regressing existing flows.

- **quality / reviewer:** Readable names and appropriate structure for Professional work; no penalty for an alternative valid implementation.

Evidence requirements: Frontend Development: Assessment; Architecture: Assessment; Debugging: Assessment; Technical Communication: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: professional-frontend-unit-1, broken-analytics-dashboard, professional-frontend-checkpoint-v1. All require evaluator evidence; optional work does not block.

## Module: React Specialist Assessment Design

ID: react-specialist | Specialist | Version 1.0.0

Prerequisites: professional-frontend (hard, verification)

### Objectives

- Map two different advanced projects to state, effects, architecture, performance, accessibility and testing; identify missing evidence.

### Lesson: Depth requires diverse evidence

ID: react-specialist-unit-1

Prerequisites: professional-frontend (hard, verification)

**Why it exists.** Repeating one familiar state exercise does not demonstrate deep React expertise.

**Real-world example.** An unfamiliar application has interacting state, async and accessibility failures.

**How it works.** Specialist review requires multiple substantial verified projects plus work in an unfamiliar codebase: investigation, architecture improvement, a feature, performance diagnosis, explanation and modification. Review evidence diversity and recency, not XP or time spent. Record technology and curriculum versions. Existing evidence is not deleted just because it ages. This is the assessment specification; authoritative specialist evaluation remains disabled.

```
Evidence matrix: project × competency × level × date × verification record
```

**Try it.** Map two different advanced projects to state, effects, architecture, performance, accessibility and testing; identify missing evidence.

**Break it.** Count many identical useState exercises as Advanced evidence.

**Debug it.** Compare competency coverage and replace repetitions with relevant missing problem types.

**Apply it.** Plan a new unfamiliar-codebase assessment without exposing protected test implementation.

Mission connection: react-specialist-investigation. Completion requires practical work, diagnosis and transfer; lesson views never suffice.

### React Specialist Investigation

ID: react-specialist-investigation | Specialist | Challenging | mission

Investigate an unfamiliar React codebase with an evidence-backed improvement brief.

Prerequisites: react-specialist-unit-1 (hard, knowledge)

#### Required behaviour

- Deep architecture and React mental-model reasoning

- Feature implementation and non-trivial debugging

- Measured performance diagnosis

- Accessible interaction and testing strategy

- Explanation and regression-safe modification

- Multiple prior verified substantial projects required before authoritative assessment

#### Explain

Explain competing architectural approaches using evidence from the code.

#### Modify

Change a central requirement and justify how the design absorbs it.

#### Rubric

- **required / hybrid:** Deep architecture and React mental-model reasoning

- **required / hybrid:** Feature implementation and non-trivial debugging

- **required / hybrid:** Measured performance diagnosis

- **required / hybrid:** Accessible interaction and testing strategy

- **required / hybrid:** Explanation and regression-safe modification

- **required / hybrid:** Multiple prior verified substantial projects required before authoritative assessment

- **required / reviewer:** Explain competing architectural approaches using evidence from the code.

- **required / hybrid:** Change a central requirement and justify how the design absorbs it.

- **quality / reviewer:** Readable names and appropriate structure for Specialist work; no penalty for an alternative valid implementation.

Evidence requirements: React: Applied; Architecture: Applied; Performance: Applied; Accessibility: Applied; Testing: Applied

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### React Specialist Practical Assessment

ID: react-specialist-assessment-v1 | Specialist | Challenging | assessment

Use a fresh unfamiliar codebase and independent review; the delivery service is not enabled.

Prerequisites: react-specialist-investigation (hard, mission)

#### Required behaviour

- Prior Professional competence and diverse verified projects

- Architecture, debugging, implementation and domain-specific performance work

- Explanation and controlled modification

- Integrity review and appeals available

- Reviewer records required decisions; no XP-based promotion

#### Explain

Explain why this evidence supports depth beyond ordinary completion.

#### Modify

Implement a new data-ownership constraint without regression.

#### Rubric

- **required / hybrid:** Prior Professional competence and diverse verified projects

- **required / hybrid:** Architecture, debugging, implementation and domain-specific performance work

- **required / hybrid:** Explanation and controlled modification

- **required / hybrid:** Integrity review and appeals available

- **required / hybrid:** Reviewer records required decisions; no XP-based promotion

- **required / reviewer:** Explain why this evidence supports depth beyond ordinary completion.

- **required / hybrid:** Implement a new data-ownership constraint without regression.

- **quality / reviewer:** Readable names and appropriate structure for Specialist work; no penalty for an alternative valid implementation.

Evidence requirements: React: Assessment; Architecture: Assessment; Performance: Assessment; Accessibility: Assessment; Testing: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

Module completion: react-specialist-unit-1, react-specialist-investigation, react-specialist-assessment-v1. All require evaluator evidence; optional work does not block.

## Project ladder

### Responsive Business Website

ID: responsive-business-website | Foundation | Moderate | project

A small repair business needs Home, About, Services and Contact information. Create your own design rather than reproducing a finished screenshot.

Prerequisites: web-how-it-works (hard, skill), html-core (hard, skill), css-core (hard, skill), responsive-web (hard, skill), accessibility-foundations (hard, skill), browser-devtools (hard, skill)

#### Required behaviour

- Semantic HTML and logical headings

- Responsive layout and mobile navigation at 320, 390, 768, 1024 and 1440 CSS pixels

- Accessible labelled contact form with honest local-only submission status

- Useful image alternatives, readable type and contrast

- Keyboard operation, visible focus and no unintended horizontal overflow

- README: purpose, technologies, implementation and accessibility notes

#### Explain

Explain two semantic choices and one responsive breakpoint.

#### Modify

Add an extra service and long contact instructions while preserving usability.

#### Rubric

- **required / hybrid:** Semantic HTML and logical headings

- **required / hybrid:** Responsive layout and mobile navigation at 320, 390, 768, 1024 and 1440 CSS pixels

- **required / hybrid:** Accessible labelled contact form with honest local-only submission status

- **required / hybrid:** Useful image alternatives, readable type and contrast

- **required / hybrid:** Keyboard operation, visible focus and no unintended horizontal overflow

- **required / hybrid:** README: purpose, technologies, implementation and accessibility notes

- **required / reviewer:** Explain two semantic choices and one responsive breakpoint.

- **required / hybrid:** Add an extra service and long contact instructions while preserving usability.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: HTML: Project; CSS: Project; Responsive Design: Project; Accessibility: Project; Frontend Development: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Vanilla JavaScript Task Manager

ID: vanilla-js-task-manager | Foundation | Moderate | project

An individual needs a browser task manager to replace paper notes. Use HTML, CSS and Vanilla JavaScript; do not use React.

Prerequisites: javascript-programming-basics (hard, skill), javascript-conditions (hard, skill), javascript-functions (hard, skill), javascript-data-collections (hard, skill), javascript-debugging-foundations (hard, skill), javascript-dom (hard, skill), javascript-events (hard, skill), javascript-forms-validation (hard, skill), javascript-array-transformations (hard, skill), javascript-browser-storage (hard, skill), accessibility-foundations (hard, skill), responsive-web (hard, skill)

#### Required behaviour

- Create, display, edit and delete tasks

- Mark complete and incomplete using stable identity

- All, Active and Completed filters derive from one underlying collection

- Reject empty titles and show a useful empty state

- Persist and restore tasks after refresh

- Handle missing, malformed and wrong-shaped stored data without a crash or silent destructive overwrite

- Labelled input, semantic buttons, visible focus and non-colour-only status

- Usable on phone, tablet and desktop with no unintended overflow

- Behaviour checks: render, valid add, empty reject, complete, edit, delete, both filters, reload and missing storage

- Debug a variation in which completed tasks revert after refresh

- README: purpose, features, technologies, learning, persistence and known limits

#### Explain

Explain serialization, restoration and the controlled bug’s root cause.

#### Modify

Add task priority and update filters while accepting older saved records.

#### Rubric

- **required / hybrid:** Create, display, edit and delete tasks

- **required / hybrid:** Mark complete and incomplete using stable identity

- **required / hybrid:** All, Active and Completed filters derive from one underlying collection

- **required / hybrid:** Reject empty titles and show a useful empty state

- **required / hybrid:** Persist and restore tasks after refresh

- **required / hybrid:** Handle missing, malformed and wrong-shaped stored data without a crash or silent destructive overwrite

- **required / hybrid:** Labelled input, semantic buttons, visible focus and non-colour-only status

- **required / hybrid:** Usable on phone, tablet and desktop with no unintended overflow

- **required / hybrid:** Behaviour checks: render, valid add, empty reject, complete, edit, delete, both filters, reload and missing storage

- **required / hybrid:** Debug a variation in which completed tasks revert after refresh

- **required / hybrid:** README: purpose, features, technologies, learning, persistence and known limits

- **required / reviewer:** Explain serialization, restoration and the controlled bug’s root cause.

- **required / hybrid:** Add task priority and update filters while accepting older saved records.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Project; DOM: Project; Events: Project; Forms: Project; Array Transformations: Project; Browser Storage: Project; Accessibility: Project; Responsive Design: Project; Debugging: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Expense Management Application

ID: expense-management-application | Intermediate | Moderate | project

Help an individual track expenses with a usable responsive browser application.

Prerequisites: vanilla-js-task-manager (hard, project), javascript-modules (hard, skill), http-rest-apis (hard, skill), testing-foundations (hard, skill)

#### Required behaviour

- Create, edit and delete expenses with stable identity

- Validate amounts and categories

- Filter and derive totals without duplicate state

- Persist records and handle corrupt data

- Use a documented read API for category guidance or clearly labelled local fixtures

- Loading, empty and error states

- Accessible controls, responsive layout and behavioural tests

- README documents data location and limits

#### Explain

Explain stored versus derived data and API failure handling.

#### Modify

Add a recurring-expense view without counting future expenses as already paid.

#### Rubric

- **required / hybrid:** Create, edit and delete expenses with stable identity

- **required / hybrid:** Validate amounts and categories

- **required / hybrid:** Filter and derive totals without duplicate state

- **required / hybrid:** Persist records and handle corrupt data

- **required / hybrid:** Use a documented read API for category guidance or clearly labelled local fixtures

- **required / hybrid:** Loading, empty and error states

- **required / hybrid:** Accessible controls, responsive layout and behavioural tests

- **required / hybrid:** README documents data location and limits

- **required / reviewer:** Explain stored versus derived data and API failure handling.

- **required / hybrid:** Add a recurring-expense view without counting future expenses as already paid.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Project; API Integration: Project; Persistence: Project; Testing: Project; Accessibility: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Developer Preferences Application

ID: react-developer-preferences | Foundation | Moderate | project

Extend the historical Shared Preferences exercise into a small routed React application.

Prerequisites: shared-preferences (hard, mission), react-routing (hard, skill), testing-foundations (hard, skill)

#### Required behaviour

- Multiple components use shared language/theme settings

- Controlled form, effect cleanup and a custom context hook

- Validated local persistence and useful error feedback

- Routing with direct-load and not-found behaviour

- Accessible responsive controls

- Tests for change, restore, invalid storage and shared consumers

- README acknowledges the original Programming Language Toggle App

#### Explain

Explain state, props, effects and Context responsibilities.

#### Modify

Add a per-project preference override without duplicating global state.

#### Rubric

- **required / hybrid:** Multiple components use shared language/theme settings

- **required / hybrid:** Controlled form, effect cleanup and a custom context hook

- **required / hybrid:** Validated local persistence and useful error feedback

- **required / hybrid:** Routing with direct-load and not-found behaviour

- **required / hybrid:** Accessible responsive controls

- **required / hybrid:** Tests for change, restore, invalid storage and shared consumers

- **required / hybrid:** README acknowledges the original Programming Language Toggle App

- **required / reviewer:** Explain state, props, effects and Context responsibilities.

- **required / hybrid:** Add a per-project preference override without duplicating global state.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: React: Project; Context: Project; Forms: Project; Routing: Project; Browser Storage: Project; Accessibility: Project; Testing: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Task Management Dashboard

ID: task-management-dashboard | Intermediate | Moderate | project

A small team needs a frontend for a documented task API. Local fixtures must be identified as fixtures; do not claim real team collaboration when no service exists.

Prerequisites: react-application-development (hard, skill), react-developer-preferences (hard, project), git-foundations (hard, skill)

#### Required behaviour

- Routed task list, detail and settings

- Create/update/delete contracts, validation and clear pending states

- Filtering and derived summaries

- Loading, empty, denied-access and service-failure states

- Responsive accessible forms and navigation

- No frontend-only authorization claim

- Unit/component and integration checks

- README includes API contract, setup and limitations

#### Explain

Explain state ownership and how failed updates recover.

#### Modify

Add a read-only role and describe the matching server authorization contract.

#### Rubric

- **required / hybrid:** Routed task list, detail and settings

- **required / hybrid:** Create/update/delete contracts, validation and clear pending states

- **required / hybrid:** Filtering and derived summaries

- **required / hybrid:** Loading, empty, denied-access and service-failure states

- **required / hybrid:** Responsive accessible forms and navigation

- **required / hybrid:** No frontend-only authorization claim

- **required / hybrid:** Unit/component and integration checks

- **required / hybrid:** README includes API contract, setup and limitations

- **required / reviewer:** Explain state ownership and how failed updates recover.

- **required / hybrid:** Add a read-only role and describe the matching server authorization contract.

- **quality / reviewer:** Readable names and appropriate structure for Intermediate work; no penalty for an alternative valid implementation.

Evidence requirements: React: Project; API Integration: Project; Testing: Project; Git: Project; Accessibility: Project; State Ownership: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Production-Style JavaScript Dashboard

ID: production-javascript-dashboard | Advanced | Hard | project

Build a modular dashboard with controlled asynchronous data and measured behaviour without a framework requirement.

Prerequisites: expense-management-application (hard, project), javascript-advanced (hard, skill), frontend-performance (hard, skill), testing-strategy (hard, skill)

#### Required behaviour

- Bounded/cancellable data loading

- Testable modules and immutable transformations

- Accessible loading/error/empty states

- Performance baseline and focused improvement

- Cleanup across repeated navigation

- Regression tests and architecture notes

#### Explain

Explain closure, event-loop and concurrency decisions in the implementation.

#### Modify

Support an additional data source with different failure semantics.

#### Rubric

- **required / hybrid:** Bounded/cancellable data loading

- **required / hybrid:** Testable modules and immutable transformations

- **required / hybrid:** Accessible loading/error/empty states

- **required / hybrid:** Performance baseline and focused improvement

- **required / hybrid:** Cleanup across repeated navigation

- **required / hybrid:** Regression tests and architecture notes

- **required / reviewer:** Explain closure, event-loop and concurrency decisions in the implementation.

- **required / hybrid:** Support an additional data source with different failure semantics.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Project; Architecture: Project; Performance: Project; Testing: Project; API Integration: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Production SaaS Dashboard

ID: production-saas-dashboard | Advanced | Hard | project

Build a production-style frontend with analytics, complex forms and reusable components. The title describes the brief, not a production-readiness claim.

Prerequisites: task-management-dashboard (hard, project), react-advanced-architecture (hard, skill), accessible-components (hard, skill), frontend-performance (hard, skill), testing-strategy (hard, skill), frontend-security (hard, skill)

#### Required behaviour

- Deliberate state and component architecture

- Validated API handling with recovery and cancellation

- Complex accessible forms and modal interactions

- Code splitting with loading and failure recovery

- Measured performance improvements

- Behaviour and integration test strategy

- Security boundary review

- Repository documentation and reproducible preview deployment

#### Explain

Explain architecture, testing scope and one rejected optimization.

#### Modify

Add a workspace-switching requirement while preserving isolation and draft recovery.

#### Rubric

- **required / hybrid:** Deliberate state and component architecture

- **required / hybrid:** Validated API handling with recovery and cancellation

- **required / hybrid:** Complex accessible forms and modal interactions

- **required / hybrid:** Code splitting with loading and failure recovery

- **required / hybrid:** Measured performance improvements

- **required / hybrid:** Behaviour and integration test strategy

- **required / hybrid:** Security boundary review

- **required / hybrid:** Repository documentation and reproducible preview deployment

- **required / reviewer:** Explain architecture, testing scope and one rejected optimization.

- **required / hybrid:** Add a workspace-switching requirement while preserving isolation and draft recovery.

- **quality / reviewer:** Readable names and appropriate structure for Advanced work; no penalty for an alternative valid implementation.

Evidence requirements: React: Project; Architecture: Project; Accessibility: Project; Performance: Project; Testing: Project; Security: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Professional Frontend Capstone

ID: frontend-capstone | Professional | Challenging | project

A community training organization needs a responsive workshop management frontend for an agreed API. Clarify roles, cancellation rules and draft handling before choosing the architecture.

Prerequisites: professional-frontend (hard, skill), production-saas-dashboard (hard, project), deployment-fundamentals (hard, skill)

#### Required behaviour

- Semantic HTML and responsive CSS

- JavaScript/React with deliberate state and form design

- API integration with loading, empty, error, conflict and retry states

- Accessibility evidence including keyboard, focus, labels, errors and manual assistive-technology checks

- Functional, component and integration tests for important behaviours

- Git history, review notes, architecture decisions and README

- Measured performance on declared scenarios

- Security boundaries, no client secrets and server authorization contract

- Reproducible preview deployment and recovery notes

- Debug an unfamiliar defect, explain selected code and implement the post-pass change

- Portfolio package: problem, solution, technologies, demonstrated skills, test/accessibility/responsive evidence and optional source/live links

#### Explain

Explain state ownership, API recovery, accessibility and what would change at a larger scale.

#### Modify

After the initial requirements are met, the client needs saved filters, keyboard-operable bulk selection and recovery from a rejected bulk update. Extend the same implementation and preserve earlier behaviours.

#### Rubric

- **required / hybrid:** Semantic HTML and responsive CSS

- **required / hybrid:** JavaScript/React with deliberate state and form design

- **required / hybrid:** API integration with loading, empty, error, conflict and retry states

- **required / hybrid:** Accessibility evidence including keyboard, focus, labels, errors and manual assistive-technology checks

- **required / hybrid:** Functional, component and integration tests for important behaviours

- **required / hybrid:** Git history, review notes, architecture decisions and README

- **required / hybrid:** Measured performance on declared scenarios

- **required / hybrid:** Security boundaries, no client secrets and server authorization contract

- **required / hybrid:** Reproducible preview deployment and recovery notes

- **required / hybrid:** Debug an unfamiliar defect, explain selected code and implement the post-pass change

- **required / hybrid:** Portfolio package: problem, solution, technologies, demonstrated skills, test/accessibility/responsive evidence and optional source/live links

- **required / reviewer:** Explain state ownership, API recovery, accessibility and what would change at a larger scale.

- **required / hybrid:** After the initial requirements are met, the client needs saved filters, keyboard-operable bulk selection and recovery from a rejected bulk update. Extend the same implementation and preserve earlier behaviours.

- **quality / reviewer:** Readable names and appropriate structure for Professional work; no penalty for an alternative valid implementation.

Evidence requirements: Frontend Development: Project; React: Project; JavaScript: Project; Accessibility: Project; Testing: Project; Git: Project; Performance: Project; Security: Project; Deployment: Project; Technical Communication: Project

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

## Additional checkpoints

### Web Foundations Practical Checkpoint

ID: web-foundations-checkpoint-v1 | Foundation | Moderate | assessment

Create a Community Workshop Website, distinct from the business training project.

Prerequisites: responsive-business-website (hard, project)

#### Required behaviour

- Semantic content and workshop schedule

- Labelled registration form

- Responsive layout at required viewport classes

- Keyboard access, focus and readable contrast

- Diagnose a controlled missing-asset or layout defect

- Provide explanation and test observations

#### Explain

Explain how structure and layout serve the content.

#### Modify

Add another workshop with a longer title and preserve navigation.

#### Rubric

- **required / hybrid:** Semantic content and workshop schedule

- **required / hybrid:** Labelled registration form

- **required / hybrid:** Responsive layout at required viewport classes

- **required / hybrid:** Keyboard access, focus and readable contrast

- **required / hybrid:** Diagnose a controlled missing-asset or layout defect

- **required / hybrid:** Provide explanation and test observations

- **required / reviewer:** Explain how structure and layout serve the content.

- **required / hybrid:** Add another workshop with a longer title and preserve navigation.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: HTML: Assessment; CSS: Assessment; Responsive Design: Assessment; Accessibility: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### JavaScript Foundation Practical Checkpoint

ID: javascript-foundation-checkpoint-v1 | Foundation | Moderate | assessment

Build a Personal Reading List Manager from a brief without a supplied architecture.

Prerequisites: vanilla-js-task-manager (hard, project)

#### Required behaviour

- Add, edit and remove reading items

- Mark status and filter from underlying data

- Validate input

- Persist and restore structured data

- Handle missing and malformed storage

- Accessible controls and responsive layout

- Fix a controlled persistence defect

- Explain selected functions, data shape and events

#### Explain

Explain how the UI reflects application data and how restoration works.

#### Modify

Add a reading-priority field while keeping older records usable.

#### Rubric

- **required / hybrid:** Add, edit and remove reading items

- **required / hybrid:** Mark status and filter from underlying data

- **required / hybrid:** Validate input

- **required / hybrid:** Persist and restore structured data

- **required / hybrid:** Handle missing and malformed storage

- **required / hybrid:** Accessible controls and responsive layout

- **required / hybrid:** Fix a controlled persistence defect

- **required / hybrid:** Explain selected functions, data shape and events

- **required / reviewer:** Explain how the UI reflects application data and how restoration works.

- **required / hybrid:** Add a reading-priority field while keeping older records usable.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: JavaScript: Assessment; DOM: Assessment; Events: Assessment; Validation: Assessment; Persistence: Assessment; Accessibility: Assessment; Debugging: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

### Frontend Developer Foundation Checkpoint

ID: frontend-foundation-checkpoint-v1 | Foundation | Moderate | assessment

Build a small accessible community directory with React and a documented read API.

Prerequisites: web-foundations-checkpoint-v1 (hard, assessment), javascript-foundation-checkpoint-v1 (hard, assessment), react-foundation-checkpoint-v1 (hard, assessment), react-developer-preferences (hard, project), git-foundations (hard, skill), testing-foundations (hard, skill)

#### Required behaviour

- Semantic responsive interface

- JavaScript and React data/state reasoning

- Git workflow and README

- Loading, error and empty states

- Forms and accessibility behaviour

- Important behavioural tests

- Explain and modify existing code

#### Explain

Explain the full browser-to-API data flow.

#### Modify

Add a saved filter with a safe first-run default.

#### Rubric

- **required / hybrid:** Semantic responsive interface

- **required / hybrid:** JavaScript and React data/state reasoning

- **required / hybrid:** Git workflow and README

- **required / hybrid:** Loading, error and empty states

- **required / hybrid:** Forms and accessibility behaviour

- **required / hybrid:** Important behavioural tests

- **required / hybrid:** Explain and modify existing code

- **required / reviewer:** Explain the full browser-to-API data flow.

- **required / hybrid:** Add a saved filter with a safe first-run default.

- **quality / reviewer:** Readable names and appropriate structure for Foundation work; no penalty for an alternative valid implementation.

Evidence requirements: Frontend Development: Assessment; HTML: Assessment; CSS: Assessment; JavaScript: Assessment; React: Assessment; Git: Assessment; Accessibility: Assessment; API Integration: Assessment; Testing: Assessment

Test plan: specified, not connected to an evaluator. No protected test implementation is published.

## Competency maps

### JavaScript

- **Beginner:** values/types, variables, operators, conditions, functions, scope, arrays, objects, loops, debugging

- **Foundation:** array transformations, modules, DOM, events, forms, JSON, persistence, immutability

- **Intermediate:** async, promises, fetch, HTTP, errors, testing, application composition

- **Advanced:** closures, prototypes, classes versus composition, event loop, cancellation, concurrency, performance, architecture

- **Professional:** unfamiliar-code debugging, maintainability, reliability, review, requirement changes

- **Specialist:** deep domain review across diverse verified projects

### React

- **Beginner:** JSX, components, props, events, state, conditional rendering, lists/keys

- **Foundation:** forms, state ownership, composition, effects, Context, hooks, routing, persistence

- **Intermediate:** data fetching, API states, reducers, validation, accessibility, component testing

- **Advanced:** architecture, provider boundaries, profiling, memoization judgement, lazy loading, error boundaries, complex forms, test strategy

- **Professional:** production debugging, prioritization, maintainability, technical explanation, modification

- **Specialist:** unfamiliar codebase, deep mental model, architecture judgement, performance diagnosis, verified diverse evidence

### Frontend Development

- **Beginner:** browser fundamentals, semantic HTML, CSS

- **Foundation:** responsive design, JavaScript, accessibility, Git, debugging

- **Intermediate:** React, API integration, testing, forms and state

- **Advanced:** architecture, performance, security, API reliability, integration testing

- **Professional:** deployment, recovery, client briefs, documentation, review, capstone

- **Specialist:** domain-specific evidence beyond general frontend completion

## Deliberate debugging fixtures

### broken-price-calculator

Reproduce the wrong total for a text input and explain the type conversion.

```
function total(price, quantity) { return price + quantity; }
console.log(total("12", 3));
```

Expected behaviour: Three items at 12 each cost 36; invalid numeric input must be rejected.

### broken-contact-formatter

Reproduce the crash when an optional phone number is absent.

```
function formatContact(contact) { return contact.name + ": " + contact.phone.trim(); }
console.log(formatContact({ name: "Lerato" }));
```

Expected behaviour: The contact name remains visible with an explicit missing-phone fallback.

### broken-shopping-list

Trace the loop for empty, one-item and two-item lists.

```
function titles(items) {
  const result = [];
  for (let index = 0; index <= items.length; index++) result.push(items[index].title);
  return result;
}
```

Expected behaviour: Return each title exactly once without reading beyond the collection.

### broken-storage

There are multiple faults: encoding, key choice and restore shape. Diagnose separately.

```
function save(tasks) { localStorage.setItem("practice:tasks", tasks); }
function load() { return localStorage.getItem("practice:task") || []; }
```

Expected behaviour: Structured records round-trip through the same key, with deliberate invalid-data handling.

### reading-list-persistence

The completion control updates the screen. Reload then loses the completed state. Repair the missing persistence step and validate restored records.

```
const key = "practice:reading";
let books = JSON.parse(localStorage.getItem(key) || "[]");
function save() { localStorage.setItem(key, JSON.stringify(books)); }
function add(book) { books.push(book); save(); render(); }
function complete(id) {
  books = books.map(book => book.id === id ? { ...book, completed: true } : book);
  render();
}
// Supply render and removal behaviour; preserve this defect until reproduced.
```

Expected behaviour: Add, complete and remove survive reload; missing and invalid data cannot crash the interface.

### inaccessible-signup

Repair labels, semantics, focus and colour-only error communication.

```
<style>*:focus{outline:none}.error{border:2px solid red}</style>
<input placeholder="Name"><input placeholder="Email" class="error">
<div onclick="console.log('submit')">Submit</div>
```

Expected behaviour: Labelled native controls are keyboard operable and errors are described in text.

### broken-landing-page

Create this local page with no missing.css or missing-logo.png file. Diagnose five categories using DevTools, then repair the source.

```
<!doctype html><html lang="en"><head><title>Workshop</title><link rel="stylesheet" href="missing.css"><style>.card{width:900px;padding:40px} .title{color:transparent}</style></head><body><div class="card"><div class="title">Workshop</div><img src="missing-logo.png"><script>document.querySelector("#absent").textContent="Ready";</script></div></body></html>
```

Expected behaviour: Meaningful structure, working assets, readable style, no blocking script error and no unintended narrow-screen overflow.

## References

- [React documentation](https://react.dev/learn) — Review reference for React terminology and current documentation; teaching examples are authored for this curriculum.

- [MDN web development](https://developer.mozilla.org/en-US/docs/Learn_web_development) — Further reading for web platform topics.

- [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) — Review reference for storage lifetimes, strings and failure handling.

- [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) — Further reading; practical and automated checks do not independently establish complete conformance.

- [Git reference](https://git-scm.com/docs) — Reference for installed Git command behaviour.
