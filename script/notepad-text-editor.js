const placeholder = notepadarea.getAttribute("data-placeholder");

function handleInput() {
  const content = notepadarea.innerHTML;
  if (content === "") {
    notepadarea.innerHTML = `<div class="placeholder">${placeholder}</div>`;
  } else if (content === placeholder) {
    notepadarea.innerHTML = "";
  }
}

function execCommandWithDefault(command, value = null) {
  document.execCommand(command, false, value);
  notepadarea.focus();
}

function makeBold() {
  execCommandWithDefault("bold");
}

function makeItalic() {
  execCommandWithDefault("italic");
}

function makeUnderline() {
  execCommandWithDefault("underline");
}

function addList() {
  execCommandWithDefault("insertUnorderedList");
}

function addCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  notepadarea.appendChild(checkbox);
  notepadarea.focus();
}

function changeFontSize(fontSize) {
  const selectedText = getSelectedText();
  if (selectedText) {
    const span = document.createElement("span");
    span.style.fontSize = fontSize;
    span.appendChild(selectedText.cloneContents());
    execCommandWithDefault("insertHTML", span.outerHTML);
  }
}

function getSelectedText() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    return range;
  }
  return null;
}

handleInput();
