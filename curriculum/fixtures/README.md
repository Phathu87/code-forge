# Local practice fixtures

These files deliberately contain defects or public test specifications. They are not imported by the application runtime, and they do not represent learner records or executed production tests.

`debugging.mjs` supplies broken examples for arithmetic, optional contact data, array boundaries, storage, reading-list restoration, inaccessible forms and landing-page investigation. Copy the relevant string into a disposable local exercise. Do not use real credentials or personal records. Read the expected behaviour before debugging. The examples intentionally stop short of a completed mission solution.

`task-manager-behaviour.mjs` exports `checkTaskManager(driver)`. Write a driver for your own UI rather than renaming application internals to match a test. Its asynchronous methods are:

- `reset()`: reset only the disposable exercise to a fresh empty state.
- `ready()`: return whether the usable task interface is rendered.
- `add(title)`, `toggle(title)`, `edit(oldTitle, newTitle)`, `remove(title)`, `filter(name)`: operate the actual controls and wait for their effects.
- `items()`: return visible task records as `{ title, completed }`, reading observable UI state.
- `reload()`: perform a real full-page reload and wait for restoration.
- `seedStorage(raw)`: set or remove only the exercise's own storage key; `null` means absent.
- `validationVisible()` and `recoveryVisible()`: inspect understandable visible feedback.

Call `await checkTaskManager(driver)` from a local test harness. The driver must throw an error with `infrastructure: true` for unavailable browser/transport tooling; assertion failures are requirements not met. PASS rows mean only these checks actually ran successfully in that local harness. They cannot award CodeForge progress or certificates. Do not replace the real application with an in-memory fake and claim learner behaviour passed.

The harness checks behaviour without mandating component names, property names inside the application, framework architecture or CSS selectors. Accessibility, responsiveness, explanation, README and debugging evidence still require their published rubric checks. The production runner and a packaged browser driver remain unfinished.
