import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import ParrucchiereForm from "./components/ParrucchiereForm";
import ClienteForm from "./components/ClienteForm";
import PrenotazioniPage from "./components/PrenotazioniPage";
import ServizioForm from "./components/ServizioForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import HomePage from "./components/HomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = user?.role === "AMMINISTRATORE";

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            💇‍♂️ Martino Parrucchieri
          </Navbar.Brand>
          <Nav className="me-auto">
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Dashboard Admin
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/parrucchieri">
              Parrucchieri
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/clienti">
              Clienti
            </Nav.Link>
            <Nav.Link as={Link} to="/prenotazioni">
              Prenotazioni
            </Nav.Link>
            <Nav.Link as={Link} to="/servizi">
              Servizi
            </Nav.Link>
            {!user ? (
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
                <Nav.Link disabled>Ciao, {user.username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/parrucchieri" element={<ParrucchiereForm />} />
          <Route path="/clienti" element={<ClienteForm />} />
          <Route path="/servizi" element={<ServizioForm />} />
          <Route path="/prenotazioni" element={<PrenotazioniPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/" element={<h2>Benvenuto nel gestionale 💈</h2>} />

          {/* Dashboard Admin protetta */}
          <Route
            path="/admin/*"
            element={
              isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Fallback 404 */}
          <Route path="*" element={<h2>404 - Pagina non trovata</h2>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
