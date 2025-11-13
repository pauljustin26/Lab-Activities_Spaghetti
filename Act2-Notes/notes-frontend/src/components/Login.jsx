// notes-frontend/src/components/Login.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import noteImage from '../assets/images/notetaking.jpg';


export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-start pl-20 min-h-screen bg-white-100 gap-40">
       <div className="w-1/2 hidden md:block">
        <img
            src={noteImage}
          alt="Login illustration"
          className="h-full w-full object-cover rounded-l-3xl"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border-3 border-blue-200"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {/* Email field */}
        <div className="relative w-full mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full p-3 border-3 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-3 text-gray-400 text-base transition-all
              ${email ? 'top-0.5 text-sm text-blue-500' : 'top-3 text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-sm peer-focus:text-blue-500'}`}
          >
            Email
          </label>
        </div>
        {/* Password field */}
        <div className="relative w-full mb-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full p-3 border-3 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-3 text-gray-400 text-base transition-all
              ${password ? 'top-0.5 text-sm text-blue-500' : 'top-3 text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-sm peer-focus:text-blue-500'}`}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-3 rounded-full font-medium hover:bg-blue-600 active:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
