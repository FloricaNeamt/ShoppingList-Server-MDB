const Joi = require("joi");
const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
  })
);

function validateCategory(category) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(category);
}
