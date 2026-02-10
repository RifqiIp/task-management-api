const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres123",
  database: "task_db",
  port: 5432,
});

// pool.on("connect", () => {
//   console.log("✅ Database connected");
// });

// pool.on("error", (err) => {
//   console.error("❌ Database error", err);
//   process.exit(1);
// });

module.exports = pool;
