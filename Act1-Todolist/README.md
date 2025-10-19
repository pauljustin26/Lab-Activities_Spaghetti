# Activity 1 — To-Do List API + UI

A simple full-stack To-Do List Application built with NestJS (Backend), React + Vite (Frontend), and MongoDB for data persistence.
It allows users to create, update, delete, and mark tasks as complete, with all CRUD operations connected to a RESTful backend API.

## Features

- Create, update, and delete tasks
- View all active and completed tasks
- Update task titles or mark them as completed/incomplete
- Organized into Active and Completed categories
- Persistent storage using MongoDB
- REST API documented using Swagger UI
- Built with React (Vite) for a fast and responsive interface

---

```bash
📂 Project Structure
todo-app/
│
├── backend/              # NestJS Backend
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   ├── schemas/task.schema.ts
│   │   │   └── dto/create-task.dto.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env              # MongoDB connection string
│   └── package.json
│
├── frontend/             # React (Vite) Frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── api/api.js
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
└── README.md

Backend Setup (NestJS + MongoDB)

1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Configure Environment Variables
Create a .env file inside the backend folder:
MONGO_URI=mongodb://localhost:27017/todo-app

3️⃣ Enable CORS (for React frontend)
Make sure main.ts includes:
app.enableCors({
  origin: 'http://localhost:5173',
});

4️⃣ Run the Backend Server
npm run start:dev


Backend runs by default on:
http://localhost:3000

Swagger UI is available at:
http://localhost:3000/api

Frontend Setup (React + Vite)

1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Run the Development Server
npm run dev


Frontend runs by default on:
http://localhost:5173



Technologies Used:
Frontend
React (Vite + JSX)
Axios for API requests
CSS / Tailwind (optional) for styling

Backend
NestJS
MongoDB + Mongoose
Swagger for API documentation
dotenv for environment management

Example UI:
