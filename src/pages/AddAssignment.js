import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AssignmentService from "../services/AssignmentService";
import "../styles/AddAssignment.css";

function AddAssignment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [assignment, setAssignment] = useState({
    studentName: "",
    studentEmail: "",
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
        .then((res) => {
          setAssignment(res.data);
        })
        .catch((err) => console.log(err));
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

    if (
      !assignment.studentName.trim() ||
      !assignment.studentEmail.trim() ||
      !assignment.subject ||
      !assignment.title ||
      !assignment.dueDate ||
      !assignment.priority
    ) {
      setFeedback("Please complete all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(assignment.studentEmail.trim())) {
      setFeedback("Enter a valid email address.");
      return;
    }

    if (id) {
      AssignmentService.updateAssignment(id, assignment)
        .then(() => {
          setFeedback("Assignment updated successfully.");
          setTimeout(() => navigate("/view"), 900);
        })
        .catch(() => {
          setFeedback("Email already exists or update failed.");
        });
    } else {
      AssignmentService.addAssignment(assignment)
        .then(() => {
          setFeedback("Assignment added successfully.");
          setTimeout(() => navigate("/view"), 900);
        })
        .catch(() => {
          setFeedback("Email already exists or add failed.");
        });
    }
  };

  return (
    <div className="add-page">
      <div className="form-shell">
        <div className="form-topbar">
          <div>
            <div className="form-badge">{id ? "Edit Mode" : "New Entry"}</div>
            <h2>{id ? "Edit Assignment" : "Add Assignment"}</h2>
            <p>Fill in the details below to save the assignment.</p>
          </div>

          <Link to="/view" className="back-link">
            Back to View
          </Link>
        </div>

        {feedback && <div className="form-feedback">{feedback}</div>}

        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-grid">
            <div className="field-group">
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                placeholder="Enter student name"
                value={assignment.studentName}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Student Email</label>
              <input
                type="email"
                name="studentEmail"
                placeholder="Enter student email"
                value={assignment.studentEmail}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Subject</label>
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
            </div>

            <div className="field-group">
              <label>Assignment Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                value={assignment.title}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Status</label>
              <select
                name="status"
                value={assignment.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="priority-card">
            <span className="priority-title">Choose Priority</span>

            <div className="priority-options">
              <label className={`priority-option ${assignment.priority === "Low" ? "selected low" : ""}`}>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={assignment.priority === "Low"}
                  onChange={handleChange}
                />
                Low
              </label>

              <label className={`priority-option ${assignment.priority === "Medium" ? "selected medium" : ""}`}>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={assignment.priority === "Medium"}
                  onChange={handleChange}
                />
                Medium
              </label>

              <label className={`priority-option ${assignment.priority === "High" ? "selected high" : ""}`}>
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
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {id ? "Update Assignment" : "Add Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAssignment;