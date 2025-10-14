import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import clienteService from "../../services/ClienteService";

const ClientiTable = () => {
  const [clienti, setClienti] = useState([]);

  const fetchClienti = async () => {
    try {
      const res = await clienteService.getClienti();
      setClienti(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await clienteService.deleteCliente(id);
      fetchClienti();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {clienti.map((c) => (
          <tr key={c.id}>
            <td>{c.nome}</td>
            <td>{c.cognome}</td>
            <td>{c.email}</td>
            <td>{c.telefono}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(c.id)}
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

export default ClientiTable;
