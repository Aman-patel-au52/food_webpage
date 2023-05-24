const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword } = require("../utils");

const users = require("../models/users");
const products = require("../models/products");
const orders = require("../models/orders");


// user login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // console.log(typeof firstName)
      const userData = await users.findOne({
        email
      });
  
      if (!userData) {
        throw { message: "Email does not exist!", statusCode: 404 };
      }
  
      const dbPassword = userData.password;
  
      const isPasswordMatched = comparePassword(password, dbPassword);
  
      if (!isPasswordMatched) {
        throw { message: "Password does not matched!", statusCode: 401 };
      }
  
      const data = JSON.parse(JSON.stringify(userData));
      delete data.password;
  
      res.send({ data, message: "User login successfully", status: true });
    } catch (error) {
      const message = error?.message || "Error while login";
      const statusCode = error?.statusCode || 400;
      res.status(statusCode).send({ message, status: false });
    }
  }

// user signup
const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      // console.log(typeof firstName)
      const userId = uuidv4();
      const isAlreadyRegistered = await users.findOne({ email });
      if (isAlreadyRegistered) {
        throw { message: "Email already exist!" };
      }
  
      const result = await users.create({
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        userId,
      });
      res.send({ message: "User successfully signed-up!", status: true });
    } catch (error) {
      const message = error?.message || "Error while sign-up";
      const statusCode = error?.statusCode || 400;
      res.status(statusCode).send({ message, status: false });
    }
  }

// creating order
const ordercreate = async (req, res) => {
    const user_order = req.body;
    try {
      const order_data = await orders.create(user_order);
      res.send({ status: "success", msg: "order added successfully" });
    } catch (error) {
      res
        .status(400)
        .send({ status: "error", msg: "error while adding the order" });
    }
  }

// order id
const orderId = async (req, res) => {
    const { orderId, userId } = req.params;
    try {
      const data = await orders.findOne({userId});
      console.log(data);
      res.send({ status: "success", msg: data });
    } catch (error) {
      res.status(400).send({ status: "error", msg: "error getting the id" });
    }
  }

// order list limit
const orderlist = async (req, res) => {
    let { limit , offset } = req.params;
    offset = (offset - 1) * limit ;
    try {
      const order_data = await orders.find({}).skip(offset).limit(limit);
      res.send({message: "Response", order_data });
    } catch (error) {
      res.send({status : 'error' , msg : error});
    }
  }

// product create
const productcreate = async (req, res) => {
    const product_details = req.body;
    try {
      const product_data = await products.create(product_details);
      res.send({status : success , msg : 'Product added successfully' , product_data});
    } catch (error) {
      res.send({status : 'error' , msg : error});
    }
  }

// product id
const productId = async (req, res) => {
    const { productId } = req.params;
    try {
      const product_dataId = await products.findOne({productId});
      res.send({status : 'success' , product_dataId});
    } catch (error) {
      res.send({status : 'error' , msg : 'error finding the product' , error});
    }
  }

// product list limit
const productlist = async (req, res) => {
    let { limit, offset } = req.params;
    offset = (offset - 1) * limit;
  
    const data = await products.find({}).skip(offset).limit(limit);
  
    return res.send({
      message: "Response",
      data,
    });
  }

// exports
module.exports = {
    login,
    signup,
    ordercreate,
    orderId,
    orderlist,
    productcreate,
    productId,
    productlist
}
