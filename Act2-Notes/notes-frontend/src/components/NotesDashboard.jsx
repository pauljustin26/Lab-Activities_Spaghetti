// notes-frontend/src/components/NotesDashboard.jsx
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function NotesDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editing, setEditing] = useState(false);

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

  const addNote = async () => {
    if (!newTitle) return alert('Title is required');
    try {
      const res = await api.post('/notes', { title: newTitle, content: newContent });
      
      // Add the new note to the list
      setNotes(prev => [res.data, ...prev]);
  
      // Open the newly added note
      setSelectedNoteId(res.data._id);
  
      // Reset modal
      setAdding(false);
      setNewTitle('');
      setNewContent('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
      if (selectedNoteId === id) setSelectedNoteId(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete note');
    }
  };

  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const res = await api.put(`/notes/${id}`, { title: updatedTitle, content: updatedContent });
      setNotes(prev => prev.map(n => (n._id === id ? res.data : n)));
      setEditing(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to update note');
    }
  };


  const selectedNote = notes.find(n => n._id === selectedNoteId);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-90 bg-white border-r border-gray-300 p-6 flex flex-col">
        <h1 className="text-6xl font-bold mb-6">Notes</h1>

        <button
          onClick={() => { setAdding(true); setSelectedNoteId(null); }}
          className="bg-white border-2 border-blue-500 text-black hover:bg-blue-500 hover:text-white px-4 py-2 rounded-2xl transition-colors duration-300 mb-4"        >
          + Add Note
        </button>

        <div className="flex-1 overflow-y-auto">
          {notes.map(note => (
            <div
              key={note._id}
              onClick={() => { setSelectedNoteId(note._id); setAdding(false); }}
              className={`p-3 rounded-2xl mb-2 cursor-pointer transition 
                ${selectedNoteId === note._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              {note.title}
            </div>
          ))}
        </div>

        <button 
          onClick={logout} 
          className="mt-4 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-2xl transition-colors duration-300"        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 transition-all duration-300">

        {/* Add or view note */}
        {!selectedNote && !adding && (
          <div className="text-gray-500 text-center mt-20 text-lg">Select a note from the sidebar or add a new note</div>
        )}

        {/* New note modal */}
        {adding && (
          <div className="bg-white p-6 rounded-3xl shadow-lg max-w-3xl mx-auto transition-all duration-500">
            <h2 className="text-2xl font-bold mb-4">New Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
            <div className="flex gap-2">
            <button
              onClick={addNote}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Save
            </button>
              <button
                onClick={() => setAdding(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* View/Edit selected note */}
        {selectedNote && !adding && (
          <div className="bg-yellow-100 p-6 rounded-3xl border-2 border-yellow-300 shadow-lg max-w-full mx-auto transition-all duration-500">
            <button
              onClick={() => setSelectedNoteId(null)}
              className="mb-4 text-blue-500 hover:underline"
            >
              &larr; Back
            </button>

            {editing ? (
              <>
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={e => setSelectedNoteId(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={selectedNote.content}
                  onChange={e => setSelectedNoteId(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateNote(selectedNote._id, selectedNote.title, selectedNote.content)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-3">{selectedNote.title}</h3>
                <p className="mb-4">{selectedNote.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(selectedNote._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
