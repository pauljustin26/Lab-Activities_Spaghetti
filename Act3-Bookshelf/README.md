# Bookshelf API + UI

A simple full-stack Bookshelf Application built with NestJS (Backend), MongoDB (Database), and React + Vite (Frontend).
It allows users to add, view, edit, and delete books, authors, and categories — providing a lightweight digital library system.

---

## Features

- Books CRUD – Manage books with title, author, and category
- Authors CRUD – Add and edit authors with optional bio
- Categories CRUD – Organize books into categories
- NestJS RESTful API with MongoDB via Mongoose
- React + Vite frontend for fast and modern UI
- CORS-enabled backend for local frontend communication
- Real-time UI updates after CRUD operations

---

```bash
📂 Project Structure
bookshelf-fullstack/
│
├── backend/                   # NestJS Backend
│   ├── src/
│   │   ├── authors/
│   │   ├── books/
│   │   ├── categories/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                   # MongoDB connection string
│   └── ...
│
├── frontend/                  # React (Vite) Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Authors.jsx
│   │   │   ├── Books.jsx
│   │   │   ├── Categories.jsx
│   │   │   └── NavBar.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md

---

Backend Setup (NestJS + MongoDB)

1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Configure Environment Variables
Create a .env file in the backend folder:
MONGODB_URI=mongodb://localhost:27017/bookshelf

3️⃣ Enable CORS
In src/main.ts:
app.enableCors({
  origin: 'http://localhost:5173',
});

4️⃣ Run the Server
npm run start:dev
Backend runs by default on:
http://localhost:3000

💻 Frontend Setup (React + Vite)
1️⃣ Install Dependencies
cd ../frontend
npm install

2️⃣ Run the Development Server
npm run dev
Frontend runs by default on:
http://localhost:5173


Technologies Used:
Frontend
React (Vite + JSX)
Axios for API calls

Backend
NestJS
Mongoose (MongoDB)
@nestjs/config (for environment variables)

Database
MongoDB (Local or Atlas)


Example UI:
