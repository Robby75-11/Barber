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
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Dashboard Admin
              </Nav.Link>
            )}

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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />

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
