class ColorClock extends HTMLElement {
  static template() {
    return `
      <style>
        :host {
          display: block;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #222222;
        }

        :host([dark]) {
          color: #ffffff;
        }

        h1 {
          font-size: 4rem;
          font-weight: 100;
        }
      </style>
      <h1>#000000</h1>
    `;
  }

  constructor() {
    super();
    this.intervalHandler = this.intervalHandler.bind(this);
    this.attachShadow({ mode: "open" });
  }

  set dark(val) {
    if (val) {
      this.setAttribute("dark", "");
    } else {
      if (this.hasAttribute("dark")) {
        this.removeAttribute("dark");
      }
    }
  }

  get color() {
    return this.getAttribute("color");
  }

  set color(val) {
    this.setAttribute("color", val);
  }

  static get observedAttributes() {
    return ["color"];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.h1 = this.shadowRoot.querySelector("h1");
    this.intervalHandler();
    this.interval = setInterval(this.intervalHandler, 1000);
  }

  intervalHandler() {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    this.color = `#${h}${m}${s}`;
  }

  attributeChangedCallback() {
    this.h1.textContent = this.color;
    this.style.backgroundColor = this.color;
  }
}

const template = document.createElement("template");
template.innerHTML = ColorClock.template();
customElements.define("color-clock", ColorClock);
