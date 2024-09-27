const express = require("express");
const user_routes = express();
user_routes.set("view engine", "ejs");
user_routes.set("views", "./views/users");
const nocache = require("nocache");
user_routes.use(nocache());
const userMiddleware = require("../middleware/userMiddleware");
const userController = require("../controllers/userController");

user_routes.get("/register", userController.loadRegister);
user_routes.post(
  "/register",
  userMiddleware.existUser,
  userController.insertDetails
);
user_routes.get("/login", userController.login);
user_routes.post(
  "/login",
  userMiddleware.isAuthenticate,
  userController.loginVerify
);
user_routes.get("/home",userMiddleware.isUser, userController.home);
user_routes.post("/logout", userController.logout);

module.exports = user_routes;
