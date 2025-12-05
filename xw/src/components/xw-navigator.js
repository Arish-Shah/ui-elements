const template = document.createElement("template");
template.innerHTML = `
  <style>
  </style>
`;

class XWNavigator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

customElements.define("xw-navigator", XWNavigator);