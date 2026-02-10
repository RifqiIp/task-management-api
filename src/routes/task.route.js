const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller");

router.post("/tasks", controller.createTask);
router.get("/tasks", controller.getTasks);

router.put("/tasks/:id", controller.updateTask);

module.exports = router;
