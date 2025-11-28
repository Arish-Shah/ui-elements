export function transform(data) {
  data.size = data.size.split("x").map(Number);
  data.grid = Array.from({ length: data.size[0] }, () => Array(data.size[1]).fill("#")); // solution grid
  data.filled = structuredClone(data.grid); // user filled data

  // clue number in grid
  data.clueNumbers = {};

  // find all the cells a solution spans and construct grid
  data.entries.forEach(e => {
    e.cells = [];

    data.clueNumbers[e.position.row + "," + e.position.col] = e.number;

    for (let j = 0; j < e.length; j++) {
      const [row, col] = e.direction === "across" ?
        [e.position.row, e.position.col + j] : [e.position.row + j, e.position.col];
      e.cells.push(row + "," + col);

      data.grid[row][col] = e.solution[j];
      data.filled[row][col] = "_";
    }
  });

  return data;
}
