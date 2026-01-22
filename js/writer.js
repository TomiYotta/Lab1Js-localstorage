class Writer {
    constructor() {
        this.notes = this.loadNotes();
        this.noteCounter = this.notes.length;
        this.renderNotes();
        this.setupRemoveButtons();
        this.BackButton();
        this.startAutoSave();
    }

    // Auto-save every 2 seconds
    startAutoSave() {
        setInterval(() => {
            this.saveCurrentNotes();
        }, 2000);
    }

    saveCurrentNotes() {
        const notesBoxs = document.querySelectorAll(".note");
        const notes = [];

        notesBoxs.forEach((noteEl, index) => {
            const content = noteEl.textContent.trim();
            if (content) {
                notes.push({
                    id: index + 1,
                    content: content,
                    timestamp: new Date().toISOString()
                });
            }
        });

        this.notes = notes;
        const notesInJSON = JSON.stringify(notes, null, 2);
        localStorage.setItem("notes", notesInJSON);

        const lastSavedDiv = document.getElementById("lastSaved");
        const now = new Date().toLocaleTimeString();
        lastSavedDiv.textContent = `updated at: ${now}`;
    }

    // Add a new note block
    addNoteBlock() {
        this.noteCounter++;
        
        const noteContainer = document.getElementById("noteContainer");
        const addButton = document.getElementById("addNoteBtn");
        
        const noteRow = document.createElement("div");
        noteRow.className = "noteRow";
        
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.id = `note${this.noteCounter}`;
        noteElement.contentEditable = "true";
        noteElement.textContent = "";
        
        const removeButton = document.createElement("button");
        removeButton.className = "noteBtn";
        removeButton.textContent = "remove";
        
        noteRow.appendChild(noteElement);
        noteRow.appendChild(removeButton);
        
        // Insert before the add button
        noteContainer.insertBefore(noteRow, addButton);
        
        // Re-attach remove listeners
        this.setupRemoveButtons();
        
        // Focus on the new note
        noteElement.focus();
    }

    setupRemoveButtons() {
        const removeButtons = document.querySelectorAll('.noteBtn:not(#addNoteBtn)');
        
        removeButtons.forEach((button) => {
            // Clone to remove old listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', () => {
                const noteRow = newButton.closest('.noteRow');
                
                // Remove the entire row from DOM
                noteRow.remove();
                
                // Save immediately after removal
                this.saveCurrentNotes();
            });
        });
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    }

    renderNotes() {
        if (this.notes.length > 0) {
            const noteElements = document.querySelectorAll('.note');
            this.notes.forEach((note, index) => {
                if (noteElements[index]) {
                    noteElements[index].textContent = note.content;
                }
            });
            this.noteCounter = this.notes.length;
        }
    }

    BackButton() {
        const goBack = document.getElementById("backButton");
        goBack.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
}

const writer = new Writer();

document.getElementById('addNoteBtn').addEventListener('click', () => {
    writer.addNoteBlock();
});