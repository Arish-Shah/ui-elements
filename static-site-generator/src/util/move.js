function prev(post) {
  return `<a href="./${post.id}">← ${post.meta.title}</a>`;
}

function next(post) {
  return `<a href="./${post.id}">${post.meta.title} →</a>`;
}

module.exports = {
  prev,
  next,
};
