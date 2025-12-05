import "./xw-cell.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; } 

    :host {
      display: grid; 
      border: 1px solid #000000;
    }
  </style>
`;

class XWGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  render() {
    const width = this.puzzle[0].length;

    for (let row = 0; row < this.puzzle.length; row++) {
      for (let col = 0; col < width; col++) {
        const cellEl = document.createElement("xw-cell");
        const cellData = this.puzzle[row][col];
        const cellValue = cellData?.cell || cellData;

        if (typeof cellValue === "number") cellEl.label = cellValue;
        if (cellValue === "#") cellEl.blocked = true;

        if (cellData?.style) {
          Object.assign(cellEl.dataset, cellData.style);
        }

        cellEl.dataset.coord = `${row},${col}`;
        this.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        this.shadowRoot.appendChild(cellEl);
      }
    }
  }

  get puzzle() {
    return this._puzzle;
  }

  set puzzle(val) {
    this._puzzle = val;
    this.render();
  }
}

customElements.define("xw-grid", XWGrid);