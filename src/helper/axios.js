import axios from "axios";

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.interceptors.response.use((response) => response.data);
//Default setup for Authorization
const token = localStorage.getItem("token");

const options = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
};

export const request = axios.create(options);

request.interceptors.request.use(
  (request) => {
    return request;
  }
  // (error) => {}
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const errorData = error?.response?.data;

      if (errorData?.message === "Unauthenticated.") {
        // clearStorage();
      }

      return Promise.reject({
        response: error,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
