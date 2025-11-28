import "./crossword-cell.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: block;
    }

    .grid {
      border-right: 2px solid #000000;
      border-bottom: 2px solid #000000;
    }

    .row {
      display: flex;
    }
  </style>
  <div class="grid"></div>
`;

class CrosswordGrid extends HTMLElement {
  static get observedAttributes() {
    return ["current"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const grid = this.shadowRoot.querySelector(".grid");

    for (let i = 0; i < this.data.size[0]; i++) {
      const row = document.createElement("div");
      row.classList = "row";

      for (let j = 0; j < this.data.size[1]; j++) {
        const cell = document.createElement("crossword-cell");
        cell.dataset.coord = i + "," + j;

        if (this.data.filled[i][j] === "#") cell.blocked = true;

        const coord = i + "," + j;
        if (coord in this.data.clueNumbers) {
          cell.clueNumber = this.data.clueNumbers[coord];
        }

        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === "current") {
      const clue = this.data.entries.find(e => e.id === newVal);
      this.clearHighlight();
      this.highlight(clue.cells);
      this.focus(clue.cells[0]);
    }
  }

  clearHighlight() {
   this.shadowRoot.querySelectorAll("crossword-cell").forEach(e => {
      e.highlight = false;
    });
  }

  highlight(cells) {
    cells.forEach(cell => {
      const [i, j] = cell.split(",");
      const cellEl = this.shadowRoot.querySelector(`[data-coord="${i},${j}"]`);
      cellEl.highlight = true;
    });
  }

  focus(cell) {
    const [i, j] = cell.split(",");
    const cellEl = this.shadowRoot.querySelector(`[data-coord="${i},${j}"]`);
    cellEl.focus();
  }

  get current() {
    return this.getAttribute("current");
  }

  set current(val) {
    this.setAttribute("current", val);
  }
}

customElements.define("crossword-grid", CrosswordGrid);
