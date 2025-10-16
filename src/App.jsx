import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/HomePage";

function App() {
  const [utente, setUtente] = useState(null);

  useEffect(() => {
    const savedUtente = localStorage.getItem("utente");
    if (savedUtente) setUtente(JSON.parse(savedUtente));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    setUtente(null);
  };

  const isAdmin = utente?.role === "AMMINISTRATORE";

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            💇‍♂️ Martino Parrucchieri
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Dashboard Admin
              </Nav.Link>
            )}

            {!utente ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrati
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link disabled>Ciao, {utente.username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage utente={utente} />} />
          <Route path="/login" element={<Login setUtente={setUtente} />} />
          <Route
            path="/register"
            element={<Register setUtente={setUtente} />}
          />

          {/* Dashboard Admin protetta */}
          <Route
            path="/admin/*"
            element={isAdmin ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          {/* Fallback 404 */}
          <Route path="*" element={<h2>404 - Pagina non trovata</h2>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
