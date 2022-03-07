const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemsSchema = new Schema({
  id: Number,
  title: String,
  name: String,
  price: Number,
  description: String,
  image: String,
  featured: Boolean,
  imagePath: String,
});
module.exports = mongoose.model("item", itemsSchema, "items");
