const textarea = document.getElementById("notepadarea");
const saveButton = document.getElementById("savenotesbtn");
const loaderContainer = document.querySelector(".loader-container");
const loader = document.querySelector(".loader");
const textSpan = document.querySelector("#savenotesbtn span");

window.addEventListener("load", function () {
  const savedNote = localStorage.getItem("notepadNote");
  if (savedNote) {
    textarea.value = savedNote;
  }
});

saveButton.addEventListener("click", function () {
  const noteContent = textarea.value;

  loaderContainer.style.backgroundColor = "green";
  saveButton.style.backgroundColor = "green";

  loader.style.display = "block";
  textSpan.style.display = "none";

  setTimeout(function () {
    localStorage.setItem("notepadNote", noteContent);

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
