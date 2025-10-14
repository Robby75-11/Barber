import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import clienteService from "../services/ClienteService";

function ClienteForm() {
  const [cliente, setCliente] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteService.createCliente(cliente);
      alert("✅ Cliente creato con successo!");
      setCliente({ nome: "", cognome: "", email: "", telefono: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella creazione del cliente");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Cognome</Form.Label>
        <Form.Control
          type="text"
          name="cognome"
          value={cliente.cognome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Telefono</Form.Label>
        <Form.Control
          type="text"
          name="telefono"
          value={cliente.telefono}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Crea Cliente</Button>
    </Form>
  );
}

export default ClienteForm;
