const matter = require("gray-matter");
const remark = require("remark");
const remarkHtml = require("remark-html");

const getTemplate = require("./util/get-template");

function getPostData(data) {
  const matterResult = matter(data.content);
  const html = remark()
    .use(remarkHtml)
    .processSync(matterResult.content)
    .toString();
  return {
    id: data.id,
    meta: matterResult.data,
    html,
  };
}

function generateIndex(postsData) {
  const indexTemplate = getTemplate("index.html");
  const ul = postsData
    .map(
      (post) => `
      <li>
        <a href="./${post.id}.html"><h3>${post.meta.title}</h3></a>
      </li>
    `
    )
    .join("");
  const index = indexTemplate.replace("% postsList %", ul);
  return index;
}

function generatePost(current, prev, next) {
  const postTemplate = getTemplate("post.html");
  let post = postTemplate.replace("% document.title %", current.meta.title);
  post = post.replace("% document.body %", current.html);
  return post;
}

function generate(rawPostsData) {
  console.info("Generating Pages...");
  const files = {};
  const postsData = rawPostsData
    .map((data) => getPostData(data))
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

  files.index = generateIndex(postsData);

  for (let i = 0; i < postsData.length; i++) {
    const currentPost = postsData[i];
    files[currentPost.id] = generatePost(
      currentPost,
      postsData[i - 1],
      postsData[i + 1]
    );
  }
  return files;
}

module.exports = generate;
