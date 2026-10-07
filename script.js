// find the parts of the page I need
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// all the notes live in this array
let notes = [];

// turns "personal" into "Personal"
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// draws every note on the page
function render() {
  list.replaceChildren(); // empty the list first

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-card", `category-${note.category}`);

    const info = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const label = document.createElement("span");
    label.classList.add("category-label");
    label.textContent = capitalise(note.category);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = note.id;

    meta.appendChild(label);
    meta.appendChild(date);
    info.appendChild(text);
    info.appendChild(meta);
    li.appendChild(info);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// makes a new note and adds it to the array
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  render();
}

// when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = noteInput.value.trim();

  if (text === "") {
    return;
  }

  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

render();