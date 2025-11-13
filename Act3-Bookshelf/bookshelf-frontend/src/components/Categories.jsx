import React, { useState, useRef, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const descRef = useRef(null);

  const loadCategories = () => fetchCategories().then(res => setCategories(res.data));

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (descRef.current && !descRef.current.contains(e.target)) {
        setSelectedCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      loadCategories();
      if (selectedCategory && selectedCategory._id === id) setSelectedCategory(null);
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* LEFT SIDE */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <input
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4B0000",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        {/* Category Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "12px",
            minHeight: "200px",
          }}
        >
          {categories.length === 0 ? (
            <p style={{ color: "#999", textAlign: "center" }}>No categories found.</p>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                  backgroundColor: selectedCategory?._id === category._id ? "#4B0000" : "#fff",
                  color: selectedCategory?._id === category._id ? "#fff" : "#000",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4B0000";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    selectedCategory?._id === category._id ? "#4B0000" : "#fff";
                  e.currentTarget.style.color =
                    selectedCategory?._id === category._id ? "#fff" : "#000";
                }}
              >
                <span>{category.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Description */}
      <div
        ref={descRef}
        style={{
          width: "350px",
          minHeight: "300px",
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          padding: "25px",
          borderRadius: "20px",
          alignSelf: "flex-start",
        }}
      >
        {selectedCategory ? (
          <>
            <h3>{selectedCategory.name}</h3>
            <button
              onClick={() => handleDelete(selectedCategory._id)}
              style={{
                backgroundColor: "#b00020",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                color: "white",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              <TrashIcon style={{ width: "20px" }} />
            </button>
          </>
        ) : (
          <p style={{ color: "#999", textAlign: "center", marginTop: "120px" }}>
            Select a category to see details.
          </p>
        )}
      </div>
    </div>
  );
}
