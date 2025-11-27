import "./crossword-board.js";
import "./crossword-clues.js";
import "./crossword-active-clue.js";
import { transform } from "./util.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }
    :host { display: flex; gap: 1rem; padding: 0.5rem; }

    @media screen and (max-width: 768px) {
      :host { flex-direction: column; gap: 0; }
    }
  </style>
  <crossword-board>
    <crossword-active-clue></crossword-active-clue>
  </crossword-board>
  <crossword-clues></crossword-clues>
`;

class CrosswordGame extends HTMLElement {
  static get observedAttributes() {
    return ["board-state", "selected-clue-id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    this.data = transform(this.data);

    this.cluesEl = this.shadowRoot.querySelector("crossword-clues");
    this.activeClueEl = this.shadowRoot.querySelector("crossword-active-clue");
    this.boardEl = this.shadowRoot.querySelector("crossword-board");

    this.cluesEl.entries = this.data.entries;
    this.boardEl.size = this.data.size;

    this.cluesEl.addEventListener("clue-selected", e => {
      this.selectedClueId = e.detail;
    });

    this.selectedClueId = this.data.entries[0].id;

    this.boardEl.addEventListener("board-change", e => {
      this.boardState = e.detail;
    });

    this.boardState = ("_".repeat(this.data.size[0]) + ",").repeat(this.data.size[1]);
  }

  async attributeChangedCallback(name, _, newVal) {
    if (name === "selected-clue-id") {
      await customElements.whenDefined("crossword-clues");
      await customElements.whenDefined("crossword-active-clue");

      const selectedClue = this.data.entries.find(c => c.id === newVal);
      this.cluesEl.selectedId = selectedClue.id;
      this.activeClueEl.id = selectedClue.id;
      this.activeClueEl.text = selectedClue.clue;
    }

    if (name === "board-state") {
      await customElements.whenDefined("crossword-board");
      this.boardEl.state = this.boardState;
    }
  }

  get boardState() {
    return this.getAttribute("board-state");
  }

  set boardState(val) {
    this.setAttribute("board-state", val);
  }

  get selectedClueId() {
    return this.getAttribute("selected-clue-id");
  }

  set selectedClueId(val) {
    this.setAttribute("selected-clue-id", val);
  }
}

customElements.define("crossword-game", CrosswordGame);
