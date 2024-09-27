const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userManagementSystem");
const express = require("express");
const app = express();

const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const randomstring = require('randomstring');
const secretKey = randomstring.generate(10);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

//for user route
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

//for admin route
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on the port ${port}`);
});
