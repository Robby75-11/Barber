import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import servizioService from "../../services/ServizioService";

function ServizioForm() {
  const [servizio, setServizio] = useState({
    nome: "",
    prezzo: "",
    durata: "",
  });

  const handleChange = (e) => {
    setServizio({ ...servizio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servizioService.createServizio(servizio);
      alert("✅ Servizio creato con successo!");
      setServizio({ nome: "", prezzo: "", durata: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella creazione del servizio");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Nome Servizio</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={servizio.nome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Prezzo (€)</Form.Label>
        <Form.Control
          type="number"
          name="prezzo"
          value={servizio.prezzo}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Durata (minuti)</Form.Label>
        <Form.Control
          type="number"
          name="durata"
          value={servizio.durata}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit">Crea Servizio</Button>
    </Form>
  );
}

export default ServizioForm;
