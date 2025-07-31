const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const middlewares = require("./utils/middlewares");
const { MONGODB_URI } = require("./utils/config");

const app = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(express.json());
app.use(middlewares.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
