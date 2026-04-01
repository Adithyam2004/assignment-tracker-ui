import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5155/api/Assignments";

class AssignmentService {
  async getAssignments() {
    return await axios.get(API_URL);
  }

  async getAssignmentById(id) {
    return await axios.get(`${API_URL}/${id}`);
  }

  async addAssignment(assignment) {
    return await axios.post(API_URL, assignment);
  }

  async updateAssignment(id, assignment) {
    return await axios.put(`${API_URL}/${id}`, assignment);
  }

  async deleteAssignment(id) {
    return await axios.delete(`${API_URL}/${id}`);
  }
}

const assignmentService = new AssignmentService();

export default assignmentService;