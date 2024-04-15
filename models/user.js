const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
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
    minlength: 5, // Min 5 chars
    maxlength: 1024,
    validate: {
      validator: function (v) {
        // Check if password contains at least an upper, a lower letter and a number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v);
      },
      message: (props) =>
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit!",
    },
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    // isAdmin: Joi.Boolean(),
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      // .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
      .required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
