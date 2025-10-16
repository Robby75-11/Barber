import axios from "axios";
const API_URL = "http://localhost:8080/prenotazioni";

const getToken = () => localStorage.getItem("token");
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

const getAllPrenotazioni = () => axios.get(API_URL, config());
// Crea nuova prenotazione
const createPrenotazione = (prenotazione) =>
  axios.post(API_URL, prenotazione, config());

const deletePrenotazione = (id) => axios.delete(`${API_URL}/${id}`, config());

const updatePrenotazione = (id, dto) =>
  axios.put(`${API_URL}/${id}`, dto, config());

export default {
  getAllPrenotazioni,
  createPrenotazione,
  updatePrenotazione,
  deletePrenotazione,
};
