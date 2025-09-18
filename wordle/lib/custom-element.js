export const html = String.raw;

export class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template());
  }

  template() {
    const template = document.createElement("template");
    template.innerHTML = this.render();
    return template.content.cloneNode(true);
  }

  render() {
    return html`
      <style>span { color: red; }</style>
      <span>render function not defined</span>
    `;
  }
}
