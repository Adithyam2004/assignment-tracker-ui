// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AssignmentService from "../services/AssignmentService";
// import "../styles/Details.css";

// function AssignmentDetails() {

//   const { id } = useParams();
//   const [assignment, setAssignment] = useState(null);

//   useEffect(() => {
//     AssignmentService.getAssignmentById(id)
//       .then((res) => setAssignment(res.data))
//       .catch((error) => {
//         console.error("API error", error);
//       });
//   }, [id]);

//   if (!assignment) {
//     return <div className="container"><h2>Loading assignment details...</h2></div>;
//   }

//   const due = assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "N/A";

//   return (
//     <div className="container">
//       <h2>Assignment Details</h2>
//       <p><b>Student:</b> {assignment.studentName || "-"}</p>
//       <p><b>Subject:</b> {assignment.subject || "-"}</p>
//       <p><b>Title:</b> {assignment.title || "-"}</p>
//       <p><b>Due Date:</b> {due}</p>
//       <p><b>Priority:</b> {assignment.priority || "-"}</p>
//       <p><b>Status:</b> {assignment.status || "Pending"}</p>
//     </div>
//   );
// }

// export default AssignmentDetails;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // ✅ added
import AssignmentService from "../services/AssignmentService";
import "../styles/Details.css";

function AssignmentDetails() {

  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added
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
      <div className="container text-center">
        <h2>Loading assignment details...</h2>
      </div>
    );
  }

  const due = assignment.dueDate
    ? new Date(assignment.dueDate).toLocaleDateString()
    : "N/A";

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h2 className="text-center mb-3">Assignment Details</h2>

        <p><b>Student:</b> {assignment.studentName || "-"}</p>
        <p><b>Email:</b> {assignment.studentEmail || "-"}</p>
        <p><b>Subject:</b> {assignment.subject || "-"}</p>
        <p><b>Title:</b> {assignment.title || "-"}</p>
        <p><b>Due Date:</b> {due}</p>
        <p><b>Priority:</b> {assignment.priority || "-"}</p>
        <p><b>Status:</b> {assignment.status || "Pending"}</p>

        /* ✅ BACK BUTTON */
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/view")}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default AssignmentDetails;


