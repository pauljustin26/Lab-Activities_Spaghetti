# Notes API + UI

A personal notes application built with NestJS (Backend), MongoDB (Database), and React + Vite (Frontend).
Users can register, log in, and manage their private notes in a secure, user-specific dashboard.

## Features

- User Authentication – Register and log in using JWT
- Notes CRUD – Create, read, update, and delete personal notes
- Private Notes – Each user's notes are accessible only to them
- NestJS RESTful API with MongoDB via Mongoose
- React + Vite frontend for a modern, responsive UI
- Context-based authentication and state management in React
- CORS-enabled backend for seamless frontend communication

```bash
📂 Project Structure
notes-fullstack/
│
├── notes-backend/             # NestJS Backend
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── jwt.strategy.ts
│   │   ├── notes/
│   │   │   ├── notes.controller.ts
│   │   │   ├── notes.service.ts
│   │   │   └── schemas/note.schema.ts
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── schemas/users.schema.ts
│   │   ├── dto/
│   │   │   └── register.dto.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                   # MongoDB connection string, JWT secret
│
├── notes-frontend/            # React (Vite) Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js         # Axios API calls
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── NotesDashboard.jsx
│   │   │   └── NoteItem.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md

Backend Setup (NestJS + MongoDB)
1️⃣ Install Dependencies
cd notes-backend
npm install


2️⃣ Configure Environment Variables
Create a .env file in notes-backend/:
MONGODB_URI=mongodb://localhost:27017/notesdb
JWT_SECRET=your_jwt_secret_here


3️⃣ Enable CORS
In src/main.ts:
app.enableCors({
  origin: 'http://localhost:5173',
});

4️⃣ Run the Server
npm run start:dev
Backend runs by default on:
http://localhost:3000

Frontend Setup (React + Vite)
1️⃣ Install Dependencies
cd ../notes-frontend
npm install


2️⃣ Run the Development Server
npm run dev
Frontend runs by default on:
http://localhost:5173

Technologies Used

Frontend
React + Vite (JSX)
Axios for API calls
Context API for authentication

Backend
NestJS
Mongoose (MongoDB)
JWT Authentication
@nestjs/config for environment variables
Database
MongoDB (Local or Atlas)

Example UI