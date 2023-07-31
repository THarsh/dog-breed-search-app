import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Dog Breed Search App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
