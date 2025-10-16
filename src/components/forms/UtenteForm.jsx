import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import utenteService from "../../services/UtenteService";

function UtenteForm() {
  const [utente, setUtente] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
    role: "UTENTE",
  });

  const handleChange = (e) => {
    setUtente({ ...utente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await utenteService.createUtente(utente);
      alert("✅ Utente creato con successo!");
      setUtente({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        username: "",
        password: "",
        role: "UTENTE",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella creazione dell'utente");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={utente.nome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Cognome</Form.Label>
        <Form.Control
          type="text"
          name="cognome"
          value={utente.cognome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={utente.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Telefono</Form.Label>
        <Form.Control
          type="text"
          name="telefono"
          value={utente.telefono}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={utente.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={utente.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Crea Utente</Button>
    </Form>
  );
}

export default UtenteForm;
