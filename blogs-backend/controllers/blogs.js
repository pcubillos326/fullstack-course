const blogRouter = require("express").Router();

const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;
  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    response.status(404).json({ error: "Blog not found" });
    return;
  }

  existingBlog.likes = likes;

  const updatedBlog = await existingBlog.save();
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
