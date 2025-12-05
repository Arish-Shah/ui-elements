const template = document.createElement("template");
template.innerHTML = `
  <style>
    * { box-sizing: border-box; }

    :host {
      position: relative;
      border: 1px solid #000000; 
    }

    :host([blocked]) {
      background: #000000;
    }

    :host([data-barred*="T"]) {
      border-top: 4px solid #000000; 
    }

    :host([data-barred*="L"]) {
      border-left: 4px solid #000000; 
    }

    :host([data-shapebg="circle"]) input {
      border: 2px solid #c5c5c5; 
      border-radius: calc(infinity * 1px);
    }

    label {
      position: absolute;
      top: 0.15rem; 
      left: 0.15rem;
      background: #ffffff;
      font-size: var(--xw-label-size);
    }

    input {
      border: 0;
      outline: 0;
      width: 100%;
      background: transparent;
      text-align: center;
      aspect-ratio: 1/1;
      font-size: var(--xw-text-size);
    }
  </style>
  <label></label>
  <input type="text" maxlength="1" tabindex="-1" name="cell" />
`;

class XWCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const labelEl = this.shadowRoot.querySelector("label");
    if (this.label) labelEl.textContent = this.label;
  }

  set blocked(val) {
    if (val) this.setAttribute("blocked", "");
    else this.removeAttribute("blocked");
  }
}

customElements.define("xw-cell", XWCell);