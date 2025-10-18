import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
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

  return (
    <>
      <Navbar bg="secondary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            💇‍♂️ Martino Parrucchieri
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

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

          {/* Dashboard accessibile solo ad admin 
          <Route
            path="/dashboard/*"
            element={
              utente?.role === "AMMINISTRATORE" ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
*/}
          {/* Fallback 404 */}
          <Route path="*" element={<h2>404 - Pagina non trovata</h2>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
