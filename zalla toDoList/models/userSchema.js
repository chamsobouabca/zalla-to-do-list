const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const adminModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
adminModel.methods.generateHashPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(this.password, salt);
};
adminModel.methods.comparePassword = async function (enterPassword) {
  return bcrypt.compare(enterPassword, this.password);
};
adminModel.methods.genToken = function () {
  const token = jwt.sign({ token: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
  return token;
};
adminModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await this.generateHashPassword();
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", adminModel);
module.exports = { User };
