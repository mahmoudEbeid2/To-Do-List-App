// === Functions to handle localStorage ===
// Get data from localStorage
function getData() {
    var storgeData = localStorage.getItem("toDoLists");
    var data = storgeData ? JSON.parse(storgeData) : [];
    return data;
}
// Save task to localStorage
function saveTodoData(task) {
    var storgeData = localStorage.getItem("toDoLists");
    var data = storgeData ? JSON.parse(storgeData) : [];
    // Add the new task to the array
    data.unshift(task);
    localStorage.setItem("toDoLists", JSON.stringify(data));
}
// save tasks to localStorage
function save(tasks) {
    localStorage.setItem("toDoLists", JSON.stringify(tasks));
}
// === UI Functions ===
// Add To-Do list UI
function addTdoListUi() {
    // Create the container for the "Add Task" form
    var addContiner = document.createElement("div");
    addContiner.classList.add("add-task-cont");
    var container = document.querySelector(".container");
    container === null || container === void 0 ? void 0 : container.appendChild(addContiner);
    // Create the content area inside the "Add Task" form
    var addContent = document.createElement("div");
    addContent.classList.add("add-content");
    addContiner.appendChild(addContent);
    // Add title to the form
    var addTitle = document.createElement("h2");
    addTitle.textContent = "Add Task";
    addContent.appendChild(addTitle);
    // Create the input field for entering the task text
    var taskContent = document.createElement("input");
    taskContent.setAttribute("type", "text");
    taskContent.setAttribute("id", "addInput");
    taskContent.setAttribute("placeholder", "Add Task");
    addContent.appendChild(taskContent);
    // Create buttons (Add and Cancel)
    var addBtns = document.createElement("div");
    addBtns.classList.add("btns-add");
    addContent.appendChild(addBtns);
    var addBtn = document.createElement("button");
    addBtn.classList.add("addButton");
    addBtn.setAttribute("id", "addButton");
    addBtn.textContent = "Add";
    addBtns.appendChild(addBtn);
    var cancelAddBtn = document.createElement("button");
    cancelAddBtn.classList.add("cancelButton");
    cancelAddBtn.setAttribute("id", "cancelAddButton");
    cancelAddBtn.textContent = "Cancel";
    addBtns.appendChild(cancelAddBtn);
    var addInput = document.getElementById("addInput");
    // Add event listener for cancel button to hide the form
    cancelAddBtn.addEventListener("click", function () {
        addInput.value = "";
        addContiner.classList.add("hidden");
    });
    // Add event listener for add button to save the task and hide the form
    addBtn.addEventListener("click", function () {
        var taskText = addInput.value.trim();
        if (taskText) {
            var tasks = getData(); // Get current tasks from localStorage
            var newTask = {
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
function editTaskUi(id) {
    var editContiner = document.createElement("div");
    editContiner.classList.add("edit-task-cont");
    var container = document.querySelector(".container");
    container === null || container === void 0 ? void 0 : container.appendChild(editContiner);
    var editContent = document.createElement("div");
    editContent.classList.add("edit-content");
    editContiner.appendChild(editContent);
    var editTitle = document.createElement("h2");
    editTitle.textContent = "Edit Task";
    editContent.appendChild(editTitle);
    var taskContent = document.createElement("input");
    taskContent.setAttribute("type", "text");
    taskContent.setAttribute("id", "editInput");
    taskContent.setAttribute("placeholder", "Edit Task");
    editContent.appendChild(taskContent);
    var editBtns = document.createElement("div");
    editBtns.classList.add("btns-edit");
    editContent.appendChild(editBtns);
    var editBtn = document.createElement("button");
    editBtn.classList.add("editButton");
    editBtn.setAttribute("id", "editButton");
    editBtn.textContent = "Edit";
    editBtns.appendChild(editBtn);
    var cancelEditBtn = document.createElement("button");
    cancelEditBtn.classList.add("cancelButton");
    cancelEditBtn.setAttribute("id", "cancelEditButton");
    cancelEditBtn.textContent = "Cancel";
    editBtns.appendChild(cancelEditBtn);
    cancelEditBtn.addEventListener("click", function () {
        editContiner.classList.add("hidden");
    });
    var task = getData().find(function (task) { return task.id === id; });
    if (task) {
        taskContent.value = task.text;
    }
    editBtn.addEventListener("click", function () {
        var taskText = taskContent.value.trim();
        editTask(id, taskText);
        editContiner.classList.add("hidden");
    });
}
// === Main UI Creation ===
// Create the main UI elements (Title, Search, and Add Task button)
function creatMainUi() {
    // Create the main title section
    var titleDive = document.createElement("div");
    titleDive.classList.add("main-title");
    var title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "TO-DO LIST";
    titleDive.appendChild(title);
    document.body.appendChild(titleDive);
    // Create the main container to hold all content
    var container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);
    // Create the search bar
    var search = document.createElement("div");
    search.classList.add("search");
    var searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "searchInput");
    searchInput.setAttribute("placeholder", "Search");
    var searchButton = document.createElement("button");
    searchButton.setAttribute("id", "searchButton");
    searchButton.textContent = "Search";
    search.appendChild(searchInput);
    search.appendChild(searchButton);
    container.appendChild(search);
    // Create the Add Task button
    var addTask = document.createElement("div");
    addTask.classList.add("add-task");
    addTask.textContent = "+";
    addTask.setAttribute("id", "addTask");
    container.appendChild(addTask);
    viewTodoList();
}
// === Task List Rendering ===
// Display the to-do list (tasks) in the UI
function viewTodoList() {
    var tasks = getData();
    // Get the container to append the task list
    var container = document.querySelector(".container");
    // Clear the current task list to avoid duplicate rendering
    var existingList = container.querySelector(".to-do-lists");
    if (existingList) {
        existingList.remove();
    }
    // Create the container for the task list
    var addTaskCont = document.createElement("div");
    addTaskCont.classList.add("to-do-lists");
    // Create an unordered list to hold the tasks
    var lists = document.createElement("ul");
    lists.classList.add("lists");
    addTaskCont.appendChild(lists);
    // Append the new task list container
    container.appendChild(addTaskCont);
    // Loop through each task and create a list item
    tasks.forEach(function (task) {
        var list = document.createElement("li");
        list.classList.add("list");
        // Create a checkbox for each task
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "list".concat(task.id));
        checkbox.setAttribute("data-id", "".concat(task.id));
        checkbox.classList.add("check-box");
        checkbox.checked = task.completed;
        // Create a label to display the task text
        var label = document.createElement("label");
        label.setAttribute("for", "list".concat(task.id));
        label.textContent = task.text;
        // Create buttons for modifying (delete and edit) the task
        var modify = document.createElement("div");
        modify.classList.add("modify");
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", "".concat(task.id));
        var editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        editButton.setAttribute("data-id", "".concat(task.id));
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
// remove task
function removeTask(taskId) {
    var tasks = getData();
    var updatedTasks = tasks.filter(function (task) { return task.id !== taskId; });
    save(updatedTasks);
    viewTodoList();
}
// edit task
function editTask(id, text) {
    var tasks = getData();
    // const index = tasks.findIndex((task) => task.id === id);
    var index = -1;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            index = i;
            break;
        }
    }
    tasks[index].text = text;
    save(tasks);
    viewTodoList();
}
// === Initialize UI ===
// Initialize the main UI elements
creatMainUi();
// === Event Listeners ===
// Handle "Add Task" Button click to show the form or toggle its visibility
var addTaskBtn = document.querySelector("#addTask");
addTaskBtn.addEventListener("click", function () {
    var addTaskContent = document.querySelector(".add-task-cont");
    // If the form exists, toggle its visibility (show/hide)
    if (addTaskContent) {
        addTaskContent.classList.toggle("hidden");
    }
    else {
        // If the form doesn't exist, create it and show it
        addTdoListUi();
    }
});
// Handle removing a task
var container = document.querySelector(".container");
container.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("delete")) {
        var taskId = Number(target.getAttribute("data-id"));
        removeTask(taskId);
    }
    else if (target.classList.contains("edit")) {
        var taskId = Number(target.getAttribute("data-id"));
        editTaskUi(taskId);
    }
});
