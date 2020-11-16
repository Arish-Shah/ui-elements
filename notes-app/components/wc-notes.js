import $http from '../util/http.js';
import { transformObject } from '../util/transform.js';

export class WCNotes extends HTMLElement {
  connectedCallback() {
    this.update();
  }

  async update() {
    const response = await $http.get();
    const notes = transformObject(response);
    notes.forEach(note => {
      const wcNote = document.createElement('wc-note');
      wcNote.props = note;
      wcNote.id = note.id;
      this.appendChild(wcNote);
    });
    new Masonry(this, {
      fitWidth: window.innerWidth > 530,
      gutter: 12
    });
  }
}
