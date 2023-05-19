const express = require('express');
require('dotenv').config();
const { initDb } = require('./dbconnect');
const app = express();

app.use(express.json());
initDb();

app.use(express.static('public'));

app.post('/Placeorders' , (req , res)=> {

});

app.get('/Placeorders/:orderId' , (req , res)=> {
});

app.delete('/placeorders/:orderId' , (req , res)=> {

})


app.listen(8000 , ()=>{
    console.log("Server started successfully");
})