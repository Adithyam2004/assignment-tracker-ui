import React, { useEffect, useState } from "react";
import AssignmentService from "../services/AssignmentService";
import { Link } from "react-router-dom";
import { Table, Button, Badge, Form } from "react-bootstrap";

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

  const filtered = assignments.filter(a =>
    a.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const priorityColor = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "success";
  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Assignments</h2>

      {feedback && <div className="alert alert-warning">{feedback}</div>}

      <Form.Control
        type="text"
        placeholder="Search student..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-5">Loading assignments...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-5">No assignments found.</div>
      ) : (

        <Table striped bordered hover>

          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(a => (

              <tr key={a.id}>

                <td>{a.studentName}</td>
                <td>{a.subject}</td>
                <td>{a.title}</td>
                <td>{new Date(a.dueDate).toLocaleDateString()}</td>

                <td>
                  <Badge bg={priorityColor(a.priority)}>
                    {a.priority}
                  </Badge>
                </td>

                <td>

                  <Form.Select
                    value={a.status}
                    size="sm"
                    style={{ width:"120PX"}}
                    onChange={(e) => changeStatus(a, e.target.value)}
                  >

                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>

                  </Form.Select>

                </td>

                <td>

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

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      )}

    </div>
  );
}

export default ViewAssignments;