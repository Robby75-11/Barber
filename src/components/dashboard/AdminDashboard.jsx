// src/components/dashboard/AdminDashboard.jsx
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import dayjs from "dayjs";

// Tabelle
import ClientiTable from "../tables/ClientiTable";
import ParrucchieriTable from "../tables/ParrucchieriTable";
import ServiziTable from "../tables/ServiziTable";

// Form
import ClienteForm from "../forms/ClienteForm";
import ParrucchiereForm from "../forms/ParrucchiereForm";
import ServizioForm from "../forms/ServizioForm";

// Services
import prenotazioneService from "../../services/PrenotazioneService";
import clienteService from "../../services/ClienteService";
import parrucchiereService from "../../services/ParrucchiereService";
import servizioService from "../../services/ServizioService";

const AdminDashboard = () => {
  const [key, setKey] = useState("clienti");

  // Stato Prenotazioni
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [parrucchiereId, setParrucchiereId] = useState("");
  const [servizioId, setServizioId] = useState("");
  const [data, setData] = useState("");
  const [clienti, setClienti] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);
  const [servizi, setServizi] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prenRes, cRes, pRes, sRes] = await Promise.all([
          prenotazioneService.getAllPrenotazioni(),
          clienteService.getClienti(),
          parrucchiereService.getAllParrucchieri(),
          servizioService.getAllServizi(),
        ]);
        setPrenotazioni(prenRes.data);
        setClienti(cRes.data);
        setParrucchieri(pRes.data);
        setServizi(sRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleSubmitPrenotazione = async (e) => {
    e.preventDefault();
    if (!clienteId || !parrucchiereId || !servizioId || !data) {
      alert("Compila tutti i campi!");
      return;
    }
    try {
      const formattedDate = dayjs(data).format("YYYY-MM-DDTHH:mm:ss");
      await prenotazioneService.createPrenotazione({
        clienteId,
        parrucchiereId,
        servizioId,
        data: formattedDate,
        stato: "IN_ATTESA",
      });
      alert("Prenotazione creata!");
      setClienteId("");
      setParrucchiereId("");
      setServizioId("");
      setData("");
      const res = await prenotazioneService.getAllPrenotazioni();
      setPrenotazioni(res.data);
    } catch (err) {
      console.error(err);
      alert("Errore nella prenotazione");
    }
  };

  const handleDeletePrenotazione = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa prenotazione?"))
      return;
    try {
      await prenotazioneService.deletePrenotazione(id);
      setPrenotazioni(prenotazioni.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Errore durante l'eliminazione");
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Dashboard Admin</h2>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
        variant="tabs"
      >
        {/* ---------------- CLIENTI ---------------- */}
        <Tab eventKey="clienti" title="Clienti">
          <Row>
            <Col xs={12} lg={6} className="mb-3">
              <h4>Nuovo Cliente</h4>
              <ClienteForm />
            </Col>
            <Col xs={12} lg={6}>
              <h4>Lista Clienti</h4>
              <div className="table-responsive">
                <ClientiTable />
              </div>
            </Col>
          </Row>
        </Tab>

        {/* ---------------- PARRUCCHIERI ---------------- */}
        <Tab eventKey="parrucchieri" title="Parrucchieri">
          <Row>
            <Col xs={12} lg={6} className="mb-3">
              <h4>Nuovo Parrucchiere</h4>
              <ParrucchiereForm />
            </Col>
            <Col xs={12} lg={6}>
              <h4>Lista Parrucchieri</h4>
              <div className="table-responsive">
                <ParrucchieriTable />
              </div>
            </Col>
          </Row>
        </Tab>

        {/* ---------------- SERVIZI ---------------- */}
        <Tab eventKey="servizi" title="Servizi">
          <Row>
            <Col xs={12} lg={6} className="mb-3">
              <h4>Nuovo Servizio</h4>
              <ServizioForm />
            </Col>
            <Col xs={12} lg={6}>
              <h4>Lista Servizi</h4>
              <div className="table-responsive">
                <ServiziTable />
              </div>
            </Col>
          </Row>
        </Tab>

        {/* ---------------- PRENOTAZIONI ---------------- */}
        <Tab eventKey="prenotazioni" title="Prenotazioni">
          <Row>
            <Col xs={12} lg={4} className="mb-3">
              <h4>Nuova Prenotazione</h4>
              <Form onSubmit={handleSubmitPrenotazione}>
                <Form.Group className="mb-2">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                  >
                    <option value="">Seleziona cliente</option>
                    {clienti.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome} {c.cognome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Parrucchiere</Form.Label>
                  <Form.Select
                    value={parrucchiereId}
                    onChange={(e) => setParrucchiereId(e.target.value)}
                  >
                    <option value="">Seleziona parrucchiere</option>
                    {parrucchieri.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Servizio</Form.Label>
                  <Form.Select
                    value={servizioId}
                    onChange={(e) => setServizioId(e.target.value)}
                  >
                    <option value="">Seleziona servizio</option>
                    {servizi.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Data e ora</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit">Prenota</Button>
              </Form>
            </Col>

            <Col xs={12} lg={8}>
              <h4>Lista Prenotazioni</h4>
              <div className="table-responsive">
                <Table striped bordered hover responsive className="w-100">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Parrucchiere</th>
                      <th>Servizio</th>
                      <th>Data</th>
                      <th>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prenotazioni.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.cliente.nome} {p.cliente.cognome}
                        </td>
                        <td>{p.parrucchiere.nome}</td>
                        <td>{p.servizio.nome}</td>
                        <td>
                          {p.data
                            ? dayjs(p.data).format("DD/MM/YYYY HH:mm")
                            : "N/D"}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeletePrenotazione(p.id)}
                          >
                            Elimina
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
