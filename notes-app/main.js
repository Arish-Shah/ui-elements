import { WCRoot } from "./components/wc-root.js";
import { WCHeader } from "./components/wc-header.js";
import { WCInput } from "./components/wc-input.js";
import { WCNotes } from "./components/wc-notes.js";
import { WCNote } from "./components/wc-note.js";
import { WCModal } from "./components/wc-modal.js";

customElements.define("wc-root", WCRoot);
customElements.define("wc-header", WCHeader);
customElements.define("wc-input", WCInput);
customElements.define("wc-notes", WCNotes);
customElements.define("wc-note", WCNote);
customElements.define("wc-modal", WCModal);
