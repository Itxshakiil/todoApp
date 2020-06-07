import { TaskManager } from "./classes/TaskManager.js";
import { Task } from "./classes/Task.js";
import { ListTemplate } from "./classes/ListTemplate.js";
const ul = document.querySelector("#tasks-list");
const addForm = document.forms[1];
const search = document.querySelector("#search");
const clearButton = document.querySelector("button#clearCompleted");
const markAsCompletedButton = document.querySelector("button#markAsCompleted");
const taskManager = new TaskManager();
const listRenderer = new ListTemplate(ul);
addForm.addEventListener("submit", event => {
    event.preventDefault();
    let input = addForm.querySelector("input");
    let value = input.value;
    if (value == "") {
        alert("Please Enter Text");
    }
    else {
        let tasks = taskManager.addTask(new Task(value));
        renderTask(tasks);
        input.value = "";
    }
});
ul.addEventListener("click", event => {
    let target = event.target;
    if (target.tagName.toUpperCase() === "INPUT") {
        let checkbox = target;
        let div = checkbox.parentNode;
        let list = div.parentNode;
        let index = parseInt(list.dataset.arrayIndex);
        if (checkbox.checked) {
            taskManager.toggleTaskStatus(index);
            list.classList.add("completed");
        }
        else {
            taskManager.toggleTaskStatus(index);
            list.classList.remove("completed");
        }
    }
    ;
    if (target.classList.contains("del-btn")) {
        if (confirm("Are you sure to Delete?")) {
            let delBtnDiv = target.parentNode;
            let list = delBtnDiv.parentNode;
            let index = parseInt(list.dataset.arrayIndex);
            let tasks = taskManager.removeTask(index);
            renderTask(tasks);
        }
    }
});
search.addEventListener("keyup", event => {
    let inputBox = event.target;
    let searchValue = inputBox.value.toLowerCase();
    let lists = document.getElementsByTagName("li");
    Array.from(lists).forEach(item => {
        let taskContainer = item.firstChild;
        let task = taskContainer.textContent;
        if (task.toLowerCase().indexOf(searchValue) != -1) {
            item.classList.remove("hidden");
        }
        else {
            item.classList.add("hidden");
        }
    });
});
markAsCompletedButton.addEventListener("click", event => {
    let tasks = taskManager.markAllAsCompleted();
    renderTask(tasks);
});
clearButton.addEventListener("click", event => {
    let tasks = taskManager.clearCompleted();
    renderTask(tasks);
});
function renderTask(tasks) {
    const length = tasks.length;
    listRenderer.clear();
    if (length) {
        tasks.forEach((task, index) => {
            listRenderer.render(task, index.toString());
        });
    }
    else {
        ul.innerHTML = '<strong class="todo-item">No Task Found.</strong>';
    }
    if (length > 1000) {
        alert("Hey User , You can Delete unnecessary Todos for smooth use.");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    renderTask(taskManager.getTodos());
});
