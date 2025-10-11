const API_URL = "http://localhost:8080/api/todos";

// ----- DOM Refs -----
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const saveMsg = document.getElementById("saveMsg");

const taskList = document.getElementById("taskList");
const alertBox = document.getElementById("alert");
const template = document.getElementById("task-template");

// ----- STATE -----
let tasks = []; // local cache

// ----- UTILITIES -----
function showAlert(msg, type = "error") {
  alertBox.textContent = msg;
  alertBox.className = "alert show";
  alertBox.style.background = (type === "error") ? "#ffecec" : "#e9f9ee";
  alertBox.style.color = (type === "error") ? "#b00020" : "#1a7f37";
  setTimeout(() => {
    alertBox.className = "alert";
  }, 3500);
}

function showSaved(msg = "Task saved!") {
  saveMsg.textContent = msg;
  saveMsg.style.opacity = "1";
  setTimeout(()=> saveMsg.textContent = "", 2200);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    // return yyyy-mm-dd for display (same as input type=date)
    return d.toISOString().slice(0,10);
  } catch { return "" }
}

// ----- CRUD: READ -----
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Server ${res.status}`);
    tasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error("fetchTasks:", err);
    showAlert("Failed to load tasks. Is your backend running?", "error");
    tasks = [];
    renderTasks();
  }
}

// ----- CRUD: CREATE -----
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const date = dateInput.value || null;

  if (!title) {
    showAlert("Please enter a title.", "error");
    return;
  }

  const payload = { title, date, completed: false };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Create failed (${res.status})`);
    const created = await res.json();
    // update local list and UI
    tasks.unshift(created);
    renderTasks();
    taskForm.reset();
    showSaved("Task saved!");
  } catch (err) {
    console.error("create:", err);
    showAlert("Failed to create task.", "error");
  }
});

// ----- CRUD: UPDATE -----
async function updateTask(updated) {
  try {
    const res = await fetch(`${API_URL}/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    if (!res.ok) throw new Error(`Update failed (${res.status})`);
    const ret = await res.json();
    // update local cache
    const i = tasks.findIndex(t => String(t.id) === String(ret.id));
    if (i >= 0) tasks[i] = ret;
    renderTasks();
  } catch (err) {
    console.error("updateTask:", err);
    showAlert("Failed to update task.", "error");
  }
}

// ----- CRUD: DELETE -----
async function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    tasks = tasks.filter(t => String(t.id) !== String(id));
    renderTasks();
  } catch (err) {
    console.error("deleteTask:", err);
    showAlert("Failed to delete task.", "error");
  }
}

// ----- TOGGLE COMPLETE (uses update) -----
async function toggleComplete(id, checked) {
  const t = tasks.find(x => String(x.id) === String(id));
  if (!t) return;
  t.completed = checked;
  await updateTask(t);
}

// ----- RENDERING -----
function renderTasks() {
  taskList.innerHTML = "";
  if (!tasks || tasks.length === 0) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = "No tasks yet.";
    taskList.appendChild(li);
    return;
  }

  tasks.forEach(task => {
    const node = template.content.cloneNode(true);
    const li = node.querySelector("li");
    const chk = li.querySelector(".chk");
    const titleEl = li.querySelector(".title");
    const metaEl = li.querySelector(".meta");
    const editBtn = li.querySelector(".edit");
    const delBtn = li.querySelector(".delete");

    // populate
    chk.checked = !!task.completed;
    titleEl.textContent = task.title;
    if (task.completed) titleEl.classList.add("done"); else titleEl.classList.remove("done");
    metaEl.textContent = task.date ? `Due: ${formatDate(task.date)}` : "";

    // checkbox toggle
    chk.addEventListener("change", (e) => {
      toggleComplete(task.id, e.target.checked);
    });

    // delete
    delBtn.addEventListener("click", () => deleteTask(task.id));

    // edit -> replace item with inline edit form
    editBtn.addEventListener("click", () => openInlineEdit(li, task));

    taskList.appendChild(li);
  });
}

// ----- INLINE EDIT UI -----
function openInlineEdit(listItem, task) {
  // create inline edit form
  const editWrap = document.createElement("div");
  editWrap.className = "inline-edit";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = task.title;
  titleInput.style.minWidth = "180px";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = formatDate(task.date) || "";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save";
  saveBtn.textContent = "Save";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "cancel";
  cancelBtn.textContent = "Cancel";

  editWrap.appendChild(titleInput);
  editWrap.appendChild(dateInput);
  editWrap.appendChild(saveBtn);
  editWrap.appendChild(cancelBtn);

  // replace current listItem content with editWrap
  const parent = listItem.parentElement;
  parent.replaceChild(document.createElement('li'), listItem); // placeholder to keep order
  const placeholder = parent.querySelector('li:last-child'); // the new placeholder
  placeholder.replaceWith(editWrapWrapper(editWrap, task, parent));

  // focus
  titleInput.focus();

  // handlers
  cancelBtn.addEventListener("click", () => {
    fetchTasks(); // re-render original content from server cache
  });

  saveBtn.addEventListener("click", async () => {
    const newTitle = titleInput.value.trim();
    const newDate = dateInput.value || null;
    if (!newTitle) {
      showAlert("Title cannot be empty.", "error");
      return;
    }
    // send update
    const updated = { ...task, title: newTitle, date: newDate };
    await updateTask(updated);
    showSaved("Task updated!");
  });

  // helper builds a list-item wrapper for inline-edit so styling matches
  function editWrapWrapper(editEl, taskObj, parentList) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.appendChild(editEl);
    return li;
  }
}

// ----- INIT -----
fetchTasks();