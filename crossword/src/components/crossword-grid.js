import "./crossword-cell.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host { display: block; padding: 0.25rem; }

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
        cell.dataset.row = i;
        cell.dataset.col = j;

        if (this.data.filled[i][j] === "#") cell.blocked = true;
        cell.label = 15;

        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
  }
}

customElements.define("crossword-grid", CrosswordGrid);
