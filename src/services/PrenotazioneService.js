import axios from "axios";
const API_URL = "http://localhost:8080/prenotazioni";

const getToken = () => localStorage.getItem("token");
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

const getAllPrenotazioni = () => axios.get(API_URL, config());
const getMyPrenotazioni = () => axios.get(`${API_URL}/me`, config());

// Crea nuova prenotazione
const createPrenotazione = (prenotazione) =>
  axios.post(API_URL, prenotazione, config());

const updatePrenotazione = (id, dto) =>
  axios.put(`${API_URL}/${id}`, dto, config());

const deletePrenotazione = (id) => axios.delete(`${API_URL}/${id}`, config());

export default {
  getAllPrenotazioni,
  getMyPrenotazioni,
  createPrenotazione,
  updatePrenotazione,
  deletePrenotazione,
};
