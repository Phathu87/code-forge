// Public behaviour specification. Supply a driver for the learner's implementation.
// Driver actions must operate the real UI and wait for its observable state.
// Do not use this local suite to award production progress or verified evidence.
export async function checkTaskManager(driver) {
  const results = [];
  const check = async (name, action) => {
    try {
      await driver.reset();
      await action();
      results.push({ name, status: "PASS" });
    } catch (error) {
      results.push({
        name,
        status: error.infrastructure
          ? "INFRASTRUCTURE_ERROR"
          : "REQUIREMENTS_NOT_MET",
        message: error.message,
      });
    }
  };
  const require = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  await check("Application renders", async () =>
    require(await driver.ready(), "Task interface is unavailable."),
  );
  await check("Valid task can be added", async () => {
    await driver.add("Read");
    require((await driver.items()).some(
      (t) => t.title === "Read",
    ), "Added task is missing.");
  });
  await check("Empty task is rejected", async () => {
    await driver.add("   ");
    require((await driver.items()).length ===
      0, "Whitespace task was accepted.");
    require(await driver.validationVisible(), "No understandable validation feedback.");
  });
  await check("Task can be completed and reopened", async () => {
    await driver.add("Read");
    await driver.toggle("Read");
    require((await driver.items())[0].completed, "Completion did not update.");
    await driver.toggle("Read");
    require(!(await driver.items())[0].completed, "Reopen did not update.");
  });
  await check("Task can be edited", async () => {
    await driver.add("Read");
    await driver.edit("Read", "Write");
    require((await driver.items())[0].title ===
      "Write", "Edit was not reflected.");
  });
  await check("Task can be deleted", async () => {
    await driver.add("Read");
    await driver.remove("Read");
    require((await driver.items()).length === 0, "Removed task remains.");
  });
  for (const filter of ["Active", "Completed"])
    await check(`${filter} filter works`, async () => {
      await driver.add("Read");
      await driver.add("Write");
      await driver.toggle("Read");
      await driver.filter(filter);
      const items = await driver.items();
      require(items.length === 1 &&
        items[0].title ===
          (filter === "Active"
            ? "Write"
            : "Read"), "Filtered results are incorrect.");
    });
  await check("Tasks and completion survive reload", async () => {
    await driver.add("Read");
    await driver.toggle("Read");
    await driver.reload();
    const items = await driver.items();
    require(items.length === 1 &&
      items[0].title === "Read" &&
      items[0].completed, "Saved task state was not restored.");
  });
  await check("Missing storage is safe", async () => {
    await driver.seedStorage(null);
    await driver.reload();
    require(await driver.ready(), "Missing data crashed the app.");
    require((await driver.items()).length ===
      0, "Missing data did not produce an empty state.");
  });
  await check("Malformed storage is handled", async () => {
    await driver.seedStorage("{broken");
    await driver.reload();
    require(await driver.ready(), "Invalid data crashed the app.");
    require(await driver.recoveryVisible(), "No understandable recovery message.");
  });
  return results;
}
