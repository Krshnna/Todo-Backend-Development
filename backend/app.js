const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
require("dotenv").config({path: "backend/config/config.env"});


const todo = require("./routes/todo");
const user = require("./routes/user");

app.use("/api/v1", todo);
app.use("/api/v1", user);



module.exports = app;