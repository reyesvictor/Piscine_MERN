const User = require("./userModel");
const sha1 = require("sha1");

exports.register = async (req, res) => {
  let { login, email, password, confirmationPassword } = req.body;
  console.log("REQ BODY ON REGISTER");
  // Check validity
  if (confirmationPassword !== password) {
    return await res.status(400).json({ data: "Passwords do not match !" });
  }

  await User.findOne({ email }).exec(async (err, user) => {
    if (user) {
      console.log("user EXISTS");
      return await res.status(400).json({
        error: "Email is already taken",
      });
    }
  });

  await User.findOne({ login }).exec(async (err, user) => {
    console.log("USER========LOGIN=========", user.login);
    if (user) {
      console.log("user EXISTS");
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
        .render("welcome.html", { text: `Welcome ${login} !` });
      // return await res.status(200).json({
      //   data: "Register succesful ! You can login.",
      // });
    }
  });
};

exports.login = async (req, res) => {
  console.log("=====LOGIN=====");

  const { email, password } = req.body;

  User.findOne({ email }).exec(async (err, user) => {
    if (err || !user) {
      return await res.status(400).json({
        error: "User does not exist",
      });
    }
    //is user and same password
    console.log("=====USER EXISTS=====");
    if (user.password === sha1(password)) {
      console.log("=====AUTHENTIFICATION OK=====");
      req.session.user = 1;
      console.log(req.session.user);
      return await res
        .status(200)
        .render("welcome.html", { text: `Welcome ${user.login} !` });
      // return await res.status(200).json({
      //   message: `Welcome ${user.login} !`
      // });
    } else {
      return await res.status(400).json({
        message: `Bad authentification.`,
      });
    }
  });
};
