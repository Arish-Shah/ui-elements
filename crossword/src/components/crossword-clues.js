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
      gap: 1rem;
    }

    li.selected {
      background: #b0daff;
    }

    .clue-label {
      width: 1.5rem;
      text-align: right;
      font-weight: bold;
    }

    .clue-text {
      flex: 1;
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
    return ["selected"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const acrossList = this.shadowRoot.querySelector(".across-list");
    const downList = this.shadowRoot.querySelector(".down-list");

    acrossList.append(...Object.keys(this.data.across).map(
      n => this.createListItem(n, this.data.across[n])));

    downList.append(...Object.keys(this.data.down).map(
      n => this.createListItem(n, this.data.down[n])));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "selected") {
      if (oldVal)
        this.shadowRoot.querySelector("#clue-" + oldVal).classList = "";
      this.shadowRoot.querySelector("#clue-" + newVal).classList = "selected";
    }
  }

  createListItem(num, item) {
    const li = document.createElement("li");
    li.id = "clue-" + item.id;
    li.innerHTML = `
      <div class="clue-label">${num}</div>
      <div class="clue-text">${item.clue}</div>
    `;

    li.addEventListener("click", _ => {
      this.dispatchEvent(new CustomEvent("clue-selected", {
        detail: item.id,
      }));
    });

    return li;
  }

  get selected() {
    return this.getAttribute("selected");
  }

  set selected(val) {
    this.setAttribute("selected", val);
  }
}

customElements.define("crossword-clues", CrosswordClues);
