import "./crossword-cell.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .heading {
      font-weight: bold;
      border-bottom: 1px solid #a2a2a2;
      padding: 0.25rem;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    li {
      cursor: pointer;
      padding: 0.25rem 0;
      display: flex;
      gap: 0.5rem;
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
      padding-right: 0.25rem;
      flex: 1;
    }

    @media screen and (min-width: 1024px) {
      :host {
        flex-direction: row;
      }
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
