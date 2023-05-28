const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require ("jsonwebtoken");

const app = express();
app.use(express.json());

const initDb = require("./dbconnect");
initDb();

app.use(express.static("public"));

const menuorder = require("./routes/menuroutes");

app.use('/', menuorder);



// Users APIs
// app.post("/user/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userData = await users.findOne({
//       email,
//     });

//     if (!userData) {
//       throw { message: "Email does not exist!", statusCode: 404 };
//     }

//     const dbPassword = userData.password;

//     const isPasswordMatched = comparePassword(password, dbPassword);

//     if (!isPasswordMatched) {
//       throw { message: "Password does not matched!", statusCode: 401 };
//     }

//     const data = JSON.parse(JSON.stringify(userData));
//     delete data.password;

//     res.send({ data, message: "User login successfully", status: true });
//   } catch (error) {
//     const message = error?.message || "Error while login";
//     const statusCode = error?.statusCode || 400;
//     res.status(statusCode).send({ message, status: false });
//   }
// });

// app.post("/user/sign-up", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     const userId = uuidv4();
//     const isAlreadyRegistered = await users.findOne({ email });
//     if (isAlreadyRegistered) {
//       throw { message: "Email already exist!" };
//     }

//     const result = await users.create({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword(password),
//       userId,
//     });
//     res.send({ message: "User successfully signed-up!", status: true });
//   } catch (error) {
//     const message = error?.message || "Error while sign-up";
//     const statusCode = error?.statusCode || 400;
//     res.status(statusCode).send({ message, status: false });
//   }
// });

// // Orders APIs
// app.get("/order/:id", async (req, res) => {
//   const { orderId, userId } = req.params;
//   try {
//     const data = await orders.findById(userId);
//     console.log(data);
//     res.send({ status: "success", msg: data });
//   } catch (error) {
//     res.status(400).send({ status: "error", msg: "error getting the id" });
//   }
// });

// app.get("/order/:id", async (req, res) => {
//   const { orderId, userId } = req.params;
//   try {
//     const data = await orders.findById(userId);
//     console.log(data);
//     res.send({ status: "success", msg: data });
//   } catch (error) {
//     res.status(400).send({ status: "error", msg: "error getting the id" });
//   }
// });

// app.post("/order/create", async (req, res) => {
//   const user_order = req.body;
//   try {
//     const order_data = await orders.create(user_order);
//     res.send({ status: "success", msg: "order added successfully" });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ status: "error", msg: "error while adding the order" });
//   }
// });

// // Products APIs
// app.post("/product/create", async (req, res) => {
//   const product_details = req.body;
//   try {
//     const product_data = await products.create(product_details );
//     res.send({
//       status: success,
//       msg: "Product added successfully",
//       product_data,
//     });
//   } catch (error) {
//     res.send({ status: "error", msg: error });
//   }
// });

// app.get("/product/:id", async (req, res) => {
//   const { productId, userId } = req.params;
//   try {
//     const product_dataId = await products.findById(userId);
//     res.send({ status: "success", product_dataId });
//   } catch (error) {
//     res.send({ status: "error", msg: "error finding the product", error });
//   }
// });

// app.get("/product/list/:limit/:offset", async (req, res) => {
//   let { limit, offset } = req.params;
//   offset = (offset - 1) * limit;

//   const data = await products.find({}).skip(offset).limit(limit);

//   return res.send({
//     message: "Response",
//     data,
//   });
// });



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started successfully");
});
