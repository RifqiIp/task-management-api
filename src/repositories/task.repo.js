const db = require("../config/db");

const createTask = async ({ title, description, status }) => {
  const result = await db.query(
    `
    INSERT INTO tasks (title, description, status)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [title, description, status || "todo"],
  );
  return result.rows[0];
};

const getAllTasks = async (status) => {
  if (status) {
    const result = await db.query(
      "SELECT * FROM tasks WHERE status = $1 ORDER BY created_at DESC",
      [status],
    );
    return result.rows;
  }

  const result = await db.query("SELECT * FROM tasks ORDER BY created_at DESC");

  return result.rows;
};


const getTaskById = async (id) => {
  const result = await db.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateTask = async (id, { title, description, status }) => {
  const result = await db.query(
    `
    UPDATE tasks
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      status = COALESCE($3, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    `,
    [title, description, status, id],
  );

  return result.rows[0];
};

const deleteTask = async (id) => {
  const result = await db.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [
    id,
  ]);

  return result.rows[0];
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
