// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { api } from '../api/api';
import useAuth from '../auth/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api('/auth/login', { method: 'POST', body: form });
      login(res.user, res.access_token);
      navigate('/');
    } catch (e) {
      setErr(e.message || JSON.stringify(e));
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 outline-none text-gray-700"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="flex-1 outline-none text-gray-700"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* Error message */}
        {err && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {err}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
