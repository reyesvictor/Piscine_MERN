const qs = require("querystring");
const express = require("express");
const app = express();
const cors = require('cors')
const assert = require("assert");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const authRoutes = require("./src/user/userRoute");
const bodyParser = require("body-parser");
// var MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb://127.0.0.1:27042/";
app.use(cors()) 
app.set("views", __dirname + "/src/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(authRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27042/mern-pool", { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB CONNECTION FAIL :", err));

app.get("/", (request, res) => {
  if (process.env.NODE_ENV === "development") {
    res.send(
      `Welcome to my NODEMON API in delevelopment mode ! Hostname is ${hostname}`
    );
  }
});

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Running on port ${process.env.PORT} - ${process.env.NODE_ENV}`);
});

