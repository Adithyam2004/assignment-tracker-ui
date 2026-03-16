import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddAssignment from "./pages/AddAssignment";
import ViewAssignments from "./pages/ViewAssignments";
import AssignmentDetails from "./pages/AssignmentDetails";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAssignment />} />
        <Route path="/view" element={<ViewAssignments />} />
        <Route path="/details/:id" element={<AssignmentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;