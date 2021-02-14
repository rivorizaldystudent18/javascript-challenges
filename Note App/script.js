const addButton = document.querySelector(".add-button");
const addContainer = document.querySelector(".add-container");
const body = document.getElementsByTagName("body");

if (localStorage.getItem("number") === null) {
  localStorage.setItem("number", 0);
}

if (localStorage.getItem("content") === null) {
  localStorage.setItem("content", JSON.stringify([]));
}

addButton.addEventListener("click", () => {
  addNoteElement();
  localStorage.setItem("number", parseInt(localStorage.getItem("number")) + 1);
  noteOperation();
});

function noteOperation() {
  const notes = document.querySelectorAll(".note-container");

  notes.forEach((el) => {
    const textArea = el.querySelector(".note-input");
    const saveButton = el.querySelector(".save");
    const cancelButton = el.querySelector(".close");
    const editButton = el.querySelector(".edit");
    const deleteButton = el.querySelector(".delete");
    const id = el.getAttribute("data-id");

    textArea.focus();

    const buttonObj = {
      id,
      saveButton,
      editButton,
      cancelButton,
      deleteButton,
      textArea,
      el,
    };

    // save note
    saveButton.addEventListener("click", () =>
      buttonOperation(buttonObj, "save")
    );

    // cancel note
    cancelButton.addEventListener("click", () =>
      buttonOperation(buttonObj, "cancel")
    );

    // edit note
    editButton.addEventListener("click", () =>
      buttonOperation(buttonObj, "edit")
    );

    // remove note from element
    deleteButton.addEventListener("click", () =>
      buttonOperation(buttonObj, "delete")
    );
  });
}

function buttonOperation(buttonObj, type) {
  const {
    id,
    saveButton,
    editButton,
    cancelButton,
    deleteButton,
    textArea,
    el,
  } = buttonObj;

  switch (type) {
    case "save":
      saveNote(id, textArea);
      buttonVisibility(cancelButton, saveButton, "hide");
      buttonVisibility(editButton, deleteButton, "show");
      break;
    case "edit":
      editNote(id, textArea);
      buttonVisibility(cancelButton, saveButton, "show");
      buttonVisibility(editButton, deleteButton, "hide");
      break;
    case "cancel":
      cancelNote(id, textArea);
      buttonVisibility(cancelButton, saveButton, "hide");
      buttonVisibility(editButton, deleteButton, "show");
      break;
    case "delete":
      deleteNote(id, el);
      break;

    default:
      break;
  }
}

function saveNote(id, textArea) {
  const content = document.querySelector(".note-content-" + id);
  content.classList.remove("hide");
  // attach content to div
  content.innerHTML = marked(textArea.value);

  // set to localstorage
  const obj = {
    id,
    value: textArea.value,
  };

  let data = JSON.parse(localStorage.getItem("content"));
  const filteredData = data.filter((el) => el.id === id);
  const objectIndex = data.findIndex((el) => el.id === id);

  if (filteredData.length <= 0) {
    data.push(obj);
    localStorage.setItem("content", JSON.stringify(data));
  } else {
    data[objectIndex] = obj;
    localStorage.setItem("content", JSON.stringify(data));
  }

  // hide textarea
  textArea.classList.add("hide");
}

function editNote(id, textArea) {
  const content = document.querySelector(".note-content-" + id);
  content.classList.add("hide");

  const data = JSON.parse(localStorage.getItem("content"));
  const filteredData = data.filter((el) => el.id === id);
  const { value } = filteredData[0];

  textArea.classList.remove("hide");
  textArea.value = value;
  textArea.focus();
}

function cancelNote(id, textArea) {
  const content = document.querySelector(".note-content-" + id);
  content.classList.remove("hide");
  textArea.classList.add("hide");
}

function deleteNote(id, element) {
  const data = JSON.parse(localStorage.getItem("content"));
  const filteredData = data.filter((el) => el.id !== id);

  localStorage.setItem("content", JSON.stringify(filteredData));

  element.remove();
}

function buttonVisibility(element1, element2, type) {
  switch (type) {
    case "show":
      element1.classList.remove("hide");
      element2.classList.remove("hide");
      break;
    case "hide":
      element1.classList.add("hide");
      element2.classList.add("hide");
      break;

    default:
      break;
  }
}

function addNoteElement() {
  const div = document.createElement("div");
  div.classList.add("note-container");
  div.classList.add("div-" + localStorage.getItem("number"));
  div.setAttribute("data-id", localStorage.getItem("number"));
  div.innerHTML = `
  <div class="note-header">
    <i class="far fa-save save"></i>
    <i class="fas fa-times close"></i>
    <i class="far fa-edit edit hide"></i>
    <i class="far fa-trash-alt delete hide"></i>
  </div>
    <div class="note-content-${localStorage.getItem(
      "number"
    )} hide content"></div>
    <textarea class="note-input" rows="10"></textarea>
    `;

  addContainer.parentNode.insertBefore(div, addContainer);
}
