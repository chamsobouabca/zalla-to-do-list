const { register, login } = require("../controller/userController");
const { protectedRoute } = require("../middleware/protectedRoute");
const express = require("express");
const route = express.Router();
route.post("/register", register);
route.post("/login", login);
route.get("/pro", protectedRoute, (req, res) => {
  console.log(req.user);
});
module.exports = route;
