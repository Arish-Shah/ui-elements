export class WCRoot extends HTMLElement {
  static template() {
    return `
      <wc-modal></wc-modal>
      <wc-header></wc-header>
      <wc-input></wc-input>
      <wc-notes></wc-notes>
    `;
  }

  constructor() {
    super();
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.wcModal = this.querySelector('wc-modal');
    window.addEventListener('keyup', this.handleKeyUp);
    this.wcModal.addEventListener('showNote', this.showNote);
  }

  handleKeyUp(event) {
    if (event.key === 'Escape') {
      this.wcModal.open = false;
    }
  }

  showNote(event) {
    const id = event.detail.id;
    document.getElementById(id).style.opacity = 1;
  }

  disconnectedCallback() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}

const template = document.createElement('template');
template.innerHTML = WCRoot.template();
