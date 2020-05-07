const mongoose = require("mongoose");
const sha1 = require("sha1");

const userSchema = new mongoose.Schema(
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
    password: {
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

// userSchema
//   .virtual("pwd")
//   .set((pwd) => {
//     this._password = pwd;
//     this.password = this.encryptPwd(pwd);
//   })
//   .get(() => {
//     return this._password;
//   });

// userSchema.methods = {
//   authenticate: (text) => {
//     return this.encryptPwd(text) === this.password;
//   },
//   encryptPwd: (pwd) => {
//     if (!pwd) return "";
//     try {
//       return sha1(pwd);
//     } catch (error) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
