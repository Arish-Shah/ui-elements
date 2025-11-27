import "./crossword-current-clue.js";
import "./crossword-grid.js";
import "./crossword-clues.js";
import { transform } from "../util.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host { display: flex; }

    .container {
      flex: 1;
    }

    @media screen and (max-width: 640px) {
      :host {
        flex-direction: column;
        gap: 0;
      }
    }
  </style>
  <div class="container">
    <crossword-current-clue></crossword-current-clue>
    <crossword-grid></crossword-grid>
  </div>
  <crossword-clues></crossword-clues>
`;

class CrosswordApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    this.currentClueEl = this.shadowRoot.querySelector("crossword-current-clue");
    this.gridEl = this.shadowRoot.querySelector("crossword-grid");
    this.cluesEl = this.shadowRoot.querySelector("crossword-clues");

    this.cluesEl.addEventListener("clue-selected", e => {
      this.cluesEl.current = e.detail;
      this.currentClueEl.clue = this.data.entries.find(c => c.id === e.detail);
    });

    this.cluesEl.clues = this.data.entries;
    this.gridEl.size = this.data.size;

    await customElements.whenDefined("crossword-current-clue");
    this.currentClueEl.clue = this.data.entries[0];

    await customElements.whenDefined("crossword-clues");
    this.cluesEl.current = this.data.entries[0].id;
  }

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = transform(val);
  }
}

customElements.define("crossword-app", CrosswordApp);
