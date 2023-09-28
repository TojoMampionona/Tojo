// import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import Logo from '../../../src/logo.svg'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


// const Navbar = styled.nav`
//     padding: 30px;
//     display: flex;
    
//     justify-content: space-between;
//     align-items: center;
// `

const listSyle = {
    textDecoration: 'none',
    marginRight: '35px',
    color: 'white'
}

// const NavItem = styled.li`
// margin-right: 40px;
// `

function Header() {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand><img src={Logo} alt="Logo" width={"75px"}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/" style={listSyle}>Accueil</Nav.Link>
                        <Nav.Link href="/AboutMe" style={listSyle}>A propos de moi</Nav.Link>
                        <Nav.Link href="/MySkills" style={listSyle}>My skills</Nav.Link>
                        <NavDropdown title="Applications" href="/Applications" style={listSyle}>
                            <NavDropdown.Item href="/Applications/Meteo">Météo</NavDropdown.Item>
                            <NavDropdown.Item href="/Applications/TauxDeChange">Taux de change</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Applications/Recettes">Recettes</NavDropdown.Item>
                            <NavDropdown.Item href="/Applications/Baiboly">Baiboly</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/HiringMe" style={listSyle}>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header