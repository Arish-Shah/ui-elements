import { CustomElement, html } from "../lib/custom-element.js";

class GameRow extends CustomElement {
  render() {
    return html`
      <style>
      </style>
    `;
  }
}

customElements.define("game-row", GameRow);
