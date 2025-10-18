// src/components/ServiziList.jsx
import { useEffect, useState } from "react";
import ServizioService from "../services/ServizioService";

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
    <ul>
      {servizi.map((s) => (
        <li key={s.id}>
          {s.nome} - €{s.prezzo} ({s.durata} min)
        </li>
      ))}
    </ul>
  );
}

export default ServiziList;
