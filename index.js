const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());

const initDb = require("./dbconnect");
initDb();

app.use(express.static("public"));

const menuorder = require("./routes/menuroutes");

app.use('/', menuorder);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started successfully");
});
