import "./crossword-grid.js";
import "./crossword-clues.js";
import "./crossword-active-clue.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { display: flex; gap: 1rem; padding: 0.5rem; }

    @media screen and (max-width: 768px) {
      :host { flex-direction: column; gap: 0; }
    }
  </style>
  <crossword-grid>
    <crossword-active-clue></crossword-active-clue>
  </crossword-grid>
  <crossword-clues></crossword-clues>
`;

class CrosswordGame extends HTMLElement {
  static get observedAttributes() {
    return ["state", "selected-clue-id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    this.cluesEl = this.shadowRoot.querySelector("crossword-clues");
    this.activeClueEl = this.shadowRoot.querySelector("crossword-active-clue");
    this.gridEl = this.shadowRoot.querySelector("crossword-grid");

    this.cluesEl.clues = this.data.entries;
    this.gridEl.size = this.data.size;

    this.cluesEl.addEventListener("clue-selected", e => {
      this.selectedClueId = e.detail;
    });

    this.selectedClueId = this.data.entries[0].id;
  }

  async attributeChangedCallback(name, _, newVal) {
    if (name === "selected-clue-id") {
      await customElements.whenDefined("crossword-clues");
      await customElements.whenDefined("crossword-active-clue");

      const selectedClue = this.data.entries.find(c => c.id === newVal);
      this.cluesEl.clueId = selectedClue.id;
      this.activeClueEl.clueId = selectedClue.id;
      this.activeClueEl.clueText = selectedClue.clue;
    }
  }

  get selectedClueId() {
    return this.getAttribute("selected-clue-id");
  }

  set selectedClueId(val) {
    this.setAttribute("selected-clue-id", val);
  }
}

customElements.define("crossword-game", CrosswordGame);
