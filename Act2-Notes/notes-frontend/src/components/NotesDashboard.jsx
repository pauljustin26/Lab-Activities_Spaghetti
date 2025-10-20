import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function NotesDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 401) logout();
      alert('Failed to fetch notes');
    }
  };

  // Add a new note
  const addNote = async () => {
    if (!newTitle) return alert('Title is required');
    try {
      const res = await api.post('/notes', { title: newTitle, content: newContent });
      setNotes(prev => [res.data, ...prev]);
      setNewTitle('');
      setNewContent('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add note');
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete note');
    }
  };

  // Inline update
  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const res = await api.put(`/notes/${id}`, { title: updatedTitle, content: updatedContent });
      setNotes(prev => prev.map(n => (n._id === id ? res.data : n)));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to update note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <button 
          onClick={logout} 
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add New Note */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Content"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addNote}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Notes List */}
      <ul className="space-y-3">
        {notes.map(note => (
          <NoteItem 
            key={note._id} 
            note={note} 
            onDelete={deleteNote} 
            onUpdate={updateNote} 
          />
        ))}
      </ul>
    </div>
  );
}

// NoteItem Component
function NoteItem({ note, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || '');

  const save = () => {
    onUpdate(note._id, title, content);
    setEditing(false);
  };

  const cancel = () => {
    setTitle(note.title);
    setContent(note.content || '');
    setEditing(false);
  };

  return (
    <li className="bg-white p-4 rounded shadow flex justify-between items-start">
      <div className="flex-1">
        {editing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : (
          <>
            <strong>{note.title}</strong>: {note.content}
          </>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        {editing ? (
          <>
            <button 
              onClick={save} 
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button 
              onClick={cancel} 
              className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(note._id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
