export class AppModal extends HTMLElement {
  static template() {
    return ``;
  }

  get x() {
    return +this.getAttribute('x');
  }

  set x(val) {
    this.setAttribute('x', val);
  }

  get y() {
    return +this.getAttribute('y');
  }

  set y(val) {
    this.setAttribute('y', val);
  }

  get startwidth() {
    return +this.getAttribute('startwidth');
  }

  set startwidth(val) {
    this.setAttribute('startwidth', val);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(val) {
    this.setAttribute('content', val);
  }

  get timestamp() {
    return +this.getAttribute('timestamp');
  }

  set timestamp(val) {
    this.setAttribute('timestamp', val);
  }

  get open() {
    return this.getAttribute('open') || null;
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

const template = document.createElement('template');
template.innerHTML = AppModal.template();
