import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignmentService from "../services/AssignmentService";
import "../styles/AddAssignment.css";

function AddAssignment() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [assignment, setAssignment] = useState({
    studentName: "",
    studentEmail: "", // ✅ NEW FIELD
    subject: "",
    title: "",
    dueDate: "",
    priority: "",
    status: "Pending"
  });

  const [feedback, setFeedback] = useState("");

  useEffect(() => {

    if (id) {
      AssignmentService.getAssignmentById(id)
        .then(res => {
          setAssignment(res.data);
        })
        .catch(err => console.log(err));
    }

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    const cleanedValue =
      name === "studentName"
        ? value.replace(/[^a-zA-Z\s]/g, "")
        : value;

    setAssignment({
      ...assignment,
      [name]: cleanedValue
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // ✅ Validation including email
    if (
      !assignment.studentName ||
      !assignment.studentEmail ||
      !assignment.subject ||
      !assignment.title ||
      !assignment.dueDate ||
      !assignment.priority
    ) {
      setFeedback("Please complete all fields.");
      return;
    }

    // ✅ Email format validation
    if (!/\S+@\S+\.\S+/.test(assignment.studentEmail)) {
      setFeedback("Enter a valid email address.");
      return;
    }

    if (id) {

      AssignmentService.updateAssignment(id, assignment)
        .then(() => {
          setFeedback("Assignment updated successfully.");
          setTimeout(() => navigate("/view"), 800);
        })
        .catch(() => {
          setFeedback("Email already exists or update failed.");
        });

    } else {

      AssignmentService.addAssignment(assignment)
        .then(() => {
          setFeedback("Assignment added successfully.");
          setTimeout(() => navigate("/view"), 800);
        })
        .catch(() => {
          setFeedback("Email already exists or add failed.");
        });

    }
  };

  return (

    <div className="container">

      <h2>{id ? "Edit Assignment" : "Add Assignment"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={assignment.studentName}
          onChange={handleChange}
        />

        {/* ✅ NEW EMAIL FIELD */}
        <input
          type="email"
          name="studentEmail"
          placeholder="Student Email"
          value={assignment.studentEmail}
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

          <label>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={assignment.priority === "Low"}
              onChange={handleChange}
            />
            Low
          </label>

          <label>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={assignment.priority === "Medium"}
              onChange={handleChange}
            />
            Medium
          </label>

          <label>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={assignment.priority === "High"}
              onChange={handleChange}
            />
            High
          </label>

        </div>

        <button type="submit">
          {id ? "Update Assignment" : "Add Assignment"}
        </button>

        {feedback && <p className="feedback">{feedback}</p>}

      </form>

    </div>
  );
}

export default AddAssignment;