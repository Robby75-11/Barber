import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import authService from "../services/authService";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login({ email: username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.cliente));
      setUser(res.data.cliente);
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
