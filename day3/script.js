// Day 3: Notes Toolkit

// starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// the only categories a note is allowed to have
const validCategories = ["personal", "work", "study"];

// makes text easy to compare: lower case, no spaces at the ends,
// and only one space between words
function cleanText(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

// returns every note whose text contains the word, ignoring case
function searchNotes(word) {
  const search = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(search));
}

// returns the note with the most characters, or null if there are no notes
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// counts how many notes are in each category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }
  return counts;
}

// builds a sentence like "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  // "note" for exactly one, "notes" for everything else
  let word = "notes";
  if (total === 1) {
    word = "note";
  }

  // a category with no notes is undefined, so fall back to 0
  const personal = counts.personal || 0;
  const work = counts.work || 0;
  const study = counts.study || 0;

  return `${total} ${word}: ${personal} personal, ${work} work, ${study} study.`;
}

// true if a note with the same text already exists
function isDuplicate(text) {
  const clean = cleanText(text);
  return notes.some((note) => cleanText(note.text) === clean);
}

// adds a note if it passes every check, and says why if it does not
function addNote(text, category) {
  const cleaned = text.trim();

  if (cleaned.length < 1 || cleaned.length > 200) {
    console.log("Rejected: a note must be 1-200 characters.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log(`Rejected: "${category}" is not a valid category.`);
    return false;
  }

  if (isDuplicate(cleaned)) {
    console.log(`Rejected: "${cleaned}" already exists.`);
    return false;
  }

  notes.push({
    id: Date.now(),
    text: cleaned,
    category: category,
  });
  console.log(`Added: "${cleaned}" (${category})`);
  return true;
}

// ---------------- tests ----------------

// I keep the real data here so I can empty the notes for some tests
// and then put everything back
const originalNotes = notes;

// searchNotes
console.log(searchNotes("MILK"));
// expected: one note, id 1 "Buy milk and bread"
console.log(searchNotes("the"));
// expected: two notes, id 2 and id 3
console.log(searchNotes("zebra"));
// expected: [] (no results)

// longestNote
console.log(longestNote());
// expected: id 3 "Email the project report to Grace"
notes = [];
console.log(longestNote());
// expected: null
notes = originalNotes;

// countByCategory
console.log(countByCategory());
// expected: personal 2, study 2, work 1
notes = [];
console.log(countByCategory());
// expected: {} (an empty object)
notes = originalNotes;

// getSummary
console.log(getSummary());
// expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [{ id: 99, text: "Only note", category: "work" }];
console.log(getSummary());
// expected: "1 note: 0 personal, 1 work, 0 study."
notes = originalNotes;

// isDuplicate
console.log(isDuplicate("call mum"));
// expected: true (case is ignored)
console.log(isDuplicate("  BUY MILK   and bread "));
// expected: true (extra spaces are ignored)
console.log(isDuplicate("Learn CSS grid"));
// expected: false

// addNote
console.log(addNote("Pay the electricity bill", "personal"));
// expected: logs Added: "Pay the electricity bill" (personal), then true
console.log(addNote("  CALL MUM ", "personal"));
// expected: logs Rejected: "CALL MUM" already exists., then false
console.log(addNote("   ", "work"));
// expected: logs Rejected: a note must be 1-200 characters., then false
console.log(addNote("a".repeat(201), "work"));
// expected: logs Rejected: a note must be 1-200 characters., then false
console.log(addNote("Go to the gym", "fitness"));
// expected: logs Rejected: "fitness" is not a valid category., then false
console.log(getSummary());
// expected: "6 notes: 3 personal, 1 work, 2 study."