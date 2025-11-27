// adds all the cells a word spans to switch direction on clicking
// the selected cell again
export function transform(data) {
  const [rows, cols] = data.size.split("x").map(Number);
  data.size = [rows, cols];

  data.entries = data.entries.map(entry => {
    entry.cells = [];
    for (let i = 0; i < entry.length; i++) {
      if (entry.direction === "across") {
        entry.cells.push((entry.position.x + i) + "," + (entry.position.y));
      } else {
        entry.cells.push((entry.position.x) + "," + (entry.position.y + i));
      }
    }

    return entry;
  });
  return data;
}
