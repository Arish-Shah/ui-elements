const matter = require("gray-matter");
const remark = require("remark");
const remarkHtml = require("remark-html");

const getTemplate = require("./util/get-template");
const formatDate = require("./util/format-date");
const { prev, next } = require("./util/move");

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
    .map((post) => {
      const date = formatDate(post.meta.date);
      return `
        <li>
          <a href="./${post.id}">
            ${post.meta.title}
          </a>
          <p>${date}</p>
          <p>${post.meta.spoiler}</p>
        </li>`;
    })
    .join("");

  const index = indexTemplate.replace("{{ posts }}", ul);
  return index;
}

function generatePost(current, prevPost, nextPost) {
  const postTemplate = getTemplate("post.html");
  let post = postTemplate.replace(/{{ title }}/g, current.meta.title);
  post = post.replace("{{ content }}", current.html);
  post = post.replace("{{ date }}", formatDate(current.meta.date));

  post = prevPost
    ? post.replace("{{ prev }}", prev(prevPost))
    : post.replace("{{ prev }}", "");

  post = nextPost
    ? post.replace("{{ next }}", next(nextPost))
    : post.replace("{{ next }}", "");

  return post;
}

function generate(rawPostsData) {
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
