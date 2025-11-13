import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpenIcon, UserIcon, RectangleGroupIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const linkStyle = {
    padding: "12px 20px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "25px",
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "0.5px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  };

  const activeStyle = {
    backgroundColor: "#4E1B1B",
    color: "#fff",
    fontWeight: 600,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
  };

  return (
    <nav style={{
      width: "300px",
      height: "100vh",
      background: "#fff",
      padding: "20px",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0
    }}>
      {/* Branding Header */}
      <div style={{ 
        fontFamily: "'Poppins', sans-serif", 
        fontSize: "50px", 
        fontWeight: "800", 
        marginBottom: "30px",
        marginLeft: "5px",
        marginTop: "13px",
        color: "#4E1B1B"
      }}>
        Bookshelf
      </div>

      {/* Navigation Links */}
      <NavLink to="/add-books" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <PlusCircleIcon style={{ width: "20px", height: "20px" }} />
        Add Books
      </NavLink>

      <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <BookOpenIcon style={{ width: "20px", height: "20px" }} />
        Books
      </NavLink>

      <NavLink to="/authors" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <UserIcon style={{ width: "20px", height: "20px" }} />
        Authors
      </NavLink>

      <NavLink to="/categories" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <RectangleGroupIcon style={{ width: "20px", height: "20px" }} />
        Categories
      </NavLink>
    </nav>
  );
}
