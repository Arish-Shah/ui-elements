import { CustomElement, html } from "../lib/custom-element.js";

class GameHeader extends CustomElement {
  connectedCallback() {
  }

  render() {
    return html`
      <style>
      </style>
    `;
  }
}

customElements.define("game-header", GameHeader);
