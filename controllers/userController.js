const User = require("../models/user");
const bcrypt = require("bcrypt");
const hashedPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

// Ragistration page load
const loadRegister = async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/home");
    } else {
      const msg = req.flash("msg");
      res.render("register", { msg });
    }
  } catch (error) {
    console.log(error);
  }
};

// insert registration details
const insertDetails = async (req, res) => {
  try {
    const securedPassword = await hashedPassword(req.body.password);
    const user = new User({
      name: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: securedPassword,
    });
    const userData = await user.save();
    if (userData) {
      res.redirect("/login");
    } else {
      res.send("404,fail to register");
    }
  } catch (error) {
    console.log(error);
  }
};

//login page load
const login = async (req, res) => {
  try {
    console.log(req.session.user);
    
    if (req.session.user) {
      res.redirect("/home");
    } else {
      const msg = req.flash("msg");
      res.render("login", { msg });
    }
  } catch (error) {
    console.log(error);
  }
};

//login verify
const loginVerify = async (req, res) => {
  try {
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

// home page load
const home = async (req, res) => {
  try {
    if (req.session.user) {

      res.render("home",{
        username:req.session.user
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

//for logout
const logout = async (req, res) => {
  try {
    delete req.session.user;
    delete req.session.email;
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loadRegister,
  insertDetails,
  login,
  loginVerify,
  home,
  logout,
};
