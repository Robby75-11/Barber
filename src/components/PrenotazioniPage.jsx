import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import prenotazioneService from "../services/PrenotazioneService";
import utenteService from "../services/UtenteService";
import parrucchiereService from "../services/ParrucchiereService";
import servizioService from "../services/ServizioService";
import PrenotazioniTable from "./tables/PrenotazioniTable";

const PrenotazioniPage = ({ utente }) => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  const [utenteId, setUtenteId] = useState("");
  const [parrucchiereId, setParrucchiereId] = useState("");
  const [servizioId, setServizioId] = useState("");
  const [data, setData] = useState("");

  const [utenti, setUtenti] = useState([]);
  const [parrucchieri, setParrucchieri] = useState([]);
  const [servizi, setServizi] = useState([]);

  const isAdmin = utente?.role === "AMMINISTRATORE";

  // Carica prenotazioni
  const loadPrenotazioni = async () => {
    setLoading(true);
    try {
      const res = await prenotazioneService.getAllPrenotazioni();
      setPrenotazioni(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carica dati per form (utenti solo per admin)
  const loadFormData = async () => {
    try {
      const [utRes, parrRes, servRes] = await Promise.all([
        isAdmin ? utenteService.getUtenti() : Promise.resolve({ data: [] }),
        parrucchiereService.getAllParrucchieri(),
        servizioService.getAllServizi(),
      ]);
      setUtenti(utRes.data);
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

  const handleStatoChange = async (id, nuovoStato) => {
    try {
      await prenotazioneService.updatePrenotazione(id, { stato: nuovoStato });
      loadPrenotazioni();
    } catch (err) {
      console.error(err);
      alert("Errore nell'aggiornamento dello stato");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parrucchiereId || !servizioId || !data || (isAdmin && !utenteId)) {
      alert("Compila tutti i campi!");
      return;
    }
    try {
      const formattedDate = dayjs(data).format("YYYY-MM-DDTHH:mm:ss");
      await prenotazioneService.createPrenotazione({
        utenteId: isAdmin ? utenteId : utente.id,
        parrucchiereId,
        servizioId,
        data: formattedDate,
        stato: "IN_ATTESA",
      });
      alert("Prenotazione creata!");
      setUtenteId("");
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
        {isAdmin && (
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

        <Button type="submit">Prenota</Button>
      </Form>

      <hr />

      <h3 className="mb-3">📋 Le tue prenotazioni</h3>
      <PrenotazioniTable
        prenotazioni={prenotazioni}
        onDelete={handleDelete}
        onStatoChange={handleStatoChange}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default PrenotazioniPage;
