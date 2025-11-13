import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthors, fetchCategories, createBook } from "../api/api";

export default function AddBooks({ books, setBooks }) {
  const [form, setForm] = useState({
    title: "",
    authorId: "",
    categoryId: "",
    publishedDate: "",
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Load authors and categories
  useEffect(() => {
    fetchAuthors().then(res => setAuthors(res.data));
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBook(form);
      setBooks([...books, res.data]);
      navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Add New Book</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Book Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "12px", border: "1px solid #ccc" }}
        />

        <select
          value={form.authorId}
          onChange={(e) => setForm({ ...form, authorId: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "12px", border: "1px solid #ccc" }}
        >
          <option value="">Select Author</option>
          {authors.map(a => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>

        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "12px", border: "1px solid #ccc" }}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.publishedDate}
          onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
          style={{ padding: "10px", borderRadius: "12px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#4B0000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
