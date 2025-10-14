import { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import ClientiTable from "./Clientitable";
import ParrucchieriTable from "./ParrucchieriTable";
import PrenotazioniTable from "./PrenotazioniTable";
import ServiziTable from "./ServiziTable";

const AdminDashboard = () => {
  const [key, setKey] = useState("clienti");

  return (
    <Container className="mt-4">
      <h2>Dashboard Admin</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="clienti" title="Clienti">
          <ClientiTable />
        </Tab>
        <Tab eventKey="parrucchieri" title="Parrucchieri">
          <ParrucchieriTable />
        </Tab>
        <Tab eventKey="prenotazioni" title="Prenotazioni">
          <PrenotazioniTable />
        </Tab>
        <Tab eventKey="servizi" title="Servizi">
          <ServiziTable />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
