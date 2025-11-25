import "./src/components/crossword-game.js";

const game = document.createElement("crossword-game");

game.data = {
  size: "5x5",
  across: {
    1: { clue: "Theatrical role", answer: "PART", row: 0, col: 3 },
    5: { clue: "Capital of Vietnam", answer: "HANOI", row: 1, col: 2 },
    6: { clue: "Father of a \"fur baby\"", answer: "CATDAD", row: 2, col: 1 },
    7: { clue: "Words often accompanied by a ring", answer: "MARRYME", row: 3, col: 0 },
    8: { clue: "Whirling currents", answer: "EDDIES", row: 4, col: 0 },
    9: { clue: "Put up, as a statue", answer: "ERECT", row: 5, col: 0 },
    10: { clue: "Race about half the length of a half-marathon", answer: "TENK", row: 6, col: 0 }
  },
  down: {
    1: { clue: "SpongeBob's starfish friend", answer: "PATRICK", row: 0, col: 3 },
    2: { clue: "\"Despite it all...\"", answer: "ANDYET", row: 0, col: 4 },
    3: { clue: "Wanders here and there", answer: "ROAMS", row: 0, col: 5 },
    4: { clue: "Company with a \"To Go\" stain remover", answer: "TIDE", row: 0, col: 6 },
    5: { clue: "Become firm", answer: "HARDEN", row: 1, col: 2 },
    6: { clue: "Small group of soldiers", answer: "CADRE", row: 2, col: 1 },
    7: { clue: "What parallel lines never do", answer: "MEET", row: 3, col: 0 }
  }
};

document.body.appendChild(game);
