import $http from '../util/http.js';

export class WCInput extends HTMLElement {
  static template() {
    return `
      <div class="closed" placeholder="Take a note..." contenteditable="true"></div>
      <form class="open hide">
        <input placeholder="Title" class="title" />
        <div contenteditable="true" placeholder="Take a note..." class="content"></div>
        <div class="footer">
          <button title="Close" type="submit">Close</button>
        </div>
      </form>
    `;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.checkFormDirty();
      this.removeAttribute('open');
    }
  }

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.handleClosedFocus = this.handleClosedFocus.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.closedEl = this.querySelector('.closed');
    this.openEl = this.querySelector('.open');
    this.formEl = this.querySelector('form');
    this.titleEl = this.openEl.querySelector('.title');
    this.contentEl = this.openEl.querySelector('.content');

    this.formEl.addEventListener('submit', this.handleFormSubmit);
    this.closedEl.addEventListener('focus', this.handleClosedFocus);
    window.addEventListener('click', this.handleWindowClick);
  }

  attributeChangedCallback() {
    this.toggleInput();
  }

  toggleInput() {
    if (this.open) {
      this.closedEl.classList.add('hide');
      this.openEl.classList.remove('hide');
      this.contentEl.focus();
    } else {
      this.closedEl.classList.remove('hide');
      this.openEl.classList.add('hide');
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.open = false;
  }

  handleClosedFocus() {
    this.open = true;
  }

  handleWindowClick(event) {
    if (!this.contains(event.target)) {
      this.open = false;
    }
  }

  checkFormDirty() {
    const title = this.titleEl.value.trim();
    const content = this.contentEl.innerHTML.trim();
    if (title || content) {
      $http.post({
        title,
        content
      });
      this.titleEl.value = '';
      this.contentEl.innerHTML = '';
    }
  }

  disconnectedCallback() {
    this.closedEl.removeEventListener('focus', this.handleClosedFocus);
    window.removeEventListener('click', this.handleWindowClick);
  }
}

const template = document.createElement('template');
template.innerHTML = WCInput.template();
