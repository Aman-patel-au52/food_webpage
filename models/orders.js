const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderPrice: String,
  totalItem: Number,
  productId: String,
  userId: String,
  orderId: String,
});

module.exports = mongoose.model("order", orderSchema);
