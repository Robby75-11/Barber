import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

const register = (utente) => {
  return axios.post(`${API_URL}/register`, utente);
};

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export default {
  register,
  login,
};
