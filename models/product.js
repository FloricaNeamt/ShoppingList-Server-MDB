const { categorySchema } = require("./category");
const Joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    quantity: { type: Number, required: true, min: 0, max: 255 },
    place: { type: String, required: true, minlength: 2, maxlength: 100 },
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    categoryId: Joi.objectId().required(),
    quantity: Joi.number().required(),
    place: Joi.string().required(),
  });
  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
