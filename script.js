//Add Button
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);
function addToDoItem() {
  var itemText = toDoEntryBox.value;
  newToDoItem(itemText, false);
}
// Clear Button
var clearCompleted = document.getElementById("clear-completed-button");
clearCompleted.addEventListener("click", clearCompletedToDoItems);
function clearCompletedToDoItems() {
  var completedItems = toDoList.getElementsByClassName("completed");

  while (completedItems.length > 0) {
      completedItems.item(0).remove();
    }
}
// Empty List
var emptyListof = document.getElementById("empty-button");
emptyListof.addEventListener("click", emptyList);
function emptyList() {
  var toDoItems = toDoList.children;
  while (toDoItems.length > 0) {
      toDoItems.item(0).remove();
    }
}
//Save List
var saveListof = document.getElementById("save-button");
saveListof.addEventListener("click", saveList);
function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}
//Entry Box
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");
function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}
function loadList() {
    if (localStorage.getItem("toDos") !== null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList();
setInterval(saveList(), 1000);
