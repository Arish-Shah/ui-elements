const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: block;
      border-left: 2px solid #000000;
      border-top: 2px solid #000000;
    }

    :host([blocked]) {
      background: #000000;
    }

    input {
      outline: 0;
      border: 0;
      text-align: center;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: transparent;
    }
  </style>
  <input type="text" maxlength="1" tabindex="-1" />
`;

class CrosswordCell extends HTMLElement {
  static get observedAttributes() {
    return ["blocked", "value"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.blocked) {
      this.setAttribute("blocked", "");
      this.shadowRoot.querySelector("input").disabled = true;
    }
  }
}

customElements.define("crossword-cell", CrosswordCell);
