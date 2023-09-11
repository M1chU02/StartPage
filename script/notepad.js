const textarea = document.getElementById("notepadarea");
const saveButton = document.getElementById("savenotesbtn");
const loaderContainer = document.querySelector(".loader-container");
const loader = document.querySelector(".loader");
const textSpan = document.querySelector("#savenotesbtn span");

const noteList = document.getElementById("note-list");
const addNoteBtn = document.getElementById("add-note-btn");

const notes = JSON.parse(localStorage.getItem("notepadNotes")) || [];
let currentNoteIndex = -1;
let isCreatingNote = false;

function saveNotes() {
  localStorage.setItem("notepadNotes", JSON.stringify(notes));
}

function switchNote(index) {
  if (currentNoteIndex !== index) {
    saveCurrentNote();
    currentNoteIndex = index;
    textarea.innerHTML = notes[index].content;
    updateNoteList();
  }
}

function saveCurrentNote() {
  if (currentNoteIndex !== -1) {
    notes[currentNoteIndex].content = textarea.innerHTML;
    saveNotes();
  }
}

function renameNote(index, newName) {
  notes[index].title = newName;
  saveNotes();
  updateNoteList();
}

function deleteNote(index) {
  if (notes.length <= 1) {
    alert("You cannot delete the last note.");
    return;
  }

  notes.splice(index, 1);
  saveNotes();
  if (currentNoteIndex === index) {
    switchNote(0);
  } else {
    updateNoteList();
  }
}

function addNote() {
  if (notes.length >= 10) {
    alert("You have reached the maximum limit of 10 notes.");
    return;
  }

  if (isCreatingNote) {
    return;
  }

  isCreatingNote = true;

  saveCurrentNote();
  const newNote = { title: `Note ${notes.length + 1}`, content: "" };
  notes.push(newNote);
  saveNotes();
  updateNoteList();
  switchNote(notes.length - 1);

  setTimeout(function () {
    isCreatingNote = false;
  }, 1000);
}

function loadDefaultNote() {
  if (notes.length === 0) {
    const defaultNote = { title: "Note 1", content: "Make a note..." };
    notes.push(defaultNote);
    saveNotes();
  }
}

function updateNoteList() {
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const noteTitle = note.title || "Untitled Note";
    const buttonBackgroundColor =
      currentNoteIndex === index ? "#007bff" : "#333";
    const noteItem = document.createElement("div");
    noteItem.innerHTML = `
      <button class="switchnote" onclick="switchNote(${index})" style="background-color: ${buttonBackgroundColor}">${noteTitle} <button class="settingsbtn" onclick="showNoteSettings(${index})">
      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
      </svg>
      </button></button>
    `;
    noteList.appendChild(noteItem);
  });
}

function showNoteSettings(index) {
  const currentTitle = notes[index].title;

  const settingsModal = document.createElement("div");
  settingsModal.innerHTML = `
    <div id="note-settings-modal" style="display: none;">
      <div id="note-settings-form-container">
        <button id="note-settings-close-button">&times;</button>
        <form id="note-settings-form">
          <label for="new-note-title">New Note Title:</label>
          <input type="text" id="new-note-title" placeholder="Enter New Title" value="${currentTitle}" required autocomplete="off" />

          <button type="submit" id="rename-note">Rename</button>

          <button id="delete-note" style="display: flex;">
          <span class="text">Delete</span>
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
        </form>
      </div>
    </div>
  `;

  noteList.appendChild(settingsModal);
  const noteSettingsModal = document.getElementById("note-settings-modal");
  noteSettingsModal.style.display = "flex";

  const noteSettingsCloseButton = document.getElementById(
    "note-settings-close-button"
  );
  noteSettingsCloseButton.addEventListener("click", () => {
    noteSettingsModal.style.display = "none";
    renderNoteList();
  });

  const renameNoteButton = document.getElementById("rename-note");
  renameNoteButton.addEventListener("click", function (e) {
    e.preventDefault();
    const newNoteTitle = document.getElementById("new-note-title").value;
    renameNote(index, newNoteTitle);
    noteSettingsModal.style.display = "none";
    renderNoteList();
  });

  const deleteNoteButton = document.getElementById("delete-note");
  deleteNoteButton.addEventListener("click", function () {
    const confirmation = confirm("Are you sure you want to delete this note?");
    if (confirmation) {
      deleteNote(index);
      noteSettingsModal.style.display = "none";
      renderNoteList();
    }
  });

  document
    .getElementById("note-settings-modal")
    .addEventListener("click", function (e) {
      if (e.target === document.getElementById("note-settings-modal")) {
        document.getElementById("note-settings-modal").style.display = "none";
      }
    });
}

function initializeNotepad() {
  loadDefaultNote();
  updateNoteList();
  switchNote(0);
}

window.addEventListener("load", initializeNotepad);
saveButton.addEventListener("click", function () {
  saveCurrentNote();

  loaderContainer.style.backgroundColor = "green";
  saveButton.style.backgroundColor = "green";

  loader.style.display = "block";
  textSpan.style.display = "none";

  setTimeout(function () {
    loader.style.display = "none";
    textSpan.style.display = "block";
    textSpan.textContent = "Saved!";

    setTimeout(function () {
      textSpan.textContent = "Save notes";
      loaderContainer.style.backgroundColor = "";
      saveButton.style.backgroundColor = "";
    }, 1000);
  }, 1500);
});

addNoteBtn.addEventListener("click", addNote);
