import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import authService from "../services/authService";

function Register({ setUtente }) {
  const [utente, setUtenteState] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setUtenteState({ ...utente, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.register({
        ...utente,
        role: "UTENTE", // ruolo di default per nuovi utenti
      });

      alert("✅ Registrazione completata!");
      setUtenteState({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella registrazione");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="nome"
        placeholder="Nome"
        value={utente.nome}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="text"
        name="cognome"
        placeholder="Cognome"
        value={utente.cognome}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Form.Control
        type="email"
        name="email"
        placeholder="Email"
        value={utente.email}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Form.Control
        type="text"
        name="telefono"
        placeholder="Telefono"
        value={utente.telefono}
        onChange={handleChange}
        className="mb-2"
      />
      <Form.Control
        type="text"
        name="username"
        placeholder="Username"
        value={utente.username}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Form.Control
        type="password"
        name="password"
        placeholder="Password"
        value={utente.password}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Button type="submit" className="mt-2">
        Registrati
      </Button>
    </Form>
  );
}

export default Register;
