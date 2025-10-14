import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const register = (cliente) => {
  return axios.post(`${API_URL}/register`, cliente);
};

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export default {
  register,
  login,
};
