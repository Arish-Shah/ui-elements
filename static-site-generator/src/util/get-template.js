const fs = require("fs");
const path = require("path");

function getTemplate(fileName) {
  return fs.readFileSync(
    path.join(__dirname, "..", "templates", fileName),
    "utf-8"
  );
}

module.exports = getTemplate;
