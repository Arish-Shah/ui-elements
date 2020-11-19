export class WCNote extends HTMLElement {
  static template() {
    return `
      <h4></h4>
      <p></p>
    `;
  }

  set props(val) {
    this.setAttribute('props', JSON.stringify(val));
  }

  get props() {
    return JSON.parse(this.getAttribute('props'));
  }

  static get observedAttributes() {
    return ['props'];
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.parent = this.parentElement;
    this.h4 = this.querySelector('h4');
    this.p = this.querySelector('p');
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (this.isConnected) {
      this.h4.textContent = this.props.title;
      this.p.innerHTML = this.props.content;
      this.addEventListener('click', this.handleClick);
    }
  }

  handleClick() {
    const rect = this.getBoundingClientRect();
    const wcModal = document.querySelector('wc-modal');
    wcModal.props = {
      ...this.props,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    };
    wcModal.open = true;
    this.style.opacity = 0;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.parent.updateMasonry();
  }
}

const template = document.createElement('template');
template.innerHTML = WCNote.template();
