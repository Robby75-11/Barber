import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import authService from "../services/authService";

function Register({ setUser }) {
  const [cliente, setCliente] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.register(cliente);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.cliente));
      setUser(res.data.cliente); // Aggiorna stato globale
      alert("✅ Registrazione completata!");
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella registrazione");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="nome"
        placeholder="Nome"
        value={cliente.nome}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="text"
        name="cognome"
        placeholder="Cognome"
        value={cliente.cognome}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="email"
        name="email"
        placeholder="Email"
        value={cliente.email}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="text"
        name="telefono"
        placeholder="Telefono"
        value={cliente.telefono}
        onChange={handleChange}
      />
      <Form.Control
        type="text"
        name="username"
        placeholder="Username"
        value={cliente.username}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="password"
        name="password"
        placeholder="Password"
        value={cliente.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="mt-3">
        Registrati
      </Button>
    </Form>
  );
}

export default Register;
