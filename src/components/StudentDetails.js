import React from "react";

function StudentDetails({ student }) {
  if (!student) {
    return (
      <div className="student-details-panel empty-state-panel">
        <div className="empty-state-box">
          <h3>Select a student</h3>
          <p>Choose a student from the left panel to view complete details.</p>
        </div>
      </div>
    );
  }

  const formattedDate = student.dueDate
    ? new Date(student.dueDate).toLocaleDateString()
    : "N/A";

  const getInitial = (name) => {
    if (!name) return "S";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="student-details-panel">
      <div className="details-header-card">
        <div className="details-avatar">{getInitial(student.studentName)}</div>

        <div className="details-header-info">
          <h2>{student.studentName || "Unknown Student"}</h2>
          <p>{student.studentEmail || "No email available"}</p>
        </div>

        <div className="details-header-status">
          <span
            className={`status-pill ${
              (student.status || "").toLowerCase() === "completed"
                ? "status-completed"
                : "status-pending"
            }`}
          >
            {student.status || "Pending"}
          </span>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-section">
          <h3>Student Information</h3>

          <div className="detail-row">
            <span className="detail-label">Student Name</span>
            <span className="detail-value">{student.studentName || "-"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{student.studentEmail || "-"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Subject</span>
            <span className="detail-value">{student.subject || "-"}</span>
          </div>
        </div>

        <div className="details-section">
          <h3>Assignment Information</h3>

          <div className="detail-row">
            <span className="detail-label">Title</span>
            <span className="detail-value">{student.title || "-"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Due Date</span>
            <span className="detail-value">{formattedDate}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Priority</span>
            <span className="detail-value">
              <span
                className={`priority-pill ${
                  (student.priority || "").toLowerCase() === "high"
                    ? "priority-high"
                    : (student.priority || "").toLowerCase() === "medium"
                    ? "priority-medium"
                    : "priority-low"
                }`}
              >
                {student.priority || "Low"}
              </span>
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value">{student.status || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;