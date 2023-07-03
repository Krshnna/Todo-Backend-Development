const mongoose = require("mongoose");

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then((con) => {
        console.log(`Database Connectd: ${con.connection.host}`)
    }).catch((err) => {
        console.log("Error in connecting to Databse");
    }) 
}