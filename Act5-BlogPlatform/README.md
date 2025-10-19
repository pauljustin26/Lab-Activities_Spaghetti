# Fullstack Blog App

A modern fullstack blogging platform built with NestJS (Backend), React + Vite (Frontend), and MongoDB.
It includes user authentication, blog post management, comments, and a responsive design using Tailwind CSS and Heroicons.

## Features

User registration and login with JWT authentication
Create, view, and list blog posts
Add comments to posts
Protected routes for authenticated users
Responsive UI built with Tailwind CSS
Modern icons using Heroicons
Pagination for post listings

---

```bash
📂 Project Structure
│
├── backend/                      # NestJS Backend
│   ├── src/
│   │   ├── users/                # User module
│   │   ├── auth/                 # Authentication module
│   │   ├── posts/                # Posts module
│   │   └── comments/             # Comments module
│   ├── package.json
│   └── .env                      # MongoDB + JWT configuration
│
└── frontend/                     # React + Vite Frontend
    ├── src/
    │   ├── pages/                # Page components (Home, Create, PostView)
    │   ├── components/           # Reusable components (NavBar, ProtectedRoute)
    │   ├── layouts/              # Layout components (MainLayout)
    │   ├── auth/                 # Auth context & custom hooks
    │   ├── api.js                # Axios-based API helper
    │   ├── App.jsx               # Main app router
    │   └── index.jsx             # Entry point
    ├── package.json
    └── .env

Backend Setup (NestJS)
Node.js ≥ 18.x
npm ≥ 9.x
MongoDB (local or Atlas cloud instance)

Getting Started

1️⃣ Clone the Repository
git clone <your-repo-url>
cd project-root

2️⃣ Install Dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

Backend Setup (NestJS)
Run the Backend Server:
cd backend
npm run start:dev


By default, the backend runs at:
http://localhost:3000

Environment Variables (backend/.env)
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret_here

Frontend Setup (React + Vite + Tailwind)
Run the Frontend:
cd frontend
npm run dev


Frontend runs by default on:
👉 http://localhost:5173

Tailwind CSS & Heroicons

Tailwind CSS is already configured.
You can style components using utility classes (e.g., bg-gray-100, text-blue-600).
Heroicons are included for modern icon design.

Authentication Routes
Route	Description
/register	Register a new user
/login	Log in with email & password

Once authenticated, users can access protected routes.


Technologies Used
Frontend
React (Vite + JSX)
Tailwind CSS
Heroicons
Axios
React Router DOM

Backend
NestJS
MongoDB + Mongoose
JWT (Authentication)
Passport.js
dotenv for configuration

Example UI
