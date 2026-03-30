import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Assignment Tracker</h2>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        <NavLink to="/add" className="nav-link">
          Add Assignment
        </NavLink>

        <NavLink to="/view" className="nav-link">
          View Assignments
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;