const express = require("express");
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27042";
const app = express();
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, options, (error)=>{
  if (error) {
    console.log("Connection failed.");
  } else {
    console.log("Connection succesful.");
  }
});

const port = process.env.PORT || 4242;
process.env.NODE_ENV = "development";
const hostname = "localhost";

app.get("/", (request, response) => {
  if (process.env.NODE_ENV === "development") {
    response.send(
      `Welcome to my NODEMON API in delevelopment mode ! Hostname is ${hostname}`
    );
  }
});

app.listen(port, hostname, () => {
  console.log(`Running on port ${port}`);
});
