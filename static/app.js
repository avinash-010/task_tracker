let allTasks = [];
let currentFilter = "all";

async function loadTasks() {
  const [tasksRes, summaryRes] = await Promise.all([
    fetch("/api/tasks"),
    fetch("/api/tasks/summary"),
  ]);
  const data = await tasksRes.json();
  allTasks = data.slice().reverse();
  const summary = await summaryRes.json();

  document.getElementById("summary").textContent =
    `${summary.active} active, ${summary.completed} completed, ${summary.total} total`;

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  const filtered = allTasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  for (const task of filtered) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.className = "title";
    span.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `badge ${task.priority || "medium"}`;
    badge.textContent = task.priority || "medium";

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, badge, del);
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
  const titleInput = document.getElementById("new-task-title");
  const priorityInput = document.getElementById("new-task-priority");
  if (!priorityInput.value) {
    priorityInput.classList.add("invalid");
    return;
  }
  priorityInput.classList.remove("invalid");
  const cleanTitle = titleInput.value.replace(/^\s+/, "").replace(/'/g, "");
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: cleanTitle, priority: "medium" }),
  });
  titleInput.value = "";
  priorityInput.value = "";
  loadTasks();
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

document.getElementById("ai-quip-btn").addEventListener("click", () => {
  const overlay = document.getElementById("ai-quip-overlay");
  overlay.hidden = false;
  setTimeout(() => { overlay.hidden = true; }, 10000);
});

loadTasks();
