// src/components/tables/PrenotazioniTable.jsx
import React from "react";
import { Table, Button } from "react-bootstrap";
import dayjs from "dayjs";

const PrenotazioniTable = ({
  prenotazioni,
  handleDelete,
  handleStatoChange,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
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
            <td>{p.id}</td>
            <td>
              {p.cliente ? `${p.cliente.nome} ${p.cliente.cognome}` : "-"}
            </td>
            <td>{p.parrucchiere ? p.parrucchiere.nome : "-"}</td>
            <td>{p.servizio ? p.servizio.nome : "-"}</td>
            <td>{p.data ? dayjs(p.data).format("DD/MM/YYYY HH:mm") : "-"}</td>
            <td className="d-flex gap-2 align-items-center">
              {p.stato === "IN_ATTESA" && (
                <span className="badge bg-warning text-dark">In attesa</span>
              )}
              {p.stato === "CONFERMATA" && (
                <span className="badge bg-success">Confermata</span>
              )}
              {p.stato === "CANCELLATA" && (
                <span className="badge bg-danger">Cancellata</span>
              )}

              {p.stato !== "CONFERMATA" && (
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleStatoChange(p.id, "CONFERMATA")}
                >
                  ✅
                </Button>
              )}
              {p.stato !== "CANCELLATA" && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleStatoChange(p.id, "CANCELLATA")}
                >
                  ❌
                </Button>
              )}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleDelete(p.id)}
              >
                🗑
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PrenotazioniTable;
