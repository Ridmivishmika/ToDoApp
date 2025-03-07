import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

function Navigationbar() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>
                    <Image src="ToDoLogo.png" width={150} height={50} alt="Logo" className="border border-dark rounded" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> 
                        <Nav.Link onClick={() => navigate("/todopage")} className="text-custom-purple fs-2 px-3">ToDo List</Nav.Link>
                        <Nav.Link onClick={() => navigate("/")} className="text-custom-purple fs-2 px-3">Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;
