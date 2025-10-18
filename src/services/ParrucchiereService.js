import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/api/parrucchieri";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

const getAllParrucchieri = () => axios.get(API_URL, config());
const createParrucchiere = (data) => axios.post(API_URL, data, config());
const deleteParrucchiere = (id) => axios.delete(`${API_URL}/${id}`, config());

export default { getAllParrucchieri, createParrucchiere, deleteParrucchiere };
