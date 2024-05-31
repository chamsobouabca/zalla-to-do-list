const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const protectedRoute = async (req, res, next) => {
  console.log("inside protected");
  console.log(req.cookies)
  const token = req.cookies.toDoList;
  console.log(token);
  if (!token) {
    return res.status(400).json("Unauthorize");
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(verify);
  if (!verify) {
    return res.status(400).json("Unauthorize");
  }

  try {
    const user = await User.findOne({ _id: verify.token });
    console.log(user);
    if (!user) {
      return res.status(400).json("user not found when we verify the token ");
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the cookie server");
  }
};
module.exports = { protectedRoute };
