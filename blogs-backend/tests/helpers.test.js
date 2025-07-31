const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const blogs = [
    { title: "Blog 1", author: "Author 1", likes: 10 },
    { title: "Blog 2", author: "Author 2", likes: 20 },
    { title: "Blog 3", author: "Author 3", likes: 30 },
  ];

  test("of a bigger list is calculated correctly", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 60);
  });

  test("of an empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("of a single blog is the likes of that blog", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    assert.strictEqual(result, 10);
  });
});

describe("favorite blog", () => {
  const blogs = [
    { title: "Blog 1", author: "Author 1", likes: 10 },
    { title: "Blog 2", author: "Author 2", likes: 20 },
    { title: "Blog 3", author: "Author 3", likes: 30 },
    { title: "Blog 4", author: "Author 4", likes: 15 },
  ];

  test("of a bigger list is calculated correctly", () => {
    const mostLikes = { title: "Blog 3", author: "Author 3", likes: 30 };
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, mostLikes);
  });

  test("of an empty list is null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("of a single blog is the blog itself", () => {
    const blogEntry = blogs[0];
    const result = listHelper.favoriteBlog([blogEntry]);
    assert.deepStrictEqual(result, blogEntry);
  });
});

describe("most blogs", () => {
  const blogs = [
    { title: "Blog 1", author: "Author 1", likes: 10 },
    { title: "Blog 12", author: "Author 1", likes: 10 },
    { title: "Blog 2", author: "Author 2", likes: 20 },
    { title: "Blog 22", author: "Author 2", likes: 20 },
    { title: "Blog 23", author: "Author 2", likes: 20 },
    { title: "Blog 23", author: "Author 2", likes: 20 },
    { title: "Blog 3", author: "Author 3", likes: 30 },
    { title: "Blog 4", author: "Author 4", likes: 15 },
    { title: "Blog 42", author: "Author 4", likes: 15 },
    { title: "Blog 41", author: "Author 4", likes: 15 },
    { title: "Blog 44", author: "Author 4", likes: 15 },
  ];

  test("of a bigger list is calculated correctly", () => {
    const mostBlogs = { author: "Author 2", blogs: 4 };
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, mostBlogs);
  });

  test("of an empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("of a single blog is the blog itself", () => {
    const blogEntry = blogs[0];
    const result = listHelper.mostBlogs([blogEntry]);
    assert.deepStrictEqual(result, { author: "Author 1", blogs: 1 });
  });
});

describe("most likes", () => {
  const blogs = [
    { title: "Blog 1", author: "Author 1", likes: 10 },
    { title: "Blog 12", author: "Author 1", likes: 10 },
    { title: "Blog 2", author: "Author 2", likes: 20 },
    { title: "Blog 22", author: "Author 2", likes: 20 },
    { title: "Blog 23", author: "Author 2", likes: 20 },
    { title: "Blog 23", author: "Author 2", likes: 20 },
    { title: "Blog 3", author: "Author 3", likes: 30 },
    { title: "Blog 4", author: "Author 4", likes: 15 },
    { title: "Blog 42", author: "Author 4", likes: 15 },
    { title: "Blog 41", author: "Author 4", likes: 15 },
    { title: "Blog 44", author: "Author 4", likes: 15 },
  ];

  test("of a bigger list is calculated correctly", () => {
    const mostLikes = { author: "Author 2", likes: 80 };
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, mostLikes);
  });

  test("of an empty list is null", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("of a single blog is the blog itself", () => {
    const blogEntry = blogs[0];
    const result = listHelper.mostLikes([blogEntry]);
    assert.deepStrictEqual(result, { author: "Author 1", likes: 10 });
  });
});
