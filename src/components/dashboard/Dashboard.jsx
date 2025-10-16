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
import UtentiTable from "../tables/UtentiTable";
import ParrucchieriTable from "../tables/ParrucchieriTable";
import ServiziTable from "../tables/ServiziTable";

// Form
import UtenteForm from "../forms/UtenteForm";

// Services
import prenotazioneService from "../../services/PrenotazioneService";
import utenteService from "../../services/UtenteService";
import parrucchiereService from "../../services/ParrucchiereService";
import servizioService from "../../services/ServizioService";

const Dashboard = () => {
  const [key, setKey] = useState("prenotazioni");
  const [role, setRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const [prenotazioni, setPrenotazioni] = useState([]);
  const [utenteId, setUtenteId] = useState("");
  const [parrucchiereId, setParrucchiereId] = useState("");
  const [servizioId, setServizioId] = useState("");
  const [data, setData] = useState("");

  const [utenti, setUtenti] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);
  const [servizi, setServizi] = useState([]);

  // 🔹 Caricamento dati all'avvio
  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = JSON.parse(localStorage.getItem("utente"));
        if (!userRes) return;

        setRole(userRes.role);
        setCurrentUserId(userRes.id);

        const [prenRes, uRes, pRes, sRes] = await Promise.all([
          prenotazioneService.getAllPrenotazioni(),
          utenteService.getUtenti(),
          parrucchiereService.getAllParrucchieri(),
          servizioService.getAllServizi(),
        ]);

        // Se è un utente, mostra solo le proprie prenotazioni
        setPrenotazioni(
          userRes.role === "UTENTE"
            ? prenRes.data.filter((p) => p.utente.id === userRes.id)
            : prenRes.data
        );

        setUtenti(uRes.data);
        setParrucchieri(pRes.data);
        setServizi(sRes.data);
      } catch (err) {
        console.error("Errore nel caricamento dati:", err);
      }
    };
    loadData();
  }, []);

  // 🔹 Creazione prenotazione
  const handleSubmitPrenotazione = async (e) => {
    e.preventDefault();
    if (!parrucchiereId || !servizioId || !data) {
      alert("Compila tutti i campi!");
      return;
    }

    try {
      const formattedDate = dayjs(data).format("YYYY-MM-DDTHH:mm:ss");
      await prenotazioneService.createPrenotazione({
        utenteId: role === "AMMINISTRATORE" ? utenteId : currentUserId,
        parrucchiereId,
        servizioId,
        data: formattedDate,
        stato: "IN_ATTESA",
      });

      alert("✅ Prenotazione creata!");

      setUtenteId("");
      setParrucchiereId("");
      setServizioId("");
      setData("");

      // Ricarica le prenotazioni
      const res = await prenotazioneService.getAllPrenotazioni();
      setPrenotazioni(
        role === "UTENTE"
          ? res.data.filter((p) => p.utente.id === currentUserId)
          : res.data
      );
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella prenotazione");
    }
  };

  // 🔹 Eliminazione prenotazione
  const handleDeletePrenotazione = async (id) => {
    if (!window.confirm("Vuoi eliminare questa prenotazione?")) return;
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
      <h2 className="mb-4">Benvenuto nella tua Dashboard</h2>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        {/* 👑 Solo admin vede tab Utenti */}
        {role === "AMMINISTRATORE" && (
          <Tab eventKey="utenti" title="Utenti">
            <Row>
              <Col xs={12} lg={6} className="mb-3">
                <h4>Nuovo Utente</h4>
                <UtenteForm />
              </Col>
              <Col xs={12} lg={6}>
                <h4>Lista Utenti</h4>
                <div className="table-responsive">
                  <UtentiTable />
                </div>
              </Col>
            </Row>
          </Tab>
        )}

        {/* 💇‍♀️ Parrucchieri (visibile a tutti) */}
        <Tab eventKey="parrucchieri" title="Parrucchieri">
          <Row>
            <Col xs={12}>
              <ParrucchieriTable parrucchieri={parrucchieri} />
            </Col>
          </Row>
        </Tab>

        {/* ✂️ Servizi (visibile a tutti) */}
        <Tab eventKey="servizi" title="Servizi">
          <Row>
            <Col xs={12}>
              <ServiziTable servizi={servizi} />
            </Col>
          </Row>
        </Tab>

        {/* 📅 Prenotazioni (visibile a tutti, ma con restrizioni diverse) */}
        <Tab eventKey="prenotazioni" title="Prenotazioni">
          <Row>
            <Col xs={12} lg={4} className="mb-3">
              <h4>Nuova Prenotazione</h4>
              <Form onSubmit={handleSubmitPrenotazione}>
                {role === "AMMINISTRATORE" && (
                  <Form.Group className="mb-2">
                    <Form.Label>Utente</Form.Label>
                    <Form.Select
                      value={utenteId}
                      onChange={(e) => setUtenteId(e.target.value)}
                    >
                      <option value="">Seleziona utente</option>
                      {utenti.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.nome} {u.cognome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

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

                <Button type="submit" className="w-100 mt-2">
                  Prenota
                </Button>
              </Form>
            </Col>

            <Col xs={12} lg={8}>
              <h4>Le tue Prenotazioni</h4>
              <div className="table-responsive">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Utente</th>
                      <th>Parrucchiere</th>
                      <th>Servizio</th>
                      <th>Data</th>
                      {role === "AMMINISTRATORE" && <th>Azioni</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {prenotazioni.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.utente?.nome} {p.utente?.cognome}
                        </td>
                        <td>{p.parrucchiere?.nome}</td>
                        <td>{p.servizio?.nome}</td>
                        <td>
                          {p.data
                            ? dayjs(p.data).format("DD/MM/YYYY HH:mm")
                            : "N/D"}
                        </td>
                        {role === "AMMINISTRATORE" && (
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeletePrenotazione(p.id)}
                            >
                              Elimina
                            </Button>
                          </td>
                        )}
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

export default Dashboard;
