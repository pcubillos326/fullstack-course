const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.toSorted((a, b) => b.likes - a.likes);

  return favorite[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});

  const mostBlogsAuthorArr = Object.entries(authorCounts).toSorted(
    ([_, blogsA], [__, blogsB]) => blogsB - blogsA,
  )[0];

  return {
    author: mostBlogsAuthorArr[0],
    blogs: mostBlogsAuthorArr[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
    return likes;
  }, {});

  const mostLikesAuthorArr = Object.entries(authorLikes).toSorted(
    ([_, likesA], [__, likesB]) => likesB - likesA,
  )[0];

  return {
    author: mostLikesAuthorArr[0],
    likes: mostLikesAuthorArr[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
