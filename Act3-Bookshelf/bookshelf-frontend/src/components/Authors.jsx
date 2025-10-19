import React, { useState, useEffect } from "react";
import { fetchAuthors, createAuthor, updateAuthor, deleteAuthor } from "../api/api";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [editingId, setEditingId] = useState(null);

  const loadAuthors = () => fetchAuthors().then(res => setAuthors(res.data));

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAuthor(editingId, form).then(() => {
        setForm({ name: "", bio: "" });
        setEditingId(null);
        loadAuthors();
      });
    } else {
      createAuthor(form).then(() => {
        setForm({ name: "", bio: "" });
        loadAuthors();
      });
    }
  };

  const handleEdit = (author) => {
    setForm({ name: author.name, bio: author.bio || "" });
    setEditingId(author._id);
  };

  const handleDelete = (id) => deleteAuthor(id).then(loadAuthors);

  return (
    <div>
      <h2>Authors</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Bio"
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {authors.map(author => (
          <li key={author._id}>
            {author.name} {author.bio && `- ${author.bio}`}
            <button onClick={() => handleEdit(author)}>Edit</button>
            <button onClick={() => handleDelete(author._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
