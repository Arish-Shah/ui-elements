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

    .id {
      font-weight: bold;
    }
  </style>
  <div class="id"></div>
  <div class="text"></div>
`;

class CrosswordActiveClue extends HTMLElement {
  static get observedAttributes() {
    return ["id", "text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.idEl = this.shadowRoot.querySelector(".id");
    this.textEl = this.shadowRoot.querySelector(".text");
  }

  attributeChangedCallback(name, _, newVal) {
    switch(name) {
      case "id": this.idEl.textContent = newVal; break;
      case "text": this.textEl.textContent = newVal; break;
    }
  }

  get id() {
    return this.getAttribute("id");
  }

  set id(val) {
    this.setAttribute("id", val);
  }

  get text() {
    return this.getAttribute("text");
  }

  set text(val) {
    this.setAttribute("text", val);
  }
}

customElements.define("crossword-active-clue", CrosswordActiveClue);
