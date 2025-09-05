// Define the Task type
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

// === Functions to handle localStorage ===

// Get data from localStorage
function getData(): Task[] {
  const storgeData = localStorage.getItem("toDoLists");
  const data = storgeData ? (JSON.parse(storgeData) as Task[]) : [];
  return data;
}

// Save task to localStorage
function saveTodoData(task: Task): void {
  const storgeData = localStorage.getItem("toDoLists");
  const data = storgeData ? (JSON.parse(storgeData) as Task[]) : [];

  // Add the new task to the array
  data.push(task);
  localStorage.setItem("toDoLists", JSON.stringify(data));
}

// save tasks to localStorage
function save(tasks: Task[]): void {
  localStorage.setItem("toDoLists", JSON.stringify(tasks));
}

// === UI Functions ===

// Not found or empty list UI
function notFoundUi(): void {
  const lists = document.querySelector(".lists") as HTMLElement;
  const imge = document.createElement("img");
  imge.setAttribute("src", "../imge/empty.png");
  imge.setAttribute("alt", "not-found");

  lists.appendChild(imge);
  lists.classList.add("not-found");
  const notFound = document.querySelector(".not-found") as HTMLElement;
  if (notFound) {
    notFound.style.display = "block";
  }
}

// Add To-Do list UI
function addTdoListUi(): void {
  // Create the container for the "Add Task" form
  const addContiner = document.createElement("div");
  addContiner.classList.add("add-task-cont");
  const container = document.querySelector(".container");
  container?.appendChild(addContiner);

  // Create the content area inside the "Add Task" form
  const addContent = document.createElement("div");
  addContent.classList.add("add-content");
  addContiner.appendChild(addContent);

  // Add title to the form
  const addTitle = document.createElement("h2");
  addTitle.textContent = "Add Task";
  addContent.appendChild(addTitle);

  // Create the input field for entering the task text
  const taskContent = document.createElement("input");
  taskContent.setAttribute("type", "text");
  taskContent.setAttribute("id", "addInput");
  taskContent.setAttribute("placeholder", "Add Task");
  addContent.appendChild(taskContent);

  // Create buttons (Add and Cancel)
  const addBtns = document.createElement("div");
  addBtns.classList.add("btns-add");
  addContent.appendChild(addBtns);

  const addBtn = document.createElement("button");
  addBtn.classList.add("addButton");
  addBtn.setAttribute("id", "addButton");
  addBtn.textContent = "Add";
  addBtns.appendChild(addBtn);

  const cancelAddBtn = document.createElement("button");
  cancelAddBtn.classList.add("cancelButton");
  cancelAddBtn.setAttribute("id", "cancelAddButton");
  cancelAddBtn.textContent = "Cancel";
  addBtns.appendChild(cancelAddBtn);

  const addInput = document.getElementById("addInput") as HTMLInputElement;

  // Add event listener for cancel button to hide the form
  cancelAddBtn.addEventListener("click", function () {
    addInput.value = "";
    addContiner.classList.add("hidden");
  });

  // Add event listener for add button to save the task and hide the form
  addBtn.addEventListener("click", function () {
    const taskText = addInput.value.trim();
    if (taskText) {
      const tasks = getData(); // Get current tasks from localStorage
      const newTask: Task = {
        id: tasks.length + 1,
        text: taskText,
        completed: false,
      };
      addInput.value = "";
      saveTodoData(newTask); // Save the new task to localStorage

      addContiner.classList.add("hidden");
      viewTodoList(); // Display the updated to-do list
    }
  });
}

// edit task UI
function editTaskUi(id: number): void {
  const editContiner = document.createElement("div");
  editContiner.classList.add("edit-task-cont");
  const container = document.querySelector(".container");
  container?.appendChild(editContiner);

  const editContent = document.createElement("div");
  editContent.classList.add("edit-content");
  editContiner.appendChild(editContent);

  const editTitle = document.createElement("h2");
  editTitle.textContent = "Edit Task";
  editContent.appendChild(editTitle);

  const taskContent = document.createElement("input");
  taskContent.setAttribute("type", "text");
  taskContent.setAttribute("id", "editInput");
  taskContent.setAttribute("placeholder", "Edit Task");
  editContent.appendChild(taskContent);

  const editBtns = document.createElement("div");
  editBtns.classList.add("btns-edit");
  editContent.appendChild(editBtns);

  const editBtn = document.createElement("button");
  editBtn.classList.add("editButton");
  editBtn.setAttribute("id", "editButton");
  editBtn.textContent = "Save";
  editBtns.appendChild(editBtn);

  const cancelEditBtn = document.createElement("button");
  cancelEditBtn.classList.add("cancelButton");
  cancelEditBtn.setAttribute("id", "cancelEditButton");
  cancelEditBtn.textContent = "Cancel";
  editBtns.appendChild(cancelEditBtn);

  cancelEditBtn.addEventListener("click", function () {
    editContiner.classList.add("hidden");
  });

  const task = getData().find((task) => task.id === id);
  if (task) {
    taskContent.value = task.text;
  }

  editBtn.addEventListener("click", function () {
    const taskText = taskContent.value.trim();
    editTask(id, taskText);
    editContiner.classList.add("hidden");
  });
}

