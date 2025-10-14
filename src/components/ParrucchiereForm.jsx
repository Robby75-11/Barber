import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ParrucchiereService from "../services/ParrucchiereService";

const ParrucchiereForm = () => {
  const [nome, setNome] = useState("");
  const [specialita, setSpecialita] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ParrucchiereService.createParrucchiere({ nome, specialita });

      alert("Parrucchiere creato con successo!");
      setNome("");
      setSpecialita("");
    } catch (err) {
      console.error(err);
      alert("Errore nella creazione del parrucchiere.");
    }
  };

  return (
    <Container>
      <h2>Nuovo Parrucchiere</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialita</Form.Label>
          <Form.Control
            type="text"
            value={specialita}
            onChange={(e) => setSpecialita(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salva
        </Button>
      </Form>
    </Container>
  );
};

export default ParrucchiereForm;
