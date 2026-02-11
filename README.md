# Task Management API

REST API sederhana untuk manajemen Task menggunakan **Node.js**, **Express**, dan **PostgreSQL**.  
Project ini dibuat sebagai latihan dan technical test dengan fokus pada **clean code**, **struktur project yang rapi**, dan **konsep backend dasar**.

---

## 🎯 Objective

Membangun REST API untuk manajemen Task dengan fitur utama:
- CRUD Task
- Filter dan pagination
- Validasi input & error handling
- Struktur project yang konsisten

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv

---

## 📁 Struktur Project

```
.
├── databases
│   └── task-management.sql
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── task.controller.js
│   ├── repositories
│   │   └── task.repo.js
│   ├── routes
│   │   └── task.route.js
│   ├── services
│   │   └── task.service.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## 🗄️ Database Schema


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


Status yang tersedia:
- `todo`
- `in_progress`
- `done`

---

## ⚙️ Environment Variable

Buat file `.env` di root project:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_anda
DB_NAME=task_management
```

---

## 🚀 Cara Menjalankan Aplikasi

1. Install dependency
```bash
npm install
```

2. Setup database
- Buat database PostgreSQL
- Jalankan file SQL di folder `databases/task-management.sql`

3. Jalankan server
```bash
npm start
```

---

## 📌 Endpoint API

### Create Task
POST `/tasks`

```json
{
  "title": "Belajar Backend",
  "description": "Belajar Node.js",
  "status": "todo"
}
```

---

### Get Tasks (Filter & Pagination)
GET `/tasks`

Query Params:
- `status` (opsional)
- `page` (default: 1)
- `limit` (default: 10)

Contoh:
```
/tasks?status=todo&page=1&limit=5
```

---

### Get Task Detail
GET `/tasks/:id`

---

### Update Task
PUT `/tasks/:id`

```json
{
  "status": "done"
}
```

---

### Delete Task
DELETE `/tasks/:id`

---

## 🧠 Arsitektur

Controller → Service → Repository → Database

---

## ✨ Next Improvement

- Authentication
- Unit test
- Docker

---

## 👤 Author

Rifqi Pratama
