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

const getAllTasks = async ({ status, page, limit }) => {
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM tasks";
  let countQuery = "SELECT COUNT(*) FROM tasks";
  let params = [];

  if (status) {
    query += " WHERE status = $1";
    countQuery += " WHERE status = $1";
    params.push(status);
  }

  query += " ORDER BY created_at DESC LIMIT $2 OFFSET $3";
  params.push(limit, offset);

  const dataResult = await db.query(query, params);
  const countResult = await db.query(countQuery, status ? [status] : []);

  const totalItems = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: dataResult.rows,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
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
