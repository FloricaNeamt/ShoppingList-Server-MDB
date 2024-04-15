const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const users = require("./routes/users");
const home = require("./routes/home");
const products = require("./routes/products");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

// if (!config.get("jwtPrivateKey")) {
//   console.error("Fatal ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://127.0.0.1:27017/shoppingList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
