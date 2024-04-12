const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5, // Minim 8 caractere
      validate: {
        validator: function (v) {
          // Verificare dacă parola conține cel puțin o literă mare, o literă mică și o cifră
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v);
        },
        message: (props) =>
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit!",
      },
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    isAdmin: Joi.Boolean(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
      .required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
