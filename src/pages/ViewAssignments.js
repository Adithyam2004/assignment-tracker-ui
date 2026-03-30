import React, { useEffect, useMemo, useState } from "react";
import AssignmentService from "../services/AssignmentService";
import { Link } from "react-router-dom";
import { Button, Badge, Form } from "react-bootstrap";
import "../styles/ViewAssignments.css";

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    getAssignments();
  }, []);

  const getAssignments = async () => {
    setLoading(true);
    try {
      const res = await AssignmentService.getAssignments();
      setAssignments(res.data || []);
      setFeedback("");
    } catch (err) {
      console.error(err);
      setFeedback("Unable to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (id) => {
    if (window.confirm("Delete this assignment?")) {
      try {
        await AssignmentService.deleteAssignment(id);
        getAssignments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const changeStatus = async (assignment, newStatus) => {
    const updated = {
      ...assignment,
      status: newStatus
    };

    try {
      await AssignmentService.updateAssignment(assignment.id, updated);
      getAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return assignments.filter((a) =>
      (a.studentName || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [assignments, search]);

  const priorityColor = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "success";
  };

  return (
    <div className="view-page">
      <div className="view-shell">
        <div className="view-header">
          <div>
            <div className="view-badge">Assignments Overview</div>
            <h2>View Assignments</h2>
            <p>Search, review, edit, delete, and update assignment status.</p>
          </div>

          <Link to="/add" className="add-new-btn">
            + Add New
          </Link>
        </div>

        {feedback && <div className="view-alert">{feedback}</div>}

        <div className="view-toolbar">
          <Form.Control
            type="text"
            placeholder="Search by student name..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="table-empty">Loading assignments...</div>
        ) : filtered.length === 0 ? (
          <div className="table-empty">No assignments found.</div>
        ) : (
          <div className="table-wrap">
            <table className="assignment-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="student-cell">
                        <div className="mini-avatar">
                          {(a.studentName || "S").charAt(0).toUpperCase()}
                        </div>
                        <span>{a.studentName}</span>
                      </div>
                    </td>
                    <td>{a.studentEmail}</td>
                    <td>{a.subject}</td>
                    <td>{a.title}</td>
                    <td>{new Date(a.dueDate).toLocaleDateString()}</td>

                    <td>
                      <Badge bg={priorityColor(a.priority)} className="priority-badge">
                        {a.priority}
                      </Badge>
                    </td>

                    <td>
                      <Form.Select
                        value={a.status}
                        size="sm"
                        className="status-select"
                        onChange={(e) => changeStatus(a, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </td>

                    <td>
                      <div className="action-group">
                        <Link to={`/details/${a.id}`}>
                          <Button variant="info" size="sm" className="me-2">
                            View
                          </Button>
                        </Link>

                        <Link to={`/add/${a.id}`}>
                          <Button variant="warning" size="sm" className="me-2">
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteAssignment(a.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAssignments;