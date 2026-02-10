# Task Management API

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* dotenv

---

## Project Structure

```
src/
 ├─ routes/
 │   └─ task.route.js
 ├─ controllers/
 │   └─ task.controller.js
 ├─ services/
 │   └─ task.service.js
 ├─ repositories/
 │   └─ task.repo.js
 ├─ config/
 │   └─ db.js
 ├─ app.js
 └─ server.js
```

---

## Database Schema

### Enum

```sql
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done');
```

### Table

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'todo',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

Buat file `.env` di root project:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_db
PORT=3000
```

---

## How to Run

```bash
npm install
node src/server.js
```

Server akan berjalan di:

```
http://localhost:3000
```

---

## API Endpoints

### Create Task

**POST /tasks**

```json
{
  "title": "Belajar Backend",
  "description": "Node.js dan PostgreSQL",
  "status": "todo"
}
```

---

### Get All Tasks

**GET /tasks**

Optional filter:

```
GET /tasks?status=done
```

---

### Get Task by ID

**GET /tasks/:id**

---

### Update Task (Partial)

**PUT /tasks/:id**

```json
{
  "status": "in_progress"
}
```

---

### Delete Task

**DELETE /tasks/:id**

---

## Error Handling

* `400 Bad Request` → validasi gagal
* `404 Not Found` → task tidak ditemukan

---

## Notes

* Menggunakan layered architecture (Route → Controller → Service → Repository)
* Validasi dilakukan di service layer
* Repository hanya berisi query SQL

---

## Author

Rifqi Pratama
