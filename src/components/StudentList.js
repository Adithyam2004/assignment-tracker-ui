import React from "react";

function StudentList({ students, onSelect, selectedStudent }) {
  const getInitial = (name) => {
    if (!name) return "S";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="student-panel">
      <div className="student-panel-header">
        <div>
          <h3>Students</h3>
          <p>Click a student to view full details</p>
        </div>
        <span className="student-count">{students.length}</span>
      </div>

      <div className="student-panel-list">
        {students.map((student) => (
          <div
            key={student.id}
            className={`student-card-item ${
              selectedStudent?.id === student.id ? "active-student" : ""
            }`}
            onClick={() => onSelect(student)}
          >
            <div className="student-avatar">
              {getInitial(student.studentName)}
            </div>

            <div className="student-info">
              <h4>{student.studentName || "Unknown Student"}</h4>
              <p>{student.subject || "No subject assigned"}</p>
            </div>

            <div className="student-meta">
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
        ))}
      </div>
    </div>
  );
}

export default StudentList;