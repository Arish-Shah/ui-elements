const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      height: 2.5rem;
    }

    .clue-id {
      font-weight: bold;
    }
  </style>
  <div class="clue-id"></div>
  <div class="clue-text"></div>
`;

class CrosswordActiveClue extends HTMLElement {
  static get observedAttributes() {
    return ["clue-id", "clue-text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.idEl = this.shadowRoot.querySelector(".clue-id");
    this.textEl = this.shadowRoot.querySelector(".clue-text");
  }

  attributeChangedCallback(name, _, newVal) {
    switch(name) {
      case "clue-id": this.idEl.textContent = newVal; break;
      case "clue-text": this.textEl.textContent = newVal; break;
    }
  }

  get clueId() {
    return this.getAttribute("clue-id");
  }

  set clueId(val) {
    this.setAttribute("clue-id", val);
  }

  get clueText() {
    return this.getAttribute("clue-text");
  }

  set clueText(val) {
    this.setAttribute("clue-text", val);
  }
}

customElements.define("crossword-active-clue", CrosswordActiveClue);
