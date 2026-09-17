// Deliberately broken LOCAL PRACTICE fixtures. Never imported by production services.
export const exercises = {
  "broken-price-calculator": {
    prompt:
      "Reproduce the wrong total for a text input and explain the type conversion.",
    code: 'function total(price, quantity) { return price + quantity; }\nconsole.log(total("12", 3));',
    expectedBehaviour:
      "Three items at 12 each cost 36; invalid numeric input must be rejected.",
  },
  "broken-contact-formatter": {
    prompt: "Reproduce the crash when an optional phone number is absent.",
    code: 'function formatContact(contact) { return contact.name + ": " + contact.phone.trim(); }\nconsole.log(formatContact({ name: "Lerato" }));',
    expectedBehaviour:
      "The contact name remains visible with an explicit missing-phone fallback.",
  },
  "broken-shopping-list": {
    prompt: "Trace the loop for empty, one-item and two-item lists.",
    code: "function titles(items) {\n  const result = [];\n  for (let index = 0; index <= items.length; index++) result.push(items[index].title);\n  return result;\n}",
    expectedBehaviour:
      "Return each title exactly once without reading beyond the collection.",
  },
  "broken-storage": {
    prompt:
      "There are multiple faults: encoding, key choice and restore shape. Diagnose separately.",
    code: 'function save(tasks) { localStorage.setItem("practice:tasks", tasks); }\nfunction load() { return localStorage.getItem("practice:task") || []; }',
    expectedBehaviour:
      "Structured records round-trip through the same key, with deliberate invalid-data handling.",
  },
  "reading-list-persistence": {
    prompt:
      "The completion control updates the screen. Reload then loses the completed state. Repair the missing persistence step and validate restored records.",
    code: 'const key = "practice:reading";\nlet books = JSON.parse(localStorage.getItem(key) || "[]");\nfunction save() { localStorage.setItem(key, JSON.stringify(books)); }\nfunction add(book) { books.push(book); save(); render(); }\nfunction complete(id) {\n  books = books.map(book => book.id === id ? { ...book, completed: true } : book);\n  render();\n}\n// Supply render and removal behaviour; preserve this defect until reproduced.',
    expectedBehaviour:
      "Add, complete and remove survive reload; missing and invalid data cannot crash the interface.",
  },
  "inaccessible-signup": {
    prompt:
      "Repair labels, semantics, focus and colour-only error communication.",
    code: '<style>*:focus{outline:none}.error{border:2px solid red}</style>\n<input placeholder="Name"><input placeholder="Email" class="error">\n<div onclick="console.log(\'submit\')">Submit</div>',
    expectedBehaviour:
      "Labelled native controls are keyboard operable and errors are described in text.",
  },
  "broken-landing-page": {
    prompt:
      "Create this local page with no missing.css or missing-logo.png file. Diagnose five categories using DevTools, then repair the source.",
    code: '<!doctype html><html lang="en"><head><title>Workshop</title><link rel="stylesheet" href="missing.css"><style>.card{width:900px;padding:40px} .title{color:transparent}</style></head><body><div class="card"><div class="title">Workshop</div><img src="missing-logo.png"><script>document.querySelector("#absent").textContent="Ready";</script></div></body></html>',
    expectedBehaviour:
      "Meaningful structure, working assets, readable style, no blocking script error and no unintended narrow-screen overflow.",
  },
};
