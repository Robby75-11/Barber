// src/components/PrenotazioniPage.jsx
import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import prenotazioneService from "../services/PrenotazioneService";
import clienteService from "../services/ClienteService";
import parrucchiereService from "../services/ParrucchiereService";
import servizioService from "../services/ServizioService";
import PrenotazioniTable from "./tables/PrenotazioniTable";

const PrenotazioniPage = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clienteId, setClienteId] = useState("");
  const [parrucchiereId, setParrucchiereId] = useState("");
  const [servizioId, setServizioId] = useState("");
  const [data, setData] = useState("");

  const [clienti, setClienti] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);
  const [servizi, setServizi] = useState([]);

  // Carica prenotazioni
  const loadPrenotazioni = async () => {
    try {
      const res = await prenotazioneService.getAllPrenotazioni();
      setPrenotazioni(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carica dati per il form
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
      console.error(err);
    }
  };

  useEffect(() => {
    loadPrenotazioni();
    loadFormData();
  }, []);

  // Gestione eliminazione prenotazione
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

  // Aggiornamento stato prenotazione
  const handleStatoChange = async (id, nuovoStato) => {
    try {
      await prenotazioneService.updatePrenotazione(id, { stato: nuovoStato });
      setPrenotazioni((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stato: nuovoStato } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Errore durante l'aggiornamento dello stato");
    }
  };

  // Crea nuova prenotazione
  const handleSubmit = async (e) => {
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
      loadPrenotazioni();
    } catch (err) {
      console.error(err);
      alert("Errore nella prenotazione");
    }
  };

  if (loading) return <Spinner animation="border" className="mt-3" />;

  return (
    <div className="mt-4">
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

      <hr />

      <h3 className="mb-3">📅 Lista Prenotazioni</h3>
      <PrenotazioniTable
        prenotazioni={prenotazioni}
        handleDelete={handleDelete}
        handleStatoChange={handleStatoChange}
      />
    </div>
  );
};

export default PrenotazioniPage;
