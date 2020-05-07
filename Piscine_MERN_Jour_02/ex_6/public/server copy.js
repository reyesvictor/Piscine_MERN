var myMERN_module = require('./myMERN_module.js')
const express = require("express")
const app = express()
const port = process.env.PORT || 4242
process.env.NODE_ENV = "development"
const hostname = "localhost"
// =============mongodb========================
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

// =============render html files================
app.set('views', __dirname + '/public/views')
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    let text = 'Welcome to the website'
    res.render('index.html', {text:text})
  }
})

app.listen(port, hostname, () => {
  console.log(`Running on port ${port}`)
})
