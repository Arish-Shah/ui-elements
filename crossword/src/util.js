export function transform(data) {
  data.size = data.size.split("x").map(Number);
  data.grid = Array.from({ length: 5 }, () => Array(5).fill("#")); // solution grid
  data.filled = Array.from({ length: 5 }, () => Array(5).fill("#")); // user entered values

  // all the cells an answer spans
  // useful for switching directions
  data.entries.map((e) => {
    e.cells = [];

    for (let i = 0; i < e.length; i++) {
      const [y, x] = e.direction === "across" ?
        [e.position.y, e.position.x + i] : [e.position.y + i, e.position.x];
      e.cells.push(y + "," + x);

      data.grid[y][x] = e.solution[i];
      data.filled[y][x] = "_";
    }
  });

  return data;
}
