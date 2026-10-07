// find the parts of the page I need
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

// the name I save my notes under in the browser
const STORAGE_KEY = "quicknotes";

// all the notes live in this array (loaded from the browser)
let notes = loadNotes();

// gets the saved notes, or an empty list if there are none
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

// saves the notes in the browser
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

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

// draws the notes on the page
function render() {
  list.replaceChildren(); // empty the list first

  // only keep the notes that match the search (ignoring upper/lower case)
  const searchWord = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchWord)
  );

  // there are notes, but none match the search
  if (visibleNotes.length === 0 && notes.length > 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "No notes match your search.";
    list.appendChild(message);
  }

  visibleNotes.forEach((note) => {
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

// makes a new note, saves it and shows it
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  saveNotes();
  render();
}

// removes the note with this id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
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

  errorMessage.textContent = ""; // all good, so clear the error
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

// search as the user types
searchInput.addEventListener("input", render);

render();