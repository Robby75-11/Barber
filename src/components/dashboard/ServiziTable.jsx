import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import servizioService from "../../services/ServizioService";

const ServiziTable = () => {
  const [servizi, setServizi] = useState([]);

  const fetchServizi = async () => {
    try {
      const res = await servizioService.getAllServizi();
      setServizi(res.data);
    } catch (err) {
      console.error("Errore caricamento servizi:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo servizio?"))
      return;

    try {
      await servizioService.deleteServizio(id);
      fetchServizi(); // ricarica lista dopo cancellazione
    } catch (err) {
      console.error("Errore eliminazione servizio:", err);
      alert("Non è stato possibile eliminare il servizio.");
    }
  };

  useEffect(() => {
    fetchServizi();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Prezzo (€)</th>
          <th>Durata (minuti)</th>
        </tr>
      </thead>
      <tbody>
        {servizi.map((s) => (
          <tr key={s.id}>
            <td>{s.nome}</td>
            <td>{s.prezzo}</td>
            <td>{s.durata}</td>
            <td>
              {/* Pulsante per cancellare */}
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(s.id)}
              >
                Elimina
              </Button>
              {/* Qui puoi aggiungere un pulsante "Modifica" se vuoi */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ServiziTable;
