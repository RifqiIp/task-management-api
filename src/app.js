const express = require("express");
const app = express();
const taskRoutes = require("./routes/task.route");

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
