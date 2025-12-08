import "./xw-navigator.js";
import "./xw-grid.js";
import "./xw-clues.js";
import { parse } from "../util.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      padding: 0.5rem;
      display: flex; 
    }
  </style>
  <div class="container">
    <xw-navigator></xw-navigator>
    <xw-grid></xw-grid>
  </div>
  <xw-clues></xw-clues>
`;

class XWApp extends HTMLElement {
  static observedAttributes = ["src"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.navigatorEl = this.shadowRoot.querySelector("xw-navigator");
    this.gridEl = this.shadowRoot.querySelector("xw-grid");
    this.cluesEl = this.shadowRoot.querySelector("xw-clues");

    this.resizeFonts();
  }

  resizeFonts() {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (!this.puzzleData) return;
      const width = entries[0].contentRect.width;

      const cellSize = Math.floor(width / this.puzzleData.dimensions.width);
      const textSize = Math.floor(cellSize * 0.55);
      const labelSize = Math.floor(cellSize * 0.25);

      this.style.setProperty("--xw-text-size", `${textSize}px`);
      this.style.setProperty("--xw-label-size", `${labelSize}px`);
    });
    this.resizeObserver.observe(this.gridEl);
  }

  async attributeChangedCallback(_, __, newVal) {
    const response = await fetch(newVal);
    const data = await response.json();
    this.puzzleData = parse(data);

    this.gridEl.puzzle = this.puzzleData.puzzle;
    this.cluesEl.clues = this.puzzleData.clues;
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(val) {
    this.setAttribute("src", val);
  }
}

customElements.define("xw-app", XWApp);