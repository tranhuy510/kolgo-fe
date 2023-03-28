import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: { Authorization: "" },
});

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer" + token.accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
