const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productImage: Array,
  productName: String,
  productPrice: String,
  productDescription: String,
  totalItem: Number,
  userId: String,
  cartId: String,
});

module.exports = mongoose.model("order", orderSchema);