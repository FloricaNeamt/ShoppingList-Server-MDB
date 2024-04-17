const express = require("express");
const categories = require("../routes/categories");
const users = require("../routes/users");
const home = require("../routes/home");
const products = require("../routes/products");
const auth = require("../routes/auth");
const error = require("../midleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/products", products);
  app.use("/", home);
  app.use(error);
};
