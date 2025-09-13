import { getRandomDate } from "../util.js";

export class AppRoot extends HTMLElement {
  static observedAttributes = ["date", "show-answer"];

  constructor() {
    super();
    this.appendChild(AppRoot.html());
  }

  connectedCallback() {
    this.Q = this.querySelector("#question")
    this.A = this.querySelector("#answer");

    this.answer = this.querySelector(".answer-container");

    this.date = getRandomDate();

    const toggle = this.querySelector("#toggle");
    const refresh = this.querySelector("#refresh");

    toggle.addEventListener("click", _ => {
      this.showAnswer = !this.showAnswer;
    });

    refresh.addEventListener("click", _ => {
      this.date = getRandomDate();
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

      this.elapsed = 1;
    }

    if (name === "show-answer") {
      if (this.showAnswer) {
        this.answer.style.opacity = "100";
      } else {
        this.answer.style.opacity = "0";
      }
    }
  }

  static html() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container">
        <h1>📅 <span id="question"></span></h1>
        <h3>🕒 <span id="timer">0</span>s elapsed</h3>
        <h2 class="answer-container">it was <span id="answer">?</span></h2>
      </div>
      <div class="actions">
        <div class="container">
          <button id="toggle">toggle answer</button>
          <button id="refresh">refresh</button>
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
}
