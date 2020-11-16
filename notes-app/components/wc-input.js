export class WCInput extends HTMLElement {
  static template() {
    return ``;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  static get observedAttributes() {
    return ['open'];
  }

  connectedCallback() {}
}

const template = document.createElement('template');
template.innerHTML = WCInput.template();
