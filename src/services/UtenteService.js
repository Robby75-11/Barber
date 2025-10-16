import axios from "axios";

const API_URL = "http://localhost:8080/utenti";

const getToken = () => localStorage.getItem("token");

const utenteService = {
  getUtenti: () =>
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  createUtente: (data) =>
    axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  updateUtente: (id, data) =>
    axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  deleteUtente: (id) =>
    axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

export default utenteService;
