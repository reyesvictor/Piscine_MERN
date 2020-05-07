const qs = require("querystring");
const express = require("express");
const app = express();
const assert = require("assert");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./src/user/userRoute");
const bodyParser = require("body-parser");
// var MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb://127.0.0.1:27042/";
app.set("views", __dirname + "/src/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(authRoutes);

//voir les routes des requetes

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

// let {nextAvailable} = require('node-port-check');

// nextAvailable(4242, '0.0.0.0').then((nextAvailablePort) => {

//     console.log('Available port:', nextAvailablePort);

//     process.exit(0);

// });
