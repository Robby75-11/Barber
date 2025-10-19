// src/components/ServiziList.jsx
import { useEffect, useState } from "react";
import ServizioService from "../services/ServizioService";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";

function ServiziList() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ServizioService.getAllServizi()
      .then((res) => {
        setServizi(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel caricamento dei servizi");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Caricamento servizi...</p>;
  if (error) return <p>{error}</p>;
  if (servizi.length === 0) return <p>Nessun servizio trovato.</p>;

  return (
    <Row>
      {servizi.map((s) => (
        <Col key={s.id} xs={12} sm={6} md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                {s.nome} {s.prezzo}
              </Card.Title>
              <Card.Text>durata: {s.durata} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ServiziList;
