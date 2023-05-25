// const userModel = require("../models/users");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const SECRET_KEY = "NOTESAP";

// const signup = async (req, res) => {
//   const { firstname, lastName, email, password } = req.body;
//   try {
//     const existingUser = await userModel.findOne({ email: email });
//     if (existingUser) {
//       return res.status(400).json({ message: "user already exists" });
//     }

//     //hashpassword
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await userModel.create({
//       email: email,
//       password: hashedPassword,
//       username: username,
//     });

//     //token generate

//     const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
//     res.status(201).json({ user: result, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something wrong" });
//   }
// };

// const signin =async (res, req) => {
//     const {email, password}= req.body;
//     try{
// const {email,password} = await userModel.findOne({email:email});
// if (existingUser){
//     return res.status(404).json({message:"user not found"});

    
// }
// const matchPassword = await bcrypt.compare(password, existingUser.password);
// if(!matchPassword){
//     return res.status (400).json ({message:"Invalid Credentials"});
    

// }
// const token = jwt.sign ({email:existingUser.email,id:existingUser._id},SECRET_KEY);
// res.status(201).json({user:existingUser, token:token});

//     }catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something wrong" });
// }
// }
// module.exports = (signup, signin);



const userModel = require("../models/users");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "NOTESAP";

const signup = async (req, res) => {
  const { firstname, lastName, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      throw { message: "User already exists" ,statusCode: 400 };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    // Generate token
    // const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    const message = error?.message || "Error while Signup";
    const statusCode = error?.statusCode || 400;
    res.status(statusCode).send({ message, status: false });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      throw res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      throw res.status(400).json({ message: "Invalid credentials" });
    }

    // // // const token = jwt.sign(
    // // //   { email: existingUser.email, id: existingUser._id },
    // // //   SECRET_KEY
    // // );
    // res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    const message = error?.message || "Error while Signin";
    const statusCode = error?.statusCode || 500;
    res.status(statusCode).send({ message, status: false });
  }
};

module.exports = { signup, signin };



