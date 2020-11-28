const fs = require("fs");
const path = require("path");

function readFiles() {
  const fileNames = fs.readdirSync(
    path.join(__dirname, "..", "pages"),
    "utf-8"
  );
  return fileNames.map((fileName) => readFile(fileName));
}

function readFile(fileName) {
  const content = fs.readFileSync(
    path.join(__dirname, "..", "pages", fileName),
    "utf-8"
  );
  const name = fileName.replace(/\.md$/, "");
  return {
    content,
    name,
  };
}

module.exports = readFiles;
