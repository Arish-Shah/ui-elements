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
          <button>Close</button>
        </div>
      </form>
    `;
  }

  constructor() {
    super();
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.formEl.addEventListener('submit', this.handleSubmit);
    this.overlayEl.addEventListener('click', this.handleOverlayClick);
  }

  handleOverlayClick() {
    this.open = false;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.open = false;
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
        duration: 200,
        easing: 'ease-in'
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
    const noteX = this.props.left;
    const noteY = this.props.top;
    const notesWidth = this.props.width;
    const notesHeight = this.props.height;

    const rect = this.formEl.getBoundingClientRect();
    const modalX = rect.left;
    const modalY = rect.top;
    const modalWidth = rect.width;
    const modalHeight = rect.height;

    return {
      translateX: noteX - modalX,
      translateY: noteY - modalY,
      scaleX: notesWidth / modalWidth,
      scaleY: notesHeight / modalHeight
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
  }
}

const template = document.createElement('template');
template.innerHTML = WCModal.template();
