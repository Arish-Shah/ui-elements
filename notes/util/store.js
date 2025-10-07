export class Store {
  #notes = {
    "note-1": {
      id: "note-1",
      title: "hello",
      content: "world",
      timestamp: new Date().valueOf(),
      deleted: false,
    }
  };

  constructor() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      this.#notes = JSON.parse(savedNotes);
    } else {
      this.save();
    }
  }

  getAllNotes() {
    return Object.keys(this.#notes).reverse().filter(k => !this.#notes[k].deleted).map(k => this.#notes[k]);
  }

  addNote(val) {
    const idKey = Object.keys(this.#notes).length + 1;
    const newNote = {
      ...val,
      id: "note-" + idKey,
      timestamp: new Date().valueOf(),
      deleted: false,
    };
    this.#notes[newNote.id] = newNote;
    this.save();
    return newNote;
  }

  deleteNote(id) {
    this.#notes[id].deleted = true;
    this.save();
  }

  updateNote(id, val) {
    this.#notes[id] = { ...val, timestamp: new Date().valueOf() };
    this.save();
  }

  save() {
    localStorage.setItem("notes", JSON.stringify(this.#notes));
  }
}
