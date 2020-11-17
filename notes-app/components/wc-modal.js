import $http from '../util/http.js';

export class WCModal extends HTMLElement {
  static template() {
    return `
      <div class="overlay"></div>
      <form>
        <input placeholder="Title" />
        <div contenteditable="true" placeholder="Note" class="content"></div>
        <span class="edited"></span>
        <div class="footer">
          <button title="Delete" id="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button title="Close">Close</button>
        </div>
      </form>
    `;
  }

  constructor() {
    super();
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  get props() {
    return JSON.parse(this.getAttribute('props'));
  }

  set props(val) {
    this.setAttribute('props', JSON.stringify(val));
  }

  static get observedAttributes() {
    return ['props', 'open'];
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.overlayEl = this.querySelector('.overlay');
    this.formEl = this.querySelector('form');
    this.inputEl = this.formEl.querySelector('input');
    this.contentEl = this.formEl.querySelector('.content');
    this.editedEl = this.querySelector('.edited');
    this.deleteButtonEl = this.querySelector('#delete-button');

    this.formEl.addEventListener('submit', this.handleSubmit);
    this.overlayEl.addEventListener('click', this.handleOverlayClick);
    this.deleteButtonEl.addEventListener('click', this.handleDelete);
  }

  handleOverlayClick() {
    this.open = false;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.open = false;
  }

  handleDelete() {
    if (confirm('Are you sure you want to delete this note?')) {
      $http.delete(this.props.id);
    }
  }

  attributeChangedCallback(attrName) {
    if (this.open) {
      this.inputEl.value = this.props.title || '';
      this.contentEl.textContent = this.props.content || '';
      this.editedEl.textContent = this.getEditedMoment(this.props.timestamp);
      this.transitionIn();
    } else {
      if (attrName === 'open') {
        if (
          this.inputEl.value !== this.props.title ||
          this.contentEl.textContent !== this.props.content
        ) {
          $http.put(this.props.id, {
            title: this.inputEl.value,
            content: this.contentEl.textContent,
            timestamp: new Date().valueOf()
          });
        }
        this.transitionOut();
      }
    }
  }

  transitionIn() {
    const { translateX, translateY, scaleX, scaleY } = this.getTransforms();
    this.formEl.style.opacity = 1;
    this.animation = this.formEl.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
        },
        {
          transform: 'translate(-50%, -40%) scale(1, 1)'
        }
      ],
      {
        fill: 'forwards',
        duration: 200
      }
    );

    this.animation.finished.then(() => {
      this.formEl.classList.toggle('show-contents');
    });
  }

  transitionOut() {
    this.formEl.classList.toggle('show-contents');
    this.animation.reverse();

    this.animation.finished.then(() => {
      this.formEl.style.opacity = 0;
      this.dispatchEvent(
        new CustomEvent('showNote', {
          detail: {
            id: this.props.id
          }
        })
      );
    });
  }

  getTransforms() {
    const rect = this.formEl.getBoundingClientRect();
    const modalX = rect.left;
    const modalY = rect.top;
    const modalWidth = rect.width;
    const modalHeight = rect.height;

    return {
      translateX: this.props.left - modalX,
      translateY: this.props.top - modalY,
      scaleX: this.props.width / modalWidth,
      scaleY: this.props.height / modalHeight
    };
  }

  getEditedMoment(timestamp) {
    return `Edited ${new Date(timestamp).toDateString()}`;
  }

  focusDiv() {
    this.contentEl.focus();
    document.execCommand('selectAll', false, null);
    document.getSelection().collapseToEnd();
  }

  disconnectedCallback() {
    this.overlayEl.removeEventListener('click', this.handleOverlayClick);
    this.formEl.removeEventListener('submit', this.handleSubmit);
    this.deleteButtonEl.removeEventListener('click', this.handleDelete);
  }
}

const template = document.createElement('template');
template.innerHTML = WCModal.template();