// === Main UI Creation ===

// Create the main UI elements (Title, Search, and Add Task button)
function creatMainUi(): void {
  // Create the main title section
  const titleDive = document.createElement("div");
  titleDive.classList.add("main-title");

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "TO-DO LIST";

  titleDive.appendChild(title);
  document.body.appendChild(titleDive);

  // Create the main container to hold all content
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  // Create the search bar
  const search = document.createElement("div");
  search.classList.add("search");

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "Search");

  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "searchButton");
  searchButton.textContent = "Search";

  search.appendChild(searchInput);
  search.appendChild(searchButton);
  container.appendChild(search);

  // Create the Add Task button
  const addTask = document.createElement("div");
  addTask.classList.add("add-task");
  addTask.textContent = "+";
  addTask.setAttribute("id", "addTask");
  container.appendChild(addTask);

  // get data and check for empty list

  viewTodoList();
}

// === Task List Rendering ===

// Display the to-do list (tasks) in the UI
function viewTodoList(tasks?: Task[]): void {
  if (!tasks) {
    tasks = getData();
  }
  // Get the container to append the task list
  const container = document.querySelector(".container") as HTMLDivElement;

  // Clear the current task list to avoid duplicate rendering
  const existingList = container.querySelector(".to-do-lists");
  if (existingList) {
    existingList.remove();
  }

  // Create the container for the task list
  const addTaskCont = document.createElement("div");
  addTaskCont.classList.add("to-do-lists");

  // Create an unordered list to hold the tasks
  const lists = document.createElement("ul");
  lists.classList.add("lists");
  addTaskCont.appendChild(lists);

  // Append the new task list container
  container.appendChild(addTaskCont);

  if (tasks.length === 0) {
    notFoundUi();
  }

  // Loop through each task and create a list item
  tasks.forEach((task) => {
    const list = document.createElement("li");
    list.classList.add("list");

    // Create a checkbox for each task
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `list${task.id}`);
    checkbox.setAttribute("data-id", `${task.id}`);
    checkbox.classList.add("check-box");
    checkbox.checked = task.completed;

    // Create a label to display the task text
    const label = document.createElement("label");
    label.setAttribute("for", `list${task.id}`);
    label.textContent = task.text;

    // Create buttons for modifying (delete and edit) the task
    const modify = document.createElement("div");
    modify.classList.add("modify");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-id", `${task.id}`);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-id", `${task.id}`);

    // Append delete and edit buttons to the task
    modify.appendChild(deleteButton);
    modify.appendChild(editButton);

    // Append the checkbox, label, and modify buttons to the list item
    list.appendChild(checkbox);
    list.appendChild(label);
    list.appendChild(modify);
    lists.appendChild(list);
  });
}

// === main function ===
// complete task
function completeTask(taskId: number): void {
  const tasks = getData();
  const index = tasks.findIndex((task) => task.id === taskId);
  tasks[index].completed = !tasks[index].completed;
  save(tasks);
  viewTodoList();
}

// search task
function searchTask(searchTerm: string): void {
  const tasks = getData();
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  viewTodoList(filteredTasks);
}

// remove task
function removeTask(taskId: number): void {
  const tasks = getData();
  const updatedTasks: Task[] = tasks.filter((task) => task.id !== taskId);
  save(updatedTasks);
  viewTodoList();
}

// edit task
function editTask(id: number, text: string): void {
  const tasks = getData();
  const index = tasks.findIndex((task) => task.id === id);

  tasks[index].text = text;
  save(tasks);
  viewTodoList();
}

// === Initialize UI ===

// Initialize the main UI elements
creatMainUi();

// === Event Listeners ===

// Handle "Add Task" Button click to show the form or toggle its visibility
const addTaskBtn = document.querySelector("#addTask") as HTMLButtonElement;
addTaskBtn.addEventListener("click", function () {
  const addTaskContent = document.querySelector(".add-task-cont");

  // If the form exists, toggle its visibility (show/hide)
  if (addTaskContent) {
    addTaskContent.classList.toggle("hidden");
  } else {
    // If the form doesn't exist, create it and show it
    addTdoListUi();
  }
});

// Handle removing and editing and searching a task
const container = document.querySelector(".container") as HTMLDivElement;
container.addEventListener("click", function (event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains("delete")) {
    const taskId = Number(target.getAttribute("data-id"));
    removeTask(taskId);
  } else if (target.classList.contains("edit")) {
    const taskId = Number(target.getAttribute("data-id"));
    editTaskUi(taskId);
  } else if (target.id === "searchButton") {
    const searchInput = document.querySelector(
      "#searchInput"
    ) as HTMLButtonElement;
    const searchTerm = searchInput.value;
    searchTask(searchTerm);
  } else if (target.classList.contains("check-box")) {
    const taskId = Number(target.getAttribute("data-id"));
    completeTask(taskId);
  }
});
