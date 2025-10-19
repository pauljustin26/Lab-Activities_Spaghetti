// frontend/src/pages/PostView.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useParams } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const { token } = useAuth();

  async function load() {
    const p = await api(`/posts/${id}`);
    setPost(p);
    const c = await api(`/comments/post/${id}`);
    setComments(c.items);
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!token) return alert('Login first');
    await api('/comments', { method: 'POST', token, body: { postId: id, content } });
    setContent('');
    await load();
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!post) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Post */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          by {post.author?.username || 'Unknown'} —{' '}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-500" />
          Comments ({post.commentsCount || comments.length})
        </h3>

        <div className="space-y-4 mb-6">
          {comments.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
          {comments.map((c) => (
            <div key={c._id} className="bg-white border border-gray-100 rounded-md p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">
                <strong className="text-gray-700">{c.author?.username}</strong> —{' '}
                {new Date(c.createdAt).toLocaleString()}
              </div>
              <p className="text-gray-700">{c.content}</p>
            </div>
          ))}
        </div>

        {/* Comment form */}
        <form
          onSubmit={submitComment}
          className="flex flex-col gap-3 bg-white border border-gray-100 rounded-md p-4 shadow-sm"
        >
          <textarea
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            rows="3"
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="self-end flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
