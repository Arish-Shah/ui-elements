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
    this.wcModal = this.querySelector("wc-modal");
    this.wcInput = this.querySelector("wc-input");
    window.addEventListener("keyup", this.handleKeyUp);

    this.wcModal.addEventListener("showNote", this.showNote);
  }

  handleKeyUp(event) {
    if (event.key === "Escape") {
      this.wcModal.open = false;
      this.wcInput.open = false;
    }
  }

  showNote(event) {
    const id = event.detail.id;
    const note = document.getElementById(id);
    if (note) note.style.opacity = 1;
  }

  disconnectedCallback() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }
}

const template = document.createElement("template");
template.innerHTML = WCRoot.template();
