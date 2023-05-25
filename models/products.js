const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productImage: Array,
  productName: String,
  productPrice: String,
  productDescription: String,
  totalItem: Number,
  userId: String,
  productId: {
    type : String,
    required : true
  },
});

module.exports = mongoose.model("products", productSchema);
