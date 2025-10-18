import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import servizioService from "../../services/ServizioService";

const ServizioForm = ({ onCreated }) => {
  const [servizio, setServizio] = useState({
    nome: "",
    prezzo: "",
    durata: "",
  });
  const [loading, setLoading] = useState(false);

  if (!onCreated)
    throw new Error("ServizioForm richiede un callback onCreated!");

  const handleChange = (e) => {
    setServizio({ ...servizio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await servizioService.createServizio(servizio);
      setServizio({ nome: "", prezzo: "", durata: "" });
      onCreated(); // callback per aggiornare la tabella
    } catch (err) {
      console.error(err);
      alert("Errore nella creazione del servizio");
    } finally {
      setLoading(false);
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

      <Button type="submit" disabled={loading} className="w-100 mt-2">
        {loading ? <Spinner animation="border" size="sm" /> : "Crea Servizio"}
      </Button>
    </Form>
  );
};

export default ServizioForm;
