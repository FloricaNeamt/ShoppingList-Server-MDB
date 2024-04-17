module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

module.exports.greet = function (name) {
  return "Welcome " + name;
};

module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required.");

  return { id: new Date().getTime(), username: username };
};

module.exports.fizzBuzz = function (input) {
  if (typeof input !== "number") throw new Error("Input should be a number.");

  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";
  if (input % 3 === 0) return "Fizz";
  if (input % 5 === 0) return "Buzz";
};

const db = require("./db");
module.exports.applyDiscout = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  if (customer.points > 0) order.totalPrice *= 0.9;
};

const mail = require("./mail");
module.exports.notifyCustomer = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  mail.send(customer.email, "Your order was placed successfully.");
};
