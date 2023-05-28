const { Router } = require("express");

const {
  login,
  signup,
  ordercreate,
  orderId,
  orderlist,
  productcreate,
  productId,
  productlist,
} = require("../controllers/menu");

const menuorder = Router();

// Users APIs
menuorder.post("/user/login", login);

menuorder.post("/user/sign-up", signup);

// Orders APIs
menuorder.post("/order/create", ordercreate);

menuorder.get("/order/:id", orderId);

menuorder.get("/order/list/:userId/:limit/:offset", orderlist);

// Products APIs
menuorder.post("/product/create", productcreate);

menuorder.get("/product/:productId", productId);

menuorder.get("/product/list/:limit/:offset", productlist);

// exports
module.exports = menuorder;
