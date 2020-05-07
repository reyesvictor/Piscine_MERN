const qs = require("querystring");
const express = require("express");
const assert = require("assert");
const app = express();
const port = process.env.PORT || 4242;
process.env.NODE_ENV = "development";
const hostname = "localhost";
var MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27042/";

app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (error, db) => {
    var dbo = db.db("mern-pool");
    const collection = dbo.collection("students");

    collection
      .find({ validated: "in progress" })
      .sort({ lastname: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        text = result;
        res.send(text);
        // console.log(result)
        // console.log("Success");
        // res.render("form.html", { text: text });
      });
  });
});

app.listen(port, hostname, () => {
  console.log(`Running on port ${port}`); 
});
