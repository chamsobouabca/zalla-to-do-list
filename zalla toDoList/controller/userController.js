const { User } = require("../models/userSchema");
//register
const register = async (req, res) => {
  console.log("entered registery function");
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const user = new User({ name, email, password });
    await user.save();
    if (!user) {
      return res.status(500).json("error when we save the user");
    }
    return res
      .status(201)
      .cookie("toDoList", user.genToken(), {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json(`user created successfully ${user}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("admin not found ");
    }
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(400).json("password not correct");
    }
    console.log(user)
    return res
      .status(201)
      .cookie("toDoList", user.genToken(), {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json(`welcome again ${user}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
module.exports = { register, login };
