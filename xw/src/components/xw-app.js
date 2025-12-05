import "./xw-navigator.js";
import "./xw-grid.js";
import "./xw-clues.js";
import { parse } from "../util.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      display: flex; 
    }

    @media screen and (max-width: 980px) {
      :host {
        flex-direction: column; 
      } 
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

    this.cluesEl.addEventListener("clue-clicked", e => {});
  }

  async attributeChangedCallback(_, __, newVal) {
    const response = await fetch(newVal);
    const data = await response.json();
    const puzzleData = parse(data);

    this.gridEl.puzzle = puzzleData.puzzle;
      this.cluesEl.clues = puzzleData.clues;
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(val) {
    this.setAttribute("src", val);
  }
}

customElements.define("xw-app", XWApp);