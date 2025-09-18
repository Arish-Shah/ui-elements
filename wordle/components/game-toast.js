import { CustomElement, html } from "../lib/custom-element.js";

class GameToast extends CustomElement {
  render() {
    return html`
      <style>
      </style>
    `;
  }
}

customElements.define("game-toast", GameToast);
