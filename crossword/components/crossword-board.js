const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { flex: 1; }
  </style>
  <slot></slot>
`;

class CrosswordBoard extends HTMLElement {
  static get observedAttributes() {
    return ["state"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
  }

  attributeChangedCallback() {
    console.log(arguments);
  }

  get state() {
    return this.getAttribute("state");
  }

  set state(val) {
    this.setAttribute("state", val);
  }
}

customElements.define("crossword-board", CrosswordBoard);
