import axios from "./index";

const authApi = (data) => {
  return axios.post("auth/login", data);
};

export default authApi;
