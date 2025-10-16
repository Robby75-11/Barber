import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import authService from "../services/authService";

function Login({ setUtente }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.utente));
      setUtente(res.data.utente);
      alert("✅ Login effettuato!");
    } catch (err) {
      console.error(err);
      alert("❌ Credenziali errate");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="mt-3">
        Login
      </Button>
    </Form>
  );
}

export default Login;
