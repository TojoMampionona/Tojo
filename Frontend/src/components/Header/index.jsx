// import styled from 'styled-components'
// import { Link } from 'react-router-dom'

import Logo from '../../../src/logo.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import space from '../Header/space.jpg';
import '../../App.css'

const listSyle = {
    textDecoration: 'none',
    marginRight: '35px',
    color: '#7d48b2',
    fontWeight: 'bold'
}

function Header() {

    return (
            <div className="Container">
                <div className='row' >
                    <div className="col-lg-12 col-md-12 col-xs-12" style={{backgroundImage:`url(${space})`, height:'200px', backgroundSize:'cover', borderRadius: '0 0 60px 60px'}}>

                    </div>
                </div>
                <div className="row">
                    <div className='col-12'> 
                        <Navbar expand="lg" bg="light" data-bs-theme="dark">
                            <Container>
                            <Navbar.Brand><img src={Logo} alt="Logo" height={"50px"}/></Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor: '#7d48b2'}}/>
                                    <Navbar.Collapse>
                                        <Nav className="me-auto" >
                                            <Nav.Link href="/" style={listSyle}>Accueil</Nav.Link>
                                            <Nav.Link href="/AboutMe" style={listSyle}>A propos de moi</Nav.Link>
                                            <Nav.Link href="/MySkills" style={listSyle}>My skills</Nav.Link>
                                            
                                            <Nav.Link href="/Jeux" style={listSyle}>Jeux</Nav.Link>
                                            <NavDropdown title={<span className="custom-navbar-title">Applications</span>} href="/Applications" style={listSyle}>
                                                <NavDropdown.Item className="custom-navbar-title" href="/Applications/Meteo">Météo</NavDropdown.Item>
                                                <NavDropdown.Item className="custom-navbar-title" href="/Applications/TauxDeChange">Taux de change</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item className="custom-navbar-title" href="/Applications/Recettes">Recettes</NavDropdown.Item>
                                                <NavDropdown.Item className="custom-navbar-title" href="/Applications/Baiboly">Baiboly</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link href="/HiringMe" style={listSyle}>Contact</Nav.Link>
                                        </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
    )
}

export default Header