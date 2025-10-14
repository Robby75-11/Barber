// src/components/PrenotazioniPage.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Form } from "react-bootstrap";
import dayjs from "dayjs";
import prenotazioneService from "../services/PrenotazioneService";
import clienteService from "../services/ClienteService";
import parrucchiereService from "../services/ParrucchiereService";
import servizioService from "../services/ServizioService";

function PrenotazioniPage() {
  // ✅ Stato lista prenotazioni
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Stato form
  const [clienteId, setClienteId] = useState("");
  const [parrucchiereId, setParrucchiereId] = useState("");
  const [servizioId, setServizioId] = useState("");
  const [data, setData] = useState("");

  const [clienti, setClienti] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);
  const [servizi, setServizi] = useState([]);

  // 🔹 Carica prenotazioni
  const loadPrenotazioni = async () => {
    try {
      const res = await prenotazioneService.getAllPrenotazioni();
      console.log("Prenotazioni ricevute:", res.data);
      setPrenotazioni(res.data);
    } catch (err) {
      console.error("Errore nel caricamento:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Carica dati form (clienti, parrucchieri, servizi)
  const loadFormData = async () => {
    try {
      const [clientiRes, parrRes, servRes] = await Promise.all([
        clienteService.getClienti(),
        parrucchiereService.getAllParrucchieri(),
        servizioService.getAllServizi(),
      ]);
      setClienti(clientiRes.data);
      setParrucchieri(parrRes.data);
      setServizi(servRes.data);
    } catch (err) {
      console.error("Errore caricamento form:", err);
    }
  };

  useEffect(() => {
    loadPrenotazioni();
    loadFormData();
  }, []);

  // 🔹 Elimina prenotazione
  const handleDelete = async (id) => {
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

  // 🔹 Aggiorna stato prenotazione
  const handleStatoChange = async (id, nuovoStato) => {
    try {
      await prenotazioneService.updatePrenotazione(id, { stato: nuovoStato });
      setPrenotazioni((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stato: nuovoStato } : p))
      );
    } catch (err) {
      console.error("Errore aggiornamento stato:", err);
      alert("Errore durante l'aggiornamento dello stato");
    }
  };

  // 🔹 Crea nuova prenotazione
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clienteId || !parrucchiereId || !servizioId || !data) {
      alert("Compila tutti i campi!");
      return;
    }
    try {
      // Formatta la data correttamente
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
      loadPrenotazioni(); // aggiorna lista
    } catch (err) {
      console.error(err);
      alert("Errore nella prenotazione");
    }
  };

  if (loading) return <Spinner animation="border" className="mt-3" />;

  return (
    <div className="mt-4">
      <h3 className="mb-3">📅 Lista Prenotazioni</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{p.id}</td>
              <td>
                {p.cliente ? `${p.cliente.nome} ${p.cliente.cognome}` : "-"}
              </td>
              <td>
                {p.parrucchiere
                  ? `${p.parrucchiere.nome} ${p.parrucchiere.cognome}`
                  : "-"}
              </td>
              <td>{p.servizio ? p.servizio.nome : "-"}</td>
              <td>{p.data ? dayjs(p.data).format("DD/MM/YYYY HH:mm") : "-"}</td>
              <td className="d-flex gap-2 align-items-center">
                {/* Badge stato */}
                {p.stato === "IN_ATTESA" && (
                  <span className="badge bg-warning text-dark">In attesa</span>
                )}
                {p.stato === "CONFERMATA" && (
                  <span className="badge bg-success">Confermata</span>
                )}
                {p.stato === "CANCELLATA" && (
                  <span className="badge bg-danger">Cancellata</span>
                )}

                {/* Pulsanti rapidi */}
                {p.stato !== "CONFERMATA" && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleStatoChange(p.id, "CONFERMATA")}
                  >
                    ✅
                  </Button>
                )}
                {p.stato !== "CANCELLATA" && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleStatoChange(p.id, "CANCELLATA")}
                  >
                    ❌
                  </Button>
                )}

                {/* Elimina */}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />

      <h3 className="mb-3">📝 Nuova Prenotazione</h3>
      <Form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default PrenotazioniPage;
