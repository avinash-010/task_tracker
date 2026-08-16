async function loadTasks() {
  const [tasksRes, summaryRes] = await Promise.all([
    fetch("/api/tasks"),
    fetch("/api/tasks/summary"),
  ]);
  const tasks = await tasksRes.json();
  const summary = await summaryRes.json();

  document.getElementById("summary").textContent =
    `${summary.active} active, ${summary.completed} completed, ${summary.total} total`;

  const list = document.getElementById("task-list");
  list.innerHTML = "";
  for (const task of tasks) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.title;

    const del = document.createElement("button");
    del.textContent = "x";
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  }
}

async function toggleTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "PATCH" });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

document.getElementById("new-task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("new-task-title");
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  loadTasks();
});

loadTasks();
