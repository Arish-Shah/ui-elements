const fs = require("fs");
const path = require("path");

function write(pages) {
  for (let [name, content] of Object.entries(pages)) {
    fs.writeFileSync(
      path.join(__dirname, "..", "build", name + ".html"),
      content
    );
  }
}

module.exports = write;
