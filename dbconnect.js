const mongoose = require("mongoose");

async function initDb() {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: "food_App" });
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("error while connecting to DB");
    console.log(error);
    process.exit(1);
  }
}

module.exports = initDb;
