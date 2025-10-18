import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import ParrucchiereService from "../services/ParrucchiereService";

const ParrucchieriList = () => {
  const [parrucchieri, setParrucchieri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ParrucchiereService.getAllParrucchieri()
      .then((res) => {
        setParrucchieri(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel caricamento dei parrucchieri");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (parrucchieri.length === 0) return <p>Nessun parrucchiere trovato.</p>;

  return (
    <Row>
      {parrucchieri.map((p) => (
        <Col key={p.id} xs={12} sm={6} md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                {p.nome} {p.cognome}
              </Card.Title>
              <Card.Text>Specialità: {p.specialita}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ParrucchieriList;
