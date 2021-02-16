const todoInput = document.getElementById("todo");
const itemFilter = document.getElementById("item-filter");
const informationText = document.getElementById("information-text");
const allButton = document.getElementById("all");
const activeButton = document.getElementById("active");
const completedButton = document.getElementById("completed");

if (localStorage.getItem("todoId") === null) {
  localStorage.setItem("todoId", 1);
}

if (localStorage.getItem("statusFilter") === null) {
  localStorage.setItem("statusFilter", "All");
}

if (localStorage.getItem("todo") === null) {
  localStorage.setItem("todo", JSON.stringify([]));
}

loadData();

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    insertTodoElement(e.target.value);
    insertTodoData(e.target.value);
    todoInput.value = "";

    localStorage.setItem(
      "todoId",
      parseInt(localStorage.getItem("todoId")) + 1
    );
    const todoListTotal = JSON.parse(localStorage.getItem("todo"));

    updateItemTotal(getFilteredTodo(todoListTotal, "todo"));

    attachFunctionality();
  }
});

allButton.addEventListener("click", filterElement);
activeButton.addEventListener("click", filterElement);
completedButton.addEventListener("click", filterElement);

function attachFunctionality() {
  const listItem = document.querySelectorAll(".todo-item-container");
  listItem.forEach((el) => {
    const id = el.getAttribute("data-list");
    const deleteButton = el.querySelector(".item-delete");
    const checkBox = el.querySelector(".checkbox");
    const todoContent = el.querySelector(".todo-content");
    const editContent = el.querySelector("#item-edit-" + id);
    const todoItem = el.querySelector(".todo-item");

    el.addEventListener("dblclick", () => {
      todoItem.classList.add("hide");
      editContent.classList.remove("hide");
      editContent.focus();
      editContent.value = todoContent.textContent;

      editContent.addEventListener("blur", () => {
        todoItem.classList.remove("hide");
        editContent.classList.add("hide");
      });

      editContent.addEventListener("keypress", (e) => {
        console.log("masuk", e.key);
        if (e.key === "Enter") {
          if (e.target.value === "") {
            todoItem.classList.remove("hide");
            editContent.classList.add("hide");
          }
          todoContent.textContent = e.target.value;
          updateTodoActivity(id, e.target.value);
          todoItem.classList.remove("hide");
          editContent.classList.add("hide");
        }
      });
    });

    el.addEventListener("mouseover", () => {
      deleteButton.classList.remove("hide");
    });

    el.addEventListener("mouseleave", () => {
      deleteButton.classList.add("hide");
    });

    checkBox.addEventListener("click", () => {
      if (checkBox.checked) {
        todoContent.classList.add("strikethrough");
        el.setAttribute("data-status", "finish");
        updateTodoStatus(id, "finish");
      } else {
        todoContent.classList.remove("strikethrough");
        updateTodoStatus(id, "todo");
        el.setAttribute("data-status", "todo");
      }
    });

    deleteButton.addEventListener("click", () => {
      deleteTodoData(id);
      deleteTodoElement(el);
      showItemFilter();
    });
  });

  showItemFilter();
}

function loadData() {
  const todoListTotal = JSON.parse(localStorage.getItem("todo"));
  const todoFilterStatus =
    localStorage.getItem("statusFilter") === "All"
      ? "All"
      : localStorage.getItem("statusFilter") === "Active"
      ? "todo"
      : "finish";

  let element = "";

  if (todoListTotal.length > 0) {
    todoListTotal.forEach((el) => {
      element += generateTodoElementList(
        el,
        "firstInitialize",
        todoFilterStatus
      );
    });
    updateItemTotal(getFilteredTodo(todoListTotal, "todo"));
    attachFunctionality();
    getActiveButton();
  }
}

function getActiveButton() {
  const statusFilter = localStorage.getItem("statusFilter");

  switch (statusFilter) {
    case "All":
      allButton.classList.add("active");
      activeButton.classList.remove("active");
      completedButton.classList.remove("active");
      break;
    case "Active":
      allButton.classList.remove("active");
      activeButton.classList.add("active");
      completedButton.classList.remove("active");
      break;
    case "Completed":
      allButton.classList.remove("active");
      activeButton.classList.remove("active");
      completedButton.classList.add("active");
      break;

    default:
      break;
  }
}

