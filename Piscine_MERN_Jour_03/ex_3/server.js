const qs = require("querystring");
const express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');
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
app.use(cookieParser())
//voir les routes des requetes
app.use(session({
  secret: 'mysecret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

mongoose
  .connect("mongodb://127.0.0.1:27042/mern-pool", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB CONNECTION FAIL :", err));

app.get("/", (req, res) => {
  let text = ''
  console.log(req.session);
  const sess = req.session;
  if ( sess.hasOwnProperty('user') && typeof sess.user === 'undefined') {
    text = `You are connected , your email is ${req.session.user.email}`
  } else {
    text = 'Homepage, you need to login'
  }

  return res.status(200).render("homepage.html", { text });
});

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Running on port ${process.env.PORT} - ${process.env.NODE_ENV}`);
});

// let {nextAvailable} = require('node-port-check');

// nextAvailable(4242, '0.0.0.0').then((nextAvailablePort) => {

//     console.log('Available port:', nextAvailablePort);

//     process.exit(0);

// });
