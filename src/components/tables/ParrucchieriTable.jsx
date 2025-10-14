import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import parrucchiereService from "../../services/ParrucchiereService";

const ParrucchieriTable = () => {
  const [parrucchieri, setParrucchieri] = useState([]);

  const fetchParrucchieri = async () => {
    try {
      const res = await parrucchiereService.getAllParrucchieri();
      setParrucchieri(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await parrucchiereService.deleteParrucchiere(id);
      fetchParrucchieri();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParrucchieri();
  }, []);

  return (
    <Table striped bordered hover responsive className="w-100">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Specialita</th>
        </tr>
      </thead>
      <tbody>
        {parrucchieri.map((p) => (
          <tr key={p.id}>
            <td>{p.nome}</td>
            <td>{p.specialita}</td>
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

export default ParrucchieriTable;
