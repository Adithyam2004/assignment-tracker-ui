import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      <div className="hero">
        <h1>Student Assignment Tracker</h1>
        <p>Manage student assignments, deadlines and priorities easily.</p>
      </div>

      <div className="dashboard">

        <div className="card">
          <h3>Total Assignments</h3>
          <p>Track all assignments in one place.</p>
        </div>

        <div className="card">
          <h3>Pending Work</h3>
          <p>See which assignments are not completed.</p>
        </div>

        <div className="card">
          <h3>Easy Management</h3>
          <p>Add, view and delete assignments quickly.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;