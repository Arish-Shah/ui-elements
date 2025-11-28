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
    this.input = this.shadowRoot.querySelector("input");

    if (this.blocked) {
      this.setAttribute("blocked", "");
      this.input.disabled = true;
    }

    if (this.clueNumber) {
      this.shadowRoot.querySelector(".number").textContent = this.clueNumber;
    }

    this.input.addEventListener("keyup", e => {
      const key = e.key.toUpperCase();

      if (key === "BACK") {}

      if (key.length === 1 && key >= "A" && key <= "Z")
        this.dispatchEvent(new CustomEvent("cell-updated", {
          detail: { coord: this.getAttribute("data-coord"), key },
          bubbles: true,
          composed: true,
        }));
    });

    this.input.addEventListener("click", e => {
      console.log(this.shadowRoot.activeElement === e.target);
    });
  }

  disconnectedCallback() {
    this.input.removeEventListener("keyup");
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
