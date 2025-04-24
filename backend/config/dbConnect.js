const mongoose = require("mongoose")
require("dotenv").config()
const uri = process.env.CONNECTION_STRING
const dbConnect = async () =>{
    try {
        mongoose.connect(uri)
        console.log("Db connection successful");
        
    } catch(e) {
        console.log(e.message);
    }
}

module.exports = dbConnect