import $http from '../util/http.js';
import { transformObject } from '../util/transform.js';

export class WCNotes extends HTMLElement {
  static template() {
    return `<div class="spinner"></div>`;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.update();
  }

  async update() {
    const response = await $http.get();
    const notes = transformObject(response);
    this.removeChild(this.firstChild);
    notes.forEach(note => {
      const wcNote = document.createElement('wc-note');
      wcNote.props = note;
      wcNote.id = note.id;
      this.appendChild(wcNote);
    });
    this.masonry = new Masonry(this, {
      fitWidth: window.innerWidth > 530,
      gutter: 12
    });
  }

  updateMasonry() {
    this.masonry.layout();
  }

  removeNote(noteEl) {
    this.masonry.remove(noteEl);
  }

  addNote(note) {
    this.appendChild(note);
    this.masonry.prepended(note);
  }
}

const template = document.createElement('template');
template.innerHTML = WCNotes.template();
