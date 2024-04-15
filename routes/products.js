const { Product, validate } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");
  const product = new Product({
    name: req.body.name,
    category: { _id: category._id, name: category.name },
    quantity: req.body.quantity,
    place: req.body.place,
  });
  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: { _id: category._id, name: category.name },
      quantity: req.body.quantity,
      place: req.body.place,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("the product with the given ID was not found");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

module.exports = router;
