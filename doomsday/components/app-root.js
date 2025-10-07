class AppRoot extends HTMLElement {
  static observedAttributes = ["date", "show-answer"];

  constructor() {
    super();
    this.appendChild(AppRoot.html());
  }

  connectedCallback() {
    this.Q = this.querySelector("#question")
    this.T = this.querySelector("app-timer");
    this.A = this.querySelector("#answer");

    this.answer = this.querySelector(".answer-container");

    this.date = AppRoot.getRandomDate();

    const toggle = this.querySelector("#toggle");
    const refresh = this.querySelector("#refresh");

    toggle.addEventListener("click", _ => {
      this.showAnswer = !this.showAnswer;
    });

    refresh.addEventListener("click", _ => {
      this.date = AppRoot.getRandomDate();
      this.showAnswer = false;
    });
  }

  attributeChangedCallback(name) {
    if (name === "date") {
      this.Q.textContent = this.date.toLocaleDateString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      this.A.textContent = this.date.toLocaleDateString("default", {
        weekday: "long",
      });

      this.T.elapsed = 0;
    }

    if (name === "show-answer") {
      if (this.showAnswer) {
        this.answer.style.visibility = "visible";
        this.T.paused = true;
      } else {
        this.answer.style.visibility = "hidden";
        this.T.paused = false;
      }
    }
  }

  static html() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container">
        <h1>📅 <span id="question"></span></h1>
        <app-timer></app-timer>
        <h2 class="answer-container">it was <span id="answer">?</span></h2>
      </div>
      <div class="actions">
        <div class="container">
          <button id="refresh">refresh</button>
          <button id="toggle">toggle answer</button>
        </div>
      </div>
    `;
    return template.content.cloneNode(true);
  }

  get date() {
    return new Date(this.getAttribute("date"));
  }

  set date(val) {
    this.setAttribute("date", val.toISOString());
  }

  get showAnswer() {
    return this.hasAttribute("show-answer");
  }

  set showAnswer(val) {
    if (val) this.setAttribute("show-answer", "");
    else this.removeAttribute("show-answer");
  }

  static random(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static getRandomDate() {
    const year = this.random(1950, new Date().getFullYear());
    const month = this.random(0, 11);
    const day = this.random(1, 31);

    return new Date(year, month, day);
  }
}

customElements.define("app-root", AppRoot);
