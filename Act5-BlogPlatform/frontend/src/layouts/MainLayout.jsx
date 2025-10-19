// frontend/src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Nav />
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
}
