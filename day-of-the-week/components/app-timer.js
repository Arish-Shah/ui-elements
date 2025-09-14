export class AppTimer extends HTMLElement {
  static observedAttributes = ["elapsed", "paused"];

  constructor() {
    super();
    this.appendChild(AppTimer.html());
    this.interval = null;
  }

  connectedCallback() {
    this.T = this.querySelector("#timer");
    this.interval = setInterval(() => this.elapsed += 1, 1000);
  }

  attributeChangedCallback(name) {
    if (name === "elapsed") {
      this.T.textContent = this.elapsed;
    } else if (name === "paused") {
      if (this.paused) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(() => this.elapsed += 1, 1000);
      }
    }
  }

  static html() {
    const template = document.createElement("template");
    template.innerHTML = `
      <h3>🕒 <span id="timer">0</span>s elapsed</h3>
    `;
    return template.content.cloneNode(true);
  }

  get paused() {
    return this.hasAttribute("paused");
  }

  set paused(val) {
    if (val) this.setAttribute("paused", "");
    else this.removeAttribute("paused");
  }

  get elapsed() {
    return +this.getAttribute("elapsed");
  }

  set elapsed(val) {
    this.setAttribute("elapsed", val);
  }
}
