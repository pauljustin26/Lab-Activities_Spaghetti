import React, { useState, useEffect } from "react";
import { 
  fetchBooks, createBook, updateBook, deleteBook,
  fetchAuthors, fetchCategories
} from "../api/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", category: "" });
  const [editingId, setEditingId] = useState(null);

  // Load books, authors, categories
  const loadBooks = () => fetchBooks().then(res => setBooks(res.data));
  const loadAuthors = () => fetchAuthors().then(res => setAuthors(res.data));
  const loadCategories = () => fetchCategories().then(res => setCategories(res.data));

  useEffect(() => {
    loadBooks();
    loadAuthors();
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateBook(editingId, form).then(() => {
        setForm({ title: "", author: "", category: "" });
        setEditingId(null);
        loadBooks();
      });
    } else {
      createBook(form).then(() => {
        setForm({ title: "", author: "", category: "" });
        loadBooks();
      });
    }
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, category: book.category });
    setEditingId(book._id);
  };

  const handleDelete = (id) => deleteBook(id).then(loadBooks);

  return (
    <div>
      <h2>Bookshelf</h2>

      {/* Book Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />

        <select
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Author</option>
          {authors.map(a => (
            <option key={a._id} value={a.name}>{a.name}</option>
          ))}
        </select>

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {/* Bookshelf Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {books.map(book => (
          <div key={book._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "200px",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 5px 0" }}>{book.title}</h3>
            <p style={{ margin: "0 0 5px 0" }}><strong>Author:</strong> {book.author}</p>
            <p style={{ margin: "0 0 5px 0" }}><strong>Category:</strong> {book.category}</p>
            <button onClick={() => handleEdit(book)} style={{ marginRight: "5px" }}>Edit</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
