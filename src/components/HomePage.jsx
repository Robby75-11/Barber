import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import ServiziTable from "./tables/ServiziTable";
import ParrucchieriTable from "./tables/ParrucchieriTable";
import UtentiTable from "./tables/UtentiTable";
import PrenotazioniPage from "./PrenotazioniPage";
import ServizioService from "../services/ServizioService";
import ParrucchiereService from "../services/ParrucchiereService";
import ParrucchieriList from "./ParrucchieriList";
import ServiziList from "./ServiziList";

const images = [
  "/barber.jpeg",
  "/color.jpeg",
  "/modelli.jpeg",
  "/modelli2.jpeg",
  "/salone.jpeg",
  "/colore.jpeg",
  "/shampoo.jpeg",
  "/colore3.jpeg",
  "/bionda.jpeg",
];

const HomePage = ({ utente }) => {
  const [servizi, setServizi] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);

  // 🔹 Fetch dati per admin
  useEffect(() => {
    if (utente?.role === "AMMINISTRATORE") {
      ServizioService.getAllServizi()
        .then((res) => setServizi(res.data))
        .catch((err) => console.error(err));

      ParrucchiereService.getAllParrucchieri()
        .then((res) => setParrucchieri(res.data))
        .catch((err) => console.error(err));
    }
  }, [utente]);

  // 🔹 Funzioni elimina
  const handleDeleteServizio = (id) => {
    ServizioService.deleteServizio(id)
      .then(() => setServizi(servizi.filter((s) => s.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleDeleteParrucchiere = (id) => {
    ParrucchiereService.deleteParrucchiere(id)
      .then(() => setParrucchieri(parrucchieri.filter((p) => p.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        Benvenuto 💇‍♂️ {utente?.nome || utente?.username}
      </h2>
      {/* UTENTE NORMALE */}
      {utente?.role === "UTENTE" && (
        <>
          <Row className="mb-4">
            <Col>
              <h4>Servizi disponibili</h4>
              <ServiziList servizi={servizi} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4>I nostri parrucchieri</h4>
              <ParrucchieriList parrucchieri={parrucchieri} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4>Le tue prenotazioni</h4>
              <PrenotazioniPage utente={utente} />
            </Col>
          </Row>
        </>
      )}

      {/* Sezione amministratore */}
      {utente?.role === "AMMINISTRATORE" && (
        <>
          <Row className="mb-4">
            <Col>
              <h4>Gestione Clienti</h4>
              <UtentiTable />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4>Gestione Servizi</h4>
              <ServiziTable servizi={servizi} onDelete={handleDeleteServizio} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4>Gestione Parrucchieri</h4>
              <ParrucchieriTable
                parrucchieri={parrucchieri}
                onDelete={handleDeleteParrucchiere}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4>Gestione Prenotazioni</h4>
              <PrenotazioniPage utente={utente} />
            </Col>
          </Row>
        </>
      )}

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
