import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Books from "./components/Books";
import AddBooks from "./components/AddBooks";
import Authors from "./components/Authors";
import Categories from "./components/Categories";
import { fetchBooks } from "./api/api";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then((res) => setBooks(res.data));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <NavBar />

      <div style={{ flex: 1, padding: "30px", background: "#ffffff" }}>
        <Routes>
          <Route path="/" element={<Books books={books} setBooks={setBooks} />} />
          <Route path="/add-books" element={<AddBooks books={books} setBooks={setBooks} />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </div>
  );
}
