import axios from "axios";

// https://uxcandy.com/~shapoval/test-task-backend/v2
// https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Example

const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2/",
  headers: { "Content-type": "multipart/form-data" }
});

export const tasksAPI = {
  getTasks(currentPage = 1, sortField = "", sortDirection = "") {
    return instance
      .get("/", {
        params: {
          developer: "Dmitry",
          page: currentPage,
          sort_field: sortField,
          sort_direction: sortDirection
        }
      })
      .then(response => response.data);
  },
  addTask(task) {
    return instance
      .post("/create", task, {
        params: {
          developer: "Dmitry"
        }
      })
      .then(response => response.data);
  },
  login(data) {
    return instance
      .post("/login", data, {
        params: {
          developer: "Dmitry"
        }
      })
      .then(response => response.data);
  }
};
