const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
