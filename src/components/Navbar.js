import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">Assignment Tracker</div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>Add Assignment</NavLink>
        <NavLink to="/view" className={({ isActive }) => (isActive ? "active" : "")}>View Assignments</NavLink>
      </div>

    </nav>
  );
}

export default Navbar;