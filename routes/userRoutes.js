const express = reqire("express");

const {signup,signin} = require("../controllers/userControllers")
const userRouter = express.userRouter();

userRouter.post ("/signup",signup);

userRouter.post("/signin",signin);

module.exports = {signup,signin};