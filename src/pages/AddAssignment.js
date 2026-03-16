import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentService from "../services/AssignmentService";
import "../styles/AddAssignment.css";

function AddAssignment() {

  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    studentName: "",
    subject: "",
    title: "",
    dueDate: "",
    priority: "",
    status: "Pending"
  });
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = name === "studentName"
      ? value.replace(/[^a-zA-Z\s]/g, "")
      : value;

    setAssignment({
      ...assignment,
      [name]: cleanedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!assignment.studentName || !assignment.subject || !assignment.title || !assignment.dueDate || !assignment.priority) {
      setFeedback("Please complete all fields before submitting.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(assignment.studentName.trim())) {
      setFeedback("Student name must contain only letters and spaces.");
      return;
    }

    AssignmentService.addAssignment(assignment)
      .then(() => {
        setFeedback("Assignment added successfully. Redirecting to view page...");
        setTimeout(() => navigate("/view"), 900);
      })
      .catch((error) => {
        console.error(error);
        setFeedback("Unable to add assignment right now. Check API/database connection.");
      });
  };

  return (
    <div className="container">
      <h2>Add Assignment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={assignment.studentName}
          onChange={handleChange}
        />

        <select
          name="subject"
          value={assignment.subject}
          onChange={handleChange}
        >
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Computer">Computer</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
        />

        <div className="priority-group">
          Priority:
          <label><input type="radio" name="priority" value="Low" checked={assignment.priority === "Low"} onChange={handleChange}/> Low</label>
          <label><input type="radio" name="priority" value="Medium" checked={assignment.priority === "Medium"} onChange={handleChange}/> Medium</label>
          <label><input type="radio" name="priority" value="High" checked={assignment.priority === "High"} onChange={handleChange}/> High</label>
        </div>

        <button type="submit">Add Assignment</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </form>
    </div>
  );
}

export default AddAssignment;