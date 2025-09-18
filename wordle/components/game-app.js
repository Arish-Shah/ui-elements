import { CustomElement, html } from "../lib/custom-element.js";

class GameApp extends CustomElement {
  render() {
    return html`
      <style>
      </style>
      <game-header></game-header>
    `;
  }
}

customElements.define("game-app", GameApp);
