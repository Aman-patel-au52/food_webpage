const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const initDb = require("./dbconnect");
initDb();

app.use(express.static("public"));

const users = require("./models/users");
const products = require("./models/products");
const orders = require("./models/orders");

app.get("/test", async (req, res) => {
  const data = await users.find({});

  return res.send({
    message: "Response",
    data,
  });
});

// Users APIs
app.post("/user/login", async (req, res) => {
  const { firstName , lastName , email , password } = req.body;
  try {
    const result = await users.find({ firstName , lastName , email , password , userId });
    res.send({status : 'success' , msg : 'user login successfully'});
  } catch (error) {
    res.status(201).send({status : 'error' , msg : 'error while login'});
  }
});

app.post("/user/sign-up", async (req, res) => {
  const { firstName , lastName , email , password } = req.body;
  const userId = uuidv4();
  try {
    const result = await users.create({ firstName , lastName , email , password , userId});
    res.send({status : 'success' , msg : 'user signed-up successfully'});
  } catch (error) {
    res.status(201).send({status : 'error' , msg : 'error while sign-up'});
  }
});

// Orders APIs
app.get("/order/:id", async (req, res) => {
  const { orderId , userId } = req.params;
  try {
    const data = await orders.findById(userId);
    console.log(data);
    res.send({status : 'success' ,  msg : data});
  } catch (error) {
    res.status(400).send({status : 'error' , msg : 'error getting the id'});
  }
});

app.get("/order/list/:limit/:offset", async (req, res) => {});

app.post("/order/create", async (req, res) => {
  const user_order = req.body;
  try {
    const order_data = await orders.create(user_order);
    res.send({status : 'success' , msg : 'order added successfully'});
  } catch (error) {
    res.status(400).send({status : 'error' , msg : 'error while adding the order'});
  }
});

// Products APIs
app.get("/product/:id", async (req, res) => {});

app.get("/product/list/:limit/:offset", async (req, res) => {
  let { limit, offset } = req.params;
  offset = (offset - 1) * limit;

  const data = await products.find({}).skip(offset).limit(limit);

  return res.send({
    message: "Response",
    data,
  });
});

app.post("/product/create", async (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started successfully");
});
