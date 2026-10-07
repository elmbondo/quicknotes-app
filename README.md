# QuickNotes

QuickNotes is a small note-taking web app built with HTML, CSS and JavaScript. You can write short notes, put them in a category, search through them, and they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Each category has its own colour
- Delete notes you don't need any more
- Search notes while you type
- Error messages for empty notes and notes longer than 200 characters
- A note count that says "no notes", "1 note" or "N notes"
- Notes are saved in the browser with localStorage
- Works on phones and computers

## How to run it locally

1. Clone the repository: `git clone https://github.com/elmbondo/quicknotes-app.git`
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. You can also just double-click `index.html` to open it in your browser.

## What I learned

- How to build the page from the data: keep the notes in an array, change the array, then call `render()` to redraw everything.
- Why `textContent` is safer than `innerHTML` for text that users type.
- How `localStorage` works with `JSON.stringify` and `JSON.parse` to keep data after a refresh.
- How to use Flexbox and a media query to make the layout work on a phone.