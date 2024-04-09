const express = require("express");
const router = express.Router();

const categories = [
  { id: 1, name: "dairy" },
  { id: 2, name: "fruits_and_vegetables" },
  { id: 3, name: "meat_and_poultry" },
  { id: 4, name: "grains_and_cereals" },
  { id: 5, name: "beverages" },
  { id: 6, name: "snacks_and_confectionery" },
  { id: 7, name: "personal_care" },
  { id: 8, name: "household_supplies" },
  { id: 9, name: "electronics" },
  { id: 10, name: "clothing_and_apparel" },
  { id: 11, name: "home_and_garden" },
];

router.get("/", (req, res) => {
  res.send(categories);
});

router.get("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");
  res.send(category);
});

function validateCategory(category) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(category);
}

router.post("/", (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = { id: categories.length + 1, name: req.body.name };
  categories.push(category);
  res.send(category);
});

router.put("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  category.name = req.body.name;
  res.send(category);
});

router.delete("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("the category with the given ID was not found");
  const index = categories.indexOf(category);
  categories.splice(index, 1);
  res.send(category);
});

module.exports = router;
