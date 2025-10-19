// frontend/src/components/Nav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left - logo / home */}
        <Link
          to="/"
          className="text-2xl font-semibold text-blue-600 hover:text-blue-700"
        >
          MyBlog
        </Link>

        {/* Right - user actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
