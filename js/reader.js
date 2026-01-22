class Reader {
    constructor() {
        this.loadAndDisplayNotes();
        this.BackButton();
        this.startAutoRefresh();
    }

    // Auto-refresh every 2 seconds
    startAutoRefresh() {
        setInterval(() => {
            this.loadAndDisplayNotes();
        }, 2000);
    }

    loadAndDisplayNotes() {
        this.notes = this.loadNotes();
        this.displayNotes();
        this.displayLastSaved();
    }

    loadNotes() {
        const notesInJSON = localStorage.getItem("notes");
        return notesInJSON ? JSON.parse(notesInJSON) : [];
    }

    displayNotes() {
        const noteElements = document.querySelectorAll('.note');

        // Clear all existing notes
        noteElements.forEach(note => {
            note.textContent = '';
        });

        // Display saved notes
        this.notes.forEach((note, index) => {
            if (noteElements[index]) {
                noteElements[index].textContent = note.content;
            }
        });
    }

    displayLastSaved() {
        const lastSaved = document.getElementById("lastSaved");
        
        if (this.notes.length > 0) {
            const lastNote = this.notes[this.notes.length - 1];
            lastSaved.textContent = 'updated at: ' + new Date(lastNote.timestamp).toLocaleTimeString();
        } else {
            lastSaved.textContent = 'No notes saved yet';
        }
    }

    BackButton() {
        const goBack = document.getElementById("backButton");
        goBack.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
}

new Reader();