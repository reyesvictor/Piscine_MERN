const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  validated: String,
  admin: Boolean,
});

module.exports = mongoose.model("Students", studentsSchema, "students");
