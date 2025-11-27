const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      font-size: 0.9rem;
      padding: 0.25rem;
      display: flex;
      gap: 0.5rem;
    }

    .label {
      font-weight: bold;
    }
  </style>
  <span class="label"></span>
  <span class="text"></span>
`;

class CrosswordCurrentClue extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.labelEl = this.shadowRoot.querySelector(".label");
    this.textEl = this.shadowRoot.querySelector(".text");
  }

  get clue() {
    return this._clue;
  }

  set clue(val) {
    this.labelEl.textContent = val.id;
    this.textEl.textContent = val.clue;
    this._clue = val;
  }
}

customElements.define("crossword-current-clue", CrosswordCurrentClue);
