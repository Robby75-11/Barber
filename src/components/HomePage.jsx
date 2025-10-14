import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const images = [
  "/barber.jpeg",
  "/color.jpeg",
  "/modelli.jpeg",
  "/modelli2.jpeg",
  "/salone.jpeg",
  "/saloon.jpeg",
  "/shampoo.jpeg",
  "/colore3.jpeg",
  "/sala 2.jpeg",
];

const HomePage = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">I nostri lavori 💇‍♂️</h2>

      {/* Griglia immagini */}
      <Row>
        {images.map((src, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} className="mb-4">
            <Image src={src} thumbnail fluid className="shadow-sm" />
          </Col>
        ))}
      </Row>

      {/* Sezione descrizione */}
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="p-4 text-center shadow-sm border-0">
            <Card.Body>
              <Card.Title
                className="mb-3"
                style={{ fontSize: "1.8rem", fontWeight: "bold" }}
              >
                Benvenuti da Martino Parrucchieri
              </Card.Title>
              <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                Il nostro salone offre servizi professionali di taglio, colore e
                styling per tutti i gusti. Grazie alla nostra esperienza e
                passione, trasformiamo ogni visita in un momento speciale. Vieni
                a scoprire il nostro team di esperti e lasciati coccolare in un
                ambiente accogliente e moderno.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
