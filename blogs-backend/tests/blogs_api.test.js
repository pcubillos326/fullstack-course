const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./helpers");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("Blogs API", () => {
  describe("Retrieve blogs", () => {
    test("blogs are returned as json", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("a valid identifier named id exists", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const hasIDProperty = response.body.every((blog) =>
        Object.hasOwn(blog, "id"),
      );

      assert(hasIDProperty);
    });
  });

  describe("adding a blog", () => {
    test("can add a new entry blog", async () => {
      const newEntry = {
        title: "My test entry",
        author: "Test",
        url: "https://my.test.site.com",
        likes: 3,
      };

      const entrySaved = await api
        .post("/api/blogs")
        .send(newEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const newEntries = await blogsInDb();

      assert.strictEqual(newEntries.length, initialBlogs.length + 1);

      assert.deepEqual(entrySaved.body, {
        ...newEntry,
        id: entrySaved.body.id,
      });
    });

    test("if there is no likes property, it sets by default 0", async () => {
      const newEntry = {
        title: "My test entry",
        author: "Test",
        url: "https://my.test.site.com",
      };

      const entrySaved = await api
        .post("/api/blogs")
        .send(newEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.deepEqual(entrySaved.body, {
        ...newEntry,
        id: entrySaved.body.id,
        likes: 0,
      });
    });

    test("if there is no title property, it returns 400", async () => {
      const newEntry = {
        author: "Test",
        url: "https://my.test.site.com",
      };

      await api.post("/api/blogs").send(newEntry).expect(400);

      const blogsAtEnd = await blogsInDb();

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
    });

    test("if there is no url property, it returns 400", async () => {
      const newEntry = {
        title: "My test entry",
        author: "Test",
      };

      await api.post("/api/blogs").send(newEntry).expect(400);

      const blogsAtEnd = await blogsInDb();

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
    });
  });

  test("deleting a blog", async () => {
    const blogs = await blogsInDb();

    await api.delete(`/api/blogs/${blogs[0].id}`).expect(204);

    const blogsAtEnd = await blogsInDb();

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);
  });

  describe("updating a blog", () => {
    test("Should update likes ", async () => {
      const blogs = await blogsInDb();

      const updatedEntryData = {
        ...blogs[0],
        likes: 10,
      };

      const updatedEntry = await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send(updatedEntryData)
        .expect(200);

      const blogsAtEnd = await blogsInDb();

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
      assert.deepEqual(updatedEntry.body, updatedEntryData);
    });

    test("Should throw a 404 error with an invalid id", async () => {
      const blogs = await blogsInDb();
      const blogToDelete = blogs[0];

      await Blog.findByIdAndDelete(blogToDelete.id);

      await api
        .put(`/api/blogs/${blogToDelete.id}`)
        .send({ likes: 10 })
        .expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
