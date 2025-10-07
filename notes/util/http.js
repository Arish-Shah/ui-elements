import { Store } from "./store.js";

const store = new Store();
const wcRoot = document.querySelector("wc-root");

export default {
  async get() {
    return store.getAllNotes();
  },
  async post(val) {
    const newNote = store.addNote(val);
    const wcNote = document.createElement("wc-note");
    wcNote.id = newNote.id;
    wcNote.props = newNote;
    document.querySelector("wc-notes").addNote(wcNote);
  },
  put(id, val) {
    if (val.title.trim() === "" && val.content.trim() === "") {
      this.delete(id);
      return;
    }
    store.updateNote(id, val);
    const noteEl = wcRoot.querySelector(`#${id}`);
    noteEl.props = val;
  },
  delete(id) {
    const noteEl = wcRoot.querySelector(`#${id}`);
    noteEl.parentElement.removeNote(noteEl);
    store.deleteNote(id);
  },
};
