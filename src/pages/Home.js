import React, { useEffect, useMemo, useState } from "react";
import "../styles/Home.css";
import StudentList from "../components/StudentList";
import StudentDetails from "../components/StudentDetails";
import AssignmentService from "../services/AssignmentService";

function Home() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    setLoading(true);
    setFeedback("");

    try {
      const response = await AssignmentService.getAssignments();
      const data = response.data || [];
      setStudents(data);

      if (data.length > 0) {
        setSelectedStudent(data[0]);
      } else {
        setSelectedStudent(null);
      }
    } catch (error) {
      console.error("Error loading assignments:", error);
      setFeedback("Unable to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  const totalAssignments = students.length;

  const pendingAssignments = useMemo(() => {
    return students.filter(
      (s) => (s.status || "").toLowerCase() !== "completed"
    ).length;
  }, [students]);

  const completedAssignments = useMemo(() => {
    return students.filter(
      (s) => (s.status || "").toLowerCase() === "completed"
    ).length;
  }, [students]);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">Smart Student Dashboard</div>
          <h1>Student Assignment Tracker</h1>
          <p>
            Track assignments, monitor progress, and manage student work from one
            clean and professional dashboard.
          </p>
        </div>
      </div>

      <div className="dashboard">
        <div className="card stat-card">
          <div className="stat-icon blue">📘</div>
          <div>
            <h3>Total Assignments</h3>
            <p>{totalAssignments}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon amber">⏳</div>
          <div>
            <h3>Pending Work</h3>
            <p>{pendingAssignments}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon green">✅</div>
          <div>
            <h3>Completed</h3>
            <p>{completedAssignments}</p>
          </div>
        </div>
      </div>

      {feedback && <div className="home-alert">{feedback}</div>}

      <div className="main-section">
        {loading ? (
          <div className="student-details-panel empty-state-panel">
            <div className="empty-state-box">
              <h3>Loading assignments...</h3>
              <p>Please wait while we fetch your student data.</p>
            </div>
          </div>
        ) : students.length === 0 ? (
          <div className="student-details-panel empty-state-panel">
            <div className="empty-state-box">
              <h3>No data found</h3>
              <p>Add assignments to start viewing students here.</p>
            </div>
          </div>
        ) : (
          <>
            <StudentList
              students={students}
              onSelect={setSelectedStudent}
              selectedStudent={selectedStudent}
            />
            <StudentDetails student={selectedStudent} />
          </>
        )}
      </div>

      <footer className="home-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Assignment Tracker</h3>
            <p>
              A simple academic dashboard to manage assignments, deadlines,
              priorities, and student progress efficiently.
            </p>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <a href="/">Help Center</a>
            <a href="/">Contact Support</a>
            <a href="/">FAQs</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="/">Terms & Conditions</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Usage Policy</a>
          </div>

          <div className="footer-links">
            <h4>Quick Access</h4>
            <a href="/">Home</a>
            <a href="/add">Add Assignment</a>
            <a href="/view">View Assignments</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Assignment Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;