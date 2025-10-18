import { Table, Button } from "react-bootstrap";

const ServiziTable = ({ servizi, onDelete }) => {
  if (!servizi || servizi.length === 0)
    return <p className="mt-3">Nessun servizio trovato.</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Prezzo (€)</th>
          <th>Durata (min)</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {servizi.map((s) => (
          <tr key={s.id}>
            <td>{s.nome}</td>
            <td>{s.prezzo}</td>
            <td>{s.durata}</td>
            <td>
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  window.confirm("Eliminare questo servizio?") && onDelete(s.id)
                }
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

export default ServiziTable;
