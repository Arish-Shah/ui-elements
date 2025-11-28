const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: block;
      border-left: 2px solid #000000;
      border-top: 2px solid #000000;
      position: relative;
    }

    :host([blocked]) {
      background: #000000;
    }

    :host([highlight]) {
      background: #85c8ff;
    }

    .number {
      position: absolute;
      left: 0.1rem;
    }

    input {
      outline: 0;
      border: 0;
      text-align: center;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: transparent;
    }

    input:focus {
      background: #ffe500;
    }
  </style>
  <span class="number"></span>
  <input type="text" maxlength="1" tabindex="-1" />
`;

class CrosswordCell extends HTMLElement {
  static get observedAttributes() {
    return ["value", "highlight"];
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

    if (this.clueNumber) {
      this.shadowRoot.querySelector(".number").textContent = this.clueNumber;
    }
  }

  focus() {
    this.shadowRoot.querySelector("input").focus();
  }

  get highlight() {
    return this.hasAttribute("highlight");
  }

  set highlight(val) {
    if (val) this.setAttribute("highlight", "");
    else this.removeAttribute("highlight");
  }
}

customElements.define("crossword-cell", CrosswordCell);
