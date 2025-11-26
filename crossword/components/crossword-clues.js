const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { display: flex; flex-direction: column; gap: 1rem; font-size: 0.9rem; }

   .clue-heading {
      padding: 0.25rem 0;
      border-bottom: 1px solid #a2a2a2;
      text-transform: uppercase;
      font-weight: bold;
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
      background: #ffff00;
    }

    .clue-label {
      width: 1.25rem;
      text-align: right;
      font-weight: bold;
    }

    .clue-text {
      flex: 1;
    }

    @media screen and (min-width: 992px) {
      :host {
        flex-direction: row;
      }
    }
  </style>
  <div class="clues-container">
    <div class="clue-heading">across</div>
    <ul class="across-list"></ul>
  </div>
  <div class="clues-container">
    <div class="clue-heading">down</div>
    <ul class="down-list"></ul>
  </div>
`;

class CrosswordClues extends HTMLElement {
  static get observedAttributes() {
    return ["clue-id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const acrossList = this.shadowRoot.querySelector(".across-list");
    const downList = this.shadowRoot.querySelector(".down-list");

    acrossList.append(...this.clues.filter(
      clue => clue.direction === "across").map(this.createListItem.bind(this)));
    downList.append(...this.clues.filter(
      clue => clue.direction === "down").map(this.createListItem.bind(this)));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "clue-id") {
      if (oldVal)
        this.shadowRoot.querySelector("#clue-" + oldVal).classList = "";
      this.shadowRoot.querySelector("#clue-" + newVal).classList = "selected";
    }
  }

  createListItem(item) {
    const li = document.createElement("li");
    li.id = "clue-" + item.id;
    li.innerHTML = `
      <div class="clue-label">${item.number}</div>
      <div class="clue-text">${item.clue}</div>
    `;

    li.addEventListener("click", _ => {
      this.dispatchEvent(new CustomEvent("clue-selected", {
        detail: item.id,
      }));
    });

    return li;
  }

  get clueId() {
    return this.getAttribute("clue-id");
  }

  set clueId(val) {
    this.setAttribute("clue-id", val);
  }
}

customElements.define("crossword-clues", CrosswordClues);
