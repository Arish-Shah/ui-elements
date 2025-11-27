import "./src/crossword.js";

const crossword = document.createElement("crossword-app");

crossword.data = {
  id: "crosswords/example/1",
  title: "example crossword 1",
  size: "5x5",
  entries: [
    {
      id: "1A",
      number: 1,
      clue: "Prefix for some music genres",
      direction: "across",
      length: 3,
      position: { x: 0, y: 0 },
      solution: "ALT",
    },
    {
      id: "4A",
      number: 4,
      clue: "Fab ___ (nickname for the Beatles)",
      direction: "across",
      length: 4,
      position: { x: 0, y: 1 },
      solution: "FOUR",
    },
    {
      id: "6A",
      number: 6,
      clue: "Eagle's claw",
      direction: "across",
      length: 5,
      position: { x: 0, y: 2 },
      solution: "TALON",
    },
    {
      id: "8A",
      number: 8,
      clue: "Fab ___ (nickname for a noted University of Michigan basketball team)",
      direction: "across",
      length: 4,
      position: { x: 1, y: 3 },
      solution: "FIVE",
    },
    {
      id: "9A",
      number: 9,
      clue: "Congregant's seat",
      direction: "across",
      length: 3,
      position: { x: 2, y: 4 },
      solution: "PEW",
    },
    {
      id: "1D",
      number: 1,
      clue: "Boat's rear",
      direction: "down",
      length: 3,
      position: { x: 0, y: 0 },
      solution: "AFT",
    },
    {
      id: "2D",
      number: 2,
      clue: "Shape of a cat with its legs tucked under itself",
      direction: "down",
      length: 4,
      position: { x: 1, y: 0 },
      solution: "LOAF",
    },
    {
      id: "3D",
      number: 3,
      clue: "Flower that's the subject of Dutch festivals",
      direction: "down",
      length: 5,
      position: { x: 2, y: 0 },
      solution: "TULIP",
    },
    {
      id: "5D",
      number: 5,
      clue: "Wander aimlessly",
      direction: "down",
      length: 4,
      position: { x: 3, y: 1 },
      solution: "ROVE"
    },
    {
      id: "7D",
      number: 7,
      clue: "Like many shows at the top of the Netflix queue",
      direction: "down",
      length: 3,
      position: { x: 4, y: 2 },
      solution: "NEW",
    }
  ],
};

document.body.appendChild(crossword);
