// find the parts of the page I need
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

// all the notes live in this array
let notes = [];

// turns "personal" into "Personal"
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// writes the "You have..." message
function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
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

  updateCount();
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

// removes the note with this id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = noteInput.value.trim();

  // check the note before adding it
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = ""; 
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

// one listener on the list hears every Delete button
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteNote(Number(event.target.dataset.id));
  }
});

render();