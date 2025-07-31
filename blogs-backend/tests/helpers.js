const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "My new entry",
    author: "Unknown",
    url: "https://my.cool.site.com",
    likes: 3,
  },
  {
    title: "My false entry",
    author: "Known",
    url: "https://my.bad.site.com",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
