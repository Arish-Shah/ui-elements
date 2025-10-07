import $http from "../util/http.js";

export class WCNotes extends HTMLElement {
  static template() {
    return "";
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.update();
  }

  async update() {
    const notes = await $http.get();
    notes.forEach((note) => {
      const wcNote = document.createElement("wc-note");
      wcNote.props = note;
      wcNote.id = note.id;
      this.appendChild(wcNote);
    });
  }

  removeNote(noteEl) {
    this.removeChild(noteEl);
  }

  addNote(note) {
    this.prepend(note);
  }
}

const template = document.createElement("template");
template.innerHTML = WCNotes.template();