function generateTodoElementList(value, when = "", activeFilterStatus = "") {
  const todoItem = document.getElementById("todo-list");
  let listItemContainer = document.createElement("div");
  listItemContainer.classList.add("todo-item-container");

  if (when === "firstInitialize") {
    if (value.status !== activeFilterStatus && activeFilterStatus !== "All") {
      listItemContainer.classList.add("hide");
    } else if (
      value.status !== activeFilterStatus &&
      activeFilterStatus !== "All"
    ) {
      listItemContainer.classList.add("hide");
    }
  } else {
    if (localStorage.getItem("statusFilter") === "Completed") {
      listItemContainer.classList.add("hide");
    }
  }

  listItemContainer.setAttribute("data-list", value.id);
  listItemContainer.setAttribute("data-status", value.status);

  listItemContainer.innerHTML = `
    <li class="todo-item" data-list=${value.id}>
    <div class="item-container">
    <input type="checkbox" class="checkbox" id="list-${value.id}" ${
    value.status === "finish" ? "checked" : ""
  }/>
        <label class="todo-content ${
          value.status === "finish" ? "strikethrough" : ""
        }">${value.activity}</label>
        </div>
        <div class="item-delete hide">
        <i class="fas fa-times delete"></i>
        </div>
        </li>
        <li data-edit=${value.id}>
        <input type="text" id="item-edit-${value.id}" class="item-edit hide" />
            </li>   
            `;
  todoItem.append(listItemContainer);

  return todoItem.innerHTML;
}

function filterElement(event) {
  const listItem = document.querySelectorAll(".todo-item-container");

  listItem.forEach((el) => {
    const status = el.getAttribute("data-status");

    switch (event.target.textContent) {
      case "All":
        el.classList.remove("hide");
        localStorage.setItem("statusFilter", "All");
        allButton.classList.add("active");
        activeButton.classList.remove("active");
        completedButton.classList.remove("active");
        break;
      case "Active":
        status === "todo"
          ? el.classList.remove("hide")
          : el.classList.add("hide");
        localStorage.setItem("statusFilter", "Active");
        allButton.classList.remove("active");
        activeButton.classList.add("active");
        completedButton.classList.remove("active");
        break;
      case "Completed":
        status === "finish"
          ? el.classList.remove("hide")
          : el.classList.add("hide");
        localStorage.setItem("statusFilter", "Completed");
        allButton.classList.remove("active");
        activeButton.classList.remove("active");
        completedButton.classList.add("active");
        break;
      default:
        break;
    }
  });
}

function getFilteredTodo(todoList, status) {
  if (status === "All") {
    return todoList;
  }
  const filteredData = todoList.filter((el) => el.status === status);
  return filteredData;
}

function updateItemTotal(todoList) {
  itemFilter.classList.remove("hide");
  informationText.innerHTML = `${todoList.length} ${
    todoList.length > 1 ? "items" : "item"
  } left`;
}

function showItemFilter() {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  console.log("masuk", todoList);
  if (todoList.length <= 0) {
    itemFilter.classList.add("hide");
  } else {
    itemFilter.classList.remove("hide");
  }
}

function updateTodoStatus(id, status) {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  const getIndex = todoList.findIndex((el) => el.id === id);
  switch (status) {
    case "todo":
      todoList[getIndex].status = "todo";

      localStorage.setItem("todo", JSON.stringify(todoList));
      updateItemTotal(
        getFilteredTodo(JSON.parse(localStorage.getItem("todo")), "todo")
      );
      break;
    case "finish":
      todoList[getIndex].status = "finish";

      localStorage.setItem("todo", JSON.stringify(todoList));
      updateItemTotal(
        getFilteredTodo(JSON.parse(localStorage.getItem("todo")), "todo")
      );
      break;
    default:
      break;
  }
}

function updateTodoActivity(id, value) {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  const getIndex = todoList.findIndex((el) => el.id === id);

  todoList[getIndex].activity = value;

  localStorage.setItem("todo", JSON.stringify(todoList));
}

function insertTodoData(value) {
  const dataTodo = {
    id: localStorage.getItem("todoId"),
    activity: value,
    status: "todo", //default todo
  };

  const todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.push(dataTodo);

  //   const filteredTodoList = JSON.parse(localStorage.getItem("filteredTodo"));
  //   filteredTodoList.push(dataTodo);

  //   localStorage.setItem("filteredTodo", JSON.stringify(filteredTodoList));
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function insertTodoElement(value) {
  const todoItem = document.getElementById("todo-list");

  let listItemContainer = document.createElement("div");
  listItemContainer.classList.add("todo-item-container");

  if (localStorage.getItem("statusFilter") === "Completed") {
    listItemContainer.classList.add("hide");
  }
  listItemContainer.setAttribute("data-list", localStorage.getItem("todoId"));
  listItemContainer.setAttribute("data-status", "todo");

  listItemContainer.innerHTML = `
    <li class="todo-item" data-list=${localStorage.getItem("todoId")}>
    <div class="item-container">
    <input type="checkbox" class="checkbox" id="list-${localStorage.getItem(
      "todoId"
    )}" />
        <label class="todo-content">${value}</label>
        </div>
        <div class="item-delete hide">
        <i class="fas fa-times delete"></i>
        </div>
        </li>
        <li data-edit=${localStorage.getItem("todoId")}>
        <input type="text" id="item-edit-${localStorage.getItem(
          "todoId"
        )}" class="item-edit hide" />
            </li>   
            `;
  todoItem.append(listItemContainer);
}

function deleteTodoData(id) {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  const filteredData = todoList.filter((el) => el.id !== id);

  localStorage.setItem("todo", JSON.stringify(filteredData));
}

function deleteTodoElement(listItem) {
  listItem.remove();
}
