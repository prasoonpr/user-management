const User = require("../models/user");
const bcrypt = require("bcrypt");

//for checking the user is alredy exist or not
async function existUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.flash("msg", "user alredy exist");
      res.redirect("/register");
    } else {
      req.flash("msg", "succesfully registered");
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

//for authentication
async function isAuthenticate(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const truePass =await bcrypt.compare(req.body.password,user.password);
     
      
      if (truePass) {
        req.session.user = user.name;
        req.session.email = user.email;
        res.redirect("/home");
      } else {
        req.flash("msg", "invalid password");
        res.redirect("/login");
      }
    } else {
      req.flash("msg", "invalid email");
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
async function isUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.session.email });
    if (user) {
      next();

    } else {
    delete req.session.user;
    req.flash("msg", "you were banned by admin");
      res.redirect("/login");
      
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  existUser,
  isAuthenticate,
  isUser
};
