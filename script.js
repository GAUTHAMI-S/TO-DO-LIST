function initializeTodoList() {
  const tasks = getTaskFromLocalStorage();
  tasks.forEach((task) => {
    console.log("1", task);
    addTasktoDom(task);
  });
}
function getTaskFromLocalStorage() {
  const tasksString = localStorage.getItem("tasks");
  console.log(tasksString);
  return tasksString ? JSON.parse(tasksString) : [];
}
function updateLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTasktoDom(task) {
  const taskList = document.getElementById("taskList");
  const taskItem = document.createElement("div");
  taskItem.innerHTML = `<div class='text'>
  <p >${task.text}</p>
        <button onClick='completeTask(this)' class='btn'><i class="fas fa-check"></i></button>
        <button onClick='deleteTask(this)'  class='btn'><i class="fas fa-trash"></i></button>
        </div>`;

  if (task.completed) taskItem.classList.add("completed");
  taskList.appendChild(taskItem);
}

// function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = { text: taskText, completed: false };
    addTasktoDom(newTask);

    // Retrieve existing tasks from local storage
    const tasks = getTaskFromLocalStorage();

    // Add new task
    tasks.push(newTask);

    // update the local task array
    updateLocalStorage(tasks);

    //clear the input field
    taskInput.value = "";
  }
}
function completeTask(button) {
  const taskItem = button.parentElement;
  taskItem.classList.toggle("completed");
  const tasks = getTaskFromLocalStorage();
  const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage(tasks);
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  const tasks = getTaskFromLocalStorage();
  const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
  tasks.splice(index, 1);
  updateLocalStorage(tasks);
  taskItem.remove();
}

initializeTodoList();
