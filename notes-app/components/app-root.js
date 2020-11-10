export class AppRoot extends HTMLElement {
  static template() {
    return `
      <app-header></app-header>
      <app-input></app-input>
      <app-notes></app-notes>
      <app-modal></app-modal>
    `;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));

    const appNotes = this.querySelector('app-notes');
    const appModal = this.querySelector('app-modal');

    appNotes.addEventListener('openmodal', e => {
      const detail = e.detail;
      appModal.x = detail.x;
      appModal.y = detail.y;
      appModal.startwidth = detail.width;
      appModal.noteid = detail.note.id;
      appModal.title = detail.note.title;
      appModal.content = detail.note.content;
      appModal.timestamp = detail.note.timestamp;
      appModal.open = true;
    });

    window.addEventListener('keyup', e => {
      if (e.key === 'Escape' && appModal.open) {
        appModal.open = false;
      }
    });
  }
}

const template = document.createElement('template');
template.innerHTML = AppRoot.template();
