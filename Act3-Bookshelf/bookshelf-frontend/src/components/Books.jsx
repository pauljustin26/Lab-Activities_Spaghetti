import React, { useState, useRef, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../api/api";

export default function Books({ books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const descRef = useRef(null);
  const navigate = useNavigate();

  // Click outside to deselect book
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (descRef.current && !descRef.current.contains(e.target)) {
        setSelectedBook(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b._id !== id));
      setSelectedBook(null);
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Books List */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        <button
          onClick={() => navigate("/add-books")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4B0000",
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          + Add Books
        </button>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "20px",
            minHeight: "200px",
          }}
        >
          {books.length === 0 ? (
            <p style={{ color: "#999", width: "100%", textAlign: "center" }}>
              Your bookshelf is empty.
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                onClick={() => setSelectedBook(book)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "150px",
                  minHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: "800", fontSize: "18px" }}>
                    {book.title || "Untitled"}
                  </p>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    <strong>Author:</strong> {book.authorId?.name || "Unknown"}
                  </p>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    <strong>Category:</strong> {book.categoryId?.name || "Uncategorized"}
                  </p>
                  {book.publishedDate && (
                    <p style={{ margin: 0, fontSize: "13px" }}>
                      <strong>Published:</strong> {formatDate(book.publishedDate)}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Description Panel */}
      <div
        ref={descRef}
        style={{
          width: "350px",
          minHeight: "300px",
          backgroundColor: "#fff",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          padding: "25px",
          borderRadius: "20px",
          alignSelf: "flex-start",
          marginTop: "55px",
        }}
      >
        {selectedBook ? (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
              {selectedBook.title || "Untitled"}
            </h2>
            <p style={{ margin: "5px 0" }}>
              <strong>Author:</strong> {selectedBook.authorId?.name || "Unknown"}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Category:</strong> {selectedBook.categoryId?.name || "Uncategorized"}
            </p>
            {selectedBook.publishedDate && (
              <p style={{ margin: "5px 0" }}>
                <strong>Published:</strong> {formatDate(selectedBook.publishedDate)}
              </p>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button
                onClick={() => handleDelete(selectedBook._id)}
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
                }}
              >
                <TrashIcon style={{ width: "20px" }} />
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: "#999", textAlign: "center", marginTop: "120px" }}>
            Select a book for description.
          </p>
        )}
      </div>
    </div>
  );
}
