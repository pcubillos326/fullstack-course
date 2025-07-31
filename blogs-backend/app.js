const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const middlewares = require("./utils/middlewares");

const app = express();

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use(express.json());
app.use(middlewares.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
