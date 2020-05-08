const User = require("./userModel");
// const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })


exports.register = async (req, res) => {
  let { login, email, password, confirmationPassword } = req.body;
  console.log("REQ BODY ON REGISTER");
  // Check validity
  if (confirmationPassword !== password) {
    return await res.status(400).json({ error: "Passwords do not match !" });
  }

  await User.findOne({ $or: [{ login }, { email }] }).exec(async (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (user) {
      let texterror = '';
      if (user.login === login) {
        texterror = 'Login is taken';
      } else {
        texterror = 'Email is taken';
      }
      return await res.status(400).json({
        error: texterror,
      });
    }
  });

  // password = sha1(password);
  let newUser = await new User({ login, email, password });
  console.log(newUser)
  await newUser.save(async (err, success) => {
    if (err) {
      // console.log("Register ERROR", err);
      return await res.status(400).json({
        error: err,
      });
    } else {
      return await res
        .status(200)
        .json({
          message: "Succesfully registered",
        });
      // .render("welcome.html", { text: `Welcome ${login} !` });
      // return await res.status(200).json({
      //   data: "Register succesful ! You can login.",
      // });
    }
  });
};

exports.login = async (req, res) => {
  console.log("=====LOGIN=====");
  const { email, password } = req.body;
  await User.findOne({ email }).exec(async (err, user) => {
    if (err || !user) {
      return await res.status(400).json({
        error: "User does not exist",
      });
    }
    console.log("=====USER EXISTS=====");
    //if password is correct
    if (!user.authenticate(password)) {
      return await res
        .status(400)
        .json({
          error: `Bad authentification.`,
        });
    }

    //generate token
    console.log('======JWT_SECRET=====', process.env.JWT_SECRET,process.env.CACA);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { _id, name, email, type } = user

    return await res
      .status(200)
      .json({
        token,
        user: { _id, name, email, type },
        message: `Hey ${user.login}, welcome back !`,
      });
  });
};
