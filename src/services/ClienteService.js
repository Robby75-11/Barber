import axios from "axios";

const API_URL = "http://localhost:8080/api/clienti";

const getToken = () => localStorage.getItem("token");

const clienteService = {
  getClienti: () =>
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  createCliente: (data) =>
    axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  updateCliente: (id, data) =>
    axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  deleteCliente: (id) =>
    axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

export default clienteService;
