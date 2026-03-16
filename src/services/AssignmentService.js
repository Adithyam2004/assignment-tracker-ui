import axios from "axios";

const API_URL = "https://localhost:7060/api/Assignments";

class AssignmentService {

  getAssignments() {
    return axios.get(API_URL);
  }

  getAssignmentById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  addAssignment(data) {
    return axios.post(API_URL, data);
  }

  updateAssignment(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  deleteAssignment(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

}

export default new AssignmentService();