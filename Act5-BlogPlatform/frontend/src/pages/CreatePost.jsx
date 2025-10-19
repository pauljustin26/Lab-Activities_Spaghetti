// frontend/src/pages/CreatePost.jsx
import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const { token } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!token) return alert('Login first');
    const post = await api('/posts', { method: 'POST', token, body: form });
    navigate(`/posts/${post._id}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded-xl p-8 border border-gray-100 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <PencilSquareIcon className="w-6 h-6 text-blue-600" />
          Create New Post
        </h2>

        <input
          type="text"
          placeholder="Post title"
          className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Write your content here..."
          rows="8"
          className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
