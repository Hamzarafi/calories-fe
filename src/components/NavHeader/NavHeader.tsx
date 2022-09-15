import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext";

function NavHeader() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context?.setAuthAndSave(null);
    navigate("/login");
  };

  return (
    <>
      {context?.auth && (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>
              <img
                src="/Icon2.jpeg"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="<>"
              />
            </Navbar.Brand>
            <Navbar.Brand onClick={() => navigate("/")}>
              Calories Counter
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/summary")}>Summary</Nav.Link>
              {context.auth.role == "admin" && (
                <>
                  <Nav.Link onClick={() => navigate("/report")}>
                    Admin Report
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/alllist")}>
                    Admin List
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ marginRight: "10px" }}>
                Signed in as: <span>{context.auth.userName}</span>
              </Navbar.Text>
              <Button className="btn btn-light " onClick={handleLogout}>
                Logout
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavHeader;
