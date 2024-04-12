const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const categorySchema = new mongoose.Schema({
  name: String,
  // author: String,
  // tag: [String],
  // date: { type: Date, default: Date.now },
  // isPublished: Boolean,
});

const Category = mongoose.model("Category", categorySchema);

async function createCategory() {
  const categeory = new Category({
    name: "Dairy",
  });

  const result = await categeory.save();
  console.log(result);
}

async function getCategories() {
  const categories = await Category.find()
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1 });
  console.log(categories);
}
// createCategory();
getCategories();
