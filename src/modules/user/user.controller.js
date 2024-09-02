const messageModel = require("../../../connectionDB/models/message.model.js");
const userModel = require("../../../connectionDB/models/user.model.js");

module.exports.index = (req, res, next) => {
  res.render("index.ejs", {
    loggedIn: false,
  });
};

module.exports.register = (req, res, next) => {
  res.render("register.ejs", {
    error: req.query.error,
    loggedIn: false,
  });
};

module.exports.login = (req, res, next) => {
  res.render("login.ejs", {
    error: req.query.error,
    loggedIn: false,
  });
};

module.exports.message = async (req, res, next) => {
  const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`;
  const message = await messageModel.find({ userId: req.session.userId });
  res.render("message.ejs", {
    loggedIn: req.session.loggedIn,
    session: req.session,
    url,
    message,
  });
};
module.exports.user = (req, res, next) => {
  const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`;
  res.render("user.ejs", {
    loggedIn: req.session.loggedIn,
    session: req.session,
    url,
  });
};

module.exports.handleRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return res.redirect("/register?error=User Already Exist");
  }
  await userModel.create({
    name,
    email,
    password,
  });
  res.redirect("/login");
};

module.exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const emailExist = await userModel.findOne({ email });
  if (!emailExist || password != emailExist.password) {
    return res.redirect("/login?error=User not found or Password incorrect");
  }
  req.session.userId = emailExist._id;
  req.session.name = emailExist.name;
  req.session.loggedIn = true;
  res.redirect("/message");
};

module.exports.logOut = async (req, res, next) => {
  req.session.destroy(function (err) {
    return res.redirect("/login");
  });
};
module.exports.sendMsg = async (req, res, next) => {
  await messageModel.create({
    content: req.body.msg,
    userId: req.params.id,
  });
  res.redirect(`/user/${req.params.id}`);
};
