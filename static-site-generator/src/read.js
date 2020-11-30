const fs = require("fs");
const path = require("path");

function readFile(fileName) {
  const content = fs.readFileSync(
    path.join(__dirname, "pages", fileName),
    "utf-8"
  );
  const id = fileName.replace(/\.md$/, "");
  return {
    id,
    content,
  };
}

function readFiles() {
  console.info("Reading Files...");
  const fileNames = fs.readdirSync(path.join(__dirname, "pages"), "utf-8");
  return fileNames.map((fileName) => readFile(fileName));
}

module.exports = readFiles;
