// notes-frontend/src/components/Register.jsx
import { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import noteImage from '../assets/images/notetaking.jpg';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex items-center justify-start pl-20 min-h-screen bg-white-100 gap-40">

      <div className="w-1/2 hidden md:block">
        <img
          src={noteImage}
          alt="Register illustration"
          className="h-full w-full object-cover rounded-l-3xl"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border-3 border-blue-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {/* Username field */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
            className="peer w-full p-3 border-3 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label
            htmlFor="username"
            className={`absolute left-3 text-gray-400 text-base transition-all
              ${username ? 'top-0.5 text-sm text-blue-500' : 'top-3 text-base text-gray-400'}`}
          >
            Username
          </label>
        </div>

        {/* Email field */}
        <div className="relative w-full mb-4">
          <input
            type="email"
            id="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full p-3 border-3 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-3 text-gray-400 text-base transition-all
              ${email ? 'top-0.5 text-sm text-blue-500' : 'top-3 text-base text-gray-400'}`}
          >
            Email
          </label>
        </div>

        {/* Password field */}
        <div className="relative w-full mb-6">
          <input
            type="password"
            id="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full p-3 border-3 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-3 text-gray-400 text-base transition-all
              ${password ? 'top-0.5 text-sm text-blue-500' : 'top-3 text-base text-gray-400'}`}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-3 rounded-full font-medium hover:bg-blue-600 active:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
