const mongoose = require('mongoose');

async function initDb(){
    try {
        await mongoose.connect(process.env.DB_URL , {dbName : 'VelocityCuisine'});
        console.log("Connected to DB successfully");
    } catch (error) {
        console.log("error while connecting to DB");
        console.log(error)
        process.exit();
    }
    
}

module.exports = {
    initDb
}

// const mongoose = require("mongoose");
// // console.log("mongo url" , process.env.DB_URL);
// mongoose
//   .connect(process.env.DB_URL )
//   .then(() => console.log(`DB is Connected`))
//   .catch((err) => console.log(`DB is Not Connect`, err));