const User = require("../models/user");
const bcrypt = require("bcrypt");
const hashedPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};
//admin login page load
const adminLogin = async (req, res) => {
  try {
    if (req.session.admin) {
      res.redirect("/admin/dashbord");
    } else {
      const msg = req.flash("msg");
      res.render("login", { msg });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin verification
const adminVerify = async (req, res) => {
  try {
    res.redirect("/admin/dashbord");
  } catch (error) {
    console.log(error);
  }
};

//admin dashbord load
const dashbordLoad = async (req, res) => {
  try {
    const usersData = await User.find({ isAdmin: 0 });
    if (req.session.admin) {
      res.render("dashbord", { users: usersData });
    } else {
      res.redirect("/admin/");
    }
  } catch (error) {
    console.log(error);
  }
};

//admin logout
const adminLogout = async (req, res) => {
  try {
    delete req.session.admin;
    res.redirect("/admin/");
  } catch (error) {
    console.log(error);
  }
};

// load adduser page
const adduser = async (req, res) => {
  try {    
    if (req.session.admin) {
      const msg = req.flash("msg");
      res.render("adduser",{msg});
    } else {
      res.send("you are not admin");
    }
  } catch (error) {
    console.log(error);
  }
};

//load edit page
const editPage = async (req, res) => {
  try {
    const userId = req.query.id;

    const usersData = await User.findById({ _id: userId });
    if (req.session.admin) {
      res.render("editpage", { users: usersData });
    } else {
      res.send("you are not admin");
    }
  } catch (error) {
    console.log(error);
  }
};

//for edit the user
const editUser = async (req, res) => {
  try {
    const { userId, name, email, mobile, password } = req.body;
    const usersData = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { name: name, email: email, password: password, mobile: mobile } }
    );
    if (req.session.admin) {
      res.redirect("/admin/dashbord");
    } else {
      res.send("you are not admin");
    }
  } catch (error) {
    console.log(error);
  }
};

//for delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const userData = await User.findByIdAndDelete({ _id: userId });
    return res.redirect("/admin/dashbord");
  } catch (error) {
    console.log(error);
  }
};

// load search page
const loadSearch = async (req, res) => {
  try {
    if (req.session.admin) {
      const usersData = req.session.details;
      req.session.details = "";
      const searchName=req.session.search;
      req.session.search = "";
      res.render("search", { users: usersData,searchName });
    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error);
  }
};

//to search
const searchUser = async (req, res) => {
  try {
    const userName = req.body.search;
    const regexPattern = new RegExp(`^${userName}`, "i");
    const usersData = await User.find({
      $and: [{ name: { $regex: regexPattern } }, { isAdmin: 0 }],
    });
    console.log(usersData);
    
    req.session.details = usersData;
    req.session.search = userName;
    res.redirect("/admin/search");
  } catch (error) {
    console.log(error);
  }
};

// add the user by admin
const adminadduser = async (req, res) => {
  try {
    const securedPassword = await hashedPassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: securedPassword,
    });
    const userData = await user.save();
    if (userData) {
      res.redirect("/admin/dashbord");
    } else {
      res.send("404,fail to add user");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminLogin,
  adminVerify,
  dashbordLoad,
  adminLogout,
  adduser,
  adminadduser,
  editPage,
  editUser,
  deleteUser,
  loadSearch,
  searchUser,
};
