import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AssignmentService from "../services/AssignmentService";
import "../styles/Details.css";

function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    AssignmentService.getAssignmentById(id)
      .then((res) => setAssignment(res.data))
      .catch((error) => {
        console.error("API error", error);
      });
  }, [id]);

  if (!assignment) {
    return (
      <div className="details-page">
        <div className="details-shell loading-shell">
          <h2>Loading assignment details...</h2>
        </div>
      </div>
    );
  }

  const due = assignment.dueDate
    ? new Date(assignment.dueDate).toLocaleDateString()
    : "N/A";

  return (
    <div className="details-page">
      <div className="details-shell">
        <div className="details-topbar">
          <div>
            <div className="details-badge">Assignment Record</div>
            <h2>Assignment Details</h2>
            <p>View full student and assignment information.</p>
          </div>

          <button className="back-btn" onClick={() => navigate("/view")}>
            Back
          </button>
        </div>

        <div className="details-profile-card">
          <div className="profile-avatar">
            {(assignment.studentName || "S").charAt(0).toUpperCase()}
          </div>

          <div className="profile-main">
            <h3>{assignment.studentName || "-"}</h3>
            <p>{assignment.studentEmail || "-"}</p>
          </div>

          <div className="profile-status">
            <span
              className={`details-status-pill ${
                (assignment.status || "").toLowerCase() === "completed"
                  ? "done"
                  : "pending"
              }`}
            >
              {assignment.status || "Pending"}
            </span>
          </div>
        </div>

        <div className="details-info-grid">
          <div className="info-card">
            <h4>Student Information</h4>

            <div className="info-row">
              <span>Name</span>
              <strong>{assignment.studentName || "-"}</strong>
            </div>

            <div className="info-row">
              <span>Email</span>
              <strong>{assignment.studentEmail || "-"}</strong>
            </div>

            <div className="info-row">
              <span>Subject</span>
              <strong>{assignment.subject || "-"}</strong>
            </div>
          </div>

          <div className="info-card">
            <h4>Assignment Information</h4>

            <div className="info-row">
              <span>Title</span>
              <strong>{assignment.title || "-"}</strong>
            </div>

            <div className="info-row">
              <span>Due Date</span>
              <strong>{due}</strong>
            </div>

            <div className="info-row">
              <span>Priority</span>
              <strong>{assignment.priority || "-"}</strong>
            </div>

            <div className="info-row">
              <span>Status</span>
              <strong>{assignment.status || "Pending"}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetails;