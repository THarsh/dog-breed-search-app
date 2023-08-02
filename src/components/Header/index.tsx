import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <Navbar className="nav-bar-wrapper bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Dog Breed Search App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
