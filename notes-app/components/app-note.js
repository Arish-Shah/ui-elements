export class AppNote extends HTMLElement {
  static template() {
    return `
      <h4></h4>
      <p></p>
    `;
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(val) {
    this.setAttribute('content', val);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get timestamp() {
    return this.getAttribute('timestamp');
  }

  set timestamp(val) {
    this.setAttribute('timestamp', val);
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.h4 = this.querySelector('h4');
    this.p = this.querySelector('p');

    this.h4.textContent = this.title;
    this.p.textContent = this.content;

    this.addEventListener('click', _ => {
      const event = new CustomEvent('openmodal', {
        detail: {
          x: this.offsetLeft,
          y: this.offsetTop,
          width: this.clientWidth,
          note: {
            title: this.title,
            content: this.content,
            timestamp: this.timestamp
          }
        },
        bubbles: true
      });
      this.dispatchEvent(event);
    });
  }
}

const template = document.createElement('template');
template.innerHTML = AppNote.template();
