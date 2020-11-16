export class WCHeader extends HTMLElement {
  static template() {
    return `
      <img src="./assets/wc.png" draggable="false" />
      <span>+</span>
      <img src="./assets/firebase.png" draggable="false" />
    `;
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

const template = document.createElement('template');
template.innerHTML = WCHeader.template();
