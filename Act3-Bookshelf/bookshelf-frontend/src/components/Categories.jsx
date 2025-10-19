import React, { useState, useEffect } from "react";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  const loadCategories = () => fetchCategories().then(res => setCategories(res.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, form).then(() => {
        setForm({ name: "" });
        setEditingId(null);
        loadCategories();
      });
    } else {
      createCategory(form).then(() => {
        setForm({ name: "" });
        loadCategories();
      });
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name });
    setEditingId(category._id);
  };

  const handleDelete = (id) => deleteCategory(id).then(loadCategories);

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
