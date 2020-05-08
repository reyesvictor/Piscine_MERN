const mongoose = require("mongoose");
const sha1 = require("sha1");

const blogSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      min: 5,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    type:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

blogSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.hash_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

blogSchema.methods = {
  authenticate: function (text) {
    return this.encryptPassword(text) === this.hash_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return sha1(password);
    } catch (error) {
      console.log(error)
      return "";
    }
  },
};

module.exports = mongoose.model("Blog", blogSchema);
