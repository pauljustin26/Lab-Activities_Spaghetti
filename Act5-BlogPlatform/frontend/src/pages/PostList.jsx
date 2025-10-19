// frontend/src/pages/PostList.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, limit: 10, total: 0 });

  async function load(page = 1) {
    const res = await api(`/posts?page=${page}&limit=${pageInfo.limit}`);
    setPosts(res.items);
    setPageInfo({ page: res.page, limit: res.limit, total: res.total });
  }

  useEffect(() => {
    load(1);
  }, []);

  const pages = Math.ceil(pageInfo.total / pageInfo.limit) || 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Posts</h2>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* Post cards */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
        {posts.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-sm hover:shadow-md transition rounded-lg p-5 border border-gray-100"
          >
            <Link to={`/posts/${p._id}`}>
              <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                {p.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">
              by {p.author?.username || 'Unknown'} —{' '}
              {new Date(p.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700">
              {p.content.length > 150
                ? p.content.slice(0, 150) + '...'
                : p.content}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => load(i + 1)}
              disabled={pageInfo.page === i + 1}
              className={`px-3 py-1 rounded-md border ${
                pageInfo.page === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
