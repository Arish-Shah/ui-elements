import { CustomElement, html } from "../lib/custom-element.js";

class GameTile extends CustomElement {
  render() {
    return html`
      <style>
      </style>
    `;
  }
}

customElements.define("game-tile", GameTile);
