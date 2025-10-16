import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import utenteService from "../../services/UtenteService";

const UtentiTable = () => {
  const [utenti, setUtenti] = useState([]);

  const fetchUtenti = async () => {
    try {
      const res = await utenteService.getUtenti();
      setUtenti(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await utenteService.deleteUtente(id);
      fetchUtenti();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUtenti();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Ruolo</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {utenti.map((u) => (
          <tr key={u.id}>
            <td>{u.nome}</td>
            <td>{u.cognome}</td>
            <td>{u.email}</td>
            <td>{u.telefono}</td>
            <td>{u.role}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(u.id)}
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

export default UtentiTable;
