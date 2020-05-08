const User = require("./userModel");
const sha1 = require("sha1");

exports.register = async (req, res) => {
  let { login, email, password, confirmationPassword } = req.body;
  console.log("REQ BODY ON REGISTER");
  // Check validity
  if (confirmationPassword !== password) {
    return await res.status(400).json({ error: "Passwords do not match !" });
  }

  await User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (user) {
      console.log("user EXISTS");
      return await res.status(400).json({
        error: "Email is already taken",
      });
    }
  });

  await User.findOne({ login }).exec(async (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (user) {
      console.log("Login Already EXISTS");
      return await res.status(400).json({
        error: "Login is already taken",
      });
    }
  });

  password = sha1(password);
  let newUser = await new User({ login, email, password });

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

    //is user and same password
    console.log("=====USER EXISTS=====");
    if (user.password === sha1(password)) {
      return await res
        .status(200)
        .json({
          message: `Hey ${user.login}, welcome back !`,
        });
    } else {
      return await res
        .status(400)
        .json({
          error: `Bad authentification.`,
        });
    }
  });
};
