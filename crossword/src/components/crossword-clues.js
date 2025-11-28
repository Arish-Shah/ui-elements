import "./crossword-cell.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: flex;
      flex-direction: column;
    }

    .heading {
      font-weight: bold;
      border-bottom: 1px solid #a2a2a2;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    li {
      cursor: pointer;
      display: flex;
    }

    li.selected {
      background: #ffe500;
    }

    .label {
      text-align: right;
      font-weight: bold;
      width: 1.25rem;
    }

    .text {
      flex: 1;
    }
  </style>
  <div class="container">
    <div class="heading">across</div>
    <ul data-direction="across"></ul>
  </div>
  <div class="container">
    <div class="heading">down</div>
    <ul data-direction="down"></ul>
  </div>
`;

class CrosswordClues extends HTMLElement {
  static get observedAttributes() {
    return ["current"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const across = this.clues.filter(c => c.direction === "across");
    const down = this.clues.filter(c => c.direction === "down");

    this.shadowRoot.querySelector('[data-direction="across"]')
      .append(...across.map(this.generateClueItem.bind(this)));
    this.shadowRoot.querySelector('[data-direction="down"]')
      .append(...down.map(this.generateClueItem.bind(this)));
  }

  disconnectedCallback() {
    const items = this.shadowRoot.querySelectorAll("li");

    items.forEach(item => item.removeEventListener("click"));
  }

  attributeChangedCallback(_, oldVal, newVal) {
    if (oldVal) {
      this.shadowRoot.querySelector(`[data-id="${oldVal}"]`).classList = "";
    }
    this.shadowRoot.querySelector(`[data-id="${newVal}"]`).classList = "selected";
  }

  generateClueItem(clue) {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="label">${clue.number}</div>
      <div class="text">${clue.clue}</div>
    `;

    item.dataset.id = clue.id;

    item.addEventListener("click", _ => {
      this.dispatchEvent(new CustomEvent("clue-selected", { detail: clue.id }));
    });

    return item;
  }

  get current() {
    return this.getAttribute("current");
  }

  set current(val) {
    this.setAttribute("current", val);
  }
}

customElements.define("crossword-clues", CrosswordClues);
