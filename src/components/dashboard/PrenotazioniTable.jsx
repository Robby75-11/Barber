import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import prenotazioneService from "../../services/PrenotazioneService";
import dayjs from "dayjs";

const PrenotazioniTable = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);

  const fetchPrenotazioni = async () => {
    try {
      const res = await prenotazioneService.getAllPrenotazioni();
      setPrenotazioni(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await prenotazioneService.deletePrenotazione(id);
      fetchPrenotazioni();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrenotazioni();
  }, []);

  return (
    <Table striped bordered hover>
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
            <td>{p.data ? dayjs(p.data).format("DD/MM/YYYY HH:mm") : "N/D"}</td>

            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(p.id)}
              >
                Elimina
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PrenotazioniTable;
