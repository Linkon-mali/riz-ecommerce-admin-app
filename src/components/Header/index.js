import React from 'react';
import { Navbar, Nav, Container, } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/auth.actions';

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () =>{
    dispatch(signout());
  }

  const renderLogdInLinks = () => {
    return(
      <Nav className="ml-auto">
      <li className='nav-item'>
          <span className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>Signout</span>
      </li>
    </Nav>
    )
  }

  const renderNotLoggedInLinks = () => {
    return(
      <Nav className="ml-auto">
      <li className='nav-item'>
          <NavLink to="signin" className="nav-link">Signin</NavLink>
      </li>
      <li className='nav-item'>
          <NavLink to="signup" className="nav-link">Signup</NavLink>
      </li>
    </Nav>
    )
  }

    return (
        <div>
          <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark" style={{zIndex: '1'}}>
            <Container fluid>
            {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
            <Link to="/" className='navbar-brand'>Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              
              </Nav>
              { auth.authenticate ? renderLogdInLinks() : renderNotLoggedInLinks() }
            </Navbar.Collapse>
            </Container>
          </Navbar>  
        </div>
    )
}

export default Header
