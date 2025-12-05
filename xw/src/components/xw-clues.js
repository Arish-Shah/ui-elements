const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; } 

    :host {
      display: flex;
      flex-direction: column; 
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  </style>
  <div class="container">
    <div class="heading">across</div> 
    <ul id="across-clues"></ul>
  </div>
  <div class="container">
    <div class="heading">down</div> 
    <ul id="down-clues"></ul>
  </div>
`;

class XWClues extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  render() {
    const acrossCluesEl = this.shadowRoot.querySelector("#across-clues");
    const downCluesEl = this.shadowRoot.querySelector("#down-clues");

    acrossCluesEl.append(...this.clues.Across.map(this.createClueItem.bind(this)));
    downCluesEl.append(...this.clues.Down.map(this.createClueItem.bind(this)));
  }

  createClueItem(clue) {
    const item = document.createElement("li");
    item.innerHTML = `
      <span class="label">${clue.number}</span> 
      <span class="text">${clue.clue}</span> 
    `; 
    item.addEventListener("click", _ => {
      this.dispatchEvent(new CustomEvent("clue-clicked", {
        detail: {},
      }));
    });

    return item;
  }

  get clues() {
    return this._clues;
  }

  set clues(val) {
    this._clues = val;
    this.render();
  }
}

customElements.define("xw-clues", XWClues);