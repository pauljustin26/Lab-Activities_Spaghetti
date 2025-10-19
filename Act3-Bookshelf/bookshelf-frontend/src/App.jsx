import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Categories from "./components/Categories";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}
