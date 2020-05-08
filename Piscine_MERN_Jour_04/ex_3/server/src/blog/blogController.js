const blog = require("./blogModel");
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

  await blog.findOne({ $or: [{ login }, { email }] }).exec(async (err, blog) => {
    if (err) {
      console.log(err);
      return;
    }
    if (blog) {
      return await res.status(400).json({
        error: blog.login === login ? 'Login is taken' : 'Email is taken',
      });
    }
  });

  let newblog = await new Blog({ login, email, password });
  console.log(newblog)
  await newblog.save(async (err, success) => {
    if (err) {
      console.log("===Register ERROR===", err);
      return await res.status(400).json({
        error: err,
      });
    } else {
      return await res
        .status(200)
        .json({
          message: "Succesfully registered",
        });
    }
  });
};

exports.login = async (req, res) => {
  console.log("=====LOGIN=====");
  const { email, password } = req.body;
  await blog.findOne({ email }).exec(async (err, blog) => {
    if (err || !blog) {
      return await res.status(400).json({
        error: "blog does not exist",
      });
    }
    console.log("=====blog EXISTS=====");
    //if password is correct
    if (!blog.authenticate(password)) {
      return await res
        .status(400)
        .json({
          error: `Bad authentification.`,
        });
    }

    //generate token
    console.log('======JWT_SECRET=====', process.env.JWT_SECRET, process.env.CACA);
    const token = jwt.sign({ _id: blog._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { _id, login, email, type } = blog

    return await res
      .status(200)
      .json({
        token,
        blog: { _id, login, email, type },
        message: `Hey ${blog.login}, welcome back !`,
      });
  });
};
