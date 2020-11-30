const read = require("./read");
const generate = require("./generate");
const write = require("./write");

const rawPostsData = read();
const pages = generate(rawPostsData);
write(pages);
