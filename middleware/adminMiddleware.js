const User = require("../models/user");

//for admin verification
async function isAuthenticate(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password == req.body.password) {
        if (user.isAdmin) {
          req.session.admin = req.body.email;
          res.redirect("/admin/dashbord");
        } else {
          req.flash("msg", "You Are Not An Admin");
          res.redirect("/admin/");
        }
      } else {
        req.flash("msg", "Invalid Password");
        res.redirect("/admin/");
      }
    } else {
      req.flash("msg", "invalid email");
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
async function adminExistUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.flash("msg", "user alredy exist");
      res.redirect("/admin/adduser");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  isAuthenticate,
  adminExistUser
};
