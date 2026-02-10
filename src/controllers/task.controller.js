const taskService = require("../services/task.service");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const tasks = await taskService.getTasks(status);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(id, req.body);

    res.json(updatedTask);
  } catch (err) {
    if (err.message === "Task not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await taskService.deleteTask(id);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
