import { whenOpen, whenClose } from '../util/anim.js';

export class AppModal extends HTMLElement {
  static template() {
    return `
      <style></style>
      <div class="overlay"></div>
      <form class="container">
        <input placeholder="Title" type="text" />
        <div contenteditable="true" placeholder="Note"></div>
      </form>
    `;
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

  get noteid() {
    return this.getAttribute('noteid');
  }

  set noteid(val) {
    this.setAttribute('noteid', val);
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

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));

    this.styleEl = this.querySelector('style');
    this.overlayEl = this.querySelector('.overlay');
    this.containerEl = this.querySelector('.container');
    this.inputEl = this.querySelector('input');
    this.contentEl = this.containerEl.querySelector('div');
  }

  attributeChangedCallback() {
    const overlayElEventListener = () => (this.open = false);
    this.overlayEl.removeEventListener('click', overlayElEventListener);

    const rect = this.containerEl.getBoundingClientRect();

    if (this.open) {
      this.styleEl.textContent = whenOpen(
        this.x,
        this.y,
        this.startwidth,
        rect.width,
        rect.height
      );
      this.inputEl.value = this.title;
      this.contentEl.textContent = this.content;
      this.overlayEl.addEventListener('click', overlayElEventListener);
    } else {
      this.styleEl.textContent = whenClose(
        this.x,
        this.y,
        this.startwidth,
        rect.width,
        rect.height
      );
    }
  }
}

const template = document.createElement('template');
template.innerHTML = AppModal.template();
