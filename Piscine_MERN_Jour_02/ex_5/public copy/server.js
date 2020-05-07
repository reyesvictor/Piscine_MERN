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

app
  .get("/", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      let text = "";
      res.render("form.html", { text: text });
    }
  })
  .post("/", (req, res) => {
    MongoClient.connect(
      uri,
      { useUnifiedTopology: true },
      async (error, db) => {
        if (error) throw error;

        var dbo = db.db("mern-pool");
        const item = req.body.student;
        if (req.body.student.admin == "1" || req.body.student.admin == 1) {
          item.admin = true;
        } else {
          item.admin = true;
        }
        const collection = dbo.collection("students");

        let text = '' 
        collection.insertOne(item)
        .then(item => {
          text = "Collection saved"
          console.log('Success')
          res.render("form.html", { text: text });
        })
        .catch(err => {
          text = "Failed to save collection"
          console.log('Fail')
          res.render("form.html", { text: text });
        })
      }
    );
  });

app.listen(port, hostname, () => {
  console.log(`Running on port ${port}`);
});
