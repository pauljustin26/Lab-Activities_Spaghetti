import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import NotesDashboard from './components/NotesDashboard';

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={user ? <NotesDashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<h1 className="text-center mt-20">404 Not Found</h1>} />
    </Routes>
  );
}
