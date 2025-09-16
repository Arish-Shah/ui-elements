import { CustomElement, html } from "../lib/custom-element.js";

class GameApp extends CustomElement {
  render() {
    return html`<h1>hello world</h1>`;
  }
}

customElements.define("game-app", GameApp);
