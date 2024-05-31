const Task = require("../models/taskSchema");
const { User } = require("../models/userSchema");
const addTask = async (req, res) => {
  const { addTask } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const task = new Task({ addTask: addTask, user_id: user._id });
    await task.save();
    if (!task) {
      return res.status(400).json("task not created");
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const tasks = await Task.find({ user_id: user._id });
    return res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const task = await Task.findOne({ _id: id, user_id: user._id });
    if (!task) {
      return res.status(400).json("task not found");
    }
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { updateTask } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const task = await Task.findOne({ _id: id, user_id: user._id });
    if (!task) {
      return res.status(400).json("task not found");
    }
    task.addTask = updateTask;
    await task.save();
    if (!task) {
      return res.status(400).json("error when we save the task");
    }
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const task = await Task.findOne({ _id: id, user_id: user._id });
    if (!task) {
      return res.status(400).json("task not found");
    }
    await Task.findByIdAndDelete(id);
    return res.status(201).json("task remove successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
const updateState = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json("user not found");
    }
    const task = await Task.findOne({ _id: id, user_id: user._id });
    if (!task) {
      return res.status(400).json("task not found");
    }
    task.state = true;
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
module.exports = {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateState,
};
