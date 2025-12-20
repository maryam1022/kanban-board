let draggedTask = null;


window.onload = loadTasks;

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value === "") return;

  createTask(input.value, "todo");
  input.value = "";
  saveTasks();
}

function createTask(text, status) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;

  task.innerHTML = `
    <span>${text}</span>
    <button onclick="deleteTask(this)">✖</button>
  `;

  task.addEventListener("dragstart", () => draggedTask = task);
  task.addEventListener("dragend", () => draggedTask = null);

  document.getElementById(status).appendChild(task);
}

document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault());

  list.addEventListener("drop", () => {
    if (draggedTask) {
      list.appendChild(draggedTask);
      saveTasks();
    }
  });
});

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const data = {
    todo: [],
    doing: [],
    done: []
  };

  Object.keys(data).forEach(status => {
    document.querySelectorAll(`#${status} .task span`)
      .forEach(task => data[status].push(task.textContent));
  });

  localStorage.setItem("kanbanBoard", JSON.stringify(data));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("kanbanBoard"));
  if (!saved) return;

  Object.keys(saved).forEach(status => {
    saved[status].forEach(task => createTask(task, status));
  });
}
function createTask(text, status) {
  const task = document.createElement("div");
  task.className = `task ${status}`;
  task.draggable = true;

  task.innerHTML = `
    <span>${text}</span>
    <button onclick="deleteTask(this)">✖</button>
  `;

  task.addEventListener("dragstart", () => draggedTask = task);
  task.addEventListener("dragend", () => draggedTask = null);

  document.getElementById(status).appendChild(task);
}
function saveTasks() {
  const data = [];

  document.querySelectorAll(".task").forEach(task => {
    data.push({
      text: task.querySelector("span").textContent,
      status: task.parentElement.id
    });
  });

  localStorage.setItem("kanbanBoard", JSON.stringify(data));
}
