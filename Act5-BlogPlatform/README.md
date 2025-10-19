# Fullstack Blog App

A simple fullstack blog application built with **NestJS** for the backend and **React + Vite** for the frontend. Includes authentication, posts, comments, and a responsive design using **Tailwind CSS** and **Heroicons**.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Requirements](#requirements)  
- [Getting Started](#getting-started)  
- [Backend](#backend)  
- [Frontend](#frontend)  
- [Authentication](#authentication)  
- [License](#license)  

---

## Features

- User registration and login with JWT authentication
- Create, view, and list blog posts
- Add comments to posts
- Responsive frontend UI with Tailwind CSS
- Protected routes for authenticated users
- Heroicons for modern iconography
- Pagination for posts

---

## Project Structure

project-root/
├─ backend/ # NestJS backend
│ ├─ src/
│ │ ├─ users/ # User module
│ │ ├─ auth/ # Authentication module
│ │ ├─ posts/ # Posts module
│ │ └─ comments/ # Comments module
│ ├─ package.json
│ └─ .env
└─ frontend/ # React + Vite frontend
├─ src/
│ ├─ pages/ # Page components
│ ├─ components/ # Reusable components (Nav, ProtectedRoute)
│ ├─ layouts/ # Layout components (MainLayout)
│ ├─ auth/ # Auth context & hooks
│ ├─ api.js # API helper
│ ├─ App.jsx # Main app router
│ └─ index.jsx # Entry point
├─ package.json
└─ .env

---

## Requirements

- Node.js >= 18.x  
- npm >= 9.x  
- MongoDB (for backend database)

---

## Getting Started

1. Clone the repository
git clone <your-repo-url>
cd project-root

2. Install dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

---

Backend
Run the server:
cd backend
npm run start:dev
By default, the backend runs on http://localhost:3000.

Environment variables (backend/.env)
env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

---

Frontend
Run the frontend:
cd frontend
npm run dev
The frontend will run on http://localhost:5173.

Tailwind CSS
Tailwind CSS is already integrated. You can style components using utility classes. Heroicons are also installed for icons.

Authentication:
/login – Log in with email & password
/register – Register a new user

Protected routes:
/ – Post list
/posts/:id – View post
/create – Create a post