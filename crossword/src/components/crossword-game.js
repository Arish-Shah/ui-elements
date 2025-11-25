import "./crossword-grid.js";
import "./crossword-clues.js";
import { createClueId } from "../lib/puzzle.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { display: flex; }

    @media screen and (max-width: 576px) {
      :host { flex-direction: column; }
    }
  </style>
  <crossword-grid></crossword-grid>
  <crossword-clues></crossword-clues>
`;

class CrosswordGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    this.data = createClueId(this.data);
    const { size, across, down } = this.data;

    const clues = this.shadowRoot.querySelector("crossword-clues");
    const grid = this.shadowRoot.querySelector("crossword-grid");

    clues.data = { across, down };

    clues.addEventListener("clue-selected", e => {
      clues.selected = e.detail;
    });

    await customElements.whenDefined("crossword-clues");
    clues.selected = this.data.across[Object.keys(this.data.across)[0]].id;
  }

  attributeChangedCallback() {}
}

customElements.define("crossword-game", CrosswordGame);
