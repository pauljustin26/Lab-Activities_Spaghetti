import React, { useState, useRef, useEffect } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { fetchAuthors, createAuthor, updateAuthor, deleteAuthor } from "../api/api";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [editingId, setEditingId] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const descRef = useRef(null);

  const loadAuthors = () => fetchAuthors().then((res) => setAuthors(res.data));

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (descRef.current && !descRef.current.contains(e.target)) {
        setSelectedAuthor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <div style={{ display: "flex", gap: "20px", padding: "20px", height: "calc(100vh - 40px)" }}>
      {/* LEFT SIDE: Author List + Form */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: "10px", borderRadius: "20px", border: "1px solid #ccc", outline: "none" }}
          />
          <input
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            style={{ padding: "10px", borderRadius: "20px", border: "1px solid #ccc", outline: "none" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: editingId ? "#007bff" : "#4B0000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Author" : "Add Author"}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {authors.length === 0 ? (
            <p style={{ color: "#999", textAlign: "center" }}>No authors found.</p>
          ) : (
            authors.map((author) => (
              <div
                key={author._id}
                onClick={() => setSelectedAuthor(author)}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4B0000";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                }}
              >
                <div>
                  <h4 style={{ margin: 0 }}>{author.name}</h4>
                  {author.bio && <p style={{ margin: 0, fontSize: "13px" }}>{author.bio}</p>}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(author);
                    }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}
                  >
                    <PencilIcon style={{ width: "20px" }} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(author._id);
                    }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#b00020" }}
                  >
                    <TrashIcon style={{ width: "20px" }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Description Container */}
      <div
        ref={descRef}
        style={{
          width: "350px",
          minHeight: "300px",
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          padding: "25px",
          borderRadius: "12px",
          position: "sticky",
          top: "20px",
          alignSelf: "flex-start",
        }}
      >
        {selectedAuthor ? (
          <>
            <h3>{selectedAuthor.name}</h3>
            {selectedAuthor.bio && (
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>{selectedAuthor.bio}</p>
            )}
          </>
        ) : (
          <p style={{ color: "#999", textAlign: "center", marginTop: "120px" }}>
            Select an author for description.
          </p>
        )}
      </div>
    </div>
  );
}
