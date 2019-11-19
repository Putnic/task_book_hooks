import axios from "axios";

// https://uxcandy.com/~shapoval/test-task-backend/v2
// https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Example

const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2/"
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
    let data = getFormData(task);

    return instance
      .post("/create", data, {
        params: {
          developer: "Dmitry"
        }
      })
      .then(response => response.data);
  },
  editTask(id, task) {
    let data = getFormData(task);
    console.log('editTask', task);
    return instance
      .post(`/edit/${id}`, data, {
        params: {
          developer: "Dmitry",
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

// Convert JS Object to form data
function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}