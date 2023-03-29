import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "react-bootstrap";

const Navigation = ({ isAuth, setIsAuth }) => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="me-3">
            <i
              className="fa-brands fa-hive me-1"
              style={{ color: "#10b713" }}
            ></i>
            Blog App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navlinks">
              <Nav.Link href="/">
                <i
                  className="fa-solid fa-house me-2"
                  style={{ color: "#10b713" }}
                ></i>
                Home
              </Nav.Link>
              {isAuth && (
                <Nav.Link href="/create-post">
                  <i
                    className="fa-solid fa-pencil me-2"
                    style={{ color: "#10b713" }}
                  ></i>
                  Create Post
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {!isAuth ? (
                <Nav.Link href="/login">
                  <i className="fa-solid fa-right-to-bracket me-2"></i>
                  Login
                </Nav.Link>
              ) : (
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout"
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
