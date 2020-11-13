class WCAdder extends HTMLElement {
  static template() {
    return `
      <input type="number" />
      +
      <input type="number" />
      =
      <span></span>
    `;
  }

  static get observedAttributes() {
    return ['a', 'b'];
  }

  get a() {
    return +this.getAttribute('a');
  }

  set a(val) {
    this.setAttribute('a', val);
  }

  get b() {
    return +this.getAttribute('b');
  }

  set b(val) {
    this.setAttribute('b', val);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.inputs = this.shadowRoot.querySelectorAll('input');
    this.span = this.shadowRoot.querySelector('span');
    this.a = 0;
    this.b = 0;
    this.inputs[0].addEventListener('input', e => {
      this.a = e.target.value;
    });

    this.inputs[1].addEventListener('input', e => {
      this.b = e.target.value;
    });
  }

  attributeChangedCallback() {
    this.span.textContent = this.a + this.b;
  }
}

const template = document.createElement('template');
template.innerHTML = WCAdder.template();

customElements.define('wc-adder', WCAdder);
