const express = require("express");
const admin_routes = express();
admin_routes.set("view engine", "ejs");
admin_routes.set("views", "./views/admin");
const nocache = require("nocache");
admin_routes.use(nocache());
const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/adminController");

admin_routes.get("/", adminController.adminLogin);
admin_routes.post(
  "/",
  adminMiddleware.isAuthenticate,
  adminController.adminVerify
);
admin_routes.get("/dashbord", adminController.dashbordLoad);
admin_routes.post("/adminLogout", adminController.adminLogout);
admin_routes.get("/adduser", adminController.adduser);
admin_routes.post("/adduser", adminMiddleware.adminExistUser,adminController.adminadduser);
admin_routes.get("/editpage", adminController.editPage);
admin_routes.post("/editUser", adminController.editUser);
admin_routes.get("/delete", adminController.deleteUser);
admin_routes.get("/search", adminController.loadSearch);
admin_routes.post("/search", adminController.searchUser);

module.exports = admin_routes;
