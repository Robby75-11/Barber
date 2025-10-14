import axios from "axios";

const API_URL = "http://localhost:8080/servizi";

const getToken = () => localStorage.getItem("token"); // assicurati di salvare il token al login

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

const getAllServizi = () => axios.get(API_URL, config());
const getServizioById = (id) => axios.get(`${API_URL}/${id}`, config());
const createServizio = (servizio) => axios.post(API_URL, servizio, config());
const updateServizio = (id, servizio) =>
  axios.put(`${API_URL}/${id}`, servizio, config());
const deleteServizio = (id) => axios.delete(`${API_URL}/${id}`, config());

export default {
  getAllServizi,
  getServizioById,
  createServizio,
  updateServizio,
  deleteServizio,
};
