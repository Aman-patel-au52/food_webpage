const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productImage: Array,
  productName: String,
  productPrice: String,
  productDescription: String,
  totalItem: Number,
  dateOfListing: Object,
  userId: String,
  userName: String,
});

module.exports = mongoose.model("products", productSchema);