import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Books</Link>
      <Link to="/authors" style={{ marginRight: "10px" }}>Authors</Link>
      <Link to="/categories">Categories</Link>
    </nav>
  );
}
