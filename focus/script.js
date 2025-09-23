class AppTimer extends HTMLElement {
  static observedAttributes = ["value"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.value = 10 * 60;

    this.interval = setInterval(() => {
      this.value = this.value - 1;
    }, 1000);
  }

  attributeChangedCallback() {
    const span = this.shadowRoot.querySelector("span");

    if (this.value === 0) {
      clearInterval(this.interval);
    }

    let m = Math.floor(this.value / 60);
    let s = this.value - (m * 60);

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    span.textContent = m + ":" + s;
  }

  get value() {
    return Number(this.getAttribute("value"));
  }

  set value(val) {
    this.setAttribute("value", val);
  }
}

const template = document.createElement("template");
template.innerHTML = `
  <style>
    div {
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      font-size: 5rem;
      font-weight: bold;
    }
  </style>

  <div>
    <span>10:00</span>
  </div>
`;

customElements.define("app-timer", AppTimer);
