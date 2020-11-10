import notes from '../data.js';

export class AppNotes extends HTMLElement {
  constructor() {
    super();
    this.render(notes);
  }

  render(notes) {
    const fragment = document.createDocumentFragment();
    Object.keys(notes)
      .reverse()
      .forEach(key => {
        const note = notes[key];
        const appNote = document.createElement('app-note');
        appNote.noteid = key;
        appNote.content = note.content;
        appNote.title = note.title;
        appNote.timestamp = note.timestamp;
        fragment.appendChild(appNote);
      });

    this.appendChild(fragment);

    new Masonry(this, {
      itemSelector: 'app-note',
      gutter: 10,
      horizontalOrder: true,
      fitWidth: window.innerWidth > 530
    });
  }
}
