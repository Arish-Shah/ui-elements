const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { flex: 1; }
  </style>
  <slot></slot>
  <div class="board"></div>
`;

class CrosswordGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const [rows, cols] = this.size.split("x").map(Number);
    this.board = this.shadowRoot.querySelector(".board");
  }
}

customElements.define("crossword-grid", CrosswordGrid);
