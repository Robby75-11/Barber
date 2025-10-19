import { useState } from "react";
import { Form, Button, Spinner, Container } from "react-bootstrap";
import ParrucchiereService from "../../services/ParrucchiereService";

const ParrucchiereForm = ({ onCreated }) => {
  const [nome, setNome] = useState("");
  const [specialita, setSpecialita] = useState("");
  const [loading, setLoading] = useState(false);

  if (!onCreated)
    throw new Error("ParrucchiereForm richiede un callback onCreated!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ParrucchiereService.createParrucchiere({ nome, specialita });
      setNome("");
      setSpecialita("");
      onCreated(); // callback per aggiornare la tabella
    } catch (err) {
      console.error(err);
      alert("Errore nella creazione del parrucchiere.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h4>Nuovo Parrucchiere</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Specialità</Form.Label>
          <Form.Control
            type="text"
            value={specialita}
            onChange={(e) => setSpecialita(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={loading} className="w-100 mt-2">
          {loading ? <Spinner animation="border" size="sm" /> : "Salva"}
        </Button>
      </Form>
    </Container>
  );
};

export default ParrucchiereForm;
