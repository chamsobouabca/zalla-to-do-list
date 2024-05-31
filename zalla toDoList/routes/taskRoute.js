const express = require("express");
const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateState,
} = require("../controller/taskController");
const { protectedRoute } = require("../middleware/protectedRoute");
const route = express.Router();
route.post("/addTask", protectedRoute, addTask);
route.get("/getTasks", protectedRoute, getTasks);
route.get("/getTask/:id", protectedRoute, getTask);
route.delete("/deleteTask/:id", protectedRoute, deleteTask);
route.put("/updateTask/:id", protectedRoute, updateTask);
route.get("/updateState/:id", protectedRoute, updateState);
module.exports = route;
