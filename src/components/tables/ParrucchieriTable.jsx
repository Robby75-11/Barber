import { Table, Button } from "react-bootstrap";

const ParrucchieriTable = ({ parrucchieri, onDelete }) => {
  if (!parrucchieri || parrucchieri.length === 0)
    return <p className="mt-3">Nessun parrucchiere trovato.</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Specialità</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {parrucchieri.map((p) => (
          <tr key={p.id}>
            <td>{p.nome}</td>
            <td>{p.cognome}</td>
            <td>{p.specialita}</td>
            <td>
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  window.confirm("Eliminare questo parrucchiere?") &&
                  onDelete(p.id)
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

export default ParrucchieriTable;
