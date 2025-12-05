export function parse(data) {
  normalizeData(data);
  const starts = findClueStartPosition(data.puzzle, data.dimensions);

  data.clues.Across.forEach(clue => getAcrossCells(clue, data, starts));
  data.clues.Down.forEach(clue => getDownCells(clue, data, starts));

  return data;
}

function normalizeData(data) {
  if (data.empty) return;
  data.empty = ":";

  for (let row = 0; row < data.dimensions.height; row++) {
    for (let col = 0; col < data.dimensions.width; col++) {
      const cell = data.puzzle[row][col];

      if (cell === 0 || cell === null) data.puzzle[row][col] = data.empty;
      else if (typeof cell === "object") {
        if (cell.cell === 0 || cell.cell === null)
          data.puzzle[row][col].cell = data.empty;
      }
    }
  }
}

function getAcrossCells(clue, data, starts) {
  const [row, col] = starts[clue.number];
  clue.cells = [];

  for (let j = col; j < data.dimensions.width; j++) {
    if (data.puzzle[row][j] === "#") break;
    clue.cells.push([row, j]);
  }

  if (!clue.answer) {
    clue.answer = getAnswerFromCells(data.solution, clue.cells);
  }

  return clue;
}

function getDownCells(clue, data, starts) {
  const start = starts[clue.number];
  if (!start) return clue;

  const [row, col] = start;
  clue.cells = [];

  for (let i = row; i < data.dimensions.height; i++) {
    if (data.puzzle[i][col] === "#") break;
    clue.cells.push([i, col]);
  }

  if (!clue.answer) {
    clue.answer = getAnswerFromCells(data.solution, clue.cells);
  }

  return clue;
}

function getAnswerFromCells(solution, cells) {
  return cells.map(([row, col]) => {
    const cell = solution[row][col];
    return typeof cell === "object" && "value" in cell ? cell.value : cell;
  }).join("");
}

function findClueStartPosition(puzzle, dimensions) {
  const starts = {};

  for (let row = 0; row < dimensions.height; row++) {
    for (let col = 0; col < dimensions.width; col++) {
      let item = puzzle[row][col];
      item = typeof item === "object" ? item.cell : item;
      if (item && typeof item === "number") starts[item] = [row, col];
    }
  }
  return starts;
}