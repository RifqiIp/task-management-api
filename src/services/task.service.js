const taskRepo = require("../repositories/task.repo");

const VALID_STATUS = ["todo", "in_progress", "done"];

const createTask = async (data) => {
  if (!data.title) {
    throw new Error("Title is required");
  }

  if (data.status && !VALID_STATUS.includes(data.status)) {
    throw new Error("Invalid status");
  }

  return taskRepo.createTask(data);
};

const getTasks = async (status) => {
  if (status && !VALID_STATUS.includes(status)) {
    throw new Error("Status tidak valid");
  }

  return await taskRepo.getAllTasks(status);
};

const updateTask = async (id, data) => {
  if (data.status && !VALID_STATUS.includes(data.status)) {
    throw new Error("Invalid status");
  }

  const updatedTask = await taskRepo.updateTask(id, data);

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
};

const deleteTask = async (id) => {
  const task = await taskRepo.deleteTask(id);

  if (!task) throw new Error("Task not found");

  return task;
};

module.exports = { createTask, updateTask, getTasks, deleteTask };
