const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { User } = require("./userSchema");
const taskModel = new mongoose.Schema({
  addTask: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Task", taskModel);
